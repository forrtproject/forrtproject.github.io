#!/usr/bin/env python3
"""Measure where the bricks sit in each area plate, so pages can centre them rather than brick plus shadow.

    python3 scripts/rebrand/area_plate_bounds.py

Writes assets/images/doors/area-plates.json, read by layouts/partials/doors/area_plate.html. Re-run it
whenever a plate changes. The ground shadow is drawn at about 18% opacity and the bricks are opaque, so
pixels above half opacity mark the bricks. Bounds are fractions of the image's width and height.
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
DOORS = ROOT / "assets/images/doors"
AREAS = ("education", "research", "justice", "community")


def main():
    bounds = {}
    for area in AREAS:
        image = Image.open(DOORS / f"area-{area}.webp").convert("RGBA")
        x0, y0, x1, y1 = image.getchannel("A").point(lambda a: 255 if a > 128 else 0).getbbox()
        bounds[f"area-{area}"] = {
            "x0": round(x0 / image.width, 3),
            "y0": round(y0 / image.height, 3),
            "x1": round(x1 / image.width, 3),
            "y1": round(y1 / image.height, 3),
        }
    (DOORS / "area-plates.json").write_text(json.dumps(bounds, indent=2) + "\n")
    print(json.dumps(bounds, indent=2))


if __name__ == "__main__":
    main()
