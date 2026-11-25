#!/usr/bin/env python3
"""Render FORRT's social share images (1200x630).

    python3 scripts/render_share_images.py [path/to/texgyreschola-regular.otf]

Writes
- static/img/forrt-share-logo.png: the site default (`sharing_image` in config/_default/params.toml),
  used where no page is involved (JSON-LD, the static apps under static/);
- assets/images/doors/share/tray-00.webp … tray-47.webp: "brick trays", the share image of every page
  without one of its own. site_head.html picks a tray from a hash of the page's path, so a page always
  shows the same tray and pages shared together look different. The build turns them into PNGs.

A tray is a top-down view of studded bricks in the four Doors brick colours (`--brick1` to `--brick4`,
which carry no meaning), with the logo on a smooth tile in the centre. Slack, WhatsApp and others crop
previews to the centre square, so the logo sits inside it. The tray design is GPT-6.2 Astra's
"Brick tray" (round 2 of the share-image exploration in PR #1306).

The default's wordmark is set in TeX Gyre Schola, the free Century Schoolbook clone used in the logo
(https://www.gust.org.pl/projects/e-foundry/tex-gyre/schola). Needs Pillow.
"""
import sys
from pathlib import Path
from random import Random

from PIL import Image, ImageChops, ImageColor, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H = 1200, 630
TRAYS = 48  # keep in step with site_head.html
PAGE = "#fefdf6"  # --page
INK = "#262d35"  # --ink
BRICKS = ("#8c2d4f", "#56621a", "#475a6e", "#7a5600")  # --brick1 … --brick4
L = Image.Resampling.LANCZOS


def schola_path():
    if len(sys.argv) > 1:
        return sys.argv[1]
    for d in [Path.home() / "Library/Fonts", Path("/Library/Fonts"), Path("/usr/share/fonts"), Path("/usr/share/texmf/fonts")]:
        hits = sorted(d.rglob("texgyreschola-regular.otf")) if d.exists() else []
        if hits:
            return str(hits[0])
    sys.exit("TeX Gyre Schola not found: pass the path to texgyreschola-regular.otf")


def default_image(font_path):
    """The tower above 'FORRT', centred."""
    icon = Image.open(ROOT / "assets/images/icon.webp").convert("RGB")
    icon = icon.crop(ImageChops.difference(icon, Image.new("RGB", icon.size, "white")).point(lambda v: 255 if v > 24 else 0).getbbox())
    tower = icon.resize((round(icon.width * 290 / icon.height), 290), L)
    size = round(96 / 0.72)
    word = Image.new("RGB", (size * 4, size * 2), "white")
    ImageDraw.Draw(word).text((size // 4, size // 4), "FORRT", font=ImageFont.truetype(font_path, size), fill=INK)
    word = word.crop(ImageChops.invert(word.convert("L")).getbbox())
    word = word.resize((round(word.width * 96 / word.height), 96), L)
    img = Image.new("RGB", (W, H), "white")
    y = (H - tower.height - 40 - word.height) // 2
    img.paste(tower, ((W - tower.width) // 2, y))
    img.paste(word, ((W - word.width) // 2, y + tower.height + 40))
    return img


def mix(a, b, fraction):
    return "#" + "".join(f"{round(x + (y - x) * fraction):02x}" for x, y in zip(ImageColor.getrgb(a), ImageColor.getrgb(b)))


def stud(color):
    """A stud seen from directly above, with a soft contact shadow."""
    big = 240
    shadow = Image.new("L", (big, big))
    ImageDraw.Draw(shadow).ellipse((30, 38, 216, 224), fill=57)
    stamp = Image.new("RGBA", (big, big), INK)
    stamp.putalpha(shadow.filter(ImageFilter.GaussianBlur(8)))
    d = ImageDraw.Draw(stamp)
    d.ellipse((26, 27, 212, 218), fill=mix(color, INK, .33))
    d.ellipse((26, 20, 212, 207), fill=mix(color, "#ffffff", .6))
    d.ellipse((28, 24, 210, 205), fill=mix(color, "#ffffff", .10))
    return stamp.resize((80, 80), L)


def tray(number, logo):
    rng = Random(f"doors-v1/tray/{number:02d}")
    im = Image.new("RGB", (W, H), "#e7ebeb")
    d = ImageDraw.Draw(im)
    pitch, ox, oy = 106, -36, -3
    free = {(x, y) for x in range(12) for y in range(6)} - {(x, y) for x in range(3, 9) for y in (2, 3)}
    palette = rng.sample(BRICKS, 4)
    footprints = [(1, 2), (2, 1), (1, 3), (3, 1), (2, 2), (1, 4), (4, 1)]

    def piece(x, y, w, h, color, studs=True):
        left, top = ox + pitch * x + 3, oy + pitch * y + 3
        right, bottom = left + pitch * w - 7, top + pitch * h - 7
        d.rounded_rectangle((left + 1, top + 3, right + 1, bottom + 3), 9, fill="#aab4b9")
        d.rounded_rectangle((left, top, right, bottom), 8, fill=mix(color, INK, .21))
        d.rounded_rectangle((left, top, right - 1, bottom - 5), 8, fill=mix(color, "#ffffff", .48))
        d.rounded_rectangle((left + 1, top + 2, right - 2, bottom - 5), 7, fill=color)
        if studs:
            stamp = stud(color)
            for iy in range(h):
                for ix in range(w):
                    cx, cy = left + pitch * (ix + .5) - 4, top + pitch * (iy + .5) - 6
                    im.paste(stamp, (round(cx - 40), round(cy - 40)), stamp)

    index = 0
    while free:  # pack bricks row by row around the reserved centre tile
        x, y = min(free, key=lambda pos: (pos[1], pos[0]))
        for w, h in rng.sample(footprints, len(footprints)) + [(1, 1)]:
            cells = {(x + i, y + j) for i in range(w) for j in range(h)}
            if cells <= free:
                break
        free -= cells
        color = mix(palette[index % 4], "#ffffff", rng.choice([.06, .32, .55, .68, .82]))
        piece(x, y, w, h, color, studs=(w * h == 1 or rng.random() < .8))
        index += 1
    piece(3, 2, 6, 2, PAGE, studs=False)
    im.paste(logo, ((W - logo.width) // 2, round(315 - logo.height / 2)), logo)
    return im


def main():
    default_image(schola_path()).save(ROOT / "static/img/forrt-share-logo.png", optimize=True)

    row = Image.open(ROOT / "assets/images/doors/logo-row.webp").convert("RGBA")
    logo = row.resize((512, round(512 * row.height / row.width)), L)
    out = ROOT / "assets/images/doors/share"
    out.mkdir(exist_ok=True)
    for old in out.glob("*.webp"):
        old.unlink()
    for number in range(TRAYS):
        tray(number, logo).save(out / f"tray-{number:02d}.webp", quality=90, method=6)


if __name__ == "__main__":
    main()
