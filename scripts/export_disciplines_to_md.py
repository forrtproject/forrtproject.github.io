#!/usr/bin/env python3
"""Export data/disciplines.json to a single editable markdown document.

Usage:
    python scripts/export_disciplines_to_md.py                       # writes scripts/output/disciplines.md
    python scripts/export_disciplines_to_md.py -o path/to/out.md     # custom path
    python scripts/export_disciplines_to_md.py --stdout              # print to stdout

The output mirrors the structure of the live page so editors can review and
mark up case-study text outside Hugo (close to the prior Google Doc layout):

    # Open Research Across Disciplines
    ## <Field>
    <field summary, if any>
    ### <Discipline>
    **Examples of open research practices:** <examples>
    #### General / Open Data / Open Methods / Open Outputs / Open Education
    - [Title](link)
"""

import argparse
import json
import os
import sys
from collections import OrderedDict

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
INPUT_PATH = os.path.join(PROJECT_ROOT, "data", "disciplines.json")
DEFAULT_OUTPUT_PATH = os.path.join(SCRIPT_DIR, "output", "disciplines.md")

CATEGORY_ORDER = ["General", "Open Data", "Open Methods", "Open Outputs", "Open Education"]


def group_resources_by_category(resources):
    """Return an OrderedDict of category -> list[resource], categories in CATEGORY_ORDER first."""
    buckets: "OrderedDict[str, list]" = OrderedDict((c, []) for c in CATEGORY_ORDER)
    for res in resources:
        cat = (res.get("category") or "").strip() or "General"
        buckets.setdefault(cat, []).append(res)
    return OrderedDict((c, items) for c, items in buckets.items() if items)


def format_resource(res):
    title = (res.get("title") or "").strip()
    link = (res.get("link") or "").strip()
    if link and title:
        return f"- [{title}]({link})"
    if link:
        return f"- <{link}>"
    return f"- {title}" if title else ""


def render_markdown(data):
    out = ["# Open Research Across Disciplines", ""]

    for field in data.get("fields", []):
        out.append(f"## {field.get('name', '').strip()}")
        out.append("")
        summary = (field.get("summary") or "").strip()
        if summary:
            out.append(summary)
            out.append("")

        for disc in field.get("disciplines", []):
            disc_name = (disc.get("name") or "").strip()
            # Skip the implicit "discipline" that mirrors its field name (used for
            # fields like "Relevant across multiple disciplines" with no children).
            if disc_name and disc_name != field.get("name"):
                out.append(f"### {disc_name}")
                out.append("")

            examples = (disc.get("examples") or "").strip()
            if examples:
                out.append(f"**Examples of open research practices:** {examples}")
                out.append("")

            grouped = group_resources_by_category(disc.get("resources", []))
            if not grouped:
                out.append("_No resources listed for this discipline yet._")
                out.append("")
                continue

            for cat, items in grouped.items():
                out.append(f"#### {cat}")
                out.append("")
                for res in items:
                    line = format_resource(res)
                    if line:
                        out.append(line)
                out.append("")

    return "\n".join(out).rstrip() + "\n"


def main():
    parser = argparse.ArgumentParser(description="Export disciplines.json to markdown")
    parser.add_argument("-i", "--input", default=INPUT_PATH, help="Input disciplines.json path")
    parser.add_argument("-o", "--output", default=DEFAULT_OUTPUT_PATH, help="Output markdown path")
    parser.add_argument("--stdout", action="store_true", help="Print to stdout instead of writing a file")
    args = parser.parse_args()

    with open(args.input) as f:
        data = json.load(f)

    md = render_markdown(data)

    if args.stdout:
        sys.stdout.write(md)
        return

    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    with open(args.output, "w") as f:
        f.write(md)
    print(f"Wrote {args.output}")


if __name__ == "__main__":
    main()
