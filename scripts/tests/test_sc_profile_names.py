"""Run with python3 -m unittest discover -s scripts/tests -p test_sc_profile_names.py."""
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import generate_sc_profiles as sc


@unittest.skipIf(sc.pd is None, "pandas is not installed")
class NameTests(unittest.TestCase):
    def test_display_name_house_style(self):
        self.assertEqual(sc.display_name("dr. Steven Verheyen"), "Dr Steven Verheyen")
        self.assertEqual(sc.display_name("Giorgia Andreolli, PhD"), "Dr Giorgia Andreolli")
        self.assertEqual(sc.display_name("Prof Jane Doe, PhD"), "Prof Jane Doe")
        self.assertEqual(sc.display_name("Jane Doe, PhD Student"), "Jane Doe, PhD Student")
        self.assertEqual(sc.display_name("Jonas Zaman (Assist. Prof)"), "Jonas Zaman (Assist. Prof)")

    def test_strip_title_leaves_only_the_names(self):
        self.assertEqual(sc.strip_title("Dr Giorgia Andreolli"), "Giorgia Andreolli")
        self.assertEqual(sc.strip_title("Jane Doe, M.Sc."), "Jane Doe")
        self.assertEqual(sc.strip_title("Jonas Zaman (Assist. Prof)"), "Jonas Zaman")
        self.assertEqual(sc.get_initials(sc.strip_title("Jonas Zaman (Assist. Prof)")), "JZ")

    def test_match_key_ignores_titles_and_notes(self):
        key = sc.match_key("Stephanie Zellers")
        self.assertEqual(sc.match_key("Stephanie Zellers, PhD"), key)
        self.assertEqual(sc.match_key("Dr. Stephanie Zellers (gmail)"), key)

    def test_find_match_keeps_different_people_apart(self):
        # The closest pair of different people in the Nov 2026 sheets.
        self.assertIsNone(sc.find_match("Tom Heyman", ["thomas rhys evan"], threshold=0.75))
        self.assertEqual(
            sc.find_match("Maddi Pownall", ["madeleine pownall"], threshold=0.75),
            "madeleine pownall")


@unittest.skipIf(sc.pd is None, "pandas is not installed")
class AuthorDirTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.root = Path(tmp.name)

    def make(self, *names):
        for name in names:
            (self.root / name).mkdir()

    def test_separator_free_folder_matches_regardless_of_case(self):
        self.make("RuthVanDerHallenPhD", "jane-doe")
        self.assertEqual(
            sc.find_existing_author_dir("Ruth Van der Hallen, PhD", self.root),
            "RuthVanDerHallenPhD")

    def test_exact_slug_wins_over_lookalikes(self):
        self.make("annalee", "anna-lee")
        self.assertEqual(sc.find_existing_author_dir("Anna Lee", self.root), "anna-lee")

    def test_ambiguous_separator_free_match_returns_none(self):
        self.make("annalee", "anna-lee")
        self.assertIsNone(sc.find_existing_author_dir("Ann Alee", self.root))

    def test_ambiguous_fuzzy_match_returns_none(self):
        self.make("hannah-smyth", "hannah-smithe")
        self.assertIsNone(sc.find_existing_author_dir("Hannah Smith", self.root))

    def test_single_close_folder_is_reused(self):
        self.make("giorgia-andreolli", "john-roe")
        self.assertEqual(
            sc.find_existing_author_dir("Dr Giorgia Andreoli", self.root), "giorgia-andreolli")


class BioTests(unittest.TestCase):
    def test_empty_bio_renders_nothing(self):
        self.assertEqual(sc.render_bio(""), "")

    def test_bio_is_escaped(self):
        self.assertIn("&lt;b&gt;", sc.render_bio("<b>"))


if __name__ == "__main__":
    unittest.main()
