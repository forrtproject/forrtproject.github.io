import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import glossary_aka_filter  # noqa: E402
from seo_checks._site import Site  # noqa: E402


class GlossaryAkaFilterCheck(unittest.TestCase):
    HUB = ('<li data-term="type i error · false-positive · alpha error">\n  <a href="/glossary/english/type_i_error/">Type I error</a></li>'
           '<li data-term="p-hacking · fishing · p-value fishing"><a href="/glossary/english/p_hacking/">p-hacking</a></li>')

    def page(self, names):
        return '<h1>T</h1><p class="term-aka"><span class="term-aka-label">Also known as:</span> %s</p>' % names

    def test_names_in_the_hub_filter_pass(self):
        pages = {"/glossary/english/type_i_error/": self.page("False-positive, Alpha error"),
                 "/glossary/english/p_hacking/": self.page("Fishing, <em>p</em>-value fishing"),
                 "/glossary/english/other/": "<h1>No other names</h1>"}
        self.assertEqual(glossary_aka_filter.glossary_aka_failures(self.HUB, pages), [])

    def test_preview_prefix_on_hub_links_is_ignored(self):
        hub = self.HUB.replace('href="/glossary/', 'href="/rebrand-doors/glossary/')
        pages = {"/glossary/english/type_i_error/": self.page("Alpha error")}
        self.assertEqual(glossary_aka_filter.glossary_aka_failures(hub, pages), [])

    def test_missing_hub_fails(self):
        with tempfile.TemporaryDirectory() as public:
            self.assertEqual(glossary_aka_filter.check(Site(public, [])), ["%s (page not found)" % glossary_aka_filter.GLOSSARY_HUB])

    def test_name_missing_from_the_hub_filter_fails(self):
        pages = {"/glossary/english/type_i_error/": self.page("Alpha error, Type 1 error"),
                 "/glossary/english/missing/": self.page("Lost")}
        self.assertEqual(glossary_aka_filter.glossary_aka_failures(self.HUB, pages),
                         ["/glossary/english/missing/ (Lost)", "/glossary/english/type_i_error/ (Type 1 error)"])


if __name__ == "__main__":
    unittest.main()
