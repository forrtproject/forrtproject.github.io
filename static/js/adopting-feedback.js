/**
 * "Adopting Principled Education" feedback form.
 * Submits to a Google Apps Script web app (see .feedback-appscript/Code.js),
 * which appends each submission as a row to an "adopting_feedback" sheet.
 * Override window.FORRT_FEEDBACK_URL before this script loads to point elsewhere.
 */
(function () {
  'use strict';

  var FEEDBACK_URL = (typeof window.FORRT_FEEDBACK_URL !== 'undefined')
    ? window.FORRT_FEEDBACK_URL
    : 'https://script.google.com/macros/s/AKfycbz0fGz3iLkkUOuO_r4o8_f-oHzgBzFVbBALJsy92GFijddYCTZ_Zav4kin6hVDMN6O-/exec';

  /** Wires up the form. Guards on the element existing so this script can be
   *  safely re-included or reloaded without throwing if the form isn't present. */
  function init() {
    var form = document.getElementById('adopting-feedback-form');
    if (!form) return;

    var statusEl = form.querySelector('.adopting-feedback-status');
    var submitBtn = form.querySelector('button[type="submit"]');
    var thanksEl = document.getElementById('adopting-feedback-thanks');

    // Reveal the "please specify" field only while the "Other" checkbox is ticked.
    var otherCheckbox = form.querySelector('input[name="demographics"][value="other"]');
    var otherField = document.getElementById('adopting-feedback-demographics-other-field');
    if (otherCheckbox && otherField) {
      var toggleOther = function () {
        otherField.style.display = otherCheckbox.checked ? '' : 'none';
      };
      otherCheckbox.addEventListener('change', toggleOther);
      toggleOther();
    }

    // Question 3 is a checkbox group: HTML's `required` can only demand one
    // specific checkbox be checked, not "at least one of the group". The
    // standard workaround is to keep every checkbox `required` while none
    // are checked (so native validation blocks submit and focuses the
    // group), then drop `required` from all of them the moment any one is
    // checked (so the still-unchecked siblings don't also block submit).
    var demographicCheckboxes = Array.prototype.slice
      .call(form.querySelectorAll('input[name="demographics"]'));
    var updateDemographicsRequired = function () {
      var anyChecked = demographicCheckboxes.some(function (el) { return el.checked; });
      demographicCheckboxes.forEach(function (el) { el.required = !anyChecked; });
    };
    demographicCheckboxes.forEach(function (el) {
      el.addEventListener('change', updateDemographicsRequired);
    });
    updateDemographicsRequired();

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: left blank by humans (it's hidden off-screen), filled in by
      // most bots that blindly populate every field. Silently drop those.
      if (form.website && form.website.value) return;

      // querySelectorAll returns a static NodeList, not an Array, so it needs
      // slice.call before .map is available.
      var demographics = Array.prototype.slice
        .call(form.querySelectorAll('input[name="demographics"]:checked'))
        .map(function (el) { return el.value; });

      var tipsUsed = (form.tips_used.value || '').trim();
      var whatWorked = (form.what_worked.value || '').trim();
      var demographicsOther = (form.demographics_other.value || '').trim();
      var additionalComments = (form.additional_comments.value || '').trim();

      submitBtn.disabled = true;
      statusEl.classList.remove('text-danger');
      statusEl.textContent = 'Sending…';

      // Sent as text/plain so the request stays a CORS "simple request" (no
      // preflight, which the Apps Script endpoint can't answer). no-cors
      // means we never see the real response, so we treat network success
      // as submission success — same approach used for glossary feedback.
      fetch(FEEDBACK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: 'adopting_feedback',
          tips_used: tipsUsed,
          what_worked: whatWorked,
          demographics: demographics,
          demographics_other: demographicsOther,
          additional_comments: additionalComments,
          url: window.location.href,
          ts: Date.now(),
        }),
        keepalive: true,
      }).then(function () {
        submitBtn.disabled = false;
        form.reset();
        // form.reset() doesn't fire 'change' on the checkboxes it clears, so
        // the required-toggle above would otherwise be left stale (still
        // "not required" from the checked box that just got submitted).
        updateDemographicsRequired();
        // Prefer swapping in the dedicated thank-you panel; fall back to an
        // inline status message if the markup doesn't include one.
        if (thanksEl) {
          form.hidden = true;
          thanksEl.hidden = false;
        } else {
          statusEl.textContent = 'Thank you — your feedback has been recorded.';
        }
      }).catch(function () {
        statusEl.classList.add('text-danger');
        statusEl.textContent = 'Something went wrong. Please try again later.';
        submitBtn.disabled = false;
      });
    });
  }

  // The script tag uses `defer`, so the DOM is normally already parsed by the
  // time this runs — but the readyState check keeps init() safe if the script
  // is ever loaded without `defer` or injected after page load.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
