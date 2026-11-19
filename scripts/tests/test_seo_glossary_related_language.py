import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import glossary_related_language  # noqa: E402
from seo_checks._site import load_site  # noqa: E402


def related_language_failures(target_alternates, prefix=""):
    """A Turkish page links its related term to the English Paywall page."""
    with tempfile.TemporaryDirectory() as public:
        english = Path(public) / "glossary/english/paywall"
        turkish = Path(public) / "glossary/turkish/abstract"
        english.mkdir(parents=True)
        turkish.mkdir(parents=True)
        links = "".join("<link rel='alternate' hreflang='x' href='%s'>" % h for h in target_alternates)
        (english / "index.html").write_text("<html><head>%s</head></html>" % links, encoding="utf-8")
        (turkish / "index.html").write_text(
            "<section class='term-related'><h2>Related term</h2><ul class='term-cards'>"
            "<li><a href='%s/glossary/english/paywall/'>Paywall</a><p>Definition</p></li></ul></section>"
            "<p><a href='/glossary/english/paywall/'>elsewhere</a></p>" % prefix, encoding="utf-8")
        return glossary_related_language.check(load_site(public))


class GlossaryRelatedLanguageCheck(unittest.TestCase):
    def test_preview_prefix_is_ignored(self):
        failures = related_language_failures(["https://forrt.org/rebrand-doors/glossary/turkish/odeme_duvar%C4%B1_paywall_/"],
                                             prefix="/rebrand-doors")
        self.assertEqual(len(failures), 1)

    def test_link_to_english_when_no_translation_exists_passes(self):
        self.assertEqual(related_language_failures(["https://forrt.org/glossary/german/bezahlschranke/"]), [])

    def test_link_to_english_when_translation_exists_fails(self):
        failures = related_language_failures(["https://forrt.org/glossary/turkish/odeme_duvar%C4%B1_paywall_/"])
        self.assertEqual(len(failures), 1)
        self.assertIn("glossary/turkish/abstract", failures[0])


if __name__ == "__main__":
    unittest.main()
