"""Every <img> has an alt attribute.

A bare `alt` counts as present.
"""


def check(site):
    return ["%s (%d image(s))" % (p.path, len(p.imgs_without_alt))
            for p in site.pages if p.imgs_without_alt]
