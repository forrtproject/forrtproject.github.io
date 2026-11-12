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
/** The search over every tag: while it has a query, the most-used row steps aside and the A to Z list shows only matches. */
(function () {
  "use strict";
  var box = document.querySelector(".tag-find");
  var input = document.getElementById("tag-filter");
  if (!box || !input) return;
  box.hidden = false;
  var top = document.querySelector(".tag-top");
  var letters = document.querySelector(".tag-letters");
  var groups = Array.prototype.slice.call(document.querySelectorAll(".tag-group"));
  var count = box.querySelector(".tag-filter-count");
  // Each letter shows its most used tags (twelve on a phone, sixteen otherwise) and a button for the rest, so the list stays walkable.
  var FIRST = window.matchMedia("(max-width: 760px)").matches ? 12 : 16;
  {
    groups.forEach(function (group) {
      var items = group.querySelectorAll("li");
      if (items.length < FIRST + 5) return;
      // The preview shows the letter's most used tags, in their alphabetical places.
      var ranked = Array.prototype.slice.call(items).sort(function (a, b) {
        return Number(b.querySelector(".tag-count").textContent) - Number(a.querySelector(".tag-count").textContent);
      });
      ranked.slice(0, FIRST).forEach(function (item) { item.classList.add("is-top"); });
      group.classList.add("is-short");
      var more = document.createElement("button");
      more.type = "button";
      more.className = "tag-group-more";
      more.textContent = "All " + items.length + " tags under " + group.querySelector("h3").textContent;
      more.addEventListener("click", function () {
        // Focus moves to the first tag the button revealed, so keyboard users carry on from there.
        var next = group.querySelector("li:not(.is-top) a");
        group.classList.remove("is-short");
        more.remove();
        if (next) next.focus();
      });
      group.appendChild(more);
    });
  }
  input.addEventListener("input", function () {
    var query = input.value.trim().toLowerCase();
    document.querySelector(".tag-all").classList.toggle("is-searching", Boolean(query));
    var shown = 0;
    groups.forEach(function (group) {
      var any = false;
      Array.prototype.forEach.call(group.querySelectorAll("li"), function (item) {
        var match = !query || item.firstChild.firstChild.textContent.toLowerCase().indexOf(query) !== -1;
        item.hidden = !match;
        if (match) { any = true; shown += 1; }
      });
      group.hidden = !any;
    });
    if (top) top.hidden = Boolean(query);
    if (letters) letters.hidden = Boolean(query);
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
