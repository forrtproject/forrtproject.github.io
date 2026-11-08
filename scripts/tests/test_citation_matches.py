"""Exercise the browser's pure matching module with Node, without building Hugo."""
from pathlib import Path
import shutil
import subprocess
import unittest


@unittest.skipUnless(shutil.which("node"), "Node is needed for the pure JavaScript matcher")
class CitationMatches(unittest.TestCase):
    def test_conservative_author_year_matching(self):
        result = subprocess.run(["node", "--input-type=module", "-"], cwd=Path(__file__).resolve().parents[2],
                                text=True, capture_output=True, input=r"""
import assert from 'node:assert/strict';
import { citationMatches } from './assets/js/doors/citation-matches.js';
const refs = [
  {key: 'duval', first: 'Duval', year: '2000'},
  {key: 'nosek', first: 'Nosek', year: '2018'},
  {key: 'cessda', first: 'CESSDA', year: 'n.d.'},
];
const keys = (text, listed = refs) => citationMatches(text, listed).map((m) => m.key);
assert.deepEqual(keys('(Duval & Tweedie, 2000; Nosek et al., 2018)'), ['duval', 'nosek']);
assert.deepEqual(keys('Duval and Tweedie (2000); Nosek et al. (2018)'), ['duval', 'nosek']);
assert.deepEqual(keys('(Duval, Tweedie, and Smith, 2000)'), ['duval']);
assert.deepEqual(keys('(CESSDA, n.d.)'), ['cessda']);
assert.deepEqual(keys('(Unknown, 2000; Duval, 2001; Nosek, 2018a)'), []);
assert.deepEqual(keys('(NotDuval, 2000; Duval, 20000)'), []);
assert.deepEqual(keys('(Duval & Tweedie, 2000)', [...refs, {...refs[0], key: 'other'}]), []);
assert.deepEqual(keys('(Smith & Duval, 2000)'), []);
assert.deepEqual(keys('(Smith, Duval, 2000)'), []);
assert.deepEqual(keys('(van Duval, 2000)'), []);
assert.deepEqual(keys('(van den Berg, 2020)', [{key: 'berg', first: 'Berg', year: '2020'}]), []);
const accents = [{key: 'm', first: 'Munafò', year: '2017'}];
assert.deepEqual(keys('(Munafò et al., 2017)', accents), ['m']);
const text = '(Duval & Tweedie, 2000; Nosek et al., 2018)';
assert.deepEqual(citationMatches(text, refs).map((m) => text.slice(m.start, m.end)),
                 ['Duval & Tweedie, 2000', 'Nosek et al., 2018']);
""")
        self.assertEqual(result.returncode, 0, result.stderr)
