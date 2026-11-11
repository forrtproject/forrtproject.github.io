"""Run with python3 -m unittest discover -s scripts/tests -p test_import_mailchimp_newsletters.py."""
from pathlib import Path
import sys
import unittest
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import import_mailchimp_newsletters as imp
import sync_newsletters as sync

TRACKED = "https://forrt.us14.list-manage.com/track/click?u=1&amp;id=2&amp;e=626cf66991"
SAFELINK = ("https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fforrt.us14.list-manage.com"
            "%2Ftrack%2Fclick%3Fu%3D1%26id%3D3%26e%3D626cf66991&amp;data=05%7C01%7Cx")
ARCHIVE = """<html><head><title>FORRT Newsletter #20 | May 2025</title>
<link rel="stylesheet" href="https://us14.campaign-archive.com/css/archivebar-desktop.css" mc:nocompile>
<script src="https://ajax.googleapis.com/jquery.min.js"></script></head>
<body id="archivebody"><div id="awesomewrap"><div><a href="javascript:;">Copy</a></div>
<ul><li><a href="http://translate.google.com/x">Translate</a></li></ul></div>
<body style="margin: 0;"><span class="mcnPreviewText" style="display:none;">Our news.</span>
<a href="%s">Glossary</a> <a href="%s">Paper</a>
<a href="https://opencollective.com/forrt" originalsrc="%s" shash="x">Donate</a>
<a href="https://mailchi.mp/forrt/forrt-newsletter-1?e=626cf66991">Last issue</a>
You can <a href="https://forrt.us14.list-manage.com/profile?u=1&amp;id=2&amp;e=626cf66991">update your preferences</a>.
</body></body></html>""" % (TRACKED, SAFELINK, TRACKED)


class CleanPageTests(unittest.TestCase):
    def clean(self, page=ARCHIVE):
        targets = {"id=2": "https://forrt.org/glossary/", "id=3": "https://doi.org/10.1/x"}
        def target(url):
            return next(v for k, v in targets.items() if k in url)
        with mock.patch.object(imp, "redirect_target", side_effect=target):
            return imp.clean_page(page, {})

    def test_toolbar_scripts_and_recipient_links_are_removed(self):
        page, preview = self.clean()
        self.assertEqual(preview, "Our news.")
        for gone in ("<script", "awesomewrap", "archivebody", "translate.google", "javascript:",
                     "list-manage", "safelinks", "originalsrc", "626cf66991", "mc:nocompile"):
            self.assertNotIn(gone, page)
        self.assertIn('<a href="https://forrt.org/glossary/">Glossary</a>', page)
        self.assertIn('<a href="https://doi.org/10.1/x">Paper</a>', page)
        self.assertIn('href="https://mailchi.mp/forrt/forrt-newsletter-1"', page)
        self.assertIn("You can update your preferences.", page)

    def test_a_recipient_link_left_over_blocks_the_issue(self):
        with self.assertRaises(sync.ArchiveError):
            self.clean(ARCHIVE.replace("Our news.", "https://forrt.us14.list-manage.com/x"))

    def test_entries_read_year_month_and_url(self):
        text = ('newsletters:\n  - year: 2024\n    issues:\n      - month: "March"\n'
                '        url: "https://eepurl.com/iMC_ws"\n')
        self.assertEqual([e[:3] for e in imp.entries(text)], [(2024, 3, "https://eepurl.com/iMC_ws")])


if __name__ == "__main__":
    unittest.main()
