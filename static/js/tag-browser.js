/**
 * Tag browsing on /tags/.
 *
 * Tag badges across the site link to `/tags/?tag=<term>`. This reads the
 * parameter, fetches the page index built by `layouts/tags/list.json`, and
 * lists every tagged page that carries the term, from any section.
 *
 * With no parameter, or with JavaScript off, the page is the server-rendered
 * tag cloud and nothing here runs.
 */
/** The search over every tag: it opens the full list and shows only the tags that match. */
(function () {
  "use strict";
  var box = document.querySelector(".tag-find");
  var input = document.getElementById("tag-filter");
  if (!box || !input) return;
  box.hidden = false;
  var tags = Array.prototype.slice.call(document.querySelectorAll("#tag-cloud a"));
  var more = document.querySelector(".tag-more");
  var count = box.querySelector(".tag-filter-count");
  input.addEventListener("input", function () {
    var query = input.value.trim().toLowerCase();
    var shown = 0;
    tags.forEach(function (link) {
      var match = !query || link.firstChild.textContent.toLowerCase().indexOf(query) !== -1;
      link.hidden = !match;
      if (match) shown += 1;
    });
    if (more) more.open = Boolean(query);
    count.textContent = !query ? "" : shown ? shown + (shown === 1 ? " tag matches" : " tags match") : "No tag matches.";
  });
})();

(function () {
  "use strict";

  var tag = new URLSearchParams(window.location.search).get("tag");
  if (!tag) return;

  var needle = tag.toLowerCase();
  var label = tag;

  /** The address form of a term, as the old /tag/<slug>/ pages had it: /tag/open-science/ arrives here as a slug. */
  function slug(term) {
    return term.replace(/[^\p{L}\p{N}\s.#_+~/-]/gu, "").trim().replace(/\s/g, "-");
  }

  /** "neurodiversity-lessonbank" reads better as "Neurodiversity lessonbank". */
  function sectionLabel(section) {
    if (!section) return "";
    var words = section.replace(/[-_]+/g, " ").trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  function render(pages) {
    var results = document.getElementById("tag-results");
    var heading = document.getElementById("tag-results-heading");
    var list = document.getElementById("tag-results-list");
    if (!results || !heading || !list) return;

    heading.textContent = pages.length
      ? pages.length + (pages.length === 1 ? " page tagged " : " pages tagged ") + "“" + label + "”"
      : "No pages are tagged “" + label + "”";

    var STEP = 50;
    pages.forEach(function (page, index) {
      var item = document.createElement("li");
      item.hidden = index >= STEP;
      
      var link = document.createElement("a");
      link.href = page.u;
      link.textContent = page.t;
      item.appendChild(link);

      var label = sectionLabel(page.s);
      if (label) {
        var badge = document.createElement("span");
        badge.className = "tag-section";
        badge.textContent = label;
        item.appendChild(badge);
      }
      list.appendChild(item);
    });

    if (pages.length > STEP) {
      var more = document.createElement("button");
      more.type = "button";
      more.className = "btn tag-show-more";
      more.textContent = "Show more";
      list.after(more);
      more.addEventListener("click", function () {
        var waiting = list.querySelectorAll("li[hidden]");
        for (var i = 0; i < STEP && i < waiting.length; i += 1) waiting[i].hidden = false;
        var link = waiting[0].querySelector("a");
        if (link) link.focus();
        if (waiting.length <= STEP) more.remove();
      });
    }

    results.hidden = false;
    // The results have a link back to every tag, so the cloud would only push the footer away.
    var cloud = document.getElementById("tag-cloud");
    if (cloud) cloud.hidden = true;
    results.scrollIntoView({ block: "nearest" });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Resolved against this page so it works under a baseURL sub-path.
    fetch(new URL("index.json", window.location.href).toString())
      .then(function (response) {
        if (!response.ok) throw new Error("tag index " + response.status);
        return response.json();
      })
      .then(function (rows) {
        // A slug that only an address could have produced reads better with spaces.
        if (!rows.some(function (row) { return row.g && row.g.indexOf(needle) !== -1; })) {
          label = tag.replace(/-/g, " ");
        }
        render(
          rows.filter(function (row) {
            return row.g && row.g.some(function (term) {
              return term === needle || slug(term) === needle;
            });
          })
        );
      })
      .catch(function () {
        var heading = document.getElementById("tag-results-heading");
        var results = document.getElementById("tag-results");
        if (!heading || !results) return;
        heading.textContent = "Could not load the tag index. Reload to try again.";
        results.hidden = false;
      });
  });
})();
