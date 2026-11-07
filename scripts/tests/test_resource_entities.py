"""Run with python3 -m unittest discover -s scripts/tests -p test_resource_entities.py."""
import importlib.util
from pathlib import Path
import unittest

import pandas as pd

# Loaded by path: the name "resource" belongs to a standard-library module.
_path = Path(__file__).resolve().parents[2] / "content" / "resources" / "resource.py"
_spec = importlib.util.spec_from_file_location("curated_resource", _path)
curated = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(curated)


class DecodeEntitiesTests(unittest.TestCase):
    def decode(self, **columns):
        df = pd.DataFrame({key: [value] for key, value in columns.items()})
        curated.decode_entities(df)
        return df.iloc[0].to_dict()

    def test_named_and_numeric_entities_are_decoded(self):
        row = self.decode(
            title="Youngsuk &ldquo;Y.S.&rdquo; Chi",
            abstract="Open&nbsp;science &amp; health &#8211; a review &#x2014; part 1",
            creators="Fran&ccedil;ois Dupont",
        )
        self.assertEqual(row["title"], "Youngsuk “Y.S.” Chi")
        self.assertEqual(row["abstract"], "Open science & health – a review — part 1")
        self.assertEqual(row["creators"], "François Dupont")

    def test_bare_ampersands_are_left_alone(self):
        # html.unescape alone would turn "&not" and "&copy" into symbols.
        text = "R&D, AT&T and P&notes &copy 2020 & more"
        self.assertEqual(self.decode(title=text)["title"], text)

    def test_other_columns_are_untouched(self):
        url = "https://example.org/?a=1&amp;b=2"
        self.assertEqual(self.decode(title="x", link_to_resource=url)["link_to_resource"], url)


if __name__ == "__main__":
    unittest.main()
