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
            (Path(public) / "sitemap.xml").write_text(URLSET % "<url><loc>https://forrt.org/</loc></url>", encoding="utf-8")
            cluster = Path(public) / "clusters" / "cluster-1" / "index.html"
            cluster.parent.mkdir(parents=True)
            cluster.write_text("<meta name='description' content='Cluster 1'><h1>Cluster 1</h1>", encoding="utf-8")
            flora = Path(public) / seo.FLORA_PAGE
            flora.parent.mkdir(parents=True)
            flora.write_text("<meta name='description' content='FLoRA'><h1>FLoRA</h1><p>FORRT Library of Reproduction and Replication Attempts (FLoRA) [Data set]. <a href=https://doi.org/10.17605/OSF.IO/9R62X>https://doi.org/10.17605/OSF.IO/9R62X</a></p>", encoding="utf-8")
            hub = Path(public) / seo.GLOSSARY_HUB
            hub.parent.mkdir(parents=True)
            hub.write_text("<meta name='description' content='Glossary'><h1>Glossary</h1>", encoding="utf-8")
            for name in ("", "open-reproducible", "diversity-equity-inclusion"):
                summary_page = Path(public) / "summaries" / name / "index.html"
                summary_page.parent.mkdir(parents=True, exist_ok=True)
                summary_page.write_text("<meta name='description' content='Summaries'>", encoding="utf-8")
            output = StringIO()
            with redirect_stdout(output):
                self.assertEqual(seo.main(public, summaries={}), 0)
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


class SummaryTakeawayLinkCheck(unittest.TestCase):
    path = "summaries/open-reproducible/index.html"

    def check(self, link, after=""):
        html = '<ul class="summary-takeaways"><li>' + link + '</li></ul>' + after
        return seo.check_summary_takeaway_links([page_from_html(html, self.path)])

    def test_google_redirect_fails(self):
        href = "https://www.google.com/url?q=https://example.org/paper&sa=D"
        self.assertEqual(self.check(f'<a href="{escape(href)}">Paper</a>'), [f"{self.path}: {href!r}"])

    def test_missing_or_placeholder_href_fails(self):
        self.assertEqual(self.check("<a>Paper</a>"), [f"{self.path}: ''"])
        for href in ("", "#", "#ZgotmplZ"):
            with self.subTest(href=href):
                self.assertEqual(self.check(f'<a href="{href}">Paper</a>'), [f"{self.path}: {href!r}"])

    def test_direct_links_pass(self):
        for href in ("https://example.org/paper", "#h.study", "/summaries/open-reproducible/#h.study"):
            with self.subTest(href=href):
                self.assertEqual(self.check(f'<a href="{href}">Paper</a>'), [])

    def test_other_links_are_ignored(self):
        self.assertEqual(self.check("Plain takeaway", '<ul><li><a href="#">Related paper</a></li></ul>'), [])


class SummaryCreditMarkerCheck(unittest.TestCase):
    credit = '<p class="summary-credit"><small>Summary by Dr Tamara Kalandadze</small></p>'
    marked = {"summary_1": {"Title": "Paper ⬦"}, "summary_2": {"Title": "Other paper ⌺⬦"}}

    def check(self, html, *, dei_html="", summaries=None, missing=None):
        with tempfile.TemporaryDirectory() as public:
            for slug, body in (("", ""), ("open-reproducible", html), ("diversity-equity-inclusion", dei_html)):
                if slug == missing:
                    continue
                collection = Path(public) / "summaries" / slug / "index.html"
                collection.parent.mkdir(parents=True, exist_ok=True)
                collection.write_text(body, encoding="utf-8")
            return seo.check_summary_credit_marker(public, summaries=summaries or {})

    def test_title_markers_fail_in_html_and_json_ld(self):
        for html in ("<h3>Paper ⬦</h3>", "<h3>Paper &#x2b26;</h3>",
                     r'<script type="application/ld+json">{"name":"Paper \u2b26"}</script>'):
            with self.subTest(html=html):
                self.assertEqual(self.check(html), ["summaries/open-reproducible/index.html: raw summary author marker"])

    def test_missing_page_fails(self):
        self.assertEqual(self.check("", missing="diversity-equity-inclusion"),
                         ["summaries/diversity-equity-inclusion/index.html: missing page"])

    def test_no_credit_needed_for_data_without_author_markers(self):
        self.assertEqual(self.check("<h3>Paper ◈ ⌺</h3>", summaries={"summary_1": {"Title": "Paper ◈ ⌺"}}), [])
        self.assertTrue(self.check(self.credit))

    def test_requires_credits_matching_each_collections_data(self):
        self.assertEqual(self.check(self.credit * 2, dei_html=self.credit, summaries=self.marked), [])
        failures = self.check(self.credit, dei_html=self.credit.replace("Tamara", "Other"), summaries=self.marked)
        self.assertEqual(failures, [
            "summaries/open-reproducible/index.html: expected 2 written credits, found 1 matching out of 1 credit lines",
            "summaries/diversity-equity-inclusion/index.html: expected 1 written credits, found 0 matching out of 1 credit lines",
        ])

    def test_minified_credit_followed_by_heading(self):
        html = self.credit.replace('class="summary-credit"', 'class=summary-credit').removesuffix("</p>")
        self.assertEqual(self.check(html + "<h4>Main takeaways</h4>", summaries={"summary_1": {"Title": "Paper ⬦"}}), [])


class CitationTargetCheck(unittest.TestCase):
    def check(self, html):
        parser = seo.PageParser()
        parser.feed(html)
        return seo.check_citation_targets([seo.Page("example/index.html", parser)])

    def test_reference_after_citation(self):
        self.assertEqual(self.check('<a class="cite" href="#ref-Key" data-cite="Key">Author, 2020</a>'
                                    '<li id="ref-Key" data-reference="Key">Reference</li>'), [])

    def test_missing_data_reference_or_mismatched_key_fails(self):
        self.assertTrue(self.check('<a class="cite" href="#ref-Key" data-cite="Key">Author, 2020</a>'
                                   '<li id="ref-Key">Reference</li>'))
        self.assertTrue(self.check('<a class="cite" href="#ref-Key" data-cite="Other">Author, 2020</a>'
                                   '<li id="ref-Key" data-reference="Other">Reference</li>'))

    def test_missing_reference_or_nonlocal_link(self):
        for href in ('#ref-Unknown', '/other/#ref-Key', '#Key', ''):
            with self.subTest(href):
                self.assertTrue(self.check('<a class="other cite" href="%s">Citation</a>'
                                           '<li id="ref-Key">Reference</li>' % href))

    def test_other_links_are_ignored(self):
        self.assertEqual(self.check('<a href="#elsewhere">Link</a>'), [])

    def test_truncated_parenthetical_doi_in_data_source_fails(self):
        self.assertEqual(self.check('<li id="ref-K" data-reference="K" data-source="https://doi.org/10.1002/(SICI)1099">Ref <a href="https://doi.org/10.1002/(SICI)1099">DOI</a></li>'), [])
        self.assertTrue(self.check('<li id="ref-K" data-reference="K" data-source="https://doi.org/10.1002/(SICI">Ref</li>'))
        self.assertTrue(self.check('<li id="ref-K" data-reference="K" data-source="https://doi.org/10.1002/">Ref <a href="https://doi.org/10.1002/(SICI)1099">DOI</a></li>'))
        self.assertTrue(self.check('<li id="ref-K" data-reference="K" data-source="https://doi.org/10.1002/">Ref https://doi.org/10.1002/(SICI)1099</li>'))


class GlossaryTitleMarkdownCheck(unittest.TestCase):
    def check(self, title, h1, path="glossary/english/term/index.html"):
        html = "<title>%s</title><h1>%s</h1>" % (title, h1)
        return seo.check_glossary_title_markdown([page_from_html(html, path)])

    def test_rendered_emphasis_and_lone_asterisk_pass(self):
        self.assertEqual(self.check("Research Contribution Metric (p) | FORRT",
                                    "Research Contribution Metric (<em>p</em>)"), [])
        self.assertEqual(self.check("G*Power | FORRT", "G*Power"), [])
        self.assertEqual(self.check("G*Power and P*Hack | FORRT", "G*Power and P*Hack"), [])

    def test_literal_emphasis_fails_on_glossary_pages_only(self):
        self.assertEqual(len(self.check("Research Contribution Metric (*p*) | FORRT", "x")), 1)
        self.assertEqual(len(self.check("x", "Research Contribution Metric (*p*)")), 1)
        self.assertEqual(len(self.check("x", "*p*-value")), 1)
        self.assertEqual(self.check("x", "*p*", path="post/x/index.html"), [])


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


class BreadcrumbLinks(unittest.TestCase):
    def test_crumb_links_need_a_target(self):
        good = page_from_html('<nav class="crumbs"><a href="/">Home</a> <a href="/about/">About</a></nav>')
        bad = page_from_html('<nav class="crumbs"><a href="/">Home</a> <a href>About</a></nav><a href>x</a>')
        self.assertEqual(good.crumb_links, ["/", "/about/"])
        self.assertEqual(bad.crumb_links, ["/", ""])


class ClusterTitleMarkupCheck(unittest.TestCase):
    def check(self, body):
        with tempfile.TemporaryDirectory() as public:
            page = Path(public) / "clusters" / "cluster-1" / "index.html"
            page.parent.mkdir(parents=True)
            page.write_text("<div class=fc-title>%s</div>" % body, encoding="utf-8")
            return seo.check_cluster_title_markup(public)

    def test_rendered_markup_passes(self):
        self.assertEqual(self.check("In <span class=scp>A</span>frica at <i>Cognition</i> (p &lt; .05)"), [])

    def test_literal_or_unrendered_markup_fails(self):
        for body in ("at &lt;i&gt;Cognition&lt;/i&gt;", "in <scp>A</scp>frica", "&lt;em&gt;AIMS&lt;/em&gt;",
                     "at &amp;lt;i&amp;gt;Cognition&amp;lt;/i&amp;gt;"):
            self.assertEqual(self.check(body), ["clusters/cluster-1/index.html"], body)

    def test_missing_cluster_pages_fail(self):
        with tempfile.TemporaryDirectory() as public:
            self.assertEqual(seo.check_cluster_title_markup(public), ["clusters/ (no cluster pages found)"])


def clusters_map_failures(page):
    with tempfile.TemporaryDirectory() as public:
        (Path(public) / "clusters").mkdir()
        (Path(public) / "clusters" / "index.html").write_text(page, encoding="utf-8")
        return seo.check_clusters_map(public)


class ClustersMapCheck(unittest.TestCase):
    MAP = ('<figure class="clusters-map"><div class="clusters-map__stage"><svg class="clusters-map__ring" aria-hidden="true"></svg>'
           '<ol class="clusters-map__spots"><li><a class="clusters-map__tag" href="/clusters/cluster-1/">'
           '<span class="visually-hidden">Cluster 1: </span><span class="clusters-map__tag-name"><span>One</span></span> <span class="clusters-map__cue">1 sub-cluster</span></a>'
           '<div class="clusters-map__panel" id="panel-1" inert><ul><li><a href="#c1-a">A</a></li></ul></div></li></ol></div></figure>'
           '<ol><li data-cluster="1">One</li></ol>'
           '<section id="cluster-1"><div id="c1-a"></div></section><a href="#elsewhere">not in the map</a>')

    def test_named_counted_names_hidden_drawing_closed_panels_and_targets_pass(self):
        self.assertEqual(clusters_map_failures(self.MAP), [])

    def test_each_fault_fails_once(self):
        for change in (('class="clusters-map__ring" aria-hidden="true">', 'class="clusters-map__ring">'),
                       ('aria-hidden="true"></svg>', 'aria-hidden="true"><a href="/clusters/cluster-1/"></a></svg>'),
                       ('id="c1-a"', 'id="c1-b"'), (" inert>", ">"),
                       ('clusters-map__tag" href="/clusters/cluster-1/"', 'clusters-map__tag" href=""'),
                       ('class="clusters-map__tag"', 'class="other"'), ('<span>One</span></span>', '</span>'),
                       ('class="clusters-map__tag" href', 'class="clusters-map__tag" aria-hidden="true" href'),
                       ('<li data-cluster="1">One</li>', '<li data-cluster="1">One</li><li data-cluster="2">Two</li>')):
            with self.subTest(change):
                self.assertEqual(len(clusters_map_failures(self.MAP.replace(*change))), 1)

    def test_page_without_the_drawing_fails(self):
        self.assertTrue(clusters_map_failures("<p>No map</p>"))


def flora_failures(html):
    """Check 22 on a FLoRA page with this HTML (None: no page)."""
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


def related_language_failures(target_alternates, prefix=""):
    """Check 23: a Turkish page links its related term to the English Paywall page."""
    with tempfile.TemporaryDirectory() as public:
        english = Path(public) / "glossary/english/paywall"
        turkish = Path(public) / "glossary/turkish/abstract"
        english.mkdir(parents=True)
        turkish.mkdir(parents=True)
        links = "".join("<link rel='alternate' hreflang='x' href='%s'>" % h for h in target_alternates)
        (english / "index.html").write_text("<html><head>%s</head></html>" % links, encoding="utf-8")
        (turkish / "index.html").write_text(
            "<section class='term-related'><h2>Related term</h2><ul class='term-cards'>"
            "<li><a href='%s/glossary/english/paywall/'>Paywall</a><p>Definition</p></li></ul></section>"
            "<p><a href='/glossary/english/paywall/'>elsewhere</a></p>" % prefix, encoding="utf-8")
        return seo.check_glossary_related_language(seo.load_pages(public))


class GlossaryRelatedLanguageCheck(unittest.TestCase):
    def test_preview_prefix_is_ignored(self):
        failures = related_language_failures(["https://forrt.org/rebrand-doors/glossary/turkish/odeme_duvar%C4%B1_paywall_/"],
                                             prefix="/rebrand-doors")
        self.assertEqual(len(failures), 1)

    def test_link_to_english_when_no_translation_exists_passes(self):
        self.assertEqual(related_language_failures(["https://forrt.org/glossary/german/bezahlschranke/"]), [])

    def test_link_to_english_when_translation_exists_fails(self):
        failures = related_language_failures(["https://forrt.org/glossary/turkish/odeme_duvar%C4%B1_paywall_/"])
        self.assertEqual(len(failures), 1)
        self.assertIn("glossary/turkish/abstract", failures[0])


class GlossaryAkaFilterCheck(unittest.TestCase):
    HUB = ('<li data-term="type i error · false-positive · alpha error">\n  <a href="/glossary/english/type_i_error/">Type I error</a></li>'
           '<li data-term="p-hacking · fishing · p-value fishing"><a href="/glossary/english/p_hacking/">p-hacking</a></li>')

    def page(self, names):
        return '<h1>T</h1><p class="term-aka"><span class="term-aka-label">Also known as:</span> %s</p>' % names

    def test_names_in_the_hub_filter_pass(self):
        pages = {"/glossary/english/type_i_error/": self.page("False-positive, Alpha error"),
                 "/glossary/english/p_hacking/": self.page("Fishing, <em>p</em>-value fishing"),
                 "/glossary/english/other/": "<h1>No other names</h1>"}
        self.assertEqual(seo.glossary_aka_failures(self.HUB, pages), [])

    def test_preview_prefix_on_hub_links_is_ignored(self):
        hub = self.HUB.replace('href="/glossary/', 'href="/rebrand-doors/glossary/')
        pages = {"/glossary/english/type_i_error/": self.page("Alpha error")}
        self.assertEqual(seo.glossary_aka_failures(hub, pages), [])

    def test_missing_hub_fails(self):
        with tempfile.TemporaryDirectory() as public:
            self.assertEqual(seo.check_glossary_aka_filter(public), ["%s (page not found)" % seo.GLOSSARY_HUB])

    def test_name_missing_from_the_hub_filter_fails(self):
        pages = {"/glossary/english/type_i_error/": self.page("Alpha error, Type 1 error"),
                 "/glossary/english/missing/": self.page("Lost")}
        self.assertEqual(seo.glossary_aka_failures(self.HUB, pages),
                         ["/glossary/english/missing/ (Lost)", "/glossary/english/type_i_error/ (Type 1 error)"])


class ClusterLinkPunctuationCheck(unittest.TestCase):
    def test_trailing_sentence_punctuation_in_cluster_href_fails(self):
        with tempfile.TemporaryDirectory() as public:
            cluster = Path(public) / "clusters" / "cluster-1"
            cluster.mkdir(parents=True)
            (cluster / "index.html").write_text(
                '<div class="fc-summary">'
                '<a href="https://example.org/article.">a</a> '
                '<a href="https://example.org/paren)">b</a> '
                '<a href="https://example.org/bracket]">c</a>'
                '</div>',
                encoding="utf-8",
            )
            failures = seo.check_cluster_link_punctuation(public)
            self.assertEqual(
                failures,
                ["clusters/cluster-1/index.html (https://example.org/article., https://example.org/bracket], https://example.org/paren))"],
            )

    def test_clean_and_balanced_cluster_href_passes(self):
        with tempfile.TemporaryDirectory() as public:
            cluster = Path(public) / "clusters" / "cluster-1"
            cluster.mkdir(parents=True)
            (cluster / "index.html").write_text(
                '<div class="fc-summary">'
                'See <a href="https://example.org/article">https://example.org/article</a>. '
                'And <a href="https://en.wikipedia.org/wiki/Open_science_(movement)">wiki</a>.'
                '</div>',
                encoding="utf-8",
            )
            self.assertEqual(seo.check_cluster_link_punctuation(public), [])


def card_failures(alt):
    """Check 30 on one listing page holding the post's card image."""
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
    """Check 31 on a site with an indexed home page and a noindexed /authors/stub/.
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


if __name__ == "__main__":
    unittest.main()
