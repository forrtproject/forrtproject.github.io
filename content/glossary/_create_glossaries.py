import requests
import bs4
import re
import json
import pandas as pd
import os
import shutil

script_dir = os.path.dirname(os.path.abspath(__file__))
print(script_dir)

file_links = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpQJ-9pY0Bq7u2pm464pJpUCOMI4biMnqCHgYZuMETcRNBbHLPYT55jhDXGRx68qYhn3_z6PO90gQl/pub?gid=1617993088&single=true&output=csv'

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(file_links)

# Split the DataFrame by the 'Language' field
grouped = df.groupby('Language')

# Initialize an empty dictionary to store the formatted data
formatted_data = {}

# Iterate over each language group
for language, group in grouped:
    print(f"Processing {language}")
    formatted_data[language] = []

    for idx, row in group.iterrows():
        current_link = row['Link']
        source = requests.get(current_link).text
        soup = bs4.BeautifulSoup(source, 'html.parser')

        d = {}
        i = 0

        for header in soup.find_all('h4'):
            title = header.text.strip()
            if not title:
                continue
            i += 1
            d[f"glossary_{i}"] = {}
            entry = d[f"glossary_{i}"]
            entry['Title'] = title

            current_field = None

            # Iterate over the next siblings until the next <h4> or end of document
            for sibling in header.find_all_next():
                if sibling.name == 'h4' or sibling.name == 'h3':
                    break

                # Check and update the current field
                field_match = re.search(r"(Definition:|Related terms:|Reference(\(s\))?:|Drafted by:|Originally drafted by:|Reviewed \(or Edited\) by:|Translated by:|Translation reviewed by:)", sibling.text.strip())
                if field_match:
                    current_field = field_match.group(1).replace(':', '')
                    entry[current_field] = ''
                elif current_field:
                    entry[current_field] += ' ' + sibling.text.strip()

        # Split the Definition into Definition and German_Translation
        
        for glossary in d.values():
            pattern = r'\[.*?\]|\*\*\s*almost\s*(done|complete)\s*\*\*|#+\s*review needed\s*#+' # Remove status from title
            glossary['Title'] = re.sub(pattern, '', glossary['Title']).strip()
            if 'Definition' in glossary:
                definitions = re.split(rf'\[\s*{language.upper()}|\[{language.capitalize()}\]', glossary['Definition']) # Split by the language, accepting the various formats
                glossary['Definition'] = definitions[0].strip().replace('Definition:', '').strip()
                if len(definitions) > 1:
                    glossary['Translation'] = re.sub(r'^[^\w]+', '', definitions[1]).strip()
                else:
                    glossary['Translation'] = glossary['Definition']
                    
        for glossary in d.values():
            for key in list(glossary.keys()):
                glossary[key] = glossary[key].strip()
                if key in ['Drafted by', 'Reviewed (or Edited) by', 'Translated by', 'Translation reviewed by']:
                    glossary[key] = re.sub(r'\b[\w\s]+(?:\(or Edited\))? by\s*:', '', glossary[key]).strip()
                
                # Remove colons from the keys
                new_key = key.replace(':', '')
                if new_key != key:
                    glossary[new_key] = glossary.pop(key)
            
            if 'References' in glossary:
                glossary['References'] = re.sub(r'Reference(\(s\))?:', '', glossary['References']).strip()
            
            if 'Related terms' in glossary:
                glossary['Related_terms'] = re.sub(r'Related terms:', '', glossary['Related terms']).strip()
                glossary.pop('Related terms', None)

            if 'Definition' in glossary:
                glossary['Definition'] = re.sub(r'Definition:', '', glossary['Definition']).strip()

        if "glossary_1" in d:
            del d["glossary_1"]

        # Aggregate d into the formatted_data for the current language
        if language not in formatted_data:
            formatted_data[language] = []

        for glossary in d.values():
            formatted_data[language].append(glossary)

# Convert the formatted data into a list of dictionaries
merged_data = []
for language, entries in formatted_data.items():
    merged_data.append({language: entries})

# Export the merged list to a JSON file
output_file = os.path.join(script_dir, '_glossaries.json')
with open(output_file, 'w') as outfile:
    json.dump(merged_data, outfile)

print("Data successfully parsed.")


# Generate the md files
for language_data in merged_data:
    for language, entries in language_data.items():
        # Create directory for each language, or empty it except for the _index.md file
        if os.path.exists(os.path.join(script_dir, language)):
          for item in os.listdir(os.path.join(script_dir, language)):
              item_path = os.path.join(os.path.join(script_dir, language), item)
              if item != '_index.md':
                  if os.path.isdir(item_path):
                      shutil.rmtree(item_path)
                  else:
                      os.remove(item_path)
                      
        os.makedirs(os.path.join(script_dir, language), exist_ok=True)
        
        print(f"Generating {len(entries)} markdown files for {language}")
        
        for entry in entries:
            # Prepare the data for the .md file
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
            

            # Generate the file name using only the English title (without anything in brackets)
            file_name = entry.get("Title", "").split("\u00a0(")[0].split(" (")[0]
            file_name = re.sub(r'[^\w\s]', '_', file_name.replace(" ", "_")).lower().strip() 
            file_path = os.path.join(script_dir, language, file_name + ".md")
            
            
            if language == "english":
              json_data["aliases"] = ["/glossary/" + file_name]
                        
            with open(file_path, 'w', encoding='utf-8') as json_file:
              json.dump(json_data, json_file, ensure_ascii=False, indent=4)
              
              
        index_file_path = os.path.join(script_dir, language, "_index.md")
            
        if os.path.exists(index_file_path):
            print(f"Index for {language} found")
        else:
            print(f"BEWARE: index for {language} missing")

print("Markdown files successfully generated.")
