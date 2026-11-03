#!/usr/bin/env python3
"""Check that every internal link in a build maps to a file in that build.

Run: python3 scripts/rebrand/check_internal_links.py public [--base /rebrand-doors/]
     [--reference public-main]

Lychee excludes forrt.org, so nothing else covers these links. Links into sister sites
(sister_sites.txt) are allowed, and retired paths the 404 page redirects can be listed in
link_allowlist.txt. With --reference, only links broken here and not in the reference fail,
and older ones are listed for clean-up.
"""

import argparse
import os
import re
import sys
from collections import defaultdict
from urllib.parse import urljoin, urlsplit

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from preview_paths import load_sister_sites, resolves  # noqa: E402
from site_inventory import list_paths  # noqa: E402

MAX_LISTED = 40
_ATTR = re.compile(r"(?<![\w-])(?:href|src|action|poster)=(?:\"([^\"]*)\"|'([^']*)'|([^\s>]+))", re.I)
_OPAQUE = re.compile(r"<(script|style|template|textarea|pre|code)\b.*?</\1>", re.I | re.S)
_SKIP_SCHEMES = ("mailto:", "tel:", "javascript:", "data:", "#", "sms:", "blob:", "about:")
FORRT_HOSTS = ("forrt.org", "www.forrt.org")
# Standalone apps bring their own relative assets; templates and content are what we check.
SKIP_PAGES = ("js/vendor/", "lib/", "admin/", "partials/")


def load_allowlist(path=os.path.join(HERE, "link_allowlist.txt")):
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as handle:
        lines = (line.split("#", 1)[0].strip() for line in handle)
        return [re.compile(line) for line in lines if line]


def page_url(path, base):
    """The site-relative address a file is served from."""
    if path.endswith("/index.html"):
        path = path[: -len("index.html")]
    elif path == "index.html":
        path = ""
    return base + path


def extract_links(text):
    text = _OPAQUE.sub("", text)
    for match in _ATTR.finditer(text):
        value = match.group(1) or match.group(2) or match.group(3) or ""
        value = value.strip().replace("&amp;", "&")
        if value and not value.startswith(_SKIP_SCHEMES) and "{{" not in value and "${" not in value:
            yield value


def broken_target(link, page, base, files, sisters, allow):
    """Return the broken site path for a link, or None if it is fine or external."""
    absolute = urljoin("https://forrt.org" + page, link)
    parts = urlsplit(absolute)
    if parts.scheme not in ("http", "https") or parts.hostname not in FORRT_HOSTS:
        return None
    path = parts.path
    top = path.strip("/").split("/", 1)[0]
    if top in sisters and not (base != "/" and path.startswith(base)):
        return None
    if base != "/":
        # In a subfolder build, a link that leaves the subfolder lands on the live site.
        if not path.startswith(base):
            return path
        path = "/" + path[len(base):]
    if resolves(path, files) or any(pattern.search(path) for pattern in allow):
        return None
    return path


def find_broken(root, base="/"):
    files = set(list_paths(root))
    sisters = load_sister_sites()
    allow = load_allowlist()
    broken = defaultdict(set)
    for path in sorted(files):
        if not path.endswith(".html") or path.startswith(SKIP_PAGES):
            continue
        with open(os.path.join(root, path), encoding="utf-8", errors="replace") as handle:
            text = handle.read()
        page = page_url(path, base)
        for link in set(extract_links(text)):
            target = broken_target(link, page, base, files, sisters, allow)
            if target:
                broken[target].add(path)
    return broken


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public", help="built site directory")
    parser.add_argument("--base", default="/", help="subfolder the build is served from")
    parser.add_argument("--reference", help="build of main to separate old breakage from new")
    args = parser.parse_args()

    broken = find_broken(args.public, args.base)
    older = find_broken(args.reference, args.base) if args.reference else {}
    new = {target: pages for target, pages in broken.items() if target not in older}
    old = {target: pages for target, pages in broken.items() if target in older}

    print(f"Broken internal targets: {len(broken)} ({len(new)} new, {len(old)} also on main)")
    for label, group in (("New", new), ("Also on main", old)):
        if group:
            print(f"\n{label}:")
        for target in sorted(group)[:MAX_LISTED]:
            pages = sorted(group[target])
            print(f"  {target}  <- {pages[0]} ({len(pages)} page{'s' if len(pages) != 1 else ''})")
        if len(group) > MAX_LISTED:
            print(f"  ... and {len(group) - MAX_LISTED} more")
    sys.exit(1 if new else 0)


if __name__ == "__main__":
    main()
