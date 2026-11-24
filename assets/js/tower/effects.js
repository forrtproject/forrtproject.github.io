/* Lightweight tactile effects for the tower game:
   - Crisp pooled dust / sparkle puffs when bricks snap into place
   - Pride-coloured confetti burst on blueprint completion & Done celebration
   - Subtle damped landing settle bounce (anchored at the brick's underside)
   All effects respect prefers-reduced-motion and reuse pooled geometries/materials. */
import { BoxGeometry, MeshBasicMaterial, Mesh, Group, Color } from 'three';

const POOL_SIZE = 76;

export function createEffects(scene, reduced) {
  const group = new Group();
  group.name = 'Tower effects';
  scene.add(group);

  const geo = new BoxGeometry(0.06, 0.06, 0.06);
  const pool = [];
  for (let i = 0; i < POOL_SIZE; i++) {
    const mat = new MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 1 });
    const mesh = new Mesh(geo, mat);
    mesh.visible = false;
    group.add(mesh);
    pool.push({
      mesh, mat, active: false,
      vx: 0, vy: 0, vz: 0,
      rx: 0, ry: 0, rz: 0,
      gravity: -5, t: 0, life: 0.4,
      sx: 1, sy: 1, sz: 1
    });
  }

  let cursor = 0;
  const bounces = new Set();

  function alloc() {
    for (let i = 0; i < POOL_SIZE; i++) {
      const p = pool[(cursor + i) % POOL_SIZE];
      if (!p.active) { cursor = (cursor + i + 1) % POOL_SIZE; return p; }
    }
    const p = pool[cursor];
    cursor = (cursor + 1) % POOL_SIZE;
    return p;
  }

  /* Crisp dust & optional teal/gold sparkle puff around a landed brick's base. */
  function burstAt(x, floorY, z, halfW, halfD, baseHex, sparkle = false) {
    if (reduced.matches) return;
    const count = sparkle ? 10 : 6;
    const baseColor = new Color(baseHex).lerp(new Color('#ffffff'), 0.45);
    for (let i = 0; i < count; i++) {
      const p = alloc();
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const cos = Math.cos(angle), sin = Math.sin(angle);
      p.active = true;
      p.t = 0;
      p.life = sparkle ? 0.36 + Math.random() * 0.14 : 0.24 + Math.random() * 0.1;
      p.gravity = sparkle ? -3.4 : -4.2;
      const speed = (sparkle ? 0.85 : 0.55) + Math.random() * 0.45;
      p.vx = cos * speed;
      p.vy = (sparkle ? 1.05 : 0.58) + Math.random() * 0.45;
      p.vz = sin * speed;
      p.rx = (Math.random() - 0.5) * 9;
      p.ry = (Math.random() - 0.5) * 9;
      p.rz = (Math.random() - 0.5) * 9;
      const size = sparkle && i % 2 === 0 ? 1.15 : 0.72 + Math.random() * 0.35;
      p.sx = size; p.sy = size * 0.65; p.sz = size;
      p.mat.color.copy(sparkle && i % 2 === 0 ? new Color(i % 4 === 0 ? '#e8b52c' : '#14808f') : baseColor);
      p.mat.opacity = 0.92;
      p.mesh.position.set(x + cos * halfW * 0.85, floorY + 0.03, z + sin * halfD * 0.85);
      p.mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      p.mesh.scale.set(p.sx, p.sy, p.sz);
      p.mesh.visible = true;
    }
  }

  /* Joyful pride-coloured Lego tile confetti burst around the top of the tower. */
  function confetti(topY, colours) {
    if (reduced.matches) return;
    const count = 42;
    for (let i = 0; i < count; i++) {
      const p = alloc();
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.9 + Math.random() * 2.1;
      p.active = true;
      p.t = 0;
      p.life = 1.15 + Math.random() * 0.75;
      p.gravity = -3.8;
      p.vx = Math.cos(angle) * speed;
      p.vy = 2.1 + Math.random() * 2.2;
      p.vz = Math.sin(angle) * speed;
      p.rx = (Math.random() - 0.5) * 11;
      p.ry = (Math.random() - 0.5) * 11;
      p.rz = (Math.random() - 0.5) * 11;
      p.sx = 1.45; p.sy = 0.38; p.sz = 1.1;
      p.mat.color.set(colours[i % colours.length]);
      p.mat.opacity = 1;
      p.mesh.position.set((Math.random() - 0.5) * 1.1, topY + 0.25 + Math.random() * 0.35, (Math.random() - 0.5) * 1.1);
      p.mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      p.mesh.scale.set(p.sx, p.sy, p.sz);
      p.mesh.visible = true;
    }
  }

  /* Brief damped squash-and-stretch on landing, anchored to the brick's bottom plane. */
  function bounce(part, halfH) {
    if (reduced.matches) return;
    bounces.add({ part, halfH, t: 0, dur: 0.13 });
  }

  function clear() {
    for (const p of pool) {
      p.active = false;
      p.mesh.visible = false;
    }
    for (const b of bounces) {
      b.part.object.scale.set(1, 1, 1);
      b.part.object.position.y = b.part.rest.y;
    }
    bounces.clear();
  }

  function tick(dt) {
    let alive = false;
    for (const p of pool) {
      if (!p.active) continue;
      p.t += dt;
      if (p.t >= p.life) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      alive = true;
      p.vy += p.gravity * dt;
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.mesh.rotation.x += p.rx * dt;
      p.mesh.rotation.y += p.ry * dt;
      p.mesh.rotation.z += p.rz * dt;
      const u = p.t / p.life;
      const fade = u > 0.55 ? 1 - (u - 0.55) / 0.45 : 1;
      p.mat.opacity = Math.max(0, fade);
      const shrink = 1 - u * 0.35;
      p.mesh.scale.set(p.sx * shrink, p.sy * shrink, p.sz * shrink);
    }
    for (const b of [...bounces]) {
      if (b.part.state !== 'placed') {
        b.part.object.scale.set(1, 1, 1);
        bounces.delete(b);
        continue;
      }
      b.t += dt;
      if (b.t >= b.dur) {
        b.part.object.scale.set(1, 1, 1);
        b.part.object.position.y = b.part.rest.y;
        bounces.delete(b);
        continue;
      }
      alive = true;
      const u = b.t / b.dur;
      // Quick gentle squash then slight rebound, decaying cleanly to 1.
      const wave = -Math.sin(u * Math.PI * 1.5) * Math.pow(1 - u, 1.5);
      const sy = 1 + wave * 0.085;
      const sxz = 1 - wave * 0.04;
      b.part.object.scale.set(sxz, sy, sxz);
      b.part.object.position.y = b.part.rest.y - b.halfH * (1 - sy);
    }
    return alive;
  }

  function dispose() {
    clear();
    geo.dispose();
    for (const p of pool) p.mat.dispose();
    scene.remove(group);
  }

  return { burstAt, confetti, bounce, clear, tick, dispose, get active() { return bounces.size > 0 || pool.some(p => p.active); } };
}
