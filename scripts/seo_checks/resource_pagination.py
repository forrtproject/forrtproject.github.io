"""Resource subsets have consistent, unique metadata (#868).

Numbered resource subsets (/resources/page/N/) have unique, self-canonical
metadata and CollectionPage data matching their HTML cards. Preview base paths
are allowed.
"""

import json
import os
import re
from urllib.parse import urlparse


def check(site):
    pages = site.pages
    directory = next((p for p in pages if p.path == os.path.join("resources", "index.html")), None)
    if directory is None:
        return []  # This check also supports small fixtures with no directory.
    failures = []
    titles, descriptions = set(), set()
    root = (directory.canonical or "").rstrip("/") + "/"
    for p in pages:
        match = re.fullmatch(r"resources/page/([2-9]|[1-9]\d+)/index\.html", p.path.replace(os.sep, "/"))
        if p is not directory and not match:
            continue
        number = int(match[1]) if match else 1
        expected = root if number == 1 else root + "page/%d/" % number
        problems = []
        if not directory.canonical or p.canonical != expected:
            problems.append("not self-canonical")
        if p.meta.get("og:url") != expected:
            problems.append("og:url does not match canonical")
        if p.noindex != directory.noindex:
            problems.append("subset robots metadata differs from the directory")
        for label, value, seen in (("title", p.title, titles),
                                   ("description", next(iter(p.descriptions), ""), descriptions)):
            if not value or value in seen:
                problems.append("empty or repeated " + label)
            seen.add(value)
        if p.meta.get("og:title") != p.title:
            problems.append("og:title does not match title")
        if number > 1 and ("Page %d" % number not in p.title
                           or "page %d" % number not in next(iter(p.descriptions), "")):
            problems.append("metadata omits page number")
        try:
            blocks = [json.loads(block) for block in p.jsonld]
            collections = [block for block in blocks if isinstance(block, dict)
                           and block.get("@type") == "CollectionPage"]
        except ValueError:
            collections = []
        if len(collections) != 1:
            problems.append("missing CollectionPage")
        else:
            collection = collections[0]
            if (collection.get("url") != expected
                    or collection.get("@id") != expected + "#collection"
                    or collection.get("name") != p.title.rsplit(" | ", 1)[0]):
                problems.append("CollectionPage URL/name does not match metadata")
            items = collection.get("mainEntity", {})
            listed = items.get("itemListElement", [])
            links = [urlparse(item.get("url", "")).path for item in listed]
            if (not p.resource_links or links != p.resource_links
                    or items.get("numberOfItems") != len(p.resource_links)):
                problems.append("CollectionPage subset does not match HTML cards")
        if problems:
            failures.append("%s (%s)" % (p.path, ", ".join(problems)))
    return failures
