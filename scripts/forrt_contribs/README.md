# FORRT Contributors Data Generation

This directory contains the script and template for generating the Contributors page.

## Files

- `tenzing.py` - Python script that fetches contributor data from Google Sheets and generates the tenzing.md file
- `tenzing_template.md` - Template file with frontmatter and structure
- `tenzing.md` - Generated output file (copy to `content/contributors/tenzing.md` after generation)

## Generating the Contributors Page

### Prerequisites

Install required Python packages:

```bash
pip install pandas
```

### Running the Script

```bash
cd scripts/forrt_contribs
python3 tenzing.py
```

This will:
1. Fetch contributor data from Google Sheets
2. Process and deduplicate contributors
3. Generate HTML with data attributes for filtering
4. Save the output to `tenzing.md`

### Deploying the Updates

After running the script, copy the generated file to the content directory:

```bash
cp scripts/forrt_contribs/tenzing.md content/contributors/tenzing.md
```

Then commit and push the changes.

## New Filtering Feature

The generated page now includes:

- **Data attributes**: Each contributor entry has `data-projects` and `data-roles` attributes
- **Filter UI**: Hidden by default, appears when URL parameters are present
- **JavaScript filtering**: Client-side filtering via `/js/contributor-filter.js`

### How Filtering Works

1. The script normalizes project and role names (lowercase, hyphens, etc.)
2. Each `<li>` element gets data attributes with comma-separated normalized values
3. JavaScript parses URL parameters and filters based on these attributes
4. All data remains in the HTML for SEO purposes

### Example URLs

- View all Glossary contributors: `/contributors?project=glossary`
- View all project managers: `/contributors?role=project-manager`
- Combined filter: `/contributors?project=glossary&role=writing---original-draft`

See `CONTRIBUTORS_FILTERING.md` in the root directory for complete documentation.

## Data Structure

The script processes data from multiple sources:

1. **Main CSV**: Project list with Tenzing CSV links
2. **Project CSVs**: Individual contributor data per project
3. **Extra Roles CSV**: Additional roles not captured in Tenzing format

The output includes:
- Contributor name (with ORCID link if available)
- Projects contributed to
- Roles/contributions for each project
- Data attributes for filtering
