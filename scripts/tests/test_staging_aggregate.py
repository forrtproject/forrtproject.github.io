"""Exercise workflow shell steps with local Git/GitHub fixtures (no network)."""
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
import unittest

WORKFLOW = Path(__file__).resolve().parents[2] / '.github/workflows/staging-aggregate.yaml'


def step_script(name):
    text = WORKFLOW.read_text()
    block = text.split('      - name: ' + name + '\n', 1)[1]
    block = block.split('\n      - name:', 1)[0]
    script = block.split('        run: |\n', 1)[1]
    lines = []
    for line in script.splitlines():
        if line and not line.startswith('          '):
            break
        lines.append(line[10:])
    return re.sub(r'\$\{\{.*?\}\}', 'fixture', '\n'.join(lines))


class AggregateTests(unittest.TestCase):
    def run_step(self, name, *, fail_fetch='', count=2, single='', shallow='true', draft='', extra_env=None):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            # Stub only network/Git operations; execute the actual workflow shell.
            (root / 'gh').write_text('''#!/usr/bin/env python3
import json, os, subprocess, sys
args = sys.argv[1:]
with open('calls', 'a') as f: f.write('gh ' + ' '.join(args) + '\\n')
records = json.load(open('prs.json'))
if args[:2] == ['pr', 'view']:
    record = next(p for p in records if str(p['number']) == args[2])
    record['state'] = 'OPEN'
    result = record
elif args[:2] == ['pr', 'list']:
    result = records[:30]
else:
    result = [records[:100], records[100:]] if '--paginate' in args else [records[:100]]
if '--jq' in args:
    subprocess.run(['jq', '-r', args[args.index('--jq')+1]], input=json.dumps(result), text=True, check=True)
else:
    if args[0] == 'api':
        for page in result: print(json.dumps(page))
    else:
        print(json.dumps(result))
''')
            (root / 'git').write_text('''#!/bin/bash
printf 'git %s\\n' "$*" >> calls
if [ "$1" = rev-parse ]; then printf '%s\\n' "$SHALLOW"; exit; fi
if [ "$1" = fetch ]; then
  if [[ "$*" == *refs/pull/$FAIL_FETCH/head:* ]] && [ -n "$FAIL_FETCH" ]; then exit 128; fi
  if [[ "$*" == *--unshallow* ]] && [ "$SHALLOW" = false ]; then exit 128; fi
fi
exit 0
''')
            for command in ('gh', 'git'):
                (root / command).chmod(0o755)
            (root / 'prs.json').write_text(json.dumps([
                {'number': n, 'title': f'PR {n}', 'draft': str(n) == draft, 'isDraft': str(n) == draft}
                for n in range(1, count+1)
            ]))
            output = root / 'outputs'
            env = dict(os.environ, PATH=f'{root}:' + os.environ['PATH'],
                       GITHUB_OUTPUT=str(output), SINGLE_PR=single,
                       FAIL_FETCH=fail_fetch, SHALLOW=shallow)
            env.update(extra_env or {})
            result = subprocess.run(['bash', '-e', '-o', 'pipefail', '-c', step_script(name)],
                                    cwd=root, env=env, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            outputs = dict(line.split('=', 1) for line in output.read_text().splitlines()) if output.exists() else {}
            calls = (root / 'calls').read_text() if (root / 'calls').exists() else ''
            summary = root / 'deployment-summary.md'
            return outputs, summary.read_text() if summary.exists() else calls

    def test_fetch_failure_does_not_skip_later_pr(self):
        outputs, _ = self.run_step('Aggregate PRs', fail_fetch='1')
        self.assertEqual(outputs['attempted_prs'], '1,2')
        self.assertEqual(outputs['included_prs'], '2')
        self.assertEqual(outputs['conflicted_prs'], '')

    def test_all_pages_are_aggregated_without_per_pr_metadata_requests(self):
        outputs, calls = self.run_step('Aggregate PRs', count=101)
        self.assertEqual(len(outputs['included_prs'].split(',')), 101)
        self.assertNotIn('gh pr view', calls)

    def test_single_pr_metadata_is_requested_once(self):
        outputs, calls = self.run_step('Aggregate PRs', single='2')
        self.assertEqual(outputs['included_prs'], '2')
        self.assertEqual(calls.count('gh pr view'), 1)

    def test_drafts_are_excluded(self):
        outputs, _ = self.run_step('Aggregate PRs', draft='1')
        self.assertEqual(outputs['attempted_prs'], '2')

    def test_no_prs_does_not_create_an_aggregate(self):
        outputs, calls = self.run_step('Aggregate PRs', count=0)
        self.assertEqual(outputs['has_prs'], 'false')
        self.assertNotIn('git checkout', calls)

    def test_failed_fetch_is_reported_separately_from_conflicts(self):
        _, summary = self.run_step('Create deployment summary', extra_env={
            'AGGREGATED_BRANCH': 'fixture', 'TOTAL_PRS': '3',
            'ATTEMPTED_PRS': '1,2,3', 'INCLUDED_PRS': '2', 'CONFLICTED_PRS': '3',
        })
        self.assertIn('PR #1 (fetch or merge failed', summary)
        self.assertIn('PR #3 (merge conflicts)', summary)
        self.assertIn('PR #2', summary)
        self.assertNotIn('PR #1 (merge conflicts)', summary)

    def test_complete_history_does_not_use_unshallow(self):
        _, calls = self.run_step('Fetch main history', shallow='false')
        self.assertNotIn('--unshallow', calls)

    def test_shallow_history_is_unshallowed(self):
        _, calls = self.run_step('Fetch main history')
        self.assertIn('--unshallow', calls)


if __name__ == '__main__':
    unittest.main()
