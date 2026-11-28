#!/usr/bin/env python3
"""Build data/lesson_activities.json for the Lesson Plans page.

The source is the protected "Reviewed activities" tab of the Table of Activities
workbook. Its rows match the open "Activities" tab, which anyone with the link can
edit and which this script never reads; any difference is recorded in the tab's
Notes column, which is not published. To change a card, edit the reviewed tab; do
not edit the JSON by hand. Rows with no link are left off the page until one is added.

If the sheet cannot be read or yields no rows, the existing JSON is kept and the
script exits with an error.

Usage:
    python3 scripts/build_lesson_activities.py
"""

import csv
import io
import json
import os
import re
import sys
import urllib.error
import urllib.request
from urllib.parse import urlsplit

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(ROOT_DIR, "data", "lesson_activities.json")

SHEET_CSV_URL = (
    "https://docs.google.com/spreadsheets/d/"
    "1LGdBFlOCFqyfV7NUx11oUjkqR-aVZpWVGCn8RTiQQuk/export?format=csv&gid=64080613"
)

REFERENCE_COLUMN = "Reference (if applicable)"
REQUIRED_COLUMNS = {
    "Cluster", "Title", "Description", "Learning outcomes", "Medium", "Delivery",
    "Time", "Supporting resources", REFERENCE_COLUMN,
}
LINK_PATTERN = re.compile(r"https?://[^\s<>\"]+|doi:\s?10\.\d{4,9}/[^\s<>\"]+", re.IGNORECASE)
TRAILING_PUNCTUATION = ".,;:!?)]"
MAX_LINK_LABEL = 40
LINK_FIELDS = ("description", "resources", "reference")


def link_label(url: str) -> str:
    """Return a short visible label: the address without its scheme, or just the host if long."""
    parts = urlsplit(url)
    host = parts.netloc.removeprefix("www.")
    address = host + parts.path.rstrip("/")
    if host == "doi.org" or len(address) <= MAX_LINK_LABEL:
        return address
    return host


def to_segments(text: str) -> list[dict]:
    """Split text into plain and linked segments, so the template never renders raw HTML."""
    segments = []
    position = 0
    for match in LINK_PATTERN.finditer(text):
        found = match.group().rstrip(TRAILING_PUNCTUATION)
        if match.start() > position:
            segments.append({"text": text[position:match.start()]})
        if found.lower().startswith("doi:"):
            segments.append({"text": found, "url": "https://doi.org/" + found[4:].strip()})
        else:
            segments.append({"text": link_label(found), "url": found})
        position = match.start() + len(found)
    if position < len(text):
        segments.append({"text": text[position:]})
    return segments


def split_clusters(value: str) -> list[str]:
    return [cluster.strip() for cluster in re.split(r"[;/]", value) if cluster.strip()]


def parse_row(row: dict) -> dict:
    clean = {key: (value or "").strip() for key, value in row.items() if key}
    reference = clean[REFERENCE_COLUMN]
    if reference.upper() == "N/A":
        reference = ""
    return {
        "clusters": split_clusters(clean["Cluster"]),
        "title": clean["Title"],
        "description": to_segments(clean["Description"]),
        "outcomes": to_segments(clean["Learning outcomes"]),
        "medium": clean["Medium"],
        "delivery": clean["Delivery"],
        "time": clean["Time"],
        "resources": to_segments(clean["Supporting resources"]),
        "reference": to_segments(reference),
    }


def has_link(activity: dict) -> bool:
    return any("url" in segment for field in LINK_FIELDS for segment in activity[field])


def build(text: str) -> dict:
    """Parse the sheet's CSV into the JSON written for the shortcode, in sheet order."""
    reader = csv.DictReader(io.StringIO(text))
    missing = REQUIRED_COLUMNS - set(reader.fieldnames or [])
    if missing:
        raise ValueError(f"sheet is missing columns: {sorted(missing)}")
    rows = [parse_row(row) for row in reader if (row.get("Title") or "").strip()]
    activities = [activity for activity in rows if has_link(activity)]
    clusters = {cluster for activity in activities for cluster in activity["clusters"]}
    return {"activities": activities, "clusters": sorted(clusters, key=str.casefold)}


def fetch_csv(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": "FORRT-build/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


def main() -> int:
    try:
        data = build(fetch_csv(SHEET_CSV_URL))
    except (urllib.error.URLError, TimeoutError, ValueError) as exc:
        print(f"ERROR: could not build lesson activities, keeping existing file: {exc}", file=sys.stderr)
        return 1
    if not data["activities"]:
        print("ERROR: no activities found, keeping existing file", file=sys.stderr)
        return 1
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Wrote {len(data['activities'])} activities to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
