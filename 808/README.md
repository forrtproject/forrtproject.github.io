# PR #815 — Steering Committee layout (issue #808)

Before/after screenshots for the connecting-bar team grouping.

- `operations-before-after.png` — Operations section (worst case, 10 teams), before vs after.
  In *before*, Sara Lil Middleton wraps to a new row and reads as part of the team to her
  right; in *after* her purple bar keeps her with Sustainability & Strategy.
- `full-before.png` / `full-after.png` — whole page at 1280px wide.

## How these were produced (reproducible)
1. Render the page from the committed `content/about/steering-committee/index.md` + the real
   `static/css/steering-committee.css` into a standalone HTML preview (rewrite `/authors/...`
   and inline the CSS), then screenshot headless Chrome at `--window-size=1280,7000`.
2. "Before" uses the versions on `main`; "after" uses the PR branch
   `improve-808-steering-committee-display`.
3. Trim whitespace (`magick ... -trim`) and crop the Operations region at matched coordinates.
