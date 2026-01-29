#!/usr/bin/env python3
"""
Create a GitHub issue for failed Tenzing sheets.
This script reads the failure report and creates an issue if any sheets failed.
"""
import json
import os
import sys
import subprocess

def sanitize_string(s):
    """
    Sanitize a string to ensure clean issue content.
    
    Note: This function is used to sanitize strings before passing them
    to the GitHub CLI via --title and --body flags. We sanitize control
    characters to ensure clean issue content.
    
    Args:
        s: Any value (will be converted to string if not already)
        
    Returns:
        str: Sanitized string with control characters removed and whitespace normalized
    """
    # Remove or escape characters that could be problematic
    if not isinstance(s, str):
        s = str(s)
    # Replace newlines, carriage returns, and tabs with spaces
    s = s.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    # Remove any other control characters (ASCII < 32, excluding space which is 32)
    s = ''.join(char for char in s if ord(char) >= 32)
    return s.strip()

def create_issue(failures_data):
    """Create a GitHub issue for failed sheets."""
    timestamp = sanitize_string(failures_data['timestamp'])
    total = int(failures_data['total_projects'])
    successful = int(failures_data['successful_projects'])
    failed = int(failures_data['failed_projects'])
    failures = failures_data['failures']
    
    # Build the issue body
    body = f"""## Tenzing Script Failure Report

**Date:** {timestamp}

### Summary
- **Total projects:** {total}
- **Successful:** {successful} ✅
- **Failed:** {failed} ❌

### Failed Projects

"""
    
    for failure in failures:
        # Sanitize all failure data
        project_name = sanitize_string(failure['project_name'])
        url = sanitize_string(failure['url'])
        error = sanitize_string(failure['error'])
        
        body += f"""#### {project_name}
- **URL:** `{url}`
- **Error:** `{error}`

"""
    
    body += """### Action Required

Please investigate the failed projects and fix any issues with the source data or URLs.

---
*This issue was automatically created by the Tenzing data processing workflow.*
"""
    
    # Create the issue title
    title = f"Tenzing Script Failures: {failed} project(s) failed to load"
    
    try:
        # Check if GitHub CLI is available
        try:
            gh_check = subprocess.run(['gh', '--version'], capture_output=True, text=True, check=True)
            # Parse version info safely
            version_parts = gh_check.stdout.split()
            if len(version_parts) >= 3:
                print(f"Using GitHub CLI: {version_parts[0]} {version_parts[2]}")
            else:
                print(f"Using GitHub CLI (version info unavailable)")
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"❌ GitHub CLI (gh) is not available or not authenticated: {e}")
            return False
        
        # Use GitHub CLI to create the issue
        result = subprocess.run(
            ['gh', 'issue', 'create', 
             '--title', title,
             '--body', body,
             '--label', 'bug,tenzing,automated'],
            capture_output=True,
            text=True,
            check=True
        )
        print(f"✅ Issue created successfully!")
        print(result.stdout)
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to create issue: {e}")
        print(f"stdout: {e.stdout}")
        print(f"stderr: {e.stderr}")
        return False
    except Exception as e:
        print(f"❌ Error in issue creation process: {e}")
        return False

def main():
    # Get the script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    failure_report_path = os.path.join(script_dir, 'tenzing_failures.json')
    
    # Check if failure report exists
    if not os.path.exists(failure_report_path):
        print("✓ No failure report found - all sheets processed successfully!")
        return 0
    
    # Read the failure report
    try:
        with open(failure_report_path, 'r') as f:
            failures_data = json.load(f)
    except Exception as e:
        print(f"❌ Failed to read failure report: {e}")
        return 1
    
    # Check if there are any failures
    if failures_data['failed_projects'] == 0:
        print("✓ No failures in report - all sheets processed successfully!")
        return 0
    
    # Create the issue
    print(f"⚠ Found {failures_data['failed_projects']} failed project(s), creating issue...")
    if create_issue(failures_data):
        return 0
    else:
        return 1

if __name__ == '__main__':
    sys.exit(main())
