library(readxl)
library(dplyr)  
library(tidyr) 
library(googlesheets4)
library(stringr)
library(jsonlite)

# Disable authentication for public sheets
gs4_deauth()

# Google Sheets URLs
google_sheet_url <- "https://docs.google.com/spreadsheets/d/1cmydWjD1OuyKxJVfDlv0N3T474zwymfB04yFDZQO-TY/edit?usp=sharing"
google_sheet_csv_url <- "https://docs.google.com/spreadsheets/d/1cmydWjD1OuyKxJVfDlv0N3T474zwymfB04yFDZQO-TY/export?format=csv&gid=0"

# Try different methods to read the data
df_combined <- NULL

# Method 1: Try CSV export first (most reliable for public sheets)
cat("Attempting to read from CSV export...\n")
tryCatch({
  df_combined <- read.csv(google_sheet_csv_url, stringsAsFactors = FALSE)
  cat("Successfully read", nrow(df_combined), "rows from CSV export\n")
}, error = function(e) {
  cat("CSV export failed:", e$message, "\n")
})

# Method 2: Try Google Sheets API without authentication (if CSV failed)
if (is.null(df_combined)) {
  cat("Attempting to read from Google Sheets API without authentication...\n")
  tryCatch({
    sheets_list <- sheet_names(google_sheet_url)
    df_combined <- read_sheet(google_sheet_url, sheet = sheets_list[1])
    cat("Successfully read", nrow(df_combined), "rows from Google Sheets API\n")
  }, error = function(e) {
    cat("Google Sheets API also failed:", e$message, "\n")
  })
}

# Method 3: If both failed, stop with helpful message
if (is.null(df_combined)) {
  cat("\n")
  cat(paste(rep("=", 50), collapse = ""))
  cat("\n")
  cat("ERROR: Unable to read data from Google Sheets\n")
  cat(paste(rep("=", 50), collapse = ""))
  cat("\n")
  cat("Solutions:\n")
  cat("1. Make your Google Sheet public:\n")
  cat("   - Open the sheet\n")
  cat("   - Click Share > Anyone with the link > Viewer\n")
  cat("2. Or download as CSV and use local file\n")
  cat("3. Or set up proper Google Sheets API authentication\n")
  stop("Please fix Google Sheets access and try again.")
}

# Clean and prepare the data
Portal <- df_combined
if ("Unique.ID" %in% names(Portal)) {
  Portal <- Portal[order(Portal$`Unique.ID`), ] # Order by Game-ID
} else if ("Unique ID" %in% names(Portal)) {
  Portal <- Portal[order(Portal$`Unique ID`), ] # Order by Game-ID
}

# Function to prepare data for JSON output
prepare_json_data <- function(df) {
  df %>%
    # Clean column names for JSON compatibility
    rename_with(~ gsub("[^A-Za-z0-9_]", "_", .x)) %>%
    rename_with(~ gsub("_+", "_", .x)) %>%
    rename_with(~ gsub("^_|_$", "", .x)) %>%
    rename_with(~ tolower(.x)) %>%
    # Convert NA values to empty strings
    mutate(across(everything(), ~ ifelse(is.na(.x), "", as.character(.x)))) %>%
    # Create a slug for each game based on title or unique_id
    mutate(
      slug = ifelse(
        !is.na(unique_id) & unique_id != "",
        gsub("[^A-Za-z0-9]", "-", tolower(paste0(title, "-", unique_id))),
        gsub("[^A-Za-z0-9]", "-", tolower(title))
      )
    ) %>%
    # Clean slug
    mutate(slug = gsub("-+", "-", slug)) %>%
    mutate(slug = gsub("^-|-$", "", slug)) %>%
    # Split comma-separated values into arrays
    mutate(
      language = strsplit(as.character(language), ",\\s*"),
      topic_area = strsplit(as.character(topic_area), ",\\s*"),
      forrt_clusters = strsplit(as.character(forrt_clusters), ",\\s*"),
      creators = strsplit(as.character(creators), ",\\s*"),
      learning_objectives = strsplit(as.character(learning_objectives), ",\\s*")
    )
}

# Function to create JSON data file for Hugo data directory
create_json_data_file <- function(df, output_file) {
  games_list <- list()
  
  for (i in 1:nrow(df)) {
    game <- df[i, ]
    game_data <- list()
    
    # Add all fields to the game data
    for (col in names(game)) {
      if (col != "slug" && game[[col]] != "") {
        if (is.list(game[[col]])) {
          # Handle list fields (arrays)
          if (length(game[[col]][[1]]) > 0 && game[[col]][[1]][1] != "") {
            game_data[[col]] <- game[[col]][[1]][game[[col]][[1]] != ""]
          }
        } else {
          # Handle regular fields
          game_data[[col]] <- game[[col]]
        }
      }
    }
    
    games_list[[game$slug]] <- game_data
  }
  
  # Write JSON data file
  json_content <- jsonlite::toJSON(games_list, pretty = TRUE, auto_unbox = TRUE)
  writeLines(json_content, output_file)
  
  cat("Created JSON data file:", output_file, "\n")
}


# Main execution
cat("Open Research Games Portal - Data Processing\n")
cat(paste(rep("=", 50), collapse = ""), "\n")

# Prepare data for JSON output
json_data <- prepare_json_data(Portal)

# Write to Google Sheets (original functionality) - optional
tryCatch({
  ss <- gs4_create(
    "Open Research Games Portal",
    sheets = Portal)
  
  cat("Created Google Sheet: Open Research Games Portal\n")
  cat("ID:", ss, "\n")
}, error = function(e) {
  cat("Warning: Could not create Google Sheet (", e$message, ")\n")
  cat("Continuing with JSON generation...\n")
})

#  JSON data file
create_json_data_file(json_data, "data/open_research_games.json")

cat("\nOpen Research Games Portal processing completed!\n")
cat("- Google Sheet created with all games data\n")
cat("- JSON data file created at data/open_research_games.json\n")
cat("Total games processed:", nrow(Portal), "\n")
