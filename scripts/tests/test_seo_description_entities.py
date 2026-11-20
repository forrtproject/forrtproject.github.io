import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import description_entities  # noqa: E402
from seo_checks._site import Site, page_from_html  # noqa: E402


def failures_for(raw_description):
    """The check on one page whose description has this raw attribute value."""
    page = page_from_html("<meta name='description' content='%s'>" % raw_description)
    return description_entities.check(Site("", [page]))


class DescriptionEntityCheck(unittest.TestCase):
    def test_correctly_escaped_description_passes(self):
        self.assertEqual(failures_for("R&amp;D &#34;quotes&#34; “curly”"), [])

    def test_escaped_text_that_is_not_an_entity_passes(self):
        for raw in ("the &amp;name; syntax", "the &amp;notanentity; syntax"):
            with self.subTest(raw):
                self.assertEqual(failures_for(raw), [])

    def test_double_escaped_entities_fail(self):
        for raw, entity in (("&amp;ldquo;quote&amp;rdquo;", "&ldquo;"),
                            ("R&amp;amp;D", "&amp;"),
                            ("it&amp;#39;s", "&#39;"),
                            ("it&amp;#x27;s", "&#x27;")):
            with self.subTest(raw):
                failures = failures_for(raw)
                self.assertEqual(len(failures), 1)
                self.assertIn(entity, failures[0])


if __name__ == "__main__":
    unittest.main()
