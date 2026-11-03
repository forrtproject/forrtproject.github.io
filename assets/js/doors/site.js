/* Header behaviour for every page: mega menus, the phone menu and the search box.
   Closing rules follow the Doors mock: Escape, a click outside and a second click all close,
   and an opened menu is next in the Tab order because it follows its button in the page. */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary');
const head = document.querySelector('.site-head');
const buttons = [...document.querySelectorAll('.nav-button')];

function closeMenus(restoreFocus = false) {
  const open = buttons.find((button) => button.getAttribute('aria-expanded') === 'true');
  buttons.forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
    document.getElementById(button.getAttribute('aria-controls')).hidden = true;
  });
  if (restoreFocus && open) open.focus();
}

function closePhoneMenu() {
  nav.dataset.open = 'false';
  toggle.setAttribute('aria-expanded', 'false');
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const wasOpen = button.getAttribute('aria-expanded') === 'true';
    closeMenus();
    if (!wasOpen) {
      button.setAttribute('aria-expanded', 'true');
      document.getElementById(button.getAttribute('aria-controls')).hidden = false;
      // In the phone menu, keep the chosen parent in view above its opened list.
      if (toggle.getClientRects().length) button.scrollIntoView({ block: 'nearest' });
    }
  });
});

toggle.addEventListener('click', () => {
  const open = nav.dataset.open === 'true';
  closeMenus();
  nav.dataset.open = String(!open);
  toggle.setAttribute('aria-expanded', String(!open));
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-head')) {
    closeMenus();
    closePhoneMenu();
  }
});

head.addEventListener('focusout', (event) => {
  if (event.relatedTarget && !head.contains(event.relatedTarget)) {
    closeMenus();
    closePhoneMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const phoneOpen = nav.dataset.open === 'true' && toggle.getClientRects().length > 0;
  closeMenus(!phoneOpen);
  closePhoneMenu();
  if (phoneOpen) toggle.focus();
});

// An empty search opens the theme's search dialog; a query reloads with ?q=, which it reads.
const searchForm = document.querySelector('.search-nav');
if (searchForm) {
  searchForm.addEventListener('submit', (event) => {
    if (!searchForm.elements.q.value.trim()) {
      event.preventDefault();
      document.querySelector('.search-open')?.click();
    }
  });
}
