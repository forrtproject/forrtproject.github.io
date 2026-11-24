#!/usr/bin/env python3
"""Unit tests for deterministic role and project filter lists in scripts/forrt_contribs/tenzing.py."""
import json
import os
import subprocess
import sys
import unittest
from pathlib import Path

TENZING_DIR = Path(__file__).resolve().parents[1] / "forrt_contribs"
sys.path.insert(0, str(TENZING_DIR))

import tenzing  # noqa: E402


class DeterministicFilterLists(unittest.TestCase):
    def test_role_labels_prefer_canonical_sentence_case_regardless_of_input_order(self):
        first = tenzing.build_roles_list(["Project Manager", "Project manager", "Supervision"])
        second = tenzing.build_roles_list(["Project manager", "Project Manager", "Supervision"])
        self.assertEqual(first, second)
        self.assertEqual(
            first,
            [
                {"value": "project-manager", "label": "Project manager"},
                {"value": "supervision", "label": "Supervision"},
            ],
        )

    def test_role_labels_sorted_case_insensitively_and_ignore_blanks(self):
        roles = tenzing.build_roles_list(
            [None, "", "  ", "Project Coordinator", "Project administration", "Project Manager", "Project manager"]
        )
        self.assertEqual(
            [r["label"] for r in roles],
            ["Project administration", "Project Coordinator", "Project manager"],
        )

    def test_role_labels_identical_across_python_hash_seeds(self):
        probe = (
            "import json, sys; "
            f"sys.path.insert(0, {str(TENZING_DIR)!r}); "
            "import tenzing; "
            "roles = tenzing.build_roles_list(['Project Manager', 'Project manager', 'Writing - original draft', "
            "'Writing - review & editing', 'Project Coordinator', 'Project administration']); "
            "print(json.dumps(roles))"
        )
        outputs = []
        for seed in ("1", "42", "999", "20261124"):
            env = {**os.environ, "PYTHONHASHSEED": seed}
            out = subprocess.check_output([sys.executable, "-c", probe], env=env, text=True).strip()
            outputs.append(out)
        self.assertEqual(len(set(outputs)), 1, f"Role list varied across PYTHONHASHSEED: {outputs}")

    def test_projects_list_deduplicates_whitespace_and_case_variants(self):
        projects = tenzing.build_projects_list(
            ["Team Ideas ", "Team Ideas", "German teaching network grant", "German Teaching Network Grant", ""]
        )
        self.assertEqual(
            projects,
            [
                {"value": "german-teaching-network-grant", "label": "German Teaching Network Grant"},
                {"value": "team-ideas", "label": "Team Ideas"},
            ],
        )

    def test_safe_project_url_rejects_unsafe_schemes(self):
        self.assertEqual(tenzing.safe_project_url("https://forrt.org/glossary/"), "https://forrt.org/glossary/")
        self.assertEqual(tenzing.safe_project_url(" http://example.org/p "), "http://example.org/p")
        self.assertEqual(tenzing.safe_project_url("/glossary/"), "/glossary/")
        self.assertEqual(tenzing.safe_project_url("javascript:alert(1)"), "")
        self.assertEqual(tenzing.safe_project_url("JAVASCRIPT:alert(1)"), "")
        self.assertEqual(tenzing.safe_project_url("data:text/html,<script>"), "")
        self.assertEqual(tenzing.safe_project_url("//evil.example/x"), "")
        self.assertEqual(tenzing.safe_project_url(None), "")

    def test_partition_contributions_counts_distinct_projects(self):
        # 5 records across only 4 distinct projects stay uncollapsed.
        items_4 = [f"<li>{i}</li>" for i in range(5)]
        projs_4 = ["a", "a", "b", "c", "d"]
        shown, rest, extra = tenzing.partition_contributions(items_4, projs_4)
        self.assertEqual(shown, items_4)
        self.assertEqual(rest, [])
        self.assertEqual(extra, 0)

        # 6 records across 5 distinct projects keep all records for the first 2 distinct projects together.
        items_5 = [f"<li>{i}</li>" for i in range(6)]
        projs_5 = ["a", "b", "a", "c", "d", "e"]
        shown, rest, extra = tenzing.partition_contributions(items_5, projs_5)
        self.assertEqual(shown, ["<li>0</li>", "<li>1</li>", "<li>2</li>"])
        self.assertEqual(rest, ["<li>3</li>", "<li>4</li>", "<li>5</li>"])
        self.assertEqual(extra, 3)


if __name__ == "__main__":
    unittest.main()
