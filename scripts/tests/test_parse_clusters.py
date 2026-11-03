"""Regression tests for formatting quirks in the Clusters v4.1 Google Doc."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from parse_clusters_to_sheet import parse_cluster_11, parse_document, parse_subclusters_standard


class StandardSubClusters(unittest.TestCase):
    def names(self, lines, toc):
        return [s.name for s in parse_subclusters_standard(lines, 0, len(lines), toc, "Cluster")]

    def test_citation_ending_in_colon_is_not_a_heading(self):
        lines = [
            "Rights retention strategies",
            "To whom does the paper belong?",
            "* SPARC Europe - Rights Retention Helper:",
            "https://sparceurope.org/helper/",
        ]
        self.assertEqual(self.names(lines, ["Rights retention strategies"]), ["Rights retention strategies"])

    def test_comment_marker_before_indent_is_a_continuation(self):
        heading = "Questionable measurement practices (QMPs), validity & reliability issues."
        lines = [
            heading,
            "* Flake, J. K., & Fried, E. I. (2020). Measurement schmeasurement:",
            "[ai]        Questionable measurement practices and how to avoid them.",
        ]
        self.assertEqual(self.names(lines, [heading]), [heading])


class ClusterDescriptions(unittest.TestCase):
    def test_editors_note_above_description_heading_is_left_out(self):
        lines = [
            "Cluster 1: First",
            "Description",
            "First description.",
            "",
            "Cluster 10: Qualitative Research",
            "Invite review of: Booklet.pdf",
            "Description",
            "Qualitative research description.",
        ]
        clusters = parse_document(lines + ["Cluster 11: Research Integrity"])
        self.assertEqual(clusters[1].description, "Qualitative research description.")


class ClusterEleven(unittest.TestCase):
    def test_sub_clusters_follow_the_internal_toc_without_a_separator(self):
        lines = [
            "Cluster 11: Research Integrity",
            "Research Integrity Cluster",
            "Cluster Description",
            "Research Integrity encompasses standards.",
            "",
            "Research Integrity (RI) Cluster",
            "Cluster Description",
            "Sub-cluster 1: Principles",
            "Sub-cluster 2: Misconduct",
            "",
            "Sub-cluster 1: Principles",
            "Description: Core principles.",
            "Sub-cluster 2: Misconduct",
            "Description: Fabrication.",
        ]
        description, sub_clusters = parse_cluster_11(lines, 0, len(lines))
        self.assertEqual(description, "Research Integrity encompasses standards.")
        self.assertEqual([s.name for s in sub_clusters], ["Principles", "Misconduct"])
        self.assertEqual(sub_clusters[0].description, "Core principles.")


if __name__ == "__main__":
    unittest.main()
