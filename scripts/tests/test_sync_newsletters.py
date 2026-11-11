"""Run with python3 -m unittest discover -s scripts/tests -p test_sync_newsletters.py."""
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import sync_newsletters as sync


def campaign(name, sent_at, cid="c1", status="sent", html=None, preview="Catch up."):
    return {"id": cid, "name": name, "status": status, "sent_at": sent_at,
            "subject": "What's new", "preview_text": preview,
            "content": {"html": html if html is not None else EMAIL}}


EMAIL = """<!DOCTYPE html><html><head><title></title></head>
<body style="x"><div>{{PreviewText}}</div><div>{% if PreviewText %}&nbsp;{% endif %}</div>
<h1 style="font-size: 16px;">Highlights</h1><h1>More</h1>
<img src="https://gallery.example/a.png"><img alt="Logo" src="https://gallery.example/b.png">
<div>&nbsp;{{SenderInfo}}&nbsp;</div>
You can <a target="_blank" href="{{UnsubscribeURL}}">unsubscribe</a> at any time.
<a href="{{RewardsURL}}">Powered by EmailOctopus</a></body></html>"""


class IssueMonthTests(unittest.TestCase):
    def test_month_comes_from_the_name(self):
        self.assertEqual(sync.issue_month(campaign("September Newsletter", "2026-10-01T08:02:21+00:00")),
                         (2026, 9))

    def test_december_issue_sent_in_january(self):
        self.assertEqual(sync.issue_month(campaign("December Newsletter", "2027-01-04T08:00:00+00:00")),
                         (2026, 12))

    def test_january_issue_sent_in_december(self):
        self.assertEqual(sync.issue_month(campaign("January Newsletter", "2026-12-30T08:00:00+00:00")),
                         (2027, 1))

    def test_other_campaigns_are_ignored(self):
        self.assertIsNone(sync.issue_month(campaign("Test", "2026-10-01T08:00:00+00:00")))
        self.assertIsNone(sync.issue_month(campaign("Newsletter for May", "2026-05-01T08:00:00+00:00")))
        self.assertIsNone(sync.issue_month(campaign("May Newsletter", None, status="draft")))

    def test_latest_send_of_a_month_wins(self):
        first = campaign("June Newsletter", "2026-07-01T08:01:45+00:00", cid="original")
        edit = campaign("June Newsletter Edit", "2026-07-02T12:02:35+00:00", cid="edit")
        self.assertEqual(sync.select_issues([edit, first])[(2026, 6)]["id"], "edit")


class PageTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        patcher = mock.patch.object(sync, "local_image",
                                    side_effect=lambda url, root: "/newsletters/images/" + url[-5:])
        patcher.start()
        self.addCleanup(patcher.stop)

    def test_page_is_self_contained(self):
        page = sync.page_html(campaign("October Newsletter", "2026-10-30T09:00:48+00:00"), 2026, 10, self.root)
        self.assertNotIn("{{", page)
        self.assertNotIn("{%", page)
        self.assertNotIn("gallery.example", page)
        self.assertNotIn("<h1", page)
        self.assertEqual(page.count("<h2 data-email-h1"), 2)
        self.assertIn('<img alt="" src="/newsletters/images/a.png">', page)
        self.assertIn('alt="Logo"', page)
        self.assertIn("You can unsubscribe at any time.", page)
        self.assertIn('href="https://emailoctopus.com/"', page)
        self.assertIn("<title>FORRT Newsletter, October 2026</title>", page)
        self.assertIn('<meta name="description" content="The FORRT newsletter for October 2026. Catch up.">', page)
        self.assertIn('<link rel="canonical" href="https://forrt.org/newsletters/2026-10/">', page)
        self.assertIn('href="/newsletters/"', page)

    def test_unknown_merge_tag_blocks_the_issue(self):
        html = EMAIL.replace("Highlights", "Hello {{FirstName}}")
        with self.assertRaises(sync.ArchiveError):
            sync.page_html(campaign("October Newsletter", "2026-10-30T09:00:48+00:00", html=html),
                           2026, 10, self.root)

    def test_sync_keeps_archived_issues_and_skips_failures(self):
        archived = {"id": "old", "year": 2025, "month": "May", "month_number": 5,
                    "subject": "", "sent_at": "2025-05-29T08:00:00+00:00", "url": "/newsletters/2025-05/"}
        broken = campaign("October Newsletter", "2026-10-30T09:00:48+00:00", cid="broken",
                          html=EMAIL.replace("Highlights", "{{FirstName}}"))
        good = campaign("September Newsletter", "2026-10-01T08:02:21+00:00", cid="good")
        with mock.patch.object(sync, "warn") as warn:
            entries = sync.sync([broken, good], self.root, [archived])
        self.assertEqual([e["id"] for e in entries], ["good", "old"])
        self.assertTrue((self.root / "static/newsletters/2026-09/index.html").exists())
        self.assertFalse((self.root / "static/newsletters/2026-10").exists())
        warn.assert_called_once()


class MainTests(unittest.TestCase):
    def test_api_failure_leaves_the_archive_untouched(self):
        with tempfile.TemporaryDirectory() as tmp:
            data = Path(tmp) / "data/newsletters.json"
            data.parent.mkdir()
            data.write_text(json.dumps({"issues": []}))
            before = data.read_text()
            with mock.patch.dict("os.environ", {"EMAILOCTOPUS_API_KEY": "key"}), \
                    mock.patch.object(sync, "fetch_campaigns", side_effect=OSError("down")), \
                    mock.patch.object(sync, "warn"):
                self.assertEqual(sync.main(["--root", tmp]), 0)
            self.assertEqual(data.read_text(), before)


if __name__ == "__main__":
    unittest.main()
