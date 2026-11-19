"""Conditional highlight.js and Mermaid loading.

highlight.min.js is loaded exactly on pages with a <pre><code> block in their
content (the cite modal's <code class="tex hljs"> on every page does not count;
language-mermaid blocks belong to Mermaid), and mermaid.min.js exactly on pages
with a language-mermaid block.
"""


def check(site):
    pages = site.pages
    return {
        "highlight.min.js loaded without a code block":
            [p.path for p in pages if p.loads("highlight.min.js") and not p.has_highlight_code],
        "code block without highlight.min.js":
            [p.path for p in pages if p.has_highlight_code and not p.loads("highlight.min.js")],
        "mermaid.min.js loaded without a language-mermaid block":
            [p.path for p in pages if p.loads("mermaid.min.js") and not p.has_mermaid_code],
        "language-mermaid block without mermaid.min.js":
            [p.path for p in pages if p.has_mermaid_code and not p.loads("mermaid.min.js")],
    }
