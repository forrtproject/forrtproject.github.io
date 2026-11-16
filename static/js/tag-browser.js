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
  // A selected tag replaces the list this searches, so the search stays hidden with it, unless
  // no page carries that tag: then the list and the search come back, filled with the term (below).
  if (!new URLSearchParams(window.location.search).get("tag")) box.hidden = false;
  var top = document.querySelector(".tag-top");
  var letters = document.querySelector(".tag-letters");
  var groups = Array.prototype.slice.call(document.querySelectorAll(".tag-group"));
  var count = box.querySelector(".tag-filter-count");
  // While the letter bar is pinned (above 760 px), a letter's heading lands below it, however many rows it wraps to.
  if (letters && window.ResizeObserver) new ResizeObserver(function () {
    document.documentElement.style.setProperty("--tag-letters", letters.offsetHeight + "px");
  }).observe(letters);
  // Each letter shows its most used tags (twelve on a phone, sixteen otherwise) and a button for the rest, so the list stays walkable.
  var FIRST = window.matchMedia("(max-width: 760px)").matches ? 12 : 16;
  {
    groups.forEach(function (group) {
      var items = group.querySelectorAll("li");
      // Shortened only when it hides more than eight tags; a letter with a few more than the preview shows them all.
      if (items.length - FIRST <= 8) return;
      // The preview shows the letter's most used tags, in their alphabetical places.
      var ranked = Array.prototype.slice.call(items).sort(function (a, b) {
        return Number(b.querySelector(".tag-count").textContent) - Number(a.querySelector(".tag-count").textContent);
      });
      ranked.slice(0, FIRST).forEach(function (item) { item.classList.add("is-top"); });
      group.classList.add("is-short");
      var more = document.createElement("button");
      more.type = "button";
      more.className = "tag-group-more";
      more.textContent = "Show all " + items.length + " tags under " + group.querySelector("h3").textContent + " (" + FIRST + " shown)";
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
  /** Spaces and hyphens count as the same, so "p hacking" finds "P-Hacking"; compact() also drops them, so
      "pre registration" finds "Preregistration". */
  function norm(text) { return text.toLowerCase().replace(/[\s-]+/g, " ").trim(); }
  function compact(text) { return norm(text).replace(/ /g, ""); }
  function name(item) { return item.firstChild.firstChild.textContent; }
  input.addEventListener("input", function () {
    var query = norm(input.value);
    document.querySelector(".tag-all").classList.toggle("is-searching", Boolean(query));
    var shown = 0;
    groups.forEach(function (group) {
      var any = false;
      Array.prototype.forEach.call(group.querySelectorAll("li"), function (item) {
        var match = !query || norm(name(item)).indexOf(query) !== -1 || compact(name(item)).indexOf(compact(query)) !== -1;
        item.hidden = !match;
        if (match) { any = true; shown += 1; }
      });
      group.hidden = !any;
    });
    if (top) top.hidden = Boolean(query);
    if (letters) letters.hidden = Boolean(query);
    count.textContent = !query ? "" : shown ? shown + (shown === 1 ? " tag matches" : " tags match") : "No tag matches.";
    return shown;
  });
  // Enter opens the best match: the tag as typed, then the same letters without spaces or hyphens, then one that
  // starts with the query, then the most used.
  // A query under three letters opens a tag only when it names it exactly.
  input.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;
    var query = compact(input.value);
    var typed = norm(input.value);
    if (!query) return;
    var items = Array.prototype.slice.call(document.querySelectorAll(".tag-group li:not([hidden])"));
    // The name as typed beats the same letters without spaces or hyphens: "Pre-registration" opens Pre-registration.
    var rank = function (item) {
      var tag = compact(name(item));
      return norm(name(item)) === typed ? 4 : tag === query ? 3 : tag.indexOf(query) === 0 ? 2 : 1;
    };
    var count = function (item) { return Number(item.querySelector(".tag-count").textContent); };
    items.sort(function (a, b) { return rank(b) - rank(a) || count(b) - count(a); });
    var best = items[0];
    if (!best || (query.length < 3 && rank(best) < 3)) return;
    event.preventDefault();
    best.querySelector("a").click();
  });
  // No page carries the tag in the address: show the search, filled with the term when that finds tags.
  document.addEventListener("tags:nomatch", function (event) {
    box.hidden = false;
    input.value = event.detail;
    input.dispatchEvent(new Event("input"));
    if (!document.querySelector(".tag-group li:not([hidden])")) {
      input.value = "";
      input.dispatchEvent(new Event("input"));
    }
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

  /** The tag's own spelling, from the list on this page, for a term the address gives in lower case or as a slug. */
  function spelling(term) {
    var links = document.querySelectorAll(".tag-group li a, .tag-top .tag-cloud a");
    for (var i = 0; i < links.length; i += 1) {
      var name = links[i].firstChild.textContent.trim();
      if (name.toLowerCase() === term) return name;
    }
    return "";
  }

  function render(pages) {
    var results = document.getElementById("tag-results");
    var heading = document.getElementById("tag-results-heading");
    var list = document.getElementById("tag-results-list");
    if (!results || !heading || !list) return;

    heading.textContent = pages.length
      ? pages.length + (pages.length === 1 ? " page tagged " : " pages tagged ") + "“" + label + "”"
      : "No pages are tagged “" + label + "”";
    document.title = (pages.length ? label + ": tagged pages" : "Tags") + " | FORRT";
    // A section name on every row tells rows apart only when they come from more than one section.
    var mixed = pages.some(function (page) { return page.s !== pages[0].s; });

    var STEP = 50;
    pages.forEach(function (page, index) {
      var item = document.createElement("li");
      item.hidden = index >= STEP;
      
      var link = document.createElement("a");
      link.href = page.u;
      link.textContent = page.t;
      item.appendChild(link);

      var label = mixed && sectionLabel(page.s);
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
      var showing = function () {
        return "Show more (" + list.querySelectorAll("li:not([hidden])").length + " of " + pages.length + " shown)";
      };
      more.textContent = showing();
      list.after(more);
      more.addEventListener("click", function () {
        var waiting = list.querySelectorAll("li[hidden]");
        for (var i = 0; i < STEP && i < waiting.length; i += 1) waiting[i].hidden = false;
        var link = waiting[0].querySelector("a");
        if (link) link.focus();
        if (waiting.length <= STEP) more.remove(); else more.textContent = showing();
      });
    }

    results.hidden = false;
    var cloud = document.getElementById("tag-cloud");
    if (!pages.length) {
      // Nothing to list: the tags stay, with the search filled in, so the visitor can choose another.
      Array.prototype.forEach.call(results.querySelectorAll(".tag-results-switch, .tag-results-all"), function (el) { el.hidden = true; });
      // The message reads first, then the search.
      var find = document.querySelector(".tag-find");
      if (find) find.before(results);
      document.dispatchEvent(new CustomEvent("tags:nomatch", { detail: label }));
      return;
    }
    // The results have a link back to every tag, so the cloud would only push the footer away.
    if (cloud) cloud.hidden = true;
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Resolved against this page so it works under a baseURL sub-path.
    fetch(new URL("index.json", window.location.href).toString())
      .then(function (response) {
        if (!response.ok) throw new Error("tag index " + response.status);
        return response.json();
      })
      .then(function (rows) {
        // The heading names the tag as the list spells it. A slug from an old /tag/ address
        // names the stored term it stands for, and only a term found nowhere loses its hyphens.
        var matched = "";
        var pages = rows.filter(function (row) {
          return row.g && row.g.some(function (term) {
            var hit = term === needle || slug(term) === needle;
            if (hit && (!matched || term === needle)) matched = term;
            return hit;
          });
        });
        var listed = matched && spelling(matched);
        if (listed) label = listed;
        else {
          label = matched ? (matched === needle ? tag : matched) : tag.replace(/-/g, " ");
          // A tag not listed on the page (too common or too rare to show) keeps the index's lower case: start it with a capital.
          label = label.charAt(0).toUpperCase() + label.slice(1);
        }
        render(pages);
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
