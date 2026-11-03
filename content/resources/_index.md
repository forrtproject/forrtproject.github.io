+++
# The curated resources directory: layouts/resources/list.html. Each resource's own page comes
# from the FORRT Database 2.0 sheet through resource.py, in this folder.
title = "Resources"
type = "resources"
outputs = ["HTML"]  # No feed: the section gained no RSS when it became a list page.

heading = "Teaching resources"
lede = "Open up your teaching. Find, access and reuse materials from a curated collection of %s open scholarship resources."
form_url = "https://docs.google.com/forms/d/e/1FAIpQLSfPceN5opEeauCBSvapoB-ADpH0IoT24XOLfQGaVEF0EJGFOA/viewform"

# Clusters come from `forrt_clusters_new`, comma-separated. A new one not named here still gets
# a filter, under its own spelling, after these.
clusters = [
  "Replication Crisis and Credibility Revolution",
  "Conceptual and Statistical Knowledge",
  "Transparency and Reproducibility in Computation and Analysis",
  "Pre-analysis Planning",
  "Ways of Working",
  "Research Integrity",
  "Academic Structures and Institutions",
  "Replication and Meta-Research",
  "Publication Sharing",
  "FAIR Data and Materials",
  "Qualitative Research",
]

# How the sheet's free-text values become the directory's filters. Values are compared in lower
# case. A material type listed nowhere shows as "Other", so a new value cannot lose a resource.
[[type_groups]]
  label = "Reading"
  values = ["reading", "paper", "primary source", "article", "blog", "chapter", "textbook", "book", "online book", "primer", "summaries", "glossary", "handbook"]
[[type_groups]]
  label = "Student guide"
  values = ["student guide", "library guide", "guide", "tutorial", "data repository guide"]
[[type_groups]]
  label = "Teaching strategy"
  values = ["teaching/learning strategy", "teaching guide"]
[[type_groups]]
  label = "Syllabus"
  values = ["syllabus", "syllabi"]
[[type_groups]]
  label = "Full course"
  values = ["full course", "unit of study"]
[[type_groups]]
  label = "Module"
  values = ["module", "collection of training modules", "training"]
[[type_groups]]
  label = "Lesson"
  values = ["lesson", "lesson plan"]
[[type_groups]]
  label = "Lecture"
  values = ["lecture", "lecture notes", "lecture slides", "slides", "presentation slides"]
[[type_groups]]
  label = "Video"
  values = ["video", "videos", "seminar recording", "interview"]
[[type_groups]]
  label = "Podcast"
  values = ["podcast", "podcast and transcript", "podcast episodes"]
[[type_groups]]
  label = "Activity"
  values = ["activity/lab", "homework/assignment", "asssessment", "case study", "game", "workshop", "workshop guide"]
[[type_groups]]
  label = "Interactive"
  values = ["interactive", "simulation"]
[[type_groups]]
  label = "R code"
  values = ["r code"]
[[type_groups]]
  label = "Data or tool"
  values = ["data set", "public data file", "website", "tool", "github repository", "resource navigator", "infrastructure resource navigator", "search engine/resource navigation tool", "ai-search engine"]

[[level_groups]]
  label = "Undergraduate"
  values = ["college / upper division (undergraduates)", "college/ upper division", "college / upper division", "community college / lower division"]
[[level_groups]]
  label = "Graduate / Professional"
  values = ["graduate / professional", "graduate/professional"]
[[level_groups]]
  label = "Career / Technical"
  values = ["career /technical"]
[[level_groups]]
  label = "Adult education"
  values = ["adult education", "adult-education"]

+++

FORRT's curated resources database now hosts over 1,400 open science materials, thanks to key partnerships. Initially boosted by over 60% by the [Open Science Knowledge Base](https://www.cos.io/communities/stem-education-hub) ([see also OSKB's OER commons page](https://oercommons.org/hubs/OSKB))—[a Center for Open Science (COS)](http://cos.io/) initiative. Recently, our collection grew by 30% through contributions from [JUST-OS](https://www.just-os.org), increasing resources from 1,140 to 1,402. OSKB's work involved almost 300 hours (valued at €10,000) and JUST-OS’s work involved 150 hours (valued around €5,000), reflecting significant effort and dedication. COS, OSKB, JUST-OS and FORRT forged partnerships to promote open and reproducible research practices, enabling the scientific community to build upon each other’s work and advance knowledge collaboratively. Learn more about it FORRT’s and OSKB’s partnership [in the COS’s announcement](https://www.cos.io/blog/forrt-and-cos-join-forces-to-foster-open-and-reproducible-research-training).
