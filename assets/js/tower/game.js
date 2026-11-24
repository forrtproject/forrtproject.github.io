/* Tower game: free and blueprint building by real Lego rules on a stud grid.
   Every brick covers whole stud squares, every height is a whole number of plates, and a brick
   comes down from above onto the highest thing under it, so it can never slide into a gap.
   One stud is enough to hold a brick, though a placement that would overload a joint is refused with a warning.
   The supply is unlimited, and any of ten bricks (keys 1 to 9 and 0) and three looks can be chosen at any time.
   Includes playable FORRT blueprints, live stability gauge, deliberate topple physics, Web Audio feedback,
   tactile landing juice, milestones, and PNG postcard export. */
import {
  Scene, OrthographicCamera, WebGLRenderer, HemisphereLight, DirectionalLight, Mesh, PlaneGeometry, BoxGeometry, EdgesGeometry,
  LineSegments, LineBasicMaterial, Group, ShadowMaterial, Vector3, Box3, PCFShadowMap, SRGBColorSpace,
  ACESFilmicToneMapping, Color, MeshBasicMaterial, Raycaster, Vector2, BackSide, AlwaysStencilFunc, NotEqualStencilFunc, ReplaceStencilOp
} from 'three';
import { createFoundation } from './source-copies/lego-foundation.js';
import { createCollapse } from './collapse.js';
import { createSoundEngine } from './audio.js';
import { BLUEPRINTS, BLUEPRINT_MAP } from './blueprints.js';
import { createEffects } from './effects.js';
import { renderPostcardCanvas, downloadPostcard } from './postcard.js';

const css = `
html.tg-lock{overflow:hidden;scrollbar-gutter:stable}
#tower-game{touch-action:none;width:min(1040px,100vw);max-width:100vw;height:min(840px,100dvh);max-height:100dvh;padding:0;border:0;border-radius:18px;background:#e3efec;color:#262d35;overflow:hidden;font-family:'Source Sans 3',system-ui,sans-serif}
#tower-game::backdrop{background:rgba(38,45,53,.55)}
#tower-game .tg-wrap{display:flex;flex-direction:column;height:100%}
#tower-game .tg-panel{display:contents}
#tower-game .tg-head{display:flex;align-items:center;gap:8px;padding:10px 12px 4px 18px;order:1}
#tower-game h2{font:500 clamp(19px,3vw,26px)/1.1 'Newsreader',Georgia,serif;margin:0;flex:1;min-width:0}
#tower-game .tg-head-actions{display:flex;align-items:center;gap:6px;flex:none}
#tower-game .tg-bar{display:flex;align-items:center;justify-content:space-between;gap:8px 12px;padding:4px 12px 6px 18px;flex-wrap:wrap;order:2}
#tower-game .tg-plans{display:flex;align-items:center;gap:5px;min-width:0;max-width:100%;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:2px 0}
#tower-game .tg-plans::-webkit-scrollbar{display:none}
#tower-game button.tg-plan-pill{flex:none;min-height:36px;padding:5px 12px;border:1.5px solid #9db3ae;border-radius:999px;background:#f6faf9;color:#262d35;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;cursor:pointer;white-space:nowrap}
@media(hover:hover){#tower-game button.tg-plan-pill:hover{background:#fff;border-color:#2d5750}}
#tower-game button.tg-plan-pill[aria-pressed=true]{background:#2d5750;border-color:#2d5750;color:#fff}
#tower-game .tg-status{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-left:auto}
#tower-game .tg-count{font-weight:600;font-size:15px;white-space:nowrap;color:#262d35}
#tower-game .tg-prog{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:999px;background:#fff;border:1px solid #bfd2cd;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;color:#115e69;white-space:nowrap}
#tower-game .tg-prog[hidden]{display:none}
#tower-game .tg-prog.tg-prog-done{background:#e3f1e7;border-color:#2b7a4b;color:#1d5e37}
#tower-game .tg-prog-track{width:42px;height:6px;border-radius:999px;background:#d6e6e3;overflow:hidden}
#tower-game .tg-prog-fill{display:block;height:100%;width:0;background:#14808f;border-radius:999px;transition:width .2s}
#tower-game .tg-prog.tg-prog-done .tg-prog-fill{background:#2b7a4b}
#tower-game .tg-meter{display:inline-flex;align-items:center;gap:7px;padding:3px 10px;border-radius:999px;background:#fff;border:1px solid #bfd2cd;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;white-space:nowrap;color:#1d5e37}
#tower-game .tg-meter-track{width:54px;height:7px;border-radius:999px;background:#e4ecea;overflow:hidden;flex:none}
#tower-game .tg-meter-fill{display:block;height:100%;width:100%;border-radius:999px;background:#2b7a4b;transition:width .15s,background-color .15s}
#tower-game .tg-meter[data-state=leaning]{color:#7a4f00;border-color:#d8b35a}
#tower-game .tg-meter[data-state=leaning] .tg-meter-fill{background:#b87a00}
#tower-game .tg-meter[data-state=risky]{color:#9a4106;border-color:#df9359}
#tower-game .tg-meter[data-state=risky] .tg-meter-fill{background:#d96614}
#tower-game .tg-meter[data-state=wobbly]{color:#a51c16;border-color:#d9534f;background:#fdf2f2}
#tower-game .tg-meter[data-state=wobbly] .tg-meter-fill{background:#d92d20}
#tower-game .tg-field{position:relative;flex:1;min-height:0;order:3}
#tower-game .tg-stage{position:absolute;inset:0;touch-action:none;user-select:none;-webkit-user-select:none}
#tower-game .tg-over{position:absolute;top:6px;display:flex;gap:6px;z-index:2}
#tower-game .tg-over[hidden]{display:none}
#tower-game .tg-plan{left:8px}
#tower-game .tg-again{right:8px}
#tower-game .tg-toast{position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:3;display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:999px;background:#262d35;color:#fff;font:600 14px/1.2 'Source Sans 3',system-ui,sans-serif;box-shadow:0 6px 18px rgba(38,45,53,.24);pointer-events:none;white-space:nowrap;max-width:calc(100% - 24px);overflow:hidden;text-overflow:ellipsis;transition:opacity .22s,transform .22s}
#tower-game .tg-toast[hidden]{display:none}
#tower-game .tg-toast-dot{width:9px;height:9px;border-radius:50%;background:#e8b52c;flex:none}
#tower-game .tg-toast.tg-toast-plan .tg-toast-dot{background:#2b985b}
#tower-game .tg-stage.tg-keys:focus{outline:3px solid #005a87;outline-offset:-3px}
#tower-game canvas{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:crosshair}
#tower-game .tg-tray{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:4px;padding:4px 12px;touch-action:none;user-select:none;-webkit-user-select:none;order:4}
#tower-game button.tg-style{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:0;min-height:58px;min-width:0;padding:3px 1px 4px;border:2px solid transparent;border-radius:10px;background:#f6faf9;font:600 13px/1.1 'Source Sans 3',system-ui,sans-serif;color:#262d35;cursor:pointer}
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
#tower-game .tg-note{position:absolute;inset:0;z-index:5;display:flex;align-items:center;justify-content:center;padding:8px;background:rgba(38,45,53,.45)}
#tower-game .tg-note[hidden]{display:none}
#tower-game .tg-card{display:flex;flex-direction:column;width:min(520px,100%);max-height:100%;padding:14px 18px 12px;border-radius:14px;background:#fff;box-shadow:0 10px 30px rgba(38,45,53,.3)}
#tower-game .tg-card h3{font:500 22px/1.1 'Newsreader',Georgia,serif;margin:0 0 6px}
#tower-game .tg-card .tg-steps{min-height:0;overflow:auto;touch-action:pan-y;margin:0 0 10px;padding:0;list-style:none;font-size:15px;line-height:1.35}
#tower-game .tg-card li{margin:0 0 7px}
#tower-game .tg-warn-text{margin:0 0 12px;font-size:17px;line-height:1.35}
#tower-game .tg-warn-row{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px}
#tower-game .tg-turns{display:flex;align-items:center;gap:4px;float:right;margin:0 0 2px 8px;font-size:20px;color:#5a666e}
#tower-game .tg-turns img{width:58px;height:36px;object-fit:contain;display:block}
#tower-game .tg-style.tg-suggested::after{content:'';position:absolute;top:4px;right:4px;width:9px;height:9px;border-radius:50%;background:#14808f}
#tower-game .tg-foot{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;padding:4px 12px 12px 18px;order:5}
#tower-game .tg-hint{flex:1 1 240px;margin:0;font-size:15px;line-height:1.3;height:2.6em;overflow:hidden}
#tower-game .tg-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;min-height:44px;padding:8px 14px;border:1.5px solid #2d5750;border-radius:999px;background:#fff;color:#262d35;font:600 15px/1.2 'Source Sans 3',system-ui,sans-serif;cursor:pointer}
#tower-game .tg-btn svg{width:18px;height:18px;flex:none}
#tower-game .tg-close{min-width:44px;padding:8px 11px}
#tower-game .tg-sound .tg-ic-off{display:none}
#tower-game .tg-sound[aria-pressed=false] .tg-ic-on{display:none}
#tower-game .tg-sound[aria-pressed=false] .tg-ic-off{display:block}
#tower-game .tg-sound[aria-pressed=true],#tower-game .tg-sound[aria-pressed=true]:hover{background:#fff;border-color:#2d5750;color:#262d35}
@media(hover:hover){#tower-game .tg-sound[aria-pressed=true]:hover{background:#2d5750;color:#fff}}
#tower-game .tg-sound[aria-pressed=false]{background:#eef3f2;border-color:#7d9490;color:#4c5e72}
@media(hover:hover){#tower-game .tg-btn:hover:not(:disabled){background:#2d5750;color:#fff}}
#tower-game .tg-btn:disabled{opacity:.45;cursor:default}
#tower-game .tg-btn.tg-main{flex:0 0 5.4em;padding-left:4px;padding-right:4px;background:#b34e0a;border-color:#b34e0a;color:#fff}
#tower-game .tg-btn.tg-main:disabled{background:#fff;border-color:#2d5750;color:#262d35}
@media(hover:hover){#tower-game .tg-btn.tg-main:hover:not(:disabled){background:#8f3e07}}
#tower-game .tg-card .tg-btn.tg-main{align-self:flex-end;flex:none;padding:8px 16px}
#tower-game .tg-btn[aria-pressed=true]:not(.tg-sound),#tower-game .tg-btn[aria-pressed=true]:not(.tg-sound):hover{background:#14808f;border-color:#14808f;color:#fff}
#tower-game button:focus-visible{outline:3px solid #005a87;outline-offset:2px}
#tower-game .tg-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(pointer:coarse){#tower-game button.tg-plan-pill{min-height:44px;padding:6px 13px}}
@media(max-width:760px){
  #tower-game .tg-head{padding:8px 10px 2px 12px;gap:6px}
  #tower-game .tg-bar{padding:2px 10px 4px 12px;gap:4px 8px}
  #tower-game .tg-plans{width:100%;padding-right:28px;scroll-padding-inline:16px;-webkit-mask-image:linear-gradient(to right,#000 93%,transparent);mask-image:linear-gradient(to right,#000 93%,transparent)}
  #tower-game .tg-status{width:100%;margin-left:0;justify-content:space-between;gap:6px}
  #tower-game .tg-toast{padding:6px 11px;font-size:13px;max-width:calc(100% - 196px)}
  #tower-game .tg-tray{grid-template-columns:repeat(5,minmax(0,1fr));padding:2px 8px}
  #tower-game .tg-foot{padding:4px 8px 8px}
  #tower-game .tg-hint{flex-basis:100%}
  #tower-game .tg-foot .tg-btn:not(.tg-main){padding:8px 10px;flex:1 1 auto}
  #tower-game .tg-plan{flex-direction:column}
  #tower-game .tg-again{flex-direction:column;align-items:flex-end}
  #tower-game .tg-over .tg-btn{padding:8px 11px}
}
@media(max-width:600px){
  #tower-game{border-radius:0;width:100vw;height:100dvh}
  #tower-game .tg-btn-text{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  #tower-game #tg-photo{min-width:44px;padding:8px 11px}
  #tower-game button.tg-style{min-height:50px}
  #tower-game .tg-style img{height:26px}
  #tower-game .tg-meter-track{width:42px}
}
@media(max-width:360px){
  #tower-game button.tg-look{padding:4px 7px 4px 5px}
  #tower-game .tg-foot .tg-btn:not(.tg-main){padding:8px 6px}
  #tower-game button.tg-style{min-height:44px}
  #tower-game .tg-style img{height:22px}
  #tower-game .tg-style small{display:none}
  #tower-game .tg-hint{font-size:14px}
  #tower-game .tg-meter-track{width:34px}
}
@media(max-height:480px){
  #tower-game{border-radius:0;width:100vw;height:100dvh}
  #tower-game .tg-card{padding:8px 14px}#tower-game .tg-card h3{font-size:18px;margin-bottom:3px}#tower-game .tg-card .tg-steps{font-size:14px;line-height:1.25;margin-bottom:5px}#tower-game .tg-card li{margin-bottom:3px}#tower-game .tg-turns img{height:24px;width:40px}
  #tower-game .tg-wrap{display:grid;grid-template-columns:1fr min(360px,48vw);grid-template-rows:1fr}
  #tower-game .tg-field{grid-column:1;grid-row:1;min-height:0}
  #tower-game .tg-panel{display:flex;flex-direction:column;grid-column:2;grid-row:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;padding-bottom:6px;border-left:1px solid #c9dcd7}
  #tower-game .tg-head{padding:6px 8px 2px 10px;gap:6px;flex-wrap:wrap}
  #tower-game h2{font-size:18px}
  #tower-game .tg-btn-text{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  #tower-game #tg-photo{min-width:44px;padding:8px 11px}
  #tower-game .tg-bar{padding:2px 8px 4px 10px;gap:4px}
  #tower-game .tg-bar .tg-plans{width:100%;padding-right:20px}
  #tower-game .tg-bar .tg-status{width:100%;margin-left:0;justify-content:space-between;gap:6px}
  #tower-game .tg-plan{flex-direction:column}
  #tower-game .tg-again{flex-direction:column;align-items:flex-end}
  #tower-game .tg-over .tg-btn{padding:8px 11px;min-height:44px}
  #tower-game .tg-tray{grid-template-columns:repeat(5,minmax(0,1fr));padding:4px 8px 4px 10px}
  #tower-game button.tg-style{min-height:44px}#tower-game .tg-style img{height:20px}#tower-game .tg-style small{display:none}
  #tower-game .tg-foot{padding:4px 8px 8px 10px;gap:6px}#tower-game .tg-foot .tg-btn:not(.tg-main){padding:8px 10px;flex:1 1 auto}#tower-game .tg-hint{flex:1 1 100%;font-size:14px;height:auto;min-height:2.4em}
}
@media(prefers-reduced-motion:reduce){
  #tower-game .tg-prog-fill,#tower-game .tg-meter-fill,#tower-game .tg-toast,#tower-game .tg-style img{transition:none}
}
`;

/* The physics file sits beside this one, and is fetched only by someone who reaches a wobble warning or clicks Topple. */
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

const footprint = (type, rot) => (rot ? [TYPES[type].nz, TYPES[type].nx] : [TYPES[type].nx, TYPES[type].nz]);
const isSquare = type => TYPES[type].nx === TYPES[type].nz;
const cellX = i => .15 + PITCH * i;

const CAMERA_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';
const SOUND_ICON = '<svg class="tg-ic-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg><svg class="tg-ic-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';

let ui, game;

function buildDialog() {
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
  const d = document.createElement('dialog');
  d.id = 'tower-game'; d.setAttribute('aria-labelledby', 'tg-title');
  const tray = TYPE_KEYS.map((k, n) => `<button type="button" class="tg-style" data-type="${k}" aria-pressed="false" aria-label="${TYPES[k].label}" aria-keyshortcuts="${keyOf(n)}"><kbd>${keyOf(n)}</kbd><img alt=""><span>${TYPES[k].size}</span><small>${TYPES[k].word}</small></button>`).join('');
  const looks = Object.entries(LOOKS).map(([k, name]) => `<button type="button" class="tg-look" data-look="${k}" aria-pressed="false"><i></i>${name}</button>`).join('');
  const planButtons = BLUEPRINTS.map(bp => `<button type="button" class="tg-plan-pill" data-plan="${bp.id}" aria-pressed="${bp.id === 'free'}">${bp.name}</button>`).join('');
  const tap = coarse.matches ? 'tap' : 'click';
  const steps = [
    `<strong>Pick a blueprint or build freely</strong> from the row at the top. Each blueprint guides you brick by brick with teal outlines.`,
    `<strong>Pick a brick</strong> from the row below${coarse.matches ? '' : ', or press its number: 1 to 9, then 0 for the tenth'}.`,
    `<strong>Point and ${tap}.</strong> ${coarse.matches ? 'Drag first to see a copy of the brick, edged in orange, where it will land; a plain tap places it at once.' : 'A copy of the brick, edged in orange, shows where it will land.'} Watch the <strong>Stability</strong> meter on overhangs.`,
    `<span class="tg-turns" aria-hidden="true"><img id="tg-turn-a" alt="">↻<img id="tg-turn-b" alt=""></span><strong>Rotate${coarse.matches ? '' : ' (or R)'}</strong> turns the brick a quarter turn before you place it. <strong>View${coarse.matches ? '' : ' (or T)'}</strong> turns the whole tower.`,
    '<strong>Grey, Brick and Pride</strong> set the look of your next bricks. <strong>Topple</strong> knocks the tower down for fun; <strong>Undo</strong> snaps it straight back.',
    '<strong>Done</strong> launches a pride-stripe celebration, and <strong>Save photo</strong> downloads a postcard of your build.'
  ].map(t => `<li>${t}</li>`).join('');

  d.innerHTML = `<div class="tg-wrap">
    <div class="tg-panel">
      <div class="tg-head"><h2 id="tg-title">Build the tower</h2>
        <div class="tg-head-actions">
          <button type="button" class="tg-btn" id="tg-photo" aria-label="Save photo of your tower" disabled>${CAMERA_ICON}<span class="tg-btn-text">Save photo</span></button>
          <button type="button" class="tg-btn tg-close tg-sound" id="tg-sound" aria-pressed="true" aria-label="Sound on" title="Toggle sound effects">${SOUND_ICON}</button>
          <button type="button" class="tg-btn tg-close" id="tg-help" aria-label="How to play">?</button>
          <button type="button" class="tg-btn tg-close" id="tg-close" aria-label="Close the game">✕</button>
        </div>
      </div>
      <div class="tg-bar">
        <div class="tg-plans" id="tg-plans" role="group" aria-label="Choose a blueprint">${planButtons}</div>
        <div class="tg-status">
          <span class="tg-count" id="tg-count">0 bricks</span>
          <span class="tg-prog" id="tg-prog" hidden><span class="tg-prog-track" aria-hidden="true"><span class="tg-prog-fill" id="tg-prog-fill"></span></span><span id="tg-prog-text">0 / 0</span></span>
          <div class="tg-meter" id="tg-stability" role="meter" aria-label="Tower stability" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-valuetext="Solid, 100%" data-state="solid">
            <span class="tg-meter-track" aria-hidden="true"><span class="tg-meter-fill" id="tg-stability-fill"></span></span>
            <span id="tg-stability-text">Solid</span>
          </div>
        </div>
      </div>
      <div class="tg-tray" id="tg-tray" role="group" aria-label="Choose a brick">${tray}</div>
      <div class="tg-foot"><p class="tg-hint" id="tg-hint"></p>
        <button type="button" class="tg-btn" id="tg-rotate" aria-label="Rotate the brick">Rotate</button>
        <button type="button" class="tg-btn" id="tg-view" aria-label="Turn the view">View</button>
        <button type="button" class="tg-btn" id="tg-undo">Undo</button>
        <button type="button" class="tg-btn" id="tg-hints" aria-pressed="false" aria-label="Show blueprint hints">Hints</button>
        <button type="button" class="tg-btn tg-main" id="tg-done">Done</button></div>
    </div>
    <div class="tg-field"><div class="tg-stage" id="tg-stage" tabindex="0" role="application" aria-label="Building area. Number keys choose a brick, arrow keys move it, R rotates it, T turns the view, Enter places it."><canvas id="tg-canvas" aria-hidden="true"></canvas></div>
      <div class="tg-toast" id="tg-toast" hidden aria-hidden="true"><span class="tg-toast-dot"></span><span id="tg-toast-text"></span></div>
      <div class="tg-over tg-plan" id="tg-plan" hidden><button type="button" class="tg-btn" id="tg-next" title="Places the next brick of the chosen blueprint" aria-label="Place next brick of the blueprint">Place next</button>
      <button type="button" class="tg-btn" id="tg-finish" title="Builds the rest of the chosen blueprint. Undo takes it all back" aria-label="Build rest of the blueprint">Build rest</button></div>
      <div class="tg-over tg-again"><button type="button" class="tg-btn" id="tg-topple" title="Knock your tower down with physics. Undo puts it straight back" disabled>Topple</button><button type="button" class="tg-btn" id="tg-restart">Start again</button></div>
      <div class="tg-over tg-looks" id="tg-looks" role="group" aria-label="Look of your next bricks">${looks}</div></div>
    <div class="tg-sr" role="status" aria-live="polite" id="tg-live"></div></div>
    <div class="tg-note" id="tg-note" hidden><div class="tg-card" role="group" aria-labelledby="tg-note-title"><h3 id="tg-note-title">How to play</h3><ul class="tg-steps" id="tg-steps" tabindex="0">${steps}</ul><button type="button" class="tg-btn tg-main" id="tg-note-go">Start building</button></div></div>
    <div class="tg-note" id="tg-warn" hidden><div class="tg-card" role="alertdialog" aria-modal="true" aria-labelledby="tg-warn-title" aria-describedby="tg-warn-text"><h3 id="tg-warn-title">Careful</h3><p class="tg-warn-text" id="tg-warn-text">Placing it here would bring FORRT down. We only build on solid foundations.</p><div class="tg-warn-row"><button type="button" class="tg-btn" id="tg-warn-anyway">Place it anyway</button><button type="button" class="tg-btn tg-main" id="tg-warn-go">Move it</button></div></div></div>`;
  document.body.appendChild(d);
  const $ = id => d.querySelector('#' + id);
  return {
    d, canvas: $('tg-canvas'), stage: $('tg-stage'), tray: $('tg-tray'), count: $('tg-count'), hint: $('tg-hint'),
    rotate: $('tg-rotate'), view: $('tg-view'), next: $('tg-next'), plan: $('tg-plan'), restart: $('tg-restart'),
    topple: $('tg-topple'), undo: $('tg-undo'), hints: $('tg-hints'), finish: $('tg-finish'), done: $('tg-done'),
    close: $('tg-close'), live: $('tg-live'), photo: $('tg-photo'), sound: $('tg-sound'),
    prog: $('tg-prog'), progFill: $('tg-prog-fill'), progText: $('tg-prog-text'),
    stability: $('tg-stability'), stabilityFill: $('tg-stability-fill'), stabilityText: $('tg-stability-text'),
    toast: $('tg-toast'), toastText: $('tg-toast-text'),
    planPills: [...d.querySelectorAll('.tg-plan-pill')],
    styles: [...d.querySelectorAll('.tg-style')],
    looks: [...d.querySelectorAll('.tg-look')],
    wrap: d.querySelector('.tg-wrap'), note: $('tg-note'), noteGo: $('tg-note-go'), help: $('tg-help'),
    warn: $('tg-warn'), warnGo: $('tg-warn-go'), warnAnyway: $('tg-warn-anyway')
  };
}

function createGame() {
  const renderer = new WebGLRenderer({ canvas: ui.canvas, antialias: true, alpha: true, stencil: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
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

  const sound = createSoundEngine();
  const effects = createEffects(scene, reduced);

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
  function stabilityInfo(strain) {
    if (strain > STRAIN_LIMIT) return { pct: 0, state: 'wobbly', label: 'Too wobbly' };
    const pct = Math.max(1, Math.min(100, Math.round(100 * (1 - strain / STRAIN_LIMIT))));
    if (pct < 25) return { pct, state: 'risky', label: `Risky ${pct}%` };
    if (pct < 60) return { pct, state: 'leaning', label: `Leaning ${pct}%` };
    return { pct, state: 'solid', label: `Solid ${pct}%` };
  }

  const bricks = [], history = [];
  const placedCount = () => bricks.filter(p => p.state === 'placed').length;
  const maxPlates = () => history.reduce((m, p) => Math.max(m, p.cell.level + TYPES[p.type].plates), 0);
  const maxCourses = () => Math.ceil(maxPlates() / 3);

  /* Playable blueprints. `slots` is mutated in place so references stay live across blueprint switches. */
  const hintStrong = new MeshBasicMaterial({ color: '#14808f', transparent: true, opacity: .42, depthWrite: false, depthTest: false });
  const hintFaint = new MeshBasicMaterial({ color: '#14808f', transparent: true, opacity: .14, depthWrite: false, depthTest: false });
  const hintLine = new LineBasicMaterial({ color: '#0b5a65', transparent: true, depthTest: false });
  const hintLineFaint = new LineBasicMaterial({ color: '#0b5a65', transparent: true, opacity: .45, depthTest: false });
  const slots = [];
  let currentPlan = 'free', lastNamedPlan = 'castle', planCompletedAnnounced = false;

  function loadBlueprintSlots(planId) {
    for (const s of slots) overlay.remove(s.hint);
    slots.length = 0;
    for (const p of history) p.slot = null;
    const bp = BLUEPRINT_MAP[planId] || BLUEPRINT_MAP.free;
    const raw = bp.build();
    for (const entry of raw) {
      const s = { ...entry, filled: null };
      const w = worldOf(s.type, s.i, s.j, s.rot, s.level);
      s.hint = new Group();
      s.hint.position.set(w.x, w.y, w.z); s.hint.rotation.y = w.rotY; s.hint.visible = false;
      s.body = new Mesh(boxOf[s.type], hintFaint); s.body.renderOrder = 4;
      s.line = new LineSegments(edgesOf[s.type], hintLineFaint); s.line.renderOrder = 5;
      s.hint.add(s.body, s.line);
      overlay.add(s.hint);
      slots.push(s);
    }
    for (const s of slots) {
      const [nx, nz] = footprint(s.type, s.rot);
      s.needs = slots.filter(o => {
        if (o.level >= s.level) return false;
        const [ox, oz] = footprint(o.type, o.rot);
        return o.i < s.i + nx && s.i < o.i + ox && o.j < s.j + nz && s.j < o.j + oz;
      });
    }
    // Re-match any existing bricks on the board to the newly selected blueprint.
    for (const p of history) {
      const match = slots.find(s => !s.filled && s.type === p.type && s.i === p.cell.i && s.j === p.cell.j && s.rot === p.cell.rot && s.level === p.cell.level);
      if (match) { match.filled = p; p.slot = match; }
    }
    planCompletedAnnounced = slots.length > 0 && slots.every(s => s.filled);
  }

  const covered = s => { const r = landing(s.type, s.i, s.j, s.rot); return !r || r.level > s.level; };
  const openSlots = type => slots.filter(s => {
    if (s.filled || (type && s.type !== type) || !s.needs.every(n => n.filled || covered(n))) return false;
    const r = landing(s.type, s.i, s.j, s.rot);
    return r && r.level === s.level && strainWith(holdOf(s.type, s.i, s.j, s.rot, s.level)) <= STRAIN_LIMIT;
  });

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
  const ghostMask = new Mesh(geometryOf[selected], new MeshBasicMaterial({ colorWrite: false, transparent: true, depthWrite: false, depthTest: false, stencilWrite: true, stencilFunc: AlwaysStencilFunc, stencilRef: 1, stencilZPass: ReplaceStencilOp }));
  const ghostRim = new Mesh(boxOf[selected], new MeshBasicMaterial({ color: '#ff8a1f', side: BackSide, transparent: true, depthWrite: false, depthTest: false, toneMapped: false, stencilWrite: true, stencilFunc: NotEqualStencilFunc, stencilRef: 1 }));
  ghostMask.renderOrder = 4; ghostRim.renderOrder = 5; ghostBody.renderOrder = 6; ghostLine.renderOrder = 7; ghost.add(ghostMask, ghostRim, ghostBody, ghostLine);

  function showHints() {
    const open = hintsOn && !done && !toppling && slots.length ? openSlots() : [];
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
    const floor = frame.height < 480 ? heightOf(0) - .75 : -.035;
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
    for (const p of bricks) if (p.state === 'debris') {
      v.copy(p.object.position).applyMatrix4(inv);
      l = Math.min(l, v.x - .8); r = Math.max(r, v.x + .8); b = Math.min(b, v.y - .8); t = Math.max(t, v.y + .8);
    }
    const margin = 1.03, aspect = frame.width / frame.height;
    // On narrow portrait screens, lift the tower slightly so the bottom look-picker pills never cover the front doorway.
    const bottomPad = frame.width <= 600 && frame.height > 260 ? (t - b) * .11 : 0;
    const adjB = b - bottomPad;
    const halfH = Math.max((t - adjB) / 2, (r - l) / 2 / aspect) * margin, halfW = halfH * aspect;
    const cx = (l + r) / 2, cy = (t + adjB) / 2;
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
    for (let i = MIN_CELL; i <= MAX_CELL; i++) for (let j = MIN_CELL; j <= MAX_CELL; j++) consider(i, j);
    return best && bestD <= SNAP_RADIUS ? makeTarget(type, best.i, best.j, turn, best.r) : null;
  }

  let dirty = true, running = false, raf = 0, last = 0, drag = null, celebrate = null, aim = null, aimState = 'solid', aimRisky = false, wasWobbly = false;
  let cursor = null, lastPoint = null, cleared = null, batches = 0, lastPlaced = null, doneAt = -1000, toastTimer = 0, tremorPhase = 0;
  const flights = new Set(), rubbleOut = new Set(), milestones = new Set();
  let toppling = false, awaitingPhysics = false, collapse = null, collapseWait = 0, cannon = null, lastCollapse = null, reframeIn = 0, physicsToken = 0;
  const stats = { refused: 0, toppled: 0, misses: 0, drops: 0, undos: 0, lost: 0, frames: 0, rotates: 0, turns: 0, keyboard: 0, photos: 0, milestones: 0 };

  const say = text => { ui.live.textContent = text; };
  function showToast(text, isPlan = false) {
    clearTimeout(toastTimer);
    ui.toastText.textContent = text;
    ui.toast.classList.toggle('tg-toast-plan', isPlan);
    ui.toast.hidden = false;
    toastTimer = setTimeout(() => { ui.toast.hidden = true; }, 3400);
  }
  function hideToast() { clearTimeout(toastTimer); ui.toast.hidden = true; }

  function updateStabilityMeter(strain) {
    const info = history.length === 0 && !aim ? { pct: 100, state: 'solid', label: 'Solid' } : stabilityInfo(strain);
    ui.stability.dataset.state = info.state;
    ui.stability.setAttribute('aria-valuenow', String(info.pct));
    ui.stability.setAttribute('aria-valuetext', `${info.label}`);
    ui.stabilityFill.style.width = `${info.pct}%`;
    ui.stabilityText.textContent = info.label;
    return info;
  }

  const WOBBLY_HINT = 'Too wobbly here: a brick in this spot would bring the tower down.';
  const defaultHint = () => {
    const bp = BLUEPRINT_MAP[currentPlan];
    const open = hintsOn && slots.length ? openSlots() : [];
    if (currentPlan !== 'free' && hintsOn && open.length) return `${bp.name}: teal outlines show the next places. Dark ones fit your brick; dotted bricks fit the rest.`;
    if (currentPlan !== 'free' && slots.length && slots.every(s => s.filled)) return `${bp.name} complete. Press Done for the pride-stripe parade, or pick another blueprint.`;
    if (currentPlan !== 'free' && hintsOn) return `Your build has covered the rest of ${bp.name}, or left it too wobbly. Keep building, or undo to bring it back.`;
    return coarse.matches ? 'Pick a brick, then tap the tower. Drag to aim, and turn bricks with Rotate.' : 'Press 1 to 9 or 0 for a brick, then click the tower. R rotates the brick and T turns the view.';
  };
  function refresh() {
    const n = placedCount(), h = maxCourses();
    ui.count.textContent = n === 0 ? '0 bricks' : `${n === 1 ? '1 brick' : `${n} bricks`} · ${h} high`;
    const hasPlan = currentPlan !== 'free' && slots.length > 0;
    const filled = hasPlan ? slots.filter(s => s.filled && s.filled.state === 'placed').length : 0;
    const planDone = hasPlan && filled === slots.length;
    const hasDebris = bricks.some(p => p.state === 'debris');
    ui.prog.hidden = !hasPlan;
    if (hasPlan) {
      ui.progText.textContent = `${filled} / ${slots.length}`;
      ui.progFill.style.width = `${Math.round((filled / slots.length) * 100)}%`;
      ui.prog.classList.toggle('tg-prog-done', planDone);
    }
    for (const b of ui.planPills) b.setAttribute('aria-pressed', String(b.dataset.plan === currentPlan));
    ui.hints.setAttribute('aria-pressed', String(hintsOn && hasPlan));
    ui.done.textContent = done ? 'Build on' : 'Done';
    ui.done.setAttribute('aria-label', done ? 'Build on' : 'Done building');
    ui.done.disabled = toppling || (!history.length && !done);
    ui.undo.disabled = awaitingPhysics || (!history.length && !cleared);
    ui.restart.disabled = !history.length && !hasDebris;
    ui.topple.disabled = toppling || awaitingPhysics || !history.length;
    ui.photo.disabled = toppling || awaitingPhysics || !n || flights.size > 0;
    ui.plan.hidden = !(hintsOn && hasPlan && !done && !planDone);
    const open = showHints();
    ui.next.disabled = ui.finish.disabled = toppling || !open.length;
    if (!aim) updateStabilityMeter(strainWith());
    if (!done && !drag && !toppling) ui.hint.textContent = defaultHint();
    dirty = true;
  }
  function selectBlueprint(planId, announce = true) {
    if (!BLUEPRINT_MAP[planId]) return;
    const changed = currentPlan !== planId;
    if (changed) {
      if (done) leaveDone();
      // Switching plans cancels any pending completion callback from a previous plan's Build rest.
      for (const f of flights) { f.part.finishing = false; f.part.finishPlan = null; }
      for (const p of history) { p.finishing = false; p.finishPlan = null; }
    }
    currentPlan = planId;
    if (planId !== 'free') { lastNamedPlan = planId; hintsOn = true; }
    else hintsOn = false;
    loadBlueprintSlots(planId);
    if (changed && announce) {
      sound.pick();
      const pill = ui.planPills.find(b => b.dataset.plan === planId);
      pill?.scrollIntoView?.({ inline: 'center', block: 'nearest', behavior: reduced.matches ? 'auto' : 'smooth' });
    }
    refresh();
    updateAim();
    if (announce) {
      const bp = BLUEPRINT_MAP[planId];
      const msg = planId === 'free'
        ? 'Free build selected. Build anything you like.'
        : history.length
          ? `${bp.name} blueprint selected (${slots.length} bricks). Start again for a clear deck, or build on top.`
          : `${bp.name} selected: ${bp.summary}`;
      if (!done && !toppling) ui.hint.textContent = msg;
      say(msg);
    }
  }
  function select(type, playSound = false) {
    selected = type;
    for (const b of ui.styles) b.setAttribute('aria-pressed', String(b.dataset.type === type));
    ghostBody.geometry = ghostMask.geometry = geometryOf[type]; ghostLine.geometry = edgesOf[type]; ghostRim.geometry = boxOf[type];
    updateFlips();
    ui.rotate.disabled = isSquare(type);
    if (playSound) sound.pick();
    refresh();
    updateAim();
  }
  function setLook(look) {
    currentLook = look;
    for (const b of ui.looks) b.setAttribute('aria-pressed', String(b.dataset.look === look));
    for (const b of ui.styles) b.querySelector('img').src = pictures[look][b.dataset.type];
    updateAim();
  }
  function updateFlips() { for (const b of ui.styles) b.classList.toggle('tg-flip', !isSquare(b.dataset.type) && (rot + view) % 2 === 1); }
  function rotateBrick() {
    if (isSquare(selected)) return;
    rot = 1 - rot; stats.rotates++; sound.rotate(); updateFlips(); updateAim();
    if (!done && !drag) ui.hint.textContent = 'Brick rotated. The pictures below show which way it now runs.';
    say(rot ? 'Brick rotated.' : 'Brick rotated back.');
  }
  function setAim(target) {
    aim = target;
    ghost.visible = Boolean(target);
    let wobbly = false, risky = false;
    if (target) {
      const strain = strainWith(holdOf(target.type, target.i, target.j, target.rot, target.level));
      const info = updateStabilityMeter(strain);
      aimState = info.state;
      wobbly = info.state === 'wobbly';
      risky = info.state === 'risky';
      ghost.position.set(target.x, target.y, target.z); ghost.rotation.y = target.rotY;
      ghostSkin.color.set(wobbly ? '#e01414' : colourOf(currentLook, nextShade(), target.level));
      ghostSkin.opacity = wobbly ? .6 : 1;
      const edge = wobbly ? '#e01414' : risky ? '#d97706' : '#ff8a1f', t = TYPES[target.type], rim = 2.5 / frame.scale * 2, solid = n => n - .014;
      ghostLine.material.color.set(edge); ghostRim.material.color.set(edge);
      ghostRim.scale.set((solid(t.nx * PITCH) + rim) / solid(t.nx * PITCH), (solid(t.plates * PLATE) + rim) / solid(t.plates * PLATE), (solid(t.nz * PITCH) + rim) / solid(t.nz * PITCH));
      if (wobbly && !wasWobbly) sound.creak();
    } else {
      aimState = 'solid';
      updateStabilityMeter(strainWith());
    }
    wasWobbly = wobbly;
    aimRisky = wobbly || risky;
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

  function checkMilestones(part) {
    if (part.silent) return;
    const unlocked = [];
    const unlock = (id, label) => {
      if (milestones.has(id)) return;
      milestones.add(id);
      stats.milestones++;
      unlocked.push(label);
    };
    const count = placedCount(), courses = maxCourses();
    const [nx, nz] = footprint(part.type, part.cell.rot);
    if (count >= 4) unlock('first_course', 'First course laid');
    if (part.hold && part.hold.under.size >= 2) unlock('open_span', 'Open span bridged');
    if (part.cell.i < -4 || part.cell.i + nx > 4 || part.cell.j < -4 || part.cell.j + nz > 4) unlock('overhang', 'Bold overhang');
    if (courses >= 6) unlock('skyline', 'Skyline reached: 6 courses high');
    if (courses >= 10) unlock('towering', 'Towering height: 10 courses');
    if (count >= 25) unlock('master', 'Master builder: 25 bricks');

    const planJustDone = currentPlan !== 'free' && slots.length > 0 && slots.every(s => s.filled) && !planCompletedAnnounced;
    if (planJustDone) {
      planCompletedAnnounced = true;
      const name = BLUEPRINT_MAP[currentPlan].name;
      showToast(`${name} complete`, true);
      sound.celebrate();
      effects.confetti(heightOf(maxPlates()), STRIPES);
      say(`${name} blueprint complete.`);
      return;
    }
    if (unlocked.length) {
      const text = unlocked[unlocked.length - 1];
      showToast(text, false);
      sound.milestone();
      say(`Milestone: ${text}.`);
    }
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
    part.object.visible = true;
    part.object.position.copy(part.rest);
    part.object.scale.set(1, 1, 1);
    const t = TYPES[part.type], [nx, nz] = footprint(part.type, part.cell.rot);
    const willFinish = Boolean(part.finishing && !flights.size && part.finishPlan === currentPlan);
    if (!part.silent) {
      sound.snap(part.cell.level, part.hold ? part.hold.studs : 2);
      effects.bounce(part, t.plates * PLATE / 2);
      effects.burstAt(part.rest.x, heightOf(part.cell.level), part.rest.z, nx * PITCH / 2, nz * PITCH / 2, part.stone, Boolean(part.slot));
      say(`${t.label} placed. ${placedCount()} in all.`);
    }
    if (!willFinish) checkMilestones(part);
    refresh();
    if (willFinish) { part.finishing = false; part.finishPlan = null; finishRun(); }
    if (part.topples) { part.topples = false; startCollapse(); }
  }
  /* Every brick comes straight down, the only way it can reach its place. */
  function drop(part, delay = 0) {
    const d = reduced.matches ? 0 : .22, high = part.rest.y + .7;
    part.object.position.set(part.rest.x, high, part.rest.z);
    if (delay > 0 && !reduced.matches) part.object.visible = false;
    if (!d) { land(part); return; }
    flights.add({ part, t: -delay, d, high });
    dirty = true;
  }
  function placeBrick(target, anyway = false) {
    if (toppling) return null;
    if (history.length >= MAX_BRICKS) { ui.hint.textContent = `That is ${MAX_BRICKS} bricks, the most this version allows.`; return null; }
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
    sound.creak();
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
    const token = ++physicsToken;
    toppling = awaitingPhysics = true;
    refresh();
    try { cannon = await loadPhysics(); } catch {
      if (token !== physicsToken) return;
      toppling = awaitingPhysics = false; refresh(); ui.hint.textContent = 'The physics file did not load, so nothing was placed.'; return;
    }
    if (token !== physicsToken || !running) return;
    awaitingPhysics = false;
    if (!toppling) { refresh(); return; }
    const before = snapshot();
    toppling = false;
    const part = placeBrick(target, true);
    if (!part) { refresh(); return; }
    toppling = true;
    cleared = before;
    cleared.wipe = true;
    part.topples = true;
    ui.hint.textContent = 'Here goes…';
    refresh();
    if (part.state === 'placed' && part.topples) { part.topples = false; startCollapse(); }
  }
  /* Deliberate Topple button: knock the whole tower down with Cannon-es physics. Undo snaps it straight back. */
  async function toppleTower() {
    if (toppling || awaitingPhysics || !history.length) return;
    sound.unlock();
    if (flights.size) {
      for (const f of [...flights]) {
        flights.delete(f);
        f.part.finishing = false; f.part.finishPlan = null; f.part.topples = false;
        f.part.object.visible = true;
        f.part.silent = true; land(f.part); f.part.silent = false;
      }
    }
    celebrate = null; done = false; model.rotation.y = 0; hideToast();
    setAim(null);
    const token = ++physicsToken;
    toppling = awaitingPhysics = true;
    ui.hint.textContent = 'Preparing the tumble…';
    refresh();
    try { cannon = await loadPhysics(); } catch {
      if (token !== physicsToken) return;
      toppling = awaitingPhysics = false; refresh(); ui.hint.textContent = 'The physics file did not load, so the tower stayed up.'; return;
    }
    if (token !== physicsToken || !running) return;
    awaitingPhysics = false;
    if (!toppling || !history.length) { toppling = false; refresh(); return; }
    const before = snapshot();
    cleared = before;
    cleared.wipe = true;
    clearRubble();
    sound.creak();
    ui.hint.textContent = 'Timber…';
    startDeliberateCollapse();
    if (toppling) refresh();
  }
  const snapshot = () => history.map(p => ({ type: p.type, cell: p.cell, batch: p.batch, look: p.look, shade: p.shade }));
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
    hideToast();
    effects.clear();
    const { fallen, grips, leans } = failingBricks();
    const index = new Map(fallen.map((p, k) => [p, k]));
    const pieces = fallen.map(p => ({ object: p.object, ...boxOfPart(p) }));
    collapse = createCollapse(cannon, {
      pieces, shell: foundationBoxes(), standing: history.map(boxOfPart), groundY: -.035,
      grips: grips.map(g => ({ a: index.get(g.a), b: index.get(g.b), studs: g.studs })),
      leans: leans.map(l => ({ piece: index.get(l.part), x: l.x, z: l.z })),
      onImpact: speed => { if (running) sound.clatter(speed); }
    });
    stats.toppled++;
    lastCollapse = { fell: fallen.length, stayed: history.length, clumpsAtStart: collapse.clumps };
    collapseWait = reduced.matches ? 0 : .14;
    if (reduced.matches) { collapse.advanceBudget(16, 40); if (collapse.settled) endCollapse(); }
    dirty = true;
  }
  function startDeliberateCollapse() {
    lastPlaced = null;
    effects.clear();
    const fallen = history.slice();
    const grips = [];
    for (const p of fallen) {
      for (const [q, studs] of p.hold.under) grips.push({ a: p, b: q, studs });
    }
    history.length = 0;
    for (const p of fallen) { if (p.slot) p.slot.filled = null; p.slot = null; p.state = 'debris'; p.object.visible = true; }
    rebuildGrid();
    const index = new Map(fallen.map((p, k) => [p, k]));
    const pieces = fallen.map(p => ({ object: p.object, ...boxOfPart(p) }));
    // Push forward-right relative to the current camera angle so the tumble plays right across the stage.
    const pushDir = new Vector3(1.1, 0, 1.35).applyAxisAngle(Y, viewAngle);
    const impulse = { vx: pushDir.x * 1.45, vy: 1.5, vz: pushDir.z * 1.45, spinX: pushDir.z * 1.8, spinZ: -pushDir.x * 1.8 };
    collapse = createCollapse(cannon, {
      pieces, shell: foundationBoxes(), standing: [], groundY: -.035,
      grips: grips.map(g => ({ a: index.get(g.a), b: index.get(g.b), studs: g.studs })),
      leans: [],
      impulse,
      onImpact: speed => { if (running) sound.clatter(speed); }
    });
    stats.toppled++;
    lastCollapse = { fell: fallen.length, stayed: 0, clumpsAtStart: collapse.clumps, deliberate: true };
    collapseWait = reduced.matches ? 0 : .08;
    if (reduced.matches) { collapse.advanceBudget(16, 40); if (collapse.settled) endCollapse(); }
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
      part.silent = true;
      commit(part, planTarget(s));
      drop(part, delay);
      delay += .055;
    }
    if (part) {
      part.silent = false;
      part.finishing = true;
      part.finishPlan = currentPlan;
      if (!flights.size) { part.finishing = false; part.finishPlan = null; finishRun(); }
    }
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
  /* Undo takes back the last action: one brick, everything Build rest added, a Topple, or Start again. */
  function undo() {
    if (drag || awaitingPhysics) return;
    lastPlaced = null;
    if (cleared?.wipe) wipe();
    if (cleared) { restore(); return; }
    if (!history.length) return;
    if (done) leaveDone();
    const batch = history[history.length - 1].batch;
    while (history.length && history[history.length - 1].batch === batch) {
      const part = history.pop();
      for (const f of flights) if (f.part === part) flights.delete(f);
      if (part.slot) { part.slot.filled = null; planCompletedAnnounced = false; }
      discard(part);
    }
    sound.undo();
    stats.undos++;
    rebuildGrid();
    refit();
    say(`Undone. ${placedCount()} left.`);
    refresh();
    updateAim();
  }
  function wipe() {
    physicsToken++;
    collapse = null; toppling = false; awaitingPhysics = false; celebrate = null; done = false; model.rotation.y = 0;
    flights.clear(); rubbleOut.clear(); effects.clear(); history.length = 0;
    for (const s of slots) s.filled = null;
    for (const p of [...bricks]) discard(p);
    rebuildGrid();
  }
  function restore() {
    for (const { type, cell, batch, look, shade } of cleared) {
      const part = spawn(type, look);
      part.shade = shade ?? part.shade;
      part.batch = batch;
      part.silent = true;
      commit(part, makeTarget(type, cell.i, cell.j, cell.rot, { level: cell.level, studs: 0 }));
      land(part);
      part.silent = false;
    }
    cleared = null;
    planCompletedAnnounced = slots.length > 0 && slots.every(s => s.filled);
    sound.undo();
    stats.undos++;
    refit();
    say(`Build restored. ${placedCount()} bricks.`);
    refresh();
    updateAim();
  }
  function restart() {
    physicsToken++;
    lastPlaced = null;
    const keep = cleared?.wipe ? cleared : history.length ? snapshot() : null;
    collapse = null; toppling = false; awaitingPhysics = false; rubbleOut.clear(); effects.clear(); hideToast();
    cleared = keep;
    celebrate = null; done = false; flights.clear(); model.rotation.y = 0; history.length = 0; rot = 0;
    milestones.clear(); planCompletedAnnounced = false;
    updateFlips();
    for (const s of slots) s.filled = null;
    for (const p of [...bricks]) discard(p);
    rebuildGrid();
    refit();
    sound.undo();
    say('All bricks cleared. Undo brings them back.');
    refresh();
    if (cleared) ui.hint.textContent = 'All bricks cleared. Undo brings them back.';
    ui.styles.find(b => b.dataset.type === selected).focus();
  }
  function paintStone() { for (const p of bricks) p.material.color.copy(p.stone); dirty = true; }
  function finishRun() {
    const focusInPlan = ui.plan.contains(document.activeElement);
    done = true;
    setAim(null);
    const hasPlan = currentPlan !== 'free' && slots.length > 0;
    const planDone = hasPlan && slots.every(s => s.filled && s.filled.state === 'placed');
    const bpName = BLUEPRINT_MAP[currentPlan].name;
    const n = placedCount();
    ui.hint.textContent = planDone
      ? `${bpName} complete (${n} ${n === 1 ? 'brick' : 'bricks'}). Save a photo, build on, or try another blueprint.`
      : `Your tower is finished: ${n} ${n === 1 ? 'brick' : 'bricks'}, ${maxCourses()} high. Save a photo, build on, or start again.`;
    say(ui.hint.textContent);
    if (planDone) { planCompletedAnnounced = true; showToast(`${bpName} complete`, true); }
    const levels = history.map(p => p.cell.level);
    for (const p of history) { if (p.look === 'grey') p.pride.set(stripeAt(p.cell.level)); else p.pride.copy(p.stone); }
    sound.celebrate();
    refresh();
    if (focusInPlan && !ui.done.disabled) ui.done.focus({ preventScroll: true });
    if (reduced.matches) { for (const p of bricks) p.material.color.copy(p.pride); dirty = true; return; }
    effects.confetti(heightOf(Math.max(3, ...levels)), STRIPES);
    celebrate = { t: 0, top: Math.max(1, ...levels) };
  }

  async function savePhoto() {
    if (!placedCount() || flights.size || toppling || awaitingPhysics) return;
    sound.unlock();
    const prevGhost = ghost.visible;
    const prevHints = slots.map(s => s.hint.visible);
    ghost.visible = false;
    for (const s of slots) s.hint.visible = false;
    renderer.render(scene, camera);
    const hasPlan = currentPlan !== 'free' && slots.length > 0;
    const planDone = hasPlan && slots.every(s => s.filled && s.filled.state === 'placed');
    const title = hasPlan ? `FORRT ${BLUEPRINT_MAP[currentPlan].name}` : 'My FORRT tower';
    const stab = stabilityInfo(strainWith());
    const postcard = renderPostcardCanvas({
      sourceCanvas: ui.canvas,
      title,
      bricks: placedCount(),
      courses: maxCourses(),
      stability: stab.pct,
      blueprintDone: planDone
    });
    ghost.visible = prevGhost;
    slots.forEach((s, i) => { s.hint.visible = prevHints[i]; });
    dirty = true;
    stats.photos++;
    sound.pick();
    const slug = hasPlan ? currentPlan : 'tower';
    await downloadPostcard(postcard, `forrt-${slug}.png`);
    const msg = `Postcard saved as forrt-${slug}.png.`;
    showToast('Postcard saved', false);
    if (!done && !toppling) ui.hint.textContent = msg;
    say(msg);
    return { width: postcard.width, height: postcard.height, filename: `forrt-${slug}.png` };
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
    if (drag || !running || done || toppling || (e.pointerType === 'mouse' && e.button !== 0)) return;
    sound.unlock();
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
    sound.unlock();
    select(b.dataset.type, true);
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
    if (release && !done && !toppling) {
      const target = targetAt(point), now = performance.now();
      const repeat = lastPlaced && now - lastPlaced.t < BOUNCE_MS && stillOn(point);
      if (target && !repeat && placeBrick(target)) { stats.drops++; lastPlaced = { t: now, x: point.x, y: point.y, i: target.i, j: target.j }; }
      else if (!target && !fromTray && !repeat) { stats.misses++; ui.hint.textContent = surfaceCell(point) ? 'That stack has reached the height limit.' : 'No studs there. Point at the top of the tower.'; }
    }
    if (e.pointerType === 'mouse' && lastPoint && !cancelled && !done && !toppling) { setAim(targetAt(toCanvas(e))); } else setAim(null);
    lastPoint = e.pointerType === 'mouse' ? lastPoint : null;
  }
  let keyTabbing = false;
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
    sound.unlock();
    const digit = /^(?:Digit|Numpad)(\d)$/.exec(e.code)?.[1] ?? (/^\d$/.test(k) ? k : null);
    if (digit !== null) { const type = TYPE_KEYS[(+digit + 9) % 10]; select(type, true); say(`${TYPES[type].label} chosen.`); return; }
    if (k === 'r') { rotateBrick(); return; }
    if (k === 't') { turnView(); return; }
    if (k === 'm') { toggleSound(); return; }
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
    sound.turn();
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
  function toggleSound() {
    sound.enabled = !sound.enabled;
    ui.sound.setAttribute('aria-pressed', String(sound.enabled));
    ui.sound.setAttribute('aria-label', sound.enabled ? 'Sound on' : 'Sound off');
    if (sound.enabled) { sound.unlock(); sound.pick(); }
    say(sound.enabled ? 'Sound effects on.' : 'Sound effects muted.');
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
  ui.tray.addEventListener('click', e => { const b = e.target.closest('.tg-style'); if (b) { sound.unlock(); select(b.dataset.type, false); say(`${TYPES[b.dataset.type].label} chosen.`); } });
  ui.d.querySelector('#tg-plans').addEventListener('click', e => {
    const b = e.target.closest('.tg-plan-pill');
    if (!b) return;
    sound.unlock();
    selectBlueprint(b.dataset.plan, true);
  });
  ui.d.querySelector('#tg-looks').addEventListener('click', e => {
    const b = e.target.closest('.tg-look');
    if (!b) return;
    sound.unlock();
    sound.pick();
    setLook(b.dataset.look);
    const text = { grey: 'New bricks will be grey. Done gives grey bricks their pride stripes.', brick: 'New bricks will be red brick. Bricks already placed keep their look.', pride: 'New bricks take a pride colour from their height, so stripes rise as you build.' }[b.dataset.look];
    if (!done && !drag) ui.hint.textContent = text;
    say(text);
  });
  ui.warnGo.addEventListener('click', hideWarning);
  ui.warnAnyway.addEventListener('click', () => { sound.unlock(); placeAnyway(); });
  ui.warn.addEventListener('keydown', e => { if (e.repeat) e.preventDefault(); });
  ui.rotate.addEventListener('click', () => { sound.unlock(); rotateBrick(); });
  ui.view.addEventListener('click', () => { sound.unlock(); turnView(); });
  ui.undo.addEventListener('click', () => { sound.unlock(); undo(); });
  ui.next.addEventListener('click', () => { sound.unlock(); placeNext(); });
  ui.finish.addEventListener('click', () => { sound.unlock(); finishAll(); });
  ui.restart.addEventListener('click', () => { sound.unlock(); restart(); });
  ui.topple.addEventListener('click', toppleTower);
  ui.photo.addEventListener('click', () => { savePhoto(); });
  ui.sound.addEventListener('click', toggleSound);
  ui.done.addEventListener('click', () => {
    if (performance.now() - doneAt < 400) return;
    doneAt = performance.now();
    sound.unlock();
    if (done) { leaveDone(); refresh(); updateAim(); } else if (history.length) finishRun();
  });
  ui.hints.addEventListener('click', () => {
    sound.unlock();
    sound.pick();
    if (currentPlan === 'free') {
      selectBlueprint(lastNamedPlan, true);
      return;
    }
    hintsOn = !hintsOn;
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
    if (effects.tick(dt)) dirty = true;
    // Subtle micro-tremor on risky or wobbly ghost previews (skipped under reduced motion).
    if (aim && aimRisky && ghost.visible && !reduced.matches) {
      tremorPhase += dt * (aimState === 'wobbly' ? 42 : 24);
      const amp = aimState === 'wobbly' ? .018 : .008;
      ghost.position.set(aim.x + Math.sin(tremorPhase) * amp, aim.y, aim.z + Math.cos(tremorPhase * 1.3) * amp);
      dirty = true;
    }
    if (collapse) {
      if (reduced.matches) {
        collapse.advanceBudget(16, 40);
        if (collapse.settled) { dirty = true; endCollapse(); }
      } else {
        collapseWait -= dt;
        if (collapseWait <= 0) collapse.advance(dt);
        dirty = true;
        reframeIn -= dt;
        if (reframeIn <= 0 && !framing) { reframeIn = .25; const want = wantedBounds(); if (want.t - want.b > bounds.t - bounds.b + .01) refit(); }
        if (collapse.settled) endCollapse();
      }
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
  const stop = () => {
    running = false; physicsToken++; awaitingPhysics = false; cancelAnimationFrame(raf); raf = 0; hideToast(); effects.clear(); sound.close();
    if (drag) onUp({ pointerId: drag.id, type: 'pointercancel' });
    if (!ui.warn.hidden) { warnCursor = null; hideWarning(); }
    setAim(null);
  };

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
    const wash = document.createElement('canvas'); wash.width = 164; wash.height = 100;
    const x = wash.getContext('2d'), bands = x.createLinearGradient(30, 0, 134, 0);
    STRIPES.forEach((col, n) => { bands.addColorStop(n / 6, col); bands.addColorStop((n + 1) / 6, col); });
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
    m.geometry = geometryOf.b1x4; m.material = stones[4];
    renderer.render(s, c); ui.d.querySelector('#tg-turn-a').src = ui.canvas.toDataURL();
    m.rotation.y = Math.PI / 2; renderer.render(s, c); ui.d.querySelector('#tg-turn-b').src = ui.canvas.toDataURL();
    red.dispose(); pale.dispose();
  }

  drawPicker();
  aimCamera();
  resize();
  new ResizeObserver(() => { resize(); if (running) renderer.render(scene, camera); }).observe(ui.stage);
  setLook(currentLook);
  selectBlueprint('free', false);
  select(selected);

  return {
    hideWarning, strainWith, holdOf, tooWobbly, stabilityInfo, STRAIN_LIMIT, ghostSkin, ghostLine, ghostBody, colourOf,
    start, stop, resize, renderer, stats, bricks, slots, camera, scene, model, ghost, overlay, project, placedCount,
    maxPlates, maxCourses, frame, openSlots, landing, targetAt, freeTargetAt, surfaceCell, history, flights,
    commit, land, spawn, restart, undo, select, selectBlueprint, rotateBrick, turnView, placeBrick, makeTarget,
    toppleTower, savePhoto, toggleSound, castRay, raycaster, sound, effects, milestones,
    get currentPlan() { return currentPlan; },
    get drag() { return drag; }, get aim() { return aim; }, get cursor() { return cursor; },
    get busy() { return Boolean(flights.size || framing || turning || toppling); },
    get toppling() { return toppling; }, get collapse() { return collapse; }, get lastCollapse() { return lastCollapse; },
    get worstHold() { return worstHold; }, get selected() { return selected; }, get look() { return currentLook; },
    get view() { return view; }, get hintsOn() { return hintsOn; }, get done() { return done; }, get rot() { return selectedRot(); },
    MIN_CELL, MAX_CELL, MAX_PLATES, mesh, foundationTop, TYPES, TYPE_KEYS, BLUEPRINTS, footprint, heightOf
  };
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
  /* Test hooks. Excluded from the production bundle. */
  Object.defineProperty(window.towerGame, 'g', { get: () => game });
  const idx = p => game.bricks.indexOf(p);
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
      return {
        placed: g.placedCount(), used: g.history.length, courses: g.maxCourses(),
        plan: g.currentPlan, slotsTotal: g.slots.length, slotsFilled: g.slots.filter(s => s.filled).length,
        open: ui.d.open, hintsShown: g.slots.filter(s => s.hint.visible).length,
        last: g.history.length ? { ...g.history[g.history.length - 1].cell, type: g.history[g.history.length - 1].type } : null,
        stats: g.stats, hint: ui.hint.textContent, selected: g.selected, rot: g.rot, view: g.view, done: g.done,
        soundOn: g.sound.enabled, milestones: [...g.milestones],
        stability: g.stabilityInfo(g.strainWith()),
        aim: g.aim && { i: g.aim.i, j: g.aim.j, rot: g.aim.rot, level: g.aim.level, type: g.aim.type },
        ghost: g.ghost.visible, warning: !ui.warn.hidden, toppling: g.toppling, lastCollapse: g.lastCollapse,
        rubble: g.bricks.filter(p => p.state === 'debris').length, strain: +g.strainWith().toFixed(1),
        wobblyAim: Boolean(g.aim) && g.tooWobbly(g.aim),
        ghostColour: '#' + g.ghostSkin.color.getHexString(),
        lastColour: g.history.length ? '#' + g.history[g.history.length - 1].stone.getHexString() : null,
        ghostEdge: '#' + g.ghostLine.material.color.getHexString()
      };
    },
    settled() { return !game.busy && !game.drag; },
    frameSize() { return { w: game.frame.width, h: game.frame.height }; },
    meshUnder,
    cellPoint(i, j, level) { return game.project(new Vector3(.15 + .3 * i, game.heightOf(level) + .002, .15 + .3 * j)); },
    legalSpots() {
      const g = game, out = [];
      for (let i = g.MIN_CELL; i <= g.MAX_CELL; i++) for (let j = g.MIN_CELL; j <= g.MAX_CELL; j++) { const r = g.landing(g.selected, i, j, g.rot); if (r) out.push(`${i},${j},${r.level}`); }
      return out;
    },
    spotPoint(i, j, level) {
      const g = game, [nx, nz] = g.footprint(g.selected, g.rot);
      const q = g.project(new Vector3(.15 + .3 * (i + (nx - 1) / 2), g.heightOf(level), .15 + .3 * (j + (nz - 1) / 2)));
      return q.x >= 0 && q.y >= 0 && q.x <= g.frame.width && q.y <= g.frame.height ? q : null;
    },
    tryPlace(type, i, j, rot = 0) { const g = game, r = g.landing(type, i, j, rot); if (!r) return 'none'; const wasFlying = g.placeBrick(g.makeTarget(type, i, j, rot, r)); if (wasFlying) { g.land(wasFlying); for (const f of [...g.flights]) if (f.part === wasFlying) g.flights.delete(f); return 'placed'; } g.hideWarning(); return 'refused'; },
    place(type, i, j, rot = 0) { const g = game, r = g.landing(type, i, j, rot); if (!r) return null; const p = g.spawn(type); p.silent = true; g.commit(p, g.makeTarget(type, i, j, rot, r)); g.land(p); p.silent = false; return r; },
    audit() {
      const g = game, F = g.foundationTop, placed = g.history.filter(p => p.state === 'placed');
      const offGrid = [], wrongLevel = [], unconnected = [], collisions = [], slidIn = [];
      const eps = 1e-3;
      const onLattice = v => Math.abs((v - .15) / .3 - Math.round((v - .15) / .3)) < eps;
      const fixed = g.model.children.filter(o => o.isMesh && o.name === 'Fixed castle masonry');
      let foundationStuds = [], foundationStudTop = -Infinity;
      for (const m of fixed) { const c = studCentres(m); if (c.top > foundationStudTop + eps) { foundationStudTop = c.top; foundationStuds = c.studs; } else if (Math.abs(c.top - foundationStudTop) < eps) foundationStuds.push(...c.studs); }
      const foundationOffGrid = foundationStuds.filter(s => !(onLattice(s.x) && onLattice(s.z)));
      const foundationCells = new Set(foundationStuds.map(s => Math.round((s.x - .15) / .3) + ',' + Math.round((s.z - .15) / .3)));
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
          if (here.some(([, hi]) => hi > bottom + eps)) trapped = true;
          if (here.some(([, hi]) => Math.abs(hi - bottom) < eps) || (Math.abs(bottom - F) < eps && foundationCells.has(key))) touches++;
        }
        if (touches < 1) unconnected.push(idx(p));
        if (trapped) slidIn.push(idx(p));
        for (let a = i0; a < i0 + nx; a++) for (let b = j0; b < j0 + nz; b++) { const key = a + ',' + b; if (!col.has(key)) col.set(key, []); col.get(key).push([bottom, bottom + h]); }
      }
      return { placed: placed.length, offGrid: offGrid.length, wrongLevel: wrongLevel.length, unconnected: unconnected.length, collisions: collisions.length, slidIn: slidIn.length, foundationStuds: foundationStuds.length, foundationOffGrid: foundationOffGrid.length };
    },
    simulate(mode, runs, bricks = 60, planId = 'castle') {
      const g = game; let stuck = 0, completed = 0, faults = 0, placed = 0;
      if (mode === 'plan') g.selectBlueprint(planId, false);
      for (let r = 0; r < runs; r++) {
        g.restart();
        if (mode === 'plan') {
          for (let open = g.openSlots(); open.length; open = g.openSlots()) { const s = open[Math.floor(Math.random() * open.length)]; const p = g.spawn(s.type); p.silent = true; g.commit(p, g.makeTarget(s.type, s.i, s.j, s.rot, g.landing(s.type, s.i, s.j, s.rot))); g.land(p); p.silent = false; }
          if (g.slots.every(s => s.filled)) completed++; else stuck++;
        } else {
          for (let n = 0; n < bricks; n++) {
            const type = g.TYPE_KEYS[Math.floor(Math.random() * g.TYPE_KEYS.length)], rot = Math.floor(Math.random() * 2), spots = [];
            for (let i = g.MIN_CELL; i <= g.MAX_CELL; i++) for (let j = g.MIN_CELL; j <= g.MAX_CELL; j++) { if (g.landing(type, i, j, rot)) spots.push([i, j]); }
            const [i, j] = spots[Math.floor(Math.random() * spots.length)];
            const part = g.spawn(type); part.silent = true; g.commit(part, g.makeTarget(type, i, j, rot, g.landing(type, i, j, rot))); g.land(part); part.silent = false;
          }
          completed++;
        }
        const a = window.towerGame.audit();
        placed += a.placed;
        faults += a.offGrid + a.wrongLevel + a.unconnected + a.collisions + a.slidIn;
      }
      g.restart();
      return { mode, planId, runs, stuck, completed, faults, placed };
    }
  });
}
