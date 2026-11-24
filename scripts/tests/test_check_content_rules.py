"""Unit tests for scripts/check_content_rules.py."""

import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from check_content_rules import (
    COMMENT_MARKER,
    DoiViolation,
    check_images,
    extract_publisher_doi,
    find_publisher_doi_in_diff,
    format_comment,
    is_checked_content_path,
)


class TestExtractPublisherDoi(unittest.TestCase):
    def test_flags_common_publisher_doi_paths(self):
        cases = [
            ("https://www.science.org/doi/abs/10.1126/science.1121629", "10.1126/science.1121629"),
            ("https://www.pnas.org/doi/full/10.1073/pnas.1208724109", "10.1073/pnas.1208724109"),
            ("https://journals.sagepub.com/doi/10.1177/1745691620927709", "10.1177/1745691620927709"),
            ("https://econtent.hogrefe.com/doi/10.1027/1864-9335/a000180#c19", "10.1027/1864-9335/a000180"),
            ("https://pubs.asha.org/doi/10.1044/2016_JSLHR-L-15-0440?rfr_dat=x", "10.1044/2016_JSLHR-L-15-0440"),
            ("https://www.medrxiv.org/content/10.1101/2022.12.15.22283474v1#p-5", "10.1101/2022.12.15.22283474"),
            ("https://www.biorxiv.org/content/10.1101/2020.08.13.249847v2.full", "10.1101/2020.08.13.249847"),
            ("https://www.biorxiv.org/content/10.1101/2020.08.13.249847v2.full-text", "10.1101/2020.08.13.249847"),
            ("https://www.scienceopen.com/hosted-document?doi=10.13169/intljofdissocjus.5.3.0002", "10.13169/intljofdissocjus.5.3.0002"),
        ]
        for url, expected in cases:
            with self.subTest(url=url):
                self.assertEqual(extract_publisher_doi(url), expected)

    def test_handles_malformed_ipv6_url_without_raising(self):
        self.assertIsNone(extract_publisher_doi("https://[unclosed/doi/10.1234/abc"))

    def test_preserves_balanced_parens_and_strips_markdown_closer(self):
        self.assertEqual(
            extract_publisher_doi("https://example.org/doi/10.1016/0277-9536(95)00127-S)"),
            "10.1016/0277-9536(95)00127-S",
        )
        self.assertEqual(
            extract_publisher_doi("https://www.science.org/doi/10.1126/science.aac4716)."),
            "10.1126/science.aac4716",
        )

    def test_allows_canonical_doi_and_wayback_and_regular_urls(self):
        allowed = [
            "https://doi.org/10.1126/science.aac4716",
            "https://dx.doi.org/10.1037/a0021524",
            "https://web.archive.org/web/20250101000000/https://www.science.org/doi/10.1126/science.aac4716",
            "https://www.pnas.org/content/115/11/2600",
            "https://forrt.org/reversals/",
        ]
        for url in allowed:
            with self.subTest(url=url):
                self.assertIsNone(extract_publisher_doi(url))


class TestFindPublisherDoiInDiff(unittest.TestCase):
    def test_only_flags_added_lines_in_hand_maintained_content(self):
        diff = "\n".join([
            "diff --git a/content/reversals/reversals.md b/content/reversals/reversals.md",
            "--- a/content/reversals/reversals.md",
            "+++ b/content/reversals/reversals.md",
            "@@ -10,2 +10,4 @@",
            "-Old [paper](https://www.science.org/doi/10.1126/science.old1)",
            "+New [good](https://doi.org/10.1126/science.old1)",
            "+++ https://www.science.org/doi/10.1126/science.111",
            "+Bad [paper](https://www.pnas.org/doi/full/10.1073/pnas.1208724109).",
            "diff --git a/content/curated_resources/foo.md b/content/curated_resources/foo.md",
            "--- a/content/curated_resources/foo.md",
            "+++ b/content/curated_resources/foo.md",
            "@@ -1,0 +1,1 @@",
            "+https://www.pnas.org/doi/10.1073/pnas.1618569114",
            "diff --git a/scripts/tests/example.py b/scripts/tests/example.py",
            "--- a/scripts/tests/example.py",
            "+++ b/scripts/tests/example.py",
            "@@ -1,0 +1,1 @@",
            "+https://www.science.org/doi/10.1126/science.1121629",
        ])
        violations = find_publisher_doi_in_diff(diff)
        self.assertEqual(
            violations,
            [
                DoiViolation(
                    path="content/reversals/reversals.md",
                    line=11,
                    url="https://www.science.org/doi/10.1126/science.111",
                    doi="10.1126/science.111",
                ),
                DoiViolation(
                    path="content/reversals/reversals.md",
                    line=12,
                    url="https://www.pnas.org/doi/full/10.1073/pnas.1208724109",
                    doi="10.1073/pnas.1208724109",
                ),
            ],
        )

    def test_path_filtering(self):
        self.assertTrue(is_checked_content_path("content/reversals/reversals.md"))
        self.assertTrue(is_checked_content_path("content/pedagogies/001/index.md"))
        self.assertFalse(is_checked_content_path("content/glossary/english/open_data.md"))
        self.assertFalse(is_checked_content_path("content/curated_resources/item.md"))
        self.assertFalse(is_checked_content_path("content/summaries/foo.md"))
        self.assertFalse(is_checked_content_path("data/disciplines.json"))


class TestCheckImagesAndFormatting(unittest.TestCase):
    def test_check_images_honors_ignore_list_and_skips_urls(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "content").mkdir()
            (root / "content/page.md").write_text(
                "![ok](https://example.com/pic.png)\n![bad](images/local.jpg)\n![ign](ignored.png)\n",
                encoding="utf-8",
            )
            imgs, refs = check_images(
                [("A", "static/img/foo.png"), ("A", "static/img/ignored.png"), ("M", "content/page.md")],
                repo_root=root,
                ignore_list={"static/img/ignored.png", "ignored.png"},
            )
            self.assertEqual(imgs, ["static/img/foo.png"])
            self.assertEqual(refs, ["content/page.md: images/local.jpg"])

    def test_format_comment_clean_and_failing(self):
        ok = format_comment([], [], [])
        self.assertIn(COMMENT_MARKER, ok)
        self.assertIn("All content rules passed", ok)

        bad = format_comment(
            ["static/img/foo.png"],
            [],
            [DoiViolation("content/a.md", 42, "https://www.pnas.org/doi/10.1073/pnas.1", "10.1073/pnas.1")],
        )
        self.assertIn(COMMENT_MARKER, bad)
        self.assertIn("`content/a.md:42`", bad)
        self.assertIn("`https://doi.org/10.1073/pnas.1`", bad)
        self.assertIn("static/img/foo.png", bad)


if __name__ == "__main__":
    unittest.main()
