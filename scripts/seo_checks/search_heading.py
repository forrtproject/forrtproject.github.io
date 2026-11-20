"""No <h1>Search</h1>.

The search overlay (partials/search.html) is on every page, so its heading must
not be an <h1>.
"""


def check(site):
    return [p.path for p in site.pages if any(t.lower() == "search" for t in p.h1_texts)]
