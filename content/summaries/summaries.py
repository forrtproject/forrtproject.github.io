import requests
import bs4
import lxml
import re
import json

source = requests.get('https://docs.google.com/document/d/e/2PACX-1vRNgJAnhc-Vn8fiRDwX-vUZeP6ytm2Haa0Z_oTIehg3W_u3mBNcJ6lEkswMjcpw5WaBnu4PXg-lXv5w/pub').text

soup = bs4.BeautifulSoup(source, 'html.parser')
for match in soup.findAll('span'):
    match.unwrap()

trs = soup.find("hr", attrs={'style':'page-break-before:always;display:none;'})

d = {"summary_0": {}}
i=0

for item in trs.find_all_next():
    if item == trs:
        i += 1
        print("Creating summary_{0}".format(i))
        d["summary_{0}".format(i)] = {}
        for x in item.find_all_next():
            if x != item:
                if len(x.text) == 0:
                    pass
                else:
                    if x.name == "h3":
                        title = {'Title': x.text.strip()}
                        title_id = {'Id': x['id']}
                        d["summary_{0}".format(i)].update(title)
                        d["summary_{0}".format(i)].update(title_id)
                    elif re.search(r"Main Takeaway[s]*.*", x.text.strip()):
                        takeaways = {'Main_Takeaways': []}
                        for each in x.find_next().children:
                            takeaways['Main_Takeaways'].append(each.text.strip())
                        d["summary_{0}".format(i)].update(takeaways)
                    elif re.search(r"[Qq]uote[s]*.*", x.text):
                        quote = {'Quote': x.find_next().text.strip()}
                        d["summary_{0}".format(i)].update(quote)
                    elif re.search(r"[Aa]bstract.*", x.text):
                        abstract = {'Abstract': x.find_next().text.strip()}
                        d["summary_{0}".format(i)].update(abstract)
                    elif re.search(r"APA Style Reference.*", x.text):
                        print(x.find_next().text)
                        ref = {'Reference': x.find_next().text}
                        d["summary_{0}".format(i)].update(ref)
                    elif re.search(r"[Yy]ou may also be interested in.*", x.text):
                        interest = {'You_may_also_be_interested_in': []}
                        for each in x.find_next().children:
                            if re.search(r"href=", str(each)): # detect if there is href= somewhere in the string
                                interest_href = each.find('a')['href']
                                interest_id = each.text.strip()
                                interest_dict = {'Relevant_ref': interest_id, 'href': interest_href}
                            else:
                                interest_id = each.text.strip()
                                interest_dict = {'Relevant_ref': interest_id}


                            interest['You_may_also_be_interested_in'].append(interest_dict)
                            d["summary_{0}".format(i)].update(interest)
#                     else:
#                         d["summary_{0}".format(i)].append(x.content)
            elif x == item: # breking the loop when encoutering a new summary
#                 print('passing because', x==item, x, item)
                break
del d['summary_0']

with open('../../data/summaries.json', 'w') as outfile:
    json.dump(d, outfile)
