"""Glossary links reach existing English terms (#227).

Every a.gloss-term points to an existing English glossary term page.
"""

import os
from urllib.parse import unquote, urljoin, urlparse


def check(site):
    pages = site.pages
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
