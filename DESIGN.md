# Designing pages for forrt.org

How pages on forrt.org should look and behave, for anyone changing a template, a style or the layout of a page, on any part of the site. The site uses the Doors design, which came out of community feedback on the earlier site and a design brief; this guide holds what still applies from both, together with the principles learnt from applying Doors across the site's templates.

Styles live in `assets/css/doors/`, with colours and type defined once in `tokens.css`. Shared page parts are in `layouts/partials/doors/` and `layouts/shortcodes/`.

## 1. Character

- FORRT is an organisation with several facets, run by a community. Pages should feel lively and communal: not sleek or corporate, not a newspaper, blog or severe institution, and not dark, menacing or heavy.
- The site has one idea of its own, the castle and its doors, which runs across pages without becoming tiresome. It must not depend on content that has to be refilled constantly.
- Avoid the generic template look: no ivory-serif-and-rust formula, no tracked capitals as labels above headings, no hairline-ruled columns as the main organising device, no grids of identical, empty cards. Directory cards with their own picture or logo and an action (§4) are not that. Short schedule labels, such as MORNING and AFTERNOON in a programme, are the exception: tracked capitals help there.
- Pictures, colour and cards make pages inviting and easier to skim. Keep them where they help, and show pictures large enough to see (an announcement's picture, a team's photo). Do not strip them out to make pages plainer or more uniform; the rules below are about clarity, not about removing character.
- Real content only: no invented statistics, quotes or examples.

## 2. Lead with what visitors came for

- The page's main tool, list or action appears in the first screen at 390 px and at 1440 px. Background, history and acknowledgements come after it.
- Move information down, or put it behind a disclosure with a plain label ("About the glossary project, and how to cite it"). Do not delete it to make the page shorter.
- "How to cite" is a visible section of its own wherever a page asks to be cited.
- Keep images that explain something, such as the Replication Hub diagram, even when the page would look more uniform without them. When such a diagram shows the parts of a section, such as the clusters diagram, make it the way in to those parts: each part links to its page, with readable labels and a keyboard route.
- Colour and size, not only position, make the order of importance clear, on phones too.

## 3. One clear next step

- Each screen leads with its main action, or with up to three equal ones that share one style. Any further action is quieter: smaller, outlined or a plain link.
- Action labels say what the visitor will do ("Teach with open materials", "Explore replications"), not what FORRT has.
- Prefer routes into FORRT's own pages. Mark a link with the external-link icon where leaving forrt.org would surprise visitors, such as in menus and in lists of FORRT pages. Links that clearly lead elsewhere, such as a button to a resource's own website, need no icon.
- Every kind of submission starts at `/submit/`, which sends people on to the right form. Do not call submitting "contributing": contributors join the work and are listed as such.

## 4. Calm, specific pages

Every repeated device has to earn its place. In practice:

- Pills and chips are for controls: filters, toggles, language switches. A list of links, such as related glossary terms, is a plain list. One exception: an item may carry one quiet tag for a category that visitors filter by on the same page, such as a resource's purpose.
- Search and filters belong on long lists (the glossary, the resources directory, Reversals). A list of fewer than about twenty items needs neither, and a longer one may do without when another clear route through it exists, such as a contents list.
- Tags: a tag links to the tags page only when at least five pages and at most a quarter of the tagged pages share it (`layouts/partials/functions/tag_counts.html`). Rarer tags are plain keywords; tags on more pages are not shown, because they no longer tell pages apart.
- In directories of cards (§4, About pages), show descriptions in full. Cut one only when it runs past six lines: show four lines and a "more" button. Dense term lists such as the glossary keep their short previews. Never hide just a line or two behind "more". Without JavaScript the full text shows.
- Cards for actions are the brick cards of `action_cards`. Lists of tools are rows: a linked title and a sentence, not boxes.
- Not everything is a card. Entries of very unequal length (Reversals' effects, Contributors) are rows with a hairline between them, so a long entry makes a taller row and leaves no gap beside it; cards suit items of much the same size (Publications). A page whose body is one long list still needs a second device so that it can be skimmed: a colour that carries meaning (an outcome, an area), a summary at the top (Reversals' outcome bar), or headings that work as an index (the letters of Contributors). Hairline rules alone are not enough (§1).
- Directories of organisations, teams and projects (Partnerships, Teams, Get involved) are pale cards or pictured entries, two or more to a row on a wide screen, so they are easy to skim. Each ends in a button for its action, such as "Visit website" or "Join the team's Slack channel".
- Framed boxes (cards, panels, toolbars) keep space inside them and between them; text never runs up against a box's edge.

## 5. Links look like links

- A link is visible as a link without hovering, normally by an underline. A row that is clickable as a whole still shows its title as a link.
- Things that are not links never look like buttons or chips. An unlinked related term is plain text.
- Buttons in a row have a gap between them, on every screen size.

## 6. Colour carries meaning

- FORRT works in four areas of equal standing: Education & Pedagogy, Meta-Science & Research, Social Justice & DEIA, and Community & Sustainability. Each has its colour: education `--edu` (green), research `--res` (dark blue), social justice `--jus` (purple), community `--com` (brown). Pages and cards that belong to an area use its colour and its pale background (`--edu-bg` and so on). Area colours appear only for their areas.
- The 11 FORRT clusters are not areas. Each keeps a colour of its own, and together they span the spectrum (`layouts/partials/clusters/colors.html`), so the clusters can be told apart. Strong cluster colours are for small marks; their backgrounds stay pale.
- Replication outcomes (Reversals) have a scale of their own, from green for replicated to wine for reversed, with grey for no status (`--out-*` in `tokens.css`). An effect's chip and its part of the outcome bar share the colour; the rows themselves stay on the page's ground.
- Rows of action bricks run through four brick colours of their own (`--brick1` to `--brick4`: wine, olive, slate and ochre), chosen to stay clear of the area colours. They add variety and carry no meaning. Where each brick stands for something that has a colour of its own, such as the Replication Hub's stages, it takes that colour instead. Do not use shades of one colour for variety: they read as more and less important.
- `--hot` (orange) is for highlights, `--urgent` (red) only for urgency. White is a clean ground.
- Colour is fresh but not loud: no large areas of saturated colour, no intense full-bleed colour, no dark band across the page, no grey-and-beige, and no beige highlights.

## 7. Type and reading

- Newsreader for headings, Source Sans 3 for text. Arabic pages use Noto Naskh Arabic for headings and Noto Sans Arabic for text, self-hosted and loaded only where Arabic text appears; Chinese uses the reader's system fonts. Body text is 18 px, and 17 px on phones (760 px and below) and in the summaries of list entries; Arabic text is set larger, at 21 px and 20 px on phones. Nothing is smaller than 15 px, except small print, which may be 14 px: footnotes, credits, legal lines, counts ("Showing 12 of 436") and metadata such as dates.
- No italics anywhere outside reference lists, including menus, captions, labels and quotes. Emphasis is semi-bold.
- Headings, buttons and labels are in sentence case.
- Reading lines stay under 80 characters, measured on the rendered lines. The narrow reading column is for prose; tables, tools, programmes and directories may use the full width.
- On a wide page, prose never stands alone in the narrow column with an empty band beside it. When a full-width list follows, the list starts beside the prose or flows around it (Community, Teams). Otherwise something useful sits beside the prose, such as a contents card, an image, or the search of a list long enough to need one (§4). The 80-character limit is for the length of lines, not a reason to leave half the screen empty.
- Use the FORRT logo as supplied. Century Schoolbook is not a web font here.

## 8. Shared parts to reuse

Before writing a new component, check these:

| Need | Use |
|---|---|
| A page with a lead image beside its title | `doors/page_hero.html`, through `hero_image` in front matter (AWoP, Citational Justice, AI in Metascience) |
| A set of actions as cards | `{{< action_cards >}}` |
| Search and a count over a long list | `{{< list_filter >}}`, with `noun` for the count ("Showing 12 of 436 effects") |
| Contents on a phone | `doors/toc_phone.html`: an open, labelled list; a list of more than six sections shows the first five, with a button for the rest |
| Names with links | `doors/name_list.html` |
| Keywords on a resource | `doors/resource_keywords.html` |
| Previous and next | `doors/pager.html`: Previous on the left, Next on the right |
| Information to keep but not lead with | a `details` disclosure with a plain label |

Images in the first screen are not lazy-loaded.

## 9. Phones

- Show the same information as on desktop, in a different order if needed. Hide a part only when it repeats something already on the screen; for example, the home page's secondary actions are hidden at 760 px and below.
- Tap targets are at least 44 px, including small close buttons. A small visible control can have a larger invisible tap area.
- A toolbar may stay on screen while a long list scrolls. On a phone only one row of it stays, its search row or a letter index (Contributors), so the list keeps most of the screen. A row that scrolls sideways fades at its edge so that what lies past it is seen to be there.
- Do not repeat navigation: hide a "Go to" menu where the side contents card already lists the same sections.
- The phone menu keeps the chosen section visible, opens its submenu directly below it, and has a visible way to close it.

## 10. Words

- Write plain, specific text, and explain a feature in one sentence ("Tags link pages and resources across the site on the same topic."). No marketing phrases, no exclamation marks. Text written for the site itself (templates, labels, buttons, help text) is in British English; content keeps its authors' spelling.
- In headings, labels and buttons, every word names what is there or what happens. Delete a word, and if nothing is lost, leave it out: "The 11 clusters", not "The 11 clusters as a list". Words about the format or the act of showing ("as a list", "overview of", "below", "click here") go, unless they tell two views of the same thing apart, as for the list that stands in for the contributor network.
- Shortening text that its authors wrote, such as a tool's description, goes in its own PR for the authors to review.
- Resource entries, glossary terms, cluster pages and other generated pages get their wording from spreadsheets and documents (see `AGENTS.md`). Change their presentation in the templates, and their wording at the source.

## 11. Motion

- Prefer motion that runs once and ends within five seconds, such as a preview when a diagram scrolls into view. It needs no pause control.
- Longer or looping animation can be paused with a mouse, a keyboard and on touch. Its control stays hidden at rest and appears on hover, focus or tap; once paused, the animation stays paused.
- Animation never overlaps or hides text.
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
3. List the choices that a reviewer may want to reverse under **Decisions to review**, including any place where the change departs from this guide, with the reason. When the same departure comes up a second time, change the guide instead.
4. Run the checks above and say which passed. A change to a page's description needs an entry in `scripts/rebrand/allowed_changes.txt`.
5. For a larger review, have people or models rate a handful of representative pages from screenshots at both widths, and also try the live build to find problems that screenshots hide. Treat their suggestions as input: record which you accept and why, and judge them against this guide.
