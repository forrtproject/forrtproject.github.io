#!/usr/bin/env python3
"""Record data freshness and overlay the newer version of each staging file.

Producer: python3 scripts/data_artifact.py manifest
Consumer: python3 scripts/data_artifact.py overlay .staging-data-artifact

Checkout/download mtimes and artifact upload dates are not content timestamps.
Files carried unchanged from Git retain their last non-merge commit time;
changed/generated outputs use their modification time in the producer workspace.
Synthetic staging merges must not make all PR files appear freshly generated.

Both checkouts require full Git history. On equal timestamps, committed data
wins. Legacy artifacts without a manifest may add missing files, but cannot
overwrite differing committed files whose relative freshness is unknown.
"""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import time


MANIFEST = "data-artifact-manifest.json"
# Match the upload-artifact paths in data-processing.yml.
DATA_PATHS = (
    "content/contributors/tenzing.md",
    "scripts/forrt_contribs/contributors_cache.csv",
    "content/curated_resources", "content/glossary", "data", "static/data",
    "static/partials", "content/contributor-analysis",
    "content/publications/citation_chart.webp",
)
EXCLUDED = {"data/partners.json", "data/publications.yaml"}


def git(root, *args):
    return subprocess.check_output(["git", "-C", str(root), *args])


def git_state(root):
    """Return tracked blob hashes and content-change times in two batched reads."""
    if git(root, "rev-parse", "--is-shallow-repository").strip() == b"true":
        raise ValueError("Freshness comparison requires checkout fetch-depth: 0")
    blobs = {}
    for entry in git(root, "ls-tree", "-r", "-z", "HEAD", "--", *DATA_PATHS).split(b"\0"):
        if entry:
            meta, name = entry.split(b"\t", 1)
            blobs[name.decode()] = meta.split()[2].decode()
    dates = {}
    stamp = None
    history = git(root, "log", "--no-merges", "--format=TIME:%ct", "--name-only", "-z", "--", *DATA_PATHS)
    for entry in history.split(b"\0"):
        if entry.startswith(b"TIME:"):
            stamp = int(entry[5:])
        elif entry:
            # Git prefixes the first pathname after each commit with a newline.
            name = entry.removeprefix(b"\n").decode()
            dates.setdefault(name, stamp)
    return blobs, dates


def blob_hash(content):
    return hashlib.sha1(b"blob " + str(len(content)).encode() + b"\0" + content).hexdigest()


def data_files(root):
    for name in DATA_PATHS:
        path = root / name
        files = sorted(path.rglob("*")) if path.is_dir() else [path]
        for file in files:
            if file.is_symlink():
                raise ValueError(f"Unexpected symlink in artifact data: {file}")
            if file.is_file() and file.relative_to(root).as_posix() not in EXCLUDED:
                yield file


def make_manifest(root):
    blobs, dates = git_state(root)
    records = {}
    for file in data_files(root):
        name = file.relative_to(root).as_posix()
        content = file.read_bytes()
        unchanged = blobs.get(name) == blob_hash(content)
        updated = dates.get(name) if unchanged else int(file.stat().st_mtime)
        if updated is None:
            raise ValueError(f"No content-change time for tracked file: {name}")
        records[name] = {
            "sha256": hashlib.sha256(content).hexdigest(),
            "updated_at": updated,
            "origin": "git" if unchanged else "generated",
        }
    manifest = {"version": 1, "source_commit": git(root, "rev-parse", "HEAD").decode().strip(),
                "created_at": int(time.time()), "files": records}
    (root / MANIFEST).write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Recorded freshness for {len(records)} artifact files")
    return manifest


def overlay(root, artifact):
    manifest_path = artifact / MANIFEST
    records = None
    if manifest_path.exists():
        manifest = json.loads(manifest_path.read_text())
        if manifest.get("version") != 1:
            raise ValueError("Unsupported data artifact manifest version")
        records = manifest["files"]
    else:
        print("::warning::Legacy artifact has no freshness manifest; retaining committed versions of differing files.")
    blobs, dates = git_state(root)
    plan = []
    for source in data_files(artifact):
        name = source.relative_to(artifact).as_posix()
        destination = root / name
        if not destination.resolve().is_relative_to(root.resolve()):
            raise ValueError(f"Destination escapes checkout: {name}")
        content = source.read_bytes()
        record = records.get(name) if records is not None else None
        if records is not None:
            if record is None or record["sha256"] != hashlib.sha256(content).hexdigest():
                raise ValueError(f"Artifact freshness manifest mismatch: {name}")
            if not isinstance(record["updated_at"], int) or record["updated_at"] < 0:
                raise ValueError(f"Invalid freshness timestamp: {name}")
        committed_time = dates.get(name)
        artifact_time = record["updated_at"] if record else None
        if not destination.exists():
            if committed_time is not None and (artifact_time is None or artifact_time <= committed_time):
                decision = "committed-deletion-newer-or-unknown"
            else:
                decision = "artifact-only"
        elif destination.read_bytes() == content:
            decision = "identical"
        elif artifact_time is None:
            decision = "committed-unknown-artifact-age"
        elif name not in blobs or blob_hash(destination.read_bytes()) != blobs[name]:
            raise ValueError(f"Refusing to overwrite locally modified data: {name}")
        elif committed_time is None:
            raise ValueError(f"No committed content-change time for {name}")
        elif artifact_time > committed_time:
            decision = "artifact-newer"
        else:
            decision = "committed-newer-or-equal"
        plan.append((source, destination, decision, committed_time, artifact_time))
    # Validate every file before mutating the checkout.
    counts = Counter()
    for source, destination, decision, committed_time, artifact_time in plan:
        counts[decision] += 1
        if decision.startswith("artifact-"):
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source, destination)
        if decision != "identical":
            print(f"{decision}: {source.relative_to(artifact)} (committed={committed_time}, artifact={artifact_time})")
    print("Freshness selection: " + json.dumps(dict(counts), sort_keys=True))
    return counts


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("manifest", "overlay"))
    parser.add_argument("artifact", nargs="?", type=Path)
    args = parser.parse_args()
    root = Path.cwd()
    if args.command == "manifest":
        make_manifest(root)
    elif args.artifact:
        overlay(root, args.artifact.resolve())
    else:
        parser.error("overlay requires the downloaded artifact directory")


if __name__ == "__main__":
    main()
