import json
import pandas as pd
import re

chunksize = 1
for row in (pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vRgYcUP3ybhe4x05Xp4-GTf-Cn2snBCW8WOP_N7X-9r80AeCpFAGTfWn6ITtBk-haBkDqXAYXh9a_x4/pub?gid=1924034107&single=true&output=csv',
                        sep = ",",
                        chunksize=chunksize))
    row.rename(columns = {'Provider or Creators':'Creators', 'URL':'link_to_resource', 'Material Type (see here for Glossary of terms)':'Material_Type',
                            'Education Level':'Education_Level', 'Conditions of Use':'Conditions_of_Use', 'Primary User':'Primary_User',
                            'Subject Areas':'Subject_Areas', 'FORRT Clusters':'FORRT_Clusters', 'User Tags (separate by comma if more than one; capitalize each word, except for prepositions)':'Tags'}, inplace = True)     
    row.fillna('', inplace=True)
    row['Creators'] = [[y.strip() for y in x.split(',')] for x in row['Creators'].values]
    row['Primary_User'] = [[y.strip() for y in x.split(',')] for x in row['Primary_User'].values]
    row['Material_Type'] = [[y.strip() for y in x.split(',')] for x in row['Material_Type'].values]
    row['Education_Level'] = [[y.strip() for y in x.split(',')] for x in row['Education_Level'].values]
    row['Subject_Areas'] = [[y.strip() for y in x.split(',')] for x in row['Subject_Areas'].values]
    row['FORRT_Clusters'] = [[y.strip() for y in x.split(',')] for x in row['FORRT_Clusters'].values]
    row['Tags'] = [[y.strip() for y in x.split(',')] for x in row['Tags'].values]
    filename = re.sub('[\W_]+', '-', row.iloc[0,1].lower())
    filename = re.sub('^-', '', filename)
    filename = re.sub('-$', '', filename[0:40])
    filename_md = 'content/curated_resources/{}.md'.format(filename) #need to end in .md so the json act like a front matter
#     print(row.to_json(orient = "records", indent=4, lines = True), '\n')
    row.to_json(filename_md,
                orient = "records",
                indent=4,
                lines = True)

#     print('{} done'.format(filename_md))