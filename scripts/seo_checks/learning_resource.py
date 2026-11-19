"""Curated resources carry one clean LearningResource (#863).

Every curated-resource page carries exactly one LearningResource JSON-LD block
that parses, has a name and url, and holds no empty or placeholder values. Every
JSON-LD block on those pages must parse.
"""

import json
import os

PLACEHOLDERS = {"", "-", "na", "n/a", "n.a.", "none", "other", "<nil>"}


def empty_values(node, path="$"):
    """Paths of empty strings, lists or objects and placeholder strings."""
    if node is None or node == "" or node == [] or node == {}:
        return [path]
    if isinstance(node, dict):
        return [p for k, v in node.items() for p in empty_values(v, "%s.%s" % (path, k))]
    if isinstance(node, list):
        return [p for i, v in enumerate(node) for p in empty_values(v, "%s[%d]" % (path, i))]
    if isinstance(node, str) and node.strip().lower() in PLACEHOLDERS:
        return ["%s=%r" % (path, node)]
    return []


def check(site):
    bad = []
    for p in site.pages:
        parts = p.path.split(os.sep)
        if len(parts) != 3 or parts[0] != "curated_resources":
            continue
        try:
            blocks = [json.loads(b) for b in p.jsonld]
        except ValueError as err:
            bad.append("%s (invalid JSON-LD: %s)" % (p.path, err))
            continue
        found = [b for b in blocks if isinstance(b, dict) and b.get("@type") == "LearningResource"]
        if len(found) != 1:
            bad.append("%s (%d LearningResource blocks)" % (p.path, len(found)))
            continue
        # The title is the resource's own, so "Other" is a valid one.
        problems = ["missing " + k for k in ("name", "url") if not found[0].get(k)]
        problems += empty_values({k: v for k, v in found[0].items() if k != "name"})
        if problems:
            bad.append("%s (%s)" % (p.path, ", ".join(problems[:3])))
    return bad
