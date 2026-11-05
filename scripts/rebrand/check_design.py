#!/usr/bin/env python3
"""Check the designed screens in a browser, against the Doors acceptance checklist.

Run: python3 scripts/rebrand/check_design.py <public-dir> [--base /]
     python3 scripts/rebrand/check_design.py --url https://forrt.org/rebrand-doors/

Needs Playwright. Covers what a build comparison cannot: nothing runs wider than the screen,
no italic type outside references, reading lines under 80 characters, no page's own button
hidden, the sample pages' width as well as the designed screens', the home page's topic
buttons within their position limit (checklist A14), its layout shift on a slow phone, the pause
control over the castle and the quotes, and the behaviour of the resources directory. On a local build it also weighs the designed screens against the migration
plan's budgets. Those lines are a report and do not fail the check, because the theme's Bootstrap,
jQuery and Font Awesome stay until Phase 3.
"""

import argparse
import functools
import http.server
import json
import os
import re
import sys
import tempfile
import threading
from urllib.parse import urlsplit

from playwright.sync_api import Error as PlaywrightError, sync_playwright

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
    const reference = el.closest('.references-list,.csl-bib-body') || el.matches(':is(h2,h3,h4)[id^=references i]~:is(ul,ol,p) *');
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
      for (const match of node.textContent.matchAll(/\\S+\\s*/g)) {
        const range = document.createRange();
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        // A long address can break across lines, so share its characters out by rendered width.
        const boxes = [...range.getClientRects()].filter((box) => box.width > 0);
        const total = boxes.reduce((sum, box) => sum + box.width, 0);
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
  const long = [...main.querySelectorAll('.reading p,.reading li,.lede,.about-statement p,.forward p')]
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


def check_articles(browser, base, root, failures):
    """The reading layout across its pages: content varies more than the layout does."""
    paths = article_paths(root)
    print(f"  {len(paths)} pages")
    for width in WIDTHS:
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
    """Call-outs sit in the right-hand column on wide screens, clear of each other, and in the text on narrow ones."""
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
  if (innerWidth > 1000) {
    const boxes = card ? [card, ...notes] : notes;
    if (notes.some((box) => box.left < area.right)) problems.push('over the text');
    if (notes.some((box) => box.right > innerWidth)) problems.push('off the screen');
    if (boxes.some((a, i) => boxes.slice(i + 1).some((b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom))) problems.push('overlaps the card or another call-out');
  } else {
    if (notes.some((box) => box.left < area.left - 1 || box.right > area.right + 1)) problems.push('outside the text column');
    if (card && card.height && card.top < area.bottom) problems.push('card comes before the text');
  }
  return problems;
}"""


# From a page's text to the card beside it, when they are side by side.
CARD_GAP = """() => {
  const reading = document.querySelector('.article-layout>.reading');
  const card = document.querySelector('.article-layout>.article-card');
  if (!reading || !card) return 0;
  const box = card.getBoundingClientRect();
  if (box.top > reading.getBoundingClientRect().bottom) return 0;
  const lines = [...reading.querySelectorAll('.article-style p')].filter((p) => p.getClientRects().length);
  const right = Math.max(...(lines.length ? lines : [reading]).map((el) => el.getBoundingClientRect().right));
  return box.left < right ? 0 : box.left - right;
}"""
CARD_GAP_LIMIT = 80


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
    """Nothing runs wider than the screen or hides a button on the sample pages, with their retained
    templates too."""
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
    expect(page.evaluate("document.querySelector('.tower .motion-toggle').getBoundingClientRect().width") <= 1,
           "the castle's pause button is out of sight at rest")
    page.evaluate("document.querySelector('.quotes').scrollIntoView({block:'center'})")
    page.mouse.move(2, 2)
    first = page.evaluate(current)
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) != first, "the quotes change on their own")
    held = page.evaluate(current)
    page.hover(".quote.is-active")
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) == held, "a pointer on the quotes holds them")
    page.mouse.move(2, 2)
    page.evaluate("scrollTo(0, 0)")
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) == held, "the quotes stay put off screen")
    page.evaluate("document.querySelector('.quotes').scrollIntoView({block:'center'})")
    page.wait_for_timeout(6500)
    expect(page.evaluate(current) != held, "the quotes resume when seen again")
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
    """On a phone the chat launcher stays in the gutter, and an embed's panel is not clipped."""
    expect = expectation(failures, "phone reading")
    page = new_page(browser, 390)
    page.goto(base + "glossary/english/abstract_bias/", wait_until="load")
    page.wait_for_timeout(300)
    page.evaluate("scrollBy(0, 500)")
    page.wait_for_timeout(500)
    shown = page.evaluate("innerWidth - document.getElementById('just-os-btn').getBoundingClientRect().left")
    expect(shown <= 24, f"the launcher takes {shown:.0f} px of the screen's width, limit 24")
    page.locator("#just-os-btn").tap()
    page.wait_for_timeout(3000)
    expect(page.evaluate("document.getElementById('just-os-window')?.style.display === 'flex'"), "tapping the tab opens the chat")
    page.goto(base + "neurodiversity-lessonbank/implicit_bias/", wait_until="load")
    page.wait_for_timeout(300)
    panels = page.locator(".click-to-load").count()
    expect(panels > 0, f"the lesson page has embed panels ({panels})")
    clipped = page.evaluate("""[...document.querySelectorAll('.click-to-load')].filter((panel) =>
      panel.parentElement && getComputedStyle(panel.parentElement).overflow === 'hidden'
      && panel.getBoundingClientRect().height > panel.parentElement.getBoundingClientRect().height + 1).length""")
    expect(clipped == 0, f"{clipped} embed panels clipped by their box")
    page.context.close()
    for width in (390, 1024, 1440):
        page = new_page(browser, width)
        page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])  # Banner shut.
        page.goto(base + "clusters/cluster-1/", wait_until="load")
        page.wait_for_timeout(800)
        page.evaluate("scrollBy(0, 1500)")
        page.wait_for_timeout(800)
        hit = page.evaluate("""() => {
          const box = document.getElementById('just-os-btn').getBoundingClientRect();
          return !!document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)?.closest('#just-os-btn');
        }""")
        expect(page.locator(".clusters-back-to-top.is-visible").count() == 1, f"back to top shows after scrolling at {width} px")
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


# What under the chat launcher has text of its own: the launcher is to rest in the margin, never over the page.
UNDER_LAUNCHER = """() => {
  const box = document.getElementById('just-os-btn').getBoundingClientRect();
  const found = new Set();
  for (let x = box.left + 1; x < box.right; x += 4) for (let y = box.top + 1; y < box.bottom; y += 4) {
    const el = document.elementsFromPoint(x, y).find((e) => !e.closest('#just-os-widget') && e.closest('main')
      && e.tagName !== 'MAIN' && getComputedStyle(e).display !== 'contents' && (e.innerText || '').trim());
    if (el) found.add(`${el.tagName.toLowerCase()} "${el.innerText.trim().slice(0, 30)}"`);
  }
  return [...found];
}"""


def check_launcher_clear(browser, base, failures):
    """On laptops the launcher is a tab in the gutter, and from 1440 px the round button fits the margin."""
    expect = expectation(failures, "chat launcher")
    for width in (1024, 1280, 1440):
        page = new_page(browser, width)
        page.context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": base}])  # Banner shut.
        for path in ("contributors/", "publications/", "about/teams/"):
            page.goto(base + path, wait_until="load")
            page.wait_for_timeout(500)
            under = set()
            for y in (0, 700, 1600):
                page.evaluate(f"scrollTo(0, {y})")
                page.wait_for_timeout(150)
                under.update(page.evaluate(UNDER_LAUNCHER))
            expect(not under, f"the launcher covers nothing on {path} at {width} px{': ' + ', '.join(sorted(under)[:3]) if under else ''}")
        page.context.close()


# Pages of cards or lists, with the element that holds them: a wide screen is not to leave them in the reading column.
DIRECTORIES = {
    "publications/": ".pub-list",
    "about/partnerships/": ".partner-list",
    "contributors/": "#contributor-list",
    "about/community/": ".people-wall",
    "about/teams/": ".feature-rows",
    "educators-corner/": ".list-items",
    "pedagogies/": ".list-items",
    "forrt_clusters/academic-life-and-culture/": ".plain-list",
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
    page.goto(base + "post/2026-01-newsletter/", wait_until="load")
    order = page.evaluate("""() => {
      const link = [...document.querySelectorAll('.article-style a')].find((a) => /newsletter/i.test(a.textContent));
      const image = document.querySelector('.reading .article-image');
      return !!link && !!image && !!(link.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING);
    }""")
    expect(order, "a short news post keeps its image, after its link")
    page.goto(base + "publications/", wait_until="load")
    chart_width, share = page.evaluate("""() => {
      const box = document.querySelector('.citation-container img').getBoundingClientRect();
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
    shown = page.locator(".res").count()
    page.click("#showMore")
    expect(page.locator(".res").count() > shown, "Show more adds cards")
    expect(page.evaluate("document.activeElement.closest('.res') !== null"), "Show more moves focus to the new cards")

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


def report_budgets(browser, base, root, subfolder):
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


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public", nargs="?")
    parser.add_argument("--url")
    parser.add_argument("--base", default="/", help="subfolder the build expects to be served from")
    parser.add_argument("--browser", default="chromium", choices=("chromium", "firefox", "webkit"),
                        help="engine to run in; the throttled layout-shift test and the budgets need Chromium")
    args = parser.parse_args()
    base = args.url.rstrip("/") + "/" if args.url else serve(os.path.abspath(args.public), args.base)
    failures = []
    if args.public:
        print("Icons")
        check_icons(os.path.abspath(args.public), failures)
        print("Theme assets")
        check_no_theme(os.path.abspath(args.public), failures)
        print("Embeds load on request")
        check_on_request(os.path.abspath(args.public), failures)
    with sync_playwright() as playwright:
        browser = getattr(playwright, args.browser).launch()
        print("Screens")
        check_screens(browser, base, failures)
        print("Breakpoints and enlarged text")
        check_other_widths(browser, base, failures)
        if args.public:
            print("Every article page")
            check_articles(browser, base, os.path.abspath(args.public), failures)
            print("Call-outs")
            check_callouts(browser, base, os.path.abspath(args.public), failures)
        print("Sample pages")
        check_samples(browser, base, failures)
        print("Home page")
        check_home(browser, base, failures)
        print("Reading on a phone")
        check_phone_reading(browser, base, failures)
        check_launcher_clear(browser, base, failures)
        check_directory_widths(browser, base, failures)
        print("Conference programme")
        check_conference(browser, base, failures)
        print("Contributor network")
        check_contributor_network(browser, base, failures)
        print("Resources directory")
        check_directory(browser, base, failures)
        if args.public and args.browser == "chromium":
            print("Budgets, report only")
            report_budgets(browser, base, os.path.abspath(args.public), args.base)
        browser.close()
    print(json.dumps({"failures": failures}, indent=1))
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
