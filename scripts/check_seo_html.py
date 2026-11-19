#!/usr/bin/env python3
"""Regression checks on the built Hugo HTML in a public/ directory.

Run: python3 scripts/check_seo_html.py public

Each hard check is one module in scripts/seo_checks/: its docstring says what it
checks (the first line is its summary title) and its `check(site)` returns the
failures, either a list of pages or {label: [items]}. The build fails (exit 1) if
any check returns a failure. To add a check, add a module there and its tests as
scripts/tests/test_seo_<module>.py; no other file needs to change.

Report-only sections (never fail): pages with no <h1>, the site-wide share of
images that carry both width and height, pages whose og:image is not a PNG or
JPEG, and indexable pages whose description repeats the homepage's, is shared
with another page, contains HTML markup as text, or contains a raw HTTP(S) URL or
forrt.org/ path (#987).
"""

import importlib
import re
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from seo_checks._site import is_share_format, load_site  # noqa: E402

CHECKS_DIR = Path(__file__).resolve().parent / "seo_checks"
MAX_LISTED = 20
# Markup that survived flattening, e.g. an indented HTML block rendered as code.
HTML_TAG = re.compile(r"</?[A-Za-z][A-Za-z0-9]*(\s[^<>]*)?/?>")
DESCRIPTION_URL = re.compile(r"https?://|\bforrt\.org/", re.I)


def load_checks():
    """Every module in seo_checks/ not starting with "_", sorted by name."""
    names = sorted(p.stem for p in CHECKS_DIR.glob("*.py") if not p.name.startswith("_"))
    if not names:
        raise SystemExit("No checks found in %s" % CHECKS_DIR)
    checks = []
    for name in names:
        module = importlib.import_module("seo_checks." + name)
        if not callable(getattr(module, "check", None)) or not (module.__doc__ or "").strip():
            raise SystemExit("seo_checks/%s.py needs a docstring and a check(site) function" % name)
        checks.append(module)
    return checks


def check_title(module):
    return "%s: %s" % (module.__name__.rsplit(".", 1)[-1], module.__doc__.strip().splitlines()[0])


def run_checks(site, checks):
    """[(title, {label: failing items})] for each check, in order."""
    results = []
    for module in checks:
        found = module.check(site)
        results.append((check_title(module), found if isinstance(found, dict) else {"pages": found}))
    return results


def description_urls(pages):
    return [p.path for p in pages
            if p.indexable and any(DESCRIPTION_URL.search(d) for d in p.descriptions)]


def description_report(pages, home):
    """Report-only: generic, duplicated and markup-containing descriptions on indexable pages."""
    described = [(p, p.descriptions[0].strip()) for p in pages
                 if p.indexable and p.descriptions and p.descriptions[0].strip()]
    generic = home.descriptions[0].strip() if home and home.descriptions else None
    print_items("indexable pages reusing the homepage description",
                [p.path for p, d in described if d == generic and p is not home])
    # Deliberately noindexed pages (empty author profiles) still show in shares
    # and should describe themselves rather than the site.
    print_items("noindexed pages reusing the homepage description",
                [p.path for p in pages if p.noindex and generic is not None
                 and any(d.strip() == generic for d in p.descriptions)])
    counts = Counter(d for _p, d in described)
    dup_pages = sorted(p.path for p, d in described if counts[d] > 1)
    dup_groups = sum(1 for n in counts.values() if n > 1)
    print_items("indexable pages sharing a description (%d distinct descriptions)"
                % dup_groups, dup_pages)
    print_items("descriptions containing HTML markup as text",
                [p.path for p, d in described if HTML_TAG.search(d)])


def print_items(title, items):
    print("  %s: %d" % (title, len(items)))
    for item in items[:MAX_LISTED]:
        print("      %s" % item)
    if len(items) > MAX_LISTED:
        print("      +%d more" % (len(items) - MAX_LISTED))


def main(public_dir, checks=None):
    site = load_site(public_dir)
    pages = site.pages
    print("Checked %d pages under %s" % (len(pages), public_dir))
    results = run_checks(site, load_checks() if checks is None else checks)

    print("\nSummary")
    for title, groups in results:
        print("  [%s] %s" % ("FAIL" if any(groups.values()) else "PASS", title))

    for title, groups in results:
        if any(groups.values()):
            print("\nFAIL %s" % title)
            for label, items in groups.items():
                if items:
                    print_items(label, items)

    print("\nReport only (never fails)")
    print_items("pages with no <h1>", [p.path for p in pages if not p.h1_texts])
    all_imgs = sum(len(p.imgs) for p in pages)
    unsized = sum(len(p.imgs_without_dims) for p in pages)
    if all_imgs:
        print("  images site-wide: %d, with width and height: %d (%.1f%%)"
              % (all_imgs, all_imgs - unsized, 100.0 * (all_imgs - unsized) / all_imgs))
    print_items("pages whose og:image is not PNG/JPEG",
                ["%s (%s)" % (p.path, p.meta["og:image"]) for p in pages
                 if p.meta.get("og:image") and not is_share_format(p.meta["og:image"])])
    print_items("pages whose meta description contains a raw URL", description_urls(pages))
    description_report(pages, site.home)

    return 1 if any(any(groups.values()) for _title, groups in results) else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python3 scripts/check_seo_html.py <public_dir>")
    sys.exit(main(sys.argv[1]))
