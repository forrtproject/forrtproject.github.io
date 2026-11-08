"""Hugo's ignoreFiles keeps generator scripts and drafts in content/ out of the site (#976).

Run: python3 -m unittest discover -s scripts/tests -p test_bundle_exclusions.py
"""

from pathlib import Path
import re
import tomllib
import unittest

ROOT = Path(__file__).resolve().parents[2]
CONFIG = tomllib.loads((ROOT / "config/_default/config.toml").read_text(encoding="utf-8"))


def ignored(path):
    return any(re.search(pattern, path) for pattern in CONFIG["ignoreFiles"])


class BundleExclusionTests(unittest.TestCase):
    def test_generator_scripts_and_drafts_are_ignored(self):
        for path in sorted(ROOT.glob("content/**/*.py")) + sorted(ROOT.glob("content/**/*.mdOUT")):
            with self.subTest(path=path):
                self.assertTrue(ignored(str(path.relative_to(ROOT))))

    def test_pages_and_bundle_assets_are_not_ignored(self):
        for path in ("content/summaries/_index.md", "content/summaries/FORRT_O&R_101_Syllabus.pdf",
                     "content/glossary/apa_lookup.json", "content/clusters/FORRT_Clusters.webp"):
            with self.subTest(path=path):
                self.assertFalse(ignored(path))


if __name__ == "__main__":
    unittest.main()
