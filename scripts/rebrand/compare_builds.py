#!/usr/bin/env python3
"""Compare a redesign build with a reference build, made from the same data.

Run: python3 scripts/rebrand/compare_builds.py <reference-dir> <candidate-dir>

Fails if an address changes (a page, feed, sitemap or data file appears or goes),
if a structured-data count falls, or if a page's SEO tags change. New assets such as
fonts and bundles are listed and allowed. Agreed exceptions go in allowed_changes.txt
beside this script, one normalised path or glob per line, with a comment saying why. A glob
suits a collection whose size changes with the data, such as numbered pages.

Pass --paths-only to compare against a stored paths.txt from the baseline instead of a
build. Generated collections keep changing, so this is for records and local checks.
"""

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from site_inventory import PAGE_SUFFIXES, inventory, normalise_path  # noqa: E402

MAX_LISTED = 40
HERE = os.path.dirname(os.path.abspath(__file__))


def load_allowed(path=os.path.join(HERE, "allowed_changes.txt")):
    if not os.path.exists(path):
        return set()
    with open(path, encoding="utf-8") as handle:
        lines = (line.split("#", 1)[0].strip() for line in handle)
        return {line for line in lines if line}


def is_allowed(path, allowed):
    """Exact paths and globs. `*` stops at a slash, so a glob cannot hide a deeper route."""
    return path in allowed or any(
        re.fullmatch(re.escape(pattern).replace(r"\*", "[^/]*"), path) for pattern in allowed if "*" in pattern
    )


def compare_paths(reference, candidate, allowed=frozenset()):
    """Return (removed, added_addresses, added_assets) as sorted lists."""
    before = {normalise_path(path) for path in reference}
    after = {normalise_path(path) for path in candidate}
    removed = sorted(path for path in before - after if not is_allowed(path, allowed))
    added = sorted(path for path in after - before if not is_allowed(path, allowed))
    addresses = [path for path in added if path.endswith(PAGE_SUFFIXES)]
    assets = [path for path in added if not path.endswith(PAGE_SUFFIXES)]
    return removed, addresses, assets


def compare_structured(reference, candidate):
    """Return a list of (group, type, before, after) where a count fell."""
    drops = []
    for group, counts in reference.items():
        for kind, count in counts.items():
            now = candidate.get(group, {}).get(kind, 0)
            if now < count:
                drops.append((group, kind, count, now))
    return drops


def compare_heads(reference, candidate, allowed=frozenset()):
    """Return {path: (only_before, only_after)} for pages whose SEO tags differ."""
    changes = {}
    for path, tags in reference.items():
        if path not in candidate or is_allowed(path, allowed):
            continue
        if tags != candidate[path]:
            before, after = set(tags), set(candidate[path])
            changes[path] = (sorted(before - after), sorted(after - before))
    return changes


def _show(title, items):
    print(f"\n{title}: {len(items)}")
    for item in items[:MAX_LISTED]:
        print(f"  {item}")
    if len(items) > MAX_LISTED:
        print(f"  ... and {len(items) - MAX_LISTED} more")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("reference", help="reference build, or paths.txt with --paths-only")
    parser.add_argument("candidate", help="redesign build")
    parser.add_argument("--paths-only", action="store_true")
    args = parser.parse_args()

    allowed = load_allowed()
    # Agreed exceptions do not count towards structured data on either side.
    skip = lambda path: is_allowed(path, allowed)  # noqa: E731
    candidate = inventory(args.candidate, skip)
    if args.paths_only:
        with open(args.reference, encoding="utf-8") as handle:
            reference = {"paths": handle.read().split("\n"), "structured_data": {}, "seo_heads": {}}
        reference["paths"] = [path for path in reference["paths"] if path]
    else:
        reference = inventory(args.reference, skip)

    removed, addresses, assets = compare_paths(reference["paths"], candidate["paths"], allowed)
    drops = compare_structured(reference["structured_data"], candidate["structured_data"])
    heads = compare_heads(reference["seo_heads"], candidate["seo_heads"], allowed)

    print(f"Reference: {len(reference['paths'])} files. Candidate: {len(candidate['paths'])} files.")
    _show("Removed paths", removed)
    _show("Added addresses", addresses)
    _show("Added assets (allowed)", assets)
    _show("Structured-data counts that fell", [f"{g} / {k}: {a} -> {b}" for g, k, a, b in drops])
    _show("Invalid JSON-LD", candidate["invalid_json_ld"])
    _show("Pages whose SEO tags changed", sorted(heads))
    for path in sorted(heads)[:5]:
        only_before, only_after = heads[path]
        print(f"\n  {path}")
        for tag in only_before[:6]:
            print(f"    - {tag[:160]}")
        for tag in only_after[:6]:
            print(f"    + {tag[:160]}")

    failed = removed or addresses or drops or heads or candidate["invalid_json_ld"]
    print("\nFAILED" if failed else "\nOK: the URL list, structured data and SEO tags match.")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
