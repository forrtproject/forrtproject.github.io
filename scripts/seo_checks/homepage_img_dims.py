"""Every homepage <img> has width and height.

The browser then reserves each image's box before the file loads (#869).
"""


def check(site):
    if site.home is None:
        return ["index.html (homepage not found)"]
    return {"images": [img.get("src", "(no src)") for img in site.home.imgs_without_dims]}
