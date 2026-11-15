---
title: Accessibility
---

*Last updated: 11 November 2026*

We want everyone to be able to use forrt.org. This page says what we have checked, what we have not, and how to tell us when something does not work for you.

We aim for [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA. We do not claim that the site meets it, because nobody has audited the site against the full standard.

## Tell us about a problem

Email [info@forrt.org](mailto:info@forrt.org?subject=Accessibility%20feedback) and tell us the page, what you were trying to do, and what you use to browse if you are happy to share it. If you need something on this site in another format, ask at the same address.

FORRT is run by volunteers, so we cannot promise a reply within a set time, but we read every message.

## What we have checked

While we built the current design, every proposed change was checked automatically in a Chromium browser. The checks covered a sample of 45 pages chosen to include each type of page on the site:

- the [axe-core](https://github.com/dequelabs/axe-core) rules for WCAG Level A and AA, at phone and desktop widths;
- on the main page designs, at three screen widths: text contrast, text smaller than 15 px, and lines of 80 characters or more;
- that pages do not run wider than the screen, at phone, tablet and desktop widths, and on the main page designs also with all text doubled in size;
- on the home page: that the keyboard reaches a pause button that stops the animation, that Tab moves on from the tower's pause button to the button that starts the tower game, that the animation stays still and the 3D tower does not load when a device is set to reduce motion, and that the game is not offered where the browser cannot draw 3D graphics;
- that the chat button does not cover the page, including when it has keyboard focus.

Each time the site is published, every page is also checked for images without an `alt` attribute and for pages with more than one top-level heading.

Automated checks find only some problems. Passing them does not show that a page is easy to use.

## What we have not checked

- **Assistive technology.** Nobody has yet tested the site with a screen reader, switch device, voice control or magnifier. We plan to ask the community to do this, and we would welcome your help now.
- **Keyboard use across the site.** Apart from the parts listed above, nobody has checked that every page works with a keyboard alone.
- **Other browsers.** The checks ran only in Chromium, the engine behind Chrome and Edge, not in Firefox or Safari.
- **A formal audit.** We have no budget for a paid one.
- **Every page.** Pages outside the sample, and older content such as PDFs and slides, have not been checked.

## Known problems

- **Content from other sites.** Videos, forms, calendars, spreadsheets, charts and teaching activities come from other services, and we cannot change how they work. Where we can, we link to the original page as well.
- **The chart on the NOWHERE Lab page.** Datawrapper's chart fails automated checks for screen reader labels and keyboard focus.
- **Headings in older pages.** Some hand-written pages skip heading levels, which can make them harder to navigate with a screen reader.
- **The booklet.** The flipbook viewer has not been tested with a keyboard or screen reader. The booklet is also available as a PDF.
- **Translated glossaries.** The Arabic and Chinese pages use your device's fonts, and the site's menu and footer stay in English.

## Stopping the animation

The tower and quotes on the home page move on their own. To stop them, point at the tower, move keyboard focus to it, or tap it, and then press the pause button that appears. The site remembers your choice. If your device is set to reduce motion, they stay still and the 3D tower does not load.
