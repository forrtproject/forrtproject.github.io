import pandas as pd
import os

# Tenzing directory
csv_export_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_IaXiYtB3iAmtDZ_XiQKrToRkxOlkXNAeNU2SIT_J9PxvsQyptga6Gg9c8mSvDZpwY6d8skswIQYh/pub?output=csv'

# Use pandas to read the CSV
df = pd.read_csv(csv_export_url)

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

# Need to filter for those willing to be published (Flavio?)

def concatenate_true_columns(row, columns):
    # Filter the columns that have a TRUE value
    true_columns = [col for col in columns if row[col]]
    # Concatenate them with 'and' between the penultimate and last
    return ', '.join(true_columns[:-1]) + (' and ' if len(true_columns) > 1 else '') + true_columns[-1]

# List of column names to check for TRUE values
columns_to_check = [
    'Conceptualization', 'Data curation', 'Formal analysis',
    'Funding acquisition', 'Investigation', 'Methodology',
    'Project administration', 'Resources', 'Software',
    'Supervision', 'Validation', 'Visualization',
    'Writing - original draft', 'Writing - review & editing'
]

merged_data = merged_data[merged_data[columns_to_check].any(axis=1)]

# Apply the function to each row
merged_data['Contributions'] = merged_data.apply(concatenate_true_columns, axis=1, columns=columns_to_check)
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
    # Format the full name once per group
    full_name = format_name(group.iloc[0])
    # Create the contributions string for each project
    contributions = [
        f"{row['Project Name']} with {row['Contributions']}" if pd.isna(row['Project URL']) or row['Project URL'] == ''
        else f"[{row['Project Name']}]({row['Project URL']}) with {row['Contributions']}"
        for _, row in group.iterrows()
    ]

    # Add numbering only if there are more than 1 contributions
    if len(contributions) > 1:
        contributions = [f"{i+1}. {contribution}" for i, contribution in enumerate(contributions)]

    # Turn contributions into multiline list or single line
    contributions_str = contributions[0] if len(contributions) == 1 else '\n    ' + '\n    '.join(contributions) + '\n' + '<br \>&nbsp;<br \>'

    orcid_id = group.iloc[0]['ORCID iD']
    if orcid_id:
        return f"- **[{full_name}]({'https://orcid.org/' + orcid_id.strip()})** contributed to {contributions_str}"
    else:
        return f"- **{full_name}** contributed to {contributions_str}"

def extract_orcid_id(value):
    if not isinstance(value, str) or len(value) < 5:
        return None

    if value.startswith('http'):
        return value.split('/')[-1]
    
    return value

# Assuming 'data' is your DataFrame
merged_data['ORCID iD'] = merged_data['ORCID iD'].apply(extract_orcid_id)

# Creating a new column for the concatenated name
merged_data['Name'] = merged_data['First name'] + ' ' + merged_data['Surname']

# Apply the function to each group and create a summary DataFrame
summary = merged_data.groupby(merged_data['ORCID iD'].fillna(merged_data['Name'])).apply(concatenate_contributions).reset_index(name='Contributions')

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
