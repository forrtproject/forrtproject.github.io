#!/usr/bin/env python3
"""Generate content/clusters/cluster-N/index.md from data/clusters_v4.json (re-run after JSON changes)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "clusters_v4.json"


def toml_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def main() -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    for c in data["clusters"]:
        n = int(c["number"])
        name = c["name"]
        slug = f"cluster-{n}"
        desc = (c.get("description") or "").strip()
        plain = " ".join(desc.split())[:260]
        summary = f"FORRT Cluster {n}: {name}. {plain}".strip()
        if len(summary) > 300:
            summary = summary[:297] + "…"

        title = f"Cluster {n}: {name} — FORRT Open Science Taxonomy"
        heading = f"Cluster {n}: {name}"

        kws = [
            f"FORRT cluster {n}",
            "open science",
            "reproducible research",
            name,
        ]
        kw_toml = ", ".join(json.dumps(k) for k in kws)

        md = f"""+++
type = "clusters"
layout = "cluster"
cluster_number = {n}
title = "{toml_escape(title)}"
heading_title = "{toml_escape(heading)}"
summary = "{toml_escape(summary)}"
description = "{toml_escape(summary)}"
sharing_title = "{toml_escape(title)}"
sharing_description = "{toml_escape(summary)}"

keywords = [ {kw_toml} ]

date = 2024-01-01
draft = false

[sitemap]
  changefreq = "monthly"
  priority = 0.85
+++
"""

        out = ROOT / "content" / "clusters" / slug / "index.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(md, encoding="utf-8")
        print("Wrote", out.relative_to(ROOT))


if __name__ == "__main__":
    main()
