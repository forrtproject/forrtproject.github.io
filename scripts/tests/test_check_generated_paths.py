import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS))
from check_generated_paths import generated_source


class GeneratedPathsTest(unittest.TestCase):
    def test_generators_and_manual_sources(self):
        for path in (
            "data/summaries.json",
            "data/open_research_games.json",
            "data/scholar_citations.json",
            "content/post/announcement/index.md",
            "content/curated_resources/topic/index.md",
            "content/glossary/fr/terme.md",
        ):
            with self.subTest(path=path):
                self.assertIsNotNone(generated_source(path))
        self.assertIn("content/summaries/summaries.py", generated_source("data/summaries.json"))
        for path in (
            "data/partners.json",
            "data/publications.yaml",
            "data/themes/forrt.toml",
            "data/fonts/forrt.toml",
            "content/glossary/_create_glossaries.py",
            "content/glossary/_build_references.py",
            "content/curated_resources/_index.md",
            "content/summaries/_index.md",
            "content/summaries/summaries.py",
        ):
            with self.subTest(path=path):
                self.assertIsNone(generated_source(path))

    def test_merge_base_and_rename(self):
        with tempfile.TemporaryDirectory(prefix="scratch-generated-paths-") as directory:
            root = Path(directory)

            def git(*args):
                subprocess.run(["git", *args], cwd=root, check=True, capture_output=True)

            def check():
                return subprocess.run(
                    [sys.executable, SCRIPTS / "check_generated_paths.py", "--base", "base"],
                    cwd=root, capture_output=True, text=True,
                )

            git("init", "-b", "base")
            git("config", "user.name", "Test")
            git("config", "user.email", "test@example.org")
            git("config", "commit.gpgsign", "false")
            path = "content/glossary/un terme é.md"
            (root / path).parent.mkdir(parents=True)
            (root / path).write_text("generated glossary term", encoding="utf-8")
            git("add", ".")
            git("commit", "-m", "initial")
            git("branch", "topic")
            (root / path).write_text("updated glossary term", encoding="utf-8")
            git("commit", "-am", "regenerate on base")
            git("switch", "topic")
            self.assertEqual(check().returncode, 0)
            git("mv", path, "manual.md")
            git("commit", "-m", "move the output")
            result = check()
            self.assertEqual(result.returncode, 1)
            self.assertIn(path, result.stdout)
