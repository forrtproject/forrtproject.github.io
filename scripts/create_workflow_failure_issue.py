#!/usr/bin/env python3
"""
Create a GitHub issue for failed data processing workflow steps.
This script creates an issue when critical workflow steps fail.
"""
import json
import os
import sys
import subprocess
from datetime import datetime

def sanitize_string(s):
    """
    Sanitize a string to ensure clean issue content.
    
    Args:
        s: Any value (will be converted to string if not already)
        
    Returns:
        str: Sanitized string with control characters removed and whitespace normalized
    """
    if not isinstance(s, str):
        s = str(s)
    # Replace newlines, carriage returns, and tabs with spaces
    s = s.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ')
    # Remove any other control characters (ASCII < 32, excluding space which is 32)
    s = ''.join(char for char in s if ord(char) >= 32)
    return s.strip()

def create_issue(step_name, error_message, workflow_run_url):
    """Create a GitHub issue for a failed workflow step."""
    timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
    
    # Sanitize inputs
    step_name = sanitize_string(step_name)
    error_message = sanitize_string(error_message) if error_message else "Step failed with unknown error"
    workflow_run_url = sanitize_string(workflow_run_url) if workflow_run_url else "URL not available"
    
    # Build the issue body
    body = f"""## Data Processing Workflow Failure

**Date:** {timestamp}
**Failed Step:** {step_name}

### Error Details

```
{error_message}
```

### Workflow Run

View the full workflow run: {workflow_run_url}

### Action Required

Please investigate the failure and fix any issues with the data sources, scripts, or workflow configuration.

---
*This issue was automatically created by the data processing workflow.*
"""
    
    # Create the issue title
    title = f"Data Processing Failure: {step_name}"
    
    try:
        # Check if GitHub CLI is available
        try:
            subprocess.run(['gh', '--version'], capture_output=True, text=True, check=True)
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"❌ GitHub CLI (gh) is not available or not authenticated: {e}")
            return False
        
        # Use GitHub CLI to create the issue
        result = subprocess.run(
            ['gh', 'issue', 'create', 
             '--title', title,
             '--body', body,
             '--label', 'bug,data-processing,automated'],
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
    # Get step information from environment variables or command line
    step_name = os.getenv('FAILED_STEP_NAME', 'Unknown Step')
    error_message = os.getenv('FAILED_STEP_ERROR', '')
    workflow_run_url = os.getenv('WORKFLOW_RUN_URL', '')
    
    # Allow command line arguments to override
    if len(sys.argv) > 1:
        step_name = sys.argv[1]
    if len(sys.argv) > 2:
        error_message = sys.argv[2]
    if len(sys.argv) > 3:
        workflow_run_url = sys.argv[3]
    
    print(f"⚠ Creating issue for failed step: {step_name}")
    if create_issue(step_name, error_message, workflow_run_url):
        return 0
    else:
        return 1

if __name__ == '__main__':
    sys.exit(main())
