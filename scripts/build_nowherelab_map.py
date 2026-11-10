#!/usr/bin/env python3
"""Build static/data/nowherelab_members.json for the Nowhere Lab member map.

Source: the Nowhere Lab members-by-country tab of a Google Sheet shared as
"anyone with the link can view". Its four columns are read by position:
country, member count, latitude, longitude. The header row is skipped, so the
survey question in the first header can be reworded freely.

The map page static/apps/nowherelab_map.html reads the JSON this script writes.
If the sheet cannot be fetched or fails validation, the existing JSON is kept.

Usage:
    python3 scripts/build_nowherelab_map.py
"""

import csv
import io
import json
import os
import sys
import urllib.request

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_PATH = os.path.join(ROOT_DIR, "static", "data", "nowherelab_members.json")
SHEET_CSV_URL = (
    "https://docs.google.com/spreadsheets/d/"
    "10BL4SbjH7mPAPasFQhP4NyW49QHz5DKix334Gsr4HCE/export?format=csv&gid=1453647267"
)


def parse(text: str) -> list[dict]:
    rows = list(csv.reader(io.StringIO(text)))
    members = []
    for i, row in enumerate(rows[1:], start=2):
        if not row or not row[0].strip():
            continue
        if len(row) < 4:
            raise ValueError(f"row {i} has fewer than four columns: {row}")
        country = row[0].strip()
        count = int(float(row[1]))
        lat, lon = float(row[2]), float(row[3])
        if count < 1 or not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
            raise ValueError(f"row {i} has an implausible value: {row}")
        members.append({"country": country, "count": count, "lat": round(lat, 4), "lon": round(lon, 4)})
    if not members:
        raise ValueError("no member rows found")
    return sorted(members, key=lambda m: m["country"])


def main() -> int:
    try:
        req = urllib.request.Request(SHEET_CSV_URL, headers={"User-Agent": "FORRT-build/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            members = parse(resp.read().decode("utf-8"))
    except Exception as exc:  # keep the committed data on any failure
        print(f"WARNING: Nowhere Lab map data not updated: {exc}")
        return 0
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(members, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"Wrote {len(members)} countries, {sum(m['count'] for m in members)} members to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
