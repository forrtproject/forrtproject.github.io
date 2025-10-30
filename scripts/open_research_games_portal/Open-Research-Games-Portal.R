# Libraries
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
google_sheet_csv_url <- "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxW5RjnjrJ7KtLo3o8yRjXS8fr3bKOyOwUE_k1b8cN2LRpwkCY3i6Cgo7dZBVFQuyfVywEymMlXRTM/pub?output=csv"

# Try different methods to read the data
df_combined <- NULL

# CSV export (most reliable)
cat("Attempting to read from CSV export (TEST sheet)...\n")
tryCatch({
  # TEST sheet
  test_csv_url <- "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxW5RjnjrJ7KtLo3o8yRjXS8fr3bKOyOwUE_k1b8cN2LRpwkCY3i6Cgo7dZBVFQuyfVywEymMlXRTM/pub?gid=610093275&single=true&output=csv"
  df_combined <- read.csv(test_csv_url, stringsAsFactors = FALSE)
  cat("Successfully read", nrow(df_combined), "rows and", ncol(df_combined), "columns from CSV export (TEST sheet)\n")
  cat("Columns read:", names(df_combined), "\n")
}, error = function(e) {
  cat("CSV export failed:", e$message, "\n")
})

# Google Sheets API without authentication (if CSV failed)
if (is.null(df_combined)) {
  cat("Attempting to read from Google Sheets API without authentication (TEST sheet)...\n")
  tryCatch({
    df_combined <- read_sheet(google_sheet_url, sheet = "TEST")
    cat("Successfully read", nrow(df_combined), "rows and", ncol(df_combined), "columns from Google Sheets API (TEST sheet)\n")
    cat("Columns read:", names(df_combined), "\n")
  }, error = function(e) {
    cat("Google Sheets API also failed:", e$message, "\n")
  })
}

# If both failed, stop with helpful message
if (is.null(df_combined)) {
  cat("\n")
  cat(paste(rep("=", 50), collapse = ""))
  cat("\n")
  cat("ERROR: Unable to read data from Google Sheets\n")
  cat(paste(rep("=", 50), collapse = ""))
  cat("\n")
  cat("Solutions:\n")
  cat("1. Make the Google Sheet public:\n")
  cat("   - Open the sheet\n")
  cat("   - Click Share > Anyone with the link > Viewer\n")
  cat("2. Or download as CSV and use local file\n")
  cat("3. Or set up proper Google Sheets API authentication\n")
  stop("Please fix Google Sheets access and try again.")
}

# Standardize column names
names(df_combined) <- tolower(gsub("[^A-Za-z0-9_]", "_", names(df_combined)))
names(df_combined) <- gsub("_+", "_", names(df_combined))
names(df_combined) <- gsub("^_|_$", "", names(df_combined))

# Clean and prepare the data
Portal <- df_combined
if ("game_id" %in% names(Portal)) {
  Portal <- Portal[order(Portal$game_id), ] # Order by Game ID
} else if ("unique_id" %in% names(Portal)) {
  Portal <- Portal[order(Portal$unique_id), ] # Order by Unique ID
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
    # Create a slug for each game based on title or game_id
    mutate(
      slug = ifelse(
        !is.na(game_id) & game_id != "",
        gsub("[^A-Za-z0-9]", "-", tolower(paste0(title, "-", game_id))),
        gsub("[^A-Za-z0-9]", "-", tolower(title))
      )
    ) %>%
    # Clean slug
    mutate(slug = gsub("-+", "-", slug)) %>%
    mutate(slug = gsub("^-|-$", "", slug)) %>%
    # Split all fields except slug by bullet points or newlines into arrays
    mutate(
      across(
        .cols = -slug,  # Exclude slug from strsplit
        .fns = ~ strsplit(as.character(.x), "\\s*•\\s*|\\r?\\n\\s*")
      )
    ) %>%
    # Clean up resulting arrays to remove empty elements
    mutate(
      across(
        .cols = -slug,  # Exclude slug from cleaning
        .fns = ~ lapply(.x, function(x) x[x != "" & !is.na(x)])
      )
    )
}

# Create JSON data
create_json_data_file <- function(df, output_file) {
  # Define all expected columns
  expected_columns <- c(
    "game_id", "title", "creators", "description", "access", "delivery_format",
    "game_type", "gameplay_style","tone", "number_of_players", "target_audience",
    "last_updated", "language", "licence", "topic_area", "forrt_clusters",
    "learning_objectives", "formal_evaluation", "suggested_audience",
    "prior_knowledge", "playtime", "scalability", "teaching_integration",
    "context_specific_elements", "preparation", "testimonials", "entry_id"
  )
  
  games_list <- list()
  
  for (i in 1:nrow(df)) {
    game <- df[i, ]
    game_data <- list()
    
    # Add all expected fields to the game data
    for (col in expected_columns) {
      if (col %in% names(game)) {
        if (is.list(game[[col]])) {
          # Handle list fields (arrays)
          if (length(game[[col]][[1]]) > 0 && game[[col]][[1]][1] != "") {
            game_data[[col]] <- game[[col]][[1]][game[[col]][[1]] != ""]
          } else {
            game_data[[col]] <- list() # Empty array for empty lists
          }
        } else {
          # Handle regular fields
          game_data[[col]] <- ifelse(game[[col]] == "" || is.na(game[[col]]), "", as.character(game[[col]]))
        }
      } else {
        game_data[[col]] <- "" # Set missing columns to empty string
      }
    }
    
    # Use the slug as a character string
    games_list[[as.character(game$slug)]] <- game_data
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

# Create JSON data file
create_json_data_file(json_data, "data/open_research_games.json")

cat("\nOpen Research Games Portal processing completed!\n")
cat("- JSON data file created at data/open_research_games.json\n")
cat("Total games processed:", nrow(Portal), "\n")
