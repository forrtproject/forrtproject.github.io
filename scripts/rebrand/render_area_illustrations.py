#!/usr/bin/env python3
"""Render the education, research and community area plates (assets/images/doors/area-*.webp).

    python3 scripts/rebrand/render_area_illustrations.py

Loads assets/js/castle/illustrations-render.js in headless Chromium through
assets/js/castle/illustrations-harness.html, with Three.js served from assets/three/. Each plate
is trimmed to the model and its shadow and set 640 px wide. At that size their bricks match the
justice plate's, which comes from the castle (assets/js/castle/README.md) and is not rendered here.

Needs Pillow and Playwright for Python with its Chromium (`python3 -m playwright install chromium`).
"""
import base64
import io
import mimetypes
from pathlib import Path
from urllib.parse import urlsplit

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
CASTLE = ROOT / "assets/js/castle"
# kind in illustrations-render.js: area plate
PLATES = {"popup": "education", "notebook": "research", "table": "community"}


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
        context = browser.new_context(viewport={"width": 1200, "height": 800})

        def serve(route):
            path = urlsplit(route.request.url).path.lstrip("/")
            if path in ("illustrations-harness.html", "illustrations-render.js"):
                source = CASTLE / path
            elif path.startswith("three/") and ".." not in path:
                source = ROOT / "assets" / path
            else:
                return route.abort()
            route.fulfill(body=source.read_bytes(), content_type=mimetypes.guess_type(source)[0])

        context.route("**/*", serve)
        for kind, area in PLATES.items():
            page = context.new_page()
            page.on("pageerror", lambda error: print(error, flush=True))
            page.goto(f"http://plates.invalid/illustrations-harness.html?kind={kind}")
            page.wait_for_function("window.renderReady", timeout=90000)
            raw = page.eval_on_selector("canvas", "c => c.toDataURL('image/png').split(',')[1]")
            page.close()
            plate = Image.open(io.BytesIO(base64.b64decode(raw))).convert("RGBA").resize((1200, 800), Image.LANCZOS)
            x0, y0, x1, y1 = plate.getchannel("A").point(lambda a: 255 if a > 4 else 0).getbbox()
            plate = plate.crop((max(0, x0 - 5), max(0, y0 - 5), min(1200, x1 + 5), min(800, y1 + 5)))
            plate = plate.resize((640, round(640 * plate.height / plate.width)), Image.LANCZOS)
            plate.save(ROOT / f"assets/images/doors/area-{area}.webp", quality=88, method=6)
            print(f"area-{area}.webp from {kind}: {plate.width} × {plate.height}")
        browser.close()


if __name__ == "__main__":
    main()
