#!/usr/bin/env python3
"""Render the castle's still image from the same bundle the home page loads.

Run after a build: python3 scripts/rebrand/render_castle_still.py <public-dir> assets/images/doors/castle-still.webp

Needs Playwright and Pillow. Renders the finished stone tower on a wide transparent canvas.
The home page crops it with `object-fit: cover`, and the scene scales by height, so the still
lines up with the running castle when the bundle takes over.
"""

import glob
import io
import os
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

WIDTH, HEIGHT = 1360, 800


def main():
    public, output = sys.argv[1:3]
    bundle = glob.glob(os.path.join(public, "js", "castle.*.js"))[0]
    page_html = (
        "<!doctype html><style>html,body{margin:0;background:transparent}"
        f".castle-stage{{position:relative;width:{WIDTH}px;height:{HEIGHT}px}}canvas{{display:block;width:100%;height:100%}}"
        '</style><div class="castle-stage"><canvas id="castle-canvas"></canvas></div>'
    )
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
        page = browser.new_page(viewport={"width": WIDTH, "height": HEIGHT}, device_scale_factor=1)
        page.set_content(page_html)
        page.add_script_tag(path=bundle)
        page.wait_for_function("window.forrtCastle")
        page.evaluate(
            "const c=window.forrtCastle;c.setVariant('stone');c.setProgress(1);c.resize();c.render(6,0,0);"
        )
        page.wait_for_timeout(500)
        raw = page.screenshot(omit_background=True)
        browser.close()
    Image.open(io.BytesIO(raw)).save(output, "WEBP", quality=80, method=6, alpha_quality=85)
    print(f"{output}: {os.path.getsize(output) / 1000:.0f} KB")


if __name__ == "__main__":
    main()
