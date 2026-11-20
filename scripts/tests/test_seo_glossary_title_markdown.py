import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import glossary_title_markdown  # noqa: E402
from seo_checks._site import Site, page_from_html  # noqa: E402


class GlossaryTitleMarkdownCheck(unittest.TestCase):
    def check(self, title, h1, path="glossary/english/term/index.html"):
        page = page_from_html("<title>%s</title><h1>%s</h1>" % (title, h1), path)
        return glossary_title_markdown.check(Site("", [page]))

    def test_rendered_emphasis_and_lone_asterisk_pass(self):
        self.assertEqual(self.check("Research Contribution Metric (p) | FORRT",
                                    "Research Contribution Metric (<em>p</em>)"), [])
        self.assertEqual(self.check("G*Power | FORRT", "G*Power"), [])
        self.assertEqual(self.check("G*Power and P*Hack | FORRT", "G*Power and P*Hack"), [])

    def test_literal_emphasis_fails_on_glossary_pages_only(self):
        self.assertEqual(len(self.check("Research Contribution Metric (*p*) | FORRT", "x")), 1)
        self.assertEqual(len(self.check("x", "Research Contribution Metric (*p*)")), 1)
        self.assertEqual(len(self.check("x", "*p*-value")), 1)
        self.assertEqual(self.check("x", "*p*", path="post/x/index.html"), [])


if __name__ == "__main__":
    unittest.main()
