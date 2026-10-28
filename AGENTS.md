# AGENTS.md

Hugo site for forrt.org. Setup, contribution workflow and staging are in `CONTRIBUTING.md`; workflows are described in `.github/workflows/README.md`.

## Generated content: fix the source, then re-run the generator

Much of the site is built from Google Sheets/Docs. To change such content, edit the source named in the generator's docstring and re-run the generator (or let the workflow run); commit only what the generator writes. The paths below that `data-processing.yml` uploads as `data-artifact` (`content/curated_resources/`, `content/glossary/`, `data/` except `partners.json` and `publications.yaml`, `static/data/`, `content/contributors/tenzing.md`, `content/contributor-analysis/`) are unpacked over the checkout by `deploy.yaml` before Hugo builds. A hand edit there is overwritten on the live site, and even a correct regenerated commit appears on forrt.org only after the next data-processing run on `main` (daily, or manual dispatch).

Rebuilt on every daily `data-processing.yml` run:

| Output | Generator | Source |
|---|---|---|
| `content/curated_resources/*.md` (not `_index.md`) | `content/resources/resource.py` | FORRT Database 2.0 sheet |
| `content/glossary/apa_lookup.json`, `content/glossary/references/index.md` | `bibtex_to_apa/bibtex_to_apa.js`, `content/glossary/_build_references.py` | "Glossary BibTex" Google Doc |
| `data/featured_resources.json`, `data/pub_cards.json`, `data/filter_tags.json` | `scripts/build_featured_data.py` | Recommendations form + Publications sheet |
| `data/get_involved_projects.json` | `scripts/build_get_involved.py` | Get Involved sheet (fallback `scripts/get_involved/projects.csv`) |
| `data/ga_data.json` | `scripts/download_ga_data.py` | Google Analytics (credentials in CI only) |
| `content/contributors/tenzing.md` | `scripts/forrt_contribs/tenzing.py` | Tenzing sheets |
| `static/data/fred_citation.txt` | `scripts/update_fred_citation.py` | FReD-data repo |
| `content/contributor-analysis/` | `content/contributor-analysis/*.Rmd` (monthly) | Tenzing cache + Google Sheets |

Regenerated on demand; the output is committed:

| Output | Generator | Source |
|---|---|---|
| Glossary terms `content/glossary/{english,german,arabic,chinese,turkish}/*.md` | `content/glossary/_create_glossaries.py`; in CI only via `data-processing.yml` dispatch with `regenerate_glossary`, which opens a PR | Glossary Google Sheet |
| `data/disciplines.json` | `scripts/parse_disciplines_to_json.py` (see `content/disciplines/README`) | Disciplines sheet |
| `data/disciplines_citation.json` | `scripts/build_disciplines_citation.py` | Tenzing sheet |
| `data/clusters_v4.json` | `scripts/parse_clusters_to_sheet.py --export-json` | Clusters v4.1 Google Doc |
| `content/clusters/cluster-N/index.md` | `scripts/generate_cluster_pages.py` | `data/clusters_v4.json` |
| `content/about/steering-committee/index.md` (rewritten on re-run) | `scripts/generate_sc_profiles.py` | Steering committee sheets |

Announcement posts (`content/post/<Slug>/`) come from the "FORRT Announcements" sheet via `scripts/create_announcements.R` in `create_announcements.yml`; `deploy.yaml` replaces the committed post bundles with that artifact.

`resource.py` and `_create_glossaries.py` carry each page's `lastmod` forward via `scripts/generated_lastmod.py`, so sitemap dates change only when content does.

## Theme overrides

- Templates: edit `layouts/`, which overrides `themes/academic/layouts/`. Change `themes/academic/` only when no override exists and an override would not do.
- Styles: the site compiles `assets/scss/` (`main.scss`, `custom.scss`, `academic/*.scss`), whose files override the theme's same-named SCSS.
- Configuration lives in `config/_default/`; the root `config.toml` exists only for blogdown compatibility.

## Build and preview

- `hugo server -D` (or `view.sh`). CI pins the Hugo version as `HUGO_VERSION` in `deploy.yaml`.
- Local builds use the committed copies of generated data, which can lag forrt.org.
- staging.forrt.org shows all open, conflict-free, non-draft PRs merged together (`staging-aggregate.yaml`); its `single_pr` dispatch input stages one PR.
- Images: the PR image check (`scripts/webp_conversion/check_images_in_pr.py`) flags PNG/JPG files and references; the site uses WebP.

## Checks and tests

Run against a build (`hugo -d <dir>`); `deploy.yaml` runs both on `public/`:

- `python3 scripts/check_seo_html.py <dir>`: hard checks on headings, conditional Mermaid/highlight.js loading, image `alt` and homepage image dimensions. Add regression checks here for template fixes.
- `python3 scripts/check_sitemap_lastmod.py <dir>/sitemap.xml [--compare-source]`: sitemap `lastmod` plausibility (needs full Git history).

Unit tests: `python3 -m unittest discover -s scripts/tests` and `python3 -m unittest discover -s scripts -p 'test_parse_disciplines_gdoc.py'`.

Spelling: PRs run codespell via `scripts/spell_check/check_spelling.py` (config `.codespellrc`; add accepted words to `.codespell-ignore.txt`).

## Language and spelling

Site content is English by default (`defaultContentLanguage = "en"`); the glossary also has Arabic, Chinese, German and Turkish versions. No British or American spelling convention is set: the spell-check README accepts both, and both occur in content. Match the surrounding text.

## Licences

- `LICENSE.md`, `README.md` and `CITATION.cff`: the repository is CC BY-NC-SA 4.0.
- `CONTRIBUTING.md`: contributions are assumed to be offered under CC BY 4.0 unless stated otherwise, and must be shareable under the licence of the relevant site section.
- `themes/academic/` is MIT-licensed (`themes/academic/LICENSE.md`). No separate licence for code is declared.

## AI-assisted contributions

`CONTRIBUTING.md` accepts AI-assisted contributions only when the contributor has fully reviewed the code and content. Fact-check content and cite sources.
