import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import json  # noqa: E402

from seo_checks import resource_pagination  # noqa: E402
from seo_checks._site import Site, page_from_html  # noqa: E402


def check(pages):
    return resource_pagination.check(Site("", pages))


class ResourcePaginationCheck(unittest.TestCase):
    def pages(self, prefix=""):
        pages = []
        for number in (1, 2, 3):
            relative = "resources/" + ("page/%d/" % number if number > 1 else "")
            url = "https://example.org" + prefix + "/" + relative
            name = "Resources" + (" – Page %d" % number if number > 1 else "")
            resource = prefix + "/curated_resources/item-%d/" % number
            data = {"@type": "CollectionPage", "@id": url + "#collection", "url": url, "name": name,
                    "mainEntity": {"numberOfItems": 1, "itemListElement": [{"url": "https://example.org" + resource}]}}
            text = ('<title>%s | FORRT</title><link rel="canonical" href="%s">'
                    '<meta property="og:url" content="%s"><meta property="og:title" content="%s | FORRT">'
                    '<meta name="description" content="Resources, page %d of 3">'
                    '<script type="application/ld+json">%s</script>'
                    '<h2 class="res-title"><a href="%s">Resource</a></h2>') % (name, url, url, name, number, json.dumps(data), resource)
            pages.append(page_from_html(text, relative + "index.html"))
        return pages

    def test_self_canonical_numbered_subsets_pass_with_preview_prefix(self):
        for prefix in ("", "/rebrand-doors"):
            with self.subTest(prefix=prefix):
                self.assertEqual(check(self.pages(prefix)), [])

    def test_staging_noindex_applies_to_directory_and_subsets(self):
        pages = self.pages("/rebrand-doors")
        for page in pages:
            page.noindex = True
        self.assertEqual(check(pages), [])

    def test_repeated_first_page_metadata_fails(self):
        pages = self.pages()
        pages[1].canonical = pages[0].canonical
        pages[1].title = pages[0].title
        pages[1].descriptions = pages[0].descriptions
        failures = check(pages)
        self.assertEqual(len(failures), 1)
        for text in ("not self-canonical", "repeated title", "repeated description", "omits page number"):
            self.assertIn(text, failures[0])

    def test_wrong_structured_subset_fails(self):
        pages = self.pages()
        pages[1].resource_links = pages[0].resource_links
        self.assertIn("subset does not match HTML cards", check(pages)[0])

    def test_query_canonical_is_never_used_for_subsets(self):
        pages = self.pages()
        pages[1].canonical += "?type=reading"
        self.assertIn("not self-canonical", check(pages)[0])


if __name__ == "__main__":
    unittest.main()
