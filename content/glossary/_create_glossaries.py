import requests
import re
import json
import pandas as pd
import os
import shutil
import unicodedata

script_dir = os.path.dirname(os.path.abspath(__file__))
print(script_dir)

file_links = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpQJ-9pY0Bq7u2pm464pJpUCOMI4biMnqCHgYZuMETcRNBbHLPYT55jhDXGRx68qYhn3_z6PO90gQl/pub?gid=1617993088&single=true&output=csv'

df = pd.read_csv(file_links)
print("file links read")
grouped = df.groupby('Language')
formatted_data = {}

# Mapping from extracted names to (Full English Name, Arabic Name)
TRANSLATOR_MAPPING = {
    "ali h. al-hoorie": ("Ali H. Al-Hoorie", "علي حسين الحوري"),
    "amani aloufi": ("Amani A. Aloufi", "أماني عبدالرحمن العوفي"),
    "amani a. aloufi": ("Amani A. Aloufi", "أماني عبدالرحمن العوفي"),
    "asma alzahrani": ("Asma A. Alzahrani", "أسماء علي الزهراني"),
    "asma a. alzahrani": ("Asma A. Alzahrani", "أسماء علي الزهراني"),
    "hala alghamdi": ("Hala M. Alghamdi", "هلا الغامدي"),
    "hala m. alghamdi": ("Hala M. Alghamdi", "هلا الغامدي"),
    "ahlam ahmed": ("Ahlam Ahmed Almehmadi", "أحلام أحمد المحمادي"),
    "ahlam ahmed almehmadi": ("Ahlam Ahmed Almehmadi", "أحلام أحمد المحمادي"),
    "hiba alomary": ("Hiba A. Alomary", "هبة علي العُمري"),
    "hiba a. alomary": ("Hiba A. Alomary", "هبة علي العُمري"),
    "zainab alsuhaibani": ("Zainab Abdullah Alsuhaibani", "زينب عبدالله السحيباني"),
    "zainab abdullah alsuhaibani": ("Zainab Abdullah Alsuhaibani", "زينب عبدالله السحيباني"),
    "abdulsamad humaidan": ("Abdulsamad Yahya Humaidan", "عبد الصمد يحيى حميدان"),
    "abdulsamad yahya humaidan": ("Abdulsamad Yahya Humaidan", "عبد الصمد يحيى حميدان"),
    "naif masrahi": ("Naif Ali Masrahi", "نايف علي مسرحي"),
    "naif ali masrahi": ("Naif Ali Masrahi", "نايف علي مسرحي"),
    "awatif alruwaili": ("Awatif K. Alruwaili", "عواطف كاتب الرويلي"),
    "awatif k. alruwaili": ("Awatif K. Alruwaili", "عواطف كاتب الرويلي"),
    "mahdi aben ahmed": ("Mahdi R. Aben Ahmed", "مهدي رضاء أبن أحمد"),
    "mahdi r. aben ahmed": ("Mahdi R. Aben Ahmed", "مهدي رضاء أبن أحمد"),
    "ruwayshid": ("Ruwayshid N. Alruwaili", "رويشد نافع الرويلي"),
    "ruwayshid n. alruwaili": ("Ruwayshid N. Alruwaili", "رويشد نافع الرويلي"),
    "hussain mohammed alzubaidi": ("Hussain Mohammed Alzubaidi", "حسين محمد الزبيدي"),
    "nazik alnour": ("Nazik Noaman A. Alnour", "نازك نعمان أحمد النور"),
    "nazik noaman a. alnour": ("Nazik Noaman A. Alnour", "نازك نعمان أحمد النور"),
    "moustafa mohammed shalaby": ("Moustafa Mohammed Shalaby", "مصطفي محمد شلبي"),
    "nabil sayed": ("Nabil Ali Sayed", "نبيل علي سعيد"),
    "nabil ali sayed": ("Nabil Ali Sayed", "نبيل علي سعيد"),
    "mai helmy": ("Mai Salah El din Helmy", "مي صلاح الدين حلمي"),
    "mai salah el din helmy": ("Mai Salah El din Helmy", "مي صلاح الدين حلمي"),
    "ahmed hakami": ("Ahmed Hadi Hakami", "أحمد هادي حكمي"),
    "ahmed hadi hakami": ("Ahmed Hadi Hakami", "أحمد هادي حكمي"),
    "alaa m. saleh": ("Alaa M. Saleh", "آلاء مأمون صالح"),
    "alaa saleh": ("Alaa M. Saleh", "آلاء مأمون صالح"),
    "sarah almutairi": ("Sarah S. Almutairi", "ساره المطيري"),
    "sarah s. almutairi": ("Sarah S. Almutairi", "ساره المطيري"),
    "mohammed mohsen": ("Mohammed Ali Mohsen", "محمد محسن"),
    "mohammed ali mohsen": ("Mohammed Ali Mohsen", "محمد محسن")
}

def normalize_arabic_text(text):
    # Remove diacritics
    text = re.sub(r'[\u064B-\u065F\u0670]', '', text)
    return text

def update_arabic_index(script_dir, entries):
    print("Updating Arabic Index with Translators...")
    
    names = set()
    for entry in entries:
        raw_names = []
        if 'Translated by' in entry:
            raw_names.append(entry['Translated by'])
        if 'Translation reviewed by' in entry:
            raw_names.append(entry['Translation reviewed by'])
            
        for raw in raw_names:
            # Cleaning logic
            clean = raw.replace('**', '')
            clean = re.split(r'###', clean)[0]
            clean = re.sub(r'\{.*?\}', '', clean)
            parts = re.split(r'[,;،]|\s{2,}', clean)
            
            for p in parts:
                name = p.strip()
                name = re.sub(r'^Dr\.\s*', '', name, flags=re.IGNORECASE)
                name = normalize_arabic_text(name)
                name = name.strip(' .-_')
                
                if len(name) < 3 or len(name) > 40: continue
                if "http" in name or "www" in name: continue
                if "Glossary" in name and "|" in name: continue
                if "Looking for something else" in name: continue
                if "Term coined" in name: continue
                if "_" in name: continue
                if len(name) <= 2: continue
                
                name = ' '.join(name.split())
                if name:
                    names.add(name)

    # Match with mapping
    final_rows = []
    seen_full_names = set()
    
    for name in names:
        key = name.lower()
        if key in TRANSLATOR_MAPPING:
            full_eng, arabic = TRANSLATOR_MAPPING[key]
            if full_eng not in seen_full_names:
                final_rows.append((full_eng, arabic))
                seen_full_names.add(full_eng)
        else:
            # Fallback
            if name not in seen_full_names:
                final_rows.append((name, ""))
                seen_full_names.add(name)
                
    # Sort by English name
    final_rows.sort(key=lambda x: x[0])
    
    # Generate Table
    table_md = "**Arabic Glossary Translation Team**\n\n"
    table_md += "|  |  |\n|---|---|\n"
    for eng, ara in final_rows:
        table_md += f"| {eng} | {ara} |\n"
        
    # Update File
    index_path = os.path.join(script_dir, "arabic", "_index.md")
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex to find the section
        # We look for "### **شكر وتقدير للمترجمين**" and replace until "### **المرحلة الثانية**"
        # Or if not found, insert before Phase 2
        
        header = "### **شكر وتقدير للمترجمين**"
        next_section = "### **المرحلة الثانية**"
        
        new_section = f"{header}\n\nنود أن نعرب عن خالص شكرنا وتقديرنا للمترجمين والمراجعين الذين ساهموا في إنجاز هذا العمل:\n\n{table_md}\n"
        
        if header in content:
            # Replace existing
            pattern = re.compile(f"{re.escape(header)}.*?{re.escape(next_section)}", re.DOTALL)
            if pattern.search(content):
                content = pattern.sub(f"{new_section}{next_section}", content)
            else:
                # Header exists but next section not found? Append?
                # Just replace header and following text
                pass 
        else:
            # Insert before Phase 2
            if next_section in content:
                content = content.replace(next_section, f"{new_section}{next_section}")
            else:
                # Append to end
                content += f"\n\n{new_section}"
                
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Arabic index updated successfully.")
    else:
        print("Arabic index file not found.")

def parse_md_terms(md_text, language):
    
    # Preprocess to clean malformed section titles
    md_text = re.sub(r'^####\s*---\s*\n+', '#### ', md_text, flags=re.MULTILINE)
    
    # Only start parsing after we find the 'Term placeholder' heading
    start_index = None
    lines = md_text.split('\n')
    for idx, line in enumerate(lines):
        if re.search(r'^####\s+\*\*Term placeholder', line.strip(), flags=re.IGNORECASE):
            start_index = idx
            break
    if start_index is None:
        return {}

    d = {}
    i = 0
    current_key = None
    current_field = None
    found_header = False

    # Parse from the next line after we find 'Term placeholder'
    idx = start_index + 1
    while idx < len(lines):
        line = lines[idx].rstrip()

        # Detect a new term heading (#### **Term** ...)
        if re.match(r'^####\s+\*\*', line):
            found_header = True
            i += 1
            current_key = f"glossary_{i}"
            d[current_key] = {}
            d[current_key]['Title'] = re.sub(r'####\s+\*\*|\*\*\s*$', '', line).strip()
            # Remove anchors for internal fields
            d[current_key]['Title'] = re.sub(r'\s*\{#[^}]*\}', '', d[current_key]['Title']).strip()
            current_field = None
            idx += 1
            continue

        # Skip until we see the first heading after the placeholder
        if not found_header:
            idx += 1
            continue

        # Stop at next heading or "----" separator
        if re.match(r'^####\s+', line) or re.match(r'^---+', line):
            idx += 1
            continue

        # Match fields like **Definition:** or Definition: or **Reference(s):**
        field_match = re.search(
            r'^\**(Definition|Related terms|Reference(\(s\))?|Drafted by|Originally drafted by|Reviewed \(or Edited\) by|Translated by|Translation reviewed by)\**:\s*(.*)', 
            line.strip(), 
            flags=re.IGNORECASE
        )
        if field_match and current_key:
            # Group(1) is the field name, group(3) is the text after the colon
            current_field = field_match.group(1).replace(':', '')
            # Initialize or append the field
            d[current_key][current_field] = field_match.group(3).strip()
        elif current_field and current_key:
            # Continue appending lines to the current field
            d[current_key][current_field] += ' ' + line.strip()
        idx += 1

    # Clean up dictionary: split definition vs. translation, rename keys, etc.
    for glossary in d.values():

        # Define the pattern using a raw string to handle backslashes correctly
        pattern = r"""
            \[.*?\] |                                 # Matches any text within square brackets
            \\\\*\*almost\s+done\\\\*\* |             # Matches '\*\*almost done\*\*'
            \\\\*\*almost\s+complete\\\\*\* |         # Matches '\*\*almost complete\*\*'
            \\\\*\#review\s+needed\\\\*\# |             #  Matches headers like '## review needed ##'
            \\\\+                                     # Matches one or more backslashes
        """

        # Compile the pattern with verbose flag for better readability
        regex = re.compile(pattern, re.IGNORECASE | re.VERBOSE)
        glossary['Title'] = regex.sub('', glossary['Title']).strip()
        glossary['Title'] = re.sub("\\\\\*", '', glossary['Title'])
        glossary['Title'] = re.sub("\\\\", '', glossary['Title'])
        
        if 'Definition' in glossary:
            definitions = re.split(rf'(?:\\?\[\s*:?{language.upper()}:?\\?\]|\\?\[\s*:?{language.capitalize()}:?\\?\])', glossary['Definition'])
            glossary['Definition'] = definitions[0].replace('Definition:', '').strip()
            if len(definitions) > 1:
                glossary['Translation'] = re.sub(r'^[^\w]+', '', definitions[1]).strip()
            else:
                glossary['Translation'] = glossary['Definition']

    # Further tidying
    for glossary in d.values():
        for key in list(glossary.keys()):
            glossary[key] = glossary[key].strip()
            if key in ['Drafted by', 'Reviewed (or Edited) by', 'Translated by', 'Translation reviewed by']:
                # Remove trailing " by:" from these fields
                glossary[key] = re.sub(r'\b[\w\s]+(?:\(or Edited\))?\s*by\s*:', '', glossary[key]).strip()
            new_key = key.replace(':', '')
            if new_key != key:
                glossary[new_key] = glossary.pop(key)

        if 'References' in glossary:
            glossary['References'] = re.sub(r'Reference(\(s\))?:', '', glossary['References']).strip()

        if 'Related terms' in glossary:
            glossary['Related_terms'] = re.sub(r'Related terms:', '', glossary['Related terms']).strip()
            glossary.pop('Related terms', None)

        if 'Definition' in glossary:
            glossary['Definition'] = glossary['Definition'].replace('Definition:', '').strip()

    return d

for language, group in grouped:
    print(f"Processing {language}")
    formatted_data[language] = []
    for _, row in group.iterrows():
        # Truncate at /edit if present
        current_link = row['Link'].split('/edit')[0].strip() + '/export?format=md'
        source = requests.get(current_link).text
        d = parse_md_terms(source, language)

        if language not in formatted_data:
            formatted_data[language] = []
        for glossary in d.values():
            formatted_data[language].append(glossary)

merged_data = []
for language, entries in formatted_data.items():
    merged_data.append({language: entries})

output_file = os.path.join(script_dir, '_glossaries.json')
with open(output_file, 'w') as outfile:
    json.dump(merged_data, outfile, ensure_ascii=False, indent=4)

print("Data successfully parsed.")

# Generate the md files
for language_data in merged_data:
    for language, entries in language_data.items():
        if os.path.exists(os.path.join(script_dir, language)):
            for item in os.listdir(os.path.join(script_dir, language)):
                item_path = os.path.join(script_dir, language, item)
                if item != '_index.md':
                    if os.path.isdir(item_path):
                        shutil.rmtree(item_path)
                    else:
                        os.remove(item_path)
        os.makedirs(os.path.join(script_dir, language), exist_ok=True)
        
        print(f"Generating {len(entries)} markdown files for {language}")
        
        for entry in entries:
            json_data = {
                "type": "glossary",
                "title": entry.get("Title", ""),
                "definition": entry.get("Translation", ""),
                "related_terms": entry.get("Related_terms", "").split("; "),
                "references": [entry.get("Reference", entry.get("Reference(s)", ""))],
                "alt_related_terms": [None],
                "drafted_by": [entry.get("Originally drafted by", entry.get("Drafted by", ""))],
                "reviewed_by": entry.get("Reviewed (or Edited) by", "").replace("Reviewed (or Edited) by : ", "").split("; "),
                "language": language
            }
            
            def remove_double_and_outer_asterisks(data):
                if isinstance(data, str):
                    # Remove double asterisks
                    cleaned = data.replace("**", "").strip()
                    # Remove single asterisks at the start and end of the string
                    if cleaned.startswith("*") and cleaned.endswith("*"):
                        return cleaned[1:-1].strip()
                    elif cleaned.startswith("*"):
                        return cleaned[1:].strip()
                    elif cleaned.endswith("*"):
                        return cleaned[:-1].strip()
                    return cleaned
                elif isinstance(data, list):
                    return [remove_double_and_outer_asterisks(item) for item in data]  
                elif isinstance(data, dict):
                    return {key: remove_double_and_outer_asterisks(value) for key, value in data.items()}  
                return data            
            
            json_data = remove_double_and_outer_asterisks(json_data)

            # Clean filename
            file_name = json_data['title'].split(" (")[0].strip()
            file_name = re.sub(r'[^\w\s]', '_', file_name.replace(" ", "_")).lower().strip().replace("__", "_")
            file_path = os.path.join(script_dir, language, file_name + ".md")
            
            if file_name.endswith("__"):
                print("Title:", json_data['title'])
                print("Filename:", file_name)

            if language == "english":
                json_data["aliases"] = ["/glossary/" + file_name]

            with open(file_path, 'w', encoding='utf-8') as json_file:
                json.dump(json_data, json_file, ensure_ascii=False, indent=4)
              
        index_file_path = os.path.join(script_dir, language, "_index.md")
        if os.path.exists(index_file_path):
            print(f"Index for {language} found")
        else:
            print(f"BEWARE: index for {language} missing")
            
        # Update Arabic Index with Translators
        if language == "arabic":
            update_arabic_index(script_dir, entries)

print("Markdown files successfully generated.")

# Update available languages for selection

language_list = grouped.groups.keys()  
languages_as_string = " ".join([f'"{lang}"' for lang in language_list])  
language_slice = "{{ $allLanguages := slice " + languages_as_string + " }}"

partials_file_path = os.path.join(script_dir, "../../layouts/glossary/single.html")

if os.path.exists(partials_file_path):
    with open(partials_file_path, 'r', encoding='utf-8') as file:
        content = file.readlines()
    
    # Look for the line defining $allLanguages and replace it
    updated_content = []
    for line in content:
        if line.strip().startswith('{{ $allLanguages := slice'):
            updated_content.append(language_slice + '\n')  # Replace with the new slice
        else:
            updated_content.append(line)

    # Write back the updated file
    with open(partials_file_path, 'w', encoding='utf-8') as file:
        file.writelines(updated_content)

    print(f"Updated {partials_file_path} with languages: {', '.join(language_list)}")
else:
    print(f"File not found: {partials_file_path}")
