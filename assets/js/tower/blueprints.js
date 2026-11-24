/* Playable blueprints for the tower game, alongside Free build.
   Every blueprint sits on the 8x8 foundation deck (cells -4..3), obeys Lego stud & plate rules,
   and stays strictly within STRAIN_LIMIT in any valid bottom-up placement order. */

function buildCastle() {
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

function buildOpenArch() {
  const plan = [];
  const add = (type, i, j, rot, level) => plan.push({ type, i, j, rot, level });
  // Grounded plinth steps on both flanks (leaves a 4-stud open portal in the middle).
  add('b2x2', -4, -1, 0, 0); add('b2x2', 2, -1, 0, 0);
  add('b1x2', -4, 1, 0, 0); add('b1x2', -4, -2, 0, 0);
  add('b1x2', 2, 1, 0, 0); add('b1x2', 2, -2, 0, 0);
  // Rising twin pillars (courses 2 & 3).
  add('b2x2', -4, -1, 0, 3); add('b2x2', 2, -1, 0, 3);
  add('b2x2', -4, -1, 0, 6); add('b2x2', 2, -1, 0, 6);
  // Corbelled arch shoulders meeting at the centre.
  add('b2x4', -4, -1, 0, 9); add('b2x4', 0, -1, 0, 9);
  // Locking lintel course spanning the seam, plus flanking blocks.
  add('b2x4', -2, -1, 0, 12);
  add('b2x2', -4, -1, 0, 12); add('b2x2', 2, -1, 0, 12);
  // Cornice plates and central keystone crest.
  add('p2x4', -4, -1, 0, 15); add('p2x4', 0, -1, 0, 15);
  add('b2x2', -1, -1, 0, 16);
  add('b1x1', -4, -1, 0, 16); add('b1x1', -4, 0, 0, 16);
  add('b1x1', 3, -1, 0, 16); add('b1x1', 3, 0, 0, 16);
  return plan;
}

function buildTwinBridge() {
  const plan = [];
  const add = (type, i, j, rot, level) => plan.push({ type, i, j, rot, level });
  // Two flanking lookout towers at i = -4..-3 and i = 2..3, j = -2..1.
  for (const level of [0, 3]) {
    add('b2x2', -4, -2, 0, level); add('b2x2', -4, 0, 0, level);
    add('b2x2', 2, -2, 0, level); add('b2x2', 2, 0, 0, level);
  }
  // Skybridge deck plates cantilevering inward to meet cleanly over the middle.
  add('p2x4', -4, -2, 0, 6); add('p2x4', -4, 0, 0, 6);
  add('p2x4', 0, -2, 0, 6); add('p2x4', 0, 0, 0, 6);
  // Bridge tie deck locking both halves together, plus upper tower rooms.
  add('p2x4', -2, -2, 0, 7); add('p2x4', -2, 0, 0, 7);
  add('b2x2', -4, -2, 0, 7); add('b2x2', -4, 0, 0, 7);
  add('b2x2', 2, -2, 0, 7); add('b2x2', 2, 0, 0, 7);
  // Front and back parapets along the open skywalk.
  add('b1x4', -2, 1, 0, 8); add('b1x4', -2, -2, 0, 8);
  // Tower parapet caps.
  add('p2x4', -4, -2, 1, 10); add('p2x4', 2, -2, 1, 10);
  for (const [i, j] of [[-4, -2], [-4, 1], [3, -2], [3, 1]]) add('b1x1', i, j, 0, 11);
  return plan;
}

function buildLighthouse() {
  const plan = [];
  const add = (type, i, j, rot, level) => plan.push({ type, i, j, rot, level });
  // Broad stepped base centred at (-2..1, -2..1) with four cardinal buttresses.
  add('b2x4', -2, -2, 0, 0); add('b2x4', -2, 0, 0, 0);
  add('b1x2', -1, 2, 0, 0); add('b1x2', -1, -3, 0, 0);
  add('b1x2', 2, -1, 1, 0); add('b1x2', -3, -1, 1, 0);
  // Second course cross-bonded 4x4.
  add('b2x4', -2, -2, 1, 3); add('b2x4', 0, -2, 1, 3);
  // Tapering octagon collar at level 6.
  add('b2x2', -1, -1, 0, 6);
  add('b1x2', -1, 1, 0, 6); add('b1x2', -1, -2, 0, 6);
  add('b1x2', 1, -1, 1, 6); add('b1x2', -2, -1, 1, 6);
  // Slender central shaft rising two courses (cross-bonded 1x2 pairs).
  add('b1x2', -1, -1, 0, 9); add('b1x2', -1, 0, 0, 9);
  add('b1x2', -1, -1, 1, 12); add('b1x2', 0, -1, 1, 12);
  // Overhanging gallery deck at level 15.
  add('p2x4', -2, -2, 0, 15); add('p2x4', -2, 0, 0, 15);
  // Lantern room and four gallery corner posts.
  add('b2x2', -1, -1, 0, 16);
  for (const [i, j] of [[-2, -2], [1, -2], [-2, 1], [1, 1]]) add('p1x1', i, j, 0, 16);
  // Lantern roof overhang and beacon cupola (reaches 24 plates / 8 courses high).
  add('p2x4', -2, -2, 1, 19); add('p2x4', 0, -2, 1, 19);
  add('b2x2', -1, -1, 0, 20);
  add('p2x2', -1, -1, 0, 23);
  return plan;
}

export const BLUEPRINTS = [
  { id: 'free', name: 'Free build', summary: 'Open deck with no guide boxes. Build whatever you like.', build: () => [] },
  { id: 'castle', name: 'Castle tower', summary: 'The FORRT keep with windows, an overhang ledge and a crown.', build: buildCastle },
  { id: 'arch', name: 'Open arch', summary: 'Twin pillars joined by an overhanging doorway and keystone.', build: buildOpenArch },
  { id: 'bridge', name: 'Twin bridge', summary: 'Two lookout towers linked high up by an open skywalk.', build: buildTwinBridge },
  { id: 'lighthouse', name: 'Lighthouse', summary: 'A tall tapering beacon with a gallery deck and lantern room.', build: buildLighthouse }
];

export const BLUEPRINT_MAP = Object.fromEntries(BLUEPRINTS.map(bp => [bp.id, bp]));
