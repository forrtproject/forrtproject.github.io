/* The collapse after "Place it anyway". Physics engines know nothing of studs, so grip is modelled by what moves together:
   bricks that grip each other form one rigid clump, and a hard enough knock breaks a clump at its weakest joints, those with
   the fewest studs. A clump starts on the bricks that stay, so a load leaning past the studs under it tips over their edge. */
const GRAVITY = -26, FRICTION = .55, BOUNCE = .18, DENSITY = 20;
const BREAK_SPEED = 1.6, BREAK_PER_SPEED = .75, BURST = .9, TIP = .55, TUMBLE = 2.2, EARLIEST_REST = 1.2, SHAKE_AT = .7, SHAKE = 9, TOP_SPEED = 15, TOP_SPIN = 12, TIME_LIMIT = 5, STEP = 1 / 60;

export function createCollapse(C, { pieces, grips, standing, shell, groundY, leans, random = Math.random }) {
  const world = new C.World({ gravity: new C.Vec3(0, GRAVITY, 0), allowSleep: true });
  world.broadphase = new C.SAPBroadphase(world);
  world.solver.iterations = 18;
  world.defaultContactMaterial.friction = FRICTION;
  world.defaultContactMaterial.restitution = BOUNCE;

  const fixed = b => world.addBody(new C.Body({ mass: 0, shape: new C.Box(new C.Vec3(b.hx, b.hy, b.hz)), position: new C.Vec3(b.x, b.y, b.z) }));
  shell.forEach(fixed);
  standing.forEach(fixed);
  const floor = new C.Body({ mass: 0, shape: new C.Plane(), position: new C.Vec3(0, groundY, 0) });
  floor.quaternion.setFromAxisAngle(new C.Vec3(1, 0, 0), -Math.PI / 2);
  world.addBody(floor);

  const turns = pieces.map(p => new C.Quaternion().setFromAxisAngle(new C.Vec3(0, 1, 0), p.rotY));
  const volume = p => p.hx * p.hy * p.hz;
  const clumps = new Set();
  const hits = new Map();
  let time = 0;
  /* No two joints are quite alike, so a stack of equal bricks does not come apart all at once. */
  const strength = grips.map(g => g.studs + random() * 1.5);

  function makeClump(members, offsetOf, origin, turn, velocityAt, spin, level) {
    let m = 0;
    const com = new C.Vec3();
    for (const k of members) { const v = volume(pieces[k]), o = offsetOf(k); m += v; com.x += o.x * v; com.y += o.y * v; com.z += o.z * v; }
    com.scale(1 / m, com);
    const body = new C.Body({ mass: 8 * m * DENSITY, position: origin.vadd(turn.vmult(com)), quaternion: turn.clone(), velocity: velocityAt(turn.vmult(com)), angularVelocity: spin.clone(), allowSleep: time >= EARLIEST_REST, sleepSpeedLimit: .6, sleepTimeLimit: .25 });
    const offsets = new Map();
    for (const k of members) {
      const p = pieces[k], o = offsetOf(k).vsub(com);
      offsets.set(k, o);
      body.addShape(new C.Box(new C.Vec3(p.hx, p.hy, p.hz)), o);
    }
    const clump = { body, members, offsets, level, from: body.position.clone() };
    body.addEventListener('collide', e => {
      if (members.length < 2) return;
      const speed = Math.abs(e.contact.getImpactVelocityAlongNormal());
      if (speed > BREAK_SPEED) hits.set(clump, Math.max(hits.get(clump) || 0, speed));
    });
    world.addBody(body);
    clumps.add(clump);
    return clump;
  }
  /* Groups of bricks still gripped together, ignoring joints of `level` studs or fewer. */
  function groupsOf(members, level) {
    const parent = new Map(members.map(k => [k, k]));
    const find = k => (parent.get(k) === k ? k : (parent.set(k, find(parent.get(k))), parent.get(k)));
    grips.forEach((g, n) => { if (strength[n] > level && parent.has(g.a) && parent.has(g.b)) parent.set(find(g.a), find(g.b)); });
    const groups = new Map();
    for (const k of members) { const r = find(k); if (!groups.has(r)) groups.set(r, []); groups.get(r).push(k); }
    return [...groups.values()];
  }
  function split(clump, speed) {
    clump.level += speed * BREAK_PER_SPEED;
    const groups = groupsOf(clump.members, clump.level);
    if (groups.length < 2) return;
    const { body, offsets, level } = clump;
    world.removeBody(body);
    clumps.delete(clump);
    // Joints letting go throw the parts a little apart, away from the middle of what broke.
    const velocityAt = r => {
      const out = body.velocity.vadd(body.angularVelocity.cross(r)), d = Math.hypot(r.x, r.y, r.z) || 1;
      return out.vadd(new C.Vec3(r.x / d * BURST, Math.abs(r.y) / d * BURST * .5, r.z / d * BURST));
    };
    // And no two parts leave quite alike, or equal bricks would land in a neat row.
    const tumble = () => (random() - .5) * TUMBLE;
    for (const members of groups) makeClump(members, k => offsets.get(k), body.position, body.quaternion, velocityAt, body.angularVelocity.vadd(new C.Vec3(tumble(), tumble(), tumble())), level);
  }

  const start = new C.Quaternion(), at = new C.Vec3(), none = new C.Vec3();
  for (const members of groupsOf(pieces.map((_, k) => k), 0)) {
    const clump = makeClump(members, k => new C.Vec3(pieces[k].x, pieces[k].y, pieces[k].z), at, start, () => none.clone(), none, 0);
    // The grip lets go on the far side first, so the clump starts to turn over the edge it is leaning past.
    const lean = leans.find(l => members.includes(l.piece));
    if (lean) {
      const dx = clump.body.position.x - lean.x, dz = clump.body.position.z - lean.z, d = Math.hypot(dx, dz) || 1;
      clump.body.angularVelocity.set(dz / d * TIP, 0, -dx / d * TIP);
    }
  }

  function stuck(clump) {
    const { body } = clump;
    if (clump.members.length > 1) { const before = clumps.size; split(clump, SHAKE); if (clumps.size !== before || !clumps.has(clump)) return; }
    const dx = body.position.x, dz = body.position.z, d = Math.hypot(dx, dz) || 1;
    body.velocity.set(dx / d * 1.6, 1, dz / d * 1.6);
    body.angularVelocity.set(dz / d * 3, 0, -dx / d * 3);
  }
  const v = new C.Vec3(), q = new C.Quaternion();
  function draw() {
    for (const { body, members, offsets } of clumps) for (const k of members) {
      body.quaternion.vmult(offsets.get(k), v);
      const o = pieces[k].object;
      o.position.set(body.position.x + v.x, body.position.y + v.y, body.position.z + v.z);
      body.quaternion.mult(turns[k], q);
      o.quaternion.set(q.x, q.y, q.z, q.w);
    }
  }
  function tick() {
    world.step(STEP);
    time += STEP;
    // A load tipping slowly moves about as little as one at rest, so nothing may count as settled until it has had time to go over.
    if (time >= EARLIEST_REST) for (const { body } of clumps) body.allowSleep = true;
    // Contacts this tight can throw a body far too hard. Nothing in a fall this small moves that fast.
    for (const { body } of clumps) {
      const speed = body.velocity.length(), spin = body.angularVelocity.length();
      if (speed > TOP_SPEED) body.velocity.scale(TOP_SPEED / speed, body.velocity);
      if (spin > TOP_SPIN) body.angularVelocity.scale(TOP_SPIN / spin, body.angularVelocity);
    }
    // A load whose weight happens to sit over something solid would stay put with the joint under it broken. The shock shakes it apart instead.
    if (!shaken && time >= SHAKE_AT) {
      shaken = true;
      for (const clump of [...clumps]) if (clump.body.position.distanceTo(clump.from) < .08) stuck(clump);
    }
    for (const [clump, speed] of hits) if (clumps.has(clump)) split(clump, speed);
    hits.clear();
  }
  let carry = 0, shaken = false;
  const atRest = () => time > TIME_LIMIT || (time > EARLIEST_REST + .25 && [...clumps].every(c => c.body.sleepState === C.Body.SLEEPING));
  return {
    /* Frames that run long slow the fall down rather than piling up steps. */
    advance(dt) { carry += dt; for (let n = 0; carry >= STEP && n < 3; n++) { tick(); carry -= STEP; } carry = Math.min(carry, STEP); draw(); },
    finish() { while (!atRest()) tick(); draw(); },
    get settled() { return atRest(); },
    get time() { return time; },
    get clumps() { return clumps.size; }
  };
}
