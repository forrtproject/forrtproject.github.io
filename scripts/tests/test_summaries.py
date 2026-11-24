import importlib.util
from pathlib import Path
import unittest
from urllib.parse import urlencode


SOURCE = Path(__file__).resolve().parents[2] / "content/summaries/summaries.py"
SPEC = importlib.util.spec_from_file_location("summaries", SOURCE)
summaries = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(summaries)


def parse_entry(takeaways, related=""):
    page_break = f'<hr style="{summaries.PAGE_BREAK}">'
    document = (
        f'{page_break}{page_break}<h3 id="h.example">A paper</h3>'
        f'<p>Main Takeaways</p><ul>{takeaways}</ul>{related}'
    )
    return summaries.parse_summaries(document)["summary_1"]


class SummaryTests(unittest.TestCase):
    def test_link_indexes_follow_nonempty_takeaways(self):
        entry = parse_entry(
            '\n<li>&nbsp;</li> \n<li>First point.</li><li></li>'
            '<li><a href="https://example.org/paper">Second point</a>.</li>'
        )
        self.assertEqual(entry["Main_Takeaways"], ["First point.", "Second point."])
        self.assertEqual(entry["Main_Takeaway_Links"], {
            "1": [{"text": "Second point", "href": "https://example.org/paper"}, {"text": "."}],
        })

    def test_empty_related_references_are_ignored(self):
        entry = parse_entry(
            "<li>Takeaway.</li>",
            '<p>You may also be interested in</p><ul>\n<li>&nbsp;</li>'
            '<li><a href="#h.empty"></a></li><li><a href="#h.paper">A paper</a></li></ul>',
        )
        self.assertEqual(entry["You_may_also_be_interested_in"], [{"Relevant_ref": "A paper", "href": "#h.paper"}])

    def test_only_titled_blocks_are_emitted(self):
        page_break = f'<hr style="{summaries.PAGE_BREAK}">'
        document = (
            f'{page_break}{page_break}{page_break}<h3 id="h.empty">&nbsp;</h3>'
            f'<p>Abstract</p><p>Text in an untitled block.</p>{page_break}<h3 id="h.valid">A paper</h3>'
        )
        self.assertEqual(summaries.parse_summaries(document), {"summary_3": {"Title": "A paper", "Id": "h.valid"}})

    def test_takeaway_keeps_wrapped_link_and_plain_text(self):
        href = "https://example.org/article?first=one&second=two#section"
        redirect = "https://www.google.com/url?" + urlencode({"q": href, "sa": "D"})
        entry = parse_entry(
            '<li>Ordinary takeaway.</li>'
            f'<li> A result (<a href="{redirect}" onclick="bad()"><span>see <em>also</em></span></a>)'
            ' &amp; commentary. </li>'
        )
        self.assertEqual(entry["Main_Takeaways"], ["Ordinary takeaway.", "A result (see also) & commentary."])
        self.assertEqual(entry["Main_Takeaway_Links"], {
            "1": [{"text": "A result ("}, {"text": "see also", "href": href}, {"text": ") & commentary."}]
        })

    def test_unsafe_link_destinations_keep_their_text(self):
        redirect = "https://www.google.com/url?" + urlencode({"q": "javascript:bad()"})
        entry = parse_entry(f'<li><a href="{redirect}">Wrapped</a> and <a href="data:text/html,bad">direct</a>.</li>')
        self.assertEqual(entry["Main_Takeaways"], ["Wrapped and direct."])
        self.assertNotIn("Main_Takeaway_Links", entry)

    def test_takeaway_fragment_and_a_direct_related_link(self):
        entry = parse_entry(
            '<li> <a href="#h.other"> Another summary </a> </li>',
            '<p>You may also be interested in</p><p><a href="#h.related">A related paper</a></p>',
        )
        self.assertEqual(entry["Main_Takeaways"], ["Another summary"])
        self.assertEqual(entry["Main_Takeaway_Links"], {"0": [{"text": "Another summary", "href": "#h.other"}]})
        self.assertEqual(entry["You_may_also_be_interested_in"], [
            {"Relevant_ref": "A related paper", "href": "#h.related"}
        ])
