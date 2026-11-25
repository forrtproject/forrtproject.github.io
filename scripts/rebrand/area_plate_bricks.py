#!/usr/bin/env python3
"""Make shadowless copies of the area plates: assets/images/doors/area-<area>-bricks.webp.

    python3 scripts/rebrand/area_plate_bricks.py

Re-run it whenever a plate changes. The ground shadow in each plate is pure black at up to 18% opacity
(a Three.js ShadowMaterial), drawn under the bricks. This subtracts it: pure shadow pixels become
transparent, and brick edges that were blended over the shadow get back their own opacity and colour.
Each copy is trimmed to its bricks with a 4 px margin, so it centres without any offsets.
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
DOORS = ROOT / "assets/images/doors"
AREAS = ("education", "research", "justice", "community")
REACH = 3  # px: how far a brick edge looks for the shadow behind it


def remove_shadow(rgba):
    rgb = rgba[..., :3].astype(float) / 255
    alpha = rgba[..., 3].astype(float) / 255
    # Shadow pixels are black and partly transparent; their opacity is the shadow's local strength.
    shadow = np.where((rgb.max(axis=2) < 0.04) & (alpha < 0.25), alpha, 0)
    # The strength behind a brick edge: the strongest shadow within REACH pixels.
    padded = np.pad(shadow, REACH)
    behind = np.zeros_like(shadow)
    height, width = shadow.shape
    for dy in range(2 * REACH + 1):
        for dx in range(2 * REACH + 1):
            behind = np.maximum(behind, padded[dy:dy + height, dx:dx + width])
    # Bricks over shadow: alpha = a + s(1 - a), colour premultiplied by a alone (the shadow adds black).
    bricks = np.clip((alpha - behind) / (1 - behind), 0, 1)
    bricks[shadow > 0] = 0
    colour = np.where(bricks[..., None] > 0, rgb * alpha[..., None] / np.maximum(bricks, 1e-6)[..., None], 0)
    out = np.dstack([np.clip(colour, 0, 1), bricks])
    return (out * 255).round().astype(np.uint8)


def main():
    for area in AREAS:
        plate = np.asarray(Image.open(DOORS / f"area-{area}.webp").convert("RGBA"))
        image = Image.fromarray(remove_shadow(plate), "RGBA")
        x0, y0, x1, y1 = image.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
        image = image.crop((max(0, x0 - 4), max(0, y0 - 4), min(image.width, x1 + 4), min(image.height, y1 + 4)))
        image.save(DOORS / f"area-{area}-bricks.webp", quality=88, method=6)
        print(f"area-{area}-bricks.webp: {image.width} × {image.height}")


if __name__ == "__main__":
    main()
