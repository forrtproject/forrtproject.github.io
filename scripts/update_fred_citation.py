#!/usr/bin/env python3
"""
Script to fetch and update the FReD citation from the FReD-data repository.

This script downloads the latest citation from:
https://raw.githubusercontent.com/forrtproject/FReD-data/refs/heads/main/output/citation.txt

And saves it to static/data/fred_citation.txt for use in the cite_us page.
"""

import re
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
FLORA_INDEX_FILE = "content/replication-hub/flora/_index.md"

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

        # Post-process citation to match required format
        # Replace DOI URL with HTML link and append note if not present
        # Find DOI URL (assume starts with https://doi.org/)
        citation = citation.strip()
        # Remove any trailing note
        citation_main = citation
        note = "* These authors contributed equally to this work."
        if "* These authors contributed equally to this work." in citation:
            citation_main = citation.split("* These authors contributed equally to this work.")[0].strip()

        # Replace DOI URL with HTML link
        doi_pattern = r'(https://doi\.org/[\w\./-]+)'
        def repl(match):
            url = match.group(1)
            return f'<a href="{url}">{url}</a>'
        citation_main = re.sub(doi_pattern, repl, citation_main)

        # Compose final citation with highlighted note
        citation_final = citation_main + "\n\n<strong>" + note + "</strong>\n"

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(citation_final)

        logger.info(f"Successfully saved citation to {output_path}")
        return True
    except Exception as e:
        logger.error(f"Failed to save citation: {e}")
        return False

def update_flora_index(citation_html):
    """
    Update the citation inside the flora-citation block in the FLoRA _index.md.

    The function looks for <!-- flora-citation-start --> and <!-- flora-citation-end --> markers,
    and replaces the content between {{< alert note >}} and {{< /alert >}} with the citation.

    Args:
        citation_html: The processed citation HTML string

    Returns:
        bool: True if successful or markers not present, False on error
    """
    try:
        index_file = Path(FLORA_INDEX_FILE)
        if not index_file.exists():
            logger.warning(f"FLoRA index file not found: {FLORA_INDEX_FILE}")
            return False

        content = index_file.read_text(encoding='utf-8')
        start_marker = "<!-- flora-citation-start -->"
        end_marker = "<!-- flora-citation-end -->"
        alert_start = "{{< alert note >}}"
        alert_end = "{{< /alert >}}"

        if start_marker not in content or end_marker not in content:
            logger.info("No flora citation block markers found in FLoRA index, skipping")
            return True

        # Find flora-citation block (escape markers for regex)
        flora_block_pattern = re.compile(
            rf"({re.escape(start_marker)})(.*?){re.escape(end_marker)}",
            re.DOTALL
        )
        flora_block_match = flora_block_pattern.search(content)
        if not flora_block_match:
            logger.info("No flora citation block found, skipping")
            return True

        flora_block = flora_block_match.group(2)
        # Find alert note block inside flora-citation block (escape Hugo shortcode for regex)
        alert_pattern = re.compile(
            rf"({re.escape(alert_start)})(.*?){re.escape(alert_end)}",
            re.DOTALL
        )
        alert_match = alert_pattern.search(flora_block)
        if not alert_match:
            logger.info("No alert note block found inside flora citation block, skipping")
            return True

        # Replace content between alert markers
        new_alert_block = f"{alert_start}\n{citation_html.strip()}\n{alert_end}"
        new_flora_block = alert_pattern.sub(new_alert_block, flora_block)
        # Rebuild flora-citation block
        new_flora_citation = f"{start_marker}\n{new_flora_block}\n{end_marker}"
        # Replace in file (use lambda to avoid backreference issues)
        updated = flora_block_pattern.sub(lambda m: new_flora_citation, content)
        index_file.write_text(updated, encoding='utf-8')
        logger.info(f"Successfully updated citation inside alert note in {FLORA_INDEX_FILE}")
        return True
    except Exception as e:
        logger.error(f"Failed to update FLoRA index: {e}")
        return False


def main():
    """Main function to fetch and save the FReD citation."""
    logger.info("Starting FReD citation update")

    # Fetch citation
    citation = fetch_fred_citation()
    if not citation:
        logger.error("Failed to fetch citation, exiting")
        return 1

    # Save citation to static data file
    if not save_citation(citation, OUTPUT_FILE):
        logger.error("Failed to save citation, exiting")
        return 1

    # Build the HTML-formatted citation string (same logic as save_citation)
    citation_stripped = citation.strip()
    note = "* These authors contributed equally to this work."
    citation_main = citation_stripped
    if note in citation_stripped:
        citation_main = citation_stripped.split(note)[0].strip()
    doi_pattern = r'(https://doi\.org/[\w\./-]+)'
    def repl(match):
        url = match.group(1)
        return f'<a href="{url}">{url}</a>'
    citation_html = re.sub(doi_pattern, repl, citation_main) + "\n\n<strong>" + note + "</strong>"

    # Replace placeholder in FLoRA _index.md
    if not update_flora_index(citation_html):
        logger.error("Failed to update FLoRA index, exiting")
        return 1

    logger.info("FReD citation update completed successfully")
    return 0

if __name__ == "__main__":
    sys.exit(main())
