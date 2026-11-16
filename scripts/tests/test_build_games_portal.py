"""Tests for the Open Research Games Portal data generator (no network)."""

import contextlib
import csv
import io
import json
import os
import shutil
import sys
import tempfile
import unittest
import urllib.error
from pathlib import Path
from unittest.mock import patch

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

    def test_ids_giving_the_same_anchor_fail(self):
        with self.assertRaisesRegex(ValueError, "anchors"):
            games.build(sheet(many(row("GID 001"), row("GID_001"))))


class Main(unittest.TestCase):
    """main() writes only a good sheet, tries the second address, and otherwise leaves the file alone."""

    def setUp(self):
        folder = tempfile.mkdtemp(prefix="scratch-games-")
        self.addCleanup(shutil.rmtree, folder)
        self.path = os.path.join(folder, "open_research_games.json")
        with open(self.path, "w", encoding="utf-8") as handle:
            handle.write('{"games": ["old"]}')
        patcher = patch.object(games, "OUTPUT_PATH", self.path)
        patcher.start()
        self.addCleanup(patcher.stop)

    def run_main(self, responses):
        def fetch(url):
            answer = responses[games.CSV_URLS.index(url)]
            if isinstance(answer, Exception):
                raise answer
            return answer
        with patch.object(games, "fetch", side_effect=fetch), contextlib.redirect_stderr(io.StringIO()), \
                contextlib.redirect_stdout(io.StringIO()):
            return games.main()

    def saved(self):
        with open(self.path, encoding="utf-8") as handle:
            return json.load(handle)

    def test_failures_leave_the_file_unchanged(self):
        for responses in ([urllib.error.URLError("down"), ConnectionResetError()],
                          [sheet([row("GID_001")]), 'Game ID,Title\n"unclosed'],
                          # A cell over the csv module's field size limit raises csv.Error while parsing.
                          [csv.Error("field larger than field limit"), sheet(many(row("GID_001", Description="x" * (csv.field_size_limit() + 1))))]):
            self.assertEqual(self.run_main(responses), 1)
            self.assertEqual(self.saved(), {"games": ["old"]})
        self.assertEqual(os.listdir(os.path.dirname(self.path)), ["open_research_games.json"])

    def test_second_address_used_when_first_fails(self):
        self.assertEqual(self.run_main([TimeoutError(), sheet(many())]), 0)
        self.assertEqual(len(self.saved()["games"]), games.MIN_GAMES)

    def test_failed_write_keeps_old_file(self):
        with patch.object(games.json, "dump", side_effect=OSError("disk full")):
            with self.assertRaises(OSError):
                games.write({"games": []}, self.path)
        self.assertEqual(self.saved(), {"games": ["old"]})
        self.assertEqual(os.listdir(os.path.dirname(self.path)), ["open_research_games.json"])


if __name__ == "__main__":
    unittest.main()
