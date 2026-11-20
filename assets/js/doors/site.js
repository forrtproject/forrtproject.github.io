/* Header behaviour for every page: mega menus, the phone menu and the search box.
   Closing rules follow the Doors mock: Escape, a click outside and a second click all close,
   and an opened menu is next in the Tab order because it follows its button in the page. */
import './citations.js';
import { copyWithFeedback } from './references.js';
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

// The copy buttons of the scripts in static/js (the chat, cluster and discipline pages) share the feedback of the
// site's own (references.js).
window.forrtCopy = copyWithFeedback;

// An article's "Copy article link" button. The button itself says when the link is copied; the line beside it
// explains what to do if copying fails.
document.querySelectorAll('[data-copy-link]').forEach((button) => {
  const status = button.parentElement.querySelector('[role=status]');
  button.addEventListener('click', () => copyWithFeedback(button, button.dataset.copyLink, {
    said: 'Link copied.',
    onFail: () => { status.textContent = 'Copy the address from your browser to share this page.'; },
  }));
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
  tools.innerHTML = '<label><span class="summary-tools-label">Filter these summaries</span> <input type="search" autocomplete="off" spellcheck="false"></label><p class="summary-count" role="status"></p>';
  // A collection page (layouts/_default/summaries.html) puts the filter in its slot, with a placeholder of its own:
  // beside the list on a wide screen, above it on a phone.
  const slot = document.querySelector('.summary-tools-slot');
  if (slot?.dataset.placeholder) tools.querySelector('input').placeholder = slot.dataset.placeholder;
  if (slot) slot.append(tools); else summaryEntries[0].before(tools);
  // A collection in chapters also gets a menu of its years beside the filter. On a phone the two share one row that
  // stays at the top of the screen, so a reader can refine or jump mid-list; a wide screen has the index of years
  // instead and hides the menu.
  const chapters = [...document.querySelectorAll('.summary-chapter')];
  const pick = chapters.length ? document.createElement('select') : null;
  if (pick) {
    pick.className = 'summary-year-pick';
    pick.setAttribute('aria-label', 'Go to a year');
    pick.append(new Option('Year', ''));
    chapters.forEach((chapter) => pick.append(new Option(chapter.querySelector('.summary-chapter-head').textContent, chapter.id)));
    pick.options[0].disabled = true;
    const row = document.createElement('div');
    row.className = 'summary-tools-row';
    row.append(tools.querySelector('label'), pick);
    tools.prepend(row);
    pick.addEventListener('change', () => document.getElementById(pick.value)?.scrollIntoView());
  }
  const more = document.createElement('button');
  more.className = 'btn summary-more';
  more.type = 'button';
  more.textContent = 'Show more';
  summaryEntries[summaryEntries.length - 1].after(more);
  const input = tools.querySelector('input');
  // What a filter looks through: title, takeaways, quote and abstract, not the fixed headings or related links.
  const words = new Map(summaryEntries.map((entry) => {
    const copy = entry.cloneNode(true);
    copy.querySelectorAll('h4, .sr-only, .npr-mark, .summary-gist').forEach((part) => part.remove());
    copy.querySelector('ul:last-of-type')?.remove();
    return [entry, copy.textContent.toLowerCase()];
  }));
  // Pages of 30, unless that would hide only a few: then every entry shows. A collection page shows every entry in
  // chapters by year, with an index of years to jump by, so it needs no pages.
  let limit = summaryEntries.length > 40 && !chapters.length ? 30 : summaryEntries.length;
  // The sentence of an entry's takeaways, quote, abstract or reference that holds the query, cut to about 140
  // characters around it.
  const hiddenSentence = (entry, query) => {
    for (const part of entry.querySelectorAll(':scope > ul:first-of-type li, :scope > blockquote, :scope > p')) {
      const text = part.textContent.replace(/\s+/g, ' ').trim();
      if (text.toLowerCase().length !== text.length) continue;
      const at = text.toLowerCase().indexOf(query);
      if (at < 0) continue;
      const before = text.slice(0, at);
      const after = at + query.length;
      let start = Math.max(before.search(/[^.!?]*$/), 0);
      // The sentence ends at the first full stop after the whole match, so a match like "e.g. what" stays whole.
      let end = text.slice(after).search(/[.!?](\s|$)/);
      end = end < 0 ? text.length : after + end + 1;
      // A sentence cut short is marked with "…" where it was cut, always at a space before the match and after it.
      const space = at - start > 60 ? text.indexOf(' ', at - 60) : -1;
      const cutStart = space >= 0 && space < at;
      if (cutStart) start = space + 1;
      if (end - after > 90) end = Math.max(text.lastIndexOf(' ', after + 90), after);
      const said = text.slice(start, end).trim();
      return `${cutStart ? '…' : ''}${said}${end < text.length && !/[.!?]$/.test(said) ? '…' : ''}`;
    }
    return '';
  };
  const show = () => {
    const query = input.value.trim().toLowerCase();
    const matches = summaryEntries.filter((entry) => !query || words.get(entry).includes(query));
    const shown = query ? matches : matches.slice(0, limit);
    // An entry someone has opened, perhaps from a link to it, stays in view.
    summaryEntries.forEach((entry) => { entry.hidden = !shown.includes(entry) && !entry.open; });
    // A row that matches only in its hidden text shows the sentence the words are in; the typed words are marked
    // where they show in the closed row: its title, citation, preview and that sentence.
    summaryEntries.forEach((entry) => {
      const head = entry.querySelector('summary');
      const seen = [...head.querySelectorAll('h3, .summary-gist')].some((part) => part.textContent.toLowerCase().includes(query));
      let hit = head.querySelector('.summary-hit');
      if (query && !seen && shown.includes(entry)) {
        if (!hit) { hit = document.createElement('span'); hit.className = 'summary-hit'; head.append(hit); }
        const said = hiddenSentence(entry, query);
        if (said) {
          hit.replaceChildren(Object.assign(document.createElement('span'), { className: 'summary-hit-label', textContent: 'In the summary: ' }), Object.assign(document.createElement('span'), { className: 'summary-hit-text', textContent: said }));
        } else hit.textContent = `“${input.value.trim()}” is in the full summary`;
      } else hit?.remove();
    });
    if (window.CSS?.highlights && window.Highlight) {
      const ranges = [];
      if (query) shown.forEach((entry) => entry.querySelectorAll('summary h3, .summary-gist, .summary-hit-text').forEach((part) => {
        const walker = document.createTreeWalker(part, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = node.data.toLowerCase();
          // Lower case can change a text's length (İ becomes two characters), and then the places found would not fit it.
          if (text.length !== node.data.length) continue;
          for (let at = text.indexOf(query); at >= 0; at = text.indexOf(query, at + query.length)) {
            const range = new Range();
            range.setStart(node, at);
            range.setEnd(node, at + query.length);
            ranges.push(range);
          }
        }
      }));
      CSS.highlights.set('summary-match', new Highlight(...ranges));
    }
    // A chapter with nothing left in it goes, and the bars in the index of years show how the matches spread over
    // the years.
    const lefts = chapters.map((chapter) => chapter.querySelectorAll('.summary-entry:not([hidden])').length);
    chapters.forEach((chapter, i) => {
      const left = lefts[i];
      chapter.hidden = !left;
      const link = document.querySelector(`.summary-years a[data-chapter="${chapter.id}"]`);
      if (!link) return;
      link.classList.toggle('is-empty', !left);
      // A year with no matches is not a link while its chapter is hidden.
      if (left) link.href = `#${chapter.id}`; else link.removeAttribute('href');
      link.querySelector('.summary-years-bar').style.setProperty('--n', left);
      link.querySelector('.summary-years-n').textContent = left;
    });
    if (pick) chapters.forEach((chapter, i) => {
      const option = pick.options[i + 1];
      option.disabled = !lefts[i];
      option.textContent = `${chapter.querySelector('.summary-chapter-head').textContent} (${lefts[i]})`;
    });
    more.hidden = shown.length === matches.length;
    const kept = summaryEntries.filter((entry) => !entry.hidden).length - shown.length;
    // A collection page's header gives the total, so with no filter and every entry shown the status stays empty.
    const all = !query && shown.length === summaryEntries.length;
    const count = query ? `${matches.length} of ${summaryEntries.length} summaries match.` : all && slot ? '' : `Showing ${shown.length} of ${summaryEntries.length} summaries.`;
    tools.querySelector('[role=status]').textContent = kept ? `${count} ${kept} you opened ${kept === 1 ? 'stays' : 'stay'} in view.`.trim() : count;
  };
  input.addEventListener('input', show);
  addEventListener('hashchange', show);
  // A line of topics to try, each with its number of matches, leads the list of a collection page: each fills in the
  // filter and goes to the first match.
  const topics = slot?.dataset.try?.split(',').map((topic) => topic.trim()).filter(Boolean);
  if (topics?.length) {
    const line = document.createElement('p');
    line.className = 'summary-try';
    line.append(document.querySelector('.summary-questions') ? 'Or try a topic: ' : 'Try a topic: ');
    topics.forEach((topic) => {
      const count = summaryEntries.filter((entry) => words.get(entry).includes(topic.toLowerCase())).length;
      if (!count) return;
      const button = Object.assign(document.createElement('button'), { type: 'button', textContent: topic });
      button.append(Object.assign(document.createElement('span'), { className: 'summary-try-n', textContent: ` ${count}` }));
      button.addEventListener('click', () => {
        input.value = topic;
        show();
        document.querySelector('.summary-chapter:not([hidden])')?.scrollIntoView();
      });
      line.append(button);
    });
    document.querySelector('.summaries-layout .reading .article-style')?.before(line);
  }
  // The year whose summaries are on screen is marked in the index of years, which on a phone scrolls to keep it in view.
  const yearLinks = [...document.querySelectorAll('.summary-years a')];
  if ('IntersectionObserver' in window && yearLinks.length) {
    const seen = new Map(chapters.map((chapter) => [chapter.id, false]));
    const strip = document.querySelector('.summary-years ol');
    const mark = () => {
      // At the top of the page nothing is marked yet: the list has not started.
      const current = scrollY > 0 && [...seen.entries()].find(([, on]) => on)?.[0];
      if (pick) pick.value = current || '';
      if (!current) { yearLinks.forEach((a) => a.classList.remove('is-current')); strip.scrollLeft = 0; return; }
      yearLinks.forEach((a) => {
        const on = a.dataset.chapter === current;
        if (on && !a.classList.contains('is-current') && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: a.parentElement.offsetLeft - strip.offsetLeft - 16 });
        a.classList.toggle('is-current', on);
      });
    };
    const watch = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      mark();
    }, { rootMargin: '-30% 0px -65% 0px' });
    chapters.forEach((chapter) => watch.observe(chapter));
    addEventListener('scroll', () => { if (!scrollY) mark(); }, { passive: true });
    // Once the row of years has scrolled sideways, its start fades too, to show there is more before it.
    strip.addEventListener('scroll', () => strip.classList.toggle('is-scrolled', strip.scrollLeft > 4), { passive: true });
  }
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
// Arabic terms are written with their vowel marks, which visitors seldom type: both sides drop them (fathatan to sukun,
// and the dagger alef) and the tatweel, and an alef with a hamza, madda or wasla counts as a plain alef. The hamza on
// ئ and ؤ stays, so they remain apart from ي and و. A final ة counts as ه and ى as ي, as people often type them.
// NFC first, so a decomposed alef and hamza (pasted text) folds too.
const foldTerm = (text) => text.normalize('NFC').replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
  .replace(/[\u064B-\u0652\u0670\u0640]/g, '').toLowerCase();
const termGrid = document.querySelector('.term-grid');
if (termFilter && termGrid) {
  // The search and letters stay at the top; a letter's heading must land below them, whatever their height.
  const tools = document.querySelector('.glossary-tools');
  // A page opened at a letter (#letter-…) scrolled before the toolbar was measured, so it scrolls there once more.
  let aligned = false;
  // On a phone the toolbar box gives way (display: contents) and only the search row is pinned, so that row is measured.
  const find = document.querySelector('.glossary-find');
  const pinned = () => (getComputedStyle(tools).display === 'contents' ? find : tools);
  if (tools && find) {
    const measure = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--glossary-tools', `${pinned().offsetHeight}px`);
      if (!aligned && location.hash.startsWith('#letter-')) document.getElementById(location.hash.slice(1))?.scrollIntoView();
      aligned = true;
    });
    measure.observe(tools);
    measure.observe(find);
  }
  // The glossary hub: match on the term's name, hide letters left empty, and say when nothing matches.
  const terms = [...termGrid.querySelectorAll('li[data-term]')];
  const groups = [...termGrid.querySelectorAll('.term-group')];
  const none = document.querySelector('.glossary-none');
  termFilter.addEventListener('input', () => {
    const query = foldTerm(termFilter.value.trim());
    // Names first; when no name matches, the definitions (a related term may be named only inside them).
    const byName = terms.some((term) => foldTerm(term.dataset.term).includes(query));
    terms.forEach((term) => {
      term.hidden = !foldTerm(byName ? term.dataset.term : term.textContent).includes(query);
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
    // "12 of 260 terms", in the glossary's language (data-format, from layouts/glossary/list.html).
    const count = document.querySelector('.glossary-count');
    const format = count.dataset.format || '%s of %s terms';
    count.textContent = query && shown ? format.replace('%s', shown).replace('%s', terms.length) : '';
  });
  // Cards or a compact list; the choice is kept for the next visit.
  // The reference list (layouts/partials/doors/glossary_references.html) has neither the views nor the about box.
  const view = document.querySelector('.glossary-view');
  const setView = (list) => {
    if (!view) return;
    termGrid.classList.toggle('is-list', list);
    view.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.view === 'list') === list)));
    try { localStorage.setItem('glossary-view', list ? 'list' : 'cards'); } catch (e) { /* storage blocked: the choice lasts this visit */ }
  };
  if (view) view.hidden = false;
  view?.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view === 'list')));
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
      const first = top || (scrollY < 200 ? [...seen.keys()][0] : null);
      if (first) letterLinks.forEach((a) => a.classList.toggle('is-current', a.hash === `#${first}`));
    };
    const watch = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      mark();
    }, { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('.term-group').forEach((g) => { seen.set(g.id, false); watch.observe(g); });
    mark();
  }
  document.querySelector('.glossary-clear').addEventListener('click', () => {
    termFilter.value = '';
    termFilter.dispatchEvent(new Event('input'));
    termFilter.focus();
  });
  // /glossary/english/?q=… opens with that search, so a related term without its own page can link here.
  const asked = new URLSearchParams(location.search).get('q');
  if (asked) { termFilter.value = asked; termFilter.dispatchEvent(new Event('input')); }
  // "How to cite" links to the closed disclosure under the heading; following the link opens it.
  const about = document.getElementById('about-the-glossary');
  const openAbout = () => { if (about && location.hash === '#about-the-glossary') about.open = true; };
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
    const query = foldTerm(termFilter.value);
    // data-term holds the term's name and its other names.
    terms.forEach((term) => { term.hidden = !foldTerm(term.dataset.term || term.textContent).includes(query); });
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
  const centre = () => { if (current) list.scrollTop = current.offsetTop - list.offsetTop - list.clientHeight / 3; };
  centre();
  // A closed disclosure has no layout, so the phone list is centred on the current term when it opens.
  document.querySelector('.term-finder')?.addEventListener('toggle', (event) => { if (event.target.open) centre(); });
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

// An entry of a searchable list whose details give "Status: …" (the effects on /reversals/) is laid out from its one
// run of text: the outcome as a chip, the name on a line of its own and the description under it (article.css). Every
// entry with details gets a chip, so the outcome counts add up to the number of entries.
document.querySelectorAll('.list-filter ~ ul > li').forEach((item) => {
  const details = item.querySelector(':scope > .spoiler');
  if (!details) return;
  // Markdown leaves an entry's text bare in a tight list; it gets the paragraph the other entries have.
  if (!item.firstElementChild.matches('p')) {
    const p = document.createElement('p');
    while (item.firstChild !== details) p.append(item.firstChild);
    item.prepend(p);
  }
  const text = item.firstElementChild;
  text.classList.add('entry-text');
  const line = [...item.querySelectorAll('.spoiler li')].find((li) => /^\s*status:/i.test(li.textContent));
  const status = line ? line.textContent.replace(/^\s*status:\s*/i, '').trim().toLowerCase() : '';
  // One word set for the chips; any qualifier stays in the statistics and in the chip's title.
  // An entry with no status says so, so that it can still be found by outcome.
  const label = ['not replicated', 'reversed', 'mixed', 'replicated'].find((word) => status.startsWith(word) || status.includes(word)) || 'no status';
  const key = label.replace(/[^a-z]+/g, '-');
  const chip = document.createElement('span');
  chip.className = `status-chip status-${key}`;
  chip.textContent = label;
  if (status !== label) chip.title = status;
  // The name, with any other names it goes by in brackets, leaves the sentence; the punctuation that joined them goes.
  const name = document.createElement('p');
  name.className = 'entry-name';
  const strong = text.querySelector(':scope > strong');
  if (strong && !strong.previousSibling?.textContent.replace(/[\s\u200b]/g, '')) {
    name.append(strong);
    while (text.firstChild && text.firstChild.nodeType === 3 && !text.firstChild.data.replace(/[\s\u200b]/g, '')) text.firstChild.remove();
    const rest = text.firstChild;
    if (rest?.nodeType === 3) {
      const other = rest.data.match(/^\s*(\([^()]*\))\s*/);
      if (other) {
        const also = document.createElement('span');
        also.className = 'entry-also';
        also.textContent = other[1];
        name.append(' ', also);
        rest.data = rest.data.slice(other[0].length);
      }
      rest.data = rest.data.replace(/^[\s.,:;–—-]+/, '');
    }
  }
  item.prepend(chip, name);
  item.classList.add(`outcome-${key}`);
  // The statistics read as labelled rows; a plain status is already the chip.
  details.querySelectorAll('.spoiler-body > ul > li').forEach((row) => {
    const first = row.firstChild;
    const found = first?.nodeType === 3 && first.data.match(/^\s*([^:]{2,40}):\s*/);
    if (!found) return;
    if (row === line && status === label) { row.remove(); return; }
    const title = document.createElement('strong');
    title.className = 'stat-label';
    title.textContent = found[1].trim();
    first.data = first.data.slice(found[0].length);
    row.prepend(title, ' ');
  });
});

// A search over the list items after it (shortcodes/list_filter.html): items match on their text, and a
// heading whose lists are all hidden hides too, so the page reads as the matches.
const listFilter = document.querySelector('.list-filter');
if (listFilter) {
  listFilter.hidden = false;
  const input = listFilter.querySelector('input');
  const count = listFilter.querySelector('.list-filter-count');
  // The label, the field and the count form the search row, the part of the toolbar that stays on screen on a phone.
  const searchRow = document.createElement('div');
  searchRow.className = 'list-filter-search';
  searchRow.append(listFilter.querySelector('label'), count, input);
  listFilter.prepend(searchRow);
  const noun = listFilter.dataset.noun || 'entries';
  const sections = [];
  let section = null;
  const first = listFilter.dataset.list ? document.querySelector(listFilter.dataset.list) : listFilter.nextElementSibling;
  for (let node = first; node; node = node.nextElementSibling) {
    if (/^H[1-3]$/.test(node.tagName)) { section = {heading: node, items: []}; sections.push(section); }
    else if (/^(UL|OL)$/.test(node.tagName)) {
      // A list straight after the search, with no heading of its own, is a section too (Educators' Corner, the games portal).
      if (!section) { section = {heading: null, items: []}; sections.push(section); }
      section.items.push(...node.children);
    }
  }
  // Where the entries carry details (the reversals' statistics), other lists after them, such as further
  // literature or contributors, are not entries: they stay out of the menu, the count and the filter.
  if (sections.some(({items}) => items.some((item) => item.querySelector('.spoiler')))) {
    sections.forEach((s) => { s.items = s.items.filter((item) => item.querySelector('.spoiler')); });
  }
  // A menu of the sections that hold entries, with their counts, to jump straight to one.
  const withItems = sections.filter(({heading, items}) => heading && items.length && items.length < 400);
  if (withItems.length > 3) {
    const jump = document.createElement('label');
    jump.className = 'list-filter-jump';
    jump.textContent = 'Go to ';
    const select = document.createElement('select');
    select.append(new Option('a section…', ''));
    withItems.forEach(({heading, items}) => select.append(new Option(`${heading.textContent.trim()} (${items.length})`, heading.id)));
    select.addEventListener('change', () => { if (select.value) document.getElementById(select.value).scrollIntoView(); });
    jump.append(select);
    listFilter.append(jump);
  }
  // When the entries carry status chips, the outcomes open the list as a board: one tile per outcome with its count and
  // one small brick per effect, so the tiles compare at a glance. A tile shows that outcome alone; pressed again, or
  // with the toolbar's button, it shows them all.
  let status = '';
  let statusWord = '';
  const outcomes = ['replicated', 'mixed', 'not replicated', 'reversed', 'no status']
    .map((word) => ({word, key: word.replace(' ', '-'), many: document.querySelectorAll(`.list-filter ~ ul .status-${word.replace(' ', '-')}`).length}))
    .filter(({many}) => many);
  // One brick per effect in its outcome's colour, in the board's order: the board's picture, at a discipline's scale.
  const outcomeBricks = (items) => {
    const bricks = document.createElement('div');
    bricks.className = 'outcome-bricks section-mix';
    bricks.setAttribute('aria-hidden', 'true');
    outcomes.forEach(({key}) => items.filter((item) => item.querySelector(`.status-${key}`)).forEach(() => {
      bricks.append(Object.assign(document.createElement('i'), {className: `status-${key}`}));
    }));
    return bricks;
  };
  const tocCounts = new Map();
  if (outcomes.length) {
    const board = document.createElement('section');
    board.className = 'outcome-board';
    board.setAttribute('aria-labelledby', 'outcome-board-title');
    const title = document.createElement('h2');
    title.id = 'outcome-board-title';
    title.textContent = `What replications found for ${outcomes.reduce((sum, {many}) => sum + many, 0)} effects`;
    const hint = document.createElement('p');
    hint.className = 'outcome-hint';
    hint.textContent = 'Choose an outcome to list only those effects.';
    const row = document.createElement('div');
    row.className = 'outcome-tiles';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', 'Show by outcome');
    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'outcome-clear';
    clear.textContent = 'Show all outcomes';
    clear.hidden = true;
    const choose = (key, word) => {
      status = key;
      statusWord = word;
      row.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.status === key)));
      board.classList.toggle('is-chosen', Boolean(key));
      // Choosing an outcome ends the bricks' first-view preview at once, so the dimming of the others shows (article.css).
      board.classList.remove('is-previewing');
      if (key) listFilter.parentElement.dataset.outcome = key; else delete listFilter.parentElement.dataset.outcome;
      // The chosen outcome's bricks rise in each discipline's strip, left to right (article.css).
      document.querySelectorAll('.section-mix i').forEach((brick) => brick.classList.toggle('is-match', Boolean(key) && brick.classList.contains(`status-${key}`)));
      clear.hidden = !key;
      input.dispatchEvent(new Event('input'));
    };
    clear.addEventListener('click', () => choose('', ''));
    outcomes.forEach(({word, key, many}) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `outcome-tile status-${key}`;
      button.dataset.status = key;
      button.setAttribute('aria-pressed', 'false');
      const bricks = Array.from({length: many}, (_, n) => `<i style="--n:${n}"></i>`).join('');
      button.innerHTML = `<span class="outcome-many">${many}</span> <span class="outcome-word">${word}</span><span class="outcome-bricks" aria-hidden="true">${bricks}</span>`;
      button.addEventListener('click', () => (status === key ? choose('', '') : choose(key, word)));
      row.append(button);
    });
    board.append(title, hint, row);
    listFilter.before(board);
    // Once the reversed tile's bricks are wholly in view, and a moment later, every tile lays its bricks at the same
    // pace, so the rare outcomes finish at once and the common ones keep going for about 1.4 s (article.css). Where the
    // tiles stack (phones), a tile seen above it waits no more than 0.9 s, so no brick space stays empty on screen.
    // It runs once.
    const brickRows = [...row.querySelectorAll('.outcome-bricks')];
    if ('IntersectionObserver' in window && brickRows.length) {
      const reversedRow = row.querySelector('.status-reversed .outcome-bricks') || brickRows[brickRows.length - 1];
      board.classList.add('is-previewing');
      let timer;
      const start = (wait) => {
        if (timer && wait >= 900) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          seen.disconnect();
          board.classList.add('is-seen');
          // The longest tile's last brick starts 10 ms per brick in and takes 0.14 s (article.css).
          const longest = Math.max(...brickRows.map((bricks) => bricks.children.length));
          setTimeout(() => board.classList.remove('is-previewing', 'is-seen'), 140 + longest * 10 + 100);
        }, wait);
      };
      const seen = new IntersectionObserver((entries) => {
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => start(entry.target === reversedRow ? 350 : 900));
      }, {threshold: 0.95});
      brickRows.forEach((bricks) => seen.observe(bricks));
    }
    searchRow.append(clear);
    // Each discipline opens with its bricks, and the contents card gives its count, which follows the filters.
    withItems.forEach(({heading, items}) => {
      heading.after(outcomeBricks(items));
      const link = document.querySelector(`.article-card a[href="#${heading.id}"]`);
      if (!link) return;
      const many = document.createElement('span');
      many.className = 'toc-many';
      many.textContent = items.length;
      link.append(' ', many);
      tocCounts.set(heading, many);
    });
  }
  // Filter buttons (the games portal): each group (fieldset[data-facet]) narrows the list to entries whose
  // data-facets name one of its pressed values; pressing values in several groups narrows by each of them.
  const facetBox = document.querySelector('.list-filter-facets');
  const groups = facetBox ? [...facetBox.querySelectorAll('fieldset[data-facet]')] : [];
  const reset = document.querySelector('.list-filter-reset');
  const empty = document.querySelector('.list-filter-empty');
  if (facetBox) {
    facetBox.hidden = false;
    facetBox.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-value]');
      if (!button) return;
      button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
      input.dispatchEvent(new Event('input'));
    });
  }
  reset?.addEventListener('click', () => {
    facetBox?.querySelectorAll('[aria-pressed=true]').forEach((button) => button.setAttribute('aria-pressed', 'false'));
    input.value = '';
    input.dispatchEvent(new Event('input'));
    input.focus();
  });
  // Each entry's text is read once, without its buttons (such as "and 9 more"), so controls are never searched.
  // Accents are set aside on both sides, so "Roseler" finds Röseler and "Lazic" finds Lazić.
  const plain = (text) => text.normalize('NFD').replace(/\p{M}/gu, '');
  const words_of = (item) => { const copy = item.cloneNode(true); copy.querySelectorAll('button').forEach((b) => b.remove()); return copy.textContent; };
  const texts = new Map(sections.flatMap(({items}) => items.map((item) => [item, plain(words_of(item))])));
  const tokens = new Map([...texts.keys()].map((item) => [item, new Set((item.dataset.facets || '').split(' '))]));
  const total = texts.size;
  let words = /./;
  input.addEventListener('input', () => {
    const query = plain(input.value.trim().toLowerCase());
    words = new RegExp(`(^|[^\\p{L}\\p{N}])${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'iu');
    const chosen = groups.map((group) => [...group.querySelectorAll('[aria-pressed=true]')].map((button) => button.dataset.value))
      .filter((values) => values.length);
    let shown = 0;
    sections.forEach(({heading, items}) => {
      if (!items.length) return;
      let any = false;
      items.forEach((item) => {
        // Matches the start of a word, so "ego" finds ego depletion and not "category".
        const match = (!query || words.test(texts.get(item))) && (!status || item.querySelector(`.status-${status}`))
          && chosen.every((values) => values.some((value) => tokens.get(item).has(value)));
        item.hidden = !match;
        if (match) { any = true; shown += 1; }
      });
      if (heading) heading.hidden = Boolean(query || status || chosen.length) && !any;
      const inCard = tocCounts.get(heading);
      if (inCard) {
        inCard.textContent = items.filter((item) => !item.hidden).length;
        inCard.parentElement.classList.toggle('is-empty', !any);
      }
    });
    count.textContent = query && !shown ? `No ${noun} match “${input.value.trim()}”.` : !query && 'quiet' in listFilter.dataset ? '' : tocCounts.size ? (query || statusWord ? `${shown} of ${total} ${noun}${statusWord ? `: ${statusWord}` : ''}` : '') : `Showing ${shown} of ${total} ${noun}`;
    if (empty) empty.hidden = shown > 0;
    if (reset) reset.hidden = !query && !chosen.length;
  });
  input.dispatchEvent(new Event('input'));
}

// /reversals/: the search and Go to controls are a toolbar that stays at the top of the screen while the effects
// scroll under it (on a phone only the search row stays), and each effect shows the start of its description, with a
// "more" button for the rest.
const entryFilter = document.querySelector('.list-filter:not([hidden])');
const entries = entryFilter ? [...document.querySelectorAll('.list-filter ~ ul > li')]
  .filter((item) => item.querySelector(':scope > .entry-text') && item.querySelector(':scope > .spoiler')) : [];
if (entries.length) {
  // The toolbar sticks only within the list: one box from the toolbar to the last entry's list.
  const section = document.createElement('div');
  section.className = 'list-filter-section';
  const last = entries[entries.length - 1].parentElement;
  // The sentence about the full list belongs with the board, above the toolbar.
  const note = entryFilter.nextElementSibling;
  if (note?.matches('p')) { note.classList.add('outcome-note'); entryFilter.before(note); }
  entryFilter.before(section);
  for (let node = entryFilter; node;) {
    const next = node.nextSibling;
    section.append(node);
    node = node === last ? null : next;
  }
  // Rows scrolled to or reached with Tab stop below the toolbar: its height is the page's scroll padding.
  const phone = matchMedia('(max-width: 760px)');
  const searchRow = entryFilter.querySelector('.list-filter-search');
  const pad = () => document.documentElement.style.setProperty('--list-filter-bar', `${(phone.matches ? searchRow : entryFilter).offsetHeight}px`);
  const bars = new ResizeObserver(pad);
  bars.observe(entryFilter);
  bars.observe(searchRow);
  // A long description is cut to its first lines and gets the button.
  entries.forEach((item) => {
    const text = item.querySelector(':scope > .entry-text');
    const more = document.createElement('button');
    more.type = 'button';
    more.className = 'entry-more';
    more.setAttribute('aria-expanded', 'false');
    // The label names the effect for screen readers; it is an attribute, not hidden text, so it adds nothing to the line.
    const about = ` about ${item.querySelector('.entry-name strong')?.textContent.trim() || 'this effect'}`;
    const label = (word) => { more.textContent = word; more.setAttribute('aria-label', word + about); };
    label('more');
    more.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      more.setAttribute('aria-expanded', String(open));
      label(open ? 'less' : 'more');
    });
    text.append(more);
  });
  // While a search is typed, the matching entries show in full, so the match can be seen wherever it is.
  const query = entryFilter.querySelector('input');
  // When nothing matches, the list says so under the toolbar and offers the way back.
  const none = document.createElement('p');
  none.className = 'list-filter-none';
  none.hidden = true;
  const noneText = document.createElement('span');
  const clearSearch = document.createElement('button');
  clearSearch.type = 'button';
  clearSearch.textContent = 'Clear search';
  clearSearch.addEventListener('click', () => { query.value = ''; query.dispatchEvent(new Event('input')); query.focus(); });
  none.append(noneText, ' ', clearSearch);
  entryFilter.after(none);
  const showNone = () => {
    const empty = !entries.some((item) => !item.hidden);
    none.hidden = !empty;
    section.classList.toggle('is-empty', empty);
    noneText.textContent = `No effects match “${query.value.trim()}”.`;
    if (empty) entryFilter.querySelector('.list-filter-count').textContent = '';
    // Typed further down the page, a search would leave its results above the screen: the list comes back to its start.
    const above = section.getBoundingClientRect().top;
    if (query.value.trim() && above < 0) scrollBy(0, above);
  };
  query.addEventListener('input', showNone);
  // DESIGN.md §4: a description shows in full unless it runs past six lines; then it shows four and the button.
  // The heights are read with the cut lifted (.is-measuring), all at once, then the entries are marked.
  const measure = () => {
    if (section.classList.contains('is-searching')) return;
    section.classList.add('is-measuring');
    const long = entries.map((item) => {
      if (item.hidden) return null;
      const text = item.querySelector(':scope > .entry-text');
      return text.scrollHeight > 6 * parseFloat(getComputedStyle(text).lineHeight) + 2;
    });
    section.classList.remove('is-measuring');
    entries.forEach((item, i) => { if (long[i] !== null) item.classList.toggle('is-long', long[i]); });
  };
  query.addEventListener('input', () => {
    section.classList.toggle('is-searching', Boolean(query.value.trim()));
    measure();
  });
  let width = 0;
  new ResizeObserver(([entry]) => {
    if (Math.round(entry.contentRect.width) === width) return;
    width = Math.round(entry.contentRect.width);
    measure();
  }).observe(section);
  document.fonts?.ready.then(measure);
  // The contents card marks the section being read and keeps it in view inside the card.
  const card = document.querySelector('.article-card');
  const marks = [...document.querySelectorAll('.article-style h2[id]')]
    .map((heading) => [heading, card?.querySelector(`a[href="#${heading.id}"]`)]).filter(([, link]) => link);
  let marking = false;
  const mark = () => {
    marking = false;
    const line = innerHeight * .3;
    const current = marks.filter(([heading]) => !heading.hidden && heading.getBoundingClientRect().top < line).pop()?.[1];
    marks.forEach(([, link]) => { if (link !== current) link.removeAttribute('aria-current'); });
    if (!current || current.hasAttribute('aria-current')) return;
    current.setAttribute('aria-current', 'true');
    if (card.scrollHeight > card.clientHeight) card.scrollTop = current.offsetTop - card.clientHeight / 2;
  };
  const markSoon = () => { if (!marking) { marking = true; requestAnimationFrame(mark); } };
  addEventListener('scroll', markSoon, {passive: true});
  query.addEventListener('input', markSoon);
  // Anything that moves the headings without scrolling: a new window size, late fonts, an opened entry.
  addEventListener('resize', markSoon);
  new ResizeObserver(markSoon).observe(section);
  mark();
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
    const label = badge.previousElementSibling?.classList.contains('pub-metric-label') ? badge.previousElementSibling.textContent.trim().toLowerCase() : '';
    badge.querySelector('a:not([aria-label])')?.setAttribute('aria-label', label ? `Altmetric attention for the ${label} version` : 'Altmetric attention for this publication');
  });
  // A version with no mentions shows no badge (data-hide-no-mentions); its label goes with it, and the scores'
  // place in the row where no version has any. Set both ways, so a badge that arrives later brings them back.
  const silent = (embed) => embed.classList.contains('altmetric-hidden') || embed.style.display === 'none';
  const emptyAttention = () => document.querySelectorAll('.pub-metrics').forEach((box) => {
    const metrics = [...box.querySelectorAll('.pub-metric')];
    metrics.forEach((metric) => {
      const embed = metric.querySelector('.altmetric-embed');
      metric.hidden = Boolean(embed) && silent(embed);
    });
    box.hidden = metrics.length > 0 && metrics.every((metric) => metric.hidden);
  });
  new MutationObserver(emptyAttention).observe(document.querySelector('.pub-list, .article-style') || document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
  emptyAttention();
  new MutationObserver(nameBadges).observe(document.querySelector('.pub-list, .article-style') || document.body, { childList: true, subtree: true });
}

// Replication Hub: a "Start here" brick traces the outline of its stage's circle on the diagram while pointed at or
// focused (replication_hub/list.html, hub.css); the outline stays still with reduced motion. The outline stays lit
// while the brick is pointed at or has focus, whichever ends last.
const hubLobes = document.querySelector('.hub-lobes');
if (hubLobes) {
  document.querySelectorAll('.hub-start a[data-stage]').forEach((brick) => {
    const lobe = hubLobes.querySelector(`.hub-lobe[data-stage="${brick.dataset.stage}"]`);
    if (!lobe) return;
    let pointed = false;
    const sync = () => lobe.classList.toggle('is-lit', pointed || document.activeElement === brick);
    brick.addEventListener('pointerenter', () => { pointed = true; sync(); });
    brick.addEventListener('pointerleave', () => { pointed = false; sync(); });
    brick.addEventListener('focus', sync);
    brick.addEventListener('blur', sync);
  });
}

// Phone contents (doors/toc_phone): a list of more than six sections shows its first five and a button for the rest.
// A closed contents line (.toc-phone--closed) opens to the whole list, so it is not shortened.
document.querySelectorAll('.toc-phone:not(.toc-phone--closed)').forEach((box) => {
  const items = [...box.querySelectorAll('nav > ul > li')];
  if (items.length <= 6) return;
  items.slice(5).forEach((item) => item.classList.add('toc-extra'));
  box.classList.add('is-short');
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'toc-phone-more';
  more.textContent = `Show all ${items.length} sections`;
  more.addEventListener('click', () => {
    box.classList.remove('is-short');
    more.remove();
    items[5].querySelector('a')?.focus();
  });
  box.querySelector('.article-toc').append(more);
});

// Long descriptions in the About directories (Teams, Partnerships, Get involved projects): a description that runs
// past six lines shows four, with a "more" button for the rest; on a phone, past eight lines shows six. Shorter ones
// show in full, so "more" never hides a line or two. Without JavaScript the full text shows. A description that is one paragraph is clamped itself, not its
// wrapper. Lengths are measured again once the web font has loaded and when the width changes.
const CLAMP_ABOVE = 6, CLAMP_ABOVE_PHONE = 8;
const phoneClamp = matchMedia('(max-width: 760px)');
const clamps = [...document.querySelectorAll('.clamp-desc')].map((wrap) => {
  const text = wrap.querySelector(':scope > p:only-child') || wrap;
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'clamp-more';
  more.hidden = true;
  more.setAttribute('aria-expanded', 'false');
  const about = wrap.dataset.clampName ? ` about ${wrap.dataset.clampName}` : '';
  const label = (word) => { more.textContent = word; more.setAttribute('aria-label', word + about); };
  label('more');
  more.addEventListener('click', () => {
    const open = text.classList.toggle('is-clamped') === false;
    more.setAttribute('aria-expanded', String(open));
    label(open ? 'less' : 'more');
  });
  wrap.after(more);
  return {text, more};
});
const measureClamps = () => clamps.forEach(({text, more}) => {
  if (more.getAttribute('aria-expanded') === 'true') return;
  text.classList.remove('is-clamped');
  const line = parseFloat(getComputedStyle(text).lineHeight) || 24;
  const long = text.scrollHeight > line * (phoneClamp.matches ? CLAMP_ABOVE_PHONE : CLAMP_ABOVE) + 2;
  text.classList.toggle('is-clamped', long);
  more.hidden = !long;
});
if (clamps.length) {
  measureClamps();
  document.fonts?.ready.then(measureClamps);
  let timer;
  addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(measureClamps, 150); });
}
