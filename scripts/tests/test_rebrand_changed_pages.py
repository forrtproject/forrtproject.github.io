import json
import sys
import tempfile
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "rebrand"))
from changed_pages import compare, load_selection, normalize


class ChangedPagesTest(unittest.TestCase):
    def test_fingerprints_and_integrity_do_not_change_html(self):
        old = '<link href=/css/site.min.' + 'a' * 32 + '.css integrity="md5-old">'
        new = '<link href=/css/site.min.' + 'b' * 32 + '.css integrity=md5-new>'
        self.assertEqual(normalize(old), normalize(new))
        self.assertNotEqual(normalize(old + '<p>old'), normalize(new + '<p>new'))

    def test_paths_and_bundle_contents(self):
        with tempfile.TemporaryDirectory() as directory:
            base, head = (Path(directory) / name for name in ("base", "head"))
            base.mkdir()
            head.mkdir()
            for root, contents in ((base, "old"), (head, "new")):
                (root / "index.html").write_text(contents)
                (root / "404.html").write_text("same")
                (root / contents).mkdir()
                (root / contents / "index.html").write_text(contents)
            old_bundle = base / ("site." + "a" * 32 + ".js")
            new_bundle = head / ("site." + "b" * 32 + ".js")
            old_bundle.write_text("same bytes")
            new_bundle.write_text("same bytes")
            expected = {"changed": ["/"], "added": ["/new/"], "removed": ["/old/"], "bundles_changed": False}
            self.assertEqual(compare(base, head), expected)
            new_bundle.write_text("new bytes")
            self.assertEqual(compare(base, head), {**expected, "bundles_changed": True})

    def test_selection(self):
        empty = {"changed": [], "added": [], "removed": [], "bundles_changed": False}
        cases = [
            (empty, "none", set()),
            ({**empty, "bundles_changed": True}, "core", set()),
            ({**empty, "added": ["/new/"], "removed": ["/old/"]}, "changed", {"/new/"}),
            ({**empty, "removed": [f"/{i}/" for i in range(61)]}, "full", set()),
            ({**empty, "force_full": True}, "full", set()),
        ]
        with tempfile.TemporaryDirectory() as directory, redirect_stdout(StringIO()):
            path = Path(directory) / "changed.json"
            for diff, mode, pages in cases:
                with self.subTest(mode=mode):
                    path.write_text(json.dumps(diff))
                    self.assertEqual(load_selection(path), (mode, pages))
