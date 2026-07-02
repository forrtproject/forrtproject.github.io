# Generate FORRT announcement posts from the "FORRT Announcements" Google Sheet.
#
# Adapted from the contact-research-network webpage pipeline. Reads a publicly
# shared Google Sheet (no auth via gs4_deauth), and for every row with
# Show == "yes" writes a Hugo page bundle to content/post/<Slug>/index.md plus an
# optional featured image. A hash of the sheet is cached so unchanged data is a
# no-op. Run from the repo root: Rscript scripts/create_announcements.R
#
# Sheet columns: Slug, Title, Description, imageUrl, webUrl, LinkText, Date,
#                Author, Category, Show

library(googlesheets4)
library(httr)
library(digest)

# Helper for null-coalescing in messages
`%||%` <- function(a, b) if (is.null(a)) b else a

# Define file path for hash
hash_file <- "gs_announcement_hash.txt"

# Authenticate and read the Google Sheet (public, so read without auth)
sheet_url <- "https://docs.google.com/spreadsheets/d/1jVJyxdpArAGBbWhmdlbXfEhZRrIHl8JFkRrZGWkvOcI/edit"
googlesheets4::gs4_deauth()
data <- read_sheet(sheet_url)

# Trim any stray whitespace from column names so lookups by name are robust.
names(data) <- trimws(names(data))

# Compute new hash
new_hash <- digest(data, algo = "md5")

# Read old hash if exists
old_hash <- if (file.exists(hash_file)) readLines(hash_file) else NULL

# Abort if data hasn't changed
if (!is.null(old_hash) && new_hash == old_hash) {
  if (!interactive()) {
    message("Data hasn't changed. Exiting.")
    quit(save = "no", status = 0)
  } else {
    stop("Data hasn't changed. Exiting.")
  }
}

# Save new hash
writeLines(new_hash, hash_file)

# Filter for show = yes
filtered_data <- data[tolower(trimws(data$Show)) == "yes", ]

# Extract ID from Google Drive URL
extract_id <- function(url) {
  pattern <- "file/d/([a-zA-Z0-9_-]+)"
  match <- regmatches(url, regexpr(pattern, url))
  id <- sub("file/d/", "", match)
  return(id)
}

# Function to get the image from URL and save it with the correct extension
get_image <- function(url, slug) {
  url <- unlist(url)

  # Handle blank/missing URL with a warning instead of an error
  if (is.null(url) || length(url) == 0 || is.na(url) || trimws(url) == "") {
    warning(sprintf("No image URL provided for '%s'. Skipping image download.", slug))
    return(invisible(FALSE))
  }

  file_path <- NULL

  tryCatch({
    # Check if URL ends with png, jpg or jpeg
    if (grepl("\\.(png|jpg|jpeg)$", url, ignore.case = TRUE)) {
      file_ext <- tools::file_ext(url)
      file_path <- file.path(slug, paste0("featured.", file_ext))
      response <- GET(url, write_disk(file_path, overwrite = TRUE))

      # Validate that the downloaded content is actually an image
      ct <- httr::http_type(response)
      if (!ct %in% c("image/jpeg", "image/jpg", "image/png")) {
        unlink(file_path)
        warning(sprintf("Downloaded file for '%s' has unexpected content type '%s'. Skipping image.", slug, ct))
        return(invisible(FALSE))
      }
    } else {
      # Extract ID from the URL or use provided export URL
      if (!grepl("uc\\?export", url)) {
        id <- extract_id(url)
        download_url <- paste0("https://drive.google.com/uc?export=download&id=", id)
      } else {
        download_url <- url
      }

      # Perform GET request to check headers
      response <- GET(download_url)

      # Determine the file extension based on content type
      ct <- httr::http_type(response)
      if (ct %in% c("image/jpeg", "image/jpg")) {
        file_ext <- "jpg"
      } else if (ct == "image/png") {
        file_ext <- "png"
      } else {
        warning(sprintf("Unsupported image type '%s' for '%s'. Skipping image download.", ct %||% "unknown", slug))
        return(invisible(FALSE))
      }

      # Define the final file path
      file_path <- file.path(slug, paste0("featured.", file_ext))

      # Write the already-fetched response to disk (content type already validated above)
      writeBin(httr::content(response, "raw"), file_path)
    }

    # Check if the file is downloaded
    if (!is.null(file_path) && file.exists(file_path)) {
      message("File downloaded successfully.")
      return(invisible(TRUE))
    } else {
      warning(sprintf("File download failed for '%s'.", slug))
      return(invisible(FALSE))
    }
  }, error = function(e) {
    warning(sprintf("Problem downloading image for '%s': %s", slug, conditionMessage(e)))
    return(invisible(FALSE))
  })
}

# Normalise a date cell to YYYY-MM-DD. Google Sheets may hand us either an ISO
# text string or a numeric serial (days since 1899-12-30), depending on the cell
# format; `apply()` coerces the latter to a bare number, so handle both.
normalise_date <- function(d) {
  d <- trimws(as.character(d))
  if (grepl("^[0-9]+(\\.[0-9]+)?$", d)) {
    return(format(as.Date(as.numeric(d), origin = "1899-12-30"), "%Y-%m-%d"))
  }
  d
}

# Function to create a post from a row of the data
create_post <- function(row) {
  post_content <- paste0(
    "---\n",
    "title: \"", row["Title"], "\"\n",
    "date: ", normalise_date(row["Date"]), "\n",
    "tags: []\n",
    "categories:\n",
    "  - ", row["Category"], "\n",
    "authors: [\"", row["Author"], "\"]\n",
    "---\n\n",
    gsub("\n", "\n  ", row["Description"]), "\n  \n", # Add spaces so that linebreaks are retained in Markdown
    "<!--more-->\n\n", # Summary divider: card teasers show only the description above, not the link below
    ifelse(!is.na(row["webUrl"]) & row["webUrl"] != "",
      paste0("[", ifelse(!is.na(row["LinkText"]) & trimws(row["LinkText"]) != "", trimws(row["LinkText"]), "Read more"), "](", row["webUrl"], ")"), # LinkText: e.g. "Read the full newsletter" or "Check out the job description"
      "")
  )

  slug_folder <- file.path("content/post", as.character(row["Slug"]))
  dir.create(slug_folder, showWarnings = FALSE, recursive = TRUE)

  post_file <- file.path(slug_folder, "index.md")
  writeLines(post_content, post_file)

  message("Current slug:", row["Slug"])

  get_image(row["imageUrl"], slug_folder)
}

# Apply the function to each row of the filtered data
apply(filtered_data, 1, function(row) create_post(as.list(row)))
