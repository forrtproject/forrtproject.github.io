"""Homepage share image is a 1200x630 PNG or JPEG, with twitter:card.

og:image and twitter:image are PNG or JPEG, og:image:width/height are 1200 and
630, and twitter:card is summary_large_image. X and LinkedIn show no preview for
WebP (#870).
"""

from seo_checks._site import is_share_format


def check(site):
    if site.home is None:
        return ["index.html (homepage not found)"]
    meta = site.home.meta
    problems = []
    for key in ("og:image", "twitter:image"):
        if not is_share_format(meta.get(key, "")):
            problems.append("%s is %r, not a PNG or JPEG" % (key, meta.get(key)))
    for key, expected in (("og:image:width", "1200"), ("og:image:height", "630")):
        if meta.get(key) != expected:
            problems.append("%s is %r, expected %s" % (key, meta.get(key), expected))
    if meta.get("twitter:card") != "summary_large_image":
        problems.append("twitter:card is %r" % meta.get("twitter:card"))
    return {"problems": problems}
