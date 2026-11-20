import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import tempfile  # noqa: E402

from seo_checks import cluster_title_markup  # noqa: E402
from seo_checks._site import Site  # noqa: E402


def check(public):
    return cluster_title_markup.check(Site(public, []))


class ClusterTitleMarkupCheck(unittest.TestCase):
    def failures(self, body):
        with tempfile.TemporaryDirectory() as public:
            page = Path(public) / "clusters" / "cluster-1" / "index.html"
            page.parent.mkdir(parents=True)
            page.write_text("<div class=fc-title>%s</div>" % body, encoding="utf-8")
            return check(public)

    def test_rendered_markup_passes(self):
        self.assertEqual(self.failures("In <span class=scp>A</span>frica at <i>Cognition</i> (p &lt; .05)"), [])

    def test_literal_or_unrendered_markup_fails(self):
        for body in ("at &lt;i&gt;Cognition&lt;/i&gt;", "in <scp>A</scp>frica", "&lt;em&gt;AIMS&lt;/em&gt;",
                     "at &amp;lt;i&amp;gt;Cognition&amp;lt;/i&amp;gt;"):
            self.assertEqual(self.failures(body), ["clusters/cluster-1/index.html"], body)

    def test_missing_cluster_pages_fail(self):
        with tempfile.TemporaryDirectory() as public:
            self.assertEqual(check(public), ["clusters/ (no cluster pages found)"])


if __name__ == "__main__":
    unittest.main()
