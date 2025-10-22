#!/usr/bin/env python3
"""
Open Research Games Portal - Game Pages Generator

Creates individual Hugo pages for each game with server-side rendered content.
No JavaScript required - everything is generated at build time.

Usage: python3 scripts/open_research_games_portal/generate-game-pages.py
"""

import json
import os
import shutil
from pathlib import Path

def clean_for_yaml(text):
    """Clean text for YAML frontmatter"""
    if not text:
        return ""
    return str(text).replace('"', '\\"').replace('\n', ' ').replace('\r', '')

def create_game_page(game_slug, game_data, output_dir):
    """Create individual game page"""
    game_dir = output_dir / game_slug
    game_dir.mkdir(parents=True, exist_ok=True)
    
    title = game_data.get('title', 'Untitled Game')
    description = game_data.get('description', '')
    
    # Truncate description for meta
    if len(description) > 160:
        description = description[:157] + "..."
    
    # Create frontmatter
    frontmatter = f'''---
title: "{clean_for_yaml(title)}"
type: "open-research-games-portal"
layout: "single"
description: "{clean_for_yaml(description)}"
url: "/games/{game_slug}/"
date: "2025-01-01"
draft: false
---

'''
    
    # Use Hugo shortcode instead of raw HTML to avoid escaping issues
    content = frontmatter + f'{{{{< game-details-static slug="{game_slug}" >}}}}\n'
    
    # Write the file
    index_file = game_dir / "index.md"
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # Load games data
    with open('data/open_research_games.json', 'r', encoding='utf-8') as f:
        games_data = json.load(f)
    
    # Create output directory
    output_dir = Path('content/games_details')
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Create individual pages
    for game_slug, game_data in games_data.items():
        create_game_page(game_slug, game_data, output_dir)
    
    print(f"✅ Created {len(games_data)} individual game pages")
    print(f"URLs like: /games/copyright-the-card-game-id-034/")

if __name__ == "__main__":
    main()
