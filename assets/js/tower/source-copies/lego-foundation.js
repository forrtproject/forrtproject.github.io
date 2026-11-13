/* Game foundation, cut from castle-geometry-v3.js. The walls are one stud thick (.30, not .36) and stop in a flat studded
   course, with no windows, and a deck fills the middle, so all 64 studs on top sit on the .30 grid the game's bricks use.
   A hollow, brick-built keep. Units are metres only by convention: one stud is .30.
   Bricks include their studs in a shared geometry and animate as individual parts. */
import {
  Group, Mesh, MeshStandardMaterial, Shape, ExtrudeGeometry,
  LatheGeometry, Vector2, Matrix4
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const PITCH = .30;
const COURSE = .27;
const GAP = .014;
const WALL = .30;
const FOUNDATION_COURSES = 9;
const FLOOR = .15;
const BODY_HALF = 1.20;
const GROUND = -.035;
// The shaped doorway bricks extend .005 below their nominal lower edge.
const GROUND_SHIFT = FLOOR + GAP / 2 - .005 - GROUND;
const CASTLE_HEIGHT = 4.02 - GROUND_SHIFT;

export function createFoundation() {
  const model = new Group();
  model.name = 'Brick-built stone keep';
  const assemblyParts = [];
  const cache = new Map();
  const stoneColours = ['#55616a', '#5c6870', '#637078', '#505c65', '#6b757b', '#5a666e', '#626b71'];
  const stones = stoneColours.map(color => new MeshStandardMaterial({
    color, roughness: .42, metalness: .025
  }));
  const archStones = ['#79848a', '#707c83', '#65717a'].map(color => new MeshStandardMaterial({
    color, roughness: .43, metalness: .025
  }));
  const mortar = new MeshStandardMaterial({color: '#444f58', roughness: .48, metalness: .02});
  // Stable brick identities also index the precomputed loose-brick pile poses.
  let serial = 1, removedBandBricks = 0;

  // The softened lip catches a narrow highlight without the cost of a bevel modifier.
  const studGeometry = new LatheGeometry([
    new Vector2(0, 0), new Vector2(.078, 0), new Vector2(.087, .008),
    new Vector2(.087, .048), new Vector2(.080, .055), new Vector2(0, .055)
  ], 16);

  function merge(parts) {
    const result = mergeGeometries(parts.map(part => part.index ? part.toNonIndexed() : part), false);
    result.computeBoundingSphere();
    return result;
  }

  function studAt(x, y, z) {
    return studGeometry.clone().applyMatrix4(new Matrix4().makeTranslation(x, y, z));
  }

  function brickGeometry(width, height, depth, studs = true) {
    const key = [width, height, depth, studs].map(value => typeof value === 'number' ? value.toFixed(4) : value).join('/');
    if (cache.has(key)) return cache.get(key);
    const parts = [new RoundedBoxGeometry(width - GAP, height - GAP, depth - GAP, 2, .011)];
    if (studs) {
      const columns = Math.max(1, Math.floor((width - .18) / PITCH) + 1);
      const rows = Math.max(1, Math.floor((depth - .18) / PITCH) + 1);
      for (let x = 0; x < columns; x++) for (let z = 0; z < rows; z++) {
        const px = (x - (columns - 1) / 2) * PITCH;
        const pz = (z - (rows - 1) / 2) * PITCH;
        if (Math.abs(px) + .09 < width / 2 && Math.abs(pz) + .09 < depth / 2) {
          parts.push(studAt(px, (height - GAP) / 2, pz));
        }
      }
    }
    const geometry = merge(parts);
    cache.set(key, geometry);
    return geometry;
  }

  function addPiece(geometry, {x = 0, y = 0, z = 0, rotation = 0, material, animate = false, order, name = 'Masonry brick'} = {}) {
    const object = new Group();
    object.name = name;
    object.position.set(x, y, z);
    object.rotation.y = rotation;
    const mesh = new Mesh(geometry, material || stones[(serial * 17 + Math.floor(y * 31)) % stones.length]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    object.add(mesh);
    object.userData = {brick: true, index: serial++, course: Math.floor((y - FLOOR) / COURSE), restHeight: y};
    model.add(object);
    if (animate) assemblyParts.push({object, order: order ?? y * 100 + (serial % 23) * .025});
    return object;
  }

  function wallPiece(geometry, x, y, side, material, animate, name) {
    const rotation = side * Math.PI / 2;
    const z = BODY_HALF - WALL / 2;
    return addPiece(geometry, {
      x: Math.cos(rotation) * x + Math.sin(rotation) * z,
      y,
      z: -Math.sin(rotation) * x + Math.cos(rotation) * z,
      rotation, material, animate, name
    });
  }

  // Front and right entrances are openings through the wall, including the arch.
  // Arches use circular boundaries; upper arrow windows have a small flat lintel.
  const openings = [
    [{bottom: FLOOR - .03, spring: .96, radius: .45, top: 1.41}],
    [{bottom: FLOOR - .03, spring: .81, radius: .36, top: 1.17}],
    [],
    []
  ];

  function halfOpening(opening, y) {
    if (opening.half) return opening.half;
    if (y <= opening.spring) return opening.radius;
    return Math.sqrt(Math.max(0, opening.radius ** 2 - (y - opening.spring) ** 2));
  }

  function rectangularIntervals(left, right, course) {
    const boundaries = [left];
    const offset = course % 2 ? .30 : 0;
    for (let x = -1.80 + offset; x < right - .01; x += .60) {
      if (x > left + .08) boundaries.push(x);
    }
    boundaries.push(right);
    return boundaries.slice(0, -1).map((x, i) => [x, boundaries[i + 1]]);
  }

  // Clip an individual masonry block against an aperture, leaving real air inside.
  // Curved edge points are sampled only on the handful of blocks around each arch.
  function clippedBrick(left, right, low, high, opening, direction) {
    const centerX = (left + right) / 2;
    const centerY = (low + high) / 2;
    const samples = 18;
    const points = [];
    let area = 0;
    const x0 = left + GAP / 2;
    const x1 = right - GAP / 2;
    const y0 = low + GAP / 2;
    const y1 = high - GAP / 2;
    for (let i = 0; i <= samples; i++) {
      const y = y0 + (y1 - y0) * i / samples;
      const boundary = direction < 0
        ? Math.min(x1, -halfOpening(opening, y) - .006)
        : Math.max(x0, halfOpening(opening, y) + .006);
      const width = direction < 0 ? Math.max(0, boundary - x0) : Math.max(0, x1 - boundary);
      area += width;
      points.push({y, boundary: direction < 0 ? Math.max(x0, boundary) : Math.min(x1, boundary)});
    }
    if (area < .025) return null;
    const shape = new Shape();
    if (direction < 0) {
      shape.moveTo(x0 - centerX, y0 - centerY);
      for (const point of points) shape.lineTo(point.boundary - centerX, point.y - centerY);
      shape.lineTo(x0 - centerX, y1 - centerY);
    } else {
      shape.moveTo(x1 - centerX, y0 - centerY);
      shape.lineTo(x1 - centerX, y1 - centerY);
      for (const point of points.slice().reverse()) shape.lineTo(point.boundary - centerX, point.y - centerY);
    }
    shape.closePath();
    const solid = new ExtrudeGeometry(shape, {depth: WALL - GAP - .012, bevelEnabled: true, bevelThickness: .006, bevelSize: .005, bevelSegments: 2, steps: 1, curveSegments: 10});
    solid.translate(0, 0, -(WALL - GAP - .012) / 2);
    const parts = [solid];
    // Studs belong only where the clipped brick still has a full-width top surface.
    const topBoundary = points[points.length - 1].boundary;
    for (let x = -1.05; x < 1.20; x += PITCH) {
      const permitted = direction < 0 ? x + .094 < topBoundary : x - .094 > topBoundary;
      if (permitted && x - .094 > x0 && x + .094 < x1) parts.push(studAt(x - centerX, y1 - centerY, 0));
    }
    return merge(parts);
  }

  for (let course = 0; course < FOUNDATION_COURSES; course++) {
    const low = FLOOR + course * COURSE;
    const high = low + COURSE;
    for (let side = 0; side < 4; side++) {
      // Alternate which pair passes through the corners, as physical brick bonds do.
      const fullWidth = side % 2 === course % 2;
      const half = fullWidth ? BODY_HALF : BODY_HALF - WALL;
      const rows = [low, high];
      const holes = openings[side];
      // An arch top inside a course leaves that course whole; only the bricks over the arch are shaped.
      let archTop = false;
      for (const hole of holes) for (const boundary of [hole.bottom, hole.top]) {
        if (boundary > low + .01 && boundary < high - .01) {
          if (hole.radius) archTop = true;
          else rows.push(boundary);
        }
      }
      rows.sort((a, b) => a - b);
      for (let section = 0; section < rows.length - 1; section++) {
        const bottom = rows[section];
        const top = rows[section + 1];
        const middleY = (bottom + top) / 2;
        const hole = holes.find(opening => middleY > opening.bottom && middleY < opening.top);
        for (const [left, right] of rectangularIntervals(-half, half, course + side)) {
          const middleX = (left + right) / 2;
          const animate = false;
          if (!hole || (right < -halfOpening(hole, bottom) - .01 || left > halfOpening(hole, bottom) + .01)) {
            wallPiece(brickGeometry(right - left, top - bottom, WALL), middleX, middleY, side, null, animate, 'Interlocking slate-grey wall brick');
          } else {
            for (const direction of [-1, 1]) {
              const geometry = clippedBrick(left, right, bottom, top, hole, direction);
              if (geometry) wallPiece(geometry, middleX, middleY, side, null, animate, 'Shaped masonry around an opening');
            }
          }
        }
      }
      // Serials index the baked heap poses, so the bricks of the removed band keep their numbers.
      if (archTop) {
        const skipped = rectangularIntervals(-half, half, course + side).length;
        serial += skipped;
        removedBandBricks += skipped;
      }
    }
  }

  // Specialised arch bricks project by .018, with a separate keystone and jambs.
  // Their inner radii exactly follow the openings cut into the structural wall.
  function addArch(side, radius, spring, count) {
    for (let i = 0; i < count; i++) {
      const start = i * Math.PI / count + .012;
      const end = (i + 1) * Math.PI / count - .012;
      const outer = radius + .135;
      const shape = new Shape();
      shape.absarc(0, 0, outer, start, end, false);
      shape.absarc(0, 0, radius + .007, end, start, true);
      shape.closePath();
      const geometry = new ExtrudeGeometry(shape, {depth: WALL + .025, bevelEnabled: true, bevelSize: .004, bevelThickness: .004, bevelSegments: 2, curveSegments: 6, steps: 1});
      geometry.translate(0, 0, -(WALL + .025) / 2);
      wallPiece(geometry, 0, spring, side, archStones[i % archStones.length], false, 'Individual arch voussoir');
    }
    const jambHeight = spring - FLOOR;
    const countJamb = Math.ceil(jambHeight / COURSE);
    for (let course = 0; course < countJamb; course++) {
      const h = jambHeight / countJamb;
      for (const sign of [-1, 1]) {
        wallPiece(brickGeometry(.132, h, WALL + .027, false), sign * (radius + .071), FLOOR + h * (course + .5), side, archStones[(course + side) % archStones.length], false, 'Arch jamb brick');
      }
    }
  }
  addArch(0, .45, .96, 7);
  addArch(1, .36, .81, 7);

  // A studded deck fills the space inside the walls, flush with their tops, so the whole top can be built on.
  const deckStone = new MeshStandardMaterial({color: '#757f84', roughness: .46, metalness: .02});
  addPiece(brickGeometry(6 * PITCH, COURSE / 3, 6 * PITCH), {y: FLOOR + FOUNDATION_COURSES * COURSE - COURSE / 6, material: deckStone, name: 'Deck'});

  for (const object of model.children) {
    object.position.y -= GROUND_SHIFT;
    object.userData.restHeight -= GROUND_SHIFT;
  }

  // Fixed bricks share a draw call per material. Moving bricks retain independent
  // pivots and shared geometries, so the detailed model stays economical on phones.
    const fixedByMaterial = new Map();
  model.updateMatrixWorld(true);
  for (const object of model.children.slice()) {
    object.traverse(mesh => {
      if (!mesh.isMesh) return;
      if (!fixedByMaterial.has(mesh.material)) fixedByMaterial.set(mesh.material, []);
      fixedByMaterial.get(mesh.material).push(mesh.geometry.clone().applyMatrix4(mesh.matrixWorld));
    });
    model.remove(object);
  }
  for (const [material, geometries] of fixedByMaterial) {
    const mesh = new Mesh(merge(geometries), material);
    mesh.name = 'Fixed castle masonry';
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    model.add(mesh);
    geometries.forEach(geometry => geometry.dispose());
  }
  return {model, brickGeometry, stones, foundationTop: FLOOR + FOUNDATION_COURSES * COURSE - GROUND_SHIFT, pitch: PITCH, course: COURSE, gap: GAP};
}
