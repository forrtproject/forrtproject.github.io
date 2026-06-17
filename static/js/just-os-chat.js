/**
 * JUST-OS Native Chat Client
 * Replaces iframe embedding with direct API integration.
 */
(function () {
  'use strict';

  const API_URL = 'https://bot.just-os.org/chat';
  const HISTORY_KEY = 'just-os-chat-history'; // localStorage: array of saved conversations
  const ACTIVE_KEY = 'just-os-chat-active';   // localStorage: id of the conversation last viewed
  const MAX_CHATS = 50;                        // cap stored conversations to avoid unbounded growth
  const WELCOME_MESSAGE = "Hi — I'm the JUST-OS bot and can help you with questions around open science. What's on your mind?";

  const state = {
    chatId: null,
    messages: [], // { role: 'user'|'bot', content: string }
    streaming: false,
  };

  /* -------------------------------------------------- */
  /*  Helpers                                            */
  /* -------------------------------------------------- */

  function generateId() {
    return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function getContainer() {
    return document.getElementById('just-os-fullpage') || document.getElementById('just-os-window');
  }

  function getMessagesEl(container) {
    return container && container.querySelector('.just-os-messages');
  }

  function getInputEl(container) {
    return container && container.querySelector('.just-os-input');
  }

  function getSendBtn(container) {
    return container && container.querySelector('.just-os-send-btn');
  }

  /* -------------------------------------------------- */
  /*  Chat history (localStorage)                        */
  /* -------------------------------------------------- */

  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  }

  function persistHistory(history) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (_) { /* quota exceeded – ignore */ }
  }

  function setActiveId(id) {
    try { localStorage.setItem(ACTIVE_KEY, id); } catch (_) { /* ignore */ }
  }

  function deriveTitle(messages) {
    const firstUser = messages.find(function (m) { return m.role === 'user'; });
    if (!firstUser) return 'New conversation';
    const t = firstUser.content.trim().replace(/\s+/g, ' ');
    return t.length > 40 ? t.slice(0, 40) + '…' : t;
  }

  // Persist the current conversation into the history list (newest first).
  function saveState() {
    const hasUser = state.messages.some(function (m) { return m.role === 'user'; });
    if (!hasUser) return; // don't store empty / welcome-only conversations

    const history = loadHistory();
    const now = Date.now();
    const idx = history.findIndex(function (c) { return c.id === state.chatId; });
    const entry = {
      id: state.chatId,
      title: deriveTitle(state.messages),
      messages: state.messages,
      createdAt: idx >= 0 ? history[idx].createdAt : now,
      updatedAt: now,
    };
    if (idx >= 0) history[idx] = entry;
    else history.push(entry);

    history.sort(function (a, b) { return b.updatedAt - a.updatedAt; });
    if (history.length > MAX_CHATS) history.length = MAX_CHATS;

    persistHistory(history);
    setActiveId(state.chatId);
  }

  function restoreState() {
    try {
      const activeId = localStorage.getItem(ACTIVE_KEY);
      if (!activeId) return false;
      const chat = loadHistory().find(function (c) { return c.id === activeId; });
      if (chat) {
        state.chatId = chat.id;
        state.messages = chat.messages || [];
        return true;
      }
    } catch (_) { /* corrupt – ignore */ }
    return false;
  }

  function relativeTime(ts) {
    if (!ts) return '';
    const diff = Date.now() - ts;
    const min = 60000, hr = 3600000, day = 86400000;
    if (diff < min) return 'just now';
    if (diff < hr) return Math.floor(diff / min) + 'm ago';
    if (diff < day) return Math.floor(diff / hr) + 'h ago';
    if (diff < 7 * day) return Math.floor(diff / day) + 'd ago';
    return new Date(ts).toLocaleDateString();
  }

  /* -------------------------------------------------- */
  /*  Rendering                                          */
  /* -------------------------------------------------- */

  function scrollToBottom(messagesEl) {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function createMessageEl(msg) {
    const wrapper = document.createElement('div');
    wrapper.className = 'just-os-msg ' + msg.role;

    const bubble = document.createElement('div');
    bubble.className = 'just-os-bubble-content';

    if (msg.role === 'user') {
      bubble.textContent = msg.content;
    } else {
      bubble.innerHTML = msg.content;
      wrapper.appendChild(bubble);

      // Renumber citations by source before capturing the answer for copying.
      const refs = extractAndRenumberReferences(bubble);
      setupCitationLinks(bubble);
      const answerText = bubble.innerText.trim();

      // Merge references into the answer box as a collapsible list.
      if (refs.length) bubble.appendChild(buildReferenceDetails(refs));

      // Copy button below the box — copies the answer together with its references.
      const copyBtn = document.createElement('button');
      copyBtn.className = 'just-os-copy-btn';
      copyBtn.type = 'button';
      copyBtn.title = 'Copy response';
      copyBtn.innerHTML = '\u{1F4CB}';
      copyBtn.addEventListener('click', function () {
        copyResponse(copyBtn, answerText, refs);
      });
      wrapper.appendChild(copyBtn);

      return wrapper;
    }

    wrapper.appendChild(bubble);
    return wrapper;
  }

  function showWelcome(container) {
    var messagesEl = getMessagesEl(container);
    if (!messagesEl) return;
    var welcomeEl = createMessageEl({ role: 'bot', content: '<p>' + WELCOME_MESSAGE + '</p>' });
    messagesEl.appendChild(welcomeEl);
  }

  function renderAllMessages() {
    const container = getContainer();
    if (!container) return;
    const messagesEl = getMessagesEl(container);
    if (!messagesEl) return;

    messagesEl.innerHTML = '';
    state.messages.forEach(function (msg) {
      messagesEl.appendChild(createMessageEl(msg));
    });
    scrollToBottom(messagesEl);
  }

  function showTyping(container, text) {
    let typing = container.querySelector('.just-os-typing');
    if (!typing) {
      typing = document.createElement('div');
      typing.className = 'just-os-typing';
      const messagesEl = getMessagesEl(container);
      if (messagesEl) messagesEl.appendChild(typing);
    }
    typing.textContent = text || 'Thinking…';
    typing.style.display = 'block';
    scrollToBottom(getMessagesEl(container));
  }

  function hideTyping(container) {
    const typing = container.querySelector('.just-os-typing');
    if (typing) typing.remove();
  }

  /* -------------------------------------------------- */
  /*  API interaction                                    */
  /* -------------------------------------------------- */

  async function sendMessage(text) {
    if (state.streaming || !text.trim()) return;

    const container = getContainer();
    if (!container) return;

    const messagesEl = getMessagesEl(container);
    if (!messagesEl) return;

    // Ensure we have a chatId
    if (!state.chatId) state.chatId = generateId();

    // Add user message
    const userMsg = { role: 'user', content: text.trim() };
    state.messages.push(userMsg);
    messagesEl.appendChild(createMessageEl(userMsg));
    scrollToBottom(messagesEl);

    // Disable input
    state.streaming = true;
    updateInputState(container);

    showTyping(container, 'Thinking…');

    let botContent = '';

    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), chat_id: state.chatId }),
      });

      if (!resp.ok) throw new Error('API returned ' + resp.status);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line in buffer

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data = JSON.parse(line);
            if (data.status === 'complete' && data.message) {
              botContent = data.message;
            } else if (data.status === 'in-progress' && data.message) {
              showTyping(container, data.message);
            }
          } catch (_) { /* non-JSON line – ignore */ }
        }
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);
          if (data.status === 'complete' && data.message) {
            botContent = data.message;
          }
        } catch (_) { /* ignore */ }
      }

      if (!botContent) throw new Error('No response received');

      hideTyping(container);

      const botMsg = { role: 'bot', content: botContent };
      state.messages.push(botMsg);
      messagesEl.appendChild(createMessageEl(botMsg));
      scrollToBottom(messagesEl);
      saveState();

    } catch (err) {
      hideTyping(container);

      const errorMsg = { role: 'bot', content: '<p class="just-os-error">Sorry, something went wrong. Please try again.</p>' };
      state.messages.push(errorMsg);
      messagesEl.appendChild(createMessageEl(errorMsg));
      scrollToBottom(messagesEl);
      saveState();
      console.error('JUST-OS chat error:', err);
    } finally {
      state.streaming = false;
      updateInputState(container);
    }
  }

  /* -------------------------------------------------- */
  /*  Input handling                                     */
  /* -------------------------------------------------- */

  function updateInputState(container) {
    const input = getInputEl(container);
    const sendBtn = getSendBtn(container);
    if (input) input.disabled = state.streaming;
    if (sendBtn) sendBtn.disabled = state.streaming;
  }

  function handleSend(container) {
    const input = getInputEl(container);
    if (!input) return;
    const text = input.value;
    if (!text.trim() || state.streaming) return;
    input.value = '';
    input.style.height = 'auto';
    sendMessage(text);
  }

  function bindInput(container) {
    const input = getInputEl(container);
    const sendBtn = getSendBtn(container);
    if (!input) return;

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(container);
      }
    });

    // Auto-resize textarea
    input.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        handleSend(container);
      });
    }
  }

  /* -------------------------------------------------- */
  /*  New Chat / open / delete                           */
  /* -------------------------------------------------- */

  function newChat() {
    // The previous conversation is already persisted (saved after each turn),
    // so starting a new chat simply leaves it in the history list.
    state.chatId = generateId();
    state.messages = [];
    state.streaming = false;
    setActiveId(state.chatId);
    renderAllMessages();
    const container = getContainer();
    if (container) {
      closeHistoryPanel(container);
      showWelcome(container);
      updateInputState(container);
      const input = getInputEl(container);
      if (input) input.focus();
    }
  }

  function openChat(id) {
    const chat = loadHistory().find(function (c) { return c.id === id; });
    if (!chat) return;
    state.chatId = chat.id;
    state.messages = chat.messages || [];
    state.streaming = false;
    setActiveId(chat.id);
    renderAllMessages();
    const container = getContainer();
    if (container) {
      closeHistoryPanel(container);
      updateInputState(container);
      const input = getInputEl(container);
      if (input) input.focus();
    }
  }

  function deleteChat(id) {
    persistHistory(loadHistory().filter(function (c) { return c.id !== id; }));
    if (id === state.chatId) {
      newChat();
    } else {
      const container = getContainer();
      if (container) renderHistoryList(container);
    }
  }

  /* -------------------------------------------------- */
  /*  History panel                                      */
  /* -------------------------------------------------- */

  function getHistoryPanel(container) {
    let panel = container.querySelector('.just-os-history-panel');
    if (panel) return panel;

    panel = document.createElement('div');
    panel.className = 'just-os-history-panel';
    panel.style.display = 'none';

    const header = document.createElement('div');
    header.className = 'just-os-history-header';
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'just-os-history-back';
    back.innerHTML = '‹ Back';
    back.addEventListener('click', function () { closeHistoryPanel(container); });
    const title = document.createElement('span');
    title.textContent = 'Chat history';
    header.appendChild(back);
    header.appendChild(title);
    panel.appendChild(header);

    const list = document.createElement('div');
    list.className = 'just-os-history-list';
    panel.appendChild(list);

    container.appendChild(panel);
    return panel;
  }

  function renderHistoryList(container) {
    const panel = getHistoryPanel(container);
    const list = panel.querySelector('.just-os-history-list');
    list.innerHTML = '';

    const history = loadHistory().sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    if (!history.length) {
      const empty = document.createElement('p');
      empty.className = 'just-os-history-empty';
      empty.textContent = 'No saved conversations yet.';
      list.appendChild(empty);
      return;
    }

    history.forEach(function (chat) {
      const item = document.createElement('div');
      item.className = 'just-os-history-item' + (chat.id === state.chatId ? ' active' : '');

      const open = document.createElement('button');
      open.type = 'button';
      open.className = 'just-os-history-open';
      const t = document.createElement('span');
      t.className = 'just-os-history-title';
      t.textContent = chat.title || 'Conversation';
      const meta = document.createElement('span');
      meta.className = 'just-os-history-meta';
      meta.textContent = relativeTime(chat.updatedAt);
      open.appendChild(t);
      open.appendChild(meta);
      open.addEventListener('click', function () { openChat(chat.id); });

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'just-os-history-delete';
      del.title = 'Delete conversation';
      del.setAttribute('aria-label', 'Delete conversation');
      del.innerHTML = '\u{1F5D1}';
      del.addEventListener('click', function (e) { e.stopPropagation(); deleteChat(chat.id); });

      item.appendChild(open);
      item.appendChild(del);
      list.appendChild(item);
    });
  }

  function openHistoryPanel(container) {
    renderHistoryList(container);
    getHistoryPanel(container).style.display = 'flex';
  }

  function closeHistoryPanel(container) {
    const panel = container.querySelector('.just-os-history-panel');
    if (panel) panel.style.display = 'none';
  }

  /* -------------------------------------------------- */
  /*  Copy response                                      */
  /* -------------------------------------------------- */

  function copyResponse(btn, answerText, refs) {
    let text = answerText;
    if (refs && refs.length) {
      text += '\n\nReferences:\n' + formatReferencesText(refs);
    }
    navigator.clipboard.writeText(text).then(function () {
      const orig = btn.innerHTML;
      btn.innerHTML = '&#x2705;';
      setTimeout(function () { btn.innerHTML = orig; }, 1500);
    }).catch(function () {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      const orig = btn.innerHTML;
      btn.innerHTML = '&#x2705;';
      setTimeout(function () { btn.innerHTML = orig; }, 1500);
    });
  }

  /* -------------------------------------------------- */
  /*  References                                         */
  /* -------------------------------------------------- */

  // Teardown for the currently open reference tooltip (removes it and its
  // document/window listeners). Only one tooltip is open at a time.
  let activeTooltipTeardown = null;

  /* -------------------------------------------------- */
  /*  Minimal markdown renderer for supporting chunks    */
  /* -------------------------------------------------- */

  // The supporting chunks are verbatim retrieved document text the backend
  // entity-encodes (a tighter trust boundary than the composed answer). We
  // honour that by escaping first and only ever emitting a whitelist of tags,
  // so no chunk text can inject markup.

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Allow only http(s)/mailto and relative/anchor links; drop the rest
  // (e.g. javascript:, data:) so a chunk link can't run script.
  function sanitizeUrl(url) {
    const trimmed = (url || '').trim();
    if (/^(https?:|mailto:)/i.test(trimmed) || /^[/#]/.test(trimmed)) return trimmed;
    return '';
  }

  // Inline spans on an already-escaped string: links, code, bold, italic.
  function renderInline(text) {
    return text
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_m, label, url) {
        const safe = sanitizeUrl(url);
        if (!safe) return label;
        return '<a href="' + escapeHtml(safe) + '" target="_blank" rel="noopener">' + label + '</a>';
      })
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>');
  }

  function renderMarkdown(src) {
    const lines = escapeHtml(src).replace(/\r\n?/g, '\n').split('\n');
    let html = '';
    let listType = null; // 'ul' | 'ol'
    let paragraph = [];

    function closeList() {
      if (listType) { html += '</' + listType + '>'; listType = null; }
    }
    function flushParagraph() {
      if (paragraph.length) {
        html += '<p>' + renderInline(paragraph.join(' ')) + '</p>';
        paragraph = [];
      }
    }

    lines.forEach(function (line) {
      const trimmed = line.trim();
      if (!trimmed) { flushParagraph(); closeList(); return; }

      const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
      if (heading) {
        flushParagraph(); closeList();
        const level = heading[1].length;
        html += '<h' + level + '>' + renderInline(heading[2]) + '</h' + level + '>';
        return;
      }

      const ulItem = /^[-*+]\s+(.*)$/.exec(trimmed);
      const olItem = /^\d+\.\s+(.*)$/.exec(trimmed);
      if (ulItem || olItem) {
        flushParagraph();
        const want = ulItem ? 'ul' : 'ol';
        if (listType !== want) { closeList(); html += '<' + want + '>'; listType = want; }
        html += '<li>' + renderInline((ulItem || olItem)[1]) + '</li>';
        return;
      }

      paragraph.push(trimmed);
    });

    flushParagraph();
    closeList();
    return html;
  }

  function setupCitationLinks(bubble) {
    bubble.querySelectorAll('a[data-reference]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Tear down any tooltip already open, including its listeners.
        if (activeTooltipTeardown) activeTooltipTeardown();

        let ref;
        try {
          ref = JSON.parse(link.getAttribute('data-reference'));
        } catch (_) {
          return;
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'just-os-reference-tooltip';

        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = ref.title || 'Unknown title';
        tooltip.appendChild(title);

        const metadata = document.createElement('div');
        metadata.className = 'metadata';
        metadata.textContent = [ref.authors, ref.year ? '(' + ref.year + ')' : '']
          .filter(Boolean)
          .join(' ');
        tooltip.appendChild(metadata);

        const content = document.createElement('div');
        content.className = 'content';
        // ref.text is entity-encoded markdown — decode it, then render the
        // markdown through our escape-first whitelist renderer.
        const decodedText = document.createElement('textarea');
        decodedText.innerHTML = ref.text || 'No supporting chunk available.';
        content.innerHTML = renderMarkdown(decodedText.value);
        tooltip.appendChild(content);

        if (ref.url && ref.url !== '#') {
          const sourceLink = document.createElement('a');
          sourceLink.className = 'source-link';
          sourceLink.href = ref.url;
          sourceLink.target = '_blank';
          sourceLink.rel = 'noopener';
          sourceLink.textContent = 'View source';
          tooltip.appendChild(sourceLink);
        }

        document.body.appendChild(tooltip);

        const linkRect = link.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const left = Math.max(
          12,
          Math.min(linkRect.left, window.innerWidth - tooltipRect.width - 12)
        );
        const spaceBelow = window.innerHeight - linkRect.bottom;
        const top = spaceBelow >= tooltipRect.height + 12
          ? linkRect.bottom + 6
          : Math.max(12, linkRect.top - tooltipRect.height - 6);

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';

        function removeTooltip() {
          tooltip.remove();
          document.removeEventListener('click', onDocClick);
          document.removeEventListener('keydown', onKeyDown);
          window.removeEventListener('scroll', removeTooltip, true);
          window.removeEventListener('resize', removeTooltip);
          if (activeTooltipTeardown === removeTooltip) activeTooltipTeardown = null;
        }

        function onDocClick(closeEvent) {
          if (!tooltip.contains(closeEvent.target) && closeEvent.target !== link) {
            removeTooltip();
          }
        }

        function onKeyDown(keyEvent) {
          if (keyEvent.key === 'Escape') removeTooltip();
        }

        activeTooltipTeardown = removeTooltip;

        setTimeout(function () {
          document.addEventListener('click', onDocClick);
          document.addEventListener('keydown', onKeyDown);
          // Close on scroll/resize — the fixed-position tooltip would otherwise
          // drift away from the citation marker it points to.
          window.addEventListener('scroll', removeTooltip, true);
          window.addEventListener('resize', removeTooltip);
        }, 0);
      });
    });
  }

  // Pull the references embedded in a bot message and renumber citations by source.
  // Note: this mutates the inline citation markers (renumbering them), so it must
  // run before the answer text is captured for copying.
  function extractAndRenumberReferences(bubble) {
    const links = bubble.querySelectorAll('a[data-reference]');
    const sourceNumbers = new Map();
    const refs = [];
    links.forEach(function (link) {
      try {
        const ref = JSON.parse(link.getAttribute('data-reference'));
        if (!ref) return;

        const sourceKey = ref.url && ref.url !== '#'
          ? ref.url
          : [ref.authors, ref.year, ref.title].join('|');

        if (!sourceNumbers.has(sourceKey)) {
          refs.push(ref);
          sourceNumbers.set(sourceKey, refs.length);
        }

        link.textContent = '[' + sourceNumbers.get(sourceKey) + ']';
      } catch (_) { /* skip bad JSON */ }
    });
    return refs;
  }

  // Plain-text reference list for the clipboard (full authors + title + URL).
  function formatReferencesText(refs) {
    return refs.map(function (ref, i) {
      const parts = [];
      if (ref.authors) parts.push(ref.authors.trim());
      if (ref.title) parts.push(ref.title.trim());
      if (ref.url) parts.push(ref.url.trim());
      // Join with ". " but avoid doubling punctuation when a part already ends in one.
      const body = parts.reduce(function (acc, p) {
        if (!acc) return p;
        return acc + (/[.!?]$/.test(acc) ? ' ' : '. ') + p;
      }, '');
      return (i + 1) + '. ' + body;
    }).join('\n');
  }

  function buildReferenceDetails(refs) {
    const details = document.createElement('details');
    details.className = 'just-os-references';
    details.open = true;

    const summary = document.createElement('summary');
    summary.textContent = 'References (' + refs.length + ')';
    details.appendChild(summary);

    const ol = document.createElement('ol');
    refs.forEach(function (ref) {
      const li = document.createElement('li');

      if (ref.authors) {
        const authSpan = document.createElement('span');
        // Truncate long author lists
        var authors = ref.authors.trim();
        if (authors.length > 80) authors = authors.substring(0, 80) + '…';
        authSpan.textContent = authors + ' ';
        li.appendChild(authSpan);
      }

      if (ref.title) {
        const a = document.createElement('a');
        a.href = ref.url || '#';
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = ref.title;
        li.appendChild(a);
      }

      ol.appendChild(li);
    });
    details.appendChild(ol);
    return details;
  }

  /* -------------------------------------------------- */
  /*  Widget toggle functions (global)                   */
  /* -------------------------------------------------- */

  window.toggleJustOS = function () {
    const win = document.getElementById('just-os-window');
    const bubble = document.getElementById('just-os-bubble');
    if (!win || !bubble) return;

    if (win.style.display === 'flex') {
      win.style.display = 'none';
      bubble.classList.add('bubble-visible');
      win.classList.remove('floating');
      // Reset any drag-resize inline styles
      win.style.width = '';
      win.style.height = '';
      updateFloatIcon(win);
    } else {
      win.style.display = 'flex';
      bubble.classList.remove('bubble-visible');
      var input = getInputEl(win);
      if (input) setTimeout(function () { input.focus(); }, 100);
    }
  };

  function updateFloatIcon(win) {
    var btn = document.getElementById('just-os-float-btn');
    if (!btn) return;
    var isFloating = win.classList.contains('floating');
    btn.textContent = isFloating ? '⤡' : '⤢';
    btn.title = isFloating ? 'Dock to side' : 'Pop out';
    btn.setAttribute('aria-label', isFloating ? 'Dock to side' : 'Pop out');
  }

  window.toggleJustOSFloat = function () {
    var win = document.getElementById('just-os-window');
    if (!win) return;
    if (win.style.display !== 'flex') window.toggleJustOS();
    win.classList.toggle('floating');
    // Reset inline sizing when switching modes
    win.style.width = '';
    win.style.height = '';
    updateFloatIcon(win);
  };

  window.newJustOSChat = newChat;

  window.toggleJustOSHistory = function () {
    const container = getContainer();
    if (!container) return;
    const panel = container.querySelector('.just-os-history-panel');
    if (panel && panel.style.display === 'flex') {
      closeHistoryPanel(container);
    } else {
      openHistoryPanel(container);
    }
  };

  window.dismissJustOS = function () {
    var widget = document.getElementById('just-os-widget');
    if (widget) widget.style.display = 'none';
    sessionStorage.setItem('just-os-dismissed', '1');
  };

  /* -------------------------------------------------- */
  /*  Custom drag-resize (bottom-left handle)            */
  /* -------------------------------------------------- */

  function initResize() {
    var handle = document.querySelector('#just-os-window .just-os-resize-handle');
    var win = document.getElementById('just-os-window');
    if (!handle || !win) return;

    var startX, startY, startW, startH;

    function applyResize(dx, dy) {
      // Bottom-left handle: drag left = widen (×2 because centered), drag down = taller
      var newW = Math.max(320, Math.min(startW - dx * 2, window.innerWidth * 0.95));
      var newH = Math.max(300, Math.min(startH + dy, window.innerHeight * 0.9));
      win.style.width = newW + 'px';
      win.style.height = newH + 'px';
    }

    handle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      startX = e.clientX; startY = e.clientY;
      startW = win.offsetWidth; startH = win.offsetHeight;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
      applyResize(e.clientX - startX, e.clientY - startY);
    }
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    handle.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      startX = t.clientX; startY = t.clientY;
      startW = win.offsetWidth; startH = win.offsetHeight;
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    }, { passive: true });

    function onTouchMove(e) {
      e.preventDefault();
      var t = e.touches[0];
      applyResize(t.clientX - startX, t.clientY - startY);
    }
    function onTouchEnd() {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    }
  }

  /* -------------------------------------------------- */
  /*  Initialization                                     */
  /* -------------------------------------------------- */

  function init() {
    // Hide widget if dismissed this session
    if (sessionStorage.getItem('just-os-dismissed')) {
      var widget = document.getElementById('just-os-widget');
      if (widget) widget.style.display = 'none';
      // The standalone page has its own container, so keep initializing there.
      if (!document.getElementById('just-os-fullpage')) return;
    }

    const container = getContainer();
    if (!container) return;

    const restored = restoreState();
    if (!state.chatId) state.chatId = generateId();

    bindInput(container);
    initResize();

    if (restored && state.messages.length > 0) {
      renderAllMessages();
    } else {
      showWelcome(container);
    }
  }

  // Save state before leaving
  window.addEventListener('beforeunload', saveState);

  // Auto-toggle helper bubble every 10 seconds (widget only)
  var bubbleInterval = setInterval(function () {
    if (sessionStorage.getItem('just-os-dismissed')) {
      clearInterval(bubbleInterval);
      return;
    }
    const bubble = document.getElementById('just-os-bubble');
    const win = document.getElementById('just-os-window');
    if (bubble && win && win.style.display !== 'flex') {
      bubble.classList.toggle('bubble-visible');
    }
  }, 10000);

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
