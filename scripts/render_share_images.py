#!/usr/bin/env python3
"""Render FORRT's default and per-area social share images (1200x630).

    python3 scripts/render_share_images.py [path/to/texgyreschola-regular.otf]

Writes
- static/img/forrt-share-logo.png: the site default (`sharing_image` in config/_default/params.toml);
- assets/images/doors/share/area-<key>.webp: the fallback for pages in each Doors area
  (`[[doors.share_areas]]` in params.toml); the build turns these into PNGs for social previews.

Slack, WhatsApp and others crop link previews to the centre square, so everything sits inside a
centred 520 px square. The wordmark is set in TeX Gyre Schola, the free Century Schoolbook clone
used in the FORRT logo (https://www.gust.org.pl/projects/e-foundry/tex-gyre/schola).
Needs Pillow.
"""
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H, SAFE = 1200, 630, 520
INK = (38, 45, 53)  # --ink in assets/css/doors/base.css
AREAS = ["education", "research", "justice", "community"]


def find_font():
    if len(sys.argv) > 1:
        return sys.argv[1]
    for d in [Path.home() / "Library/Fonts", Path("/Library/Fonts"), Path("/usr/share/fonts"), Path("/usr/share/texmf/fonts")]:
        hits = sorted(d.rglob("texgyreschola-regular.otf")) if d.exists() else []
        if hits:
            return str(hits[0])
    sys.exit("TeX Gyre Schola not found: pass the path to texgyreschola-regular.otf")


def tower(height):
    """The tower from the site icon, cropped to its ink and scaled to `height`."""
    icon = Image.open(ROOT / "assets/images/icon.webp").convert("RGB")
    box = ImageChops.difference(icon, Image.new("RGB", icon.size, "white")).point(lambda v: 255 if v > 24 else 0).getbbox()
    icon = icon.crop(box)
    return icon.resize((round(icon.width * height / icon.height), height), Image.LANCZOS)


def wordmark(font_path, cap_height):
    """'FORRT' with its capitals `cap_height` tall, cropped to the ink, on white."""
    size = round(cap_height / 0.72)
    font = ImageFont.truetype(font_path, size)
    img = Image.new("RGB", (size * 4, size * 2), "white")
    ImageDraw.Draw(img).text((size // 4, size // 4), "FORRT", font=font, fill=INK)
    box = ImageChops.invert(img.convert("L")).getbbox()
    img = img.crop(box)
    return img.resize((round(img.width * cap_height / img.height), cap_height), Image.LANCZOS)


def mark_row(font_path, height):
    """Tower and wordmark side by side, as in the site header."""
    t, w = tower(height), wordmark(font_path, round(height * 0.5))
    gap = round(height * 0.3)
    row = Image.new("RGB", (t.width + gap + w.width, height), "white")
    row.paste(t, (0, 0))
    row.paste(w, (t.width + gap, (height - w.height) // 2))
    return row


def centred_stack(parts, gap):
    canvas = Image.new("RGB", (W, H), "white")
    y = (H - sum(p.height for p in parts) - gap * (len(parts) - 1)) // 2
    for p in parts:
        if p.mode == "RGBA":
            canvas.paste(p, ((W - p.width) // 2, y), p)
        else:
            canvas.paste(p, ((W - p.width) // 2, y))
        y += p.height + gap
    return canvas


def main():
    font = find_font()

    default = centred_stack([tower(290), wordmark(font, 96)], gap=40)
    default.save(ROOT / "static/img/forrt-share-logo.png", optimize=True)

    out = ROOT / "assets/images/doors/share"
    out.mkdir(exist_ok=True)
    row = mark_row(font, 64)
    for key in AREAS:
        art = Image.open(ROOT / f"assets/images/doors/area-{key}.webp").convert("RGBA")
        scale = min(1, SAFE / art.width, (SAFE - 40 - row.height) / art.height)  # never enlarge the 640 px plates
        art = art.resize((round(art.width * scale), round(art.height * scale)), Image.LANCZOS)
        centred_stack([art, row], gap=40).save(out / f"area-{key}.webp", quality=90, method=6)


if __name__ == "__main__":
    main()
