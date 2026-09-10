"""Stable `lastmod` dates for generated JSON-front-matter content.

Hugo prefers an explicit `lastmod` front-matter key over the Git commit date
(see `[frontmatter]` in config/_default/config.toml). Generators that rewrite
their whole content directory on every run therefore have to carry the date
forward themselves: an entry keeps its previous `lastmod` while its content is
unchanged, and gets today's date when the content differs.
"""

import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path


def today_utc() -> str:
    return datetime.now(timezone.utc).strftime('%Y-%m-%d')


def load_previous(directory) -> dict:
    """Read every generated `*.md` JSON file in `directory`, keyed by filename.

    `_index.md` is hand-written, not generated, and files that do not parse are
    skipped so a stray file cannot abort a run.
    """
    previous = {}
    directory = Path(directory)
    if not directory.is_dir():
        return previous
    for path in sorted(directory.glob('*.md')):
        if path.name == '_index.md':
            continue
        try:
            previous[path.name] = json.loads(path.read_text(encoding='utf-8'))
        except (OSError, ValueError):
            continue
    return previous


def _content_text(entry: dict) -> str:
    """Serialized form of an entry, ignoring its `lastmod`.

    Compared as text rather than as dicts because curated resource rows carry
    pandas NaN values, and `nan != nan` would mark every row as changed.
    """
    without_lastmod = {k: v for k, v in entry.items() if k != 'lastmod'}
    return json.dumps(without_lastmod, sort_keys=True, ensure_ascii=False)


def resolve_lastmod(new_entry: dict, previous_entry, bootstrap) -> str:
    """Return the `YYYY-MM-DD` (UTC) date to record for `new_entry`.

    Unchanged content keeps the previous date; if the previous file predates
    `lastmod`, `bootstrap()` supplies a date (today when it returns None).
    """
    if previous_entry is None:
        return today_utc()
    if _content_text(previous_entry) != _content_text(new_entry):
        return today_utc()
    return previous_entry.get('lastmod') or bootstrap() or today_utc()


# Prefix that cannot collide with a path line, so date and path lines in
# `git log --name-only` output can be told apart without guessing.
_DATE_PREFIX = 'commit-date:'


def git_commit_dates(directory) -> dict:
    """Map filename -> `YYYY-MM-DD` of the last commit touching it.

    A single `git log` walk over the directory rather than one subprocess per
    file: bootstrapping a fresh collection means ~1,300 lookups, measured at
    ~10s of pure process spawning locally and worse on a CI runner, against
    ~0.1s for the batched walk. `core.quotepath=false` is required here --
    without it Git escapes the non-ASCII glossary filenames and none of them
    match, which is the same defect this whole mechanism exists to fix.

    Returns an empty map (callers fall back to today) if Git is unavailable.
    """
    directory = Path(directory)
    cwd = directory if directory.is_dir() else directory.parent
    try:
        result = subprocess.run(
            ['git', '-c', 'core.quotepath=false', 'log',
             f'--format={_DATE_PREFIX}%cs', '--name-only', '--', '.'],
            cwd=str(cwd), capture_output=True, text=True, check=True,
        )
    except (OSError, subprocess.CalledProcessError):
        return {}

    dates = {}
    current = None
    for line in result.stdout.splitlines():
        if line.startswith(_DATE_PREFIX):
            current = line[len(_DATE_PREFIX):].strip() or None
        elif line.strip() and current:
            # git log walks newest-first, so the first sighting of a path is
            # its most recent commit; later sightings are older history.
            dates.setdefault(Path(line.strip()).name, current)
    return dates
