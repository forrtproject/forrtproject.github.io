# scripts/download_ga_data.py
import os
import json
import logging
from datetime import datetime, timedelta
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Dimension, Metric
from google.oauth2 import service_account

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_ga_client():
    """Initialize and return Google Analytics client"""
    credentials_json = os.getenv("GA_API_CREDENTIALS")
    property_id = os.getenv("GA_PROPERTY_ID")

    if not credentials_json or not property_id:
        raise ValueError("Environment variables GA_API_CREDENTIALS and GA_PROPERTY_ID must be set.")

    try:
        credentials_info = json.loads(credentials_json)
        credentials = service_account.Credentials.from_service_account_info(credentials_info)
        return BetaAnalyticsDataClient(credentials=credentials), property_id
    except json.JSONDecodeError:
        raise ValueError("GA_API_CREDENTIALS must be valid JSON")
    except Exception as e:
        raise ValueError(f"Failed to initialize GA client: {e}")

def fetch_regional_data(client, property_id, date_range):
    """Fetch regional data for given date range"""
    try:
        request = RunReportRequest(
            property=f"properties/{property_id}",
            dimensions=[Dimension(name="country")],
            metrics=[Metric(name="activeUsers")],
            date_ranges=[date_range],
        )
        response = client.run_report(request)
        
        # Country name overrides to align with GeoJSON
        rename_dict = {
            "United States": "United States of America"
        }
        
        regions = []
        for row in response.rows:
            ga_country = row.dimension_values[0].value
            country = rename_dict.get(ga_country, ga_country)
            users = int(row.metric_values[0].value)
            regions.append({
                "country": country,
                "users": users
            })
        
        logger.info(f"Fetched regional data: {len(regions)} countries")
        return regions
    except Exception as e:
        logger.error(f"Failed to fetch regional data: {e}")
        return []

def fetch_top_pages(client, property_id, date_range, limit=10):
    """Fetch top pages for given date range"""
    try:
        request = RunReportRequest(
            property=f"properties/{property_id}",
            dimensions=[Dimension(name="pagePath")],
            metrics=[Metric(name="screenPageViews")],
            date_ranges=[date_range],
            order_bys=[{"metric": {"metric_name": "screenPageViews"}, "desc": True}],
            limit=limit
        )
        response = client.run_report(request)
        
        top_pages = []
        for row in response.rows:
            page = row.dimension_values[0].value
            views = int(row.metric_values[0].value)
            top_pages.append({
                "page": page,
                "views": views
            })
        
        logger.info(f"Fetched top pages data: {len(top_pages)} pages")
        return top_pages
    except Exception as e:
        logger.error(f"Failed to fetch top pages data: {e}")
        return []

def fetch_daily_visitors(client, property_id, date_range):
    """Fetch daily visitors for given date range"""
    try:
        request = RunReportRequest(
            property=f"properties/{property_id}",
            dimensions=[Dimension(name="date")],
            metrics=[Metric(name="activeUsers")],
            date_ranges=[date_range],
        )
        response = client.run_report(request)
        
        daily_visitors = []
        for row in response.rows:
            date_str = row.dimension_values[0].value  # Format: YYYYMMDD
            date_formatted = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:]}"
            users = int(row.metric_values[0].value)
            daily_visitors.append({
                "date": date_formatted,
                "users": users
            })
        
        logger.info(f"Fetched daily visitors data: {len(daily_visitors)} days")
        return daily_visitors
    except Exception as e:
        logger.error(f"Failed to fetch daily visitors data: {e}")
        return []

def main():
    """Main function to download GA data"""
    try:
        # Initialize client
        client, property_id = get_ga_client()
        logger.info("Google Analytics client initialized successfully")
        
        # Define date ranges
        thirty_days_ago = DateRange(start_date="30daysAgo", end_date="today")
        one_year_ago = DateRange(start_date="365daysAgo", end_date="today")
        
        # Fetch 30-day data
        logger.info("Fetching 30-day data...")
        regions_30d = fetch_regional_data(client, property_id, thirty_days_ago)
        top_pages_30d = fetch_top_pages(client, property_id, thirty_days_ago, limit=10)
        daily_visitors_30d = fetch_daily_visitors(client, property_id, thirty_days_ago)
        
        # Fetch yearly data
        logger.info("Fetching yearly data...")
        regions_yearly = fetch_regional_data(client, property_id, one_year_ago)
        top_pages_yearly = fetch_top_pages(client, property_id, one_year_ago, limit=10)
        daily_visitors_yearly = fetch_daily_visitors(client, property_id, one_year_ago)
        
        # Combine data
        data = {
            "regions": regions_30d,
            "top_pages": top_pages_30d,
            "daily_visitors": daily_visitors_30d,
            "regions_yearly": regions_yearly,
            "top_pages_yearly": top_pages_yearly,
            "daily_visitors_yearly": daily_visitors_yearly
        }
        
        # Save to JSON
        os.makedirs("data", exist_ok=True)
        with open("data/ga_data.json", "w") as f:
            json.dump(data, f, indent=2)
        
        logger.info("Google Analytics data downloaded and saved to data/ga_data.json")
        
        # Print summary
        print(f"\n📊 Data Summary:")
        print(f"   30-day data: {len(regions_30d)} countries, {len(top_pages_30d)} pages, {len(daily_visitors_30d)} days")
        print(f"   Yearly data: {len(regions_yearly)} countries, {len(top_pages_yearly)} pages, {len(daily_visitors_yearly)} days")
        
    except Exception as e:
        logger.error(f"Script failed: {e}")
        raise

if __name__ == "__main__":
    main()
