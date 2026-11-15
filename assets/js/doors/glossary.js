import { openPopover, closePopover } from './popover.js';

// Glossary links navigate on mouse click and Enter. Their focus/touch rules differ
// from citation registration, so use the shared opening primitive directly.
const selector = 'a.gloss-term[data-term]';
let lookup;
let opening;
let closing;
let request = 0;
let pointerFocus = false;
let touchTrigger;
let changingPopover = false;

function loadIndex() {
  if (!lookup) {
    lookup = fetch(document.querySelector('meta[name="glossary-index"]').content)
      .then((response) => {
        if (!response.ok) throw new Error('Glossary index unavailable');
        return response.json();
      }).catch((error) => { lookup = null; throw error; });
  }
  return lookup;
}

function panelFor(trigger) {
  return document.getElementById(trigger.getAttribute('aria-controls'));
}

function cancelOpening() {
  clearTimeout(opening);
  request += 1;
}

async function show(trigger, mode, data = loadIndex()) {
  const attempt = ++request;
  try {
    const terms = await data;
    if (attempt !== request || !trigger.isConnected) return;
    if (mode === 'hover' && !trigger.matches(':hover')) return;
    if (mode === 'focus' && document.activeElement !== trigger) return;
    const term = terms[trigger.dataset.term];
    if (!term) return;
    const content = document.createElement('div');
    const title = document.createElement('p');
    title.className = 'gloss-popover-title';
    title.textContent = term.title;
    const summary = document.createElement('div');
    summary.textContent = term.summary;
    const actions = document.createElement('div');
    actions.className = 'popover-actions';
    const full = document.createElement('a');
    full.href = term.url;
    full.textContent = 'Read the full definition →';
    actions.append(full);
    content.append(title, summary, actions);
    // `hover` is the primitive's no-focus-transfer option, also needed for keyboard focus.
    changingPopover = true;
    try {
      openPopover(trigger, content, { label: `Glossary: ${term.title}`, hover: mode !== 'touch' });
      // Replacing a touch/citation panel restores its old trigger's focus. Keep
      // an incoming keyboard focus on the glossary link the reader moved to.
      if (mode === 'focus' && document.activeElement !== trigger) trigger.focus({ preventScroll: true });
    } finally {
      changingPopover = false;
    }
  } catch {
    // Hover/focus keep their ordinary link; a failed first tap follows it too.
    if (mode === 'touch' && attempt === request) location.assign(trigger.href);
  }
}

document.addEventListener('pointerover', (event) => {
  if (event.pointerType === 'touch') return;
  const trigger = event.target.closest(selector);
  if (!trigger || trigger.contains(event.relatedTarget)) return;
  clearTimeout(closing);
  cancelOpening();
  const data = loadIndex();
  data.catch(() => {});
  // Returning from the panel clears the shared primitive's pending hover close.
  if (panelFor(trigger)) show(trigger, 'hover', data);
  else opening = setTimeout(() => show(trigger, 'hover', data), 250);
});

document.addEventListener('pointerout', (event) => {
  if (event.pointerType === 'touch') return;
  const trigger = event.target.closest(selector);
  if (!trigger || trigger.contains(event.relatedTarget)) return;
  cancelOpening();
  const panel = panelFor(trigger);
  if (!panel || panel.contains(event.relatedTarget)) return;
  closing = setTimeout(() => {
    if (panelFor(trigger) === panel && !panel.matches(':hover') && document.activeElement !== trigger) closePopover();
  }, 200);
});

document.addEventListener('focusin', (event) => {
  const trigger = event.target.closest(selector);
  if (!trigger || pointerFocus || changingPopover) return;
  clearTimeout(closing);
  cancelOpening();
  show(trigger, 'focus');
});
document.addEventListener('focusout', (event) => {
  const trigger = event.target.closest(selector);
  if (!trigger || panelFor(trigger)?.contains(event.relatedTarget)) return;
  cancelOpening();
  if (panelFor(trigger)) closePopover();
});

document.addEventListener('pointerdown', (event) => {
  pointerFocus = true;
  touchTrigger = event.pointerType === 'touch' ? event.target.closest(selector) : null;
  if (!event.target.closest(`${selector},.doors-popover`)) cancelOpening();
});
document.addEventListener('pointercancel', () => { touchTrigger = null; });
document.addEventListener('click', (event) => {
  const trigger = event.target.closest(selector);
  if (!trigger || (event.pointerType !== 'touch' && trigger !== touchTrigger)) return;
  if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  touchTrigger = null;
  if (panelFor(trigger)) return;
  event.preventDefault();
  cancelOpening();
  show(trigger, 'touch');
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') pointerFocus = false;
  if (event.key === 'Escape' || ((event.key === 'Enter' || event.key === ' ') && event.target.closest('.doors-popover-close'))) {
    // Explicit dismissal returns focus to the trigger; that must not reopen it.
    pointerFocus = true;
    cancelOpening();
    clearTimeout(closing);
  }
}, true);
