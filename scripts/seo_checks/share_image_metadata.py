"""Compatible social images have type, dimensions and matching URLs (#927).

On every page whose og:image is a PNG or JPEG, twitter:image is the same URL,
og:image:type matches the format, and og:image:width/height are positive.
Other formats are listed in the report-only section.
"""

from urllib.parse import urlparse

from seo_checks._site import is_share_format


def check(site):
    failures = []
    for p in site.pages:
        image = p.meta.get("og:image", "")
        if not is_share_format(image):
            continue  # Undecodable originals and standalone pages are reported below.
        expected_type = "image/png" if urlparse(image).path.lower().endswith(".png") else "image/jpeg"
        problems = []
        if p.meta.get("twitter:image") != image:
            problems.append("Open Graph and Twitter images differ")
        if p.meta.get("og:image:type") != expected_type:
            problems.append("incorrect image type")
        for key in ("og:image:width", "og:image:height"):
            value = p.meta.get(key, "")
            if not value.isdigit() or int(value) <= 0:
                problems.append("missing or invalid " + key)
        if problems:
            failures.append("%s (%s)" % (p.path, ", ".join(problems)))
    return failures
