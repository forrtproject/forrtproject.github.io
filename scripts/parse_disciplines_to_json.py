#!/usr/bin/env python3
"""Fetch FORRT Open Research Across Disciplines data from Google Sheets and export Hugo JSON.

Usage:
    python parse_disciplines_to_json.py              # Full run (fetch + export)
    python parse_disciplines_to_json.py --dry-run    # Fetch + print stats, no file write
    python parse_disciplines_to_json.py --from-cache  # Use cached /tmp files instead of fetching

Data sources (Google Sheet 1mSlduu86_nE1sY1gXobw3Pp1vI73B_0iHBsJqjtsJU4):
    - Fields:       top-level groupings (Name, Summary)
    - Disciplines:  disciplines within fields (Field, Discipline, Examples)
    - Resources:    per-discipline resources (Discipline, Title, Link, Category)
"""

import argparse
import json
import os
import subprocess
import sys

SHEET_ID = "1mSlduu86_nE1sY1gXobw3Pp1vI73B_0iHBsJqjtsJU4"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "data", "disciplines.json")

CACHE_DIR = "/tmp/forrt_disciplines_cache"


def fetch_sheet(sheet_name: str, use_cache: bool = False) -> list[list[str]]:
    """Fetch a sheet tab via gws CLI; returns list of rows (each a list of strings)."""
    cache_path = os.path.join(CACHE_DIR, f"{sheet_name}.json")

    if use_cache and os.path.exists(cache_path):
        print(f"  Using cached {sheet_name} from {cache_path}")
        with open(cache_path) as f:
            return json.load(f)

    print(f"  Fetching sheet '{sheet_name}' via gws ...")
    result = subprocess.run(
        [
            "gws", "sheets", "spreadsheets", "values", "get",
            "--params", json.dumps({"spreadsheetId": SHEET_ID, "range": sheet_name}),
            "--format", "json",
        ],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        print(f"ERROR fetching {sheet_name}: {result.stderr}", file=sys.stderr)
        sys.exit(1)

    # gws may print "Using keyring backend: keyring" before the JSON
    raw = result.stdout.strip()
    lines = raw.split("\n")
    if lines[0].startswith("Using"):
        raw = "\n".join(lines[1:])

    data = json.loads(raw)
    rows = data.get("values", [])

    os.makedirs(CACHE_DIR, exist_ok=True)
    with open(cache_path, "w") as f:
        json.dump(rows, f)

    return rows


def build_json(fields_rows, disciplines_rows, resources_rows) -> dict:
    """Build the disciplines.json structure from sheet data."""

    # Parse Fields (skip header)
    fields_list = []
    for row in fields_rows[1:]:
        name = row[0] if len(row) > 0 else ""
        summary = row[1] if len(row) > 1 else ""
        fields_list.append({"name": name, "summary": summary})

    # Parse Disciplines (skip header) — group by field
    disc_by_field: dict[str, list[dict]] = {}
    for row in disciplines_rows[1:]:
        field_name = row[0] if len(row) > 0 else ""
        disc_name = row[1] if len(row) > 1 else ""
        examples = row[2] if len(row) > 2 else ""
        disc_by_field.setdefault(field_name, []).append({
            "name": disc_name,
            "examples": examples,
        })

    # Parse Resources (skip header) — group by discipline
    res_by_disc: dict[str, list[dict]] = {}
    for row in resources_rows[1:]:
        disc_name = row[0] if len(row) > 0 else ""
        title = row[1] if len(row) > 1 else ""
        link = row[2] if len(row) > 2 else ""
        category = row[3] if len(row) > 3 else ""
        res_by_disc.setdefault(disc_name, []).append({
            "title": title,
            "link": link,
            "category": category,
        })

    # Assemble final structure
    output_fields = []
    for i, field_info in enumerate(fields_list):
        fname = field_info["name"]

        # Get disciplines for this field
        discs = disc_by_field.get(fname, [])

        # For fields with no explicit disciplines entry (e.g. "Relevant across
        # multiple disciplines"), create a single implicit discipline
        if not discs:
            discs = [{"name": fname, "examples": ""}]

        # Attach resources to each discipline
        for disc in discs:
            disc["resources"] = res_by_disc.get(disc["name"], [])

        output_fields.append({
            "number": i + 1,
            "name": fname,
            "summary": field_info["summary"],
            "disciplines": discs,
        })

    return {"fields": output_fields}


def print_stats(data: dict):
    total_disc = 0
    total_res = 0
    for field in data["fields"]:
        n_disc = len(field["disciplines"])
        n_res = sum(len(d["resources"]) for d in field["disciplines"])
        total_disc += n_disc
        total_res += n_res
        print(f"  Field {field['number']:2d}: {field['name']:<50s} "
              f"({n_disc} disciplines, {n_res} resources)")
    print(f"\n  Total: {len(data['fields'])} fields, {total_disc} disciplines, {total_res} resources")


def main():
    parser = argparse.ArgumentParser(description="Build disciplines.json for Hugo")
    parser.add_argument("--dry-run", action="store_true", help="Print stats only, don't write JSON")
    parser.add_argument("--from-cache", action="store_true", help="Use cached sheet data from /tmp")
    args = parser.parse_args()

    print("Fetching sheet data ...")
    fields_rows = fetch_sheet("Fields", use_cache=args.from_cache)
    disciplines_rows = fetch_sheet("Disciplines", use_cache=args.from_cache)
    resources_rows = fetch_sheet("Resources", use_cache=args.from_cache)

    print(f"  Fields: {len(fields_rows) - 1} rows, "
          f"Disciplines: {len(disciplines_rows) - 1} rows, "
          f"Resources: {len(resources_rows) - 1} rows")

    print("\nBuilding JSON ...")
    data = build_json(fields_rows, disciplines_rows, resources_rows)
    print_stats(data)

    if args.dry_run:
        print("\n[dry-run] No file written.")
        return

    with open(OUTPUT_PATH, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"\nWrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
