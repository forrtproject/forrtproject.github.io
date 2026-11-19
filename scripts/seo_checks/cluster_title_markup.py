"""Cluster pages show no literal <i>/<em>/<scp> title markup.

Cluster pages render publication-title markup (clusters/rich_text.html) instead
of showing it as literal or escaped text, and at least one cluster page exists.
"""

import os
import re

# Escaped once (&lt;i&gt;) or twice (&amp;lt;i&amp;gt;), or a raw <scp> no browser styles.
LITERAL_TITLE_MARKUP = re.compile(r"&(?:amp;)?lt;/?(?:i|em|scp)&(?:amp;)?gt;|</?scp>", re.IGNORECASE)


def check(site):
    public_dir = site.public_dir
    clusters_dir = os.path.join(public_dir, "clusters")
    found, scanned = [], 0
    for root, _dirs, files in os.walk(clusters_dir):
        if "index.html" in files:
            scanned += 1
            full = os.path.join(root, "index.html")
            with open(full, encoding="utf-8", errors="replace") as handle:
                if LITERAL_TITLE_MARKUP.search(handle.read()):
                    found.append(os.path.relpath(full, public_dir))
    if not scanned:
        return ["clusters/ (no cluster pages found)"]
    return sorted(found)
