"""archive_page: an archived email gets the site's page parts, and running it again changes nothing."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import sync_newsletters as s  # noqa: E402

EMAIL = (
    "<!doctype html><html lang=\"en\"><head><title>FORRT Newsletter, April 2024</title>"
    "<style>h2[data-email-h1]{font-size:2em}.forrt-archive-bar{font-family:Arial}</style></head>"
    '<body><div class="forrt-archive-bar"><a href="/newsletters/">&larr; FORRT newsletter archive</a>'
    " &middot; <h1>FORRT Newsletter, April 2024</h1></div>"
    '<div style="display:none;font-size:0px">preview</div>'
    '<td id="templateBody" style="font-size: 14px">Hello</td>'
    '<td style="font-size:11px">Copyright</td><td style="font-size: 18px">Big</td>'
    '<a href="https://forrt.org/files/FORRT.vcf">Add us to your address book</a><br>\n<br>\n'
    "Want to change how you receive these emails?<br>\nYou can update your preferences or "
    "unsubscribe from this list.<br>\n</body></html>"
)


class ArchivePageTest(unittest.TestCase):
    def setUp(self):
        self.page = s.archive_page(EMAIL)

    def test_idempotent(self):
        self.assertEqual(s.archive_page(self.page), self.page)

    def test_page_parts(self):
        self.assertIn('<a class="forrt-skip" href="#main">', self.page)
        self.assertIn('<nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/newsletters/">', self.page)
        self.assertIn("<h1>FORRT Newsletter, April 2024</h1></header><main id=\"main\">", self.page)
        self.assertEqual(self.page.count("<main"), 1)
        self.assertIn("</main></body>", self.page)
        self.assertEqual(self.page.count('<style id="forrt-archive">'), 1)
        self.assertNotIn("&larr; FORRT newsletter archive", self.page)

    def test_inbox_lines_removed(self):
        self.assertNotIn("address book", self.page)
        self.assertNotIn("unsubscribe", self.page)

    def test_type_sizes(self):
        self.assertIn("font-size: 17px\">Hello", self.page)
        self.assertIn("font-size:15px\">Copyright", self.page)
        self.assertIn("font-size: 18px\">Big", self.page)
        self.assertIn("font-size:0px", self.page)


if __name__ == "__main__":
    unittest.main()
