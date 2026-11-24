#!/usr/bin/env python3
"""Enrich cited DOIs with Open Access status and free-to-read links.

Scans content/glossary/apa_lookup.json and {{< local-references >}} blocks across
content/, queries the OpenAlex Works API in batches (with Unpaywall fallback for
misses), and writes a compact cache to data/citation_oa.json for Hugo's
layouts/partials/citations/entry.html.

Run from the repository root:
    python3 scripts/enrich_citation_oa.py [--refresh] [--max-age-days 90]
"""

import argparse
from datetime import date, timedelta
import json
from pathlib import Path
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

DOI_RE = re.compile(r"10\.[0-9]{4,9}/(?:[^\s<>()\[\]\"']|\([^\s<>()\[\]\"']*\))+")
LOCAL_REFS_RE = re.compile(
    r"\{\{<\s*local-references\b[^>]*>\}\}([\s\S]*?)\{\{<\s*/local-references\s*>\}\}"
)
OPENALEX_BATCH = 40
USER_AGENT = "FORRT-Website/1.0 (https://forrt.org; mailto:info@forrt.org)"
MAILTO = "info@forrt.org"

# DOI prefixes that resolve directly to open-access preprint/data repositories.
KNOWN_OA_PREFIXES = (
    "10.31234/",  # PsyArXiv
    "10.31219/",  # OSF Preprints
    "10.31222/",  # MetaArXiv
    "10.31235/",  # SocArXiv
    "10.31217/",  # EarthArXiv / OSF
    "10.17605/",  # OSF Projects & Data
    "10.1101/",   # bioRxiv / medRxiv
    "10.48550/",  # arXiv
    "10.5281/",   # Zenodo
    "10.6084/",   # Figshare
)

DOMAIN_HOSTS = (
    ("psyarxiv.com", "PsyArXiv"),
    ("osf.io/preprints/psyarxiv", "PsyArXiv"),
    ("osf.io/preprints/metaarxiv", "MetaArXiv"),
    ("osf.io/preprints/socarxiv", "SocArXiv"),
    ("osf.io", "OSF"),
    ("pmc.ncbi.nlm.nih.gov", "PubMed Central"),
    ("ncbi.nlm.nih.gov/pmc", "PubMed Central"),
    ("europepmc.org", "Europe PMC"),
    ("arxiv.org", "arXiv"),
    ("biorxiv.org", "bioRxiv"),
    ("medrxiv.org", "medRxiv"),
    ("zenodo.org", "Zenodo"),
    ("escholarship.org", "eScholarship"),
    ("hal.science", "HAL"),
    ("hal.archives-ouvertes.fr", "HAL"),
    ("researchgate.net", "ResearchGate"),
    ("ssrn.com", "SSRN"),
    ("philsci-archive.pitt.edu", "PhilSci-Archive"),
)


def normalise_doi(raw: str) -> str:
    doi = raw.strip()
    doi = re.sub(r"^https?://(?:dx\.)?doi\.org/", "", doi, flags=re.I)
    doi = doi.rstrip(".,;]")
    while doi.endswith(")") and doi.count(")") > doi.count("("):
        doi = doi[:-1]
    return doi.lower()


def extract_dois(text: str) -> set[str]:
    return {normalise_doi(m.group(0)) for m in DOI_RE.finditer(text)}


def collect_dois(root: Path) -> set[str]:
    dois: set[str] = set()
    lookup = root / "content" / "glossary" / "apa_lookup.json"
    if lookup.is_file():
        data = json.loads(lookup.read_text(encoding="utf-8"))
        for apa in data.values():
            if isinstance(apa, str):
                dois.update(extract_dois(apa))
    content_dir = root / "content"
    if content_dir.is_dir():
        for md in content_dir.rglob("*.md"):
            text = md.read_text(encoding="utf-8", errors="replace")
            if "local-references" not in text:
                continue
            for block in LOCAL_REFS_RE.findall(text):
                dois.update(extract_dois(block))
    return dois


def clean_host(raw_name: str | None, url: str | None) -> str:
    if url:
        low_url = url.lower()
        for needle, label in DOMAIN_HOSTS:
            if needle in low_url:
                return label
    name = (raw_name or "").strip()
    if not name:
        return ""
    # Drop duplicated or parenthetical qualifiers like "OSF Preprints (OSF Preprints)"
    # or "eScholarship (California Digital Library)".
    m = re.match(r"^([^(]{3,}?)\s*\([^)]+\)\s*$", name)
    if m:
        name = m.group(1).strip()
    if len(name) > 36:
        name = name[:35].rstrip() + "…"
    return name


def is_same_doi_url(url: str, doi: str) -> bool:
    return normalise_doi(url) == doi


def record_from_openalex(work: dict, today: str) -> tuple[str, dict] | None:
    raw_doi = work.get("doi") or ""
    if not raw_doi:
        return None
    doi = normalise_doi(raw_doi)
    oa = work.get("open_access") or {}
    status = (oa.get("oa_status") or "").lower()
    if status not in ("diamond", "gold", "hybrid", "bronze", "green", "closed"):
        status = "gold" if oa.get("is_oa") else "closed"
    if status == "closed" and doi.startswith(KNOWN_OA_PREFIXES):
        status = "gold"

    best = work.get("best_oa_location") or {}
    pdf_url = best.get("pdf_url") or ""
    landing_url = best.get("landing_page_url") or oa.get("oa_url") or ""
    chosen_url = pdf_url or landing_url
    is_pdf = bool(pdf_url)

    entry: dict = {"status": status, "checked": today}
    if status != "closed" and chosen_url.startswith(("http://", "https://")):
        if not is_same_doi_url(chosen_url, doi):
            entry["url"] = chosen_url
            if is_pdf:
                entry["pdf"] = True
        if status == "green":
            src = best.get("source") or {}
            host = clean_host(src.get("display_name"), chosen_url)
            if host:
                entry["host"] = host
    return doi, entry


def record_from_unpaywall(data: dict, doi: str, today: str) -> dict:
    status = (data.get("oa_status") or "closed").lower()
    if status not in ("diamond", "gold", "hybrid", "bronze", "green", "closed"):
        status = "gold" if data.get("is_oa") else "closed"
    if status == "closed" and doi.startswith(KNOWN_OA_PREFIXES):
        status = "gold"
    best = data.get("best_oa_location") or {}
    pdf_url = best.get("url_for_pdf") or ""
    landing_url = best.get("url_for_landing_page") or best.get("url") or ""
    chosen_url = pdf_url or landing_url
    is_pdf = bool(pdf_url)

    entry: dict = {"status": status, "checked": today}
    if status != "closed" and chosen_url.startswith(("http://", "https://")):
        if not is_same_doi_url(chosen_url, doi):
            entry["url"] = chosen_url
            if is_pdf:
                entry["pdf"] = True
        if status == "green":
            host = clean_host(best.get("repository_institution"), chosen_url)
            if host:
                entry["host"] = host
    return entry


def fetch_json(url: str, timeout: int = 25) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def query_openalex_batch(dois: list[str], today: str) -> dict[str, dict]:
    flt = "|".join(f"https://doi.org/{d}" for d in dois)
    url = (
        "https://api.openalex.org/works?"
        f"filter=doi:{urllib.parse.quote(flt, safe=':|/')}"
        f"&per-page={len(dois)}"
        "&select=doi,open_access,best_oa_location"
        f"&mailto={urllib.parse.quote(MAILTO)}"
    )
    data = fetch_json(url)
    found: dict[str, dict] = {}
    for work in data.get("results") or []:
        rec = record_from_openalex(work, today)
        if rec:
            found[rec[0]] = rec[1]
    return found


def query_unpaywall(doi: str, today: str) -> dict | None:
    url = f"https://api.unpaywall.org/v2/{urllib.parse.quote(doi, safe='')}?email={urllib.parse.quote(MAILTO)}"
    try:
        data = fetch_json(url, timeout=15)
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, ValueError):
        return None
    return record_from_unpaywall(data, doi, today)


def is_fresh(entry: dict, cutoff: date) -> bool:
    checked = entry.get("checked")
    if not isinstance(checked, str):
        return False
    try:
        return date.fromisoformat(checked) >= cutoff
    except ValueError:
        return False


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("."), help="Repository root")
    parser.add_argument("--output", type=Path, default=Path("data/citation_oa.json"))
    parser.add_argument("--refresh", action="store_true", help="Re-query cached entries")
    parser.add_argument("--max-age-days", type=int, default=90)
    parser.add_argument("--no-unpaywall", action="store_true", help="Skip Unpaywall fallback")
    args = parser.parse_args(argv)

    root = args.root.resolve()
    out_path = args.output if args.output.is_absolute() else root / args.output
    today_date = date.today()
    today = today_date.isoformat()
    cutoff = today_date - timedelta(days=args.max_age_days)

    existing: dict[str, dict] = {}
    if out_path.is_file():
        try:
            existing = json.loads(out_path.read_text(encoding="utf-8"))
        except ValueError:
            existing = {}

    dois = sorted(collect_dois(root))
    to_query = [
        d for d in dois
        if args.refresh or d not in existing or not is_fresh(existing[d], cutoff)
    ]

    updated: dict[str, dict] = {d: existing[d] for d in dois if d in existing}
    unresolved: list[str] = []

    for i in range(0, len(to_query), OPENALEX_BATCH):
        batch = to_query[i : i + OPENALEX_BATCH]
        try:
            found = query_openalex_batch(batch, today)
            updated.update(found)
            unresolved.extend(d for d in batch if d not in found)
        except Exception as err:
            print(f"Warning: OpenAlex batch {i // OPENALEX_BATCH + 1} failed: {err}", file=sys.stderr)
            unresolved.extend(batch)

    fallback_hits = 0
    for d in unresolved:
        if d.startswith(KNOWN_OA_PREFIXES):
            updated[d] = {"status": "gold", "checked": today}
            fallback_hits += 1
            continue
        if not args.no_unpaywall:
            rec = query_unpaywall(d, today)
            if rec:
                updated[d] = rec
                fallback_hits += 1

    dois_set = set(dois)
    ordered = {k: updated[k] for k in sorted(updated) if k in dois_set}
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(ordered, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    counts: dict[str, int] = {}
    for v in ordered.values():
        counts[v["status"]] = counts.get(v["status"], 0) + 1
    print(
        f"Enriched {len(ordered)}/{len(dois)} DOIs "
        f"(queried {len(to_query)}, fallback {fallback_hits}): {counts}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
