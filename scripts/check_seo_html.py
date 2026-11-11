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
  6. The homepage share image (og:image, twitter:image) is a 1200x630 PNG or
     JPEG (per og:image:width/height), and twitter:card is summary_large_image.
     X and LinkedIn show no preview for WebP (#870).
  8. Every curated-resource page carries exactly one LearningResource JSON-LD
     block that parses, has a name and url, and holds no empty or placeholder
     values (#863). Every JSON-LD block on those pages must parse.
  7. Breadcrumb JSON-LD (#867): at most one BreadcrumbList per page; every
     itemListElement is a non-empty list of objects; every ListItem has a
     non-empty item URL; positions run 1..n; the page has a canonical link and
     the last item is that URL; no name repeats, except that the current page
     may share the root's name (an author or glossary term called "FORRT").
  9. Every indexable page (no robots noindex, not a meta-refresh redirect) has a
     non-empty meta description (#864).
  10. No meta description contains a double-escaped entity such as `&amp;ldquo;`
     (#864). Text that merely looks like an entity (`&name;`) is not one.
  11. The FLoRA page (replication-hub/flora/) shows the citation from
     static/data/fred_citation.txt with the OSF DOI, and the asterisks marking
     equal contribution are not rendered as emphasis.

Report-only sections (never fail): pages with zero or several <h1>, the
site-wide share of images that carry both width and height, pages whose
og:image is not a PNG or JPEG, and indexable pages whose description repeats
the homepage's, is shared with another page or contains HTML markup as text.
"""

import json
import os
import re
import sys
from collections import Counter
from html.entities import html5
from html.parser import HTMLParser
from urllib.parse import unquote, urlparse

MAX_LISTED = 20
# Markup that survived flattening, e.g. an indented HTML block rendered as code.
HTML_TAG = re.compile(r"</?[A-Za-z][A-Za-z0-9]*(\s[^<>]*)?/?>")
# Attribute values arrive already unescaped, so any entity left in them was
# escaped twice in the HTML (e.g. `&amp;ldquo;`).
LITERAL_ENTITY = re.compile(r"&(#\d+|#x[0-9a-fA-F]+|[A-Za-z][A-Za-z0-9]*);")


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.h1_texts = []
        self.urls = []
        self.imgs = []
        self.meta = {}
        self.code_classes = []
        self.metas = []
        self._in_pre = False
        self._h1_depth = 0
        self._h1_buffer = []
        self.jsonld = []
        self.canonical = None
        self._jsonld_buffer = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self._jsonld_buffer = []
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "h1":
            self._h1_depth += 1
        elif tag in ("script", "link"):
            url = attrs.get("src") or attrs.get("href")
            if url:
                self.urls.append(url)
        elif tag == "img":
            self.imgs.append(attrs)
        elif tag == "meta":
            self.metas.append(attrs)
            key = attrs.get("property") or attrs.get("name")
            if key and key not in self.meta:
                self.meta[key] = attrs.get("content") or ""
        elif tag == "pre":
            self._in_pre = True
        elif tag == "code" and self._in_pre:
            self.code_classes.append(attrs.get("class") or "")

    def handle_endtag(self, tag):
        if tag == "script" and self._jsonld_buffer is not None:
            self.jsonld.append("".join(self._jsonld_buffer))
            self._jsonld_buffer = None
        if tag == "pre":
            self._in_pre = False
        if tag == "h1" and self._h1_depth > 0:
            self._h1_depth -= 1
            if self._h1_depth == 0:
                self.h1_texts.append("".join(self._h1_buffer).strip())
                self._h1_buffer = []

    def handle_data(self, data):
        if self._jsonld_buffer is not None:
            self._jsonld_buffer.append(data)
        if self._h1_depth > 0:
            self._h1_buffer.append(data)


class Page:
    def __init__(self, path, parser):
        self.path = path
        self.h1_texts = parser.h1_texts
        self.urls = parser.urls
        self.imgs = parser.imgs
        self.meta = parser.meta
        self.code_blocks = [cls.split() for cls in parser.code_classes]
        self.descriptions = [m.get("content") or "" for m in parser.metas
                             if (m.get("name") or "").lower() == "description"]
        robots = " ".join((m.get("content") or "").lower() for m in parser.metas
                          if (m.get("name") or "").lower() == "robots")
        refresh = any((m.get("http-equiv") or "").lower() == "refresh"
                      for m in parser.metas)
        own = "/" + os.path.dirname(path).replace(os.sep, "/")
        own = own.rstrip("/") + "/"
        elsewhere = (parser.canonical is not None and
                     unquote(urlparse(parser.canonical).path) != unquote(own))
        # Redirect stubs, noindexed pages and pages canonicalised to another URL
        # (pagination pages point at page 1) never reach search results as such.
        self.noindex = "noindex" in robots
        self.indexable = not self.noindex and not refresh and not elsewhere
        self.jsonld = parser.jsonld
        self.canonical = parser.canonical

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


SHARE_IMAGE_EXTS = (".png", ".jpg", ".jpeg")


def is_share_format(url):
    return url.split("?")[0].lower().endswith(SHARE_IMAGE_EXTS)


def check_homepage_share_image(home):
    if home is None:
        return ["index.html (homepage not found)"]
    meta = home.meta
    problems = []
    for key in ("og:image", "twitter:image"):
        if not is_share_format(meta.get(key, "")):
            problems.append("%s is %r, not a PNG or JPEG" % (key, meta.get(key)))
    for key, expected in (("og:image:width", "1200"), ("og:image:height", "630")):
        if meta.get(key) != expected:
            problems.append("%s is %r, expected %s" % (key, meta.get(key), expected))
    if meta.get("twitter:card") != "summary_large_image":
        problems.append("twitter:card is %r" % meta.get("twitter:card"))
    return problems


def check_img_alt(pages):
    return ["%s (%d image(s))" % (p.path, len(p.imgs_without_alt))
            for p in pages if p.imgs_without_alt]


def breadcrumb_lists(page):
    """BreadcrumbList objects in the page's JSON-LD, top level or in @graph.
    Blocks that do not parse are returned as None so the check can flag them."""
    found = []
    for block in page.jsonld:
        try:
            data = json.loads(block)
        except ValueError:
            found.append(None)
            continue
        nodes = data if isinstance(data, list) else [data]
        for node in list(nodes):
            if isinstance(node, dict) and isinstance(node.get("@graph"), list):
                nodes.extend(node["@graph"])
        found.extend(n for n in nodes
                     if isinstance(n, dict) and n.get("@type") == "BreadcrumbList")
    return found


PLACEHOLDERS = {"", "-", "na", "n/a", "n.a.", "none", "other", "<nil>"}


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
        # The title is the resource's own, so "Other" is a valid one.
        problems = ["missing " + k for k in ("name", "url") if not found[0].get(k)]
        problems += empty_values({k: v for k, v in found[0].items() if k != "name"})
        if problems:
            bad.append("%s (%s)" % (p.path, ", ".join(problems[:3])))
    return bad


def check_breadcrumbs(pages):
    failures = []
    for p in pages:
        lists = breadcrumb_lists(p)
        problems = []
        if None in lists:
            problems.append("JSON-LD block does not parse")
            lists = [bl for bl in lists if bl is not None]
        if len(lists) > 1:
            problems.append("%d BreadcrumbLists" % len(lists))
        for bl in lists:
            items = bl.get("itemListElement")
            if (not isinstance(items, list) or not items
                    or any(not isinstance(item, dict) for item in items)):
                problems.append("invalid itemListElement")
                continue
            names = [item.get("name") for item in items]
            if any(not item.get("item") for item in items):
                problems.append("empty item")
            if [item.get("position") for item in items] != list(range(1, len(items) + 1)):
                problems.append("positions not 1..n")
            # The page itself may share the root's name (e.g. /authors/forrt/).
            if len(names) > 1 and names[-1] == names[0]:
                names = names[1:]
            if len(set(names)) != len(names):
                problems.append("repeated name")
            if not p.canonical:
                problems.append("no canonical link")
            elif items[-1].get("item") != p.canonical:
                problems.append("last item is not the canonical URL")
        if problems:
            failures.append("%s (%s)" % (p.path, ", ".join(sorted(set(problems)))))
    return failures


def check_description_present(pages):
    return [p.path for p in pages
            if p.indexable and not any(d.strip() for d in p.descriptions)]


def literal_entities(description):
    """Real character references left in a description, as opposed to escaped
    text that only looks like one (`&name;`)."""
    return {m.group(0) for m in LITERAL_ENTITY.finditer(description)
            if m.group(1).startswith("#") or m.group(1) + ";" in html5}


def check_description_entities(pages):
    failures = []
    for p in pages:
        found = set().union(*map(literal_entities, p.descriptions))
        if found:
            failures.append("%s (%s)" % (p.path, ", ".join(sorted(found))))
    return failures


FLORA_PAGE = "replication-hub/flora/index.html"


def check_flora_citation(public_dir):
    path = os.path.join(public_dir, FLORA_PAGE)
    if not os.path.exists(path):
        return ["%s (page not found)" % FLORA_PAGE]
    with open(path, encoding="utf-8") as handle:
        html = handle.read()
    problems = []
    if "doi.org/10.17605/OSF.IO/9R62X" not in html:
        problems.append("%s (no FLoRA DOI in the citation)" % FLORA_PAGE)
    if re.search(r"Wallrich, L\.\s*<em>", html):
        problems.append("%s (author asterisks rendered as emphasis)" % FLORA_PAGE)
    return problems


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


def main(public_dir):
    pages = load_pages(public_dir)
    home = next((p for p in pages if p.path == "index.html"), None)
    print("Checked %d pages under %s" % (len(pages), public_dir))

    results = {
        '1. no <h1>Search</h1>': check_no_search_heading(pages),
        "2. homepage free of mermaid/highlight.js assets": check_homepage_assets(home),
        "4. every <img> has an alt attribute": check_img_alt(pages),
        "5. every homepage <img> has width and height": check_homepage_img_dims(home),
        "6. homepage share image is 1200x630 PNG/JPEG with twitter:card": check_homepage_share_image(home),
        "7. breadcrumb JSON-LD is well formed": check_breadcrumbs(pages),
        "9. every indexable page has a meta description": check_description_present(pages),
        "10. no double-escaped entity in a meta description": check_description_entities(pages),
        "11. FLoRA page shows the citation as HTML": check_flora_citation(public_dir),
    }
    conditional = check_conditional_assets(pages)
    results["3. conditional highlight.js / mermaid loading"] = [
        item for items in conditional.values() for item in items]
    results["8. curated resources carry one clean LearningResource"] = check_learning_resource(pages)

    print("\nSummary")
    for title in sorted(results, key=lambda t: int(t.split(".")[0])):
        print("  [%s] %s" % ("FAIL" if results[title] else "PASS", title))

    for title in sorted(results, key=lambda t: int(t.split(".")[0])):
        if not results[title]:
            continue
        print("\nFAIL %s" % title)
        if title.startswith("3."):
            for reason, items in conditional.items():
                if items:
                    print_items(reason, items)
        else:
            # Checks 5 and 6 list images/problems, every other check lists pages.
            label = {"5.": "images", "6.": "problems"}.get(title[:2], "pages")
            print_items(label, results[title])

    print("\nReport only (never fails)")
    print_items("pages with no <h1>", [p.path for p in pages if not p.h1_texts])
    print_items("pages with several <h1>", [p.path for p in pages if len(p.h1_texts) > 1])
    all_imgs = sum(len(p.imgs) for p in pages)
    unsized = sum(len(p.imgs_without_dims) for p in pages)
    if all_imgs:
        print("  images site-wide: %d, with width and height: %d (%.1f%%)"
              % (all_imgs, all_imgs - unsized, 100.0 * (all_imgs - unsized) / all_imgs))
    print_items("pages whose og:image is not PNG/JPEG",
                ["%s (%s)" % (p.path, p.meta["og:image"]) for p in pages
                 if p.meta.get("og:image") and not is_share_format(p.meta["og:image"])])
    description_report(pages, home)

    return 1 if any(results.values()) else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python3 scripts/check_seo_html.py <public_dir>")
    sys.exit(main(sys.argv[1]))
