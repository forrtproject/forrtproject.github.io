# AGENTS.md

Hugo site for forrt.org. Setup, contribution workflow and staging are in `CONTRIBUTING.md`; CI workflows in `.github/workflows/README.md`.

## Generated content: fix the source, then re-run the generator

Much of the site is generated from Google Sheets and Docs, and the generated files carry no marker. Before editing a file under `content/`, `data/` or `static/`, look for its generator with `git grep -l -F <name> -- '*.py' '*.js' '*.R' '*.Rmd' .github/workflows/`, searching the file name and then the folder name (folder first for `index.md`). If a generator writes the file, edit the source its docstring names and re-run it (or let its workflow run), and commit only what it writes. The next run overwrites a hand edit.

`deploy.yaml` unpacks `data-artifact` over the checkout before Hugo builds, and replaces every `content/post/` bundle with the announcements artifact. A commit to any path in the `Upload data artifact` step of `data-processing.yml`, generated or not, therefore reaches forrt.org only after the next data-processing run on `main`. Local builds use the committed copies, which can lag forrt.org.

## Site conventions

- Styles: edit `assets/scss/` (`main.scss`, `custom.scss`, `academic/*.scss`). The site compiles these, and they override the theme's same-named SCSS files.
- Images are WebP. The PR image check flags PNG and JPG files and references.
- Staging: staging.forrt.org shows all open, conflict-free, non-draft PRs merged together. To stage a single PR, dispatch `staging-aggregate.yaml` with `single_pr`.

## Checks

Run both against a build (`hugo -d <dir>`), as `deploy.yaml` does:

- `python3 scripts/check_seo_html.py <dir>`. Add a regression check here when you fix a template.
- `python3 scripts/check_sitemap_lastmod.py <dir>/sitemap.xml [--compare-source]` (needs full Git history).

Unit tests: `python3 -m unittest discover -s scripts/tests`. `scripts/test_parse_disciplines_gdoc.py` sits outside that folder and no CI job runs it: `python3 -m unittest discover -s scripts -p 'test_parse_disciplines_gdoc.py'`.
