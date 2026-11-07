#!/usr/bin/env python3
"""Rehearse the Doors launch locally: merge the branch into main and build it as deploy.yaml does.

Run from the repository root (needs gh, git and network access; Playwright is optional):

    python3 scripts/rebrand/rehearse_launch.py --work /tmp/doors-rehearsal [--doors-ref origin/rebrand-doors]

Nothing is pushed and no workflow is dispatched. The script

1. merges the Doors branch into a throwaway branch from main with `git merge --no-ff`, in its own
   worktree, and stops on a conflict;
2. downloads the newest unexpired `data-artifact` (data-processing.yml) and
   `announcements-artifact` (create_announcements.yml) from successful runs on main, and Hugo
   0.158.0 extended;
3. applies them to that merge and to plain main as deploy.yaml does (clear the curated-resource
   seed, unpack the data artifact over the checkout, replace the post bundles if a tarball exists),
   and builds both with `HUGO_ENV=production hugo --gc --minify --cleanDestinationDir`;
4. runs deploy.yaml's checks on both builds, in its order and with its arguments, then
   compare_builds.py against main and against baseline/paths.txt;
5. checks what only production shows: noindex, canonical and og:url hosts, sitemap size,
   robots.txt and any `/rebrand-doors` left in the output;
6. sorts the data artifact's files by how they differ from the Doors checkout and, if any would
   revert or resurrect a Doors file, builds the merge again without them and lists the output that
   changes;
7. serves the build on localhost and loads sample pages in Chromium, listing every request to
   another host before any choice is made on a banner.

Results go to <work>/logs and <work>/summary.json. The worktrees, branch, artifacts, builds and
Hugo are deleted at the end unless --keep is given. Exit status 1 means a hard check failed.
"""

import argparse
import filecmp
import functools
import hashlib
import http.server
import json
import os
import platform
import re
import shutil
import subprocess
import sys
import tarfile
import threading
from pathlib import Path
from urllib.parse import urlsplit

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from site_inventory import _REDIRECT, seo_head  # noqa: E402

REPO = HERE.parents[1]
HUGO_VERSION = "0.158.0"
SITE = "https://forrt.org/"
BRANCH = "scratch-launch-rehearsal"
# deploy.yaml lets Git report non-ASCII paths unquoted with `git config core.quotepath false`. The
# worktrees share the main checkout's config, so set it for these processes only.
GIT_ENV = {"GIT_CONFIG_COUNT": "1", "GIT_CONFIG_KEY_0": "core.quotepath", "GIT_CONFIG_VALUE_0": "false"}
TEXT_SUFFIXES = (".html", ".xml", ".json", ".js", ".css", ".txt", ".webmanifest", ".svg")
GOOGLE_FONTS = re.compile(r"fonts\.(googleapis|gstatic)\.com")
# The Academic theme's stylesheet (css/academic.css, or academic.min.<hash>.css in production) and
# Domine, the font data/fonts/forrt.toml selects. Academicons, the scholarly icon font, stays.
OLD_THEME = re.compile(r"/css/academic(\.min)?(\.[0-9a-f]{16,})?\.css|\bDomine\b")
STYLESHEET = re.compile(r"<link[^>]+rel=[\"']?stylesheet[^>]*?href=[\"']?([^\"' >]+)")


def run(cmd, cwd=REPO, env=None, log=None, check=True):
    """Run a command, optionally teeing its output to a log file. Returns the CompletedProcess."""
    full_env = {**os.environ, **GIT_ENV, **(env or {})}
    result = subprocess.run(cmd, cwd=cwd, env=full_env, text=True, capture_output=True)
    if log:
        Path(log).write_text(f"$ {' '.join(map(str, cmd))}\n{result.stdout}{result.stderr}", encoding="utf-8")
    if check and result.returncode:
        sys.exit(f"Failed ({result.returncode}): {' '.join(map(str, cmd))}\n{result.stdout[-2000:]}{result.stderr[-2000:]}")
    return result


def git(*args, cwd=REPO, check=True):
    return run(["git", *args], cwd=cwd, check=check).stdout.strip()


# ---------------------------------------------------------------- Hugo and artifacts


def get_hugo(work):
    """Download Hugo extended at the version deploy.yaml pins, and confirm the version."""
    target = work / "hugo"
    binary = target / "hugo"
    if not binary.exists():
        target.mkdir(parents=True, exist_ok=True)
        system = platform.system().lower()
        if system == "darwin":
            pattern = f"hugo_extended_{HUGO_VERSION}_darwin-universal.pkg"
        else:
            arch = "arm64" if platform.machine() in ("arm64", "aarch64") else "amd64"
            pattern = f"hugo_extended_{HUGO_VERSION}_linux-{arch}.tar.gz"
        run(["gh", "release", "download", f"v{HUGO_VERSION}", "-R", "gohugoio/hugo", "-p", pattern, "-D", target])
        package = target / pattern
        if pattern.endswith(".pkg"):
            run(["pkgutil", "--expand-full", package, target / "pkg"])
            shutil.copy2(target / "pkg" / "Payload" / "hugo", binary)
        else:
            with tarfile.open(package) as archive:
                archive.extract("hugo", target, filter="data")
    version = run([binary, "version"]).stdout
    if f"v{HUGO_VERSION}-" not in version or "+extended" not in version:
        sys.exit(f"Wrong Hugo: {version}")
    return binary, version.strip()


def newest_artifact(name, branch):
    """The newest unexpired artifact of this name from a successful run on `branch`."""
    listing = json.loads(run(["gh", "api", f"repos/{{owner}}/{{repo}}/actions/artifacts?name={name}&per_page=30"]).stdout)
    for artifact in listing["artifacts"]:
        if artifact["expired"] or artifact["workflow_run"]["head_branch"] != branch:
            continue
        run_id = artifact["workflow_run"]["id"]
        conclusion = run(["gh", "api", f"repos/{{owner}}/{{repo}}/actions/runs/{run_id}", "--jq", ".conclusion"]).stdout.strip()
        if conclusion == "success":
            return run_id, artifact["created_at"]
    sys.exit(f"No unexpired {name} from a successful run on {branch}")


def download(name, run_id, dest):
    if not dest.exists() or not any(dest.iterdir()):
        dest.mkdir(parents=True, exist_ok=True)
        run(["gh", "run", "download", str(run_id), "-n", name, "-D", dest])
    return dest


# ---------------------------------------------------------------- checkouts and builds


def make_checkouts(work, main_ref, doors_ref):
    main_dir, launch_dir = work / "main", work / "launch"
    for path in (main_dir, launch_dir):
        if path.exists():
            git("worktree", "remove", "--force", str(path))
    git("worktree", "prune")
    if git("branch", "--list", BRANCH):
        git("branch", "-D", BRANCH)
    git("worktree", "add", "--detach", str(main_dir), main_ref)
    git("worktree", "add", "-b", BRANCH, str(launch_dir), main_ref)
    merged = run(["git", "merge", "--no-ff", "--no-edit", doors_ref], cwd=launch_dir, check=False)
    if merged.returncode:
        conflicts = git("diff", "--name-only", "--diff-filter=U", cwd=launch_dir, check=False)
        git("merge", "--abort", cwd=launch_dir, check=False)
        sys.exit(f"The launch merge conflicts:\n{conflicts}\n{merged.stdout[-1500:]}")
    same_tree = git("rev-parse", "HEAD^{tree}", cwd=launch_dir) == git("rev-parse", f"{doors_ref}^{{tree}}")
    return main_dir, launch_dir, same_tree


def apply_artifacts(checkout, data_dir, announcements_dir):
    """deploy.yaml's steps, in its order: clear the seed, unpack the data artifact over the checkout
    (adds and overwrites, never deletes), then replace the post bundles if a tarball exists."""
    for path in (checkout / "content/curated_resources").iterdir():
        if path.is_file() and path.name != "_index.md":
            path.unlink()
    shutil.copytree(data_dir, checkout, dirs_exist_ok=True)
    tarball = announcements_dir / "announcements.tar.gz"
    if tarball.exists():
        for path in (checkout / "content/post").iterdir():
            if path.is_dir():
                shutil.rmtree(path)
        run(["tar", "xzf", tarball], cwd=checkout)
    else:
        print("::warning:: No announcements tarball; keeping the committed posts.")


def build(checkout, hugo, logs, label):
    result = run([hugo, "--gc", "--minify", "--cleanDestinationDir", "--destination", "public"],
                 cwd=checkout, env={"HUGO_ENV": "production"}, log=logs / f"build-{label}.log", check=False)
    if result.returncode:
        sys.exit(f"Hugo failed for {label}; see {logs / f'build-{label}.log'}")
    return checkout / "public"


def deploy_checks(checkout, logs, label):
    """deploy.yaml's checks, in its order, run from the checkout's own copies of the scripts."""
    checks = [
        ("check_sitemap_lastmod.py --compare-source --sample 200 (warns only)",
         ["python3", "scripts/check_sitemap_lastmod.py", "public/sitemap.xml", "--compare-source", "--sample", "200"], False),
        ("check_seo_html.py", ["python3", "scripts/check_seo_html.py", "public"], True),
    ]
    results = []
    for name, cmd, blocking in checks:
        log = logs / f"{label}-{Path(cmd[1]).stem}.log"
        code = run(cmd, cwd=checkout, log=log, check=False).returncode
        results.append({"check": name, "exit": code, "blocking": blocking, "log": str(log)})
    return results


# ---------------------------------------------------------------- production-only checks


def html_files(public):
    return sorted(p for p in public.rglob("*.html"))


def head_facts(public):
    """Per page: robots, canonical, og:url, stylesheets, and whether it is an alias redirect stub."""
    facts = {}
    for path in html_files(public):
        text = path.read_text(encoding="utf-8", errors="replace")
        head = text.split("</head>", 1)[0]
        tags = seo_head(text)
        value = lambda prefix: next((t.split("=", 1)[1] for t in tags if t.startswith(prefix)), None)  # noqa: E731
        facts[str(path.relative_to(public))] = {
            "robots": value("robots=") or "",
            "canonical": value("canonical:="),
            "og_url": value("og:url="),
            "stub": bool(_REDIRECT.search(head)),
            "sheets": STYLESHEET.findall(head),
        }
    return facts


def stylesheet_text(public, facts):
    """The text of every local stylesheet some page links to."""
    sheets = {href for f in facts.values() for href in f["sheets"] if href.startswith("/") and not href.startswith("//")}
    return {href: (public / href.lstrip("/")).read_text(encoding="utf-8", errors="replace")
            for href in sorted(sheets) if (public / href.lstrip("/")).is_file()}


def sitemap_urls(public):
    """All <loc> entries, following a sitemap index into its child sitemaps."""
    text = (public / "sitemap.xml").read_text(encoding="utf-8")
    locs = re.findall(r"<loc>([^<]+)</loc>", text)
    if "<sitemapindex" not in text:
        return locs
    urls = []
    for loc in locs:
        child = public / urlsplit(loc).path.lstrip("/")
        urls.extend(re.findall(r"<loc>([^<]+)</loc>", child.read_text(encoding="utf-8")))
    return urls


def grep_outputs(public, pattern):
    hits = []
    for path in public.rglob("*"):
        if path.is_file() and path.suffix in TEXT_SUFFIXES:
            if pattern.search(path.read_text(encoding="utf-8", errors="replace")):
                hits.append(str(path.relative_to(public)))
    return sorted(hits)


def production_checks(main_public, launch_public):
    main_facts, launch_facts = head_facts(main_public), head_facts(launch_public)
    noindexed = lambda facts: {p for p, f in facts.items() if "noindex" in f["robots"] and not f["stub"]}  # noqa: E731
    main_noindex, launch_noindex = noindexed(main_facts), noindexed(launch_facts)
    off_site = lambda facts, key: {  # noqa: E731
        p for p, f in facts.items() if f[key] and (not f[key].startswith(SITE) or "/rebrand-doors" in f[key])}
    canonical_off = off_site(launch_facts, "canonical")
    canonical_off_main = off_site(main_facts, "canonical")
    # Pages main styled with the theme must now load a Doors stylesheet.
    themed = {p for p, f in main_facts.items() if any(OLD_THEME.search(h) for h in f["sheets"])}
    undoored = sorted(p for p in themed & launch_facts.keys()
                      if not any("/css/doors" in h for h in launch_facts[p]["sheets"]))
    sheets = stylesheet_text(launch_public, launch_facts)
    old_refs = sorted({p for p, f in launch_facts.items() if any(OLD_THEME.search(h) for h in f["sheets"])}
                      | {h for h, text in sheets.items() if OLD_THEME.search(text) or GOOGLE_FONTS.search(text)})
    missing = lambda facts: {p for p, f in facts.items() if not f["canonical"] and not f["stub"]}  # noqa: E731
    main_urls, launch_urls = sitemap_urls(main_public), sitemap_urls(launch_public)
    robots = [(p / "robots.txt").read_text(encoding="utf-8") if (p / "robots.txt").exists() else None
              for p in (main_public, launch_public)]
    result = {
        "noindex_pages": {"main": len(main_noindex), "launch": len(launch_noindex),
                          "launch_only": sorted(launch_noindex - main_noindex),
                          "main_only": sorted(main_noindex - launch_noindex)},
        "redirect_stubs": {"main": sum(f["stub"] for f in main_facts.values()),
                           "launch": sum(f["stub"] for f in launch_facts.values())},
        "canonical_off_site": {"launch_only": sorted(canonical_off - canonical_off_main),
                               "same_on_main": sorted(canonical_off & canonical_off_main)},
        "og_url_off_site": sorted(off_site(launch_facts, "og_url")),
        "themed_pages_without_doors_css": {"main_themed": len(themed), "missing": undoored},
        "old_theme_or_google_fonts_referenced": old_refs,
        "missing_canonical": {"main": len(missing(main_facts)), "launch": len(missing(launch_facts)),
                              "launch_only": sorted(missing(launch_facts) - missing(main_facts))},
        "sitemap_urls": {"main": len(main_urls), "launch": len(launch_urls),
                         "off_site": sorted(u for u in launch_urls if not u.startswith(SITE) or "/rebrand-doors" in u),
                         "only_main": sorted(set(main_urls) - set(launch_urls)),
                         "only_launch": sorted(set(launch_urls) - set(main_urls))},
        "robots_txt_same": robots[0] == robots[1],
        "rebrand_doors_in_output": grep_outputs(launch_public, re.compile(r"/rebrand-doors")),
        "google_fonts_in_output": grep_outputs(launch_public, GOOGLE_FONTS),
        # Files that mention the old theme, linked or not: a leftover asset shows here and not above.
        "old_theme_files_in_output": grep_outputs(launch_public, OLD_THEME),
    }
    hard = (result["noindex_pages"]["launch_only"] or result["canonical_off_site"]["launch_only"]
            or result["og_url_off_site"] or undoored or old_refs
            or result["sitemap_urls"]["off_site"] or result["rebrand_doors_in_output"]
            or result["google_fonts_in_output"]
            or abs(len(launch_urls) - len(main_urls)) > 0.02 * max(len(main_urls), 1))
    return result, bool(hard)


# ---------------------------------------------------------------- the data artifact against Doors


def blob(ref, path):
    """The file's bytes at a ref."""
    return subprocess.run(["git", "show", f"{ref}:{path}"], cwd=REPO, capture_output=True, check=True).stdout


def blob_ids(ref):
    """{path: Git blob id} for every file at a ref, with paths unquoted."""
    listing = subprocess.run(["git", "ls-tree", "-r", "-z", ref], cwd=REPO, capture_output=True, check=True).stdout
    ids = {}
    for entry in listing.decode("utf-8", errors="surrogateescape").split("\0"):
        if entry:
            meta, path = entry.split("\t", 1)
            ids[path] = meta.split()[2]
    return ids


def classify_artifact(data_dir, main_ref, doors_ref):
    """Sort each artifact file by how it relates to the Doors and main checkouts.

    unchanged: same as Doors. fresh: differs from Doors, Doors matches main (new data, as on main).
    reverted: Doors changed it and the artifact restores main's copy. overridden: Doors changed it
    and the artifact replaces it with something else. resurrected: Doors deleted it, main has it.
    new: in neither checkout (generated only).
    """
    doors_blobs, main_blobs = blob_ids(doors_ref), blob_ids(main_ref)
    groups = {key: [] for key in ("unchanged", "fresh", "reverted", "overridden", "resurrected", "new")}
    for path in sorted(p for p in data_dir.rglob("*") if p.is_file()):
        rel = str(path.relative_to(data_dir))
        content = path.read_bytes()
        data = hashlib.sha1(b"blob %d\0" % len(content) + content).hexdigest()
        doors, main = doors_blobs.get(rel), main_blobs.get(rel)
        if doors == data:
            groups["unchanged"].append(rel)
        elif doors is None:
            groups["resurrected" if main is not None else "new"].append(rel)
        elif doors == main:
            groups["fresh"].append(rel)
        else:
            groups["reverted" if data == main else "overridden"].append(rel)
    return groups


def diff_trees(a, b):
    """Relative paths that differ between two directories, or exist in only one."""
    changed = []

    def walk(cmp, prefix=""):
        changed.extend(prefix + name for name in cmp.left_only + cmp.right_only + cmp.diff_files + cmp.funny_files)
        for name, sub in cmp.subdirs.items():
            walk(sub, f"{prefix}{name}/")

    walk(filecmp.dircmp(a, b, ignore=[]))
    return sorted(changed)


def artifact_ab(launch_dir, groups, doors_ref, hugo, logs):
    """Rebuild the launch with reverted and resurrected files set back to Doors, and list the output
    that changes. An empty list means the stale files do not reach the site."""
    suspects = groups["reverted"] + groups["overridden"] + groups["resurrected"]
    if not suspects:
        return []
    first = launch_dir / "public"
    kept = launch_dir.parent / "public-launch-with-artifact"
    if kept.exists():
        shutil.rmtree(kept)
    shutil.copytree(first, kept, symlinks=True)
    for rel in groups["resurrected"]:
        (launch_dir / rel).unlink()
    for rel in groups["reverted"] + groups["overridden"]:
        (launch_dir / rel).write_bytes(blob(doors_ref, rel))
    second = build(launch_dir, hugo, logs, "launch-without-stale-files")
    return diff_trees(kept, second)


# ---------------------------------------------------------------- localhost-only requests


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def third_party_requests(public, sample_count=10):
    """Load sample pages from a local server; return {page: [requests to other hosts]}."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return {"skipped": "playwright is not installed"}
    samples = list(json.loads((HERE / "sample_pages.json").read_text(encoding="utf-8")).values())[:sample_count]
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(QuietHandler, directory=str(public)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    origin = f"http://127.0.0.1:{server.server_address[1]}"
    found = {}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for sample in samples:
            # A fresh context per page: no stored consent, no cache, and every frame and worker counted.
            context = browser.new_context(viewport={"width": 1440, "height": 900})
            seen = []
            context.on("request", lambda request: seen.append(request.url))
            page = context.new_page()
            try:
                page.goto(origin + sample, wait_until="networkidle", timeout=60000)
            except Exception as error:  # a page that never settles still shows what it asked for
                seen.append(f"(load error: {str(error)[:80]})")
            page.wait_for_timeout(3000)
            found[sample] = sorted({url for url in seen if urlsplit(url).hostname not in ("127.0.0.1", "localhost")})
            context.close()
        browser.close()
    server.shutdown()
    return found


# ---------------------------------------------------------------- main


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--work", required=True, type=Path, help="scratch directory outside the repository")
    parser.add_argument("--doors-ref", default="origin/rebrand-doors")
    parser.add_argument("--main-ref", default="origin/main")
    parser.add_argument("--data-run", help="data-processing.yml run id (default: newest on main)")
    parser.add_argument("--announcements-run", help="create_announcements.yml run id (default: newest on main)")
    parser.add_argument("--skip-browser", action="store_true", help="leave out the localhost request check")
    parser.add_argument("--keep", action="store_true", help="keep worktrees, builds, artifacts and Hugo")
    args = parser.parse_args()

    work = args.work.resolve()
    if work == REPO or REPO in work.parents:
        sys.exit("--work must be outside the repository")
    logs = work / "logs"
    logs.mkdir(parents=True, exist_ok=True)
    git("fetch", "origin", "--quiet")
    summary = {"main_ref": git("rev-parse", args.main_ref), "doors_ref": git("rev-parse", args.doors_ref)}
    failed = []

    hugo, summary["hugo"] = get_hugo(work)
    data_run, data_date = (args.data_run, None) if args.data_run else newest_artifact("data-artifact", "main")
    ann_run, ann_date = (args.announcements_run, None) if args.announcements_run else newest_artifact("announcements-artifact", "main")
    summary["artifacts"] = {"data": {"run": data_run, "created": data_date},
                            "announcements": {"run": ann_run, "created": ann_date}}
    data_dir = download("data-artifact", data_run, work / "artifacts" / "data")
    ann_dir = download("announcements-artifact", ann_run, work / "artifacts" / "announcements")

    print("Merging and building ...", flush=True)
    main_dir, launch_dir, same_tree = make_checkouts(work, args.main_ref, args.doors_ref)
    summary["merge"] = {"head": git("rev-parse", "HEAD", cwd=launch_dir), "tree_equals_doors": same_tree}
    groups = classify_artifact(data_dir, args.main_ref, args.doors_ref)
    summary["artifact_files"] = {key: (len(value) if key in ("unchanged", "fresh", "new") else value)
                                 for key, value in groups.items()}
    publics = {}
    for label, checkout in (("main", main_dir), ("launch", launch_dir)):
        apply_artifacts(checkout, data_dir, ann_dir)
        publics[label] = build(checkout, hugo, logs, label)

    print("Running deploy.yaml's checks ...", flush=True)
    summary["deploy_checks"] = {label: deploy_checks(checkout, logs, label)
                                for label, checkout in (("main", main_dir), ("launch", launch_dir))}
    failed += [f"launch: {c['check']}" for c in summary["deploy_checks"]["launch"] if c["exit"] and c["blocking"]]

    compare = launch_dir / "scripts/rebrand/compare_builds.py"
    for label, reference, extra in (("compare-main", publics["main"], []),
                                    ("compare-baseline", launch_dir / "scripts/rebrand/baseline/paths.txt", ["--paths-only"])):
        result = run(["python3", compare, *extra, reference, publics["launch"]], log=logs / f"{label}.log", check=False)
        summary[label] = {"exit": result.returncode, "log": str(logs / f"{label}.log")}
    failed += ["compare_builds against main"] if summary["compare-main"]["exit"] else []

    print("Checking production-only output ...", flush=True)
    summary["production"], hard = production_checks(publics["main"], publics["launch"])
    failed += ["production output (noindex, canonical, sitemap, stray paths or old theme)"] if hard else []

    if not args.skip_browser:
        print("Loading sample pages on localhost ...", flush=True)
        summary["third_party_before_consent"] = third_party_requests(publics["launch"])

    print("Rebuilding without stale artifact files ...", flush=True)
    summary["stale_artifact_output_changes"] = artifact_ab(launch_dir, groups, args.doors_ref, hugo, logs)
    failed += ["stale artifact files change the output"] if summary["stale_artifact_output_changes"] else []

    summary["failed"] = failed
    (work / "summary.json").write_text(json.dumps(summary, indent=1, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({k: v for k, v in summary.items() if k != "production"}, indent=1, ensure_ascii=False)[:6000])
    print(f"\nFull results: {work / 'summary.json'}; logs in {logs}")

    if not args.keep:
        for path in (main_dir, launch_dir):
            git("worktree", "remove", "--force", str(path), check=False)
        git("branch", "-D", BRANCH, check=False)
        for name in ("artifacts", "hugo", "public-launch-with-artifact"):
            shutil.rmtree(work / name, ignore_errors=True)
    print("FAILED: " + "; ".join(failed) if failed else "OK: nothing would fail or regress at launch.")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
