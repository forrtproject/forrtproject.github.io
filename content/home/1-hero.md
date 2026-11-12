+++
# The home page's sections are drawn by layouts/partials/doors/home/, in order of weight. Each
# file here holds one section's wording and links. A link with a `url` and no `label` takes its
# label from the main menu, so renaming a menu entry renames it here too.
section = "hero"
headless = true
weight = 10

heading = "Better science.<br>Built together."
lede = "FORRT is a community of researchers and educators who develop, share and teach open scholarship, and who work to make science more rigorous, more transparent and more just."

# Three main actions under the intro, then a quieter line on wide screens (`more`), hidden on phones,
# where the header's "Get involved" button and the Take part section cover joining.
[[quick]]
  label = "Teach with open materials"
  url = "resources/"
[[quick]]
  label = "Learn about open scholarship"
  url = "clusters/"
[[quick]]
  label = "Explore replications"
  url = "replication-hub/"
[[more]]
  label = "Join FORRT"
  url = "#take-part"
[[more]]
  label = "Submit a resource"
  url = "contribute/"
+++
