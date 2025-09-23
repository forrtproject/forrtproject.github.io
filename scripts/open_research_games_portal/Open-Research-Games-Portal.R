#===============================================================================
# Open Research Games Portal - Data Processing Script
#===============================================================================
#
# Purpose: Fetches educational game data from Google Sheets and processes it
#          for use in the FORRT Open Research Games Portal
#
# Input: Google Sheets with 25 columns of game information
# Output: data/open_research_games.json (for Hugo site consumption)
#
# Features:
# - Robust Google Sheets API access with fallback to CSV export
# - Data cleaning and slug generation with uniqueness guarantees
# - Intelligent duplicate detection and merging based on Unique IDs
# - Smart field merging with conflict resolution strategies
# - JSON output optimized for Hugo site.Data
# - Error handling for authentication issues
# - Backup Google Sheet creation with processed data
# - Comprehensive data integrity validation and reporting
#
# Usage: Rscript scripts/open_research_games_portal/Open-Research-Games-Portal.R
#
#===============================================================================

# Required libraries
library(readxl)        # Excel file reading
library(dplyr)         # Data manipulation
library(tidyr)         # Data tidying
library(googlesheets4) # Google Sheets API
library(stringr)       # String manipulation
library(jsonlite)      # JSON output

# Disable authentication for public sheets access
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

# Function to merge duplicate entries based on Unique ID
merge_duplicates <- function(df) {
  # Identify the unique ID column
  id_col <- if ("Unique.ID" %in% names(df)) "Unique.ID" else "Unique ID"
  
  if (!id_col %in% names(df)) {
    cat("INFO: No Unique ID column found, skipping duplicate merging\n")
    return(df)
  }
  
  # Find duplicates
  duplicate_ids <- df %>% 
    filter(!is.na(!!sym(id_col)), !!sym(id_col) != "") %>%
    group_by(!!sym(id_col)) %>%
    filter(n() > 1) %>%
    pull(!!sym(id_col)) %>%
    unique()
  
  if (length(duplicate_ids) == 0) {
    cat("INFO: No duplicates found to merge\n")
    return(df)
  }
  
  cat("INFO: Merging", length(duplicate_ids), "duplicate ID(s):", paste(duplicate_ids, collapse = ", "), "\n")
  
  # Process each duplicate ID
  merged_rows <- list()
  non_duplicate_rows <- df %>% 
    filter(is.na(!!sym(id_col)) | !!sym(id_col) == "" | !(!!sym(id_col) %in% duplicate_ids))
  
  for (dup_id in duplicate_ids) {
    dup_entries <- df %>% filter(!!sym(id_col) == dup_id)
    merged_entry <- merge_entries(dup_entries)
    merged_rows[[length(merged_rows) + 1]] <- merged_entry
  }
  
  # Combine non-duplicates with merged entries
  if (length(merged_rows) > 0) {
    merged_df <- do.call(rbind, merged_rows)
    result <- rbind(non_duplicate_rows, merged_df)
  } else {
    result <- non_duplicate_rows
  }
  
  cat("INFO: Reduced", nrow(df), "rows to", nrow(result), "rows after merging\n")
  return(result)
}

# Function to merge individual entries
merge_entries <- function(entries) {
  if (nrow(entries) == 1) return(entries)
  
  merged <- entries[1, ]  # Start with first entry as base
  
  for (col in names(entries)) {
    values <- entries[[col]]
    values <- values[!is.na(values) & values != ""]  # Remove empty values
    
    if (length(values) > 1) {
      # Handle different merge strategies by column type
      if (col %in% c("Title", "title")) {
        # For titles, use the first non-empty one
        merged[[col]] <- values[1]
      } else if (col %in% c("Description", "description", "Suggested Audience", "suggested_audience")) {
        # For text fields, combine unique values
        unique_values <- unique(values)
        merged[[col]] <- paste(unique_values, collapse = " | ")
      } else if (col %in% c("Creators", "creators", "Language", "language", "Topic Area", "topic_area")) {
        # For list-like fields, combine and deduplicate
        all_items <- unlist(strsplit(values, ",\\s*|\\|\\s*"))
        unique_items <- unique(trimws(all_items))
        merged[[col]] <- paste(unique_items, collapse = ", ")
      } else if (col %in% c("Access", "access", "URL", "url")) {
        # For URLs, use the first valid one or combine if different
        unique_urls <- unique(values)
        merged[[col]] <- if (length(unique_urls) == 1) unique_urls[1] else paste(unique_urls, collapse = " | ")
      } else if (col %in% c("Last Updated", "last_updated", "Playtime", "playtime")) {
        # For dates/times, use the most recent or specific
        merged[[col]] <- values[which.max(nchar(values))]  # Use most detailed
      } else {
        # Default: combine unique values
        unique_values <- unique(values)
        merged[[col]] <- if (length(unique_values) == 1) unique_values[1] else paste(unique_values, collapse = " | ")
      }
    } else if (length(values) == 1) {
      merged[[col]] <- values[1]
    }
    # If no valid values, keep the original (potentially empty) value
  }
  
  return(merged)
}

# Function to ensure slug uniqueness (simplified since we now merge duplicates)
make_unique_slugs <- function(df) {
  # After merging, there should be fewer slug conflicts, but still check
  slug_counts <- table(df$slug)
  duplicated_slugs <- names(slug_counts[slug_counts > 1])
  
  if (length(duplicated_slugs) > 0) {
    cat("INFO: Making", length(duplicated_slugs), "remaining duplicate slug(s) unique:", paste(duplicated_slugs, collapse = ", "), "\n")
    
    # For each duplicated slug, add sequential numbers
    for (dup_slug in duplicated_slugs) {
      indices <- which(df$slug == dup_slug)
      for (i in seq_along(indices)) {
        df$slug[indices[i]] <- paste0(dup_slug, "-", i)
      }
    }
  }
  
  return(df)
}

# Data validation functions
check_duplicate_ids <- function(df) {
  id_col <- if ("Unique.ID" %in% names(df)) "Unique.ID" else "Unique ID"
  if (id_col %in% names(df)) {
    duplicate_ids <- df %>% 
      filter(!is.na(!!sym(id_col)), !!sym(id_col) != "") %>%
      group_by(!!sym(id_col)) %>%
      filter(n() > 1)
    
    if (nrow(duplicate_ids) > 0) {
      cat("WARNING: Found", nrow(duplicate_ids), "rows with duplicate Unique IDs:\n")
      print(duplicate_ids %>% select(!!sym(id_col), Title) %>% distinct())
      return(TRUE)
    }
  }
  return(FALSE)
}

check_title_duplicates <- function(df) {
  title_col <- if ("Title" %in% names(df)) "Title" else "title"
  if (title_col %in% names(df)) {
    df_clean <- df %>%
      mutate(clean_title = tolower(trimws(!!sym(title_col))))
    
    duplicates <- df_clean %>%
      group_by(clean_title) %>%
      filter(n() > 1, clean_title != "")
    
    if (nrow(duplicates) > 0) {
      cat("WARNING: Found", nrow(duplicates), "rows with potentially duplicate titles:\n")
      print(duplicates %>% select(clean_title, !!sym(title_col)) %>% distinct())
      return(TRUE)
    }
  }
  return(FALSE)
}

# Run data validation
cat("Running data validation checks...\n")
has_duplicate_ids <- check_duplicate_ids(Portal)
has_duplicate_titles <- check_title_duplicates(Portal)

if (has_duplicate_ids || has_duplicate_titles) {
  cat("\nDuplicate entries detected. Merging duplicates...\n")
}

# Merge duplicate entries based on Unique ID
Portal <- merge_duplicates(Portal)

# Re-run validation after merging
cat("Re-running validation after merging...\n")
has_duplicate_ids_after <- check_duplicate_ids(Portal)
has_duplicate_titles_after <- check_title_duplicates(Portal)

if (has_duplicate_ids_after || has_duplicate_titles_after) {
  cat("WARNING: Some duplicates remain after merging (possibly different Unique IDs with same titles)\n")
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
    # Ensure slug uniqueness
    make_unique_slugs() %>%
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
  overwrite_count <- 0
  
  # Check for potential slug conflicts before processing
  slug_counts <- table(df$slug)
  if (any(slug_counts > 1)) {
    cat("INFO: Duplicate slugs were detected and have been made unique with suffixes.\n")
  }
  
  for (i in 1:nrow(df)) {
    game <- df[i, ]
    game_data <- list()
    
    # Check if this slug already exists (shouldn't happen with unique slugs, but safety check)
    if (game$slug %in% names(games_list)) {
      overwrite_count <- overwrite_count + 1
      cat("WARNING: Slug conflict detected for:", game$slug, "\n")
    }
    
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
  cat("Total unique games in JSON:", length(games_list), "\n")
  if (overwrite_count > 0) {
    cat("WARNING:", overwrite_count, "games were overwritten due to slug conflicts!\n")
  }
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
cat("Data integrity checks completed with duplicate detection\n")

# Final validation summary
if (file.exists("data/open_research_games.json")) {
  json_data_check <- jsonlite::fromJSON("data/open_research_games.json")
  cat("Final JSON contains:", length(json_data_check), "unique games\n")
  if (length(json_data_check) != nrow(Portal)) {
    cat("WARNING: Input rows (", nrow(Portal), ") != Output games (", length(json_data_check), ")\n")
    cat("This may indicate duplicate handling or data loss occurred.\n")
  } else {
    cat("SUCCESS: All input rows successfully converted to unique games\n")
  }
}
