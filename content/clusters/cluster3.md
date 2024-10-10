+++
# A Demo section created with the Blank widget.
# Any elements can be added in the body: https://sourcethemes.com/academic/docs/writing-markdown-latex/
# Add more sections by duplicating this file and customizing to your requirements.

widget = "blank"  # See https://sourcethemes.com/academic/docs/page-builder/
headless = true  # This file represents a page section.
active = true  # Activate this widget? true/false
weight = 10  # Order that this section will appear.

title = "Cluster 3: Reproducible analyses"
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
  # color = "red"
  color = "#DAD5DD" 

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

[design.spacing]
  # Customize the section spacing. Order is top, right, bottom, left.
  padding = ["60px", "0", "60px", "0"]

[advanced]
 # Custom CSS. 
 css_style = "font-size: 1rem;"
 
 # CSS class.
 css_class = ""
+++

### Description

Attainment of the *how-to* basics of reproducible reports and analyses. It requires students to move towards transparent and scripted analysis practices. There are 6 sub-clusters which aim to further parse the learning and teaching process:

* Strengths of reproducible pipelines.
* Scripted analyses compared with GUI.
* Data wrangling.
* Programming reproducible data analyses.
* Open source and free software.
* Tools to check yourself and others.

<br>

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="C3S1-tab" data-toggle="tab" href="#C3S1" role="tab" aria-controls="C3S1"
      aria-selected="true">Reproducible pipelines</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="C3S2-tab" data-toggle="tab" href="#C3S2" role="tab" aria-controls="C3S2"
      aria-selected="false">Scripted Analyses</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="C3S3-tab" data-toggle="tab" href="#C3S3" role="tab" aria-controls="C3S3"
      aria-selected="false">Data wrangling</a>
  </li>
    <li class="nav-item">
    <a class="nav-link" id="C3S4-tab" data-toggle="tab" href="#C3S4" role="tab" aria-controls="C3S4"
      aria-selected="false">Reproducible Analyses</a>
  </li>
    <li class="nav-item">
    <a class="nav-link" id="C3S5-tab" data-toggle="tab" href="#C3S5" role="tab" aria-controls="C3S5"
      aria-selected="false">Open source</a>
  </li>
    <li class="nav-item">
    <a class="nav-link" id="C3S6-tab" data-toggle="tab" href="#C3S6" role="tab" aria-controls="C3S6"
      aria-selected="false">Tools</a>
  </li>
</ul>

<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="C3S1" role="tabpanel" aria-labelledby="C3S1-tab"><br>

## Strengths of reproducible pipelines.

***Automating data analysis to make the process easier***

* Gandrud, C. (2016). Reproducible research with R and R Sstudio. New York; CRC Press 

* Wilson G, Bryan J, Cranston K, Kitzes J, Nederbragt L, et al. (2017) Good enough practices in scientific computing. PLOS Computational Biology 13(6): e1005510. https://doi.org/10.1371/journal.pcbi.1005510

* [Reproducible Research in R Workshop Overview](https://datacarpentry.org/rr-workshop/)

* [Monash's](https://github.com/MonashDataFluency) Data Fluency [Reproducible Research in R (RRR)](https://monashdatafluency.github.io/r-rep-res/index.html)

* [ProjectTier](https://www.projecttier.org) 

<br>
</div>
  <div class="tab-pane fade" id="C3S2" role="tabpanel" aria-labelledby="C3S2-tab"><br>

## Scripted analyses compared with GUI.

***Writing analyses in programming language compared to performing them with a point-and-click menu.***

* Gandrud, C. (2016). Reproducible research with R and R Sstudio. New York; CRC Press 

<br>
</div>
  <div class="tab-pane fade" id="C3S3" role="tabpanel" aria-labelledby="C3S3-tab"><br>

## Data wrangling

***Processing and restructuring data so that it is more useful for analyse.***

Nick Fox's [Writing Reproducible Scientific Papers in R](https://www.youtube.com/playlist?list=PLmvNihjFsoM5hpQdqoI7onL4oXDSQ0ym8)

PsuTeachR's [Data Skills for Reproducible Science](https://psyteachr.github.io/msc-data-skills/)

<br>
</div>
  <div class="tab-pane fade" id="C3S4" role="tabpanel" aria-labelledby="C3S4-tab"><br>

## Programming reproducible data analyses

***Making sure anyone can reproduce analyses through things like well-commented scripts, writing codebooks, etc.***

* Gandrud, C. (2016). Reproducible research with R and R Sstudio. New York; CRC Press 

* Wilson, G., Bryan, J., Cranston, K., Kitzes, J., Nederbragt, L., & Teal, T. K. (2017). Good enough practices in scientific computing. PLoS computational biology, 13(6). e1005510. https://doi.org/10.1371/journal.pcbi.1005510

* [Open Stats Lab](https://sites.trinity.edu/osl/)

* [Software Carpentry](https://software-carpentry.org/)

* [Learning statistics with R: A tutorial for psychology students and other beginners](https://learningstatisticswithr.com/book/)

<br>
</div>
  <div class="tab-pane fade" id="C3S5" role="tabpanel" aria-labelledby="C3S5-tab"><br>

## Open source and free software.

* Chao, L. (2009). Utilizing open source tools for online teaching and learning Information Science. Hershey, PA: Information Science Reference.

<br>
</div>
  <div class="tab-pane fade" id="C3S6" role="tabpanel" aria-labelledby="C3S6-tab"><br>

## Tools to check yourself and others

***Includes tools such as statcheck.io, GRIM, and SPRITE***

* Brown, N. J., & Heathers, J. A. (2016). The GRIM test: A simple technique detects numerous anomalies in the reporting of results in psychology. Social Psychological and Personality Science, 1948550616673876. http://journals.sagepub.com/doi/pdf/10.1177/1948550616673876

* Nuijten, M. B., Van Assen, M. A. L. M., Hartgerink, C. H. J., Epskamp, S., & Wicherts, J. M. (2017). The validity of the tool “statcheck” in discovering statistical reporting inconsistencies. Preprint retrieved from https://psyarxiv.com/tcxaj/.

* van der Zee, T., Anaya, J., & Brown, N. J. (2017). Statistical heartburn: An attempt to digest four pizza publications from the Cornell Food and Brand Lab. BMC Nutrition, 3(1), 54. DOI 10.1186/s40795-017-0167-x 


<br>
</div>
</div>
