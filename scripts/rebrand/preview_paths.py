#!/usr/bin/env python3
"""Make a built site work from a subfolder, and keep search engines out of it.

Run after `hugo --baseURL https://forrt.org/rebrand-doors/`:
    python3 scripts/rebrand/preview_paths.py public --base /rebrand-doors/

Hugo prefixes what its own functions emit, but Markdown, shortcodes, static files and
hard-coded template paths say `/about/us`, which would land on the live site. This
prefixes those, along with absolute forrt.org links whose target exists in this build.
Links to sister sites stay as they are, because forrt.org/<name>/ is where they live.
Every HTML file also gets a noindex tag, including standalone pages Hugo did not template.
"""

import argparse
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from site_inventory import list_paths  # noqa: E402

ATTRIBUTES = r"(?:href|src|action|poster|data|source|data-[\w-]+)"
ROBOTS = re.compile(r"<meta[^>]+name=[\"']?robots[\"']?[^>]*noindex", re.I)
# Bundled libraries and apps carry their own paths and are not ours to change.
SKIP_JS = ("lib/", "js/vendor/", "admin/", "explorer/", "annotator/", "awop_app/",
           "open-research-games-portal/")


def load_sister_sites(path=os.path.join(HERE, "sister_sites.txt")):
    with open(path, encoding="utf-8") as handle:
        lines = (line.split("#", 1)[0].strip() for line in handle)
        return {line for line in lines if line}


def resolves(url_path, files):
    """Whether a root-relative path, without query or fragment, maps to a built file.

    GitHub Pages serves /x from x, x.html or x/index.html. Case matters there, so
    this looks the path up in the file list and never asks the filesystem.
    """
    path = re.split(r"[?#]", url_path, maxsplit=1)[0].strip("/")
    path = re.sub(r"%([0-9A-Fa-f]{2})", lambda m: chr(int(m.group(1), 16)), path)
    try:
        path = path.encode("latin-1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        pass
    if not path:
        return "index.html" in files
    return path in files or f"{path}.html" in files or f"{path}/index.html" in files


class Rewriter:
    def __init__(self, base, files, sister_sites):
        self.base = "/" + base.strip("/") + "/"
        self.files = files
        self.sisters = sister_sites
        self.tops = {path.split("/", 1)[0] for path in files}
        prefix = re.escape(self.base.strip("/"))
        not_rebased = rf"(?!/)(?!{prefix}(?:[/\"'\s>]|$))"
        self._attr = re.compile(rf"(?<![\w-])({ATTRIBUTES}=[\"']?)/{not_rebased}", re.I)
        self._absolute = re.compile(
            rf"(?<![\w-])({ATTRIBUTES}=[\"']?)https?://(?:www\.)?forrt\.org(/[^\"'\s>]*)?(?=[\"'\s>])",
            re.I,
        )
        self._climbing = re.compile(
            rf"(?<![\w-])({ATTRIBUTES}=[\"']?)((?:\./)?(?:\.\./)*\.\.(?:/|(?=[\"'\s>])))", re.I
        )
        self._srcset = re.compile(r"(?<![\w-])(srcset=)([\"'])(.*?)\2", re.I | re.S)
        self._css_url = re.compile(rf"(url\(\s*[\"']?)/{not_rebased}", re.I)
        self._script = re.compile(r"(<script\b[^>]*>)(.*?)(</script>)", re.I | re.S)
        self._js_literal = re.compile(rf"([\"'`])/{not_rebased}([\w.-]+)")

    def _attribute(self, match):
        rest = match.string[match.end():]
        path = re.match(r"[^\"'\s>]*", rest).group(0)
        top = re.split(r"[/?#]", path, maxsplit=1)[0]
        if top in self.sisters and top not in self.tops:
            return match.group(0)
        return f"{match.group(1)}{self.base}"

    def _absolute_link(self, match):
        path = match.group(2) or "/"
        if resolves(path, self.files):
            return f"{match.group(1)}{self.base}{path.lstrip('/')}"
        return match.group(0)

    def _climbs_out(self, depth):
        # At the domain root, the browser stops `../` at the root. In a subfolder it carries on
        # up to the live site, so keep anything that climbs past the top inside the preview.
        def replace(match):
            if match.group(2).count("..") <= depth:
                return match.group(0)
            rest = re.match(r"[^\"'\s>]*", match.string[match.end():]).group(0)
            top = re.split(r"[/?#]", rest, maxsplit=1)[0]
            # A sister site lives at the domain root, which is where this link already lands.
            if top in self.sisters and top not in self.tops:
                return match.group(0)
            return f"{match.group(1)}{self.base}"
        return replace

    def _srcset_value(self, match):
        candidates = []
        for candidate in match.group(3).split(","):
            stripped = candidate.strip()
            if stripped.startswith("/") and not stripped.startswith(("//", self.base)):
                stripped = self.base + stripped[1:]
            candidates.append(stripped)
        return f"{match.group(1)}{match.group(2)}{', '.join(candidates)}{match.group(2)}"

    def _js_path(self, match):
        # Only string literals naming something this build publishes at its root.
        if match.group(2) in self.tops:
            return f"{match.group(1)}{self.base}{match.group(2)}"
        return match.group(0)

    def javascript(self, text):
        return self._js_literal.sub(self._js_path, text)

    def css(self, text):
        return self._css_url.sub(lambda m: f"{m.group(1)}{self.base}", text)

    def _inline_script(self, match):
        if "ld+json" in match.group(1):
            return match.group(0)
        return match.group(1) + self.javascript(match.group(2)) + match.group(3)

    def html(self, text, is_404=False, depth=0):
        text = self._climbing.sub(self._climbs_out(depth), text)
        text = self._absolute.sub(self._absolute_link, text)
        text = self._attr.sub(self._attribute, text)
        text = self._srcset.sub(self._srcset_value, text)
        text = self.css(text)
        # The 404 script handles its own base: its regexes match paths, not links.
        if not is_404:
            text = self._script.sub(self._inline_script, text)
        if not ROBOTS.search(text):
            tag = '<meta name="robots" content="noindex, nofollow">'
            text, count = re.subn(r"(<head\b[^>]*>)", rf"\1{tag}", text, count=1, flags=re.I)
            if not count:
                text = tag + text
        return text


def rewrite_tree(root, base):
    all_files = list_paths(root)
    rewriter = Rewriter(base, set(all_files), load_sister_sites())
    changed = 0
    for path in all_files:
        if path.endswith(".html"):
            transform = lambda text, page=path: rewriter.html(text, page == "404.html", page.count("/"))
        elif path.endswith(".css"):
            transform = rewriter.css
        elif path.endswith(".js") and not path.startswith(SKIP_JS):
            transform = rewriter.javascript
        else:
            continue
        full = os.path.join(root, path)
        with open(full, encoding="utf-8", errors="surrogateescape", newline="") as handle:
            text = handle.read()
        updated = transform(text)
        if updated != text:
            with open(full, "w", encoding="utf-8", errors="surrogateescape", newline="") as handle:
                handle.write(updated)
            changed += 1
    return changed


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public", help="built site directory")
    parser.add_argument("--base", required=True, help="subfolder, for example /rebrand-doors/")
    args = parser.parse_args()
    print(f"Rewrote {rewrite_tree(args.public, args.base)} files for {args.base}")


if __name__ == "__main__":
    main()
