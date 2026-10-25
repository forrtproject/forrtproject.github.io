"""Generate the glossary reference list page from apa_lookup.json.

The dynamic glossary resolves per-term references from apa_lookup.json (built by
bibtex_to_apa/bibtex_to_apa.js from the "Glossary BibTex" Google Doc). This script
renders the same data as the public "List of References" page so the two stay in
sync. Run it after apa_lookup.json is regenerated:

    python3 content/glossary/_build_references.py

!! content/glossary/references/index.md IS GENERATED — DO NOT EDIT IT DIRECTLY !!

    This is the single most expensive trap in the repo, so it is worth being explicit
    about the mechanism. Both this script and bibtex_to_apa.js run unconditionally on
    every daily data-processing run, and their output ships in `data-artifact`, which
    deploy.yaml unpacks over the checkout (path: ".") *before* Hugo builds. So a fix
    committed to references/index.md or apa_lookup.json:

      - passes review, because the diff is real;
      - stays in git indefinitely, because nothing bot-commits to main;
      - and never appears on the live site, because the build overwrites it.

    PR #838 fixed ~12 glossary URLs this way in July 2026. They were still broken in
    the next link-checker report, and were still broken on forrt.org while being
    provably absent from the repo — the give-away that the overwrite happens at build
    time rather than in git history.

    To fix a reference URL, edit the "Glossary BibTex" Google Doc
    (1-KKsOYZWJ3LdgdO2b2uJsOG2AmUDaQBNqWVVTY2W4W8), which is the source of truth.

    Note that the same URL often appears in several BibTeX entries, and sometimes in
    both a `url =` and a `note = {Retrieved from \\url{...}}` field of the same entry,
    so a single-occurrence replace will leave copies behind.
"""

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
    """Linkify the bare DOI/URL in an apa_lookup HTML fragment.

    Values are HTML fragments from citation-js (journal titles in <i>/<sub>, literal
    "&", the odd &#60;/&#62; entity). They are emitted into a Markdown page rendered
    with goldmark unsafe=true, which escapes bare "&" to &amp; itself — so we only
    wrap the DOI/URL here (its literal "&" gets escaped in the href too).
    """
    return URL_RE.sub(lambda m: f'<a href="{m.group(1)}">{m.group(1)}</a>', citation)


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
