#!/usr/bin/env python3
"""Check the deployed preview in a browser: redirects, links, search, noindex and fonts.

Run: python3 scripts/rebrand/check_preview.py [--url https://forrt.org/rebrand-doors/]
After launch: python3 scripts/rebrand/check_preview.py --production [--url https://forrt.org/]

Needs Playwright. Reads the live preview, so run it after a deploy has finished. It visits
one URL per rule in the 404 page's redirect table, follows a sample of links and assets, runs
a search, and confirms that nothing the preview loads comes from the live site outside the
subfolder and the sister sites, or from Google Fonts. Pages make no request to the newsletter
embed or its dependencies until a visitor opens the form, and then the form works.

With --production it checks the launched site instead: the base must be a site root (forrt.org by
default), sampled pages must carry no noindex, and their canonical URL must sit on that root and
not under /rebrand-doors/. The redirect, link, asset, search and newsletter checks are the same.
"""

import argparse
import json
import os
import re
import sys
from urllib.parse import urlsplit

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from preview_paths import load_sister_sites  # noqa: E402

# Retired path under the preview -> where it should land. A leading "//" names a path at the
# domain root, for the repo renames, whose sites live outside the preview.
REDIRECTS = {
    "glossary/vbeta/abstract_bias/": "glossary/english/abstract_bias",
    "glossary/vbeta/no-such-term/": "glossary/english/",
    "glossary/vbeta/": "glossary/english/",
    "curated_resources/no-such-resource/": "resources/",
    "curated_resources/page/3/": "resources/",
    "forrt_clusters/academic-life-and-culture/page/2/": "forrt_clusters/academic-life-and-culture/",
    "tag/": "tags/",
    "tag/open-science/": "tags/?tag=open-science",
    "glossary/english/no-such-term/": "glossary/english/",
    "author/someone/": "contributors/",
    "summaries/no-such-summary/": "",
    "reversals/no-such-reversal/": "",
    "re-searchterms": "apps/re-searchterms.html",
    "FReD/": "//fred",
    "FReD-apps/": "//fred-apps",
    "flora_zotero/": "//flora-zotero",
    "LoveReplicationsWeek/": "//love-replications-week",
    "plugin_notification_dummy/": "//plugin-notification-dummy",
    "replication_handbook/": "//replication-handbook",
    "TenureRun/": "//tenure-run",
    "Transform-to-Open-Science-Book/": "//transform-to-open-science-book",
}
PREVIEW_URL = "https://forrt.org/rebrand-doors/"
SITE_URL = "https://forrt.org/"
BLOCK = re.compile(r"googletagmanager|google-analytics|doubleclick|youtube")
# The newsletter embed and what it pulls in. None of these may load until a visitor clicks.
EMBED_HOSTS = ("eocampaign1.com", "eo.page", "fonts.googleapis.com", "fonts.gstatic.com")
EMBED_URLS = re.compile(r"https://www\.(google\.com|gstatic\.com)/recaptcha/")


def embed_request(request, frame):
    """True for a main-frame request to the newsletter embed or a dependency of it."""
    # Embedded third-party frames, such as Google Forms, load their own fonts and captchas.
    if request.frame != frame:
        return False
    host = urlsplit(request.url).hostname or ""
    return any(host == name or host.endswith("." + name) for name in EMBED_HOSTS) or bool(EMBED_URLS.match(request.url))


def resolve_base(url, production):
    """The base URL with one trailing slash. Production defaults to the site and must be a root."""
    base = (url or (SITE_URL if production else PREVIEW_URL)).rstrip("/") + "/"
    if production and urlsplit(base).path != "/":
        raise ValueError(f"--production checks a site root, not {base}")
    return base


def robots_problem(sample, robots, production):
    """The preview must carry noindex; the launched site must not."""
    if production:
        return f"{sample} has noindex ({robots})" if "noindex" in robots else None
    return None if "noindex" in robots else f"{sample} has no noindex"


def canonical_problem(sample, canonical, base):
    """Production only: the canonical URL sits on the site root and outside the preview."""
    if not canonical:
        return f"{sample} has no canonical URL"
    if not canonical.startswith(base) or "/rebrand-doors/" in canonical:
        return f"{sample} has canonical {canonical}, outside {base}"
    return None


def redirect_target(base, expected):
    """The path a retired URL should land on. A leading "//" names a path at the domain root."""
    return expected[1:] if expected.startswith("//") else urlsplit(base).path + expected


def production_expectation(path, expected, sisters):
    """On forrt.org a sister site's own repository answers before the 404 page, so a retired path
    that starts with a sister site's name lands on that site rather than on the preview's rule."""
    first = path.strip("/").split("/")[0]
    return "//" + first if first in sisters else expected


def off_origin(url, base):
    """True for an absolute URL on another scheme or host than the base. Relative URLs stay on it."""
    parts, root = urlsplit(url), urlsplit(base)
    return bool(parts.netloc) and (parts.scheme, parts.netloc) != (root.scheme, root.netloc)


def redirect_ok(landed, want, expected):
    ok = landed.rstrip("/") == want.rstrip("/")
    # A sister site may forward within itself once it has been reached.
    if expected.startswith("//"):
        ok = ok or landed.startswith(want.rstrip("/") + "/")
    return ok


def check_redirects(browser, base, failures, production=False):
    sisters = load_sister_sites()
    context = browser.new_context()
    page = context.new_page()
    page.route("**/*", lambda route: route.abort() if BLOCK.search(route.request.url) else route.continue_())
    for path, expected in REDIRECTS.items():
        if production:
            expected = production_expectation(path, expected, sisters)
        page.goto(base + path, wait_until="load", timeout=60000)
        try:
            page.wait_for_url(lambda url: not url.rstrip("/").endswith(path.rstrip("/")), timeout=6000)
        except Exception:
            pass
        landed = urlsplit(page.url).path
        if "?" in expected:
            landed += "?" + urlsplit(page.url).query
        want = redirect_target(base, expected)
        ok = redirect_ok(landed, want, expected)
        if production and off_origin(page.url, base):
            ok, landed = False, page.url
        print(f"  {'ok ' if ok else 'BAD'} {path} -> {landed}")
        if not ok:
            failures.append(f"redirect {path} landed on {landed}, wanted {want}")
    context.close()


def check_links_assets(browser, base, failures, production=False):
    sisters = load_sister_sites()
    root = urlsplit(base).path
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()
    outside, embed = [], []

    def note(request):
        parts = urlsplit(request.url)
        if embed_request(request, page.main_frame):
            embed.append(request.url)
        if parts.hostname in ("forrt.org", "www.forrt.org") and not parts.path.startswith(root):
            if parts.path.strip("/").split("/")[0] not in sisters:
                outside.append(request.url)

    page.on("request", note)
    page.route("**/*", lambda route: route.abort() if BLOCK.search(route.request.url) else route.continue_())
    samples = ["", "about/us/", "glossary/english/abstract_bias/", "resources/", "clusters/", "publications/",
               "newsletters/", "about/get-involved/", "nexus/"]
    for sample in samples:
        response = page.goto(base + sample, wait_until="load", timeout=120000)
        page.wait_for_timeout(800)
        robots = page.evaluate("document.querySelector('meta[name=robots]')?.content || ''")
        canonical = page.evaluate("document.querySelector('link[rel=canonical]')?.href || ''")
        broken_images = page.evaluate(
            "[...document.images].filter(i=>i.complete&&!i.naturalWidth&&i.src.includes('forrt.org')).map(i=>i.src)"
        )
        print(f"  {sample or '(home)'}: {response.status}, robots={robots!r}, broken images {len(broken_images)}"
              + (f", canonical {canonical}" if production else ""))
        if response.status != 200:
            failures.append(f"{sample} returned {response.status}")
        problems = [robots_problem(sample, robots, production)]
        if production:
            problems.append(canonical_problem(sample, canonical, base))
        failures.extend(problem for problem in problems if problem)
        failures.extend(f"{sample}: broken image {src}" for src in broken_images)
    if embed:
        failures.append(f"newsletter embed or Google Fonts requests before any click: {sorted(set(embed))[:3]}")
    if outside:
        failures.append(f"requests to the live site: {sorted(set(outside))[:5]}")

    # A sample of links from the home page's header, footer and body.
    page.goto(base, wait_until="load")
    links = page.evaluate(
        "[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.href))]"
        ".filter(h=>h.startsWith(location.origin)).slice(0,250)"
    )
    print(f"  Same-site links on the home page: {len(links)}")
    live = [link for link in links if not urlsplit(link).path.startswith(root)
            and urlsplit(link).path.strip("/").split("/")[0] not in sisters]
    if live:
        failures.append(f"home page links to the live site: {live[:5]}")
    bad = []
    for link in links:
        if not urlsplit(link).path.startswith(root):
            continue
        status = page.request.head(link.split("#")[0], max_redirects=5).status
        if status >= 400:
            bad.append(f"{status} {link}")
    print(f"  Checked {len(links)} links, {len(bad)} failed")
    failures.extend(f"home page link {item}" for item in bad)
    context.close()


def check_newsletter(browser, base, failures):
    """The form loads on a click and not before, and shows EmailOctopus's badge."""
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()
    page.route("**/*", lambda route: route.abort() if BLOCK.search(route.request.url) else route.continue_())
    seen = []
    page.on("request", lambda request: seen.append(request.url) if embed_request(request, page.main_frame) else None)
    page.goto(base + "newsletters/", wait_until="load", timeout=120000)
    page.wait_for_timeout(1500)
    if seen:
        failures.append(f"newsletter page loaded the embed before a click: {seen[:3]}")
    try:
        page.click(".newsletter-open", timeout=10000)
        page.wait_for_selector(".newsletter-form .emailoctopus-form input[type=email]", timeout=30000)
        if not page.locator('.newsletter-form .mastfoot a[href*="emailoctopus.com"]').is_visible():
            failures.append("newsletter form: the Powered by EmailOctopus badge is not visible")
        if page.locator(".newsletter-open").count():
            failures.append("newsletter form: the button is still there after the form loaded")
        focused = page.evaluate("document.activeElement?.type")
        print(f"  Form opened; focus on {focused}; requests after the click: {len(seen)}")
        if focused != "email":
            failures.append(f"newsletter form: focus went to {focused}, not the email field")
    except Exception as error:
        failures.append(f"newsletter form did not appear after a click: {str(error)[:200]}")
    context.close()


def check_search(browser, base, failures, production=False):
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()
    page.route("**/*", lambda route: route.abort() if BLOCK.search(route.request.url) else route.continue_())
    index_requests = []
    page.on("request", lambda request: index_requests.append(request.url) if "index.json" in request.url else None)
    page.goto(base, wait_until="load")
    page.wait_for_timeout(1500)
    if index_requests:
        failures.append("search index loaded before search was used")
    page.fill("#site-search", "preregistration")
    page.keyboard.press("Enter")
    page.wait_for_selector(".search-hit", timeout=60000)
    first = page.locator(".search-hit a").first.get_attribute("href")
    count = page.locator(".search-hit").count()
    print(f"  Search: {count} hits, first {first}")
    if not first or not urlsplit(first).path.startswith(urlsplit(base).path) or (production and off_origin(first, base)):
        failures.append(f"search result outside the preview: {first}")
    if page.request.get(page.url.split("?")[0]).status != 200:
        failures.append("search page did not load")
    context.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", help=f"base URL (default {PREVIEW_URL}, or {SITE_URL} with --production)")
    parser.add_argument("--production", action="store_true",
                        help="check the launched site: a site root, no noindex, canonical URLs on that root")
    args = parser.parse_args()
    try:
        base = resolve_base(args.url, args.production)
    except ValueError as error:
        parser.error(str(error))
    failures = []
    from playwright.sync_api import sync_playwright

    checks = [
        ("Redirects", lambda browser: check_redirects(browser, base, failures, args.production)),
        ("Links, assets, noindex" + (", canonical" if args.production else ""),
         lambda browser: check_links_assets(browser, base, failures, args.production)),
        ("Newsletter", lambda browser: check_newsletter(browser, base, failures)),
        ("Search", lambda browser: check_search(browser, base, failures, args.production)),
    ]
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for title, check in checks:
            print(title)
            try:
                check(browser)
            except Exception as error:
                # On launch day one missing element should not hide the other results.
                if not args.production:
                    raise
                message = (str(error).splitlines() or [type(error).__name__])[0]
                failures.append(f"{title} stopped: {message[:200]}")
        browser.close()
    print(json.dumps({"failures": failures}, indent=1))
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
