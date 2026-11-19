"""Every citation has a local reference target (#200).

Each a.cite links to #ref-<key>, and that id exists on the same page.
"""

from urllib.parse import unquote


def check(site):
    return ["%s (%s)" % (p.path, href or "missing href")
            for p in site.pages for href in p.citations
            if not href.startswith("#ref-") or unquote(href[1:]) not in p.ids]
