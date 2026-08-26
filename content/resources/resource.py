"""Generate content/curated_resources/*.md from the FORRT Database 2.0 Google Sheet.

!! content/curated_resources/ IS GENERATED — DO NOT EDIT THOSE FILES DIRECTLY !!

    One markdown file per sheet row, rewritten from scratch on every daily
    data-processing run. The result ships in `data-artifact`, which deploy.yaml
    unpacks over the checkout (path: ".") before Hugo builds, so edits committed to
    these files are overwritten at build time even though nothing bot-commits to main.
    Only `_index.md` is preserved.

    To fix a resource's link, edit the URL cell in the published sheet
    (gid=1924034107) — see SOURCE_URL below. There is no override or patch file.

    This has been done correctly at least once: the archive.org replacements from
    PR #838 survive because the sheet cells were updated to match. The glossary
    equivalents were not, and reverted on the next build.
"""

import json
import pandas as pd
import re
from pathlib import Path


## Function definition

def import_data(url: str):
    return pd.read_csv(url)


def drop_excluded(df):
    '''
    Remove rows flagged for exclusion via the first "Exclude" column in the
    source sheet. A truthy marker (TRUE/1/yes/y/x, case-insensitive) marks the
    row for removal so the resource file is not regenerated; blank cells are
    kept. Returns the DataFrame without the Exclude column.
    '''
    exclude_col = next((c for c in df.columns if c.strip().lower() == 'exclude'), None)
    if exclude_col is None:
        return df

    truthy = {'true', '1', 'yes', 'y', 'x'}
    flag = df[exclude_col].fillna('').astype(str).str.strip().str.lower()
    keep = ~flag.isin(truthy)
    return df[keep].drop(columns=[exclude_col]).reset_index(drop=True)


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
    # `tags` becomes a Hugo taxonomy, so a blank cell would otherwise yield
    # [""] and collect every such resource into one archive; the sheet also
    # carries "-" and "." as stand-ins for "no tags". Anything without a
    # letter or digit is a placeholder, not a term, so drop it — the resource
    # itself is kept, it just ends up untagged.
    df['tags'] = [[y.strip() for y in x.split(',')
                   if any(ch.isalnum() for ch in y)]
                  for x in df['tags'].values]
    df['language'] = [[y.strip() for y in x.split(',')] for x in df['language'].values]


def convert_row_to_file(df, fpath):
    """
    Expects a pandas DataFrame with a 'title' column to name the file.
    If there are duplicates, an index is appended to the filename.
    """
    
    # Replace the generated collection rather than leaving files for rows that
    # have been removed from the source sheet.
    for path in fpath.iterdir():
        if path.is_file() and path.name != '_index.md':
            path.unlink()

    # Track filenames to handle duplicates
    filename_counts = {}

    for index, row in df.iterrows():
        filename = re.sub('[\W_]+', '-', row["title"].lower())
        filename = re.sub('^-', '', filename)
        filename = re.sub('-$', '', filename[:40])

        # Check if filename exists, if so, add a counter
        if filename in filename_counts:
            filename_counts[filename] += 1
            filename_md = fpath / f"{filename}_{filename_counts[filename]}.md"
        else:
            filename_counts[filename] = 1
            filename_md = fpath / f"{filename}.md"
        
        filename_md.write_text(json.dumps(row.to_dict(), indent=4))


# Import data and prettify it:
def main():
    URL_FORRT = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgYcUP3ybhe4x05Xp4-GTf-Cn2snBCW8WOP_N7X-9r80AeCpFAGTfWn6ITtBk-haBkDqXAYXh9a_x4/pub?gid=1924034107&single=true&output=csv"

    FORRT = import_data(URL_FORRT)

    FORRT = drop_excluded(FORRT)

    wrangle_data(FORRT)

    # Convert single string into list of values

    split_cells(FORRT)

    # Create files

    f_path = Path.cwd() / 'content' / 'curated_resources'

    convert_row_to_file(FORRT, fpath = f_path)

if __name__ == "__main__":
  main()
