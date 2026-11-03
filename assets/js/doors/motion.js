/* One pause state for everything that moves on its own on the home page. The castle and the quotes
   both obey it, and every `.motion-toggle` button shows and sets it. Pausing is remembered between
   visits, and the operating system's reduced-motion setting always wins. */
const KEY = 'forrt-motion-paused';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const listeners = [];

function stored() {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

let userPaused = stored();

export const isPaused = () => reduced.matches || userPaused;
export const prefersReduced = () => reduced.matches;
export const onMotionChange = (listener) => listeners.push(listener);

function showState() {
  document.querySelectorAll('.motion-toggle').forEach((button) => {
    button.textContent = isPaused() ? 'Play animation' : 'Pause animation';
    button.setAttribute('aria-pressed', String(isPaused()));
  });
}

function changed() {
  showState();
  listeners.forEach((listener) => listener());
}

reduced.addEventListener('change', changed);

document.querySelectorAll('.motion-toggle').forEach((button) => {
  button.hidden = reduced.matches;
  reduced.addEventListener('change', () => {
    button.hidden = reduced.matches || button.dataset.unusable === 'true';
  });
  button.addEventListener('click', () => {
    userPaused = !userPaused;
    try {
      if (userPaused) localStorage.setItem(KEY, '1');
      else localStorage.removeItem(KEY);
    } catch {
      // Private browsing can refuse storage. The pause still works for this visit.
    }
    changed();
  });
});
showState();
