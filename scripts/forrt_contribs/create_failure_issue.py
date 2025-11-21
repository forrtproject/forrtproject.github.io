#!/usr/bin/env python3
"""
Create a GitHub issue for failed Tenzing sheets.
This script reads the failure report and creates an issue if any sheets failed.
"""
import json
import os
import sys
import subprocess

def create_issue(failures_data):
    """Create a GitHub issue for failed sheets."""
    timestamp = failures_data['timestamp']
    total = failures_data['total_projects']
    successful = failures_data['successful_projects']
    failed = failures_data['failed_projects']
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
        body += f"""#### {failure['project_name']}
- **URL:** `{failure['url']}`
- **Error:** `{failure['error']}`

"""
    
    body += """### Action Required

Please investigate the failed projects and fix any issues with the source data or URLs.

---
*This issue was automatically created by the Tenzing data processing workflow.*
"""
    
    # Create the issue title
    title = f"Tenzing Script Failures: {failed} project(s) failed to load"
    
    # Use GitHub CLI to create the issue
    try:
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
