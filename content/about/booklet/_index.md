+++
title = "FORRT Booklet"
type = "widget_page"
headless = false
url = "/booklet"
phone_toc = false  # Two short sections; a contents list on phones would push the flipbook off the first screen
summary = "Learn more about FORRT in the interactive flipbook below: If you prefer, you can also download the PDF directly."

# The booklet's pages on each area, from its table of contents, shown beside the flipbook
# (layouts/shortcodes/booklet_contents.html). A page with a `url` links to its page on this site; `page` is the
# page of the booklet it is on, which turns the flipbook to it.
[[inside]]
  key = "edu"
  title = "Education & Pedagogy"
  pages = [
    { title = "Curated resources", page = 4, url = "resources/" },
    { title = "Glossary", page = 4, url = "glossary/" },
    { title = "Lesson plans", page = 5, url = "lesson-plans/" },
    { title = "Open Research Games Portal", page = 5, url = "open-research-games-portal/" },
    { title = "JUST-OS", page = 6, url = "just_os_chatbot/" },
  ]
[[inside]]
  key = "res"
  title = "Metascience & Research"
  pages = [
    { title = "Replications: FReD and the Annotator", page = 7, url = "replication-hub/" },
    { title = "Handbook for reproduction and replication studies", page = 8, url = "https://forrt.org/replication-handbook/" },
    { title = "Impact of open science on students", page = 9, url = "impact/" },
    { title = "Replication Research (R2) journal", page = 9, url = "https://replicationresearch.org" },
  ]
[[inside]]
  key = "jus"
  title = "Social Justice & DEIA in Academia"
  pages = [
    { title = "Academic Wheel of Privilege", page = 10, url = "awop/" },
    { title = "Citation politics", page = 11, url = "citation-politics/" },
    { title = "Team Neurodiversity", page = 12, url = "neurodiversity/" },
  ]
[[inside]]
  key = "com"
  title = "Community & Sustainability"
  pages = [
    { title = "Credit and contributorship", page = 13, url = "contributors/" },
    { title = "Process for projects", page = 13 },
    { title = "[FAIR](/glossary/english/fair_principles/) and CARE", page = 14 },
    { title = "FORRT community and community map", page = 15, url = "community-map/" },
  ]
+++

<!-- On a wide screen the flipbook stands on the left, with the introduction, "Open the PDF" and the booklet's contents
     beside it (assets/css/doors/sections.css, "The booklet"); on a phone the contents follow the flipbook, with a
     jump to them beside "Open the PDF". -->
<div class="booklet-layout">
<div class="booklet-intro">

A 20-page introduction to FORRT: what it is, projects from each of its four areas, and its vision for FORRT's future.

</div>
<div class="booklet-viewer">

{{< dearflip id="forrt-booklet" pdf="/files/FORRT_Booklet(A5).pdf" contents="#inside-the-booklet" contents_label="Inside the booklet" >}}

</div>
<div class="booklet-index">

## Inside the booklet

{{< booklet_contents book="forrt-booklet" pdf="/files/FORRT_Booklet(A5).pdf" >}}

</div>
</div>

## Where next

{{< action_cards >}}
Get involved | Join FORRT's Slack, find a project or get the newsletter | /about/get-involved/
About FORRT | Our goals, our history and a 5-minute video introduction | /about/us/
Meet the teams | The teams and projects that make up FORRT | /about/teams/
{{< /action_cards >}}
