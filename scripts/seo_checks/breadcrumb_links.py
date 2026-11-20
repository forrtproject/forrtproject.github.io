"""Every breadcrumb link has a target.

Every link in a visible breadcrumb trail (nav.crumbs) has a non-empty href, so
a section that is not rendered cannot leave an empty link in the trail.
"""


def check(site):
    return [p.path for p in site.pages if any(not h.strip() for h in p.crumb_links)]
