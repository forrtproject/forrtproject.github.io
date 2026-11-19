import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from glossary_related import build_also_known_as, build_related

TITLES = ["Anonymity", "Citizen Science", "Double-blind peer review", "Single-blind peer review", "Type I error"]
LINKING = [
    {"name": "Anonymous review", "term": "Double-blind peer review", "show_as_aka": "TRUE"},
    {"name": "Anonymous review", "term": "Single-blind peer review", "show_as_aka": "TRUE"},
    {"name": "Alpha error", "term": "Type I error", "show_as_aka": "TRUE"},
    {"name": "Crowd science", "term": "Citizen Science", "show_as_aka": "FALSE"},
]


def related(pairs, linking=LINKING):
    rows = [{"term": t, "related": r} for t, r in pairs]
    return build_related(rows, linking, TITLES)


class BuildRelated(unittest.TestCase):
    def test_titles_are_matched_ignoring_case_and_kept_in_order(self):
        out, warnings = related([("Anonymity", "type I error"), ("Anonymity", "Citizen Science")])
        self.assertEqual(out, {"Anonymity": ["Type I error", "Citizen Science"]})
        self.assertEqual(warnings, [])

    def test_linking_names_become_their_entries(self):
        out, _ = related([("Anonymity", "alpha error"), ("Anonymity", "Anonymous review")])
        self.assertEqual(out["Anonymity"], ["Type I error", "Double-blind peer review", "Single-blind peer review"])

    def test_self_links_and_repeats_are_dropped(self):
        out, _ = related([("Double-blind peer review", "Anonymous review"), ("Type I error", "Alpha error"),
                          ("Anonymity", "Type I error"), ("Anonymity", "Alpha error")])
        self.assertEqual(out["Double-blind peer review"], ["Single-blind peer review"])
        self.assertNotIn("Type I error", out.get("Type I error", []))
        self.assertEqual(out["Anonymity"], ["Type I error"])

    def test_unknown_names_stay_as_plain_text(self):
        out, _ = related([("Anonymity", "Research ethics"), ("Anonymity", "NA")])
        self.assertEqual(out["Anonymity"], ["Research ethics", "NA"])

    def test_unknown_host_is_reported_not_published(self):
        out, warnings = related([("Anonimity", "Type I error"), ("", "Type I error"), ("Anonymity", "")])
        self.assertEqual(out, {})
        self.assertEqual(warnings, ["related_terms: 'Anonimity' is not an entry title"])


class BuildAlsoKnownAs(unittest.TestCase):
    def test_only_ticked_names_for_existing_entries(self):
        linking = LINKING + [{"name": "Fraud", "term": "Scientific misconduct", "show_as_aka": "TRUE"},
                             {"name": "alpha error", "term": "Type I error", "show_as_aka": "TRUE"}]
        self.assertEqual(build_also_known_as(linking, TITLES), {
            "Double-blind peer review": ["Anonymous review"],
            "Single-blind peer review": ["Anonymous review"],
            "Type I error": ["Alpha error"],
        })


if __name__ == "__main__":
    unittest.main()
