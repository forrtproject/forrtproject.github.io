/* Header behaviour for every page: mega menus, the phone menu and the search box.
   Closing rules follow the Doors mock: Escape, a click outside and a second click all close,
   and an opened menu is next in the Tab order because it follows its button in the page. */
import './citations.js';
import './references.js';
import './glossary.js';

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

// Newsletter sign-up (layouts/partials/doors/newsletter.html). Nothing loads from elsewhere until
// a visitor presses Subscribe. Then Google reCAPTCHA loads, as EmailOctopus requires, and the form
// posts the address to EmailOctopus the way its own embed does.
let recaptcha;
let recaptchaTries = 0;
const loadRecaptcha = () => {
  recaptcha ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    // A failed or stalled load clears the cache, so the next Subscribe tries again. Each retry
    // gets its own URL; otherwise the browser waits on the stalled request again.
    // Only the latest attempt clears the cache: a late error from a stalled earlier script must
    // not wipe out the promise of the retry that replaced it.
    const attempt = recaptchaTries;
    const fail = () => {
      clearTimeout(timer);
      if (attempt === recaptchaTries - 1) recaptcha = null;
      script.remove();
      reject(new Error('reCAPTCHA did not load'));
    };
    const timer = setTimeout(fail, 120000);
    window.forrtRecaptchaReady = () => { clearTimeout(timer); resolve(window.grecaptcha); };
    script.src = 'https://www.google.com/recaptcha/api.js?onload=forrtRecaptchaReady&render=explicit'
      + (recaptchaTries ? `&retry=${recaptchaTries}` : '');
    recaptchaTries += 1;
    script.async = true;
    script.onerror = fail;
    document.head.append(script);
  });
  return recaptcha;
};

document.querySelectorAll('.newsletter-form').forEach((form) => {
  const button = form.querySelector('.newsletter-submit');
  const status = form.querySelector('.newsletter-status');
  const email = form.querySelector('input[type=email]');
  let widget;
  let solved;
  const say = (text, error) => {
    status.textContent = text;
    status.classList.toggle('is-error', Boolean(error));
  };
  const token = async () => {
    const grecaptcha = await loadRecaptcha();
    if (widget === undefined) {
      const holder = document.createElement('div');
      form.append(holder);
      widget = grecaptcha.render(holder, {
        sitekey: form.dataset.newsletterSitekey, size: 'invisible', badge: 'inline', isolated: true,
        callback: (value) => solved?.resolve(value),
        'error-callback': () => solved?.reject(new Error('reCAPTCHA failed')),
      });
      holder.hidden = true;
    }
    return new Promise((resolve, reject) => {
      solved = { resolve, reject };
      grecaptcha.execute(widget);
    });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    button.disabled = true;
    say('Subscribing…');
    try {
      const body = new URLSearchParams();
      form.querySelectorAll('input[name]').forEach((input) => body.set(input.name, input.value.trim()));
      // Covers a reCAPTCHA script that stalls as well as a challenge the visitor closes.
      body.set('recaptcha-response', await Promise.race([
        token(),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error('reCAPTCHA timed out')), 120000)),
      ]));
      const reply = await (await fetch(form.action, { method: 'POST', mode: 'cors', cache: 'no-cache', body })).json();
      if (reply.success) {
        form.classList.add('is-done');
        say('Thanks for subscribing! Look out for FORRT news in your inbox.');
        status.focus();
        return;
      }
      const code = reply.error?.code;
      say(code === 'INVALID_PARAMETERS'
        ? 'That email address does not look right. Please check it and try again.'
        : 'Sorry, that did not work. Please try again, or ask to join at info@forrt.org.', true);
      if (code === 'INVALID_PARAMETERS') email.focus();
    } catch {
      say('Sorry, that did not work. Please try again, or ask to join at info@forrt.org.', true);
    } finally {
      button.disabled = false;
      if (widget !== undefined) window.grecaptcha?.reset(widget);
    }
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
  // What a filter looks through: title, takeaways, quote and abstract, not the fixed headings or related links.
  const words = new Map(summaryEntries.map((entry) => {
    const copy = entry.cloneNode(true);
    copy.querySelectorAll('h3').forEach((heading) => heading.remove());
    copy.querySelector('ul:last-of-type')?.remove();
    return [entry, copy.textContent.toLowerCase()];
  }));
  let limit = 30;
  const show = () => {
    const query = input.value.trim().toLowerCase();
    const matches = summaryEntries.filter((entry) => !query || words.get(entry).includes(query));
    const shown = query ? matches : matches.slice(0, limit);
    // An entry someone has opened, perhaps from a link to it, stays in view.
    summaryEntries.forEach((entry) => { entry.hidden = !shown.includes(entry) && !entry.open; });
    more.hidden = shown.length === matches.length;
    const kept = summaryEntries.filter((entry) => !entry.hidden).length - shown.length;
    const count = query ? `${matches.length} of ${summaryEntries.length} summaries match.` : `Showing ${shown.length} of ${summaryEntries.length} summaries.`;
    tools.querySelector('[role=status]').textContent = kept ? `${count} ${kept} you opened ${kept === 1 ? 'stays' : 'stay'} in view.` : count;
  };
  input.addEventListener('input', show);
  addEventListener('hashchange', show);
  more.addEventListener('click', () => {
    const next = summaryEntries[limit];
    limit += 30;
    show();
    next?.querySelector('summary').focus();
  });
  show();
}

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

// Whether nothing of the page's own lies under a box (with a 6 px margin): no text, control, image or card,
// a card being anything with its own background, shadow or side borders that does not span the screen.
const textRange = document.createRange();
function emptyAt(el, x, y) {
  if (el === document.documentElement || el === document.body) return true;
  if (el.closest('a,button,input,select,textarea,summary,label,img,svg,video,iframe,canvas,[role=button],[tabindex]:not([tabindex="-1"])')) return false;
  for (const node of el.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE || !node.data.trim()) continue;
    textRange.selectNodeContents(node);
    if ([...textRange.getClientRects()].some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom)) return false;
  }
  const screen = document.documentElement.clientWidth;
  for (let e = el; e && e !== document.body; e = e.parentElement) {
    const style = getComputedStyle(e);
    const painted = style.backgroundColor !== 'rgba(0, 0, 0, 0)' || style.backgroundImage !== 'none' || style.boxShadow !== 'none'
      || ['Left', 'Right'].every((side) => style[`border${side}Style`] !== 'none' && parseFloat(style[`border${side}Width`]));
    const box = e.getBoundingClientRect();
    if (painted && (box.left > 1 || box.right < screen - 1)) return false;
  }
  return true;
}
function overEmptySpace(box) {
  for (let x = box.left - 6; x <= box.right + 6; x += 6) {
    for (let y = box.top - 6; y <= box.bottom + 6; y += 6) {
      const el = document.elementsFromPoint(x, y).find((e) => !e.closest('#just-os-widget'));
      if (el && !emptyAt(el, x, y)) return false;
    }
  }
  return true;
}

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
  // It shows only over empty space, so it never covers text, a card or a control.
  // Where the launcher is a tab (launcher.css) the margin is too narrow for it: there it is offered once, at the top of the page.
  const chatOpen = () => document.getElementById('just-os-window')?.style.display === 'flex';
  const tabbed = () => matchMedia('(max-width:1439px)').matches;
  let offered = false;
  const invitation = setInterval(() => {
    if (dismissed() || chatFailed) return clearInterval(invitation);
    if (chatOpen()) return;
    const shown = chatBubble.classList.contains('bubble-visible');
    chatBubble.classList.remove('bubble-visible');
    if (tabbed() && (offered || scrollY > 0)) return clearInterval(invitation);
    offered = true;
    if (!shown && overEmptySpace(chatBubble.getBoundingClientRect())) chatBubble.classList.add('bubble-visible');
  }, 10000);
  // Any scroll hides it, and the message that the chat did not load, which replaces it after a click.
  addEventListener('scroll', () => chatBubble.classList.remove('bubble-visible'), { passive: true });
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
const termGrid = document.querySelector('.term-grid');
if (termFilter && termGrid) {
  // The glossary hub: match on the term's name, hide letters left empty, and say when nothing matches.
  const terms = [...termGrid.querySelectorAll('li[data-term]')];
  const groups = [...termGrid.querySelectorAll('.term-group')];
  const none = document.querySelector('.glossary-none');
  termFilter.addEventListener('input', () => {
    const query = termFilter.value.trim().toLowerCase();
    // Names first; when no name matches, the definitions (a related term may be named only inside them).
    const byName = terms.some((term) => term.dataset.term.includes(query));
    terms.forEach((term) => {
      term.hidden = !(byName ? term.dataset.term : term.textContent.toLowerCase()).includes(query);
    });
    groups.forEach((group) => { group.hidden = !group.querySelector('li:not([hidden])'); });
    none.hidden = groups.some((group) => !group.hidden);
    // Letters with no match left are dimmed and leave the tab order.
    groups.forEach((group) => {
      const letter = document.querySelector(`.glossary-letters a[href="#${group.id}"]`);
      if (!letter) return;
      letter.classList.toggle('is-empty', group.hidden);
      if (group.hidden) letter.setAttribute('tabindex', '-1'); else letter.removeAttribute('tabindex');
    });
    document.querySelector('.glossary-clear').hidden = !query;
    const shown = terms.filter((term) => !term.hidden).length;
    document.querySelector('.glossary-count').textContent = query && shown ? `${shown} of ${terms.length} terms` : '';
  });
  // Cards or a compact list; the choice is kept for the next visit.
  const view = document.querySelector('.glossary-view');
  const setView = (list) => {
    termGrid.classList.toggle('is-list', list);
    view.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.view === 'list') === list)));
    try { localStorage.setItem('glossary-view', list ? 'list' : 'cards'); } catch (e) { /* storage blocked: the choice lasts this visit */ }
  };
  view.hidden = false;
  view.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view === 'list')));
  // Phones start with the compact list; a stored choice wins.
  let stored = null;
  try { stored = localStorage.getItem('glossary-view'); } catch (e) { /* no stored choice */ }
  if (stored ? stored === 'list' : matchMedia('(max-width: 760px)').matches) setView(stored === 'list' || !stored);
  // The letter whose terms are on screen is marked in the letter bar.
  const letterLinks = [...document.querySelectorAll('.glossary-letters a')];
  if ('IntersectionObserver' in window && letterLinks.length) {
    const seen = new Map();
    const mark = () => {
      const top = [...seen.entries()].filter(([, on]) => on).map(([id]) => id)[0];
      if (top) letterLinks.forEach((a) => a.classList.toggle('is-current', a.hash === `#${top}`));
    };
    const watch = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      mark();
    }, { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('.term-group').forEach((g) => { seen.set(g.id, false); watch.observe(g); });
  }
  document.querySelector('.glossary-clear').addEventListener('click', () => {
    termFilter.value = '';
    termFilter.dispatchEvent(new Event('input'));
    termFilter.focus();
  });
  // /glossary/english/?q=… opens with that search, so a related term without its own page can link here.
  const asked = new URLSearchParams(location.search).get('q');
  if (asked) { termFilter.value = asked; termFilter.dispatchEvent(new Event('input')); }
  // "How to cite" links to the closed disclosure at the end; following the link opens it.
  const about = document.getElementById('about-the-glossary');
  const openAbout = () => { if (location.hash === '#about-the-glossary') about.open = true; };
  window.addEventListener('hashchange', openAbout);
  openAbout();
} else if (termFilter) {
  const terms = [...document.querySelectorAll('.term-list li')];
  // A count, a no-results line and a clear button under the filter.
  const status = document.createElement('p');
  status.className = 'term-filter-status';
  status.setAttribute('aria-live', 'polite');
  const clearTerms = document.createElement('button');
  clearTerms.type = 'button';
  clearTerms.className = 'term-filter-clear';
  clearTerms.textContent = 'Clear';
  clearTerms.hidden = true;
  termFilter.after(status, clearTerms);
  clearTerms.addEventListener('click', () => { termFilter.value = ''; termFilter.dispatchEvent(new Event('input')); termFilter.focus(); });
  termFilter.addEventListener('input', () => {
    const query = termFilter.value.toLowerCase();
    terms.forEach((term) => { term.hidden = !term.textContent.toLowerCase().includes(query); });
    const shown = terms.filter((term) => !term.hidden).length;
    status.textContent = !query ? '' : shown ? `${shown} ${shown === 1 ? 'term' : 'terms'}` : 'No matching terms.';
    clearTerms.hidden = !query;
  });
  // On a phone the list moves up, into a "Find another term" disclosure right after the definition.
  const card = document.getElementById('glossary-terms');
  const definition = document.querySelector('.term-definition');
  if (card && definition && window.matchMedia('(max-width: 1000px)').matches) {
    const finder = document.createElement('details');
    finder.className = 'term-finder';
    const summary = document.createElement('summary');
    summary.textContent = document.documentElement.lang.startsWith('en') ? 'Find another term' : (card.querySelector('h2')?.textContent || 'Find another term');
    finder.append(summary, card);
    definition.after(finder);
    document.querySelector('.term-list-jump')?.remove();
  }
  const list = document.querySelector('.term-list');
  const current = list.querySelector('[aria-current]');
  if (current) list.scrollTop = current.offsetTop - list.offsetTop - list.clientHeight / 3;
}

// Home: on a phone each area shows two links, and its "more" button shows the rest.
document.querySelectorAll('.area-more button').forEach((button) => {
  button.addEventListener('click', () => {
    const area = button.closest('.area');
    area.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    area.querySelector('li:nth-child(3) a')?.focus();
  });
});

// An entry whose details give "Status: …" (the effects on /reversals/) shows that status as a chip beside its name.
document.querySelectorAll('.article-style li > p > strong:first-child').forEach((name) => {
  const item = name.closest('li');
  if (!item.querySelector('.spoiler')) return;
  const line = [...item.querySelectorAll('.spoiler li')].find((li) => /^\s*status:/i.test(li.textContent));
  const status = line ? line.textContent.replace(/^\s*status:\s*/i, '').trim().toLowerCase() : '';
  // One word set for the chips; any qualifier stays in the statistics and in the chip's title.
  // An entry with no status says so, so that it can still be found by outcome.
  const label = ['not replicated', 'reversed', 'mixed', 'replicated'].find((word) => status.startsWith(word) || status.includes(word)) || 'no status';
  const chip = document.createElement('span');
  chip.className = `status-chip status-${label.replace(/[^a-z]+/g, '-')}`;
  chip.textContent = label;
  if (status !== label) chip.title = status;
  name.before(chip, ' ');
});

// Replication Hub: a search over the tools; a stage with no match steps aside.
const toolFind = document.querySelector('.tool-find');
if (toolFind) {
  toolFind.hidden = false;
  const input = toolFind.querySelector('input');
  const count = toolFind.querySelector('.tool-find-count');
  const tools = [...document.querySelectorAll('.stage .tool')];
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    tools.forEach((tool) => { tool.hidden = Boolean(query) && !tool.textContent.toLowerCase().includes(query); });
    document.querySelectorAll('.stage').forEach((stage) => { stage.hidden = Boolean(query) && !stage.querySelector('.tool:not([hidden])'); });
    const shown = tools.filter((tool) => !tool.hidden).length;
    count.textContent = !query ? '' : shown ? `${shown} of ${tools.length} tools` : 'No tool matches.';
  });
}

// Get Involved: a search over the project cards.
const projectFilter = document.querySelector('.project-filter');
if (projectFilter) {
  projectFilter.hidden = false;
  const input = projectFilter.querySelector('input');
  const count = projectFilter.querySelector('.list-filter-count');
  const cards = [...document.querySelectorAll('.get-involved-card')];
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const match = !query || card.textContent.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) shown += 1;
    });
    count.textContent = !query ? '' : shown ? `${shown} of ${cards.length} projects` : 'No project matches.';
  });
}

// A search over the list items after it (shortcodes/list_filter.html): items match on their text, and a
// heading whose lists are all hidden hides too, so the page reads as the matches.
const listFilter = document.querySelector('.list-filter:not(.project-filter)');
if (listFilter) {
  listFilter.hidden = false;
  const input = listFilter.querySelector('input');
  const count = listFilter.querySelector('.list-filter-count');
  const sections = [];
  let section = null;
  for (let node = listFilter.nextElementSibling; node; node = node.nextElementSibling) {
    if (/^H[1-3]$/.test(node.tagName)) { section = {heading: node, items: []}; sections.push(section); }
    else if (section && /^(UL|OL)$/.test(node.tagName)) section.items.push(...node.children);
  }
  // Where the entries carry details (the reversals' statistics), other lists after them, such as further
  // literature or contributors, are not entries: they stay out of the menu, the count and the filter.
  if (sections.some(({items}) => items.some((item) => item.querySelector('.spoiler')))) {
    sections.forEach((s) => { s.items = s.items.filter((item) => item.querySelector('.spoiler')); });
  }
  // A menu of the sections that hold entries, with their counts, to jump straight to one.
  const withItems = sections.filter(({items}) => items.length && items.length < 400);
  if (withItems.length > 3) {
    const jump = document.createElement('label');
    jump.className = 'list-filter-jump';
    jump.textContent = 'Go to ';
    const select = document.createElement('select');
    select.append(new Option('a section…', ''));
    withItems.forEach(({heading, items}) => select.append(new Option(`${heading.textContent.trim()} (${items.length})`, heading.id)));
    select.addEventListener('change', () => { if (select.value) document.getElementById(select.value).scrollIntoView(); });
    jump.append(select);
    count.before(jump);
  }
  // Status buttons, when the entries carry status chips: show one outcome at a time.
  let status = '';
  const outcomes = ['not replicated', 'reversed', 'mixed', 'replicated', 'no status'].filter((word) => document.querySelector(`.status-${word.replace(' ', '-')}`));
  if (outcomes.length) {
    const row = document.createElement('div');
    row.className = 'list-filter-status';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', 'Show by outcome');
    ['all', ...outcomes].forEach((word) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = word === 'all' ? 'status-chip' : `status-chip status-${word.replace(' ', '-')}`;
      const many = word === 'all' ? '' : ` ${document.querySelectorAll(`.list-filter ~ ul .status-${word.replace(' ', '-')}`).length}`;
      button.textContent = word + many;
      button.setAttribute('aria-pressed', String(word === 'all'));
      button.addEventListener('click', () => {
        status = word === 'all' ? '' : word.replace(' ', '-');
        row.querySelectorAll('button').forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
        input.dispatchEvent(new Event('input'));
      });
      row.append(button);
    });
    count.before(row);
  }
  let words = /./;
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    words = new RegExp(`(^|[^\\p{L}\\p{N}])${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'iu');
    let shown = 0;
    sections.forEach(({heading, items}) => {
      if (!items.length) return;
      let any = false;
      items.forEach((item) => {
        // Matches the start of a word, so "ego" finds ego depletion and not "category".
        const match = (!query || words.test(item.textContent)) && (!status || item.querySelector(`.status-${status}`));
        item.hidden = !match;
        if (match) { any = true; shown += 1; }
      });
      heading.hidden = Boolean(query || status) && !any;
    });
    count.textContent = !(query || status) ? '' : shown ? `${shown} ${shown === 1 ? 'entry matches' : 'entries match'}` : 'Nothing matches.';
  });
}

// A table wider than the screen scrolls in its own box, so keyboard users must be able to focus it.
// Closed sections and late fonts change the answer after load.
function focusableTable(table) {
  if (table.scrollWidth > table.clientWidth) table.tabIndex = 0;
  else table.removeAttribute('tabindex');
}
const tables = document.querySelectorAll('.article-style table');
const tableSizes = new ResizeObserver((entries) => entries.forEach((entry) => focusableTable(entry.target)));
tables.forEach((table) => tableSizes.observe(table));
document.fonts?.ready.then(() => tables.forEach(focusableTable));

// Altmetric's badges are links with no text, so each takes the name of what it measures.
const badges = document.querySelectorAll('.altmetric-embed');
if (badges.length) {
  const nameBadges = () => badges.forEach((badge) => {
    const label = badge.previousElementSibling?.classList.contains('pub-metric-label') ? badge.previousElementSibling.textContent : 'publication';
    badge.querySelector('a:not([aria-label])')?.setAttribute('aria-label', `Altmetric attention for this ${label.toLowerCase()}`);
  });
  new MutationObserver(nameBadges).observe(document.querySelector('.pub-list, .article-style') || document.body, { childList: true, subtree: true });
}
