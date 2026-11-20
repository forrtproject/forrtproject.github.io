import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import tempfile  # noqa: E402

from seo_checks import glossary_links  # noqa: E402
from seo_checks._site import load_site  # noqa: E402


class GlossaryLinkCheck(unittest.TestCase):
    def check_links(self, hrefs, base="https://forrt.org/"):
        with tempfile.TemporaryDirectory() as public:
            root = Path(public)
            term = root / "glossary/english/preregistration/index.html"
            term.parent.mkdir(parents=True)
            term.write_text('<link rel="canonical" href="%sglossary/english/preregistration/">' % base)
            links = "".join('<a class="other gloss-term" href="%s">term</a>' % href for href in hrefs)
            (root / "index.html").write_text('<link rel="canonical" href="%s">%s' % (base, links))
            return glossary_links.check(load_site(public))

    def test_existing_term_and_preview_base_pass(self):
        for base in ("https://forrt.org/", "https://forrt.org/rebrand-doors/"):
            with self.subTest(base=base):
                self.assertEqual(self.check_links([
                    base + "glossary/english/preregistration/",
                    "glossary/english/preregistration/#definition",
                ], base), [])

    def test_missing_non_english_external_and_empty_links_fail(self):
        links = ["/glossary/english/missing/", "/glossary/german/preregistration/",
                 "https://example.org/glossary/english/preregistration/", ""]
        self.assertEqual(len(self.check_links(links)), len(links))


if __name__ == "__main__":
    unittest.main()
