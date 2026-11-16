#!/usr/bin/env python3
"""Build data/open_research_games.json for the Open Research Games Portal page.

Source: the "Open Research Games Portal" tab of the games Google Sheet
(https://docs.google.com/spreadsheets/d/1cmydWjD1OuyKxJVfDlv0N3T474zwymfB04yFDZQO-TY),
read through its published CSV export. The games team fills that tab from the
New Entries and Additions forms, keeps only entries whose game authors agreed,
and merges several entries on one game into one row, each answer starting
with "• ". Fix a game's wording in that tab, not in the JSON.

The page (content/open-research-games-portal/) lists the games and filters
them by FORRT cluster, topic area, gameplay style and tone. This script turns
the free-text answers into those filter values:

- FORRT clusters: matched to the 11 cluster names, in cluster order.
- Topic areas: the options of the sheet's Codebook tab, matched without regard
  to case. Other topics written in by respondents stay in the text, where the
  search finds them.
- Gameplay style and tone: the Codebook options, with known variants mapped.

If the sheet cannot be read, or lacks the expected columns or rows, the script
exits with an error and leaves the existing JSON as it is.

Usage:
    python3 scripts/build_games_portal.py
"""

import csv
import io
import json
import os
import re
import sys
import tempfile
import urllib.request

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_PATH = os.path.join(ROOT_DIR, "data", "open_research_games.json")

SHEET_URL = "https://docs.google.com/spreadsheets/d/1cmydWjD1OuyKxJVfDlv0N3T474zwymfB04yFDZQO-TY/edit"
PUBLISHED = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxW5RjnjrJ7KtLo3o8yRjXS8fr3bKOyOwUE_k1b8cN2LRpwkCY3i6Cgo7dZBVFQuyfVywEymMlXRTM/pub"
# The workbook's first tab, then the same tab by its id in case the tabs are reordered.
CSV_URLS = (
    f"{PUBLISHED}?output=csv",
    f"{PUBLISHED}?gid=610093275&single=true&output=csv",
)

# Sheet column -> JSON key. Headers are matched after lower-casing and dropping
# everything but letters and digits, so "Acces(only_link)" and "Access" both match.
COLUMNS = {
    "gameid": "id", "uniqueid": "id",
    "title": "title",
    "creators": "creators",
    "description": "description",
    "accessonlylink": "access", "accesonlylink": "access", "access": "access",
    "accessadditional": "access_additional",
    "deliveryformat": "delivery_format",
    "gametype": "game_type",
    "gameplaystyle": "gameplay_style",
    "tone": "tone", "tonality": "tone",
    "numberofplayers": "number_of_players",
    "targetaudience": "target_audience",
    "lastupdated": "last_updated",
    "language": "language",
    "licence": "licence", "license": "licence",
    "topicarea": "topic_area",
    "forrtclusters": "forrt_clusters",
    "learningobjectives": "learning_objectives",
    "formalevaluation": "formal_evaluation",
    "suggestedaudience": "suggested_audience",
    "priorknowledge": "prior_knowledge",
    "playtime": "playtime",
    "scalability": "scalability",
    "teachingintegration": "teaching_integration",
    "contextspecificelements": "context_specific_elements",
    "preparation": "preparation",
    "testimonials": "testimonials",
}
REQUIRED = {"id", "title", "description", "access", "forrt_clusters", "topic_area", "gameplay_style", "tone"}
MIN_GAMES = 20  # Fewer rows means a broken export, not a smaller portal.

# Short answers listed as values ("Online", "Card game"); the rest are text.
LISTS = ("delivery_format", "game_type", "language")
TEXTS = ("creators", "description", "access_additional", "number_of_players", "target_audience",
         "last_updated", "licence", "topic_area", "learning_objectives", "formal_evaluation",
         "suggested_audience", "prior_knowledge", "playtime", "scalability", "teaching_integration",
         "context_specific_elements", "preparation", "testimonials")

# In cluster order: the position is the cluster's number, which sets its colour on the site.
CLUSTERS = (
    "Replication Crisis and Credibility Revolution",
    "Conceptual and Statistical Knowledge",
    "Ways of Working",
    "Pre-analysis Planning",
    "Transparency and Reproducibility in Computation and Analysis",
    "FAIR Data and Materials",
    "Publication Sharing",
    "Replication and Meta-Research",
    "Academic Structures and Institutions",
    "Qualitative Research",
    "Research Integrity",
)
# The Codebook tab's options, in its order.
TOPICS = (
    "Research Integrity", "Open Data", "Open Access", "Pre-registration", "Open Code",
    "Open Peer Review", "Big Team Science", "Open Educational Resources", "Open Methods",
    "Open Hardware", "Replication", "Statistical Knowledge", "Meta-Research",
    "Qualitative Research", "General Open Research", "Open Software", "Recognition and Rewards",
    "Citizen Science",
)
GAMEPLAY = ("Cooperative/Collaborative", "Competitive", "Solo", "Team-Based Competition")
GAMEPLAY_VARIANTS = {
    "competative": ["Competitive"],
    "solo/cooperative": ["Solo", "Cooperative/Collaborative"],
}
TONES = ("Lighthearted/Playful", "Balanced", "Learning-intensive")

URL = re.compile(r"https?://[^\s<>\"']+", re.I)


def key(text):
    return re.sub(r"[^a-z0-9]", "", text.lower())


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def entries(cell):
    """One answer per form entry: merged rows start each answer with "• "."""
    text = (cell or "").replace("\r\n", "\n").replace("\r", "\n").strip()
    if not text:
        return []
    parts = re.split(r"(?:^|\n)[ \t]*•[ \t]*", text) if text.startswith("•") else [text]
    out = []
    for part in parts:
        part = re.sub(r"\n{3,}", "\n\n", "\n".join(line.strip() for line in part.strip().split("\n")))
        if part and part not in out:
            out.append(part)
    return out


def values(cell):
    """Comma-separated short answers across all entries, in order, without repeats."""
    out, seen = [], set()
    for entry in entries(cell):
        for value in re.split(r"\s*[,\n]\s*", entry):
            value = value.strip(" .;")
            if value and value.lower() not in seen:
                seen.add(value.lower())
                out.append(value)
    return out


def pick(found, options):
    """Keep the found values that are options, in the options' order."""
    wanted = {key(value) for value in found}
    return [option for option in options if key(option) in wanted]


def clusters(cell):
    found = []
    for value in values(cell):
        # Older answers carry "Cluster N: name - description".
        value = re.sub(r"^cluster\s*\d+\s*:\s*", "", value, flags=re.I).split(" - ")[0]
        found.append(value)
    return [{"number": CLUSTERS.index(name) + 1, "name": name} for name in pick(found, CLUSTERS)]


def gameplay(cell):
    found = []
    for value in values(cell):
        found.extend(GAMEPLAY_VARIANTS.get(value.lower(), [value]))
    return pick(found, GAMEPLAY)


def tones(cell):
    # The form's options carry an explanation after " - ".
    return pick([value.split(" - ")[0] for value in values(cell)], TONES)


def first_url(cell):
    match = URL.search(cell or "")
    return match.group(0).rstrip(".,;)]") if match else ""


def read_rows(text):
    reader = csv.reader(io.StringIO(text))
    try:
        header = next(reader)
    except StopIteration:
        raise ValueError("the sheet is empty")
    fields = [COLUMNS.get(key(name)) for name in header]
    missing = REQUIRED - set(fields)
    if missing:
        raise ValueError(f"missing columns {sorted(missing)}; found {header}")
    rows = []
    for raw in reader:
        row = {}
        for field, cell in zip(fields, raw):
            # The first matching column wins, so "Access_additional" never replaces the link.
            if field and not row.get(field):
                row[field] = cell
        rows.append(row)
    return rows


def game(row):
    gid = (row.get("id") or "").strip()
    item = {
        "id": gid,
        "anchor": slug(gid),
        "title": " ".join((row.get("title") or "").split()),
        "url": first_url(row.get("access")),
        "clusters": clusters(row.get("forrt_clusters")),
        "topics": pick(values(row.get("topic_area")), TOPICS),
        "gameplay_style": gameplay(row.get("gameplay_style")),
        "tone": tones(row.get("tone")),
    }
    for field in LISTS:
        item[field] = values(row.get(field))
    for field in TEXTS:
        item[field] = entries(row.get(field))
    return item


def build(text):
    games = [game(row) for row in read_rows(text) if (row.get("id") or "").strip() and (row.get("title") or "").strip()]
    if len(games) < MIN_GAMES:
        raise ValueError(f"only {len(games)} games read; expected at least {MIN_GAMES}")
    ids = [g["id"] for g in games]
    if len(set(ids)) != len(ids):
        raise ValueError("a game ID appears twice")
    # Anchors are the rows' ids on the page, so each must be present and different.
    anchors = [g["anchor"] for g in games]
    if not all(anchors) or len(set(anchors)) != len(anchors):
        raise ValueError("game IDs must give distinct anchors (letters and digits)")
    games.sort(key=lambda g: (int(re.sub(r"\D", "", g["id"]) or 0), g["id"]))
    return {"source": SHEET_URL, "games": games}


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "FORRT-build/1.0"})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read().decode("utf-8")


def write(data, path):
    """Write through a temporary file, so a failed write never leaves a truncated file behind."""
    handle = tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=os.path.dirname(path), suffix=".tmp", delete=False)
    try:
        with handle:
            json.dump(data, handle, indent=1, ensure_ascii=False)
            handle.write("\n")
        os.replace(handle.name, path)
    except BaseException:
        os.unlink(handle.name)
        raise


def main():
    for url in CSV_URLS:
        try:
            data = build(fetch(url))
            break
        # Any failure of one source (network, HTTP, encoding, CSV or checks) moves on to the next.
        except (OSError, ValueError, csv.Error) as exc:
            print(f"WARNING: {url}: {exc}", file=sys.stderr)
    else:
        print("ERROR: no usable games sheet; data/open_research_games.json left unchanged.", file=sys.stderr)
        return 1
    write(data, OUTPUT_PATH)
    print(f"Wrote {len(data['games'])} games to {os.path.relpath(OUTPUT_PATH, ROOT_DIR)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
