# scripts/download_ga_data.py
import os
import json
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Dimension, Metric
from google.oauth2 import service_account

# Retrieve values from environment variables
credentials_json = os.getenv("GA_API_CREDENTIALS")
property_id = os.getenv("GA_PROPERTY_ID")

# Ensure the environment variables are set
if not credentials_path or not property_id:
    raise ValueError("Environment variables GA_API_CREDENTIALS and GA_PROPERTY_ID must be set.")

credentials_info = json.loads(credentials_json)

credentials = service_account.Credentials.from_service_account_info(credentials_info)
client = BetaAnalyticsDataClient(credentials=credentials)

# Country name overrides to align with GeoJSON
rename_dict = {
    "United States": "United States of America"
}

# 1. Regional origin data
request_regions = RunReportRequest(
    property=f"properties/{property_id}",
    dimensions=[Dimension(name="country")],
    metrics=[Metric(name="activeUsers")],
    date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
)
response_regions = client.run_report(request_regions)
regions = []
for row in response_regions.rows:
    ga_country = row.dimension_values[0].value
    # Adjust country name to match GeoJSON
    country = rename_dict.get(ga_country, ga_country)
    users = int(row.metric_values[0].value)
    regions.append({
        "country": country,
        "users": users
    })

# 2. Top 5 pages visited
request_pages = RunReportRequest(
    property=f"properties/{property_id}",
    dimensions=[Dimension(name="pagePath")],
    metrics=[Metric(name="screenPageViews")],
    date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
    order_bys=[{"metric": {"metric_name": "screenPageViews"}, "desc": True}],
    limit=5
)
response_pages = client.run_report(request_pages)
top_pages = []
for row in response_pages.rows:
    page = row.dimension_values[0].value
    views = int(row.metric_values[0].value)
    top_pages.append({
        "page": page,
        "views": views
    })

# 3. Daily visitors trend
request_daily = RunReportRequest(
    property=f"properties/{property_id}",
    dimensions=[Dimension(name="date")],
    metrics=[Metric(name="activeUsers")],
    date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
)
response_daily = client.run_report(request_daily)
daily_visitors = []
for row in response_daily.rows:
    date_str = row.dimension_values[0].value  # Format: YYYYMMDD
    date_formatted = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:]}"
    users = int(row.metric_values[0].value)
    daily_visitors.append({
        "date": date_formatted,
        "users": users
    })

# Combine data and save to JSON
data = {
    "regions": regions,
    "top_pages": top_pages,
    "daily_visitors": daily_visitors
}

os.makedirs("data", exist_ok=True)
with open("data/ga_data.json", "w") as f:
    json.dump(data, f, indent=2)

print("Google Analytics data downloaded and saved to data/ga_data.json")
