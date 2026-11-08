"""Build the real charity front matter to check its legacy GEP redirect."""

import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


@unittest.skipUnless(shutil.which("hugo"), "Hugo is required to build aliases")
class CharityAliasTests(unittest.TestCase):
    def test_gep_alias_targets_published_parent_at_root_and_preview(self):
        with tempfile.TemporaryDirectory(prefix="scratch-charity-alias-", dir=ROOT) as directory:
            site = Path(directory)
            charity = site / "content/about/charity"
            charity.mkdir(parents=True)
            for name in ("index.md", "rename.md"):
                shutil.copyfile(ROOT / "content/about/charity" / name, charity / name)
            (site / "hugo.toml").write_text('locale = "en-GB"\n', encoding="utf-8")
            (site / "layouts/_default").mkdir(parents=True)
            (site / "layouts/_default/list.html").write_text("{{ .Title }}", encoding="utf-8")
            (site / "layouts/_default/single.html").write_text("{{ .Title }}", encoding="utf-8")
            (site / "layouts/partials").mkdir()
            for name in ("alias.html", "partials/redirect_page.html"):
                shutil.copyfile(ROOT / "layouts" / name, site / "layouts" / name)

            for base_path in ("/", "/rebrand-doors/"):
                with self.subTest(base_path=base_path):
                    destination = site / ("public-root" if base_path == "/" else "public-preview")
                    result = subprocess.run(
                        ["hugo", "--source", str(site), "--baseURL", "https://example.org" + base_path,
                         "--destination", str(destination), "--printPathWarnings"],
                        capture_output=True, text=True, check=True,
                    )
                    self.assertNotIn("WARN", result.stdout + result.stderr)
                    target = "https://example.org" + base_path + "about/charity/"
                    redirect = (destination / "about/charity/gep/index.html").read_text(encoding="utf-8")
                    self.assertIn(f'<link rel="canonical" href="{target}">', redirect)
                    self.assertIn(f'content="0; url={target}"', redirect)
                    self.assertIn(f'<a href="{target}">', redirect)


if __name__ == "__main__":
    unittest.main()
