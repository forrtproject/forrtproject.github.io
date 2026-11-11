// Newsletter sign-up (layouts/partials/newsletter_form.html). Nothing loads from elsewhere until
// a visitor presses Subscribe. Then Google reCAPTCHA loads, as EmailOctopus requires, and the form
// posts the address to EmailOctopus the way its own embed does.
(() => {
  let recaptcha;
  const loadRecaptcha = () => {
    recaptcha ??= new Promise((resolve, reject) => {
      window.forrtRecaptchaReady = () => resolve(window.grecaptcha);
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=forrtRecaptchaReady&render=explicit';
      script.async = true;
      script.onerror = () => { recaptcha = null; script.remove(); reject(new Error('reCAPTCHA did not load')); };
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
})();
