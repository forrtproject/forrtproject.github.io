#!/usr/bin/env python3
"""Screenshot pages at phone and desktop size for design review.

Run: python3 scripts/rebrand/screenshot_pages.py <public-dir | http(s)://site/> --out <dir>
     [--pages "home,cluster"] [--paths /about/us/,/glossary/] [--max-height 7200]

The first argument is either a built site, which is served locally, or the address of a
running site such as `hugo server` or the preview (https://forrt.org/rebrand-doors/).
Pages default to `sample_pages.json`. Each page is shot at 390 x 844 (phone, at 2x) and
1440 x 900 (desktop), with reduced motion, analytics blocked and the cookie banner
already answered (`--cookie-banner` shows it). The shot runs to the end of
the page, up to `--max-height` CSS pixels, and is cut into tiles about two screens tall so that
a reviewer, human or model, sees the text at full size. Tiles are JPEGs named
`<page>-<mobile|desktop>-<n>.jpg`; `manifest.json` lists them with each page's address,
height and sideways overflow.

Needs Playwright and Pillow (`pip install playwright pillow`, `playwright install chromium`).
"""

import argparse
import functools
import http.server
import io
import json
import os
import re
import threading

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
SIZES = {
    "mobile": {"width": 390, "height": 844, "scale": 2},
    "desktop": {"width": 1440, "height": 900, "scale": 1},
}
BLOCKED = re.compile(r"googletagmanager|google-analytics|doubleclick|youtube|eocampaign|eo\.page|docs\.google")


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve(root):
    handler = functools.partial(QuietHandler, directory=root)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, f"http://127.0.0.1:{server.server_address[1]}/"


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "page"


def shoot(browser, url, size, max_height, banner):
    context = browser.new_context(
        viewport={"width": size["width"], "height": size["height"]},
        device_scale_factor=size["scale"], reduced_motion="reduce",
        is_mobile=size["width"] < 600, has_touch=size["width"] < 600)
    if not banner:  # answer the cookie banner as a returning visitor would have
        context.add_cookies([{"name": "forrt_analytics_choice", "value": "deny", "url": url}])
    page = context.new_page()
    page.route("**/*", lambda route: route.abort() if BLOCKED.search(route.request.url) else route.continue_())
    page.goto(url, wait_until="load", timeout=120000)
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(800)
    page.wait_for_load_state("load")  # some pages forward themselves by script
    # Scroll through once so lazy images load, then back to the top.
    page.evaluate("""async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
            scrollTo(0, y); await new Promise(r => setTimeout(r, 60));
        }
        scrollTo(0, 0);
    }""")
    page.wait_for_timeout(400)
    overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    height = page.evaluate("document.documentElement.scrollHeight")
    clip_height = min(height, max_height)
    raw = page.screenshot(full_page=True, clip={"x": 0, "y": 0, "width": size["width"], "height": clip_height})
    context.close()
    return Image.open(io.BytesIO(raw)).convert("RGB"), height, overflow


def tiles(image, tile_px):
    """Cut a tall image into tiles; a short last piece joins the one before it."""
    bounds, top = [], 0
    while top < image.height:
        bottom = top + tile_px
        if image.height - bottom < tile_px // 3:
            bottom = image.height
        bounds.append((top, bottom))
        top = bottom
    return [image.crop((0, a, image.width, b)) for a, b in bounds]


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("site", help="built site directory, or the address of a running site")
    parser.add_argument("--out", required=True)
    parser.add_argument("--pages", help="comma-separated names from sample_pages.json")
    parser.add_argument("--paths", help="comma-separated paths to shoot instead of sample_pages.json")
    parser.add_argument("--sizes", default="mobile,desktop", help="mobile, desktop or both")
    parser.add_argument("--max-height", type=int, default=7200, help="CSS pixels shot per page")
    parser.add_argument("--quality", type=int, default=78)
    parser.add_argument("--cookie-banner", action="store_true", help="show the cookie banner")
    args = parser.parse_args()

    if args.paths:
        samples = {path.strip("/") or "home": path for path in args.paths.split(",")}
    else:
        with open(os.path.join(HERE, "sample_pages.json"), encoding="utf-8") as handle:
            samples = json.load(handle)
        if args.pages:
            wanted = [name.strip() for name in args.pages.split(",")]
            missing = [name for name in wanted if name not in samples]
            if missing:
                parser.error(f"not in sample_pages.json: {', '.join(missing)}")
            samples = {name: samples[name] for name in wanted}

    server = None
    if re.match(r"https?://", args.site):
        origin = args.site.rstrip("/") + "/"
    else:
        server, origin = serve(os.path.abspath(args.site))
    os.makedirs(args.out, exist_ok=True)

    manifest = {}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for name, path in samples.items():
            entry = {"path": path}
            for size_name in args.sizes.split(","):
                size = SIZES[size_name]
                image, height, overflow = shoot(browser, origin + path.lstrip("/"), size, args.max_height,
                                                args.cookie_banner)
                files = []
                for number, tile in enumerate(tiles(image, 2 * size["height"] * size["scale"]), 1):
                    filename = f"{slug(name)}-{size_name}-{number}.jpg"
                    tile.save(os.path.join(args.out, filename), "JPEG", quality=args.quality, optimize=True)
                    files.append(filename)
                entry[size_name] = {"height": height, "cut_off": height > args.max_height,
                                    "overflow_px": overflow, "tiles": files}
            manifest[name] = entry
            print(f"{name}: " + ", ".join(
                f"{key} {len(entry[key]['tiles'])} tiles" for key in SIZES if key in entry), flush=True)
        browser.close()
    if server:
        server.shutdown()
    with open(os.path.join(args.out, "manifest.json"), "w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=1, ensure_ascii=False)
        handle.write("\n")


if __name__ == "__main__":
    main()
