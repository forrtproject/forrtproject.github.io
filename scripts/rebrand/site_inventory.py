#!/usr/bin/env python3
"""Describe a built site: its output paths, structured data and SEO head tags.

Run: python3 scripts/rebrand/site_inventory.py public --out scripts/rebrand/baseline

Writes paths.txt (every output file), structured_data.json (JSON-LD records by
type and template group) and seo_heads.json (a digest of each page's SEO tags).
compare_builds.py compares two of these. Importing this module gives the same data
without writing files.
"""

import argparse
import hashlib
import json
import os
import re
import sys
from collections import Counter, defaultdict
from html.parser import HTMLParser

# Build-specific names: Hugo's processed-image hashes and fingerprinted bundles.
_HASHES = [
    (re.compile(r"_hu_?[0-9a-f]{8,}(?=[._])"), "_hu"),
    (re.compile(r"\.[0-9a-f]{32,64}(?=\.(?:css|js)$)"), ".FINGERPRINT"),
]
# File types that are addresses people or crawlers use, not build assets.
PAGE_SUFFIXES = (".html", ".xml", ".json", ".webmanifest", ".txt")
_LD_JSON = re.compile(
    r"<script[^>]*type=[\"']?application/ld\+json[\"']?[^>]*>(.*?)</script>", re.S
)
_REDIRECT = re.compile(r"<meta[^>]+http-equiv=[\"']?refresh", re.I)


def normalise_path(path):
    for pattern, replacement in _HASHES:
        path = pattern.sub(replacement, path)
    return path


def list_paths(root):
    paths = []
    for directory, _, files in os.walk(root):
        for name in files:
            full = os.path.join(directory, name)
            rel = os.path.relpath(full, root).replace(os.sep, "/")
            if rel in ("CNAME", ".nojekyll") or rel.endswith(".gitkeep"):
                continue
            paths.append(rel)
    return sorted(paths)


def template_group(path, text=""):
    """The template family that produced a page, as far as its path and text show.

    Follows the groups in the migration plan's inventory. Widget and plain pages
    share no path pattern, so they fall into "section or plain page".
    """
    if text and _REDIRECT.search(text[:2000]):
        return "redirect stub"
    parts = path.split("/")[:-1]
    if not parts:
        return {"index.html": "home", "404.html": "404"}.get(path, "standalone")
    head, depth = parts[0], len(parts)
    if "page" in parts and parts[-2:-1] == ["page"]:
        return "generated list"
    if head == "curated_resources":
        return "resource detail" if depth == 2 else "generated list"
    if head == "glossary":
        if depth >= 3 or parts[1:] == ["references"]:
            return "glossary term"
        return "glossary list"
    if head == "authors":
        return "author profile"
    if head in ("clusters", "disciplines"):
        return "clusters and disciplines"
    if head in ("forrt_clusters", "category", "categories", "publication_types"):
        return "generated list"
    if head == "tags":
        return "tags browser"
    if head in ("post", "educators-corner", "pedagogies", "nowherelab", "newsletters"):
        return "article" if depth >= 2 else "news and section list"
    if head == "summaries":
        return "summaries"
    if head in ("admin", "apps", "explorer", "annotator", "awop_app", "partials", "js",
                "open-research-games-portal"):
        return "standalone"
    return "section or plain page"


def _ld_types(node):
    if isinstance(node, list):
        for item in node:
            yield from _ld_types(item)
    elif isinstance(node, dict):
        if "@graph" in node:
            yield from _ld_types(node["@graph"])
        elif "@type" in node:
            kind = node["@type"]
            yield kind if isinstance(kind, str) else "+".join(kind)


class _HeadParser(HTMLParser):
    """Collects the tags that search engines and link previews read."""

    KEEP_META = re.compile(r"^(description|robots|og:|twitter:|article:|keywords)")

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.title = []
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self._in_title = True
        elif tag == "meta":
            key = attrs.get("property") or attrs.get("name") or ""
            if self.KEEP_META.match(key):
                self.tags.append(f"{key}={attrs.get('content', '')}")
        elif tag == "link" and attrs.get("rel") in ("canonical", "alternate"):
            if attrs.get("rel") == "canonical" or "hreflang" in attrs or "type" in attrs:
                self.tags.append(
                    f"{attrs.get('rel')}:{attrs.get('hreflang', attrs.get('type', ''))}"
                    f"={attrs.get('href', '')}"
                )

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title.append(data)


def seo_head(text):
    """The sorted SEO tags from a page's head, plus each JSON-LD block."""
    head = text.split("</head>", 1)[0]
    parser = _HeadParser()
    parser.feed(re.sub(r"<script.*?</script>", "", head, flags=re.S))
    tags = sorted(parser.tags)
    tags.append("title=" + "".join(parser.title).strip())
    tags.extend(sorted(_LD_JSON.findall(text)))
    return tags


def inventory(root, skip=None):
    """Paths, JSON-LD counts by template group, and per-page SEO tags. `skip` leaves pages out of the
    counts, for agreed removals."""
    paths = list_paths(root)
    structured = defaultdict(Counter)
    heads = {}
    bad_json = []
    for path in paths:
        if not path.endswith(".html") or (skip and skip(path)):
            continue
        with open(os.path.join(root, path), encoding="utf-8", errors="replace") as handle:
            text = handle.read()
        group = template_group(path, text)
        structured[group]["pages"] += 1
        for block in _LD_JSON.findall(text):
            try:
                data = json.loads(block)
            except ValueError:
                bad_json.append(path)
                continue
            structured[group].update(_ld_types(data))
        if group not in ("redirect stub", "standalone"):
            heads[path] = seo_head(text)
    return {
        "paths": paths,
        "structured_data": {key: dict(value) for key, value in sorted(structured.items())},
        "seo_heads": heads,
        "invalid_json_ld": bad_json,
    }


def digest(tags):
    return hashlib.sha256("\n".join(tags).encode("utf-8")).hexdigest()[:16]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public", help="built site directory")
    parser.add_argument("--out", required=True, help="directory for the inventory files")
    args = parser.parse_args()

    data = inventory(args.public)
    os.makedirs(args.out, exist_ok=True)
    with open(os.path.join(args.out, "paths.txt"), "w", encoding="utf-8") as handle:
        handle.write("\n".join(normalise_path(path) for path in data["paths"]) + "\n")
    with open(os.path.join(args.out, "structured_data.json"), "w", encoding="utf-8") as handle:
        json.dump(data["structured_data"], handle, indent=1, sort_keys=True)
        handle.write("\n")
    with open(os.path.join(args.out, "seo_heads.json"), "w", encoding="utf-8") as handle:
        json.dump({path: digest(tags) for path, tags in data["seo_heads"].items()}, handle,
                  indent=0, sort_keys=True, ensure_ascii=False)
        handle.write("\n")
    print(f"{len(data['paths'])} files; {sum(g['pages'] for g in data['structured_data'].values())} HTML")
    if data["invalid_json_ld"]:
        print(f"Invalid JSON-LD on {len(data['invalid_json_ld'])} pages", file=sys.stderr)


if __name__ == "__main__":
    main()
