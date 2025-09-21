#===============================================================================
# Generate Individual Game Pages Script
#===============================================================================
#
# Purpose: Creates individual Hugo content pages for each game in the portal
#          This improves SEO, enables direct linking, and avoids URL parameter issues
#
# Input: data/open_research_games.json
# Output: content/open-research-games-portal/games/{game-slug}/index.md files
#
# Usage: Rscript scripts/open_research_games_portal/generate_game_pages.R
#
#===============================================================================

library(jsonlite)
library(stringr)

# Read the games data
games_data <- jsonlite::fromJSON("data/open_research_games.json")

# Create the games directory if it doesn't exist
games_dir <- "content/open-research-games-portal/games"
if (!dir.exists(games_dir)) {
  dir.create(games_dir, recursive = TRUE)
}

# Function to clean text for YAML frontmatter
clean_for_yaml <- function(text) {
  if (is.null(text) || text == "" || is.na(text)) {
    return("")
  }
  # Escape quotes and special YAML characters
  text <- gsub('"', '\\"', text)
  text <- gsub("'", "\\'", text)
  text <- gsub('\n', ' ', text)
  text <- gsub('\r', '', text)
  text <- gsub(':', '\\:', text)
  return(text)
}

# Function to create frontmatter
create_frontmatter <- function(game_slug, game_data) {
  title <- clean_for_yaml(game_data$title %||% "Untitled Game")
  description <- clean_for_yaml(game_data$description %||% "")
  
  # Truncate description for meta description (max 160 chars)
  meta_description <- if (nchar(description) > 160) {
    paste0(substr(description, 1, 157), "...")
  } else {
    description
  }
  
  frontmatter <- paste0(
    "---\n",
    "title: |\n  ", title, "\n",
    "type: \"game-detail\"\n",
    "layout: \"single\"\n",
    "description: |\n  ", meta_description, "\n",
    "game_slug: \"", game_slug, "\"\n",
    "---\n\n"
  )
  
  return(frontmatter)
}

# Generate pages for each game
cat("Generating individual game pages...\n")
generated_count <- 0

for (game_slug in names(games_data)) {
  game_data <- games_data[[game_slug]]
  
  # Create directory for this game
  game_page_dir <- file.path(games_dir, game_slug)
  if (!dir.exists(game_page_dir)) {
    dir.create(game_page_dir, recursive = TRUE)
  }
  
  # Create the index.md file
  index_file <- file.path(game_page_dir, "index.md")
  
  # Generate content
  frontmatter <- create_frontmatter(game_slug, game_data)
  content <- paste0(
    frontmatter,
    "{{< single-game-details >}}\n"
  )
  
  # Write the file
  writeLines(content, index_file)
  generated_count <- generated_count + 1
}

cat("Generated", generated_count, "individual game pages\n")
cat("Pages created in:", games_dir, "\n")
cat("URL format: /open-research-games-portal/games/{game-slug}/\n")
