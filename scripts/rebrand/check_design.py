#!/usr/bin/env python3
"""Check the designed screens in a browser, against the Doors acceptance checklist.

Run: python3 scripts/rebrand/check_design.py <public-dir> [--base /]
     python3 scripts/rebrand/check_design.py --url https://forrt.org/rebrand-doors/

Needs Playwright. Covers what a build comparison cannot: nothing runs wider than the screen,
no italic type outside references, reading lines under 80 characters, the home page's topic
buttons within their position limit (checklist A14), its layout shift, and the behaviour of the
resources directory.
"""

import argparse
import functools
import http.server
import json
import os
import re
import sys
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


def serve(root):
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=root))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return f"http://127.0.0.1:{server.server_address[1]}/"


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


def check_directory(browser, base, failures):
    def expect(condition, message):
        print(f"  {'ok ' if condition else 'BAD'} {message}")
        if not condition:
            failures.append(f"directory: {message}")

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


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public", nargs="?")
    parser.add_argument("--url")
    args = parser.parse_args()
    base = args.url.rstrip("/") + "/" if args.url else serve(os.path.abspath(args.public))
    failures = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        print("Screens")
        check_screens(browser, base, failures)
        print("Resources directory")
        check_directory(browser, base, failures)
        browser.close()
    print(json.dumps({"failures": failures}, indent=1))
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
