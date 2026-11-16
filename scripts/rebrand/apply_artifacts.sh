#!/usr/bin/env bash
# Overlay the production data and announcement artifacts on a checkout, the way
# deploy.yaml does: clear the curated-resource seed first, and replace announcement
# bundles only when a tarball exists, so rows removed from a sheet cannot survive.
#
# Usage: apply_artifacts.sh <checkout> <data-artifact-dir> <announcements-artifact-dir>
set -euo pipefail

checkout=$1
data_dir=$2
announcements_dir=$3

find "$checkout/content/curated_resources" -maxdepth 1 -type f ! -name '_index.md' -delete

if [ -d "$data_dir/content" ] || [ -d "$data_dir/data" ]; then
  cp -R "$data_dir/." "$checkout/"
else
  echo "::warning::No data artifact; building from the committed seed copies."
fi

if [ -f "$announcements_dir/announcements.tar.gz" ]; then
  find "$checkout/content/post" -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} +
  tar xzf "$announcements_dir/announcements.tar.gz" -C "$checkout"
else
  echo "::warning::No announcements artifact; keeping the committed posts."
fi
