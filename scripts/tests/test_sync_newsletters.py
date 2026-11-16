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
    '<div style="display:none;font-size:0px">Preview text</div>'
    '<table><tr><td valign="top" id="templatePreheader" style="background:#f6f6f6"><!--[if mso]><td valign="top"><![endif]-->'
    '<span class="mcnPreviewText" style="display:none">Inbox preview</span>&nbsp;</td></tr>'
    '<tr><td valign="top" id="templateHeader">Header</td></tr></table>'
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
        self.assertIn('<h1>FORRT Newsletter, April 2024</h1></header><main id="main" tabindex="-1">', self.page)
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
        self.assertIn("Preview text", self.page)

    def test_empty_preheader_hidden_banner_kept(self):
        self.assertIn('id="templatePreheader" data-forrt-empty', self.page)
        banner = EMAIL.replace("&nbsp;</td>", '<img src="/newsletters/images/x.webp" alt="">&nbsp;</td>')
        self.assertNotIn('id="templatePreheader" data-forrt-empty', s.archive_page(banner))

    def test_headings_keep_heading_font(self):
        self.assertIn(":not(:is(h1,h2,h3,h4) *)", self.page)
        self.assertIn("body :is(h1,h2,h3,h4) *{font-family:Newsreader", self.page)


class FinishPageTest(unittest.TestCase):
    def test_one_h1(self):
        raw = "<html><head><title>x</title></head><body><h1>Welcome</h1><p>Hi</p></body></html>"
        page = s.finish_page(raw, 2024, 4, "", Path("."))
        self.assertEqual(page.count("<h1"), 1)
        self.assertIn("<h2 data-email-h1>Welcome</h2>", page)
        self.assertEqual(page.count("<title>FORRT Newsletter, April 2024</title>"), 1)
        self.assertEqual(page.count("<title"), 1)
        self.assertIn("<h1>FORRT Newsletter, April 2024</h1>", page)
        self.assertIn('<main id="main" tabindex="-1">', page)
        self.assertEqual(s.archive_page(page), page)


if __name__ == "__main__":
    unittest.main()
