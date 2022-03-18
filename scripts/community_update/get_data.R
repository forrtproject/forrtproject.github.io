# Setup
if (!require("data.table")) install.packages("data.table"); library("data.table")
if (!require("dplyr")) install.packages("dplyr"); library("dplyr")
#if (!require("googlesheets4")) install.packages("googlesheets4"); library("googlesheets4")
if (!require("future.apply")) install.packages("future.apply"); library("future.apply")
if (!require("jsonlite")) install.packages("jsonlite"); library("jsonlite")
if (!require("stringi")) install.packages("stringi"); library("stringi")
if (!require("stringr")) install.packages("stringr"); library("stringr")
if (!require("tidyr")) install.packages("tidyr"); library("tidyr")

# Fetch sources
#df.tenzing <- read_json("tenzing_sheets.json", simplifyVector = T)
#df.tenzing <- read.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vT9bspziBFQ5vi1eiBZ0kv1mQDq4DrdZJMzizww2B9Kzh_0cByWuapbsyM5xetsByXlUt7uqIt-ruzk/pub?output=csv")

googlesheet_id <- "12MFD4-kouxg6NuQU_aBw_KHo7zs4d22XEn20iS11neE"
url_metasheet <- paste0("https://docs.google.com/spreadsheets/d/", googlesheet_id, "/export?format=csv")
df.tenzing <- read.csv(url_metasheet, stringsAsFactors = F, encoding = 'UTF-8')

# Fetch data
future_apply(df.tenzing, 1, function(row) {
  
  #data <- googlesheets4::read_sheet(row["tenzing"], sheet = "Sheet1")
  data <- read.csv(sub(pattern = "edit.*", replacement = "export?format=csv", x = row["tenzing"]),
                   stringsAsFactors = F, encoding = 'UTF-8')
  res <- data #data[rowSums(is.na(data)) != max(rowSums(is.na(data))),]
  res$handle <- row["handle"]
  
  return(res)
}) -> list.df.tenzing

# Aggregate tenzings
tenzing <- as.data.frame(data.table::rbindlist(list.df.tenzing, fill = T))

# Clean up
tenzing["ORCID.iD"] <- sapply(tenzing["ORCID.iD"], gsub, pattern = "https://orcid.org/", replacement = "")
#tenzing["Surname"] <- sapply(tenzing["Surname"], gsub, pattern = "\\*", replacement = "") # We need go get rid of the asterisks later
tenzing["Twitter.handles"] <- sapply(tenzing["Twitter.handles"], tolower)
tenzing["Email.address"] <- sapply(tenzing["Email.address"], tolower)
tenzing <- mutate_if(tenzing, is.character, trimws)

# Create entities
valid_ids <- tenzing[!(is.na(tenzing["Email.address"]) | 
                               (tenzing["Email.address"] == "")) |
                         !(is.na(tenzing["Twitter.handles"]) | 
                             (tenzing["Twitter.handles"] == "")) |
                         !(is.na(tenzing["ORCID.iD"]) | 
                             (tenzing["ORCID.iD"] == "")),]

future_apply(valid_ids, 1, function(row) {
  
  orcid <- row["ORCID.iD"] 
  twitter <- row["Twitter.handles"] 
  email <- row["Email.address"]
  
  sort(unique(na.omit(valid_ids[valid_ids["ORCID.iD"] == orcid |
                                  valid_ids["Twitter.handles"] == twitter |
                                  valid_ids["Email.address"] == email, "handle"]))) -> projects
  
                       data.frame(Firstname = ifelse(substr(row["Firstname"], nchar(row["Firstname"]), nchar(row["Firstname"])) == "*",
                                                     substr(row["Firstname"], 1, nchar(row["Firstname"])-1),
                                                     row["Firstname"]),
                                  Middlename = ifelse(is.na(row["Middle.name"]), "", row["Middle.name"]),
                                  Surname = ifelse(substr(row["Surname"], nchar(row["Surname"]), nchar(row["Surname"])) == "*",
                                                   substr(row["Surname"], 1, nchar(row["Surname"])-1),
                                                   row["Surname"]), 
                                  ORCID = orcid, Twitter = twitter, 
                                  EMail = email, Projects = paste(projects, collapse = ", "),
                                  stringsAsFactors = F)
}) -> list.entities

df.entities <- rlist::list.rbind(list.entities)

# Remove duplicates
# df.entities[!duplicated(df.entities),] -> entities
unique(df.entities) -> entities

# Merge rows
future_lapply(unique(entities$ORCID), function(orcid) {
  
  if (orcid == "") {
    
  } else if (nrow(entities[entities$ORCID == orcid,]) == 1) {
    entities[entities$ORCID == orcid,]
  } else {
    entities[entities$ORCID == orcid,][nrow(entities[entities$ORCID == orcid,]),]
  }  
}) %>% rlist::list.rbind() -> unified_orcid

future_lapply(unique(entities$Twitter[!(entities$ORCID %in% unified_orcid$ORCID)]), function(twitter) {
  
  if (twitter == "") {
  } else if (nrow(entities[entities$Twitter == twitter,]) == 1) {
    entities[entities$Twitter == twitter,]
  } else {
    entities[entities$Twitter == twitter,][nrow(entities[entities$Twitter == twitter,]),]
  }  
}) %>% rlist::list.rbind() -> unified_twitter

future_lapply(unique(entities$EMail[!(entities$ORCID %in% unified_orcid$ORCID) & !(entities$Twitter %in% unified_twitter$Twitter)]), function(email) {
  
  if (email == "") {
  } else if (nrow(entities[entities$EMail == email,]) == 1) {
    entities[entities$EMail == email,]
  } else {
    entities[entities$EMail == email,][nrow(entities[entities$EMail == email,]),]
  }  
}) %>% rlist::list.rbind() -> unified_email

unique(
  rbind(unified_orcid, unified_twitter, unified_email)
) -> unified_entities

# Expand projects
unified_entities %>%
  separate(col = "Projects", into = paste0("Project_handle_",1:(max(str_count(unified_entities$Projects, ",")) + 1))) -> expanded_projects

# Fetch long name
future_lapply(paste0("Project_handle_", 1:(max(str_count(unified_entities$Projects, ",")) + 1)), 
              function(colname) {
                future_sapply(expanded_projects[,colname], function(handle) {
                  if (is.na(handle)) return(NA)
                  df.tenzing[df.tenzing$handle == handle,"name"]
                })
              }) %>% rlist::list.cbind() %>% as.data.frame(row.names = F) -> df.lname

colnames(df.lname) <- paste0("Project_name_",1:(max(str_count(unified_entities$Projects, ",")) + 1))

# Fetch icons
future_lapply(paste0("Project_handle_", 1:(max(str_count(unified_entities$Projects, ",")) + 1)), 
              function(colname) {
                future_sapply(expanded_projects[,colname], function(handle) {
                  if (is.na(handle)) return(NA)
                  df.tenzing[df.tenzing$handle == handle,"icon"]
                })
}) %>% rlist::list.cbind() %>% as.data.frame(row.names = F) -> df.icons

colnames(df.icons) <- paste0("Project_icon_",1:(max(str_count(unified_entities$Projects, ",")) + 1))

# Fetch citation
future_lapply(paste0("Project_handle_", 1:(max(str_count(unified_entities$Projects, ",")) + 1)), 
              function(colname) {
                future_sapply(expanded_projects[,colname], function(handle) {
                  if (is.na(handle)) return(NA)
                  df.tenzing[df.tenzing$handle == handle,"citation"]
                })
              }) %>% rlist::list.cbind() %>% as.data.frame(row.names = F) -> df.citation

colnames(df.citation) <- paste0("Project_cite_",1:(max(str_count(unified_entities$Projects, ",")) + 1))

# Combine an nest data
cbind(
  expanded_projects,
  df.lname,
  df.icons,
  df.citation
) -> expanded_combined

for (i in 1:(max(str_count(unified_entities$Projects, ",")) + 1)) {
  
  expanded_combined %>%
    nest(!!paste0("Project_", i) := contains(paste0("_", i))) -> expanded_combined
}

expanded_combined %>%
  nest(Projects = contains("Project")) -> to_json

# Save tenzing entities
jsonlite::write_json(to_json, path = "tenzing.json")
