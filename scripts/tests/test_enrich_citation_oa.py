"""Tests for scripts/enrich_citation_oa.py (pure parsing/normalisation, no network)."""

from datetime import date
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import enrich_citation_oa as oa  # noqa: E402


class EnrichCitationOATests(unittest.TestCase):
    def test_normalise_and_extract_parenthetical_dois(self):
        text = (
            "Wacker (1998). https://doi.org/10.1002/(SICI)1099-0771(199809)11:3. "
            "(see https://dx.doi.org/10.1177/1745691617751884)."
        )
        self.assertEqual(
            oa.extract_dois(text),
            {
                "10.1002/(sici)1099-0771(199809)11:3",
                "10.1177/1745691617751884",
            },
        )

    def test_clean_host_strips_duplicate_parenthetical_and_uses_domain(self):
        self.assertEqual(oa.clean_host("OSF Preprints (OSF Preprints)", "https://osf.io/wnzab"), "OSF")
        self.assertEqual(oa.clean_host("eScholarship (California Digital Library)", "https://escholarship.org/uc/item/1"), "eScholarship")
        self.assertEqual(oa.clean_host("Max Planck Digital Library (MPG)", "http://hdl.handle.net/123"), "Max Planck Digital Library")
        self.assertEqual(oa.clean_host(None, "https://pmc.ncbi.nlm.nih.gov/articles/PMC123/"), "PubMed Central")

    def test_record_from_openalex_green_hybrid_and_closed(self):
        green = oa.record_from_openalex(
            {
                "doi": "https://doi.org/10.1177/1745691617751884",
                "open_access": {"is_oa": True, "oa_status": "green"},
                "best_oa_location": {
                    "pdf_url": "https://osf.io/wnzab/download",
                    "landing_page_url": "https://osf.io/wnzab",
                    "source": {"display_name": "OSF Preprints (OSF Preprints)"},
                },
            },
            "2026-11-24",
        )
        self.assertEqual(
            green,
            (
                "10.1177/1745691617751884",
                {
                    "status": "green",
                    "checked": "2026-11-24",
                    "url": "https://osf.io/wnzab/download",
                    "pdf": True,
                    "host": "OSF",
                },
            ),
        )

        hybrid_same_url = oa.record_from_openalex(
            {
                "doi": "https://doi.org/10.1027/1864-9335/a000178",
                "open_access": {"is_oa": True, "oa_status": "hybrid"},
                "best_oa_location": {
                    "pdf_url": None,
                    "landing_page_url": "https://doi.org/10.1027/1864-9335/a000178",
                    "source": {"display_name": "Social Psychology"},
                },
            },
            "2026-11-24",
        )
        self.assertEqual(
            hybrid_same_url,
            ("10.1027/1864-9335/a000178", {"status": "hybrid", "checked": "2026-11-24"}),
        )

        closed_preprint = oa.record_from_openalex(
            {
                "doi": "https://doi.org/10.31234/osf.io/szg5d",
                "open_access": {"is_oa": False, "oa_status": "closed"},
                "best_oa_location": None,
            },
            "2026-11-24",
        )
        self.assertEqual(
            closed_preprint,
            ("10.31234/osf.io/szg5d", {"status": "gold", "checked": "2026-11-24"}),
        )

    def test_collect_dois_reads_apa_lookup_and_local_references(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "content" / "glossary").mkdir(parents=True)
            (root / "content" / "glossary" / "apa_lookup.json").write_text(
                json.dumps({"K1": "A. (2020). https://doi.org/10.1000/ABC"}),
                encoding="utf-8",
            )
            (root / "content" / "post").mkdir(parents=True)
            (root / "content" / "post" / "p.md").write_text(
                "Ignored: 10.1000/outside\n"
                '{{< local-references heading="none" >}}\n'
                "- B. (2021). https://doi.org/10.1000/LocalOne\n"
                "{{< /local-references >}}\n",
                encoding="utf-8",
            )
            self.assertEqual(
                oa.collect_dois(root),
                {"10.1000/abc", "10.1000/localone"},
            )

    def test_is_fresh(self):
        cutoff = date(2026, 8, 26)
        self.assertTrue(oa.is_fresh({"checked": "2026-11-24"}, cutoff))
        self.assertFalse(oa.is_fresh({"checked": "2026-01-01"}, cutoff))
        self.assertFalse(oa.is_fresh({}, cutoff))


if __name__ == "__main__":
    unittest.main()
