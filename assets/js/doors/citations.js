import { registerPopover, closePopover } from './popover.js';
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

const SVG_NS = 'http://www.w3.org/2000/svg';
function svgIcon(paths, cls) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2.1');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', cls);
  for (const [tag, attrs] of paths) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    svg.append(el);
  }
  return svg;
}

const UNLOCK_PATHS = [
  ['rect', { x: '3', y: '11', width: '18', height: '11', rx: '2' }],
  ['path', { d: 'M7 11V7a5 5 0 0 1 9.9-1' }],
];
const LOCK_PATHS = [
  ['rect', { x: '3', y: '11', width: '18', height: '11', rx: '2' }],
  ['path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' }],
];
const COPY_PATHS = [
  ['path', { d: 'M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z' }],
];

// Trim a standalone trailing URL link from the displayed reference so the footer
// action links stay clean (Copy APA always reads the full unmodified entry).
function stripTrailingSourceLink(container, sourceUrl) {
  if (!sourceUrl) return;
  let last = container.lastChild;
  while (last && last.nodeType === Node.TEXT_NODE && /^[\s.)\]]*$/.test(last.textContent)) {
    const prev = last.previousSibling;
    if (prev && prev.nodeType === Node.ELEMENT_NODE && prev.tagName === 'A') {
      last = prev;
      break;
    }
    last = prev;
  }
  if (!last || last.nodeType !== Node.ELEMENT_NODE || last.tagName !== 'A') return;
  const text = last.textContent.trim();
  if (!/^https?:\/\//i.test(text) && !/^doi:/i.test(text)) return;
  // Remove trailing punctuation text node right after the link (e.g. "." or ")").
  while (last.nextSibling && last.nextSibling.nodeType === Node.TEXT_NODE && /^[\s.)\]]*$/.test(last.nextSibling.textContent)) {
    last.nextSibling.remove();
  }
  const before = last.previousSibling;
  last.remove();
  if (before && before.nodeType === Node.TEXT_NODE) {
    before.textContent = before.textContent
      .replace(/\s*(?:Available at|Retrieved from|DOI)\s*:?\s*$/i, '')
      .replace(/[\s(]+$/, '');
  }
}

function externalLink(href, label, cls) {
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.className = cls;
  a.textContent = label;
  return a;
}

registerPopover('a.cite[data-cite]', (trigger) => {
  const entry = references.get(trigger.dataset.cite);
  if (!entry) return null;

  const { source = '', oaStatus = '', oaUrl = '', oaHost = '', oaPdf = '' } = entry.dataset;
  const isFree = ['diamond', 'gold', 'hybrid', 'bronze'].includes(oaStatus);
  const isGreen = oaStatus === 'green' && Boolean(oaUrl);
  const isClosed = oaStatus === 'closed' || (oaStatus === 'green' && !oaUrl);

  const content = document.createElement('div');
  content.className = 'cite-pop';

  const head = document.createElement('div');
  head.className = 'cite-pop-head';
  const status = document.createElement('span');
  if (isFree) {
    status.className = 'cite-oa cite-oa--open';
    status.append(svgIcon(UNLOCK_PATHS, 'cite-oa-icon'), 'Open access');
  } else if (isGreen) {
    status.className = 'cite-oa cite-oa--green';
    status.append(svgIcon(UNLOCK_PATHS, 'cite-oa-icon'), oaHost ? `Free copy · ${oaHost}` : 'Free copy available');
  } else if (isClosed) {
    status.className = 'cite-oa cite-oa--closed';
    status.append(svgIcon(LOCK_PATHS, 'cite-oa-icon'), 'Paywalled');
  } else {
    status.className = 'cite-oa cite-oa--neutral';
    status.textContent = 'Reference';
  }
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'cite-pop-close';
  close.dataset.popoverClose = '';
  close.setAttribute('aria-label', 'Close');
  close.textContent = '×';
  head.append(status, close);
  content.append(head);

  const reference = document.createElement('div');
  reference.className = 'cite-pop-body';
  reference.append(...[...entry.childNodes].map((node) => node.cloneNode(true)));
  stripTrailingSourceLink(reference, source || oaUrl);
  content.append(reference);

  const foot = document.createElement('div');
  foot.className = 'cite-pop-foot';
  const links = document.createElement('div');
  links.className = 'cite-pop-links';

  if (isGreen) {
    links.append(externalLink(oaUrl, oaPdf === 'true' ? 'Read free PDF ↗' : 'Read free copy ↗', 'cite-link-primary'));
    if (source) links.append(externalLink(source, 'DOI ↗', 'cite-link-secondary'));
  } else if (isFree) {
    if (oaUrl && oaPdf === 'true') {
      links.append(externalLink(oaUrl, 'Read PDF ↗', 'cite-link-primary'));
      if (source) links.append(externalLink(source, 'DOI ↗', 'cite-link-secondary'));
    } else if (source || oaUrl) {
      links.append(externalLink(source || oaUrl, 'Read article ↗', 'cite-link-primary'));
    }
  } else if (isClosed && source) {
    links.append(externalLink(source, 'Publisher DOI ↗', 'cite-link-primary'));
  } else if (source) {
    links.append(externalLink(source, /doi\.org\//i.test(source) ? 'Open DOI ↗' : 'Open source ↗', 'cite-link-primary'));
  } else {
    const jump = document.createElement('a');
    jump.href = `#ref-${trigger.dataset.cite}`;
    jump.className = 'cite-link-secondary';
    jump.textContent = 'Jump to reference ↓';
    jump.addEventListener('click', () => closePopover());
    links.append(jump);
  }

  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'cite-copy-btn';
  const copyLabel = document.createElement('span');
  copyLabel.className = 'copy-label';
  copyLabel.textContent = 'Copy reference';
  copy.append(svgIcon(COPY_PATHS, 'cite-copy-icon'), copyLabel);
  copy.addEventListener('click', () => copyWithFeedback(copy, referenceText(entry)));

  foot.append(links, copy);
  content.append(foot);
  return content;
}, { label: 'Reference', className: 'doors-popover--citation' });
