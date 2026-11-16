"""Tests for the Open Research Games Portal data generator (no network)."""

import csv
import io
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import build_games_portal as games

HEADER = ["Game ID", "Title", "Creators", "Description", "Acces(only_link)", "Access_additional",
          "Delivery format", "Game type", "Gameplay style", "Tone", "Topic area", "FORRT clusters",
          "Testimonials", "Entry ID"]


def sheet(rows, header=HEADER):
    out = io.StringIO()
    writer = csv.writer(out)
    writer.writerow(header)
    writer.writerows(rows)
    return out.getvalue()


def row(gid, **cells):
    base = dict(zip(HEADER, [gid, f"Game {gid}", "", "A game.", "https://example.org/game", "", "Online",
                             "Quiz", "Solo", "Balanced", "Open Data", "Publication Sharing", "", "ENTN_001"]))
    base.update(cells)
    return [base[name] for name in HEADER]


def many(*extra, count=games.MIN_GAMES):
    return [row(f"GID_{n:03d}") for n in range(100, 100 + count)] + list(extra)


class Entries(unittest.TestCase):
    def test_merged_answers_split_on_bullets(self):
        self.assertEqual(games.entries("• First answer\r\n• Second, with a comma"),
                         ["First answer", "Second, with a comma"])

    def test_single_answer_keeps_its_paragraphs(self):
        self.assertEqual(games.entries("Line one\r\n\r\n\r\nLine two"), ["Line one\n\nLine two"])

    def test_repeated_answers_appear_once(self):
        self.assertEqual(games.entries("• Same\n• Same"), ["Same"])

    def test_values_dedupe_across_answers(self):
        self.assertEqual(games.values("• Construction\n• Building with lego, Construction"),
                         ["Construction", "Building with lego"])


class Facets(unittest.TestCase):
    def test_clusters_in_cluster_order_with_numbers(self):
        found = games.clusters("Research Integrity, Cluster 6: FAIR Data and Materials - Making data findable")
        self.assertEqual(found, [{"number": 6, "name": "FAIR Data and Materials"},
                                 {"number": 11, "name": "Research Integrity"}])

    def test_topics_keep_codebook_options_only(self):
        self.assertEqual(games.pick(games.values("open peer review, Copyright, Open Access"), games.TOPICS),
                         ["Open Access", "Open Peer Review"])

    def test_gameplay_variants(self):
        self.assertEqual(games.gameplay("• Competative\n• Solo/Cooperative"),
                         ["Cooperative/Collaborative", "Competitive", "Solo"])

    def test_tone_drops_explanation(self):
        self.assertEqual(games.tones("Balanced - Mix of fun and learning"), ["Balanced"])

    def test_first_url_strips_trailing_punctuation(self):
        self.assertEqual(games.first_url("Blog: https://example.org/a). More: https://b.org"), "https://example.org/a")


class Build(unittest.TestCase):
    def test_builds_sorted_games_without_entry_ids(self):
        data = games.build(sheet(many(row("GID_002"), row("GID_001"))))
        self.assertEqual([g["id"] for g in data["games"][:2]], ["GID_001", "GID_002"])
        first = data["games"][0]
        self.assertEqual(first["anchor"], "gid-001")
        self.assertEqual(first["url"], "https://example.org/game")
        self.assertNotIn("entry_id", first)
        self.assertNotIn("ENTN_001", str(first))

    def test_rows_without_id_or_title_are_skipped(self):
        data = games.build(sheet(many(row("", Title="Draft"), row("GID_001", Title=""))))
        self.assertEqual(len(data["games"]), games.MIN_GAMES)

    def test_missing_column_fails(self):
        header = [name for name in HEADER if name != "FORRT clusters"]
        with self.assertRaisesRegex(ValueError, "forrt_clusters"):
            games.build(sheet([], header))

    def test_too_few_games_fails(self):
        with self.assertRaisesRegex(ValueError, "only 2 games"):
            games.build(sheet([row("GID_001"), row("GID_002")]))

    def test_duplicate_ids_fail(self):
        with self.assertRaisesRegex(ValueError, "twice"):
            games.build(sheet(many(row("GID_001"), row("GID_001"))))


if __name__ == "__main__":
    unittest.main()
