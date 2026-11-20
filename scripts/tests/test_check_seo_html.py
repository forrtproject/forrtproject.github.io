"""Tests for the runner in check_seo_html.py; each check's tests are in test_seo_<check>.py.

Run with python3 -m unittest discover -s scripts/tests -p 'test_*seo*.py'.
"""
import sys
import tempfile
import types
import unittest
from contextlib import redirect_stdout
from html import escape
from io import StringIO
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import check_seo_html as seo  # noqa: E402
from seo_checks._site import page_from_html  # noqa: E402


def stub(result):
    """A check module that always returns this result."""
    module = types.ModuleType("seo_checks.stub")
    module.__doc__ = "Stub check."
    module.check = lambda site: result
    return module


def run(checks, html="<h1>Home</h1>"):
    with tempfile.TemporaryDirectory() as public:
        (Path(public) / "index.html").write_text(html, encoding="utf-8")
        output = StringIO()
        with redirect_stdout(output):
            code = seo.main(public, checks)
    return code, output.getvalue()


class Runner(unittest.TestCase):
    def test_every_check_module_is_loaded(self):
        files = [p for p in seo.CHECKS_DIR.glob("*.py") if not p.name.startswith("_")]
        self.assertTrue(files)
        self.assertEqual(len(seo.load_checks()), len(files))

    def test_exit_code_follows_failures(self):
        self.assertEqual(run([stub([]), stub({"images": []})])[0], 0)
        code, output = run([stub([]), stub({"images": ["a.webp"]})])
        self.assertEqual(code, 1)
        self.assertIn("FAIL stub: Stub check.", output)
        self.assertIn("images: 1", output)

    def test_report_only_sections_never_fail(self):
        code, output = run([], "<meta name='description' content='See https://example.org'>")
        self.assertEqual(code, 0)
        self.assertIn("pages whose meta description contains a raw URL: 1", output)


class DescriptionURLReport(unittest.TestCase):
    def report(self, text, extra=""):
        page = page_from_html('<meta name="description" content="%s">%s' % (escape(text), extra))
        return seo.description_urls([page])

    def test_plain_domain_and_visitors_summary_pass(self):
        for text in ("Visit forrt.org", "Where forrt.org's visitors come from and which pages they read, over the past 30 days and the past year."):
            self.assertEqual(self.report(text), [])

    def test_raw_urls_and_bare_site_paths_are_listed(self):
        for text in ("See https://example.org", "See HTTP://example.org", "Read forrt.org/resources/", "www.forrt.org/about/"):
            with self.subTest(text=text):
                self.assertEqual(self.report(text), ["index.html"])

    def test_nonindexable_descriptions_are_not_listed(self):
        for exclusion in ("<meta name='robots' content='noindex'>",
                          "<meta http-equiv='refresh' content='0;url=/other/'>",
                          "<link rel='canonical' href='https://example.org/other/'>"):
            with self.subTest(exclusion=exclusion):
                self.assertEqual(self.report("See https://example.org", exclusion), [])


if __name__ == "__main__":
    unittest.main()
