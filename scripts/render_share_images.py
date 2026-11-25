#!/usr/bin/env python3
"""Render FORRT's default and per-area social share images (1200x630).

    python3 scripts/render_share_images.py [path/to/texgyreschola-regular.otf]

Writes
- static/img/forrt-share-logo.png: the site default (`sharing_image` in config/_default/params.toml);
- assets/images/doors/share/area-<key>.webp: the fallback for pages in each Doors area
  (`[[doors.share_areas]]` in params.toml); the build turns these into PNGs for social previews.

Slack, WhatsApp and others crop link previews to the centre square, so everything sits inside a
centred 560 px square. Area cards use the area's tint and tone from assets/css/doors/base.css and
its title from content/home/2-areas.md, set in the site's heading font (Newsreader). "FORRT" is set
in TeX Gyre Schola, the free Century Schoolbook clone used in the logo
(https://www.gust.org.pl/projects/e-foundry/tex-gyre/schola).
Needs Pillow and fontTools with Brotli (`pip install pillow fonttools brotli`) to read the WOFF2.
"""
import io
import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H, SAFE = 1200, 630, 560
INK = (38, 45, 53)  # --ink
AREAS = {  # key: (title, --tone, --tint)
    "education": ("Education & Pedagogy", "#2d5750", "#e3efec"),
    "research": ("Meta-Science & Research", "#005a87", "#e1eef6"),
    "justice": ("Social Justice & DEIA", "#65478c", "#ebe6f4"),
    "community": ("Community & Sustainability", "#9c4a0e", "#f8eadc"),
}


def rgb(hex_colour):
    return tuple(int(hex_colour[i:i + 2], 16) for i in (1, 3, 5))


def schola_path():
    if len(sys.argv) > 1:
        return sys.argv[1]
    for d in [Path.home() / "Library/Fonts", Path("/Library/Fonts"), Path("/usr/share/fonts"), Path("/usr/share/texmf/fonts")]:
        hits = sorted(d.rglob("texgyreschola-regular.otf")) if d.exists() else []
        if hits:
            return str(hits[0])
    sys.exit("TeX Gyre Schola not found: pass the path to texgyreschola-regular.otf")


def newsreader(size):
    font = TTFont(ROOT / "static/fonts/doors/newsreader-var.woff2")
    font.flavor = None
    buf = io.BytesIO()
    font.save(buf)
    buf.seek(0)
    f = ImageFont.truetype(buf, size)
    f.set_variation_by_axes([min(72, max(16, size))])  # optical size axis only
    return f


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
    img = img.crop(ImageChops.invert(img.convert("L")).getbbox())
    return img.resize((round(img.width * cap_height / img.height), cap_height), Image.LANCZOS)


def plate(key, max_w, max_h):
    """The area illustration, its right edge faded so shadows that run off the plate end softly.
    Never enlarged: the plates are 640 px wide."""
    art = Image.open(ROOT / f"assets/images/doors/area-{key}.webp").convert("RGBA")
    w, h = art.size
    fade = Image.new("L", art.size, 255)
    draw, n = ImageDraw.Draw(fade), round(w * 0.2)
    for i in range(n):
        draw.line([(w - n + i, 0), (w - n + i, h)], fill=round(255 * (1 - i / n)))
    art.putalpha(ImageChops.multiply(art.getchannel("A"), fade))
    s = min(1, max_w / w, max_h / h)
    return art.resize((round(w * s), round(h * s)), Image.LANCZOS)


def centred_text(draw, y, text, font, fill):
    l, t, r, _ = draw.textbbox((0, 0), text, font=font)
    draw.text(((W - (r - l)) // 2 - l, y - t), text, font=font, fill=fill)


def area_card(key, schola):
    title, tone, tint = AREAS[key]
    img = Image.new("RGB", (W, H), rgb(tint))
    draw = ImageDraw.Draw(img)
    art = plate(key, SAFE, 430)
    img.paste(art, ((W - art.width) // 2, 50 + 430 - art.height), art)
    centred_text(draw, 510, title, newsreader(38), rgb(tone))
    centred_text(draw, 566, "FORRT", ImageFont.truetype(schola, 34), INK)
    return img


def main():
    schola = schola_path()

    default = Image.new("RGB", (W, H), "white")
    t, w = tower(290), wordmark(schola, 96)
    y = (H - t.height - 40 - w.height) // 2
    default.paste(t, ((W - t.width) // 2, y))
    default.paste(w, ((W - w.width) // 2, y + t.height + 40))
    default.save(ROOT / "static/img/forrt-share-logo.png", optimize=True)

    out = ROOT / "assets/images/doors/share"
    out.mkdir(exist_ok=True)
    for key in AREAS:
        area_card(key, schola).save(out / f"area-{key}.webp", quality=90, method=6)


if __name__ == "__main__":
    main()
