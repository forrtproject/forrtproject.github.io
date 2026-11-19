"""Breadcrumb JSON-LD is well formed (#867).

At most one BreadcrumbList per page; every itemListElement is a non-empty list
of objects; every ListItem has a non-empty item URL; positions run 1..n; the
page has a canonical link and the last item is that URL; no name repeats, except
that the current page may share the root's name (an author or glossary term
called "FORRT").
"""

import json


def breadcrumb_lists(page):
    """BreadcrumbList objects in the page's JSON-LD, top level or in @graph.
    Blocks that do not parse are returned as None so the check can flag them."""
    found = []
    for block in page.jsonld:
        try:
            data = json.loads(block)
        except ValueError:
            found.append(None)
            continue
        nodes = data if isinstance(data, list) else [data]
        for node in list(nodes):
            if isinstance(node, dict) and isinstance(node.get("@graph"), list):
                nodes.extend(node["@graph"])
        found.extend(n for n in nodes
                     if isinstance(n, dict) and n.get("@type") == "BreadcrumbList")
    return found


def check(site):
    failures = []
    for p in site.pages:
        lists = breadcrumb_lists(p)
        problems = []
        if None in lists:
            problems.append("JSON-LD block does not parse")
            lists = [bl for bl in lists if bl is not None]
        if len(lists) > 1:
            problems.append("%d BreadcrumbLists" % len(lists))
        for bl in lists:
            items = bl.get("itemListElement")
            if (not isinstance(items, list) or not items
                    or any(not isinstance(item, dict) for item in items)):
                problems.append("invalid itemListElement")
                continue
            names = [item.get("name") for item in items]
            if any(not item.get("item") for item in items):
                problems.append("empty item")
            if [item.get("position") for item in items] != list(range(1, len(items) + 1)):
                problems.append("positions not 1..n")
            # The page itself may share the root's name (e.g. /authors/forrt/).
            if len(names) > 1 and names[-1] == names[0]:
                names = names[1:]
            if len(set(names)) != len(names):
                problems.append("repeated name")
            if not p.canonical:
                problems.append("no canonical link")
            elif items[-1].get("item") != p.canonical:
                problems.append("last item is not the canonical URL")
        if problems:
            failures.append("%s (%s)" % (p.path, ", ".join(sorted(set(problems)))))
    return failures
