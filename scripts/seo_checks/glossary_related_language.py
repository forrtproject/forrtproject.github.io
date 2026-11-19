"""Translated glossary pages link related terms in their own language.

On a translated glossary page, no related term links to an English term page
that has a page in the same language (per the English page's hreflang links).
"""

import os

from seo_checks._site import glossary_url_key


def check(site):
    pages = site.pages
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
