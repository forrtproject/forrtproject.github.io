/* The home page's band of quotes, one at a time. It stops for the shared pause control, while a
   pointer or keyboard focus is on it, and when nobody can see it. */
import { isPaused, onMotionChange } from './motion.js';

const INTERVAL = 6000;
const host = document.querySelector('.quotes');
const quotes = host ? [...host.querySelectorAll('.quote')] : [];
const button = host?.querySelector('.motion-toggle');

if (quotes.length < 2 && button) {
  button.dataset.unusable = 'true';
  button.hidden = true;
}

if (quotes.length > 1) {
  let current = 0;
  let timer = 0;
  let pointerOver = false;
  let focusInside = false;
  let onScreen = true;

  const next = () => {
    quotes[current].classList.remove('is-active');
    current = (current + 1) % quotes.length;
    quotes[current].classList.add('is-active');
  };
  const sync = () => {
    clearInterval(timer);
    timer = 0;
    if (!isPaused() && !pointerOver && !focusInside && onScreen && !document.hidden) timer = setInterval(next, INTERVAL);
  };

  host.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') {
      pointerOver = true;
      sync();
    }
  });
  host.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') {
      pointerOver = false;
      sync();
    }
  });
  // A tap reveals the pause button, as it does on the castle.
  // On the click, because a button revealed at the touch would sit under the finger and take the tap.
  let lastPointer = 'mouse';
  host.addEventListener('pointerdown', (event) => {
    lastPointer = event.pointerType;
  });
  host.addEventListener('click', () => {
    if (lastPointer !== 'mouse') host.classList.add('show-motion-control');
  });
  // Only keyboard focus holds them: a mouse click leaves focus on the button after the pointer goes.
  host.addEventListener('focusin', (event) => {
    focusInside = event.target.matches(':focus-visible');
    sync();
  });
  host.addEventListener('focusout', () => {
    focusInside = false;
    sync();
  });
  new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    sync();
  }).observe(host);
  document.addEventListener('visibilitychange', sync);
  onMotionChange(sync);
  sync();
}
