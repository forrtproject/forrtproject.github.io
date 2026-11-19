import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import citation_targets  # noqa: E402
from seo_checks._site import Site, page_from_html  # noqa: E402


class CitationTargetCheck(unittest.TestCase):
    def check(self, html):
        return citation_targets.check(Site("", [page_from_html(html, "example/index.html")]))

    def test_reference_after_citation(self):
        self.assertEqual(self.check('<a class="cite" href="#ref-Key">Author, 2020</a>'
                                    '<li id="ref-Key">Reference</li>'), [])

    def test_missing_reference_or_nonlocal_link(self):
        for href in ('#ref-Unknown', '/other/#ref-Key', '#Key', ''):
            with self.subTest(href):
                self.assertTrue(self.check('<a class="other cite" href="%s">Citation</a>'
                                           '<li id="ref-Key">Reference</li>' % href))

    def test_other_links_are_ignored(self):
        self.assertEqual(self.check('<a href="#elsewhere">Link</a>'), [])


if __name__ == "__main__":
    unittest.main()
