import pandas as pd
import os

# Tenzing directory
csv_export_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_IaXiYtB3iAmtDZ_XiQKrToRkxOlkXNAeNU2SIT_J9PxvsQyptga6Gg9c8mSvDZpwY6d8skswIQYh/pub?output=csv&gid=0'
extra_roles_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCsxHTnSSjYqhQSR2kT3gIYg82HiODjPat9y2TFPrZESYWxz4k8CZsOesXPD3C5dngZEGujtKmNZsa/pub?output=csv'

# Use pandas to read the CSV
df = pd.read_csv(csv_export_url)
df_roles = pd.read_csv(extra_roles_url)

# Assuming 'df' contains the index data with Tenzing Links
all_data_frames = []

# Loop over both the Project Names and the Tenzing Links
for project_name, url, project_url in zip(df['Project Name'], df['CSV Link'], df['Project URL']):
    # Make sure each URL is transformed into a CSV export URL as shown above
    data_frame = pd.read_csv(url)
    
    # Add a new column with the project name
    data_frame['Project Name'] = project_name
    data_frame['Project URL'] = project_url
    
    all_data_frames.append(data_frame)

# Concatenate all data frames
merged_data = pd.concat(all_data_frames, ignore_index=True)

def concatenate_true_columns(row, columns):
    true_columns = [col for col in columns if pd.notna(row[col]) and row[col]]
    if 'Project Manager' in true_columns:
        return 'as Project Manager and with ' + ', '.join(f'*{col}*' for col in true_columns if col != 'Project Manager')
    else:
        return 'with ' + ', '.join(f'*{col}*' for col in true_columns[:-1]) + (' and ' if len(true_columns) > 1 else '') + f'*{true_columns[-1]}*'

# List of column names to check for TRUE values
fields_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_IaXiYtB3iAmtDZ_XiQKrToRkxOlkXNAeNU2SIT_J9PxvsQyptga6Gg9c8mSvDZpwY6d8skswIQYh/pub?output=csv&gid=277271370"
column_mappings = pd.read_csv(fields_url)

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

merged_data = merged_data.sort_values(by='Surname')

# Function to format the full name
def format_name(row):
    # Extract the first name, middle name initial, and surname
    first_name = row['First name']
    middle_name = row['Middle name']
    surname = row['Surname']

    # Check if the middle name is not NaN and not an empty string
    if pd.notna(middle_name) and middle_name != '':
        middle_initial = f"{middle_name[0]}."
        full_name = f"{first_name} {middle_initial} {surname}"
    else:
        full_name = f"{first_name} {surname}"

    return full_name

# Group by 'ORCID iD' and concatenate the contributions
def concatenate_contributions(group):

    # Find the minimum original order for the group
    min_order = group['original_order'].min()

    # Format the full name once per group
    full_name = format_name(group.iloc[0])
    group = group.sort_values(by='special_role', ascending=False)

    # Create the contributions string for each project
    contributions = [
        f"{row['Project Name']} {('as' if row['special_role'] else 'with')} {row['Contributions']}" if pd.isna(row['Project URL']) or row['Project URL'] == ''
        else f"[{row['Project Name']}]({row['Project URL']}) {('as' if row['special_role'] else '')}{row['Contributions']}"
        for _, row in group.iterrows()
    ]

    # Add numbering only if there are more than 1 contributions
    if len(contributions) > 1:
        contributions = [f"{i+1}. {contribution}" for i, contribution in enumerate(contributions)]

    # Turn contributions into multiline list or single line
    contributions_str = contributions[0] if len(contributions) == 1 else '\n    ' + '\n    '.join(contributions) + '\n' + '{{<rawhtml>}}<br/>&nbsp;<br/> {{</rawhtml>}}'

    orcid_id = group.iloc[0]['ORCID iD']
    if orcid_id:
        return min_order, f"- **[{full_name}]({'https://orcid.org/' + orcid_id.strip()})** contributed to {contributions_str}"
    else:
        return min_order, f"- **{full_name}** contributed to {contributions_str}"

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

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the paths for the template and output files
template_path = os.path.join(script_dir, 'tenzing_template.md')
output_path = os.path.join(script_dir, 'tenzing.md')

# Open the template file and read its contents
with open(template_path, 'r') as file:
    template_content = file.read()

# Combine the template content with the new summary string
combined_content = template_content + summary_string

# Save the combined content to 'tenzing.md'
with open(output_path, 'w') as file:
    file.write(combined_content)
