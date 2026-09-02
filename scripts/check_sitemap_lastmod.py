#!/usr/bin/env python3
"""Check that sitemap.xml carries a plausible <lastmod> for every URL.

Two levels of checking:

* Structural (always): counts URLs without <lastmod> (grouped by the first path
  segment) and lists the most widely shared timestamps. A timestamp on more
  than --max-bulk-share of all URLs fails the check: that is the signature of
  every page being stamped with the build or checkout time. Smaller blocks are
  reported but tolerated, since one commit can legitimately touch a whole
  generated collection.

  Do not lower --max-bulk-share below 0.5 hoping to catch a stale block: the
  two generated collections are 47% (curated_resources) and 41% (glossary) of
  the site, and regenerating either in one commit produces exactly the same
  shape as the bug. This check only catches a *site-wide* stamp; a single
  collection frozen on a stale date is caught by the generators writing their
  own `lastmod` and by --compare-source verifying it reaches the sitemap.
* Source comparison (--compare-source): rebuilds the expected lastmod for each
  page from the repository -- explicit front-matter `lastmod`, else the Git
  commit date of the source file -- and reports disagreements. Needs `hugo`
  and the full Git history.

Usage:
    python3 scripts/check_sitemap_lastmod.py public/sitemap.xml
    python3 scripts/check_sitemap_lastmod.py https://forrt.org/sitemap.xml
    python3 scripts/check_sitemap_lastmod.py public/sitemap.xml --compare-source

Exits non-zero when a check fails, so it can gate a build.
"""

import argparse
import csv
import io
import json
import random
import re
import subprocess
import sys
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

REPO = Path(__file__).resolve().parents[1]
SM_NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
YAML_FIELD = r"^{key}:\s*[\"']?([^\"'\n#]+)"


def load_sitemap(source):
    """Return [(loc, lastmod_or_None)] from a local path or an http(s) URL."""
    if source.startswith(("http://", "https://")):
        with urllib.request.urlopen(source, timeout=60) as response:
            data = response.read()
    else:
        data = Path(source).read_bytes()
    root = ET.fromstring(data)
    entries = []
    for url in root.iter(SM_NS + "url"):
        loc = url.findtext(SM_NS + "loc") or ""
        lastmod = url.findtext(SM_NS + "lastmod")
        entries.append((loc.strip(), (lastmod or "").strip() or None))
    return entries


def section_of(loc):
    path = urlparse(loc).path.strip("/")
    return path.split("/")[0] if path else "(home)"


def to_instant(value):
    """Parse an ISO date or datetime into an aware datetime, or None."""
    if not value:
        return None
    text = value.strip().replace("Z", "+00:00")
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        return None
    return parsed.replace(tzinfo=timezone.utc) if parsed.tzinfo is None else parsed


def check_structure(entries, max_missing, max_bulk_share):
    total = len(entries)
    print(f"URLs in sitemap: {total}")
    if not total:
        return False

    missing = [loc for loc, lastmod in entries if lastmod is None]
    print(f"\nURLs without <lastmod>: {len(missing)} (limit {max_missing})")
    by_section = defaultdict(list)
    for loc in missing:
        by_section[section_of(loc)].append(loc)
    for name, locs in sorted(by_section.items(), key=lambda kv: -len(kv[1])):
        print(f"  {name}: {len(locs)}  e.g. {', '.join(locs[:3])}")

    counts = Counter(lastmod for _, lastmod in entries if lastmod)
    limit = max_bulk_share * total
    bulk = [(stamp, n) for stamp, n in counts.most_common() if n > limit]
    print(f"\nMost widely shared timestamps (fail above {max_bulk_share:.0%} of URLs):")
    # Every offender is printed, not just the leaders: a block ranked below the
    # top few can still fail the check, and a silent failure is unactionable.
    for stamp, n in dict.fromkeys(counts.most_common(3) + bulk):
        sections = Counter(
            section_of(loc) for loc, lastmod in entries if lastmod == stamp
        )
        where = ", ".join(f"{name} ({c})" for name, c in sections.most_common(3))
        flag = "  <-- FAILS" if n > limit else ""
        print(f"  {stamp}: {n} URLs -- {where}{flag}")

    return len(missing) <= max_missing and not bulk


def hugo_pages():
    """Map URL path -> source path for every regular page, via `hugo list all`."""
    result = subprocess.run(
        ["hugo", "list", "all"],
        cwd=REPO,
        capture_output=True,
        text=True,
        check=True,
    )
    pages = {}
    for row in csv.DictReader(io.StringIO(result.stdout)):
        if row.get("kind") != "page":
            continue
        pages[urlparse(row["permalink"]).path] = row["path"]
    return pages


def front_matter_field(path, key):
    """Value of a front-matter `key` (JSON or YAML front matter), or None."""
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return None
    stripped = text.lstrip()
    if stripped.startswith("{"):
        try:
            data, _ = json.JSONDecoder().raw_decode(stripped)
        except ValueError:
            return None
        value = data.get(key) if isinstance(data, dict) else None
        return str(value) if value else None
    if stripped.startswith("---"):
        end = stripped.find("\n---", 3)
        head = stripped[:end] if end > 0 else stripped
        match = re.search(YAML_FIELD.format(key=key), head, re.MULTILINE)
        return match.group(1).strip() if match else None
    return None


def git_dates(rel_path):
    """(author date, committer date) of the last commit touching the file."""
    result = subprocess.run(
        ["git", "-c", "core.quotepath=false", "log", "-1", "--format=%aI\t%cI",
         "--", rel_path],
        cwd=REPO,
        capture_output=True,
        text=True,
    )
    parts = result.stdout.strip().split("\t")
    return tuple(to_instant(p) for p in parts) if len(parts) == 2 else (None, None)


def check_against_source(entries, sample_size):
    pages = hugo_pages()
    candidates = sorted(
        (loc, lastmod) for loc, lastmod in entries
        if urlparse(loc).path in pages
    )
    print(f"\nSitemap URLs matching a regular page: {len(candidates)}")
    if not candidates:
        print("No sitemap URL maps to a page: `hugo list all` output not usable")
        return False
    if sample_size and sample_size < len(candidates):
        # Seeded on the date so a run is reproducible while the sample rotates
        # between deploys: a fixed seed would check the same few hundred pages
        # forever and never look at the rest of the site.
        seed = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        candidates = random.Random(seed).sample(candidates, sample_size)
        print(f"Checking a random sample of {len(candidates)} (seed {seed})")

    mismatches = []
    for loc, lastmod in candidates:
        # Mirrors the Hugo `[frontmatter] lastmod` order: lastmod, then Git,
        # then date (files overlaid from a build artifact have no Git history).
        rel = pages[urlparse(loc).path]
        explicit = front_matter_field(REPO / rel, "lastmod")
        if explicit:
            expected_raw = explicit
            alternatives = [to_instant(explicit)]
        else:
            author, committer = git_dates(rel)
            if author:
                expected_raw = author.isoformat()
                alternatives = [author, committer]
            else:
                expected_raw = front_matter_field(REPO / rel, "date")
                alternatives = [to_instant(expected_raw)]
        alternatives = [d for d in alternatives if d]
        actual = to_instant(lastmod)
        if actual and any(abs((actual - d).total_seconds()) <= 1 for d in alternatives):
            continue
        mismatches.append((loc, lastmod, expected_raw, rel))

    print(f"Mismatches: {len(mismatches)} of {len(candidates)} checked")
    for loc, lastmod, expected_raw, rel in mismatches:
        print(f"  {loc}\n    sitemap={lastmod}  expected={expected_raw}  source={rel}")
    return not mismatches


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("sitemap", nargs="?", default="public/sitemap.xml")
    parser.add_argument("--max-missing", type=int, default=5,
                        help="tolerated URLs without lastmod (default: 5)")
    parser.add_argument("--max-bulk-share", type=float, default=0.5,
                        help="max share of URLs sharing one timestamp (default: 0.5)")
    parser.add_argument("--compare-source", action="store_true",
                        help="also rebuild expected dates from the repository")
    parser.add_argument("--sample", type=int, default=300,
                        help="pages to compare, 0 for all (default: 300)")
    args = parser.parse_args()

    entries = load_sitemap(args.sitemap)
    ok = check_structure(entries, args.max_missing, args.max_bulk_share)
    if args.compare_source:
        ok = check_against_source(entries, args.sample) and ok
    print("\nOK" if ok else "\nFAILED")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
