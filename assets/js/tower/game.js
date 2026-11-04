/* Tower game prototype: free building by real Lego rules on a stud grid.
   Every brick covers whole stud squares, every height is a whole number of plates, and a brick
   comes down from above onto the highest thing under it, so it can never slide into a gap.
   One stud is enough to hold a brick, though a placement that would overload a joint is refused with a warning. The supply is unlimited, and any of ten bricks (keys 1 to 9 and 0) and three looks can be chosen at any time.
   Reused from the castle: its brick and arch geometry (cut to a flat foundation) and lighting.
   New: grid and rules, picking by height map, brick picker, looks, how-to-play note, hints with a planned tower, undo, dialog, tests. */
import {
  Scene, OrthographicCamera, WebGLRenderer, HemisphereLight, DirectionalLight, Mesh, PlaneGeometry, BoxGeometry, EdgesGeometry,
  LineSegments, LineBasicMaterial, Group, ShadowMaterial, Vector3, Box3, PCFSoftShadowMap, SRGBColorSpace,
  ACESFilmicToneMapping, Color, MeshBasicMaterial, Raycaster, Vector2, BackSide, AlwaysStencilFunc, NotEqualStencilFunc, ReplaceStencilOp
} from 'three';
import { createFoundation } from './source-copies/lego-foundation.js';
import { createCollapse } from './collapse.js';

const css = `
html.tg-lock{overflow:hidden;scrollbar-gutter:stable}
#tower-game{touch-action:none;width:min(1000px,100vw);max-width:100vw;height:min(800px,100dvh);max-height:100dvh;padding:0;border:0;border-radius:18px;background:#e3efec;color:#262d35;overflow:hidden}
#tower-game::backdrop{background:rgba(38,45,53,.55)}
#tower-game .tg-wrap{display:flex;flex-direction:column;height:100%}
#tower-game .tg-head{display:flex;align-items:center;gap:12px;padding:10px 12px 4px 18px}
#tower-game h2{font:500 clamp(20px,3vw,26px)/1.1 'Newsreader',Georgia,serif;margin:0;flex:1}
#tower-game .tg-count{font-weight:600;font-size:16px;white-space:nowrap}
#tower-game .tg-field{position:relative;flex:1;min-height:0}
#tower-game .tg-stage{position:absolute;inset:0;touch-action:none;user-select:none;-webkit-user-select:none}
#tower-game .tg-over{position:absolute;top:6px;display:flex;gap:6px}
#tower-game .tg-over[hidden]{display:none}
#tower-game .tg-plan{left:8px}
#tower-game .tg-again{right:8px}
#tower-game .tg-stage.tg-keys:focus{outline:3px solid #005a87;outline-offset:-3px}
#tower-game canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:crosshair}
#tower-game .tg-tray{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:4px;padding:4px 12px;touch-action:none;user-select:none;-webkit-user-select:none}
#tower-game button.tg-style{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:0;min-height:58px;min-width:0;padding:3px 1px 4px;border:2px solid transparent;border-radius:10px;background:#f6faf9;font:600 13px/1.1 'Source Sans 3',system-ui,sans-serif;color:#262d35}
@media(hover:hover){#tower-game button.tg-style:hover{background:#fff;color:#262d35;border-color:#2d5750}}
#tower-game button.tg-style[aria-pressed=true]{background:#fff;color:#262d35;border-color:#b34e0a;box-shadow:0 0 0 1px #b34e0a}
#tower-game .tg-style img{width:100%;max-width:62px;height:34px;object-fit:contain;display:block;pointer-events:none;transition:transform .15s}
#tower-game .tg-style.tg-flip img{transform:scaleX(-1)}
#tower-game .tg-style small{font-size:12px;font-weight:400;line-height:1}
#tower-game .tg-style{position:relative}
#tower-game .tg-style kbd{position:absolute;top:3px;left:5px;font:600 11px/1 'Source Sans 3',system-ui,sans-serif;color:#5a666e}
@media(hover:none){#tower-game .tg-style kbd{display:none}}
#tower-game .tg-looks{left:8px;bottom:6px;top:auto;gap:4px}
#tower-game button.tg-look{display:flex;align-items:center;gap:5px;min-height:44px;padding:4px 10px 4px 7px;border:2px solid transparent;border-radius:10px;background:#f6faf9;font:600 14px/1 'Source Sans 3',system-ui,sans-serif;color:#262d35;cursor:pointer}
@media(hover:hover){#tower-game button.tg-look:hover{background:#fff;border-color:#2d5750}}
#tower-game button.tg-look[aria-pressed=true]{background:#fff;border-color:#b34e0a;box-shadow:0 0 0 1px #b34e0a}
#tower-game .tg-look i{width:16px;height:16px;border-radius:4px;flex:none}
#tower-game .tg-look[data-look=grey] i{background:#5c6870}
#tower-game .tg-look[data-look=brick] i{background:#963a27}
#tower-game .tg-look[data-look=pride] i{background:linear-gradient(#7046a3 0 17%,#2672b8 17% 33%,#2b985b 33% 50%,#e8b52c 50% 67%,#e98434 67% 83%,#ce4742 83%)}
#tower-game .tg-note{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:8px;background:rgba(38,45,53,.45)}
#tower-game .tg-note[hidden]{display:none}
#tower-game .tg-card{display:flex;flex-direction:column;width:min(500px,100%);max-height:100%;padding:14px 18px 12px;border-radius:14px;background:#fff;box-shadow:0 10px 30px rgba(38,45,53,.3)}
#tower-game .tg-card h3{font:500 22px/1.1 'Newsreader',Georgia,serif;margin:0 0 6px}
#tower-game .tg-card .tg-steps{min-height:0;overflow:auto;touch-action:pan-y;margin:0 0 10px;padding:0;list-style:none;font-size:15px;line-height:1.3}
#tower-game .tg-card li{margin:0 0 7px}
#tower-game .tg-warn-text{margin:0 0 12px;font-size:17px;line-height:1.35}
#tower-game .tg-warn-row{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px}
#tower-game .tg-turns{display:flex;align-items:center;gap:4px;float:right;margin:0 0 2px 8px;font-size:20px;color:#5a666e}
#tower-game .tg-turns img{width:58px;height:36px;object-fit:contain;display:block}
#tower-game .tg-style.tg-suggested::after{content:'';position:absolute;top:4px;right:4px;width:9px;height:9px;border-radius:50%;background:#14808f}
#tower-game .tg-foot{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;padding:4px 12px 12px 18px}
#tower-game .tg-hint{flex:1 1 240px;margin:0;font-size:15px;line-height:1.3;height:2.6em;overflow:hidden}
#tower-game .tg-btn{white-space:nowrap;min-height:44px;padding:8px 14px;border:1.5px solid #2d5750;border-radius:999px;background:#fff;color:#262d35;font:600 15px/1.2 'Source Sans 3',system-ui,sans-serif;cursor:pointer}
#tower-game .tg-close{min-width:44px;padding:8px 12px}
@media(hover:hover){#tower-game .tg-btn:hover:not(:disabled){background:#2d5750;color:#fff}}
#tower-game .tg-btn:disabled{opacity:.45;cursor:default}
#tower-game .tg-btn.tg-main{flex:0 0 5.4em;padding-left:4px;padding-right:4px;background:#b34e0a;border-color:#b34e0a;color:#fff}
#tower-game .tg-btn.tg-main:disabled{background:#fff;border-color:#2d5750;color:#262d35}
@media(hover:hover){#tower-game .tg-btn.tg-main:hover:not(:disabled){background:#8f3e07}}
#tower-game .tg-card .tg-btn.tg-main{align-self:flex-end;flex:none;padding:8px 16px}
#tower-game .tg-btn[aria-pressed=true],#tower-game .tg-btn[aria-pressed=true]:hover{background:#14808f;border-color:#14808f;color:#fff}
#tower-game button:focus-visible{outline:3px solid #005a87;outline-offset:2px}
#tower-game .tg-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:760px){#tower-game .tg-tray{grid-template-columns:repeat(5,minmax(0,1fr));padding:2px 8px}#tower-game .tg-foot{padding:4px 8px 8px}#tower-game .tg-hint{flex-basis:100%}#tower-game .tg-foot .tg-btn:not(.tg-main){padding:8px 11px;flex:1 1 auto}#tower-game .tg-plan{flex-direction:column}#tower-game .tg-over .tg-btn{padding:8px 11px}}
@media(max-width:600px){#tower-game{border-radius:0;width:100vw;height:100dvh}#tower-game button.tg-style{min-height:52px}#tower-game .tg-style img{height:28px}}
@media(max-width:360px){#tower-game button.tg-look{padding:4px 7px 4px 5px}#tower-game .tg-foot .tg-btn:not(.tg-main){padding:8px 6px}#tower-game button.tg-style{min-height:44px}#tower-game .tg-style img{height:22px}#tower-game .tg-style small{display:none}#tower-game .tg-hint{font-size:14px}}
@media(max-height:480px){#tower-game .tg-card{padding:8px 14px}#tower-game .tg-card h3{font-size:18px;margin-bottom:3px}#tower-game .tg-card .tg-steps{font-size:14px;line-height:1.25;margin-bottom:5px}#tower-game .tg-card li{margin-bottom:3px}#tower-game .tg-turns img{height:24px;width:40px}#tower-game .tg-wrap{display:grid;grid-template-columns:1fr 300px;grid-template-rows:auto auto 1fr}
 #tower-game .tg-head{grid-column:2;grid-row:1;padding:6px 8px 0 4px}#tower-game .tg-field{grid-column:1;grid-row:1/4}#tower-game .tg-plan{flex-direction:column}#tower-game .tg-over .tg-btn{padding:8px 11px}#tower-game .tg-tray{grid-column:2;grid-row:2;grid-template-columns:repeat(5,minmax(0,1fr));padding:2px 8px 2px 4px}
 #tower-game button.tg-style{min-height:44px}#tower-game .tg-style img{height:20px}#tower-game .tg-style small{display:none}
 #tower-game .tg-foot{grid-column:2;grid-row:3;align-content:flex-end;padding:2px 8px 8px 4px}#tower-game .tg-foot .tg-btn:not(.tg-main){padding:6px 8px;flex:1 1 auto}#tower-game .tg-hint{flex:1 1 100%;font-size:14px}}
`;

/* The physics file sits beside this one, and is fetched only by someone who reaches the wobble warning. */
const scriptUrl = document.currentScript?.src || location.href;
let physics = null;
function loadPhysics() {
  physics ??= new Promise((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = new URL('physics.bundle.js', scriptUrl).href;
    tag.onload = () => resolve(window.CANNON);
    tag.onerror = () => { physics = null; reject(new Error('The physics file did not load')); };
    document.head.appendChild(tag);
  });
  return physics;
}

const clamp = v => Math.max(0, Math.min(1, v));
const smooth = v => { const p = clamp(v); return p * p * (3 - 2 * p); };
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const coarse = matchMedia('(pointer: coarse)');

/* Grid. Square (i, j) has its stud at x = .15 + .30 i, z = .15 + .30 j. Heights count in plates: a brick is 3, a plate is 1. */
const PITCH = .30, PLATE = .09;
const TYPES = {};
for (const [nz, nx] of [[1, 1], [1, 2], [1, 4], [2, 2], [2, 3], [2, 4]]) TYPES[`b${nz}x${nx}`] = { nx, nz, plates: 3, size: `${nz}×${nx}`, word: 'brick', label: `${nz} by ${nx} brick` };
for (const [nz, nx] of [[1, 1], [1, 2], [2, 2], [2, 4]]) TYPES[`p${nz}x${nx}`] = { nx, nz, plates: 1, size: `${nz}×${nx}`, word: 'plate', label: `${nz} by ${nx} plate` };
const TYPE_KEYS = Object.keys(TYPES);
/* Number keys in the order they sit on the keyboard: 1 is the first brick, 0 the tenth. */
const keyOf = n => String((n + 1) % 10);
const LOOKS = { grey: 'Grey', brick: 'Brick', pride: 'Pride' };
const BRICK_REDS = ['#8e3524', '#963a27', '#833022', '#9c432c', '#8a3828', '#7b2d20', '#984631'];
const STRIPES = ['#7046a3', '#2672b8', '#2b985b', '#e8b52c', '#e98434', '#ce4742'];
/* Stripes rise with height, one colour per brick height. Anything set on top of a whole course starts the next colour. */
const stripeAt = level => STRIPES[Math.ceil(level / 3) % STRIPES.length];
const NOTHING = -1000;
/* How much turning force a stud may carry. A game rule tuned by feel, not a measurement of real bricks. */
const STRAIN_LIMIT = 80;
/* The top is cells -4 to 3. Bricks may reach four studs past it, up to 16 bricks high. */
const MIN_CELL = -8, MAX_CELL = 7, MAX_PLATES = 48, MAX_BRICKS = 400;
/* The tower the hints show: two courses of wall with a window on the front and right, a ring of plates, then a crown. */
function buildPlan() {
  const plan = [];
  const add = (type, i, j, rot, level) => plan.push({ type, i, j, rot, level });
  // First course: corners, then each wall between them. Front (j 3) and right (i 3) leave a window at -1..0.
  for (const [i, j] of [[-4, -4], [3, -4], [-4, 3], [3, 3]]) add('b1x1', i, j, 0, 0);
  add('b1x2', -3, 3, 0, 0); add('b1x2', 1, 3, 0, 0);
  add('b1x2', 3, -3, 1, 0); add('b1x2', 3, 1, 1, 0);
  for (const i of [-3, -1, 1]) add('b1x2', i, -4, 0, 0);
  for (const j of [-3, -1, 1]) add('b1x2', -4, j, 1, 0);
  // Second course: long bricks bridge the windows.
  add('b1x2', -4, 3, 0, 3); add('b1x4', -2, 3, 0, 3); add('b1x2', 2, 3, 0, 3);
  for (const i of [-4, -2, 0, 2]) add('b1x2', i, -4, 0, 3);
  for (const j of [-3, -1, 1]) add('b1x2', -4, j, 1, 3);
  add('b1x1', 3, -3, 0, 3); add('b1x4', 3, -2, 1, 3); add('b1x1', 3, 2, 0, 3);
  // Plates in a pinwheel, overhanging the wall by one stud.
  for (const i of [-5, -1]) add('p2x4', i, 3, 0, 6);
  for (const j of [-3, 1]) add('p2x4', 3, j, 1, 6);
  for (const i of [-3, 1]) add('p2x4', i, -5, 0, 6);
  for (const j of [-5, -1]) add('p2x4', -5, j, 1, 6);
  // Crown: corners and the middle of each side.
  for (const [i, j] of [[-5, 3], [3, 3], [3, -5], [-5, -5], [-1, 3], [3, -1], [-1, -5], [-5, -1]]) add('b2x2', i, j, 0, 7);
  return plan;
}
const footprint = (type, rot) => (rot ? [TYPES[type].nz, TYPES[type].nx] : [TYPES[type].nx, TYPES[type].nz]);
const isSquare = type => TYPES[type].nx === TYPES[type].nz;
const cellX = i => .15 + PITCH * i;

let ui, game;

function buildDialog() {
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
  const d = document.createElement('dialog');
  d.id = 'tower-game'; d.setAttribute('aria-labelledby', 'tg-title');
  const tray = TYPE_KEYS.map((k, n) => `<button type="button" class="tg-style" data-type="${k}" aria-pressed="false" aria-label="${TYPES[k].label}" aria-keyshortcuts="${keyOf(n)}"><kbd>${keyOf(n)}</kbd><img alt=""><span>${TYPES[k].size}</span><small>${TYPES[k].word}</small></button>`).join('');
  const looks = Object.entries(LOOKS).map(([k, name]) => `<button type="button" class="tg-look" data-look="${k}" aria-pressed="false"><i></i>${name}</button>`).join('');
  const tap = coarse.matches ? 'tap' : 'click';
  const steps = [
    `<strong>Pick a brick</strong> from the row below${coarse.matches ? '' : ', or press its number: 1 to 9, then 0 for the tenth'}.`,
    `<strong>Point and ${tap}.</strong> ${coarse.matches ? 'Drag first to see a copy of the brick, edged in orange, where it will land; a plain tap places it at once.' : 'A copy of the brick, edged in orange, shows where it will land.'} One stud is enough to hold a brick, but a red edge means the pile would be too wobbly.`,
    `<span class="tg-turns" aria-hidden="true"><img id="tg-turn-a" alt="">↻<img id="tg-turn-b" alt=""></span><strong>Rotate${coarse.matches ? '' : ' (or R)'}</strong> turns the brick a quarter turn before you place it. Square bricks stay the same.`,
    `<strong>View${coarse.matches ? '' : ' (or T)'}</strong> turns the whole tower, so you can reach the far side.`,
    '<strong>Grey, Brick and Pride</strong> set the look of your next bricks, so you can mix them. Pride colours follow the height.',
    '<strong>Undo</strong> takes a brick back. <strong>Hints</strong> shows a planned tower, if you would like one.'
  ].map(t => `<li>${t}</li>`).join('');

  d.innerHTML = `<div class="tg-wrap">
    <div class="tg-head"><h2 id="tg-title">Build the tower</h2><span class="tg-count" id="tg-count"></span>
      <button type="button" class="tg-btn tg-close" id="tg-help" aria-label="How to play">?</button>
      <button type="button" class="tg-btn tg-close" id="tg-close" aria-label="Close the game">✕</button></div>
    <div class="tg-field"><div class="tg-stage" id="tg-stage" tabindex="0" role="application" aria-label="Building area. Number keys choose a brick, arrow keys move it, R rotates it, T turns the view, Enter places it."><canvas id="tg-canvas" aria-hidden="true"></canvas></div>
      <div class="tg-over tg-plan" id="tg-plan" hidden><button type="button" class="tg-btn" id="tg-next" title="Places the next brick of the planned tower" aria-label="Place the next brick of the plan">Place next</button>
      <button type="button" class="tg-btn" id="tg-finish" title="Builds the rest of the planned tower. Undo takes it all back" aria-label="Build the rest of the plan for me">Build rest</button></div>
      <div class="tg-over tg-again"><button type="button" class="tg-btn" id="tg-restart">Start again</button></div>
      <div class="tg-over tg-looks" id="tg-looks" role="group" aria-label="Look of your next bricks">${looks}</div></div>
    <div class="tg-tray" id="tg-tray" role="group" aria-label="Choose a brick">${tray}</div>
    <div class="tg-foot"><p class="tg-hint" id="tg-hint"></p>
      <button type="button" class="tg-btn" id="tg-rotate" aria-label="Rotate the brick">Rotate</button>
      <button type="button" class="tg-btn" id="tg-view" aria-label="Turn the view">View</button>
      <button type="button" class="tg-btn" id="tg-undo">Undo</button>
      <button type="button" class="tg-btn" id="tg-hints" aria-pressed="false" aria-label="Show hints">Hints</button>
      <button type="button" class="tg-btn tg-main" id="tg-done">Done</button></div>
    <div class="tg-sr" role="status" aria-live="polite" id="tg-live"></div></div>
    <div class="tg-note" id="tg-note" hidden><div class="tg-card" role="group" aria-labelledby="tg-note-title"><h3 id="tg-note-title">How to play</h3><ul class="tg-steps" id="tg-steps" tabindex="0">${steps}</ul><button type="button" class="tg-btn tg-main" id="tg-note-go">Start building</button></div></div>
    <div class="tg-note" id="tg-warn" hidden><div class="tg-card" role="alertdialog" aria-modal="true" aria-labelledby="tg-warn-title" aria-describedby="tg-warn-text"><h3 id="tg-warn-title">Careful!</h3><p class="tg-warn-text" id="tg-warn-text">Placing it here would bring FORRT down. We only build on solid foundations.</p><div class="tg-warn-row"><button type="button" class="tg-btn" id="tg-warn-anyway">Place it anyway</button><button type="button" class="tg-btn tg-main" id="tg-warn-go">Move it</button></div></div></div>`;
  document.body.appendChild(d);
  const $ = id => d.querySelector('#' + id);
  return { d, canvas: $('tg-canvas'), stage: $('tg-stage'), tray: $('tg-tray'), count: $('tg-count'), hint: $('tg-hint'), rotate: $('tg-rotate'), view: $('tg-view'), next: $('tg-next'), plan: $('tg-plan'), restart: $('tg-restart'), undo: $('tg-undo'), hints: $('tg-hints'), finish: $('tg-finish'), done: $('tg-done'), close: $('tg-close'), live: $('tg-live'), styles: [...d.querySelectorAll('.tg-style')], looks: [...d.querySelectorAll('.tg-look')], wrap: d.querySelector('.tg-wrap'), note: $('tg-note'), noteGo: $('tg-note-go'), help: $('tg-help'), warn: $('tg-warn'), warnGo: $('tg-warn-go'), warnAnyway: $('tg-warn-anyway') };
}

function createGame() {
  const renderer = new WebGLRenderer({ canvas: ui.canvas, antialias: true, alpha: true, stencil: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  const scene = new Scene();
  const camera = new OrthographicCamera(-3.7, 3.7, 3, -3, .1, 60);
  scene.add(new HemisphereLight(0xffffff, 0x8b8379, 1.75));
  const key = new DirectionalLight(0xfffbf6, 3.5);
  key.position.set(-3, 11, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -8; key.shadow.camera.right = 8;
  key.shadow.camera.top = 8; key.shadow.camera.bottom = -8;
  key.shadow.camera.near = .5; key.shadow.camera.far = 30;
  key.shadow.normalBias = .035; key.shadow.bias = -.0004; key.shadow.radius = 3; key.shadow.intensity = .6;
  scene.add(key);
  const fill = new DirectionalLight(0xf3f7ff, 1.25); fill.position.set(6, 4, -2); scene.add(fill);
  const rim = new DirectionalLight(0xffffff, 1.2); rim.position.set(-3, 5, -5); scene.add(rim);

  const { model, brickGeometry, stones, foundationTop } = createFoundation();
  scene.add(model);
  const overlay = new Group(); scene.add(overlay);
  const ground = new Mesh(new PlaneGeometry(60, 60), new ShadowMaterial({ opacity: .18 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.035; ground.receiveShadow = true;
  scene.add(ground);

  const Y = new Vector3(0, 1, 0);
  const mesh = part => part.object.children[0];
  const geometryOf = {}, boxOf = {}, edgesOf = {};
  for (const k of TYPE_KEYS) {
    const t = TYPES[k], w = t.nx * PITCH, h = t.plates * PLATE, d = t.nz * PITCH;
    geometryOf[k] = brickGeometry(w, h, d);
    boxOf[k] = new BoxGeometry(w - .014, h - .014, d - .014);
    edgesOf[k] = new EdgesGeometry(boxOf[k]);
  }

  /* The grid: the height, in plates, of the top surface over each square. */
  const SIZE = MAX_CELL - MIN_CELL + 1;
  const at = (i, j) => (i - MIN_CELL) * SIZE + (j - MIN_CELL);
  const baseTops = new Int16Array(SIZE * SIZE).fill(NOTHING);
  for (let a = -4; a <= 3; a++) for (let b = -4; b <= 3; b++) baseTops[at(a, b)] = 0;
  const tops = baseTops.slice();
  /* The brick whose top is the top of each column; null over the bare foundation. */
  const topOwner = new Array(SIZE * SIZE).fill(null);
  /* What fills each column, as [bottom, top] in plates. Bricks can overhang, so a column can have gaps. */
  const spans = Array.from({ length: SIZE * SIZE }, () => []);
  const STUD = .048, BODY_GAP = .007;
  const heightOf = plates => foundationTop + plates * PLATE;
  const cellsOf = (i, j, nx, nz, visit) => { for (let a = i; a < i + nx; a++) for (let b = j; b < j + nz; b++) visit(at(a, b)); };
  const inGrid = (i, j, nx, nz) => i >= MIN_CELL && j >= MIN_CELL && i + nx - 1 <= MAX_CELL && j + nz - 1 <= MAX_CELL;
  /* Lowered from above, a brick stops on the highest thing under it. One stud is enough to hold it, as with real bricks. */
  function landing(type, i, j, rot) {
    const [nx, nz] = footprint(type, rot);
    if (!inGrid(i, j, nx, nz)) return null;
    let level = NOTHING, studs = 0;
    cellsOf(i, j, nx, nz, c => { if (tops[c] > level) { level = tops[c]; studs = 1; } else if (tops[c] === level) studs++; });
    if (level === NOTHING || level + TYPES[type].plates > MAX_PLATES) return null;
    return { level, studs };
  }
  const worldOf = (type, i, j, rot, level) => {
    const [nx, nz] = footprint(type, rot);
    return { x: cellX(i + (nx - 1) / 2), z: cellX(j + (nz - 1) / 2), y: heightOf(level) + TYPES[type].plates * PLATE / 2, floor: heightOf(level), rotY: rot ? Math.PI / 2 : 0 };
  };
  const makeTarget = (type, i, j, rot, r) => ({ type, i, j, rot, level: r.level, studs: r.studs, ...worldOf(type, i, j, rot, r.level) });
  /* What holds a brick lowered here: the bricks under it, how many studs each grips, and the patch those studs cover, in cell units. */
  function holdOf(type, i, j, rot, level) {
    const [nx, nz] = footprint(type, rot), under = new Map();
    let studs = 0, sx = 0, sz = 0, x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let a = i; a < i + nx; a++) for (let b = j; b < j + nz; b++) {
      const c = at(a, b);
      if (tops[c] !== level) continue;
      const owner = topOwner[c];
      if (owner) under.set(owner, (under.get(owner) || 0) + 1);
      studs++; sx += a + .5; sz += b + .5;
      x0 = Math.min(x0, a); x1 = Math.max(x1, a + 1); z0 = Math.min(z0, b); z1 = Math.max(z1, b + 1);
    }
    return { under, studs, x: sx / studs, z: sz / studs, hx: (x1 - x0) / 2, hz: (z1 - z0) / 2, mass: nx * nz * TYPES[type].plates, cx: i + nx / 2, cz: j + nz / 2 };
  }
  /* Weight flows down through the studs. Each brick's load is measured by how far its centre lies outside the studs holding it,
     per stud, and shared among the bricks below by stud count. Bricks only rest on earlier ones, so history reversed is top to bottom. */
  let worstHold = null;
  function strainWith(extra) {
    const carried = new Map();
    let worst = 0;
    worstHold = null;
    const visit = hold => {
      const on = carried.get(hold), w = hold.mass + (on ? on.w : 0), mx = hold.mass * hold.cx + (on ? on.mx : 0), mz = hold.mass * hold.cz + (on ? on.mz : 0);
      const off = Math.hypot(Math.max(0, Math.abs(mx / w - hold.x) - hold.hx), Math.max(0, Math.abs(mz / w - hold.z) - hold.hz));
      const strain = w * off / hold.studs;
      if (strain > worst) { worst = strain; worstHold = hold; }
      for (const [below, n] of hold.under) {
        const share = n / hold.studs, to = carried.get(below.hold) || { w: 0, mx: 0, mz: 0 };
        to.w += w * share; to.mx += mx * share; to.mz += mz * share;
        carried.set(below.hold, to);
      }
    };
    if (extra) visit(extra);
    for (let k = history.length - 1; k >= 0; k--) visit(history[k].hold);
    return worst;
  }
  const tooWobbly = t => strainWith(holdOf(t.type, t.i, t.j, t.rot, t.level)) > STRAIN_LIMIT;

  /* The planned tower. A place opens once the plan bricks below it are in, or can no longer be: a free build may have covered them. */
  const slots = buildPlan().map(p => ({ ...p, filled: null }));
  for (const s of slots) {
    const [nx, nz] = footprint(s.type, s.rot);
    s.needs = slots.filter(o => {
      if (o.level >= s.level) return false;
      const [ox, oz] = footprint(o.type, o.rot);
      return o.i < s.i + nx && s.i < o.i + ox && o.j < s.j + nz && s.j < o.j + oz;
    });
  }
  const covered = s => { const r = landing(s.type, s.i, s.j, s.rot); return !r || r.level > s.level; };
  const openSlots = type => slots.filter(s => {
    if (s.filled || (type && s.type !== type) || !s.needs.every(n => n.filled || covered(n))) return false;
    const r = landing(s.type, s.i, s.j, s.rot);
    return r && r.level === s.level && strainWith(holdOf(s.type, s.i, s.j, s.rot, s.level)) <= STRAIN_LIMIT;
  });

  const bricks = [], history = [];
  const placedCount = () => bricks.filter(p => p.state === 'placed').length;
  /* What colour a brick is. Grey and Brick vary a little from brick to brick; Pride follows the height it sits at. */
  const colourOf = (brickLook, shade, level) => (brickLook === 'pride' ? stripeAt(level) : brickLook === 'brick' ? BRICK_REDS[shade % BRICK_REDS.length] : stones[shade % stones.length].color);
  function paint(part, level) {
    part.stone.set(colourOf(part.look, part.shade, level));
    part.material.color.copy(part.stone);
  }
  const nextShade = () => bricks.length * 3 + 1;
  function spawn(type, look = currentLook) {
    const object = new Group();
    const shade = nextShade();
    const material = stones[shade % stones.length].clone();
    const m = new Mesh(geometryOf[type], material);
    m.castShadow = true; m.receiveShadow = true;
    object.add(m);
    object.name = TYPES[type].label;
    model.add(object);
    const part = { object, type, look, shade, state: 'flying', material, stone: new Color(), pride: new Color(), slot: null, cell: null, rest: new Vector3() };
    bricks.push(part);
    return part;
  }
  function discard(part) { model.remove(part.object); part.material.dispose(); bricks.splice(bricks.indexOf(part), 1); }

  /* The chosen brick. */
  let selected = 'b1x2', currentLook = 'grey', rot = 0, view = 0, hintsOn = false, done = false;
  const selectedRot = () => (isSquare(selected) ? 0 : rot);
  const ghost = new Group(); ghost.visible = false; overlay.add(ghost);
  /* The preview is the brick itself, in the colour it will land in, lit the same way. Nearer bricks hide it, so it never seems to sit on them;
     its rim and edges show through them, so its place can always be seen. */
  const ghostSkin = stones[0].clone();
  ghostSkin.transparent = true;
  const ghostBody = new Mesh(geometryOf[selected], ghostSkin);
  const ghostLine = new LineSegments(edgesOf[selected], new LineBasicMaterial({ color: '#ff8a1f', transparent: true, depthTest: false, toneMapped: false }));
  /* A slightly larger box seen from inside draws a rim round the whole brick, a little over two pixels at any zoom. A grey brick on the grey tower needs it.
     The mask marks the brick's own shape first, so the box paints only the rim and never across the brick or whatever hides it. */
  const ghostMask = new Mesh(geometryOf[selected], new MeshBasicMaterial({ colorWrite: false, transparent: true, depthWrite: false, depthTest: false, stencilWrite: true, stencilFunc: AlwaysStencilFunc, stencilRef: 1, stencilZPass: ReplaceStencilOp }));
  const ghostRim = new Mesh(boxOf[selected], new MeshBasicMaterial({ color: '#ff8a1f', side: BackSide, transparent: true, depthWrite: false, depthTest: false, toneMapped: false, stencilWrite: true, stencilFunc: NotEqualStencilFunc, stencilRef: 1 }));
  ghostMask.renderOrder = 4; ghostRim.renderOrder = 5; ghostBody.renderOrder = 6; ghostLine.renderOrder = 7; ghost.add(ghostMask, ghostRim, ghostBody, ghostLine);

  const hintStrong = new MeshBasicMaterial({ color: '#14808f', transparent: true, opacity: .42, depthWrite: false, depthTest: false });
  const hintFaint = new MeshBasicMaterial({ color: '#14808f', transparent: true, opacity: .14, depthWrite: false, depthTest: false });
  const hintLine = new LineBasicMaterial({ color: '#0b5a65', transparent: true, depthTest: false });
  const hintLineFaint = new LineBasicMaterial({ color: '#0b5a65', transparent: true, opacity: .45, depthTest: false });
  for (const s of slots) {
    const w = worldOf(s.type, s.i, s.j, s.rot, s.level);
    s.hint = new Group();
    s.hint.position.set(w.x, w.y, w.z); s.hint.rotation.y = w.rotY; s.hint.visible = false;
    s.body = new Mesh(boxOf[s.type], hintFaint); s.body.renderOrder = 4;
    s.line = new LineSegments(edgesOf[s.type], hintLineFaint); s.line.renderOrder = 5;
    s.hint.add(s.body, s.line);
    overlay.add(s.hint);
  }
  function showHints() {
    const open = hintsOn && !done ? openSlots() : [];
    for (const s of slots) s.hint.visible = false;
    for (const s of open) {
      const mine = s.type === selected;
      s.hint.visible = true; s.body.material = mine ? hintStrong : hintFaint; s.line.material = mine ? hintLine : hintLineFaint;
    }
    for (const b of ui.styles) b.classList.toggle('tg-suggested', open.some(s => s.type === b.dataset.type));
    dirty = true;
    return open;
  }

  /* Framing: the camera stands higher than the hero's so the studs can be seen and aimed at. It widens as the build grows. */
  const eye = new Vector3(7.4, 10.6, 10.2), look = new Vector3(0, 2.5, 0);
  const frame = { width: 1, height: 1, scale: 1 };
  const bounds = { l: -3, r: 3, t: 3, b: -3 };
  let viewAngle = 0, turning = false;
  function aimCamera() {
    camera.position.copy(eye).applyAxisAngle(Y, viewAngle);
    camera.lookAt(look);
    camera.updateMatrixWorld(true);
  }
  function wantedBounds() {
    // On short screens the lower wall runs off the bottom, so the part being built on stays large enough to aim at.
    const floor = frame.height < 480 ? heightOf(0) - .75 : -.035;
    // The view widens in steps and stays centred on the tower, so most placements do not move anything on screen.
    let reach = 1.56, room = frame.height < 480 ? 9 : 13;
    for (const p of history) {
      const [nx, nz] = footprint(p.type, p.cell.rot);
      const w = worldOf(p.type, p.cell.i, p.cell.j, p.cell.rot, p.cell.level);
      reach = Math.max(reach, Math.ceil((Math.max(Math.abs(w.x) + nx * .15, Math.abs(w.z) + nz * .15) + PITCH) / .6) * .6);
      room = Math.max(room, Math.min(MAX_PLATES, Math.ceil((p.cell.level + TYPES[p.type].plates + 9) / 6) * 6));
    }
    const box = new Box3(new Vector3(-reach, floor, -reach), new Vector3(reach, heightOf(room) + .06, reach));
    const inv = camera.matrixWorldInverse, v = new Vector3();
    let l = Infinity, r = -Infinity, b = Infinity, t = -Infinity;
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
      v.set(x, y, z).applyMatrix4(inv);
      l = Math.min(l, v.x); r = Math.max(r, v.x); b = Math.min(b, v.y); t = Math.max(t, v.y);
    }
    // Rubble counts only as far as it reaches, so the view widens no more than it must.
    for (const p of bricks) if (p.state === 'debris') {
      v.copy(p.object.position).applyMatrix4(inv);
      l = Math.min(l, v.x - .8); r = Math.max(r, v.x + .8); b = Math.min(b, v.y - .8); t = Math.max(t, v.y + .8);
    }
    const margin = 1.03, aspect = frame.width / frame.height;
    const halfH = Math.max((t - b) / 2, (r - l) / 2 / aspect) * margin, halfW = halfH * aspect;
    const cx = (l + r) / 2, cy = (t + b) / 2;
    return { l: cx - halfW, r: cx + halfW, t: cy + halfH, b: cy - halfH };
  }
  function applyBounds() {
    camera.left = bounds.l; camera.right = bounds.r; camera.top = bounds.t; camera.bottom = bounds.b;
    camera.updateProjectionMatrix();
    frame.scale = frame.height / (bounds.t - bounds.b);
    dirty = true;
  }
  function fitNow() { Object.assign(bounds, wantedBounds()); applyBounds(); }
  function resize() {
    const { width, height: h } = ui.stage.getBoundingClientRect();
    if (!width || !h) return;
    renderer.setSize(width, h, false);
    frame.width = width; frame.height = h;
    aimCamera(); fitNow();
  }
  const project = v => { const p = v.clone().project(camera); return { x: (p.x + 1) / 2 * frame.width, y: (1 - p.y) / 2 * frame.height }; };
  const toCanvas = e => { const r = ui.canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const raycaster = new Raycaster(), ndc = new Vector2();
  function castRay(point) { raycaster.setFromCamera(ndc.set(point.x / frame.width * 2 - 1, 1 - point.y / frame.height * 2), camera); return raycaster.ray; }

  /* Is this point inside something solid in column (i, j): the foundation, a brick, or the stud on top of either? */
  function solidAt(i, j, x, y, z) {
    const c = at(i, j), stud = Math.hypot(x - cellX(i), z - cellX(j)) <= .087;
    const above = stud ? STUD : -BODY_GAP;
    if (baseTops[c] === 0 && y <= heightOf(0) + above) return true;
    for (const [lo, hi] of spans[c]) if (y >= heightOf(lo) && y <= heightOf(hi) + above) return true;
    return false;
  }
  /* The square whose surface the pointer is on: walk along the pointer's line from above until it meets something solid.
     A gap under an overhang stays a gap, so what shows through it can be pointed at. */
  function surfaceCell(point) {
    const { origin: o, direction: d } = castRay(point);
    const t0 = (heightOf(MAX_PLATES) + .06 - o.y) / d.y, t1 = (heightOf(0) - .12 - o.y) / d.y;
    for (let t = t0; t <= t1; t += .015) {
      const x = o.x + d.x * t, z = o.z + d.z * t, i = Math.floor(x / PITCH), j = Math.floor(z / PITCH);
      if (inGrid(i, j, 1, 1) && solidAt(i, j, x, o.y + d.y * t, z)) return { i, j };
    }
    return null;
  }
  const SNAP_RADIUS = 34, TOUCH_LIFT = 60, TAP_SLOP = 10, STACK_RADIUS = coarse.matches ? 10 : 6, BOUNCE_MS = 60;
  /* Clicking again without moving away stacks straight on the brick just placed. Left to the pointer alone, the taller stack
     would put its side under the pointer, and each brick would land a stud across from the last. */
  const stillOn = point => lastPlaced && Math.hypot(point.x - lastPlaced.x, point.y - lastPlaced.y) <= STACK_RADIUS;
  function targetAt(point) {
    if (stillOn(point)) {
      const turn = selectedRot(), [nx, nz] = footprint(selected, turn);
      if (inGrid(lastPlaced.i, lastPlaced.j, nx, nz)) {
        const r = landing(selected, lastPlaced.i, lastPlaced.j, turn);
        return r ? makeTarget(selected, lastPlaced.i, lastPlaced.j, turn, r) : null;
      }
    }
    return freeTargetAt(point);
  }
  /* The spot for the chosen brick under the pointer. Only distance on screen decides between spots. */
  function freeTargetAt(point) {
    const type = selected, turn = selectedRot(), [nx, nz] = footprint(type, turn);
    const floorOf = (i, j, r) => { const w = worldOf(type, i, j, turn, r.level); return project(new Vector3(w.x, w.floor, w.z)); };
    let best = null, bestD = Infinity;
    const consider = (i, j) => {
      const r = landing(type, i, j, turn);
      if (!r) return;
      const s = floorOf(i, j, r), d = Math.hypot(s.x - point.x, s.y - point.y);
      if (d < bestD) { bestD = d; best = { i, j, r }; }
    };
    const hit = surfaceCell(point);
    if (hit) for (let a = hit.i - nx + 1; a <= hit.i; a++) for (let b = hit.j - nz + 1; b <= hit.j; b++) consider(a, b);
    if (best) return makeTarget(type, best.i, best.j, turn, best.r);
    // Pointing at air beside the tower: the nearest spot, so bricks can hang over the edge.
    for (let i = MIN_CELL; i <= MAX_CELL; i++) for (let j = MIN_CELL; j <= MAX_CELL; j++) consider(i, j);
    return best && bestD <= SNAP_RADIUS ? makeTarget(type, best.i, best.j, turn, best.r) : null;
  }

  let dirty = true, running = false, raf = 0, last = 0, drag = null, celebrate = null, aim = null, cursor = null, lastPoint = null, cleared = null, batches = 0, lastPlaced = null, doneAt = -1000;
  const flights = new Set(), rubbleOut = new Set();
  let toppling = false, collapse = null, collapseWait = 0, cannon = null, lastCollapse = null, reframeIn = 0;
  const stats = { refused: 0, toppled: 0, misses: 0, drops: 0, undos: 0, lost: 0, frames: 0, rotates: 0, turns: 0, keyboard: 0 };

  const say = text => { ui.live.textContent = text; };
  const WOBBLY_HINT = 'Too wobbly here: a brick in this spot would bring the tower down.';
  const defaultHint = () => {
    const open = hintsOn ? openSlots() : [];
    if (hintsOn && open.length) return "Teal boxes show the plan's next places. Dark ones fit your brick; dotted bricks fit the rest.";
    if (hintsOn) return slots.every(s => s.filled) ? 'The planned tower is complete. Keep building if you like.' : 'Your build has covered the rest of the plan, or left it too wobbly. Keep building, or undo to bring it back.';
    return coarse.matches ? 'Pick a brick, then tap the tower. Drag to aim, and turn bricks with Rotate.' : 'Press 1 to 9 or 0 for a brick, then click the tower. R rotates the brick and T turns the view.';
  };
  function refresh() {
    const n = placedCount();
    ui.count.textContent = n === 1 ? '1 brick' : `${n} bricks`;
    ui.done.textContent = done ? 'Build on' : 'Done';
    ui.done.setAttribute('aria-label', done ? 'Build on' : 'Done building');
    ui.done.disabled = toppling || (!history.length && !done);
    ui.undo.disabled = !history.length && !cleared;
    ui.restart.disabled = !history.length;
    ui.plan.hidden = !hintsOn;
    const open = showHints();
    ui.next.disabled = ui.finish.disabled = toppling || !open.length;
    if (!done && !drag && !toppling) ui.hint.textContent = defaultHint();
    dirty = true;
  }
  function select(type) {
    selected = type;
    for (const b of ui.styles) b.setAttribute('aria-pressed', String(b.dataset.type === type));
    ghostBody.geometry = ghostMask.geometry = geometryOf[type]; ghostLine.geometry = edgesOf[type]; ghostRim.geometry = boxOf[type];
    updateFlips();
    ui.rotate.disabled = isSquare(type);
    refresh();
    updateAim();
  }
  function setLook(look) {
    currentLook = look;
    for (const b of ui.looks) b.setAttribute('aria-pressed', String(b.dataset.look === look));
    for (const b of ui.styles) b.querySelector('img').src = pictures[look][b.dataset.type];
    updateAim();
  }
  /* The picture of a turned brick is close to its mirror image, and turning the view swaps which way bricks appear to run. */
  function updateFlips() { for (const b of ui.styles) b.classList.toggle('tg-flip', !isSquare(b.dataset.type) && (rot + view) % 2 === 1); }
  function rotateBrick() {
    if (isSquare(selected)) return;
    rot = 1 - rot; stats.rotates++; updateFlips(); updateAim();
    if (!done && !drag) ui.hint.textContent = 'Brick rotated. The pictures below show which way it now runs.';
    say(rot ? 'Brick rotated.' : 'Brick rotated back.');
  }
  function setAim(target) {
    aim = target;
    ghost.visible = Boolean(target);
    const wobbly = Boolean(target) && tooWobbly(target);
    if (target) {
      ghost.position.set(target.x, target.y, target.z); ghost.rotation.y = target.rotY;
      ghostSkin.color.set(wobbly ? '#e01414' : colourOf(currentLook, nextShade(), target.level));
      ghostSkin.opacity = wobbly ? .6 : 1;
      const edge = wobbly ? '#e01414' : '#ff8a1f', t = TYPES[target.type], rim = 2.5 / frame.scale * 2, solid = n => n - .014;
      ghostLine.material.color.set(edge); ghostRim.material.color.set(edge);
      ghostRim.scale.set((solid(t.nx * PITCH) + rim) / solid(t.nx * PITCH), (solid(t.plates * PLATE) + rim) / solid(t.plates * PLATE), (solid(t.nz * PITCH) + rim) / solid(t.nz * PITCH));
    }
    ui.canvas.style.cursor = wobbly ? 'not-allowed' : '';
    if (wobbly) ui.hint.textContent = WOBBLY_HINT;
    else if (ui.hint.textContent === WOBBLY_HINT) ui.hint.textContent = defaultHint();
    dirty = true;
  }
  function updateAim() {
    if (done || toppling) setAim(null);
    else if (drag && drag.point) setAim(targetAt(drag.point));
    else if (cursor) keyAim();
    else if (lastPoint) setAim(targetAt(lastPoint));
  }

  function commit(part, target) {
    const [nx, nz] = footprint(part.type, target.rot);
    part.cell = { i: target.i, j: target.j, rot: target.rot, level: target.level };
    part.hold = holdOf(part.type, target.i, target.j, target.rot, target.level);
    part.rest.set(target.x, target.y, target.z);
    part.object.quaternion.setFromAxisAngle(Y, target.rotY);
    paint(part, target.level);
    const slot = slots.find(s => !s.filled && s.type === part.type && s.i === target.i && s.j === target.j && s.rot === target.rot && s.level === target.level) || null;
    part.slot = slot;
    if (slot) slot.filled = part;
    cellsOf(target.i, target.j, nx, nz, c => { tops[c] = target.level + TYPES[part.type].plates; topOwner[c] = part; spans[c].push([target.level, tops[c]]); });
    history.push(part);
  }
  function land(part) {
    part.state = 'placed';
    part.object.position.copy(part.rest);
    say(`${TYPES[part.type].label} placed. ${placedCount()} in all.`);
    refresh();
    if (part.finishing && !flights.size) finishRun();
    if (part.topples) { part.topples = false; startCollapse(); }
  }
  /* Every brick comes straight down, the only way it can reach its place. */
  function drop(part, delay = 0) {
    const d = reduced.matches ? 0 : .24, high = part.rest.y + .7;
    part.object.position.set(part.rest.x, high, part.rest.z);
    if (delay > 0 && !reduced.matches) part.object.visible = false;
    if (!d) { land(part); return; }
    flights.add({ part, t: -delay, d, high });
    dirty = true;
  }
  function placeBrick(target, anyway = false) {
    if (toppling) return null;
    if (bricks.length >= MAX_BRICKS) { ui.hint.textContent = `That is ${MAX_BRICKS} bricks, the most this version allows.`; return null; }
    if (!anyway && tooWobbly(target)) { showWarning(target); return null; }
    if (done) leaveDone();
    cleared = null;
    clearRubble();
    const part = spawn(target.type);
    part.batch = ++batches;
    commit(part, target);
    drop(part);
    refresh();
    return part;
  }
  /* The warning holds the game back until it is dismissed, then puts focus and the keyboard cursor back where they were. */
  let warnCursor = null, warnTarget = null;
  function showWarning(target) {
    stats.refused++;
    warnTarget = target;
    loadPhysics().catch(() => {});
    warnCursor = cursor && document.activeElement === ui.stage ? { ...cursor } : null;
    lastPoint = null;
    setAim(null);
    ui.warn.hidden = false; ui.wrap.inert = true;
    ui.warnGo.focus({ preventScroll: true });
  }
  function hideWarning() {
    ui.warn.hidden = true; ui.wrap.inert = false;
    if (warnCursor) { ui.stage.focus({ preventScroll: true }); ui.stage.classList.add('tg-keys'); cursor = warnCursor; warnCursor = null; keyAim(); }
    else ui.styles.find(b => b.getAttribute('aria-pressed') === 'true').focus({ preventScroll: true });
  }
  /* Place it anyway: the brick lands, the overloaded joint gives way, and what it held falls. Undo puts everything back as it was. */
  async function placeAnyway() {
    const target = warnTarget;
    hideWarning();
    toppling = true;
    refresh();
    try { cannon = await loadPhysics(); } catch { toppling = false; refresh(); ui.hint.textContent = 'The physics file did not load, so nothing was placed.'; return; }
    if (!toppling) return;
    const before = snapshot();
    toppling = false;
    const part = placeBrick(target, true);
    toppling = true;
    cleared = before;
    cleared.wipe = true;
    part.topples = true;
    ui.hint.textContent = 'Here goes…';
    refresh();
    if (part.state === 'placed' && part.topples) { part.topples = false; startCollapse(); }
  }
  const snapshot = () => history.map(p => ({ type: p.type, cell: p.cell, batch: p.batch, look: p.look, shade: p.shade }));
  /* Which bricks fall: the one with the worst load, then everything above it, even what also rests elsewhere: left standing, that would hold the load up.
     If what stays is still overloaded, it goes round again. */
  function failingBricks() {
    const fallen = [], grips = [], leans = [];
    for (let round = 0; round < 60 && strainWith() > STRAIN_LIMIT; round++) {
      const first = history.find(p => p.hold === worstHold), gone = new Set([first]);
      leans.push({ part: first, x: PITCH * first.hold.x, z: PITCH * first.hold.z });
      for (const p of history) {
        if (p !== first && [...p.hold.under.keys()].some(q => gone.has(q))) gone.add(p);
      }
      for (const p of gone) if (p !== first) for (const [q, studs] of p.hold.under) if (gone.has(q)) grips.push({ a: p, b: q, studs });
      for (let k = history.length - 1; k >= 0; k--) if (gone.has(history[k])) history.splice(k, 1);
      for (const p of gone) { if (p.slot) p.slot.filled = null; p.slot = null; p.state = 'debris'; fallen.push(p); }
      rebuildGrid();
    }
    return { fallen, grips, leans };
  }
  const boxOfPart = p => {
    const [nx, nz] = footprint(p.type, p.cell.rot), w = worldOf(p.type, p.cell.i, p.cell.j, p.cell.rot, p.cell.level);
    return { x: w.x, y: w.y, z: w.z, hx: nx * PITCH / 2 - .002, hy: TYPES[p.type].plates * PLATE / 2 - .002, hz: nz * PITCH / 2 - .002, rotY: w.rotY };
  };
  /* The foundation as the physics sees it: four walls with their doorways, a deck, and a hollow inside. */
  function foundationBoxes() {
    const top = foundationTop, low = -.035, E = 1.2, T = .3, mid = (a, b) => (a + b) / 2;
    const span = (x0, x1, y0, y1, z0, z1) => ({ x: mid(x0, x1), y: mid(y0, y1), z: mid(z0, z1), hx: (x1 - x0) / 2, hy: (y1 - y0) / 2, hz: (z1 - z0) / 2 });
    const front = .45, frontTop = .96 + .45 - .187, right = .36, rightTop = .81 + .36 - .187;
    return [
      span(-E, E, low, top, -E, -E + T), span(-E, -E + T, low, top, -E + T, E - T),
      span(-E, -front, low, top, E - T, E), span(front, E, low, top, E - T, E), span(-front, front, frontTop, top, E - T, E),
      span(E - T, E, low, top, -E + T, -right), span(E - T, E, low, top, right, E - T), span(E - T, E, rightTop, top, -right, right),
      span(-E + T, E - T, top - PLATE, top, -E + T, E - T)
    ];
  }
  function startCollapse() {
    lastPlaced = null;
    const { fallen, grips, leans } = failingBricks();
    const index = new Map(fallen.map((p, k) => [p, k]));
    const pieces = fallen.map(p => ({ object: p.object, ...boxOfPart(p) }));
    collapse = createCollapse(cannon, {
      pieces, shell: foundationBoxes(), standing: history.map(boxOfPart), groundY: -.035,
      grips: grips.map(g => ({ a: index.get(g.a), b: index.get(g.b), studs: g.studs })),
      leans: leans.map(l => ({ piece: index.get(l.part), x: l.x, z: l.z }))
    });
    stats.toppled++;
    lastCollapse = { fell: fallen.length, stayed: history.length, clumpsAtStart: collapse.clumps };
    collapseWait = reduced.matches ? 0 : .14;
    if (reduced.matches) { collapse.finish(); endCollapse(); }
    dirty = true;
  }
  function endCollapse() {
    const n = lastCollapse.fell;
    lastCollapse.seconds = +collapse.time.toFixed(2); lastCollapse.clumpsAtEnd = collapse.clumps;
    collapse = null; toppling = false;
    refit();
    refresh();
    updateAim();
    const text = `Down it came: ${n === 1 ? '1 brick' : `${n} bricks`} fell. Undo puts ${n === 1 ? 'it' : 'them'} back, and your next brick clears the rubble.`;
    ui.hint.textContent = text;
    say(text);
  }
  function clearRubble() {
    for (const p of bricks) if (p.state === 'debris') {
      p.state = 'gone';
      rubbleOut.add({ part: p, t: reduced.matches ? 1 : 0 });
    }
    dirty = true;
  }
  function planTarget(s) { return makeTarget(s.type, s.i, s.j, s.rot, landing(s.type, s.i, s.j, s.rot)); }
  function placeNext() {
    if (toppling) return;
    if (done) leaveDone();
    const s = openSlots().sort((a, b) => a.level - b.level)[0];
    if (s) { placeBrick(planTarget(s)); stats.drops++; }
    refresh();
  }
  function finishAll() {
    if (toppling) return;
    if (done) leaveDone();
    clearRubble();
    let delay = 0, part = null;
    cleared = null; batches++;
    for (let s = openSlots().sort((a, b) => a.level - b.level)[0]; s; s = openSlots().sort((a, b) => a.level - b.level)[0]) {
      part = spawn(s.type);
      part.batch = batches;
      commit(part, planTarget(s));
      drop(part, delay);
      delay += .07;
    }
    if (part) { part.finishing = true; if (!flights.size) finishRun(); }
    refresh();
  }
  function rebuildGrid() {
    tops.set(baseTops);
    topOwner.fill(null);
    for (const list of spans) list.length = 0;
    for (const p of history) { const [nx, nz] = footprint(p.type, p.cell.rot); p.hold = holdOf(p.type, p.cell.i, p.cell.j, p.cell.rot, p.cell.level); cellsOf(p.cell.i, p.cell.j, nx, nz, c => { tops[c] = p.cell.level + TYPES[p.type].plates; topOwner[c] = p; spans[c].push([p.cell.level, tops[c]]); }); }
  }
  function refit() { framing = { from: { ...bounds }, to: wantedBounds(), t: 0 }; dirty = true; }
  let framing = null;
  function leaveDone() { lastPlaced = null; done = false; celebrate = null; model.rotation.y = 0; paintStone(); }
  /* Undo takes back the last action: one brick, everything Build rest added, or Start again. */
  function undo() {
    if (drag) return;
    lastPlaced = null;
    if (cleared?.wipe) wipe();
    if (cleared) { restore(); return; }
    if (!history.length) return;
    if (done) leaveDone();
    const batch = history[history.length - 1].batch;
    while (history.length && history[history.length - 1].batch === batch) {
      const part = history.pop();
      for (const f of flights) if (f.part === part) flights.delete(f);
      if (part.slot) part.slot.filled = null;
      discard(part);
    }
    stats.undos++;
    rebuildGrid();
    refit();
    say(`Undone. ${placedCount()} left.`);
    refresh();
    updateAim();
  }
  /* Everything off the board, with no record kept: the way back to how things stood before a collapse. */
  function wipe() {
    collapse = null; toppling = false; celebrate = null; done = false; model.rotation.y = 0; flights.clear(); rubbleOut.clear(); history.length = 0;
    for (const s of slots) s.filled = null;
    for (const p of [...bricks]) discard(p);
    rebuildGrid();
  }
  function restore() {
    for (const { type, cell, batch, look, shade } of cleared) {
      const part = spawn(type, look);
      part.shade = shade ?? part.shade;
      part.batch = batch;
      commit(part, makeTarget(type, cell.i, cell.j, cell.rot, { level: cell.level, studs: 0 }));
      land(part);
    }
    cleared = null;
    stats.undos++;
    refit();
    say(`Build restored. ${placedCount()} bricks.`);
    refresh();
  }
  function restart() {
    lastPlaced = null;
    const keep = cleared?.wipe ? cleared : history.length ? snapshot() : null;
    collapse = null; toppling = false; rubbleOut.clear();
    cleared = keep;
    celebrate = null; done = false; flights.clear(); model.rotation.y = 0; history.length = 0; rot = 0; updateFlips();
    for (const s of slots) s.filled = null;
    for (const p of [...bricks]) discard(p);
    rebuildGrid();
    refit();
    say('All bricks cleared. Undo brings them back.');
    refresh();
    if (cleared) ui.hint.textContent = 'All bricks cleared. Undo brings them back.';
    ui.styles.find(b => b.dataset.type === selected).focus();
  }
  function paintStone() { for (const p of bricks) p.material.color.copy(p.stone); dirty = true; }
  function finishRun() {
    done = true;
    setAim(null);
    const plan = slots.every(s => s.filled) && history.every(p => p.slot);
    const n = history.length;
    ui.hint.textContent = plan ? 'Tower built to the plan.' : `Your tower is finished: ${n} ${n === 1 ? 'brick' : 'bricks'}. Build on, or start again.`;
    say(ui.hint.textContent);
    // Pride stripes up the tower, as on the homepage: grey bricks take the colour of their height. Bricks given a look keep it.
    const levels = history.map(p => p.cell.level);
    for (const p of history) { if (p.look === 'grey') p.pride.set(stripeAt(p.cell.level)); else p.pride.copy(p.stone); }
    refresh();
    if (reduced.matches) { for (const p of bricks) p.material.color.copy(p.pride); dirty = true; return; }
    celebrate = { t: 0, top: Math.max(1, ...levels) };
  }

  /* Pointing. A mouse shows where the brick would go before pressing. On touch, a tap places under the finger;
     a drag lifts the outline above the finger so it stays in sight. Bricks can also be dragged from the picker. */
  function pointFor(e) {
    const point = toCanvas(e);
    if (e.pointerType === 'touch' && drag) {
      const moved = Math.hypot(point.x - drag.down.x, point.y - drag.down.y);
      if (moved >= TAP_SLOP) drag.lift = Math.max(drag.lift, Math.min(TOUCH_LIFT, moved * 1.5));
      point.y -= drag.lift;
    }
    return point;
  }
  const insideCanvas = p => p.x >= 0 && p.y >= 0 && p.x <= frame.width && p.y <= frame.height;
  function onDown(e) {
    // A finished tower is only looked at: Build on goes back to building.
    if (drag || !running || done || toppling || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const point = toCanvas(e);
    e.preventDefault();
    if (!stillOn(point)) lastPlaced = null;
    ui.stage.classList.remove('tg-keys');
    cursor = null;
    ui.canvas.setPointerCapture(e.pointerId);
    drag = { id: e.pointerId, down: point, lift: 0, point };
    setAim(targetAt(point));
  }
  function onTrayDown(e) {
    const b = e.target.closest('.tg-style');
    if (!b || drag || !running) return;
    select(b.dataset.type);
    b.releasePointerCapture?.(e.pointerId);
    drag = { id: e.pointerId, down: toCanvas(e), lift: e.pointerType === 'touch' ? TOUCH_LIFT : 0, fromTray: true, point: null };
    cursor = null;
  }
  function onMove(e) {
    if (drag && e.pointerId === drag.id) {
      const point = pointFor(e);
      drag.point = insideCanvas(point) ? point : null;
      if (drag.point && !stillOn(drag.point)) lastPlaced = null;
      setAim(drag.point && !toppling ? targetAt(drag.point) : null);
    } else if (!drag && e.pointerType === 'mouse' && running && e.target === ui.canvas) {
      lastPoint = toCanvas(e); cursor = null;
      if (!stillOn(lastPoint)) lastPlaced = null;
      setAim(done || toppling ? null : targetAt(lastPoint));
    }
  }
  function onUp(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const { fromTray, point } = drag, cancelled = e.type !== 'pointerup';
    const release = !cancelled && point && drag.point;
    drag = null;
    // A short press on the picker only chooses the brick.
    if (release && !done && !toppling) {
      const target = targetAt(point), now = performance.now();
      // Faster than anyone clicks on purpose, this is a switch bouncing or a finger landing twice.
      const repeat = lastPlaced && now - lastPlaced.t < BOUNCE_MS && stillOn(point);
      if (target && !repeat && placeBrick(target)) { stats.drops++; lastPlaced = { t: now, x: point.x, y: point.y, i: target.i, j: target.j }; }
      else if (!target && !fromTray && !repeat) { stats.misses++; ui.hint.textContent = surfaceCell(point) ? 'That stack has reached the height limit.' : 'No studs there. Point at the top of the tower.'; }
    }
    if (e.pointerType === 'mouse' && lastPoint && !cancelled && !done && !toppling) { setAim(targetAt(toCanvas(e))); } else setAim(null);
    lastPoint = e.pointerType === 'mouse' ? lastPoint : null;
  }
  let keyTabbing = false;
  /* Keyboard: a cursor moves over the squares, as a pointer would, and Enter places the brick. */
  function keyAim() {
    const [nx, nz] = footprint(selected, selectedRot());
    cursor.i = Math.min(cursor.i, MAX_CELL - nx + 1); cursor.j = Math.min(cursor.j, MAX_CELL - nz + 1);
    const r = landing(selected, cursor.i, cursor.j, selectedRot());
    setAim(r && !toppling ? makeTarget(selected, cursor.i, cursor.j, selectedRot(), r) : null);
    return r;
  }
  function onKey(e) {
    const k = e.key.toLowerCase();
    if (e.ctrlKey || e.metaKey || e.altKey || !ui.note.hidden || !ui.warn.hidden) return;
    // By physical key, because some keyboards need Shift for digits.
    const digit = /^(?:Digit|Numpad)(\d)$/.exec(e.code)?.[1] ?? (/^\d$/.test(k) ? k : null);
    if (digit !== null) { const type = TYPE_KEYS[(+digit + 9) % 10]; select(type); say(`${TYPES[type].label} chosen.`); return; }
    if (k === 'r') { rotateBrick(); return; }
    if (k === 't') { turnView(); return; }
    if (k === 'tab') keyTabbing = true;
    if (e.target !== ui.stage) return;
    const steps = { arrowleft: [-1, 0], arrowright: [1, 0], arrowup: [0, -1], arrowdown: [0, 1] }[k];
    if (steps) {
      e.preventDefault();
      if (!cursor) cursor = { i: 0, j: 0 };
      else {
        let [di, dj] = steps;
        for (let v = 0; v < view; v++) [di, dj] = [dj, -di];
        const [nx, nz] = footprint(selected, selectedRot());
        cursor.i = Math.max(MIN_CELL, Math.min(MAX_CELL - nx + 1, cursor.i + di));
        cursor.j = Math.max(MIN_CELL, Math.min(MAX_CELL - nz + 1, cursor.j + dj));
      }
      const r = keyAim();
      say(r ? `Column ${cursor.i + 5}, row ${cursor.j + 5}, height ${r.level}, held by ${r.studs} ${r.studs === 1 ? 'stud' : 'studs'}${aim && tooWobbly(aim) ? ', too wobbly' : ''}.` : `Column ${cursor.i + 5}, row ${cursor.j + 5}: nothing to build on.`);
    } else if ((k === 'enter' || k === ' ') && cursor && !done && !toppling) {
      e.preventDefault();
      const r = keyAim();
      if (r) { if (placeBrick(makeTarget(selected, cursor.i, cursor.j, selectedRot(), r))) { stats.keyboard++; stats.drops++; keyAim(); } }
      else say('Nothing to build on here.');
    }
  }
  function turnView() {
    if (turning) return;
    lastPlaced = null;
    view = (view + 1) % 4; stats.turns++;
    turning = { from: viewAngle, to: viewAngle + Math.PI / 2, t: 0 };
    updateFlips();
    setAim(null);
    say(`View turned, side ${view + 1} of 4.`);
    if (reduced.matches) { turning.t = 1; endTurn(); }
    dirty = true;
  }
  function endTurn() {
    viewAngle = turning.to % (Math.PI * 2); turning = false;
    aimCamera(); fitNow(); updateAim();
  }

  ui.canvas.addEventListener('pointerdown', onDown);
  ui.tray.addEventListener('pointerdown', onTrayDown);
  ui.d.addEventListener('pointermove', onMove);
  ui.d.addEventListener('pointerup', onUp);
  ui.d.addEventListener('pointercancel', onUp);
  ui.d.addEventListener('keydown', onKey);
  ui.canvas.addEventListener('pointerleave', () => { if (!drag) { lastPoint = null; setAim(null); } });
  ui.stage.addEventListener('focus', () => { ui.stage.classList.toggle('tg-keys', keyTabbing); keyTabbing = false; });
  ui.stage.addEventListener('blur', () => { if (cursor) { cursor = null; setAim(null); } });
  ui.tray.addEventListener('click', e => { const b = e.target.closest('.tg-style'); if (b) { select(b.dataset.type); say(`${TYPES[b.dataset.type].label} chosen.`); } });
  ui.d.querySelector('#tg-looks').addEventListener('click', e => {
    const b = e.target.closest('.tg-look');
    if (!b) return;
    setLook(b.dataset.look);
    const text = { grey: 'New bricks will be grey. Done gives grey bricks their pride stripes.', brick: 'New bricks will be red brick. Bricks already placed keep their look.', pride: 'New bricks take a pride colour from their height, so stripes rise as you build.' }[b.dataset.look];
    if (!done && !drag) ui.hint.textContent = text;
    say(text);
  });
  ui.warnGo.addEventListener('click', hideWarning);
  ui.warnAnyway.addEventListener('click', placeAnyway);
  // Holding Enter must not dismiss the warning and set it off again.
  ui.warn.addEventListener('keydown', e => { if (e.repeat) e.preventDefault(); });
  ui.rotate.addEventListener('click', rotateBrick);
  ui.view.addEventListener('click', turnView);
  ui.undo.addEventListener('click', undo);
  ui.next.addEventListener('click', placeNext);
  ui.finish.addEventListener('click', finishAll);
  ui.restart.addEventListener('click', restart);
  ui.done.addEventListener('click', () => {
    // Done and Build on share a button, so a double press must not count twice.
    if (performance.now() - doneAt < 400) return;
    doneAt = performance.now();
    if (done) { leaveDone(); refresh(); updateAim(); } else if (history.length) finishRun();
  });
  ui.hints.addEventListener('click', () => {
    hintsOn = !hintsOn;
    ui.hints.setAttribute('aria-pressed', String(hintsOn));
    refresh();
    updateAim();
    say(hintsOn ? `Hints on. ${openSlots().length} places outlined.` : 'Hints off.');
  });

  let lost = false;
  ui.canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); lost = true; ui.hint.textContent = 'The browser reset its graphics. Waiting for it to come back.'; stats.lost++; });
  ui.canvas.addEventListener('webglcontextrestored', () => { lost = false; resize(); refresh(); });

  function tick(ms) {
    raf = 0;
    if (!running) return;
    const dt = Math.min(.05, last ? (ms - last) / 1000 : 0); last = ms;
    const landed = [];
    for (const f of [...flights]) {
      f.t += dt;
      if (f.t < 0) continue;
      f.part.object.visible = true;
      const p = clamp(f.t / f.d), q = p * p;
      f.part.object.position.y = f.high + (f.part.rest.y - f.high) * q;
      dirty = true;
      if (p === 1) { flights.delete(f); landed.push(f.part); }
    }
    for (const part of landed) { land(part); if (!framing) refit(); }
    if (collapse) {
      collapseWait -= dt;
      if (collapseWait <= 0) collapse.advance(dt);
      dirty = true;
      // The view widens if the rubble reaches past it.
      reframeIn -= dt;
      if (reframeIn <= 0 && !framing) { reframeIn = .25; const want = wantedBounds(); if (want.t - want.b > bounds.t - bounds.b + .01) refit(); }
      if (collapse.settled) endCollapse();
    }
    for (const out of [...rubbleOut]) {
      out.t += dt / .25;
      const s = 1 - clamp(out.t);
      out.part.object.scale.setScalar(Math.max(.001, s));
      dirty = true;
      if (out.t >= 1) { rubbleOut.delete(out); discard(out.part); if (!framing) refit(); }
    }
    if (framing) {
      framing.t += dt / .28;
      const q = reduced.matches ? 1 : smooth(framing.t);
      for (const k of 'lrtb') bounds[k] = framing.from[k] + (framing.to[k] - framing.from[k]) * q;
      applyBounds();
      if (framing.t >= 1 || reduced.matches) { framing = null; updateAim(); }
    }
    if (turning) {
      turning.t += dt / .42;
      viewAngle = turning.from + (turning.to - turning.from) * smooth(turning.t);
      aimCamera(); fitNow();
      if (turning.t >= 1) endTurn();
    }
    if (celebrate) {
      celebrate.t += dt;
      const phase = clamp(celebrate.t / 3);
      for (const p of history) p.material.color.lerpColors(p.stone, p.pride, smooth((phase - clamp(p.cell.level / celebrate.top) * .6) / .4));
      model.rotation.y = celebrate.t > 3 ? smooth((celebrate.t - 3) / 3) * Math.PI * 2 : 0;
      if (celebrate.t > 6) { celebrate = null; model.rotation.y = 0; }
      dirty = true;
    }
    if (dirty && !lost) { renderer.render(scene, camera); stats.frames++; dirty = false; }
    raf = requestAnimationFrame(tick);
  }
  const start = () => { if (running) return; running = true; last = 0; dirty = true; raf = requestAnimationFrame(tick); };
  const stop = () => { running = false; cancelAnimationFrame(raf); raf = 0; if (drag) onUp({ pointerId: drag.id, type: 'pointercancel' }); if (!ui.warn.hidden) { warnCursor = null; hideWarning(); } setAim(null); };

  /* Pictures for the picker, drawn once in each look with the game's own bricks and lights. */
  const pictures = { grey: {}, brick: {}, pride: {} };
  function drawPicker() {
    const s = new Scene();
    s.add(new HemisphereLight(0xffffff, 0x8b8379, 2.1));
    const light = new DirectionalLight(0xfffbf6, 3.2); light.position.set(-3, 11, 6); s.add(light);
    const c = new OrthographicCamera(-.82, .82, .5, -.5, .1, 20);
    c.position.set(3.7, 4.4, 5.1); c.lookAt(0, 0, 0);
    const m = new Mesh(geometryOf.b1x1, stones[4]);
    s.add(m);
    renderer.setSize(164, 100, false);
    const red = stones[4].clone(); red.color.set(BRICK_REDS[0]);
    const pale = stones[4].clone(); pale.color.set('#d5dadc');
    // Pride pictures are washed with all six stripes, because the colour a brick gets depends on where it lands.
    const wash = document.createElement('canvas'); wash.width = 164; wash.height = 100;
    const x = wash.getContext('2d'), bands = x.createLinearGradient(30, 0, 134, 0);
    STRIPES.forEach((c, n) => { bands.addColorStop(n / 6, c); bands.addColorStop((n + 1) / 6, c); });
    for (const k of TYPE_KEYS) {
      m.geometry = geometryOf[k];
      m.material = stones[4]; renderer.render(s, c); pictures.grey[k] = ui.canvas.toDataURL();
      m.material = red; renderer.render(s, c); pictures.brick[k] = ui.canvas.toDataURL();
      m.material = pale; renderer.render(s, c);
      x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, 164, 100); x.drawImage(ui.canvas, 0, 0);
      x.globalCompositeOperation = 'multiply'; x.fillStyle = bands; x.fillRect(0, 0, 164, 100);
      x.globalCompositeOperation = 'destination-in'; x.drawImage(ui.canvas, 0, 0);
      pictures.pride[k] = wash.toDataURL();
    }
    // The same long brick both ways round, for the how-to-play note.
    m.geometry = geometryOf.b1x4; m.material = stones[4];
    renderer.render(s, c); ui.d.querySelector('#tg-turn-a').src = ui.canvas.toDataURL();
    m.rotation.y = Math.PI / 2; renderer.render(s, c); ui.d.querySelector('#tg-turn-b').src = ui.canvas.toDataURL();
  }

  drawPicker();
  aimCamera();
  resize();
  new ResizeObserver(() => { resize(); if (running) renderer.render(scene, camera); }).observe(ui.stage);
  setLook(currentLook);
  select(selected);

  return { hideWarning, strainWith, holdOf, tooWobbly, STRAIN_LIMIT, ghostSkin, ghostLine, ghostBody, colourOf, start, stop, resize, renderer, stats, bricks, slots, camera, scene, model, ghost, overlay, project, placedCount, frame, openSlots, landing, targetAt, freeTargetAt, surfaceCell, history, flights, commit, land, spawn, restart, undo, select, rotateBrick, turnView, placeBrick, makeTarget, castRay, raycaster, get drag() { return drag; }, get aim() { return aim; }, get cursor() { return cursor; }, get busy() { return Boolean(flights.size || framing || turning || toppling); }, get toppling() { return toppling; }, get collapse() { return collapse; }, get lastCollapse() { return lastCollapse; }, get worstHold() { return worstHold; }, get selected() { return selected; }, get look() { return currentLook; }, get view() { return view; }, get hintsOn() { return hintsOn; }, get done() { return done; }, get rot() { return selectedRot(); }, MIN_CELL, MAX_CELL, MAX_PLATES, mesh, foundationTop, TYPES, TYPE_KEYS, footprint, heightOf };
}

/* The how-to-play note: shown the first time the game opens, and again from the ? button. */
let noteSeen = false;
function showNote() {
  ui.note.hidden = false; ui.wrap.inert = true;
  ui.noteGo.focus({ preventScroll: true });
}
function hideNote() {
  ui.note.hidden = true; ui.wrap.inert = false;
  ui.styles.find(b => b.getAttribute('aria-pressed') === 'true').focus({ preventScroll: true });
}

function open() {
  if (!ui) {
    ui = buildDialog();
    ui.close.addEventListener('click', () => ui.d.close());
    ui.help.addEventListener('click', showNote);
    ui.noteGo.addEventListener('click', hideNote);
    // While the note is up, Escape puts it away rather than closing the game.
    ui.d.addEventListener('cancel', e => {
      if (!ui.note.hidden) { e.preventDefault(); hideNote(); }
      else if (!ui.warn.hidden) { e.preventDefault(); game.hideWarning(); }
    });
    ui.d.addEventListener('close', () => {
      game?.stop();
      document.documentElement.classList.remove('tg-lock');
      window.forrtHeroSuspend?.(false);
    });
  }
  if (ui.d.open) return;
  window.forrtHeroSuspend?.(true);
  document.documentElement.classList.add('tg-lock');
  ui.d.showModal();
  const t0 = performance.now();
  try {
    if (!game) game = createGame();
    window.towerGame.setupMs = window.towerGame.setupMs || performance.now() - t0;
    game.resize(); game.start();
    if (!noteSeen || !ui.note.hidden) { noteSeen = true; showNote(); }
    else ui.styles.find(b => b.getAttribute('aria-pressed') === 'true').focus({ preventScroll: true });
  } catch (error) {
    ui.hint.textContent = 'This browser could not start the game.';
    console.warn('Tower game could not start:', error.message);
  }
}

window.towerGame = { open, close: () => ui?.d.close() };

if (__DEBUG__) {
  /* Test hooks. Excluded from the size figures. */
  Object.defineProperty(window.towerGame, 'g', { get: () => game });
  const idx = p => game.bricks.indexOf(p);
  /* Stud centres, read from the rendered mesh's own vertices rather than from the game's bookkeeping. */
  function studCentres(m) {
    m.updateWorldMatrix(true, false);
    const pos = m.geometry.attributes.position, v = new Vector3();
    let top = -Infinity;
    for (let k = 0; k < pos.count; k++) { v.fromBufferAttribute(pos, k).applyMatrix4(m.matrixWorld); if (v.y > top) top = v.y; }
    const groups = new Map();
    for (let k = 0; k < pos.count; k++) {
      v.fromBufferAttribute(pos, k).applyMatrix4(m.matrixWorld);
      if (Math.abs(v.y - top) > .0005) continue;
      const key = Math.round(v.x / .3 - .5) + ',' + Math.round(v.z / .3 - .5);
      if (!groups.has(key)) groups.set(key, { x: 0, z: 0, n: 0 });
      const g = groups.get(key); g.x += v.x; g.z += v.z; g.n++;
    }
    return { top, studs: [...groups.values()].map(g => ({ x: g.x / g.n, z: g.z / g.n })) };
  }
  /* The brick that a real ray hits first, against the rendered meshes. Shares no code with the game's height-map picking. */
  function meshUnder(point) {
    const g = game;
    g.castRay(point);
    const fixed = g.model.children.filter(o => o.isMesh), loose = g.history.map(p => p.object);
    const hit = g.raycaster.intersectObjects([...fixed, ...loose], true)[0];
    if (!hit) return null;
    return { x: hit.point.x, y: hit.point.y, z: hit.point.z, cell: [Math.floor(hit.point.x / .3), Math.floor(hit.point.z / .3)], onBrick: !fixed.includes(hit.object) };
  }
  Object.assign(window.towerGame, {
    state() {
      const g = game;
      return { placed: g.placedCount(), used: g.history.length, slotsFilled: g.slots.filter(s => s.filled).length, open: ui.d.open, hintsShown: g.slots.filter(s => s.hint.visible).length, last: g.history.length ? { ...g.history[g.history.length - 1].cell, type: g.history[g.history.length - 1].type } : null, stats: g.stats, hint: ui.hint.textContent, selected: g.selected, rot: g.rot, view: g.view, done: g.done, aim: g.aim && { i: g.aim.i, j: g.aim.j, rot: g.aim.rot, level: g.aim.level, type: g.aim.type }, ghost: g.ghost.visible, warning: !ui.warn.hidden, toppling: g.toppling, lastCollapse: g.lastCollapse, rubble: g.bricks.filter(p => p.state === 'debris').length, strain: +g.strainWith().toFixed(1), wobblyAim: Boolean(g.aim) && g.tooWobbly(g.aim), ghostColour: '#' + g.ghostSkin.color.getHexString(), lastColour: g.history.length ? '#' + g.history[g.history.length - 1].stone.getHexString() : null, ghostEdge: '#' + g.ghostLine.material.color.getHexString() };
    },
    settled() { return !game.busy && !game.drag; },
    frameSize() { return { w: game.frame.width, h: game.frame.height }; },
    meshUnder,
    /* Screen point of the centre of a stud square's surface. */
    cellPoint(i, j, level) { return game.project(new Vector3(.15 + .3 * i, game.heightOf(level) + .002, .15 + .3 * j)); },
    /* Every spot the rules allow for the chosen brick and direction, right now. */
    legalSpots() {
      const g = game, out = [];
      for (let i = g.MIN_CELL; i <= g.MAX_CELL; i++) for (let j = g.MIN_CELL; j <= g.MAX_CELL; j++) { const r = g.landing(g.selected, i, j, g.rot); if (r) out.push(`${i},${j},${r.level}`); }
      return out;
    },
    /* Screen centre of a spot's underside, or null if the spot is off the canvas. */
    spotPoint(i, j, level) {
      const g = game, [nx, nz] = g.footprint(g.selected, g.rot);
      const q = g.project(new Vector3(.15 + .3 * (i + (nx - 1) / 2), g.heightOf(level), .15 + .3 * (j + (nz - 1) / 2)));
      return q.x >= 0 && q.y >= 0 && q.x <= g.frame.width && q.y <= g.frame.height ? q : null;
    },
    /* Sweep the pointer in fine steps over the area around the legal spots and collect every spot it can reach. */
    sweep(step = 3) {
      const g = game, w = window.towerGame, seen = new Set(), spots = w.legalSpots().map(s => s.split(',').map(Number)).map(([i, j, l]) => w.spotPoint(i, j, l)).filter(Boolean);
      const x0 = Math.max(0, Math.min(...spots.map(q => q.x)) - 36), x1 = Math.min(g.frame.width, Math.max(...spots.map(q => q.x)) + 36);
      const y0 = Math.max(0, Math.min(...spots.map(q => q.y)) - 36), y1 = Math.min(g.frame.height, Math.max(...spots.map(q => q.y)) + 36);
      for (let y = y0; y < y1; y += step) for (let x = x0; x < x1; x += step) { const t = g.freeTargetAt({ x, y }); if (t) seen.add(`${t.i},${t.j},${t.level}`); }
      return [...seen];
    },
    /* The pixel nearest a spot's centre at which the pointer chooses that spot. */
    aimFor(i, j, level) {
      const g = game, c = window.towerGame.spotPoint(i, j, level);
      if (!c) return null;
      let best = null, bestD = Infinity;
      for (let dy = -48; dy <= 48; dy += 2) for (let dx = -48; dx <= 48; dx += 2) {
        const d = Math.hypot(dx, dy);
        if (d >= bestD) continue;
        const t = g.freeTargetAt({ x: c.x + dx, y: c.y + dy });
        if (t && t.i === i && t.j === j && t.level === level) { best = { x: c.x + dx, y: c.y + dy }; bestD = d; }
      }
      return best;
    },
    /* Raw pointer points against what a real ray hits on the rendered meshes. */
    fidelity(n) {
      const g = game, F = g.foundationTop;
      // Ray tests read world matrices, which otherwise update only when a frame is drawn.
      g.scene.updateMatrixWorld(true);
      const out = { points: 0, exact: 0, withinOne: 0, seam: 0, far: [], none: 0 };
      for (let k = 0; k < n; k++) {
        const point = { x: Math.random() * g.frame.width, y: Math.random() * g.frame.height };
        const hit = meshUnder(point);
        if (!hit || hit.y < F - .1) continue;
        out.points++;
        const t = g.freeTargetAt(point);
        if (!t) { out.none++; continue; }
        const [nx, nz] = g.footprint(t.type, t.rot);
        const dx = hit.cell[0] < t.i ? t.i - hit.cell[0] : Math.max(0, hit.cell[0] - (t.i + nx - 1));
        const dz = hit.cell[1] < t.j ? t.j - hit.cell[1] : Math.max(0, hit.cell[1] - (t.j + nz - 1));
        if (dx === 0 && dz === 0) out.exact++;
        else if (dx <= 1 && dz <= 1) out.withinOne++;
        else {
          // A ray can slip through the hairline joint between bricks or graze a brick's edge. If a pixel 2 px away agrees with the game, it was only that.
          const near = [[-2, 0], [2, 0], [0, -2], [0, 2]].map(([a, b]) => meshUnder({ x: point.x + a, y: point.y + b })).filter(q => q && q.cell[0] >= t.i - 1 && q.cell[0] <= t.i + nx && q.cell[1] >= t.j - 1 && q.cell[1] <= t.j + nz);
          // Or the ray only caught the rim of a stud with air right beside it: the game treats that sliver as the air next to it.
          const rim = !g.surfaceCell(point) && [[-1, 0], [1, 0], [0, -1], [0, 1]].some(([a, b]) => !meshUnder({ x: point.x + a, y: point.y + b }));
          if (near.length >= 1 || rim) out.seam++;
          else if (out.far.length < 8) out.far.push({ point, hit, t: [t.i, t.j, t.rot, t.level] });
        }
      }
      return out;
    },
    /* The same way in as a click: the rule applies and the warning shows. */
    tryPlace(type, i, j, rot = 0) { const g = game, r = g.landing(type, i, j, rot); if (!r) return 'none'; const wasFlying = g.placeBrick(g.makeTarget(type, i, j, rot, r)); if (wasFlying) { g.land(wasFlying); for (const f of [...g.flights]) if (f.part === wasFlying) g.flights.delete(f); return 'placed'; } g.hideWarning(); return 'refused'; },
    place(type, i, j, rot = 0) { const g = game, r = g.landing(type, i, j, rot); if (!r) return null; const p = g.spawn(type); g.commit(p, g.makeTarget(type, i, j, rot, r)); g.land(p); return r; },
    /* Independent audit, from world positions and mesh vertices only. Uses none of the game's rule code. */
    audit() {
      const g = game, F = g.foundationTop, placed = g.history.filter(p => p.state === 'placed');
      const offGrid = [], wrongLevel = [], unconnected = [], collisions = [], slidIn = [];
      const eps = 1e-3;
      const onLattice = v => Math.abs((v - .15) / .3 - Math.round((v - .15) / .3)) < eps;
      // Foundation studs, from the merged mesh vertices at the very top: walls and deck.
      const fixed = g.model.children.filter(o => o.isMesh && o.name === 'Fixed castle masonry');
      let foundationStuds = [], foundationStudTop = -Infinity;
      for (const m of fixed) { const c = studCentres(m); if (c.top > foundationStudTop + eps) { foundationStudTop = c.top; foundationStuds = c.studs; } else if (Math.abs(c.top - foundationStudTop) < eps) foundationStuds.push(...c.studs); }
      const foundationOffGrid = foundationStuds.filter(s => !(onLattice(s.x) && onLattice(s.z)));
      const foundationCells = new Set(foundationStuds.map(s => Math.round((s.x - .15) / .3) + ',' + Math.round((s.z - .15) / .3)));
      // Column map, filled brick by brick in placing order.
      const col = new Map();
      for (const p of placed) {
        const t = g.TYPES[p.type], rot = Math.abs(Math.sin(p.object.rotation.y)) > .5;
        const nx = rot ? t.nz : t.nx, nz = rot ? t.nx : t.nz;
        const h = t.plates * .09, bottom = p.object.position.y - h / 2;
        const units = (bottom - F) / .09;
        if (Math.abs(units - Math.round(units)) > eps) wrongLevel.push(idx(p));
        const studs = studCentres(g.mesh(p)).studs;
        if (studs.length !== nx * nz || !studs.every(s => onLattice(s.x) && onLattice(s.z))) offGrid.push(idx(p));
        const i0 = Math.round((p.object.position.x - (nx - 1) * .15 - .15) / .3), j0 = Math.round((p.object.position.z - (nz - 1) * .15 - .15) / .3);
        let touches = 0, trapped = false;
        for (let a = i0; a < i0 + nx; a++) for (let b = j0; b < j0 + nz; b++) {
          const key = a + ',' + b, here = col.get(key) || [];
          if (here.some(([lo, hi]) => lo < bottom + h - eps && hi > bottom + eps)) collisions.push(idx(p));
          // Anything already above its underside in its own column means it could not have come from above.
          if (here.some(([, hi]) => hi > bottom + eps)) trapped = true;
          if (here.some(([, hi]) => Math.abs(hi - bottom) < eps) || (Math.abs(bottom - F) < eps && foundationCells.has(key))) touches++;
        }
        if (touches < 1) unconnected.push(idx(p));
        if (trapped) slidIn.push(idx(p));
        for (let a = i0; a < i0 + nx; a++) for (let b = j0; b < j0 + nz; b++) { const key = a + ',' + b; if (!col.has(key)) col.set(key, []); col.get(key).push([bottom, bottom + h]); }
      }
      return { placed: placed.length, offGrid: offGrid.length, wrongLevel: wrongLevel.length, unconnected: unconnected.length, collisions: collisions.length, slidIn: slidIn.length, foundationStuds: foundationStuds.length, foundationOffGrid: foundationOffGrid.length };
    },
    /* Rule-only games, without flights. 'plan': random order through the plan. 'free': random bricks at random legal spots. */
    simulate(mode, runs, bricks = 60) {
      const g = game; let stuck = 0, completed = 0, faults = 0, placed = 0;
      for (let r = 0; r < runs; r++) {
        g.restart();
        if (mode === 'plan') {
          for (let open = g.openSlots(); open.length; open = g.openSlots()) { const s = open[Math.floor(Math.random() * open.length)]; const p = g.spawn(s.type); g.commit(p, g.makeTarget(s.type, s.i, s.j, s.rot, g.landing(s.type, s.i, s.j, s.rot))); g.land(p); }
          if (g.slots.every(s => s.filled)) completed++; else stuck++;
        } else {
          for (let n = 0; n < bricks; n++) {
            const type = g.TYPE_KEYS[Math.floor(Math.random() * g.TYPE_KEYS.length)], rot = Math.floor(Math.random() * 2), spots = [];
            for (let i = g.MIN_CELL; i <= g.MAX_CELL; i++) for (let j = g.MIN_CELL; j <= g.MAX_CELL; j++) { if (g.landing(type, i, j, rot)) spots.push([i, j]); }
            const [i, j] = spots[Math.floor(Math.random() * spots.length)];
            const part = g.spawn(type); g.commit(part, g.makeTarget(type, i, j, rot, g.landing(type, i, j, rot))); g.land(part);
          }
          completed++;
        }
        const a = window.towerGame.audit();
        placed += a.placed;
        faults += a.offGrid + a.wrongLevel + a.unconnected + a.collisions + a.slidIn;
      }
      g.restart();
      return { mode, runs, stuck, completed, faults, placed };
    },
    sizes() {
      const g = game, w = window.towerGame;
      const a = w.cellPoint(-1, -1, 0), b = w.cellPoint(0, -1, 0), c = w.cellPoint(-1, 0, 0);
      const px = (p, q) => +Math.hypot(p.x - q.x, p.y - q.y).toFixed(1);
      return { canvas: [g.frame.width, g.frame.height], pxPerUnit: +g.frame.scale.toFixed(1), studStepAcross: px(a, b), studStepAlong: px(a, c) };
    }
  });
}
