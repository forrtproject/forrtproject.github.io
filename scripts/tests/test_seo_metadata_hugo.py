"""Exercise the metadata partials with Hugo; no network or Python image library."""
import base64
import json
import os
from pathlib import Path
import shutil
import struct
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
HUGO = shutil.which(os.environ.get("HUGO_BINARY", "hugo"))
# A transparent 7x5 WebP fixture.
WEBP = base64.b64decode(
    "UklGRl4AAABXRUJQVlA4WAoAAAAQAAAABgAABAAAQUxQSAwAAAABDzD/ERFifCL6Hw5WUDgg"
    "LAAAAHABAJ0BKgcABQACADQliALsAUAAAP7wOENk+ChZ7lH8fMEI16j3/e44AAAA")


@unittest.skipUnless(HUGO, "Hugo is required for metadata integration tests")
class HugoMetadataTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="scratch-seo-test-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def write(self, path, text):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text, encoding="utf-8")

    def copy_partial(self, name):
        self.write("layouts/partials/" + name,
                   (ROOT / "layouts/partials" / name).read_text(encoding="utf-8"))

    def build(self, base="https://example.org/"):
        self.write("hugo.toml", 'baseURL = "%s"\ndisableKinds = ["taxonomy", "term", "RSS", "sitemap"]\n' % base)
        result = subprocess.run([HUGO, "--source", str(self.root), "--destination", str(self.root / "public"),
                                 "--cacheDir", str(self.root / "cache")], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_resource_paginator_is_initialized_before_head_and_keeps_preview_prefix(self):
        self.copy_partial("functions/resource_metadata.html")
        self.write("layouts/partials/functions/page_description.html", '{{ return "Browse teaching resources." }}')
        self.write("layouts/partials/doors/resource_index.html",
                   '{{ return (dict "pages" (site.GetPage "/curated_resources").RegularPages.ByTitle) }}')
        self.write("content/resources/_index.md", '---\ntitle: Resources\n---\n')
        self.write("content/curated_resources/_index.md", '---\ntitle: Items\n---\n')
        for number in range(50):
            self.write("content/curated_resources/item-%02d.md" % number,
                       '---\ntitle: "Resource %02d"\n---\n' % number)
        self.write("layouts/resources/list.html", '''{{ $meta := partial "functions/resource_metadata.html" . }}
{{ $items := partialCached "doors/resource_index.html" . "resources" }}
{{ $body := .Paginate $items.pages 24 }}
{{ $urls := slice }}{{ range $meta.pages }}{{ $urls = $urls | append .RelPermalink }}{{ end }}
{{ dict "url" $meta.url "title" $meta.title "description" $meta.description "items" $urls "bodyCount" (len $body.Pages) | jsonify | safeHTML }}''')
        # Calling the metadata partial must leave other list templates' pagination alone.
        self.write("layouts/curated_resources/list.html", '''{{ $meta := partial "functions/resource_metadata.html" . }}
{{ len (.Paginate .RegularPages 7).Pages }}''')
        for prefix in ("", "/rebrand-doors"):
            with self.subTest(prefix=prefix):
                self.build("https://example.org" + prefix + "/")
                for number, count in ((1, 24), (2, 24), (3, 2)):
                    path = "resources/" + ("page/%d/" % number if number > 1 else "")
                    data = json.loads((self.root / "public" / path / "index.html").read_text())
                    self.assertEqual(data["url"], "https://example.org" + prefix + "/" + path)
                    self.assertEqual(data["title"], "Resources" + (" – Page %d" % number if number > 1 else ""))
                    self.assertEqual(len(data["items"]), count)
                    self.assertEqual(data["bodyCount"], count)
                    self.assertEqual(data["items"][0], prefix + "/curated_resources/item-%02d/" % ((number - 1) * 24))
                    if number > 1:
                        self.assertIn("page %d of 3" % number, data["description"])
                    else:
                        self.assertEqual(data["description"], "Browse teaching resources.")
                self.assertEqual((self.root / "public/curated_resources/index.html").read_text().strip(), "7")

    def test_static_and_bundled_webp_derivatives_keep_dimensions_and_preview_prefix(self):
        self.copy_partial("functions/social_image.html")
        for path in ("static/img/static.webp", "content/sample/bundled.webp"):
            target = self.root / path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(WEBP)
        self.write("content/sample/index.md", '---\ntitle: Sample\n---\n')
        self.write("layouts/_default/single.html", '''{{ $static := resources.FromString "social/img/static.webp" (readFile "static/img/static.webp") }}
{{ $bundled := .Resources.GetMatch "bundled.webp" }}
{{ $output := slice }}{{ range slice $static $bundled }}
{{ $png := partial "functions/social_image.html" . }}
{{ $output = $output | append (dict "url" $png.RelPermalink "width" $png.Width "height" $png.Height "type" $png.MediaType.Type) }}
{{ end }}{{ $output | jsonify | safeHTML }}''')
        self.build("https://example.org/rebrand-doors/")
        data = json.loads((self.root / "public/sample/index.html").read_text())
        self.assertEqual(len(data), 2)
        for image in data:
            self.assertTrue(image["url"].startswith("/rebrand-doors/"))
            self.assertTrue(image["url"].endswith(".png"))
            self.assertEqual((image["width"], image["height"], image["type"]), (7, 5, "image/png"))
            raw = (self.root / "public" / image["url"].removeprefix("/rebrand-doors/")).read_bytes()
            self.assertEqual(raw[:8], b"\x89PNG\r\n\x1a\n")
            self.assertEqual(struct.unpack(">II", raw[16:24]), (7, 5))
            self.assertIn(raw[25], (4, 6), "Transparent source must retain a PNG alpha channel")
