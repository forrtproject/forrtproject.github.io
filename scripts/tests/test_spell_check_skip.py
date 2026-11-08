"""PR-mode spell checks honour the .codespellrc skip list."""
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "spell_check"))
import check_spelling as spell  # noqa: E402

PATTERNS = ["content/glossary/german", "*.json", "content/glossary/english/open_material.md", "themes"]


class SkipListTests(unittest.TestCase):
    def test_skipped_directories_files_and_globs(self):
        for path in ("content/glossary/german/a_priori_verteilung.md", "data/x.json",
                     "content/glossary/english/open_material.md", "themes/academic/layouts/a.html"):
            with self.subTest(path=path):
                self.assertTrue(spell.is_skipped(path, PATTERNS))

    def test_other_files_are_checked(self):
        for path in ("content/glossary/english/p_hacking.md", "content/glossary/german_notes.md", "CONTRIBUTING.md"):
            with self.subTest(path=path):
                self.assertFalse(spell.is_skipped(path, PATTERNS))

    def test_repository_config_is_read(self):
        root = Path(__file__).resolve().parents[2]
        self.assertIn("content/glossary/turkish", spell.skip_patterns(root / ".codespellrc"))


if __name__ == "__main__":
    unittest.main()
