"""The FLoRA page shows its citation.

The FLoRA page (replication-hub/flora/) contains the FLoRA citation DOI.
"""

import os

FLORA_PAGE = "replication-hub/flora/index.html"


def check(site):
    path = os.path.join(site.public_dir, FLORA_PAGE)
    if not os.path.exists(path):
        return ["%s (page not found)" % FLORA_PAGE]
    with open(path, encoding="utf-8") as handle:
        html = handle.read()
    if "doi.org/10.17605/OSF.IO/9R62X" not in html:
        return ["%s (no FLoRA DOI in the citation)" % FLORA_PAGE]
    return []
