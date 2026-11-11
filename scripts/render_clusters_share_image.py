#!/usr/bin/env python3
"""Render the clusters illustration (layouts/partials/clusters/map.html) as the /clusters/ share image.

Run after the clusters change: build the site, then
    python3 scripts/render_clusters_share_image.py <build-dir>
It writes content/clusters/FORRT_Clusters.webp (1200x630), the page's sharing_image_resource;
the build turns it into a PNG for social previews.

Needs Playwright and Pillow: `pip install playwright pillow`, then `python3 -m playwright install chromium`.
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
  const art = document.querySelector('.clusters-map__art').cloneNode(true);
  const clusters = art.querySelectorAll('.clusters-map__cluster').length;
  const pills = art.querySelectorAll('.clusters-map__pill').length;
  const head = document.createElement('div');
  head.className = 'clusters-head';  // keeps the page's heading style
  const h1 = document.querySelector('h1').cloneNode(true);
  h1.style.margin = '0 0 16px';
  const line = document.createElement('p');
  line.textContent = `${clusters} clusters, ${pills} sub-clusters`;
  line.style.cssText = 'margin:0;font-size:26px;color:var(--soft)';
  head.append(h1, line);
  head.style.cssText = 'flex:0 0 300px';
  art.removeAttribute('width');
  art.removeAttribute('height');
  art.style.cssText = 'height:600px;width:auto;flex:none;margin-left:auto';
  document.body.innerHTML = '';
  const main = document.createElement('main');
  main.style.cssText = 'display:flex;align-items:center;gap:24px;padding:15px 30px 15px 50px;width:1200px;height:630px;box-sizing:border-box;overflow:hidden';
  main.append(head, art);
  document.body.append(main);
  return Promise.all([document.fonts.ready, ...[...art.querySelectorAll('image')].map((img) =>
    new Promise((done) => { const probe = new Image(); probe.onload = probe.onerror = done; probe.src = img.href.baseVal; }))]);
}"""


def main(build):
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=build)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=2)  # drawn at twice the size, then scaled down
            page.goto(f"http://127.0.0.1:{server.server_port}/clusters/", wait_until="networkidle")
            page.evaluate(ISOLATE)
            page.wait_for_timeout(300)
            png = page.screenshot(clip={"x": 0, "y": 0, "width": 1200, "height": 630})
            browser.close()
    finally:
        server.shutdown()
    image = Image.open(BytesIO(png)).convert("RGB").resize((1200, 630), Image.LANCZOS)
    image.save(OUT, "WEBP", quality=90, method=6)
    print("wrote", OUT.relative_to(ROOT))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
