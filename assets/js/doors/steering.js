/* The steering committee page is generated with click-only cards and always-present dialogs, so this
   gives them what keyboards and screen readers need. scripts/generate_sc_profiles.py is the source. */
let trigger = null;
const backdrops = [...document.querySelectorAll('.sc-modal-backdrop')];

backdrops.forEach((backdrop) => {
  const name = backdrop.querySelector('.sc-modal-name');
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  if (name) {
    name.id = name.id || `${backdrop.id}-name`;
    backdrop.setAttribute('aria-labelledby', name.id);
  }
  backdrop.querySelector('.sc-close-btn')?.setAttribute('aria-label', 'Close this profile');
  backdrop.querySelectorAll('.sc-social-links a').forEach((link) => {
    if (!link.getAttribute('aria-label')) {
      const host = new URL(link.href, location.href);
      link.setAttribute('aria-label', host.protocol === 'mailto:' ? 'Email' : host.hostname.replace(/^www\./, ''));
    }
  });
});

document.querySelectorAll('.sc-card[onclick]').forEach((card) => {
  const name = card.querySelector('.sc-card-name');
  card.setAttribute('role', 'button');
  card.tabIndex = 0;
  card.setAttribute('aria-label', `Open the profile of ${name ? name.textContent.trim() : 'this person'}`);
  card.addEventListener('click', () => { trigger = card; });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.click();
    }
  });
});

// Into the dialog when it opens, back to the card when it closes, and Tab stays inside while open.
const observer = new MutationObserver(() => {
  const open = backdrops.find((backdrop) => backdrop.classList.contains('active'));
  if (open) {
    // The dialog can't take focus until its fade-in has made it visible.
    if (!open.contains(document.activeElement)) setTimeout(() => open.querySelector('.sc-close-btn')?.focus(), 60);
  } else if (trigger) {
    trigger.focus();
    trigger = null;
  }
});
backdrops.forEach((backdrop) => observer.observe(backdrop, { attributes: true, attributeFilter: ['class'] }));

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const open = backdrops.find((backdrop) => backdrop.classList.contains('active'));
  if (!open) return;
  const stops = [...open.querySelectorAll('a[href],button')].filter((el) => el.getClientRects().length);
  const first = stops[0];
  const last = stops[stops.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
