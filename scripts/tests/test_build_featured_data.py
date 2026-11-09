"""Regression tests for archive-provider artefacts in featured APA references."""

import contextlib
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import build_featured_data as featured


class FeaturedReferences(unittest.TestCase):
    APA = "Doe, A. (2026). Title. Current Protocols, 6(1). Portico. https://doi.org/10.1002/cpz1.70299"
    CLEAN_APA = "Doe, A. (2026). Title. Current Protocols, 6(1). https://doi.org/10.1002/cpz1.70299"

    def test_removes_archive_provider_before_doi(self):
        self.assertEqual(featured.clean_apa_reference(self.APA), self.CLEAN_APA)

    def test_preserves_other_portico_mentions(self):
        for apa in (
            "Doe, A. (2026). The Portico archive. Journal. https://doi.org/10.1/x",
            "Doe, A. (2026). Title. Portico. https://example.org/article",
            "Doe, A. (2026). Title. Portico.",
            self.CLEAN_APA,
            "",
        ):
            with self.subTest(apa=apa):
                self.assertEqual(featured.clean_apa_reference(apa), apa)

    def test_titles_keep_italics_and_small_caps_with_entities_decoded(self):
        cases = {
            "Celebrating 30 years of <i>Feminism &amp; Psychology</i>":
                "Celebrating 30 years of <i>Feminism & Psychology</i>",
            "Registered Reports at &lt;em&gt;AIMS Neuroscience&lt;/em&gt; and beyond":
                "Registered Reports at <i>AIMS Neuroscience</i> and beyond",
            "The earth is round (p\u2002&lt;\u2002.05).": "The earth is round (p < .05).",
            "Promoting Research Integrity in <scp>A</scp>frica": "Promoting Research Integrity in <scp>A</scp>frica",
            "psychology departments in the\n                    <scp>UK</scp>\n                    and Ireland":
                "psychology departments in the <scp>UK</scp> and Ireland",
        }
        for raw, clean in cases.items():
            self.assertEqual(featured.clean_markup_text(raw), clean)

    def test_apa_entities_are_decoded(self):
        self.assertEqual(
            featured.clean_apa_reference("Doe, A. (2024). Title. Theory &amp; Psychology, 34(5), 1–2."),
            "Doe, A. (2024). Title. Theory & Psychology, 34(5), 1–2.",
        )

    def test_both_outputs_use_cleaned_publication_reference(self):
        doi = "10.1002/cpz1.70299"
        publication = ["Sub-cluster", doi, self.APA] + [""] * 15
        publication[6] = "Title"
        rows = {
            featured.RECOMMENDATIONS_CSV_URL: [["", "Recommender", "", "", "", "", doi, "Useful"]],
            featured.PUBLICATIONS_CSV_URL: [publication],
            featured.CLUSTERS_CSV_URL: [["Cluster"]],
            featured.SUBCLUSTERS_CSV_URL: [["Cluster", "Sub-cluster"]],
            featured.TAGS_CSV_URL: [],
            featured.VOTES_CSV_URL: [],
        }

        with tempfile.TemporaryDirectory() as directory:
            outputs = {
                name: str(Path(directory) / filename)
                for name, filename in (
                    ("OUTPUT_PATH", "featured_resources.json"),
                    ("PUB_CARDS_PATH", "pub_cards.json"),
                    ("FILTER_TAGS_PATH", "filter_tags.json"),
                )
            }
            with patch.multiple(featured, **outputs), patch.object(
                featured, "fetch_csv", side_effect=lambda url, skip_header=False: rows[url]
            ), contextlib.redirect_stdout(io.StringIO()):
                featured.main()

            cards = json.loads(Path(outputs["PUB_CARDS_PATH"]).read_text())
            resources = json.loads(Path(outputs["OUTPUT_PATH"]).read_text())

        self.assertEqual(cards[doi]["apa"], self.CLEAN_APA)
        self.assertEqual(resources["clusters"]["1"][0]["apa"], self.CLEAN_APA)
        self.assertEqual(cards[doi]["short_ref"], "Doe (2026)")


if __name__ == "__main__":
    unittest.main()
