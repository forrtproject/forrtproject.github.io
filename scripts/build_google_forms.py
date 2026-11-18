#!/usr/bin/env python3
"""Build the definitions of the Google Forms that forrt.org renders as its own forms.

Source: the public viewform page of each Google Form listed in FORMS.
Output: assets/gforms/<form id>.json, read by layouts/shortcodes/gform.html.

    python3 scripts/build_google_forms.py          # rewrite the definitions from the live forms
    python3 scripts/build_google_forms.py --check  # compare the definitions with the live forms

The site posts answers to Google without being able to read the reply, so Google discards a
response that no longer matches the form and the visitor is not told. The script stops on any
feature the site's form does not reproduce (sections, branching, answer validation, other
question types) rather than writing a definition that would lose responses.

.github/workflows/google-forms-check.yml runs --check every hour. It exits 1 if a form has changed
or can no longer be reproduced, and 2 if Google could not be reached.
"""

import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

FORMS = {
    "mentee": "1FAIpQLSfY6yQ2givfg1TBoCuh_55HrUE7YsEjKAIj0-4MidII_3LSEg",
    "mentor": "1FAIpQLSfkbhb2qSxj_wj5qXYQAFZZ0WxkFyLChL0ZFYnWL0QVMaSw8w",
    "resources": "1FAIpQLSfPceN5opEeauCBSvapoB-ADpH0IoT24XOLfQGaVEF0EJGFOA",
    "lesson plans feedback": "1FAIpQLSckPkeCR6_hsmxqV9yQ66oLgLOhnnHBrk4ejgIBTsOQ0mZ6gg",
    "anonymous feedback": "1FAIpQLSebwqYgFmH3QJIMtPFUhuKeU1Rdbz5WqwP8iXd2cUPgZvUHRg",
}

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "assets" / "gforms"
DEFAULT_CONFIRMATION = "Your response has been recorded."
EMAIL_FROM_RESPONDER = 3

QUESTION_TYPES = {0: "short", 1: "paragraph", 2: "radio", 4: "checkbox"}
TEXT_ONLY_TYPES = {6, 11}  # A text block, and an image whose caption is kept without the image.


class FormNotSupported(Exception):
    """The form uses something the site's form cannot reproduce."""


class GoogleUnreachable(Exception):
    """Google did not answer, which says nothing about the form."""


class RichText(HTMLParser):
    """Keep links and emphasis from Google's rich text, and turn blocks into line breaks."""

    INLINE = {"b", "strong", "i", "em", "u"}
    BLOCK = {"div", "p", "li", "ul", "ol"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.open_links = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.INLINE:
            self.parts.append(f"<{tag}>")
        elif tag == "br":
            self.parts.append("<br>")
        elif tag in self.BLOCK:
            self.line_break()
        elif tag == "a":
            href = dict(attrs).get("href") or ""
            if re.match(r"https?://|mailto:", href):
                self.parts.append(f'<a href="{html.escape(href)}" target="_blank" rel="noopener">')
                self.open_links += 1

    def handle_endtag(self, tag):
        if tag in self.INLINE:
            self.parts.append(f"</{tag}>")
        elif tag in self.BLOCK:
            self.line_break()
        elif tag == "a" and self.open_links:
            self.parts.append("</a>")
            self.open_links -= 1

    def handle_data(self, data):
        self.parts.append(html.escape(data.replace("\xa0", " "), quote=False))

    def line_break(self):
        if self.parts and self.parts[-1] != "<br>":
            self.parts.append("<br>")


def rich_text(markup):
    """Return Google's rich text reduced to the tags the site allows."""
    if not markup:
        return ""
    parser = RichText()
    parser.feed(markup)
    parser.close()
    text = "".join(parser.parts)
    text = re.sub(r"(<br>\s*){3,}", "<br><br>", text)
    return re.sub(r"^(\s|<br>)+|(\s|<br>)+$", "", text)


def plain_as_rich(text):
    """Escape plain text for use where rich text is expected, keeping its line breaks."""
    return html.escape((text or "").replace("\xa0", " ").strip(), quote=False).replace("\n", "<br>")


def item_text(item, position, plain_position):
    """Return the rich version of an item's title or help text, or else its plain version."""
    rich = item[11] if len(item) > 11 and item[11] else []
    markup = rich[position] if len(rich) > position else None
    return rich_text(markup) or plain_as_rich(item[plain_position])


def parse_question(item):
    """Convert one item of Google's form data to the definition the site renders."""
    title = item_text(item, 1, 1)
    kind = item[3]
    if kind in TEXT_ONLY_TYPES:
        return {"type": "text", "title": title} if title else None
    if kind not in QUESTION_TYPES:
        raise FormNotSupported(f"question type {kind}: {item[1]!r}")

    entries = item[4]
    if len(entries) != 1:
        raise FormNotSupported(f"question with {len(entries)} answer fields: {item[1]!r}")
    entry = entries[0]
    if len(entry) > 4 and entry[4]:
        raise FormNotSupported(f"answer validation: {item[1]!r}")

    question = {
        "type": QUESTION_TYPES[kind],
        "entry": str(entry[0]),  # A string, because Hugo reads JSON numbers as floats.
        "title": title,
        "help": item_text(item, 2, 2),
        "required": bool(entry[2]),
    }
    if kind in (2, 4):
        options = []
        for option in entry[1]:
            if len(option) > 2 and option[2]:
                raise FormNotSupported(f"branching: {item[1]!r}")
            if len(option) > 4 and option[4]:
                question["other"] = True
            else:
                options.append(option[0])
        question["options"] = options
    return question


def parse_form(form_id, page):
    """Convert a viewform page to the definition the site renders."""
    match = re.search(r"FB_PUBLIC_LOAD_DATA_\s*=\s*(.*?);\s*</script>", page, re.S)
    if not match:
        raise FormNotSupported("no public form data; the form may be closed or need a sign-in")
    data = json.loads(match.group(1))
    info = data[1]
    settings = info[10] or []
    if data[18] or (len(settings) > 6 and settings[6] not in (1, EMAIL_FROM_RESPONDER)):
        raise FormNotSupported("the form needs a Google sign-in")

    description = info[24][1] if len(info) > 24 and info[24] else None
    confirmation = info[2][0] if info[2] and info[2][0] else DEFAULT_CONFIRMATION
    items = [parse_question(item) for item in info[1] or []]
    return {
        "id": form_id,
        "title": (info[8] or "").strip(),  # Forms without a public title get no heading.
        "description": rich_text(description) or plain_as_rich(info[0]),
        "confirmation": confirmation.strip(),
        "collect_email": len(settings) > 6 and settings[6] == EMAIL_FROM_RESPONDER,
        "items": [item for item in items if item],
    }


def fetch(form_id, attempts=3, pause=20):
    url = f"https://docs.google.com/forms/d/e/{form_id}/viewform"
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                return response.read().decode("utf-8")
        except urllib.error.HTTPError as error:
            if error.code in (401, 403, 404):
                raise FormNotSupported(f"Google answered {error.code}; the form may need a sign-in or be gone")
            problem = error
        except (urllib.error.URLError, TimeoutError) as error:
            problem = error
        if attempt < attempts:
            time.sleep(pause)
    raise GoogleUnreachable(f"{form_id}: {problem}")


def label(question):
    """Name a question in a report, without its markup."""
    return re.sub(r"<[^>]+>", "", question["title"])[:80]


def differences(saved, live):
    """List what differs between a saved definition and the live form."""
    if saved is None:
        return ["no saved definition"]
    changes = [f"{key} changed" for key in ("title", "description", "confirmation", "collect_email")
               if saved.get(key) != live.get(key)]
    old = {question.get("entry", question["title"]): question for question in saved["items"]}
    new = {question.get("entry", question["title"]): question for question in live["items"]}
    changes += [f"question added: {label(new[key])}" for key in new if key not in old]
    changes += [f"question removed: {label(old[key])}" for key in old if key not in new]
    changes += [f"question changed: {label(new[key])}" for key in new if key in old and old[key] != new[key]]
    if not changes and saved["items"] != live["items"]:
        changes.append("questions reordered")
    return changes


def saved_definition(form_id):
    path = OUTPUT_DIR / f"{form_id}.json"
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else None


def check():
    """Report every form that no longer matches its saved definition."""
    problems = []
    for name, form_id in FORMS.items():
        try:
            live = parse_form(form_id, fetch(form_id))
        except FormNotSupported as problem:
            problems.append(f"{name}: {problem}")
            continue
        problems += [f"{name}: {change}" for change in differences(saved_definition(form_id), live)]
    for problem in problems:
        print(problem)
    if problems:
        return 1
    print(f"All {len(FORMS)} forms match their saved definitions.")
    return 0


def build():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    definitions = {}
    for name, form_id in FORMS.items():
        try:
            definitions[form_id] = parse_form(form_id, fetch(form_id))
        except FormNotSupported as problem:
            print(f"{name} ({form_id}): {problem}. No definitions were written.", file=sys.stderr)
            return 1
    for form_id, definition in definitions.items():
        text = json.dumps(definition, indent=2, ensure_ascii=False) + "\n"
        (OUTPUT_DIR / f"{form_id}.json").write_text(text, encoding="utf-8")
    print(f"Wrote {len(definitions)} form definitions to {OUTPUT_DIR}")
    return 0


def main():
    try:
        return check() if "--check" in sys.argv[1:] else build()
    except GoogleUnreachable as problem:
        print(f"Could not reach Google: {problem}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
