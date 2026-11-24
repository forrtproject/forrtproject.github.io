#!/usr/bin/env python3
"""Check the designed screens in a browser, against the Doors acceptance checklist.

Run: python3 scripts/rebrand/check_design.py <public-dir> [--base /]
     python3 scripts/rebrand/check_design.py --url https://forrt.org/rebrand-doors/

Needs Playwright. Covers what a build comparison cannot: nothing runs wider than the screen,
no italic type outside references, reading lines under 80 characters, no page's own button
hidden, the sample pages' width as well as the designed screens', the home page's topic
buttons within their position limit (checklist A14), its layout shift on a slow phone, the pause
control over the castle and the quotes, the layout of the /clusters/ illustration, and the behaviour of the resources directory. On a local build it also weighs the designed screens against the migration
plan's budgets. Those lines are a report and do not fail the check, because the theme's Bootstrap,
jQuery and Font Awesome stay until Phase 3.
"""

import argparse
import ast
import concurrent.futures
import contextlib
import functools
import http.server
import io
import json
import multiprocessing
import os
import re
import struct
import sys
import tempfile
import threading
import time
from urllib.parse import urlsplit

from playwright.sync_api import Error as PlaywrightError, sync_playwright
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError

WIDTHS = {390: 844, 1024: 768, 1440: 900}
SCREENS = {
    "home": "",
    "replication hub": "replication-hub/",
    "resources": "resources/",
    "resources page 2": "resources/page/2/",
    "article": "post/2026-01-newsletter/",
    "contributor analysis": "contributor-analysis/",
}
BLOCK = re.compile(r"googletagmanager|google-analytics|doubleclick|youtube|docs\.google")
A14_LIMIT = {390: 2.5, 1440: 1.6}
SHIFT_LIMIT = 0.1
# A page's own button must not vanish: shell rules on a bare class name have hidden one. Bootstrap's
# d-*-none classes hide buttons on purpose, such as a menu toggle meant only for phones.
HIDDEN_BUTTONS = """(root) => {
  const onPurpose = (el) => {
    for (let e = el; e; e = e.parentElement) {
      if (getComputedStyle(e).display === 'none' && /(^|\\s)d-(\\w+-)?none(\\s|$)/.test(e.getAttribute('class') || '')) return true;
    }
    return false;
  };
  return [...root.querySelectorAll(':is(a,button).btn')]
    .filter((a) => !a.getClientRects().length && !a.closest('[hidden],.collapse,.modal,.tab-pane,details') && !onPurpose(a) && !(innerWidth <= 760 && a.closest('.click-to-load[style*="absolute"]:not([data-embed-src*="youtube"])')))
    .map((a) => a.textContent.trim().slice(0, 40));
}"""
AUDIT = """() => {
  const main = document.querySelector('main');
  const italic = [];
  const contrast = [];
  const small = [];
  const channel = (v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
  const lum = (c) => .2126 * channel(c[0]) + .7152 * channel(c[1]) + .0722 * channel(c[2]);
  const parse = (s) => { const n = (s.match(/[\\d.]+/g) || []).map(Number); return n.length < 3 ? null : [n[0], n[1], n[2], n[3] ?? 1]; };
  // Walks up to the nearest solid background. Text over an image or gradient would be measured
  // against the wrong colour, but the designed screens set none.
  const background = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const b = parse(getComputedStyle(e).backgroundColor);
      if (b && b[3] > .9) return b;
    }
    return [255, 255, 255, 1];
  };
  for (const el of main.querySelectorAll('*')) {
    if (!el.getClientRects().length || !el.textContent.trim()) continue;
    // The flipbook library draws its own controls.
    if (el.closest('.df-container,._df_book')) continue;
    const style = getComputedStyle(el);
    // Decision D15: real italics only inside references. Same selector as base.css.
    const reference = el.closest('.references-list,.csl-bib-body,.pub-journal .journal-name') || el.matches(':is(h2,h3,h4)[id^=references i]~:is(ul,ol,p) *');
    if (style.fontStyle !== 'normal' && !reference) {
      italic.push(el.textContent.trim().slice(0, 40));
    }
    if (style.visibility === 'hidden' || !parseFloat(style.opacity)) continue;
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const text = el.textContent.trim().slice(0, 40);
    const size = parseFloat(style.fontSize);
    if (size < 15 && !el.closest('.mastfoot,.leaflet-container,sup,sub')) small.push(`${size}: ${text}`);
    const fg = parse(style.color);
    if (fg) {
      const a = lum(fg), b = lum(background(el));
      const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
      if (ratio < (large ? 3 : 4.5)) contrast.push(`${ratio.toFixed(2)} ${style.color}: ${text}`);
    }
  }
  const lineChars = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const lines = {};
    let node;
    while ((node = walker.nextNode())) {
      // Text no one can see is not a line: inside a closed disclosure, or cut off by a box that clips it
      // (a description shortened to its first lines).
      const parent = node.parentElement;
      if (parent.closest('details:not([open])') && !parent.closest('summary')) continue;
      const clips = [];
      for (let up = parent; up && up !== el.parentElement; up = up.parentElement) {
        if (getComputedStyle(up).overflowY !== 'visible') clips.push(up.getBoundingClientRect());
      }
      for (const match of node.textContent.matchAll(/\\S+\\s*/g)) {
        const range = document.createRange();
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        // A long address can break across lines, so share its characters out by rendered width.
        // The share is taken over all of the word's boxes, then only the visible ones count.
        const all = [...range.getClientRects()].filter((box) => box.width > 0);
        const total = all.reduce((sum, box) => sum + box.width, 0);
        const boxes = all.filter((box) => clips.every((clip) => box.top < clip.bottom - 1 && box.bottom > clip.top + 1
          && box.left < clip.right - 1 && box.right > clip.left + 1));
        for (const box of boxes) {
          const key = Math.round(box.top / 6);
          // Arabic vowel marks and other combining marks take up no column of their own.
          const letters = match[0].replace(/\\p{M}/gu, '').length;
          lines[key] = (lines[key] || 0) + letters * box.width / total;
        }
      }
    }
    return Math.round(Math.max(0, ...Object.values(lines)));
  };
  // A grid's columns sit side by side but are not one line (a contributor's name beside their projects): its items
  // are measured on their own instead.
  const long = [...main.querySelectorAll('.reading p,.reading li,.lede,.about-statement p,.forward p')]
    .filter((el) => getComputedStyle(el).display !== 'grid')
    .filter((el) => el.getClientRects().length && lineChars(el) >= 80)
    .map((el) => lineChars(el) + ': ' + el.textContent.trim().slice(0, 40));
  return {
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    italic: italic.slice(0, 5),
    contrast: contrast.slice(0, 5),
    small: small.slice(0, 5),
    long: long.slice(0, 5),
    h1: document.querySelectorAll('h1').length,
    hidden: (""" + HIDDEN_BUTTONS + """)(main),
    broken: [...document.images].filter((i) => i.complete && i.getClientRects().length && !i.naturalWidth).map((i) => i.src),
  };
}"""


def serve(root, subfolder):
    """Serve a build, from the subfolder it expects if it has been through preview_paths.py."""
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    folder = subfolder.strip("/")
    directory = root
    if folder:
        directory = tempfile.mkdtemp(prefix="scratch-design-")
        os.symlink(root, os.path.join(directory, folder))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=directory))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return f"http://127.0.0.1:{server.server_address[1]}/" + (f"{folder}/" if folder else "")


def new_page(browser, width, errors=None, **options):
    phone = {"has_touch": True} if width < 500 else {}
    if width < 500 and browser.browser_type.name != "firefox":  # Firefox has no mobile mode in Playwright.
        phone["is_mobile"] = True
    context = browser.new_context(viewport={"width": width, "height": WIDTHS.get(width, 900)}, **phone, **options)
    page = context.new_page()
    page.route("**/*", lambda route: route.abort() if BLOCK.search(route.request.url) else route.continue_())
    if errors is not None:
        page.on("pageerror", lambda error: errors.append(str(error)[:200]))
    return page


def check_screens(browser, base, failures):
    for name, path in SCREENS.items():
        for width in WIDTHS:
            errors = []
            page = new_page(browser, width, errors)
            page.goto(base + path, wait_until="load", timeout=120000)
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(600)
            found = page.evaluate(AUDIT)
            print(f"  {name} at {width}: overflow {found['overflow']}, h1 {found['h1']}")
            if found["overflow"] > 0:
                failures.append(f"{name} at {width}: {found['overflow']} px wider than the screen")
            if found["h1"] != 1:
                failures.append(f"{name} at {width}: {found['h1']} h1 elements")
            for key, label in (("italic", "italic type"), ("contrast", "low contrast"), ("small", "text under 15 px"),
                               ("long", "lines of 80 characters or more"), ("broken", "broken images"), ("hidden", "hidden buttons")):
                if found[key]:
                    failures.append(f"{name} at {width}: {label}: {found[key]}")
            if errors:
                failures.append(f"{name} at {width}: script errors: {errors[:2]}")
            page.context.close()


def article_paths(root):
    """Pages drawn on the reading layout, from the build."""
    paths = []
    for directory, _, files in os.walk(root):
        if "index.html" in files:
            with open(os.path.join(directory, "index.html"), encoding="utf-8", errors="replace") as handle:
                if re.search(r'class="?article-layout', handle.read()):
                    paths.append(os.path.relpath(directory, root).replace(os.sep, "/") + "/")
    # The two generated collections have over a thousand pages from one template, so take a sample.
    chosen = []
    seen = {}
    for path in sorted(paths):
        section = path.split("/")[0]
        seen[section] = seen.get(section, 0) + 1
        if section not in ("curated_resources", "glossary", "authors") or seen[section] % 40 == 1:
            chosen.append(path)
    return chosen


def check_articles(browser, base, paths, failures, widths=WIDTHS):
    """The reading layout across its pages: content varies more than the layout does."""
    for width in widths:
        page = new_page(browser, width)
        for path in paths:
            page.goto(base + path, wait_until="load", timeout=120000)
            # Line lengths mean little until the real fonts have arrived.
            page.wait_for_function("document.fonts.check('18px \"Source Sans 3\"')", timeout=30000)
            page.evaluate("document.fonts.ready.then(() => null)")
            page.wait_for_timeout(100)
            found = page.evaluate(AUDIT)
            if found["overflow"] > 0:
                failures.append(f"{path} at {width}: {found['overflow']} px wider than the screen")
            for key, label in (("italic", "italic type"), ("contrast", "low contrast"), ("small", "text under 15 px"),
                               ("long", "lines of 80 characters or more"), ("broken", "broken images"), ("hidden", "hidden buttons")):
                if found[key]:
                    failures.append(f"{path} at {width}: {label}: {found[key][:2]}")
            gap = page.evaluate(CARD_GAP)
            if gap > CARD_GAP_LIMIT:
                failures.append(f"{path} at {width}: {round(gap)} px of empty space between the text and its card")
        page.context.close()


def check_callouts(browser, base, root, failures):
    """Call-outs sit in the right-hand column from 1240px, clear of each other, and in the text below that."""
    paths = []
    for directory, _, files in os.walk(root):
        if "index.html" in files:
            with open(os.path.join(directory, "index.html"), encoding="utf-8", errors="replace") as handle:
                if re.search(r'<aside class="?callout', handle.read()):  # A minified build drops the quote.
                    paths.append(os.path.relpath(directory, root).replace(os.sep, "/") + "/")
    print(f"  {len(paths)} pages")
    if not paths:
        failures.append("no page uses a call-out, so the call-out check tested nothing")
    for width in WIDTHS:
        page = new_page(browser, width)
        for path in sorted(paths):
            page.goto(base + path, wait_until="load", timeout=120000)
            page.wait_for_function("document.fonts.check('18px \"Source Sans 3\"')", timeout=30000)
            page.evaluate("document.fonts.ready.then(() => null)")
            found = page.evaluate(CALLOUTS)
            for problem in found:
                failures.append(f"{path} at {width}: call-out {problem}")
        page.context.close()


CALLOUTS = """() => {
  const reading = document.querySelector('.article-layout>.reading');
  if (!reading || reading.parentElement.classList.contains('article-layout-wide')) return [];
  const area = reading.getBoundingClientRect();
  const notes = [...reading.querySelectorAll('.callout')].map((el) => el.getBoundingClientRect());
  const card = document.querySelector('.article-layout>.article-card')?.getBoundingClientRect();
  const problems = [];
  if (innerWidth >= 1240) {
    const boxes = card ? [card, ...notes] : notes;
    if (notes.some((box) => box.left < area.right)) problems.push('over the text');
    if (notes.some((box) => box.right > innerWidth)) problems.push('off the screen');
    if (boxes.some((a, i) => boxes.slice(i + 1).some((b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom))) problems.push('overlaps the card or another call-out');
  } else {
    if (notes.some((box) => box.left < area.left - 1 || box.right > area.right + 1)) problems.push('outside the text column');
    if (innerWidth <= 1000 && card && card.height && card.top < area.bottom) problems.push('card comes before the text');
  }
  return problems;
}"""


# Between a page's text and the card beside it, when they are side by side.
CARD_GAP = """() => {
  const reading = document.querySelector('.article-layout>.reading');
  const card = document.querySelector('.article-layout>.article-card');
  if (!reading || !card) return 0;
  const box = card.getBoundingClientRect();
  const text = reading.getBoundingClientRect();
  if (!box.width || !box.height || box.top > text.bottom) return 0;  // A hidden card measures 0 by 0 at the corner.
  // The card sits left of the text on a desktop (right in right-to-left pages).
  if (box.right <= text.left) return text.left - box.right;
  const lines = [...reading.querySelectorAll('.article-style p')].filter((p) => p.getClientRects().length);
  const right = Math.max(...(lines.length ? lines : [reading]).map((el) => el.getBoundingClientRect().right));
  return box.left < right ? 0 : box.left - right;
}"""
CARD_GAP_LIMIT = 80
# How far the page scrolls on past its footer. A collapsed panel clips what it holds, unless something in it
# escapes to the page (a positioned label with no positioned ancestor); then the page runs on into blank space.
PAST_FOOTER = """() => { const footer = document.querySelector('footer');
  return footer ? Math.round(document.documentElement.scrollHeight - footer.getBoundingClientRect().bottom - scrollY) : 0; }"""


def press_tab(page):
    """Tab, or in WebKit Option-Tab, because Safari's Tab skips buttons and links by default."""
    page.keyboard.press("Alt+Tab" if page.context.browser.browser_type.name == "webkit" else "Tab")


def read_settled(page, expression):
    """Read a page that may be redirecting, as /glossary/ does, by reading again once it has landed."""
    for _ in range(4):
        try:
            return page.evaluate(expression)
        except PlaywrightError:
            page.wait_for_timeout(500)
            page.wait_for_load_state("load")
    return page.evaluate(expression)


def check_samples(browser, base, failures):
    """Nothing runs wider than the screen, past its footer or hides a button on the sample pages, with
    their retained templates too."""
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "sample_pages.json"), encoding="utf-8") as handle:
        samples = json.load(handle)
    wider = "document.documentElement.scrollWidth - document.documentElement.clientWidth"
    for width in WIDTHS:
        page = new_page(browser, width)
        for name, path in samples.items():
            page.goto(base + path.lstrip("/"), wait_until="load", timeout=120000)
            page.wait_for_timeout(300)
            over = read_settled(page, wider)
            if over > 0:
                failures.append(f"{name} at {width}: {over} px wider than the screen")
            tail = read_settled(page, PAST_FOOTER)
            if tail > 2:
                failures.append(f"{name} at {width}: the page runs {tail} px past its footer")
            hidden = read_settled(page, f"({HIDDEN_BUTTONS})(document.querySelector('main') || document.body)")
            if hidden:
                failures.append(f"{name} at {width}: hidden buttons: {hidden[:2]}")
        page.context.close()


def check_other_widths(browser, base, failures):
    """No overflow at the layout's breakpoints, or with text enlarged to 200% (checklist C6, C9)."""
    enlarge = """() => {
      const sizes = [...document.querySelectorAll('body *')].map((el) => [el, parseFloat(getComputedStyle(el).fontSize)]);
      sizes.forEach(([el, size]) => { el.style.fontSize = size * 2 + 'px'; });
    }"""
    wider = "document.documentElement.scrollWidth - document.documentElement.clientWidth"
    for name, path in SCREENS.items():
        for width in (761, 1000, 1001, 1240, 1241):
            page = new_page(browser, width)
            page.goto(base + path, wait_until="load", timeout=120000)
            page.wait_for_timeout(200)
            over = page.evaluate(wider)
            if over > 0:
                failures.append(f"{name} at {width}: {over} px wider than the screen")
            tail = page.evaluate(PAST_FOOTER)
            if tail > 2:
                failures.append(f"{name} at {width}: the page runs {tail} px past its footer")
            page.context.close()
        for width in (390, 760, 1024, 1440):
            page = new_page(browser, width)
            page.goto(base + path, wait_until="load", timeout=120000)
            page.wait_for_timeout(200)
            page.evaluate(enlarge)
            page.wait_for_timeout(100)
            over = page.evaluate(wider)
            print(f"  {name} at {width}, text 200%: overflow {over}")
            if over > 0:
                failures.append(f"{name} at {width} with text at 200%: {over} px wider than the screen")
            page.context.close()


def expectation(failures, area):
    def expect(condition, message):
        print(f"  {'ok ' if condition else 'BAD'} {message}")
        if not condition:
            failures.append(f"{area}: {message}")

    return expect


def layout_shift(browser, url):
    """Layout shift on a cold load at 390 px, over a slow connection on a slow phone."""
    page = new_page(browser, 390)
    page.add_init_script(
        "window.__shift=0;new PerformanceObserver(l=>{for(const e of l.getEntries())"
        "if(!e.hadRecentInput)window.__shift+=e.value}).observe({type:'layout-shift',buffered:true});"
    )
    cdp = page.context.new_cdp_session(page)
    cdp.send("Network.enable")
    cdp.send("Network.setCacheDisabled", {"cacheDisabled": True})
    cdp.send("Network.emulateNetworkConditions", {
        "offline": False, "latency": 150, "downloadThroughput": 200000, "uploadThroughput": 90000,
    })
    cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
    page.goto(url, wait_until="load", timeout=180000)
    page.wait_for_timeout(4000)
    shift = page.evaluate("window.__shift")
    page.context.close()
    return shift


def check_home(browser, base, failures):
    expect = expectation(failures, "home")
    for width, limit in A14_LIMIT.items():
        page = new_page(browser, width)
        page.goto(base, wait_until="load")
        page.evaluate("document.fonts.ready")
        position = page.evaluate("(document.querySelector('.topics').getBoundingClientRect().top + scrollY) / innerHeight")
        expect(position <= limit, f"topics start at {position:.2f} viewports at {width} px, limit {limit}")
        page.context.close()
    if browser.browser_type.name == "chromium":  # The throttling is Chrome's own.
        shift = layout_shift(browser, base)
        expect(shift <= SHIFT_LIMIT, f"layout shift on a slow phone is {shift:.3f}, limit {SHIFT_LIMIT}")

    page = new_page(browser, 1440)
    requests = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(base, wait_until="load")
    current = "[...document.querySelectorAll('.quote')].findIndex(q => q.classList.contains('is-active'))"

    def expect_quote_change(previous, message):
        try:
            page.wait_for_function(
                f"previous => {{ const active = {current}; return active >= 0 && active !== previous; }}",
                arg=previous, polling=100,
            )
        except PlaywrightTimeoutError:
            expect(False, message)
        else:
            expect(True, message)

    expect(page.evaluate("document.querySelector('.tower .motion-toggle').getBoundingClientRect().width") <= 1,
           "the castle's pause button is out of sight at rest")
    page.evaluate("document.querySelector('.quotes').scrollIntoView({block:'center'})")
    page.mouse.move(2, 2)
    first = page.evaluate(current)
    expect_quote_change(first, "the quotes change on their own")
    page.hover(".quotes")
    held = page.evaluate(current)
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) == held, "a pointer on the quotes holds them")
    page.mouse.move(2, 2)
    page.evaluate("scrollTo(0, 0)")
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) == held, "the quotes stay put off screen")
    page.evaluate("document.querySelector('.quotes').scrollIntoView({block:'center'})")
    expect_quote_change(held, "the quotes resume when seen again")
    # A real Tab from the heading above, so that the browser counts it as keyboard focus.
    page.evaluate("document.querySelector('.quotes').previousElementSibling.setAttribute('tabindex', '-1')")
    page.evaluate("document.querySelector('.quotes').previousElementSibling.focus()")
    press_tab(page)
    button = page.locator(".quotes .motion-toggle")
    expect(page.evaluate("document.activeElement.closest('.quotes') !== null"), "Tab reaches the quotes' pause button")
    held = page.evaluate(current)
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) == held, "keyboard focus on the quotes holds them")
    expect(page.evaluate("document.querySelector('.quotes .motion-toggle').getBoundingClientRect().width") >= 36,
           "the quotes' pause button appears on keyboard focus")
    page.keyboard.press("Enter")
    expect(button.text_content() == "Play animation", "pressing it pauses, and it says so")
    expect(page.locator(".tower .motion-toggle").text_content() == "Play animation", "the castle's button shows the same state")
    page.evaluate("document.activeElement.blur()")
    page.mouse.move(2, 2)
    held = page.evaluate(current)
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) == held, "paused quotes stay put")
    requests.clear()
    page.reload(wait_until="load")
    page.wait_for_timeout(3000)
    expect(page.locator(".quotes .motion-toggle").text_content() == "Play animation", "the pause is remembered on the next visit")
    expect(not any("castle." in url and "controller" not in url for url in requests), "a paused visit does not load the 3D bundle")
    page.locator(".tower .motion-toggle").focus()
    page.keyboard.press("Enter")
    page.wait_for_timeout(3000)
    expect(any("castle." in url for url in requests), "pressing play loads the castle")
    page.context.close()

    page = new_page(browser, 1440, reduced_motion="reduce")
    requests = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(base, wait_until="load")
    page.evaluate("document.querySelector('.quotes').scrollIntoView({block:'center'})")
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) == 0, "reduced motion keeps the first quote")
    expect(not any("/js/castle." in url for url in requests), "reduced motion does not load the 3D bundle")
    expect(page.locator(".motion-toggle:visible").count() == 0, "reduced motion shows no pause button")
    page.hover(".castle-stage")
    expect(page.locator(".tower-entry").is_visible(), "reduced motion still offers the game on hover")
    page.context.close()

    check_tower_game(browser, base, expect)


def check_tower_game(browser, base, expect):
    box = "document.querySelector('.tower-entry').getBoundingClientRect().width"
    page = new_page(browser, 1440)
    requests = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(base, wait_until="load")
    page.wait_for_timeout(1500)
    expect(page.evaluate(box) <= 1, "'Build it yourself' is out of sight at rest")
    expect(not any("/js/tower/" in url for url in requests), "nobody downloads the game before asking for it")
    page.locator(".tower .motion-toggle").focus()
    press_tab(page)
    expect(page.evaluate("document.activeElement.className") == "tower-entry", "Tab goes from pause to 'Build it yourself'")
    expect(page.locator(".tower .motion-toggle").is_visible() and page.evaluate(box) > 100,
           "keyboard focus shows both buttons")
    page.keyboard.press("Enter")
    page.wait_for_function("document.querySelector('#tower-game')?.open === true", timeout=20000)
    expect(any("/js/tower/game.bundle.js" in url for url in requests), "pressing the button loads the game")
    expect(not any("/js/tower/physics" in url for url in requests), "the physics waits for the first wobble warning")
    page.keyboard.press("Escape")
    page.keyboard.press("Escape")
    page.wait_for_function("document.querySelector('#tower-game')?.open === false")
    page.context.close()

    # Interactive gameplay checks under reduced motion (deterministic, instant physics settle):
    # blueprints, brick placement, keyboard controls, stability meter, sound toggle, snapshot export, topple + undo.
    page = new_page(browser, 1440, reduced_motion="reduce")
    requests = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(base, wait_until="load")
    page.hover(".castle-stage")
    page.locator(".tower-entry").click()
    page.wait_for_function("document.querySelector('#tower-game')?.open === true", timeout=20000)
    page.locator("#tg-note-go").click()
    expect(page.locator(".tg-plan-pill").count() >= 5, "blueprint picker offers Free build and FORRT blueprints")
    expect(page.locator("#tg-stability").get_attribute("role") == "meter", "stability gauge exposes meter semantics")
    expect(page.locator("#tg-sound").get_attribute("aria-pressed") == "true", "sound toggle starts on")
    page.locator("#tg-sound").click()
    expect(page.locator("#tg-sound").get_attribute("aria-pressed") == "false", "clicking sound toggle mutes sound")
    page.keyboard.press("m")
    expect(page.locator("#tg-sound").get_attribute("aria-pressed") == "true", "M key restores sound")
    # Keyboard building on Free build
    page.locator("#tg-stage").focus()
    page.keyboard.press("3")
    page.keyboard.press("ArrowRight")
    page.keyboard.press("r")
    page.keyboard.press("t")
    page.keyboard.press("Enter")
    expect("1 brick" in page.locator("#tg-count").text_content(), "keyboard controls place a brick")
    # Blueprint switching, progress tracking, off-plan free play cue & completion
    page.locator("#tg-restart").click()
    page.locator(".tg-plan-pill[data-plan='arch']").click()
    expect(page.locator("#tg-prog").is_visible(), "selecting a blueprint shows live progress")
    # Free play stays open during a blueprint: placing an extra brick succeeds and flags 1 off plan until undone.
    page.locator("#tg-stage").focus()
    page.keyboard.press("1")
    page.keyboard.press("ArrowRight")
    page.keyboard.press("Enter")
    expect(page.locator("#tg-offplan").is_visible() and "1 off plan" in page.locator("#tg-offplan").text_content(),
           "off-plan placement is allowed and shown as a non-blocking deviation cue")
    page.locator("#tg-undo").click()
    expect(not page.locator("#tg-offplan").is_visible(), "Undo clears the off-plan cue")
    page.locator("#tg-next").click()
    expect("1 /" in page.locator("#tg-prog-text").text_content(), "Place next advances blueprint progress")
    page.locator("#tg-finish").click()
    expect(page.locator("#tg-done").text_content().strip() == "Build on", "Build rest completes the blueprint")
    expect(page.locator("#tg-prog-text").text_content().strip() == "22 / 22", "Open arch completes all 22 slots")
    expect(int(page.locator("#tg-stability").get_attribute("aria-valuenow")) > 0, "stability meter reports a live score")
    # Snapshot export downloads a valid 1200x900 PNG postcard
    with page.expect_download() as download_info:
        page.locator("#tg-photo").click()
    dl = download_info.value
    expect(dl.suggested_filename.endswith(".png"), "Save photo downloads a PNG postcard")
    postcard_path = dl.path()
    with open(postcard_path, "rb") as handle:
        header = handle.read(24)
    expect(header[:8] == b"\x89PNG\r\n\x1a\n" and struct.unpack(">II", header[16:24]) == (1200, 900),
           "postcard download is a valid 1200x900 PNG")
    # Topple lazily loads physics.bundle.js and Undo restores every brick and blueprint progress
    expect(not any("/js/tower/physics" in url for url in requests), "physics stays unloaded until Topple or wobble")
    before_topple = page.locator("#tg-count").text_content()
    page.locator("#tg-topple").click()
    page.wait_for_function("document.querySelector('#tg-hint').textContent.includes('Down it came')", timeout=15000)
    expect(any("/js/tower/physics" in url for url in requests), "Topple fetches physics.bundle.js on demand")
    page.locator("#tg-undo").click()
    expect(page.locator("#tg-count").text_content() == before_topple, "Undo snaps the toppled tower right back")
    expect(page.locator("#tg-prog-text").text_content().strip() == "22 / 22", "Undo restores completed blueprint progress")
    page.context.close()

    # Landscape phone (844x390): controls scroll cleanly and Done + Undo stay reachable with >= 44 px targets.
    landscape_opts = {"viewport": {"width": 844, "height": 390}, "has_touch": True, "reduced_motion": "reduce"}
    if browser.browser_type.name != "firefox":  # Firefox has no mobile mode in Playwright.
        landscape_opts["is_mobile"] = True
    ctx = browser.new_context(**landscape_opts)
    page = ctx.new_page()
    page.route("**/*", lambda route: route.abort() if BLOCK.search(route.request.url) else route.continue_())
    page.goto(base, wait_until="load")
    page.locator(".tower").scroll_into_view_if_needed()
    page.locator(".castle-stage").tap()
    page.wait_for_timeout(400)
    page.locator(".tower-entry").tap()
    page.wait_for_function("document.querySelector('#tower-game')?.open === true", timeout=20000)
    page.locator("#tg-note-go").tap()
    page.locator("#tg-done").scroll_into_view_if_needed()
    land_metrics = page.evaluate("""() => {
      const done = document.querySelector('#tg-done').getBoundingClientRect();
      const undo = document.querySelector('#tg-undo').getBoundingClientRect();
      const topple = document.querySelector('#tg-topple').getBoundingClientRect();
      const pill = document.querySelector('.tg-plan-pill').getBoundingClientRect();
      return {
        doneBottom: Math.round(done.bottom), undoBottom: Math.round(undo.bottom),
        doneH: Math.round(done.height), undoH: Math.round(undo.height),
        toppleH: Math.round(topple.height), pillH: Math.round(pill.height)
      };
    }""")
    expect(land_metrics["doneBottom"] <= 390 and land_metrics["undoBottom"] <= 390,
           f"landscape phone reaches Done/Undo inside 390 px height: {land_metrics}")
    expect(min(land_metrics["doneH"], land_metrics["undoH"], land_metrics["toppleH"], land_metrics["pillH"]) >= 44,
           f"landscape phone keeps >= 44 px tap targets: {land_metrics}")
    ctx.close()

    # A first tap exactly where the button will appear reveals it. It must not open the game.
    page = new_page(browser, 390)
    requests = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(base, wait_until="load")
    page.wait_for_timeout(1500)
    page.locator(".tower").scroll_into_view_if_needed()
    expect(page.evaluate(box) <= 1, "'Build it yourself' stays out of sight on a phone until a tap")
    at = page.evaluate("""() => {
      const figure = document.querySelector('.tower');
      figure.classList.add('show-motion-control');
      const b = document.querySelector('.tower-entry').getBoundingClientRect();
      figure.classList.remove('show-motion-control');
      return {x: b.x + b.width / 2, y: b.y + b.height / 2, height: b.height};
    }""")
    expect(at["height"] >= 44, f"'Build it yourself' is {at['height']:.0f} px tall on a phone, limit 44")
    page.touchscreen.tap(at["x"], at["y"])
    page.wait_for_timeout(600)
    expect(not any("/js/tower/" in url for url in requests), "a tap on the hidden button's spot does not start the game")
    expect(page.evaluate(box) <= 1, "that tap does not reveal the button either")
    page.locator(".castle-stage").tap()
    page.wait_for_timeout(500)
    expect(page.evaluate(box) > 100, "a tap on the tower reveals the button")
    page.touchscreen.tap(at["x"], at["y"])
    page.wait_for_function("document.querySelector('#tower-game')?.open === true", timeout=20000)
    page.context.close()

    page = new_page(browser, 1440)
    page.add_init_script("""
      const getContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        return /webgl/.test(type) ? null : getContext.call(this, type, ...rest);
      };
    """)
    page.goto(base, wait_until="load")
    page.hover(".castle-stage")
    expect(not page.locator(".tower-entry").is_visible(), "without WebGL the game is not offered")
    page.context.close()


def check_phone_reading(browser, base, failures):
    """On a phone JUST-OS moves into the Menu (no corner launcher, no extra footer space), tablets keep the Menu
    entry up to 979 px and hide the corner launcher while content sits beneath it (with or without the cookie banner),
    and an embed's panel is not clipped."""
    # The phone contents list is widest just before the side card appears. These articles have long headings.
    check_articles(browser, base, (
        "educators-corner/003-developing-tools/",
        "educators-corner/018-accessible-feedback-in-research/",
        "pedagogies/004-thomas-rhys-evans/",
    ), failures, widths=(1000,))
    expect = expectation(failures, "phone reading")
    page = new_page(browser, 390)
    page.goto(base + "glossary/english/abstract_bias/", wait_until="load")
    page.wait_for_timeout(300)
    page.evaluate("scrollBy(0, 500)")
    page.wait_for_timeout(500)
    phone_launcher = page.evaluate("""() => {
      const btn = document.getElementById('just-os-btn');
      const foot = document.querySelector('.site-foot');
      return {
        hidden: !btn || !btn.getClientRects().length || getComputedStyle(btn).visibility === 'hidden',
        footPad: foot ? parseFloat(getComputedStyle(foot).paddingBottom) : 0,
      };
    }""")
    expect(phone_launcher["hidden"], "on a phone the floating corner launcher is hidden")
    expect(phone_launcher["footPad"] <= 40,
           f"on a phone the footer drops extra launcher space ({phone_launcher['footPad']:.0f} px bottom padding)")
    page.evaluate("scrollTo(0, 0)")
    page.locator(".menu-toggle").tap()
    page.wait_for_timeout(200)
    menu_row = page.evaluate("""() => {
      const row = document.getElementById('nav-just-os');
      if (!row) return null;
      const r = row.getBoundingClientRect();
      const img = row.querySelector('img');
      return {
        text: row.textContent.trim(),
        h: r.height,
        w: r.width,
        icon: Boolean(img && img.complete && img.naturalWidth > 0),
        firstLevel: row.parentElement?.id === 'primaryNav',
      };
    }""")
    expect(bool(menu_row and menu_row["text"] == "Ask JUST-OS" and menu_row["firstLevel"]
                and menu_row["h"] >= 44 and menu_row["w"] > 100 and menu_row["icon"]),
           f"the phone Menu has a first-level 'Ask JUST-OS' row with mascot and >=44 px tap target ({menu_row})")
    page.locator("#nav-just-os").tap()
    page.wait_for_timeout(3000)
    expect(page.evaluate("document.getElementById('just-os-window')?.style.display === 'flex'"),
           "tapping 'Ask JUST-OS' in the phone Menu opens the chat")
    expect(page.evaluate("document.querySelector('nav.primary')?.dataset.open !== 'true'"),
           "opening the chat closes the phone Menu")
    page.keyboard.press("Escape")
    page.wait_for_timeout(300)
    expect(page.evaluate("document.getElementById('just-os-window')?.style.display !== 'flex'"
                         " && !document.getElementById('just-os-btn').getClientRects().length"
                         " && document.activeElement?.classList.contains('menu-toggle')"),
           "Escape closes the chat, keeps the corner launcher hidden, and returns focus to Menu")
    # On the home page, phones also get a visible inline "Ask JUST-OS" button right below the hero actions.
    page.goto(base, wait_until="load")
    page.wait_for_timeout(300)
    hero_btn = page.evaluate("""() => {
      const el = document.querySelector('.hero-justos');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      const img = el.querySelector('img');
      return {
        text: el.textContent.trim(),
        h: r.height,
        w: r.width,
        visible: s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) >= 0.9,
        icon: Boolean(img && img.complete && img.naturalWidth > 0),
      };
    }""")
    expect(bool(hero_btn and hero_btn["text"] == "Ask JUST-OS" and hero_btn["visible"]
                and page.locator(".hero-justos").is_visible() and hero_btn["h"] >= 44 and hero_btn["icon"]),
           f"on a phone the home page hero includes a visible 'Ask JUST-OS' button ({hero_btn})")
    page.locator(".hero-justos").tap()
    page.wait_for_function("document.getElementById('just-os-window')?.style.display === 'flex'", timeout=15000)
    page.wait_for_function("document.activeElement?.classList.contains('just-os-input')", timeout=5000)
    page.keyboard.press("Escape")
    page.wait_for_timeout(300)
    expect(page.evaluate("document.getElementById('just-os-window')?.style.display !== 'flex'"
                         " && document.activeElement?.classList.contains('hero-justos')"),
           "Escape closes the chat opened from the home page hero and returns focus to it")
    # With the cookie banner unanswered on /reversals/, the corner launcher stays hidden on phones.
    page.goto(base + "reversals/", wait_until="load")
    page.wait_for_selector(".cc-window", timeout=10000)
    page.wait_for_timeout(400)
    expect(page.evaluate("!document.getElementById('just-os-btn').getClientRects().length"),
           "at 390 px with the cookie banner open on /reversals/, the corner launcher stays hidden")
    page.goto(base + "neurodiversity-lessonbank/implicit_bias/", wait_until="load")
    page.wait_for_timeout(300)
    panels = page.locator(".click-to-load").count()
    expect(panels > 0, f"the lesson page has embed panels ({panels})")
    clipped = page.evaluate("""[...document.querySelectorAll('.click-to-load')].filter((panel) =>
      panel.parentElement && getComputedStyle(panel.parentElement).overflow === 'hidden'
      && panel.getBoundingClientRect().height > panel.parentElement.getBoundingClientRect().height + 1).length""")
    expect(clipped == 0, f"{clipped} embed panels clipped by their box")
    page.context.close()

    # Portrait tablet (768 px, touch): Menu row is still available (up to 979 px), touch dismiss target is >=44 px
    # inside the viewport, and dismissing/reopening the cookie banner re-evaluates the launcher (including with
    # reduced motion, where transitionend does not fire).
    page = new_page(browser, 768, has_touch=True)
    page.goto(base + "reversals/", wait_until="load")
    page.wait_for_selector(".cc-window", timeout=10000)
    page.wait_for_timeout(500)
    page.locator(".menu-toggle").click()
    page.wait_for_timeout(150)
    expect(page.evaluate("document.getElementById('nav-just-os')?.getBoundingClientRect().height >= 44"),
           "at 768 px the Menu still offers the 'Ask JUST-OS' row")
    page.keyboard.press("Escape")
    page.evaluate("scrollTo(0, 500); dispatchEvent(new Event('scroll'))")
    page.wait_for_timeout(500)
    banner_open = page.evaluate("parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--banner')) || 0")
    expect(banner_open > 0, f"at 768 px the open cookie banner sets --banner ({banner_open:.0f} px)")
    expect(not page.locator("#just-os-btn").is_visible(),
           "at 768 px on /reversals/ at scroll 500 with banner open, the launcher hides over content")
    page.locator(".cc-deny").click()
    page.wait_for_timeout(1500)
    banner_closed = page.evaluate("parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--banner')) || 0")
    expect(banner_closed == 0, f"dismissing the cookie banner resets --banner to 0 ({banner_closed:.0f} px)")
    expect(page.locator("#just-os-btn").is_visible(),
           "at 768 px on /reversals/ at scroll 500 after dismissing the banner, the launcher reappears over empty space")
    expect(not page.evaluate(FLOATING_OVER, "#just-os-btn") and not page.evaluate(FLOATING_OVER, "#just-os-dismiss"),
           "at 768 px on /reversals/ after dismissing the cookie banner, the launcher covers nothing")
    touch_dismiss = page.evaluate("""() => {
      const d = document.getElementById('just-os-dismiss');
      const r = d.getBoundingClientRect();
      const after = getComputedStyle(d, '::after');
      const aw = parseFloat(after.width) || 0, ah = parseFloat(after.height) || 0;
      const cx = (r.left + r.right) / 2;
      return {w: aw, h: ah, rightGap: innerWidth - (cx + aw / 2)};
    }""")
    expect(touch_dismiss["w"] >= 44 and touch_dismiss["h"] >= 44 and touch_dismiss["rightGap"] >= -0.5,
           f"on touch tablets the dismiss tap target is at least 44 px and stays inside the viewport ({touch_dismiss})")
    page.locator("[data-cookie-settings]").scroll_into_view_if_needed()
    page.locator("[data-cookie-settings]").click()
    page.wait_for_timeout(400)
    page.evaluate("scrollTo(0, 500); dispatchEvent(new Event('scroll'))")
    page.wait_for_timeout(500)
    banner_reopened = page.evaluate("parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--banner')) || 0")
    expect(banner_reopened > 0 and not page.locator("#just-os-btn").is_visible(),
           "reopening Cookie settings raises --banner and hides the launcher again at scroll 500")
    page.context.close()

    # Reduced motion: dismissing the cookie banner collapses it immediately instead of waiting on transitionend.
    page = new_page(browser, 768, has_touch=True, reduced_motion="reduce")
    page.goto(base + "reversals/", wait_until="load")
    page.wait_for_selector(".cc-window", timeout=10000)
    page.wait_for_timeout(400)
    page.evaluate("scrollTo(0, 500); dispatchEvent(new Event('scroll'))")
    page.wait_for_timeout(400)
    page.locator(".cc-deny").click()
    page.wait_for_timeout(300)
    reduced_state = page.evaluate("""() => ({
      bannerH: document.querySelector('.cc-window')?.offsetHeight || 0,
      bannerVar: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--banner')) || 0,
      covered: document.getElementById('just-os-widget').classList.contains('is-covered'),
    })""")
    expect(reduced_state["bannerH"] == 0 and reduced_state["bannerVar"] == 0 and not reduced_state["covered"],
           f"with reduced motion, dismissing the banner collapses it immediately and restores the launcher ({reduced_state})")
    page.context.close()

    # Async redraw without scroll (/resources/ search) and focus restoration when chat closes over covered content.
    page = new_page(browser, 1024)
    page.set_viewport_size({"width": 1024, "height": 660})
    page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])
    page.goto(base + "resources/", wait_until="load")
    page.wait_for_timeout(400)
    page.fill("#resource-search", "zzzzqqqq")
    page.wait_for_function("!document.getElementById('empty').hidden", timeout=15000)
    page.fill("#resource-search", "")
    page.wait_for_timeout(500)
    expect(not page.evaluate(FLOATING_OVER, "#just-os-btn") and not page.evaluate(FLOATING_OVER, "#just-os-dismiss"),
           "clearing /resources/ search re-evaluates the launcher after async redraw without scrolling")
    page.set_viewport_size({"width": 1024, "height": 768})
    page.goto(base + "about/get-involved/", wait_until="load")
    page.wait_for_timeout(400)
    page.evaluate("scrollTo(0, document.documentElement.scrollHeight - innerHeight); dispatchEvent(new Event('scroll'))")
    page.wait_for_timeout(400)
    page.locator("#just-os-btn").click()
    page.wait_for_function("document.getElementById('just-os-window')?.style.display === 'flex'", timeout=15000)
    page.wait_for_function("document.activeElement?.classList.contains('just-os-input')", timeout=5000)
    page.evaluate("scrollTo(0, 600); dispatchEvent(new Event('scroll'))")
    page.keyboard.press("Escape")
    page.wait_for_timeout(400)
    focus_after = page.evaluate("({covered: document.getElementById('just-os-widget').classList.contains('is-covered'),"
                                " active: document.activeElement?.tagName + '#' + (document.activeElement?.id || '')})")
    expect(focus_after["covered"] and focus_after["active"] not in ("BODY#top", "BODY#", "BUTTON#just-os-btn"),
           f"closing chat after scrolling over content hides the launcher and keeps focus off body ({focus_after})")
    page.context.close()

    for width in (390, 1024, 1440):
        page = new_page(browser, width)
        page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])  # Banner shut.
        page.goto(base + "clusters/cluster-1/", wait_until="load")
        page.wait_for_timeout(800)
        page.evaluate("scrollBy(0, 1500)")
        page.wait_for_timeout(800)
        if width <= 760:
            expect(page.evaluate("!document.getElementById('just-os-btn').getClientRects().length"),
                   f"the floating launcher stays hidden on a cluster page at {width} px")
        else:
            shown = page.locator("#just-os-btn").is_visible()
            # When back to top shows is check_floating_controls' job (only beside the fields or clusters,
            # so not over this page's foot at a fixed scroll); here it must not sit on the launcher.
            clash = shown and page.evaluate("""() => {
              const top = document.querySelector('.clusters-back-to-top.is-visible');
              if (!top) return false;
              const a = top.getBoundingClientRect(), b = document.getElementById('just-os-btn').getBoundingClientRect();
              return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
            }""")
            expect(not clash, f"back to top does not sit on the chat launcher on a cluster page at {width} px")
            if width < 1440 and not shown:
                page.evaluate("scrollTo(0, document.documentElement.scrollHeight - innerHeight); dispatchEvent(new Event('scroll'))")
                page.wait_for_timeout(500)
            hit = page.evaluate("""() => {
              const btn = document.getElementById('just-os-btn');
              if (getComputedStyle(btn).visibility === 'hidden') return false;
              const box = btn.getBoundingClientRect();
              return !!document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)?.closest('#just-os-btn');
            }""")
            expect(hit, f"the chat launcher can be clicked on a cluster page at {width} px")
        if width > 760:
            past = page.evaluate("""() => {
              const style = getComputedStyle(document.querySelector('.clusters-sidebar-inner'));
              return parseFloat(style.top) + parseFloat(style.maxHeight) - innerHeight;
            }""")
            expect(past <= 0, f"the longest side list fits the window at {width} px ({past:.0f} px past the foot)")
            page.context.clear_cookies()
            page.reload(wait_until="load")
            page.wait_for_selector(".cc-window", timeout=10000)
            page.wait_for_timeout(1200)
            past = page.evaluate("""() => {
              const style = getComputedStyle(document.querySelector('.clusters-sidebar-inner'));
              const banner = document.querySelector('.cc-window').offsetHeight;
              return parseFloat(style.top) + parseFloat(style.maxHeight) - (innerHeight - banner);
            }""")
            expect(past <= 0, f"it also clears the open banner at {width} px ({past:.0f} px)")
        page.context.close()


# The overview at rest: the names' text sizes, nothing spilling out of a name, no name overlapping another or
# the ring, no line through another name, and every panel closed and out of the tab order.
CLUSTERS_OVERVIEW_REST = """() => {
  const stage = document.querySelector('.clusters-map__stage');
  if (!stage || !stage.offsetWidth) return {missing: true};
  const size = (el) => parseFloat(getComputedStyle(el).fontSize);
  const tags = [...stage.querySelectorAll('.clusters-map__tag')];
  const boxes = tags.map((tag) => ({r: tag.getBoundingClientRect(), n: tag.closest('[data-cluster]').dataset.cluster}));
  const meets = (a, b, gap) => a.left < b.right + gap && b.left < a.right + gap && a.top < b.bottom + gap && b.top < a.bottom + gap;
  const overlaps = [];
  boxes.forEach((a, i) => boxes.slice(i + 1).forEach((b) => { if (meets(a.r, b.r, 4)) overlaps.push(a.n + ' / ' + b.n); }));
  const ring = stage.querySelector('.clusters-map__disc').getBoundingClientRect();
  const segs = [...stage.querySelectorAll('.clusters-map__segment')].map((s) => s.getBoundingClientRect());
  const onRing = boxes.filter((b) => segs.some((s) => meets(b.r, s, 0))).map((b) => b.n);
  const crossings = [];
  stage.querySelectorAll('.clusters-map__ray').forEach((ray) => {
    const line = ray.querySelector('.clusters-map__line'), m = line.getScreenCTM(), n = ray.dataset.cluster;
    for (let at = 0; at < line.getTotalLength(); at += 3) {
      const p = new DOMPoint(line.getPointAtLength(at).x, line.getPointAtLength(at).y).matrixTransform(m);
      const hit = boxes.find((b) => b.n !== n && p.x >= b.r.left - 3 && p.x <= b.r.right + 3 && p.y >= b.r.top - 3 && p.y <= b.r.bottom + 3);
      if (hit) { crossings.push(n + ' crosses ' + hit.n); break; }
    }
  });
  const panels = [...stage.querySelectorAll('.clusters-map__panel')];
  return {stage: stage.offsetWidth, ring: ring.width > 0, listed: document.querySelectorAll('.clusters-overview__list > li').length, subs: document.querySelectorAll('.clusters-overview__subs li').length,
    unmatched: [...stage.querySelectorAll('.clusters-map__spot')].filter((spot) => {
      const n = spot.dataset.cluster, li = document.querySelector('.clusters-overview__list > li[data-cluster="' + n + '"]');
      const names = (root) => [...root.querySelectorAll('a')].map((a) => a.textContent.trim()).join('|');
      return !li || names(spot.querySelector('.clusters-map__panel')) !== names(li.querySelector('.clusters-overview__subs'));
    }).map((spot) => spot.dataset.cluster),
    name: Math.min(...tags.map((t) => size(t.querySelector('.clusters-map__tag-name')))),
    cue: Math.min(...tags.map((t) => size(t.querySelector('.clusters-map__cue')))),
    spill: tags.filter((t) => t.scrollWidth > t.clientWidth + 0.5 || t.scrollHeight > t.clientHeight + 0.5).map((t) => t.textContent.trim().slice(0, 40)),
    overlaps, onRing, crossings, names: tags.length,
    shut: panels.filter((p) => p.inert && getComputedStyle(p).visibility === 'hidden').length, panels: panels.length,
    links: stage.querySelectorAll('.clusters-map__panel a').length};
}"""

# One cluster open: its panel shows inside the drawing, its columns start level, its text is 15 px or more,
# and only its links join the tab order.
CLUSTERS_OVERVIEW_OPEN = """(n) => {
  const stage = document.querySelector('.clusters-map__stage');
  const spot = stage.querySelector(`.clusters-map__spot[data-cluster="${n}"]`);
  const panel = spot.querySelector('.clusters-map__panel'), s = stage.getBoundingClientRect(), r = panel.getBoundingClientRect();
  const links = [...panel.querySelectorAll('a')];
  const tops = {};
  links.forEach((a) => { const b = a.getBoundingClientRect(); const x = Math.round(b.left); if (!(x in tops)) tops[x] = b.top; });
  const firsts = Object.values(tops);
  return {open: spot.classList.contains('is-open') && !panel.inert && getComputedStyle(panel).visibility === 'visible',
    expanded: spot.querySelector('.clusters-map__tag').getAttribute('aria-expanded'),
    // The drawing may grow below itself (its bottom margin) while a panel is open.
    inside: r.left >= s.left - 0.5 && r.top >= s.top - 0.5 && r.right <= s.right + 0.5 && r.bottom <= s.bottom + (parseFloat(stage.style.marginBottom) || 0) + 0.5,
    columns: firsts.length, level: Math.max(...firsts) - Math.min(...firsts),
    text: Math.min(...links.map((a) => parseFloat(getComputedStyle(a).fontSize))),
    target: Math.min(...links.map((a) => a.getBoundingClientRect().height)),
    others: [...stage.querySelectorAll('.clusters-map__panel')].filter((p) => p !== panel && !p.inert).length};
}"""

CLUSTERS_MAP_PHONE = """() => {
  const shown = (el) => !!el && el.getClientRects().length > 0;
  return {frame: shown(document.querySelector('.clusters-map__frame')),
    hub: shown(document.querySelector('.clusters-map__hub')),
    chips: [...document.querySelectorAll('.clusters-overview__name')].filter(shown).length,
    clusters: document.querySelectorAll('.clusters-overview__list > li').length};
}"""

# The narrowest width that shows the overview (clusters.css); its cue lines are 15 px there.
CLUSTERS_MAP_BREAKPOINT = 942


def check_clusters_map(browser, base, failures):
    """The /clusters/ map. The overview, laid out at build time: names fit their boxes and stay apart, at
    15 px or more from the breakpoint up, each panel opens inside the drawing with level columns, and the
    names and panels match the list of clusters and sub-clusters after the figure.
    Rerun when the Clusters Doc changes."""
    expect = expectation(failures, "clusters map")
    for width in (1440, 1024, CLUSTERS_MAP_BREAKPOINT):
        page = new_page(browser, width, reduced_motion="reduce")
        page.goto(base + "clusters/", wait_until="load")
        page.evaluate("document.fonts.ready")
        rest = page.evaluate(CLUSTERS_OVERVIEW_REST)
        expect(not rest.get("missing"), f"at {width} px /clusters/ shows the overview")
        if rest.get("missing"):
            page.context.close()
            continue
        listed = lambda items: f": {items[:3]}" if items else ""
        expect(rest["ring"], f"at {width} px the ring is drawn")
        expect(0 < rest["names"] == rest["listed"], f"at {width} px the overview names every listed cluster ({rest['names']} of {rest['listed']})")
        expect(0 < rest["links"] == rest["subs"] and not rest["unmatched"],
               f"at {width} px each cluster's panel links the sub-clusters listed under it ({rest['links']} of {rest['subs']})" + listed(rest["unmatched"]))
        print(f"  {width} px: names {rest['name']:.1f} px, cues {rest['cue']:.1f} px")
        expect(rest["name"] >= 15 and rest["cue"] >= 15, f"at {width} px the names and cues are 15 px or more")
        expect(not rest["spill"], f"at {width} px each name fits its box" + listed(rest["spill"]))
        expect(not rest["overlaps"], f"at {width} px no name overlaps another" + listed(rest["overlaps"]))
        expect(not rest["onRing"], f"at {width} px no name overlaps the ring" + listed(rest["onRing"]))
        expect(not rest["crossings"], f"at {width} px no line runs through another name" + listed(rest["crossings"]))
        expect(rest["shut"] == rest["panels"] == rest["names"], f"at {width} px every panel is shut and inert at rest ({rest['shut']} of {rest['panels']})")
        bad = []
        for n in range(1, rest["names"] + 1):
            page.mouse.move(0, 0)
            page.wait_for_timeout(260)
            page.hover(f'.clusters-map__spot[data-cluster="{n}"] .clusters-map__tag')
            found = page.evaluate(CLUSTERS_OVERVIEW_OPEN, n)
            problems = [name for name, ok in (("not open", found["open"] and found["expanded"] == "true"), ("outside", found["inside"]),
                        ("columns not level", found["level"] <= 1), ("text under 15 px", found["text"] >= 15),
                        ("targets under 44 px", found["target"] >= 44), ("another panel open", not found["others"])) if not ok]
            if problems:
                bad.append(f"{n}: {', '.join(problems)}")
        expect(not bad, f"at {width} px each cluster's panel opens inside the drawing, level, 15 px+, 44 px targets" + listed(bad))
        if width == CLUSTERS_MAP_BREAKPOINT:
            page.set_viewport_size({"width": width - 1, "height": 900})
            expect(page.evaluate(CLUSTERS_MAP_PHONE)["hub"], f"at {width - 1} px the hub and list replace the overview")
        page.context.close()
    page = new_page(browser, 390)
    page.goto(base + "clusters/", wait_until="load")
    phone = page.evaluate(CLUSTERS_MAP_PHONE)
    expect(not phone["frame"] and phone["hub"], "at 390 px the hub shows instead of the drawing")
    expect(phone["clusters"] > 0 and phone["chips"] == phone["clusters"],
           f"at 390 px every cluster is linked in the list of clusters ({phone['chips']} of {phone['clusters']})")
    page.context.close()


SPECIALIST_SHOWN = """() => {
  const cards = [...document.querySelectorAll('.clusters-content [data-specificity=narrow]')];
  return [cards.length, cards.filter((card) => getComputedStyle(card).display !== 'none').length];
}"""


def check_specialist_cards(browser, base, failures):
    """A cluster page hides its specialist resources until their checkbox is ticked, as the box shows."""
    expect = expectation(failures, "specialist resources")
    page = new_page(browser, 1440)
    page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])  # Banner shut.
    for number in range(1, 12):
        page.goto(base + f"clusters/cluster-{number}/", wait_until="load")
        page.wait_for_timeout(500)
        total, shown = page.evaluate(SPECIALIST_SHOWN)
        if total:
            break
    expect(total > 0, "a cluster page has specialist resources to test")
    if total:
        box = page.locator("#fr-global-specificity-checkbox")
        expect(not box.is_checked(), f"cluster {number}: the box starts unticked")
        expect(shown == 0, f"cluster {number}: {shown} of {total} specialist resources shown on load")
        box.check()
        page.wait_for_timeout(200)
        shown = page.evaluate(SPECIALIST_SHOWN)[1]
        expect(shown == total, f"cluster {number}: {shown} of {total} shown after ticking the box")
        box.uncheck()
        page.wait_for_timeout(200)
        shown = page.evaluate(SPECIALIST_SHOWN)[1]
        expect(shown == 0, f"cluster {number}: {shown} of {total} still shown after unticking it")
    page.context.close()


# What of the page's own a floating control covers: text, a control, an image or a card (anything with its own
# background, shadow or side borders that does not span the screen; a rule along one edge is not a card). Each overlap is confirmed by hit testing,
# so that content scrolled out of its box or under another layer does not count. It is independent of
# site.js's own test for empty space, and a control counts as covering only while it is shown.
FLOATING_OVER = """(selector) => {
  const floating = document.querySelector(selector);
  if (!floating) return [];
  const own = floating.closest('#just-os-widget') || floating;
  const style = getComputedStyle(floating);
  const rect = floating.getBoundingClientRect();
  // A focus ring drawn outside the box covers the page as much as the box does.
  const ring = style.outlineStyle !== 'none' ? Math.max(0, parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset)) : 0;
  const box = {left: rect.left - ring, right: rect.right + ring, top: rect.top - ring, bottom: rect.bottom + ring,
               width: rect.width + 2 * ring, height: rect.height + 2 * ring};
  if (style.visibility === 'hidden' || parseFloat(style.opacity) < 0.5 || !box.width || !box.height) return [];
  const meets = (r) => r.width > 0 && r.height > 0 && r.left < box.right - 0.5 && box.left < r.right - 0.5 && r.top < box.bottom - 0.5 && box.top < r.bottom - 0.5;
  const shown = (el, r) => {
    const left = Math.max(r.left, box.left), right = Math.min(r.right, box.right);
    const top = Math.max(r.top, box.top), bottom = Math.min(r.bottom, box.bottom);
    for (const fx of [0.2, 0.5, 0.8]) for (const fy of [0.2, 0.5, 0.8]) {
      const hit = document.elementsFromPoint(left + (right - left) * fx, top + (bottom - top) * fy).find((e) => !own.contains(e));
      if (hit && (hit === el || el.contains(hit))) return true;
    }
    return false;
  };
  const name = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : el.classList[0] ? '.' + el.classList[0] : '');
  const found = new Set();
  const screen = document.documentElement.clientWidth;
  const range = document.createRange();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!node.data.trim() || !parent || own.contains(parent) || !meets(parent.getBoundingClientRect())) continue;
    range.selectNodeContents(node);
    if ([...range.getClientRects()].some((r) => meets(r) && shown(parent, r))) found.add(`text "${node.data.trim().slice(0, 30)}"`);
  }
  for (const el of document.body.querySelectorAll('*')) {
    if (own.contains(el) || el.contains(own)) continue;
    const r = el.getBoundingClientRect();
    if (!meets(r)) continue;
    const control = el.matches('a[href],button,input,select,textarea,summary,[role=button],[tabindex]:not([tabindex="-1"]),img,svg,video,iframe,canvas');
    const look = getComputedStyle(el);
    const painted = look.backgroundColor !== 'rgba(0, 0, 0, 0)' || look.backgroundImage !== 'none' || look.boxShadow !== 'none'
      || ['Left', 'Right'].every((side) => look[`border${side}Style`] !== 'none' && parseFloat(look[`border${side}Width`]));
    const card = painted && (r.left > 1 || r.right < screen - 1);
    if ((control || card) && shown(el, r)) found.add(`${control ? 'control' : 'card'} ${name(el)}`);
  }
  return [...found];
}"""

BUBBLE_SHOWN = "() => parseFloat(getComputedStyle(document.getElementById('just-os-bubble')).opacity) >= 0.5"
BACK_TO_TOP_SHOWN = """() => { const el = document.querySelector('.clusters-back-to-top');
  return !!el && getComputedStyle(el).visibility === 'visible' && el.getBoundingClientRect().width > 0; }"""

# Where the floating controls are checked: long pages of text, cards and lists, the pages with back to top,
# and a page on the reading layout, whose empty margin the invitation may use.
FLOATING_PAGES = ("contributors/", "citation-politics/toolkit/", "disciplines/", "clusters/", "clusters/cluster-1/",
                  "publications/", "about/teams/", "about/us/", "contributor-analysis/")
FLOATING_WIDTHS = (390, 1024, 1280, 1440, 1800)  # From 1800 px the launcher has its hover and focus label.


def check_floating_controls(browser, base, widths, failures):
    """The chat launcher, its dismiss cross, invitation and label, and back to top cover nothing of the page,
    wherever it is scrolled. On phones (<=760 px) the corner launcher stays hidden; between 761 and 1439 px
    it hides whenever text, a card or a control sits beneath its resting footprint and reappears over empty space
    (including the padded footer). Back to top still floats mid-page below 1440 px and keeps off the launcher.

    The launcher is checked closed, hovered, focused from the keyboard and inviting (on a fake clock, so that its
    ten-second cycle runs at once), at the top, a third and two thirds of the way down, and at the end of each page.
    The disciplines page has a field open, cluster 1 has every sub-cluster open, and the clusters page on a phone has its navigation drawer open at the end.
    The invitation is to stay (decision D19), so it must also show somewhere, and back to top must show beside
    the fields or clusters and hide while the drawer is open. Runs for some of FLOATING_WIDTHS at a time, and
    returns where the invitation showed, for main() to check across them all.
    """
    expect = expectation(failures, "floating controls")
    invited = set()
    for width in widths:
        page = new_page(browser, width)
        page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])  # Banner shut.
        page.clock.install()
        for path in FLOATING_PAGES:
            covered = {}

            def look(state, selector="#just-os-bubble", floating=False):
                for item in page.evaluate(FLOATING_OVER, selector):
                    # Below 1440 px back to top still floats over the page as it scrolls by;
                    # there it must keep off the chat launcher and cover nothing once the page is at its end.
                    if floating and not re.search(r"just-os|back-to-top", item):
                        continue
                    covered.setdefault(state, []).append(item)
                if state.startswith("invitation") and page.evaluate(BUBBLE_SHOWN):
                    invited.add(f"{path} at {width} px")

            back_to_top = False
            page.goto(base + path, wait_until="load", timeout=120000)
            page.clock.run_for(300)
            page.wait_for_timeout(300)
            if path == "disciplines/":
                page.locator(".acc-trigger", has_text="Psychology").first.click()
                page.clock.run_for(300)
            if path == "clusters/cluster-1/":
                page.locator(".acc-toggle-all").first.click()  # Every sub-cluster open: the page a reader scrolls.
                page.clock.run_for(300)
            page.clock.run_for(10500)  # The invitation's first turn, at the top of the page.
            page.wait_for_timeout(400)
            look("invitation at the top")
            end = page.evaluate("document.documentElement.scrollHeight - innerHeight")
            for y in sorted({0, end // 3, 2 * end // 3, end}):
                where = f"scrolled {y} px"
                page.mouse.move(1, 1)
                page.evaluate(f"scrollTo(0, {y}); dispatchEvent(new Event('scroll'))")
                page.clock.run_for(300)
                page.wait_for_function(
                    "() => { const w = document.getElementById('just-os-widget'), b = document.getElementById('just-os-btn');"
                    " if (!w || !b || !w.classList.contains('is-covered')) return true;"
                    " return parseFloat(getComputedStyle(b).opacity) < 0.1; }",
                    timeout=3000,
                )
                page.wait_for_timeout(200)
                floating_top = width < 1440 and y != end
                look(f"launcher at {where}", "#just-os-btn", False)
                look(f"dismiss at {where}", "#just-os-dismiss", False)
                look(f"back to top at {where}", ".clusters-back-to-top", floating_top)
                back_to_top = back_to_top or page.evaluate(BACK_TO_TOP_SHOWN)
                if width <= 760:
                    expect(not page.locator("#just-os-btn").is_visible(),
                           f"{path} at {width} px, {where}: corner launcher stays hidden on phones")
                elif y == end:
                    expect(page.locator("#just-os-btn").is_visible(),
                           f"{path} at {width} px, {where}: launcher shows over the footer")
                for turn in range(2):  # One of two turns of its cycle shows the invitation, where it may show.
                    page.clock.run_for(10000)
                    page.wait_for_timeout(400)
                    look(f"invitation at {where}")
                if page.locator("#just-os-btn").is_visible():
                    page.hover("#just-os-btn")
                    page.wait_for_timeout(400)
                    look(f"hover label at {where}")
                    page.mouse.move(1, 1)
                    page.keyboard.press("Tab")  # Keyboard use first, so that the launcher's focus shows as it would.
                    page.focus("#just-os-btn")
                    page.wait_for_timeout(400)
                    look(f"focus label at {where}")
                    page.evaluate("document.activeElement.blur()")
                    page.clock.run_for(50)
            if path == "clusters/" and width < 992:
                toggle = page.locator("#clusters-mobile-toggle")
                toggle.scroll_into_view_if_needed()
                toggle.click()
                page.evaluate("scrollBy(0, 600)")
                page.clock.run_for(300)
                page.wait_for_timeout(400)
                look("back to top over the open drawer", ".clusters-back-to-top")
                look("launcher over the open drawer", "#just-os-btn")
                expect(not page.evaluate(BACK_TO_TOP_SHOWN), f"{path} at {width} px: back to top hides while the drawer is open")
            if path in ("disciplines/", "clusters/", "clusters/cluster-1/"):
                expect(back_to_top, f"{path} at {width} px: back to top shows beside the fields or clusters")
            for state, items in covered.items():
                expect(False, f"{path} at {width} px, {state}: covers {', '.join(sorted(set(items))[:3])}")
            if not covered:
                expect(True, f"{path} at {width} px covers nothing")
        page.context.close()
    return invited


# Pages of cards or lists, with the element that holds them: a wide screen is not to leave them in the reading column.
DIRECTORIES = {
    "publications/": ".pub-list",
    "about/partnerships/": ".partner-list",
    "contributors/": "#contributor-list",
    "about/community/": ".people-wall",
    "about/teams/": ".team-layout",  # the grid that holds the introduction and the teams (.feature-rows is display:contents)
    "educators-corner/": ".ec-grid",
    "pedagogies/": ".list-items",
    "forrt_clusters/academic-life-and-culture/": ".cluster-resources",
    "syllabus/": ".catalogue",
    "neurodiversity-lessonbank/": ".lesson-grid",
    "citation-politics/toolkit/": ".cpt-items",
}
# Tool pages lead with their tool: the main action is in the first view, above the page's own text.
TOOL_PAGES = ("awop/", "citation-politics/", "replication-hub/flora/", "nowherelab/")
DIRECTORY_MIN_WIDTH = 900
FIRST_VIEW_IMAGE_LIMIT = 0.3
CHART_WIDTH_LIMIT = 340
WHEEL_WIDTH_LIMIT = 420
TOOLKIT_SEARCH = """async () => {
  const input = document.querySelector('#cpt-search-input');
  const shown = () => [...document.querySelectorAll('[data-cpt-item]')].filter((el) => el.getClientRects().length).length;
  const type = (value) => { input.value = value; input.dispatchEvent(new Event('input')); };
  const before = shown();
  type('zzqx');
  const none = shown(), empty = document.querySelector('.cpt-result').classList.contains('is-empty') && Boolean(document.querySelector('.cpt-clear').getClientRects().length);
  type('gender');
  const some = shown();
  type('zzqx');
  document.querySelector('.cpt-clear').click();
  return {before, none, empty, some, after: shown(), cleared: input.value === ''};
}"""


def check_directory_widths(browser, base, failures):
    """At 1440 px directories use the width, the chart on Publications and the toolkit's wheel do not take over
    the first view, and the toolkit's search empties, narrows and restores its entries."""
    expect = expectation(failures, "directory widths")
    page = new_page(browser, 1440)
    page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])  # Banner shut.
    for path, selector in DIRECTORIES.items():
        page.goto(base + path, wait_until="load")
        width = page.evaluate("(s) => document.querySelector(s)?.getBoundingClientRect().width || 0", selector)
        expect(width >= DIRECTORY_MIN_WIDTH, f"{path}: {selector} is {width:.0f} px wide, at least {DIRECTORY_MIN_WIDTH}")
    for path in TOOL_PAGES:
        page.goto(base + path, wait_until="load")
        page.evaluate("document.fonts.ready.then(() => null)")
        bottom = page.evaluate("document.querySelector('.page-actions .btn-primary')?.getBoundingClientRect().bottom ?? Infinity")
        expect(bottom <= page.viewport_size["height"], f"{path}: the main action ends {bottom:.0f} px down, within the first view")
    # A picture several posts share (the newsletters' stock photo) is left out; a post's own picture stays,
    # after its link on a short post.
    page.goto(base + "post/2026-01-newsletter/", wait_until="load")
    shared = page.evaluate("document.querySelectorAll('.reading .article-image').length")
    expect(shared == 0, "a newsletter post leaves out the stock picture the newsletters share")
    page.goto(base + "post/2026-05-chinese-glossary/", wait_until="load")
    order = page.evaluate("""() => {
      const link = document.querySelector('.article-style a');
      const image = document.querySelector('.reading .article-image');
      return !!link && !!image && !!(link.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING);
    }""")
    expect(order, "a short news post keeps its own image, after its link")
    page.goto(base + "publications/", wait_until="load")
    chart_width, share = page.evaluate("""() => {
      const box = document.querySelector('.cite-chart, .citation-container img').getBoundingClientRect();
      const seen = Math.max(0, Math.min(box.bottom, innerHeight) - Math.max(box.top, 0));
      return [box.width, seen * box.width / (innerWidth * innerHeight)];
    }""")
    expect(chart_width <= CHART_WIDTH_LIMIT, f"the citation chart is {chart_width:.0f} px wide, limit {CHART_WIDTH_LIMIT}")
    expect(share <= FIRST_VIEW_IMAGE_LIMIT, f"the citation chart takes {share:.0%} of the first view, limit {FIRST_VIEW_IMAGE_LIMIT:.0%}")
    page.goto(base + "citation-politics/toolkit/", wait_until="load")
    wheel_width, share = page.evaluate("""() => {
      const box = document.querySelector('.cpt-wheel img').getBoundingClientRect();
      const seen = Math.max(0, Math.min(box.bottom, innerHeight) - Math.max(box.top, 0));
      return [box.width, seen * box.width / (innerWidth * innerHeight)];
    }""")
    expect(wheel_width <= WHEEL_WIDTH_LIMIT, f"the toolkit's wheel is {wheel_width:.0f} px wide, limit {WHEEL_WIDTH_LIMIT}")
    expect(share <= FIRST_VIEW_IMAGE_LIMIT, f"the toolkit's wheel takes {share:.0%} of the first view, limit {FIRST_VIEW_IMAGE_LIMIT:.0%}")
    found = page.evaluate(TOOLKIT_SEARCH)
    expect(found["before"] > 0 and found["none"] == 0 and found["empty"], f"a toolkit search with no match hides every entry and says so: {found}")
    expect(0 < found["some"] < found["before"], f"a toolkit search for 'gender' narrows the entries: {found}")
    expect(found["after"] == found["before"] and found["cleared"], f"clearing the toolkit search shows every entry again: {found}")
    page.goto(base + "just_os_chatbot/", wait_until="load")
    page.wait_for_selector(".just-os-input")
    bottom = page.evaluate("document.querySelector('.just-os-input').getBoundingClientRect().bottom - innerHeight")
    expect(bottom <= 0, f"the chatbot page's input ends {bottom:.0f} px below the first view")
    page.goto(base + "booklet/", wait_until="load")
    frame = page.evaluate("(() => { const box = document.querySelector('._df_book').getBoundingClientRect(); return box.width / box.height; })()")
    expect(frame <= 1.4, f"the booklet's frame is {frame:.2f} times as wide as it is high, so a spread would be clipped; limit 1.4")
    page.goto(base + "about/steering-committee/", wait_until="load")
    tops = page.evaluate("[...document.querySelectorAll('.sc-team')].map((team) => Math.round(team.getBoundingClientRect().top))")
    expect(len(set(tops)) < len(tops), "no small Steering Committee team sits beside another")
    page.context.close()


def check_directory(browser, base, failures):
    expect = expectation(failures, "directory")
    topics = new_page(browser, 1440)
    topics.goto(base, wait_until="load")
    wanted = topics.evaluate("[...document.querySelectorAll('.topic')].map(a => new URL(a.href).searchParams.get('cluster'))")
    topics.goto(base + "resources/", wait_until="load")
    known = topics.evaluate("[...document.querySelectorAll('.facet[data-facet=cluster] .chip')].map(c => c.dataset.value)")
    expect(wanted and set(wanted) <= set(known), f"every topic button names a real cluster: {sorted(set(wanted) - set(known))}")
    topics.context.close()
    page = new_page(browser, 1440)
    requests = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(base + "resources/", wait_until="load")
    page.wait_for_function("document.querySelector('.chip') !== null")
    page.wait_for_timeout(500)
    expect(page.locator(".res").count() == 24, "the first page has 24 cards as HTML")
    expect(not any("search.json" in url for url in requests), "search data waits for the first search")
    total = int(page.get_attribute("#directory", "data-total"))
    pager = page.locator("#pager")
    expect(pager.is_visible(), "the page links show when nothing is chosen")

    page.click('.facet[data-facet=cluster] .chip[data-value=pre-analysis-planning]')
    page.wait_for_function("location.search.includes('cluster=pre-analysis-planning')")
    count = page.text_content("#resultCount")
    expect("matching" in count, f"choosing a cluster filters the list: {count}")
    expect(not pager.is_visible(), "the page links hide while filtering")
    first = page.text_content(".res-title")
    page.click("#clientPager a[rel=next]")
    expect(page.text_content(".res-title") != first and "page=2" in page.url, f"the filtered list's page links turn the page: {page.url}")
    expect(page.evaluate("document.activeElement.closest('.res') !== null"), "a page link moves focus to the new cards")
    page.go_back()
    page.wait_for_function("!location.search.includes('page=')")
    expect(page.text_content(".res-title") == first, "Back returns to the first page of results")
    page.select_option("#sortOrder", "newest")
    page.wait_for_function("location.search.includes('sort=newest')")
    expect("newest first" in page.text_content("#resultCount"), "Newest added re-sorts and says so")
    page.select_option("#perPage", "48")
    page.wait_for_function("location.search.includes('per=48')")
    matches = int(re.search(r"of ([\d,]+)", page.text_content("#resultCount")).group(1).replace(",", ""))
    expect(page.locator(".res").count() == min(48, matches), f"Per page sets the page size: {page.text_content('#resultCount')}")
    page.select_option("#sortOrder", "title")
    page.select_option("#perPage", "24")

    address = page.url
    fresh = new_page(browser, 390)
    fresh.goto(address, wait_until="load")
    fresh.wait_for_function("document.getElementById('resultCount').textContent.includes('matching')", timeout=30000)
    expect(fresh.get_attribute('.chip[data-value=pre-analysis-planning]', "aria-pressed") == "true", "a shared address restores the filter")
    fresh.goto(base + "resources/?search=replication", wait_until="load")
    fresh.wait_for_function("document.getElementById('resultCount').textContent.includes('matching')", timeout=30000)
    expect(fresh.input_value("#resource-search") == "replication", "a shared address restores the search")
    expect(not fresh.locator("#search").is_visible(), "the site search overlay stays shut")
    fresh.context.close()

    page.fill("#resource-search", "zzzzqqqq")
    page.wait_for_function("!document.getElementById('empty').hidden")
    expect(page.locator("#empty").is_visible(), "no matches shows the empty message")
    page.click("#emptyReset")
    page.wait_for_function("location.search === ''")
    expect(page.locator(".res").count() == 24, "reset brings back the first page")
    expect(total == int(page.get_attribute("#directory", "data-total")), "the total stays the same")

    # Search reaches fields beyond the title, once the fuller data has arrived.
    page.fill("#resource-search", "ioannidis")
    page.wait_for_function("document.getElementById('resultCount').textContent.includes('matching')")
    page.wait_for_timeout(2500)
    expect(any("search.json" in url for url in requests), "the first search fetches the search data")
    hits = page.text_content("#resultCount")
    titles = page.evaluate("[...document.querySelectorAll('.res-title')].map(t => t.textContent.toLowerCase())")
    expect(any("ioannidis" not in title for title in titles), f"search finds authors, not only titles: {hits}")
    page.context.close()

    # The pages reach the whole collection without JavaScript.
    plain = browser.new_context(java_script_enabled=False).new_page()
    plain.route("**/*", lambda route: route.abort() if BLOCK.search(route.request.url) else route.continue_())
    plain.goto(base + "resources/", wait_until="load")
    plain.locator("#pager a[aria-label]").last.click()
    plain.wait_for_load_state("load")
    seen_last = plain.locator(".res").count()
    expect(seen_last >= 1, f"the last page of results opens without JavaScript, with {seen_last} cards")
    plain.context.close()


NETWORK_PATH = "contributor-analysis/"
NETWORK_MIN_SPAN = 0.65
NETWORK_MAX_LEAN = 0.2
NETWORK_MIN_CORE = 0.28
CHARTS_ENLARGED = """() => {
  const clashes = [];
  for (const row of document.querySelectorAll('.bar,.share-list li')) {
    const parts = [...row.children].filter((part) => part.textContent.trim()).map((part) => [part, part.getBoundingClientRect()]);
    parts.forEach(([a, x], i) => parts.slice(i + 1).forEach(([b, y]) => {
      if (x.left < y.right - 1 && y.left < x.right - 1 && x.top < y.bottom - 1 && y.top < x.bottom - 1) clashes.push(a.textContent + ' / ' + b.textContent);
    }));
  }
  const width = (selector) => Math.min(...[...document.querySelectorAll(selector)].map((el) => el.getBoundingClientRect().width));
  return {bars: document.querySelectorAll('.bar').length, bar: width('.bar-track'), label: width('.share-label'), clashes};
}"""
NETWORK_INK = """() => {
  const canvas = document.querySelector('[data-network-canvas]');
  const {width, height} = canvas;
  const pixels = canvas.getContext('2d').getImageData(0, 0, width, height).data;
  let left = width, right = -1, top = height, bottom = -1, solid = 0;
  const columns = new Array(width).fill(0);
  const rows = new Array(height).fill(0);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (pixels[(y * width + x) * 4 + 3] > 200) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        columns[x] += 1;
        rows[y] += 1;
        solid += 1;
      }
    }
  }
  // How far the middle 80% of what is drawn spreads, which a few far-out dots cannot stretch.
  const middle = (counts) => {
    let seen = 0, first = 0, last = 0;
    counts.forEach((count, i) => {
      if (seen < solid * .1) first = i;
      seen += count;
      if (seen <= solid * .9) last = i;
    });
    return (last - first) / counts.length;
  };
  return {left, right, top, bottom, width, height, core_across: middle(columns), core_down: middle(rows)};
}"""


def framing_problems(ink):
    """What is wrong with where the drawn network sits on its canvas, from the box its solid pixels fill."""
    width, height = ink["width"], ink["height"]
    if not width or not height or ink["right"] < 0:
        return ["nothing is drawn"]
    problems = []
    across = (ink["right"] - ink["left"]) / width
    down = (ink["bottom"] - ink["top"]) / height
    if max(across, down) < NETWORK_MIN_SPAN:
        problems.append(f"fills only {across:.0%} of the width and {down:.0%} of the height")
    lean_x = abs(ink["left"] - (width - 1 - ink["right"])) / width
    lean_y = abs(ink["top"] - (height - 1 - ink["bottom"])) / height
    if max(lean_x, lean_y) > NETWORK_MAX_LEAN:
        problems.append(f"sits off centre by {lean_x:.0%} across and {lean_y:.0%} down")
    if ink["core_across"] < NETWORK_MIN_CORE or ink["core_down"] < NETWORK_MIN_CORE:
        problems.append(f"bunches up: most of it spans {ink['core_across']:.0%} of the width and {ink['core_down']:.0%} of the height")
    return problems


def check_contributor_network(browser, base, failures):
    """The network is framed, reaches nothing outside the site, and answers to pointer and keyboard."""
    expect = expectation(failures, "contributor network")
    host = urlsplit(base).netloc
    for width, height in WIDTHS.items():
        page = new_page(browser, width)
        page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])
        asked = []
        page.on("request", lambda request: asked.append(request.url))
        page.goto(base + NETWORK_PATH, wait_until="load")
        page.wait_for_selector("[data-network-panel]:not([hidden])")
        page.wait_for_timeout(300)
        for problem in framing_problems(page.evaluate(NETWORK_INK)):
            expect(False, f"at {width} the network {problem}")
        outside = [url for url in asked if url.startswith("http") and urlsplit(url).netloc != host]
        expect(not outside, f"at {width} the page asks no other site for anything: {outside[:3]}")
        expect(page.locator("main iframe").count() == 0, f"at {width} the page embeds no iframe")
        if width >= 1024:
            panel = page.evaluate("document.querySelector('[data-network-panel]').getBoundingClientRect().height")
            expect(panel <= height, f"at {width} the network panel, {panel:.0f} px high, fits a {height} px screen")
        else:
            touch = page.evaluate("getComputedStyle(document.querySelector('[data-network-canvas]')).touchAction")
            expect(touch == "auto", f"at {width} the drawing leaves touch to the page: {touch}")
            described = page.evaluate("document.querySelector('[data-network-canvas]').getAttribute('aria-describedby')")
            expect(not described, f"at {width} the drawing does not describe controls that are hidden: {described}")
        # An open list of matches stays on the screen, however the page has scrolled.
        field = page.locator("#network-project")
        field.scroll_into_view_if_needed()
        page.evaluate("""() => {
          const box = document.querySelector('#network-project').getBoundingClientRect();
          scrollBy(0, box.bottom - innerHeight + 30);
        }""")
        page.wait_for_timeout(100)
        field.click()
        page.wait_for_timeout(100)
        reach = page.evaluate("""() => {
          const box = document.querySelector('#network-project-list').getBoundingClientRect();
          return [box.top, box.bottom, innerHeight, box.height];
        }""")
        expect(reach[0] >= 0 and reach[1] <= reach[2] and reach[3] >= 120,
               f"at {width} an open list of matches stays on the screen: {reach[0]:.0f} to {reach[1]:.0f} of {reach[2]}, {reach[3]:.0f} px high")
        page.context.close()

    page = new_page(browser, 1440)
    page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])
    page.goto(base + NETWORK_PATH, wait_until="load")
    page.wait_for_selector("[data-network-panel]:not([hidden])")
    status = page.locator("[data-network-status]")
    canvas = page.locator("[data-network-canvas]")
    canvas.scroll_into_view_if_needed()
    position = "(name) => document.querySelector('[data-analysis-network]').networkPosition(name)"
    data = page.evaluate("JSON.parse(document.getElementById('network-data').textContent)")
    person = max(data["people"], key=lambda row: len(row[4]))[0]
    project = data["projects"][0][0]
    box = canvas.bounding_box()

    # Filtering by keyboard: type, take the first match, take it off again.
    page.locator("#network-project").focus()
    page.keyboard.type(project)
    expect(page.locator("#network-project-list").is_visible(), "typing a project opens its list")
    page.keyboard.press("ArrowDown")
    page.keyboard.press("Enter")
    expect(project in status.inner_text(), f"choosing a project says so: {status.inner_text()!r}")
    expect(page.locator(".network-chip").count() == 1, "a chosen project gets a chip")
    expect(page.locator("[data-network-detail] .network-link").count() > 1, "a chosen project lists its people")
    page.locator(".network-chip").click()
    expect("Showing everyone" in status.inner_text(), "taking the chip off shows everyone again")
    page.wait_for_timeout(400)

    # Keyboard use through the text: focus lands somewhere after each rebuild, and Escape still works.
    focused = "document.activeElement.tagName + ':' + (document.activeElement.id || document.activeElement.className)"
    page.locator("#network-person").focus()
    page.keyboard.type(person)
    page.keyboard.press("Enter")
    page.locator("[data-network-detail] .network-link:not(.network-clear)").first.focus()
    page.keyboard.press("Enter")
    expect(page.evaluate("document.activeElement.tagName") == "H3", f"following a link in the text moves focus to its heading: {page.evaluate(focused)}")
    page.locator(".network-chip").first.focus()
    page.keyboard.press("Enter")
    expect(page.evaluate("document.activeElement.id") == "network-project", f"taking off the last chip moves focus to its search box: {page.evaluate(focused)}")
    page.locator("#network-person").focus()
    page.keyboard.type(person)
    page.keyboard.press("Enter")
    page.locator("[data-network-detail] .network-link:not(.network-clear)").first.focus()
    page.keyboard.press("Enter")
    page.keyboard.press("Escape")
    expect("Showing everyone" in status.inner_text(), "Escape clears a selection reached by following a link")
    page.wait_for_timeout(400)

    # Hovering names a node, and clicking selects it.
    point = page.evaluate(position, person)
    page.mouse.move(box["x"] + point["x"], box["y"] + point["y"])
    tip = page.locator("[data-network-tip]")
    expect(tip.is_visible() and person in tip.inner_text(), f"hovering {person} names them")
    page.keyboard.press("Escape")
    expect(not tip.is_visible(), "Escape dismisses the name shown by hovering")
    page.mouse.move(box["x"] + 40, box["y"] + 40)
    page.mouse.move(box["x"] + point["x"], box["y"] + point["y"])
    tip_box = tip.bounding_box()
    page.mouse.move(tip_box["x"] + 5, tip_box["y"] + 5)
    page.wait_for_timeout(500)
    expect(tip.is_visible(), "the name stays while the pointer is on it")
    page.mouse.move(box["x"] + point["x"], box["y"] + point["y"])
    page.mouse.click(box["x"] + point["x"], box["y"] + point["y"])
    expect(person in status.inner_text(), f"clicking {person} selects them: {status.inner_text()!r}")
    expect(page.locator("[data-network-detail] h3").inner_text() == person, "the selection is described in text")
    # With a long list beside it, an open list of matches goes with its box or shuts.
    page.locator("#network-project").click()
    page.locator(".network-controls").evaluate("(side) => { side.scrollTop += 250; }")
    page.wait_for_timeout(100)
    options = page.locator("#network-project-list")
    gap = page.evaluate("""() => {
      const list = document.querySelector('#network-project-list');
      return list.hidden ? 0 : Math.abs(list.getBoundingClientRect().top - document.querySelector('#network-project').getBoundingClientRect().bottom);
    }""")
    expect(not options.is_visible() or gap < 12, f"a list of matches follows its box when the side panel scrolls: {gap:.0f} px")
    page.locator("#network-person").focus()
    page.keyboard.press("Escape")
    page.keyboard.press("Escape")
    canvas.focus()
    page.wait_for_timeout(400)

    # The person's search box, then the arrow keys on the drawing.
    page.locator("#network-person").focus()
    page.keyboard.type(person[:6])
    page.keyboard.press("Enter")
    expect("project" in status.inner_text() and "Showing everyone" not in status.inner_text(), "Enter takes the first match")
    page.locator("#network-person").press("Escape")
    expect("Showing everyone" in status.inner_text(), "Escape clears the selection")
    page.wait_for_timeout(400)
    canvas.focus()
    before = page.evaluate(position, person)
    page.keyboard.press("ArrowLeft")
    page.wait_for_timeout(50)
    after = page.evaluate(position, person)
    expect(after["x"] != before["x"], "the arrow keys move the drawing")
    page.keyboard.press("0")
    page.wait_for_timeout(400)

    # Scrolling over the drawing scrolls the page and leaves the drawing alone.
    before = page.evaluate(position, person)
    top = page.evaluate("scrollY")
    page.mouse.move(box["x"] + 40, box["y"] + 40)
    page.mouse.wheel(0, 200)
    page.wait_for_timeout(200)
    expect(page.evaluate("scrollY") > top, "the wheel scrolls the page over the drawing")
    expect(page.evaluate(position, person) == before, "the wheel alone does not zoom the drawing")
    page.context.close()

    # Enlarged text keeps the charts readable as well as inside the screen.
    for width in (390, 1024):
        page = new_page(browser, width)
        page.goto(base + NETWORK_PATH, wait_until="load")
        page.evaluate("""() => {
          const sizes = [...document.querySelectorAll('body *')].map((el) => [el, parseFloat(getComputedStyle(el).fontSize)]);
          sizes.forEach(([el, size]) => { el.style.fontSize = size * 2 + 'px'; });
        }""")
        page.wait_for_timeout(100)
        found = page.evaluate(CHARTS_ENLARGED)
        expect(found["bar"] >= 80 or not found["bars"], f"at {width} with text at 200% the bars keep their length: {found['bar']:.0f} px")
        expect(not found["clashes"], f"at {width} with text at 200% chart labels do not run together: {found['clashes'][:2]}")
        expect(found["label"] >= 50 or not found["bars"], f"at {width} with text at 200% chart labels keep their width: {found['label']:.0f} px")
        page.context.close()

    # Selecting does not animate for those who ask for less motion.
    page = new_page(browser, 1440, reduced_motion="reduce")
    page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])
    page.goto(base + NETWORK_PATH, wait_until="load")
    page.wait_for_selector("[data-network-panel]:not([hidden])")
    page.locator("#network-project").focus()
    page.keyboard.type(project)
    page.keyboard.press("Enter")
    first = page.evaluate(position, person)
    page.wait_for_timeout(400)
    expect(page.evaluate(position, person) == first, "with reduced motion the drawing does not glide")
    page.context.close()


CONFERENCE = "ai-metascience/"
CONFERENCE_MIN_WIDTH = 900


def check_conference(browser, base, failures):
    """The conference programme: day tabs that keep every day reachable, the width used, and the abstract dialog."""
    expect = expectation(failures, "conference programme")
    # Without JavaScript every day shows, so the audit reaches the days the tabs hide.
    for width in WIDTHS:
        page = new_page(browser, width, java_script_enabled=False)
        page.goto(base + CONFERENCE, wait_until="load")
        shown = page.evaluate("[...document.querySelectorAll('.am-prog-day')].filter((d) => d.getClientRects().length).length")
        expect(shown == 3, f"without JavaScript {shown} of 3 days show at {width}")
        found = page.evaluate(AUDIT)
        for key in ("overflow", "contrast", "small", "long"):
            expect(not found[key], f"without JavaScript at {width}, {key}: {found[key] if found[key] else 'none'}")
        page.context.close()
    page = new_page(browser, 1440)
    page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])  # Banner shut.
    page.goto(base + CONFERENCE, wait_until="load")
    width = page.evaluate("document.querySelector('.am-prog').getBoundingClientRect().width")
    expect(width >= CONFERENCE_MIN_WIDTH, f"the programme is {width:.0f} px wide, at least {CONFERENCE_MIN_WIDTH}")
    visible = "[...document.querySelectorAll('.am-prog-day')].filter((d) => !d.hidden).map((d) => d.id)"
    expect(page.evaluate(visible) == ["am-day-mon"], "with JavaScript only Monday shows at first")
    if not page.locator(".am-tab[aria-selected=true]").count():
        expect(False, "the days have tabs")
        page.context.close()
        return
    page.focus(".am-tab[aria-selected=true]")
    page.keyboard.press("ArrowRight")
    focused = page.evaluate("document.activeElement.id")
    expect(page.evaluate(visible) == ["am-day-tue"] and focused == "am-tab-tue", "the right arrow moves to Tuesday's tab and shows its day")
    talk = page.locator("#am-day-tue button.am-prog-item:not(.am-prog-item-plain)").first
    talk.focus()
    page.keyboard.press("Enter")
    inside = page.evaluate("document.getElementById('am-prog-dialog').open && document.getElementById('am-prog-dialog').contains(document.activeElement)")
    expect(inside, "Enter on a talk opens its abstract with the focus inside")
    page.keyboard.press("Escape")
    back = page.evaluate("!document.getElementById('am-prog-dialog').open && document.activeElement.matches('#am-day-tue .am-prog-item')")
    expect(back, "Escape closes the abstract and hands the focus back to the talk")
    page.goto(base + CONFERENCE + "#am-day-wed", wait_until="load")
    expect(page.evaluate(visible) == ["am-day-wed"], "a link to #am-day-wed opens on Wednesday")
    page.wait_for_timeout(300)
    tabs_top, cover = page.evaluate("""() => {
      const bar = document.getElementById('navbar-main');
      const fixed = bar && ['fixed', 'sticky'].includes(getComputedStyle(bar).position);
      return [document.querySelector('.am-switch').getBoundingClientRect().top, fixed ? bar.getBoundingClientRect().bottom : 0];
    }""")
    expect(tabs_top >= max(cover, 0), f"after a link to a day its tabs are in view, {tabs_top:.0f} px from the top, below the navbar at {cover:.0f}")
    page.context.close()


# The explanations inside cluster and discipline panels keep to the reading measure (.article-style).
PANEL_MEASURE = 580
PANEL_TEXT = """() => [...document.querySelectorAll('.cluster-description, .acc-body:not(.acc-collapsed) .sc-description')]
  .filter((el) => el.getClientRects().length).map((el) => Math.round(el.getBoundingClientRect().width))"""


def check_review_pages(browser, base, failures):
    """Fixes from the final design review: the abstract toggle says what it does, panel text keeps to
    the reading measure on a wide screen, the booklet turns one page at a time on a phone whatever its
    browser calls itself, and the community map opens on its members and can zoom out on a phone."""
    expect = expectation(failures, "review fixes")
    page = new_page(browser, 1440)
    page.goto(base + "publications/", wait_until="load", timeout=120000)
    toggle = page.locator(".btn-toggle-abstract").first
    state = "(el) => [el.textContent.trim(), el.getAttribute('aria-expanded')]"
    expect(toggle.evaluate(state) == ["Show Abstract", "false"], f"a closed abstract offers Show Abstract: {toggle.evaluate(state)}")
    toggle.click()
    expect(toggle.evaluate(state) == ["Hide Abstract", "true"], f"an open abstract offers Hide Abstract: {toggle.evaluate(state)}")
    toggle.click()
    expect(toggle.evaluate(state) == ["Show Abstract", "false"], "closing it again offers Show Abstract")
    for path in ("clusters/", "disciplines/"):
        page.goto(base + path, wait_until="load", timeout=120000)
        page.evaluate("document.querySelectorAll('.acc-toggle-all').forEach((b) => b.click())")
        page.wait_for_timeout(300)
        widths = page.evaluate(PANEL_TEXT)
        expect(widths and max(widths) <= PANEL_MEASURE, f"{path} panel text at most {PANEL_MEASURE} px wide at 1440: widest {max(widths or [0])}")
    page.context.close()

    page = new_page(browser, 390)
    page.goto(base + "booklet/", wait_until="load", timeout=120000)
    page.wait_for_selector(".df-ui-next:not(.df-ui-alt)", timeout=60000)
    page.wait_for_timeout(1500)
    page.locator(".df-ui-next:not(.df-ui-alt)").first.click()
    page.wait_for_timeout(1500)
    turned = page.evaluate("document.querySelector('#df_book_page_number')?.value")
    expect(turned == "2", f"one turn of the booklet at 390 shows page 2, not a spread: page {turned}")
    page.goto(base + "community-map/", wait_until="load", timeout=120000)
    frame = "iframe[title='FORRT Community Map']"
    page.locator(frame).scroll_into_view_if_needed()
    try:
        page.wait_for_function(f"""() => {{ const w = document.querySelector("{frame}").contentWindow;
          const m = w && w.HTMLWidgets && w.HTMLWidgets.find('.leaflet')?.getMap(); return m && m.getMinZoom() < 2; }}""", timeout=30000)
        ready = True
    except PlaywrightError:
        ready = False
    expect(ready, "the community map is ready, with a minimum zoom below 2, within 30 s at 390")
    if ready:
        found = page.frame_locator(frame).locator("body").evaluate("""() => {
          const m = HTMLWidgets.find('.leaflet').getMap(), b = m.getBounds();
          return {span: b.getEast() - b.getWest(), zoomOut: m.getZoom() > m.getMinZoom()};
        }""")
        expect(found["span"] >= 300, f"the community map opens on its members from America to New Zealand at 390: {found['span']:.0f} degrees across")
        expect(found["zoomOut"], "the community map can zoom out from its first view at 390")
    page.context.close()


def report_budgets(browser, base, root, subfolder, failures):
    from capture_pages import weigh

    parts = urlsplit(base)
    origin = f"{parts.scheme}://{parts.netloc}"
    subfolder = "/" + subfolder.strip("/") + "/" if subfolder.strip("/") else "/"
    for name, path, own, third in (
        ("home", "", 550, 190),
        ("resources", "resources/", 300, 190),
        ("replication hub", "replication-hub/", None, 190),
        ("article", "post/2026-01-newsletter/", None, 190),
        ("contributor analysis", "contributor-analysis/", 360, 0),  # About 190 once a data run replaces its images.
    ):
        weight = weigh(browser, origin, f"{subfolder}{path}", root, subfolder)
        own_budget = f" (budget {own})" if own else ""
        print(
            f"  {name}: {weight['own_kb']} KB own{own_budget}, {weight['third_party_kb']} KB third-party (budget {third}), "
            f"{len(weight['hosts'])} hosts (budget 6), first HTML {weight['by_kind_kb'].get('document', 0)} KB"
        )


def check_icons(root, failures):
    """Every Font Awesome class in the build must be in the subset, or its icon shows nothing."""
    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, "..", "..", "assets", "css", "doors", "icons.css"), encoding="utf-8") as handle:
        known = set(re.findall(r"\.(fa-[a-z0-9-]+)::before", handle.read()))
    used = {}
    # The class pattern and sizing modifiers are the same for pages and for scripts that add icons.
    classes = re.compile(r"""["'](?:[^"']* )?((?:fa[srb]?|fa-solid|fa-regular|fa-brands) [^"']*)["']""")
    icon = re.compile(r"\bfa-(?!solid\b|regular\b|brands\b|lg\b|fw\b|[0-9.]+x\b)[a-z0-9.-]+")

    def scan(path, where):
        with open(path, encoding="utf-8", errors="ignore") as handle:
            for found in classes.findall(handle.read()):
                for name in icon.findall(found):
                    if name not in known:
                        used.setdefault(name, where)

    for folder in ("static/js", "assets/js/doors"):
        for name in os.listdir(os.path.join(here, "..", "..", folder)):
            if name.endswith(".js"):
                scan(os.path.join(here, "..", "..", folder, name), folder)
    for folder, _, files in os.walk(root):
        for name in files:
            if name.endswith(".html"):
                scan(os.path.join(folder, name), os.path.relpath(folder, root))
    for name, where in sorted(used.items()):
        failures.append(f"icon {name} in {where} is missing from assets/css/doors/icons.css (build_fonts.py --icons)")
    print(f"  {len(known)} icons in the subset, {len(used)} used but missing", flush=True)


def check_on_request(root, failures):
    """Video posters, forms, calendars and the newsletter embed load only when a visitor asks."""
    pattern = re.compile(r"""i\.ytimg\.com|<iframe[^>]*\ssrc\s*=\s*["']?https?://(?:www\.)?(?:youtube|youtube-nocookie|calendar\.google|docs\.google)"""
                         r"""|<script[^>]*\ssrc\s*=\s*["']?https?://eocampaign1\.com|fonts\.(?:googleapis|gstatic)\.com|googletagmanager\.com/gtag/js\?id=G-""", re.I)
    found = []
    for folder, _, files in os.walk(root):
        if "index.html" in files and os.path.relpath(folder, root) != "admin":
            with open(os.path.join(folder, "index.html"), encoding="utf-8", errors="ignore") as handle:
                match = pattern.search(handle.read())
            if match:
                found.append((os.path.relpath(folder, root), match.group(0)[:60]))
    for where, what in found[:10]:
        failures.append(f"/{where}/ loads {what} before anyone asks")
    print(f"  pages loading these before anyone asks: {len(found)}", flush=True)


def check_no_redirects(root, failures):
    """Pages the checks visit by name are real pages. A redirect stub sends the browser to forrt.org mid-check,
    so the check would test the live site, or stop when the move lands."""
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "sample_pages.json"), encoding="utf-8") as handle:
        named = set(json.load(handle).values())
    # Every path written into this file, as well as the shared list.
    with open(os.path.abspath(__file__), encoding="utf-8") as handle:
        named |= {node.value for node in ast.walk(ast.parse(handle.read()))
                  if isinstance(node, ast.Constant) and isinstance(node.value, str)
                  and re.fullmatch(r"/?[a-z0-9_\-]+(/[a-z0-9_\-]+)*/", node.value)}
    for path in sorted(named):
        page = os.path.join(root, path.strip("/"), "index.html")
        if os.path.exists(page):
            with open(page, encoding="utf-8", errors="ignore") as handle:
                if re.search(r'http-equiv="?refresh', handle.read(3000)):
                    failures.append(f"/{path.strip('/')}/ is a redirect; check the page it moved to instead")
    print(f"  pages named in the checks: {len(named)}", flush=True)


def check_no_theme(root, failures):
    """No page loads the theme's stylesheet, Font Awesome's CDN sheet or jQuery from the CDN."""
    found = {}
    for folder, _, files in os.walk(root):
        if "index.html" in files:
            with open(os.path.join(folder, "index.html"), encoding="utf-8", errors="ignore") as handle:
                text = handle.read()
            for pattern, label in ((r"css/academic\.", "stylesheet"), (r"font-awesome/", "Font Awesome"), (r"ajax/libs/jquery/", "jQuery")):
                if re.search(pattern, text):
                    found.setdefault(label, os.path.relpath(folder, root))
    for mark, where in found.items():
        failures.append(f"/{where}/ still loads the theme's {mark}")
    print(f"  pages still loading theme assets: {len(found)} kinds", flush=True)


_SERVERS = {}


def worker_server(public, subfolder):
    """One local server per process, for all the sections that process runs."""
    if (public, subfolder) not in _SERVERS:
        _SERVERS[public, subfolder] = serve(public, subfolder)
    return _SERVERS[public, subfolder]


def run_section(job):
    """Run one section in its own browser and server, and return what it printed and found."""
    title, name, extra, public, url, subfolder, engine = job
    failures, out, value = [], io.StringIO(), None
    start = time.monotonic()
    try:
        with contextlib.redirect_stdout(out):
            base = url or worker_server(public, subfolder)
            with sync_playwright() as playwright:
                browser = getattr(playwright, engine).launch()
                try:
                    value = globals()[name](browser, base, *extra, failures)
                finally:
                    browser.close()
    except Exception as error:  # A crash fails the section rather than dropping it.
        failures.append(f"{title}: the check stopped with an error: {str(error)[:300]}")
    return title, out.getvalue(), failures, time.monotonic() - start, value


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public", nargs="?")
    parser.add_argument("--url")
    parser.add_argument("--base", default="/", help="subfolder the build expects to be served from")
    parser.add_argument("--browser", default="chromium", choices=("chromium", "firefox", "webkit"),
                        help="engine to run in; the throttled layout-shift test and the budgets need Chromium")
    parser.add_argument("--jobs", type=int, default=min(4, os.cpu_count() or 1),
                        help="browsers to run side by side (default: up to 4)")
    args = parser.parse_args()
    public = os.path.abspath(args.public) if args.public else None
    url = args.url.rstrip("/") + "/" if args.url else None
    failures = []
    if public:
        print("Icons")
        check_icons(public, failures)
        print("Pages named in the checks are not redirects")
        check_no_redirects(public, failures)
        print("Theme assets")
        check_no_theme(public, failures)
        print("Embeds load on request")
        check_on_request(public, failures)

    # Each section opens its own pages, so sections run side by side, each with its own browser
    # and server. The longest are split into parts and start first.
    # The floating controls take longest, so they go first, one section per width.
    sections = [(f"Floating controls at {width} px", "check_floating_controls", ((width,),)) for width in FLOATING_WIDTHS]
    if public:
        paths = article_paths(public)
        print(f"Every article page: {len(paths)} pages", flush=True)
        shards = max(1, 2 * args.jobs)
        sections += [(f"Every article page, part {i + 1} of {shards}", "check_articles", (paths[i::shards],))
                     for i in range(shards) if paths[i::shards]]
    sections += [
        ("Screens", "check_screens", ()),
        ("Breakpoints and enlarged text", "check_other_widths", ()),
    ]
    if public:
        sections.append(("Call-outs", "check_callouts", (public,)))
    sections += [
        ("Sample pages", "check_samples", ()),
        ("Reading on a phone", "check_phone_reading", ()),
        ("Directory widths", "check_directory_widths", ()),
        ("Specialist resources on cluster pages", "check_specialist_cards", ()),
        ("Clusters map", "check_clusters_map", ()),
        ("Conference programme", "check_conference", ()),
        ("Final review fixes", "check_review_pages", ()),
        ("Contributor network", "check_contributor_network", ()),
        ("Resources directory", "check_directory", ()),
    ]
    jobs = [(title, name, extra, public, url, args.base, args.browser) for title, name, extra in sections]
    if args.jobs > 1:
        with concurrent.futures.ProcessPoolExecutor(args.jobs, mp_context=multiprocessing.get_context("spawn")) as pool:
            futures = [pool.submit(run_section, job) for job in jobs]
            results = []
            for job, future in zip(jobs, futures):
                try:
                    results.append(future.result())
                except Exception as error:  # The worker itself died.
                    results.append((job[0], "", [f"{job[0]}: the check stopped with an error: {str(error)[:300]}"], 0, None))
    else:
        results = [run_section(job) for job in jobs]
    invited = set()
    for title, output, found, seconds, value in results:
        print(f"{title} ({seconds:.0f} s)")
        print(output, end="", flush=True)
        failures += found
        if title.startswith("Floating controls"):
            invited |= value or set()
    # The invitation is to stay (decision D19), so it must show somewhere.
    expectation(failures, "floating controls")(
        invited, f"the invitation shows where there is room for it ({', '.join(sorted(invited)[:3]) or 'nowhere'})")

    # These measure timing (a throttled phone, pauses, page weight), so they run alone.
    alone = [("Home page", "check_home", ())]
    if public and args.browser == "chromium":
        alone.append(("Budgets, report only", "report_budgets", (public, args.base)))
    for title, name, extra in alone:
        title, output, found, seconds, _ = run_section((title, name, extra, public, url, args.base, args.browser))
        print(f"{title} ({seconds:.0f} s)")
        print(output, end="", flush=True)
        failures += found
    print(json.dumps({"failures": failures}, indent=1))
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
