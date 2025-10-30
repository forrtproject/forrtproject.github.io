# Tag Cleanup Summary

## Overview
This document summarizes the tag cleanup performed on the FORRT website to address the issue of unhelpful single-page tags being indexed by Google.

## Problem Statement
Tags associated with only a single page were generating indexed Google pages that weren't helpful (e.g., https://forrt.org/tag/code-of-conduct/). These low-value tag pages needed to be removed.

## Analysis Results

### Initial Tag Usage
- **Total pages with tags**: 7 pages
- **Tags by frequency**:
  - "Lesson Bank": 5 pages (kept - provides grouping value)
  - "Dr. Thomas Rhys Evans": 1 page (removed)
  - "FORRT Pedagogies": 1 page (removed)
  - "Evidence-based practice": 1 page (removed)
  - "Teaching Open Science": 1 page (removed)
  - "Political Psychology": 1 page (removed)
  - "Early Career Researchers": 1 page (removed)
  - "Minorities": 1 page (removed)
  - "Intersectionality": 1 page (removed)
  - "Academia": 1 page (removed)

### Pages Modified
1. **content/pedagogies/004-Thomas-Rhys-Evans/index.md**
   - Removed tags: `['Dr. Thomas Rhys Evans','FORRT Pedagogies','Evidence-based practice ',' Teaching Open Science' ]`
   - Changed to: `tags: []`

2. **content/educators-corner/019-Being-a-Minoritized-Early-Career-Researcher-in-Political-Psychology/index.md**
   - Removed tags: `['Political Psychology',' Early Career Researchers',' Minorities',' Intersectionality ','Academia']`
   - Changed to: `tags: []`

### Tags Retained
- **"Lesson Bank"**: Used on 5 pages in the neurodiversity-lessonbank section
  - content/neurodiversity-lessonbank/masterstools/index.md
  - content/neurodiversity-lessonbank/diversity-and-research/index.md
  - content/neurodiversity-lessonbank/implicit_bias/index.md
  - content/neurodiversity-lessonbank/community-psychology-diversity/index.md
  - content/neurodiversity-lessonbank/generalizability/index.md

## Build Verification
- Hugo build completed successfully (minor network error with Twitter embed unrelated to changes)
- Only one tag page generated: `/tag/lesson-bank/`
- All 9 single-use tag pages have been eliminated

## Impact
- **Removed**: 9 unhelpful single-page tag indices that were being indexed by Google
- **Retained**: 1 useful tag ("Lesson Bank") that groups 5 related lesson plan pages
- **No breaking changes**: Site builds successfully and all pages remain accessible

## Recommendations for Future Tag Usage
1. **Minimum threshold**: Only create tags that will be used on at least 3-5 pages
2. **Purposeful grouping**: Tags should meaningfully group related content for discovery
3. **Review periodically**: Audit tag usage annually to remove tags that no longer serve their purpose
4. **Consider alternatives**: For single-page metadata, use categories or custom taxonomies that don't generate public index pages
5. **Documentation**: Add guidelines to the contribution docs about when to add new tags

## Related Hugo Configuration
The site uses Hugo's built-in taxonomy system with the following configuration in `config/_default/config.toml`:
```toml
[taxonomies]
  tag = "tags"
  category = "categories"
  publication_type = "publication_types"
  author = "authors"
  cluster = "FORRT_clusters"
```

To completely disable tag pages in the future (if desired), this taxonomy line could be removed or the tag layout could be customized to not generate index pages.
