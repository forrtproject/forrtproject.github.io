"""Tests for the Lesson Plans activity cards."""

import csv
import io
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import build_lesson_activities as activities

COLUMNS = [
    "Cluster", "Title", "Description", "Learning outcomes", "Medium", "Delivery", "Time",
    "Supporting resources", "Reference (if applicable)", "@dropdown", "Notes",
]


def sheet(*rows):
    out = io.StringIO()
    writer = csv.DictWriter(out, fieldnames=COLUMNS, restval="")
    writer.writeheader()
    writer.writerows(rows)
    return out.getvalue()


def build(**row):
    defaults = {"Cluster": "FAIR", "Title": "Title", "Supporting resources": "https://osf.io/stv7w/"}
    return activities.build(sheet({**defaults, **row}))


class ToSegments(unittest.TestCase):
    def test_plain_text_is_kept_verbatim(self):
        self.assertEqual(activities.to_segments("In class demo?"), [{"text": "In class demo?"}])

    def test_empty_text_has_no_segments(self):
        self.assertEqual(activities.to_segments(""), [])

    def test_punctuation_after_a_url_stays_outside_the_link(self):
        segments = activities.to_segments("See (https://osf.io/mh9pe/). Next")
        self.assertEqual(segments[1]["url"], "https://osf.io/mh9pe/")
        self.assertEqual(segments[2], {"text": "). Next"})

    def test_separated_urls_become_separate_links(self):
        segments = activities.to_segments("https://osf.io/stv7w/, https://osf.io/3vaem/")
        self.assertEqual([s.get("url") for s in segments], ["https://osf.io/stv7w/", None, "https://osf.io/3vaem/"])

    def test_bare_dois_are_linked_and_keep_their_text(self):
        segments = activities.to_segments("Journal, 37. doi:10.1509/jmkr.45.6.633.")
        self.assertEqual(segments[1], {"text": "doi:10.1509/jmkr.45.6.633", "url": "https://doi.org/10.1509/jmkr.45.6.633"})
        self.assertEqual(segments[2], {"text": "."})

    def test_other_url_schemes_are_not_linked(self):
        self.assertEqual(activities.to_segments("javascript:alert(1)"), [{"text": "javascript:alert(1)"}])

    def test_long_addresses_show_only_the_host(self):
        url = "https://journals.sagepub.com/doi/full/10.1177/0098628319853937"
        self.assertEqual(activities.link_label(url), "journals.sagepub.com")

    def test_dois_are_shown_in_full(self):
        url = "https://doi.org/10.1177/25152459211007467"
        self.assertEqual(activities.link_label(url), "doi.org/10.1177/25152459211007467")


class Build(unittest.TestCase):
    def test_notes_are_not_published(self):
        self.assertNotIn("internal", str(build(Notes="internal")))

    def test_rows_without_a_title_are_skipped(self):
        self.assertEqual(build(Title="")["activities"], [])

    def test_rows_without_a_link_are_left_out(self):
        self.assertEqual(build(**{"Supporting resources": "Journal of Fluency Disorders"})["activities"], [])

    def test_keeps_sheet_order_and_lists_clusters_alphabetically(self):
        data = activities.build(sheet(
            {"Cluster": "Preregistration", "Title": "First", "Description": "https://osf.io/stv7w/"},
            {"Cluster": "FAIR ", "Title": "Second", "Reference (if applicable)": "doi:10.1000/1"},
        ))
        self.assertEqual([a["title"] for a in data["activities"]], ["First", "Second"])
        self.assertEqual(data["clusters"], ["FAIR", "Preregistration"])

    def test_a_row_can_belong_to_several_clusters(self):
        for value in ("Open data; Academic Life", "Open data/Academic Life"):
            self.assertEqual(build(Cluster=value)["activities"][0]["clusters"], ["Open data", "Academic Life"])

    def test_not_applicable_reference_is_left_out(self):
        self.assertEqual(build(**{"Reference (if applicable)": "N/A"})["activities"][0]["reference"], [])

    def test_missing_column_is_an_error(self):
        with self.assertRaises(ValueError):
            activities.build("Title,Cluster\nA,B\n")


if __name__ == "__main__":
    unittest.main()
