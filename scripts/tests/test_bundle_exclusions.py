"""Build with Hugo, or check an existing build via FORRT_TEST_BUILD_DIR.

Run: python3 -m unittest discover -s scripts/tests -p test_bundle_exclusions.py
"""

import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[2]


class BundleExclusionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        existing = os.environ.get("FORRT_TEST_BUILD_DIR")
        if existing:
            cls.build = Path(existing).resolve()
            return
        if not shutil.which("hugo"):
            raise unittest.SkipTest("Hugo is required to check bundle publication")
        scratch = tempfile.TemporaryDirectory(prefix="scratch-bundle-exclusions-", dir=ROOT)
        cls.addClassCleanup(scratch.cleanup)
        scratch_path = Path(scratch.name)
        cls.build = scratch_path / "public"
        result = subprocess.run(
            ["hugo", "--destination", str(cls.build),
             "--cacheDir", str(scratch_path / "cache")],
            cwd=ROOT,
            env={**os.environ, "HUGO_RESOURCEDIR": str(scratch_path / "resources")},
            capture_output=True, text=True,
        )
        if result.returncode:
            raise AssertionError(f"Hugo build failed:\n{result.stdout}\n{result.stderr}")

    def test_generator_scripts_and_draft_outputs_are_not_published(self):
        self.assertTrue((self.build / "index.html").is_file(), "Expected a complete Hugo build")
        unwanted = sorted(
            str(path.relative_to(self.build))
            for pattern in ("*.py", "*.mdOUT")
            for path in self.build.rglob(pattern)
            if path.is_file()
        )
        self.assertEqual(unwanted, [], "Generator scripts and draft outputs must stay unpublished")

    def test_legitimate_pages_and_bundle_assets_remain(self):
        for page in ("resources/index.html", "summaries/index.html", "glossary/references/index.html"):
            with self.subTest(page=page):
                self.assertTrue((self.build / page).is_file(), f"Missing page: {page}")
        for asset in ("summaries/FORRT_O&R_101_Syllabus.pdf", "glossary/apa_lookup.json"):
            with self.subTest(asset=asset):
                self.assertEqual((self.build / asset).read_bytes(), (ROOT / "content" / asset).read_bytes())


if __name__ == "__main__":
    unittest.main()
