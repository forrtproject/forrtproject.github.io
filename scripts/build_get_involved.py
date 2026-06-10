#!/usr/bin/env python3
"""Build data/get_involved_projects.json for the Get Involved page.

The canonical source is a Google Sheet with the columns:

    order, display, name, link, description, slack, contact_name, contact_email

The ``display`` column is a TRUE/FALSE toggle — only TRUE rows are rendered.
Empty / missing values default to TRUE so the column can be left blank for
all-on rows.

Publish the sheet as CSV (File → Share → Publish to web →
Comma-separated values) and put the URL in the GET_INVOLVED_SHEET_CSV
environment variable, or paste it into PUBLISHED_SHEET_CSV_URL below.

If the published URL is unset or unreachable, the script falls back to
``scripts/get_involved/projects.csv`` so the build still succeeds and
local edits are easy.

Usage:
    python scripts/build_get_involved.py
"""

import csv
import io
import json
import os
import sys
import urllib.error
import urllib.request

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
LOCAL_CSV_PATH = os.path.join(SCRIPT_DIR, "get_involved", "projects.csv")
OUTPUT_PATH = os.path.join(ROOT_DIR, "data", "get_involved_projects.json")

# Public CSV-export URL for the canonical sheet. The sheet is shared as
# "anyone with the link → Viewer", so the gviz/export endpoint works without
# needing the manual "Publish to web" step. Override with GET_INVOLVED_SHEET_CSV.
PUBLISHED_SHEET_CSV_URL = (
    "https://docs.google.com/spreadsheets/d/"
    "1hoJYSxr_586hmBR00jqes4TeGofyl6qRgxkgL828Vx4/export?format=csv&gid=120740384"
)

REQUIRED_COLUMNS = {"name", "description", "contact_name"}
ALL_COLUMNS = [
    "order",
    "display",
    "name",
    "link",
    "description",
    "slack",
    "contact_name",
    "contact_email",
]
TRUTHY = {"true", "1", "yes", "y", "on", ""}
FALSY = {"false", "0", "no", "n", "off"}


def is_displayed(value: str) -> bool:
    """Treat blank as TRUE; only an explicit FALSE-like value hides a row."""
    v = value.strip().lower()
    if v in FALSY:
        return False
    if v in TRUTHY:
        return True
    print(f"  WARNING: unrecognised display value {value!r}; treating as TRUE")
    return True


def fetch_remote_csv(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "FORRT-build/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8")


def load_rows() -> list[dict]:
    url = os.environ.get("GET_INVOLVED_SHEET_CSV") or PUBLISHED_SHEET_CSV_URL
    text: str | None = None
    if url:
        try:
            print(f"Fetching projects from {url}")
            text = fetch_remote_csv(url)
        except (urllib.error.URLError, TimeoutError) as exc:
            print(f"  WARNING: remote fetch failed ({exc}); falling back to local CSV")
    if text is None:
        print(f"Reading projects from {LOCAL_CSV_PATH}")
        with open(LOCAL_CSV_PATH, encoding="utf-8") as f:
            text = f.read()
    reader = csv.DictReader(io.StringIO(text))
    if reader.fieldnames is None or not REQUIRED_COLUMNS.issubset(reader.fieldnames):
        raise SystemExit(
            f"CSV is missing required columns. Found: {reader.fieldnames}; "
            f"need at least: {sorted(REQUIRED_COLUMNS)}"
        )
    return [{col: (row.get(col) or "").strip() for col in ALL_COLUMNS} for row in reader]


def normalise(rows: list[dict]) -> list[dict]:
    out: list[dict] = []
    for row in rows:
        if not row["name"]:
            continue
        if not is_displayed(row["display"]):
            continue
        try:
            order = int(row["order"]) if row["order"] else 9999
        except ValueError:
            order = 9999
        out.append({
            "order": order,
            "name": row["name"],
            "link": row["link"],
            "description": row["description"],
            "slack": row["slack"],
            "contact_name": row["contact_name"],
            "contact_email": row["contact_email"],
        })
    out.sort(key=lambda r: (r["order"], r["name"].lower()))
    return out


def main() -> int:
    rows = normalise(load_rows())
    if not rows:
        print("ERROR: no project rows after parsing", file=sys.stderr)
        return 1
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump({"projects": rows}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Wrote {len(rows)} projects to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
