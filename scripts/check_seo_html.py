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
  11. No page has more than one <h1> (#928).
  12. Numbered resource subsets have unique, self-canonical metadata and
      CollectionPage data matching their HTML cards (#868).
  13. PNG/JPEG social images have matching Open Graph/Twitter URLs, type and
      positive dimensions (#927). Unsupported formats remain report-only.
  14. No page inlines more than 200 KB in one <script> (#993). Large data belongs in a
     separate file the page fetches when it needs it.
  15. Every citation links to its reference on the same page (#200).
  16. Every glossary term link points to an existing English glossary page (#227).
  17. Every link in a visible breadcrumb trail (nav.crumbs) has a non-empty href,
     so a section that is not rendered cannot leave an empty link in the trail.
  18. No glossary page's <title> or <h1> shows Markdown emphasis as typed, e.g. "(*p*)".
  19. No page loads EmailOctopus or reCAPTCHA before a visitor subscribes.
  20. Cluster pages render publication-title markup (<i>, <em>, <scp>) instead of
     showing it as literal or escaped text, and at least one cluster page exists.

Report-only sections (never fail): pages with no <h1>, the
site-wide share of images that carry both width and height, pages whose
og:image is not a PNG or JPEG, and indexable pages whose description repeats
the homepage's, is shared with another page, contains HTML markup as text, or
contains a raw HTTP(S) URL or forrt.org/ path (#987).
"""

import json
import os
import re
import sys
from collections import Counter
from html.entities import html5
from html.parser import HTMLParser
from urllib.parse import unquote, urljoin, urlparse

MAX_LISTED = 20
MAX_INLINE_SCRIPT = 200_000  # bytes in one inline <script> (#993)
# Markup that survived flattening, e.g. an indented HTML block rendered as code.
HTML_TAG = re.compile(r"</?[A-Za-z][A-Za-z0-9]*(\s[^<>]*)?/?>")
# Attribute values arrive already unescaped, so any entity left in them was
# escaped twice in the HTML (e.g. `&amp;ldquo;`).
DESCRIPTION_URL = re.compile(r"https?://|\bforrt\.org/", re.I)
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
        self.title = ""
        self.resource_links = []
        self._in_title = False
        self._in_resource_heading = False
        self.gloss_terms = []
        self._jsonld_buffer = None
        self.largest_inline_script = 0
        self._inline_script = None
        self.ids = set()
        self.citations = []
        self.crumb_links = []
        self._in_crumbs = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "script" and not attrs.get("src"):
            self._inline_script = 0
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "nav" and "crumbs" in (attrs.get("class") or "").split():
            self._in_crumbs = True
        if tag == "a" and self._in_crumbs:
            self.crumb_links.append(attrs.get("href") or "")
        if tag == "a" and "cite" in attrs.get("class", "").split():
            self.citations.append(attrs.get("href", ""))
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self._jsonld_buffer = []
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "title":
            self._in_title = True
        if tag == "h2" and "res-title" in attrs.get("class", "").split():
            self._in_resource_heading = True
        if tag == "a" and self._in_resource_heading and attrs.get("href"):
            self.resource_links.append(attrs["href"])
        if tag == "h1":
            self._h1_depth += 1
        elif tag in ("script", "link"):
            url = attrs.get("src") or attrs.get("href")
            if url:
                self.urls.append(url)
        elif tag == "img":
            self.imgs.append(attrs)
        elif tag == "a" and "gloss-term" in (attrs.get("class") or "").split():
            self.gloss_terms.append(attrs.get("href") or "")
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
        if tag == "nav":
            self._in_crumbs = False
        if tag == "script" and self._inline_script is not None:
            self.largest_inline_script = max(self.largest_inline_script, self._inline_script)
            self._inline_script = None
        if tag == "script" and self._jsonld_buffer is not None:
            self.jsonld.append("".join(self._jsonld_buffer))
            self._jsonld_buffer = None
        if tag == "title":
            self._in_title = False
        if tag == "h2":
            self._in_resource_heading = False
        if tag == "pre":
            self._in_pre = False
        if tag == "h1" and self._h1_depth > 0:
            self._h1_depth -= 1
            if self._h1_depth == 0:
                self.h1_texts.append("".join(self._h1_buffer).strip())
                self._h1_buffer = []

    def close(self):
        super().close()
        # A script left open at the end of the file still counts.
        if self._inline_script is not None:
            self.largest_inline_script = max(self.largest_inline_script, self._inline_script)
            self._inline_script = None

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._inline_script is not None:
            self._inline_script += len(data.encode("utf-8"))
        if self._jsonld_buffer is not None:
            self._jsonld_buffer.append(data)
        if self._h1_depth > 0:
            self._h1_buffer.append(data)


class Page:
    def __init__(self, path, parser):
        self.path = path
        self.h1_texts = parser.h1_texts
        self.title = parser.title.strip()
        self.resource_links = parser.resource_links
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
        # never reach search results as such.
        self.noindex = "noindex" in robots
        self.indexable = not self.noindex and not refresh and not elsewhere
        self.jsonld = parser.jsonld
        self.canonical = parser.canonical
        self.largest_inline_script = parser.largest_inline_script
        self.ids = parser.ids
        self.citations = parser.citations
        self.gloss_terms = parser.gloss_terms
        self.crumb_links = parser.crumb_links

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
            parser.close()
            pages.append(Page(os.path.relpath(full, public_dir), parser))
    pages.sort(key=lambda page: page.path)
    return pages


def check_glossary_links(pages):
    # Canonical URLs include a preview subfolder when built with --baseURL.
    english = set()
    for page in pages:
        path = page.path.replace(os.sep, "/")
        if path.startswith("glossary/english/") and path != "glossary/english/index.html":
            url = urlparse(page.canonical or "/" + path.removesuffix("index.html"))
            english.add((url.netloc, unquote(url.path)))
    failures = []
    for page in pages:
        path = page.path.replace(os.sep, "/")
        for href in page.gloss_terms:
            url = urlparse(urljoin(page.canonical or "/" + path, href))
            if not href or url.scheme not in ("", "http", "https") or (url.netloc, unquote(url.path)) not in english:
                failures.append("%s (%s)" % (page.path, href or "missing href"))
    return failures


# Paired asterisks around text: Markdown emphasis shown as typed. Asterisks inside a word
# ("G*Power", "P*Hack") are not delimiters.
LITERAL_EMPHASIS = re.compile(r"(?<!\w)\*[^*\s](?:[^*]*[^*\s])?\*(?!\w)")


def check_glossary_title_markdown(pages):
    """Glossary titles such as "Research Contribution Metric (*p*)" must render, not show asterisks."""
    return [p.path for p in pages
            if p.path.replace(os.sep, "/").startswith("glossary/")
            and any(LITERAL_EMPHASIS.search(text) for text in [p.title, *p.h1_texts])]


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


# Escaped once (&lt;i&gt;) or twice (&amp;lt;i&amp;gt;), or a raw <scp> no browser styles.
LITERAL_TITLE_MARKUP = re.compile(r"&(?:amp;)?lt;/?(?:i|em|scp)&(?:amp;)?gt;|</?scp>", re.IGNORECASE)


def check_cluster_title_markup(public_dir):
    """Cluster pages render publication-title markup (clusters/rich_text.html), never show it."""
    clusters_dir = os.path.join(public_dir, "clusters")
    found, scanned = [], 0
    for root, _dirs, files in os.walk(clusters_dir):
        if "index.html" in files:
            scanned += 1
            full = os.path.join(root, "index.html")
            with open(full, encoding="utf-8", errors="replace") as handle:
                if LITERAL_TITLE_MARKUP.search(handle.read()):
                    found.append(os.path.relpath(full, public_dir))
    if not scanned:
        return ["clusters/ (no cluster pages found)"]
    return sorted(found)


def check_citation_targets(pages):
    return ["%s (%s)" % (p.path, href or "missing href")
            for p in pages for href in p.citations
            if not href.startswith("#ref-") or unquote(href[1:]) not in p.ids]


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



def check_description_urls(pages):
    return [p.path for p in pages
            if p.indexable and any(DESCRIPTION_URL.search(d) for d in p.descriptions)]


def check_share_image_metadata(pages):
    failures = []
    for p in pages:
        image = p.meta.get("og:image", "")
        if not is_share_format(image):
            continue  # Undecodable originals and standalone pages are reported below.
        expected_type = "image/png" if urlparse(image).path.lower().endswith(".png") else "image/jpeg"
        problems = []
        if p.meta.get("twitter:image") != image:
            problems.append("Open Graph and Twitter images differ")
        if p.meta.get("og:image:type") != expected_type:
            problems.append("incorrect image type")
        for key in ("og:image:width", "og:image:height"):
            value = p.meta.get(key, "")
            if not value.isdigit() or int(value) <= 0:
                problems.append("missing or invalid " + key)
        if problems:
            failures.append("%s (%s)" % (p.path, ", ".join(problems)))
    return failures


def check_resource_pagination(pages):
    """Check the directory and every numbered subset, including preview base paths."""
    directory = next((p for p in pages if p.path == os.path.join("resources", "index.html")), None)
    if directory is None:
        return []  # This check also supports small fixtures with no directory.
    failures = []
    titles, descriptions = set(), set()
    root = (directory.canonical or "").rstrip("/") + "/"
    for p in pages:
        match = re.fullmatch(r"resources/page/([2-9]|[1-9]\d+)/index\.html", p.path.replace(os.sep, "/"))
        if p is not directory and not match:
            continue
        number = int(match[1]) if match else 1
        expected = root if number == 1 else root + "page/%d/" % number
        problems = []
        if not directory.canonical or p.canonical != expected:
            problems.append("not self-canonical")
        if p.meta.get("og:url") != expected:
            problems.append("og:url does not match canonical")
        if p.noindex != directory.noindex:
            problems.append("subset robots metadata differs from the directory")
        for label, value, seen in (("title", p.title, titles),
                                   ("description", next(iter(p.descriptions), ""), descriptions)):
            if not value or value in seen:
                problems.append("empty or repeated " + label)
            seen.add(value)
        if p.meta.get("og:title") != p.title:
            problems.append("og:title does not match title")
        if number > 1 and ("Page %d" % number not in p.title
                           or "page %d" % number not in next(iter(p.descriptions), "")):
            problems.append("metadata omits page number")
        try:
            blocks = [json.loads(block) for block in p.jsonld]
            collections = [block for block in blocks if isinstance(block, dict)
                           and block.get("@type") == "CollectionPage"]
        except ValueError:
            collections = []
        if len(collections) != 1:
            problems.append("missing CollectionPage")
        else:
            collection = collections[0]
            if (collection.get("url") != expected
                    or collection.get("@id") != expected + "#collection"
                    or collection.get("name") != p.title.rsplit(" | ", 1)[0]):
                problems.append("CollectionPage URL/name does not match metadata")
            items = collection.get("mainEntity", {})
            listed = items.get("itemListElement", [])
            links = [urlparse(item.get("url", "")).path for item in listed]
            if (not p.resource_links or links != p.resource_links
                    or items.get("numberOfItems") != len(p.resource_links)):
                problems.append("CollectionPage subset does not match HTML cards")
        if problems:
            failures.append("%s (%s)" % (p.path, ", ".join(problems)))
    return failures
def check_third_party_forms(pages):
    """The newsletter form loads reCAPTCHA and posts to EmailOctopus only when a visitor subscribes."""
    return sorted(p.path for p in pages if p.loads("recaptcha") or p.loads("eocampaign1.com"))


def check_inline_scripts(pages):
    return ["%s (%d KB)" % (p.path, p.largest_inline_script // 1000) for p in pages
            if p.largest_inline_script > MAX_INLINE_SCRIPT]


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
        "18. glossary titles show no Markdown asterisks": check_glossary_title_markdown(pages),
        "2. homepage free of mermaid/highlight.js assets": check_homepage_assets(home),
        "4. every <img> has an alt attribute": check_img_alt(pages),
        "5. every homepage <img> has width and height": check_homepage_img_dims(home),
        "6. homepage share image is 1200x630 PNG/JPEG with twitter:card": check_homepage_share_image(home),
        "7. breadcrumb JSON-LD is well formed": check_breadcrumbs(pages),
        "9. every indexable page has a meta description": check_description_present(pages),
        "10. no double-escaped entity in a meta description": check_description_entities(pages),
        "11. no page has several <h1>": [p.path for p in pages if len(p.h1_texts) > 1],
        "12. resource subsets have consistent, unique metadata": check_resource_pagination(pages),
        "13. compatible social images have type, dimensions and matching URLs": check_share_image_metadata(pages),
        "14. no inline <script> over 200 KB": check_inline_scripts(pages),
        "15. every citation has a local reference target": check_citation_targets(pages),
        "16. glossary links reach existing English terms": check_glossary_links(pages),
        "17. every breadcrumb link has a target": [p.path for p in pages if any(not h.strip() for h in p.crumb_links)],
        "19. no page loads EmailOctopus or reCAPTCHA before a visitor subscribes": check_third_party_forms(pages),
        "20. cluster pages show no literal <i>/<em>/<scp> title markup": check_cluster_title_markup(public_dir),
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
    all_imgs = sum(len(p.imgs) for p in pages)
    unsized = sum(len(p.imgs_without_dims) for p in pages)
    if all_imgs:
        print("  images site-wide: %d, with width and height: %d (%.1f%%)"
              % (all_imgs, all_imgs - unsized, 100.0 * (all_imgs - unsized) / all_imgs))
    print_items("pages whose og:image is not PNG/JPEG",
                ["%s (%s)" % (p.path, p.meta["og:image"]) for p in pages
                 if p.meta.get("og:image") and not is_share_format(p.meta["og:image"])])
    print_items("pages whose meta description contains a raw URL", check_description_urls(pages))
    description_report(pages, home)

    return 1 if any(results.values()) else 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python3 scripts/check_seo_html.py <public_dir>")
    sys.exit(main(sys.argv[1]))
