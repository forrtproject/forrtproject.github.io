/* Site search over the theme's index.json, using the theme's Fuse options, so results rank as they
   did. site.js loads this on the first search and calls window.doorsSearch with the query. */
const dialog = document.getElementById('searchDialog');
const input = document.getElementById('searchQuery');
const status = document.getElementById('searchStatus');
const hits = document.getElementById('searchHits');
const LIMIT = 100;
const SECTIONS = {
  curated_resources: 'Resource', glossary: 'Glossary', post: 'News', authors: 'Person',
  'educators-corner': "Educators' Corner", pedagogies: 'Pedagogies', summaries: 'Summary',
  about: 'About', clusters: 'Cluster', disciplines: 'Discipline',
};
let fuse;

function loadFuse() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = dialog.dataset.fuse;
    script.integrity = dialog.dataset.fuseSri;
    script.crossOrigin = 'anonymous';
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

async function ready() {
  if (fuse) return fuse;
  status.textContent = 'Loading search.';
  const [response] = await Promise.all([fetch(dialog.dataset.index), loadFuse()]);
  if (!response.ok) throw new Error(response.statusText);
  fuse = new window.Fuse(await response.json(), {
    shouldSort: true,
    includeMatches: true,
    tokenize: true,
    threshold: Number(dialog.dataset.threshold),
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: Number(dialog.dataset.minLength),
    keys: [
      { name: 'title', weight: 0.99 },
      { name: 'summary', weight: 0.6 },
      { name: 'authors', weight: 0.5 },
      { name: 'content', weight: 0.2 },
      { name: 'tags', weight: 0.5 },
      { name: 'categories', weight: 0.5 },
    ],
  });
  return fuse;
}

function highlighted(text, query) {
  const paragraph = document.createElement('p');
  const words = query.split(/\s+/).filter(Boolean).map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!words.length) {
    paragraph.textContent = text;
    return paragraph;
  }
  text.split(new RegExp(`(${words.join('|')})`, 'gi')).forEach((part, index) => {
    if (index % 2) {
      const mark = document.createElement('mark');
      mark.textContent = part;
      paragraph.append(mark);
    } else {
      paragraph.append(part);
    }
  });
  return paragraph;
}

function show(results, query) {
  hits.replaceChildren(...results.slice(0, LIMIT).map(({ item }) => {
    const row = document.createElement('li');
    const type = document.createElement('span');
    type.className = 'hit-type';
    type.textContent = SECTIONS[item.section] || item.section || 'Page';
    const link = document.createElement('a');
    link.href = item.relpermalink;
    link.textContent = item.title;
    row.append(type, link);
    if (item.summary) row.append(highlighted(item.summary, query));
    return row;
  }));
  const found = results.length === 1 ? '1 result' : `${results.length} results`;
  status.textContent = results.length > LIMIT ? `${found}, showing the first ${LIMIT}.` : results.length ? `${found}.` : 'No results found.';
}

let timer;
let latest = 0;
async function run(query) {
  const attempt = ++latest;
  const url = new URL(location.href);
  if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
  history.replaceState(null, '', url);
  if (!query) {
    hits.replaceChildren();
    status.textContent = '';
    return;
  }
  try {
    const engine = await ready();
    if (attempt === latest) show(engine.search(query), query);
  } catch {
    fuse = undefined;
    status.textContent = 'Search is unavailable right now. Reload the page and try again.';
  }
}

input.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(() => run(input.value.trim()), 250);
});
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    clearTimeout(timer);
    run(input.value.trim());
  }
});

window.doorsSearch = (query) => {
  input.value = query;
  ready().catch(() => {});
  if (query) run(query);
};
