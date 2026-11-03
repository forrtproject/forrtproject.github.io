#!/usr/bin/env python3
"""Screenshot and weigh the sample pages of a built site, one per template.

Run: python3 scripts/rebrand/capture_pages.py <public-dir> --out <dir> [--base /]
     [--widths 390,1024,1440] [--no-shots] [--pages "home,cluster"]

Needs Playwright (`pip install playwright pillow`, `playwright install chromium`). Serves
the build locally and writes weights.json plus WebP screenshots. Our own files are counted
at their gzip size, as GitHub Pages serves them, and third-party files at their transfer
size. Analytics and other third parties load as normal for weighing and are blocked for
screenshots, so a slow script cannot change the picture. Each page is also checked for
console errors, failed requests and sideways overflow.
"""

import argparse
import functools
import gzip
import http.server
import io
import json
import os
import re
import threading
from urllib.parse import urlsplit

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
SHOT_MAX_HEIGHT = 6000
KINDS = {"document", "stylesheet", "script", "image", "font"}


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve(root):
    handler = functools.partial(QuietHandler, directory=root)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, server.server_address[1]


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def weigh(browser, origin, url, root, base):
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()
    cdp = context.new_cdp_session(page)
    cdp.send("Network.enable")
    encoded, kinds, urls = {}, {}, {}
    cdp.on("Network.requestWillBeSent", lambda e: urls.update({e["requestId"]: e["request"]["url"]}))
    cdp.on("Network.responseReceived", lambda e: kinds.update({e["requestId"]: e["type"].lower()}))
    cdp.on("Network.loadingFinished", lambda e: encoded.update({e["requestId"]: e["encodedDataLength"]}))
    errors, failed = [], []
    page.on("pageerror", lambda e: errors.append(str(e)[:300]))
    page.on("requestfailed", lambda r: failed.append(r.url[:200]))
    page.on("response", lambda r: failed.append(f"{r.status} {r.url[:200]}") if r.status >= 400 else None)
    page.goto(origin + url, wait_until="load", timeout=120000)
    page.wait_for_timeout(2500)
    page.wait_for_load_state("load")
    domain_bytes = {"own": 0, "third_party": 0}
    by_kind = {}
    hosts = set()
    for rid, size in encoded.items():
        address = urls.get(rid, "")
        if not address.startswith("http"):
            continue
        parts = urlsplit(address)
        hosts.add(parts.hostname)
        if address.startswith(origin):
            rel = parts.path[len(base):] if parts.path.startswith(base) else parts.path.lstrip("/")
            local = os.path.join(root, rel or "index.html")
            if os.path.isdir(local):
                local = os.path.join(local, "index.html")
            try:
                with open(local, "rb") as handle:
                    size = len(gzip.compress(handle.read(), 6))
            except OSError:
                continue
            domain_bytes["own"] += size
        else:
            domain_bytes["third_party"] += size
        kind = kinds.get(rid, "other")
        kind = kind if kind in KINDS else "other"
        by_kind[kind] = by_kind.get(kind, 0) + size
    dom = page.evaluate("document.getElementsByTagName('*').length")
    context.close()
    return {
        "requests": len(encoded),
        "own_kb": round(domain_bytes["own"] / 1000),
        "third_party_kb": round(domain_bytes["third_party"] / 1000),
        "by_kind_kb": {key: round(value / 1000) for key, value in sorted(by_kind.items())},
        "hosts": sorted(host.replace("127.0.0.1", "(this site)") for host in hosts if host),
        "dom_elements": dom,
        "js_errors": errors,
        "failed_requests": failed[:20],
    }


def screenshot(browser, origin, url, widths, out, name):
    overflow = {}
    for width in widths:
        context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce")
        page = context.new_page()
        page.route("**/*", lambda route: route.abort() if re.search(
            r"googletagmanager|google-analytics|doubleclick|youtube|eocampaign|eo\.page|docs\.google",
            route.request.url) else route.continue_())
        page.goto(origin + url, wait_until="load", timeout=120000)
        page.wait_for_timeout(1200)
        # Some pages forward themselves by script, so let any navigation finish first.
        page.wait_for_load_state("load")
        overflow[str(width)] = page.evaluate(
            "document.documentElement.scrollWidth - document.documentElement.clientWidth")
        height = min(page.evaluate("document.documentElement.scrollHeight"), SHOT_MAX_HEIGHT)
        raw = page.screenshot(clip={"x": 0, "y": 0, "width": width, "height": height}, full_page=True)
        Image.open(io.BytesIO(raw)).convert("RGB").save(
            os.path.join(out, f"{name}-{width}.webp"), "WEBP", quality=60, method=4)
        context.close()
    return overflow


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public")
    parser.add_argument("--out", required=True)
    parser.add_argument("--base", default="/", help="subfolder the build expects to be served from")
    parser.add_argument("--widths", default="390,1024,1440")
    parser.add_argument("--no-shots", action="store_true")
    parser.add_argument("--pages", help="comma-separated names from sample_pages.json")
    args = parser.parse_args()

    with open(os.path.join(HERE, "sample_pages.json"), encoding="utf-8") as handle:
        samples = json.load(handle)
    if args.pages:
        wanted = args.pages.split(",")
        samples = {key: value for key, value in samples.items() if key in wanted}
    widths = [int(width) for width in args.widths.split(",")]
    os.makedirs(args.out, exist_ok=True)

    # A subfolder build is served from a parent directory that links to it.
    root = os.path.abspath(args.public)
    base = "/" + args.base.strip("/") + "/" if args.base.strip("/") else "/"
    serve_root = root
    if base != "/":
        serve_root = os.path.join(args.out, ".serve")
        os.makedirs(serve_root, exist_ok=True)
        link = os.path.join(serve_root, base.strip("/"))
        if not os.path.islink(link):
            os.symlink(root, link)
    server, port = serve(serve_root)
    origin = f"http://127.0.0.1:{port}"

    results = {}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for name, url in samples.items():
            full = base + url.lstrip("/")
            entry = weigh(browser, origin, full, root, base)
            entry["url"] = url
            if not args.no_shots:
                entry["overflow_px"] = screenshot(browser, origin, full, widths, args.out, slug(name))
            results[name] = entry
            print(f"{name}: {entry['own_kb']} KB own + {entry['third_party_kb']} KB third-party, "
                  f"{entry['requests']} requests, {len(entry['js_errors'])} JS errors", flush=True)
        browser.close()
    server.shutdown()
    with open(os.path.join(args.out, "weights.json"), "w", encoding="utf-8") as handle:
        json.dump(results, handle, indent=1, ensure_ascii=False)
        handle.write("\n")


if __name__ == "__main__":
    main()
