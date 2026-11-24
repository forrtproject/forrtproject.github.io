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
  21. In the /clusters/ map, the drawing (svg.clusters-map__ring) is aria-hidden and holds no links;
      the overview's cluster names (a.clusters-map__tag) each have a target and visible text, as many
      as the clusters listed below the map; and every sub-cluster panel (.clusters-map__panel) is inert
      or hidden, so its links are tab stops only once opened. Every in-page link in the clusters map
      reaches an id on the page.
  22. The FLoRA page (replication-hub/flora/) contains the FLoRA citation DOI.
  23. On a translated glossary page, no related term links to an English term page
      that has a page in the same language (per the English page's hreflang links).
  24. Every other name an English glossary term page shows ("Also known as") is in
      that term's data-term on the glossary hub, so the hub's filter finds it.
  25. No page loads the retired js/newsletter.js (#1170).
  26. The news and Educators' Corner lists use the same picture treatment as
      the related cards below their articles (#1255).
  27. Summary takeaway links have a destination and bypass Google's redirect (#1256).
  28. Summary pages exist and use the written credits expected from the build's data.

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
from html import unescape
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
SOURCE_URL_TOKEN = re.compile(r'https?://[^\s<>"]+')
LITERAL_ENTITY = re.compile(r"&(#\d+|#x[0-9a-fA-F]+|[A-Za-z][A-Za-z0-9]*);")


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.h1_texts = []
        self.urls = []
        self.imgs = []
        self.card_pictures = []
        self._whole_card_picture = None
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
        self.references = set()
        self.reference_sources = []
        self._ref_source = None
        self.citations = []
        self.crumb_links = []
        self._in_crumbs = False
        self.alternates = []
        self.related_links = []
        self._related_tag = None  # the element holding a term page's related terms (section.term-related)
        self.takeaway_links = []
        self._in_takeaways = False

    def _finish_ref_source(self):
        if self._ref_source is not None:
            self.reference_sources.append(self._ref_source)
            self._ref_source = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "li":
            self._finish_ref_source()
        if tag == "ul" and "summary-takeaways" in (attrs.get("class") or "").split():
            self._in_takeaways = True
        if tag == "a" and self._in_takeaways:
            self.takeaway_links.append(attrs.get("href") or "")
        if tag == "div":
            classes = (attrs.get("class") or "").split()
            self._whole_card_picture = "ec-thumb-whole" in classes if "ac-thumb" in classes else None
        if tag == "script" and not attrs.get("src"):
            self._inline_script = 0
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if attrs.get("data-reference"):
            self.references.add(attrs["data-reference"])
        if attrs.get("data-source"):
            if tag == "li":
                self._ref_source = (attrs["data-source"], [])
            else:
                self.reference_sources.append((attrs["data-source"], []))
        if tag == "a" and self._ref_source is not None and attrs.get("href"):
            self._ref_source[1].append(attrs["href"])
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
            self.citations.append((attrs.get("href", ""), attrs.get("data-cite", "")))
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
            if self._whole_card_picture is not None and attrs.get("src"):
                folder = urlparse(attrs["src"]).path.rpartition("/")[0]
                self.card_pictures.append((folder, self._whole_card_picture))
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
        if tag in ("li", "ul"):
            self._finish_ref_source()
        if tag == "div":
            self._whole_card_picture = None
        if tag == "ul":
            self._in_takeaways = False
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
        self._finish_ref_source()
        # A script left open at the end of the file still counts.
        if self._inline_script is not None:
            self.largest_inline_script = max(self.largest_inline_script, self._inline_script)
            self._inline_script = None

    def handle_data(self, data):
        if self._ref_source is not None:
            self._ref_source[1].extend(m.group(0) for m in SOURCE_URL_TOKEN.finditer(data))
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
        self.card_pictures = parser.card_pictures
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
        self.references = parser.references
        self.reference_sources = parser.reference_sources
        self.citations = parser.citations
        self.gloss_terms = parser.gloss_terms
        self.crumb_links = parser.crumb_links
        self.alternates = parser.alternates
        self.related_links = parser.related_links
        self.takeaway_links = parser.takeaway_links

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


# A preview build serves the site under a prefix (e.g. /rebrand-doors/); glossary URLs are compared from /glossary/ on.
GLOSSARY_URL_PATH = re.compile(r"/glossary/.*$")


def glossary_url_key(href):
    match = GLOSSARY_URL_PATH.search(unquote(urlparse(href).path))
    return match.group(0) if match else None


def check_glossary_related_language(pages):
    """A translated term page links its related terms to pages in its own language where they exist."""
    english = {}
    for page in pages:
        path = page.path.replace(os.sep, "/")
        if path.startswith("glossary/english/"):
            english["/" + path.removesuffix("index.html")] = [glossary_url_key(h) or "" for h in page.alternates]
    failures = []
    for page in pages:
        parts = page.path.replace(os.sep, "/").split("/")
        if len(parts) < 4 or parts[0] != "glossary" or parts[1] == "english":
            continue
        own = "/glossary/%s/" % parts[1]
        for href in page.related_links:
            target = glossary_url_key(href)
            if any(alt.startswith(own) for alt in english.get(target, [])):
                failures.append("%s (%s)" % (page.path, href))
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
    failures = []
    for p in pages:
        for href, key in p.citations:
            if not href.startswith("#ref-") or unquote(href[1:]) not in p.ids:
                failures.append("%s (%s)" % (p.path, href or "missing href"))
            elif key and (href != "#ref-" + key or key not in p.references):
                failures.append("%s (data-cite=%s)" % (p.path, key))
        for src, inner_urls in p.reference_sources:
            if src.count("(") != src.count(")"):
                failures.append("%s (truncated data-source=%s)" % (p.path, src))
                continue
            for url in inner_urls:
                url = url.rstrip(".,;]")
                while url.endswith(")") and url.count(")") > url.count("("):
                    url = url[:-1]
                if url.startswith(src) and len(url) > len(src):
                    tail = url[len(src):]
                    if tail != "/" and not tail.startswith("#"):
                        failures.append("%s (truncated data-source=%s)" % (p.path, src))
                        break
    return failures


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


FLORA_PAGE = "replication-hub/flora/index.html"


def check_flora_citation(public_dir):
    path = os.path.join(public_dir, FLORA_PAGE)
    if not os.path.exists(path):
        return ["%s (page not found)" % FLORA_PAGE]
    with open(path, encoding="utf-8") as handle:
        html = handle.read()
    if "doi.org/10.17605/OSF.IO/9R62X" not in html:
        return ["%s (no FLoRA DOI in the citation)" % FLORA_PAGE]
    return []


GLOSSARY_HUB = os.path.join("glossary", "english", "index.html")
AKA_LINE = re.compile(r'<p class="term-aka">(.*?)</p>', re.S)
HUB_TERM = re.compile(r'<li data-term="([^"]*)">\s*<a href="([^"]+)"')


def glossary_aka_failures(hub_html, term_pages):
    """term_pages: {URL path of the term page: its HTML}. Returns the names the hub filter misses."""
    filter_text = {glossary_url_key(unescape(href)): unescape(term) for term, href in HUB_TERM.findall(hub_html)}
    failures = []
    for url_path, html in sorted(term_pages.items()):
        match = AKA_LINE.search(html)
        if not match:
            continue
        line = unescape(re.sub(r"<[^>]+>", "", re.sub(r'<span class="term-aka-label">.*?</span>', "", match.group(1))))
        searchable = filter_text.get(url_path)
        for name in (n.strip() for n in line.split(", ")):
            if name and (searchable is None or name.lower().replace("*", "") not in searchable):
                failures.append("%s (%s)" % (url_path, name))
    return failures


def check_glossary_aka_filter(public_dir):
    hub_path = os.path.join(public_dir, GLOSSARY_HUB)
    if not os.path.exists(hub_path):
        return ["%s (page not found)" % GLOSSARY_HUB]
    with open(hub_path, encoding="utf-8") as handle:
        hub_html = handle.read()
    term_pages = {}
    english = os.path.dirname(hub_path)
    for slug in os.listdir(english):
        path = os.path.join(english, slug, "index.html")
        if os.path.isfile(path):
            with open(path, encoding="utf-8") as handle:
                term_pages["/glossary/english/%s/" % slug] = handle.read()
    return glossary_aka_failures(hub_html, term_pages)


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


class ClustersMapParser(HTMLParser):
    """Ids on the page, the drawing's attributes and links, the overview's cluster names and panels,
    and every in-page link in the map."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.arts, self.art_links, self.map_hrefs = set(), [], [], []
        self.names, self.panels = [], []  # names: [href, text of its tag-name span, aria-hidden] of each a.clusters-map__tag
        self.listed = 0  # clusters in the linked list below the map (li[data-cluster] outside it)
        self.in_text = 0  # depth inside the current name's span.clusters-map__tag-name, 0 outside it
        self.stack = []  # (tag, in_art, in_map) for open elements
        self.in_name = 0  # depth of open elements inside the current cluster name, 0 outside one

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        classes = (attrs.get("class") or "").split()
        in_art = (self.stack[-1][1] if self.stack else False) or (tag == "svg" and "clusters-map__ring" in classes)
        in_map = (self.stack[-1][2] if self.stack else False) or "clusters-map" in classes
        if tag == "svg" and "clusters-map__ring" in classes:
            self.arts.append(attrs)
        if tag == "a" and in_art:
            self.art_links.append(attrs)
        if tag == "a" and in_map and (attrs.get("href") or "").startswith("#"):
            self.map_hrefs.append(attrs["href"])
        if in_map and "clusters-map__panel" in classes:
            self.panels.append(attrs)
        void = tag in ("path", "rect", "circle", "image", "tspan", "br", "img", "input", "meta", "link")
        if tag == "li" and "data-cluster" in attrs and not in_map:
            self.listed += 1
        if tag == "a" and "clusters-map__tag" in classes:
            self.names.append([(attrs.get("href") or "").strip(), "", attrs.get("aria-hidden") == "true"])
            self.in_name = 1
        elif self.in_name and not void:
            self.in_name += 1
            if self.in_text or "clusters-map__tag-name" in classes:
                self.in_text += 1
        if not void:
            self.stack.append((tag, in_art, in_map))

    def handle_data(self, data):
        if self.in_text:
            self.names[-1][1] += data

    def handle_endtag(self, tag):
        if self.in_text:
            self.in_text -= 1
        if self.in_name:
            self.in_name -= 1
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break


def check_clusters_map(public_dir):
    path = os.path.join(public_dir, "clusters", "index.html")
    if not os.path.exists(path):
        return []
    parser = ClustersMapParser()
    with open(path, encoding="utf-8", errors="replace") as handle:
        parser.feed(handle.read())
    failures = []
    if not parser.arts:
        failures.append("clusters/index.html: no svg.clusters-map__ring")
    # The drawing only repeats the names over it, so it is hidden from assistive technology and has no links.
    failures += ["clusters/index.html: the drawing is not aria-hidden" for art in parser.arts if art.get("aria-hidden") != "true"]
    if parser.art_links:
        failures.append("clusters/index.html: %d links in the drawing, e.g. %s" % (len(parser.art_links), parser.art_links[0].get("href", "")))
    # The overview: each cluster name is a named link, and its panel's links are out of the tab order until it opens.
    if not parser.names:
        failures.append("clusters/index.html: no cluster names (a.clusters-map__tag) in the overview")
    if parser.names and parser.listed and len(parser.names) != parser.listed:
        failures.append("clusters/index.html: the overview names %d clusters, the list below it %d" % (len(parser.names), parser.listed))
    silent = [href for href, _, hidden in parser.names if hidden]
    if silent:
        failures.append("clusters/index.html: %d cluster names in the overview are aria-hidden, e.g. %s" % (len(silent), silent[0]))
    blank = [href for href, text, _ in parser.names if not href or not text.strip()]
    if blank:
        failures.append("clusters/index.html: %d cluster names in the overview lack a target or text, e.g. %r" % (len(blank), blank[0]))
    open_panels = [p.get("id", "") for p in parser.panels if "inert" not in p and "hidden" not in p]
    if open_panels:
        failures.append("clusters/index.html: %d sub-cluster panels are neither inert nor hidden, e.g. %s" % (len(open_panels), open_panels[0]))
    missing = sorted({h for h in parser.map_hrefs if unquote(h[1:]) not in parser.ids})
    failures += ["clusters/index.html: %s has no target" % h for h in missing]
    return failures


def check_related_card_pictures(pages):
    """Compare the picture treatment where the list and related cards share card_picture."""
    by_path = {page.path: page for page in pages}
    failures = []
    # Pedagogies uses list_item for its index, which fits every thumbnail into its row.
    for section in ("post", "educators-corner"):
        index = by_path.get(f"{section}/index.html")
        if index is None:
            continue
        # Each article's image derivatives share its bundle folder and have different hashed filenames.
        index_pictures = dict(index.card_pictures)
        failures.extend(
            page.path for page in pages
            if page is not index and page.path.startswith(f"{section}/")
            and any(folder in index_pictures and whole != index_pictures[folder]
                    for folder, whole in page.card_pictures)
        )
    return failures


def check_summary_takeaway_links(pages):
    redirect = re.compile(r"^https?://www\.google\.com/url(?:[?#]|$)", re.I)
    return [f"{page.path}: {href!r}" for page in pages for href in page.takeaway_links
            if href in ("", "#", "#ZgotmplZ") or redirect.match(href)]


class SummaryCreditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.credits = []
        self.credit = None

    def finish_credit(self):
        if self.credit is not None:
            self.credits.append(" ".join("".join(self.credit).split()))
            self.credit = None

    def handle_starttag(self, tag, attrs):
        if tag in ("p", "h4"):
            # Hugo's minifier can omit </p> before the next paragraph or heading.
            self.finish_credit()
        if tag == "p" and "summary-credit" in (dict(attrs).get("class") or "").split():
            self.credit = []

    def handle_data(self, data):
        if self.credit is not None:
            self.credit.append(data)

    def handle_endtag(self, tag):
        if tag == "p":
            self.finish_credit()

    def close(self):
        super().close()
        self.finish_credit()


def check_summary_credit_marker(public_dir, summaries=None):
    if summaries is None:
        data_dir = os.environ.get("HUGO_DATADIR", "data")
        path = os.path.join(data_dir, "summaries.json")
        try:
            with open(path, encoding="utf-8") as handle:
                summaries = json.load(handle)
        except (OSError, ValueError) as error:
            return [f"{path}: could not read the build's summaries data ({error})"]

    marked_titles = [s.get("Title") or "" for s in summaries.values() if "⬦" in (s.get("Title") or "")]
    expected_counts = {
        "summaries/index.html": None,
        "summaries/open-reproducible/index.html": len(marked_titles),
        "summaries/diversity-equity-inclusion/index.html": sum("⌺" in title for title in marked_titles),
    }
    credit_text = "Summary by Dr Tamara Kalandadze"
    failures = []
    for path, expected in expected_counts.items():
        full_path = os.path.join(public_dir, path)
        if not os.path.isfile(full_path):
            failures.append(f"{path}: missing page")
            continue
        with open(full_path, encoding="utf-8", errors="replace") as handle:
            html = handle.read()
        if "⬦" in unescape(html) or r"\u2b26" in html.lower():
            failures.append(f"{path}: raw summary author marker")
        if expected is not None:
            parser = SummaryCreditParser()
            parser.feed(html)
            parser.close()
            if parser.credits != [credit_text] * expected:
                actual = parser.credits.count(credit_text)
                failures.append(f"{path}: expected {expected} written credits, found {actual} "
                                f"matching out of {len(parser.credits)} credit lines")
    return failures


def main(public_dir, summaries=None):
    pages = load_pages(public_dir)
    home = next((p for p in pages if p.path == "index.html"), None)
    print("Checked %d pages under %s" % (len(pages), public_dir))

    results = {
        '1. no <h1>Search</h1>': check_no_search_heading(pages),
        "18. glossary titles show no Markdown asterisks": check_glossary_title_markdown(pages),
        "2. homepage free of mermaid/highlight.js assets": check_homepage_assets(home),
        "4. every <img> has an alt attribute": check_img_alt(pages),
        "26. related cards match the picture treatment in their section list": check_related_card_pictures(pages),
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
        "21. the clusters map's names are named and counted, its drawing hidden, its panels closed and its links have targets": check_clusters_map(public_dir),
        "22. FLoRA page shows the citation": check_flora_citation(public_dir),
        "23. translated glossary pages link related terms in their own language": check_glossary_related_language(pages),
        "24. the glossary hub's filter finds each term by its other names": check_glossary_aka_filter(public_dir),
        "25. no page loads the retired js/newsletter.js": [p.path for p in pages if p.loads("js/newsletter.js")],
        "27. summary takeaways link directly to their destinations": check_summary_takeaway_links(pages),
        "28. summaries show written credit without a raw author marker": check_summary_credit_marker(public_dir, summaries),
    }
    conditional = check_conditional_assets(pages)
    results["3. conditional highlight.js / mermaid loading"] = [
        item for items in conditional.values() for item in items]
    results["8. curated resources carry one clean LearningResource"] = check_learning_resource(pages)
    results["12. no page loads EmailOctopus or reCAPTCHA before a visitor subscribes"] = check_third_party_forms(pages)

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
