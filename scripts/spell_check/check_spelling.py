#!/usr/bin/env python3
"""
Spell-check script for FORRT repository using codespell.
Checks for typos in pull requests and generates a formatted comment.
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def run_codespell():
    """Run codespell and capture output."""
    try:
        # Run codespell on specific directories to avoid themes and other large dirs
        # Focus on content, scripts, and GitHub workflows
        paths = ['content', 'scripts', '.github', 'CONTRIBUTING.md', 'README.md']
        
        result = subprocess.run(
            ['codespell', '--config', '.codespellrc'] + paths,
            cwd='/home/runner/work/forrtproject.github.io/forrtproject.github.io',
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

def format_comment(typos):
    """Format typos as a GitHub comment."""
    if not typos:
        comment = "## ✅ Spell Check Passed\n\n"
        comment += "No spelling issues found in this PR! 🎉"
        return comment
    
    comment = "## 📝 Spell Check Results\n\n"
    comment += f"Found {len(typos)} potential spelling issue(s) in this PR:\n\n"
    
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
    
    # Run codespell
    output, returncode = run_codespell()
    
    # Parse output
    typos = parse_codespell_output(output)
    
    # Format comment
    comment = format_comment(typos)
    
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
