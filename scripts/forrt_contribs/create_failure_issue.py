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
import tempfile

def sanitize_string(s):
    """Sanitize a string to prevent command injection."""
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
    
    # Write title and body to temporary files to avoid command injection
    # Initialize paths to None so they're defined in all code paths
    title_path = None
    body_path = None
    
    try:
        # Create temporary files
        title_file = tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False)
        title_file.write(title)
        title_file.close()
        title_path = title_file.name
        
        body_file = tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False)
        body_file.write(body)
        body_file.close()
        body_path = body_file.name
        
        # Use GitHub CLI to create the issue
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
    except Exception as e:
        print(f"❌ Error in issue creation process: {e}")
        return False
    finally:
        # Clean up temporary files if they were created
        for path in [title_path, body_path]:
            if path is not None:
                try:
                    if os.path.exists(path):
                        os.unlink(path)
                except OSError as e:
                    print(f"⚠ Warning: Failed to remove temporary file {path}: {e}")

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
