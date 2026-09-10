"""Run with python3 -m unittest discover -s scripts/tests -p test_data_artifact.py."""
import contextlib
import io
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import data_artifact as artifact


OLD = 1600000000
NEW = 1700000000


class FreshnessTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name) / "repo"
        self.root.mkdir()
        self.download = Path(self.tmp.name) / "download"
        self.download.mkdir()
        self.git("init", "-b", "main")
        self.git("config", "user.name", "Test")
        self.git("config", "user.email", "test@example.org")
        self.write(self.root, "data/example.json", '{"value": "committed"}')
        self.commit(OLD)

    def git(self, *args, stamp=None):
        env = os.environ.copy()
        if stamp:
            env.update(GIT_AUTHOR_DATE=f"@{stamp} +0000", GIT_COMMITTER_DATE=f"@{stamp} +0000")
        return subprocess.check_output(["git", "-C", str(self.root), *args], env=env, stderr=subprocess.STDOUT)

    def commit(self, stamp):
        self.git("add", "-A")
        self.git("commit", "-m", "Update data", stamp=stamp)

    def write(self, root, name, content):
        file = root / name
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(content)
        return file

    def manifest(self):
        with contextlib.redirect_stdout(io.StringIO()):
            return artifact.make_manifest(self.root)

    def overlay(self):
        with contextlib.redirect_stdout(io.StringIO()):
            return artifact.overlay(self.root, self.download)

    def package(self, stamp, content="artifact"):
        file = self.write(self.root, "data/example.json", content)
        os.utime(file, (stamp, stamp))
        self.manifest()
        shutil.copytree(self.root / "data", self.download / "data")
        shutil.copyfile(self.root / artifact.MANIFEST, self.download / artifact.MANIFEST)
        (self.root / artifact.MANIFEST).unlink()
        self.git("restore", "data/example.json")

    def test_unchanged_file_uses_commit_time_not_checkout_time(self):
        os.utime(self.root / "data/example.json", (NEW, NEW))
        record = self.manifest()["files"]["data/example.json"]
        self.assertEqual((record["updated_at"], record["origin"]), (OLD, "git"))

    def test_generated_file_uses_generation_time(self):
        file = self.write(self.root, "data/example.json", "generated")
        os.utime(file, (NEW, NEW))
        record = self.manifest()["files"]["data/example.json"]
        self.assertEqual((record["updated_at"], record["origin"]), (NEW, "generated"))

    def test_newer_artifact_wins_even_with_old_download_mtime(self):
        self.package(NEW)
        os.utime(self.download / "data/example.json", (OLD - 10, OLD - 10))
        self.assertEqual(self.overlay()["artifact-newer"], 1)
        self.assertEqual((self.root / "data/example.json").read_text(), "artifact")

    def test_newer_committed_data_wins(self):
        self.package(OLD + 10)
        self.write(self.root, "data/example.json", "new commit")
        self.commit(NEW)
        self.assertEqual(self.overlay()["committed-newer-or-equal"], 1)
        self.assertEqual((self.root / "data/example.json").read_text(), "new commit")

    def test_equal_timestamp_prefers_committed(self):
        self.package(OLD)
        self.assertEqual(self.overlay()["committed-newer-or-equal"], 1)

    def test_synthetic_merge_does_not_refresh_data_age(self):
        self.git("checkout", "-b", "feature")
        self.write(self.root, "data/example.json", "feature")
        self.commit(OLD + 10)
        self.git("checkout", "main")
        self.git("merge", "--no-ff", "feature", "-m", "Aggregate PR", stamp=NEW)
        self.assertEqual(self.manifest()["files"]["data/example.json"]["updated_at"], OLD + 10)

    def test_legacy_artifact_retains_conflicts_but_adds_new_files(self):
        self.write(self.download, "data/example.json", "unknown age")
        self.write(self.download, "static/data/new.json", "new file")
        result = self.overlay()
        self.assertEqual(result["committed-unknown-artifact-age"], 1)
        self.assertEqual(result["artifact-only"], 1)

    def test_identical_files_need_no_timestamp_decision(self):
        self.write(self.download, "data/example.json", (self.root / "data/example.json").read_text())
        self.assertEqual(self.overlay()["identical"], 1)

    def test_committed_deletions_are_not_resurrected(self):
        self.package(OLD + 10)
        self.git("rm", "data/example.json")
        self.commit(NEW)
        self.assertEqual(self.overlay()["committed-deletion-newer-or-unknown"], 1)
        self.assertFalse((self.root / "data/example.json").exists())

    def test_corrupt_manifest_fails_before_copying_anything(self):
        self.package(NEW)
        self.write(self.download, "data/example.json", "tampered")
        with self.assertRaisesRegex(ValueError, "manifest mismatch"):
            self.overlay()
        self.assertIn("committed", (self.root / "data/example.json").read_text())

    def test_uncommitted_changes_are_not_overwritten(self):
        self.package(NEW)
        self.write(self.root, "data/example.json", "local edits")
        with self.assertRaisesRegex(ValueError, "locally modified"):
            self.overlay()

    def test_excluded_files_are_not_packaged(self):
        self.write(self.root, "data/partners.json", "partner configuration")
        self.assertNotIn("data/partners.json", self.manifest()["files"])


if __name__ == "__main__":
    unittest.main()
