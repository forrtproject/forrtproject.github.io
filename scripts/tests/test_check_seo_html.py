"""Run with python3 -m unittest discover -s scripts/tests -p test_check_seo_html.py."""
from pathlib import Path
import json
from contextlib import redirect_stdout
from io import StringIO
from html import escape
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


def page_from_html(text, path="index.html"):
    parser = seo.PageParser()
    parser.feed(text)
    return seo.Page(path, parser)


class DescriptionURLReport(unittest.TestCase):
    def test_plain_domain_and_visitors_summary_pass(self):
        for text in ("Visit forrt.org", "Where forrt.org's visitors come from and which pages they read, over the past 30 days and the past year."):
            self.assertEqual(seo.check_description_urls([
                page_from_html('<meta name="description" content="%s">' % escape(text))]), [])

    def test_raw_urls_and_bare_site_paths_fail(self):
        for text in ("See https://example.org", "See HTTP://example.org", "Read forrt.org/resources/", "www.forrt.org/about/"):
            with self.subTest(text=text):
                page = page_from_html('<meta name="description" content="%s">' % escape(text))
                self.assertEqual(seo.check_description_urls([page]), ["index.html"])

    def test_raw_url_report_does_not_fail_otherwise_valid_build(self):
        with tempfile.TemporaryDirectory() as public:
            html = ("<meta name='description' content='See https://example.org'>"
                    "<meta property='og:image' content='https://example.org/share.png'>"
                    "<meta name='twitter:image' content='https://example.org/share.png'>"
                    "<meta property='og:image:type' content='image/png'>"
                    "<meta property='og:image:width' content='1200'>"
                    "<meta property='og:image:height' content='630'>"
                    "<meta name='twitter:card' content='summary_large_image'>")
            (Path(public) / "index.html").write_text(html, encoding="utf-8")
            output = StringIO()
            with redirect_stdout(output):
                self.assertEqual(seo.main(public), 0)
            self.assertIn("pages whose meta description contains a raw URL: 1", output.getvalue())

    def test_nonindexable_descriptions_are_not_reported(self):
        for exclusion in ("<meta name='robots' content='noindex'>",
                          "<meta http-equiv='refresh' content='0;url=/other/'>",
                          "<link rel='canonical' href='https://example.org/other/'>"):
            with self.subTest(exclusion=exclusion):
                page = page_from_html("<meta name='description' content='See https://example.org'>" + exclusion)
                self.assertFalse(page.indexable)
                self.assertEqual(seo.check_description_urls([page]), [])


class ShareImageMetadataCheck(unittest.TestCase):
    def page(self, **overrides):
        meta = {"og:image": "https://example.org/preview/social/test.png",
                "twitter:image": "https://example.org/preview/social/test.png",
                "og:image:type": "image/png", "og:image:width": "7", "og:image:height": "5"}
        meta.update(overrides)
        return page_from_html("".join('<meta property="%s" content="%s">' % (k, v) for k, v in meta.items()))

    def test_matching_png_metadata_passes(self):
        self.assertEqual(seo.check_share_image_metadata([self.page()]), [])

    def test_incorrect_type_dimensions_or_twitter_url_fail(self):
        for change in ({"og:image:type": "image/webp"}, {"og:image:width": "0"},
                       {"og:image:height": "unknown"}, {"twitter:image": "original.webp"}):
            with self.subTest(change=change):
                self.assertTrue(seo.check_share_image_metadata([self.page(**change)]))

    def test_undecodable_original_remains_report_only(self):
        self.assertEqual(seo.check_share_image_metadata([self.page(**{"og:image": "original.webp"})]), [])


class ResourcePaginationCheck(unittest.TestCase):
    def pages(self, prefix=""):
        pages = []
        for number in (1, 2, 3):
            relative = "resources/" + ("page/%d/" % number if number > 1 else "")
            url = "https://example.org" + prefix + "/" + relative
            name = "Resources" + (" – Page %d" % number if number > 1 else "")
            resource = prefix + "/curated_resources/item-%d/" % number
            data = {"@type": "CollectionPage", "@id": url + "#collection", "url": url, "name": name,
                    "mainEntity": {"numberOfItems": 1, "itemListElement": [{"url": "https://example.org" + resource}]}}
            text = ('<title>%s | FORRT</title><link rel="canonical" href="%s">'
                    '<meta property="og:url" content="%s"><meta property="og:title" content="%s | FORRT">'
                    '<meta name="description" content="Resources, page %d of 3">'
                    '<script type="application/ld+json">%s</script>'
                    '<h2 class="res-title"><a href="%s">Resource</a></h2>') % (name, url, url, name, number, json.dumps(data), resource)
            pages.append(page_from_html(text, relative + "index.html"))
        return pages

    def test_self_canonical_numbered_subsets_pass_with_preview_prefix(self):
        for prefix in ("", "/rebrand-doors"):
            with self.subTest(prefix=prefix):
                self.assertEqual(seo.check_resource_pagination(self.pages(prefix)), [])

    def test_staging_noindex_applies_to_directory_and_subsets(self):
        pages = self.pages("/rebrand-doors")
        for page in pages:
            page.noindex = True
        self.assertEqual(seo.check_resource_pagination(pages), [])

    def test_repeated_first_page_metadata_fails(self):
        pages = self.pages()
        pages[1].canonical = pages[0].canonical
        pages[1].title = pages[0].title
        pages[1].descriptions = pages[0].descriptions
        failures = seo.check_resource_pagination(pages)
        self.assertEqual(len(failures), 1)
        for text in ("not self-canonical", "repeated title", "repeated description", "omits page number"):
            self.assertIn(text, failures[0])

    def test_wrong_structured_subset_fails(self):
        pages = self.pages()
        pages[1].resource_links = pages[0].resource_links
        self.assertIn("subset does not match HTML cards", seo.check_resource_pagination(pages)[0])

    def test_query_canonical_is_never_used_for_subsets(self):
        pages = self.pages()
        pages[1].canonical += "?type=reading"
        self.assertIn("not self-canonical", seo.check_resource_pagination(pages)[0])


class InlineScriptCheck(unittest.TestCase):
    def failures(self, body):
        with tempfile.TemporaryDirectory() as public:
            (Path(public) / "index.html").write_text("<html><body>%s</body></html>" % body, encoding="utf-8")
            return seo.check_inline_scripts(seo.load_pages(public))

    def test_small_inline_and_external_scripts_pass(self):
        self.assertEqual(self.failures("<script>var a = 1;</script><script src='big.js'></script>"), [])

    def test_inline_data_over_the_limit_fails(self):
        data = "x" * (seo.MAX_INLINE_SCRIPT + 1)
        self.assertEqual(self.failures("<script>window.DATA = '%s';</script>" % data), ["index.html (200 KB)"])

    def test_unclosed_inline_data_fails(self):
        data = "x" * (seo.MAX_INLINE_SCRIPT + 1)
        self.assertEqual(self.failures("<script>window.DATA = '%s';" % data), ["index.html (200 KB)"])


class CitationTargetCheck(unittest.TestCase):
    def check(self, html):
        parser = seo.PageParser()
        parser.feed(html)
        return seo.check_citation_targets([seo.Page("example/index.html", parser)])

    def test_reference_after_citation(self):
        self.assertEqual(self.check('<a class="cite" href="#ref-Key">Author, 2020</a>'
                                    '<li id="ref-Key">Reference</li>'), [])

    def test_missing_reference_or_nonlocal_link(self):
        for href in ('#ref-Unknown', '/other/#ref-Key', '#Key', ''):
            with self.subTest(href):
                self.assertTrue(self.check('<a class="other cite" href="%s">Citation</a>'
                                           '<li id="ref-Key">Reference</li>' % href))

    def test_other_links_are_ignored(self):
        self.assertEqual(self.check('<a href="#elsewhere">Link</a>'), [])


class GlossaryLinkCheck(unittest.TestCase):
    def check_links(self, hrefs, base="https://forrt.org/"):
        with tempfile.TemporaryDirectory() as public:
            root = Path(public)
            term = root / "glossary/english/preregistration/index.html"
            term.parent.mkdir(parents=True)
            term.write_text('<link rel="canonical" href="%sglossary/english/preregistration/">' % base)
            links = "".join('<a class="other gloss-term" href="%s">term</a>' % href for href in hrefs)
            (root / "index.html").write_text('<link rel="canonical" href="%s">%s' % (base, links))
            return seo.check_glossary_links(seo.load_pages(public))

    def test_existing_term_and_preview_base_pass(self):
        for base in ("https://forrt.org/", "https://forrt.org/rebrand-doors/"):
            with self.subTest(base=base):
                self.assertEqual(self.check_links([
                    base + "glossary/english/preregistration/",
                    "glossary/english/preregistration/#definition",
                ], base), [])

    def test_missing_non_english_external_and_empty_links_fail(self):
        links = ["/glossary/english/missing/", "/glossary/german/preregistration/",
                 "https://example.org/glossary/english/preregistration/", ""]
        self.assertEqual(len(self.check_links(links)), len(links))


class GlossaryTitleMarkdownCheck(unittest.TestCase):
    def check(self, title, h1, path="glossary/english/term/index.html"):
        html = "<title>%s</title><h1>%s</h1>" % (title, h1)
        return seo.check_glossary_title_markdown([page_from_html(html, path)])

    def test_rendered_emphasis_and_lone_asterisk_pass(self):
        self.assertEqual(self.check("Research Contribution Metric (p) | FORRT",
                                    "Research Contribution Metric (<em>p</em>)"), [])
        self.assertEqual(self.check("G*Power | FORRT", "G*Power"), [])

    def test_literal_emphasis_fails_on_glossary_pages_only(self):
        self.assertEqual(len(self.check("Research Contribution Metric (*p*) | FORRT", "x")), 1)
        self.assertEqual(len(self.check("x", "Research Contribution Metric (*p*)")), 1)
        self.assertEqual(self.check("x", "*p*", path="post/x/index.html"), [])


if __name__ == "__main__":
    unittest.main()

