"""Glossary titles show no Markdown asterisks.

No glossary page's <title> or <h1> shows Markdown emphasis as typed, e.g.
"Research Contribution Metric (*p*)".
"""

import os
import re

# Paired asterisks around text: Markdown emphasis shown as typed. Asterisks inside a word
# ("G*Power", "P*Hack") are not delimiters.
LITERAL_EMPHASIS = re.compile(r"(?<!\w)\*[^*\s](?:[^*]*[^*\s])?\*(?!\w)")


def check(site):
    return [p.path for p in site.pages
            if p.path.replace(os.sep, "/").startswith("glossary/")
            and any(LITERAL_EMPHASIS.search(text) for text in [p.title, *p.h1_texts])]
