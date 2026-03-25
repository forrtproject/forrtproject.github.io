+++
# FORRT Clusters — full taxonomy (SEO + landing)
# Use _index.md (not index.md) so Hugo treats /clusters/ as a section and builds /clusters/cluster-N/ pages.
type = "clusters"
layout = "single"
# `title` → <title>, Open Graph (via sharing_title), JSON-LD — not the on-page H1
title = "Open Science & Reproducible Research Clusters — FORRT Taxonomy"
# Visible page heading (short); reverse of pre-SEO "FORRT's Clusters"
heading_title = "FORRT's Clusters"

# Used in <meta name="description"> and Open Graph (Academic theme reads `summary` first)
summary = "Browse all 11 FORRT open science clusters in one page: replicability and the credibility revolution, FAIR data, transparency, pre-registration, meta-research, replication, qualitative open science, research integrity, and teaching resources. Interactive taxonomy with sub-clusters and curated references for educators and mentors."

description = "Browse all 11 FORRT open science clusters in one page: replicability and the credibility revolution, FAIR data, transparency, pre-registration, meta-research, replication, qualitative open science, research integrity, and teaching resources. Interactive taxonomy with sub-clusters and curated references for educators and mentors."

# Match `title` so og:title is the full SEO phrase (not shortened)
sharing_title = "Open Science & Reproducible Research Clusters — FORRT Taxonomy"
sharing_description = "All 11 FORRT clusters: open and reproducible science for teaching—replicability, FAIR data, transparency, meta-research, research integrity, and more, with sub-clusters and references."

# Page bundle image → og:image, twitter previews, etc. (see site_head sharing_image_resource)
sharing_image_resource = "FORRT_Clusters.webp"
sharing_image_alt = "Diagram of FORRT's eleven open science clusters taxonomy"

keywords = [ "open science clusters", "reproducible research", "FORRT taxonomy", "replicability", "open scholarship", "research transparency", "FAIR data", "meta-research", "research integrity", "teaching open science" ]

draft = false

[sitemap]
  changefreq = "monthly"
  priority = 0.9
+++
