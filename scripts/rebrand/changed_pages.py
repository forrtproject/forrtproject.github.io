#!/usr/bin/env python3
"""Compare built pages and CSS/JS, and select the browser check mode."""

import argparse
import hashlib
import json
import re
from pathlib import Path

FINGERPRINT = re.compile(r"\.(?:[0-9a-f]{128}|[0-9a-f]{96}|[0-9a-f]{64}|[0-9a-f]{32})(?=\.(?:css|js)\b)")
INTEGRITY = re.compile(r"""\s+integrity=(?:"[^"]*"|'[^']*'|[^\s>]+)""")


def normalize(html):
    def clean_tag(match):
        return INTEGRITY.sub("", FINGERPRINT.sub("", match[0]))

    return re.sub(r"<(?:link|script)\b[^>]*>", clean_tag, html)


def page_path(path):
    path = "/" + path.lstrip("/")
    return path[:-len("index.html")] if path.endswith("/index.html") else path


def inventory(root):
    pages, bundles = {}, {}
    for path in sorted(root.rglob("*")):
        suffix = path.suffix
        if suffix not in {".html", ".css", ".js"} or not path.is_file():
            continue
        relative = path.relative_to(root).as_posix()
        if suffix == ".html":
            pages[page_path(relative)] = hashlib.sha256(normalize(path.read_text(encoding="utf-8")).encode()).digest()
        else:
            bundles.setdefault(FINGERPRINT.sub("", relative), set()).add(hashlib.sha256(path.read_bytes()).digest())
    return pages, bundles


def compare(base, head):
    before, old_bundles = inventory(base)
    after, new_bundles = inventory(head)
    return {
        "changed": sorted(path for path in before.keys() & after.keys() if before[path] != after[path]),
        "added": sorted(after.keys() - before.keys()),
        "removed": sorted(before.keys() - after.keys()),
        "bundles_changed": old_bundles != new_bundles,
    }


def load_selection(path):
    if path is None:
        print("Check mode: full (all pages)")
        return "full", set()
    diff = json.loads(Path(path).read_text(encoding="utf-8"))
    live = set(diff["changed"]) | set(diff["added"])
    total = len(live) + len(diff["removed"])
    if diff.get("force_full") or total > 60:
        mode = "full"
    elif live:
        mode = "changed"
    elif diff["bundles_changed"]:
        mode = "core"
    else:
        mode = "none"
    print(f"Check mode: {mode}")
    for field in ("changed", "added", "removed"):
        print(f"{field.capitalize()} pages: {', '.join(diff[field]) or '(none)'}")
    if mode == "none":
        print("no changed pages")
    return mode, live


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base", type=Path, nargs="?")
    parser.add_argument("head", type=Path, nargs="?")
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--full", action="store_true")
    args = parser.parse_args()
    if args.full:
        diff = {"changed": [], "added": [], "removed": [], "bundles_changed": False, "force_full": True}
    else:
        if not all(path and (path / "index.html").is_file() for path in (args.base, args.head)):
            parser.error("base and head must each contain a built index.html")
        diff = compare(args.base, args.head)
    args.out.write_text(json.dumps(diff, indent=2) + "\n", encoding="utf-8")
    load_selection(args.out)


if __name__ == "__main__":
    main()
