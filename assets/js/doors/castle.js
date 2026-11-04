/* Castle playback on the home page, from the Doors mock's controller.
   The still image is already on the page. This loads the 3D bundle once the page has painted,
   then owns playback: pause, hover and tap, and suspension when off screen, in a hidden tab or behind
   the tower game. It also opens that game.
   A visitor who paused on an earlier visit keeps the still until they press play. */
import { isPaused, onMotionChange, prefersReduced } from './motion.js';

const script = document.currentScript;
const stage = document.querySelector('.castle-stage');
const canvas = document.getElementById('castle-canvas');
const hero = document.querySelector('.hero');
const figure = stage?.closest('figure');
const pauseButton = figure?.querySelector('.motion-toggle');
let gameOpen = false;
let syncCastle = () => {};

// The tower game calls this as it opens and closes, so the castle stops drawing behind it.
window.forrtHeroSuspend = (open) => {
  gameOpen = Boolean(open);
  syncCastle();
};

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
    if (isPaused() || gameOpen || document.hidden || !visible) return;
    lastTime += Math.min(0.045, ms - (previous || ms) > 0 ? (ms - (previous || ms)) / 1000 : 0);
    previous = ms;
    draw(lastTime);
    frame = requestAnimationFrame(loop);
  }
  function start() {
    if (!frame && !isPaused() && !gameOpen && visible && !document.hidden) {
      previous = 0;
      frame = requestAnimationFrame(loop);
    }
  }
  function syncMotion() {
    if (isPaused() || gameOpen || document.hidden || !visible) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      start();
    }
  }
  syncCastle = syncMotion;
  onMotionChange(() => {
    syncMotion();
    draw(lastTime);
  });

  hero.addEventListener('pointermove', (event) => {
    if (isPaused() || event.pointerType === 'touch') return;
    const box = hero.getBoundingClientRect();
    targetX = (event.clientX - box.left) / box.width - 0.5;
    targetY = (event.clientY - box.top) / box.height - 0.5;
  });
  hero.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    syncMotion();
  }, { threshold: 0 }).observe(stage);
  document.addEventListener('visibilitychange', syncMotion);
  window.addEventListener('resize', () => {
    castle()?.resize();
    if (!gameOpen) draw(lastTime);
  });

  castle()?.resize();
  draw(0);
  start();
}

/* Hovering with a mouse dismantles the tower, after a short dwell so a passing cursor does nothing;
   leaving rebuilds it. A tap does the same on touch screens and reveals the pause button; the bricks
   stay down until the next tap. The figure, not the stage, owns hover, so moving onto the pause
   button does not start the rebuild. Set up before the bundle arrives, so that a visitor who paused
   earlier can still find the play button by tapping. */
function watchPointer() {
  const castle = () => window.forrtCastle;
  let dwell = 0;
  let tapHeld = false;
  let lastPointer = 'mouse';
  let revealedAt = -Infinity;
  figure.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse' && !isPaused()) {
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
    if (lastPointer === 'mouse') return;
    if (!figure.classList.contains('show-motion-control')) revealedAt = performance.now();
    figure.classList.add('show-motion-control');
    if (isPaused() || !castle()) return;
    tapHeld = !tapHeld;
    castle()?.hold(tapHeld);
  });
  // A quick second tap on the tower must not land on a button the first tap has just revealed.
  figure.querySelector('.motion-bar').addEventListener('click', (event) => {
    if (performance.now() - revealedAt < 350) event.stopPropagation();
  }, true);
}

/* "Build it yourself" opens the tower game. Nobody downloads the game until they press this. It sets
   window.towerGame, and finds its physics file beside itself. Without WebGL the button stays hidden. */
function watchBuildButton() {
  const button = figure.querySelector('.tower-entry');
  if (!button) return;
  const label = button.textContent;
  let loading = false;
  button.hidden = false;
  button.addEventListener('click', () => {
    if (window.towerGame) {
      window.towerGame.open();
      return;
    }
    if (loading) return;
    loading = true;
    button.textContent = 'Loading…';
    const game = document.createElement('script');
    game.src = button.dataset.game;
    game.onload = () => {
      loading = false;
      button.textContent = label;
      window.towerGame.open();
    };
    game.onerror = () => {
      loading = false;
      button.textContent = 'Could not load the game';
    };
    document.body.append(game);
  });
}

function allowed() {
  return Boolean(script?.dataset.castleBundle) && !prefersReduced() && navigator.connection?.saveData !== true && webglAvailable();
}

let requested = false;

function loadBundle() {
  // Settings can change during the wait for the first paint.
  if (requested || !allowed() || isPaused()) return;
  requested = true;
  const bundle = document.createElement('script');
  bundle.src = script.dataset.castleBundle;
  bundle.onload = () => {
    if (window.forrtCastle) startControls();
  };
  document.body.append(bundle);
}

if (stage && canvas && webglAvailable()) {
  // Also under reduced motion and Save-Data, where a tap still has to reveal the button.
  watchPointer();
  watchBuildButton();
}
if (stage && canvas && allowed()) {
  onMotionChange(loadBundle);
  // Wait for the first paint, then for the browser to have a moment to spare.
  const afterPaint = () => requestAnimationFrame(() => {
    if (window.requestIdleCallback) requestIdleCallback(loadBundle, { timeout: 1500 });
    else setTimeout(loadBundle, 0);
  });
  if (document.readyState === 'complete') afterPaint();
  else window.addEventListener('load', afterPaint, { once: true });
} else if (pauseButton) {
  // Nothing here will ever move, so the castle's button has no job.
  pauseButton.dataset.unusable = 'true';
  pauseButton.hidden = true;
}
