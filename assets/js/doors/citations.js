import { registerPopover } from './popover.js';
import { citationMatches } from './citation-matches.js';

// Glossary generators already expand citekeys to APA strings. The template recovers their
// keys and metadata; residual references still get a stable local id, never a guessed key.
const entries = [...document.querySelectorAll('[data-reference]')];
const references = new Map(entries.map((entry) => [entry.dataset.reference, entry]));
const termReferences = entries.filter((entry) => entry.closest('.glossary-layout')).map((entry) => ({
  key: entry.dataset.reference, first: entry.dataset.firstAuthor, year: entry.dataset.year,
}));

document.querySelectorAll('.term-definition,.term-alt-definition').forEach((definition) => {
  const walker = document.createTreeWalker(definition, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => node.parentElement.closest('a,button,code,script,style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const matches = citationMatches(node.textContent, termReferences);
    if (!matches.length) continue;
    const fragment = document.createDocumentFragment();
    let offset = 0;
    for (const match of matches) {
      fragment.append(node.textContent.slice(offset, match.start));
      const link = document.createElement('a');
      link.className = 'cite';
      link.href = `#ref-${match.key}`;
      link.dataset.cite = match.key;
      link.textContent = node.textContent.slice(match.start, match.end);
      fragment.append(link);
      offset = match.end;
    }
    fragment.append(node.textContent.slice(offset));
    node.replaceWith(fragment);
  }
});

registerPopover('a.cite[data-cite]', (trigger) => {
  const entry = references.get(trigger.dataset.cite);
  if (!entry) return null;
  const content = document.createElement('div');
  const reference = document.createElement('div');
  reference.append(...[...entry.childNodes].map((node) => node.cloneNode(true)));
  content.append(reference);
  const actions = document.createElement('div');
  actions.className = 'popover-actions';
  if (entry.dataset.source) {
    const open = document.createElement('a');
    open.href = entry.dataset.source;
    open.target = '_blank';
    open.rel = 'noopener';
    open.textContent = 'Open source ↗';
    actions.append(open);
  }
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.textContent = 'Copy reference';
  copy.setAttribute('aria-live', 'polite');
  let reset;
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(reference.textContent.trim());
      copy.textContent = 'Copied';
    } catch {
      copy.textContent = 'Copy failed';
    }
    clearTimeout(reset);
    reset = setTimeout(() => { copy.textContent = 'Copy reference'; }, 1500);
  });
  actions.append(copy);
  content.append(actions);
  return content;
}, { label: 'Reference' });
