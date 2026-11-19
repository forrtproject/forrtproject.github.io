"""The parsed build that every check in this folder receives.

`load_site(public_dir)` reads each index.html under the build once. A check's
`check(site)` uses `site.pages` (one `Page` per index.html, sorted by path),
`site.home` (the homepage's `Page`, or None) and `site.public_dir`.
"""

import os
import re
from html.parser import HTMLParser
from urllib.parse import unquote, urlparse


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
        self.alternates = []
        self.related_links = []
        self._related_tag = None  # the element holding a term page's related terms (section.term-related)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "script" and not attrs.get("src"):
            self._inline_script = 0
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "nav" and "crumbs" in (attrs.get("class") or "").split():
            self._in_crumbs = True
        if tag == "link" and attrs.get("rel") == "alternate" and attrs.get("hreflang") and attrs.get("href"):
            self.alternates.append(attrs["href"])
        if self._related_tag is None and "term-related" in (attrs.get("class") or "").split():
            self._related_tag = tag
        if tag == "a" and self._related_tag:
            self.related_links.append(attrs.get("href") or "")
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
        if tag == self._related_tag:
            self._related_tag = None
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
        self.alternates = parser.alternates
        self.related_links = parser.related_links

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


class Site:
    def __init__(self, public_dir, pages):
        self.public_dir = public_dir
        self.pages = pages
        self.home = next((p for p in pages if p.path == "index.html"), None)


def load_site(public_dir):
    return Site(public_dir, load_pages(public_dir))


def page_from_html(text, path="index.html"):
    """One parsed page, for tests."""
    parser = PageParser()
    parser.feed(text)
    parser.close()
    return Page(path, parser)


SHARE_IMAGE_EXTS = (".png", ".jpg", ".jpeg")


def is_share_format(url):
    """X and LinkedIn show previews for PNG and JPEG share images, not WebP (#870)."""
    return url.split("?")[0].lower().endswith(SHARE_IMAGE_EXTS)


# A preview build serves the site under a prefix (e.g. /rebrand-doors/); glossary URLs are compared from /glossary/ on.
GLOSSARY_URL_PATH = re.compile(r"/glossary/.*$")


def glossary_url_key(href):
    match = GLOSSARY_URL_PATH.search(unquote(urlparse(href).path))
    return match.group(0) if match else None
