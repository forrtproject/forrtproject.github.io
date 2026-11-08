"""Run the 404 page's redirect script in Node.js and check where it sends old URLs (#1035)."""

import json
from pathlib import Path
import re
import shutil
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[2]
BASE_TEMPLATE = '{{ strings.TrimSuffix "/" (urls.Parse site.BaseURL).Path }}'
# Runs the script once per URL with a stub window.location and prints each redirect target.
RUNNER = """
const vm = require('node:vm');
const { script, urls } = JSON.parse(require('node:fs').readFileSync(0, 'utf8'));
const targets = urls.map(url => {
  const u = new URL(url, 'https://example.org');
  let target = null;
  vm.runInNewContext(script, { window: { location: {
    pathname: u.pathname, search: u.search, hash: u.hash, replace: t => { target = t; } } } });
  return target;
});
process.stdout.write(JSON.stringify(targets));
"""


@unittest.skipUnless(shutil.which("node"), "Node.js is required to run the redirect script")
class RedirectTests(unittest.TestCase):
    def redirects(self, base, urls):
        template = (ROOT / "layouts/404.html").read_text(encoding="utf-8")
        script = re.search(r"<script>(.*?)</script>", template, re.S).group(1)
        self.assertIn(BASE_TEMPLATE, script, "The 404 page's base expression changed; update this test")
        result = subprocess.run(["node", "-e", RUNNER], check=True, capture_output=True, text=True,
                                input=json.dumps({"script": script.replace(BASE_TEMPLATE, base), "urls": urls}))
        return json.loads(result.stdout)

    def test_query_and_fragment_survive_the_redirect(self):
        for base in ("", "/rebrand-doors"):
            with self.subTest(base=base):
                self.assertEqual(self.redirects(base, [
                    base + "/replication_handbook/chapter.html?view=full#section-2",
                    base + "/FReD#top",
                    base + "/curated_resources/old/?q=a%20b",
                ]), [
                    "/replication-handbook/chapter.html?view=full#section-2",  # sister sites: domain root
                    "/fred#top",
                    base + "/resources/?q=a%20b",
                ])


if __name__ == "__main__":
    unittest.main()
