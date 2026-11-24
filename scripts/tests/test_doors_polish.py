"""Regression tests for Doors template/CSS/JS polish fixes (#1196, #1246)."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[2]


class DoorsPolishContractTests(unittest.TestCase):
    def test_disciplines_doi_links_use_accessible_link_token(self):
        css = (ROOT / "assets/css/doors/clusters.css").read_text(encoding="utf-8")
        self.assertNotIn("#1c7ed6", css, "Low-contrast #1c7ed6 should stay replaced by var(--link)")
        self.assertIn(".rl-pill-count{font-size:14px", css)
        self.assertIn(".disciplines-foot{", css)

    def test_citations_authors_threshold_and_honest_incomplete_label(self):
        tpl = (ROOT / "layouts/partials/citations/authors.html").read_text(encoding="utf-8")
        self.assertIn("(gt $count 6)", tpl)
        self.assertIn("Show all %d authors", tpl)
        self.assertIn("Show listed authors", tpl)
        self.assertNotIn("Show more authors", tpl)
        self.assertNotIn("Show all %d+ authors", tpl)
        self.assertIn('lang="ar" dir="rtl"', tpl)

    def test_article_card_pictureless_news_category_is_accessible(self):
        tpl = (ROOT / "layouts/partials/doors/article_card.html").read_text(encoding="utf-8")
        self.assertIn('<div class="ac-thumb ac-panel ac-panel-{{ $tone | default 1 }}"><strong>', tpl)
        self.assertNotIn('ac-panel-{{ $tone | default 1 }}" aria-hidden="true"', tpl)

    def test_forrt_only_news_keeps_updated_date_in_byline(self):
        hdr = (ROOT / "layouts/partials/doors/article_header.html").read_text(encoding="utf-8")
        css = (ROOT / "assets/css/doors/article.css").read_text(encoding="utf-8")
        self.assertIn('class="byline-updated"', hdr)
        self.assertIn(".article-layout:not(:has(>.article-card)) :is(.byline-date,.byline-updated){display:inline}", css)

    def test_edu_read_next_mobile_avoids_cropping_figures(self):
        css = (ROOT / "assets/css/doors/article.css").read_text(encoding="utf-8")
        self.assertIn(".read-next-edu .ac-thumb:not(.ec-thumb-whole) img{width:100%;height:auto;min-height:0;object-fit:contain}", css)

    def test_resource_keywords_plain_text_not_double_escaped(self):
        tpl = (ROOT / "layouts/partials/doors/resource_keywords.html").read_text(encoding="utf-8")
        self.assertIn("{{ $plain = $plain | append . }}", tpl)
        self.assertIn("Other keywords", tpl)

    def test_crumbs_honors_explicit_label(self):
        tpl = (ROOT / "layouts/partials/doors/crumbs.html").read_text(encoding="utf-8")
        self.assertEqual(len(re.findall(r"if not \$\.label", tpl)), 2)

    def test_clusters_default_count_explains_hidden_specialist_items(self):
        js = (ROOT / "static/js/featured-resources.js").read_text(encoding="utf-8")
        self.assertIn("specialist hidden", js)
        self.assertIn("if (isFiltered)", js)


if __name__ == "__main__":
    unittest.main()
