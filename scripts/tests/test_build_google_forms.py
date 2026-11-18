"""Run with python3 -m unittest discover -s scripts/tests -p test_build_google_forms.py."""
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import build_google_forms as forms
import check_seo_html as seo


def page(items, email_setting=1, sign_in=0):
    """A viewform page holding Google's form data for these items."""
    info = [None] * 26
    info[0] = "Plain description"
    info[1] = items
    info[2] = ["Thanks!"]
    info[8] = "A form"
    info[10] = [None, None, None, 2, None, None, email_setting]
    info[24] = [None, "Rich <b>description</b>"]
    data = [None] * 20
    data[1] = info
    data[3] = "File name"
    data[18] = sign_in
    return "<script>var FB_PUBLIC_LOAD_DATA_ = %s;</script>" % json.dumps(data)


def question(kind, options=None, required=1, validation=None):
    return [1, "Question", "Help", kind, [[1234567890, options, required, None, validation]]]


class ParseForm(unittest.TestCase):
    def test_entry_ids_stay_exact_strings(self):
        form = forms.parse_form("id", page([question(0)]))
        self.assertEqual(form["items"][0]["entry"], "1234567890")

    def test_other_option_is_a_flag_and_not_an_answer(self):
        options = [["Yes", None, None, None, 0], ["", None, None, None, 1]]
        parsed = forms.parse_form("id", page([question(2, options)]))["items"][0]
        self.assertEqual(parsed["options"], ["Yes"])
        self.assertTrue(parsed["other"])

    def test_responder_email_is_collected(self):
        self.assertTrue(forms.parse_form("id", page([], email_setting=3))["collect_email"])
        self.assertFalse(forms.parse_form("id", page([]))["collect_email"])

    def test_unsupported_features_stop_the_build(self):
        branching = [["Yes", None, 99, None, 0]]
        cases = {
            "section": page([[1, "Part two", None, 8]]),
            "dropdown": page([question(3, [["Yes", None, None, None, 0]])]),
            "branching": page([question(2, branching)]),
            "validation": page([question(0, validation=[[1, 2, ["x"]]])]),
            "verified email": page([], email_setting=2),
            "sign-in": page([], sign_in=1),
            "no data": "<html></html>",
        }
        for name, html in cases.items():
            with self.subTest(name), self.assertRaises(forms.FormNotSupported):
                forms.parse_form("id", html)


class Differences(unittest.TestCase):
    def setUp(self):
        options = [["Yes", None, None, None, 0], ["No", None, None, None, 0]]
        self.saved = forms.parse_form("id", page([question(2, options, required=0)]))
        self.live = json.loads(json.dumps(self.saved))

    def test_identical_forms_match(self):
        self.assertEqual(forms.differences(self.saved, self.live), [])

    def test_missing_definition_is_reported(self):
        self.assertEqual(forms.differences(None, self.live), ["no saved definition"])

    def test_changes_that_would_lose_responses_are_reported(self):
        cases = {
            "now required": lambda q: q.update(required=True),
            "new entry id": lambda q: q.update(entry="999"),
            "renamed option": lambda q: q["options"].__setitem__(0, "Yes!"),
            "other added": lambda q: q.update(other=True),
        }
        for name, change in cases.items():
            with self.subTest(name):
                live = json.loads(json.dumps(self.saved))
                change(live["items"][0])
                self.assertTrue(forms.differences(self.saved, live))

    def test_new_question_is_named(self):
        self.live["items"].append({"type": "short", "entry": "5", "title": "<b>New</b> one", "required": True})
        self.assertEqual(forms.differences(self.saved, self.live), ["question added: New one"])

    def test_definition_for_another_form_is_reported(self):
        self.live["id"] = "other"
        self.assertEqual(forms.differences(self.saved, self.live), ["id changed"])

    def test_email_collection_is_reported(self):
        self.live["collect_email"] = True
        self.assertEqual(forms.differences(self.saved, self.live), ["collect_email changed"])


class RichText(unittest.TestCase):
    def test_keeps_emphasis_and_web_links(self):
        self.assertEqual(
            forms.rich_text('<b>See</b> <a href="https://forrt.org">FORRT</a>'),
            '<b>See</b> <a href="https://forrt.org" target="_blank" rel="noopener">FORRT</a>')

    def test_removes_scripts_attributes_and_unsafe_links(self):
        cleaned = forms.rich_text('<a href="javascript:alert(1)">x</a><img src=x onerror=y><span style="a">z</span>')
        self.assertEqual(cleaned, "xz")

    def test_escapes_text(self):
        self.assertEqual(forms.rich_text("a &lt;b&gt; c"), "a &lt;b&gt; c")

    def test_blocks_become_line_breaks(self):
        self.assertEqual(forms.rich_text("<div>one</div><div>two</div>"), "one<br>two")


class NativeFormCheck(unittest.TestCase):
    def failures(self, html):
        with tempfile.TemporaryDirectory() as public:
            (Path(public) / "index.html").write_text(html, encoding="utf-8")
            return seo.check_native_google_forms(public, ["abc"])

    def test_native_form_passes(self):
        self.assertEqual(self.failures('<form action="https://docs.google.com/forms/d/e/abc/formResponse">'), [])

    def test_embedded_form_fails(self):
        for attribute in ("data-embed-src", "src"):
            with self.subTest(attribute):
                html = '<div %s="https://docs.google.com/forms/d/e/abc/viewform?embedded=true">' % attribute
                self.assertEqual(len(self.failures(html)), 1)

    def test_link_to_the_google_form_passes(self):
        self.assertEqual(self.failures('<a href="https://docs.google.com/forms/d/e/abc/viewform">Open</a>'), [])


if __name__ == "__main__":
    unittest.main()
