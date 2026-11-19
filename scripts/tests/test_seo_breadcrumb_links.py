import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import breadcrumb_links  # noqa: E402
from seo_checks._site import Site, page_from_html  # noqa: E402


class BreadcrumbLinkCheck(unittest.TestCase):
    def test_empty_crumb_link_fails_and_links_outside_the_trail_are_ignored(self):
        good = page_from_html('<nav class="crumbs"><a href="/">Home</a> <a href="/about/">About</a></nav><a href>x</a>',
                              "good/index.html")
        bad = page_from_html('<nav class="crumbs"><a href="/">Home</a> <a href>About</a></nav>', "bad/index.html")
        self.assertEqual(breadcrumb_links.check(Site("", [good, bad])), ["bad/index.html"])


if __name__ == "__main__":
    unittest.main()
