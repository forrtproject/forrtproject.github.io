import { registerPopover } from './popover.js';
import { citationMatches } from './citation-matches.js';
import { referenceText, copyWithFeedback } from './references.js';

// Glossary generators already expand citekeys to APA strings, and hand-written pages may
// list page-local references ({{< local-references >}}). The template recovers keys and
// metadata; residual references still get a stable local id, never a guessed key.
const entries = [...document.querySelectorAll('[data-reference]')];
const references = new Map(entries.map((entry) => [entry.dataset.reference, entry]));
const toMatcherRef = (entry) => ({
  key: entry.dataset.reference, first: entry.dataset.firstAuthor, year: entry.dataset.year,
  authors: entry.dataset.authors ? JSON.parse(entry.dataset.authors) : [], etal: entry.dataset.etal === 'true',
});

function linkCitations(containers, list, rejectSelector) {
  if (!list.length) return;
  containers.forEach((container) => {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => node.parentElement.closest(rejectSelector) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const matches = citationMatches(node.textContent, list);
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
}

const termReferences = entries.filter((entry) => entry.closest('.glossary-layout')).map(toMatcherRef);
linkCitations(document.querySelectorAll('.term-definition,.term-alt-definition'), termReferences, 'a,button,code,script,style');

if (document.querySelector('[data-local-references]')) {
  const pageReferences = entries.filter((entry) => !entry.closest('.glossary-layout')).map(toMatcherRef);
  linkCitations(
    document.querySelectorAll('.article-style'),
    pageReferences,
    'a,button,code,pre,script,style,summary,h1,h2,h3,h4,h5,h6,.references-list,.cite-us-section,.glossary-layout',
  );
}

registerPopover('a.cite[data-cite]', (trigger) => {
  const entry = references.get(trigger.dataset.cite);
  if (!entry) return null;
  const content = document.createElement('div');
  const reference = document.createElement('div');
  reference.append(...[...entry.childNodes].map((node) => node.cloneNode(true)));
  content.append(reference);
  const actions = document.createElement('div');
  actions.className = 'popover-actions';
  // Offer the source separately only when the reference itself doesn't already link it.
  if (entry.dataset.source && !reference.querySelector('a[href]')) {
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
  copy.addEventListener('click', () => copyWithFeedback(copy, referenceText(reference)));
  actions.append(copy);
  content.append(actions);
  return content;
}, { label: 'Reference' });
