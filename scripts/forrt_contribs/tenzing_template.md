+++
# A Demo section created with the Blank widget.
# Any elements can be added in the body: https://sourcethemes.com/academic/docs/writing-markdown-latex/
# Add more sections by duplicating this file and customizing to your requirements.

widget = "blank"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 10  # Order that this section will appear.

title = "Contributors"
subtitle = ""

[design]
  # Choose how many columns the section has. Valid values: 1 or 2.
  columns = "1"

[design.background]
  # Apply a background color, gradient, or image.
  #   Uncomment (by removing `#`) an option to apply it.
  #   Choose a light or dark text color by setting `text_color_light`.
  #   Any HTML color name or Hex value is valid.

  # Background color.
  # color = "#fefdf6"
  # color = "#69b3a2" # greenish
  
  # Background gradient.
  # gradient_start = "DeepSkyBlue"
  # gradient_end = "SkyBlue"
  
  # Background image.
  # image = "headers/bubbles-wide.webp"  # Name of image in `static/img/`.
  # image_darken = 0.6  # Darken the image? Range 0-1 where 0 is transparent and 1 is opaque.
  # image_size = "cover"  #  Options are `cover` (default), `contain`, or `actual` size.
  # image_position = "center"  # Options include `left`, `center` (default), or `right`.
  # image_parallax = true  # Use a fun parallax-like fixed background effect? true/false

  # Text color (true=light or false=dark).
  text_color_light = false

  # Choose how many columns the section has. Valid values: '1' or '2'.
# columns = '2'

[design.spacing]
  # Customize the section spacing. Order is top, right, bottom, left.
  padding = ["60px", "0", "60px", "0"]

[advanced]
 # Custom CSS. 
 css_style = ""
 
 # CSS class.
 css_class = ""

+++

<style>

.contributor-group {
    margin-bottom: 1.5em;
    scroll-margin-top: 80px; 
}

.contributions-list {
    padding-left: 1.5em;
}

.contribution {
    margin-bottom: 0.5em;
}

#clear-filters {
  background-color: #8e0000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5em;
}

#clear-filters:hover {
  background-color: #6a0000;
}

#filter-menu {
  margin-bottom: 2em;
  padding: 15px;
  background-color: transparent;
  border: 2px solid #8e0000;
  border-left-width: 6px;
  border-radius: 4px;
}

#filter-menu h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #8e0000;
  font-size: 1.2em;
  font-weight: bold;
  display: inline-block;
  padding-bottom: 2px;
}

.filter-grid {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 15px;
  align-items: start;
}

@media (max-width: 47.9375em) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
}

.filter-field {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.filter-field legend {
  display: block;
  width: auto;
  margin-bottom: 5px;
  padding: 0;
  border: 0;
  font-size: inherit;
  font-weight: bold;
}

.filter-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.filter-field input[type="search"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.filter-options {
  max-height: 12em;
  margin-top: 6px;
  padding: 4px 8px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-field .filter-option {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  padding: 3px 0;
  font-weight: normal;
  cursor: pointer;
}

.filter-field .filter-option[hidden] {
  display: none;
}

.filter-option input {
  flex: none;
  margin-top: 4px;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.filter-chip {
  padding: 2px 10px;
  border: 1px solid #8e0000;
  border-radius: 14px;
  background-color: transparent;
  color: #8e0000;
  font-size: 13px;
  cursor: pointer;
}

.filter-chip:hover {
  background-color: #8e0000;
  color: white;
}

.filter-status {
  margin: 4px 0 0;
  font-size: 0.85em;
}

#apply-filter {
  background-color: #8e0000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#apply-filter:hover {
  background-color: #6a0000;
}

#filter-results {
  font-size: 0.9em;
  margin-top: 0.7em;
}

.filter-title {
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 2px solid #8e0000;
  display: inline-block;
  padding-bottom: 2px;
  margin-bottom: 10px;
}

#filter-collapsed {
  margin-bottom: 2em;
  padding: 10px 15px;
  background-color: transparent;
  border: 2px solid #8e0000;
  border-left-width: 6px;
  border-radius: 4px;
}

#filter-collapsed a {
  color: #8e0000;
  font-weight: bold;
  text-decoration: none;
}

#filter-collapsed a:hover {
  text-decoration: underline;
}

</style>

<script>
// Remove hash after scroll to avoid JS reloading the page when hovering over the navbar
if (window.location.hash) {
    setTimeout(function() {
        history.replaceState(null, null, ' ');
    }, 1000);
}
</script>


------------

<center>
 
FORRT is driven by a **large and diverse community of contributors** that shape one or more of our projects. Below you can see everyone's scientific contributions in detail. Note that many also contribute to maintaining our community - we are equally grateful for their efforts. You can find out more about the scale of contributions at FORRT, including an interactive network graph, on our <a href="/contributor-analysis">contributor analysis</a> page.

</center>

------------


<div id="filter-menu">
  <h3>Filter Contributors</h3>
  <div class="filter-grid">
    <fieldset class="filter-field">
      <legend>Project</legend>
      <label class="filter-sr-only" for="project-search">Search projects</label>
      <input type="search" id="project-search" placeholder="Search projects…" autocomplete="off" aria-controls="project-options">
      <div id="project-selected" class="filter-chips"></div>
      <div id="project-options" class="filter-options" role="group" aria-label="Projects"></div>
      <p id="project-status" class="filter-status" aria-live="polite"></p>
    </fieldset>
    <fieldset class="filter-field">
      <legend>Role</legend>
      <label class="filter-sr-only" for="role-search">Search roles</label>
      <input type="search" id="role-search" placeholder="Search roles…" autocomplete="off" aria-controls="role-options">
      <div id="role-selected" class="filter-chips"></div>
      <div id="role-options" class="filter-options" role="group" aria-label="Roles"></div>
      <p id="role-status" class="filter-status" aria-live="polite"></p>
    </fieldset>
    <div class="filter-field">
      <button id="apply-filter">Apply Filter</button>
    </div>
  </div>
  <div id="filter-results" style="display: none;">
    <p class="filter-title">Filtered Results:</p>
    <div id="filter-info"></div>
    <button id="clear-filters">Reset Filter</button>
  </div>
</div>

<div id="filtered-view" style="display: none;"></div>

<ul id="contributor-list">

<!-- tenzing.py will insert <li> items here -->


