"""No page loads EmailOctopus or reCAPTCHA before a visitor subscribes.

The newsletter form loads reCAPTCHA and posts to EmailOctopus only when a
visitor subscribes.
"""


def check(site):
    return sorted(p.path for p in site.pages if p.loads("recaptcha") or p.loads("eocampaign1.com"))
