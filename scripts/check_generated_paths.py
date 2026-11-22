#!/usr/bin/env python3
"""Reject changes to generator outputs relative to a PR's merge base."""

import argparse
import os
import re
import subprocess


GENERATED = re.compile(
    r"^(content/curated_resources/(?!_index\.md$)"
    r"|content/glossary/(?!_build_references\.py$|_create_glossaries\.py$)"  # its generators sit beside their output
    r"|content/post/[^/]+/"
    r"|content/contributors/tenzing\.md$"
    r"|content/contributor-analysis/"
    r"|content/publications/citation_chart\.webp$"
    r"|content/replication-hub/flora/_index\.md$"
    r"|content/clusters/cluster-\d+/index\.md$"
    r"|content/about/steering-committee/index\.md$"
    r"|static/data/"
    r"|static/partials/"
    r"|scripts/forrt_contribs/contributors_cache\.csv$"
    r"|data/(?!partners\.json$|publications\.yaml$|themes/|fonts/)[^/]+$)"
)

# Named outputs are also covered by GENERATED. Keep their source guidance explicit.
OUTPUT_SOURCES = {
    "data/summaries.json": "the published FORRT summaries Google Doc, then run content/summaries/summaries.py",
    "data/open_research_games.json": "the Games Portal source sheet, then run scripts/build_games_portal.py",
    "data/scholar_citations.json": "the publication citation inputs used by scripts/gs-cite/google_scholar.py",
    "content/publications/citation_chart.webp": "the publication citation inputs used by scripts/gs-cite/google_scholar.py",
    "content/about/steering-committee/index.md": "the steering committee or personal-details sheet, then run scripts/generate_sc_profiles.py",
    "data/clusters_v4.json": "the Clusters Google Doc, then run scripts/parse_clusters_to_sheet.py --json-only",
    "data/ga_data.json": "Google Analytics, then run scripts/download_ga_data.py",
}

PATTERN_SOURCES = (
    (r"^content/curated_resources/", "the curated resources Google Sheet, then run content/resources/resource.py"),
    (r"^content/glossary/", "the glossary Google Sheet, then run content/glossary/_create_glossaries.py and _build_references.py"),
    (r"^content/post/", "the announcements source used by scripts/create_announcements.R"),
    (r"^content/clusters/", "the Clusters Google Doc, then run scripts/parse_clusters_to_sheet.py --json-only and scripts/generate_cluster_pages.py"),
)


def generated_source(path):
    if not GENERATED.match(path):
        return None
    if path in OUTPUT_SOURCES:
        return OUTPUT_SOURCES[path]
    for pattern, source in PATTERN_SOURCES:
        if re.match(pattern, path):
            return source
    return "the generator's source as described in AGENTS.md"


def changed_paths(base):
    # Treat renames as delete/add so both paths are checked. NUL separators preserve
    # whitespace and non-ASCII filenames.
    diff = subprocess.check_output(
        ["git", "diff", "--name-only", "--no-renames", "-z", f"{base}...HEAD", "--"]
    )
    return [os.fsdecode(path) for path in diff.split(b"\0") if path]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", required=True)
    args = parser.parse_args()

    found = False
    for path in changed_paths(args.base):
        source = generated_source(path)
        if source:
            print(f"  {path!r}: update {source}.")
            found = True
    if found:
        print("Generated files changed. For intentional generator output, apply the generated-output label.")
    return int(found)


if __name__ == "__main__":
    raise SystemExit(main())
