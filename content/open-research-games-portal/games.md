---
# Open Research Games Portal Widget Configuration
# 
# This file configures the main games display widget with filtering capabilities
# The widget displays game cards and provides filtering by FORRT clusters

widget: open_research_games        # Custom widget type
headless: true                     # Don't generate individual page
active: true                       # Widget is active
weight: 20                         # Display order on page
title: Open Research Games Portal  # Widget title
subtitle: ""                       # No subtitle
content:
  page_type: open_research_games   # Page type for filtering
  filter_default: 0                # Default filter (All)
  filter_button:                   # Filter button definitions
    - name: All
      forrt_clusters: "*"
    - name: Replication Crisis
      forrt_clusters: "cluster-1"
    - name: Statistical Knowledge
      forrt_clusters: "cluster-2"
    - name: Ways of Working
      forrt_clusters: "cluster-3"
    - name: Pre-registration
      forrt_clusters: "cluster-4"
    - name: Reproducible Analysis
      forrt_clusters: "cluster-5"
    - name: FAIR Data
      forrt_clusters: "cluster-6"
    - name: Open Access
      forrt_clusters: "cluster-7"
    - name: Meta-Research
      forrt_clusters: "cluster-8"
design:
  columns: "1"
  view: 3
  flip_alt_rows: true
  background: {}
advanced:
  css_style: ""
  css_class: ""
---

Welcome to the **Open Research Games Portal** - your gateway to learning open science through play! Our curated collection features **{{< games-count >}}** educational games that make complex research concepts accessible and engaging.

### ***Discover & Play***

🎮 **Interactive Learning**: Games that teach research methods, statistical thinking, and open science practices through hands-on experience.

🎯 **For Everyone**: From high school students to seasoned researchers, find games tailored to your learning level.

🔬 **Evidence-Based**: Each game is designed with pedagogical principles and learning objectives in mind.

### ***How to Use This Portal***

- **Browse**: Explore all games using the cards below
- **Filter**: Use the FORRT cluster buttons to find games by topic
- **Search**: Enter keywords to find specific games by title, gameplay, topics, or FORRT clusters
- **Play**: Click "Play Now" to start gaming immediately
- **Learn More**: Click "Details" to see comprehensive game information

Ready to transform your understanding of open science? Let's play and learn together!

---

{{< games-search >}}
