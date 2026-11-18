// Google Forms rendered as the site's own forms (layouts/partials/google_form.html). Nothing goes
// to Google until a visitor presses Submit. Google's reply cannot be read from another site, so
// these checks mirror the form's rules: a response that breaks them would be discarded unseen.
(() => {
  const OTHER = '__other_option__';

  document.querySelectorAll('.gform').forEach((form) => {
    const body = form.querySelector('.gform-body');
    const button = form.querySelector('.gform-submit');
    const status = form.querySelector('.gform-status');

    const otherText = (choice) => choice.closest('.gform-other').querySelector('input[type=text]');

    const refresh = () => {
      // Answers of only spaces count as empty.
      form.querySelectorAll('input[required][type=text], textarea[required]').forEach((field) => {
        field.setCustomValidity(field.value.trim() ? '' : 'Please answer this question.');
      });
      form.querySelectorAll(`input[value="${OTHER}"]`).forEach((choice) => {
        const text = otherText(choice);
        text.setCustomValidity(choice.checked && !text.value.trim() ? 'Please fill in your answer.' : '');
      });
      form.querySelectorAll('[data-gform-pick-one]').forEach((group) => {
        const boxes = group.querySelectorAll('input[type=checkbox]');
        const ticked = [...boxes].some((box) => box.checked);
        boxes[0].setCustomValidity(ticked ? '' : 'Please tick at least one option.');
      });
      form.querySelectorAll('.gform-clear').forEach((clear) => {
        clear.hidden = !clear.closest('fieldset').querySelector('input[type=radio]:checked');
      });
    };

    form.addEventListener('input', (event) => {
      // Typing an "Other" answer selects that option.
      const row = event.target.matches('input[type=text]') && event.target.closest('.gform-other');
      if (row && event.target.value.trim()) row.querySelector(`input[value="${OTHER}"]`).checked = true;
      refresh();
    });

    form.addEventListener('click', (event) => {
      if (!event.target.matches('.gform-clear')) return;
      const group = event.target.closest('fieldset');
      group.querySelectorAll('input[type=radio]').forEach((radio) => { radio.checked = false; });
      refresh();
      group.querySelector('input[type=radio]').focus();
    });

    const answers = () => {
      const data = new URLSearchParams();
      new FormData(form).forEach((value, name) => {
        const text = value.trim();
        if (!text) return;
        if (name.endsWith('.other_option_response')) {
          const choice = form.querySelector(`input[name="${name.replace('.other_option_response', '')}"][value="${OTHER}"]`);
          if (!choice.checked) return;
        }
        data.append(name, text);
      });
      return data;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      refresh();
      if (!form.reportValidity()) return;
      button.disabled = true;
      status.classList.remove('is-error');
      status.textContent = 'Sending…';
      try {
        await fetch(form.action, {
          method: 'POST', mode: 'no-cors', credentials: 'omit', referrerPolicy: 'no-referrer', body: answers(),
        });
        body.hidden = true;
        status.textContent = form.dataset.gformConfirmation;
        status.focus();
      } catch {
        status.classList.add('is-error');
        status.textContent = 'Sorry, that did not work. Your answers are still here, so please try again.';
      } finally {
        button.disabled = false;
      }
    });

    refresh();
  });
})();
