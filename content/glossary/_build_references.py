"""Generate the glossary reference list page (/glossary/references/).

The dynamic glossary resolves per-term references from apa_lookup.json (built by
bibtex_to_apa/bibtex_to_apa.js from the "Glossary BibTex" Google Doc). The public
"List of References" is rendered from the same file by
layouts/partials/doors/glossary_references.html, so the two stay in sync; this
script writes only the page's front matter and introduction. Run it after
apa_lookup.json is regenerated:

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

script_dir = os.path.dirname(os.path.abspath(__file__))
apa_path = os.path.join(script_dir, "apa_lookup.json")
out_path = os.path.join(script_dir, "references", "index.md")

HEADER = """---
title: Glossary references
---

You can find the list of all references that were used to create the Glossary.
"""


def main():
    # The list itself is rendered by layouts/partials/doors/glossary_references.html from apa_lookup.json, with
    # letters, a search and, under each reference, the terms that cite it. This page only gives it a URL and title.
    with open(apa_path, encoding="utf-8") as f:
        apa = json.load(f)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(HEADER)

    print(f"Wrote the reference list page for {len(set(apa.values()))} references to {out_path}")


if __name__ == "__main__":
    main()
