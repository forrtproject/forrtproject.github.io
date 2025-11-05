import pandas as pd
import os
import re

# --- Configuration ---

csv_export_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_IaXiYtB3iAmtDZ_XiQKrToRkxOlkXNAeNU2SIT_J9PxvsQyptga6Gg9c8mSvDZpwY6d8skswIQYh/pub?output=csv&gid=0'
extra_roles_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCsxHTnSSjYqhQSR2kT3gIYg82HiODjPat9y2TFPrZESYWxz4k8CZsOesXPD3C5dngZEGujtKmNZsa/pub?output=csv'
fields_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_IaXiYtB3iAmtDZ_XiQKrToRkxOlkXNAeNU2SIT_J9PxvsQyptga6Gg9c8mSvDZpwY6d8skswIQYh/pub?output=csv&gid=277271370"


# --- Utility Functions ---

def normalize_string(text):
    """
    Normalizes a string by converting it to lowercase, replacing spaces with hyphens,
    and removing special characters.
    """
    if pd.isna(text):
        return ""
    normalized = re.sub(r'[^\w\s-]', '', str(text)).strip().lower()
    return re.sub(r'\s+', '-', normalized)

def get_raw_roles_from_row(row, columns):
    """
    Extracts a list of raw role names (strings) from boolean columns in a DataFrame row.
    """
    return [col for col in columns if pd.notna(row[col]) and row[col]]

def concatenate_true_columns(row, columns):
    """
    Generates a formatted string for contributions based on boolean columns.
    Example: "as Project Manager and with *Developer* and *Reviewer*"
    """
    true_columns = get_raw_roles_from_row(row, columns)
    if not true_columns:
        return ""

    is_project_manager = 'Project Managers' in true_columns
    other_roles = [f'*{col}*' for col in true_columns if col != 'Project Managers']
    
    parts = []
    if is_project_manager:
        parts.append('as Project Manager')
    
    if other_roles:
        if len(other_roles) == 1:
            with_part = f"with {other_roles[0]}"
        else:
            with_part = 'with ' + ', '.join(other_roles[:-1]) + f' and {other_roles[-1]}'
        
        if is_project_manager:
            # Prepend 'and' if it follows 'as Project Manager'
            parts.append(f"and {with_part}")
        else:
            parts.append(with_part)

    return ' '.join(parts)

def format_name(row):
    """Formats a full name from first, middle, and surname parts."""
    first_name = row['First name'].strip() if pd.notna(row['First name']) else ""
    middle_name = row['Middle name']
    surname = row['Surname'].strip() if pd.notna(row['Surname']) else ""

    if pd.notna(middle_name) and middle_name.strip() != '':
        middle_initial = f"{middle_name.strip()[0]}."
        return f"{first_name} {middle_initial} {surname}"
    else:
        return f"{first_name} {surname}"

def extract_orcid_id(value):
    """Extracts ORCID iD from a string, handling URLs or direct IDs."""
    if not isinstance(value, str):
        return None
    
    value = value.strip()
    match = re.search(r'(\d{4}-){3}\d{3}[\dX]', value)
    if match:
        return match.group(0)
    return None


# --- 1. Load Source Data ---

print("--- Reading Source Data ---")
df_projects = pd.read_csv(csv_export_url)
df_roles = pd.read_csv(extra_roles_url)
column_mappings = pd.read_csv(fields_url)


# --- 2. Process Project-Specific Contributor Sheets ---

all_data_frames = []
print("--- Reading Project Contributor Data ---")
for _, project in df_projects.iterrows():
    project_name, url, project_url = project['Project Name'], project['CSV Link'], project['Project URL']
    try:
        data_frame = pd.read_csv(url)
        print(f"Read {len(data_frame)} contributors from '{project_name}'.")
        data_frame['Project Name'] = project_name
        data_frame['Project URL'] = project_url
        all_data_frames.append(data_frame)
    except Exception as e:
        print(f"Could not read or process URL for '{project_name}': {e}")

# Concatenate all project data frames
merged_data = pd.concat(all_data_frames, ignore_index=True)

# Rename role columns based on mappings
rename_dict = column_mappings.set_index('Fields')['Rename'].to_dict()
merged_data.rename(columns=rename_dict, inplace=True)

# Get list of valid, renamed role columns that are present in the data
columns_to_check_renamed = [name for name in rename_dict.values() if pd.notna(name)]
columns_present = [col for col in columns_to_check_renamed if col in merged_data.columns]

# Generate contribution strings and raw role lists
merged_data['Contributions'] = merged_data.apply(concatenate_true_columns, axis=1, columns=columns_present)
merged_data['raw_roles'] = merged_data.apply(get_raw_roles_from_row, axis=1, columns=columns_present)
merged_data['special_role'] = False

# Filter out rows with no contributions
merged_data = merged_data[merged_data['Contributions'] != ""].copy()


# --- 3. Process Extra Roles Sheet ---

rename_columns_df_roles = {
    'FORRT project(s)': 'Project Name',
    'Role': 'Contributions', # This is the raw role name
    'ORCID': 'ORCID iD',
    'URL': 'Project URL'
}
df_roles.rename(columns=rename_columns_df_roles, inplace=True)
df_roles['special_role'] = True
df_roles['raw_roles'] = df_roles['Contributions'].apply(lambda x: [x] if pd.notna(x) else [])


# --- 4. Combine and Clean Data ---

# Ensure both dataframes have the same essential columns before combining
required_cols = ['First name', 'Middle name', 'Surname', 'Project Name', 'Project URL', 'ORCID iD', 'Contributions', 'raw_roles', 'special_role']

# Combine data from project sheets and extra roles sheet
combined_data = pd.concat(
    [merged_data[required_cols], df_roles[required_cols]],
    ignore_index=True
)

# Clean and format data
combined_data['full_name'] = combined_data.apply(format_name, axis=1)
combined_data['ORCID iD'] = combined_data['ORCID iD'].apply(extract_orcid_id)

# Propagate ORCID iD within each contributor's grouping
combined_data['ORCID iD'] = combined_data.groupby('full_name')['ORCID iD'].transform(lambda x: x.ffill().bfill())


# --- 5. Aggregate by Contributor for Final Output ---

def aggregate_contributor_info(group):
    first_row = group.iloc[0]

    # Aggregate unique projects and roles
    all_projects = sorted(list(group['Project Name'].dropna().unique()))
    all_roles = sorted(list(set(role for roles_list in group['raw_roles'].dropna() for role in roles_list)))

    # Create normalized, comma-separated strings for data attributes
    normalized_projects = ",".join(normalize_string(p) for p in all_projects)
    normalized_roles = ",".join(normalize_string(r) for r in all_roles)

    # Recreate the detailed contribution string for display
    contribution_lines = []
    # Sort by special_role to have them appear first, then by project name
    for _, row in group.sort_values(by=['special_role', 'Project Name'], ascending=[False, True]).iterrows():
        if pd.isna(row['Project Name']) or pd.isna(row['Contributions']):
            continue
        
        prefix = 'as ' if row['special_role'] else ''
        linked_project = f"[{row['Project Name']}]({row['Project URL']})" if pd.notna(row['Project URL']) and row['Project URL'].strip() != '' else row['Project Name']
        line = f"{linked_project} {prefix}{row['Contributions']}"
        contribution_lines.append(line)

    return pd.Series({
        'full_name': first_row['full_name'],
        'surname': first_row['Surname'],
        'orcid': first_row['ORCID iD'] if pd.notna(first_row['ORCID iD']) else '',
        'contributions_html': '<br>'.join(contribution_lines),
        'normalized_projects': normalized_projects,
        'normalized_roles': normalized_roles
    })

print("--- Aggregating Contributor Data ---")
final_contributors_df = combined_data.groupby('full_name').apply(aggregate_contributor_info).reset_index(drop=True)

# Final sort by surname
final_contributors_df = final_contributors_df.sort_values(by='surname', key=lambda col: col.str.lower())

# Convert to list of dicts for template
contributors = final_contributors_df.to_dict(orient='records')

print(f"--- Processed {len(contributors)} unique contributors. ---")

# The 'contributors' list is now ready to be passed to a template engine.
# Example of what the data structure looks like for one contributor:
# {
#   'full_name': 'Jane A. Doe',
#   'surname': 'Doe',
#   'orcid': '0000-0001-2345-6789',
#   'contributions_html': '[Glossary] with *Editor*<br>[Turing Way] as Steering Committee',
#   'normalized_projects': 'glossary,turing-way',
#   'normalized_roles': 'editor,steering-committee'
# }