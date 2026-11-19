"""No double-escaped entity in a meta description (#864).

A description must not contain an entity such as `&amp;ldquo;`. Text that merely
looks like an entity (`&name;`) is not one.
"""

import re
from html.entities import html5

# Attribute values arrive already unescaped, so any entity left in them was
# escaped twice in the HTML (e.g. `&amp;ldquo;`).
LITERAL_ENTITY = re.compile(r"&(#\d+|#x[0-9a-fA-F]+|[A-Za-z][A-Za-z0-9]*);")


def literal_entities(description):
    """Real character references left in a description, as opposed to escaped
    text that only looks like one (`&name;`)."""
    return {m.group(0) for m in LITERAL_ENTITY.finditer(description)
            if m.group(1).startswith("#") or m.group(1) + ";" in html5}


def check(site):
    failures = []
    for p in site.pages:
        found = set().union(*map(literal_entities, p.descriptions))
        if found:
            failures.append("%s (%s)" % (p.path, ", ".join(sorted(found))))
    return failures
