#!/usr/bin/env python3
"""Check the designed screens in a browser, against the Doors acceptance checklist.

Run: python3 scripts/rebrand/check_design.py <public-dir> [--base /]
     python3 scripts/rebrand/check_design.py --url https://forrt.org/rebrand-doors/

Needs Playwright. Covers what a build comparison cannot: nothing runs wider than the screen,
no italic type outside references, reading lines under 80 characters, the home page's topic
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

from playwright.sync_api import sync_playwright

WIDTHS = {390: 844, 1024: 768, 1440: 900}
SCREENS = {
    "home": "",
    "replication hub": "replication-hub/",
    "resources": "resources/",
    "resources page 2": "resources/page/2/",
    "article": "post/2026-01-newsletter/",
}
BLOCK = re.compile(r"googletagmanager|google-analytics|doubleclick|youtube|docs\.google")
A14_LIMIT = {390: 2.5, 1440: 1.6}
SHIFT_LIMIT = 0.1
AUDIT = """() => {
  const main = document.querySelector('main');
  const italic = [];
  for (const el of main.querySelectorAll('*')) {
    if (!el.getClientRects().length || !el.textContent.trim()) continue;
    if (getComputedStyle(el).fontStyle !== 'normal' && !el.closest('.references-list,.csl-bib-body')) {
      italic.push(el.textContent.trim().slice(0, 40));
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
        const box = range.getClientRects()[0];
        if (box) lines[Math.round(box.top / 6)] = (lines[Math.round(box.top / 6)] || 0) + match[0].length;
      }
    }
    return Math.max(0, ...Object.values(lines));
  };
  const long = [...main.querySelectorAll('.reading p,.reading li,.lede,.about-statement p,.forward p')]
    .filter((el) => el.getClientRects().length && lineChars(el) >= 80)
    .map((el) => lineChars(el) + ': ' + el.textContent.trim().slice(0, 40));
  return {
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    italic: italic.slice(0, 5),
    long: long.slice(0, 5),
    h1: document.querySelectorAll('h1').length,
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
    context = browser.new_context(
        viewport={"width": width, "height": WIDTHS.get(width, 900)}, is_mobile=width < 500, has_touch=width < 500, **options
    )
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
            for key, label in (("italic", "italic type"), ("long", "lines of 80 characters or more"), ("broken", "broken images")):
                if found[key]:
                    failures.append(f"{name} at {width}: {label}: {found[key]}")
            if errors:
                failures.append(f"{name} at {width}: script errors: {errors[:2]}")
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
    # Keyboard: Tab order reaches the quotes' button, which appears on focus.
    button = page.locator(".quotes .motion-toggle")
    button.focus()
    expect(page.evaluate("document.querySelector('.quotes .motion-toggle').getBoundingClientRect().width") > 40,
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
    page.context.close()


def check_directory(browser, base, failures):
    expect = expectation(failures, "directory")
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


def report_budgets(browser, base, root, subfolder):
    from capture_pages import weigh

    origin = base[: -len(subfolder.lstrip("/"))] if subfolder != "/" else base
    for name, path, own, third in (
        ("home", "", 550, 190),
        ("resources", "resources/", 300, 190),
        ("replication hub", "replication-hub/", None, 190),
        ("article", "post/2026-01-newsletter/", None, 190),
    ):
        weight = weigh(browser, origin.rstrip("/"), f"{subfolder}{path}", root, subfolder)
        own_budget = f" (budget {own})" if own else ""
        print(
            f"  {name}: {weight['own_kb']} KB own{own_budget}, {weight['third_party_kb']} KB third-party (budget {third}), "
            f"{len(weight['hosts'])} hosts (budget 6), first HTML {weight['by_kind_kb'].get('document', 0)} KB"
        )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public", nargs="?")
    parser.add_argument("--url")
    parser.add_argument("--base", default="/", help="subfolder the build expects to be served from")
    args = parser.parse_args()
    base = args.url.rstrip("/") + "/" if args.url else serve(os.path.abspath(args.public), args.base)
    failures = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        print("Screens")
        check_screens(browser, base, failures)
        print("Home page")
        check_home(browser, base, failures)
        print("Resources directory")
        check_directory(browser, base, failures)
        if args.public:
            print("Budgets, report only")
            report_budgets(browser, base, os.path.abspath(args.public), args.base)
        browser.close()
    print(json.dumps({"failures": failures}, indent=1))
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
