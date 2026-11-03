# Doors redesign checks

Tools for the long-lived `rebrand-doors` branch, which moves forrt.org to the Doors design. The branch stays a draft PR until launch; its preview is at <https://forrt.org/rebrand-doors/>.

Nothing here runs against production. Delete this folder after launch unless a check has been promoted into the normal workflows.

## What runs on every push and PR

`.github/workflows/rebrand-preview.yaml` builds the branch and its merge base with `main` from the same data and announcement artifacts as `deploy.yaml`, with Hugo 0.158.0 and `HUGO_ENV=staging`, and then runs:

| Check | Script | Fails when |
|---|---|---|
| Source rules | `check_source_rules.py` | A template or menu hard-codes one of this site's own forrt.org URLs (use `relref`), or the branch edits a generated path |
| Builds compared | `compare_builds.py` | A page, feed or data file appears or goes, a structured-data count falls, JSON-LD is invalid, or a page's SEO tags change |
| Internal links | `check_internal_links.py` | A link broken here is not also broken at the merge base. Lychee excludes forrt.org, so nothing else checks these |
| Built HTML | `../check_seo_html.py` | The site's standing rules on headings, conditional assets, image `alt` and home-page images |
| Designed screens | `check_design.py` | On the designed screens: sideways overflow, italics, line length or more than one `h1`; the home page's topics too far down (A14), layout shift, pause control or the resources directory misbehaving |

Pushes also run `preview_paths.py`, which prefixes root-relative paths for the subfolder and adds noindex to every HTML file, and then deploy. A failed check marks the run red but does not hold the preview back. Tests are in `../tests/test_rebrand_checks.py`.

Agreed exceptions go in `allowed_changes.txt` (URL list) and `link_allowlist.txt` (retired paths the 404 page redirects), with a comment saying why. `link_allowlist.txt` does not exist yet, because no exception has been agreed.

## Baseline

`baseline/` records `main` before the redesign, built with Hugo 0.158.0 and the production artifacts of the same day. `baseline/README.md` has the commit and date. The files are `paths.txt`, `structured_data.json`, `seo_heads.json` and `weights.json`. Screenshots of `sample_pages.json` at 390, 1024 and 1440 px are on the [`baseline` branch of forrtproject/rebrand-doors](https://github.com/forrtproject/rebrand-doors/tree/baseline), to keep them out of this repository.

CI compares against a fresh build of the merge base and not these files, because generated collections change daily. The baseline is the fixed record for before-and-after comparison.

To recapture from a checkout of `main` with the artifacts applied (`apply_artifacts.sh`), using Hugo 0.158.0 and `git config core.quotepath false`. Python needs `playwright` and `pillow`:

```sh
HUGO_ENV=production hugo --gc --minify --cleanDestinationDir --destination /tmp/public-main
python3 scripts/rebrand/site_inventory.py /tmp/public-main --out scripts/rebrand/baseline
python3 scripts/rebrand/capture_pages.py /tmp/public-main --out /tmp/baseline-shots
```

## Other tools

- `check_preview.py` checks the deployed preview in a browser: one URL per rule in the 404 table, a sample of links and assets, noindex, search, and that the newsletter form loads on a click and not before.
- `check_design.py` checks the designed screens in a browser, on a build or the preview: overflow, also on the sample pages, italics, line length, one `h1`, hidden buttons, and the resources directory's filters, address, search and pages. On a build it also sweeps every article page, including for empty space beside the text.
- `capture_pages.py` also weighs and screenshots a preview build with `--base /rebrand-doors/`.
- `build_fonts.py` rebuilds `static/fonts/doors/`.
- `render_castle_still.py` rerenders the home page's still image.
