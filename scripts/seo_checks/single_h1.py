"""No page has several <h1> (#928)."""


def check(site):
    return [p.path for p in site.pages if len(p.h1_texts) > 1]
