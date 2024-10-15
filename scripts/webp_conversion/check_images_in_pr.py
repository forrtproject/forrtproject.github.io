#!/usr/bin/env python3

import os
import re
import sys
from github import Github

# Get GitHub token from environment variable
token = os.environ.get('GITHUB_TOKEN')
if not token:
    print("Error: GITHUB_TOKEN is not set.")
    sys.exit(1)

# Initialize GitHub API client
g = Github(token)
repo_name = os.environ['GITHUB_REPOSITORY']
repo = g.get_repo(repo_name)

# Get the PR number from the GitHub event
pr_number = int(os.environ['GITHUB_REF'].split('/')[-2])
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
reference_pattern = re.compile(r'(?<!http[s]?://)([^\s"\'<>]+\.(png|jpg|jpeg))', re.IGNORECASE)

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
        file_content = file.decoded_content.decode('utf-8', errors='ignore')
        matches = reference_pattern.findall(file_content)
        for match in matches:
            image_ref = match
            if image_ref not in ignore_list:
                references_found.append(f"{filename}: {image_ref}")

# Prepare the comment if any images or references are found
if images_found or references_found:
    comment_body = "### :warning: Image Files/References Detected\n\n"
    if images_found:
        comment_body += "**Image Files not in ignore list:**\n"
        for img in images_found:
            comment_body += f"- {img}\n"
    if references_found:
        comment_body += "\n**Image References not in ignore list:**\n"
        for ref in references_found:
            comment_body += f"- {ref}\n"
    comment_body += "\nPlease consider converting these images to WebP format and updating references accordingly."

    # Post the comment on the PR
    pr.create_issue_comment(comment_body)
else:
    print("No image files or references needing attention were found.")
