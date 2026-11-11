# Doors redesign checks

Tools for the long-lived `rebrand-doors` branch, which moves forrt.org to the Doors design. The branch stays a draft PR until launch; its preview is at <https://forrt.org/rebrand-doors/>.

Only `check_preview.py --production` runs against production, after launch; everything else checks the branch, its builds or the preview. Delete this folder after launch unless a check has been promoted into the normal workflows.

## What runs on every push and PR

`.github/workflows/rebrand-preview.yaml` builds the branch and its merge base with `main` from the same data and announcement artifacts as `deploy.yaml`, with Hugo 0.158.0 and `HUGO_ENV=staging`, and then runs:

| Check | Script | Fails when |
|---|---|---|
| Source rules | `check_source_rules.py` | A template or menu hard-codes one of this site's own forrt.org URLs (use `relref`), or the branch edits a generated path |
| Builds compared | `compare_builds.py` | A page, feed or data file appears or goes, a structured-data count falls, JSON-LD is invalid, or a page's SEO tags change |
| Internal links | `check_internal_links.py` | A link broken here is not also broken at the merge base. Lychee excludes forrt.org, so nothing else checks these |
| Built HTML | `../check_seo_html.py` | The site's standing rules on headings, conditional assets, image `alt` and home-page images |
| Designed screens | `check_design.py` | On the designed screens and every page on the reading layout (a sample of the three large collections): sideways overflow, italics, line length, small text, low contrast, broken images or more than one `h1`; an icon outside the subset or a theme asset loaded anywhere; the home page's topics too far down (A14), layout shift, pause control or the resources directory misbehaving; a call-out over the text, the card or another call-out; the chat launcher, its invitation or label, or back to top over text, a card or a control, at any of several scroll positions, or the invitation showing nowhere; specialist resources shown on a cluster page while their box is unticked; the conference programme's day tabs, abstract dialog or width misbehaving, or any of its days failing the audit with JavaScript off; the contributor network off centre or too small on its canvas, reaching another site, or not answering to its search boxes, pointer, keyboard or reduced motion; an abstract toggle that does not say Hide when open, panel text wider than the reading measure on `/clusters/` or `/disciplines/`, the booklet turning to a spread at 390 px, or the community map opening at 390 px without its members in view or unable to zoom out |
| Accessibility rules | `check_axe.py` | axe-core reports a Level A or AA problem on a sample page at 390 or 1440 px, apart from the provider's markup listed in `KNOWN` |

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

- `check_preview.py` checks the deployed preview in a browser: one URL per rule in the 404 table, a sample of links and assets, noindex, search, and that the newsletter form loads on a click and not before. After launch, `check_preview.py --production` runs the same checks on <https://forrt.org/> and instead requires that sampled pages carry no noindex and that their canonical URLs sit on the root domain and outside `/rebrand-doors/`. Redirects and search results must also stay on that origin. A retired path that names a sister site lands on that site there, because its own repository answers first.
- `rehearse_launch.py --work <dir> [--doors-ref <ref>]` rehearses the launch without pushing anything. It merges the branch into a throwaway branch from `main` with `--no-ff`, builds that merge and `main` as `deploy.yaml` does (production artifacts, Hugo 0.158.0, `HUGO_ENV=production`), and runs `deploy.yaml`'s checks and `compare_builds.py` on both. It then checks noindex, canonical URLs, the sitemap and leftover `/rebrand-doors` paths, rebuilds without any data-artifact file that would revert a Doors change, and loads sample pages on localhost to list requests to other hosts. Results go to `<dir>/summary.json`; everything else is deleted unless `--keep` is given.
- `check_design.py` checks the designed screens in a browser, on a build or the preview, in Chromium by default and with `--browser firefox` or `--browser webkit` in the others: overflow, also on the sample pages, italics, line length, one `h1`, hidden buttons, and the resources directory's filters, address, search and pages. On a build it also sweeps the reading layout's pages, including for empty space beside the text, and scans for icons and theme assets.
- `screenshot_pages.py <public-dir | address> --out <dir>` shoots the sample pages, or `--paths`, at phone (390 px) and desktop (1440 px) size for design review, with the cookie banner answered, and cuts each page into tiles about two screens tall so text stays legible. `manifest.json` lists the tiles.
- `capture_pages.py` also weighs and screenshots a preview build with `--base /rebrand-doors/`.
- `build_fonts.py` rebuilds `static/fonts/doors/`, and with `--icons` the subset of Font Awesome and `assets/css/doors/icons.css`. Add a new icon to its `ICONS` list.
- `render_castle_still.py` rerenders the home page's still image.
