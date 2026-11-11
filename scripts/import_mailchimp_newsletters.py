#!/usr/bin/env python3
"""Copy the FORRT newsletter issues sent through Mailchimp (2022 to June 2025) to forrt.org.

Source: the Mailchimp archive pages that content/newsletters/index.md links to
(mailchi.mp, us14.campaign-archive.com and eepurl.com short links).

For each such entry the script writes static/newsletters/YYYY-MM/index.html,
copies its images to static/newsletters/images/ as WebP (with the same cleanup
as scripts/sync_newsletters.py), and points the entry's url at the copy. The
copies are committed: Mailchimp issues no longer change, so this is a one-off
import, and re-running it only processes entries that still link to Mailchimp.

Cleanup specific to Mailchimp's archive pages:
- the archive toolbar (share, translate, subscribe) and its scripts are removed;
- links wrapped in Outlook safelinks or Mailchimp click tracking are resolved
  to their destinations, since both carry recipient identifiers;
- preference, unsubscribe and forward links become plain text, the
  subscriber parameter is dropped from links to other Mailchimp issues, and
  Outlook's copies of the original tracked addresses are removed.
An issue that still contains a recipient-specific link is not imported.

Usage:
    python3 scripts/import_mailchimp_newsletters.py [--root DIR]
"""

import argparse
import calendar
import html
from pathlib import Path
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

sys.path.insert(0, str(Path(__file__).resolve().parent))
import sync_newsletters as sync  # noqa: E402

PAGE = Path("content/newsletters/index.md")
MAILCHIMP = re.compile(r"https?://(?:[\w-]+\.)?(?:mailchi\.mp|campaign-archive\.com|eepurl\.com)/", re.I)
MONTHS = {name: number for number, name in enumerate(calendar.month_name) if name}
ANCHOR = re.compile(r"<a\b([^>]*?)\shref=\"([^\"]*)\"([^>]*)>(.*?)</a\s*>", re.I | re.S)
RECIPIENT = re.compile(r"list-manage\.com|safelinks\.protection\.outlook\.com|\[UNIQID\]|[?&;]e=[0-9a-f]{6,}",
                       re.I)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def redirect_target(url):
    """Where a click-tracking URL points, without following it further."""
    opener = urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(url, headers={"User-Agent": sync.USER_AGENT})
    try:
        opener.open(req, timeout=sync.TIMEOUT)
    except urllib.error.HTTPError as error:
        if error.code in (301, 302, 303, 307, 308) and error.headers.get("Location"):
            return error.headers["Location"]
    except (urllib.error.URLError, OSError):
        pass
    return None


def without_recipient(url):
    parts = urllib.parse.urlsplit(url)
    query = [(k, v) for k, v in urllib.parse.parse_qsl(parts.query, keep_blank_values=True) if k != "e"]
    return urllib.parse.urlunsplit(parts._replace(query=urllib.parse.urlencode(query)))


def clean_link(match, cache):
    before, href, after, inner = match.groups()
    url = html.unescape(href)
    if "safelinks.protection.outlook.com" in url:
        url = urllib.parse.parse_qs(urllib.parse.urlsplit(url).query).get("url", [""])[0]
    if "list-manage.com/track/click" in url:
        if url not in cache:
            cache[url] = redirect_target(url)
        url = cache[url] or ""
    if not url or "list-manage.com" in url:
        return inner  # Preference, unsubscribe and forward links, and dead tracking links.
    if MAILCHIMP.match(url):
        url = without_recipient(url)
    return "<a%s href=\"%s\"%s>%s</a>" % (before, html.escape(url, quote=True), after, inner)


def remove_element(page, start_tag):
    """Remove the element that starts at start_tag (a <div>), with everything nested in it."""
    start = page.find(start_tag)
    if start < 0:
        return page
    depth = 0
    for match in re.finditer(r"<(/?)div\b[^>]*>", page[start:], re.I):
        depth += -1 if match.group(1) else 1
        if depth == 0:
            return page[:start] + page[start + match.end():]
    raise sync.ArchiveError("unbalanced %s" % start_tag)


def clean_page(source, cache):
    page = source.replace("\r\n", "\n")
    page = re.sub(r"<script\b.*?</script\s*>", "", page, flags=re.I | re.S)
    page = re.sub(r"<link\b[^>]*campaign-archive\.com[^>]*>", "", page, flags=re.I)
    page = re.sub(r"<body\b[^>]*id=\"archivebody\"[^>]*>", "", page, count=1, flags=re.I)
    page = remove_element(page, '<div id="awesomewrap">')
    page = ANCHOR.sub(lambda m: clean_link(m, cache), page)
    page = re.sub(r"\s(?:mc:\w+)(?:=\"[^\"]*\")?", "", page)
    # Outlook keeps the original (tracked) address when links are pasted from a received email.
    page = re.sub(r"\s(?:originalsrc|shash|data-auth|data-linkindex)=\"[^\"]*\"", "", page, flags=re.I)
    found = RECIPIENT.search(page)
    if found:
        raise sync.ArchiveError("recipient-specific link left: %s" % found.group(0))
    preview = re.search(r'class="mcnPreviewText"[^>]*>(.*?)</span>', page, re.S)
    preview = html.unescape(re.sub(r"<[^>]+>", "", preview.group(1))).strip() if preview else ""
    return page, preview


def entries(text):
    """(year, month, url, line start, line end) for each issue entry in the page's front matter."""
    year = None
    for match in re.finditer(r"^\s*- year: (\d{4})$|^\s*- month: \"(\w+)\"\n\s*url: \"([^\"]+)\"$", text, re.M):
        if match.group(1):
            year = int(match.group(1))
        else:
            yield year, MONTHS[match.group(2)], match.group(3), match.start(3), match.end(3)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args(argv)
    root = args.root
    text = (root / PAGE).read_text(encoding="utf-8")
    cache, done, failed = {}, 0, 0
    for year, month, url, start, end in reversed(list(entries(text))):  # Back to front keeps offsets valid.
        if not MAILCHIMP.match(url):
            continue
        label = "%s %d" % (calendar.month_name[month], year)
        try:
            source = sync.request(without_recipient(url)).decode("utf-8")
            page, preview = clean_page(source, cache)
            page = sync.finish_page(page, year, month, preview, root)
        except (sync.ArchiveError, urllib.error.URLError, OSError, UnicodeDecodeError) as error:
            sync.warn("Newsletter %s not imported: %s" % (label, error))
            failed += 1
            continue
        out = root / sync.ARCHIVE_DIR / ("%04d-%02d" % (year, month)) / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page, encoding="utf-8")
        text = text[:start] + "/newsletters/%04d-%02d/" % (year, month) + text[end:]
        done += 1
        print("Imported %s from %s" % (label, url))
    (root / PAGE).write_text(text, encoding="utf-8")
    unresolved = sum(1 for target in cache.values() if not target)
    print("Imported %d issues, %d failed; %d tracked links resolved, %d dropped as dead"
          % (done, failed, len(cache) - unresolved, unresolved))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
