#!/usr/bin/env python3
"""Run axe-core on a built site's sample pages, by WCAG level.

Run: python3 scripts/rebrand/check_axe.py <public> --base /rebrand-doors/ --axe <axe.min.js>
Or against the preview: python3 scripts/rebrand/check_axe.py --url https://forrt.org/rebrand-doors/ --axe <axe.min.js>

Needs Playwright, and axe-core's axe.min.js from npm. Fails on Level A and AA findings, apart from
those in KNOWN, which come from other sites' markup. Prints best-practice findings only as counts.
"""

import argparse
import collections
import json
import os
import sys
from urllib.parse import quote

from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from check_design import serve  # noqa: E402

LEVEL_A = {"wcag2a", "wcag21a", "wcag22a"}
LEVEL_AA = {"wcag2aa", "wcag21aa", "wcag22aa"}
EXTRA = {
    "privacy": "/privacy/",
    "syllabus": "/syllabus/",
    "lesson bank": "/neurodiversity-lessonbank/implicit_bias/",
}
# Datawrapper's own chart markup on this page.
KNOWN = {("nowhere lab list", "aria-hidden-focus"), ("nowhere lab list", "nested-interactive"), ("nowhere lab list", "role-img-alt")}
RUN = """async () => {
  const result = await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag21a', 'wcag22a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice']}, iframes: false});
  return result.violations.map((v) => ({id: v.id, impact: v.impact, tags: v.tags, count: v.nodes.length, sample: v.nodes[0].html.slice(0, 140)}));
}"""


def level(tags):
    tags = set(tags)
    return "A" if tags & LEVEL_A else "AA" if tags & LEVEL_AA else "best-practice"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("public", nargs="?")
    parser.add_argument("--url")
    parser.add_argument("--base", default="/")
    parser.add_argument("--axe", required=True, help="path to axe.min.js")
    parser.add_argument("--out", help="write every finding to this JSON file")
    args = parser.parse_args()
    base = args.url.rstrip("/") + "/" if args.url else serve(os.path.abspath(args.public), args.base)
    with open(os.path.join(HERE, "sample_pages.json"), encoding="utf-8") as handle:
        sample = {**json.load(handle), **EXTRA}
    sample.pop("404", None)
    with open(args.axe, encoding="utf-8") as handle:
        axe = handle.read()
    findings, failures, practice = [], [], collections.Counter()
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for width in (390, 1440):
            context = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce")
            for name, path in sample.items():
                page = context.new_page()
                response = page.goto(base + quote(path.lstrip("/"), safe="/%"), wait_until="load", timeout=120000)
                if not response or not response.ok:
                    failures.append(f"{name} at {width}: {path} did not load")
                    page.close()
                    continue
                page.wait_for_timeout(800)
                if base not in page.url:
                    page.close()
                    continue
                page.evaluate(axe)
                for violation in page.evaluate(RUN):
                    grade = level(violation["tags"])
                    findings.append({"page": name, "width": width, "level": grade, **{k: violation[k] for k in ("id", "impact", "count", "sample")}})
                    if grade == "best-practice":
                        practice[violation["id"]] += 1
                    elif (name, violation["id"]) not in KNOWN:
                        failures.append(f"{name} at {width}: Level {grade} {violation['id']} ({violation['count']}): {violation['sample']}")
                page.close()
            context.close()
        browser.close()
    if args.out:
        with open(args.out, "w", encoding="utf-8") as handle:
            json.dump(findings, handle, indent=1, ensure_ascii=False)
    print(f"Pages: {len(sample)}, at 390 and 1440 px")
    print("Best practice, report only:", dict(practice))
    print(json.dumps({"failures": failures}, indent=1, ensure_ascii=False))
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
