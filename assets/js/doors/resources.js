/* The resources directory: filters, search, sorting, page size and shareable addresses. The page
   already holds one page of cards as HTML, A to Z, 24 to a page. This loads the data file, then
   redraws the list whenever a filter, the search box, the sort or the page size changes, and
   keeps the choice in the address (?type=&level=&cluster=&search=&sort=&per=&page=). With none
   of these chosen, the address is the server's own page (/resources/page/N/), and that page's
   cards are shown as they came. The theme's script claims ?q= for the site search, so the
   directory does not use that name. */
const root = document.getElementById('directory');
const results = document.getElementById('results');
const pager = document.getElementById('pager');
const search = document.getElementById('resource-search');
const countLine = document.getElementById('resultCount');
const activeLine = document.getElementById('activeFilters');
const clear = document.getElementById('clearFilters');
const empty = document.getElementById('empty');
const sortSelect = document.getElementById('sortOrder');
const perSelect = document.getElementById('perPage');
const clientPager = document.getElementById('clientPager');
const clientPagerTop = document.getElementById('clientPagerTop');
const drawer = document.getElementById('filterDrawer');
const badge = document.getElementById('filterBadge');
const card = document.getElementById('resCard');
const facets = [...document.querySelectorAll('.facet')];
const fmt = (n) => n.toLocaleString('en-GB');
const total = fmt(Number(root.dataset.total));
// The server's pages hold 24 each; phones start at 12, so a page fits a few screens.
const SERVER_PER = Number(root.dataset.perPage);
const serverPage = Number(root.dataset.page);
const defaultPer = matchMedia('(max-width: 760px)').matches ? 12 : SERVER_PER;
const PER_OPTIONS = [...perSelect.options].map((option) => Number(option.value));

// What the page shows with nothing chosen, restored when the last filter goes.
const serverCards = [...results.children];
const serverCount = countLine.textContent;

let data = null;
let searchText = null;
let wantsFullSearch = false;
let sort = 'title';
let per = SERVER_PER;
let page = serverPage;
// Positions in data.items in each order; items come A to Z, and search.json matches by position.
let orders = null;

const chipsOf = (facet) => [...facet.querySelectorAll('.chip')];
const labelOf = (chip) => chip.firstChild.textContent.trim();

function chosen() {
  const picks = {};
  facets.forEach((facet) => {
    picks[facet.dataset.facet] = chipsOf(facet)
      .filter((chip) => chip.getAttribute('aria-pressed') === 'true')
      .map((chip) => chip.dataset.value);
  });
  return picks;
}

const words = () => search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
const anyChoice = (picks, query) => query.length > 0 || Object.values(picks).some((list) => list.length);

// Within a filter group any chosen value matches; across groups all must. `skip` leaves one group
// out, which gives each option's count: how many results it would give alongside the others.
function matches(index, picks, query, skip) {
  const item = data.items[index];
  const fields = { type: item.y, level: item.l, cluster: item.c };
  for (const facet of Object.keys(picks)) {
    if (facet !== skip && picks[facet].length) {
      const names = data.facets[facet];
      if (!fields[facet].some((position) => picks[facet].includes(names[position]))) return false;
    }
  }
  if (!query.length) return true;
  const text = searchText ? searchText[index] : item.t.toLowerCase();
  return query.every((word) => text.includes(word));
}

function drawCard(index) {
  const item = data.items[index];
  const node = card.content.firstElementChild.cloneNode(true);
  const link = node.querySelector('.res-title a');
  link.textContent = item.t;
  link.href = `${data.base}${item.u}/`;
  const labels = (facet, positions, most = Infinity) => {
    const names = positions
      .map((position) => document.querySelector(`.facet[data-facet=${facet}] .chip[data-value="${data.facets[facet][position]}"]`))
      .filter(Boolean)
      .map(labelOf);
    // Levels show two at most and a count, as on the server-drawn cards.
    return names.slice(0, most).join(', ') + (names.length > most ? ` +${names.length - most}` : '');
  };
  node.querySelector('.res-type').textContent = labels('type', item.y);
  node.querySelector('.res-level').textContent = labels('level', item.l, 2);
  node.querySelector('.res-tag').textContent = labels('cluster', item.c);
  return node;
}

// The address for the current choice on page `n`. With no filter, A to Z and 24 a page, it is the
// server's page; otherwise ?per= is added whenever per is not 24 and the address names a page, filter,
// search or sort, so a link opened on another screen size shows the same resources.
// Other parameters in the address (a campaign tag, say) are kept as they are.
const OWN_KEYS = ['type', 'level', 'cluster', 'search', 'sort', 'per', 'page'];
function addressFor(picks, n) {
  const params = new URLSearchParams(location.search);
  OWN_KEYS.forEach((key) => params.delete(key));
  const foreign = params.toString();
  Object.entries(picks).forEach(([facet, list]) => {
    if (list.length) params.set(facet, list.join(','));
  });
  if (search.value.trim()) params.set('search', search.value.trim());
  if (sort !== 'title') params.set('sort', sort);
  const named = params.toString() !== foreign;
  const plain = !named && per === SERVER_PER;
  if (per !== defaultPer || (per !== SERVER_PER && (n > 1 || named))) params.set('per', String(per));
  let path = root.dataset.listUrl;
  if (plain) {
    if (n > 1) path += `page/${n}/`;
  } else if (n > 1) params.set('page', String(n));
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

function writeAddress(picks, push) {
  const address = addressFor(picks, page) + location.hash;
  if (address === location.pathname + location.search + location.hash) return;
  if (push) history.pushState(null, '', address);
  else history.replaceState(null, '', address);
}

// Previous, numbered pages (first, last and two either side) and Next, as doors/pager draws them.
function drawPager(picks, pages) {
  const parts = [];
  const link = (n, text, rel) => {
    const a = document.createElement('a');
    a.href = addressFor(picks, n);
    a.textContent = text;
    if (rel) a.rel = rel;
    else a.setAttribute('aria-label', `Page ${n}`);
    a.dataset.page = n;
    return a;
  };
  if (page > 1) parts.push(link(page - 1, 'Previous', 'prev'));
  let last = 0;
  for (let n = 1; n <= pages; n += 1) {
    if (n === 1 || n === pages || Math.abs(n - page) <= 2) {
      if (n - last > 1) {
        const gap = document.createElement('span');
        gap.className = 'pager-gap';
        gap.setAttribute('aria-hidden', 'true');
        gap.textContent = '…';
        parts.push(gap);
      }
      if (n === page) {
        const current = document.createElement('span');
        current.className = 'pager-current';
        current.setAttribute('aria-current', 'page');
        current.textContent = n;
        parts.push(current);
      } else parts.push(link(n, String(n)));
      last = n;
    }
  }
  if (page < pages) parts.push(link(page + 1, 'Next', 'next'));
  clientPager.replaceChildren(...parts);
  clientPagerTop.replaceChildren(...parts.map((part) => part.cloneNode(true)));
  clientPager.hidden = pages <= 1;
  clientPagerTop.hidden = pages <= 1;
}

function draw() {
  const picks = chosen();
  const query = words();
  const filtering = anyChoice(picks, query);
  const hits = orders[sort].filter((index) => matches(index, picks, query));
  const pages = Math.max(1, Math.ceil(hits.length / per));
  page = Math.min(Math.max(1, page), pages);
  // The server's own cards while they are what the choice asks for.
  const asServed = !filtering && sort === 'title' && per === SERVER_PER && page === serverPage;

  facets.forEach((facet) => {
    chipsOf(facet).forEach((chip) => {
      const position = data.facets[facet.dataset.facet].indexOf(chip.dataset.value);
      const field = { type: 'y', level: 'l', cluster: 'c' }[facet.dataset.facet];
      let count = 0;
      data.items.forEach((item, index) => {
        if (item[field].includes(position) && matches(index, picks, query, facet.dataset.facet)) count += 1;
      });
      chip.querySelector('.chip-count').textContent = count;
      chip.setAttribute('aria-label', `${labelOf(chip)}, ${count} ${count === 1 ? 'resource' : 'resources'}`);
    });
  });

  // The order is part of the line, so a new sort is announced even when the range stays the same.
  const order = sort === 'newest' ? 'newest first' : 'A to Z';
  if (asServed) {
    results.replaceChildren(...serverCards);
    countLine.textContent = serverCount;
  } else {
    const first = (page - 1) * per;
    const shown = hits.slice(first, first + per);
    results.replaceChildren(...shown.map(drawCard));
    const noun = filtering ? 'matching resources' : 'resources';
    const from = filtering ? `, from ${total}` : '';
    if (!hits.length) countLine.textContent = `No matching resources, from ${total}`;
    else if (pages === 1) {
      countLine.textContent = hits.length === 1
        ? `Showing 1 matching resource, from ${total}`
        : `Showing all ${fmt(hits.length)} ${noun}, ${order}${from}`;
    } else {
      countLine.textContent = `Showing ${fmt(first + 1)}–${fmt(first + shown.length)} of ${fmt(hits.length)} ${noun}, ${order}${from}`;
    }
  }
  if (pager) pager.hidden = !asServed;
  const pagerTop = document.querySelector('.pager-top');
  if (pagerTop) pagerTop.hidden = !asServed;
  if (asServed) {
    clientPager.hidden = true;
    clientPagerTop.hidden = true;
  }
  else drawPager(picks, pages);
  empty.hidden = hits.length > 0;
  results.hidden = hits.length === 0;
  clear.hidden = !filtering;
  // Each active filter as a chip that removes it, and the search too. Its group is named in the chip when
  // another chip has the same label (two facets have an "Other"), and always to screen readers.
  const removers = [];
  facets.forEach((facet) => {
    const group = facet.querySelector('legend')?.textContent.trim() || '';
    chipsOf(facet).forEach((chip) => {
      if (chip.getAttribute('aria-pressed') !== 'true') return;
      removers.push([labelOf(chip), () => { chip.setAttribute('aria-pressed', 'false'); redraw(); }, group]);
    });
  });
  if (search.value.trim()) removers.push([`“${search.value.trim()}”`, () => { search.value = ''; redraw(); }, 'Search']);
  activeLine.hidden = !removers.length;
  activeLine.replaceChildren(...removers.map(([label, remove, group]) => {
    const named = group ? `${group}: ${label}` : label;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'active-chip';
    button.textContent = removers.filter((other) => other[0] === label).length > 1 ? named : label;
    button.setAttribute('aria-label', `Remove filter: ${named}`);
    button.addEventListener('click', () => { remove(); clear.hidden ? search.focus() : clear.focus(); });
    return button;
  }));
  const facetCount = Object.values(picks).reduce((sum, list) => sum + list.length, 0);
  badge.textContent = facetCount ? `(${facetCount} active)` : '';
  writeAddress(picks);
}

// A new filter, search, sort or page size starts again at page 1.
function redraw() {
  page = 1;
  if (data) draw();
  else writeAddress(chosen());
}

function loadSearchText() {
  if (searchText || wantsFullSearch) return;
  wantsFullSearch = true;
  fetch(root.dataset.searchUrl)
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.status))))
    .then((text) => {
      searchText = text;
      if (data) draw();
    })
    // Search carries on over titles, which are already here.
    .catch(() => {});
}

function reset() {
  facets.forEach((facet) => chipsOf(facet).forEach((chip) => chip.setAttribute('aria-pressed', 'false')));
  search.value = '';
  redraw();
  search.focus();
}

// Sets every control from the address, on load and on Back or Forward.
function readAddress() {
  const params = new URLSearchParams(location.search);
  facets.forEach((facet) => {
    const wanted = (params.get(facet.dataset.facet) || '').split(',');
    chipsOf(facet).forEach((chip) => {
      chip.setAttribute('aria-pressed', String(wanted.includes(chip.dataset.value)));
    });
  });
  search.value = params.get('search') || '';
  if (search.value) loadSearchText();
  sort = params.get('sort') === 'newest' ? 'newest' : 'title';
  const askedPer = Number(params.get('per'));
  per = PER_OPTIONS.includes(askedPer) ? askedPer : defaultPer;
  // The server's page number counts in 24s; at another size, start at the page holding its first card.
  const path = location.pathname.slice(root.dataset.listUrl.length).match(/^page\/(\d+)\//);
  const pathPage = path ? Number(path[1]) : 1;
  const askedPage = Number(params.get('page'));
  page = askedPage >= 1 ? Math.floor(askedPage) : Math.floor(((pathPage - 1) * SERVER_PER) / per) + 1;
  sortSelect.value = sort;
  perSelect.value = String(per);
}

facets.forEach((facet) => chipsOf(facet).forEach((chip) => {
  chip.addEventListener('click', () => {
    chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
    redraw();
  });
}));
let typing = 0;
search.addEventListener('input', () => {
  loadSearchText();
  clearTimeout(typing);
  typing = setTimeout(redraw, 150);
});
clear.addEventListener('click', reset);
document.getElementById('emptyReset').addEventListener('click', reset);
sortSelect.addEventListener('change', () => {
  sort = sortSelect.value;
  redraw();
});
perSelect.addEventListener('change', () => {
  per = Number(perSelect.value);
  redraw();
});
// Page links work as links (a new tab gets the address); a plain click redraws in place, adds a
// step to the history, and moves focus to the first resource on the new page.
function turnPage(event) {
  const target = event.target.closest('a[data-page]');
  if (!target || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  page = Number(target.dataset.page);
  writeAddress(chosen(), true);
  draw();
  const firstLink = results.querySelector('.res-title a');
  if (firstLink) {
    countLine.scrollIntoView({ block: 'start' });
    firstLink.focus({ preventScroll: true });
  }
}
clientPager.addEventListener('click', turnPage);
clientPagerTop.addEventListener('click', turnPage);
window.addEventListener('popstate', () => {
  readAddress();
  if (data) draw();
});

// The filters are a collapsible drawer on phones and always open on wider screens.
const wide = matchMedia('(min-width: 761px)');
drawer.querySelector('summary').addEventListener('click', (event) => {
  if (wide.matches) event.preventDefault();
});
wide.addEventListener('change', () => {
  drawer.open = wide.matches;
});

readAddress();
fetch(root.dataset.directoryUrl)
  .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.status))))
  .then((directory) => {
    data = directory;
    const titleOrder = data.items.map((_, index) => index);
    // Newest first by the date added; resources without one keep A to Z order at the end.
    const dated = titleOrder.filter((index) => data.items[index].d);
    dated.sort((a, b) => (data.items[a].d < data.items[b].d ? 1 : data.items[a].d > data.items[b].d ? -1 : 0));
    orders = { title: titleOrder, newest: dated.concat(titleOrder.filter((index) => !data.items[index].d)) };
    sortSelect.disabled = false;
    perSelect.disabled = false;
    draw();
  })
  .catch(() => {
    countLine.textContent = `${serverCount}. Filters could not be loaded, so please use the page links below.`;
  });
