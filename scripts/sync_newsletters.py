#!/usr/bin/env python3
"""Archive FORRT newsletter issues sent through EmailOctopus on forrt.org.

Source: the EmailOctopus API v2 (https://api.emailoctopus.com), read with the
EMAILOCTOPUS_API_KEY environment variable. EmailOctopus's own web versions are
signed links that the API does not return, so each issue is hosted here.

Outputs (under --root, default the repository root):

    data/newsletters.json                 one entry per issue, newest first
    static/newsletters/YYYY-MM/index.html standalone copy of each issue
    static/newsletters/images/*.webp      the issues' images, converted to WebP

An issue is a sent campaign named "<Month> Newsletter" or "<Month> <Year>
Newsletter" (anything may follow, e.g. "June Newsletter Edit"); other sent
campaigns with "newsletter" in their name are reported as warnings. The month
comes from that name, because issues often go out early in the following
month. Without a year in the name, the year is the sending year, moved back or
forward one where the named month and the sending month are far apart (a
December issue sent in January). If several campaigns name the
same month, the one sent last is the issue, so a corrected re-send replaces
the original.

Issues already listed in data/newsletters.json are not fetched again, and
images already downloaded are reused, so earlier copies survive API outages
and images later removed from EmailOctopus. data-processing.yml restores the
previous output from the build-resources branch before running this script.

The script never fails the pipeline: without a key, or when the API cannot be
reached, it warns and leaves the existing output untouched (exit code 0). An
issue that cannot be archived completely (an image fails to download, or the
HTML contains an unknown merge tag) is skipped with a warning and retried on
the next run.

Usage:
    EMAILOCTOPUS_API_KEY=... python3 scripts/sync_newsletters.py [--root DIR]
"""

import argparse
import calendar
from datetime import datetime
import hashlib
import html
import io
import json
import os
from pathlib import Path
import re
import sys
import urllib.error
import urllib.request

API = "https://api.emailoctopus.com"
SITE = "https://forrt.org"
USER_AGENT = "forrt.org newsletter archive"
TIMEOUT = 60
# Emails are at most 700 px wide; twice that keeps images sharp on high-density screens.
MAX_IMAGE_WIDTH = 1400

DATA_FILE = Path("data/newsletters.json")
ARCHIVE_DIR = Path("static/newsletters")
IMAGE_DIR = ARCHIVE_DIR / "images"

MONTHS = {name.lower(): number for number, name in enumerate(calendar.month_name) if name}
ISSUE_NAME = re.compile(r"^\s*(%s)\s+(?:(\d{4})\s+)?newsletter\b" % "|".join(MONTHS), re.IGNORECASE)
IMG_SRC = re.compile(r"""(<img\b[^>]*?\ssrc\s*=\s*)(["'])(.*?)\2""", re.IGNORECASE | re.DOTALL)
# Markup an email never needs; an issue containing any of it is not published.
EXECUTABLE = re.compile(r"<\s*(script|iframe|object|embed|form)\b|\son\w+\s*=|javascript:", re.IGNORECASE)
IMG_TAG = re.compile(r"<img\b[^>]*>", re.IGNORECASE)


class ArchiveError(Exception):
    """An issue cannot be archived completely on this run."""


def warn(message):
    # GitHub Actions shows ::warning:: lines as annotations on the run.
    print("::warning::%s" % message)


# ---------------------------------------------------------------------------
# Choosing issues

def sent_time(campaign):
    return datetime.fromisoformat(campaign["sent_at"].replace("Z", "+00:00"))


def issue_month(campaign):
    """Return (year, month) for a newsletter campaign, or None for any other campaign."""
    if campaign.get("status") != "sent" or not campaign.get("sent_at"):
        return None
    match = ISSUE_NAME.match(campaign.get("name") or "")
    if not match:
        return None
    month = MONTHS[match.group(1).lower()]
    if match.group(2):
        return int(match.group(2)), month
    sent = sent_time(campaign)
    year = sent.year
    if month - sent.month > 6:      # December issue sent in January
        year -= 1
    elif sent.month - month > 6:    # January issue sent in December
        year += 1
    return year, month


def select_issues(campaigns):
    """Map (year, month) to the campaign sent last for that issue."""
    issues = {}
    for campaign in campaigns:
        key = issue_month(campaign)
        if not key and campaign.get("status") == "sent" \
                and "newsletter" in (campaign.get("name") or "").lower():
            warn("Campaign %r was sent but its name gives no issue month (expected "
                 "'<Month> Newsletter'); it is not archived." % campaign.get("name"))
        if key and (key not in issues or sent_time(campaign) > sent_time(issues[key])):
            issues[key] = campaign
    return issues


# ---------------------------------------------------------------------------
# Network

def request(url, headers=None):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, **(headers or {})})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
        return response.read()


def fetch_campaigns(key):
    """All campaigns, following the API's cursor pagination."""
    campaigns, url = [], API + "/campaigns?limit=100"
    while url:
        page = json.loads(request(url, {"Authorization": "Bearer " + key}))
        campaigns.extend(page.get("data") or [])
        url = ((page.get("paging") or {}).get("next") or {}).get("url")
        if url and url.startswith("/"):
            url = API + url
    return campaigns


# ---------------------------------------------------------------------------
# Building one issue's page

def to_webp(raw):
    from PIL import Image  # Imported here so the selection logic needs no Pillow.

    image = Image.open(io.BytesIO(raw))
    out = io.BytesIO()
    if getattr(image, "is_animated", False):
        image.save(out, "WEBP", save_all=True, quality=90)
    else:
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info or "A" in image.mode else "RGB")
        image.thumbnail((MAX_IMAGE_WIDTH, MAX_IMAGE_WIDTH * 4))
        image.save(out, "WEBP", quality=90, method=6)
    return out.getvalue()


def local_image(url, root):
    """Download an image once and return its site path."""
    name = hashlib.sha256(url.encode()).hexdigest()[:20] + ".webp"
    path = root / IMAGE_DIR / name
    if not path.exists():
        try:
            data = to_webp(request(html.unescape(url)))
        except Exception as error:  # Network, HTTP and decoding errors alike.
            raise ArchiveError("image %s: %s" % (url, error)) from error
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    return "/" + (IMAGE_DIR / name).as_posix().removeprefix("static/")


def page_html(campaign, year, month, root):
    """The campaign's HTML, made safe and self-contained for forrt.org."""
    source = (campaign.get("content") or {}).get("html") or ""
    if not source.strip():
        raise ArchiveError("no HTML content")
    label = "%s %d" % (calendar.month_name[month], year)
    preview = (campaign.get("preview_text") or "").strip()
    page = source.replace("\r\n", "\n")

    # Merge tags EmailOctopus fills in per recipient.
    page = re.sub(r"\{%\s*if\s+PreviewText\s*%\}(.*?)\{%\s*endif\s*%\}",
                  lambda m: m.group(1) if preview else "", page, flags=re.DOTALL)
    page = page.replace("{{PreviewText}}", html.escape(preview))
    page = page.replace("{{SenderInfo}}", "FORRT")
    page = re.sub(r'<a\b[^>]*href="\{\{UnsubscribeURL\}\}"[^>]*>(.*?)</a>', r"\1", page,
                  flags=re.DOTALL | re.IGNORECASE)
    page = page.replace("{{RewardsURL}}", "https://emailoctopus.com/")
    leftover = sorted(set(re.findall(r"\{\{.*?\}\}|\{%.*?%\}", page)))
    if leftover:
        raise ArchiveError("unknown merge tags %s" % ", ".join(leftover))
    return finish_page(page, year, month, preview, root)


def finish_page(page, year, month, preview, root):
    """Make an email's HTML a self-contained forrt.org page (also used for Mailchimp issues)."""
    label = "%s %d" % (calendar.month_name[month], year)

    # Local copies of every image, each with an alt attribute.
    if EXECUTABLE.search(page):
        raise ArchiveError("HTML contains scripts, frames, forms or event handlers")
    page = IMG_SRC.sub(lambda m: '%s"%s"' % (m.group(1), local_image(m.group(3), root)), page)
    remote = [tag for tag in IMG_TAG.findall(page) if re.search(r"srcset|https?:", tag, re.I)]
    if remote:
        raise ArchiveError("images that could not be copied: %s" % remote[0][:120])
    page = IMG_TAG.sub(lambda m: m.group(0) if re.search(r"\salt=", m.group(0), re.I)
                       else m.group(0)[:4] + ' alt=""' + m.group(0)[4:], page)

    # The site's page has the only <h1>; the email's section headings keep h1 sizing.
    page = re.sub(r"<h1\b", "<h2 data-email-h1", page, flags=re.IGNORECASE)
    page = re.sub(r"</h1\s*>", "</h2>", page, flags=re.IGNORECASE)

    title = "FORRT Newsletter, %s" % label
    description = "The FORRT newsletter for %s." % label
    if preview:
        description += " " + preview
    url = "%s/newsletters/%04d-%02d/" % (SITE, year, month)
    head = (
        '<meta name="description" content="%s">\n'
        '<link rel="canonical" href="%s">\n'
        "<style>h2[data-email-h1]{font-size:2em}"
        ".forrt-archive-bar{font-family:Arial,Helvetica,sans-serif;font-size:14px;"
        "text-align:center;padding:10px 16px;background:#fefdf6}"
        ".forrt-archive-bar a{color:#980000}</style>\n"
    ) % (html.escape(description), url)
    page, titled = re.subn(r"<title\b[^>]*>.*?</title\s*>", lambda m: "<title>%s</title>" % html.escape(title),
                           page, count=1, flags=re.IGNORECASE | re.DOTALL)
    if not titled:
        head = "<title>%s</title>\n" % html.escape(title) + head
    page, headed = re.subn(r"</head>", head + "</head>", page, count=1, flags=re.IGNORECASE)
    bar = ('<div class="forrt-archive-bar"><a href="/newsletters/">&larr; FORRT newsletter archive</a>'
           " &middot; %s</div>" % label)
    page, bodied = re.subn(r"(<body\b[^>]*>)", r"\1" + bar.replace("\\", "\\\\"), page, count=1,
                           flags=re.IGNORECASE)
    if not (headed and bodied):
        raise ArchiveError("HTML has no <head> or <body>")
    return page


# ---------------------------------------------------------------------------

def entry_for(campaign, year, month):
    return {
        "id": campaign["id"],
        "year": year,
        "month": calendar.month_name[month],
        "month_number": month,
        "subject": campaign.get("subject") or "",
        "sent_at": campaign["sent_at"],
        "url": "/newsletters/%04d-%02d/" % (year, month),
    }


def sync(campaigns, root, existing):
    """Archive new issues; return the updated list of entries."""
    entries = {(e["year"], e["month_number"]): e for e in existing}
    for (year, month), campaign in sorted(select_issues(campaigns).items()):
        current = entries.get((year, month))
        if current and current["id"] == campaign["id"] \
                and (root / ARCHIVE_DIR / ("%04d-%02d" % (year, month)) / "index.html").exists():
            continue
        try:
            page = page_html(campaign, year, month, root)
        except ArchiveError as error:
            warn("Newsletter %s %d not archived: %s" % (calendar.month_name[month], year, error))
            continue
        out = root / ARCHIVE_DIR / ("%04d-%02d" % (year, month)) / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page, encoding="utf-8")
        entries[(year, month)] = entry_for(campaign, year, month)
        print("Archived %s %d (%s)" % (calendar.month_name[month], year, campaign["id"]))
    return sorted(entries.values(), key=lambda e: (e["year"], e["month_number"]), reverse=True)


def load_existing(path):
    try:
        return json.loads(path.read_text(encoding="utf-8")).get("issues", [])
    except FileNotFoundError:
        return []


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args(argv)
    root = args.root
    data_path = root / DATA_FILE
    existing = load_existing(data_path)
    print("Existing archive: %d issues" % len(existing))

    key = os.environ.get("EMAILOCTOPUS_API_KEY", "").strip()
    if not key:
        warn("EMAILOCTOPUS_API_KEY is not set; newsletter archive left unchanged.")
        return 0
    try:
        campaigns = fetch_campaigns(key)
    except (urllib.error.URLError, TimeoutError, ValueError, OSError) as error:
        warn("EmailOctopus API unavailable (%s); newsletter archive left unchanged." % error)
        return 0

    issues = sync(campaigns, root, existing)
    data = json.dumps({"issues": issues}, indent=2, ensure_ascii=False) + "\n"
    if not data_path.exists() or data_path.read_text(encoding="utf-8") != data:
        data_path.parent.mkdir(parents=True, exist_ok=True)
        data_path.write_text(data, encoding="utf-8")
    print("Newsletter archive: %d issues" % len(issues))
    return 0


if __name__ == "__main__":
    sys.exit(main())
