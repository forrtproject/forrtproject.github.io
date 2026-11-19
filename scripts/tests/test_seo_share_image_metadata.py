import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import share_image_metadata  # noqa: E402
from seo_checks._site import Site, page_from_html  # noqa: E402


class ShareImageMetadataCheck(unittest.TestCase):
    def failures(self, **overrides):
        meta = {"og:image": "https://example.org/preview/social/test.png",
                "twitter:image": "https://example.org/preview/social/test.png",
                "og:image:type": "image/png", "og:image:width": "7", "og:image:height": "5"}
        meta.update(overrides)
        page = page_from_html("".join('<meta property="%s" content="%s">' % (k, v) for k, v in meta.items()))
        return share_image_metadata.check(Site("", [page]))

    def test_matching_png_metadata_passes(self):
        self.assertEqual(self.failures(), [])

    def test_incorrect_type_dimensions_or_twitter_url_fail(self):
        for change in ({"og:image:type": "image/webp"}, {"og:image:width": "0"},
                       {"og:image:height": "unknown"}, {"twitter:image": "original.webp"}):
            with self.subTest(change=change):
                self.assertTrue(self.failures(**change))

    def test_undecodable_original_remains_report_only(self):
        self.assertEqual(self.failures(**{"og:image": "original.webp"}), [])


if __name__ == "__main__":
    unittest.main()
