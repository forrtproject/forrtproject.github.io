#!/usr/bin/env python3
"""Compare a redesign build with a reference build, made from the same data.

Run: python3 scripts/rebrand/compare_builds.py <reference-dir> <candidate-dir>

Fails if an address changes (a page, feed, sitemap or data file appears or goes),
if a structured-data count falls, or if a page's SEO tags change (except same-image
WebP-to-PNG/JPEG social derivatives and their size/type tags). New assets such as
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
from urllib.parse import unquote, urlsplit

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


def _without_edit_date(tags):
    return [re.sub(r'"dateModified":\s*"[^"]*",?', "", tag) for tag in tags if not tag.startswith("article:modified_time")]


def _social_derivative(original, derivative):
    """A format-only Hugo derivative of the same WebP, including static imports."""
    before, after = urlsplit(original), urlsplit(derivative)
    if (before.scheme, before.netloc, before.query, before.fragment) != (after.scheme, after.netloc, after.query, after.fragment):
        return False
    if not before.path.lower().endswith(".webp") or not after.path.lower().endswith((".png", ".jpg", ".jpeg")):
        return False
    if not re.search(r"_hu_?[0-9a-f]{8,}$", os.path.splitext(unquote(after.path))[0]):
        return False
    # Hugo retains the source basename and adds a processing hash. Static sources
    # enter the pipeline under social/; preview prefixes and all other path parts stay.
    def stem(path):
        return re.sub(r"_hu_?[0-9a-f]{8,}$", "", unquote(os.path.splitext(path)[0]))

    source, target = stem(before.path), stem(after.path)
    return target == source or target.replace("/social/", "/", 1) == source


def _equivalent_social_images(before, after):
    """Normalize only recognized WebP conversions and their size/type companions.

    Alt text, every other tag, and PNG/JPEG-to-PNG/JPEG changes still compare exactly.
    Duplicate image tags are deliberately left for the ordinary comparison.
    """
    for key in ("og:image", "twitter:image"):
        old = [tag[len(key) + 1:] for tag in before if tag.startswith(key + "=")]
        new = [tag[len(key) + 1:] for tag in after if tag.startswith(key + "=")]
        if len(old) != 1 or len(new) != 1 or not _social_derivative(old[0], new[0]):
            continue
        companions = {key + ":" + name for name in ("width", "height", "type")}
        old_keys = [tag.partition("=")[0] for tag in before if tag.partition("=")[0] in companions]
        new_keys = [tag.partition("=")[0] for tag in after if tag.partition("=")[0] in companions]
        # Open Graph needs all three fields. Twitter emits none, but any supplied
        # companions must remain present exactly once on both sides.
        if (sorted(old_keys) != sorted(new_keys) or len(set(old_keys)) != len(old_keys)
                or (key == "og:image" and set(old_keys) != companions)):
            continue
        before = [tag for tag in before if tag.partition("=")[0] not in companions]
        after = [key + "=" + old[0] if tag.startswith(key + "=") else tag
                 for tag in after if tag.partition("=")[0] not in companions]
    return before, after


def compare_heads(reference, candidate, allowed=frozenset()):
    """Return {path: (only_before, only_after)} for pages whose SEO tags differ."""
    changes = {}
    for path, tags in reference.items():
        if path not in candidate or is_allowed(path, allowed):
            continue
        # A page's modified date follows its last edit, which is the sitemap check's concern.
        before = _without_edit_date(tags)
        after = _without_edit_date(candidate[path])
        before, after = _equivalent_social_images(before, after)
        if before != after:
            before, after = set(before), set(after)
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
