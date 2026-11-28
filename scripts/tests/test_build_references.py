"""Run with python3 -m unittest discover -s scripts/tests -p test_build_references.py."""
import importlib.util
import unittest
from pathlib import Path

PATH = Path(__file__).resolve().parents[2] / "content" / "glossary" / "_build_references.py"
spec = importlib.util.spec_from_file_location("build_references", PATH)
refs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(refs)


class WorkKey(unittest.TestCase):
    def test_renderings_of_one_work_share_a_key(self):
        older = "Wagge, J. R., Baciu, C., & others. (2019). A demonstration of the Collaborative Replication. <i>Collabra</i>. https://doi.org/10.1525/collabra.177"
        newer = "Wagge, J. R., Baciu, C., et al. (2019). A demonstration of the Collaborative Replication. <i>Collabra</i>. https://doi.org/10.1525/collabra.177"
        moved = "Suber, P. (2015). Open Access Overview. http://legacy.earlham.edu/~peters/fos/overview.htm"
        archived = "Suber, P. (2015). Open Access Overview. https://web.archive.org/web/2026/https://legacy.earlham.edu/"
        self.assertEqual(refs.work_key(older), refs.work_key(newer))
        self.assertEqual(refs.work_key(moved), refs.work_key(archived))

    def test_different_works_stay_apart(self):
        # Two works the central bibliography gives the same DOI.
        rules = "Tennant, J., Bielczyk, N. Z., Cheplygina, V. (2019). Ten simple rules for researchers collaborating on MOOPs. https://doi.org/10.31222/osf.io/et8ak"
        intro = "Tennant, J., Bielczyk, N. Z., Masuzzo, P. (2019). Introducing Massively Open Online Papers (MOOPs). https://doi.org/10.31222/osf.io/et8ak"
        self.assertNotEqual(refs.work_key(rules), refs.work_key(intro))
        self.assertNotEqual(refs.work_key("[https://osf.io/](https://osf.io/)"),
                            refs.work_key("[https://cos.io/](https://cos.io/)"))


if __name__ == "__main__":
    unittest.main()
