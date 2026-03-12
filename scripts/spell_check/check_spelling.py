#!/usr/bin/env python3
"""
Spell-check script for FORRT repository using codespell.
Checks for typos in pull requests and generates a formatted comment.

Modes:
- PR mode: Only checks files changed in the pull request (CHANGED_FILES env var)
- Full mode: Checks all content directories (CHECK_ALL=true env var)
"""

import os
import sys
import subprocess
import json
from pathlib import Path

# Default directories to check in full mode
DEFAULT_PATHS = ['content', 'scripts', '.github', 'CONTRIBUTING.md', 'README.md']

# File extensions to check
ALLOWED_EXTENSIONS = {'.md', '.txt', '.html', '.yaml', '.yml', '.py', '.js', '.json', '.toml'}


def get_files_to_check():
    """Determine which files to check based on environment variables."""
    check_all = os.environ.get('CHECK_ALL', 'false').lower() == 'true'
    changed_files_env = os.environ.get('CHANGED_FILES')

    # If CHECK_ALL is explicitly requested, always run in full mode.
    if check_all:
        print("Running in full mode: checking all content...", file=sys.stderr)
        return DEFAULT_PATHS, True

    # If CHANGED_FILES is not provided at all, fall back to full mode
    # (e.g., local runs or legacy workflows).
    if changed_files_env is None:
        print("Running in full mode: checking all content (no CHANGED_FILES provided)...", file=sys.stderr)
        return DEFAULT_PATHS, True

    # CHANGED_FILES is provided but may be empty (no matching files).
    changed_files = changed_files_env.strip()
    if not changed_files:
        print("No spell-checkable files changed in this PR.", file=sys.stderr)
        return [], False

    # PR mode: only check changed files
    files = [f.strip() for f in changed_files.split('\n') if f.strip()]

    # Filter to only existing files with allowed extensions
    valid_files = []
    for f in files:
        path = Path(f)
        if path.exists() and path.suffix.lower() in ALLOWED_EXTENSIONS:
            valid_files.append(f)

    if not valid_files:
        print("No spell-checkable files changed in this PR.", file=sys.stderr)
        return [], False
    print(f"Running in PR mode: checking {len(valid_files)} changed file(s)...", file=sys.stderr)
    return valid_files, False


def run_codespell(paths):
    """Run codespell and capture output."""
    if not paths:
        return "", 0
    
    try:
        
        # Use repo root - GitHub Actions path or repo root directory
        repo_root = os.environ.get('GITHUB_WORKSPACE')
        if not repo_root:
            # Find repo root by looking for .git directory
            script_dir = Path(__file__).parent
            repo_root = script_dir
            while repo_root.parent != repo_root:
                if (repo_root / '.git').exists():
                    break
                repo_root = repo_root.parent
            repo_root = str(repo_root)

        result = subprocess.run(
            ['codespell', '--config', '.codespellrc'] + paths,
            cwd=repo_root,
            capture_output=True,
            text=True
        )
        
        return result.stdout, result.returncode
    except FileNotFoundError:
        print("Error: codespell is not installed.", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error running codespell: {e}", file=sys.stderr)
        sys.exit(1)

def parse_codespell_output(output):
    """Parse codespell output into structured format."""
    typos = []
    
    if not output.strip():
        return typos
    
    lines = output.strip().split('\n')
    for line in lines:
        if ':' in line:
            # Format: filename:line: TYPO ==> SUGGESTION
            parts = line.split(':', 2)
            if len(parts) >= 3:
                filepath = parts[0].strip()
                line_num = parts[1].strip()
                message = parts[2].strip()
                
                typos.append({
                    'file': filepath,
                    'line': line_num,
                    'message': message
                })
    
    return typos

def format_comment(typos, is_full_mode=False, files_checked=None):
    """Format typos as a GitHub comment."""
    mode_info = "all content" if is_full_mode else f"{files_checked} changed file(s)"
    
    if not typos:
        comment = "## ✅ Spell Check Passed\n\n"
        if files_checked == 0:
            comment += "No spell-checkable files were changed in this PR."
        else:
            comment += f"No spelling issues found when checking {mode_info}! 🎉"
        return comment
    
    comment = "## 📝 Spell Check Results\n\n"
    comment += f"Found {len(typos)} potential spelling issue(s) when checking {mode_info}:\n\n"
    
    # Group typos by file
    typos_by_file = {}
    for typo in typos:
        file = typo['file']
        if file not in typos_by_file:
            typos_by_file[file] = []
        typos_by_file[file].append(typo)
    
    # Format output
    for file, file_typos in sorted(typos_by_file.items()):
        comment += f"### 📄 `{file}`\n\n"
        comment += "| Line | Issue |\n"
        comment += "|------|-------|\n"
        for typo in file_typos:
            line = typo['line']
            message = typo['message'].replace('|', '\\|')  # Escape pipes for markdown
            comment += f"| {line} | {message} |\n"
        comment += "\n"
    
    comment += "---\n\n"
    comment += "### ℹ️ How to address these issues:\n\n"
    comment += "1. **Fix the typo**: If it's a genuine typo, please correct it.\n"
    comment += "2. **Add to whitelist**: If it's a valid word (e.g., a name, technical term), add it to `.codespell-ignore.txt`\n"
    comment += "3. **False positive**: If this is a false positive, please report it in the PR comments.\n\n"
    comment += "<sub>🤖 This check was performed by [codespell](https://github.com/codespell-project/codespell)</sub>"
    
    return comment

def main():
    """Main function to run spell check and output comment."""
    print("Running spell check...", file=sys.stderr)
    
    # Determine which files to check
    paths, is_full_mode = get_files_to_check()
    
    # Run codespell
    output, returncode = run_codespell(paths)
    
    # Parse output
    typos = parse_codespell_output(output)
    
    # Format comment
    comment = format_comment(typos, is_full_mode, len(paths) if not is_full_mode else None)
    
    # Output comment for GitHub Actions
    # Escape special characters for GitHub Actions output
    comment_escaped = comment.replace('%', '%25').replace('\n', '%0A').replace('\r', '%0D')
    
    # Set output using environment file (GitHub Actions recommended method)
    github_output = os.environ.get('GITHUB_OUTPUT')
    if github_output:
        with open(github_output, 'a') as f:
            f.write(f"comment<<EOF\n{comment}\nEOF\n")
    else:
        # Fallback for local testing
        print(f"::set-output name=comment::{comment_escaped}")
    
    # Also print to stdout for debugging
    print(comment)
    
    # Exit with appropriate code
    # We don't want to fail the workflow, just report issues
    sys.exit(0)

if __name__ == "__main__":
    main()
