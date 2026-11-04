#!/usr/bin/env python3
"""The steering committee generator keeps each person's existing author folder."""
import sys
import tempfile
import types
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import generate_sc_profiles as sc  # noqa: E402

if sc.pd is None:  # pandas is optional here, and only isna is used.
    sc.pd = types.SimpleNamespace(isna=lambda value: value is None)


class ExistingAuthorDir(unittest.TestCase):
    def found(self, name, folders):
        with tempfile.TemporaryDirectory() as authors:
            for folder in folders:
                (Path(authors) / folder).mkdir()
            return sc.find_existing_author_dir(name, Path(authors))

    def test_folder_without_separators(self):
        self.assertEqual(self.found("Ruth Van der Hallen, PhD ", ["ruthvanderhallenphd"]), "ruthvanderhallenphd")

    def test_hyphenated_folder(self):
        self.assertEqual(self.found("Dr Ana Marinho", ["ana-marinho"]), "ana-marinho")

    def test_other_people_do_not_match(self):
        self.assertIsNone(self.found("Ruth Van der Hallen, PhD", ["ruth-vander-berg", "ana-marinho"]))


if __name__ == "__main__":
    unittest.main()
