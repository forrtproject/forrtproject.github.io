/* Shared, non-modal popovers (citations #200, glossary terms #227).
   import { openPopover, closePopover, registerPopover } from './popover.js'.
   openPopover(trigger, contentNode, {label, hover = false}) replaces the current popover.
   registerPopover(selector, (trigger) => contentNode | null, {label, hover = false})
   delegates click/Enter; opt-in hover opens after 250ms, closes after 200ms away from both.
   A null builder leaves the original link alone. Hover never takes focus; other opens focus
   the first control. label is required by both opening APIs. closePopover() restores focus
   to the trigger, including outside-click dismissal as specified. No feature data lives here. */
let current = null;
let opening;
let closing;
const focusable = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]';

function position() {
  if (!current) return;
  const { trigger, panel } = current;
  const rect = trigger.getBoundingClientRect();
  panel.style.maxHeight = 'calc(100vh - 32px)';
  const height = panel.offsetHeight;
  const below = innerHeight - rect.bottom - 16;
  const above = rect.top - 16;
  const flip = below < height && above > below;
  panel.style.maxHeight = `${Math.max(32, flip ? above : below)}px`;
  panel.style.left = `${innerWidth < 600 ? 16 : Math.max(16, Math.min(rect.left, innerWidth - panel.offsetWidth - 16))}px`;
  panel.style.top = `${Math.max(16, flip ? rect.top - panel.offsetHeight : rect.bottom)}px`;
}

export function closePopover() {
  clearTimeout(opening);
  clearTimeout(closing);
  if (!current) return;
  const { trigger, panel, expanded, controls, restoreFocus } = current;
  current = null;
  panel.remove();
  if (expanded === null) trigger.removeAttribute('aria-expanded');
  else trigger.setAttribute('aria-expanded', expanded);
  if (controls === null) trigger.removeAttribute('aria-controls');
  else trigger.setAttribute('aria-controls', controls);
  window.removeEventListener('resize', position);
  document.removeEventListener('scroll', position, true);
  if (restoreFocus && trigger.isConnected) trigger.focus({ preventScroll: true });
}

export function openPopover(trigger, contentNode, { label, hover = false } = {}) {
  closePopover();
  const panel = document.createElement('div');
  panel.className = 'doors-popover';
  panel.id = 'doors-popover';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', label);
  panel.append(contentNode);
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'doors-popover-close';
  close.setAttribute('aria-label', 'Close');
  close.textContent = '×';
  close.addEventListener('click', closePopover);
  panel.append(close);
  current = { trigger, panel, expanded: trigger.getAttribute('aria-expanded'), controls: trigger.getAttribute('aria-controls'), restoreFocus: !hover };
  trigger.setAttribute('aria-expanded', 'true');
  trigger.setAttribute('aria-controls', panel.id);
  document.body.append(panel);
  position();
  window.addEventListener('resize', position);
  document.addEventListener('scroll', position, true);
  panel.addEventListener('pointerenter', () => clearTimeout(closing));
  panel.addEventListener('pointerleave', () => { if (current && !current.restoreFocus) scheduleClose(); });
  panel.addEventListener('focusin', () => { if (current) current.restoreFocus = true; });
  if (!hover) panel.querySelector(focusable)?.focus({ preventScroll: true });
}

function scheduleClose() {
  clearTimeout(closing);
  closing = setTimeout(closePopover, 200);
}

export function registerPopover(selector, buildContent, { label, hover = false } = {}) {
  const activate = (trigger, fromHover = false) => {
    if (current?.trigger === trigger) {
      if (!fromHover && !current.restoreFocus) {
        current.restoreFocus = true;
        current.panel.querySelector(focusable)?.focus();
      } else if (!fromHover) closePopover();
      return true;
    }
    const content = buildContent(trigger);
    if (!content) return false;
    openPopover(trigger, content, { label, hover: fromHover });
    return true;
  };
  document.addEventListener('click', (event) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const trigger = event.target.closest(selector);
    if (trigger && activate(trigger)) event.preventDefault();
  });
  // Links and buttons already turn Enter into click; support other focusable triggers too.
  document.addEventListener('keydown', (event) => {
    const trigger = event.target.closest(selector);
    if (event.key === 'Enter' && trigger && !trigger.matches('a[href],button') && activate(trigger)) event.preventDefault();
  });
  if (hover) {
    document.addEventListener('pointerover', (event) => {
      if (event.pointerType === 'touch') return;
      const trigger = event.target.closest(selector);
      if (!trigger || trigger.contains(event.relatedTarget)) return;
      clearTimeout(closing);
      clearTimeout(opening);
      opening = setTimeout(() => activate(trigger, true), 250);
    });
    document.addEventListener('pointerout', (event) => {
      const trigger = event.target.closest(selector);
      if (!trigger || trigger.contains(event.relatedTarget)) return;
      clearTimeout(opening);
      if (current?.trigger === trigger && !current.restoreFocus) scheduleClose();
    });
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && current) {
    event.preventDefault();
    closePopover();
  }
});
document.addEventListener('click', (event) => {
  if (current && !current.panel.contains(event.target) && !current.trigger.contains(event.target)) closePopover();
});
