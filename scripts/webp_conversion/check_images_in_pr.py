#!/usr/bin/env python3

import os
import re
import sys
from github import Github
from github.GithubException import GithubException

# Get GitHub token from environment variable
token = os.environ.get('GITHUB_TOKEN')
if not token:
    print("Error: GITHUB_TOKEN is not set.", file=sys.stderr)
    sys.exit(1)

# Initialize GitHub API client
g = Github(token)
repo_name = os.environ['GITHUB_REPOSITORY']
repo = g.get_repo(repo_name)

# Get the PR number from the GitHub event
pr_ref = os.environ.get('GITHUB_REF')
if not pr_ref:
    print("Error: GITHUB_REF is not set.", file=sys.stderr)
    sys.exit(1)

try:
    pr_number = int(pr_ref.split('/')[-2])
except (IndexError, ValueError):
    print("Error: Could not parse PR number from GITHUB_REF.", file=sys.stderr)
    sys.exit(1)

pr = repo.get_pull(pr_number)

# Load ignore list
IGNORE_LIST_FILE = 'scripts/webp_conversion/image_ignore_list.txt'
ignore_list = set()
if os.path.exists(IGNORE_LIST_FILE):
    with open(IGNORE_LIST_FILE, 'r', encoding='utf-8') as f:
        ignore_list = set(line.strip() for line in f if line.strip() and not line.startswith('#'))

# Patterns to detect image files and references
IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg')
TEXT_EXTENSIONS = ('.md', '.html', '.txt', '.toml', '.yaml')
reference_pattern = re.compile(r'([^\s"\'<>]+\.(png|jpg|jpeg))', re.IGNORECASE)

# Function to check if a reference contains a URL
def is_url(image_ref):
    return 'http://' in image_ref or 'https://' in image_ref 

# Collect files changed in the PR
changed_files = pr.get_files()
images_found = []
references_found = []

for file in changed_files:
    filename = file.filename
    status = file.status
    # Check for added or modified image files
    if filename.lower().endswith(IMAGE_EXTENSIONS) and status in ('added', 'modified'):
        if filename not in ignore_list:
            images_found.append(filename)
    # Check for references in text files
    elif filename.lower().endswith(TEXT_EXTENSIONS) and status in ('added', 'modified'):
        try:
            contents = repo.get_contents(filename, ref=pr.head.sha)
            if contents.encoding == "base64":
                file_content = contents.decoded_content.decode('utf-8', errors='ignore')
            else:
                print(f"Warning: Unsupported encoding '{contents.encoding}' for {filename}. Skipping.", file=sys.stderr)
                continue
        except GithubException as e:
            print(f"Warning: Could not fetch content for {filename}. Skipping. Error: {e}", file=sys.stderr)
            continue

        matches = reference_pattern.findall(file_content)
        for match in matches:
            image_ref = match[0]  # match is a tuple; the first element is the full match
            if image_ref not in ignore_list and not is_url(image_ref):
                references_found.append(f"{filename}: {image_ref}")

# Prepare the comment if any images or references are found
if images_found or references_found:
    comment_body = "### :warning: Image files/references in png/jpg format detected\n\nNote that we generally rely on webp format for this webpage, so please consider converting these images to WebP format and updating references accordingly.\n\n"
    if images_found:
        comment_body += "**Image files:**\n"
        for img in images_found:
            comment_body += f"- {img}\n"
    if references_found:
        comment_body += "\n**References to image files:**\n"
        for ref in references_found:
            comment_body += f"- {ref}\n"


    # Write to GITHUB_OUTPUT
    github_output = os.getenv('GITHUB_OUTPUT')
    if github_output:
        with open(github_output, 'a') as f:
            f.write(f"comment<<EOF\n{comment_body}\nEOF\n")
else:
    # No comment needed; write empty comment
    github_output = os.getenv('GITHUB_OUTPUT')
    if github_output:
        with open(github_output, 'a') as f:
            f.write("comment<<EOF\n:thumbsup: All image files/references (if any) are in webp format, in line with our policy.\nEOF\n")
