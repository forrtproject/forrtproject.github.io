+++
# Compact subscribe band, placed right after News & Announcements (weight 30)
# so it reads as part of that block rather than its own separate section.

widget = "blank"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 31  # Order that this section will appear.

[design]
  columns = "1"

[design.spacing]
  # Customize the section spacing. Order is top, right, bottom, left.
  padding = ["0px", "0", "44px", "0"]
+++

<div class="nl-band">
  <p class="nl-band-label">Subscribe to our newsletter to get the latest news about FORRT's initiatives</p>
  {{< subscribe >}}
</div>
