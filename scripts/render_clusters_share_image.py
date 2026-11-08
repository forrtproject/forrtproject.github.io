#!/usr/bin/env python3
"""Render the clusters map (layouts/partials/clusters/map.html) as the /clusters/ share image.

Run after the clusters change: build the site, then
    python3 scripts/render_clusters_share_image.py <build-dir>
It writes content/clusters/FORRT_Clusters.webp (1200x630), the page's sharing_image_resource;
the build turns it into a PNG for social previews. Needs Playwright with Chromium.
"""
import functools
import http.server
import sys
import threading
from io import BytesIO
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "content/clusters/FORRT_Clusters.webp"

ISOLATE = """() => {
  const map = document.querySelector('.clusters-map').cloneNode(true);
  const title = document.querySelector('h1').cloneNode(true);
  document.body.innerHTML = '';
  const main = document.createElement('main');
  main.style.cssText = 'padding:36px 56px;width:1200px;box-sizing:border-box';
  title.style.margin = '0';
  main.append(title, map);
  document.body.append(main);
}"""


def main(build):
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=build)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
            page.goto(f"http://127.0.0.1:{server.server_port}/clusters/", wait_until="networkidle")
            page.evaluate(ISOLATE)
            page.wait_for_timeout(300)
            png = page.screenshot(clip={"x": 0, "y": 0, "width": 1200, "height": 630})
            browser.close()
    finally:
        server.shutdown()
    Image.open(BytesIO(png)).convert("RGB").save(OUT, "WEBP", quality=90, method=6)
    print("wrote", OUT.relative_to(ROOT))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
