#!/usr/bin/env python3
"""
Create a GitHub issue for failed Tenzing sheets.
This script reads the failure report and creates an issue if any sheets failed.
"""
import json
import os
import sys
import subprocess
import shlex

def sanitize_string(s):
    """Sanitize a string to prevent command injection."""
    # Remove or escape characters that could be problematic
    if not isinstance(s, str):
        s = str(s)
    # Replace newlines and tabs with spaces
    s = s.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    # Remove any control characters
    s = ''.join(char for char in s if ord(char) >= 32 or char in '\n\r\t')
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
    
    # Write title and body to temporary files to avoid command injection
    import tempfile
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as title_file:
        title_file.write(title)
        title_path = title_file.name
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as body_file:
        body_file.write(body)
        body_path = body_file.name
    
    # Use GitHub CLI to create the issue
    try:
        result = subprocess.run(
            ['gh', 'issue', 'create', 
             '--title-file', title_path,
             '--body-file', body_path,
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
    finally:
        # Clean up temporary files
        try:
            os.unlink(title_path)
            os.unlink(body_path)
        except Exception:
            pass

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
