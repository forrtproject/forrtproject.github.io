# Designing pages for forrt.org

How pages on forrt.org should look and behave, for anyone changing a template, a style or the layout of a page. The site uses the Doors design, which came out of community feedback on the earlier site and a design brief; this guide holds what still applies from both, together with the principles learnt from applying Doors across the site's templates.

Styles live in `assets/css/doors/`, with colours and type defined once in `tokens.css`. Shared page parts are in `layouts/partials/doors/` and `layouts/shortcodes/`.

## 1. Character

- FORRT is an organisation with several facets, run by a community. Pages should feel lively and communal: not sleek or corporate, not a newspaper, blog or severe institution, and not dark, menacing or heavy.
- The site has one idea of its own, the castle and its doors, which runs across pages without becoming tiresome. It must not depend on content that has to be refilled constantly.
- Avoid the generic template look: no ivory-serif-and-rust formula, no tracked capitals as labels above headings, no hairline-ruled columns as the main organising device, no grids of identical cards. Short schedule labels, such as MORNING and AFTERNOON in a programme, are the exception: tracked capitals help there.
- Real content only: no invented statistics, quotes or examples.

## 2. Lead with what visitors came for

- The page's main tool, list or action appears in the first screen at 390 px and at 1440 px. Background, history and acknowledgements come after it.
- Move information down, or put it behind a disclosure with a plain label ("About the glossary project, and how to cite it"). Do not delete it to make the page shorter.
- "How to cite" is a visible section of its own wherever a page asks to be cited.
- Keep images that explain something, such as the Replication Hub diagram, even when the page would look more uniform without them. When such a diagram shows the parts of a section, such as the clusters diagram, make it the way in to those parts: each part links to its page, with readable labels and a keyboard route.
- Colour and size, not only position, make the order of importance clear, on phones too.

## 3. One clear next step

- Each screen has one main action. Other actions are quieter: smaller, outlined or plain links.
- Action labels say what the visitor will do ("Teach with open materials", "Explore replications"), not what FORRT has.
- Prefer routes into FORRT's own pages. A link that leaves forrt.org says where it goes.
- Every kind of submission starts at `/submit/`, which sends people on to the right form. Do not call submitting "contributing": contributors join the work and are listed as such.

## 4. Calm, specific pages

Every repeated device has to earn its place. In practice:

- Pills and chips are for controls: filters, toggles, language switches. A list of links, such as related glossary terms, is a plain list.
- Search and filters belong on long lists (the glossary, the resources directory, Reversals). A list of fewer than about twenty items needs neither.
- Tags: a tag links to the tags page only when at least five pages and at most a quarter of all pages share it (`layouts/partials/functions/tag_counts.html`). Rarer tags are plain keywords; tags on more pages are not shown, because they no longer tell pages apart.
- In long lists of long entries, show the first two lines of each description (three on a phone) with a "more" button. Without JavaScript the full text shows.
- Cards for actions are the brick cards of `action_cards`. A set of bricks uses several area colours, never three near-identical ones. Lists of tools are rows: a linked title and a sentence, not boxes.
- Framed boxes (cards, panels, toolbars) keep space inside them and between them; text never runs up against a box's edge.

## 5. Links look like links

- A link is visible as a link without hovering, normally by an underline. A row that is clickable as a whole still shows its title as a link.
- Things that are not links never look like buttons or chips. An unlinked related term is plain text.
- Buttons in a row have a gap between them, on every screen size.

## 6. Colour carries meaning

- FORRT works in four areas of equal standing: Education & Pedagogy, Meta-Science & Research, Social Justice & DEIA, and Community & Sustainability. Each has its colour: education `--edu` (green), research `--res` (dark blue), social justice `--jus` (purple), community `--com` (brown). Pages and cards that belong to an area use its colour and its pale background (`--edu-bg` and so on). The `area` argument of `action_cards` starts a row of bricks with that area's colour.
- The 11 FORRT clusters are not areas. Each keeps a colour of its own, and together they span the spectrum (`layouts/partials/clusters/colors.html`), so the clusters can be told apart. Strong cluster colours are for small marks; their backgrounds stay pale.
- `--hot` (orange) is for highlights, `--urgent` (red) only for urgency. White is a clean ground.
- Colour is fresh but not loud: no large areas of saturated colour, no intense full-bleed colour, no dark band across the page, no grey-and-beige, and no beige highlights.

## 7. Type and reading

- Newsreader for headings, Source Sans 3 for text. Body text is 18 px; nothing is smaller than 15 px.
- No italics anywhere outside reference lists, including menus, captions, labels and quotes. Emphasis is semi-bold.
- Headings, buttons and labels are in sentence case.
- Reading lines stay under 80 characters, measured on the rendered lines. The narrow reading column is for prose; tables, tools, programmes and directories may use the full width.
- Use the FORRT logo as supplied. Century Schoolbook is not a web font here.

## 8. Shared parts to reuse

Before writing a new component, check these:

| Need | Use |
|---|---|
| A page with a lead image beside its title | `doors/page_hero.html`, through `hero_image` in front matter (AWoP, Citational Justice, AI in Metascience) |
| A set of actions as cards | `{{< action_cards area="edu|res|jus|com" >}}` |
| Search and a count over a long list | `{{< list_filter >}}`, with `noun` for the count ("Showing 12 of 436 effects") |
| Contents on a phone | `doors/toc_phone.html`: an open, labelled list that collapses after six sections |
| Names with links | `doors/name_list.html` |
| Keywords on a resource | `doors/resource_keywords.html` |
| Previous and next | `doors/pager.html`: Previous on the left, Next on the right |
| Information to keep but not lead with | a `details` disclosure with a plain label |

Images in the first screen are not lazy-loaded.

## 9. Phones

- Show the same information as on desktop, in a different order if needed. Hide a part only when it repeats something already on the screen; for example, the home page's secondary actions are hidden at 760 px and below.
- Tap targets are at least 44 px, including small close buttons. A small visible control can have a larger invisible tap area.
- A toolbar may stay on screen while a long list scrolls. On a phone only its search row stays, so the list keeps most of the screen.
- Do not repeat navigation: hide a "Go to" menu where the side contents card already lists the same sections.
- The phone menu keeps the chosen section visible, opens its submenu directly below it, and has a visible way to close it.

## 10. Words

- Write plain, specific text, and explain a feature in one sentence ("Tags link pages and resources across the site on the same topic."). No marketing phrases, no exclamation marks, British English.
- Shortening text that its authors wrote, such as a tool's description, goes in its own PR for the authors to review.
- Resource entries, glossary terms, cluster pages and other generated pages get their wording from spreadsheets and documents (see `AGENTS.md`). Change their presentation in the templates, and their wording at the source.

## 11. Motion

- Animation never overlaps or hides text, and it can be paused with a mouse, a keyboard and on touch, through a control that appears on hover, focus or tap rather than at rest.
- Reduced-motion settings are respected, and every animated part has a static version that works without WebGL or JavaScript.

## 12. Accessibility and the technical floor

- Text has a contrast of at least 4.5:1, large text at least 3:1.
- Keyboard focus is always visible; pages have a skip link, landmarks and alt text on images. Escape closes menus, and an opened desktop menu takes the next Tab stop.
- No page scrolls sideways at 390, 1024 or 1440 px, nor at 390, 760, 1024 and 1440 px with text enlarged to 200%.
- Images, canvases and text never collide at any width, including the breakpoints either side of 760, 1000 and 1240 px, with the fonts loaded.
- No script errors and no broken images.

`scripts/rebrand/check_design.py` and `scripts/rebrand/check_axe.py` test most of this on every push; `scripts/rebrand/README.md` lists what each check covers.

## Proposing a design change

1. Branch from the branch you are changing (`rebrand-doors` until launch, then `main`). Put each change that someone would judge on its own in its own PR.
2. Open the PR description with what changes for visitors. Then show, for each change, a before-and-after crop of the affected part at 390 px and at 1440 px, with one line above it saying what changed. Full-page screenshots side by side are too hard to compare.
3. List the choices that a reviewer may want to reverse under **Decisions to review**.
4. Run the checks above and say which passed. A change to a page's description needs an entry in `scripts/rebrand/allowed_changes.txt`.
5. For a larger review, have people or models rate a handful of representative pages from screenshots at both widths, and also try the live build to find problems that screenshots hide. Treat their suggestions as input: record which you accept and why, and judge them against this guide.
