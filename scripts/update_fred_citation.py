#!/usr/bin/env python3
"""
Script to fetch and update the FReD citation from the FReD-data repository.

This script downloads the latest citation from:
https://raw.githubusercontent.com/forrtproject/FReD-data/refs/heads/main/output/citation.txt

And saves it to static/data/fred_citation.txt for use in the cite_us page.
"""

import sys
import logging
from pathlib import Path
from urllib import request
from urllib.error import URLError

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s: %(message)s'
)
logger = logging.getLogger(__name__)

# Constants
CITATION_URL = "https://raw.githubusercontent.com/forrtproject/FReD-data/refs/heads/main/output/citation.txt"
OUTPUT_FILE = "static/data/fred_citation.txt"

def fetch_fred_citation():
    """
    Fetch the FReD citation from the GitHub repository.
    
    Returns:
        str: The citation text, or None if fetch failed
    """
    try:
        logger.info(f"Fetching FReD citation from {CITATION_URL}")
        with request.urlopen(CITATION_URL, timeout=10) as response:
            citation = response.read().decode('utf-8')
            logger.info("Successfully fetched FReD citation")
            return citation
    except URLError as e:
        logger.error(f"Failed to fetch citation: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error while fetching citation: {e}")
        return None

def save_citation(citation, output_path):
    """
    Save the citation to a text file.
    
    Args:
        citation: The citation text to save
        output_path: Path where to save the citation
    
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(citation)
        
        logger.info(f"Successfully saved citation to {output_path}")
        return True
    except Exception as e:
        logger.error(f"Failed to save citation: {e}")
        return False

def main():
    """Main function to fetch and save the FReD citation."""
    logger.info("Starting FReD citation update")
    
    # Fetch citation
    citation = fetch_fred_citation()
    if not citation:
        logger.error("Failed to fetch citation, exiting")
        return 1
    
    # Save citation
    if not save_citation(citation, OUTPUT_FILE):
        logger.error("Failed to save citation, exiting")
        return 1
    
    logger.info("FReD citation update completed successfully")
    return 0

if __name__ == "__main__":
    sys.exit(main())
