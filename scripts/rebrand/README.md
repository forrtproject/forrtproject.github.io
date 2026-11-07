# Build checks kept from the Doors redesign

The Doors redesign was built on the `rebrand-doors` branch with a preview workflow and a set of checks. At launch the workflow and the redesign-only tools were removed. These checks stayed because they are worth promoting into the normal workflows. None of them runs automatically yet.

| Check | Script | Fails when |
|---|---|---|
| Source rules | `check_source_rules.py [--base origin/main]` | A template or menu hard-codes one of this site's own forrt.org URLs (use `relref`), or a branch edits a generated path |
| Builds compared | `compare_builds.py <reference-build> <candidate-build>` | A page, feed or data file appears or goes, a structured-data count falls, JSON-LD is invalid, or a page's SEO tags change. Agreed exceptions go in `allowed_changes.txt` beside it, one path or glob per line with a comment |
| Internal links | `check_internal_links.py <build> [--reference <build of main>]` | A link inside the site is broken, and with `--reference` not also broken there. Lychee excludes forrt.org, so nothing else checks these |

Build both sides from the same data and announcement artifacts as `deploy.yaml`, or generated collections will differ. `site_inventory.py` lists a build's paths, structured data and SEO tags for `compare_builds.py`. The checks use `resolves()` and `sister_sites.txt` (FORRT's other sites under forrt.org) from `preview_paths.py`, whose path rewriting served the preview. Tests are in `../tests/test_rebrand_checks.py`.

The removed tools, including the browser checks of the design, accessibility and the launched site, are in `scripts/rebrand/` in the history of the `rebrand-doors` branch.
