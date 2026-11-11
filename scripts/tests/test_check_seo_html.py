"""Run with python3 -m unittest discover -s scripts/tests -p test_check_seo_html.py."""
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import check_seo_html as seo


def failures_for(raw_description):
    """Check 10 on one page whose description has this raw attribute value."""
    with tempfile.TemporaryDirectory() as public:
        html = "<html><head><meta name='description' content='%s'></head></html>"
        (Path(public) / "index.html").write_text(html % raw_description, encoding="utf-8")
        return seo.check_description_entities(seo.load_pages(public))


class DescriptionEntityCheck(unittest.TestCase):
    def test_correctly_escaped_description_passes(self):
        self.assertEqual(failures_for("R&amp;D &#34;quotes&#34; “curly”"), [])

    def test_escaped_text_that_is_not_an_entity_passes(self):
        for raw in ("the &amp;name; syntax", "the &amp;notanentity; syntax"):
            with self.subTest(raw):
                self.assertEqual(failures_for(raw), [])

    def test_double_escaped_entities_fail(self):
        for raw, entity in (("&amp;ldquo;quote&amp;rdquo;", "&ldquo;"),
                            ("R&amp;amp;D", "&amp;"),
                            ("it&amp;#39;s", "&#39;"),
                            ("it&amp;#x27;s", "&#x27;")):
            with self.subTest(raw):
                failures = failures_for(raw)
                self.assertEqual(len(failures), 1)
                self.assertIn(entity, failures[0])


def flora_failures(html):
    """Check 11 on a FLoRA page with this HTML (None: no page)."""
    with tempfile.TemporaryDirectory() as public:
        if html is not None:
            page = Path(public) / seo.FLORA_PAGE
            page.parent.mkdir(parents=True)
            page.write_text(html, encoding="utf-8")
        return seo.check_flora_citation(public)


class FloraCitationCheck(unittest.TestCase):
    DOI = '<a href="https://doi.org/10.17605/OSF.IO/9R62X">https://doi.org/10.17605/OSF.IO/9R62X</a>'

    def test_html_citation_passes(self):
        self.assertEqual(flora_failures("<p>Wallrich, L.*, &amp; Röseler, L.*, ... %s</p>" % self.DOI), [])

    def test_markdown_emphasis_fails(self):
        failures = flora_failures("<p>Wallrich, L.<em>, &amp; Röseler, L.</em>, ... %s</p>" % self.DOI)
        self.assertEqual(len(failures), 1)
        self.assertIn("emphasis", failures[0])

    def test_missing_citation_or_page_fails(self):
        self.assertIn("DOI", flora_failures("<p>How to cite:</p>")[0])
        self.assertIn("not found", flora_failures(None)[0])


if __name__ == "__main__":
    unittest.main()
