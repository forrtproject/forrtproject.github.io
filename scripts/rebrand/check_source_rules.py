#!/usr/bin/env python3
"""Source rules for the redesign branch: template links and generated content.

Run: python3 scripts/rebrand/check_source_rules.py [--base origin/main]

1. Templates and menus must not hard-code forrt.org URLs for this site's own pages:
   use relref in templates, which fails the build when a page is missing, and a site path
   in menus. Links to sister sites are fine, as is FORRT's address in structured data.
2. Generated paths (CONTRIBUTING.md) must not change on the branch, as a hand edit is
   lost when the generator next runs. Compared with the merge base, so main's own updates
   arriving through a merge do not count.
"""

import argparse
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from preview_paths import load_sister_sites  # noqa: E402

ABSOLUTE = re.compile(r"https?://(?:www\.)?forrt\.org(/[^\s\"'<>)}]*)?")
SCANNED = ("layouts", "config/_default/menus.toml")
# Generated paths from CONTRIBUTING.md and AGENTS.md.
GENERATED = re.compile(
    r"^(content/curated_resources/(?!_index\.md$)"
    r"|content/glossary/"
    r"|content/contributors/tenzing\.md$"
    r"|content/contributor-analysis/"
    r"|content/publications/citation_chart\.webp$"
    r"|content/replication-hub/flora/_index\.md$"
    r"|content/clusters/cluster-\d+/index\.md$"
    r"|content/about/steering-committee/index\.md$"
    r"|static/data/fred_citation\.txt$"
    r"|data/(?!partners\.json$|publications\.yaml$|themes/|fonts/)[^/]+$)"
)


def repo_files(root="."):
    for entry in SCANNED:
        path = os.path.join(root, entry)
        if os.path.isfile(path):
            yield path
        for directory, _, names in os.walk(path):
            for name in names:
                yield os.path.join(directory, name)


def absolute_url_findings(root=".", sisters=None):
    sisters = load_sister_sites() if sisters is None else sisters
    findings = []
    for path in repo_files(root):
        with open(path, encoding="utf-8", errors="replace") as handle:
            for number, line in enumerate(handle, 1):
                for match in ABSOLUTE.finditer(line):
                    tail = (match.group(1) or "").strip("/")
                    if tail.split("/", 1)[0] in sisters:
                        continue
                    # An organisation's identity in schema.org records is its address.
                    if not tail and re.search(r"\"url\"", line):
                        continue
                    findings.append(f"{path}:{number}: {match.group(0)}")
    return findings


def generated_edits(base):
    merge_base = subprocess.check_output(["git", "merge-base", base, "HEAD"], text=True).strip()
    changed = subprocess.check_output(
        ["git", "-c", "core.quotepath=false", "diff", "--name-only", merge_base, "HEAD"], text=True
    ).splitlines()
    return [path for path in changed if GENERATED.match(path)]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default="origin/main")
    args = parser.parse_args()

    absolute = absolute_url_findings()
    print(f"Hard-coded forrt.org URLs in templates and menus: {len(absolute)}")
    for finding in absolute:
        print(f"  {finding[:200]}")

    edits = generated_edits(args.base)
    print(f"Generated paths changed on this branch: {len(edits)}")
    for path in edits:
        print(f"  {path}")

    sys.exit(1 if absolute or edits else 0)


if __name__ == "__main__":
    main()
