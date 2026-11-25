# Baseline: forrt.org before the Doors redesign

Built on 3 November 2026 from `main` at `f8425848db462a87a11f86f55b035e8deeb48cc6`, with Hugo 0.158.0 extended, `HUGO_ENV=production` and the production data and announcement artifacts of that day. An earlier build by the same steps, at `ed4633e`, matched the deployed `gh-pages` branch file for file, apart from `CNAME`, `.nojekyll` and `media/.gitkeep`.

| File | Contents |
|---|---|
| `paths.txt` | Every output file, with build-specific hashes normalised |
| `structured_data.json` | JSON-LD records by type and template group, with page counts |
| `seo_heads.json` | A digest of each page's title, description, canonical, hreflang, robots, sharing tags and JSON-LD |
| `weights.json` | Sample pages from `../sample_pages.json`: compressed bytes (own and third-party), requests, hosts, DOM size, JavaScript errors, sideways overflow |

Own files are weighed at their gzip size. Third-party figures include embeds such as YouTube, so they vary between runs.

Template groups come from paths and are an approximation: widget and plain pages share one group, because the built output does not show which template made them.
