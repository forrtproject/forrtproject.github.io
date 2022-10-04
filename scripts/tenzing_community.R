library(tidyverse)

# Import -----------------------------------------------------
# main sheet with all the projects
googlesheet_id <- "12MFD4-kouxg6NuQU_aBw_KHo7zs4d22XEn20iS11neE"
url_metasheet <-
  paste0("https://docs.google.com/spreadsheets/d/",
         googlesheet_id,
         "/export?format=csv")
tenzing_projects <- read_csv(url_metasheet)

tenzing_projects$tenzing <- tenzing_projects$tenzing %>%
  str_replace(pattern = "edit.*", replacement = "export?format=csv")

# import all projects based on main sheet

prj_extract <- function(tenz, handle, prj) {
  dat <- read_csv(tenz,
                  skip_empty_rows = TRUE,
                  name_repair = janitor::make_clean_names)
  # hacky way (unlist) of keeping the col num, brainfarting atm
  dat <-
    dat %>% mutate(
      prj_name = unlist(prj[prj['handle'] == handle, 'name']),
      prj_icon = unlist(prj[prj['handle'] == handle, 'icon']),
      prj_citation = unlist(prj[prj['handle'] == handle, 'citation']),
      # prj_doi = prj['doi'], # TBD later
      .before = 1
    )
}


tenzing_projects$tenzing <- tenzing_projects$tenzing %>% set_names(tenzing_projects$handle)

df <- map2_dfr(
  tenzing_projects$tenzing,
  tenzing_projects$handle,
  .f = prj_extract,
  tenzing_projects,
  # tenzing_projects$citation,
  .id = "prj_handle"
)

# clean n wrangle --------------------------------------------------

# Remove the huge amount of empty rows (why?) coming from Sheets.
df <- df %>% drop_na(firstname)

# Remove first-author mark (*)
df$surname <- str_squish(df$surname) %>%
  str_remove("\\*")
df$orcid_i_d <- str_squish(df$orcid_i_d) %>%
  str_remove("https://orcid.org/")

# find duplicates based on 3 main ids
dupes <- df %>%
  group_by(orcid_i_d,
           firstname,
           surname) %>%
  nest() %>%
  janitor::get_dupes(firstname,
                     surname) %>% drop_na()

# make sure orcid gets replace if a dupe was found
df <- mutate(df,
             orcid_i_d = if_else(firstname %in% dupes$firstname,
                                 dupes$orcid_i_d,
                                 orcid_i_d))

# nest data per person, done this way to make it easy to showcase
# on the website
nested_df <- df %>%
  group_by(orcid_i_d,
           firstname,
           surname) %>%
  nest()


nested_df <- nested_df %>% rename(orcid = orcid_i_d,
                                  projects = data)

# x <- jsonlite::toJSON(nested_by_id, pretty = T, auto_unbox = T, prett)

jsonlite::write_json(nested_df, '../data/tenzing_prototype.json', auto_unbox = TRUE)
