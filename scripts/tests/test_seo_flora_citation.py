import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import flora_citation  # noqa: E402
from seo_checks._site import Site  # noqa: E402


def flora_failures(html):
    """The check on a FLoRA page with this HTML (None: no page)."""
    with tempfile.TemporaryDirectory() as public:
        if html is not None:
            page = Path(public) / flora_citation.FLORA_PAGE
            page.parent.mkdir(parents=True)
            page.write_text(html, encoding="utf-8")
        return flora_citation.check(Site(public, []))


class FloraCitationCheck(unittest.TestCase):
    DOI = '<a href="https://doi.org/10.17605/OSF.IO/9R62X">https://doi.org/10.17605/OSF.IO/9R62X</a>'

    def test_citation_passes(self):
        self.assertEqual(flora_failures("<p>Wallrich, L.*, ... %s</p>" % self.DOI), [])

    def test_missing_citation_or_page_fails(self):
        self.assertIn("DOI", flora_failures("<p>How to cite:</p>")[0])
        self.assertIn("not found", flora_failures(None)[0])


if __name__ == "__main__":
    unittest.main()
