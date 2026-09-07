/**
 * Site-wide tag browsing on /tags/.
 *
 * Tag badges across the site link to `/tags/?tag=<term>` rather than to a
 * per-term archive page; those were removed with the `tags` taxonomy (issue
 * #307). This reads the parameter, fetches the page index built by
 * `layouts/tags/list.json`, and lists every tagged page that carries the term
 * -- any section, not just curated resources.
 *
 * With no parameter, or with JavaScript off, the page is the server-rendered
 * tag cloud and nothing here runs.
 */
(function () {
  "use strict";

  var tag = new URLSearchParams(window.location.search).get("tag");
  if (!tag) return;

  var needle = tag.toLowerCase();

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
      ? pages.length + (pages.length === 1 ? " page tagged " : " pages tagged ") + "“" + tag + "”"
      : "No pages are tagged “" + tag + "”";

    pages.forEach(function (page) {
      var item = document.createElement("li");
      item.className = "mb-2";

      var link = document.createElement("a");
      link.href = page.u;
      link.textContent = page.t;
      item.appendChild(link);

      var label = sectionLabel(page.s);
      if (label) {
        var badge = document.createElement("span");
        badge.className = "badge badge-light ml-2";
        badge.textContent = label;
        item.appendChild(badge);
      }
      list.appendChild(item);
    });

    results.hidden = false;
    // The cloud stays available below the results, so no need to hide it.
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
        render(
          rows.filter(function (row) {
            return row.g && row.g.indexOf(needle) !== -1;
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
