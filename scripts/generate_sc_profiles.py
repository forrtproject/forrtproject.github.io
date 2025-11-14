#!/usr/bin/env python3
"""
Generate steering committee member profiles from Google Sheets CSVs.

This script:
1. Downloads steering committee member list and personal details from Google Sheets
2. Merges data by matching member names
3. Generates Hugo author profiles with frontmatter
4. Downloads profile pictures from Google Drive
5. Creates the steering committee page with people widgets organized by section
"""

import pandas as pd
import os
import shutil
import re
import requests
import unicodedata
from pathlib import Path
from difflib import SequenceMatcher
from urllib.parse import parse_qs, urlparse
from PIL import Image
from io import BytesIO

# Configuration
SC_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCHSY7WBvzDSSWyUyOVPRbsf5QxO7Mc40hGB7yanfT-rjbcNthMbHvUxT0NJ3AAfLKfx4YiOghByZT/pub?output=csv"
PERSONAL_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbY9_zqSqjCEnGlWMgRYkgd0_tJzXVY2efoqQ3TcPC0eIqIOxVnVHVM7lYpgpZRalacEznJpWDalHi/pub?output=csv"

# Get the script directory to determine where to save files
SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent
AUTHORS_DIR = REPO_ROOT / "content" / "authors"
SC_PAGE_DIR = REPO_ROOT / "content" / "about" / "steering-committee"
STATIC_IMG_DIR = REPO_ROOT / "static" / "img" / "steering-committee"

def normalize_name(name):
    """Normalize name for matching."""
    if pd.isna(name):
        return ""
    name = str(name).strip()
    # Remove titles, asterisks, and extra spaces
    name = re.sub(r'\b(Dr|Dr\.|Mr|Mr\.|Ms|Ms\.|Mrs|Prof|Prof\.)\s+', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\*', '', name)
    # Convert special characters (ö->o, é->e, etc.)
    name = unicodedata.normalize('NFKD', name)
    name = name.encode('ascii', 'ignore').decode('ascii')
    name = re.sub(r'\s+', ' ', name).strip()
    return name.lower()

def similarity(a, b):
    """Calculate string similarity ratio."""
    return SequenceMatcher(None, a, b).ratio()

def find_match(name, candidates, threshold=0.6):
    """Find best matching name from candidates list."""
    normalized = normalize_name(name)
    best_match = None
    best_score = threshold

    for candidate in candidates:
        normalized_candidate = normalize_name(candidate)
        score = similarity(normalized, normalized_candidate)
        if score > best_score:
            best_score = score
            best_match = candidate

    return best_match

def sanitize_filename(name):
    """Convert name to valid Hugo author directory name."""
    # Remove special characters, convert to lowercase, use hyphens
    name = normalize_name(name)
    name = re.sub(r'[^a-z0-9\s]', '', name)
    name = re.sub(r'\s+', '-', name)
    return name

def get_google_drive_download_url(share_url):
    """Convert Google Drive share URL to direct download URL."""
    try:
        # Parse the URL
        if 'open?id=' in share_url:
            file_id = share_url.split('open?id=')[1]
        elif '/d/' in share_url:
            file_id = share_url.split('/d/')[1].split('/')[0]
        else:
            return None

        return f"https://drive.google.com/uc?export=download&id={file_id}"
    except Exception as e:
        print(f"Error parsing Google Drive URL: {e}")
        return None

def download_image(url, filepath):
    """Download image from URL and save as WebP."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        # Open image and convert to WebP
        img = Image.open(BytesIO(response.content))

        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img

        # Save as WebP
        img.save(filepath, 'WEBP', quality=85)
        print(f"✓ Downloaded and saved image: {filepath}")
        return True
    except Exception as e:
        print(f"✗ Failed to download image from {url}: {e}")
        return False

def create_placeholder_image(filepath):
    """Use placeholder image from contact-research-network for 'Coming Soon' members."""
    placeholder_url = "https://contact-research-network.github.io/author/aaron-lauterbach/avatar_hue2b698525cccc4769be45c1954b41047_88735_270x270_fill_q75_lanczos_center.jpg"
    try:
        response = requests.get(placeholder_url, timeout=10)
        response.raise_for_status()

        # Convert to WebP
        img = Image.open(BytesIO(response.content))

        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img

        # Save as WebP
        img.save(filepath, 'WEBP', quality=85)
        print(f"✓ Created placeholder image: {filepath}")
        return True
    except Exception as e:
        print(f"✗ Failed to download placeholder image: {e}")
        # Fallback: create a simple gray placeholder
        try:
            img = Image.new('RGB', (270, 270), color=(220, 220, 220))
            img.save(filepath, 'WEBP', quality=85)
            print(f"✓ Created fallback gray placeholder: {filepath}")
            return True
        except Exception as e2:
            print(f"✗ Failed to create fallback placeholder: {e2}")
            return False

def generate_author_frontmatter(member_data):
    """Generate YAML frontmatter for author profile."""
    name = member_data.get('Full Name', '')
    email = member_data.get('Email', '')
    bio = member_data.get('Bio', '')
    orcid = member_data.get('ORCiD', '')
    weblink = member_data.get('Weblink', '')
    role_title = member_data.get('Role Title', '')
    section = member_data.get('Section', '')

    # Build social links
    social_links = []

    if email and pd.notna(email) and email != '':
        social_links.append(f"- icon: envelope\n  icon_pack: fas\n  link: 'mailto:{email}'")

    if orcid and pd.notna(orcid) and 'orcid.org' in str(orcid):
        social_links.append(f"- icon: orcid\n  icon_pack: fab\n  link: {orcid}")

    if weblink and pd.notna(weblink) and weblink != '':
        # Try to determine if it's a Google Scholar URL or general weblink
        if 'scholar.google' in str(weblink):
            social_links.append(f"- icon: google-scholar\n  icon_pack: ai\n  link: {weblink}")
        elif 'linkedin' in str(weblink):
            social_links.append(f"- icon: linkedin\n  icon_pack: fab\n  link: {weblink}")
        else:
            social_links.append(f"- icon: globe\n  icon_pack: fas\n  link: {weblink}")

    social_section = "\n".join(social_links) if social_links else "# No social links"

    # Build user_groups - use section if available, otherwise use "Steering Committee"
    user_groups = []
    if section and pd.notna(section) and str(section).strip():
        user_groups.append(str(section).strip())
    else:
        user_groups.append("Steering Committee")

    user_groups_yaml = "\n".join([f"- \"{group}\"" for group in user_groups])

    frontmatter = f"""---
# Display name
name: "{name}"

# Username (this should match the folder name)
authors:
- Name "{name}"

# Is this the primary user of the site?
superuser: false

# Role/position
role: "{role_title}"

# Organizations/Affiliations
organizations: []

# Short bio (displayed in user profile at end of posts)
bio: ""

# Organizational groups that you belong to (for People widget)
user_groups:
{user_groups_yaml}

# Social/Academic Networking
social:
{social_section}
---

{bio}
"""
    return frontmatter

def main():
    print("=" * 60)
    print("Generating Steering Committee Profiles")
    print("=" * 60)

    # Download CSVs
    print("\n[1/7] Downloading data from Google Sheets...")
    try:
        sc_df = pd.read_csv(SC_CSV_URL)
        personal_df = pd.read_csv(PERSONAL_CSV_URL)
        print(f"✓ Downloaded steering committee data ({len(sc_df)} rows)")
        print(f"✓ Downloaded personal details data ({len(personal_df)} rows)")
    except Exception as e:
        print(f"✗ Failed to download CSVs: {e}")
        return

    # Clean and prepare steering committee data
    print("\n[2/7] Preparing data...")

    # Remove empty rows (those where 'Persons Invited' is NaN)
    sc_df = sc_df[sc_df['Persons Invited'].notna()]
    sc_df = sc_df[sc_df['Persons Invited'].astype(str).str.strip() != '']

    # Sort by section and then by name for alphabetical ordering within sections
    sc_df = sc_df.sort_values(by=['Section', 'Persons Invited'], na_position='last').reset_index(drop=True)

    # Create a mapping for personal details
    personal_dict = {}
    for idx, row in personal_df.iterrows():
        name = normalize_name(row['Full Name (incl academic title)'])
        personal_dict[name] = {
            'Full Name': row['Full Name (incl academic title)'],
            'ORCiD': row.get('ORCiD', ''),
            'Email': row.get('Email address (if you are happy to share one in public)', ''),
            'Weblink': row.get('Professional Weblink (e.g., institutional profile, Google Scholar, personal webpage)', ''),
            'Photo URL': row.get('Professional Headshot (for website)', ''),
            'Bio': row.get('Your bio (approximately 150 words)', '')
        }

    print(f"✓ Prepared personal details index with {len(personal_dict)} entries")

    # Create output directories
    print("\n[3/7] Creating directories...")
    AUTHORS_DIR.mkdir(parents=True, exist_ok=True)
    SC_PAGE_DIR.mkdir(parents=True, exist_ok=True)
    STATIC_IMG_DIR.mkdir(parents=True, exist_ok=True)
    print(f"✓ Created output directories")

    # Clean up old widget files (except index.md)
    print("\n[3.5/7] Cleaning up old widget files...")
    for widget_file in SC_PAGE_DIR.glob("people_*.md"):
        widget_file.unlink()
    print(f"✓ Cleaned up old widget files")

    # Generate profiles and collect data for page organization
    print("\n[4/7] Generating author profiles...")

    created_profiles = 0
    members_with_photos = 0
    members_without_photos = 0
    members_by_section = {}  # Track members by section
    members_without_section = 0
    created_names = set()  # Track which names we've already created profiles for

    for idx, row in sc_df.iterrows():
        member_name = row['Persons Invited']
        role = row['Role']
        section = row['Section']
        team = row['Team']
        role_title = row.get('Role Title', role)  # Use Role Title if available, fall back to Role
        role_description = row.get('Role Description', '')

        # Try to find matching personal details
        normalized_member = normalize_name(member_name)
        personal_data = personal_dict.get(normalized_member)
        personal_name = member_name  # Default to SC name

        if personal_data is not None:
            # Use the name from personal CSV if exact match found
            personal_name = personal_data['Full Name']
        else:
            # Try fuzzy matching with lower threshold to catch name variations (middle names, special chars, etc.)
            matching_name = find_match(member_name, personal_dict.keys(), threshold=0.65)
            if matching_name:
                personal_data = personal_dict[matching_name]
                # Use the name from personal CSV if we found a match
                personal_name = personal_data['Full Name']

        # Skip if we've already created a profile for this person (by their sanitized name)
        sanitized_name = sanitize_filename(personal_name)
        if sanitized_name in created_names:
            continue

        created_names.add(sanitized_name)

        # Prepare member data
        member_info = {
            'Full Name': personal_name,
            'Role Title': role_title if role_title and pd.notna(role_title) else (role if role else ""),
            'Role': role,
            'Section': section,
            'Team': team,
            'Email': personal_data.get('Email', '') if personal_data else '',
            'ORCiD': personal_data.get('ORCiD', '') if personal_data else '',
            'Weblink': personal_data.get('Weblink', '') if personal_data else '',
            'Photo URL': personal_data.get('Photo URL', '') if personal_data else '',
            'Bio': personal_data.get('Bio', '') if personal_data else 'Coming soon.'
        }

        # Track members by section
        if section and pd.notna(section):
            if section not in members_by_section:
                members_by_section[section] = []
            members_by_section[section].append(member_name)
        else:
            members_without_section += 1

        # Create author directory using personal name if available
        author_dir = AUTHORS_DIR / sanitize_filename(personal_name)
        author_dir.mkdir(parents=True, exist_ok=True)

        # Generate frontmatter
        frontmatter = generate_author_frontmatter(member_info)

        # Write _index.md
        index_file = author_dir / "_index.md"
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(frontmatter)

        created_profiles += 1

        # Download or create placeholder image
        avatar_path = author_dir / "avatar.webp"

        # Remove existing avatar if it exists
        if avatar_path.exists():
            avatar_path.unlink()

        if personal_data and member_info['Photo URL'] and pd.notna(member_info['Photo URL']):
            photo_url = member_info['Photo URL']
            download_url = get_google_drive_download_url(photo_url)
            if download_url and download_image(download_url, avatar_path):
                members_with_photos += 1
            else:
                create_placeholder_image(avatar_path)
                members_without_photos += 1
        else:
            create_placeholder_image(avatar_path)
            members_without_photos += 1

    print(f"✓ Generated {created_profiles} author profiles")
    print(f"  - {members_with_photos} with photos")
    print(f"  - {members_without_photos} with placeholder (coming soon)")

    # Create steering committee page with sections
    print("\n[5/7] Creating steering committee page structure...")

    # Create index.md for the page
    index_content = """---
type: 'widget_page'
title: Steering Committee
---
"""

    index_file = SC_PAGE_DIR / "index.md"
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(index_content)

    # Create widgets for each section with custom ordering
    # Order: Focus Areas first, other sections, FORRT Stewards second to last, Steering Committee last
    weight = 10
    sections_created = 0

    # Helper function to create a people widget
    def create_section_widget(title, user_group, weight):
        section_slug = re.sub(r'[^a-zA-Z0-9\s]', '', title)
        section_slug = re.sub(r'\s+', '_', section_slug).lower()

        people_widget = f"""+++
widget = "people"
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = {weight}  # Order that this section will appear.

title = "{title}"
subtitle = ""

[content]
  user_groups = ["{user_group}"]

[design]
  show_social = true
  show_interests = false
+++
"""
        people_file = SC_PAGE_DIR / f"people_{section_slug}.md"
        with open(people_file, 'w', encoding='utf-8') as f:
            f.write(people_widget)
        return weight + 10

    # Define section order: Focus Areas first, others in the middle, FORRT Stewards second to last, Steering Committee last
    section_order = ["Focus Areas"]

    # Add other sections (sorted alphabetically, excluding Focus Areas, FORRT Stewards, and Steering Committee)
    for section in sorted(members_by_section.keys()):
        if section not in section_order and section != "FORRT Stewards" and section != "Steering Committee":
            section_order.append(section)

    # Add FORRT Stewards second to last
    if "FORRT Stewards" in members_by_section:
        section_order.append("FORRT Stewards")

    # Add Steering Committee last (whether from CSV or from members without section)
    if "Steering Committee" in members_by_section or members_without_section > 0:
        section_order.append("Steering Committee")

    # Create widgets in the defined order
    for section in section_order:
        if section in members_by_section:
            weight = create_section_widget(section, section, weight)
            sections_created += 1
        elif section == "Steering Committee" and members_without_section > 0:
            # Create Steering Committee for members without a section
            weight = create_section_widget("Steering Committee", "Steering Committee", weight)
            sections_created += 1

    print(f"✓ Created steering committee page with {sections_created} sections")

    # Summary
    print("\n" + "=" * 60)
    print("✓ Successfully generated all steering committee profiles!")
    print("=" * 60)
    print(f"\nProfiles created: {created_profiles}")
    print(f"  Location: {AUTHORS_DIR}")
    print(f"\nPage sections created: {len(members_by_section)}")
    for section in sorted(members_by_section.keys()):
        if section and pd.notna(section):
            print(f"  - {section} ({len(members_by_section[section])} members)")
    print(f"\nPage created: {SC_PAGE_DIR}")
    print(f"\nNext steps:")
    print(f"  1. Test locally: hugo serve")
    print(f"  2. View page at: http://localhost:1313/about/steering-committee/")
    print(f"  3. Commit changes: git add content/authors content/about/steering-committee")
    print(f"  4. Push to branch: git push origin sc-profiles")

if __name__ == "__main__":
    main()
