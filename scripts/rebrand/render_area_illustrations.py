#!/usr/bin/env python3
"""Render the education, research and community area plates (assets/images/doors/area-*.webp).

    python3 scripts/rebrand/render_area_illustrations.py [education research community]

Loads each plate's renderer in headless Chromium through assets/js/castle/illustrations-harness.html,
with Three.js served from assets/three/: assets/js/castle/education-render.js for the book stack, and
assets/js/castle/illustrations-render.js for the notebook and table. Each plate is trimmed to the model
and its shadow and set 640 px wide. The justice plate comes from the castle (assets/js/castle/README.md)
and is not rendered here.

Afterwards run scripts/rebrand/area_plate_bricks.py for the shadowless copies the area doors show.

Needs Pillow and Playwright for Python with its Chromium (`python3 -m playwright install chromium`).
"""
import base64
import io
import mimetypes
import sys
from pathlib import Path
from urllib.parse import urlsplit

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
CASTLE = ROOT / "assets/js/castle"
# area plate: (renderer in assets/js/castle/, kind)
PLATES = {
    "education": ("education-render.js", "stack"),
    "research": ("illustrations-render.js", "notebook"),
    "community": ("illustrations-render.js", "table"),
}
RENDERERS = {renderer for renderer, _ in PLATES.values()}


def main(areas):
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
        context = browser.new_context(viewport={"width": 1200, "height": 800})

        def serve(route):
            path = urlsplit(route.request.url).path.lstrip("/")
            if path == "illustrations-harness.html" or path in RENDERERS:
                source = CASTLE / path
            elif path.startswith("three/") and ".." not in path:
                source = ROOT / "assets" / path
            else:
                return route.abort()
            route.fulfill(body=source.read_bytes(), content_type=mimetypes.guess_type(source)[0])

        context.route("**/*", serve)
        for area in areas:
            renderer, kind = PLATES[area]
            page = context.new_page()
            page.on("pageerror", lambda error, kind=kind: print(f"{kind}: {error}", flush=True))
            page.on("console", lambda msg, kind=kind: msg.type == "error" and print(f"{kind}: {msg.text}", flush=True))
            page.goto(f"http://plates.invalid/illustrations-harness.html?renderer={renderer}&kind={kind}")
            page.wait_for_function("window.renderReady", timeout=90000)
            raw, size = page.eval_on_selector("canvas", "c => [c.toDataURL('image/png').split(',')[1], [c.clientWidth, c.clientHeight]]")
            page.close()
            # Back from the renderer's pixel ratio to its CSS size, then trim with a 5 px margin.
            plate = Image.open(io.BytesIO(base64.b64decode(raw))).convert("RGBA").resize(tuple(size), Image.LANCZOS)
            x0, y0, x1, y1 = plate.getchannel("A").point(lambda a: 255 if a > 4 else 0).getbbox()
            plate = plate.crop((max(0, x0 - 5), max(0, y0 - 5), min(plate.width, x1 + 5), min(plate.height, y1 + 5)))
            plate = plate.resize((640, round(640 * plate.height / plate.width)), Image.LANCZOS)
            plate.save(ROOT / f"assets/images/doors/area-{area}.webp", quality=88, method=6)
            print(f"area-{area}.webp from {kind}: {plate.width} × {plate.height}")
        browser.close()


if __name__ == "__main__":
    main(sys.argv[1:] or list(PLATES))
