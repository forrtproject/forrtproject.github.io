"""Check data/clusters_v4.json against what its cluster descriptions state."""
import json
import re
import unittest
from pathlib import Path

DATA = Path(__file__).resolve().parents[2] / "data" / "clusters_v4.json"
STATED_COUNT = re.compile(r"(?:There are|has) (\d+) sub-clusters")


class StatedSubClusterCounts(unittest.TestCase):
    def test_descriptions_match_listed_sub_clusters(self):
        clusters = json.loads(DATA.read_text(encoding="utf-8"))["clusters"]
        for cluster in clusters:
            stated = STATED_COUNT.search(cluster["description"])
            if stated:
                with self.subTest(cluster=cluster["number"]):
                    self.assertEqual(int(stated.group(1)), len(cluster["sub_clusters"]))


if __name__ == "__main__":
    unittest.main()
