"""Tests for the Doors redesign's preview rewriter and build checks."""

import os
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "rebrand"))

from check_internal_links import broken_target, extract_links, find_broken  # noqa: E402
from check_source_rules import GENERATED, absolute_url_findings  # noqa: E402
from compare_builds import compare_heads, compare_paths, compare_structured  # noqa: E402
from preview_paths import Rewriter, resolves  # noqa: E402
from site_inventory import normalise_path, seo_head, template_group  # noqa: E402

FILES = {
    "index.html",
    "about/us/index.html",
    "css/site.css",
    "img/a.webp",
    "apps/tool.html",
    "explorer/index.html",
    "glossary/english/térm/index.html",
}
SISTERS = {"flora-zotero", "fred"}


def rewriter():
    return Rewriter("/rebrand-doors/", FILES, SISTERS)


class ResolvesTests(unittest.TestCase):
    def test_pages_serves_directories_and_html_files(self):
        self.assertTrue(resolves("/about/us", FILES))
        self.assertTrue(resolves("/about/us/?x=1#top", FILES))
        self.assertTrue(resolves("/apps/tool", FILES))
        self.assertTrue(resolves("/", FILES))
        self.assertFalse(resolves("/about/them/", FILES))

    def test_percent_encoded_paths_match(self):
        self.assertTrue(resolves("/glossary/english/t%C3%A9rm/", FILES))

    def test_case_matters_as_it_does_on_github_pages(self):
        self.assertFalse(resolves("/About/us/", FILES))


class RewriteHtmlTests(unittest.TestCase):
    def test_quoted_and_minified_attributes(self):
        html = rewriter().html('<head></head><a href="/about/us/">x</a><a href=/about/us>y</a><img src=/img/a.webp>')
        self.assertIn('href="/rebrand-doors/about/us/"', html)
        self.assertIn("href=/rebrand-doors/about/us>", html)
        self.assertIn("src=/rebrand-doors/img/a.webp", html)

    def test_home_link(self):
        self.assertIn("href=/rebrand-doors/>", rewriter().html("<head></head><a href=/>x</a>"))

    def test_rewriting_twice_changes_nothing(self):
        once = rewriter().html('<head></head><a href="/about/us/">x</a><a href=https://forrt.org/about/us/>y</a>')
        self.assertEqual(rewriter().html(once), once)

    def test_protocol_relative_and_external_links_stay(self):
        source = '<head><meta name=robots content=noindex></head><a href="//cdn.example/x">a</a><a href="https://example.org/about/us">b</a>'
        self.assertEqual(rewriter().html(source), source)

    def test_sister_sites_keep_their_root_paths(self):
        html = rewriter().html('<head></head><a href="/flora-zotero/">a</a><a href="https://forrt.org/fred/index.html">b</a>')
        self.assertIn('href="/flora-zotero/"', html)
        self.assertIn('href="https://forrt.org/fred/index.html"', html)

    def test_absolute_links_to_this_site_move_to_the_preview(self):
        html = rewriter().html('<head></head><a href="https://forrt.org/explorer">a</a><a href="https://www.forrt.org/">b</a>')
        self.assertIn('href="/rebrand-doors/explorer"', html)
        self.assertIn('href="/rebrand-doors/"', html)

    def test_absolute_link_outside_the_build_stays(self):
        self.assertIn(
            'href="https://forrt.org/retired/"',
            rewriter().html('<head></head><a href="https://forrt.org/retired/">a</a>'),
        )

    def test_links_climbing_past_the_top_stay_in_the_preview(self):
        html = rewriter().html('<head></head><a href=../about/us/>a</a><img src="../../img/a.webp">', depth=1)
        self.assertIn("href=../about/us/>", html)
        self.assertIn('src="/rebrand-doors/img/a.webp"', html)
        self.assertIn("href=/rebrand-doors/about/us/>", rewriter().html("<head></head><a href=../about/us/>a</a>"))

    def test_unrelated_attribute_is_left_alone(self):
        self.assertIn('content="/about/us/"', rewriter().html('<head><meta content="/about/us/"></head>'))

    def test_srcset_and_inline_styles(self):
        html = rewriter().html(
            '<head></head><img srcset="/img/a.webp 1x, /img/a.webp 2x"><div style="background:url(/img/a.webp)"></div>'
        )
        self.assertIn('srcset="/rebrand-doors/img/a.webp 1x, /rebrand-doors/img/a.webp 2x"', html)
        self.assertIn("url(/rebrand-doors/img/a.webp)", html)

    def test_inline_script_paths_only_when_they_name_built_content(self):
        html = rewriter().html("<head></head><script>fetch('/img/a.webp');var x='/not/here';</script>")
        self.assertIn("fetch('/rebrand-doors/img/a.webp')", html)
        self.assertIn("'/not/here'", html)

    def test_json_ld_is_untouched(self):
        source = '<head><script type="application/ld+json">{"u":"/img/a.webp"}</script></head>'
        self.assertIn('{"u":"/img/a.webp"}', rewriter().html(source))

    def test_404_script_keeps_its_own_paths(self):
        html = rewriter().html("<head></head><script>location.replace('/img/a.webp')</script>", is_404=True)
        self.assertIn("'/img/a.webp'", html)

    def test_noindex_added_once(self):
        html = rewriter().html("<html><head><title>x</title></head></html>")
        self.assertIn('name="robots" content="noindex, nofollow"', html)
        self.assertEqual(rewriter().html(html), html)

    def test_existing_noindex_kept(self):
        source = '<head><meta name=robots content="noindex, nofollow"></head>'
        self.assertEqual(rewriter().html(source), source)


class LinkCheckTests(unittest.TestCase):
    def check(self, link, page="/rebrand-doors/about/us/", base="/rebrand-doors/"):
        return broken_target(link, page, base, FILES, SISTERS, [])

    def test_rewritten_link_resolves(self):
        self.assertIsNone(self.check("/rebrand-doors/about/us/"))

    def test_broken_link_reports_the_site_path(self):
        self.assertEqual(self.check("/rebrand-doors/about/them/"), "/about/them/")

    def test_relative_links_resolve_from_the_page(self):
        self.assertIsNone(self.check("../../img/a.webp"))
        self.assertEqual(self.check("missing.webp"), "/about/us/missing.webp")

    def test_sister_sites_and_external_sites_pass(self):
        self.assertIsNone(self.check("https://forrt.org/fred/index.html"))
        self.assertIsNone(self.check("/flora-zotero/"))
        self.assertIsNone(self.check("https://example.org/nope"))

    def test_stray_live_site_link_fails(self):
        self.assertEqual(self.check("https://forrt.org/retired/"), "/retired/")

    def test_link_leaving_the_subfolder_fails_even_if_the_page_exists(self):
        self.assertEqual(self.check("/about/us/"), "/about/us/")
        self.assertEqual(self.check("../about/us/", page="/rebrand-doors/"), "/about/us/")

    def test_extract_skips_scripts_templates_and_placeholders(self):
        links = list(
            extract_links(
                '<a href=/a>x</a><script>"<a href=/b>"</script><a href="#top">t</a>'
                '<a href="{{relpermalink}}">u</a><a href="mailto:x@y.z">m</a><img src=c.webp>'
            )
        )
        self.assertEqual(links, ["/a", "c.webp"])

    def test_find_broken_walks_a_build(self):
        with tempfile.TemporaryDirectory() as root:
            Path(root, "about").mkdir()
            Path(root, "index.html").write_text('<a href="/about/">ok</a><a href="/gone/">bad</a>')
            Path(root, "about", "index.html").write_text("<a href=/>home</a>")
            broken = find_broken(root)
        self.assertEqual(set(broken), {"/gone/"})
        self.assertEqual(broken["/gone/"], {"index.html"})


class CompareTests(unittest.TestCase):
    def test_fingerprints_and_image_hashes_normalise(self):
        self.assertEqual(
            normalise_path("css/doors.0123456789abcdef0123456789abcdef.css"), "css/doors.FINGERPRINT.css"
        )
        self.assertEqual(normalise_path("authors/a/avatar_hu_929e020daed93c74.webp"), "authors/a/avatar_hu.webp")

    def test_removed_page_fails_and_new_asset_does_not(self):
        removed, addresses, assets = compare_paths(
            ["a/index.html", "b/index.html", "index.xml"],
            ["a/index.html", "index.xml", "fonts/x.woff2", "c/index.html"],
        )
        self.assertEqual(removed, ["b/index.html"])
        self.assertEqual(addresses, ["c/index.html"])
        self.assertEqual(assets, ["fonts/x.woff2"])

    def test_allowed_changes_are_exempt(self):
        removed, _, _ = compare_paths(["a/index.html"], [], allowed={"a/index.html"})
        self.assertEqual(removed, [])

    def test_structured_data_falls_but_may_rise(self):
        drops = compare_structured(
            {"term": {"DefinedTerm": 5, "BreadcrumbList": 5}},
            {"term": {"DefinedTerm": 4, "BreadcrumbList": 9}},
        )
        self.assertEqual(drops, [("term", "DefinedTerm", 5, 4)])

    def test_heads_report_only_differences(self):
        changes = compare_heads({"a": ["x", "y"], "b": ["z"]}, {"a": ["x", "w"], "b": ["z"]})
        self.assertEqual(changes, {"a": (["y"], ["w"])})


class InventoryTests(unittest.TestCase):
    def test_template_groups(self):
        cases = {
            "index.html": "home",
            "404.html": "404",
            "glossary/english/abstract_bias/index.html": "glossary term",
            "glossary/references/index.html": "glossary term",
            "glossary/english/index.html": "glossary list",
            "curated_resources/x/index.html": "resource detail",
            "curated_resources/page/2/index.html": "generated list",
            "post/index.html": "news and section list",
            "post/x/index.html": "article",
            "about/us/index.html": "section or plain page",
            "apps/os_map.html": "standalone",
        }
        for path, group in cases.items():
            self.assertEqual(template_group(path), group, path)

    def test_redirect_stub_is_recognised_by_its_content(self):
        text = '<head><meta http-equiv="refresh" content="0; url=https://forrt.org/"></head>'
        self.assertEqual(template_group("tag/x/index.html", text), "redirect stub")

    def test_seo_head_collects_the_tags_that_matter(self):
        tags = seo_head(
            '<head><title>T</title><meta name=description content=D><meta name=viewport content=v>'
            '<link rel=canonical href=/c><link rel=stylesheet href=/s.css>'
            '<link rel=alternate hreflang=de href=/de>'
            '<script type=application/ld+json>{"@type":"X"}</script></head><body></body>'
        )
        self.assertIn("title=T", tags)
        self.assertIn("description=D", tags)
        self.assertIn("canonical:=/c", tags)
        self.assertIn("alternate:de=/de", tags)
        self.assertIn('{"@type":"X"}', tags)
        self.assertFalse([tag for tag in tags if "s.css" in tag or tag.startswith("viewport")])


class SourceRuleTests(unittest.TestCase):
    def test_generated_paths(self):
        for path in [
            "content/glossary/english/x.md",
            "content/curated_resources/x.md",
            "content/contributors/tenzing.md",
            "data/ga_data.json",
            "static/data/fred_citation.txt",
            "static/data/other.json",
            "static/partials/network-graph.html",
            "content/post/2026-01-newsletter/index.md",
            "scripts/forrt_contribs/contributors_cache.csv",
        ]:
            self.assertTrue(GENERATED.match(path), path)
        for path in [
            "content/curated_resources/_index.md",
            "content/post/_index.md",
            "data/partners.json",
            "data/publications.yaml",
            "data/themes/doors.toml",
            "layouts/index.html",
            "content/home/1-hero.md",
        ]:
            self.assertFalse(GENERATED.match(path), path)

    def test_absolute_urls_in_templates(self):
        with tempfile.TemporaryDirectory() as root:
            os.makedirs(os.path.join(root, "layouts"))
            Path(root, "layouts", "a.html").write_text(
                '<a href="https://forrt.org/about/us">own page</a>\n'
                '<a href="https://forrt.org/fred/">sister site</a>\n'
                '"url": "https://forrt.org"\n'
                '<a href="https://example.org/">elsewhere</a>\n'
            )
            findings = absolute_url_findings(root, sisters={"fred"})
        self.assertEqual(len(findings), 1)
        self.assertIn("forrt.org/about/us", findings[0])


if __name__ == "__main__":
    unittest.main()
