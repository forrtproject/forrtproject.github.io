/* Header behaviour for every page: mega menus, the phone menu and the search box.
   Closing rules follow the Doors mock: Escape, a click outside and a second click all close,
   and an opened menu is next in the Tab order because it follows its button in the page. */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav.primary');
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

// Site search opens as a dialog. Its script, Fuse and the index load only now.
const searchDialog = document.getElementById('searchDialog');
function openSearch(query = '') {
  if (!searchDialog) return;
  if (!searchDialog.open) searchDialog.showModal();
  const start = () => window.doorsSearch(query);
  if (window.doorsSearch) {
    start();
  } else if (!searchDialog.dataset.loading) {
    searchDialog.dataset.loading = 'true';
    const script = document.createElement('script');
    script.src = searchDialog.dataset.script;
    script.onload = start;
    script.onerror = () => {
      script.remove();
      delete searchDialog.dataset.loading;
      document.getElementById('searchStatus').textContent = 'Search is unavailable right now. Try again in a moment.';
    };
    document.head.append(script);
  }
}
if (searchDialog) {
  document.querySelector('.search-nav')?.addEventListener('submit', (event) => {
    event.preventDefault();
    openSearch(event.target.elements.q.value.trim());
  });
  document.querySelector('.search-open')?.addEventListener('click', () => openSearch());
  searchDialog.querySelector('.search-close').addEventListener('click', () => searchDialog.close());
  searchDialog.addEventListener('click', (event) => {
    if (event.target === searchDialog) searchDialog.close();
  });
  // A search box's own Escape only clears it, so close the dialog at once.
  searchDialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      searchDialog.close();
    }
  });
  searchDialog.addEventListener('close', () => {
    const url = new URL(location.href);
    url.searchParams.delete('q');
    history.replaceState(null, '', url);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !event.target.closest('input,textarea,select,[contenteditable]')) {
      event.preventDefault();
      openSearch();
    }
  });
  const shared = new URLSearchParams(location.search).get('q');
  if (shared) openSearch(shared);
}

// The newsletter form comes from EmailOctopus and loads only when a visitor asks for it. The
// embed writes itself in beside this script, which it finds by its data-form attribute.
document.querySelectorAll('[data-newsletter-src]').forEach((box) => {
  const open = box.querySelector('.newsletter-open');
  const status = box.querySelector('.newsletter-status');
  open.addEventListener('click', () => {
    open.disabled = true;
    status.textContent = 'Loading the form.';
    const embed = document.createElement('script');
    embed.src = box.dataset.newsletterSrc;
    embed.dataset.form = box.dataset.newsletterId;
    embed.onload = () => {
      open.remove();
      status.textContent = '';
      box.querySelector('input[type=email]')?.focus();
    };
    embed.onerror = () => {
      embed.remove();
      open.disabled = false;
      status.textContent = 'The form did not load. Try again, or ask to join at info@forrt.org.';
    };
    box.append(embed);
  });
});

// An article's "Copy article link" button.
document.querySelectorAll('[data-copy-link]').forEach((button) => {
  const status = button.parentElement.querySelector('[role=status]');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyLink);
      status.textContent = 'Link copied.';
    } catch {
      status.textContent = 'Copy the address from your browser to share this page.';
    }
  });
});

// Code blocks, on the pages that load Highlight.js and Mermaid (site_head.html decides).
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('code.language-mermaid').forEach((code) => {
    const diagram = document.createElement('div');
    diagram.className = 'mermaid';
    diagram.textContent = code.textContent;
    code.closest('pre').replaceWith(diagram);
  });
  if (window.mermaid) window.mermaid.init(undefined, '.mermaid');
  if (window.hljs) window.hljs.initHighlighting();
});

// The theme's figure and gallery shortcodes write their images for lazysizes.
document.querySelectorAll('img.lazyload[data-src]').forEach((image) => {
  image.loading = 'lazy';
  image.src = image.dataset.src;
});

// A video's player replaces its poster when someone asks to play it.
document.addEventListener('click', (event) => {
  const poster = event.target.closest('[data-video]');
  if (!poster || event.metaKey || event.ctrlKey || event.shiftKey) return;
  event.preventDefault();
  const frame = document.createElement('iframe');
  frame.src = `https://www.youtube-nocookie.com/embed/${poster.dataset.video}?autoplay=1`;
  frame.title = poster.getAttribute('aria-label');
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.className = 'video-frame';
  poster.replaceWith(frame);
  frame.focus();
});

// A long summaries page shows its first entries, a filter and a count, all added here so that
// without JavaScript every entry shows and no control sits idle.
const summaryEntries = [...document.querySelectorAll('.summary-entry')];
if (summaryEntries.length) {
  const tools = document.createElement('div');
  tools.className = 'summary-tools';
  tools.innerHTML = '<label>Filter these summaries <input type="search" autocomplete="off" spellcheck="false"></label><p class="summary-count" role="status"></p>';
  summaryEntries[0].before(tools);
  const more = document.createElement('button');
  more.className = 'btn summary-more';
  more.type = 'button';
  more.textContent = 'Show more';
  summaryEntries[summaryEntries.length - 1].after(more);
  const input = tools.querySelector('input');
  let limit = 30;
  const show = () => {
    const query = input.value.trim().toLowerCase();
    const matches = summaryEntries.filter((entry) => !query || entry.textContent.toLowerCase().includes(query));
    const shown = query ? matches : matches.slice(0, limit);
    summaryEntries.forEach((entry) => { entry.hidden = !shown.includes(entry); });
    more.hidden = shown.length === matches.length;
    tools.querySelector('[role=status]').textContent = `Showing ${shown.length} of ${query ? `${matches.length} matching, from ` : ''}${summaryEntries.length} summaries.`;
  };
  input.addEventListener('input', show);
  more.addEventListener('click', () => {
    limit += 30;
    show();
  });
  show();
}

// A link to a heading inside a closed section opens the section.
function openTarget() {
  let id = location.hash.slice(1);
  try { id = decodeURIComponent(id); } catch { /* a malformed address keeps its form */ }
  const target = id && document.getElementById(id);
  const section = target && target.closest('details');
  if (section) {
    section.hidden = false;
    section.open = true;
    target.scrollIntoView();
  }
}
addEventListener('hashchange', openTarget);
openTarget();

// Older content opens and closes sections with Bootstrap's data attributes.
document.addEventListener('click', (event) => {
  const toggle = event.target.closest('[data-toggle=collapse]');
  if (!toggle || window.jQuery?.fn?.collapse) return;
  const target = document.querySelector(toggle.getAttribute('href') || toggle.dataset.target);
  if (!target) return;
  event.preventDefault();
  toggle.setAttribute('aria-expanded', String(target.classList.toggle('show')));
});

// The cookie banner covers the foot of the screen, so scrolling and side cards leave room for it.
function watchBanner() {
  const banner = document.querySelector('.cc-window');
  if (!banner) return;
  banner.lang = 'en';
  banner.dir = 'ltr';
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--banner', `${banner.offsetHeight}px`);
  }).observe(banner);
}
if (document.readyState === 'complete') watchBanner(); else addEventListener('load', () => setTimeout(watchBanner));

// A citation file, shown in a dialog built on the first click. A page offers one only when it has a cite.bib.
let citeDialog;
document.addEventListener('click', async (event) => {
  const cite = event.target.closest('.js-cite-modal');
  if (!cite) return;
  event.preventDefault();
  if (!citeDialog) {
    citeDialog = document.createElement('dialog');
    citeDialog.className = 'cite-dialog';
    citeDialog.innerHTML = '<h2>Cite</h2><pre tabindex="0"></pre><p role="status"></p><button class="btn btn-primary" type="button" data-copy>Copy</button> <a class="btn" download>Download</a> <button class="btn" type="button" data-close>Close</button>';
    document.body.append(citeDialog);
    citeDialog.querySelector('[data-close]').addEventListener('click', () => citeDialog.close());
    citeDialog.querySelector('[data-copy]').addEventListener('click', async () => {
      const status = citeDialog.querySelector('[role=status]');
      try {
        await navigator.clipboard.writeText(citeDialog.querySelector('pre').textContent);
        status.textContent = 'Copied.';
      } catch {
        status.textContent = 'Select the text above to copy it.';
      }
    });
  }
  citeDialog.querySelector('a').href = cite.dataset.filename;
  citeDialog.querySelector('[role=status]').textContent = '';
  citeDialog.showModal();
  const text = citeDialog.querySelector('pre');
  text.textContent = 'Loading.';
  try {
    const response = await fetch(cite.dataset.filename);
    if (!response.ok) throw new Error(response.statusText);
    text.textContent = await response.text();
  } catch {
    text.textContent = 'The citation could not be loaded. Use the Download button.';
  }
});

// The chatbot launcher. The chat's own script, styles and window load on the first click.
const chatWidget = document.getElementById('just-os-widget');
if (chatWidget) {
  const chatButton = chatWidget.querySelector('#just-os-btn');
  const chatBubble = chatWidget.querySelector('#just-os-bubble');
  let chatLoading = false;
  let chatFailed = false;
  const dismissed = () => sessionStorage.getItem('just-os-dismissed');
  if (dismissed()) chatWidget.hidden = true;
  chatWidget.querySelector('#just-os-dismiss').addEventListener('click', () => {
    chatWidget.hidden = true;
    sessionStorage.setItem('just-os-dismissed', '1');
  });
  // The invitation shows and hides on a slow cycle, as it always has, and rests while the chat is open.
  const chatOpen = () => document.getElementById('just-os-window')?.style.display === 'flex';
  const invitation = setInterval(() => {
    if (dismissed() || chatFailed) clearInterval(invitation);
    else if (!chatOpen()) chatBubble.classList.toggle('bubble-visible');
  }, 10000);
  if (chatButton.tagName === 'BUTTON') {
    chatButton.addEventListener('click', () => {
      if (window.toggleJustOS) {
        window.toggleJustOS();
        chatButton.setAttribute('aria-expanded', String(chatOpen()));
        return;
      }
      if (chatLoading) return;
      chatLoading = true;
      const styles = document.createElement('link');
      styles.rel = 'stylesheet';
      styles.href = chatWidget.dataset.css;
      document.head.append(styles);
      chatWidget.append(document.getElementById('just-os-template').content.cloneNode(true));
      const script = document.createElement('script');
      script.src = chatWidget.dataset.js;
      script.onload = () => {
        window.toggleJustOS();
        chatButton.setAttribute('aria-expanded', 'true');
      };
      script.onerror = () => {
        chatLoading = false;
        chatFailed = true;
        document.getElementById('just-os-window')?.remove();
        chatBubble.textContent = 'The chat did not load. Try again in a moment.';
        chatBubble.classList.add('bubble-visible');
      };
      document.head.append(script);
    });
  }
}

// Glossary pages: filter the list of terms, and show the current term inside its card.
const termFilter = document.getElementById('glossary-search');
if (termFilter) {
  const terms = [...document.querySelectorAll('.term-list li')];
  termFilter.addEventListener('input', () => {
    const query = termFilter.value.toLowerCase();
    terms.forEach((term) => { term.hidden = !term.textContent.toLowerCase().includes(query); });
  });
  const list = document.querySelector('.term-list');
  const current = list.querySelector('[aria-current]');
  if (current) list.scrollTop = current.offsetTop - list.offsetTop - list.clientHeight / 3;
}
