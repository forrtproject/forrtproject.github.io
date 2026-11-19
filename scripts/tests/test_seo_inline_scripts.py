import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import inline_scripts  # noqa: E402
from seo_checks._site import Site, page_from_html  # noqa: E402


class InlineScriptCheck(unittest.TestCase):
    def failures(self, body):
        return inline_scripts.check(Site("", [page_from_html("<html><body>%s</body></html>" % body)]))

    def test_small_inline_and_external_scripts_pass(self):
        self.assertEqual(self.failures("<script>var a = 1;</script><script src='big.js'></script>"), [])

    def test_inline_data_over_the_limit_fails(self):
        data = "x" * (inline_scripts.MAX_INLINE_SCRIPT + 1)
        self.assertEqual(self.failures("<script>window.DATA = '%s';</script>" % data), ["index.html (200 KB)"])

    def test_unclosed_inline_data_fails(self):
        data = "x" * (inline_scripts.MAX_INLINE_SCRIPT + 1)
        self.assertEqual(self.failures("<script>window.DATA = '%s';" % data), ["index.html (200 KB)"])


if __name__ == "__main__":
    unittest.main()
