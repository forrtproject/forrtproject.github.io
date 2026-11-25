#!/usr/bin/env python3
"""Tests for scripts/generate_sc_profiles.py: author folder matching and accessible card/modal HTML."""
import html.parser
import sys
import tempfile
import types
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import generate_sc_profiles as sc  # noqa: E402

if sc.pd is None:  # pandas is optional here, and only isna is used.
    sc.pd = types.SimpleNamespace(isna=lambda value: value is None)


class TagCollector(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


class ExistingAuthorDir(unittest.TestCase):
    def found(self, name, folders):
        with tempfile.TemporaryDirectory() as authors:
            for folder in folders:
                (Path(authors) / folder).mkdir()
            return sc.find_existing_author_dir(name, Path(authors))

    def test_folder_without_separators(self):
        self.assertEqual(self.found("Ruth Van der Hallen, PhD ", ["ruthvanderhallenphd"]), "ruthvanderhallenphd")

    def test_hyphenated_folder(self):
        self.assertEqual(self.found("Dr Ana Marinho", ["ana-marinho"]), "ana-marinho")

    def test_two_folders_for_one_name_leave_it_to_similarity(self):
        # "ana-marinho" is the closer spelling of this name, and sorts first only by luck.
        self.assertEqual(self.found("Ana Marinho", ["ana-marinho", "anamarinho"]), "ana-marinho")
        self.assertEqual(self.found("Ana-Marinho", ["ana-marinho", "ana-marin-ho"]), "ana-marinho")

    def test_other_people_do_not_match(self):
        self.assertIsNone(self.found("Ruth Van der Hallen, PhD", ["ruth-vander-berg", "ana-marinho"]))


class AccessibleMarkupTests(unittest.TestCase):
    BLOCK_TAGS = {"div", "p", "h1", "h2", "h3", "h4", "h5", "h6", "section", "article"}

    def parse(self, markup):
        collector = TagCollector()
        collector.feed(markup)
        return collector.tags

    def test_team_member_card_is_valid_button(self):
        card = sc.render_member_card(
            "jane-doe",
            "Dr. Jane <Doe>",
            "Director & Lead",
            '<img src="/authors/jane-doe/avatar.webp" alt="" class="sc-card-img" />',
            color="#0f766e",
            is_last=False,
        )
        tags = self.parse(card)
        root_tag, root_attrs = tags[0]
        self.assertEqual(root_tag, "button")
        self.assertEqual(root_attrs.get("type"), "button")
        self.assertEqual(root_attrs.get("class"), "sc-card")
        self.assertEqual(root_attrs.get("onclick"), "openModal('jane-doe')")
        self.assertEqual(root_attrs.get("aria-haspopup"), "dialog")
        self.assertEqual(root_attrs.get("aria-controls"), "modal-jane-doe")
        self.assertIn("--team-color:#0f766e", root_attrs.get("style", ""))
        self.assertIn(f"--bar-extend:{sc.BAR_EXTEND}", root_attrs.get("style", ""))
        inner_tags = {tag for tag, _ in tags[1:]}
        self.assertTrue(inner_tags.isdisjoint(self.BLOCK_TAGS), f"block tags inside button: {inner_tags}")
        self.assertIn("Dr. Jane &lt;Doe&gt;", card)
        self.assertIn("Director &amp; Lead", card)

    def test_plain_member_card_is_valid_button_without_bar(self):
        card = sc.render_member_card(
            "john-smith",
            "John Smith",
            "Advisor",
            '<span class="sc-placeholder" aria-hidden="true">JS</span>',
            color=None,
        )
        tags = self.parse(card)
        root_tag, root_attrs = tags[0]
        self.assertEqual(root_tag, "button")
        self.assertEqual(root_attrs.get("type"), "button")
        self.assertNotIn("style", root_attrs)
        self.assertNotIn("sc-cbar", card)
        inner_tags = {tag for tag, _ in tags[1:]}
        self.assertTrue(inner_tags.isdisjoint(self.BLOCK_TAGS), f"block tags inside button: {inner_tags}")

    def test_modal_has_dialog_semantics_and_close_label(self):
        modal = sc.render_modal(
            "jane-doe",
            "Dr. Jane Doe",
            "Director",
            "Bio with <script> & notes.",
            '<img src="/authors/jane-doe/avatar.webp" alt="Dr. Jane Doe" />',
            social_links=sc.generate_social_links({"website": "https://example.org", "email": "jane@example.org"}),
        )
        tags = self.parse(modal)
        root_tag, root_attrs = tags[0]
        self.assertEqual(root_tag, "div")
        self.assertEqual(root_attrs.get("id"), "modal-jane-doe")
        self.assertEqual(root_attrs.get("role"), "dialog")
        self.assertEqual(root_attrs.get("aria-modal"), "true")
        self.assertEqual(root_attrs.get("aria-labelledby"), "modal-jane-doe-name")

        buttons = [attrs for tag, attrs in tags if tag == "button"]
        self.assertEqual(len(buttons), 1)
        self.assertEqual(buttons[0].get("type"), "button")
        self.assertEqual(buttons[0].get("class"), "sc-close-btn")
        self.assertEqual(buttons[0].get("aria-label"), "Close profile")
        self.assertEqual(buttons[0].get("onclick"), "closeModal('jane-doe')")

        headings = [attrs for tag, attrs in tags if tag == "h3"]
        self.assertEqual(headings[0].get("id"), "modal-jane-doe-name")

        svgs = [attrs for tag, attrs in tags if tag == "svg"]
        self.assertTrue(svgs)
        for svg in svgs:
            self.assertEqual(svg.get("aria-hidden"), "true")

        links = [attrs for tag, attrs in tags if tag == "a"]
        self.assertEqual([link.get("aria-label") for link in links], ["Website", "Email"])
        self.assertIn("Bio with &lt;script&gt; &amp; notes.", modal)

    def test_image_helpers_escape_and_use_decorative_alt(self):
        card_img = sc.render_card_image('/authors/a"b/avatar.webp', "AB")
        self.assertIn('alt=""', card_img)
        self.assertIn('src="/authors/a&quot;b/avatar.webp"', card_img)
        card_placeholder = sc.render_card_image("", "<A>")
        self.assertTrue(card_placeholder.startswith("<span "))
        self.assertIn('aria-hidden="true"', card_placeholder)
        self.assertIn("&lt;A&gt;", card_placeholder)

        modal_img = sc.render_modal_image('/authors/a"b/avatar.webp', "AB")
        self.assertIn('alt=""', modal_img)
        self.assertIn('src="/authors/a&quot;b/avatar.webp"', modal_img)
        modal_placeholder = sc.render_modal_image("", "<A>")
        self.assertIn('aria-hidden="true"', modal_placeholder)
        self.assertIn("&lt;A&gt;", modal_placeholder)


if __name__ == "__main__":
    unittest.main()
