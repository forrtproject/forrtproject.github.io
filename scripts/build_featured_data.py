#!/usr/bin/env python3
"""Build featured_resources.json for FORRT cluster pages.

Fetches the Recommendations form responses and the Publications sheet
(via published CSV URLs), matches recommended DOIs to enriched publication
metadata, maps each to its cluster, and outputs data/featured_resources.json,
data/pub_cards.json, and data/filter_tags.json.

No credentials required — all data sources are published as public CSVs.

Usage:
    python scripts/build_featured_data.py
"""

import csv
import hashlib
import io
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(ROOT_DIR, "data", "featured_resources.json")
PUB_CARDS_PATH = os.path.join(ROOT_DIR, "data", "pub_cards.json")
FILTER_TAGS_PATH = os.path.join(ROOT_DIR, "data", "filter_tags.json")

# Published CSV URLs (Google Sheets → File → Share → Publish to web)
PUB_SHEET_BASE = "https://docs.google.com/spreadsheets/d/e/2PACX-1vThLoddqfkSkIvLy5VJiYx75ibVKY5NwKZEZ4XRdSakBjJ1Q77kxtCOGJ_nRcLSJJfEV8FUIidI-VBy/pub"
CLUSTERS_CSV_URL = f"{PUB_SHEET_BASE}?gid=0&single=true&output=csv"
SUBCLUSTERS_CSV_URL = f"{PUB_SHEET_BASE}?gid=2142431425&single=true&output=csv"
PUBLICATIONS_CSV_URL = f"{PUB_SHEET_BASE}?gid=1999901341&single=true&output=csv"
TAGS_CSV_URL = f"{PUB_SHEET_BASE}?gid=1313785554&single=true&output=csv"
RECOMMENDATIONS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSei1F63CtZ8txpJpdSLbISurscnMtdeVr1izJRTv8XfH5d3T39ywdjCxo9u6JIEVzC0iERcjrHrVh1/pub?output=csv"
VOTES_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1crENS9uAtDvKy2rcPDZj_hQvYY1vcjOz4_74_H4LLT7kWE9o4zZX296S6xD5HFbquPnpJ_AOzuE5/pub?output=csv"

# DOI regex for extracting from URLs
DOI_RE = re.compile(r"(?:https?://)?(?:dx\.)?doi\.org/(.+?)(?:\s|$)", re.IGNORECASE)
DOI_BARE_RE = re.compile(r"^10\.\d{4,9}/.+$")

PHOTOS_DIR = os.path.join(ROOT_DIR, "static", "img", "featured-recommenders")


def fetch_csv(url: str, skip_header: bool = False) -> list[list[str]]:
    """Fetch a published Google Sheets CSV and return rows as lists of strings."""
    req = urllib.request.Request(url, headers={"User-Agent": "FORRT-build/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        text = resp.read().decode("utf-8")
    reader = csv.reader(io.StringIO(text))
    if skip_header:
        next(reader, None)
    return [row for row in reader]


def download_photo(url: str, name: str) -> str:
    """Download a photo from url, save to PHOTOS_DIR, return site-relative path or '' on failure."""
    if not url:
        return ""
    os.makedirs(PHOTOS_DIR, exist_ok=True)
    ext = ".jpg"
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
    filename = f"{slug}-{url_hash}{ext}"
    filepath = os.path.join(PHOTOS_DIR, filename)
    if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
        return f"/img/featured-recommenders/{filename}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "FORRT-build/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            content_type = resp.headers.get("Content-Type", "")
            if not content_type.startswith("image/"):
                print(f"  WARNING: Photo URL returned {content_type}, not an image for {name}: {url}")
                return ""
            data = resp.read()
            if len(data) < 500:
                print(f"  WARNING: Photo too small ({len(data)} bytes) for {name}: {url}")
                return ""
            with open(filepath, "wb") as f:
                f.write(data)
        return f"/img/featured-recommenders/{filename}"
    except Exception as e:
        print(f"  WARNING: Could not download photo for {name}: {e}")
        return ""


def extract_doi(url: str) -> str | None:
    """Extract and normalise a DOI from a URL or bare DOI string."""
    url = url.strip()
    if not url:
        return None
    m = DOI_RE.search(url)
    if m:
        return m.group(1).lower().rstrip("/.,;")
    if DOI_BARE_RE.match(url):
        return url.lower().rstrip("/.,;")
    return None


def make_short_ref(apa: str) -> str:
    """Generate a compact citation like 'Munafo et al. (2017)' from an APA string."""
    if not apa:
        return ""
    m = re.match(r"^(.+?)\((\d{4})\)", apa)
    if not m:
        return apa[:60]
    authors_part = m.group(1).strip().rstrip(",").strip()
    year = m.group(2)
    amp_count = authors_part.count("&")
    if amp_count == 0:
        surname = authors_part.split(",")[0].strip()
        return f"{surname} ({year})"
    elif amp_count == 1 and len(authors_part) < 60:
        parts = re.split(r"\s*&\s*", authors_part)
        s1 = parts[0].split(",")[0].strip()
        s2 = parts[1].split(",")[0].strip()
        return f"{s1} & {s2} ({year})"
    else:
        surname = authors_part.split(",")[0].strip()
        return f"{surname} et al. ({year})"


def fetch_vote_counts() -> dict[str, int]:
    """Fetch vote CSV and return {doi: count} mapping."""
    print("Fetching vote counts...")
    try:
        rows = fetch_csv(VOTES_CSV_URL, skip_header=True)
        counts: dict[str, int] = {}
        for row in rows:
            if not row:
                continue
            url = urllib.parse.unquote(row[-1].strip())
            doi = extract_doi(url)
            if doi:
                counts[doi] = counts.get(doi, 0) + 1
        print(f"  {sum(counts.values())} votes for {len(counts)} unique DOIs")
        return counts
    except Exception as e:
        print(f"  WARNING: Could not fetch vote counts: {e}")
        return {}


def main():
    # --- Recommendations ---
    print("Fetching Recommendations form responses...")
    rec_rows = fetch_csv(RECOMMENDATIONS_CSV_URL, skip_header=True)
    print(f"  {len(rec_rows)} form response rows")

    # Form columns (by position after header):
    #   0=Timestamp, 1=Name, 2=Title, 3=Email, 4=Bio, 5=Photo URL
    #   6=URL#1, 7=Text#1, 8=Another?, 9=URL#2, 10=Text#2, 11=Another?, ...
    recommended_dois = set()
    recommendations_by_doi: dict[str, list[dict]] = {}

    for row in rec_rows:
        row += [""] * (max(26, len(row) + 1) - len(row))
        rec_name = row[1].strip()
        rec_title = row[2].strip()
        rec_bio = row[4].strip()
        rec_photo_url = row[5].strip()
        rec_photo = download_photo(rec_photo_url, rec_name) if rec_photo_url else ""
        for url_idx in range(6, len(row) - 1, 3):
            text_idx = url_idx + 1
            url = row[url_idx].strip()
            text = row[text_idx].strip() if text_idx < len(row) else ""
            doi = extract_doi(url)
            if doi:
                recommended_dois.add(doi)
                rec = {
                    "name": rec_name,
                    "title": rec_title,
                    "bio": rec_bio,
                    "photo": rec_photo,
                    "text": text,
                }
                recommendations_by_doi.setdefault(doi, []).append(rec)

    print(f"  {len(recommended_dois)} unique recommended DOIs")

    if not recommended_dois:
        print("WARNING: No recommended DOIs found. Writing empty output.")
        with open(OUTPUT_PATH, "w") as f:
            json.dump({"clusters": {}}, f, indent=2)
        return

    print(f"  Recommended DOIs: {recommended_dois}")

    # --- Fetch remaining sheets in parallel ---
    print("Fetching tags, votes, publications, sub-clusters, clusters in parallel...")
    with ThreadPoolExecutor(max_workers=5) as pool:
        f_tags = pool.submit(fetch_csv, TAGS_CSV_URL, True)
        f_votes = pool.submit(fetch_vote_counts)
        f_pubs = pool.submit(fetch_csv, PUBLICATIONS_CSV_URL, True)
        f_sc = pool.submit(fetch_csv, SUBCLUSTERS_CSV_URL, True)
        f_cl = pool.submit(fetch_csv, CLUSTERS_CSV_URL, True)

    tag_rows = f_tags.result()
    vote_counts = f_votes.result()
    pub_rows = f_pubs.result()
    sc_rows = f_sc.result()
    cl_rows = f_cl.result()

    # --- Filter tags ---
    focus_tags = []
    type_tags = []
    for row in tag_rows:
        if len(row) >= 1 and row[0].strip():
            focus_tags.append(row[0].strip())
        if len(row) >= 2 and row[1].strip():
            type_tags.append(row[1].strip())
    focus_order = {tag: i for i, tag in enumerate(focus_tags)}
    print(f"  Focus order: {focus_tags}")

    # --- Publications ---
    print(f"  {len(pub_rows)} publication rows")

    # Publications CSV columns (matching the header):
    #  0=Sub-Cluster, 1=DOI, 2=APA Reference, 3=BibTex reference, 4=auto-ref,
    #  5=annotations, 6=Title, 7=Abstract, 8=Authors, 9=Language, 10=License,
    #  11=OA Link, 12=Focus, 13=Specificity, 14=Summary, 15=Resource Type,
    #  16=Display exclusion, 17=Exclusion reason
    COL_SUB_CLUSTER = 0
    COL_DOI = 1
    COL_APA = 2
    COL_BIBTEX = 3
    COL_TITLE = 6
    COL_ABSTRACT = 7
    COL_AUTHORS = 8
    COL_LICENSE = 10
    COL_OA_LINK = 11
    COL_FOCUS = 12
    COL_SPECIFICITY = 13
    COL_SUMMARY = 14
    COL_RESOURCE_TYPE = 15
    COL_DISPLAY_EXCLUSION = 16
    PUB_ROW_WIDTH = 18

    # --- Cluster mapping ---

    # Build cluster name → number mapping (row order = cluster number)
    cluster_name_to_number = {}
    for i, row in enumerate(cl_rows, start=1):
        if row and row[0].strip():
            cluster_name_to_number[row[0].strip()] = i

    # Build sub-cluster name → cluster number mapping
    sc_to_cluster_number = {}
    for row in sc_rows:
        if len(row) >= 2:
            cluster_name = row[0].strip()
            sc_name = row[1].strip()
            cn = cluster_name_to_number.get(cluster_name)
            if cn:
                sc_to_cluster_number[sc_name] = cn

    print(f"  {len(sc_to_cluster_number)} sub-clusters mapped to {len(cluster_name_to_number)} clusters")

    # --- Build card data ---
    pub_cards: dict[str, dict] = {}
    clusters: dict[str, list[dict]] = {}
    matched = 0

    for row in pub_rows:
        row += [""] * (PUB_ROW_WIDTH - len(row))
        doi = extract_doi(row[COL_DOI]) or row[COL_DOI].strip().lower().rstrip("/.,;")
        if not doi:
            continue

        # Skip excluded publications
        if row[COL_DISPLAY_EXCLUSION].strip():
            continue

        oa_url = row[COL_OA_LINK].strip()
        is_oa = bool(oa_url)
        apa = row[COL_APA].strip()

        card = {
            "title": row[COL_TITLE].strip(),
            "summary": row[COL_SUMMARY].strip(),
            "focus": row[COL_FOCUS].strip().lower(),
            "specificity": row[COL_SPECIFICITY].strip(),
            "resource_type": row[COL_RESOURCE_TYPE].strip(),
            "short_ref": make_short_ref(apa),
            "apa": apa,
            "bibtex": row[COL_BIBTEX].strip(),
            "abstract": row[COL_ABSTRACT].strip(),
            "is_oa": is_oa,
            "oa_url": oa_url,
            "authors": row[COL_AUTHORS].strip(),
            "vote_base": vote_counts.get(doi, 0),
        }
        if doi in recommendations_by_doi:
            card["recommendations"] = recommendations_by_doi[doi]

        pub_cards[doi] = card

        if doi in recommended_dois:
            sub_cluster_name = row[COL_SUB_CLUSTER].strip()
            cluster_num = sc_to_cluster_number.get(sub_cluster_name)
            if not cluster_num:
                print(f"  WARNING: No cluster mapping for sub-cluster '{sub_cluster_name}' (DOI: {doi})")
                continue

            resource = dict(card, doi=doi,
                            recommendations=recommendations_by_doi.get(doi, []))
            key = str(cluster_num)
            clusters.setdefault(key, []).append(resource)
            matched += 1

    print(f"\n  {len(pub_cards)} publications with card data")

    # Report unmatched DOIs
    unmatched = recommended_dois - set(pub_cards.keys())
    if unmatched:
        print(f"\n  WARNING: {len(unmatched)} recommended DOI(s) not found in Publications sheet:")
        for d in sorted(unmatched):
            print(f"    - {d}")

    # Sort featured resources by focus order within each cluster
    for resources in clusters.values():
        resources.sort(key=lambda r: focus_order.get(r.get("focus", ""), 999))

    print(f"  {matched} featured resources across {len(clusters)} clusters")
    for k in sorted(clusters.keys(), key=int):
        print(f"    Cluster {k}: {len(clusters[k])} resources")

    output = {"clusters": clusters}
    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"\nWrote {OUTPUT_PATH}")

    with open(PUB_CARDS_PATH, "w") as f:
        json.dump(pub_cards, f, indent=2, ensure_ascii=False)
    print(f"Wrote {PUB_CARDS_PATH} ({len(pub_cards)} entries)")

    filter_tags = {"focus": focus_tags, "type": type_tags}
    with open(FILTER_TAGS_PATH, "w") as f:
        json.dump(filter_tags, f, indent=2, ensure_ascii=False)
    print(f"Wrote {FILTER_TAGS_PATH} ({len(focus_tags)} focus, {len(type_tags)} type)")


if __name__ == "__main__":
    main()
