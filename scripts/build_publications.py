#!/usr/bin/env python3
"""
Hydrate DOI-stub entries in data/publications.yaml with metadata fetched from
the DOI's registration agency (Crossref or DataCite, via doi.org content
negotiation).

An entry opts into hydration by having a top-level `doi:` key, e.g.:

    - doi: "10.1016/j.socec.2025.102502"
      type: "journal"
      focus_area: "Meta-Research & Scientific Reform"

On every run, the script (re)computes title, authors, journal_name, year,
status, abstract, citation, links.doi, and altmetric_doi for every such entry.
Any field can be permanently pinned by adding it under `overrides:` (nested
dicts, e.g. overrides.links.pdf, are deep-merged). `type` and `focus_area` are
never touched by this script.

Entries without a top-level `doi:` key (today's media/policy/wip entries) are
left completely untouched.

If a DOI fails to resolve, the entry's existing fields are left as-is (so a
transient API outage never blanks out already-good data) and a warning is
printed.

Usage:
    python3 scripts/build_publications.py [--dry-run] [--force]
"""

import argparse
import html
import json
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen

from ruamel.yaml import YAML
from ruamel.yaml.comments import CommentedMap

DATA_FILE = Path("data/publications.yaml")
CACHE_FILE = Path("scripts/publications_doi_cache.json")
USER_AGENT = "FORRT-PublicationsBuilder/1.0 (mailto:info@forrt.org)"

AUTO_FIELDS = ["title", "authors", "journal_name", "year", "status", "abstract", "citation"]

STATUS_MAP = {
    "journal-article": "Published",
    "posted-content": "Preprint",
    "preprint": "Preprint",
    "proceedings-article": "Published",
    "book-chapter": "Published",
    "report": "Report",
    "monograph": "Published",
}

TAG_RE = re.compile(r"<[^>]+>")
ABSTRACT_PREFIX_RE = re.compile(r"^(abstract\.?\s*[:.]?\s*)", re.IGNORECASE)
WHITESPACE_RE = re.compile(r"\s+")


def strip_tags(text):
    if not text:
        return ""
    text = TAG_RE.sub(" ", text)
    text = html.unescape(text)
    return WHITESPACE_RE.sub(" ", text).strip()


def clean_abstract(text):
    text = strip_tags(text)
    if not text:
        return ""
    return ABSTRACT_PREFIX_RE.sub("", text).strip()


def format_initials(given):
    """'Flavio' -> 'F.', 'William R.' -> 'W. R.', 'Jean-Michel' -> 'J.-M.'"""
    given = (given or "").strip()
    if not given:
        return ""
    initials = []
    for part in re.split(r"\s+", given):
        sub_initials = [
            f"{sub[0].upper()}." for sub in part.split("-") if sub.strip(".")
        ]
        if sub_initials:
            initials.append("-".join(sub_initials))
    return " ".join(initials)


def format_authors(csl_authors):
    names = []
    for author in csl_authors or []:
        family = (author.get("family") or "").strip()
        if not family:
            literal = (author.get("literal") or "").strip()
            if literal:
                names.append(literal)
            continue
        initials = format_initials(author.get("given"))
        names.append(f"{family}, {initials}" if initials else family)

    if not names:
        return ""
    if len(names) == 1:
        return names[0]
    if len(names) > 9:
        return ", ".join(names[:8]) + ", ... & " + names[-1]
    return ", ".join(names[:-1]) + " & " + names[-1]


def derive_status(csl_type):
    if not csl_type:
        return "Published"
    return STATUS_MAP.get(csl_type, csl_type.replace("-", " ").title())


def derive_year(csl):
    issued = csl.get("issued") or {}
    parts = issued.get("date-parts") or []
    if parts and parts[0]:
        return str(parts[0][0])
    return ""


def normalize_doi(doi):
    doi = (doi or "").strip()
    doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi, flags=re.IGNORECASE)
    return doi


def build_citation(authors, year, title, journal_name, volume, issue, page, doi):
    citation = f"{authors} ({year}). <strong>{title}.</strong>"
    if journal_name:
        tail = f" <em>{journal_name}</em>"
        if volume:
            tail += f", {volume}"
            if issue:
                tail += f"({issue})"
        if page:
            tail += f", {page}"
        citation += tail + "."
    citation += f" https://doi.org/{doi}"
    return citation


def fetch_json(url, accept=None, timeout=20):
    req = Request(url)
    if accept:
        req.add_header("Accept", accept)
    req.add_header("User-Agent", USER_AGENT)
    with urlopen(req, timeout=timeout) as resp:
        return json.load(resp)


def fetch_csl_json(doi):
    url = f"https://doi.org/{quote(doi, safe='/:@!$&()*+,;=-._~')}"
    try:
        return fetch_json(url, accept="application/vnd.citationstyles.csl+json")
    except HTTPError as e:
        print(f"  WARNING: doi.org returned HTTP {e.code} for {doi}", file=sys.stderr)
    except (URLError, TimeoutError, json.JSONDecodeError) as e:
        print(f"  WARNING: failed to resolve {doi}: {e}", file=sys.stderr)
    return None


def fetch_datacite_abstract(doi):
    url = f"https://api.datacite.org/dois/{quote(doi, safe='/:@!$&()*+,;=-._~')}"
    try:
        data = fetch_json(url)
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError):
        return ""
    descriptions = (data.get("data") or {}).get("attributes", {}).get("descriptions") or []
    for d in descriptions:
        if d.get("descriptionType") == "Abstract":
            abstract = clean_abstract(d.get("description", ""))
            if abstract:
                return abstract
    return ""


def build_metadata(doi):
    csl = fetch_csl_json(doi)
    if csl is None:
        return None

    title = strip_tags(csl.get("title", ""))
    container_title = csl.get("container-title") or ""
    if isinstance(container_title, list):
        container_title = container_title[0] if container_title else ""
    # Repository-hosted preprints (DataCite) often have no container-title;
    # fall back to the publisher (e.g. "Center for Open Science").
    journal_name = strip_tags(container_title) or strip_tags(csl.get("publisher", ""))
    authors = format_authors(csl.get("author"))
    year = derive_year(csl)
    status = derive_status(csl.get("type"))
    volume = csl.get("volume", "")
    issue = csl.get("issue", "")
    page = csl.get("page") or csl.get("article-number") or ""

    abstract = clean_abstract(csl.get("abstract", ""))
    if not abstract:
        abstract = fetch_datacite_abstract(doi)

    citation = build_citation(authors, year, title, journal_name, volume, issue, page, doi)

    return {
        "doi": doi,
        "title": title,
        "authors": authors,
        "journal_name": journal_name,
        "year": year,
        "status": status,
        "abstract": abstract,
        "citation": citation,
    }


def load_cache():
    if CACHE_FILE.exists():
        with CACHE_FILE.open(encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache):
    CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with CACHE_FILE.open("w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


def resolve_doi(doi, cache, force=False):
    if not force and doi in cache:
        return cache[doi]
    metadata = build_metadata(doi)
    if metadata is not None:
        cache[doi] = metadata
    return metadata


def deep_merge_links(entry, doi, overrides):
    links = entry.get("links")
    if links is None:
        links = CommentedMap()
        entry["links"] = links
    links["doi"] = f"https://doi.org/{doi}"
    for key, value in (overrides.get("links") or {}).items():
        links[key] = value


def hydrate_entry(entry, metadata):
    overrides = entry.get("overrides") or {}
    for field in AUTO_FIELDS:
        if field in overrides:
            entry[field] = overrides[field]
            continue
        new_value = metadata.get(field)
        if new_value:
            entry[field] = new_value
    deep_merge_links(entry, metadata["doi"], overrides)
    entry["altmetric_doi"] = metadata["doi"]


def make_yaml():
    yaml = YAML()
    yaml.preserve_quotes = True
    yaml.width = 100000
    return yaml


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Print result, don't write the file")
    parser.add_argument("--force", action="store_true", help="Ignore cached DOI lookups")
    args = parser.parse_args()

    yaml = make_yaml()
    with DATA_FILE.open(encoding="utf-8") as f:
        data = yaml.load(f)

    cache = load_cache()
    resolved, failed = 0, 0

    for entry in data:
        if not isinstance(entry, dict) or "doi" not in entry:
            continue
        doi = normalize_doi(entry["doi"])
        print(f"Resolving {doi} ...")
        metadata = resolve_doi(doi, cache, force=args.force)
        if metadata is None:
            failed += 1
            print(f"  Could not resolve {doi}; leaving existing fields untouched")
            continue
        hydrate_entry(entry, metadata)
        resolved += 1

    save_cache(cache)
    print(f"Done: {resolved} resolved, {failed} failed")

    if args.dry_run:
        yaml.dump(data, sys.stdout)
        return

    with DATA_FILE.open("w", encoding="utf-8") as f:
        yaml.dump(data, f)


if __name__ == "__main__":
    main()
