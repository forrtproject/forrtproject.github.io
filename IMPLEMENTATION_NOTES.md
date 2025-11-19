# Contributors Page Filtering - Implementation Notes

## Overview

This document provides technical implementation notes for the contributors page filtering feature added to the FORRT website.

## Implementation Date

November 2025

## Problem Statement

The contributors page previously displayed a static list of all contributors. The goal was to add dynamic filtering by project and role via URL parameters while maintaining full SEO visibility of all contributor names and data.

## Solution Architecture

### Three-Layer Approach

1. **Data Generation Layer** (`tenzing.py`)
   - Fetches contributor data from Google Sheets
   - Processes and normalizes project/role names
   - Generates static HTML with structured data attributes
   - Ensures proper HTML escaping for security

2. **Static HTML Layer** (`tenzing_template.md` → generated `tenzing.md`)
   - Contains all contributor data in semantic HTML (`<ul>` and `<li>` elements)
   - Includes data attributes for filtering (`data-projects`, `data-roles`)
   - Maintains full SEO visibility (all text in HTML)
   - Includes filter UI structure (hidden by default)

3. **Client-Side Enhancement Layer** (`contributor-filter.js`)
   - Parses URL parameters for filtering requests
   - Filters and displays matching contributors dynamically
   - Provides UI controls for managing filters
   - Uses progressive enhancement (works without JS)

## Technical Decisions

### Why Client-Side Filtering?

- **SEO Preservation**: All contributor data remains in static HTML
- **No Backend Required**: Hugo is a static site generator
- **Fast Performance**: No server round-trips needed
- **Simple Deployment**: No API or database changes required

### Why Data Attributes?

- **Standard HTML5**: Native browser support
- **Non-Intrusive**: Doesn't affect visual presentation
- **Parseable**: Easy to query with JavaScript
- **SEO-Friendly**: Doesn't hide content from search engines

### Normalization Strategy

Project and role names are normalized to ensure consistent matching:

```
Original: "Replications & Reversals"
Normalized: "replications-and-reversals"

Original: "Writing - original draft"
Normalized: "writing---original-draft"
```

Rules:
1. Convert to lowercase
2. Replace whitespace sequences with single hyphens
3. Replace `&` with `and`
4. Trim leading/trailing whitespace

This normalization is applied consistently in both Python and JavaScript.

## Security Considerations

### Implemented Protections

1. **HTML Attribute Escaping**: All data attribute values are escaped using `html.escape()` in Python
2. **XSS Prevention**: URL parameters are sanitized before display using custom `escapeHtml()` function
3. **Safe DOM Manipulation**: Filtered results are created using DOM methods, not `innerHTML`
4. **Input Validation**: Null checks and empty string handling for all user inputs
5. **CodeQL Analysis**: Passed with 0 vulnerabilities

### Attack Vectors Considered

- ✅ Malicious project/role names in source data
- ✅ XSS via URL parameters
- ✅ HTML injection through data attributes
- ✅ JavaScript injection in filter display

## Testing

### Manual Testing Performed

1. ✅ Filter by project only
2. ✅ Filter by role only
3. ✅ Combined project + role filtering
4. ✅ Clear filters button
5. ✅ Empty results handling
6. ✅ Multiple projects per contributor
7. ✅ Multiple roles per contributor
8. ✅ Special characters in names
9. ✅ Page without filters (full list)

### Browser Testing

Tested in Chromium-based browser via Playwright automation.

## Maintenance

### When to Regenerate

The contributors page should be regenerated whenever:
- New contributors are added to the source spreadsheets
- Contributor roles are updated
- Project names change
- The filtering logic needs updates

### Regeneration Process

```bash
cd scripts/forrt_contribs
python3 tenzing.py
cp tenzing.md ../../content/contributors/tenzing.md
git add content/contributors/tenzing.md
git commit -m "Update contributors data"
git push
```

### Monitoring

No special monitoring required. The feature is entirely client-side and uses static data.

## Performance

- **Initial Page Load**: No performance impact (HTML is pre-rendered)
- **Filtering Operation**: O(n) where n = number of contributors (~900)
- **Memory Usage**: Minimal (only clones matching DOM nodes)
- **Browser Compatibility**: Works in all modern browsers (ES6+)

## Known Limitations

1. **No Fuzzy Matching**: Filter values must match exactly (after normalization)
2. **Case-Insensitive Only**: All matching is lowercase
3. **No Search Within Text**: Filters match entire project/role names only
4. **Client-Side Only**: Requires JavaScript enabled for filtering

## Future Enhancements

Potential improvements for future consideration:

1. **Filter UI**: Add dropdown selects for easier filter selection
2. **Multi-Select**: Allow filtering by multiple projects/roles simultaneously
3. **Search Box**: Add text search within contributor names
4. **Filter History**: Remember last used filters in localStorage
5. **Share Links**: Generate shareable filtered view URLs
6. **Analytics**: Track which filters are most commonly used

## Related Documentation

- `CONTRIBUTORS_FILTERING.md` - User-facing documentation
- `scripts/forrt_contribs/README.md` - Script usage guide
- Code comments in `tenzing.py` and `contributor-filter.js`

## Success Criteria Met

✅ URL parameter filtering works for project and role
✅ All contributor data remains SEO-visible
✅ No server-side changes required
✅ Security best practices followed
✅ Comprehensive documentation provided
✅ Code review comments addressed
✅ No CodeQL security vulnerabilities
✅ Functional testing completed successfully

## Support

For questions or issues, refer to the main FORRT repository documentation or contact the development team.
