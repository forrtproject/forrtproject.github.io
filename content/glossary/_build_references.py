"""Generate the glossary reference list page from apa_lookup.json.

The dynamic glossary resolves per-term references from apa_lookup.json (built by
bibtex_to_apa/bibtex_to_apa.js from the "Glossary BibTex" Google Doc). This script
renders the same data as the public "List of References" page so the two stay in
sync. Run it after apa_lookup.json is regenerated:

    python3 content/glossary/_build_references.py
"""

import html
import json
import os
import re

script_dir = os.path.dirname(os.path.abspath(__file__))
apa_path = os.path.join(script_dir, "apa_lookup.json")
out_path = os.path.join(script_dir, "references", "index.md")

URL_RE = re.compile(r"(https?://[^\s<>]+[^\s<>.,;)])")

HEADER = """---
title: List of References
---

You can find the list of all references that were used to create the Glossary.

{{< alert info >}}

We are currently working on a better way to display and cross-link the references with the terms they are used for.

{{< /alert >}}

<div class="csl-bib-body" style="line-height: 2; margin-left: 2em; text-indent:-2em;">
"""


def sort_key(citation):
    # Sort like a bibliography: by the leading author/title text, ignoring
    # leading markup/punctuation and case.
    return re.sub(r"^[^\w]+", "", citation).casefold()


def render(citation):
    """HTML-escape a citation string and turn its URLs into links."""
    escaped = html.escape(citation)
    # URLs can't contain the entities introduced by escaping, so it is safe to
    # linkify after escaping.
    return URL_RE.sub(lambda m: f'<a href="{m.group(1)}">{m.group(1)}</a>', escaped)


def main():
    with open(apa_path, encoding="utf-8") as f:
        apa = json.load(f)

    # Dedupe identical citation strings (distinct keys can share a reference).
    citations = sorted(set(apa.values()), key=sort_key)

    lines = [HEADER]
    for citation in citations:
        lines.append(f'  <div class="csl-entry">{render(citation)}</div>')
    lines.append("</div>\n")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Wrote {len(citations)} references to {out_path}")


if __name__ == "__main__":
    main()
