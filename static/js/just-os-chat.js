/**
 * JUST-OS Native Chat Client
 * Replaces iframe embedding with direct API integration.
 */
(function () {
  'use strict';

  const API_URL = 'https://bot.just-os.org/chat';
  // Feedback is handled by feedback_server.py (runs on port 5001 alongside Hugo).
  // Override window.FORRT_FEEDBACK_URL before this script loads to point elsewhere.
  const FEEDBACK_URL = (typeof window.FORRT_FEEDBACK_URL !== 'undefined')
    ? window.FORRT_FEEDBACK_URL
    : 'http://localhost:5001/feedback';
  const HISTORY_KEY = 'just-os-chat-history'; // localStorage: array of saved conversations
  const ACTIVE_KEY = 'just-os-chat-active';   // localStorage: id of the conversation last viewed
  const MAX_CHATS = 50;                        // cap stored conversations to avoid unbounded growth
  const WELCOME_MESSAGE = "Hi — I'm the JUST-OS bot and can help you with questions around open science. What's on your mind?";

  const state = {
    chatId: null,
    messages: [], // { role: 'user'|'bot', content: string, turnId?: string }
    streaming: false,
  };

  // Accumulates implicit signals per turn before the explicit rating fires.
  const _pendingSignals = {};

  function _addSignal(turnId, signal) {
    if (!_pendingSignals[turnId]) _pendingSignals[turnId] = {};
    Object.assign(_pendingSignals[turnId], signal);
  }

  function _popSignals(turnId) {
    var s = _pendingSignals[turnId] || {};
    delete _pendingSignals[turnId];
    return s;
  }

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

  function createMessageEl(msg, msgIndex) {
    const wrapper = document.createElement('div');
    wrapper.className = 'just-os-msg ' + msg.role;

    const bubble = document.createElement('div');
    bubble.className = 'just-os-bubble-content';

    if (msg.role === 'user') {
      bubble.textContent = msg.content;
    } else {
      bubble.innerHTML = msg.content;
      wrapper.appendChild(bubble);

      // Capture the answer text before references are merged into the box.
      const answerText = bubble.innerText.trim();

      // Merge references into the answer box as a collapsible list.
      const refs = extractReferences(bubble);
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

      // Feedback bar + implicit signal trackers — only for messages with a turnId.
      if (msg.turnId) {
        trackCopy(bubble, msg.turnId);
        trackDwell(msg.turnId);
        trackFollowup(msg.turnId);
        wrapper.appendChild(buildFeedbackBar(wrapper, msg.turnId, msg.query || '', answerText));
      }

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
    state.messages.forEach(function (msg, idx) {
      messagesEl.appendChild(createMessageEl(msg, idx));
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

    // Stable turn ID for this request — passed to the backend and the feedback widget.
    const turnId = generateId().slice(0, 8);

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
        body: JSON.stringify({ message: text.trim(), chat_id: state.chatId, turn_id: turnId }),
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

      const botMsg = { role: 'bot', content: botContent, turnId: turnId, query: text.trim() };
      state.messages.push(botMsg);
      messagesEl.appendChild(createMessageEl(botMsg, state.messages.length - 1));
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

  // Pull the (deduplicated) references embedded in a bot message.
  function extractReferences(bubble) {
    const links = bubble.querySelectorAll('a[data-reference]');
    const seen = new Set();
    const refs = [];
    links.forEach(function (link) {
      try {
        const ref = JSON.parse(link.getAttribute('data-reference'));
        if (!ref || !ref.url || seen.has(ref.url)) return;
        seen.add(ref.url);
        refs.push(ref);
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
  /*  Feedback (explicit + implicit signals)             */
  /* -------------------------------------------------- */

  // rho_exp : +1 | -1 | 0 (0 = implicit-only)
  // signals : { copy?, followup?, fast_exit? }
  // comment : optional free-text
  // extra   : { query?, response? } — included when available
  // fetch with keepalive survives page unload and works cross-origin.
  function sendFeedback(turnId, rho_exp, signals, comment, extra) {
    extra = extra || {};
    fetch(FEEDBACK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        turn_id:  turnId,
        rho_exp:  rho_exp,
        signals:  signals || {},
        comment:  comment || '',
        query:    extra.query || '',
        response: extra.response || '',
        ts:       Date.now(),
      }),
      keepalive: true,
    }).catch(function () { /* ignore network errors */ });
  }

  // Implicit signal: user copied text from this response (+0.5 weight server-side).
  function trackCopy(msgEl, turnId) {
    msgEl.addEventListener('copy', function () {
      if (_pendingSignals[turnId] !== undefined) {
        _addSignal(turnId, { copy: true });
      } else {
        sendFeedback(turnId, 0, { copy: true });
      }
    }, { once: true });
  }

  // Implicit signal: session ended within 10 s of message render (-0.3 weight).
  function trackDwell(turnId) {
    var renderTime = Date.now();
    window.addEventListener('beforeunload', function () {
      if (Date.now() - renderTime < 10000) {
        sendFeedback(turnId, 0, { fast_exit: true });
      }
    }, { once: true });
  }

  // Implicit signal: user submitted another query within 30 s (-0.5 weight).
  function trackFollowup(turnId) {
    var renderTime = Date.now();
    var sendBtn = getSendBtn(getContainer());
    if (!sendBtn) return;
    sendBtn.addEventListener('click', function () {
      if (Date.now() - renderTime < 30000) {
        sendFeedback(turnId, 0, { followup: true });
      }
    }, { once: true });
  }

  // Comment box — slim single-line input, shown after a Bad rating.
  function showComment(msgEl, turnId, query, response) {
    if (msgEl.querySelector('.comment-box')) return;

    var box = document.createElement('div');
    box.className = 'comment-box';

    var wrap = document.createElement('div');
    wrap.className = 'comment-box-inner';

    var input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 500;
    input.placeholder = 'What was wrong? (optional)';

    var submit = document.createElement('button');
    submit.className = 'comment-submit';
    submit.textContent = 'Send';
    submit.addEventListener('click', function () {
      var text = input.value.trim();
      if (text) sendFeedback(turnId, -1, {}, text, { query: query, response: response });
      box.remove();
    });

    wrap.appendChild(input);
    wrap.appendChild(submit);
    box.appendChild(wrap);
    msgEl.appendChild(box);
    input.focus();
  }

  function buildFeedbackBar(msgEl, turnId, query, response) {
    _pendingSignals[turnId] = {};

    var bar = document.createElement('div');
    bar.className = 'rating-bar';

    var good = document.createElement('button');
    good.className = 'rating-btn';
    good.title = 'Helpful';
    good.setAttribute('aria-label', 'Mark as helpful');
    good.innerHTML = '&#128077; Good';

    var bad = document.createElement('button');
    bad.className = 'rating-btn';
    bad.title = 'Not helpful';
    bad.setAttribute('aria-label', 'Mark as not helpful');
    bad.innerHTML = '&#128078; Bad';

    function lockBar() {
      good.disabled = true;
      bad.disabled = true;
    }

    good.addEventListener('click', function () {
      lockBar();
      sendFeedback(turnId, +1, _popSignals(turnId), '', { query: query, response: response });
      bar.innerHTML = '';
      var thanks = document.createElement('span');
      thanks.className = 'rating-thanks';
      thanks.textContent = 'Thanks for your feedback!';
      bar.appendChild(thanks);
    });

    bad.addEventListener('click', function () {
      lockBar();
      sendFeedback(turnId, -1, _popSignals(turnId), '', { query: query, response: response });
      bar.innerHTML = '';
      var thanks = document.createElement('span');
      thanks.className = 'rating-thanks';
      thanks.textContent = 'Thanks for your feedback!';
      bar.appendChild(thanks);
      showComment(msgEl, turnId, query, response);
    });

    bar.appendChild(good);
    bar.appendChild(bad);

    return bar;
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
