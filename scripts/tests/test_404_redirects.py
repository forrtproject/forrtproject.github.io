"""Execute the 404 template's redirect script with Node.js."""

import json
from pathlib import Path
import re
import shutil
import subprocess
import unittest


ROOT = Path(__file__).resolve().parents[2]
BASE_TEMPLATE = '{{ strings.TrimSuffix "/" (urls.Parse site.BaseURL).Path }}'
RUNNER = """
const fs = require('node:fs');
const vm = require('node:vm');
const { script, cases } = JSON.parse(fs.readFileSync(0, 'utf8'));
const results = cases.map(({ url }) => {
  const parsed = new URL(url, 'https://example.org');
  const targets = [];
  vm.runInNewContext(script, {
    window: { location: {
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      replace: target => targets.push(target)
    } }
  });
  return targets;
});
process.stdout.write(JSON.stringify(results));
"""


@unittest.skipUnless(shutil.which("node"), "Node.js is required to execute redirects")
class RedirectTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        template = (ROOT / "layouts/404.html").read_text(encoding="utf-8")
        cls.script = re.search(r"<script>(.*?)</script>", template, re.S).group(1)
        if BASE_TEMPLATE not in cls.script:
            raise AssertionError("The 404 base template changed; update the test renderer")

    def check_redirects(self, paths, suffixes=("?view=full#section",)):
        for base in ("", "/rebrand-doors"):
            cases = [
                {"url": base + old + suffix, "expected": target + suffix}
                for old, target in paths(base)
                for suffix in suffixes
            ]
            result = subprocess.run(
                ["node", "-e", RUNNER],
                input=json.dumps({
                    "script": self.script.replace(BASE_TEMPLATE, base),
                    "cases": cases,
                }),
                text=True, capture_output=True, check=True,
            )
            results = json.loads(result.stdout)
            self.assertEqual(len(results), len(cases))
            for case, targets in zip(cases, results):
                with self.subTest(url=case["url"]):
                    self.assertEqual(targets, [case["expected"]])

    def test_handbook_keeps_query_and_fragment(self):
        self.check_redirects(
            lambda base: [("/replication_handbook/chapter.html", "/replication-handbook/chapter.html")],
            ("", "?view=full", "#section", "?view=full#section", "?q=a%20b&x=%23#part%202"),
        )

    def test_sister_sites_stay_at_domain_root_with_optional_captures(self):
        renames = (
            ("FReD-apps", "fred-apps"),
            ("FReD", "fred"),
            ("flora_zotero", "flora-zotero"),
            ("LoveReplicationsWeek", "love-replications-week"),
            ("plugin_notification_dummy", "plugin-notification-dummy"),
            ("replication_handbook", "replication-handbook"),
            ("TenureRun", "tenure-run"),
            ("Transform-to-Open-Science-Book", "transform-to-open-science-book"),
        )
        self.check_redirects(lambda base: [
            ("/" + old + tail, "/" + new + tail)
            for old, new in renames
            for tail in ("", "/", "/chapter/part.html")
        ])

    def test_local_destinations_keep_preview_base(self):
        self.check_redirects(lambda base: [
            ("/curated_resources/old/", base + "/resources/"),
            ("/glossary/english/old/", base + "/glossary/english/"),
            ("/author/someone/", base + "/contributors/"),
            ("/summaries/old/", base + "/"),
            ("/reversals/old/", base + "/"),
            ("/re-searchterms/", base + "/apps/re-searchterms.html"),
        ])


if __name__ == "__main__":
    unittest.main()
