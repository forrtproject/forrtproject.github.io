"""The glossary hub's filter finds each term by its other names.

Every other name an English glossary term page shows ("Also known as") is in
that term's data-term on the glossary hub, so the hub's filter finds it.
"""

import os
import re
from html import unescape

from seo_checks._site import glossary_url_key

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


def check(site):
    hub_path = os.path.join(site.public_dir, GLOSSARY_HUB)
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
