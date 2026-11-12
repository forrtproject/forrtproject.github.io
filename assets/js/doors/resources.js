/* The resources directory: filters, search and shareable addresses. The page already holds one
   page of cards as HTML. This loads the data file, then redraws the list whenever a filter or
   the search box changes, and keeps the choice in the address (?type=&level=&cluster=&search=).
   The theme's script claims ?q= for the site search, so the directory does not use that name. */
const root = document.getElementById('directory');
const results = document.getElementById('results');
const pager = document.getElementById('pager');
const search = document.getElementById('resource-search');
const countLine = document.getElementById('resultCount');
const activeLine = document.getElementById('activeFilters');
const clear = document.getElementById('clearFilters');
const empty = document.getElementById('empty');
const more = document.getElementById('showMore');
const drawer = document.getElementById('filterDrawer');
const badge = document.getElementById('filterBadge');
const card = document.getElementById('resCard');
const facets = [...document.querySelectorAll('.facet')];
const PAGE = 24;
const total = Number(root.dataset.total).toLocaleString('en-GB');

// What the page shows with nothing chosen, restored when the last filter goes.
const serverCards = [...results.children];
const serverCount = countLine.textContent;
const serverAddress = location.pathname;

let data = null;
let searchText = null;
let shown = PAGE;
let wantsFullSearch = false;

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

function writeAddress(picks) {
  const params = new URLSearchParams();
  Object.entries(picks).forEach(([facet, list]) => {
    if (list.length) params.set(facet, list.join(','));
  });
  if (search.value.trim()) params.set('search', search.value.trim());
  const query = params.toString();
  const address = query ? `${root.dataset.listUrl}?${query}` : serverAddress;
  history.replaceState(null, '', address + location.hash);
}

function draw() {
  const picks = chosen();
  const query = words();
  const filtering = anyChoice(picks, query);
  const hits = [];
  data.items.forEach((_, index) => {
    if (matches(index, picks, query)) hits.push(index);
  });

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

  if (filtering) {
    results.replaceChildren(...hits.slice(0, shown).map(drawCard));
    countLine.textContent = hits.length > shown
      ? `Showing ${shown} of ${hits.length} matching resources, from ${total}`
      : `Showing ${hits.length} matching ${hits.length === 1 ? 'resource' : 'resources'}, from ${total}`;
  } else {
    results.replaceChildren(...serverCards);
    countLine.textContent = serverCount;
  }
  if (pager) pager.hidden = filtering;
  const pagerTop = document.querySelector('.pager-top');
  if (pagerTop) pagerTop.hidden = filtering;
  more.hidden = !filtering || hits.length <= shown;
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

function redraw() {
  shown = PAGE;
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

function readAddress() {
  const params = new URLSearchParams(location.search);
  facets.forEach((facet) => {
    const wanted = (params.get(facet.dataset.facet) || '').split(',');
    chipsOf(facet).forEach((chip) => {
      if (wanted.includes(chip.dataset.value)) chip.setAttribute('aria-pressed', 'true');
    });
  });
  if (params.get('search')) {
    search.value = params.get('search');
    loadSearchText();
  }
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
more.addEventListener('click', () => {
  const first = shown;
  shown += PAGE;
  draw();
  results.children[first]?.querySelector('a')?.focus();
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
    const picks = chosen();
    if (anyChoice(picks, words())) draw();
  })
  .catch(() => {
    countLine.textContent = `${serverCount}. Filters could not be loaded, so please use the page links below.`;
  });
