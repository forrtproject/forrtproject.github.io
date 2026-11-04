// Loads third-party embeds rendered by layouts/partials/click_to_load.html on request.
document.addEventListener('click', function (event) {
  if (!event.target.matches || !event.target.matches('.click-to-load button')) return;
  var box = event.target.closest('.click-to-load');
  var data = box.dataset;
  var el;
  if (data.embedScript) {
    el = document.createElement('div');
    if (data.embedForm) el.id = 'octopus-form-' + data.embedForm;
    var script = document.createElement('script');
    script.async = true;
    script.src = data.embedSrc;
    if (data.embedForm) script.dataset.form = data.embedForm;
    el.appendChild(script);
  } else {
    el = document.createElement('iframe');
    el.src = data.embedSrc;
    el.setAttribute('allowfullscreen', '');
    el.setAttribute('frameborder', '0');
    if (data.embedTitle) el.title = data.embedTitle;
    el.setAttribute('width', data.embedWidth || '100%');
    if (data.embedHeight) el.setAttribute('height', data.embedHeight);
    if (data.embedStyle) el.setAttribute('style', data.embedStyle);
  }
  box.replaceWith(el);
});
