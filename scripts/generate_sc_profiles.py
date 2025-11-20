#!/usr/bin/env python3
"""
Generate steering committee member profiles from Google Sheets CSVs.

This script:
1. Downloads steering committee member list and personal details from Google Sheets
2. Merges data by matching member names
3. Groups members into Strategic, Operations, and Steering categories based on 'Section'
4. Sub-groups members into Teams based on 'Team' column
5. Generates a single Hugo content file with static HTML and Vanilla JS
6. Downloads profile pictures from Google Drive
"""

import pandas as pd
import os
import shutil
import re
import requests
import unicodedata
import json
import html
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

# Category Definitions
CATEGORY_MAPPING = {
    "Focus Areas": "strategic",
    "Strategic Focus Areas": "strategic",
    "Operations": "operations",
    "Operations & Stewardship": "operations",
    "Ombudsman": "operations",
    "FORRT Stewards": "operations",
    "Steering Committee": "steering"
}

CATEGORY_DETAILS = {
    "strategic": {
        "title": "Strategic Focus Areas",
        "description": "Core mission-driven teams advancing open scholarship, social justice, and community sustainability.",
        "icon": '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
    },
    "operations": {
        "title": "Operations & Stewardship",
        "description": "Infrastructure, ethical oversight, and support systems powering FORRT.",
        "icon": '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'
    },
    "steering": {
        "title": "Steering Committee",
        "description": "High-level guidance, governance, and strategic oversight.",
        "icon": '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" x2="12" y1="22" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>'
    }
}

# HTML Templates - Custom CSS (External)
PAGE_TEMPLATE = """
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<!-- External CSS -->
<link rel="stylesheet" href="/css/steering-committee.css">

<div id="sc-container">
    <nav class="sc-nav">
        <a href="#strategic">Strategic Focus Areas</a>
        <a href="#operations">Operations & Stewardship</a>
        <a href="#steering">Steering Committee</a>
    </nav>
    <main>
        __CONTENT__
    </main>
    <div id="modals-container">
        __MODALS__
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    window.openModal = (id) => {
        const modal = document.getElementById(`modal-${id}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = (id) => {
        const modal = document.getElementById(`modal-${id}`);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Close on backdrop click
    document.querySelectorAll('.sc-modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.sc-modal-backdrop.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});
</script>
"""

SECTION_TEMPLATE = """
<section class="sc-section" id="{type}">
    <div class="sc-section-header">
        <div class="sc-section-title">
            {icon}
            <span>{title}</span>
        </div>
        <p class="sc-section-desc">{description}</p>
    </div>
    <div class="sc-grid">
        {cards}
    </div>
</section>
"""

TEAM_TITLE_CARD_TEMPLATE = """
<div class="sc-title-card {bg_class}">
    <span class="sc-title-label">Team</span>
    <h3 class="sc-title-text">{name}</h3>
</div>
"""

MEMBER_CARD_TEMPLATE = """
<div class="sc-card" onclick="openModal('{id}')">
    {img_content}
    <div class="sc-card-overlay"></div>
    <div class="sc-card-content">
        <h4 class="sc-card-name">{name}</h4>
        <p class="sc-card-role">{role}</p>
    </div>
</div>
"""

MODAL_TEMPLATE = """
<div id="modal-{id}" class="sc-modal-backdrop">
    <div class="sc-modal-content">
        <div class="sc-modal-header">
            <button onclick="closeModal('{id}')" class="sc-close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 12"/></svg>
            </button>
        </div>
        <div class="sc-modal-body">
            <div class="sc-modal-layout">
                <div class="sc-modal-sidebar">
                    <div class="sc-modal-img">
                        {img_content_large}
                    </div>
                    <div class="sc-social-links">
                        {social_links}
                    </div>
                </div>
                <div class="sc-modal-main">
                    <h3 class="sc-modal-name">{name}</h3>
                    <p class="sc-modal-role">{role}</p>
                    <div class="sc-modal-bio">{bio}</div>
                </div>
            </div>
        </div>
    </div>
</div>
"""

ICONS = {
    "twitter": '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S1.2 13 5.3 11c-4.5-1.4-5-7.3-1.9-8.8C7 5 9 9 10 9s-1-1.5-1-4c0-2 .5-4 2.5-4 1.3 0 2.5 1 2.5 1 1.5 0 2.5-1 2.5-1 .5 1.5 1 2.5 1 2.5z"/></svg>',
    "linkedin": '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    "globe": '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    "mail": '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'
}

def normalize_name(name):
    if pd.isna(name): return ""
    name = str(name).strip()
    name = re.sub(r'\\b(Dr|Dr\\.|Mr|Mr\\.|Ms|Ms\\.|Mrs|Prof|Prof\\.)\\s+', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\\*', '', name)
    name = unicodedata.normalize('NFKD', name)
    name = name.encode('ascii', 'ignore').decode('ascii')
    name = re.sub(r'\\s+', ' ', name).strip()
    return name.lower()

def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()

def find_match(name, candidates, threshold=0.6):
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
    name = normalize_name(name)
    name = re.sub(r'[^a-z0-9\\s]', '', name)
    name = re.sub(r'\\s+', '-', name)
    return name

def get_initials(name):
    parts = name.split()
    if len(parts) >= 2:
        return f"{parts[0][0]}{parts[-1][0]}".upper()
    elif parts:
        return parts[0][0].upper()
    return "??"

def get_google_drive_download_url(share_url):
    try:
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
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        img.save(filepath, 'WEBP', quality=85)
        print(f"✓ Downloaded and saved image: {filepath}")
        return True
    except Exception as e:
        print(f"✗ Failed to download image from {url}: {e}")
        return False

def generate_social_links(member):
    links = []
    if member.get('twitter'):
        links.append(f'<a href="{member["twitter"]}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-teal-600 transition-colors">{ICONS["twitter"]}</a>')
    if member.get('linkedin'):
        links.append(f'<a href="{member["linkedin"]}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-blue-700 transition-colors">{ICONS["linkedin"]}</a>')
    if member.get('website'):
        links.append(f'<a href="{member["website"]}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-slate-800 transition-colors">{ICONS["globe"]}</a>')
    if member.get('email'):
        links.append(f'<a href="mailto:{member["email"]}" class="text-slate-400 hover:text-slate-800 transition-colors">{ICONS["mail"]}</a>')
    return "".join(links)

def main():
    print("=" * 60)
    print("Generating Steering Committee Page (Static HTML)")
    print("=" * 60)

    # Download CSVs
    print("\\n[1/5] Downloading data from Google Sheets...")
    try:
        sc_df = pd.read_csv(SC_CSV_URL)
        personal_df = pd.read_csv(PERSONAL_CSV_URL)
        print(f"✓ Downloaded steering committee data ({len(sc_df)} rows)")
        print(f"✓ Downloaded personal details data ({len(personal_df)} rows)")
    except Exception as e:
        print(f"✗ Failed to download CSVs: {e}")
        return

    # Clean and prepare steering committee data
    print("\\n[2/5] Preparing data...")
    sc_df = sc_df[sc_df['Persons Invited'].notna()]
    sc_df = sc_df[sc_df['Persons Invited'].astype(str).str.strip() != '']
    
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
    print("\\n[3/5] Creating directories...")
    AUTHORS_DIR.mkdir(parents=True, exist_ok=True)
    SC_PAGE_DIR.mkdir(parents=True, exist_ok=True)
    STATIC_IMG_DIR.mkdir(parents=True, exist_ok=True)
    (REPO_ROOT / "static" / "css").mkdir(parents=True, exist_ok=True) # Ensure CSS dir exists
    print(f"✓ Created output directories")

    # Clean up old widget files
    print("\\n[3.5/5] Cleaning up old widget files...")
    for widget_file in SC_PAGE_DIR.glob("people_*.md"):
        widget_file.unlink()
    print(f"✓ Cleaned up old widget files")

    # Process members and build data structure
    print("\\n[4/5] Processing members and building data structure...")

    # Initialize data structure for the three main categories
    categories = {
        "strategic": {"teams": {}},
        "operations": {"teams": {}},
        "steering": {"teams": {}}
    }

    for idx, row in sc_df.iterrows():
        member_name = row['Persons Invited']
        role = row['Role']
        section = row['Section']
        team_name = row['Team']
        role_title = row.get('Role Title', role)
        
        # Determine Main Category
        main_category_key = CATEGORY_MAPPING.get(section, "operations") # Default to operations if unknown
        
        # Determine Team Name
        # If team_name is missing, use Section or a default
        if pd.isna(team_name) or str(team_name).strip() == "":
            team_name = section if pd.notna(section) else "General"

        # Try to find matching personal details
        normalized_member = normalize_name(member_name)
        personal_data = personal_dict.get(normalized_member)
        personal_name = member_name

        if personal_data is not None:
            personal_name = personal_data['Full Name']
        else:
            matching_name = find_match(member_name, personal_dict.keys(), threshold=0.65)
            if matching_name:
                personal_data = personal_dict[matching_name]
                personal_name = personal_data['Full Name']

        # Handle image
        img_url = ""
        sanitized_name = sanitize_filename(personal_name)
        author_dir = AUTHORS_DIR / sanitized_name
        author_dir.mkdir(parents=True, exist_ok=True)
        avatar_path = author_dir / "avatar.webp"
        
        if personal_data and personal_data.get('Photo URL') and pd.notna(personal_data['Photo URL']):
             if not avatar_path.exists():
                download_url = get_google_drive_download_url(personal_data['Photo URL'])
                if download_url:
                    download_image(download_url, avatar_path)
        
        if avatar_path.exists():
            img_url = f"/authors/{sanitized_name}/avatar.webp"

        # Build member object
        bio_text = ""
        if personal_data and personal_data.get('Bio'):
            bio_text = str(personal_data.get('Bio'))
            if bio_text.lower() == 'nan':
                bio_text = ""
        
        member_obj = {
            "id": sanitized_name,
            "name": personal_name,
            "role": role_title if role_title and pd.notna(role_title) else (role if role else ""),
            "imgUrl": img_url,
            "initials": get_initials(personal_name),
            "bio": bio_text,
            "email": personal_data.get('Email', '') if personal_data else '',
            "website": personal_data.get('Weblink', '') if personal_data else '',
            "twitter": "", 
            "linkedin": "" 
        }
        
        # Add to appropriate category and team
        if team_name not in categories[main_category_key]["teams"]:
             categories[main_category_key]["teams"][team_name] = []
        
        categories[main_category_key]["teams"][team_name].append(member_obj)

    print(f"✓ Built data structure")

    # Generate HTML
    print("\\n[5/5] Generating HTML...")
    
    content_html = ""
    modals_html = ""

    # Order of categories
    cat_order = ["strategic", "operations", "steering"]

    for cat_key in cat_order:
        cat_data = categories[cat_key]
        cat_details = CATEGORY_DETAILS[cat_key]
        
        cards_html = ""
        
        # Sort teams alphabetically
        sorted_teams = sorted(cat_data["teams"].keys())
        
        for team_name in sorted_teams:
            members = cat_data["teams"][team_name]
            
            # Team Title Card (except for Steering Committee section if desired, but mock shows titles)
            # In the mock, 'Steering Committee' section didn't have a title card, but others did.
            # Let's keep it consistent: Show title card for all teams except if the team name is same as section name in 'Steering Committee'
            
            show_title_card = True
            if cat_key == "steering" and team_name == "Steering Committee":
                show_title_card = False # Or True depending on preference. Mock had no title card for SC members.
            
            # Actually, looking at the mock, the 'Steering Committee' section just lists members.
            # Strategic and Operations have sub-teams with title cards.
            
            if cat_key != "steering":
                bg_class = "teal"
                if cat_key == "operations":
                    bg_class = "slate"
                
                cards_html += TEAM_TITLE_CARD_TEMPLATE.format(
                    name=team_name,
                    bg_class=bg_class
                ).strip()
            
            # Member Cards
            for member in members:
                img_content = ""
                if member["imgUrl"]:
                    img_content = f'<img src="{member["imgUrl"]}" alt="{member["name"]}" class="sc-card-img" />'
                else:
                    # Placeholder for missing image
                    img_content = f'<div class="sc-placeholder">{member["initials"]}</div>'

                cards_html += MEMBER_CARD_TEMPLATE.format(
                    id=member["id"],
                    name=member["name"],
                    role=member["role"],
                    img_content=img_content
                ).strip()

                # Generate Modal for this member
                img_content_large = ""
                if member["imgUrl"]:
                    img_content_large = f'<img src="{member["imgUrl"]}" alt="{member["name"]}" />'
                else:
                    img_content_large = f'<span style="font-size: 2rem; color: #94a3b8; font-weight: 600;">{member["initials"]}</span>'

                modals_html += MODAL_TEMPLATE.format(
                    id=member["id"],
                    name=member["name"],
                    role=member["role"],
                    bio=html.escape(member["bio"] or "Bio coming soon."),
                    img_content_large=img_content_large,
                    social_links=generate_social_links(member)
                ).strip()

        content_html += SECTION_TEMPLATE.format(
            type=cat_key,
            title=cat_details["title"],
            description=cat_details["description"],
            icon=cat_details["icon"],
            cards=cards_html
        ).strip()

    # Assemble full page
    # IMPORTANT: We must not indent the HTML content when inserting it into the template
    full_html = PAGE_TEMPLATE.replace("__CONTENT__", content_html).replace("__MODALS__", modals_html)
    
    # Add Frontmatter and wrap in rawhtml shortcode to prevent Hugo escaping
    full_content = f"""---
title: Steering Committee
type: page
layout: single
---

{{{{< rawhtml >}}}}
{full_html}
{{{{< /rawhtml >}}}}
"""

    # Write to file
    index_file = SC_PAGE_DIR / "index.md"
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(full_content)

    print(f"✓ Created steering committee page: {index_file}")
    
    print("\\n" + "=" * 60)
    print("✓ Successfully generated steering committee page!")
    print("=" * 60)
    print(f"  View page at: http://localhost:1313/about/steering-committee/")

if __name__ == "__main__":
    main()
