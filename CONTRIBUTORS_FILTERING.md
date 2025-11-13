# Contributors Page Filtering

This document describes the filtering functionality added to the Contributors page.

## Overview

The Contributors page now supports dynamic filtering by project and role via URL parameters. This allows users to view specific subsets of contributors while maintaining full SEO visibility of all contributor data.

## Usage

### Filtering by Project

To view contributors for a specific project, add the `project` parameter to the URL:

```
/contributors?project=glossary
/contributors?project=replications-and-reversals
/contributors?project=impact-on-students
```

Project names should be:
- Lowercase
- Spaces replaced with hyphens
- Ampersands replaced with "and"

Examples of project name normalization:
- "Glossary" → `glossary`
- "Replications & Reversals" → `replications-and-reversals`
- "Impact on students" → `impact-on-students`

### Filtering by Role

To view contributors by their role, add the `role` parameter to the URL:

```
/contributors?role=project-manager
/contributors?role=writing---original-draft
/contributors?role=investigation
```

Role names follow the same normalization rules as projects.

Examples of role name normalization:
- "Project Manager" → `project-manager`
- "Writing - original draft" → `writing---original-draft`
- "Investigation" → `investigation`

### Combined Filtering

You can filter by both project and role simultaneously:

```
/contributors?project=glossary&role=writing---review-and-editing
```

This will show only contributors who worked on the Glossary project with the "Writing - review & editing" role.

### Viewing All Contributors

To view all contributors (default view), simply visit:

```
/contributors
```

Or click the "Show All Contributors" button that appears when filters are active.

## Technical Details

### Data Generation (tenzing.py)

The `tenzing.py` script has been updated to:

1. Add a `normalize_for_attribute()` function that converts project and role names to a consistent format
2. Extract all projects and roles for each contributor
3. Generate HTML list items with `data-projects` and `data-roles` attributes
4. Wrap contributor entries in proper HTML structure with `<ul>` and `<li>` tags

### Template (tenzing_template.md)

The template now includes:

1. Filter control UI (hidden by default)
2. A container for displaying filtered results
3. A wrapper `<ul>` tag for the contributor list
4. Script tag to load the filtering JavaScript

### JavaScript (contributor-filter.js)

The JavaScript file provides:

1. URL parameter parsing to detect filter requests
2. Contributor filtering based on data attributes
3. Dynamic display of filtered results
4. UI controls for clearing filters and returning to the full list

### SEO Considerations

All contributor data remains in the static HTML as `<li>` elements with data attributes. Search engines can index:
- All contributor names
- All project names
- All role descriptions

The filtering is purely client-side and doesn't prevent search engine crawling.

## Regenerating the Contributors Page

After updating contributor data in the source spreadsheets, regenerate the page by running:

```bash
cd scripts/forrt_contribs
python3 tenzing.py
```

Then copy the generated `tenzing.md` file to the appropriate location:

```bash
cp scripts/forrt_contribs/tenzing.md content/contributors/tenzing.md
```

## Examples

### Example 1: Find all Glossary contributors
```
https://forrt.org/contributors?project=glossary
```

This will display all contributors who worked on the Glossary project with their specific roles.

### Example 2: Find all project managers
```
https://forrt.org/contributors?role=project-manager
```

This will show everyone who served as a Project Manager across all projects.

### Example 3: Find writing contributors to Impact on Students
```
https://forrt.org/contributors?project=impact-on-students&role=writing---original-draft
```

This shows contributors who did original draft writing for the Impact on Students project.
