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

# Includes the redesign's NEW_OUTPUTS and the summaries generator's output.
OUTPUT_SOURCES = {
    "data/summaries.json": "the published FORRT summaries Google Doc, then run content/summaries/summaries.py",
    "data/open_research_games.json": "the Games Portal source sheet, then run scripts/build_games_portal.py",
    "data/scholar_citations.json": "the publication citation inputs used by scripts/gs-cite/google_scholar.py",
    "content/publications/citation_chart.webp": "the publication citation inputs used by scripts/gs-cite/google_scholar.py",
    "content/about/steering-committee/index.md": "the steering committee or personal-details sheet, then run scripts/generate_sc_profiles.py",
    "content/contributors/tenzing.md": "the Tenzing contributor sheets, then rerun the data-processing workflow",
    "scripts/forrt_contribs/contributors_cache.csv": "the Tenzing contributor sheets, then rerun the data-processing workflow",
    "static/partials/network-graph.html": "the contributor network source in content/contributor-analysis/network-graph.Rmd",
    "static/data/fred_citation.txt": "the citation in FORRT's FReD-data repository, then run scripts/update_fred_citation.py",
    "data/clusters_v4.json": "the Clusters Google Doc, then run scripts/parse_clusters_to_sheet.py --json-only",
    "data/disciplines.json": "the Open Research Across Disciplines Google Sheet, then run scripts/parse_disciplines_to_json.py",
    "data/disciplines_citation.json": "the disciplines Tenzing sheet, then run scripts/build_disciplines_citation.py",
    "data/ga_data.json": "Google Analytics, then run scripts/download_ga_data.py",
    "data/get_involved_projects.json": "the Get Involved Google Sheet or its fallback CSV, then run scripts/build_get_involved.py",
}

PATTERN_SOURCES = (
    (r"^data/(featured_resources|pub_cards|filter_tags)\.json$", "the recommendations or publications data used by scripts/build_featured_data.py"),
    (r"^content/curated_resources/", "the curated resources Google Sheet, then run content/resources/resource.py"),
    (r"^content/glossary/", "the glossary Google Sheet, then rerun glossary generation in the data-processing workflow"),
    (r"^content/post/", "the FORRT Announcements Google Sheet, then run scripts/create_announcements.R"),
    (r"^content/contributor-analysis/(?!.*\.Rmd$)", "the Tenzing contributor sheets or the R Markdown under content/contributor-analysis, then rerun the data-processing workflow"),
    (r"^content/clusters/", "the Clusters Google Doc, then run scripts/parse_clusters_to_sheet.py --json-only and scripts/generate_cluster_pages.py"),
)


def generated_source(path):
    if path in OUTPUT_SOURCES:
        return OUTPUT_SOURCES[path]
    if not GENERATED.match(path):
        return None
    for pattern, source in PATTERN_SOURCES:
        if re.match(pattern, path):
            return source
    return "the generator's source as described in AGENTS.md"


def changed_paths(base):
    # Treat renames as delete/add so both paths are checked. NUL separators preserve
    # whitespace and non-ASCII filenames.
    diff = subprocess.check_output(
        ["git", "diff", "--name-only", "--no-renames", "-z", "--end-of-options", f"{base}...HEAD", "--"]
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
