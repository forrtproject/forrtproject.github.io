"""No inline <script> over 200 KB (#993).

Large data belongs in a separate file the page fetches when it needs it.
"""

MAX_INLINE_SCRIPT = 200_000  # bytes in one inline <script>


def check(site):
    return ["%s (%d KB)" % (p.path, p.largest_inline_script // 1000) for p in site.pages
            if p.largest_inline_script > MAX_INLINE_SCRIPT]
