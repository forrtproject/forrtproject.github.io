+++
# A Projects section created with the Portfolio widget.
widget = "resource"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 65  # Order that this section will appear.

title = "Curated resources"
subtitle = ""

[content]
  # Page type to display. E.g. project.
  page_type = "curated_resources"
  
  # Filter toolbar (optional).
  # Add or remove as many filters (`[[content.filter_button]]` instances) as you like.
  # To show all items, set `tag` to "*".
  # To filter by a specific tag, set `tag` to an existing tag name.
  # To remove toolbar, delete/comment all instances of `[[content.filter_button]]` below.
  
  # Default filter index (e.g. 0 corresponds to the first `[[filter_button]]` instance below).
  filter_default = 0
  
  [[content.filter_button]]
    name = "All"
    FORRT_Clusters = "*"

  [[content.filter_button]]
    name = "Reproducible Analyses"
    FORRT_Clusters = "Reproducible Analyses"

  [[content.filter_button]]
    name = "Open Data and Materials"
    FORRT_Clusters = "Open Data and Materials"

  [[content.filter_button]]
    name = "Reproducibility and Replicability Knowledge"
    FORRT_Clusters = "Reproducibility and Replicability Knowledge"
  
  [[content.filter_button]]
    name = "Replication Research"
    FORRT_Clusters = "Replication Research"

  [[content.filter_button]]
    name = "Conceptual and Statistical Knowledge"
    FORRT_Clusters = "Conceptual and Statistical Knowledge"
  [[content.filter_button]]
    name = "Preregistration"
    FORRT_Clusters = "Preregistration"
  
[design]
  # Choose how many columns the section has. Valid values: 1 or 2.
  columns = "1"

  # Toggle between the various page layout types.
  #   1 = List
  #   2 = Compact
  #   3 = Card
  #   5 = Showcase
  view = 1

  # For Showcase view, flip alternate rows?
  flip_alt_rows = false

[design.background]
  # Apply a background color, gradient, or image.
  #   Uncomment (by removing `#`) an option to apply it.
  #   Choose a light or dark text color by setting `text_color_light`.
  #   Any HTML color name or Hex value is valid.
  
  # Background color.
  # color = "navy"
  
  # Background gradient.
  # gradient_start = "DeepSkyBlue"
  # gradient_end = "SkyBlue"
  
  # Background image.
  # image = "background.jpg"  # Name of image in `static/media/`.
  # image_darken = 0.6  # Darken the image? Range 0-1 where 0 is transparent and 1 is opaque.

  # Text color (true=light or false=dark).
  # text_color_light = true  
  
[advanced]
 # Custom CSS. 
 css_style = ""
 
 # CSS class.
 css_class = ""
+++
There are more than 700 resources submitted so far in our database. We are currently curating a new and improved version that is compliant with OER Commons for greater findability, accessibility, interoperability, and reusability (FAIR) of these resources.


<br>

If you notice there is an educational resource, research article or pedagocial tool missing in our databased, please consider adding it [here on FORRT's resource submission form](https://docs.google.com/forms/d/e/1FAIpQLSdvMWSxzw3sGTTY1eYIs-nRZoy3ogQ_3Diel-PUDw1Z3pen6w/viewform).

<br>

***

{{< staticsearch >}}