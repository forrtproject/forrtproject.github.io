/* The steering committee page is generated with click-only cards and always-present dialogs, so this
   gives them what keyboards and screen readers need. scripts/generate_sc_profiles.py is the source. */
// Keep each team's name with its people, so that small teams can sit side by side.
document.querySelectorAll('.sc-grid').forEach((grid) => {
  let team = null;
  [...grid.children].forEach((tile) => {
    if (tile.classList.contains('sc-title-card')) {
      team = document.createElement('div');
      team.className = 'sc-team';
      tile.before(team);
    }
    if (team) team.append(tile);
  });
  grid.querySelectorAll('.sc-team').forEach((group) => {
    group.style.setProperty('--sc-members', group.querySelectorAll('.sc-card').length);
  });
});

// The four Strategic Focus Area teams are FORRT's four areas, so they, and only they, take the area
// colours (DESIGN.md §6); every other team is neutral. Matched by the team's name in the sheet.
const areas = [[/communit/i, 'com'], [/justice|deia/i, 'jus'], [/research|meta-?science/i, 'res'], [/educat|pedagog/i, 'edu']];
document.querySelectorAll('#strategic .sc-title-card').forEach((card) => {
  const name = card.querySelector('.sc-title-text')?.textContent || '';
  const area = areas.find(([pattern]) => pattern.test(name));
  if (area) card.dataset.area = area[1];
});

window.__scManaged = true;
let trigger = null;
const backdrops = [...document.querySelectorAll('.sc-modal-backdrop')];

backdrops.forEach((backdrop) => {
  const name = backdrop.querySelector('.sc-modal-name');
  if (!backdrop.getAttribute('role')) backdrop.setAttribute('role', 'dialog');
  if (!backdrop.getAttribute('aria-modal')) backdrop.setAttribute('aria-modal', 'true');
  if (name) {
    name.id = name.id || `${backdrop.id}-name`;
    if (!backdrop.getAttribute('aria-labelledby')) backdrop.setAttribute('aria-labelledby', name.id);
  }
  const closeBtn = backdrop.querySelector('.sc-close-btn');
  if (closeBtn) {
    if (!closeBtn.hasAttribute('type')) closeBtn.setAttribute('type', 'button');
    if (!closeBtn.getAttribute('aria-label')) closeBtn.setAttribute('aria-label', 'Close profile');
    closeBtn.querySelector('svg')?.setAttribute('aria-hidden', 'true');
  }
  backdrop.querySelectorAll('.sc-social-links a').forEach((link) => {
    link.querySelector('svg')?.setAttribute('aria-hidden', 'true');
    if (!link.getAttribute('aria-label')) {
      const host = new URL(link.href, location.href);
      link.setAttribute('aria-label', host.protocol === 'mailto:' ? 'Email' : host.hostname.replace(/^www\./, ''));
    }
  });
});

document.querySelectorAll('.sc-card[onclick]').forEach((card) => {
  const isButton = card.tagName === 'BUTTON';
  if (!card.getAttribute('aria-haspopup')) card.setAttribute('aria-haspopup', 'dialog');
  if (!isButton) {
    const name = card.querySelector('.sc-card-name')?.textContent.trim();
    const role = card.querySelector('.sc-card-role')?.textContent.trim();
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    if (!card.getAttribute('aria-label')) {
      const label = name ? (role ? `${name}, ${role}` : name) : 'View profile';
      card.setAttribute('aria-label', label);
    }
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  }
  card.addEventListener('click', () => { trigger = card; }, true);
});

const closeOpenModal = (open) => {
  if (!open) return;
  open.classList.remove('active');
  document.body.style.overflow = '';
};

// Into the dialog when it opens, back to the card when it closes, and Escape / Tab stay handled while open.
const focusDialog = (open) => {
  const closeBtn = open.querySelector('.sc-close-btn');
  if (!closeBtn || open.contains(document.activeElement)) return;
  closeBtn.focus();
  if (document.activeElement !== closeBtn) {
    requestAnimationFrame(() => {
      if (open.classList.contains('active') && !open.contains(document.activeElement)) closeBtn.focus();
    });
  }
};

const observer = new MutationObserver(() => {
  const open = backdrops.find((backdrop) => backdrop.classList.contains('active'));
  if (open) {
    if (!trigger && document.activeElement?.closest?.('.sc-card')) {
      trigger = document.activeElement.closest('.sc-card');
    }
    focusDialog(open);
  } else if (trigger) {
    trigger.focus();
    trigger = null;
  }
});
backdrops.forEach((backdrop) => observer.observe(backdrop, { attributes: true, attributeFilter: ['class'] }));

document.addEventListener('keydown', (event) => {
  const open = backdrops.find((backdrop) => backdrop.classList.contains('active'));
  if (!open) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeOpenModal(open);
    return;
  }
  if (event.key !== 'Tab') return;
  const stops = [...open.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')]
    .filter((el) => el.getClientRects().length);
  if (!stops.length) return;
  const first = stops[0];
  const last = stops[stops.length - 1];
  if (!open.contains(document.activeElement)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
