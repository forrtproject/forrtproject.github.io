---
title: Accessibility
---

*Last updated: 4 November 2026*

We want everyone to be able to use forrt.org. This page says what we have tested, what we have not, and how to tell us when something does not work for you.

We aim for [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA. We do not claim that the site meets it, because nobody has audited the site against the full standard.

## Tell us about a problem

Email [info@forrt.org](mailto:info@forrt.org?subject=Accessibility%20feedback) and tell us the page, what you were trying to do, and what you use to browse if you are happy to share it. If you need something on this site in another format, ask at the same address.

FORRT is run by volunteers, so we cannot promise a reply within a set time, but we log every report and work through them.

## What we have tested

These tests ran on a sample of about 50 pages covering every template, with automated tools and scripted browsers:

- [axe-core](https://github.com/dequelabs/axe-core) accessibility rules, on phone and desktop widths
- keyboard-only use of the menu, search, chatbot, cookie banner, home page animation and tower game
- the page at 200% and 400% browser zoom, and with text doubled in size
- forced colours and high-contrast settings, the reduced-motion setting, the data-saver setting, and browsers without WebGL
- the Chromium, Firefox and WebKit browser engines
- the layout of all Arabic, Chinese, German and Turkish glossary pages at phone width

Automated tools find only some problems. Passing them does not show that a page is easy to use.

## What we have not tested

- **Assistive technology.** Nobody has yet tested the site with a screen reader, switch device, voice control or magnifier. We plan to ask the community to do this, and we would welcome your help now.
- **A formal audit.** We have no budget for a paid one.
- **Every page.** The site has more than 3,000 pages, and older content, including PDFs and slides, has not been checked.

## Known problems

- **Content from other sites.** Videos, forms, calendars, spreadsheets, charts and teaching activities come from other services, and we cannot change how they work. Where we can, we link to the original page as well.
- **The chart on the NOWHERE Lab page.** Datawrapper's chart fails automated checks for screen reader labels and keyboard focus.
- **Headings in older pages.** Some hand-written pages skip heading levels, which can make them harder to navigate with a screen reader.
- **The booklet.** The flipbook viewer has not been tested with a keyboard or screen reader. The booklet is also available as a PDF.
- **Translated glossaries.** The Arabic and Chinese pages use your device's fonts, and the site's menu and footer stay in English.

## Stopping the animation

The tower and quotes on the home page move on their own. To stop them, point at the tower, move keyboard focus to it, or tap it, and then press the pause button that appears. The site remembers your choice. If your device is set to reduce motion, they stay still and the 3D tower does not load.
