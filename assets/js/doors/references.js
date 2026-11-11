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
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-reference]');
  if (!button) return;
  const text = button.closest('.cite-us-item').querySelector('.cite-us-text');
  const label = button.querySelector('.copy-label');
  label.textContent = await copyText(referenceText(text)) ? 'Copied!' : 'Copy failed';
  button.classList.add('copied');
  clearTimeout(button.reset);
  button.reset = setTimeout(() => {
    label.textContent = 'Copy';
    button.classList.remove('copied');
  }, 2000);
});
