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
    // A jump to a letter stops below the row of letters, however many lines the row wraps to.
    var pad = function () { if (!az.hidden) document.documentElement.style.scrollPaddingTop = (az.offsetHeight + 12) + "px"; };
    window.addEventListener("resize", pad);
    pad();
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

  /** A page's types: a resource's material types, or the section of any other page. */
  function kinds(page) {
    if (page.y && page.y.length) return page.y;
    var section = sectionLabel(page.s);
    return section ? [section] : [];
  }

  // A tag's pages are grouped under their type, materials ready to teach with first and reading last, so an educator
  // sees the lessons and courses before a hundred papers. A page with several types sits under the first of them in
  // this order and names the others. Types not listed here (a section's name) come just before Reading.
  var ORDER = ["Full course", "Syllabus", "Module", "Lesson", "Lecture", "Activity", "Teaching strategy", "Interactive",
    "Student guide", "Video", "Podcast", "R code", "Data or tool", "Other", "Reading"];
  var PLURAL = { "Full course": "Full courses", "Syllabus": "Syllabi", "Module": "Modules", "Lesson": "Lessons",
    "Lecture": "Lectures", "Activity": "Activities", "Teaching strategy": "Teaching strategies",
    "Interactive": "Interactive materials", "Student guide": "Student guides", "Video": "Videos", "Podcast": "Podcasts",
    "Data or tool": "Data and tools" };
  function rank(kind) {
    var at = ORDER.indexOf(kind);
    return at === -1 ? ORDER.length - 1.5 : at;
  }
  function byRank(a, b) { return rank(a) - rank(b) || a.localeCompare(b); }
  /** The types before Student guide are materials to teach with; in a long list their groups share education's ground. */
  function teaches(kind) { return rank(kind) < ORDER.indexOf("Student guide"); }

  // More pages than GROUP are grouped under type headings; more than LONG also get a search over their titles and
  // filters by type (DESIGN.md §4: a list under about twenty needs neither). Fewer than GROUP are one list.
  var GROUP = 12;
  var LONG = 30;
  // Unfiltered, a group longer than BIG shows its first FIRST pages, and a button shows STEP more at a time.
  var BIG = 8;
  var FIRST = 6;
  var STEP = 25;

  var clusterNames = {};
  try { clusterNames = JSON.parse(document.getElementById("tag-cluster-names").textContent); } catch (error) { /* no marks */ }

  /** Spaces and hyphens count as the same, and so do letters with and without accents, so "pre registration" finds "Pre-registration". */
  function fold(text) {
    return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[\s\-‐–—]+/g, " ").trim();
  }

  /** The tag's brick colour, 1 to 4: its place among the most used on /tags/, or else from its letters. */
  function tone(name) {
    var top = document.querySelectorAll(".tag-top li strong");
    for (var i = 0; i < top.length; i += 1) if (top[i].textContent.trim().toLowerCase() === name.toLowerCase()) return (i % 4) + 1;
    var sum = 0;
    for (var j = 0; j < name.length; j += 1) sum += name.charCodeAt(j);
    return (sum % 4) + 1;
  }

  /** One page as a row like the resources directory's: its title, its types, the opening of its description and its clusters. */
  function row(page, heading) {
    var item = document.createElement("article");
    item.className = "res";
    var title = document.createElement(heading);
    title.className = "res-title";
    var link = document.createElement("a");
    link.href = page.u;
    link.textContent = page.t;
    title.appendChild(link);
    item.appendChild(title);
    var format = document.createElement("p");
    format.className = "res-format";
    item.appendChild(format);
    // A description that is the title again with a word or two ("Day 1 | <title>") says nothing new.
    var said = page.d ? fold(page.d).replace(/[^\p{L}\p{N} ]/gu, " ").replace(/ +/g, " ").trim() : "";
    var named = fold(page.t).replace(/[^\p{L}\p{N} ]/gu, " ").replace(/ +/g, " ").trim();
    var rest = said.replace(named, "").trim();
    // So does one that opens with the whole title ("<title>. This document…"): the title is already above it.
    if (said && named.indexOf(said) === -1 && said.indexOf(named + " ") !== 0 && rest.split(" ").length > 3) {
      var desc = document.createElement("p");
      desc.className = "res-desc";
      // A cut that falls just after a full stop ends there, without an ellipsis.
      desc.textContent = page.d.replace(/([.!?])…$/, "$1");
      item.appendChild(desc);
    }
    var clusters = (page.c || []).filter(function (num) { return clusterNames[num]; });
    if (clusters.length) {
      var tags = document.createElement("p");
      tags.className = "res-tag";
      clusters.forEach(function (num, index) {
        if (index) {
          var comma = document.createElement("span");
          comma.className = "visually-hidden";
          comma.textContent = ", ";
          tags.appendChild(comma);
        }
        var mark = document.createElement("span");
        mark.className = "res-cl";
        mark.dataset.cl = num;
        mark.style.setProperty("--c", "var(--cl" + num + ")");
        mark.textContent = clusterNames[num];
        tags.appendChild(mark);
      });
      item.appendChild(tags);
    }
    return { el: item, format: format };
  }

  /** The type line: every type in a single list; under a type's heading, the others ("Also Lesson"), leaving out
      Reading, which most pages are as well, and naming at most three. */
  function typeLine(item, grouped) {
    var others = grouped ? item.types.filter(function (kind) { return kind !== item.group.kind && kind !== "Reading"; }) : item.types;
    item.format.hidden = !others.length;
    var named = others.slice(0, 3).join(", ") + (others.length > 3 ? " and " + (others.length - 3) + " more" : "");
    item.line.textContent = grouped ? "Also " + named : named;
  }

  function render(pages) {
    var results = document.getElementById("tag-results");
    var heading = document.getElementById("tag-results-heading");
    var list = document.getElementById("tag-results-list");
    if (!results || !heading || !list) return;

    document.title = (pages.length ? label + ": tagged pages" : "Tags") + " | FORRT";
    var grouped = pages.length > GROUP;
    var long = pages.length > LONG;
    // A long list's filters are its groups, each page under the first of its types, so a filter, its heading and its
    // rows give the same count, in the headings' order.
    var counted = {};
    pages.forEach(function (page) {
      var kind = kinds(page).slice().sort(byRank)[0] || "Other";
      counted[kind] = (counted[kind] || 0) + 1;
    });
    var names = Object.keys(counted).sort(byRank);
    var filtered = long && names.length > 1;

    if (!pages.length) heading.textContent = "No pages are tagged “" + label + "”";
    else {
      // The tag is the page's title, on a brick in the colour its brick has on /tags/ (any of the four for a tag not
      // among the most used; they carry no meaning, DESIGN.md §6), with its number of pages as the bricks there give it.
      var title = document.querySelector(".tags-page h1");
      var standfirst = document.querySelector(".tags-page .standfirst");
      if (title) {
        title.textContent = label;
        var brick = document.createElement("div");
        brick.className = "tag-head-brick";
        brick.style.setProperty("--brick", "var(--brick" + tone(label) + ")");
        title.before(brick);
        brick.appendChild(title);
        var number = document.createElement("p");
        number.textContent = pages.length === 1 ? "1 page" : pages.length + " pages";
        brick.appendChild(number);
      }
      // The line under it is the tag's glossary definition, where it has one.
      if (standfirst) {
        standfirst.hidden = true;
        lead(standfirst);
      }
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
      // The head joins the list's column, so on a wide screen the shared tags beside it start level with the title.
      var head = document.querySelector(".tags-page .article-head");
      var top = results.querySelector(".tag-results-head");
      if (head && top) top.prepend(head);
    }

    // Every page once, under the first of its types in ORDER (long lists), or in one list in title order (short ones).
    var groups = [];
    var byKind = {};
    var items = pages.map(function (page) {
      var types = kinds(page).slice().sort(byRank);
      var kind = grouped ? (types[0] || "Other") : "";
      if (!byKind[kind]) {
        byKind[kind] = { kind: kind, items: [], limit: FIRST };
        groups.push(byKind[kind]);
      }
      var made = row(page, !grouped ? "h2" : teaches(kind) ? "h4" : "h3");
      var line = document.createElement("span");
      line.className = "res-type";
      made.format.appendChild(line);
      var item = { el: made.el, format: made.format, line: line, types: types, text: fold(page.t), group: byKind[kind] };
      byKind[kind].items.push(item);
      return item;
    });
    groups.sort(function (a, b) { return byRank(a.kind, b.kind); });
    groups.forEach(function (group) {
      group.el = document.createElement("section");
      group.el.className = "tag-group-results";
      if (grouped) {
        group.heading = document.createElement(teaches(group.kind) ? "h3" : "h2");
        group.heading.appendChild(document.createTextNode((PLURAL[group.kind] || group.kind) + " "));
        group.count = document.createElement("span");
        group.count.className = "tag-group-count";
        group.heading.appendChild(group.count);
        group.el.appendChild(group.heading);
      }
      group.items.forEach(function (item) { group.el.appendChild(item.el); });
      if (long && group.items.length > BIG) {
        group.more = document.createElement("button");
        group.more.type = "button";
        group.more.className = "btn tag-show-more";
        group.more.addEventListener("click", function () {
          var next = group.items[group.limit];
          group.limit += STEP;
          update();
          var link = next && next.el.querySelector("a");
          if (link) link.focus();
        });
        group.el.appendChild(group.more);
      }
      list.appendChild(group.el);
    });
    // Materials to teach with come first, together on education's pale ground under the heading the resources
    // directory gives them (DESIGN.md §6: the colour says they are education's).
    var teach = null;
    if (grouped) {
      var teaching = groups.filter(function (group) { return teaches(group.kind); });
      if (teaching.length) {
        teach = document.createElement("section");
        teach.className = "tag-teach";
        var named = document.createElement("h2");
        named.textContent = "Ready to teach with";
        teach.appendChild(named);
        list.prepend(teach);
        teaching.forEach(function (group) { teach.appendChild(group.el); });
      }
    }

    // What is shown follows from three things: the type chosen, the search, and how far each group is opened.
    // With a type chosen in a long list, the one group left keeps its heading out: the filter names it.
    var chosen = "";
    var search = results.querySelector(".tag-search");
    var input = document.getElementById("tag-title-filter");
    var said = results.querySelector(".tag-search-count");
    function update() {
      var query = input && long ? fold(input.value) : "";
      var shown = 0;
      list.classList.toggle("is-one-list", !grouped || Boolean(chosen));
      var found = {};
      var all = 0;
      groups.forEach(function (group) {
        if (group.heading) group.heading.hidden = Boolean(chosen);
        group.items.forEach(function (item) { typeLine(item, grouped); });
        var searched = group.items.filter(function (item) { return !query || item.text.indexOf(query) !== -1; });
        all += searched.length;
        found[group.kind] = searched.length;
        var matches = searched.filter(function () { return !chosen || group.kind === chosen; });
        var cap = long && !chosen && !query && group.items.length > BIG ? group.limit : Infinity;
        group.items.forEach(function (item) { item.el.hidden = true; });
        matches.forEach(function (item, index) { item.el.hidden = index >= cap; });
        group.el.hidden = !matches.length;
        if (group.count) group.count.textContent = matches.length;
        if (group.more) {
          group.more.hidden = matches.length <= cap;
          group.more.textContent = "Show " + Math.min(STEP, matches.length - cap) + " more (" + cap + " of " + matches.length + " shown)";
        }
        shown += matches.length;
      });
      if (teach) teach.hidden = !teach.querySelector(".tag-group-results:not([hidden])");
      // While searching, each filter counts the matches, and a type with none steps aside.
      chips.forEach(function (chip) {
        var n = chip.dataset.kind ? found[chip.dataset.kind] || 0 : all;
        chip.querySelector("span").textContent = n;
        chip.hidden = !n && chip.getAttribute("aria-pressed") !== "true";
      });
      var typed = "“" + (input ? input.value.trim() : "") + "”";
      // A type chosen with no match of its own still says how many the other types have.
      if (said) said.textContent = !query ? "" : shown ? shown + " of " + pages.length + " titles match" : all ? "No " + chosen + " titles match " + typed + "; " + all + " in all types" : "No title matches " + typed;
    }

    if (long && search && input) {
      input.placeholder = "Search titles";
      input.addEventListener("input", update);
      search.hidden = false;
    }

    // Types to narrow the list by, each with its count; the hidden words name the filter for screen readers.
    var bar = results.querySelector(".tag-types");
    var chips = [];
    if (bar && filtered) {
      [""].concat(names).forEach(function (kind) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "tag-type";
        chip.setAttribute("aria-pressed", String(!kind));
        chip.dataset.kind = kind;
        chip.appendChild(document.createTextNode(kind || "All"));
        var number = document.createElement("span");
        number.textContent = kind ? counted[kind] : pages.length;
        chip.appendChild(number);
        var hint = document.createElement("span");
        hint.className = "visually-hidden";
        hint.textContent = kind ? ", type" : ", every type";
        chip.appendChild(hint);
        chip.addEventListener("click", function () {
          chosen = kind;
          chips.forEach(function (other) { other.setAttribute("aria-pressed", String(other === chip)); });
          update();
        });
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
    update();

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
      Author-year citations are dropped, as in the glossary's own previews. Without one the line stays hidden. */
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
      standfirst.textContent = text + " ";
      var link = document.createElement("a");
      link.href = fromRoot(term.url);
      link.textContent = "More in the glossary";
      standfirst.appendChild(link);
      standfirst.classList.add("tag-lead");
      standfirst.hidden = false;
    }).catch(function () {});
  }

  /** The listed tags that most often share a page with this one, most shared first: beside the list on a wide screen,
      and on a phone after the list, folded under one line that names the first two. */
  function related(pages) {
    var aside = document.querySelector(".tag-related");
    var phone = document.querySelector(".tag-related-phone");
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
      count.textContent = shared[term];
      var unit = document.createElement("span");
      unit.className = "visually-hidden";
      unit.textContent = shared[term] === 1 ? " page in common" : " pages in common";
      link.appendChild(name);
      link.appendChild(count);
      link.appendChild(unit);
      item.appendChild(link);
      list.appendChild(item);
    });
    aside.hidden = false;
    document.getElementById("tag-results").classList.add("has-related");
    if (phone) {
      phone.querySelector("ul").innerHTML = list.innerHTML;
      var names = terms.slice(0, 2).map(function (term) { return listed[term].querySelector(".tag-name").textContent; });
      phone.querySelector(".tag-related-some").textContent = names.join(", ") + (terms.length > 2 ? " and " + (terms.length - 2) + " more" : "");
      phone.hidden = false;
    }
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
