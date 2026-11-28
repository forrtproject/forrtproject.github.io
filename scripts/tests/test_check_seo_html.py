"""Run with python3 -m unittest discover -s scripts/tests -p test_check_seo_html.py."""
from pathlib import Path
import json
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import check_seo_html as seo


def failures_for(raw_description):
    """Check 10 on one page whose description has this raw attribute value."""
    with tempfile.TemporaryDirectory() as public:
        html = "<html><head><meta name='description' content='%s'></head></html>"
        (Path(public) / "index.html").write_text(html % raw_description, encoding="utf-8")
        return seo.check_description_entities(seo.load_pages(public))


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


def flora_failures(html):
    """Check 11 on a FLoRA page with this HTML (None: no page)."""
    with tempfile.TemporaryDirectory() as public:
        if html is not None:
            page = Path(public) / seo.FLORA_PAGE
            page.parent.mkdir(parents=True)
            page.write_text(html, encoding="utf-8")
        return seo.check_flora_citation(public)


class FloraCitationCheck(unittest.TestCase):
    TITLE = "Azevedo, F. (2026). FORRT Library of Reproduction and Replication Attempts (FLoRA) [Data set]. "
    OSF = 'OSF. <a href="https://doi.org/10.17605/OSF.IO/9R62X">https://doi.org/10.17605/OSF.IO/9R62X</a>'
    ZENODO = 'Zenodo. <a href=https://doi.org/10.5281/zenodo.24461022>https://doi.org/10.5281/zenodo.24461022</a>'

    def test_citation_passes_whichever_doi_it_links(self):
        for doi in (self.OSF, self.ZENODO):
            with self.subTest(doi):
                self.assertEqual(flora_failures("<p>Wallrich, L.*, ... %s%s</p>" % (self.TITLE, doi)), [])

    def test_missing_citation_or_page_fails(self):
        self.assertIn("DOI", flora_failures("<p>How to cite:</p>")[0])
        self.assertIn("DOI", flora_failures("<p>%sOSF.</p><p><a href='https://doi.org/10.1/x'>other</a></p>" % self.TITLE.replace("(FLoRA)", "(FLoRA)" + " x" * 200))[0])
        self.assertIn("DOI", flora_failures("<p>See https://doi.org/10.5281/zenodo.24461022</p>")[0])
        self.assertIn("not found", flora_failures(None)[0])


def card_failures(alt):
    """Check 13 on one listing page holding the post's card image."""
    with tempfile.TemporaryDirectory() as public:
        html = "<html><body><img src='%s_hu_1.webp' alt='%s'></body></html>"
        page = html % (seo.ALT_TEXT_CARD_IMAGE, alt)
        (Path(public) / "index.html").write_text(page, encoding="utf-8")
        return seo.check_card_alt_text(seo.load_pages(public))


class CardAltTextCheck(unittest.TestCase):
    def test_supplied_alt_text_passes(self):
        self.assertEqual(card_failures("Bronfenbrenner ecological systems model"), [])

    def test_fallback_alt_text_fails(self):
        for alt in ("Featured image for From Awareness to Action", "From Awareness to Action"):
            with self.subTest(alt):
                self.assertEqual(card_failures(alt), ["index.html"])


NOINDEX = "<html><head><meta name='robots' content='noindex, follow'></head></html>"
INDEXED = "<html><head></head></html>"
URLSET = ("<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>%s</urlset>")


def sitemap_failures(sitemap_locs, index=False, write_sitemap=True):
    """Check 14 on a site with an indexed home page and a noindexed /authors/stub/.
    With index=True, sitemap.xml is an index of en/sitemap.xml, which write_sitemap=False
    leaves out; otherwise write_sitemap=False leaves out sitemap.xml itself."""
    with tempfile.TemporaryDirectory() as public:
        root = Path(public)
        (root / "authors" / "stub").mkdir(parents=True)
        (root / "index.html").write_text(INDEXED, encoding="utf-8")
        (root / "authors" / "stub" / "index.html").write_text(NOINDEX, encoding="utf-8")
        urls = "".join("<url><loc>https://forrt.org%s</loc></url>" % loc for loc in sitemap_locs)
        if index:
            (root / "sitemap.xml").write_text(
                "<sitemapindex xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>"
                "<sitemap><loc>https://forrt.org/en/sitemap.xml</loc></sitemap>"
                "</sitemapindex>", encoding="utf-8")
            if write_sitemap:
                (root / "en").mkdir()
                (root / "en" / "sitemap.xml").write_text(URLSET % urls, encoding="utf-8")
        elif write_sitemap:
            (root / "sitemap.xml").write_text(URLSET % urls, encoding="utf-8")
        return seo.check_sitemap_noindex(public, seo.load_pages(public))


class SitemapNoindexCheck(unittest.TestCase):
    def test_indexed_pages_pass(self):
        self.assertEqual(sitemap_failures(["/"]), [])

    def test_noindexed_page_fails(self):
        self.assertEqual(sitemap_failures(["/", "/authors/stub/"]), ["/authors/stub/"])

    def test_sitemap_index_is_followed(self):
        self.assertEqual(sitemap_failures(["/authors/stub/"], index=True), ["/authors/stub/"])

    def test_missing_sitemap_fails(self):
        self.assertEqual(sitemap_failures([], write_sitemap=False), ["sitemap.xml (not found)"])

    def test_empty_sitemap_fails(self):
        for index in (False, True):
            with self.subTest(index=index):
                self.assertEqual(sitemap_failures([], index=index), ["sitemap.xml (lists no URLs)"])

    def test_missing_child_sitemap_fails(self):
        self.assertEqual(sitemap_failures([], index=True, write_sitemap=False),
                         ["en/sitemap.xml (not found)"])


class BulgarianGlossaryCheck(unittest.TestCase):
    def page(self, path, body):
        parser = seo.PageParser()
        parser.feed(body)
        return seo.Page(path, parser)

    def term(self, language="bg", heading='<h1>Термин <span lang=en>[Term]</span></h1>', links=""):
        metadata = {"@type":"DefinedTerm", "inLanguage":language,
                    "inDefinedTermSet":{"inLanguage":language}}
        return self.page("glossary/bulgarian/термин/index.html",
                         heading + '<script type="application/ld+json">' + json.dumps(metadata) + '</script>' + links)

    def test_correct_language_and_unquoted_span_pass(self):
        self.assertEqual(seo.check_bulgarian_glossary([self.term()]), [])

    def test_emphasized_statistic_in_english_suffix_passes(self):
        term = self.term(heading='<h1><em>p</em>-стойност <span lang=en>[<em>p</em>-value]</span></h1>')
        self.assertEqual(seo.check_bulgarian_glossary([term]), [])

    def test_english_structured_data_fails(self):
        self.assertIn("language is not bg", seo.check_bulgarian_glossary([self.term(language="en")])[0])

    def test_unmarked_english_heading_fails(self):
        self.assertIn("suffix lacks lang=en", seo.check_bulgarian_glossary([self.term(heading='<h1>Термин [Term]</h1>')])[0])

    def test_minified_missing_link_is_detected(self):
        term = self.term(links='<a href=https://forrt.org/glossary/english/missing/>Term</a>')
        self.assertIn("missing glossary link", seo.check_bulgarian_glossary([term])[0])

    def test_encoded_existing_route_and_alias_pass(self):
        target = self.term()
        target.path = "glossary/bulgarian/друг/index.html"
        alias = self.page("glossary/old_term/index.html", '<meta http-equiv=refresh content="0">')
        term = self.term(links='<a href=/glossary/bulgarian/%D0%B4%D1%80%D1%83%D0%B3/>Друг</a><a href=/glossary/old_term/>Old</a>')
        self.assertEqual(seo.check_bulgarian_glossary([term,target,alias]), [])

    def test_missing_defined_term_fails(self):
        page = self.page("glossary/bulgarian/термин/index.html", '<h1>Термин</h1>')
        self.assertIn("missing valid DefinedTerm", seo.check_bulgarian_glossary([page])[0])

    def test_invalid_or_unrelated_jsonld_does_not_replace_defined_term(self):
        for block in ('{broken', 'null', '[]', '{"@type":"WebPage"}'):
            with self.subTest(block=block):
                page = self.page("glossary/bulgarian/термин/index.html",
                                 '<script type="application/ld+json">'+block+'</script>')
                self.assertIn("missing valid DefinedTerm", seo.check_bulgarian_glossary([page])[0])

    def test_non_object_term_set_reports_failure_without_crashing(self):
        for value in (None, [], "bg", 42, True):
            with self.subTest(value=value):
                page = self.term()
                metadata = json.loads(page.jsonld[0])
                metadata["inDefinedTermSet"] = value
                page.jsonld = [json.dumps(metadata)]
                self.assertIn("inDefinedTermSet is not an object", seo.check_bulgarian_glossary([page])[0])

    def test_landing_and_redirect_pages_do_not_need_defined_term(self):
        landing = self.page("glossary/bulgarian/index.html", '<h1>Речник</h1>')
        redirect = self.page("glossary/bulgarian/old/index.html", '<meta http-equiv=refresh content="0">')
        self.assertEqual(seo.check_bulgarian_glossary([landing,redirect]), [])


if __name__ == "__main__":
    unittest.main()
