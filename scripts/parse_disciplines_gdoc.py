#!/usr/bin/env python3
"""Parse the "Open Research Across Disciplines" Google Doc into the disciplines spreadsheet.

This script extracts the contents of the canonical hackathon document
(a .docx in Google Drive) and rewrites the three tabs of the disciplines
Google Sheet (Fields / Disciplines / Resources) consumed by
`parse_disciplines_to_json.py`.

Use it to refresh the document content while preserving sheet-only columns
(including leads, visibility, summaries and category backups) by row identity.
Before --push, the current sheet is backed up locally. All three tabs are
updated atomically, without changing their formatting.

Expected document structure (Word/Google Docs styles):

    Heading 1   = Field name (e.g. "Natural Sciences")
                  Headings "Introduction" and "Contents" are ignored.
    Heading 2   = Discipline name within a field (e.g. "Chemistry").
                  If a field has resources but no Heading 2, a synthetic
                  discipline matching the field name is created.
    Heading 3   = Section label ("Examples of open research practices",
                  "Table of resources"). Only the heading text is used
                  to decide what to do with subsequent paragraphs.
    Paragraphs under an "Examples..." Heading 3 become the discipline's
    Examples text.
    Tables under a "Table of resources" Heading 3 become resource rows.
    Resource tables are 2-column (category | resource) or 1-column
    (resource only). Cells with multiple URLs are split into one
    resource per distinct URL, sharing the full descriptive text as title.
    Embedded hyperlinks are read, including those with non-URL labels.

Categories are taken from the first colon-delimited token of the
category cell ("Open Data: COS" → "Open Data") and normalized to the
website's five categories. Known link repairs from #855 are retained via
disciplines_link_repairs.json; edit that mapping when a repaired URL changes.

Usage:
    pip install 'python-docx>=1.2.0'
    # Either point at a local .docx ...
    python scripts/parse_disciplines_gdoc.py path/to/source.docx
    # ... or pull from Drive via gws (requires the gws CLI configured)
    python scripts/parse_disciplines_gdoc.py --drive-id <FILE_ID>

    # Add --push to overwrite the disciplines sheet after parsing.
    python scripts/parse_disciplines_gdoc.py --drive-id <FILE_ID> --push

    # Inspect what *would* be written without touching the sheet:
    python scripts/parse_disciplines_gdoc.py path/to/source.docx --json /tmp/parsed.json

Canonical source: https://docs.google.com/document/d/1oFFHUmKPfTbDf5O8EvOcZvSSdMLMDO-r/edit

Sheet IDs are constants below; update them if the canonical sheet moves.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

from docx import Document
from docx.text.hyperlink import Hyperlink

# Google Sheet that drives the FORRT disciplines Hugo page.
DISCIPLINES_SHEET_ID = "1mSlduu86_nE1sY1gXobw3Pp1vI73B_0iHBsJqjtsJU4"

# Fields whose Heading 1 we never want to import — they are document-level
# front matter, not topical fields.
SKIP_FIELDS = {"Introduction", "Contents"}

# Fields that should appear on the public page (Show = TRUE). Others are
# kept in the sheet but hidden by the Hugo build. Adjust if scope changes.
SHOW_FIELDS = {
    "Natural Sciences",
    "Life, Medical and Health Sciences",
    "Social Sciences",
    "Humanities",
    "Engineering and Technology",
    "Meta-research",
    "Methodologies",
}

# A URL token: lazy match that stops at whitespace, angle brackets, or
# the start of the next URL — so two URLs concatenated without a separator
# (a common artifact when Google Docs hyperlinks are stripped) split cleanly.
URL_RE = re.compile(r"https?://[^\s<>]+?(?=https?://|\s|$|[<>])")
DOI_RE = re.compile(r"\b10\.\d{4,9}/[^\s<>]+", re.I)
LINK_REPAIRS = json.loads(Path(__file__).with_name("disciplines_link_repairs.json").read_text())
CATEGORY_ALIASES = {
    "": "General",
    "Equitable Open Research": "General",
    "Preregistration": "Open Methods",
    "Ethics of Open Data": "Open Data",
    "Open Education / Open Education Resources": "Open Education",
}


def clean_url(url):
    """Unwrap Outlook links and retain repairs previously made in the sheet (#855)."""
    url = url.strip().rstrip(".,;")
    if urlsplit(url).hostname and urlsplit(url).hostname.endswith(".safelinks.protection.outlook.com"):
        url = parse_qs(urlsplit(url).query).get("url", [url])[0]
    # Word sometimes includes the space after a hyperlink in its target.
    url = re.sub(r"(?:%20|%09|%0a|%0d)+$", "", url.strip(), flags=re.I)
    # Parentheses inside DOIs are significant; only remove unmatched closers
    # added by prose such as '(see https://example.org/paper)'.
    while url.endswith(")") and url.count(")") > url.count("("):
        url = url[:-1]
    return LINK_REPAIRS.get(url, LINK_REPAIRS.get(url.rstrip("/"), url))


def paragraph_text_links(paragraph):
    """Return visible text plus (start, end, target) spans in document order."""
    text, links = "", []
    for item in paragraph.iter_inner_content():
        start = len(text)
        text += item.text
        if isinstance(item, Hyperlink) and item.url.startswith(("http://", "https://")):
            links.append((start, len(text), clean_url(item.url)))
    return text, links


def cell_text_links(cell):
    text, links = "", []
    for p in cell.paragraphs:
        part, spans = paragraph_text_links(p)
        links.extend((a + len(text), b + len(text), u) for a, b, u in spans)
        text += part + "\n"
    return text.rstrip("\n"), links


def paragraph_markdown(paragraph):
    text, links = paragraph_text_links(paragraph)
    for match in URL_RE.finditer(text):
        if not any(a < match.end() and b > match.start() for a, b, _ in links):
            links.append((match.start(), match.end(), clean_url(match.group())))
    for start, end, url in sorted(links, reverse=True):
        label = text[start:end]
        if label.strip():
            text = text[:start] + "[" + label.replace("]", "\\]") + "](" + url.replace("(", "%28").replace(")", "%29") + ")" + text[end:]
    return re.sub(r"^(Open [\w ]+|General):\s*", r"**\1** ", text.strip())


# ---------- docx parsing ---------------------------------------------------


def _clean_title(s: str) -> str:
    """Collapse whitespace and trim trailing punctuation, preserving 'e.g.'-style endings."""
    t = re.sub(r"\s+", " ", s).strip()
    if t.endswith(".") and not re.search(r"\b[a-z]\.[a-z]\.$", t):
        t = t[:-1]
    t = t.strip(" \t").rstrip(":,;").strip()
    while t.endswith("(") and t.count("(") > t.count(")"):
        t = t[:-1].rstrip()
    return t


def _resource_cell_texts(cells):
    """Return category, visible text and hyperlink spans from a resource row."""
    if len(cells) == 1:
        return "", *cell_text_links(cells[0])
    return cells[0].text, *cell_text_links(cells[1])


def parse_cell_resources(cat_txt: str, res_txt: str, hyperlinks=()):
    """Convert one resource cell into a list of {title, link, category} dicts.

    Cells frequently contain a short descriptor followed by one *or more* URLs;
    we emit one resource per URL, all sharing the descriptor as the title. A
    cell with no URLs becomes a single resource with an empty link.
    """
    category = (cat_txt.strip().split(":", 1)[0].strip()) if cat_txt.strip() else ""
    category = CATEGORY_ALIASES.get(category, category)
    text = res_txt
    candidates, removed, used = [], [], set()
    # A displayed URL may cross several hyperlink runs. Prefer the target
    # matching the complete displayed URL, then a target containing its suffix.
    for m in URL_RE.finditer(text):
        overlaps = [(i, h) for i, h in enumerate(hyperlinks) if h[0] < m.end() and h[1] > m.start()]
        shown = clean_url(m.group(0))
        targets = [h[2] for _, h in overlaps]
        target = next((u for u in targets if u.rstrip("/") == shown.rstrip("/")), None)
        target = target or next((u for _, (a, b, u) in reversed(overlaps) if text[a:b].strip() and u.endswith(text[a:b].strip())), None)
        candidates.append((m.start(), target or (targets[0] if targets else shown)))
        used.update(i for i, _ in overlaps)
        removed.append(m.span())
    for i, (a, b, url) in enumerate(hyperlinks):
        if i in used:
            continue
        label = text[a:b].strip()
        # Citation author-profile links are not separate resources.
        if re.fullmatch(r"[\w’-]+,\s*(?:[A-Z]\.\s*)+", label):
            continue
        candidates.append((a, url))
        if DOI_RE.search(label) or re.match(r"\w+://", label):
            removed.append((a, b))
    if not candidates:
        for m in DOI_RE.finditer(text):
            candidates.append((m.start(), "https://doi.org/" + m.group().rstrip(".,;")))
            removed.append(m.span())
    chars = list(text)
    for a, b in removed:
        chars[a:b] = " " * (b - a)
    title = _clean_title(re.sub(r"\bdoi:\s*(?=$|\n)", "", "".join(chars), flags=re.I))
    urls = list(dict.fromkeys(clean_url(u) for _, u in sorted(candidates)))
    return [{"title": title or url, "link": url, "category": category} for url in (urls or [""])]


def parse_docx(path: str):
    """Walk a .docx and return {"fields": [...]} in document order."""
    doc = Document(path)
    fields = []
    current_field = None
    current_disc = None
    last_h3 = None
    skip_field = False

    body = doc.element.body
    p_idx = 0
    t_idx = 0

    for child in body.iterchildren():
        tag = child.tag.split("}")[-1]
        if tag == "p":
            p = doc.paragraphs[p_idx]
            p_idx += 1
            style = p.style.name if p.style else ""
            txt = p.text.strip()
            if not txt:
                continue
            if style == "Heading 1":
                if txt in SKIP_FIELDS:
                    skip_field = True
                    continue
                skip_field = False
                current_field = {
                    "name": txt, "summary": "",
                    "disciplines": [], "field_examples": "",
                }
                fields.append(current_field)
                current_disc = None
                last_h3 = None
            elif skip_field:
                continue
            elif style == "Heading 2":
                current_disc = {"name": txt, "examples": "", "resources": []}
                current_field["disciplines"].append(current_disc)
                last_h3 = None
            elif style == "Heading 3":
                last_h3 = txt
            else:
                if last_h3 and "Examples" in last_h3 and txt.lower() not in {"[examples needed]", "[need examples]"}:
                    target = current_disc if current_disc is not None else current_field
                    key = "examples" if current_disc is not None else "field_examples"
                    existing = target.get(key, "")
                    target[key] = (existing + ("\n\n" if existing else "") + paragraph_markdown(p))
        elif tag == "tbl":
            tbl = doc.tables[t_idx]
            t_idx += 1
            # Cover/front-matter tables have no active field. Do not assume
            # the first table is a cover: a trimmed export may start with data.
            if skip_field or current_field is None or len(tbl.rows) < 2:
                continue
            if current_disc is None:
                # Field-level table — create a synthetic discipline named after the field
                current_disc = {
                    "name": current_field["name"],
                    "examples": current_field.get("field_examples", ""),
                    "resources": [],
                }
                current_field["disciplines"].append(current_disc)
            for row in tbl.rows[1:]:
                cells = list(row.cells)
                cat_txt, res_txt, links = _resource_cell_texts(cells)
                if not res_txt.strip():
                    continue
                current_disc["resources"].extend(parse_cell_resources(cat_txt, res_txt, links))
            last_h3 = None
        # other body children (sdt, sectPr) are ignored

    return {"fields": fields}


# ---------- sheet I/O ------------------------------------------------------


def _gws(*args, body=None, cwd=None):
    """Invoke the gws CLI, strip its keyring banner, and return parsed JSON output."""
    cmd = ["gws", *args, "--format", "json"]
    if body is not None:
        cmd += ["--json", json.dumps(body)]
    res = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd)
    if res.returncode != 0:
        sys.exit(f"gws failed: {' '.join(cmd[:4])}\n{res.stderr}")
    out = res.stdout.strip().split("\n")
    if out and out[0].startswith("Using"):
        out = out[1:]
    return json.loads("\n".join(out)) if out else {}


def download_docx_from_drive(file_id: str, dest_path: str) -> str:
    """Download a Google Drive .docx by file ID via gws and return its path."""
    print(f"Downloading docx (id={file_id}) → {dest_path}")
    _gws(
        "drive", "files", "get",
        "--params", json.dumps({"fileId": file_id, "alt": "media"}),
        "--output", Path(dest_path).name,
        cwd=str(Path(dest_path).resolve().parent),
    )
    return dest_path


def build_sheet_payloads(data: dict):
    """Convert parsed JSON into the three header+rows blocks expected by the sheet."""
    fields_rows = [["Name", "Summary", "Show"]]
    for f in data["fields"]:
        show = "TRUE" if f["name"] in SHOW_FIELDS else "FALSE"
        fields_rows.append([f["name"], (f.get("summary") or "").strip(), show])

    disc_rows = [["Field", "Discipline", "Examples"]]
    for f in data["fields"]:
        for d in f["disciplines"]:
            disc_rows.append([f["name"], d["name"], (d.get("examples") or "").strip()])

    res_rows = [["Discipline", "Title", "Link", "Category"]]
    for f in data["fields"]:
        for d in f["disciplines"]:
            for r in d["resources"]:
                res_rows.append([d["name"], r["title"], r.get("link", ""), r.get("category", "")])

    return fields_rows, disc_rows, res_rows


def preserve_sheet_columns(tab, rows, existing):
    """Carry curated metadata with matching rows, even when document order changes."""
    if not existing:
        return rows
    header = existing[0] + [h for h in rows[0] if h not in existing[0]]
    old_header, new_header = existing[0], rows[0]

    def record(row, names):
        return dict(zip(names, row))

    def key(row):
        if tab == "Fields":
            return (row.get("Name", "").strip(),)
        if tab == "Disciplines":
            return (row.get("Field", "").strip(), row.get("Discipline", "").strip())
        return (row.get("Discipline", "").strip(), clean_url(row.get("Link", "")).rstrip("/"), row.get("Category", ""))

    lookup = {}
    for row in existing[1:]:
        old = record(row, old_header)
        lookup.setdefault(key(old), []).append(old)
    result = [header]
    for row in rows[1:]:
        fresh = record(row, new_header)
        matches = lookup.get(key(fresh), [])
        old = next((m for m in matches if m.get("Title") == fresh.get("Title")), matches[0] if matches else {})
        merged = {**old, **fresh}
        if tab == "Fields":
            for column in ("Summary", "Show"):
                if column in old:
                    merged[column] = old[column]
        result.append([merged.get(h, "") for h in header])
    return result


def push_to_sheet(spreadsheet_id: str, payloads, backup_dir=None):
    """Back up, preserve metadata, and replace all three tabs in one atomic request."""
    backup = Path(backup_dir or tempfile.mkdtemp(prefix="forrt-disciplines-backup-"))
    backup.mkdir(parents=True, exist_ok=True)
    metadata = _gws("sheets", "spreadsheets", "get", "--params", json.dumps({
        "spreadsheetId": spreadsheet_id, "fields": "sheets.properties",
    }))
    properties = {s["properties"]["title"]: s["properties"] for s in metadata["sheets"]}
    requests, expected = [], {}
    for tab, rows in zip(("Fields", "Disciplines", "Resources"), payloads):
        existing = _gws("sheets", "spreadsheets", "values", "get", "--params", json.dumps({
            "spreadsheetId": spreadsheet_id, "range": tab, "valueRenderOption": "FORMULA",
        })).get("values", [])
        # Exclusive creation prevents an accidental rerun overwriting a backup.
        with (backup / f"{tab}.json").open("x") as f:
            json.dump(existing, f, indent=2, ensure_ascii=False)
        rows = preserve_sheet_columns(tab, rows, existing)
        expected[tab] = rows
        props = properties[tab]
        if len(rows) > props["gridProperties"]["rowCount"]:
            requests.append({"appendDimension": {
                "sheetId": props["sheetId"], "dimension": "ROWS",
                "length": len(rows) - props["gridProperties"]["rowCount"],
            }})
        cells = []
        for row in rows:
            values = []
            for h, v in zip(rows[0], row):
                kind = "stringValue"
                curated = h not in payloads[("Fields", "Disciplines", "Resources").index(tab)][0] or (tab == "Fields" and h in {"Summary", "Show"})
                if curated and isinstance(v, str) and v.startswith("="):
                    kind = "formulaValue"
                elif isinstance(v, bool):
                    kind = "boolValue"
                elif isinstance(v, (int, float)):
                    kind = "numberValue"
                values.append({"userEnteredValue": {kind: v}})
            cells.append({"values": values})
        requests.append({"updateCells": {
            "range": {"sheetId": props["sheetId"], "startRowIndex": 0,
                      "endRowIndex": max(len(rows), len(existing)),
                      "startColumnIndex": 0, "endColumnIndex": len(rows[0])},
            "rows": cells, "fields": "userEnteredValue",
        }})
    print(f"Backed up original sheet values to {backup}")
    _gws("sheets", "spreadsheets", "batchUpdate", "--params", json.dumps({
        "spreadsheetId": spreadsheet_id,
    }), body={"requests": requests})
    for tab, rows in expected.items():
        actual = _gws("sheets", "spreadsheets", "values", "get", "--params", json.dumps({
            "spreadsheetId": spreadsheet_id, "range": tab, "valueRenderOption": "FORMULA",
        })).get("values", [])
        def padded(values):
            return [r + [""] * (len(rows[0]) - len(r)) for r in values]
        if padded(actual) != padded(rows):
            raise RuntimeError(f"Read-back verification failed for {tab}; backup: {backup}")
        print(f"  Verified {tab}: {len(rows) - 1} rows")


# ---------- CLI ------------------------------------------------------------


def print_stats(data: dict) -> None:
    total_disc = total_res = 0
    for f in data["fields"]:
        n_disc = len(f["disciplines"])
        n_res = sum(len(d["resources"]) for d in f["disciplines"])
        total_disc += n_disc
        total_res += n_res
        print(f"  {f['name']:<55} disciplines={n_disc:2d}  resources={n_res:4d}")
    print(f"Total: {len(data['fields'])} fields, {total_disc} disciplines, {total_res} resources")
    for field in data["fields"]:
        for discipline in field["disciplines"]:
            for resource in discipline["resources"]:
                if not resource["link"]:
                    print(f"  No source link: {discipline['name']} — {resource['title']}")


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    src = parser.add_mutually_exclusive_group(required=True)
    src.add_argument("docx_path", nargs="?", help="Local .docx file to parse")
    src.add_argument("--drive-id", help="Google Drive file ID of the .docx")
    parser.add_argument(
        "--json", default=None,
        help="Optional path to write parsed JSON (for review). Default: skip.",
    )
    parser.add_argument(
        "--push", action="store_true",
        help="Back up and refresh the disciplines spreadsheet from the parsed content.",
    )
    parser.add_argument("--backup-dir", help="New directory for the pre-push sheet backup")
    parser.add_argument(
        "--spreadsheet-id", default=DISCIPLINES_SHEET_ID,
        help="Override the target spreadsheet ID.",
    )
    args = parser.parse_args()

    if args.drive_id:
        tmp = tempfile.NamedTemporaryFile(suffix=".docx", delete=False)
        tmp.close()
        docx_path = download_docx_from_drive(args.drive_id, tmp.name)
    else:
        docx_path = args.docx_path
        if not os.path.exists(docx_path):
            sys.exit(f"Input file not found: {docx_path}")

    print(f"Parsing {docx_path}…")
    data = parse_docx(docx_path)
    print_stats(data)

    if args.json:
        with open(args.json, "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Wrote parsed JSON → {args.json}")

    if args.push:
        payloads = build_sheet_payloads(data)
        push_to_sheet(args.spreadsheet_id, payloads, args.backup_dir)
        print("Sheet updated. Now run `python3 scripts/parse_disciplines_to_json.py` "
              "to refresh data/disciplines.json.")
    else:
        print("\n--push not set — sheet was not modified.")


if __name__ == "__main__":
    main()
