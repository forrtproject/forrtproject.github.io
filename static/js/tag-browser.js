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
  var groups = Array.prototype.slice.call(document.querySelectorAll(".tag-group"));
  var count = box.querySelector(".tag-filter-count");
  // The row of letters. Once it has reached the top of the screen, one letter is filled in to say where the reader
  // is: the letter just chosen, until the reader scrolls on; otherwise, in one column (phones), the last letter whose
  // heading has reached the row, and in columns the letter at the top of the first column on screen. On a phone,
  // where the row scrolls sideways, it keeps that letter in view, and its fade goes once it is scrolled to its end.
  var az = document.querySelector(".tag-az");
  function letterFor(group) { return az && az.querySelector('a[href="#' + group.id + '"]'); }
  if (az) {
    var edge = function () { az.classList.toggle("is-at-end", az.scrollLeft + az.clientWidth >= az.scrollWidth - 4); };
    az.addEventListener("scroll", edge, { passive: true });
    window.addEventListener("resize", edge);
    edge();
    var chosen = null;
    var chosenAt = 0;
    var mark = function () {
      var stuck = az.getBoundingClientRect().top <= 1;
      var line = az.getBoundingClientRect().bottom + 60;
      var shown = groups.filter(function (group) { return !group.hidden; });
      var current = null;
      if (stuck && chosen && Math.abs(window.scrollY - chosenAt) < 200) current = chosen;
      else if (stuck && shown.length) {
        chosen = null;
        var left = shown[0].getBoundingClientRect().left;
        var oneColumn = left === shown[shown.length - 1].getBoundingClientRect().left;
        shown.forEach(function (group) {
          var box = group.getBoundingClientRect();
          if (oneColumn) { if (box.top <= line) current = group; }
          // In columns: the first letter in reading order with rows below the row of letters.
          else if (!current && box.bottom > line && box.top < window.innerHeight) current = group;
        });
      }
      var link = current && letterFor(current);
      Array.prototype.forEach.call(az.querySelectorAll("a"), function (other) { other.classList.toggle("is-current", other === link); });
      if (!stuck && az.scrollLeft) az.scrollLeft = 0;
      if (link && az.scrollWidth > az.clientWidth) {
        var at = link.offsetLeft - az.offsetLeft;
        if (at < az.scrollLeft || at + link.offsetWidth > az.scrollLeft + az.clientWidth - 56) az.scrollLeft = Math.max(0, at - 4);
      }
    };
    az.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      var group = link && document.getElementById(link.getAttribute("href").slice(1));
      if (!group) return;
      // After the jump has scrolled the page.
      window.setTimeout(function () { chosen = group; chosenAt = window.scrollY; mark(); }, 0);
    });
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { ticking = false; mark(); });
    }, { passive: true });
    mark();
  }
  // While searching, the heading over the list names the search.
  var allHeading = document.getElementById("tag-all-heading");
  var allText = allHeading ? allHeading.textContent : "";
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
      var link = letterFor(group);
      if (link) link.hidden = !any;
    });
    if (top) top.hidden = Boolean(query);
    var said = !query ? "" : shown ? shown + (shown === 1 ? " tag matches" : " tags match") : "No tag matches";
    // The heading over the list says what matched; the line under the field says it to screen readers as you type.
    if (allHeading) allHeading.textContent = query ? said + " “" + input.value.trim() + "”" : allText;
    count.textContent = said;
    // A short list of matches needs no letters to jump by, nor letter headings: it is one list, most used first.
    var flat = Boolean(query) && shown < 20;
    if (az) az.hidden = flat;
    document.querySelector(".tag-all").classList.toggle("is-flat", flat);
    Array.prototype.forEach.call(document.querySelectorAll(".tag-group li"), function (item) {
      item.style.order = flat ? String(-Number(item.querySelector(".tag-count").textContent)) : "";
    });
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

  // The site's root as this script was loaded from it, so root-relative paths in the page's metadata also work when the
  // site is served from a subfolder (the preview at /rebrand-doors/ rewrites links and sources, not meta content).
  var root = document.currentScript ? new URL("../", document.currentScript.src).pathname : "/";
  function fromRoot(path) { return path.charAt(0) === "/" ? root + path.slice(1) : path; }

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
    var links = document.querySelectorAll(".tag-group li a, .tag-top a");
    for (var i = 0; i < links.length; i += 1) {
      var name = links[i].firstChild.textContent.trim();
      if (name.toLowerCase() === term) return name;
    }
    return "";
  }

  /** The type to show under a page's title: a resource's material types, or the section of any other page. */
  function kinds(page) {
    if (page.y && page.y.length) return page.y;
    var section = sectionLabel(page.s);
    return section ? [section] : [];
  }

  function render(pages) {
    var results = document.getElementById("tag-results");
    var heading = document.getElementById("tag-results-heading");
    var list = document.getElementById("tag-results-list");
    if (!results || !heading || !list) return;

    document.title = (pages.length ? label + ": tagged pages" : "Tags") + " | FORRT";
    if (!pages.length) heading.textContent = "No pages are tagged “" + label + "”";
    else {
      // The tag is the page's title, and the line under it says how many pages carry it.
      var title = document.querySelector(".tags-page h1");
      var standfirst = document.querySelector(".tags-page .standfirst");
      if (title) title.textContent = label;
      if (standfirst) standfirst.textContent = pages.length === 1 ? "One page carries this tag." : pages.length + " pages carry this tag.";
      if (standfirst) lead(standfirst);
      // The trail leads back to every tag: Home / Tags / this tag.
      var here = document.querySelector(".crumbs [aria-current]");
      if (here) {
        var back = document.createElement("a");
        back.href = new URL(".", window.location.href).pathname;
        back.textContent = here.textContent;
        var slash = document.createElement("span");
        slash.setAttribute("aria-hidden", "true");
        slash.textContent = "/";
        here.before(back, " ", slash, " ");
        here.textContent = label;
      }
      heading.hidden = true;
    }

    var STEP = 50;
    var items = pages.map(function (page, index) {
      var item = document.createElement("li");
      item.hidden = index >= STEP;
      var link = document.createElement("a");
      link.href = page.u;
      link.textContent = page.t;
      item.appendChild(link);
      var types = kinds(page);
      if (types.length) {
        var note = document.createElement("span");
        note.className = "tag-section";
        // At most three types, so a label never runs to several lines; the rest are counted.
        note.textContent = types.slice(0, 3).join(", ") + (types.length > 3 ? " and " + (types.length - 3) + " more" : "");
        item.appendChild(note);
      }
      item.dataset.types = "|" + types.join("|") + "|";
      list.appendChild(item);
      return item;
    });

    var more = null;
    var showing = function () {
      return "Show more (" + list.querySelectorAll("li:not([hidden])").length + " of " + pages.length + " shown)";
    };
    if (pages.length > STEP) {
      more = document.createElement("button");
      more.type = "button";
      more.className = "btn tag-show-more";
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

    // Types to narrow a long list by, each with its count, when the pages are of more than one type.
    var counts = {};
    pages.forEach(function (page) { kinds(page).forEach(function (kind) { counts[kind] = (counts[kind] || 0) + 1; }); });
    // A type with one page is left out: its row already names it, and a chip for it would only lengthen the row of chips.
    var names = Object.keys(counts).filter(function (kind) { return counts[kind] > 1; })
      .sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); });
    var bar = results.querySelector(".tag-types");
    if (bar && pages.length > 12 && names.length > 1) {
      // When most pages are of one type, only the others are labelled, and a note above the list says so.
      var main = names[0];
      if (counts[main] * 2 > pages.length) {
        items.forEach(function (item) {
          var note = item.querySelector(".tag-section");
          if (note && item.dataset.types === "|" + main + "|") note.remove();
        });
        var said = results.querySelector(".tag-types-note");
        if (said) { said.textContent = "Entries without a type named beside them are of type " + main + "."; said.hidden = false; }
      }
      var chips = [];
      var choose = function (chip) {
        chips.forEach(function (other) { other.setAttribute("aria-pressed", String(other === chip)); });
        var kind = chip.dataset.kind;
        // With one type chosen, the labels and the note say nothing new.
        results.classList.toggle("is-one-type", Boolean(kind));
        if (!kind) {
          items.forEach(function (item, index) { item.hidden = index >= STEP; });
          if (more) { more.hidden = false; more.textContent = showing(); }
        } else {
          items.forEach(function (item) { item.hidden = item.dataset.types.indexOf("|" + kind + "|") === -1; });
          if (more) more.hidden = true;
        }
      };
      [""].concat(names).forEach(function (kind) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "tag-type";
        chip.dataset.kind = kind;
        chip.setAttribute("aria-pressed", String(!kind));
        chip.appendChild(document.createTextNode(kind || "All"));
        var number = document.createElement("span");
        number.textContent = kind ? counts[kind] : pages.length;
        chip.appendChild(number);
        chip.addEventListener("click", function () { choose(chip); });
        chips.push(chip);
        bar.appendChild(chip);
      });
      bar.hidden = false;
      // On a phone the chips are one row that scrolls sideways; its fade goes at the end of the row.
      var end = function () { bar.classList.toggle("is-at-end", bar.scrollLeft + bar.clientWidth >= bar.scrollWidth - 4); };
      bar.addEventListener("scroll", end, { passive: true });
      window.addEventListener("resize", end);
      end();
    }

    results.hidden = false;
    var cloud = document.getElementById("tag-cloud");
    if (!pages.length) {
      // Nothing to list: the tags stay, with the search filled in, so the visitor can choose another.
      Array.prototype.forEach.call(results.querySelectorAll(".tag-results-all"), function (el) { el.hidden = true; });
      // The message reads first, then the search.
      var find = document.querySelector(".tag-find");
      if (find) find.before(results);
      document.dispatchEvent(new CustomEvent("tags:nomatch", { detail: label }));
      return;
    }
    // The results have a link back to every tag, so the cloud would only push the footer away.
    if (cloud) cloud.hidden = true;
    related(pages);
  }

  /** Where the tag is also a glossary term, the line under the title is the first sentence of its definition, with a link to it.
      Author-year citations are dropped, as in the glossary's own previews; the count is on the "All" filter. */
  function lead(standfirst) {
    var meta = document.querySelector('meta[name="glossary-index"]');
    if (!meta) return;
    fetch(fromRoot(meta.content)).then(function (response) { return response.ok ? response.json() : {}; }).then(function (terms) {
      var key = label.toLowerCase();
      var term = terms[key] || terms[key.replace(/-/g, "")] || terms[key.replace(/-/g, " ")];
      if (!term || !term.summary) return;
      var text = term.summary.replace(/\s*[(（][^()（）]*[,，،]\s*\d{4}[a-z]?[^()（）]*[)）]/g, "");
      // Its first sentence: a sentence ends where a capital or an opening quote follows the full stop.
      var first = text.match(/^(.+?[.!?])\s+(?=[A-Z“"(])/);
      if (first) text = first[1];
      var count = standfirst.textContent;
      standfirst.textContent = text + " ";
      var link = document.createElement("a");
      link.href = fromRoot(term.url);
      link.textContent = "More in the glossary";
      standfirst.appendChild(link);
      standfirst.classList.add("tag-lead");
      // Without the filters, the count has nowhere else to go.
      if (document.querySelector(".tag-types").hidden) {
        var line = document.createElement("p");
        line.className = "tag-results-count";
        line.textContent = count;
        standfirst.after(line);
      }
    }).catch(function () {});
  }

  /** The listed tags that most often share a page with this one, most shared first. */
  function related(pages) {
    var aside = document.querySelector(".tag-related");
    if (!aside) return;
    var listed = {};
    Array.prototype.forEach.call(document.querySelectorAll(".tag-group li a"), function (link) {
      listed[link.querySelector(".tag-name").textContent.trim().toLowerCase()] = link;
    });
    var shared = {};
    pages.forEach(function (page) {
      page.g.forEach(function (term) {
        if (term !== needle && slug(term) !== needle && listed[term]) shared[term] = (shared[term] || 0) + 1;
      });
    });
    // A tag that shares only one page says little about the topic.
    var terms = Object.keys(shared).filter(function (term) { return shared[term] > 1; }).sort(function (a, b) { return shared[b] - shared[a] || a.localeCompare(b); }).slice(0, 10);
    if (!terms.length) return;
    var list = aside.querySelector("ul");
    terms.forEach(function (term) {
      var item = document.createElement("li");
      var link = document.createElement("a");
      link.href = listed[term].getAttribute("href");
      var name = document.createElement("span");
      name.className = "tag-name";
      name.textContent = listed[term].querySelector(".tag-name").textContent;
      var count = document.createElement("span");
      count.className = "tag-shared";
      count.textContent = shared[term] + " of these";
      link.appendChild(name);
      link.appendChild(count);
      item.appendChild(link);
      list.appendChild(item);
    });
    aside.hidden = false;
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
