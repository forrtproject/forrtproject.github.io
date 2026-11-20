/* The steering committee page is generated with click-only cards and always-present dialogs, so this
   gives them what keyboards, screen readers and the Doors layout need. scripts/generate_sc_profiles.py is the source. */
// Keep each team's name with its people, so that small teams can sit side by side.
// Sections without a team title card (such as Strategic Facilitation & Integration) group their cards together too.
document.querySelectorAll('.sc-grid').forEach((grid) => {
  let team = null;
  [...grid.children].forEach((tile) => {
    if (tile.classList.contains('sc-title-card')) {
      team = document.createElement('div');
      team.className = 'sc-team';
      tile.before(team);
    } else if (!team && tile.classList.contains('sc-card')) {
      team = document.createElement('div');
      team.className = 'sc-team sc-team-plain';
      tile.before(team);
    }
    if (team) team.append(tile);
  });
  grid.querySelectorAll('.sc-team').forEach((group) => {
    const count = group.querySelectorAll('.sc-card').length;
    group.style.setProperty('--sc-members', count);
    // Group the member cards inside a clean inner grid so team headers span cleanly above them.
    const members = document.createElement('div');
    members.className = 'sc-members';
    group.querySelectorAll(':scope > .sc-card').forEach((card) => members.append(card));
    group.append(members);
  });
});

// The four Strategic Focus Area teams are FORRT's four areas, so they, and only they, take the area
// colours (DESIGN.md §6); every other team stays neutral. Matched by the team's name in the sheet.
const areas = [[/communit/i, 'com'], [/justice|deia/i, 'jus'], [/research|meta-?science/i, 'res'], [/educat|pedagog/i, 'edu']];
document.querySelectorAll('#strategic .sc-title-card').forEach((card) => {
  const name = card.querySelector('.sc-title-text')?.textContent || '';
  const area = areas.find(([pattern]) => pattern.test(name));
  if (area) {
    card.dataset.area = area[1];
    const team = card.closest('.sc-team');
    if (team) team.dataset.area = area[1];
  }
});

// Add member counts to the section jump bar so visitors can see the shape of governance at a glance.
document.querySelectorAll('.sc-nav a[href^="#"]').forEach((link) => {
  const section = document.querySelector(link.getAttribute('href'));
  if (!section) return;
  const count = section.querySelectorAll('.sc-card').length;
  if (count) {
    const badge = document.createElement('span');
    badge.className = 'sc-nav-count';
    badge.textContent = `(${count})`;
    link.append(' ', badge);
  }
});

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
