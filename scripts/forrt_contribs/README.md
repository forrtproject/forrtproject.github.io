# FORRT Contributors Data Generation

This directory contains the script and template for generating the Contributors page.

## Files

- `tenzing.py` - Python script that fetches contributor data from Google Sheets and generates the `tenzing.md` file
- `tenzing_template.md` - Template file with frontmatter, page structure, and CSS styles
- `tenzing.md` - Generated output file (copied to `content/contributors/tenzing.md` after generation)

The JavaScript file implementing filtering features is located at `static/js/contributor-filter.js`.

## How the Data is Generated

The `tenzing.py` script:

1. Fetches data from:
   - The Tenzing index ("Tenzing Automation Source" sheet)
   - The "FORRT Lead Tenzing Sheet"

    Error Handling: If any project sheets fail to load, the script logs the failures to `tenzing_failures.json`, which triggers a GitHub workflow to create an issue for investigation.

2. Processes the data to:
   - Consolidate each person's contributions across FORRT projects
   - Generate HTML for display on the Contributors page
   - Add `data-*` attributes to enable filtering by project/role
   - Add `id` attributes (when ORCID is available) to enable anchor links (e.g., `https://forrt.org/contributors#0000-0000-0000-0000`)
   - Generate a JSON object with all unique projects and roles to populate filter dropdown menus

3. Creates the final output by:
   - Reading `tenzing_template.md`
   - Appending the generated HTML
   - Writing to `tenzing.md`


**Important:** `tenzing.md` is auto-generated and should never be edited manually.

## URL Parameters for Filtering

The Contributors page supports URL parameters to filter and customize the view:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `project` | Filter by project name (normalized) | `?project=glossary` |
| `role` | Filter by one or more contribution roles (normalized, comma-separated or repeated; matches any selected role) | `?role=project-lead,project-co-lead` |
| `collapse-filter` | Hide the filter menu and the board of projects and show a simple "show all" link | `?project=glossary&collapse-filter` |

On a page generated from the current template, `contributor-filter.js` upgrades the project `<select>` into a live searchable combobox with contributor counts and the role `<select>` into a multi-role checklist menu, filtering live without reloading the page and updating the URL. A project or role filter adds a heading above the list that names the filter and counts the people, with a "Clear filter" control (left out in `collapse-filter` mode, which has its own "show all" link), and `#contributor-results` in the address scrolls to that heading. Above the list, `tenzing.py` writes a board of the 12 projects with the most contributors, each counted once per project, and each linking to `?project=<value>#contributor-results`. A page generated before this template has no board and no heading: it keeps its "Filtered results" block in the filter panel, which `collapse-filter` mode removes together with the panel.


## Local Development

When working with `tenzing.py` locally, copy the generated file to the content directory before rendering the site:

```
cp scripts/forrt_contribs/tenzing.md content/contributors/tenzing.md
hugo server
```