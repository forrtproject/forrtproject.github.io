# Generate FORRT announcement posts from the "FORRT Announcements" Google Sheet.
#
# Every row with Show == "yes" and a Date of today or earlier becomes a Hugo page
# bundle at content/post/<Slug>/index.md, with an optional featured image. A row
# with a future Date stays staged and goes live on the first scheduled run after
# that date, with no sheet edit needed. The script exits early when the
# publishable set is unchanged since the last run.
#
# Run from the repo root: Rscript scripts/create_announcements.R
# Run on a schedule by .github/workflows/create_announcements.yml.
#
# Sheet columns: Slug, Title, Description, imageUrl, webUrl, LinkText, Date,
#                Author, Category, Show

library(googlesheets4)
library(httr)
library(digest)

`%||%` <- function(a, b) if (is.null(a)) b else a

# The workflow caches and restores this file under the same name between runs.
hash_file <- "gs_announcement_hash.txt"

# The sheet is public, so no credentials are needed. The data tab is read by name
# so that re-ordering tabs (e.g. the instructions tab) cannot feed the wrong one in.
sheet_url <- "https://docs.google.com/spreadsheets/d/1jVJyxdpArAGBbWhmdlbXfEhZRrIHl8JFkRrZGWkvOcI/edit"
googlesheets4::gs4_deauth()
data <- read_sheet(sheet_url, sheet = "Sheet1")

names(data) <- trimws(names(data))

# Returns a Date cell as "YYYY-MM-DD" text, or NA when blank or unparseable.
#
# Normalising up front matters because a column mixing text cells with real date
# cells arrives as a list of strings and POSIXct. Left as-is, apply() below
# flattens the POSIXct to epoch seconds, which then read as a day serial and
# yield an unparseable year in the front matter.
format_sheet_date <- function(x) {
  if (is.null(x) || length(x) == 0) return(NA_character_)
  if (inherits(x, c("POSIXct", "Date"))) return(format(as.Date(x), "%Y-%m-%d"))
  x <- trimws(as.character(x))
  if (is.na(x) || x == "") return(NA_character_)
  d <- if (grepl("^[0-9]+(\\.[0-9]+)?$", x)) {   # Google Sheets day serial
    as.Date(as.numeric(x), origin = "1899-12-30")
  } else if (grepl("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$", x)) {
    as.Date(x, format = "%Y-%m-%d")
  } else {
    # Rejected rather than guessed: as.Date's default formats read "13/09/2026" as year 13.
    as.Date(NA)
  }
  if (is.na(d)) {
    warning(sprintf("Unparseable Date '%s'; the post will be written without a date.", x))
    return(NA_character_)
  }
  format(d, "%Y-%m-%d")
}
# as.list() keeps each element's class, so an all-date column is not iterated as bare numbers.
data$Date <- vapply(as.list(data$Date), format_sheet_date, character(1))

# "Today" is the CI runner's clock (UTC). A blank or unparseable Date counts as
# published, so a missing date never silently hides a post.
row_dates <- as.Date(data$Date)
today     <- Sys.Date()
is_shown  <- tolower(trimws(as.character(data$Show))) == "yes"
is_future <- !is.na(row_dates) & row_dates > today
keep      <- is_shown & !is_future
keep[is.na(keep)] <- FALSE
filtered_data <- data[keep, ]

# Hashing the publishable set rather than the raw sheet is what makes scheduling
# work: when a staged post's Date arrives, the set and its hash change and the
# workflow redeploys without any sheet edit. Edits to hidden or future rows leave
# the hash unchanged and so trigger no deploy.
new_hash <- digest(filtered_data, algo = "md5")
old_hash <- if (file.exists(hash_file)) readLines(hash_file) else NULL

if (!is.null(old_hash) && new_hash == old_hash) {
  # quit() would end an interactive R session, so stop() is used there instead.
  if (!interactive()) {
    message("Publishable announcements unchanged. Exiting.")
    quit(save = "no", status = 0)
  } else {
    stop("Publishable announcements unchanged. Exiting.")
  }
}

writeLines(new_hash, hash_file)

# Drive share links have the form https://drive.google.com/file/d/<id>/view.
extract_id <- function(url) {
  pattern <- "file/d/([a-zA-Z0-9_-]+)"
  match <- regmatches(url, regexpr(pattern, url))
  id <- sub("file/d/", "", match)
  return(id)
}

# Downloads a post's featured image into `bundle_dir` as featured.<png|jpg>.
# Accepts a direct .png/.jpg/.jpeg URL or a Google Drive link. Failures only warn,
# so a bad image never blocks the post. Returns TRUE invisibly on success.
get_image <- function(url, bundle_dir) {
  url <- unlist(url)

  if (is.null(url) || length(url) == 0 || is.na(url) || trimws(url) == "") {
    warning(sprintf("No image URL provided for '%s'. Skipping image download.", bundle_dir))
    return(invisible(FALSE))
  }

  file_path <- NULL

  tryCatch({
    if (grepl("\\.(png|jpg|jpeg)$", url, ignore.case = TRUE)) {
      file_ext <- tools::file_ext(url)
      file_path <- file.path(bundle_dir, paste0("featured.", file_ext))
      response <- GET(url, write_disk(file_path, overwrite = TRUE))

      # An image-looking URL can still serve an HTML error or login page.
      ct <- httr::http_type(response)
      if (!ct %in% c("image/jpeg", "image/jpg", "image/png")) {
        unlink(file_path)
        warning(sprintf("Downloaded file for '%s' has unexpected content type '%s'. Skipping image.", bundle_dir, ct))
        return(invisible(FALSE))
      }
    } else {
      # A Drive share link serves a viewer page, so it is rewritten to the direct download endpoint.
      if (!grepl("uc\\?export", url)) {
        id <- extract_id(url)
        download_url <- paste0("https://drive.google.com/uc?export=download&id=", id)
      } else {
        download_url <- url
      }

      # Drive URLs carry no file extension, so it is taken from the Content-Type.
      response <- GET(download_url)
      ct <- httr::http_type(response)
      if (ct %in% c("image/jpeg", "image/jpg")) {
        file_ext <- "jpg"
      } else if (ct == "image/png") {
        file_ext <- "png"
      } else {
        warning(sprintf("Unsupported image type '%s' for '%s'. Skipping image download.", ct %||% "unknown", bundle_dir))
        return(invisible(FALSE))
      }

      file_path <- file.path(bundle_dir, paste0("featured.", file_ext))
      writeBin(httr::content(response, "raw"), file_path)
    }

    if (!is.null(file_path) && file.exists(file_path)) {
      message("File downloaded successfully.")
      return(invisible(TRUE))
    } else {
      warning(sprintf("File download failed for '%s'.", bundle_dir))
      return(invisible(FALSE))
    }
  }, error = function(e) {
    warning(sprintf("Problem downloading image for '%s': %s", bundle_dir, conditionMessage(e)))
    return(invisible(FALSE))
  })
}

# Writes content/post/<Slug>/index.md for one sheet row (a named list) and fetches its image.
create_post <- function(row) {
  date <- row[["Date"]]
  post_content <- paste0(
    "---\n",
    "title: \"", row["Title"], "\"\n",
    if (!is.na(date)) paste0("date: ", date, "\n") else "",
    "tags: []\n",
    "categories:\n",
    "  - ", row["Category"], "\n",
    "authors: [\"", row["Author"], "\"]\n",
    "---\n\n",
    gsub("\n", "\n  ", row["Description"]), "\n  \n", # Spaces keep the sheet's line breaks in the rendered Markdown
    "<!--more-->\n\n", # Card teasers show only the text above this divider, so the link stays out of them
    ifelse(!is.na(row["webUrl"]) & row["webUrl"] != "",
      paste0("[", ifelse(!is.na(row["LinkText"]) & trimws(row["LinkText"]) != "", trimws(row["LinkText"]), "Read more"), "](", row["webUrl"], ")"), # LinkText: e.g. "Read the full newsletter"
      "")
  )

  slug_folder <- file.path("content/post", as.character(row["Slug"]))
  dir.create(slug_folder, showWarnings = FALSE, recursive = TRUE)

  post_file <- file.path(slug_folder, "index.md")
  writeLines(post_content, post_file)

  message("Current slug:", row["Slug"])

  get_image(row["imageUrl"], slug_folder)
}

# content/post is rebuilt from scratch so the sheet stays the single source of
# truth: a row that is removed, hidden, or rescheduled into the future is taken
# down rather than left behind as a stale post. Only the per-post bundle
# directories are removed; content/post/_index.md is kept. deploy.yaml clears the
# same directories before unpacking this output, because tar extraction never
# deletes files missing from the archive.
post_dirs <- list.dirs("content/post", recursive = FALSE)
if (length(post_dirs) > 0) unlink(post_dirs, recursive = TRUE)

apply(filtered_data, 1, function(row) create_post(as.list(row)))
