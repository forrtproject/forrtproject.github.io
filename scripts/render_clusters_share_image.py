#!/usr/bin/env python3
"""Render the clusters overview (layouts/partials/clusters/map.html) as the /clusters/ share image.

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
  // The overview at rest: every panel shut and every name in place (the page may have opened one).
  const stage = document.querySelector('.clusters-map__stage').cloneNode(true);
  stage.querySelectorAll('.is-open, .is-lit, .is-active').forEach((el) => el.classList.remove('is-open', 'is-lit', 'is-active'));
  stage.classList.remove('is-pointing', 'is-preview');
  stage.querySelectorAll('[style]').forEach((el) => { el.style.translate = ''; el.style.d = ''; });
  stage.querySelectorAll('.clusters-map__line[data-d]').forEach((line) => line.setAttribute('d', line.getAttribute('data-d')));
  stage.style.translate = ''; stage.style.marginBottom = '';
  const clusters = stage.querySelectorAll('.clusters-map__tag').length;
  const subs = stage.querySelectorAll('.clusters-map__panel li').length;
  const head = document.createElement('div');
  head.className = 'clusters-head';  // keeps the page's heading style
  const h1 = document.querySelector('h1').cloneNode(true);
  h1.style.margin = '0 0 16px';
  const line = document.createElement('p');
  line.textContent = `${clusters} clusters, ${subs} sub-clusters`;
  line.style.cssText = 'margin:0;font-size:26px;color:var(--soft)';
  head.append(h1, line);
  head.style.cssText = 'flex:0 0 300px';
  // As tall as the image allows: the stage keeps its proportions (aspect-ratio) at the width set here.
  const [ow, oh] = stage.style.aspectRatio.split('/').map(Number);
  stage.style.cssText += `;width:${Math.min(820, 600 * ow / oh)}px;max-width:none;flex:none;margin:0 0 0 auto`;
  stage.querySelectorAll('.clusters-map__panel').forEach((panel) => panel.remove());
  document.body.innerHTML = '';
  const main = document.createElement('main');
  main.style.cssText = 'display:flex;align-items:center;gap:24px;padding:15px 30px 15px 50px;width:1200px;height:630px;box-sizing:border-box;overflow:hidden';
  main.append(head, stage);
  document.body.append(main);
  return Promise.all([document.fonts.ready, ...[...stage.querySelectorAll('image')].map((img) =>
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
