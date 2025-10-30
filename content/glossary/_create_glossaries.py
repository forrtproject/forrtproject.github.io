import csv
import json
import os
import re
import shutil
from io import StringIO
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKXOzAaBg19k2mjs6EIwY3la7DjX1XXDB2Wzkos4y3r7MS0f1g8bGskSEoQWkaAv4unczvpeGAQFwv/pub?gid=955789150&single=true&output=csv"

LANGUAGE_PREFIXES = {
    "EN": "english",
    "AR": "arabic",
    "DE": "german",
}

script_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Writing glossaries into {script_dir}")


def clean_value(value: str) -> str:
    if value is None:
        return ""
    value = str(value).strip()
    if not value:
        return ""
    lowered = value.lower()
    if lowered in {"na", "n/a", "none", "null"}:
        return ""
    return value


def clean_reference(value: str) -> str:
    value = clean_value(value)
    if not value:
        return ""
    value = value.replace("\\[", "").replace("\\]", "")
    citation_ids = re.findall(r"@([\w:-]+)", value)
    value_without_citations = re.sub(r"@([\w:-]+)", "", value).strip(" ,;")
    if value_without_citations:
        return value_without_citations
    if citation_ids:
        return ", ".join(citation_ids)
    return value


def split_values(value: str) -> list:
    value = clean_value(value)
    if not value:
        return []
    items = [item.strip() for item in value.split(";")]
    return [item for item in items if item]


print("Downloading glossary data from spreadsheet...")
try:
    with urlopen(CSV_URL, timeout=60) as response:
        csv_text = response.read().decode("utf-8-sig")
except (HTTPError, URLError) as exc:
    raise RuntimeError(f"Unable to download glossary data: {exc}") from exc

rows = list(csv.DictReader(StringIO(csv_text)))
print(f"Fetched {len(rows)} rows from glossary spreadsheet.")

formatted_data = {language: [] for language in LANGUAGE_PREFIXES.values()}

for row in rows:
    english_title = clean_value(row.get("EN_title"))
    english_definition = clean_value(row.get("EN_definition"))
    if not english_title:
        continue

    related_terms = clean_value(row.get("Related_terms"))
    base_reference = clean_reference(row.get("Reference"))
    original_author = clean_value(row.get("Originally drafted by")) or clean_value(row.get("Drafted by"))
    reviewed_by = clean_value(row.get("Reviewed (or Edited) by"))

    for prefix, language in LANGUAGE_PREFIXES.items():
        local_title = clean_value(row.get(f"{prefix}_title"))
        definition_key = "EN_definition" if prefix == "EN" else f"{prefix}_def"
        local_definition = clean_value(row.get(definition_key))

        if prefix == "EN" and not english_definition:
            english_definition = local_definition

        if prefix != "EN" and not local_title and not local_definition:
            continue

        if prefix == "EN":
            title = english_title
        else:
            if english_title and local_title:
                title = f"{english_title} ({local_title})"
            else:
                title = local_title or english_title

        entry = {
            "Title": title,
            "Definition": english_definition,
            "Translation": local_definition or english_definition,
            "Related_terms": related_terms,
            "Reference": base_reference,
            "Originally drafted by": original_author,
            "Reviewed (or Edited) by": reviewed_by,
        }

        localized_related = clean_value(row.get(f"{prefix}_rel"))
        localized_reference = clean_reference(row.get(f"{prefix}_refs"))
        translators = clean_value(row.get(f"{prefix}_transl"))
        translation_review = clean_value(row.get(f"{prefix}_review"))

        if localized_related:
            entry["Related_terms"] = localized_related
        if localized_reference:
            entry["Reference"] = localized_reference
        if translators:
            entry["Translated by"] = translators
        if translation_review:
            entry["Translation reviewed by"] = translation_review

        formatted_data[language].append(entry)

for language, entries in formatted_data.items():
    print(f"Prepared {len(entries)} entries for {language}")

merged_data = [{language: entries} for language, entries in formatted_data.items() if entries]

output_file = os.path.join(script_dir, "_glossaries.json")
with open(output_file, "w", encoding="utf-8") as outfile:
    json.dump(merged_data, outfile, ensure_ascii=False, indent=4)

print("Data successfully parsed and serialized.")

def remove_double_and_outer_asterisks(data):
    if isinstance(data, str):
        cleaned = data.replace("**", "").strip()
        if cleaned.startswith("*") and cleaned.endswith("*"):
            return cleaned[1:-1].strip()
        if cleaned.startswith("*"):
            return cleaned[1:].strip()
        if cleaned.endswith("*"):
            return cleaned[:-1].strip()
        return cleaned
    if isinstance(data, list):
        return [remove_double_and_outer_asterisks(item) for item in data]
    if isinstance(data, dict):
        return {key: remove_double_and_outer_asterisks(value) for key, value in data.items()}
    return data


def build_people_list(value: str) -> list:
    raw_value = clean_value(value)
    if not raw_value:
        return []
    if ";" in raw_value:
        parts = [item.strip() for item in raw_value.split(";")]
    else:
        parts = [item.strip() for item in raw_value.split(",")]
    return [item for item in parts if item]


def build_reference_list(value: str) -> list:
    refs = split_values(value)
    if not refs:
        return []
    cleaned_refs = []
    for ref in refs:
        cleaned = clean_reference(ref)
        if re.fullmatch(r"[\w:-]+(?:,\s*[\w:-]+)+", cleaned):
            cleaned_refs.extend([token.strip() for token in cleaned.split(",") if token.strip()])
        else:
            cleaned_refs.append(cleaned)
    return cleaned_refs


for language_data in merged_data:
    for language, entries in language_data.items():
        language_dir = os.path.join(script_dir, language)
        if os.path.exists(language_dir):
            for item in os.listdir(language_dir):
                item_path = os.path.join(language_dir, item)
                if item != "_index.md":
                    if os.path.isdir(item_path):
                        shutil.rmtree(item_path)
                    else:
                        os.remove(item_path)
        os.makedirs(language_dir, exist_ok=True)

        print(f"Generating {len(entries)} markdown files for {language}")

        for entry in entries:
            json_data = {
                "type": "glossary",
                "title": entry.get("Title", ""),
                "definition": entry.get("Translation", ""),
                "related_terms": split_values(entry.get("Related_terms", "")),
                "references": build_reference_list(entry.get("Reference", entry.get("Reference(s)", ""))),
                "alt_related_terms": [None],
                "drafted_by": build_people_list(entry.get("Originally drafted by", entry.get("Drafted by", ""))),
                "reviewed_by": build_people_list(entry.get("Reviewed (or Edited) by", "")),
                "language": language,
            }

            translators = build_people_list(entry.get("Translated by", ""))
            translation_reviewers = build_people_list(entry.get("Translation reviewed by", ""))
            if translators:
                json_data["translated_by"] = translators
            if translation_reviewers:
                json_data["translation_reviewed_by"] = translation_reviewers

            json_data = remove_double_and_outer_asterisks(json_data)

            file_name = json_data["title"].split(" (")[0].strip()
            file_name = re.sub(r"[^\w\s]", "_", file_name.replace(" ", "_")).lower().strip()
            file_name = re.sub(r"_+", "_", file_name).strip("_")
            file_path = os.path.join(language_dir, f"{file_name}.md")

            if language == "english":
                json_data["aliases"] = [f"/glossary/{file_name}"]

            with open(file_path, "w", encoding="utf-8") as json_file:
                json.dump(json_data, json_file, ensure_ascii=False, indent=4)

        index_file_path = os.path.join(language_dir, "_index.md")
        if os.path.exists(index_file_path):
            print(f"Index for {language} found")
        else:
            print(f"BEWARE: index for {language} missing")

print("Markdown files successfully generated.")

language_list = [lang for lang, entries in formatted_data.items() if entries]
language_slice = "{{ $allLanguages := slice " + " ".join([f'\"{lang}\"' for lang in language_list]) + " }}"

partials_file_path = os.path.join(script_dir, "../../layouts/glossary/single.html")

if os.path.exists(partials_file_path):
    with open(partials_file_path, "r", encoding="utf-8") as file:
        content = file.readlines()

    updated_content = []
    for line in content:
        if line.strip().startswith("{{ $allLanguages := slice"):
            updated_content.append(language_slice + "\n")
        else:
            updated_content.append(line)

    with open(partials_file_path, "w", encoding="utf-8") as file:
        file.writelines(updated_content)

    print(f"Updated {partials_file_path} with languages: {', '.join(language_list)}")
else:
    print(f"File not found: {partials_file_path}")
