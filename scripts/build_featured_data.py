#!/usr/bin/env python3
"""Build featured_resources.json for FORRT cluster pages.

Fetches the Recommendations form responses and the Publications sheet,
matches recommended DOIs to enriched publication metadata, maps each
to its cluster, and outputs data/featured_resources.json.

Usage:
    python scripts/build_featured_data.py
"""

import json
import os
import re
import subprocess
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(ROOT_DIR, "data", "featured_resources.json")
PUB_CARDS_PATH = os.path.join(ROOT_DIR, "data", "pub_cards.json")
FILTER_TAGS_PATH = os.path.join(ROOT_DIR, "data", "filter_tags.json")

PUBLICATIONS_SHEET_ID = "1BxYioDDE2GftOFdQGtH0lVguEUWNQ_k8Ls-bdRn8RRo"
RECOMMENDATIONS_SHEET_ID = "1IyroPSSWYHWTpZ17epMcyaPVF0K9ftRUPSmEYDAptY0"

# Publications sheet columns (A=0 .. P=15):
#  A=Sub-Cluster, B=DOI, C=APA Reference, D=BibTex, E=auto-ref, F=annotations,
#  G=Title, H=Abstract, I=Authors, J=Language, K=License, L=OA Link,
#  M=Focus, N=Specificity, O=Summary, P=Resource Type
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
PUB_ROW_WIDTH = 16

# DOI regex for extracting from URLs
DOI_RE = re.compile(r"(?:https?://)?(?:dx\.)?doi\.org/(.+?)(?:\s|$)", re.IGNORECASE)
DOI_BARE_RE = re.compile(r"^10\.\d{4,9}/.+$")

PHOTOS_DIR = os.path.join(ROOT_DIR, "static", "img", "featured-recommenders")


def download_photo(url: str, name: str) -> str:
    """Download a photo from url, save to PHOTOS_DIR, return site-relative path or '' on failure."""
    import hashlib
    import urllib.request
    if not url:
        return ""
    os.makedirs(PHOTOS_DIR, exist_ok=True)
    # Deterministic filename from URL
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
            if len(data) < 500:  # too small to be a real image
                print(f"  WARNING: Photo too small ({len(data)} bytes) for {name}: {url}")
                return ""
            with open(filepath, "wb") as f:
                f.write(data)
        return f"/img/featured-recommenders/{filename}"
    except Exception as e:
        print(f"  WARNING: Could not download photo for {name}: {e}")
        return ""


def _parse_gws_json(stdout: str) -> dict:
    """Parse JSON from gws output, skipping any non-JSON preamble lines."""
    for i, line in enumerate(stdout.split("\n")):
        if line.strip().startswith("{"):
            return json.loads("\n".join(stdout.split("\n")[i:]))
    raise ValueError(f"No JSON found in gws output: {stdout[:200]}")


def gws_read(sheet_id: str, range_: str) -> list[list[str]]:
    """Read a range from a Google Sheet via gws CLI."""
    result = subprocess.run(
        ["gws", "sheets", "+read",
         "--spreadsheet", sheet_id,
         "--range", range_,
         "--format", "json"],
        capture_output=True, text=True, check=True,
    )
    data = _parse_gws_json(result.stdout)
    return data.get("values", [])


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
    # Try "Author, A. B., ... (YYYY)" pattern
    m = re.match(r"^(.+?)\((\d{4})\)", apa)
    if not m:
        return apa[:60]
    authors_part = m.group(1).strip().rstrip(",").strip()
    year = m.group(2)
    # Split on ", " but be careful of initials
    # Count "&" to determine number of authors
    amp_count = authors_part.count("&")
    if amp_count == 0:
        # Single author: "Lakens, D."
        surname = authors_part.split(",")[0].strip()
        return f"{surname} ({year})"
    elif amp_count == 1 and len(authors_part) < 60:
        # Two authors: keep both surnames
        parts = re.split(r"\s*&\s*", authors_part)
        s1 = parts[0].split(",")[0].strip()
        s2 = parts[1].split(",")[0].strip()
        return f"{s1} & {s2} ({year})"
    else:
        # 3+ authors: first surname et al.
        surname = authors_part.split(",")[0].strip()
        return f"{surname} et al. ({year})"


def main():
    print("Fetching Recommendations form responses...")
    rec_rows = gws_read(RECOMMENDATIONS_SHEET_ID, "Form Responses 1!A2:Z5000")
    print(f"  {len(rec_rows)} form response rows")

    # Extract recommended DOIs and recommendation details per DOI.
    # Form columns:
    #   0=Timestamp, 1=Name, 2=Title, 3=Email, 4=Bio, 5=Photo URL
    #   6=URL#1, 7=Text#1, 8=Another?, 9=URL#2, 10=Text#2, 11=Another?, ...
    recommended_dois = set()
    recommendations_by_doi: dict[str, list[dict]] = {}  # doi → [{name, title, bio, photo, text}]

    for row in rec_rows:
        row += [""] * (26 - len(row))  # pad to max columns
        rec_name = row[1].strip()
        rec_title = row[2].strip()
        rec_bio = row[4].strip()
        rec_photo_url = row[5].strip()
        rec_photo = download_photo(rec_photo_url, rec_name) if rec_photo_url else ""
        # Each resource is at (6, 7), (9, 10), (12, 13), (15, 16), (18, 19), (21, 22), (24, 25)
        for url_idx in range(6, 26, 3):
            text_idx = url_idx + 1
            url = row[url_idx].strip() if url_idx < len(row) else ""
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


    print("Fetching Publications sheet...")
    pub_rows = gws_read(PUBLICATIONS_SHEET_ID, "Publications!A2:P5000")
    print(f"  {len(pub_rows)} publication rows")

    print("Fetching Sub-Clusters sheet (for cluster mapping)...")
    sc_rows = gws_read(PUBLICATIONS_SHEET_ID, "Sub-Clusters!A2:B500")

    print("Fetching Clusters sheet (for number mapping)...")
    cl_rows = gws_read(PUBLICATIONS_SHEET_ID, "Clusters!A2:A50")

    # Build cluster name → number mapping (row order = cluster number)
    cluster_name_to_number = {}
    for i, row in enumerate(cl_rows, start=1):
        if row:
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

    # Build card data for ALL publications, and featured resources grouped by cluster
    pub_cards: dict[str, dict] = {}  # DOI → card data (for all publications)
    clusters: dict[str, list[dict]] = {}  # cluster number → featured resources
    matched = 0

    for row in pub_rows:
        row += [""] * (PUB_ROW_WIDTH - len(row))  # pad short rows
        doi = extract_doi(row[COL_DOI]) or row[COL_DOI].strip().lower().rstrip("/.,;")
        if not doi:
            continue

        license_val = row[COL_LICENSE].strip().lower()
        is_oa = bool(license_val and license_val not in ("", "closed", "none", "n/a"))
        oa_url = row[COL_OA_LINK].strip() if is_oa else ""
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
        }
        pub_cards[doi] = card

        # If this is a recommended DOI, also add to featured clusters
        if doi in recommended_dois:
            sub_cluster_name = row[COL_SUB_CLUSTER].strip()
            cluster_num = sc_to_cluster_number.get(sub_cluster_name)
            if not cluster_num:
                print(f"  WARNING: No cluster mapping for sub-cluster '{sub_cluster_name}' (DOI: {doi})")
                continue

            resource = dict(card, doi=doi, vote_base=0,
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

    # Fetch filter tags from the "tags" sheet
    print("Fetching filter tags...")
    tag_rows = gws_read(PUBLICATIONS_SHEET_ID, "tags!A2:B50")
    focus_tags = []
    type_tags = []
    for row in tag_rows:
        if len(row) >= 1 and row[0].strip():
            focus_tags.append(row[0].strip())
        if len(row) >= 2 and row[1].strip():
            type_tags.append(row[1].strip())
    filter_tags = {"focus": focus_tags, "type": type_tags}
    with open(FILTER_TAGS_PATH, "w") as f:
        json.dump(filter_tags, f, indent=2, ensure_ascii=False)
    print(f"Wrote {FILTER_TAGS_PATH} ({len(focus_tags)} focus, {len(type_tags)} type)")


if __name__ == "__main__":
    main()
