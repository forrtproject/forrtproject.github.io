import json
import pandas as pd
import re
from pathlib import Path


## Function definition

def import_data(url: str):
    return pd.read_csv(url)


def wrangle_data(df):
    '''
    Standardize column names
    '''
    df.columns = df.columns.str.lower()
    df.rename(columns = {df.columns[df.columns.str.contains(pat = 'provider')][0]: "creators",
                            df.columns[df.columns.str.contains(pat = 'url')][0]: 'link_to_resource',
                            df.columns[df.columns.str.contains(pat = 'material type')][0]: 'material_type',
                            df.columns[df.columns.str.contains(pat = 'education level')][0]: 'education_level',
                            df.columns[df.columns.str.contains(pat = 'conditions of use')][0]: 'conditions_of_use',
                            df.columns[df.columns.str.contains(pat = 'primary user')][0]: 'primary_user',
                            df.columns[df.columns.str.contains(pat = 'subject areas')][0]: 'subject_areas',
                            df.columns[df.columns.str.contains(pat = 'clusters')][0]: 'FORRT_clusters',
                            df.columns[df.columns.str.contains(pat = 'user tags')][0]: 'tags'},
              inplace = True)
    df.fillna('', inplace=True)


def split_cells(df):
    df['creators'] = [[y.strip() for y in x.split(',')] for x in df['creators'].values]
    df['primary_user'] = [[y.strip() for y in x.split(',')] for x in df['primary_user'].values]
    df['material_type'] = [[y.strip() for y in x.split(',')] for x in df['material_type'].values]
    df['education_level'] = [[y.strip() for y in x.split(',')] for x in df['education_level'].values]
    df['subject_areas'] = [[y.strip() for y in x.split(',')] for x in df['subject_areas'].values]
    df['FORRT_clusters'] = [[y.strip() for y in x.split(',')] for x in df['FORRT_clusters'].values]
    df['tags'] = [[y.strip() for y in x.split(',')] for x in df['tags'].values]
    df['language'] = [[y.strip() for y in x.split(',')] for x in df['language'].values]


def convert_row_to_file(df, fpath):
    """
    expects a pandas df with a 'title' column to name the file.
    """
    for index, row in df.iterrows():
        filename = re.sub('[\W_]+', '-', row["title"].lower())
        filename = re.sub('^-', '', filename)
        filename = re.sub('-$', '', filename[:40])
        filename_md = fpath / f"{index}_{filename}.md"
        filename_md.write_text(json.dumps(row.to_dict(), indent=4))


# Import data and prettify it:
def main():
    URL_FORRT = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgYcUP3ybhe4x05Xp4-GTf-Cn2snBCW8WOP_N7X-9r80AeCpFAGTfWn6ITtBk-haBkDqXAYXh9a_x4/pub?gid=1924034107&single=true&output=csv"

    FORRT = import_data(URL_FORRT)

    wrangle_data(FORRT)

    # Convert single string into list of values

    split_cells(FORRT)

    # Create files

    f_path = Path.cwd() / 'content' / 'curated_resources'

    convert_row_to_file(FORRT, fpath = f_path)

if __name__ == "__main__":
  main()