import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from seo_checks import clusters_map  # noqa: E402
from seo_checks._site import Site  # noqa: E402


def clusters_map_failures(page):
    with tempfile.TemporaryDirectory() as public:
        (Path(public) / "clusters").mkdir()
        (Path(public) / "clusters" / "index.html").write_text(page, encoding="utf-8")
        return clusters_map.check(Site(public, []))


class ClustersMapCheck(unittest.TestCase):
    MAP = ('<figure class="clusters-map"><div class="clusters-map__stage"><svg class="clusters-map__ring" aria-hidden="true"></svg>'
           '<ol class="clusters-map__spots"><li><a class="clusters-map__tag" href="/clusters/cluster-1/">'
           '<span class="visually-hidden">Cluster 1: </span><span class="clusters-map__tag-name"><span>One</span></span> <span class="clusters-map__cue">1 sub-cluster</span></a>'
           '<div class="clusters-map__panel" id="panel-1" inert><ul><li><a href="#c1-a">A</a></li></ul></div></li></ol></div></figure>'
           '<ol><li data-cluster="1">One</li></ol>'
           '<section id="cluster-1"><div id="c1-a"></div></section><a href="#elsewhere">not in the map</a>')

    def test_named_counted_names_hidden_drawing_closed_panels_and_targets_pass(self):
        self.assertEqual(clusters_map_failures(self.MAP), [])

    def test_each_fault_fails_once(self):
        for change in (('class="clusters-map__ring" aria-hidden="true">', 'class="clusters-map__ring">'),
                       ('aria-hidden="true"></svg>', 'aria-hidden="true"><a href="/clusters/cluster-1/"></a></svg>'),
                       ('id="c1-a"', 'id="c1-b"'), (" inert>", ">"),
                       ('clusters-map__tag" href="/clusters/cluster-1/"', 'clusters-map__tag" href=""'),
                       ('class="clusters-map__tag"', 'class="other"'), ('<span>One</span></span>', '</span>'),
                       ('class="clusters-map__tag" href', 'class="clusters-map__tag" aria-hidden="true" href'),
                       ('<li data-cluster="1">One</li>', '<li data-cluster="1">One</li><li data-cluster="2">Two</li>')):
            with self.subTest(change):
                self.assertEqual(len(clusters_map_failures(self.MAP.replace(*change))), 1)

    def test_page_without_the_drawing_fails(self):
        self.assertTrue(clusters_map_failures("<p>No map</p>"))


if __name__ == "__main__":
    unittest.main()
