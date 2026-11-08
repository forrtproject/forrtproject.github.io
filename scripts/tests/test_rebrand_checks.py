"""Tests for the Doors redesign's preview rewriter and build checks."""

import os
import re
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "rebrand"))

from check_design import framing_problems  # noqa: E402
from check_internal_links import broken_target, extract_links, find_broken  # noqa: E402
from check_preview import (  # noqa: E402
    canonical_problem, off_origin, production_expectation, redirect_ok, redirect_target, resolve_base, robots_problem,
)
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

    def test_climbing_covers_dot_segments_and_spares_sister_sites(self):
        self.assertIn("href=/rebrand-doors/>", rewriter().html("<head></head><a href=..>a</a>"))
        self.assertIn('href="/rebrand-doors/img/a.webp"', rewriter().html('<head></head><a href="./../img/a.webp">a</a>'))
        self.assertIn('href="/rebrand-doors/#top"', rewriter().html('<head></head><a href="..#top">a</a>'))
        self.assertIn('href="../../fred/"', rewriter().html('<head></head><a href="../../fred/">a</a>', depth=1))

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

    def test_allowlist_covers_links_leaving_the_subfolder(self):
        target = broken_target(
            "https://forrt.org/retired/", "/rebrand-doors/", "/rebrand-doors/", FILES, SISTERS, [re.compile("^/retired/")]
        )
        self.assertIsNone(target)

    def test_extract_skips_scripts_templates_and_placeholders(self):
        links = list(
            extract_links(
                '<a href=/a>x</a><script>"<a href=/b>"</script><a href="#top">t</a>'
                '<a href="{{relpermalink}}">u</a><a href="mailto:x@y.z">m</a><img src=c.webp>'
            )
        )
        self.assertEqual(links, ["/a", "c.webp"])

    def test_extract_skips_src_in_another_attributes_query(self):
        links = list(extract_links('<div data-u="/a?src=/b"></div><div data-u="x&amp;src=/c"></div><img src=d.webp>'))
        self.assertEqual(links, ["d.webp"])

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

    def test_a_glob_covers_a_collection_that_grows(self):
        _, addresses, _ = compare_paths(
            [], ["resources/page/2/index.html", "resources/page/61/index.html", "other/page/2/index.html"],
            allowed={"resources/page/*/index.html"},
        )
        self.assertEqual(addresses, ["other/page/2/index.html"])

    def test_a_glob_stops_at_a_slash(self):
        _, addresses, _ = compare_paths(
            [], ["resources/page/2/nested/index.html"], allowed={"resources/page/*/index.html"}
        )
        self.assertEqual(addresses, ["resources/page/2/nested/index.html"])

    def test_an_allowed_page_may_change_its_seo_tags(self):
        self.assertEqual(compare_heads({"a.html": ["x"]}, {"a.html": ["y"]}, allowed={"a.html"}), {})

    def test_structured_data_falls_but_may_rise(self):
        drops = compare_structured(
            {"term": {"DefinedTerm": 5, "BreadcrumbList": 5}},
            {"term": {"DefinedTerm": 4, "BreadcrumbList": 9}},
        )
        self.assertEqual(drops, [("term", "DefinedTerm", 5, 4)])

    def test_heads_report_only_differences(self):
        changes = compare_heads({"a": ["x", "y"], "b": ["z"]}, {"a": ["x", "w"], "b": ["z"]})
        self.assertEqual(changes, {"a": (["y"], ["w"])})


    def social_tags(self, image, image_type="image/webp", width="100", height="50"):
        return sorted(["og:image=" + image, "twitter:image=" + image,
                       "og:image:type=" + image_type, "og:image:width=" + width,
                       "og:image:height=" + height, "og:image:alt=Same image",
                       "twitter:image:alt=Same image", "title=Page", "description=Description",
                       "canonical:=https://example.org/page/"])

    def test_same_bundle_and_static_social_derivatives_are_equivalent(self):
        for before, after in (
            ("https://example.org/post/example/featured.webp", "https://example.org/post/example/featured_hu_0123456789abcdef.png"),
            ("https://example.org/img/toolkit.webp", "https://example.org/social/img/toolkit_hu_0123456789abcdef.jpg"),
            ("https://example.org/rebrand-doors/img/toolkit.webp", "https://example.org/rebrand-doors/social/img/toolkit_hu_0123456789abcdef.jpeg"),
            ("https://example.org/a/avatar_hu_0123456789abcdef.webp", "https://example.org/a/avatar_hu_fedcba9876543210.png"),
        ):
            with self.subTest(after=after):
                new_type = "image/png" if after.endswith(".png") else "image/jpeg"
                self.assertEqual(compare_heads({"a": self.social_tags(before)},
                                               {"a": self.social_tags(after, new_type, "200", "100")}), {})

    def test_unrelated_social_images_and_other_metadata_still_fail(self):
        before = self.social_tags("https://example.org/post/example/featured.webp")
        derivative = "https://example.org/post/example/featured_hu_0123456789abcdef.png"
        for url in (
            derivative.replace("featured", "unrelated"),
            derivative.replace("/example/", "/another/"),
            derivative.replace("example.org", "another.org"),
            derivative + "?different=1",
        ):
            with self.subTest(url=url):
                self.assertIn("a", compare_heads({"a": before}, {"a": self.social_tags(url, "image/png")}))
        after = self.social_tags(derivative, "image/png")
        for old in ("title=Page", "description=Description", "og:image:alt=Same image",
                    "twitter:image:alt=Same image", "canonical:=https://example.org/page/"):
            with self.subTest(tag=old):
                changed = sorted("changed=" + tag if tag == old else tag for tag in after)
                self.assertIn("a", compare_heads({"a": before}, {"a": changed}))
        self.assertIn("a", compare_heads({"a": before}, {"a": sorted(after + ['{"@type":"Changed"}'])}))

    def test_png_jpeg_comparisons_and_unconverted_companions_stay_exact(self):
        for suffix, image_type in (("png", "image/png"), ("jpg", "image/jpeg"), ("webp", "image/webp")):
            image = "https://example.org/img/source." + suffix
            before = self.social_tags(image, image_type)
            for after in (self.social_tags(image, image_type, width="200"),
                          self.social_tags(image.replace("source", "other"), image_type),
                          self.social_tags(image.replace("source", "source_hu_0123456789abcdef"), image_type),
                          self.social_tags(image, "image/incorrect")):
                with self.subTest(suffix=suffix):
                    self.assertIn("a", compare_heads({"a": before}, {"a": after}))

    def test_duplicate_image_tags_are_not_normalized(self):
        original = "https://example.org/img/source.webp"
        before = sorted(self.social_tags(original) + ["og:image=" + original])
        after = self.social_tags("https://example.org/social/img/source_hu_0123456789abcdef.png", "image/png")
        self.assertIn("a", compare_heads({"a": before}, {"a": after}))


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


class NetworkFramingTests(unittest.TestCase):
    def ink(self, left, right, top, bottom, core=0.4):
        return {"left": left, "right": right, "top": top, "bottom": bottom, "width": 1000, "height": 700,
                "core_across": core, "core_down": core}

    def test_a_centred_network_that_fills_its_panel_passes(self):
        self.assertEqual(framing_problems(self.ink(40, 960, 60, 640)), [])

    def test_the_network_pressed_into_a_corner_fails(self):
        problems = framing_problems(self.ink(650, 999, 450, 699))
        self.assertTrue(any("fills only" in problem for problem in problems))
        self.assertTrue(any("off centre" in problem for problem in problems))

    def test_outliers_at_the_edges_do_not_hide_a_dense_lump(self):
        problems = framing_problems(self.ink(40, 960, 60, 640, core=0.2))
        self.assertTrue(any("bunches up" in problem for problem in problems))

    def test_a_blank_canvas_fails(self):
        self.assertEqual(framing_problems({"left": 1000, "right": -1, "top": 700, "bottom": -1, "width": 1000, "height": 700}),
                         ["nothing is drawn"])


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


class PreviewCheckModeTests(unittest.TestCase):
    def test_default_base_is_the_preview(self):
        self.assertEqual(resolve_base(None, False), "https://forrt.org/rebrand-doors/")
        self.assertEqual(resolve_base("https://forrt.org/rebrand-doors", False), "https://forrt.org/rebrand-doors/")

    def test_production_base_is_the_site_root(self):
        self.assertEqual(resolve_base(None, True), "https://forrt.org/")
        self.assertEqual(resolve_base("https://forrt.org", True), "https://forrt.org/")
        with self.assertRaises(ValueError):
            resolve_base("https://forrt.org/rebrand-doors/", True)

    def test_preview_needs_noindex(self):
        self.assertIsNone(robots_problem("about/us/", "noindex, nofollow", False))
        self.assertEqual(robots_problem("about/us/", "", False), "about/us/ has no noindex")

    def test_production_forbids_noindex(self):
        self.assertIsNone(robots_problem("about/us/", "", True))
        self.assertIsNone(robots_problem("about/us/", "index, follow", True))
        self.assertIn("has noindex", robots_problem("about/us/", "noindex", True))

    def test_canonical_on_the_root(self):
        base = "https://forrt.org/"
        self.assertIsNone(canonical_problem("about/us/", "https://forrt.org/about/us/", base))
        self.assertIn("no canonical", canonical_problem("about/us/", "", base))
        self.assertIn("outside", canonical_problem("about/us/", "https://forrt.org/rebrand-doors/about/us/", base))
        self.assertIn("outside", canonical_problem("about/us/", "https://staging.forrt.org/about/us/", base))
        self.assertIn("outside", canonical_problem("about/us/", "http://forrt.org/about/us/", base))

    def test_redirect_targets_follow_the_base(self):
        self.assertEqual(redirect_target("https://forrt.org/rebrand-doors/", "resources/"), "/rebrand-doors/resources/")
        self.assertEqual(redirect_target("https://forrt.org/", "resources/"), "/resources/")
        self.assertEqual(redirect_target("https://forrt.org/rebrand-doors/", "//fred"), "/fred")
        self.assertEqual(redirect_target("https://forrt.org/", "//fred"), "/fred")

    def test_sister_sites_answer_first_in_production(self):
        sisters = {"re-searchterms", "fred"}
        self.assertEqual(production_expectation("re-searchterms", "apps/re-searchterms.html", sisters), "//re-searchterms")
        self.assertEqual(production_expectation("tag/", "tags/", sisters), "tags/")
        # Sister-site names are case-sensitive paths, as on GitHub Pages.
        self.assertEqual(production_expectation("FReD/", "//fred", sisters), "//fred")

    def test_off_origin(self):
        base = "https://forrt.org/"
        self.assertFalse(off_origin("https://forrt.org/resources/", base))
        self.assertFalse(off_origin("/glossary/english/preregistration/", base))
        self.assertTrue(off_origin("https://example.org/resources/", base))
        self.assertTrue(off_origin("http://forrt.org/resources/", base))

    def test_redirect_ok(self):
        self.assertTrue(redirect_ok("/resources", "/resources/", "resources/"))
        self.assertFalse(redirect_ok("/resources/page/2/", "/resources/", "resources/"))
        self.assertTrue(redirect_ok("/fred/explorer/", "/fred", "//fred"))
        self.assertFalse(redirect_ok("/fredx/", "/fred", "//fred"))


if __name__ == "__main__":
    unittest.main()
