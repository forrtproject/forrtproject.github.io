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


if __name__ == "__main__":
    unittest.main()
