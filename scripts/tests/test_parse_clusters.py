"""Regression tests for formatting quirks in the Clusters v4.1 Google Doc."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from parse_clusters_to_sheet import (
    Cluster,
    SubCluster,
    build_export,
    build_publications,
    parse_cluster_11,
    parse_document,
    parse_subclusters_standard,
    tidy_lookup_citation,
)


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


class Export(unittest.TestCase):
    def test_sub_clusters_sharing_a_name_keep_their_own_references(self):
        def cluster(number, name, citation):
            sub = SubCluster("Reflexivity", name, "", "", [citation])
            return Cluster(number, name, "", "", [sub])

        clusters = [cluster(3, "Three", "Doe, A. (2020). From three."), cluster(10, "Ten", "Roe, B. (2021). From ten.")]
        exported = build_export(clusters, build_publications(clusters))["clusters"]
        lists = [[p["apa"] for p in c["sub_clusters"][0]["publications"]] for c in exported]
        self.assertEqual(lists, [["Doe, A. (2020). From three."], ["Roe, B. (2021). From ten."]])


class LookupCitations(unittest.TestCase):
    def test_conference_title_cut_at_a_line_break_is_restored(self):
        apa = "Doe, A. (2018). Title. 22nd Conference on Electronic. https://doi.org/10.1/x"
        bibtex = "@inproceedings{d, booktitle={22nd Conference on Electronic\n\t\tPublishing}, year={2018}}"
        self.assertEqual(
            tidy_lookup_citation(apa, bibtex),
            "Doe, A. (2018). Title. 22nd Conference on Electronic Publishing. https://doi.org/10.1/x",
        )

    def test_complete_title_with_a_line_break_is_not_repeated(self):
        apa = "Doe, A. (2004). Title. The Handbook for the\n    Sciences, 1–2. https://doi.org/10.1/x"
        bibtex = "@incollection{d, booktitle={The Handbook for the\n    Sciences}, year={2004}}"
        self.assertEqual(
            tidy_lookup_citation(apa, bibtex),
            "Doe, A. (2004). Title. The Handbook for the Sciences, 1–2. https://doi.org/10.1/x",
        )

    def test_portico_is_removed(self):
        self.assertEqual(
            tidy_lookup_citation("Doe, A. (2014). Title. J, 14(3), 1–2. Portico. https://doi.org/10.1/x"),
            "Doe, A. (2014). Title. J, 14(3), 1–2. https://doi.org/10.1/x",
        )

    def test_capitalised_surnames_are_normalised(self):
        self.assertEqual(
            tidy_lookup_citation("PIÑEIRO, R., & ROSENBLATT, F. (2016). THE TITLE. https://doi.org/10.1/x"),
            "Piñeiro, R., & Rosenblatt, F. (2016). THE TITLE. https://doi.org/10.1/x",
        )

    def test_organisations_and_suffixes_keep_their_capitals(self):
        for apa in ("KNAW, NFU, & VSNU. (2018). Title.", "Boum II, Y., & Doe, A. (2021). Title."):
            self.assertEqual(tidy_lookup_citation(apa), apa)


if __name__ == "__main__":
    unittest.main()
