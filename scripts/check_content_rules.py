#!/usr/bin/env python3
"""Check pull-request content rules (WebP images and canonical doi.org links).

Runs in a single GitHub Actions job (.github/workflows/check_content_rules.yaml)
against the PR git diff — stdlib-only, no GitHub API calls required.

Rules:
  1. Images (advisory warning): flags added/modified .png/.jpg/.jpeg files and
     non-URL references to them in changed text files, honoring
     scripts/webp_conversion/image_ignore_list.txt.
  2. Publisher URLs with embedded DOIs (hard fail): bans newly added direct
     publisher URLs containing a DOI (e.g. science.org/doi/10.1126/...,
     pnas.org/doi/..., medrxiv.org/content/10.1101/..., ?doi=10....) in
     hand-maintained files under content/, suggesting https://doi.org/<doi>.
"""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
import urllib.parse
from dataclasses import dataclass
from pathlib import Path

COMMENT_MARKER = "<!-- content-rules-check -->"

IGNORE_LIST_FILE = Path("scripts/webp_conversion/image_ignore_list.txt")
IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg")
TEXT_EXTENSIONS = (".md", ".html", ".txt", ".toml", ".yaml", ".yml")
IMAGE_REF_RE = re.compile(r"([^\s\"'<>()]+\.(?:png|jpg|jpeg))", re.IGNORECASE)

# Hand-maintained content paths checked for newly added publisher-DOI URLs.
# Generated directories (rebuilt from Google Sheets/Docs) are excluded so
# automated data-sync PRs are not blocked by upstream sheet entries.
CONTENT_DOI_EXTENSIONS = (".md", ".html", ".toml", ".yaml", ".yml", ".json")
GENERATED_CONTENT_PREFIXES = (
    "content/glossary/",
    "content/curated_resources/",
    "content/summaries/",
)

# Matches URLs in prose/markdown/HTML without stopping at balanced parens.
URL_RE = re.compile(r"https?://[^\s\"'<>`]+", re.IGNORECASE)
PUBLISHER_DOI_PATH_RE = re.compile(
    r"/doi/(?:abs/|full/|pdf/|epdf/|pdfdirect/|citedby/)?(10\.\d{4,9}/[^?#]+)",
    re.IGNORECASE,
)
RXIV_DOI_RE = re.compile(
    r"^(?:www\.)?(?:bio|med)rxiv\.org$",
    re.IGNORECASE,
)
RXIV_PATH_RE = re.compile(r"^/content/(10\.1101/[^?#]+)", re.IGNORECASE)
QUERY_DOI_RE = re.compile(r"(?:^|&)(?:doi)=(10\.\d{4,9}/[^&#]+)", re.IGNORECASE)
PREPRINT_SUFFIX_RE = re.compile(r"(?:v\d+)?(?:\.full(?:\.pdf)?|\.abstract)?$", re.IGNORECASE)
HUNK_RE = re.compile(r"^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@")

TRAIL_PUNCT = ".,;:!?\"'`"


@dataclass(frozen=True)
class DoiViolation:
    path: str
    line: int
    url: str
    doi: str

    @property
    def replacement(self) -> str:
        return f"https://doi.org/{self.doi}"


def _trim_unbalanced_closers(text: str) -> str:
    """Strip trailing ')' / ']' when they have no matching opener inside text."""
    while text and text[-1] in ")]":
        opener = "(" if text[-1] == ")" else "["
        if text.count(opener) < text.count(text[-1]):
            text = text[:-1]
        else:
            break
    return text


def _clean_url_token(raw: str) -> str:
    """Trim surrounding markdown/sentence punctuation from a matched URL token."""
    url = raw.rstrip(TRAIL_PUNCT)
    url = _trim_unbalanced_closers(url)
    url = url.rstrip(TRAIL_PUNCT)
    return url


def extract_publisher_doi(url: str) -> str | None:
    """Return the embedded DOI if url is a non-doi.org publisher URL, else None."""
    cleaned = _clean_url_token(url)
    parsed = urllib.parse.urlparse(cleaned)
    host = parsed.netloc.lower()
    if not host:
        return None
    # Canonical DOI resolvers and Wayback snapshots are allowed.
    if host in ("doi.org", "dx.doi.org", "www.doi.org", "web.archive.org"):
        return None

    doi: str | None = None
    m = PUBLISHER_DOI_PATH_RE.search(parsed.path)
    if m:
        doi = m.group(1)
    elif RXIV_DOI_RE.match(host):
        m = RXIV_PATH_RE.match(parsed.path)
        if m:
            doi = PREPRINT_SUFFIX_RE.sub("", m.group(1).rstrip("/"))
    else:
        m = QUERY_DOI_RE.search(parsed.query)
        if m:
            doi = urllib.parse.unquote(m.group(1))

    if not doi:
        return None

    doi = urllib.parse.unquote(doi).rstrip("/")
    doi = _trim_unbalanced_closers(doi).rstrip(TRAIL_PUNCT)
    return doi or None


def is_checked_content_path(rel_path: str) -> bool:
    """True if rel_path is a hand-maintained content file checked for DOI URLs."""
    norm = rel_path.replace("\\", "/")
    if not norm.startswith("content/"):
        return False
    if any(norm.startswith(prefix) for prefix in GENERATED_CONTENT_PREFIXES):
        return False
    return norm.lower().endswith(CONTENT_DOI_EXTENSIONS)


def find_publisher_doi_in_diff(diff_text: str) -> list[DoiViolation]:
    """Scan unified-0 git diff text and return publisher-DOI violations on added lines."""
    violations: list[DoiViolation] = []
    current_file: str | None = None
    line_no = 0
    seen: set[tuple[str, int, str]] = set()

    for raw_line in diff_text.splitlines():
        if raw_line.startswith("+++ b/"):
            current_file = raw_line[6:]
            line_no = 0
            continue
        if raw_line.startswith("+++ "):
            current_file = None
            continue
        if raw_line.startswith("@@ "):
            m = HUNK_RE.match(raw_line)
            line_no = int(m.group(1)) if m else 0
            continue
        if not current_file or not is_checked_content_path(current_file):
            continue
        if raw_line.startswith("+") and not raw_line.startswith("+++"):
            added = raw_line[1:]
            for m in URL_RE.finditer(added):
                url = _clean_url_token(m.group(0))
                doi = extract_publisher_doi(url)
                if doi:
                    key = (current_file, line_no, url)
                    if key not in seen:
                        seen.add(key)
                        violations.append(DoiViolation(current_file, line_no, url, doi))
            line_no += 1

    return violations


def load_ignore_list(path: Path = IGNORE_LIST_FILE) -> set[str]:
    if not path.is_file():
        return set()
    return {
        line.strip()
        for line in path.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.strip().startswith("#")
    }


def check_images(
    changed_files: list[tuple[str, str]],
    repo_root: Path = Path("."),
    ignore_list: set[str] | None = None,
) -> tuple[list[str], list[str]]:
    """Check added/modified files for non-WebP image files and local references."""
    ignored = ignore_list if ignore_list is not None else load_ignore_list(repo_root / IGNORE_LIST_FILE)
    images_found: list[str] = []
    references_found: list[str] = []

    for status, rel_path in changed_files:
        if status not in ("A", "M", "R", "C"):
            continue
        lower = rel_path.lower()
        if lower.endswith(IMAGE_EXTENSIONS):
            if rel_path not in ignored:
                images_found.append(rel_path)
        elif lower.endswith(TEXT_EXTENSIONS):
            full = repo_root / rel_path
            if not full.is_file():
                continue
            text = full.read_text(encoding="utf-8", errors="ignore")
            for match in IMAGE_REF_RE.findall(text):
                if match in ignored or "http://" in match or "https://" in match:
                    continue
                references_found.append(f"{rel_path}: {match}")

    return images_found, references_found


def git_changed_files(base: str, head: str) -> list[tuple[str, str]]:
    """Return [(status_letter, path)] for files changed between base...head."""
    out = subprocess.check_output(
        ["git", "diff", "--name-status", f"{base}...{head}"],
        text=True,
    )
    results: list[tuple[str, str]] = []
    for line in out.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        status = parts[0][0]
        path = parts[-1]
        results.append((status, path))
    return results


def git_unified_diff(base: str, head: str) -> str:
    """Return unified-0 diff between base...head for content/."""
    return subprocess.check_output(
        ["git", "diff", "--unified=0", "--no-color", f"{base}...{head}", "--", "content/"],
        text=True,
        errors="ignore",
    )


def format_comment(
    images_found: list[str],
    references_found: list[str],
    doi_violations: list[DoiViolation],
) -> str:
    """Render the PR comment body covering all content rules."""
    parts = [COMMENT_MARKER]

    if not images_found and not references_found and not doi_violations:
        parts.append(
            ":thumbsup: All content rules passed (WebP images/references and canonical `doi.org` links)."
        )
        return "\n".join(parts) + "\n"

    if doi_violations:
        parts.append("### :x: Direct publisher URLs with embedded DOIs detected\n")
        parts.append(
            "Publisher sites frequently block automated link checkers with HTTP 403 and can "
            "change URL structure over time. Please replace these with canonical `https://doi.org/...` links:\n"
        )
        parts.append("| Location | Publisher URL | Replace with |")
        parts.append("|---|---|---|")
        for v in doi_violations:
            parts.append(f"| `{v.path}:{v.line}` | `{v.url}` | `{v.replacement}` |")
        parts.append("")

    if images_found or references_found:
        parts.append("### :warning: Image files/references in png/jpg format detected\n")
        parts.append(
            "Note that we generally rely on WebP format for this webpage, so please consider "
            "converting these images to WebP format and updating references accordingly.\n"
        )
        if images_found:
            parts.append("**Image files:**")
            for img in images_found:
                parts.append(f"- {img}")
            parts.append("")
        if references_found:
            parts.append("**References to image files:**")
            for ref in references_found:
                parts.append(f"- {ref}")
            parts.append("")

    return "\n".join(parts).rstrip() + "\n"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Check PR content rules.")
    parser.add_argument("--base", required=True, help="Base commit/ref for the PR diff.")
    parser.add_argument("--head", default="HEAD", help="Head commit/ref (default: HEAD).")
    parser.add_argument(
        "--github-output",
        default=os.getenv("GITHUB_OUTPUT"),
        help="Optional GITHUB_OUTPUT file to write comment and failed flags.",
    )
    parser.add_argument(
        "--no-fail",
        action="store_true",
        help="Always exit 0 (used in CI when a later step fails after posting the PR comment).",
    )
    args = parser.parse_args(argv)

    changed = git_changed_files(args.base, args.head)
    images_found, references_found = check_images(changed)
    diff_text = git_unified_diff(args.base, args.head)
    doi_violations = find_publisher_doi_in_diff(diff_text)

    comment = format_comment(images_found, references_found, doi_violations)
    failed = bool(doi_violations)

    print(comment)

    if args.github_output:
        delimiter = "CONTENT_RULES_EOF"
        with open(args.github_output, "a", encoding="utf-8") as fh:
            fh.write(f"failed={'true' if failed else 'false'}\n")
            fh.write(f"comment<<{delimiter}\n{comment}{delimiter}\n")

    if failed and not args.no_fail:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
