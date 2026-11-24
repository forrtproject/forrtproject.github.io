"""Generate the glossary reference list page from the glossary term files.

Each term file (content/glossary/<language>/*.md, written by _create_glossaries.py)
carries its references already formatted from apa_lookup.json. This script collects
them into the public "List of References" page, listing only references that a term
cites and linking each one back to the terms that cite it. Run it after the term
files are regenerated:

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

import glob
import json
import os
import re
import unicodedata
from collections import defaultdict
from html import escape

script_dir = os.path.dirname(os.path.abspath(__file__))
out_path = os.path.join(script_dir, "references", "index.md")

LANGUAGES = ["english", "german", "arabic", "chinese", "turkish"]
LANGUAGE_LABELS = {"german": "DE", "arabic": "AR", "chinese": "ZH", "turkish": "TR"}

MD_LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")
URL_RE = re.compile(r"(?<![\"'>])(https?://[^\s<>]+[^\s<>.,;)])")


def sort_key(citation):
    # Sort like a bibliography: by the leading author/title text, ignoring
    # leading markup/punctuation, case and diacritics (so "Özkan" files under O).
    text = re.sub(r"<[^>]+>", "", MD_LINK_RE.sub(r"\1", citation))
    text = "".join(c for c in unicodedata.normalize("NFKD", text) if not unicodedata.combining(c))
    return re.sub(r"^[^\w]+", "", text).casefold()


def render(citation):
    """Turn a term-file reference into HTML.

    Most references are HTML fragments from citation-js with a bare DOI/URL, which is
    linkified here. A few are Markdown links written directly in the glossary sheet;
    those are converted to <a> tags because Markdown is not processed inside the
    surrounding HTML block. Bare "&" is left for goldmark (unsafe=true) to escape.
    """
    if MD_LINK_RE.search(citation):
        return MD_LINK_RE.sub(lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', citation)
    return URL_RE.sub(lambda m: f'<a href="{m.group(1)}">{m.group(1)}</a>', citation)


def collect():
    """Map each reference string to the terms citing it, per language."""
    cited_by = defaultdict(lambda: defaultdict(list))
    for language in LANGUAGES:
        for path in sorted(glob.glob(os.path.join(script_dir, language, "*.md"))):
            if os.path.basename(path).startswith("_"):
                continue
            with open(path, encoding="utf-8") as f:
                term = json.load(f)
            slug = os.path.splitext(os.path.basename(path))[0]
            for ref in term.get("references") or []:
                if ref and ref.strip():
                    cited_by[ref.strip()][language].append((term["title"], f"/glossary/{language}/{slug}/"))
    return cited_by


def term_links(languages):
    """English terms where available; otherwise the citing terms in other languages."""
    if "english" in languages:
        terms = [(title, url, "") for title, url in languages["english"]]
    else:
        terms = [(title, url, LANGUAGE_LABELS[lang]) for lang, items in languages.items() for title, url in items]
    terms.sort(key=lambda t: t[0].casefold())
    return ", ".join(
        f'<a href="{url}">{escape(title)}</a>' + (f" ({label})" if label else "") for title, url, label in terms
    )


def main():
    cited_by = collect()
    citations = sorted(cited_by, key=sort_key)
    letters = []
    body = []
    for citation in citations:
        letter = sort_key(citation)[:1].upper()
        letter = letter if letter.isalpha() and letter.isascii() else "#"
        if letter not in letters:
            letters.append(letter)
            if len(letters) > 1:
                body.append("</div>\n")
            body.append(f'<h2 id="{letter.lower() if letter != "#" else "other"}">{letter}</h2>\n')
            body.append('<div class="csl-bib-body glossary-refs">')
        body.append(
            f'  <div class="csl-entry">{render(citation)}'
            f'<div class="ref-terms">Cited in: {term_links(cited_by[citation])}</div></div>'
        )
    body.append("</div>\n")

    nav = "".join(f'<a href="#{l.lower() if l != "#" else "other"}">{l}</a>' for l in letters)
    header = f"""---
title: List of References
---

These are the {len(citations)} references cited in the [FORRT Glossary](/glossary/).

<nav class="ref-letters" aria-label="Jump to letter">{nav}</nav>

<style>
.glossary-refs .csl-entry {{ margin: 0 0 1em 2em; text-indent: -2em; line-height: 1.6; }}
.glossary-refs .ref-terms {{ text-indent: 0; font-size: 0.85em; opacity: 0.8; margin-top: 0.15em; }}
.ref-letters {{ display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.2em 0.5em;
  margin: 1.5em 0 1em; padding: 0.6em 0; border-top: 1px solid rgba(128,128,128,.3);
  border-bottom: 1px solid rgba(128,128,128,.3); font-size: 0.95em; font-weight: 600; }}
.ref-letters a {{ color: inherit; opacity: 0.7; text-decoration: none; }}
.ref-letters a:hover {{ opacity: 1; color: var(--primary, #a10000); }}
</style>
"""
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(header + "\n" + "\n".join(body))
    print(f"Wrote {len(citations)} references to {out_path}")


if __name__ == "__main__":
    main()
