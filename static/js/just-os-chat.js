/**
 * JUST-OS Native Chat Client
 * Replaces iframe embedding with direct API integration.
 */
(function () {
  'use strict';

  const API_URL = 'https://bot.just-os.org/chat';
  const STORAGE_KEY = 'just-os-chat-state';
  const WELCOME_MESSAGE = "Hi \u2014 I'm the JUST-OS bot and can help you with questions around open science. What's on your mind?";

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
  /*  State persistence                                  */
  /* -------------------------------------------------- */

  function saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        chatId: state.chatId,
        messages: state.messages,
      }));
    } catch (_) { /* quota exceeded – ignore */ }
  }

  function restoreState() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (saved.chatId) {
        state.chatId = saved.chatId;
        state.messages = saved.messages || [];
        return true;
      }
    } catch (_) { /* corrupt – ignore */ }
    return false;
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

      // Copy button below bubble
      const copyBtn = document.createElement('button');
      copyBtn.className = 'just-os-copy-btn';
      copyBtn.type = 'button';
      copyBtn.title = 'Copy response';
      copyBtn.innerHTML = '\u{1F4CB}';
      copyBtn.addEventListener('click', function () {
        copyResponse(copyBtn, bubble);
      });
      wrapper.appendChild(copyBtn);

      // Extract references and render as a list below
      const refList = buildReferenceList(bubble);
      if (refList) wrapper.appendChild(refList);

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
  /*  New Chat                                           */
  /* -------------------------------------------------- */

  function newChat() {
    state.chatId = generateId();
    state.messages = [];
    state.streaming = false;
    sessionStorage.removeItem(STORAGE_KEY);
    renderAllMessages();
    const container = getContainer();
    if (container) {
      showWelcome(container);
      updateInputState(container);
      const input = getInputEl(container);
      if (input) input.focus();
    }
  }

  /* -------------------------------------------------- */
  /*  Copy response                                      */
  /* -------------------------------------------------- */

  function copyResponse(btn, bubble) {
    const text = bubble.innerText;
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
  /*  Reference list                                     */
  /* -------------------------------------------------- */

  function buildReferenceList(bubble) {
    const links = bubble.querySelectorAll('a[data-reference]');
    if (!links.length) return null;

    // Deduplicate references by URL
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

    if (!refs.length) return null;

    const details = document.createElement('details');
    details.className = 'just-os-references';
    details.open = true;

    const summary = document.createElement('summary');
    summary.textContent = 'References (' + refs.length + ')';
    details.appendChild(summary);

    const ol = document.createElement('ol');
    refs.forEach(function (ref) {
      const li = document.createElement('li');
      const parts = [];

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

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
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
  setInterval(function () {
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
