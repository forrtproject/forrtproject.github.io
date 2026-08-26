/**
 * Glossary entry feedback/suggestion form.
 * Submits to a Google Apps Script web app deployed from the same project as
 * the JUST-OS chat feedback (see .feedback-appscript/Code.js), which appends
 * each submission as a row to a "glossary_feedback" sheet in the "Forrt-feedbacks"
 * spreadsheet.
 * Override window.FORRT_FEEDBACK_URL before this script loads to point elsewhere.
 */
(function () {
  'use strict';

  var FEEDBACK_URL = (typeof window.FORRT_FEEDBACK_URL !== 'undefined')
    ? window.FORRT_FEEDBACK_URL
    : 'https://script.google.com/macros/s/AKfycbwMOWeJSQRrLiZFUN18vbB8pW-dqdPZE9FtQXjYh5J33DRazccGr7MTNmSbV6lG2QQyXQ/exec';

  function init() {
    var form = document.getElementById('glossary-feedback-form');
    if (!form) return;

    var i18n = window.GLOSSARY_FEEDBACK_I18N || {};
    var statusEl = form.querySelector('.glossary-feedback-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: left blank by humans (it's hidden off-screen), filled in by
      // most bots that blindly populate every field. Silently drop those.
      if (form.website && form.website.value) return;

      var message = form.message.value.trim();
      if (!message) {
        form.message.focus();
        return;
      }

      submitBtn.disabled = true;
      statusEl.classList.remove('text-danger');
      statusEl.textContent = i18n.sending || 'Sending…';

      // Sent as text/plain so the request stays a CORS "simple request" (no
      // preflight, which the Apps Script endpoint can't answer).
      fetch(FEEDBACK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: 'glossary_feedback',
          term: form.dataset.term || '',
          url: form.dataset.url || '',
          language: form.dataset.language || '',
          feedback_type: form.feedback_type.value,
          message: message,
          email: form.email.value.trim(),
          ts: Date.now(),
        }),
        keepalive: true,
      }).then(function () {
        statusEl.textContent = i18n.thanks || 'Thank you — your feedback has been recorded.';
        form.reset();
        submitBtn.disabled = false;
      }).catch(function () {
        statusEl.classList.add('text-danger');
        statusEl.textContent = i18n.error || 'Something went wrong. Please try again later.';
        submitBtn.disabled = false;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
