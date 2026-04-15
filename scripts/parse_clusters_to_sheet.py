#!/usr/bin/env python3
"""Parse FORRT Clusters v4.1 Google Doc and populate a Google Sheet.

Usage:
    python parse_clusters_to_sheet.py            # Full run
    python parse_clusters_to_sheet.py --dry-run   # Parse only, print stats
    python parse_clusters_to_sheet.py --skip-doi   # Skip DOI lookups
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
from dataclasses import dataclass, field

# --- Constants ---
DOC_URL = "https://docs.google.com/document/d/1_TRh7z3Bv_tdxGqjdWMm4kfQerTYvYw3e4wvQLNpTDQ/export?format=txt"
SHEET_ID = "1BxYioDDE2GftOFdQGtH0lVguEUWNQ_k8Ls-bdRn8RRo"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_CACHE = os.path.join(SCRIPT_DIR, "doi_cache.json")

# --- Regex ---
ANNOTATION_RE = re.compile(r'\[([a-z]{1,3})\]')
CLUSTER_RE = re.compile(r'^Cluster\s+(\d+)\s*:\s*(.+)')
BULLET_RE = re.compile(r'^\s*\*\s+')
DOI_RE = re.compile(r'https?://(?:dx\.)?doi\.org/(\S+)')
PROXY_DOI_RE = re.compile(r'https?://\S*doi-org\S+?/')
C11_SC_RE = re.compile(r'^Sub-cluster\s+(\d+)\s*:\s*(.+)', re.IGNORECASE)
SEPARATOR_RE = re.compile(r'^_{5,}$')


# --- Data classes ---
@dataclass
class Cluster:
    number: int
    name: str
    description: str
    annotations: str
    sub_clusters: list = field(default_factory=list)


@dataclass
class SubCluster:
    name: str
    cluster_name: str
    description: str
    annotations: str
    raw_citations: list = field(default_factory=list)


@dataclass
class Publication:
    sub_cluster: str
    doi: str
    apa_reference: str
    bibtex: str
    auto_ref: bool
    annotations: str


# --- Helpers ---
def extract_annotations(text):
    """Extract annotation markers like [a], [ab] and return (cleaned_text, annot_string)."""
    found = ANNOTATION_RE.findall(text)
    cleaned = ANNOTATION_RE.sub('', text)
    return cleaned, ', '.join(found) if found else ''


def normalize_name(s):
    """Normalize for comparison: lowercase, collapse whitespace, strip punctuation."""
    s = s.lower().strip()
    # Replace slashes and ampersands with spaces to separate words
    # e.g., "community/citizen" -> "community citizen", "Sexuality & Gender" -> "sexuality gender"
    s = s.replace('/', ' ').replace('&', ' ')
    s = re.sub(r'\s+', ' ', s)
    s = s.rstrip('.,:;')
    return s


def extract_doi(text):
    """Extract DOI string from citation text, or None."""
    m = DOI_RE.search(text)
    if not m:
        return None
    doi = m.group(1)
    # Strip trailing punctuation that's not part of the DOI
    doi = doi.rstrip('.,;:)> ')
    # Remove trailing period if present (common in sentence-ending DOIs)
    if doi.endswith('.'):
        doi = doi[:-1]
    return doi


def clean_citation_text(raw):
    """Clean a raw citation: strip annotations, normalize whitespace."""
    text, annots = extract_annotations(raw)
    # Collapse internal whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text, annots


# --- Document fetching ---
def fetch_document():
    """Download Google Doc as plain text."""
    print("Fetching document...")
    req = urllib.request.Request(DOC_URL)
    with urllib.request.urlopen(req) as resp:
        text = resp.read().decode('utf-8-sig')
    lines = text.splitlines()
    print(f"  {len(lines)} lines downloaded")
    return lines


def preprocess_lines(lines):
    """Normalize proxy DOIs and strip trailing whitespace."""
    result = []
    for line in lines:
        line = PROXY_DOI_RE.sub('https://doi.org/', line)
        result.append(line.rstrip())
    return result


# --- Document parsing ---
def find_content_start(lines):
    """Find line index where cluster content begins (Cluster 1 followed by Description)."""
    for i, line in enumerate(lines):
        clean, _ = extract_annotations(line.strip())
        m = CLUSTER_RE.match(clean.strip())
        if m and m.group(1) == '1':
            # Check next few lines for "Description"
            for j in range(i + 1, min(i + 5, len(lines))):
                if lines[j].strip() == 'Description':
                    return i
    raise ValueError("Could not find content start (Cluster 1 with Description)")


def find_cluster_boundaries(lines, content_start):
    """Return [(line_idx, cluster_num, clean_name, annotations)] for all 11 clusters."""
    boundaries = []
    seen = set()

    for i in range(content_start, len(lines)):
        clean, annots = extract_annotations(lines[i].strip())
        m = CLUSTER_RE.match(clean.strip())
        if m:
            num = int(m.group(1))
            if num in seen:
                break  # Hit the footer ToC
            seen.add(num)
            name = re.sub(r'\s+', ' ', m.group(2)).strip()
            boundaries.append((i, num, name, annots))
            if num == 11:
                break
    return boundaries


def find_content_end(lines, cluster_11_start):
    """Find end of Cluster 11 content (before footer ToC)."""
    for i in range(cluster_11_start + 1, len(lines)):
        clean, _ = extract_annotations(lines[i].strip())
        m = CLUSTER_RE.match(clean.strip())
        if m:
            return i
    return len(lines)


def parse_cluster_toc(lines, desc_start, section_end):
    """Parse cluster description and extract sub-cluster ToC names.

    Returns (description_text, [toc_names]).
    """
    description_parts = []
    toc_names = []
    in_toc = False

    i = desc_start
    while i < section_end:
        stripped = lines[i].strip()

        if not stripped:
            if in_toc:
                break  # Blank line after ToC bullets = end of description area
            i += 1
            continue

        if BULLET_RE.match(stripped):
            in_toc = True
            name_raw = BULLET_RE.sub('', stripped)
            name_clean, _ = extract_annotations(name_raw)
            name_clean = re.sub(r'\s+', ' ', name_clean).strip()
            if name_clean:
                toc_names.append(name_clean)
        else:
            if in_toc:
                # Non-bullet after bullets - might be continuation or end
                # Check if it looks like a sub-cluster heading (not indented)
                if not lines[i].startswith('  '):
                    break
                # Otherwise it's a continuation of a ToC name
                if toc_names:
                    toc_names[-1] += ' ' + stripped
            else:
                description_parts.append(stripped)

        i += 1

    description = ' '.join(description_parts)
    return description, toc_names, i


YEAR_IN_PARENS_RE = re.compile(r'\(\d{4}')
ND_RE = re.compile(r'\(n\.d\.\)')


def looks_like_citation(text):
    """Check if text looks like a citation rather than a heading."""
    if YEAR_IN_PARENS_RE.search(text):
        return True
    if ND_RE.search(text):
        return True
    if 'doi.org/' in text.lower():
        return True
    if 'https://' in text or 'http://' in text:
        return True
    return False


STOP_WORDS = frozenset(
    'the a an and or in on of to for is are was were be been its it we they '
    'that this with by as at from not but how when why what which their have '
    'has had can will do does did about than more also'.split()
)


def is_toc_match(line_text, toc_lookup):
    """Check if line_text matches a known ToC name. Returns matched name or None."""
    norm = normalize_name(line_text)
    if norm in toc_lookup:
        return toc_lookup[norm]

    # Only fuzzy-match short text (long text = description paragraph, not heading)
    words = norm.split()
    if len(words) > 20:
        return None

    # Word overlap excluding stop words
    line_words = set(words) - STOP_WORDS
    if len(line_words) < 1:  # Need at least one meaningful word
        return None

    for toc_norm, toc_name in toc_lookup.items():
        toc_words = set(toc_norm.split()) - STOP_WORDS
        if len(toc_words) < 1:
            continue

        overlap = len(line_words & toc_words)

        # Special case: single-word ToC items
        # Only match if: (1) line has few words, and (2) the single ToC word is present
        if len(toc_words) == 1 and overlap == 1 and len(line_words) <= 3:
            return line_text  # Use content heading text

        # Multi-word matching: need sufficient overlap
        denom = min(len(line_words), len(toc_words))
        if denom > 1 and overlap / denom >= 0.6:
            return line_text  # Use content heading text
    return None


def parse_subclusters_standard(lines, start, end, toc_names, cluster_name):
    """Parse sub-cluster sections for Clusters 1-10.

    Heading detection combines ToC matching with structural/heuristic detection:
    1. Lines matching ToC names are always headings
    2. Non-citation lines that are short and don't look like citations are headings
    3. Lines that look like citations are treated as citation text
    """
    toc_lookup = {normalize_name(n): n for n in toc_names}

    sub_clusters = []
    current_sc = None
    current_desc = []
    current_cites = []

    # States: 'await_heading', 'in_description', 'in_citations'
    state = 'await_heading'

    def save_current():
        nonlocal current_sc
        if current_sc:
            current_sc.description = ' '.join(current_desc)
            current_sc.raw_citations = list(current_cites)
            sub_clusters.append(current_sc)

    i = start
    while i < end:
        raw_line = lines[i]
        stripped = raw_line.strip()

        # Blank lines
        if not stripped:
            if state in ('in_citations', 'in_description'):
                state = 'await_heading'
            i += 1
            continue

        # Separators
        if SEPARATOR_RE.match(stripped):
            if state in ('in_citations', 'in_description'):
                state = 'await_heading'
            i += 1
            continue

        # FILTER: Skip orphaned periods and other junk at column 0
        if stripped == '.' or (stripped and len(stripped) <= 1 and not BULLET_RE.match(stripped)):
            i += 1
            continue

        has_bullet = bool(BULLET_RE.match(stripped))

        # Bullet lines
        if has_bullet:
            bullet_text = BULLET_RE.sub('', stripped)
            clean_bullet, bullet_annots = extract_annotations(bullet_text)
            clean_bullet = re.sub(r'\s+', ' ', clean_bullet).strip()

            # Check for bullet-prefixed heading (rare but happens)
            # Only accept as heading if: matches ToC AND not a citation-like fragment
            toc_match = is_toc_match(clean_bullet, toc_lookup)

            # Filter: reject incomplete citations (name + title but no year/DOI/URL)
            is_incomplete_citation = (
                ': ' in clean_bullet and
                not looks_like_citation(clean_bullet) and
                'doi.org' not in clean_bullet.lower() and
                'https://' not in clean_bullet.lower() and
                any(surname in clean_bullet for surname in ['Suber', 'Peter', 'Methods']) and
                '(' not in clean_bullet  # No year in parens
            )

            if toc_match and not looks_like_citation(clean_bullet) and not is_incomplete_citation:
                save_current()
                current_sc = SubCluster(
                    name=clean_bullet, cluster_name=cluster_name,
                    description='', annotations=bullet_annots,
                )
                current_desc = []
                current_cites = []
                state = 'in_description'
                i += 1
                continue

            # Regular citation bullet
            if current_sc is not None:
                current_cites.append(bullet_text)
                state = 'in_citations'
            i += 1
            continue

        # Non-bullet line: heading, description, or citation continuation?
        clean_text, line_annots = extract_annotations(stripped)
        clean_text = re.sub(r'\s+', ' ', clean_text).strip()
        is_indented = raw_line.startswith('        ')  # 8+ spaces

        # 1. Indented lines are always continuations (never headings)
        if is_indented:
            if current_cites:
                current_cites[-1] += ' ' + stripped
            elif current_sc is not None:
                current_desc.append(stripped)
            i += 1
            continue

        # 2. Check ToC match (strongest heading signal, non-indented only)
        toc_match = is_toc_match(clean_text, toc_lookup)
        if toc_match and not looks_like_citation(clean_text):
            save_current()
            current_sc = SubCluster(
                name=clean_text, cluster_name=cluster_name,
                description='', annotations=line_annots,
            )
            current_desc = []
            current_cites = []
            state = 'in_description'
            i += 1
            continue

        # 3. If it looks like a citation, treat as citation/continuation
        if looks_like_citation(clean_text):
            if current_cites:
                current_cites[-1] += ' ' + stripped
            elif current_sc is not None:
                current_cites.append(stripped)
                state = 'in_citations'
            i += 1
            continue

        # 4. Structural heading: non-indented, non-citation, after blank lines only
        # FILTER: Reject placeholder text and incomplete citations
        is_placeholder = clean_text in ('INSERT DESCRIPTION', 'Description')

        is_orphaned_citation = (
            not looks_like_citation(clean_text) and
            ': ' in clean_text and
            'doi.org' not in clean_text.lower() and
            len(clean_text) < 150 and
            len(clean_text.split()) > 5 and
            any(word.lower() in clean_text.lower() for word in ['suber', 'peter', 'methods', 'rights'])
        )

        if state == 'await_heading' and len(clean_text) < 300 and not is_placeholder and not is_orphaned_citation:
            save_current()
            current_sc = SubCluster(
                name=clean_text, cluster_name=cluster_name,
                description='', annotations=line_annots,
            )
            current_desc = []
            current_cites = []
            state = 'in_description'
            i += 1
            continue

        # 5. Description text (after heading, before citations)
        if state == 'in_description':
            current_desc.append(stripped)
            i += 1
            continue

        # Default: append to current citations as continuation
        if current_sc and current_cites:
            current_cites[-1] += ' ' + stripped
        i += 1

    save_current()
    return sub_clusters


def parse_cluster_11(lines, start, end):
    """Parse Cluster 11 which has different formatting."""
    # Extract description: text after "Cluster Description" until the internal ToC
    desc_parts = []
    i = start + 1  # skip the "Cluster 11: ..." heading
    found_desc = False

    # Find description paragraph
    while i < end:
        stripped = lines[i].strip()
        if stripped in ('Cluster Description', 'Research Integrity Cluster'):
            found_desc = True
            i += 1
            continue
        if found_desc and stripped:
            # Check if we've hit the internal ToC
            if C11_SC_RE.match(extract_annotations(stripped)[0].strip()):
                break
            if stripped in ('Cross-Cluster Integration and Synergies',
                           'Possible Additional Sub-clusters?'):
                break
            desc_parts.append(stripped)
        elif found_desc and not stripped and desc_parts:
            # Blank line after description content
            # Check if next non-blank line is a sub-cluster or ToC
            for j in range(i + 1, min(i + 5, end)):
                next_s = lines[j].strip()
                if next_s:
                    next_clean, _ = extract_annotations(next_s)
                    if (C11_SC_RE.match(next_clean.strip()) or
                            next_s == 'Research Integrity (RI) Cluster'):
                        found_desc = False  # Stop collecting description
                    break
            if not found_desc:
                break
        i += 1

    description = ' '.join(desc_parts)

    # Find where sub-cluster content begins (after separator)
    sc_content_start = None
    for j in range(i, end):
        if SEPARATOR_RE.match(lines[j].strip()):
            sc_content_start = j + 1
            break

    if sc_content_start is None:
        sc_content_start = i

    # Parse sub-clusters
    sub_clusters = []
    current_sc = None
    current_desc = []
    current_cites = []
    in_key_readings = False

    def save_current():
        nonlocal current_sc
        if current_sc:
            current_sc.description = ' '.join(current_desc)
            current_sc.raw_citations = list(current_cites)
            sub_clusters.append(current_sc)

    j = sc_content_start
    while j < end:
        stripped = lines[j].strip()

        if not stripped:
            j += 1
            continue

        # Stop at editorial separator
        if SEPARATOR_RE.match(stripped):
            # Check if next non-blank line is a Sub-cluster heading
            is_next_sc = False
            for k in range(j + 1, min(j + 5, end)):
                next_s = lines[k].strip()
                if next_s:
                    next_clean, _ = extract_annotations(next_s)
                    if C11_SC_RE.match(next_clean.strip()):
                        is_next_sc = True
                    break
            if not is_next_sc:
                break  # Editorial section, stop parsing
            j += 1
            continue

        clean_stripped, line_annots = extract_annotations(stripped)
        clean_stripped = clean_stripped.strip()

        # Check for sub-cluster heading
        m = C11_SC_RE.match(clean_stripped)
        if m:
            save_current()
            sc_name = re.sub(r'\s+', ' ', m.group(2)).strip()
            current_sc = SubCluster(
                name=sc_name, cluster_name='Research Integrity',
                description='', annotations=line_annots, raw_citations=[]
            )
            current_desc = []
            current_cites = []
            in_key_readings = False
            j += 1
            continue

        # Description line (starts with "Description:")
        if clean_stripped.startswith('Description:') and current_sc and not in_key_readings:
            desc_text = clean_stripped[len('Description:'):].strip()
            if desc_text:
                current_desc.append(desc_text)
            j += 1
            continue

        # Key Readings marker
        if clean_stripped in ('Key Readings:', 'Key Readings'):
            in_key_readings = True
            j += 1
            continue

        # Citation line
        if BULLET_RE.match(stripped) and current_sc:
            cite_text = BULLET_RE.sub('', stripped)
            current_cites.append(cite_text)
            in_key_readings = True  # Once we see citations, we're past description
            j += 1
            continue

        # Continuation line
        if in_key_readings and current_sc and lines[j].startswith('  '):
            if current_cites:
                current_cites[-1] += ' ' + stripped
            j += 1
            continue

        # Description continuation
        if current_sc and not in_key_readings:
            current_desc.append(stripped)

        j += 1

    save_current()
    return description, sub_clusters


def parse_document(lines):
    """Parse the full document into Cluster objects."""
    lines = preprocess_lines(lines)
    content_start = find_content_start(lines)
    boundaries = find_cluster_boundaries(lines, content_start)

    if len(boundaries) != 11:
        print(f"  WARNING: Expected 11 clusters, found {len(boundaries)}")

    # Compute end boundaries
    content_end = find_content_end(lines, boundaries[-1][0])
    cluster_ranges = []
    for i, (line_idx, num, name, annots) in enumerate(boundaries):
        if i + 1 < len(boundaries):
            end = boundaries[i + 1][0]
        else:
            end = content_end
        cluster_ranges.append((line_idx, end, num, name, annots))

    clusters = []
    for line_idx, end, num, name, annots in cluster_ranges:
        if num <= 10:
            # Find Description line (or first content line for clusters like 7)
            desc_start = None
            for j in range(line_idx + 1, min(line_idx + 5, end)):
                stripped_j = lines[j].strip()
                if stripped_j == 'Description':
                    desc_start = j + 1
                    break
                # Accept first non-blank content line as fallback (Cluster 7 format)
                if (stripped_j and not CLUSTER_RE.match(stripped_j)
                        and not SEPARATOR_RE.match(stripped_j)):
                    desc_start = j
                    break
            if desc_start is None:
                desc_start = line_idx + 1

            description, toc_names, toc_end = parse_cluster_toc(lines, desc_start, end)

            # Skip blank lines after ToC
            sc_start = toc_end
            while sc_start < end and not lines[sc_start].strip():
                sc_start += 1

            sub_clusters = parse_subclusters_standard(
                lines, sc_start, end, toc_names, name
            )

            cluster = Cluster(
                number=num, name=name, description=description,
                annotations=annots, sub_clusters=sub_clusters
            )
        else:
            # Cluster 11
            description, sub_clusters = parse_cluster_11(lines, line_idx, end)
            cluster = Cluster(
                number=num, name=name, description=description,
                annotations=annots, sub_clusters=sub_clusters
            )

        clusters.append(cluster)

    return clusters


# --- Build publications list ---
def build_publications(clusters):
    """Convert raw citations into Publication objects."""
    publications = []
    for cluster in clusters:
        for sc in cluster.sub_clusters:
            for raw_cite in sc.raw_citations:
                text, annots = clean_citation_text(raw_cite)
                doi = extract_doi(text)
                pub = Publication(
                    sub_cluster=sc.name,
                    doi=doi or '',
                    apa_reference=text,  # Will be replaced by doi.org lookup if successful
                    bibtex='',
                    auto_ref=False,
                    annotations=annots,
                )
                publications.append(pub)
    return publications


# --- DOI lookup ---
class DOILookup:
    def __init__(self, cache_file):
        self.cache_file = cache_file
        self.cache = {}
        self.load_cache()
        self.hits = 0
        self.misses = 0
        self.failures = 0

    def load_cache(self):
        if os.path.exists(self.cache_file):
            with open(self.cache_file) as f:
                self.cache = json.load(f)
            print(f"  Loaded {len(self.cache)} cached DOI lookups")

    def save_cache(self):
        with open(self.cache_file, 'w') as f:
            json.dump(self.cache, f, indent=2, ensure_ascii=False)

    def lookup(self, doi):
        """Look up DOI via doi.org content negotiation. Returns {apa, bibtex} or None."""
        if doi in self.cache:
            self.hits += 1
            return self.cache[doi]

        self.misses += 1
        result = {}

        # Fetch APA reference
        apa = self._fetch_formatted(doi, 'text/x-bibliography; style=apa; locale=en-US')
        if apa:
            result['apa'] = apa.strip()
        else:
            self.failures += 1
            return None

        # Fetch BibTeX
        bibtex = self._fetch_formatted(doi, 'application/x-bibtex')
        if bibtex:
            result['bibtex'] = bibtex.strip()
        else:
            result['bibtex'] = ''

        self.cache[doi] = result
        # Save cache periodically
        if self.misses % 50 == 0:
            self.save_cache()
        return result

    def _fetch_formatted(self, doi, accept_header):
        """Fetch a formatted representation of a DOI."""
        from urllib.parse import quote
        url = f'https://doi.org/{quote(doi, safe="/:@!$&()*+,;=-._~")}'
        req = urllib.request.Request(url)
        req.add_header('Accept', accept_header)
        req.add_header('User-Agent', 'FORRT-ClusterParser/1.0 (mailto:info@forrt.org)')

        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                return resp.read().decode('utf-8')
        except urllib.error.HTTPError as e:
            if e.code == 406:
                return None  # Content negotiation not supported
            if e.code == 404:
                return None
            print(f"    HTTP {e.code} for {doi}")
            return None
        except Exception as e:
            print(f"    Error fetching {doi}: {e}")
            return None

    def print_stats(self):
        print(f"  DOI lookups: {self.hits} cached, {self.misses} fetched, {self.failures} failed")


# --- Sheet writing via gws ---
def gws_run(service, resource, *sub, method, params=None, body=None):
    """Run a gws CLI command and return parsed JSON output."""
    cmd = ['gws', service, resource]
    cmd.extend(sub)
    cmd.append(method)
    if params:
        cmd.extend(['--params', json.dumps(params)])
    if body:
        body_json = json.dumps(body, ensure_ascii=False)
        if len(body_json) > 200_000:
            # Large payload: write to temp file and use shell
            import tempfile
            with tempfile.NamedTemporaryFile(
                    mode='w', suffix='.json', delete=False) as f:
                f.write(body_json)
                tmp = f.name
            shell_cmd = (
                f"gws {service} {resource} {' '.join(sub)} {method} "
                f"--params '{json.dumps(params)}' "
                f"--json \"$(cat {tmp})\""
            )
            result = subprocess.run(
                shell_cmd, shell=True, capture_output=True, text=True)
            os.unlink(tmp)
        else:
            cmd.extend(['--json', body_json])
            result = subprocess.run(cmd, capture_output=True, text=True)
    else:
        result = subprocess.run(cmd, capture_output=True, text=True)

    # Filter informational keyring message from stderr
    stderr = (result.stderr or '').replace(
        'Using keyring backend: keyring\n', '').strip()

    if result.returncode != 0:
        print(f"  gws error (rc={result.returncode}): {stderr or result.stdout[:500]}")
        return None

    # Parse JSON output (skip keyring message line if present)
    output = result.stdout
    if output.startswith('Using keyring'):
        output = output[output.index('\n') + 1:]
    try:
        return json.loads(output)
    except json.JSONDecodeError:
        return output


def write_sheet_values(sheet_range, values):
    """Write values to a Google Sheet range. Batches large writes."""
    BATCH_SIZE = 100

    for i in range(0, len(values), BATCH_SIZE):
        batch = values[i:i + BATCH_SIZE]
        row_start = 2 + i  # Data starts at row 2
        range_str = f"'{sheet_range}'!A{row_start}"

        result = gws_run(
            'sheets', 'spreadsheets', 'values', method='update',
            params={
                'spreadsheetId': SHEET_ID,
                'range': range_str,
                'valueInputOption': 'RAW',
            },
            body={'values': batch},
        )
        if result is None:
            print(f"  Failed to write batch starting at row {row_start}")
            return False

        end_row = row_start + len(batch) - 1
        print(f"  Wrote rows {row_start}-{end_row} to {sheet_range}")
        time.sleep(0.5)  # Avoid API rate limits

    return True


def ensure_sheet_rows(sheet_id_num, needed_rows):
    """Expand a sheet's grid if it doesn't have enough rows."""
    gws_run(
        'sheets', 'spreadsheets', method='batchUpdate',
        params={'spreadsheetId': SHEET_ID},
        body={'requests': [{
            'updateSheetProperties': {
                'properties': {
                    'sheetId': sheet_id_num,
                    'gridProperties': {'rowCount': needed_rows + 10},
                },
                'fields': 'gridProperties.rowCount',
            }
        }]},
    )


def clear_sheet_data(sheet_name):
    """Clear all data rows (keep header) from a sheet."""
    range_str = f"'{sheet_name}'!A2:Z"
    gws_run(
        'sheets', 'spreadsheets', 'values', method='clear',
        params={'spreadsheetId': SHEET_ID, 'range': range_str},
        body={},
    )


def update_header(sheet_name, headers):
    """Update the header row of a sheet."""
    range_str = f"'{sheet_name}'!A1"
    gws_run(
        'sheets', 'spreadsheets', 'values', method='update',
        params={
            'spreadsheetId': SHEET_ID,
            'range': range_str,
            'valueInputOption': 'RAW',
        },
        body={'values': [headers]},
    )


def add_data_validation():
    """Add dropdown data validation to Sub-Clusters and Publications sheets."""
    # Sheet IDs from the spreadsheet
    SUBCLUSTERS_SHEET_ID = 2142431425
    PUBLICATIONS_SHEET_ID = 1999901341

    requests = [
        # Sub-Clusters!A (Cluster column) -> validated against Clusters!A
        {
            'setDataValidation': {
                'range': {
                    'sheetId': SUBCLUSTERS_SHEET_ID,
                    'startRowIndex': 1,
                    'startColumnIndex': 0,
                    'endColumnIndex': 1,
                },
                'rule': {
                    'condition': {
                        'type': 'ONE_OF_RANGE',
                        'values': [{'userEnteredValue': '=Clusters!$A$2:$A'}],
                    },
                    'strict': True,
                    'showCustomUi': True,
                },
            }
        },
        # Publications!A (Sub-Cluster column) -> validated against Sub-Clusters!B
        {
            'setDataValidation': {
                'range': {
                    'sheetId': PUBLICATIONS_SHEET_ID,
                    'startRowIndex': 1,
                    'startColumnIndex': 0,
                    'endColumnIndex': 1,
                },
                'rule': {
                    'condition': {
                        'type': 'ONE_OF_RANGE',
                        'values': [{'userEnteredValue': "='Sub-Clusters'!$B$2:$B"}],
                    },
                    'strict': True,
                    'showCustomUi': True,
                },
            }
        },
    ]

    gws_run(
        'sheets', 'spreadsheets', method='batchUpdate',
        params={'spreadsheetId': SHEET_ID},
        body={'requests': requests},
    )
    print("  Data validation rules added")


# --- Validation ---
def validate(clusters, publications):
    """Validate parsed data and print warnings."""
    sc_names = set()
    for c in clusters:
        for sc in c.sub_clusters:
            sc_names.add(sc.name)

    # Check all publication sub-cluster references
    invalid = set()
    for pub in publications:
        if pub.sub_cluster not in sc_names:
            invalid.add(pub.sub_cluster)

    if invalid:
        print(f"  WARNING: {len(invalid)} publication sub-cluster names not in Sub-Clusters sheet:")
        for name in sorted(invalid):
            print(f"    - {name!r}")

    # Check for zero-citation sub-clusters
    for c in clusters:
        for sc in c.sub_clusters:
            if not sc.raw_citations:
                print(f"  WARNING: No citations for sub-cluster '{sc.name}' in Cluster {c.number}")


# --- JSON export for Hugo ---
def _clean_html_entities(text):
    """Decode HTML entities in text (e.g. &amp; -> &)."""
    import html
    return html.unescape(text) if text else text


def export_json(clusters, publications):
    """Export clusters data as JSON for Hugo to consume."""
    # Build a lookup: (sub_cluster_name) -> list of publications
    pub_by_sc = {}
    for pub in publications:
        pub_by_sc.setdefault(pub.sub_cluster, []).append(pub)

    data = {"clusters": []}
    for c in clusters:
        cluster_obj = {
            "number": c.number,
            "name": c.name,
            "description": c.description,
            "sub_clusters": [],
        }
        for sc in c.sub_clusters:
            pubs = pub_by_sc.get(sc.name, [])
            sc_obj = {
                "name": sc.name,
                "description": sc.description,
                "publications": [
                    {
                        "doi": p.doi,
                        "apa": _clean_html_entities(p.apa_reference),
                        "auto_ref": p.auto_ref,
                    }
                    for p in pubs
                ],
            }
            cluster_obj["sub_clusters"].append(sc_obj)
        data["clusters"].append(cluster_obj)

    # Write to data/ directory (relative to repo root)
    repo_root = os.path.dirname(SCRIPT_DIR)
    out_path = os.path.join(repo_root, 'data', 'clusters_v4.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"  Wrote {out_path}")
    print(f"  {len(data['clusters'])} clusters, "
          f"{sum(len(c['sub_clusters']) for c in data['clusters'])} sub-clusters, "
          f"{sum(len(p) for c in data['clusters'] for p in [sc['publications'] for sc in c['sub_clusters']])} publications")


# --- Main ---
def main():
    parser = argparse.ArgumentParser(description='Parse FORRT Clusters GDoc to GSheet')
    parser.add_argument('--dry-run', action='store_true',
                        help='Parse only, print stats, no DOI lookups or sheet writes')
    parser.add_argument('--skip-doi', action='store_true',
                        help='Skip DOI lookups, use raw text from doc')
    parser.add_argument('--cache-file', default=DEFAULT_CACHE,
                        help='DOI cache file path')
    parser.add_argument('--export-json', action='store_true',
                        help='Export clusters data as JSON for Hugo (data/clusters_v4.json)')
    parser.add_argument('--json-only', action='store_true',
                        help='Only export JSON (skip sheet writing)')
    args = parser.parse_args()

    # 1. Fetch and parse
    print("=== Fetching document ===")
    raw_lines = fetch_document()

    print("\n=== Parsing document ===")
    clusters = parse_document(raw_lines)

    # 2. Summary
    total_sc = sum(len(c.sub_clusters) for c in clusters)
    publications = build_publications(clusters)
    dois_found = sum(1 for p in publications if p.doi)

    print(f"\n=== Parsing summary ===")
    for c in clusters:
        cite_count = sum(len(sc.raw_citations) for sc in c.sub_clusters)
        print(f"  Cluster {c.number}: {c.name}")
        print(f"    {len(c.sub_clusters)} sub-clusters, {cite_count} citations")
    print(f"\n  Total: {len(clusters)} clusters, {total_sc} sub-clusters, "
          f"{len(publications)} publications ({dois_found} with DOIs)")

    # 3. Validate
    print("\n=== Validating ===")
    validate(clusters, publications)

    if args.dry_run:
        print("\n=== Dry run complete ===")
        return

    # 4. DOI lookups
    if not args.skip_doi:
        print(f"\n=== Looking up {dois_found} DOIs via doi.org ===")
        doi_lookup = DOILookup(args.cache_file)

        for i, pub in enumerate(publications):
            if not pub.doi:
                continue
            result = doi_lookup.lookup(pub.doi)
            if result:
                pub.apa_reference = result['apa']
                pub.bibtex = result.get('bibtex', '')
                pub.auto_ref = True
            if (i + 1) % 100 == 0:
                print(f"  Progress: {i + 1}/{len(publications)}")

        doi_lookup.save_cache()
        doi_lookup.print_stats()

        auto_count = sum(1 for p in publications if p.auto_ref)
        print(f"  {auto_count}/{len(publications)} publications with auto-ref")

    # 5. Export JSON for Hugo
    if args.export_json or args.json_only:
        print("\n=== Exporting JSON for Hugo ===")
        export_json(clusters, publications)

    if args.json_only:
        print("\n=== JSON-only mode, skipping sheet write ===")
        return

    # 6. Write to Google Sheet
    print("\n=== Writing to Google Sheet ===")

    # Update headers (annotations only on Publications)
    print("  Updating headers...")
    update_header('Clusters', ['Name', 'Explanation'])
    update_header('Sub-Clusters', ['Cluster', 'Name', 'Explanation'])
    update_header('Publications', ['Sub-Cluster', 'DOI', 'APA Reference',
                                   'BibTex reference', 'auto-ref', 'annotations'])

    # Clear existing data
    print("  Clearing existing data...")
    clear_sheet_data('Clusters')
    clear_sheet_data('Sub-Clusters')
    clear_sheet_data('Publications')

    # Write Clusters
    print("  Writing Clusters...")
    cluster_rows = [[c.name, c.description] for c in clusters]
    write_sheet_values('Clusters', cluster_rows)

    # Write Sub-Clusters
    print("  Writing Sub-Clusters...")
    sc_rows = []
    for c in clusters:
        for sc in c.sub_clusters:
            sc_rows.append([sc.cluster_name, sc.name, sc.description])
    write_sheet_values('Sub-Clusters', sc_rows)

    # Write Publications (expand grid if needed)
    print("  Writing Publications...")
    PUBLICATIONS_SHEET_ID = 1999901341
    ensure_sheet_rows(PUBLICATIONS_SHEET_ID, len(publications) + 2)
    pub_rows = []
    for pub in publications:
        pub_rows.append([
            pub.sub_cluster,
            pub.doi,
            pub.apa_reference,
            pub.bibtex,
            'TRUE' if pub.auto_ref else 'FALSE',
            pub.annotations,
        ])
    write_sheet_values('Publications', pub_rows)

    # 6. Data validation
    print("\n=== Adding data validation ===")
    add_data_validation()

    print("\n=== Done ===")
    print(f"  Sheet: https://docs.google.com/spreadsheets/d/{SHEET_ID}")


if __name__ == '__main__':
    main()
