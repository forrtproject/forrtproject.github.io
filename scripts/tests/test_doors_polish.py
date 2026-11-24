"""Regression tests for Doors template/CSS/JS polish fixes (#1196, #1246)."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[2]


class DoorsPolishContractTests(unittest.TestCase):
    def test_disciplines_doi_links_use_accessible_link_token(self):
        css = (ROOT / "assets/css/doors/clusters.css").read_text(encoding="utf-8")
        self.assertNotIn("#1c7ed6", css, "Low-contrast #1c7ed6 should stay replaced by var(--link)")
        for selector in (".sc-description a", ".publication-item a", ".ref-doi-link", ".rl-detail-doi-link"):
            pattern = rf"{re.escape(selector)}\s*\{{[^}}]*color:\s*var\(--link\)"
            self.assertRegex(css, pattern, f"{selector} should use color: var(--link)")
        self.assertIn(".rl-pill-count{font-size:14px", css)
        self.assertIn(".disciplines-foot{", css)

    def test_disciplines_search_removes_include_resources_checkbox(self):
        tpl = (ROOT / "layouts/partials/disciplines/controls.html").read_text(encoding="utf-8")
        self.assertNotIn("clusters-search-include-refs", tpl)
        self.assertNotIn("Include resources", tpl)

    def test_citations_authors_threshold_and_labels(self):
        tpl = (ROOT / "layouts/partials/citations/authors.html").read_text(encoding="utf-8")
        self.assertIn("cond $complete (gt $count 6) (ge $count 6)", tpl)
        self.assertIn("Show all %d authors", tpl)
        self.assertIn("Show all authors", tpl)
        self.assertNotIn("Show more authors", tpl)
        self.assertNotIn("Show listed authors", tpl)
        self.assertIn('lang="ar" dir="rtl"', tpl)

    def test_article_card_pictureless_news_category_is_accessible(self):
        tpl = (ROOT / "layouts/partials/doors/article_card.html").read_text(encoding="utf-8")
        self.assertIn('<div class="ac-thumb ac-panel ac-panel-{{ $tone | default 1 }}"><strong>', tpl)
        self.assertNotIn('ac-panel-{{ $tone | default 1 }}" aria-hidden="true"', tpl)

    def test_reading_card_keeps_forrt_box_and_supports_contact(self):
        card = (ROOT / "layouts/partials/doors/reading_card.html").read_text(encoding="utf-8")
        self.assertNotIn("$forrtOnly", card)
        self.assertIn("$p.Params.contact", card)
        self.assertIn("<dt>Contact</dt>", card)
        self.assertIn("mailto:{{ $email }}", card)
        ann = (ROOT / "scripts/create_announcements.R").read_text(encoding="utf-8")
        self.assertIn('"Contact" %in% names(row)', ann)

    def test_edu_read_next_mobile_avoids_cropping_figures_without_styling_panels(self):
        css = (ROOT / "assets/css/doors/article.css").read_text(encoding="utf-8")
        self.assertIn(".read-next-edu .ac-thumb:not(.ec-thumb-whole,.ac-panel){", css)
        self.assertIn(".read-next-edu .ac-thumb:not(.ec-thumb-whole,.ac-panel) img{width:100%;height:auto;min-height:0;object-fit:contain}", css)

    def test_crumbs_honors_explicit_label(self):
        tpl = (ROOT / "layouts/partials/doors/crumbs.html").read_text(encoding="utf-8")
        self.assertEqual(len(re.findall(r"if not \$\.label", tpl)), 2)

    def test_clusters_default_count_gates_hidden_specialist_label_on_is_filtered(self):
        js = (ROOT / "static/js/featured-resources.js").read_text(encoding="utf-8")
        pattern = (
            r"if \(sec\.countWrap\) \{\s*"
            r"if \(isFiltered\) \{[^}]*' of '[^}]*\}\s*"
            r"else if \(res\.matchCount < sec\.totalCount\) \{[^}]*specialist hidden"
        )
        self.assertRegex(js, pattern)


if __name__ == "__main__":
    unittest.main()
