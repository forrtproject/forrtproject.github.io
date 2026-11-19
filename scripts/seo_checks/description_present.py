"""Every indexable page has a meta description (#864).

Indexable: no robots noindex, not a meta-refresh redirect, not canonicalised to
another URL.
"""


def check(site):
    return [p.path for p in site.pages
            if p.indexable and not any(d.strip() for d in p.descriptions)]
