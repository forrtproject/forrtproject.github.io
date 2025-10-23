---
# FORRT Open Science Games Portal Widget Configuration
# 
# This file configures the main games display widget with filtering capabilities
# The widget displays game cards and provides filtering by FORRT clusters

widget: open_research_games        # Custom widget type
headless: true                     # Don't generate individual page
active: true                       # Widget is active
weight: 20                         # Display order on page
title: FORRT’s Open Science Games Hub  # Widget title
subtitle: ""                       # No subtitle
content:
  page_type: open_research_games   # Page type for filtering
  filter_default: 0                # Default filter (All)
  filter_button:                   # Filter button definitions
    - name: All
      forrt_clusters: "*"
    - name: Replication Crisis and Credibility Revolution
      forrt_clusters: "cluster-1"
    - name: Conceptual and Statistical Knowledge
      forrt_clusters: "cluster-2"
    - name: Ways of Working
      forrt_clusters: "cluster-3"
    - name: Pre-analysis Planning
      forrt_clusters: "cluster-4"
    - name: Transparency and Reproducibility in Computation and Analysis
      forrt_clusters: "cluster-5"
    - name: FAIR Data and Materials
      forrt_clusters: "cluster-6"
    - name: Publication Sharing
      forrt_clusters: "cluster-7"
    - name: Replication and Meta-Research
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

FORRT is excited to launch the Open Research Games Portal – a crowdsourced, pedagogically informed database of games and interactive activities for teaching open and reproducible research practices. This initiative recognizes the power of game-based learning to make complex topics more accessible, memorable, and engaging for learners – from students and early-career researchers to educators and professionals. Whether you're looking for a lighthearted icebreaker or a serious, learning-focused game to integrate into your curriculum, the Portal helps you find what you need.

# What’s in the Portal

We gather extensive information on each game – from metadata and gameplay characteristics to user testimonials, formal evaluations (when available), preparation requirements, and pedagogical suggestions for teaching. This depth is made possible through crowdsourcing: anyone can add missing information and share their experiences with a game, which helps everyone navigate the growing collection of open research games more easily. The Portal serves as an open-access resource offering both digital and physical games that support learning through play, collaboration, and critical thinking.

# Navigate the Portal

You can search and filter games using topic tags, FORRT Clusters, gameplay styles (competitive, collaborative, etc.), and other criteria to find exactly what you're looking for. And importantly, we show you where to find and access these games.

# How to contribute

Use our [Additions Form](https://forms.gle/MSBWR87GchDo8fED7) to add information about games already in the Portal, or the [New Entries Form](https://forms.gle/PXYBrRhXGiZyi8M99) to add games we're missing. You can add any game you know of, even if you haven't played it yourself – the community will fill in the rest!

You can find the Open Research Games Portal here: [FORRT Open Research Games Portal](https://forrtapps.shinyapps.io/open-research-games-portal/)

We're continuing to improve the Portal and would love your feedback on both the database and our forms. Please reach out to [games@forrt.com](games@forrt.com) with any comments or suggestions.

---

{{< games-search >}}
