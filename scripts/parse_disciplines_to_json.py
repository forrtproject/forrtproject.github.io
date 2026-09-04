#!/usr/bin/env python3
"""Fetch FORRT Open Research Across Disciplines data from Google Sheets and export Hugo JSON.

Usage:
    python parse_disciplines_to_json.py              # Full run (fetch + export)
    python parse_disciplines_to_json.py --dry-run    # Fetch + print stats, no file write
    python parse_disciplines_to_json.py --from-cache  # Use cached /tmp files instead of fetching

Data sources (Google Sheet 1mSlduu86_nE1sY1gXobw3Pp1vI73B_0iHBsJqjtsJU4):
    - Fields:       top-level groupings (Name, Summary, Show, Leads)
    - Disciplines:  disciplines within fields (Field, Discipline, Examples, Leads)
    - Resources:    per-discipline resources (Discipline, Title, Link, Category)

    Show and Leads are optional and located by header name, so they may sit in any
    column. Leads is free text (markdown allowed) naming the people responsible for
    a field or discipline; it is exported as "leads" and rendered under the heading.

!! data/disciplines.json IS GENERATED — DO NOT EDIT IT DIRECTLY !!

    The Google Sheet above is the source of truth. Anything you change in
    data/disciplines.json is silently discarded the next time this script runs, and
    content/disciplines/_index.md renders straight from the JSON, so a repo-side
    "fix" looks correct in a diff and in review while changing nothing durable.

    To fix a broken link on /disciplines/, edit the Link cell in the Resources tab
    (or the Examples prose in the Disciplines tab), then re-run this script and
    commit the regenerated JSON.

    Broken links repaired at source on 2026-08-05 (link-checker issue #845), all
    verified 200 before the edit — 20 cells in Resources plus one in Disciplines:
      - 6 De Gruyter journal pages   -> degruyterbrill.com/journal/key/<key>/html
                                        (culture, eng, openps, opth, ovs + index)
      - iobis.org                    -> obis.org (link target only; the surrounding
                                        text is a quotation from Feng et al. 2019,
                                        so its displayed URL was left as written)
      - lagb.org.uk/OpenAccess       -> /about-linguistics/open-access-for-uk-linguists/
      - transformationsjournal.org   -> /index.php/transformations
      - journals.sfu.ca/flr          -> frontlinelearningresearch.org
      - opensource.com open-hardware -> current slug (5-keys-open-hardware-design)
      - architecture.com image-libr. -> riba.org/explore/riba-collections/
      - iris-database.org/iris/app/  -> iris-database.org
      - manchester covert-networks   -> moved under /past-projects/
      - APS Observer preregistration -> de-mojibaked slug
      - 6 dead pages                 -> Wayback captures (ni.openaire.eu, coado.org,
                                        rsc.org event, stateofopendata.od4d.net,
                                        stm-assoc.org PDF, theiet.org OA FAQ)

    Still outstanding: qualitopia.my.canva.site (Resources row 910) is gone with no
    Wayback capture and no successor — that row needs deleting or repointing, which
    is a content decision rather than a link fix.
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


def _truthy(val: str) -> bool:
    """Spreadsheet-style truthiness: TRUE/YES/1 are true; empty defaults to true."""
    if val is None:
        return True
    s = str(val).strip().lower()
    if s == "":
        return True
    return s in {"true", "yes", "y", "1", "t"}


LEADS_HEADERS = {"leads", "lead", "discipline lead", "discipline leads"}


def _find_column(header: list[str], names: set[str]) -> int | None:
    """Index of the first header cell matching one of `names`, or None."""
    return next((i for i, h in enumerate(header) if h in names), None)


def _cell(row: list[str], idx: int | None) -> str:
    """Value of an optional column, or "" when the column or cell is absent."""
    if idx is None or idx >= len(row):
        return ""
    return str(row[idx]).strip()


def build_json(fields_rows, disciplines_rows, resources_rows) -> dict:
    """Build the disciplines.json structure from sheet data."""

    # Locate optional "Show" / "Leads" columns by header name (case-insensitive).
    fields_header = [str(c).strip().lower() for c in (fields_rows[0] if fields_rows else [])]
    disc_header = [str(c).strip().lower() for c in (disciplines_rows[0] if disciplines_rows else [])]
    show_idx = _find_column(fields_header, {"show", "visible", "publish"})
    fields_leads_idx = _find_column(fields_header, LEADS_HEADERS)
    disc_leads_idx = _find_column(disc_header, LEADS_HEADERS)

    # Parse Fields (skip header)
    fields_list = []
    for row in fields_rows[1:]:
        name = row[0] if len(row) > 0 else ""
        summary = row[1] if len(row) > 1 else ""
        show = _truthy(row[show_idx]) if show_idx is not None and show_idx < len(row) else True
        if not show:
            continue
        fields_list.append({
            "name": name,
            "summary": summary,
            "leads": _cell(row, fields_leads_idx),
        })

    # Parse Disciplines (skip header) — group by field
    disc_by_field: dict[str, list[dict]] = {}
    for row in disciplines_rows[1:]:
        field_name = row[0] if len(row) > 0 else ""
        disc_name = row[1] if len(row) > 1 else ""
        examples = row[2] if len(row) > 2 else ""
        disc_by_field.setdefault(field_name, []).append({
            "name": disc_name,
            "examples": examples,
            "leads": _cell(row, disc_leads_idx),
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
            discs = [{"name": fname, "examples": "", "leads": ""}]

        # Attach resources to each discipline
        for disc in discs:
            disc["resources"] = res_by_disc.get(disc["name"], [])

        output_fields.append({
            "number": i + 1,
            "name": fname,
            "summary": field_info["summary"],
            "leads": field_info.get("leads", ""),
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
