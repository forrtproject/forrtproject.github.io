/* The education area plate: a stack of brick books under a mortarboard (assets/images/doors/area-education.webp).
   Rendered offline by scripts/rebrand/render_area_illustrations.py; never part of the site's bundle.
   Unlike illustrations-render.js, it takes its lights, shadow, materials, stud profile, brick pitch and course
   height from castle-scene.js and castle-geometry.js, and keeps the castle's camera scale. */
import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// ---- The castle's brick system (castle-geometry.js) ----
const PITCH = .30, COURSE = .27, PLATE = .09, GAP = .014;
const studGeometry = new T.LatheGeometry([
  new T.Vector2(0, 0), new T.Vector2(.078, 0), new T.Vector2(.087, .008),
  new T.Vector2(.087, .048), new T.Vector2(.080, .055), new T.Vector2(0, .055)
], 16);
const merge = parts => { const g = mergeGeometries(parts.map(p => p.index ? p.toNonIndexed() : p), false); g.computeBoundingSphere(); return g; };
const studAt = (x, y, z) => studGeometry.clone().applyMatrix4(new T.Matrix4().makeTranslation(x, y, z));
const cache = new Map();
function brickGeometry(width, height, depth, studs = true) {
  const key = [width, height, depth, studs].map(v => typeof v === 'number' ? v.toFixed(4) : v).join('/');
  if (cache.has(key)) return cache.get(key);
  // The joint gap applies only to real bricks; thin detail strips (page lines) keep their size.
  const inset = v => v > 2 * GAP ? v - GAP : v;
  const parts = [new RoundedBoxGeometry(inset(width), inset(height), inset(depth), 2, Math.min(.011, Math.min(width, height, depth) / 3))];
  if (studs) {
    const columns = Math.max(1, Math.floor((width - .18) / PITCH) + 1);
    const rows = Math.max(1, Math.floor((depth - .18) / PITCH) + 1);
    for (let x = 0; x < columns; x++) for (let z = 0; z < rows; z++) {
      const px = (x - (columns - 1) / 2) * PITCH, pz = (z - (rows - 1) / 2) * PITCH;
      if (Math.abs(px) + .09 < width / 2 && Math.abs(pz) + .09 < depth / 2) parts.push(studAt(px, (height - GAP) / 2, pz));
    }
  }
  const g = merge(parts); cache.set(key, g); return g;
}
function roundGeometry(radius, height, stud = true) {
  const key = `round/${radius}/${height}/${stud}`;
  if (cache.has(key)) return cache.get(key);
  const h = height - GAP;
  const parts = [new T.CylinderGeometry(radius - GAP / 2, radius - GAP / 2, h, 32, 1)];
  if (stud) parts.push(studAt(0, h / 2, 0));
  const g = merge(parts); cache.set(key, g); return g;
}

// ---- Colours: the castle's stone and brick, the Pride bands, and a few neutrals ----
const families = {
  stone: ['#55616a', '#5c6870', '#637078', '#505c65', '#6b757b', '#5a666e', '#626b71'],
  archStone: ['#79848a', '#707c83', '#65717a'],
  dark: ['#444f58', '#3d4850', '#48535c'],
  brick: ['#a84f39', '#b66147', '#9d4535', '#c17354', '#a95b44', '#bb5940', '#99503f'],
  purple: ['#7046a3', '#6a42a0', '#7a4fac'],
  blue: ['#2672b8', '#2a6fb2', '#2f79bd'],
  green: ['#2b985b', '#2a9156', '#31a061'],
  yellow: ['#edc438', '#e9bd33', '#f0ca45'],
  orange: ['#e98434', '#e47e2e', '#ec8b3d'],
  red: ['#ce4742', '#c8433f', '#d44f48'],
  cream: ['#f1ece0', '#ece6d8', '#f4f0e6'],
  ink: ['#9aa3a8'],
  wood: ['#b77a45', '#ad723f', '#bf8250'],
  glass: ['#cfe8f5'],
  bark: ['#7a4a2a', '#86522f', '#6f4325'],
  leaf: ['#3aa86a', '#41b071'],
  leafDark: ['#1f8650', '#23804c']
};
const materialCache = new Map();
function mat(color) {
  if (!materialCache.has(color)) materialCache.set(color, new T.MeshStandardMaterial({ color, roughness: .42, metalness: .025 }));
  return materialCache.get(color);
}
let serial = 1;
// Like the castle's stones: neighbouring bricks of one colour differ slightly.
const shade = family => { const list = families[family] || [family]; return mat(list[(serial++ * 17) % list.length]); };

function place(parent, geometry, material, x, y, z, rotY = 0) {
  const m = new T.Mesh(geometry, material);
  m.position.set(x, y, z); m.rotation.y = rotY; m.castShadow = true; m.receiveShadow = true;
  parent.add(m); return m;
}
/** A brick nx by nz studs, h high, its lower face at y. */
function brick(parent, nx, nz, color, x, y, z, { h = COURSE, rot = 0, studs = true } = {}) {
  return place(parent, brickGeometry(nx * PITCH, h, nz * PITCH, studs), shade(color), x, y + h / 2, z, rot);
}
/** A box of any size in world units (for tiles, cords and the like), lower face at y. */
function slab(parent, w, h, d, color, x, y, z, { rot = 0, studs = false } = {}) {
  return place(parent, brickGeometry(w, h, d, studs), shade(color), x, y + h / 2, z, rot);
}
function round(parent, radius, h, color, x, y, z, stud = true) {
  return place(parent, roundGeometry(radius, h, stud), typeof color === 'string' && color.startsWith('#') ? mat(color) : shade(color), x, y + h / 2, z);
}
function group(parent, x = 0, y = 0, z = 0, rotY = 0) {
  const g = new T.Group(); g.position.set(x, y, z); g.rotation.y = rotY; parent.add(g); return g;
}

// ---- Scene: castle-scene.js lighting and shadow ----
const canvas = document.querySelector('canvas');
const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(2);
renderer.setSize(1200, 800);
renderer.outputColorSpace = T.SRGBColorSpace;
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = T.PCFSoftShadowMap;
const scene = new T.Scene();
scene.add(new T.HemisphereLight(0xffffff, 0x8b8379, 1.75));
const key = new T.DirectionalLight(0xfffbf6, 3.5);
key.position.set(-3, 11, 6); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, { left: -6, right: 6, top: 7, bottom: -5, near: .5, far: 22 });
key.shadow.normalBias = .012; key.shadow.bias = -.00008; key.shadow.radius = 3;
scene.add(key);
const fill = new T.DirectionalLight(0xf3f7ff, 1.25); fill.position.set(6, 4, -2); scene.add(fill);
const rim = new T.DirectionalLight(0xffffff, 1.2); rim.position.set(-3, 5, -5); scene.add(rim);
const ground = new T.Mesh(new T.PlaneGeometry(30, 30), new T.ShadowMaterial({ opacity: .18 }));
ground.rotation.x = -Math.PI / 2; ground.position.y = -.035; ground.receiveShadow = true; scene.add(ground);
const model = new T.Group(); scene.add(model);
const VIEW = new T.Vector3(7.4, 6.4, 10.2);

// ======================================================================
// Education
// ======================================================================

/** One closed book lying flat: covers, a page block and a spine. Spine on local -z or +z. */
function closedBook(parent, nx, nz, cover, y, x, z, rot, spineFront) {
  const g = group(parent, x, y, z, rot);
  const w = nx * PITCH, d = nz * PITCH, s = spineFront ? 1 : -1;
  // Covers in two halves, so the joint shows like the castle's bonded courses.
  const half = Math.ceil(nx / 2);
  for (const [n, off] of [[half, -(nx - half) * PITCH / 2], [nx - half, half * PITCH / 2]]) {
    slab(g, n * PITCH, PLATE, d, cover, off, 0, 0);
    slab(g, n * PITCH, PLATE, d, cover, off, PLATE + COURSE, 0, { studs: true });
  }
  // The page block is set back from the three open edges.
  slab(g, w - .12, COURSE, d - .1, 'cream', -.0, PLATE, -s * .04);
  // Spine: one brick face along the bound edge.
  slab(g, w, COURSE, .1, cover, 0, PLATE, s * (d / 2 - .05));
  // Leaf lines on the fore-edge and the head, read as pages.
  for (let k = 1; k < 3; k++) {
    slab(g, w - .16, .006, .006, 'ink', 0, PLATE + k * COURSE / 3, -s * (d / 2 - .095));
    slab(g, .006, .006, d - .16, 'ink', w / 2 - .065, PLATE + k * COURSE / 3, -s * .04);
  }
  return PLATE * 2 + COURSE;
}

function eduStack() {
  // A tall stack of books, crowned with a mortarboard: teaching materials, gathered and shared.
  const books = [[11, 8, 'green', .04, true], [10, 7, 'blue', -.08, false], [10, 8, 'brick', .09, true], [9, 7, 'yellow', -.05, false], [10, 7, 'purple', .06, true], [9, 7, 'green', -.1, false], [8, 6, 'orange', .05, true]];
  let y = 0;
  books.forEach(([nx, nz, c, r, front], i) => { y += closedBook(model, nx, nz, c, y, i % 2 ? .06 : -.05, i % 2 ? -.05 : .05, r, front); });
  // Mortarboard: a studded skull cap and a square board set diagonally, with its tassel.
  const cap = group(model, 0, y, 0, .1);
  brick(cap, 4, 4, 'dark', 0, 0, 0);
  const board = group(cap, 0, COURSE, 0, Math.PI / 4);
  for (const off of [-.45, .45]) slab(board, 3 * PITCH, PLATE, 6 * PITCH, 'dark', off, 0, 0, { studs: true });
  round(board, .11, PLATE, 'yellow', 0, PLATE, 0, true);
  const cord = group(board, 0, PLATE + .05, 0, -Math.PI / 4);
  const reach = 6 * PITCH / 2 * Math.SQRT2 - .1;
  slab(cord, reach, .035, .05, 'yellow', reach / 2, 0, 0);
  slab(cord, .05, .5, .05, 'yellow', reach + .02, -.48, 0);
  round(cord, .08, .2, 'yellow', reach + .02, -.68, 0, false);
}

// ---- Render ----
const kind = 'stack';
eduStack();
const bounds = new T.Box3().setFromObject(model);
const center = bounds.getCenter(new T.Vector3());
// Fixed scale: the castle's camera on a 1200x800 canvas (halfHeight 3.25, aspect 1.5).
const camera = new T.OrthographicCamera(-4.875, 4.875, 3.25, -3.25, .1, 40);
camera.position.copy(center).add(VIEW); camera.lookAt(center); camera.updateMatrixWorld();
renderer.render(scene, camera);
window.renderReady = { kind, bounds: bounds.getSize(new T.Vector3()).toArray() };
