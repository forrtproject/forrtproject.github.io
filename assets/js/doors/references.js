/* Full references with long author lists show three authors and "et al." until their button
   is pressed (layouts/partials/citations/authors.html). The click handler is delegated, so the
   button also works in the copy of a reference that the citation popover shows. */

// The reference as text to copy: every author, without the "et al.", the button's label or a note.
export function referenceText(node) {
  const copy = node.cloneNode(true);
  copy.querySelectorAll('.ref-etal,.ref-authors-toggle,.ref-note').forEach((element) => element.remove());
  return copy.textContent.replace(/\s+/g, ' ').trim();
}

// The Clipboard API needs a secure context; older browsers and plain-http previews fall back to a selection.
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const focused = document.activeElement;
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.append(area);
    area.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    area.remove();
    focused?.focus({ preventScroll: true });
    return copied;
  }
}

/* Every copy button on the site (also the static scripts', through window.forrtCopy in site.js): copy the text and,
   only once that has worked, draw a check in the button's icon slot and say "Copied" for a few seconds, in the
   width the button already has (base.css), with the news in a status line for screen readers. A button without an
   icon shows the check before "Copied". When copying fails, `onFail` runs, and by default the text is offered to
   copy by hand. */
const CHECK = 'M5 13l4 4L19 7';
const SVG = 'http://www.w3.org/2000/svg';
function statusLine(button) {
  // Inside a modal dialog, the rest of the page is inert, so the dialog gets its own line.
  const host = button.closest('dialog') || document.body;
  let line = [...host.children].find((child) => child.matches('.copy-status'));
  if (!line) {
    line = Object.assign(document.createElement('p'), { className: 'copy-status visually-hidden' });
    line.setAttribute('role', 'status');
    host.append(line);
  }
  return line;
}
function checkPath(svg) {
  let path = svg.querySelector('.copy-check');
  if (!path) {
    path = document.createElementNS(SVG, 'path');
    path.setAttribute('class', 'copy-check');
    path.setAttribute('d', CHECK);
    path.setAttribute('pathLength', '1');
    // The check is drawn on a 24-unit grid; icons on a smaller grid scale it down.
    const size = svg.viewBox.baseVal?.width || 24;
    if (size !== 24) path.setAttribute('transform', `scale(${size / 24})`);
    svg.append(path);
  }
  return path;
}
export async function copyWithFeedback(button, text, { onFail, said = 'Copied.' } = {}) {
  const line = statusLine(button);
  if (!await copyText(text)) {
    if (onFail) onFail(); else window.prompt('Copy this text:', text);
    return false;
  }
  clearTimeout(button.copyReset);
  if (!button.classList.contains('is-copied')) {
    button.style.minWidth = `${button.getBoundingClientRect().width}px`;
    const svg = button.querySelector('svg');
    const label = button.querySelector('.copy-label');
    if (svg) checkPath(svg);
    if (label) {
      const text = label.textContent;
      button.copyRest = () => { label.textContent = text; };
      label.textContent = 'Copied';
    } else if (!svg) {
      const rest = button.innerHTML;
      button.copyRest = () => { button.innerHTML = rest; };
      button.innerHTML = `<svg class="copy-check-icon" viewBox="0 0 24 24" aria-hidden="true"><path class="copy-check" pathLength="1" d="${CHECK}"></path></svg>Copied`;
    } else button.copyRest = () => {};
  } else {
    // Copied again: the check draws again.
    button.classList.remove('is-copied');
    void button.offsetWidth;
  }
  button.classList.add('is-copied');
  line.textContent = '';
  setTimeout(() => { line.textContent = said; }, 60);
  button.copyReset = setTimeout(() => {
    button.classList.remove('is-copied');
    button.copyRest();
    button.style.minWidth = '';
  }, 2500);
  return true;
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('.ref-authors-toggle');
  if (!button) return;
  const authors = button.closest('.ref-authors');
  const open = button.getAttribute('aria-expanded') !== 'true';
  authors.querySelector('.ref-more').hidden = !open;
  authors.querySelector('.ref-etal').hidden = open;
  button.setAttribute('aria-expanded', String(open));
  button.textContent = open ? button.dataset.less : button.dataset.more;
});

// Citation cards ({{< citation-card >}}) copy the reference beside their button.
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-copy-reference]');
  if (button) copyWithFeedback(button, referenceText(button.closest('.cite-us-item').querySelector('.cite-us-text')));
});
