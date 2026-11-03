#!/usr/bin/env python3
"""Rebuild the self-hosted WOFF2 fonts in static/fonts/doors/ from Google's sources.

Run: python3 scripts/rebrand/build_fonts.py <dir-with-source-ttfs> static/fonts/doors

Needs `pip install fonttools brotli`. Sources are the OFL files in github.com/google/fonts
(ofl/newsreader, ofl/sourcesans3). Keeps Latin and Latin Extended, which cover the site's
English, German and Turkish; Arabic and Chinese use system fonts (decision D18).
"""

import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

UNICODES = (
    "U+0000-024F,U+0259,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0308,U+030A-030C,U+0327-0328,"
    "U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20A0-20BF,U+2113,U+2122,U+2190-2193,U+2212,U+2215,"
    "U+2248,U+2260,U+2264-2265,U+FEFF,U+FFFD"
)
FONTS = [
    # source, axis limits, output
    ("Newsreader[opsz,wght].ttf", {"wght": (400, 600)}, "newsreader-var.woff2"),
    ("SourceSans3[wght].ttf", {"wght": (400, 700)}, "source-sans-3-var.woff2"),
    # Only reference lists use italics (decision D15), and those are in the text face.
    ("SourceSans3-Italic[wght].ttf", {"wght": 400}, "source-sans-3-italic.woff2"),
]


def build(source, limits, output):
    font = TTFont(source)
    font = instancer.instantiateVariableFont(font, limits)
    # The instancer drops glyphs left with no variation, such as spaces, and the subsetter
    # then fails looking them up.
    if "gvar" in font:
        kept = font["gvar"].variations
        font["gvar"].variations = {
            name: kept[name] if name in kept else [] for name in font.getGlyphOrder()
        }
    options = subset.Options()
    options.flavor = "woff2"
    options.hinting = False
    options.desubroutinize = True
    options.notdef_outline = True
    options.name_IDs = [1, 2, 3, 4, 6, 13, 14]
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=subset.parse_unicodes(UNICODES))
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(output)
    print(f"{output}: {os.path.getsize(output) / 1000:.0f} KB")


def main():
    source_dir, out_dir = sys.argv[1:3]
    os.makedirs(out_dir, exist_ok=True)
    for source, limits, output in FONTS:
        build(os.path.join(source_dir, source), limits, os.path.join(out_dir, output))


if __name__ == "__main__":
    main()
