"""Refresh data/summaries.json from the published FORRT summaries Google Doc."""

import json
from pathlib import Path
import re
from urllib.parse import parse_qs, urlsplit
from urllib.request import urlopen

from bs4 import BeautifulSoup, Tag

SOURCE = (
    "https://docs.google.com/document/d/e/"
    "2PACX-1vRNgJAnhc-Vn8fiRDwX-vUZeP6ytm2Haa0Z_oTIehg3W_u3mBNcJ6lEkswMjcpw5WaBnu4PXg-lXv5w/pub"
)
PAGE_BREAK = "page-break-before:always;display:none;"


def takeaway_href(href):
    """Unwrap Google's redirect and keep web URLs and in-page links."""
    try:
        url = urlsplit(href)
        if url.scheme in ("http", "https") and url.hostname == "www.google.com" and url.path == "/url":
            href = parse_qs(url.query).get("q", [""])[0]
            url = urlsplit(href)
        if re.search(r"[\s\\\x00-\x1f\x7f]", href):
            return None
        if (href.startswith("#") and url.fragment) or (url.scheme in ("http", "https") and url.hostname):
            return href
    except ValueError:
        return None
    return None


def takeaway_link_parts(takeaway):
    """Return plain text fragments with optional hrefs for a linked takeaway."""
    parts = []
    for text in takeaway.strings:
        anchor = text.find_parent("a", href=True)
        href = takeaway_href(anchor["href"]) if anchor else None
        if parts and parts[-1].get("href") == href:
            parts[-1]["text"] += str(text)
        else:
            part = {"text": str(text)}
            if href:
                part["href"] = href
            parts.append(part)

    # Trim as in Main_Takeaways, including whitespace across link boundaries.
    while parts and not parts[0]["text"].strip():
        parts.pop(0)
    while parts and not parts[-1]["text"].strip():
        parts.pop()
    if not any(part.get("href") and part["text"].strip() for part in parts):
        return []
    parts[0]["text"] = parts[0]["text"].lstrip()
    parts[-1]["text"] = parts[-1]["text"].rstrip()
    return parts


def parse_summaries(source):
    soup = BeautifulSoup(source, "html.parser")
    for span in soup.find_all("span"):
        span.unwrap()

    first_break = soup.find("hr", style=PAGE_BREAK)
    if first_break is None:
        raise ValueError("No summary page break found in the published document")

    summaries = {}
    for number, marker in enumerate(first_break.find_all_next("hr", style=PAGE_BREAK), 1):
        summary = {}
        for item in marker.find_all_next():
            if item.name == "hr" and item.get("style") == PAGE_BREAK:
                break
            text = item.get_text()
            if not text:
                continue
            if item.name == "h3":
                summary.update(Title=text.strip(), Id=item["id"])
            elif re.search(r"Main Takeaway[s]*.*", text):
                # Keep the plain strings for readers of existing data and for previews.
                takeaways = []
                linked = {}
                for takeaway in item.find_next().children:
                    label = takeaway.get_text().strip()
                    if not label:
                        continue
                    if parts := takeaway_link_parts(takeaway):
                        linked[str(len(takeaways))] = parts
                    takeaways.append(label)
                summary["Main_Takeaways"] = takeaways
                if linked:
                    summary["Main_Takeaway_Links"] = linked
                else:
                    summary.pop("Main_Takeaway_Links", None)
            elif re.search(r"[Qq]uote[s]*.*", text):
                summary["Quote"] = item.find_next().get_text().strip()
            elif re.search(r"[Aa]bstract.*", text):
                summary["Abstract"] = item.find_next().get_text().strip()
            elif re.search(r"APA Style Reference.*", text):
                summary["Reference"] = item.find_next().get_text()
            elif re.search(r"[Yy]ou may also be interested in.*", text):
                related = []
                for each in item.find_next().children:
                    label = each.get_text().strip()
                    if not label:
                        continue
                    reference = {"Relevant_ref": label}
                    if isinstance(each, Tag):
                        # A reference can itself be a link, or contain one.
                        anchor = each if each.name == "a" and each.has_attr("href") else each.find("a", href=True)
                        if anchor:
                            reference["href"] = anchor["href"]
                    related.append(reference)
                if related:
                    summary["You_may_also_be_interested_in"] = related
        if summary.get("Title"):
            summaries[f"summary_{number}"] = summary
    if not summaries:
        raise ValueError("No summaries found in the published document")
    return summaries


def main():
    with urlopen(SOURCE, timeout=60) as response:
        summaries = parse_summaries(response.read())
    destination = Path(__file__).resolve().parents[2] / "data" / "summaries.json"
    with destination.open("w", encoding="utf-8") as output:
        json.dump(summaries, output)


if __name__ == "__main__":
    main()
