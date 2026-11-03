/* Castle playback on the home page, from the Doors mock's controller.
   The still image is already on the page. This loads the 3D bundle once the page has painted,
   then owns playback: pause, hover and tap, and suspension when off screen or in a hidden tab. */
const script = document.currentScript;
const stage = document.querySelector('.castle-stage');
const canvas = document.getElementById('castle-canvas');
const hero = document.querySelector('.hero');
const figure = stage?.closest('figure');
const pauseButton = document.querySelector('.motion-toggle');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

function webglAvailable() {
  try {
    const test = document.createElement('canvas');
    // Three.js has required WebGL 2 since r163.
    return Boolean(test.getContext('webgl2'));
  } catch {
    return false;
  }
}

function startControls() {
  const castle = () => window.forrtCastle;
  let userPaused = false;
  let paused = false;
  let lastTime = 0;
  let previous = 0;
  let frame = 0;
  let visible = true;
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;

  function draw(time) {
    pointerX += (targetX - pointerX) * 0.04;
    pointerY += (targetY - pointerY) * 0.04;
    castle()?.render(time, pointerX, pointerY);
  }
  function loop(ms) {
    frame = 0;
    if (paused || document.hidden || !visible) return;
    lastTime += Math.min(0.045, ms - (previous || ms) > 0 ? (ms - (previous || ms)) / 1000 : 0);
    previous = ms;
    draw(lastTime);
    frame = requestAnimationFrame(loop);
  }
  function start() {
    if (!frame && !paused && visible && !document.hidden) {
      previous = 0;
      frame = requestAnimationFrame(loop);
    }
  }
  function syncMotion() {
    if (paused || document.hidden || !visible) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      start();
    }
  }
  function showPauseState() {
    pauseButton.textContent = paused ? 'Play animation' : 'Pause animation';
    pauseButton.setAttribute('aria-pressed', String(paused));
    syncMotion();
  }

  pauseButton.addEventListener('click', () => {
    userPaused = !paused;
    paused = userPaused;
    showPauseState();
  });
  // Turning on reduced motion mid-visit stops the castle. Turning it off again resumes only
  // if the visitor had not paused it themselves.
  reduced.addEventListener('change', () => {
    paused = reduced.matches || userPaused;
    showPauseState();
    draw(lastTime);
  });

  hero.addEventListener('pointermove', (event) => {
    if (paused || event.pointerType === 'touch') return;
    const box = hero.getBoundingClientRect();
    targetX = (event.clientX - box.left) / box.width - 0.5;
    targetY = (event.clientY - box.top) / box.height - 0.5;
  });
  hero.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });

  /* Hovering with a mouse dismantles the tower, after a short dwell so a passing cursor does
     nothing; leaving rebuilds it. A tap does the same on touch screens and reveals the pause
     button; the bricks stay down until the next tap. The figure, not the stage, owns hover,
     so moving onto the pause button does not start the rebuild. */
  let dwell = 0;
  let tapHeld = false;
  let lastPointer = 'mouse';
  figure.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse' && !paused) {
      dwell = setTimeout(() => castle()?.hold(true), 400);
    }
  });
  figure.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') {
      clearTimeout(dwell);
      castle()?.hold(false);
    }
  });
  stage.addEventListener('pointerdown', (event) => {
    lastPointer = event.pointerType;
  });
  stage.addEventListener('click', () => {
    if (lastPointer === 'mouse' || paused) return;
    tapHeld = !tapHeld;
    figure.classList.add('show-motion-control');
    castle()?.hold(tapHeld);
  });

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    syncMotion();
  }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', syncMotion);
  window.addEventListener('resize', () => {
    castle()?.resize();
    draw(lastTime);
  });

  castle()?.resize();
  showPauseState();
  draw(0);
  start();
}

function allowed() {
  return !reduced.matches && navigator.connection?.saveData !== true && webglAvailable();
}

function loadBundle() {
  // Settings can change during the wait for the first paint.
  if (!allowed()) return;
  const bundle = document.createElement('script');
  bundle.src = script.dataset.castleBundle;
  bundle.onload = () => {
    if (window.forrtCastle) startControls();
  };
  document.body.append(bundle);
}

if (stage && canvas && allowed()) {
  // Wait for the first paint, then for the browser to have a moment to spare.
  const afterPaint = () => requestAnimationFrame(() => {
    if (window.requestIdleCallback) requestIdleCallback(loadBundle, { timeout: 1500 });
    else setTimeout(loadBundle, 0);
  });
  if (document.readyState === 'complete') afterPaint();
  else window.addEventListener('load', afterPaint, { once: true });
}
