#!/usr/bin/env python3
"""Regression checks on the built Hugo HTML in a public/ directory.

Run: python3 scripts/check_seo_html.py public

Hard checks (exit 1 if any fails):
  1. No page carries an <h1> whose text is exactly "Search".
  2. The homepage loads no Mermaid or highlight.js script or stylesheet.
  3. highlight.min.js is loaded exactly on pages with a <pre><code> block in
     their content (the cite modal's <code class="tex hljs"> on every page does
     not count; language-mermaid blocks belong to Mermaid), and mermaid.min.js
     exactly on pages with a language-mermaid block.
  4. Every <img> carries an alt attribute (a bare `alt` counts as present).
  5. Every homepage <img> carries both width and height, so the browser reserves
     its box before the file loads (#869).
  8. Every curated-resource page carries exactly one LearningResource JSON-LD
     block that parses, has a name, url and provider, and holds no empty or
     placeholder values (#863). Every JSON-LD block on those pages must parse.

Report-only sections (never fail): pages with zero or several <h1>, and the
site-wide share of images that carry both width and height.
"""

import json
import os
import sys
from html.parser import HTMLParser

MAX_LISTED = 20
PLACEHOLDERS = {"", "-", "na", "n/a", "n.a.", "none", "other", "anon"}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.h1_texts = []
        self.urls = []
        self.imgs = []
        self.code_classes = []
        self._in_pre = False
        self._h1_depth = 0
        self._h1_buffer = []
        self.jsonld = []
        self._in_jsonld = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "h1":
            self._h1_depth += 1
        elif tag in ("script", "link"):
            if tag == "script" and attrs.get("type") == "application/ld+json":
                self._in_jsonld = True
                self.jsonld.append("")
            url = attrs.get("src") or attrs.get("href")
            if url:
                self.urls.append(url)
        elif tag == "img":
            self.imgs.append(attrs)
        elif tag == "pre":
            self._in_pre = True
        elif tag == "code" and self._in_pre:
            self.code_classes.append(attrs.get("class") or "")

    def handle_endtag(self, tag):
        if tag == "pre":
            self._in_pre = False
        if tag == "script":
            self._in_jsonld = False
        if tag == "h1" and self._h1_depth > 0:
            self._h1_depth -= 1
            if self._h1_depth == 0:
                self.h1_texts.append("".join(self._h1_buffer).strip())
                self._h1_buffer = []

    def handle_data(self, data):
        if self._in_jsonld:
            self.jsonld[-1] += data
        if self._h1_depth > 0:
            self._h1_buffer.append(data)


class Page:
    def __init__(self, path, parser):
        self.path = path
        self.h1_texts = parser.h1_texts
        self.urls = parser.urls
        self.imgs = parser.imgs
        self.code_blocks = [cls.split() for cls in parser.code_classes]
        self.jsonld = parser.jsonld

    def loads(self, needle):
        return any(needle in url for url in self.urls)

    @property
    def has_highlight_code(self):
        return any("hljs" not in cls and "language-mermaid" not in cls
                   for cls in self.code_blocks)

    @property
    def has_mermaid_code(self):
        return any("language-mermaid" in cls for cls in self.code_blocks)

    @property
    def imgs_without_alt(self):
        return [img for img in self.imgs if "alt" not in img]

    @property
    def imgs_without_dims(self):
        return [img for img in self.imgs
                if "width" not in img or "height" not in img]


def load_pages(public_dir):
    pages = []
    for root, _dirs, files in os.walk(public_dir):
        for name in files:
            if name != "index.html":
                continue
            full = os.path.join(root, name)
            parser = PageParser()
            with open(full, encoding="utf-8", errors="replace") as handle:
                parser.feed(handle.read())
            pages.append(Page(os.path.relpath(full, public_dir), parser))
    pages.sort(key=lambda page: page.path)
    return pages


def check_no_search_heading(pages):
    return [p.path for p in pages if any(t.lower() == "search" for t in p.h1_texts)]


def check_homepage_assets(home):
    if home is None:
        return ["index.html (homepage not found)"]
    bad = [u for u in home.urls if "mermaid" in u or "highlight.js" in u or "highlight.min.js" in u]
    return sorted(set(bad))


def check_conditional_assets(pages):
    return {
        "highlight.min.js loaded without a code block":
            [p.path for p in pages if p.loads("highlight.min.js") and not p.has_highlight_code],
        "code block without highlight.min.js":
            [p.path for p in pages if p.has_highlight_code and not p.loads("highlight.min.js")],
        "mermaid.min.js loaded without a language-mermaid block":
            [p.path for p in pages if p.loads("mermaid.min.js") and not p.has_mermaid_code],
        "language-mermaid block without mermaid.min.js":
            [p.path for p in pages if p.has_mermaid_code and not p.loads("mermaid.min.js")],
    }


def check_homepage_img_dims(home):
    if home is None:
        return ["index.html (homepage not found)"]
    return [img.get("src", "(no src)") for img in home.imgs_without_dims]


def check_img_alt(pages):
    return ["%s (%d image(s))" % (p.path, len(p.imgs_without_alt))
            for p in pages if p.imgs_without_alt]


def empty_values(node, path="$"):
    """Paths of empty strings, lists or objects and placeholder strings."""
    if node is None or node == "" or node == [] or node == {}:
        return [path]
    if isinstance(node, dict):
        return [p for k, v in node.items() for p in empty_values(v, "%s.%s" % (path, k))]
    if isinstance(node, list):
        return [p for i, v in enumerate(node) for p in empty_values(v, "%s[%d]" % (path, i))]
    if isinstance(node, str) and node.strip().lower() in PLACEHOLDERS:
        return ["%s=%r" % (path, node)]
    return []


def check_learning_resource(pages):
    bad = []
    for p in pages:
        parts = p.path.split(os.sep)
        if len(parts) != 3 or parts[0] != "curated_resources":
            continue
        try:
            blocks = [json.loads(b) for b in p.jsonld]
        except ValueError as err:
            bad.append("%s (invalid JSON-LD: %s)" % (p.path, err))
            continue
        found = [b for b in blocks if isinstance(b, dict) and b.get("@type") == "LearningResource"]
        if len(found) != 1:
            bad.append("%s (%d LearningResource blocks)" % (p.path, len(found)))
            continue
        problems = ["missing " + k for k in ("name", "url", "provider") if k not in found[0]]
        problems += empty_values(found[0])
        if problems:
            bad.append("%s (%s)" % (p.path, ", ".join(problems[:3])))
    return bad


def print_items(title, items):
    print("  %s: %d" % (title, len(items)))
    for item in items[:MAX_LISTED]:
        print("      %s" % item)
    if len(items) > MAX_LISTED:
        print("      +%d more" % (len(items) - MAX_LISTED))


def main(public_dir):
    pages = load_pages(public_dir)
    home = next((p for p in pages if p.path == "index.html"), None)
    print("Checked %d pages under %s" % (len(pages), public_dir))

    results = {
        '1. no <h1>Search</h1>': check_no_search_heading(pages),
        "2. homepage free of mermaid/highlight.js assets": check_homepage_assets(home),
        "4. every <img> has an alt attribute": check_img_alt(pages),
        "5. every homepage <img> has width and height": check_homepage_img_dims(home),
        "8. curated resources carry one clean LearningResource": check_learning_resource(pages),
    }
    conditional = check_conditional_assets(pages)
    results["3. conditional highlight.js / mermaid loading"] = [
        item for items in conditional.values() for item in items]

    print("\nSummary")
    for title in sorted(results):
        print("  [%s] %s" % ("FAIL" if results[title] else "PASS", title))

    for title in sorted(results):
        if not results[title]:
            continue
        print("\nFAIL %s" % title)
        if title.startswith("3."):
            for reason, items in conditional.items():
                if items:
                    print_items(reason, items)
        else:
            # Check 5 lists offending image sources, every other check lists pages.
            print_items("images" if title.startswith("5.") else "pages", results[title])

    print("\nReport only (never fails)")
    print_items("pages with no <h1>", [p.path for p in pages if not p.h1_texts])
    print_items("pages with several <h1>", [p.path for p in pages if len(p.h1_texts) > 1])
    all_imgs = sum(len(p.imgs) for p in pages)
    unsized = sum(len(p.imgs_without_dims) for p in pages)
    if all_imgs:
        print("  images site-wide: %d, with width and height: %d (%.1f%%)"
              % (all_imgs, all_imgs - unsized, 100.0 * (all_imgs - unsized) / all_imgs))

    return 1 if any(results.values()) else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python3 scripts/check_seo_html.py <public_dir>")
    sys.exit(main(sys.argv[1]))
