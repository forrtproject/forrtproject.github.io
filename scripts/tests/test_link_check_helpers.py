"""Unit tests for scripts/link_check_helpers.py."""

import tempfile
import unittest
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from link_check_helpers import (
    format_limitations_section,
    parse_zenodo_url,
    verify_zenodo_urls,
)


class TestParseZenodoUrl(unittest.TestCase):
    def test_record_and_file_urls(self):
        self.assertEqual(
            parse_zenodo_url("https://zenodo.org/records/24287530"),
            ("record", "24287530", None),
        )
        self.assertEqual(
            parse_zenodo_url("https://zenodo.org/record/3593258#anchor"),
            ("record", "3593258", None),
        )
        self.assertEqual(
            parse_zenodo_url(
                "https://zenodo.org/records/24287506/files/why-open-access-lesson-plan-L2.pdf?download=1"
            ),
            ("record", "24287506", "why-open-access-lesson-plan-L2.pdf"),
        )
        self.assertEqual(
            parse_zenodo_url(
                "https://zenodo.org/record/1234/files/my%20file.pdf?download=1"
            ),
            ("record", "1234", "my file.pdf"),
        )

    def test_community_and_root_urls(self):
        self.assertEqual(
            parse_zenodo_url("https://zenodo.org/communities/forrt/records?q=&l=list"),
            ("community", "forrt", None),
        )
        self.assertEqual(
            parse_zenodo_url("https://zenodo.org/communities/civica-open-social-science"),
            ("community", "civica-open-social-science", None),
        )
        self.assertEqual(parse_zenodo_url("https://zenodo.org/"), ("root", None, None))
        self.assertEqual(parse_zenodo_url("https://www.zenodo.org"), ("root", None, None))

    def test_non_zenodo_or_unrecognized(self):
        self.assertIsNone(parse_zenodo_url("https://example.org/records/123"))
        self.assertIsNone(parse_zenodo_url("https://zenodo.org/search?q=forrt"))


class TestVerifyZenodoUrls(unittest.TestCase):
    def test_deduplicates_record_fetches_and_classifies_files(self):
        calls = []

        def fake_fetch(api_url):
            calls.append(api_url)
            if api_url == "https://zenodo.org/api/records/24287506":
                return 200, {
                    "id": 24287506,
                    "files": [
                        {"key": "lesson-L1.pdf"},
                        {"key": "lesson-L2.pdf"},
                    ],
                }
            if api_url == "https://zenodo.org/api/records/99999999":
                return 404, None
            if api_url == "https://zenodo.org/api/communities/forrt":
                return 200, {"slug": "forrt"}
            if api_url == "https://zenodo.org/api/records/5555":
                return 503, None
            return None, None

        urls = [
            "https://zenodo.org/records/24287506",
            "https://zenodo.org/records/24287506/files/lesson-L1.pdf?download=1",
            "https://zenodo.org/records/24287506/files/lesson-L2.pdf?download=1",
            "https://zenodo.org/records/24287506/files/missing.pdf?download=1",
            "https://zenodo.org/records/99999999",
            "https://zenodo.org/communities/forrt/records",
            "https://zenodo.org/records/5555",
            "https://example.org/not-zenodo",
        ]

        recovered, broken, unverified = verify_zenodo_urls(urls, fetcher=fake_fetch)

        # Record 24287506 was requested 4 times across record + files, but fetched only once
        self.assertEqual(calls.count("https://zenodo.org/api/records/24287506"), 1)
        self.assertEqual(
            sorted(recovered),
            sorted([
                "https://zenodo.org/records/24287506",
                "https://zenodo.org/records/24287506/files/lesson-L1.pdf?download=1",
                "https://zenodo.org/records/24287506/files/lesson-L2.pdf?download=1",
                "https://zenodo.org/communities/forrt/records",
            ]),
        )
        self.assertEqual(
            broken,
            {
                "https://zenodo.org/records/24287506/files/missing.pdf?download=1": "ZENODO-FILE-404",
                "https://zenodo.org/records/99999999": "404",
            },
        )
        self.assertEqual(
            sorted(unverified),
            sorted([
                "https://zenodo.org/records/5555",
                "https://example.org/not-zenodo",
            ]),
        )


class TestFormatLimitationsSection(unittest.TestCase):
    def test_reads_lychee_toml(self):
        with tempfile.TemporaryDirectory() as tmp:
            cfg = Path(tmp) / ".lychee.toml"
            cfg.write_text(
                'exclude = ["forrt\\\\.org", "://forrt\\\\.slack\\\\.com(?:/|$)"]\n'
                'exclude_path = ["newsletters/[0-9]{4}-[0-9]{2}/"]\n',
                encoding="utf-8",
            )
            md = format_limitations_section(cfg)
            self.assertIn("## Limitations / Not checked", md)
            self.assertIn("forrt\\.slack\\.com", md)
            self.assertIn("newsletters/[0-9]{4}-[0-9]{2}/", md)
            self.assertIn("Zenodo's public REST API", md)


if __name__ == "__main__":
    unittest.main()
