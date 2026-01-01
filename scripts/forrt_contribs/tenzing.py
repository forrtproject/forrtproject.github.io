import pandas as pd
import os
import re
import html
import json

def print_failures(failed_sheets):
    """Print a formatted list of failed sheets."""
    if failed_sheets:
        print("\nFailed sheets:")
        for failure in failed_sheets:
            print(f"  - {failure['project_name']}: {failure['error']}")

# Tenzing directory
csv_export_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_IaXiYtB3iAmtDZ_XiQKrToRkxOlkXNAeNU2SIT_J9PxvsQyptga6Gg9c8mSvDZpwY6d8skswIQYh/pub?output=csv&gid=0'
extra_roles_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCsxHTnSSjYqhQSR2kT3gIYg82HiODjPat9y2TFPrZESYWxz4k8CZsOesXPD3C5dngZEGujtKmNZsa/pub?output=csv'

# Use pandas to read the CSV
try:
    df = pd.read_csv(csv_export_url)
    print(f"✓ Successfully loaded main Tenzing index with {len(df)} projects")
except Exception as e:
    # Catch all exceptions - we need the main index to proceed
    print(f"✗ FATAL: Failed to load main Tenzing index: {str(e)}")
    raise

try:
    df_roles = pd.read_csv(extra_roles_url)
    print(f"✓ Successfully loaded extra roles with {len(df_roles)} entries")
except Exception as e:
    # Catch all exceptions - we need the extra roles to proceed
    print(f"✗ FATAL: Failed to load extra roles: {str(e)}")
    raise

# Assuming 'df' contains the index data with Tenzing Links
all_data_frames = []
failed_sheets = []

print("--- Reading Contributor Data ---")
# Loop over both the Project Names and the Tenzing Links
for project_name, url, project_url in zip(df['Project Name'], df['CSV Link'], df['Project URL']):
    try:
        # Make sure each URL is transformed into a CSV export URL as shown above
        data_frame = pd.read_csv(url)
        
        # --- LOGGING ADDED HERE ---
        # Log the number of contributors read from the current project
        print(f"✓ Read {len(data_frame)} contributors from '{project_name}'.")

        # Add a new column with the project name
        data_frame['Project Name'] = project_name
        data_frame['Project URL'] = project_url
        
        all_data_frames.append(data_frame)
    except Exception as e:
        # Catch all exceptions (network, parsing, etc.) to maximize robustness
        # Log the failure and continue processing other sheets
        error_msg = f"✗ Failed to read '{project_name}': {str(e)}"
        print(error_msg)
        failed_sheets.append({
            'project_name': project_name,
            'url': url,
            'error': str(e)
        })
        continue

# Check if we successfully loaded at least one project
if not all_data_frames:
    error_msg = "✗ FATAL: No project data could be loaded. All sheets failed."
    print(error_msg)
    print_failures(failed_sheets)
    raise RuntimeError(error_msg)

print(f"\n✓ Successfully loaded {len(all_data_frames)} out of {len(df)} projects")
if failed_sheets:
    print(f"⚠ Warning: {len(failed_sheets)} project(s) failed to load:")
    print_failures(failed_sheets)

# Concatenate all data frames
merged_data = pd.concat(all_data_frames, ignore_index=True)

def concatenate_true_columns(row, columns):
    true_columns = [col for col in columns if pd.notna(row[col]) and row[col]]
    if 'Project Managers' in true_columns:
        other_columns = [f'*{col}*' for col in true_columns if col != 'Project Managers']
        if other_columns:
            return 'as Project Manager and with ' + ', '.join(other_columns[:-1]) + (' and ' if len(other_columns) > 1 else '') + other_columns[-1]
        else:
            return 'as Project Manager'
    else:
        return 'with ' + ', '.join(f'*{col}*' for col in true_columns[:-1]) + (' and ' if len(true_columns) > 1 else '') + f'*{true_columns[-1]}*'

# List of column names to check for TRUE values
fields_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_IaXiYtB3iAmtDZ_XiQKrToRkxOlkXNAeNU2SIT_J9PxvsQyptga6Gg9c8mSvDZpwY6d8skswIQYh/pub?output=csv&gid=277271370"
try:
    column_mappings = pd.read_csv(fields_url)
    print(f"✓ Successfully loaded column mappings with {len(column_mappings)} fields")
except Exception as e:
    print(f"✗ FATAL: Failed to load column mappings: {str(e)}")
    raise

# Extracting Column A (Fields) as columns_to_check
columns_to_check = column_mappings['Fields'].tolist()

# Renaming columns in the dataframe based on Column B (Rename)
rename_dict = column_mappings.set_index('Fields')['Rename'].to_dict()
merged_data.rename(columns=rename_dict, inplace=True)

# Filtering rows based on the updated columns_to_check list
# Note: columns_to_check needs to be updated to the renamed columns for the filter to work correctly
columns_to_check = [rename_dict[col] for col in columns_to_check if col in rename_dict]
# Remove columns not present
columns_present = [col for col in columns_to_check if col in merged_data.columns]
columns_dropped = set(columns_to_check) - set(columns_present)
if columns_dropped:
    print(f"Note: The following columns were not found and thus ignored: {', '.join(columns_dropped)}")
merged_data = merged_data[merged_data[columns_present].any(axis=1)]

# Apply the function to each row
merged_data['Contributions'] = merged_data.apply(concatenate_true_columns, axis=1, columns=columns_present)

# Merge contributions with extra roles
# Mapping of column names to Tenzing sheets
rename_columns = {
    'First name': 'First name',
    'Middle name': 'Middle name',
    'Surname': 'Surname',
    'FORRT project(s)': 'Project Name',
    'Role': 'Contributions',
    'ORCID': 'ORCID iD',
    'URL': 'Project URL'
}
df_roles.rename(columns=rename_columns, inplace=True)
df_roles['special_role'] = True

# Select only the columns needed for the final output
selected_columns = ['Contributions', 'First name', 'Middle name', 'Surname', 'Project Name', 'Project URL', 'ORCID iD']
merged_data = merged_data[selected_columns]
merged_data['special_role'] = False

merged_data = pd.concat([df_roles, merged_data], axis=0)
merged_data.reset_index(drop=True, inplace=True)

# Sort based on surname
merged_data['sort_order'] = merged_data['Surname']
merged_data = merged_data.sort_values(by='sort_order')
merged_data = merged_data.drop(columns='sort_order')

# Strip spaces from 'ORCID iD' in merged data
merged_data['ORCID iD'] = merged_data['ORCID iD'].str.strip()

# Function to format the full name
def format_name(row):
    # Extract the first name, middle name initial, and surname
    first_name = row['First name'].strip() if pd.notna(row['First name']) else ""
    middle_name = row['Middle name']
    surname = row['Surname'].strip() if pd.notna(row['Surname']) else ""

    # Check if the middle name is not NaN and not an empty string
    if pd.notna(middle_name) and middle_name != '':
        middle_initial = f"{middle_name[0]}."
        full_name = f"{first_name} {middle_initial} {surname}"
    else:
        full_name = f"{first_name} {surname}"

    return full_name

# Apply name formatting
merged_data['full_name'] = merged_data.apply(format_name, axis=1)

# Propagate ORCID iD within each contributor's grouping
merged_data['ORCID iD'] = merged_data.groupby('full_name')['ORCID iD'].transform(lambda x: x.ffill().bfill())

# Helper function to normalize project/role names for data attributes
def normalize_for_attribute(text):
    """Normalize text for use in HTML data-* attributes."""
    if pd.isna(text) or text == '':
        return ''
    
    # Lowercase + trim
    name = text.lower().strip()

    # Replace & with 'and'
    name = name.replace('&', 'and')

    # Replace ANY non-alphanumeric sequence with a hyphen
    name = re.sub(r'[^a-z0-9]+', '-', name)

    # Collapse multiple hyphens
    name = re.sub(r'-+', '-', name)

    # Remove leading/trailing hyphens
    name = name.strip('-')

    return name


# Group by 'ORCID iD' and concatenate the contributions

def concatenate_contributions(group):
    # Minimum original order for sorting later
    min_order = group['original_order'].min()

    # Format name once
    full_name = format_name(group.iloc[0])
    group = group.sort_values(by='special_role', ascending=False)

    # Collect projects and roles for data attributes
    projects = []
    roles = []

    for _, row in group.iterrows():
        project_name = row['Project Name']
        if pd.notna(project_name) and project_name != '':
            normalized_project = normalize_for_attribute(project_name)
            if normalized_project not in projects:
                projects.append(normalized_project)

        contributions_text = row['Contributions']
        if pd.notna(contributions_text):

            # Detect Project Manager special role
            if row['special_role'] and 'Project Manager' in contributions_text:
                if 'project-manager' not in roles:
                    roles.append('project-manager')

            # Extract roles marked with *
            role_matches = re.findall(r'\*([^*]+)\*', contributions_text)
            for role_match in role_matches:
                normalized_role = normalize_for_attribute(role_match)
                if normalized_role not in roles:
                    roles.append(normalized_role)

    # Build contribution entries (HTML version)
    contributions_html = []
    for _, row in group.iterrows():

        # Convert project name to HTML <a> if URL exists
        if pd.notna(row['Project URL']) and row['Project URL'] != '':
            project_html = f'<a href="{row["Project URL"]}">{row["Project Name"]}</a>'
        else:
            project_html = row['Project Name']

        # Convert *role* → <em>role</em>
        contrib_html = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', row['Contributions'])

        # Add special "Project Manager" phrasing
        if row['special_role']:

            # Remove all variants of "Project Manager" from contrib_html
            cleaned_contrib = re.sub(
                r'project[\s\-]*manager',
                '',
                contrib_html,
                flags=re.IGNORECASE
            ).strip()

            # Clean extra spaces and punctuation
            cleaned_contrib = re.sub(r'\s{2,}', ' ', cleaned_contrib).strip(' ,')

            if cleaned_contrib:  
                # Has other roles -> include "and ..."
                contributions_html.append(
                    f'{project_html} as Project Manager and {cleaned_contrib}'
                )
            else:
                # No other roles -> only the special phrasing
                contributions_html.append(
                    f'{project_html} as Project Manager'
        )
        else:
            contributions_html.append(f'{project_html} {contrib_html}')

    # Number entries if more than one project
    if len(contributions_html) > 1:
        # Prepend <br/> before the first numbered item so it doesn’t appear on the same line
        contributions_html = [f"<br/>{i+1}. {c}" if i == 0 else f"{i+1}. {c}"
                            for i, c in enumerate(contributions_html)]


    # Join using <br/> instead of markdown line breaks
    contributions_str = '<br/>'.join(contributions_html)

    # Create attributes
    projects_attr = html.escape(','.join(projects), quote=True)
    roles_attr = html.escape(','.join(roles), quote=True)

    orcid_id = group.iloc[0]['ORCID iD']

    # Build final <li> (all HTML, no markdown)
    if orcid_id:
        name_html = f'<strong><a href="https://orcid.org/{orcid_id.strip()}">{full_name}</a></strong>'
    else:
        name_html = f'<strong>{full_name}</strong>'

    final_html = (
        f'<li data-projects="{projects_attr}" '
        f'data-roles="{roles_attr}">'
        f'{name_html} contributed to {contributions_str}'
        f'</li><br/>'
    )

    return min_order, final_html


def extract_orcid_id(value):
    if not isinstance(value, str) or len(value) < 5:
        return None

    if value.startswith('http'):
        return value.split('/')[-1]
    
    return value

# Assuming 'data' is your DataFrame
merged_data['ORCID iD'] = merged_data['ORCID iD'].apply(extract_orcid_id)

# Creating a new column for the concatenated name
merged_data['Name'] = merged_data.apply(format_name, axis=1)

# Apply the function to each group and create a summary DataFrame
merged_data['original_order'] = range(len(merged_data))

# Perform the groupby operation without sorting
summary = (merged_data.groupby(merged_data['ORCID iD'].fillna(merged_data['Name']), sort=False)
                       .apply(concatenate_contributions)
                       .reset_index())

# Separate the tuple into two columns
summary[['original_order', 'Contributions']] = pd.DataFrame(summary[0].tolist(), index=summary.index)

# Drop the old column
summary.drop(columns=[0], inplace=True)

# Sort by the original order and drop the helper column
summary = summary.sort_values(by='original_order').drop(columns='original_order')

# Reset the index if needed
summary = summary.reset_index(drop=True)
summary_string = '\n\n'.join(summary['Contributions'])

# Add closing tags and JavaScript include
footer_content = """
</ul>
<script src="/js/contributor-filter.js"></script>
"""

# --- LOGGING ADDED HERE ---
# Log the final deduplicated number of contributors
print("\n--- Processing Complete ---")
print(f"Total number of unique contributors after deduplication: {len(summary)}")

# Get the directory of the current script
# Using a try-except block in case __file__ is not defined (e.g., in a notebook)
try:
    script_dir = os.path.dirname(os.path.abspath(__file__))
except NameError:
    script_dir = '.' # Default to the current directory

# Construct the paths for the template and output files
template_path = os.path.join(script_dir, 'tenzing_template.md')
output_path = os.path.join(script_dir, 'tenzing.md')

# Open the template file and read its contents
with open(template_path, 'r') as file:
    template_content = file.read()

# Combine the template content with the new summary string and footer
combined_content = template_content + summary_string + footer_content

# Save the combined content to 'tenzing.md'
with open(output_path, 'w') as file:
    file.write(combined_content)

print(f"\nSuccessfully generated the file at: {output_path}")

# Save failure information to a JSON file for potential GitHub issue creation
if failed_sheets:
    failure_report_path = os.path.join(script_dir, 'tenzing_failures.json')
    with open(failure_report_path, 'w') as f:
        json.dump({
            'timestamp': pd.Timestamp.now().isoformat(),
            'total_projects': len(df),
            'successful_projects': len(all_data_frames),
            'failed_projects': len(failed_sheets),
            'failures': failed_sheets
        }, f, indent=2)
    print(f"\n⚠ Failure report saved to: {failure_report_path}")
    print(f"⚠ {len(failed_sheets)} project(s) failed - workflow should create an issue")
else:
    print("\n✓ All projects processed successfully!")
    # Remove any existing failure report
    failure_report_path = os.path.join(script_dir, 'tenzing_failures.json')
    if os.path.exists(failure_report_path):
        os.remove(failure_report_path)
        print("✓ Removed old failure report")
