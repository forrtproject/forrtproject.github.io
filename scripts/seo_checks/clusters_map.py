"""The clusters map is named, counted, hidden where decorative and closed until opened.

In the /clusters/ map, the drawing (svg.clusters-map__ring) is aria-hidden and
holds no links; the overview's cluster names (a.clusters-map__tag) each have a
target and visible text, as many as the clusters listed below the map; every
sub-cluster panel (.clusters-map__panel) is inert or hidden, so its links are tab
stops only once opened; and every in-page link in the map reaches an id on the
page.
"""

import os
from html.parser import HTMLParser
from urllib.parse import unquote


class ClustersMapParser(HTMLParser):
    """Ids on the page, the drawing's attributes and links, the overview's cluster names and panels,
    and every in-page link in the map."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.arts, self.art_links, self.map_hrefs = set(), [], [], []
        self.names, self.panels = [], []  # names: [href, text of its tag-name span, aria-hidden] of each a.clusters-map__tag
        self.listed = 0  # clusters in the linked list below the map (li[data-cluster] outside it)
        self.in_text = 0  # depth inside the current name's span.clusters-map__tag-name, 0 outside it
        self.stack = []  # (tag, in_art, in_map) for open elements
        self.in_name = 0  # depth of open elements inside the current cluster name, 0 outside one

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        classes = (attrs.get("class") or "").split()
        in_art = (self.stack[-1][1] if self.stack else False) or (tag == "svg" and "clusters-map__ring" in classes)
        in_map = (self.stack[-1][2] if self.stack else False) or "clusters-map" in classes
        if tag == "svg" and "clusters-map__ring" in classes:
            self.arts.append(attrs)
        if tag == "a" and in_art:
            self.art_links.append(attrs)
        if tag == "a" and in_map and (attrs.get("href") or "").startswith("#"):
            self.map_hrefs.append(attrs["href"])
        if in_map and "clusters-map__panel" in classes:
            self.panels.append(attrs)
        void = tag in ("path", "rect", "circle", "image", "tspan", "br", "img", "input", "meta", "link")
        if tag == "li" and "data-cluster" in attrs and not in_map:
            self.listed += 1
        if tag == "a" and "clusters-map__tag" in classes:
            self.names.append([(attrs.get("href") or "").strip(), "", attrs.get("aria-hidden") == "true"])
            self.in_name = 1
        elif self.in_name and not void:
            self.in_name += 1
            if self.in_text or "clusters-map__tag-name" in classes:
                self.in_text += 1
        if not void:
            self.stack.append((tag, in_art, in_map))

    def handle_data(self, data):
        if self.in_text:
            self.names[-1][1] += data

    def handle_endtag(self, tag):
        if self.in_text:
            self.in_text -= 1
        if self.in_name:
            self.in_name -= 1
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break


def check(site):
    path = os.path.join(site.public_dir, "clusters", "index.html")
    if not os.path.exists(path):
        return []
    parser = ClustersMapParser()
    with open(path, encoding="utf-8", errors="replace") as handle:
        parser.feed(handle.read())
    failures = []
    if not parser.arts:
        failures.append("clusters/index.html: no svg.clusters-map__ring")
    # The drawing only repeats the names over it, so it is hidden from assistive technology and has no links.
    failures += ["clusters/index.html: the drawing is not aria-hidden" for art in parser.arts if art.get("aria-hidden") != "true"]
    if parser.art_links:
        failures.append("clusters/index.html: %d links in the drawing, e.g. %s" % (len(parser.art_links), parser.art_links[0].get("href", "")))
    # The overview: each cluster name is a named link, and its panel's links are out of the tab order until it opens.
    if not parser.names:
        failures.append("clusters/index.html: no cluster names (a.clusters-map__tag) in the overview")
    if parser.names and parser.listed and len(parser.names) != parser.listed:
        failures.append("clusters/index.html: the overview names %d clusters, the list below it %d" % (len(parser.names), parser.listed))
    silent = [href for href, _, hidden in parser.names if hidden]
    if silent:
        failures.append("clusters/index.html: %d cluster names in the overview are aria-hidden, e.g. %s" % (len(silent), silent[0]))
    blank = [href for href, text, _ in parser.names if not href or not text.strip()]
    if blank:
        failures.append("clusters/index.html: %d cluster names in the overview lack a target or text, e.g. %r" % (len(blank), blank[0]))
    open_panels = [p.get("id", "") for p in parser.panels if "inert" not in p and "hidden" not in p]
    if open_panels:
        failures.append("clusters/index.html: %d sub-cluster panels are neither inert nor hidden, e.g. %s" % (len(open_panels), open_panels[0]))
    missing = sorted({h for h in parser.map_hrefs if unquote(h[1:]) not in parser.ids})
    failures += ["clusters/index.html: %s has no target" % h for h in missing]
    return failures
