import json
import matplotlib.pyplot as plt
import os
import requests

# Load API key from environment variable
api_key = os.getenv("SERPAPI")

if not api_key:
    raise ValueError("API key is missing. Please set the SERPAPI environment variable.")

# Define the request URL
url = "https://serpapi.com/search.json"
params = {
    "engine": "google_scholar_author",
    "author_id": "JrBcgGMAAAAJ",
    "hl": "en",
    "api_key": api_key,
    "no_cache": "false"
}

# Fetch data from SerpAPI
response = requests.get(url, params=params)
data = response.json()

# Extract total citations, h-index, and i10-index
cited_by_info = data["cited_by"]["table"]
total_citations = cited_by_info[0]["citations"]["all"]
h_index = cited_by_info[1]["h_index"]["all"]
i10_index = cited_by_info[2]["i10_index"]["all"]

# Extract yearly citation data
graph_data = data["cited_by"]["graph"]
years = [item["year"] for item in graph_data]
citations = [item["citations"] for item in graph_data]

# Create figure with specified background color
fig, ax = plt.subplots(figsize=(6, 4), facecolor="#fefdf6")
ax.set_facecolor("#fefdf6")

# Plot bars
bars = ax.bar(years, citations, color="gray")

# Remove frame and axis labels
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)
ax.spines["bottom"].set_visible(False)
ax.set_xticks([])
ax.set_yticks([])

# Set a fixed height for labels
label_y_position = 10

# Ensure numbers are positioned at a fixed height and adjust color based on the bar height
for bar, citation, year in zip(bars, citations, years):
    text_color = "white" if label_y_position < bar.get_height() else "gray"  # White if inside, gray if outside
    ax.text(bar.get_x() + bar.get_width()/2, label_y_position, 
            str(citation), ha="center", va="bottom", fontsize=14, color=text_color, fontweight="bold")
    
    # Add year label below the axis
    ax.text(bar.get_x() + bar.get_width()/2, -4, 
            str(year), ha="center", va="top", fontsize=14, color="gray")

# Title with total citations, h-index, and i10-index (Using RELATIVE positioning)
title_text = f"Cited by {total_citations}.\nh-index: {h_index} | i10-index: {i10_index}"
ax.text(0, 1.1, title_text, fontsize=14, fontweight="bold", ha="left", transform=ax.transAxes)

# Save the figure as WebP
output_path = "content/publications/citation_chart.webp"
plt.savefig(output_path, format="webp", dpi=300, bbox_inches="tight", facecolor=fig.get_facecolor())
plt.close()

print(f"Chart saved as {output_path}")


