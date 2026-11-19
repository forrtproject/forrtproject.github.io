"""Related terms and other names for glossary entries, from two tabs of the Glossary sheet.

`related_terms` holds one row per pair: `term` (an EN_title) and `related` (the
name to show). `related_terms_linking` maps other names to an entry: `name`,
`term`, `type` and `show_as_aka`. The generator matches names exactly against
these tabs instead of guessing from spelling, so the sheet decides what links.
"""


def _clean(value):
    return str(value or "").strip()


def _is_true(value):
    return _clean(value).upper() in ("TRUE", "YES", "1")


def build_related(related_rows, linking_rows, titles):
    """Return {EN_title: [related names]}, in sheet order.

    A related name that is an entry title (ignoring case) becomes that title. A
    name listed in the linking tab becomes the entry, or entries, it maps to.
    Anything else stays as written,
    which is how a term that has no entry yet is shown as plain text. Self-links
    and repeats are dropped. Also returns warnings for rows the sheet should fix.
    """
    titles = set(titles)
    by_title = {t.lower(): t for t in titles}
    by_name = {}
    for row in linking_rows:
        name, term = _clean(row.get("name")), _clean(row.get("term"))
        if name and term:
            by_name.setdefault(name.lower(), []).append(term)

    related, warnings = {}, []
    for row in related_rows:
        term, name = _clean(row.get("term")), _clean(row.get("related"))
        if not term or not name:
            continue
        if term not in titles:
            warnings.append(f"related_terms: '{term}' is not an entry title")
            continue
        if name.lower() in by_title:
            targets = [by_title[name.lower()]]
        else:
            targets = by_name.get(name.lower(), [name])
        names = related.setdefault(term, [])
        for target in targets:
            if target.lower() != term.lower() and target.lower() not in (n.lower() for n in names):
                names.append(target)
    return related, warnings


def build_also_known_as(linking_rows, titles):
    """Return {EN_title: [other names]} for linking rows ticked `show_as_aka`."""
    titles = set(titles)
    aka = {}
    for row in linking_rows:
        name, term = _clean(row.get("name")), _clean(row.get("term"))
        if name and term in titles and _is_true(row.get("show_as_aka")):
            names = aka.setdefault(term, [])
            if name.lower() not in (n.lower() for n in names):
                names.append(name)
    return aka
