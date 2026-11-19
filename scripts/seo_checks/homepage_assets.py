"""Homepage free of Mermaid and highlight.js assets.

The homepage loads no Mermaid or highlight.js script or stylesheet.
"""


def check(site):
    if site.home is None:
        return ["index.html (homepage not found)"]
    bad = [u for u in site.home.urls if "mermaid" in u or "highlight.js" in u or "highlight.min.js" in u]
    return sorted(set(bad))
