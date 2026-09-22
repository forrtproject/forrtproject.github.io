#!/usr/bin/env python3
"""Build the citation for the Open Research Across Disciplines web resource.

Reads the contributor list from the Tenzing sheet
(1mPT7cGZIvNjOzY6Q6YPLf2CzTL9PG3I5f8oP3mhNfo0, tab "Sheet1") and writes
data/disciplines_citation.json, which layouts/partials/disciplines/intro.html
renders in the "How to cite" box.

Usage:
    python3 scripts/build_disciplines_citation.py            # fetch + write
    python3 scripts/build_disciplines_citation.py --dry-run  # print only

Author order:
    1. Rows with a number in "Order in publication", ascending by that number.
    2. Everyone else, alphabetical by surname.
    If the "Order in publication" column is empty for every row, the
    PROVISIONAL_LEAD_ORDER list below is used for step 1 instead. That list is
    a placeholder until the project leads fill in the sheet column; once any
    row in the sheet carries a number, the list is ignored.
"""

import argparse
import json
import os
import re
import subprocess
import sys

SHEET_ID = "1mPT7cGZIvNjOzY6Q6YPLf2CzTL9PG3I5f8oP3mhNfo0"
SHEET_RANGE = "Sheet1"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "data", "disciplines_citation.json")

EDITION_YEAR = 2026
TITLE = "Open Research Across Disciplines: Examples of good practice, and resources across disciplines"
URL = "https://forrt.org/disciplines/"

# Surnames placed first, in this order, while the sheet's "Order in publication"
# column is empty. Preprint authors, then the main contributors to the web edition.
PROVISIONAL_LEAD_ORDER = [
    "Farran", "Silverstein", "Wallrich", "Ameen", "Misheva", "Gilmore", "Jacobs", "Davies",
]


def fetch_rows() -> list[list[str]]:
    result = subprocess.run(
        [
            "gws", "sheets", "spreadsheets", "values", "get",
            "--params", json.dumps({"spreadsheetId": SHEET_ID, "range": SHEET_RANGE}),
            "--format", "json",
        ],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        print(f"ERROR fetching Tenzing sheet: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    raw = result.stdout.strip()
    raw = raw[raw.index("{"):]  # drop any keyring preamble before the JSON
    return json.loads(raw).get("values", [])


def initials(given: str) -> str:
    """'Annayah M.B.' -> 'A. M. B.'; 'Daniel (Dan) Dean' -> 'D. D.'; 'Jean-Paul' -> 'J.-P.'"""
    given = re.sub(r"\([^)]*\)", " ", given)          # drop nicknames in parentheses
    given = given.replace(".", " ")                    # 'M.B.' -> 'M B'
    parts = []
    for token in given.split():
        sub = [s[0].upper() + "." for s in token.split("-") if s]
        parts.append("-".join(sub))
    return " ".join(parts)


def format_author(row: dict) -> str:
    given = " ".join(p for p in (row["first"], row["middle"]) if p)
    return f"{row['surname']}, {initials(given)}"


def load_authors(rows: list[list[str]]) -> list[dict]:
    header = [str(c).strip().lower() for c in rows[0]]

    def col(name: str) -> int:
        try:
            return header.index(name.lower())
        except ValueError:
            print(f"ERROR: column '{name}' not found in Tenzing sheet header", file=sys.stderr)
            sys.exit(1)

    i_order, i_first, i_middle, i_last = (
        col("Order in publication"), col("First name"), col("Middle name"), col("Surname"),
    )

    def cell(row, i):
        return str(row[i]).strip() if i < len(row) else ""

    authors = []
    for row in rows[1:]:
        surname = cell(row, i_last)
        if not surname:
            continue
        order_raw = cell(row, i_order)
        try:
            order = float(order_raw) if order_raw else None
        except ValueError:
            print(f"WARNING: non-numeric 'Order in publication' for {surname}: {order_raw!r}", file=sys.stderr)
            order = None
        authors.append({
            "first": cell(row, i_first), "middle": cell(row, i_middle),
            "surname": surname, "order": order,
        })
    return authors


def sort_authors(authors: list[dict]) -> tuple[list[dict], str]:
    sheet_has_order = any(a["order"] is not None for a in authors)
    if sheet_has_order:
        source = "sheet 'Order in publication' column"
    else:
        source = "PROVISIONAL_LEAD_ORDER (sheet column empty)"
        rank = {s.casefold(): i for i, s in enumerate(PROVISIONAL_LEAD_ORDER)}
        for a in authors:
            a["order"] = rank.get(a["surname"].casefold())
    leads = sorted((a for a in authors if a["order"] is not None), key=lambda a: a["order"])
    rest = sorted((a for a in authors if a["order"] is None), key=lambda a: a["surname"].casefold())
    return leads + rest, source


def build_citation(authors: list[dict]) -> dict:
    names = ", ".join(format_author(a) for a in authors)
    head = f"{names}, & FORRT ({EDITION_YEAR}). {TITLE} [Online resource]. FORRT."
    return {
        "web": f"{head} {URL}",
        "web_html": f'{head} <a href="{URL}" target="_blank" rel="noopener" class="doi-link">{URL}</a>',
        "n_authors": len(authors),
    }


def main():
    parser = argparse.ArgumentParser(description="Build data/disciplines_citation.json")
    parser.add_argument("--dry-run", action="store_true", help="Print the citation, do not write")
    args = parser.parse_args()

    authors, source = sort_authors(load_authors(fetch_rows()))
    citation = build_citation(authors)
    print(f"Author order: {source}\n{citation['n_authors']} authors\n\n{citation['web']}\n")

    if args.dry_run:
        return
    with open(OUTPUT_PATH, "w") as f:
        json.dump(citation, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
