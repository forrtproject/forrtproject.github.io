"""Helpers for the weekly link-checker workflow (.github/workflows/link-check.yaml).

Stdlib-only so the workflow can run without installing extra packages.
"""

from __future__ import annotations

import json
import re
import time
import tomllib
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ZENODO_API_HEADERS = {
    "User-Agent": "forrt-link-checker/1.0 (+https://forrt.org; mailto:info@forrt.org)",
    "Accept": "application/json",
}

_ZENODO_RECORD_RE = re.compile(
    r"^/records?/(\d+)(?:/files/([^/?#]+))?/?$",
    re.IGNORECASE,
)
_ZENODO_COMMUNITY_RE = re.compile(
    r"^/communities/([^/?#]+)(?:/.*)?$",
    re.IGNORECASE,
)


def parse_zenodo_url(url: str) -> tuple[str, str, str | None] | None:
    """Classify a Zenodo URL into an API-verifiable target.

    Returns:
      ("record", record_id, filename_or_None) for /record(s)/<id>[/files/<name>]
      ("community", slug, None) for /communities/<slug>[/...]
      None for non-Zenodo URLs, the Zenodo homepage, or paths without a clean API endpoint.
    """
    parsed = urllib.parse.urlparse(url)
    host = parsed.netloc.lower()
    if host not in ("zenodo.org", "www.zenodo.org"):
        return None
    path = parsed.path or "/"
    m = _ZENODO_RECORD_RE.match(path)
    if m:
        record_id = m.group(1)
        filename = urllib.parse.unquote(m.group(2)) if m.group(2) else None
        return ("record", record_id, filename)
    m = _ZENODO_COMMUNITY_RE.match(path)
    if m:
        return ("community", urllib.parse.unquote(m.group(1)), None)
    return None


def _default_fetch_json(api_url: str, retries: int = 3) -> tuple[int | None, dict | None]:
    """Fetch JSON from Zenodo's public REST API.

    Returns (status_code, payload_or_None). Network errors return (None, None).
    """
    delay = 1.0
    for attempt in range(retries):
        req = urllib.request.Request(api_url, headers=ZENODO_API_HEADERS)
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                return resp.status, json.load(resp)
        except urllib.error.HTTPError as e:
            if e.code in (404, 410):
                return e.code, None
            if e.code in (429, 500, 502, 503, 504) and attempt < retries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            return e.code, None
        except Exception:
            if attempt < retries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            return None, None
    return None, None


def verify_zenodo_urls(
    urls: list[str],
    fetcher=_default_fetch_json,
    max_workers: int = 6,
) -> tuple[list[str], dict[str, str], list[str]]:
    """Verify bot-blocked Zenodo URLs via Zenodo's public REST API.

    Deduplicates API requests by record ID / community slug so 30 file downloads
    from one record make only a single API call.

    Returns:
      recovered:  URLs confirmed live (and for /files/<name>, file exists in record).
      broken:     {url: status_label} for confirmed 404/410 records, missing
                  communities, or /files/<name> absent from an existing record.
      unverified: URLs that aren't API-verifiable Zenodo URLs or hit transient
                  API errors (caller should fall back to normal re-check/Wayback).
    """
    parsed_items: list[tuple[str, tuple[str, str | None, str | None] | None]] = [
        (u, parse_zenodo_url(u)) for u in urls
    ]

    api_targets: dict[tuple[str, str], str] = {}
    for _, parsed in parsed_items:
        if parsed is None:
            continue
        kind, ident, _ = parsed
        key = (kind, ident)
        if key in api_targets:
            continue
        if kind == "record":
            api_targets[key] = f"https://zenodo.org/api/records/{ident}"
        elif kind == "community":
            api_targets[key] = f"https://zenodo.org/api/communities/{urllib.parse.quote(ident, safe='')}"

    api_results: dict[tuple[str, str | None], tuple[int | None, dict | None]] = {}
    if api_targets:
        with ThreadPoolExecutor(max_workers=max_workers) as pool:
            futs = {pool.submit(fetcher, api_url): key for key, api_url in api_targets.items()}
            for fut in as_completed(futs):
                api_results[futs[fut]] = fut.result()

    recovered: list[str] = []
    broken: dict[str, str] = {}
    unverified: list[str] = []

    for url, parsed in parsed_items:
        if parsed is None:
            unverified.append(url)
            continue
        kind, ident, filename = parsed
        status, data = api_results.get((kind, ident), (None, None))
        if status == 200 and isinstance(data, dict):
            if kind == "record" and filename is not None:
                file_keys = {
                    f.get("key")
                    for f in (data.get("files") or [])
                    if isinstance(f, dict) and f.get("key")
                }
                if filename in file_keys:
                    recovered.append(url)
                else:
                    broken[url] = "ZENODO-FILE-404"
            else:
                recovered.append(url)
        elif status in (404, 410):
            broken[url] = str(status)
        else:
            unverified.append(url)

    return recovered, broken, unverified


def format_limitations_section(lychee_config_path: str | Path = ".lychee.toml") -> str:
    """Build a Markdown Limitations section describing what the checker skips."""
    path = Path(lychee_config_path)
    excludes: list[str] = []
    exclude_paths: list[str] = []
    if path.is_file():
        cfg = tomllib.loads(path.read_text(encoding="utf-8"))
        excludes = [str(p) for p in cfg.get("exclude", [])]
        exclude_paths = [str(p) for p in cfg.get("exclude_path", [])]

    lines = [
        "\n## Limitations / Not checked\n",
        "Some links cannot be reliably checked by lychee in GitHub Actions and are either excluded in `.lychee.toml` or verified via dedicated APIs:\n",
        "* **Checked via dedicated APIs instead of direct HTTP:** `doi.org` links are validated via the DOI Handle API (`responseCode == 1`), and bot-blocked `zenodo.org` records, files, and communities are verified via Zenodo's public REST API.",
        "* **Not checked automatically (excluded in `.lychee.toml`):** internal `forrt.org` URLs (verified as local build files), placeholder/local hosts, social media domains (`facebook.com`, `linkedin.com`, `twitter.com`, `x.com`), FORRT Slack channels/invites (`forrt.slack.com`, `join.slack.com`), the POST-only newsletter form endpoint, `web.archive.org` URLs, and templated GitHub `/edit/` links.",
        "* **Archived newsletter issues excluded:** historical copies under `newsletters/YYYY-MM/` are not checked.",
        "* **WAF / bot-blocked sites:** remaining 403/405/409/412 URLs are re-checked with browser headers and dated against Wayback Machine CDX captures (subject to an 8-minute runtime ceiling); links that block datacenter IPs and have no recent Wayback capture cannot be confirmed live in CI.",
    ]

    if excludes or exclude_paths:
        lines.append("\n<details>")
        lines.append("<summary>Exact `.lychee.toml` exclusion patterns</summary>\n")
        if excludes:
            lines.append("**Excluded URL patterns (`exclude`):**")
            for pat in excludes:
                lines.append(f"* `{pat}`")
        if exclude_paths:
            lines.append("\n**Excluded paths (`exclude_path`):**")
            for pat in exclude_paths:
                lines.append(f"* `{pat}`")
        lines.append("\n</details>\n")
    else:
        lines.append("")

    return "\n".join(lines)
