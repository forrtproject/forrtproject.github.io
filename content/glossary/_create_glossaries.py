import requests
import re
import json
import pandas as pd
import os
import shutil
from io import StringIO

script_dir = os.path.dirname(os.path.abspath(__file__))
language_map = {
    'EN': 'english',
    'AR': 'arabic',
    'DE': 'german',
    'TR': 'turkish',
}

# Configuration
DEFAULT_SHEET_ID = '1IelzKlB7_UmnwbqgpEZnkFubB0ks-qFaIxhqEJGBH2g'
DEFAULT_GID = '955789150'
sheet_id = os.getenv('GLOSSARY_SHEET_ID', DEFAULT_SHEET_ID)
gid = os.getenv('GLOSSARY_SHEET_GID', DEFAULT_GID)
csv_url = f'https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}'

# Fetch and parse data
response = requests.get(csv_url)
response.raise_for_status()
response.encoding = 'utf-8'

df = pd.read_csv(StringIO(response.text))

# Extract unique language codes from column names
language_prefixes = set()
for col in df.columns:
    match = re.match(r'^([A-Z]{2})_', col)
    if match:
        language_prefixes.add(match.group(1))

languages = sorted(language_prefixes)
print(f"\nDetected {len(languages)} languages: {languages}")

# Load APA lookup
try:
    with open(os.path.join(script_dir, 'apa_lookup.json'), 'r', encoding='utf-8') as f:
        apa_lookup = json.load(f)
except FileNotFoundError:
    print("Warning: apa_lookup.json not found. References will not be formatted.")
    apa_lookup = {}

def process_references(references_text, apa_lookup, missing_refs_log=None):
    """Convert citation keys to APA format using the lookup"""
    if not references_text:
        return []

    citation_pattern = r'\\?\[@([^\\]+)\\?\]'
    matches = re.findall(citation_pattern, references_text)

    formatted_refs = []
    for match in matches:
        # Clean the key: remove markdown formatting, trailing punctuation, etc.
        key = match.strip()
        original_key = key  # Keep for logging

        # Remove markdown formatting
        key = re.sub(r'^\*+|\*+$', '', key)  # Remove leading/trailing asterisks
        key = re.sub(r'^_+|_+$', '', key)    # Remove leading/trailing underscores

        # Remove trailing punctuation
        key = re.sub(r'[,;:]+$', '', key)

        # Remove trailing digits that look like typos (e.g., "Pownall20210" -> "Pownall2021")
        key = re.sub(r'(\d{4})0+$', r'\1', key)

        if key in apa_lookup:
            formatted_refs.append(apa_lookup[key])
        else:
            # Try case-insensitive match
            key_lower = key.lower()
            ci_match = next((k for k in apa_lookup if k.lower() == key_lower), None)
            if ci_match:
                formatted_refs.append(apa_lookup[ci_match])
            else:
                # Log missing reference but don't include in output
                if missing_refs_log is not None:
                    missing_refs_log.add(original_key)
                print(f"Warning: Missing reference key '{original_key}' (cleaned: '{key}') - skipping")
    
    return list(dict.fromkeys(formatted_refs))

def safe_get(row, column, default=""):
    """Safely get a value from a pandas Series row"""
    try:
        if column in row.index and pd.notna(row[column]):
            return str(row[column]).strip()
        return default
    except Exception:
        return default

def sort_key_for_language(title, language_code):
    """Generate a sort key that handles language-specific character ordering."""
    key = title.lower()
    if language_code == 'TR':
        # Turkish alphabet order: ... c ç d ... g ğ h i ı j ... o ö p ... s ş t u ü v ...
        # Map special chars so they sort just after their base char
        key = key.replace('ç', 'cz').replace('ğ', 'gz').replace('ı', 'iz')
        key = key.replace('ö', 'oz').replace('ş', 'sz').replace('ü', 'uz')
    return key


def clean_filename(title, max_length=200):
    """Clean title for use as filename"""
    # Extract main title (before English title in square brackets)
    file_name = title.split(" [")[0].strip()
    # Replace spaces and special characters
    file_name = re.sub(r'[^\w\s]', '_', file_name.replace(" ", "_"))
    # Convert to lowercase and clean up multiple underscores
    file_name = file_name.lower().strip().replace("__", "_")
    # Truncate to avoid filesystem limits
    if len(file_name) > max_length:
        file_name = file_name[:max_length].rstrip("_")
    return file_name

# Process languages
formatted_data = {}
languages_to_process = [lang for lang in languages if lang in language_map]
missing_refs = set()  # Track missing references

for language_code in languages_to_process:
    print(f"Processing language: {language_code}")
    
    language_name = language_map.get(language_code, language_code.lower())
    
    # Get relevant columns
    language_columns = [col for col in df.columns if col.startswith(f'{language_code}_') and '_hide' not in col]
    common_columns = [
        'Related_terms', 
        'Reference', 
        'Originally drafted by', 
        'Drafted by',
        'Reviewed (or Edited) by',
    ]
    relevant_columns = list(set(common_columns + language_columns + (["EN_title"] if language_code != 'EN' else [])))
    
    language_df = df[relevant_columns].copy()
    language_entries = []
    
    for _, row in language_df.iterrows():
        en_title = safe_get(row, "EN_title")
        if not en_title:  # Skip empty titles
            continue

        # Generate title based on language
        if language_code == 'EN':
            title = en_title
        else:
            localized_title = safe_get(row, f"{language_code}_title")
            if localized_title:
                # Check if all English title words are already in the localized title
                en_words = set(re.sub(r'[^\w\s]', '', en_title).lower().split())
                local_words = set(re.sub(r'[^\w\s]', '', localized_title).lower().split())
                if en_words <= local_words:
                    title = localized_title
                else:
                    title = f"{localized_title} [{en_title}]"
            else:
                title = en_title

        # Process references
        raw_references = safe_get(row, "Reference")
        processed_references = process_references(raw_references, apa_lookup, missing_refs)

        # Build entry
        definition = safe_get(row, f"{language_code}_definition" if language_code == "EN" else f"{language_code}_def")
        if not definition:
            continue

        entry = {
            "type": "glossary",
            "title": title,
            "sort_key": sort_key_for_language(title, language_code),
            "definition": definition,
            "related_terms": list(dict.fromkeys(safe_get(row, "Related_terms").split("; "))) if safe_get(row, "Related_terms") else [],
            "references": processed_references,
            "drafted_by": [safe_get(row, "Originally drafted by") or safe_get(row, "Drafted by")] if (safe_get(row, "Originally drafted by") or safe_get(row, "Drafted by")) else [],
            "reviewed_by": list(dict.fromkeys(safe_get(row, "Reviewed (or Edited) by").replace("Reviewed (or Edited) by : ", "").split("; "))) if safe_get(row, "Reviewed (or Edited) by") else [],
            "alt_related_terms": [None],
            "language": language_name
        }

        # Add translation credits for non-English entries
        if language_code != 'EN':
            transl_col = f"{language_code}_transl"
            review_col = f"{language_code}_review"
            transl_val = safe_get(row, transl_col)
            review_val = safe_get(row, review_col)
            if transl_val:
                entry["translated_by"] = [name.strip() for name in re.split(r'[,;]', transl_val) if name.strip()]
            if review_val:
                entry["translation_reviewed_by"] = [name.strip() for name in re.split(r'[,;]', review_val) if name.strip()]

        # Add aliases for English entries
        if language_code == "EN":
            entry["aliases"] = ["/glossary/" + clean_filename(title)]

        language_entries.append(entry)
    
    formatted_data[language_name] = language_entries
    print(f"Created {len(language_entries)} entries for {language_name}")

# Create markdown files
for language_name, entries in formatted_data.items():
    language_dir = os.path.join(script_dir, language_name)
    # Remove existing directory to ensure deleted entries don't persist
    if os.path.exists(language_dir):
        shutil.rmtree(language_dir)
    os.makedirs(language_dir)
    
    print(f"Creating {len(entries)} markdown files for {language_name}")
    
    for entry in entries:
        file_name = clean_filename(entry['title'])
        file_path = os.path.join(language_dir, file_name + ".md")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(entry, f, ensure_ascii=False, indent=4)

print("Markdown files successfully generated.")

# Save combined JSON
merged_data = [{language: entries} for language, entries in formatted_data.items()]
output_file = os.path.join(script_dir, '_glossaries.json')
with open(output_file, 'w') as outfile:
    json.dump(merged_data, outfile, ensure_ascii=False, indent=4)

# Update Hugo template
languages_as_string = " ".join([f'"{lang}"' for lang in sorted(language_map.values())])  
language_slice = "{{ $allLanguages := slice " + languages_as_string + " }}"
partials_file_path = os.path.join(script_dir, "../../layouts/glossary/single.html")

if os.path.exists(partials_file_path):
    with open(partials_file_path, 'r', encoding='utf-8') as file:
        content = file.readlines()
    
    updated_content = []
    for line in content:
        if line.strip().startswith('{{ $allLanguages := slice'):
            updated_content.append(language_slice + '\n')
        else:
            updated_content.append(line)

    with open(partials_file_path, 'w', encoding='utf-8') as file:
        file.writelines(updated_content)

    print(f"Updated {partials_file_path} with languages: {', '.join(sorted(language_map.values()))}")
else:
    print(f"File not found: {partials_file_path}")

# Report missing references
if missing_refs:
    print(f"Missing reference keys found: {len(missing_refs)}")
    print("Missing keys:", sorted(missing_refs))

    # Save missing references for GitHub Actions
    missing_refs_file = os.path.join(script_dir, 'missing_references.txt')
    with open(missing_refs_file, 'w') as f:
        f.write("Missing Reference Keys:\n")
        f.write("======================\n\n")
        for ref in sorted(missing_refs):
            f.write(f"- {ref}\n")
    print(f"Missing references logged to: {missing_refs_file}")
else:
    print("All references found in lookup!")

print("Data successfully processed.")
