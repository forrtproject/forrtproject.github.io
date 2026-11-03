/* The castle scene for the Doors home page, from the design mock.
   The tower builds once, then turns slowly while a colour wave climbs it. hold(true) dismantles it; hold(false) builds the next facade.
   A studded toy castle, built in courses. Geometry and motion remain independent.
   Bundle with Three.js using the project's castle build command. */
import {
  Scene, OrthographicCamera, WebGLRenderer, HemisphereLight, DirectionalLight,
  Mesh, PlaneGeometry, ShadowMaterial, Group, Vector3, Quaternion,
  PCFSoftShadowMap, SRGBColorSpace, ACESFilmicToneMapping
} from 'three';
import { createBrickCastle } from './castle-geometry.js';
import { arrangeBrickPiles } from './castle-piles.js';

const canvas = document.getElementById('castle-canvas');
const stage = canvas?.parentElement;
if (canvas) {
  try {
    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    const scene = new Scene();
    const camera = new OrthographicCamera(-3.7, 3.7, 3, -3, .1, 40);
    const lookAt = new Vector3(0, 1.92, 0);
    camera.position.set(7.4, 6.4, 10.2);
    camera.lookAt(lookAt);

    // Neutral studio lighting preserves the stone and the coloured brick facades.
    scene.add(new HemisphereLight(0xffffff, 0x8b8379, 1.75));
    const key = new DirectionalLight(0xfffbf6, 3.5);
    // Higher than the original key light, so the shadow stays inside the canvas.
    key.position.set(-3, 11, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -6; key.shadow.camera.right = 6;
    key.shadow.camera.top = 7; key.shadow.camera.bottom = -5;
    key.shadow.camera.near = .5; key.shadow.camera.far = 22;
    key.shadow.normalBias = .012;
    key.shadow.bias = -.00008;
    key.shadow.radius = 3;
    scene.add(key);
    const fill = new DirectionalLight(0xf3f7ff, 1.25);
    fill.position.set(6, 4, -2); scene.add(fill);
    const rim = new DirectionalLight(0xffffff, 1.2);
    rim.position.set(-3, 5, -5); scene.add(rim);

    const { model, assemblyParts, recolourParts, height } = createBrickCastle();
    const turntable = new Group();
    turntable.add(model); scene.add(turntable);
    const ground = new Mesh(new PlaneGeometry(30, 30), new ShadowMaterial({ opacity: .18 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -.035;
    ground.receiveShadow = true;
    scene.add(ground);

    const clamp = value => Math.max(0, Math.min(1, value));
    const smooth = value => { const p = clamp(value); return p * p * (3 - 2 * p); };
    const easeOut = value => 1 - Math.pow(1 - clamp(value), 3);
    const rotation = new Quaternion();
    // Every loose brick has a permanent resting place in one of the two heaps.
    const parts = [...assemblyParts].sort((a, b) => a.order - b.order).map(({ object, order, palette }, index) => ({
      object, order, palette, index, rest: object.position.clone(), quaternion: object.quaternion.clone()
    }));
    arrangeBrickPiles(parts);
    // The wave climbs by height, across moving and fixed bricks alike.
    const recoloured = recolourParts.map(({ object, palette }) => ({ object, palette, rest: object.position.clone() }));
    const waveLevels = [...parts, ...recoloured].map(part => part.rest.y);
    const waveLow = Math.min(...waveLevels), waveHigh = Math.max(...waveLevels);
    const waveHeight = part => (part.rest.y - waveLow) / (waveHigh - waveLow);
    const cycleLength = 21;
    const buildStart = 1.25;
    const buildDuration = 7.75;
    const reverseStart = 12.35;
    const reverseDuration = 6.2;
    let valid = true, lastTime = 0, origin = 0, replayPending = false, progressOverride = null;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const variants = ['stone', 'pride', 'brick'];
    // The first view is always the grey stone tower closest to the FORRT logo.
    const startingVariant = 0;
    const builtAt = buildStart + buildDuration;
    const waveLength = 15, waveRest = 30, turnSeconds = 120;
    let facade = startingVariant, previous = startingVariant, settledAt = builtAt, nextWaveAt = builtAt + waveRest, waveStart = null;
    let held = false, rebuilding = null, spin = 0, spinFrom = 0, lastLocal = 0;
    const name = index => variants[index % variants.length];

    // Maps page time to the original timeline, the facade colours and any recolouring wave.
    function timeline(time) {
      if (!rebuilding && held && time >= settledAt) { rebuilding = { start: time, buildAt: null, recolour: false }; spinFrom = spin; }
      if (waveStart !== null && time - waveStart >= waveLength) { waveStart = null; previous = facade; nextWaveAt = time + waveRest; }
      if (!rebuilding && waveStart === null && time >= nextWaveAt) { previous = facade; facade += 1; waveStart = time; }
      const wave = waveStart === null ? undefined : (time - waveStart) / waveLength;
      const flow = { target: name(facade), previous: name(previous), wave };
      if (!rebuilding) return { ...flow, t: Math.min(time, builtAt) };
      if (rebuilding.buildAt === null) {
        const r = time - rebuilding.start;
        // A dismantle always finishes; bricks stay in their heaps until the visitor moves away.
        if (r < reverseDuration || held) return { ...flow, t: reverseStart + Math.min(r, reverseDuration) };
        rebuilding.buildAt = time;
        // A wave still climbing the fixed courses keeps its colours; otherwise the build brings the next facade.
        if (waveStart === null) { previous = facade; facade += 1; rebuilding.recolour = true; }
      }
      const t = buildStart + time - rebuilding.buildAt;
      const build = rebuilding.recolour ? clamp((t - buildStart) / buildDuration) : undefined;
      if (t < builtAt) return { target: name(facade), previous: name(previous), wave, build, t };
      if (waveStart === null) { previous = facade; nextWaveAt = time + waveRest; }
      settledAt = time; rebuilding = null;
      return { target: name(facade), previous: name(previous), wave, t: builtAt };
    }
    function hold(value) { held = Boolean(value); }
    let variantMode = 'auto';

    function setVariant(variant) {
      if (variant !== 'auto' && !variants.includes(variant)) return;
      variantMode = variant;
      render();
    }

    function place(part, amount, dismantling = false) {
      const p = clamp(amount);
      const clearance = Math.max(height + .30, part.rest.y + .62);
      if (p === 1) {
        part.object.position.copy(part.rest);
        part.object.quaternion.copy(part.quaternion);
      } else if (p === 0) {
        part.object.position.copy(part.staging);
        part.object.quaternion.copy(part.stagedQuaternion);
      } else if (dismantling) {
        const departure = 1 - p;
        if (departure < .22) {
          // Unseat vertically before carrying the brick clear of the battlements.
          part.object.position.copy(part.rest);
          part.object.position.y += (clearance - part.rest.y) * smooth(departure / .22);
        } else if (departure < .57) {
          part.object.position.lerpVectors(part.rest, part.staging, smooth((departure - .22) / .35));
          part.object.position.y = clearance;
        } else {
          // Gravity-like acceleration into the heap, then one small settling bounce.
          const drop = clamp((departure - .57) / .34);
          part.object.position.copy(part.staging);
          part.object.position.y += (clearance - part.staging.y) * (1 - drop * drop);
          if (departure > .91) {
            const settle = (departure - .91) / .09;
            part.object.position.y += Math.sin(settle * Math.PI) * .055 * (1 - settle);
          }
        }
        rotation.copy(part.quaternion).slerp(part.stagedQuaternion, smooth((departure - .18) / .73));
        part.object.quaternion.copy(rotation);
      } else {
        if (p < .24) {
          part.object.position.copy(part.staging);
          part.object.position.y += (clearance - part.staging.y) * smooth(p / .24);
        } else if (p < .78) {
          part.object.position.lerpVectors(part.staging, part.rest, smooth((p - .24) / .54));
          part.object.position.y = clearance;
        } else {
          part.object.position.copy(part.rest);
          part.object.position.y += (clearance - part.rest.y) * (1 - easeOut((p - .78) / .22));
        }
        rotation.copy(part.stagedQuaternion).slerp(part.quaternion, smooth(p / .70));
        part.object.quaternion.copy(rotation);
      }
    }

    const lift = .05;
    const climb = (phase, part) => smooth((phase - waveHeight(part) * .6) / .4);

    function assemblyAt(time) {
      const flow = timeline(time);
      const t = flow.t;
      const reducedStatic = reduced.matches && !document.body.classList.contains('motion-opt-in');
      const targetVariant = variantMode === 'auto' ? flow.target : variantMode;
      const previousVariant = variantMode === 'auto' ? flow.previous : variantMode;
      stage.dataset.variant = targetVariant;
      const lastIndex = Math.max(1, parts.length - 1);
      const waving = flow.wave !== undefined && progressOverride === null && !reducedStatic;
      const climbing = waving ? flow.wave : progressOverride === null && !reducedStatic ? flow.build : undefined;
      for (const part of recoloured) {
        const colourProgress = climbing === undefined ? 1 : climb(climbing, part);
        for (const colours of part.palette) colours.material.color.lerpColors(colours[previousVariant], colours[targetVariant], colourProgress);
        part.object.position.y = part.rest.y + (waving ? Math.sin(colourProgress * Math.PI) * lift : 0);
      }
      let assembled = 0;
      for (const part of parts) {
        const fraction = part.index / lastIndex;
        let amount;
        if (progressOverride !== null || reducedStatic) {
          // Scrubbing represents construction progress, independent of the loop.
          const progress = reducedStatic && progressOverride === null ? 1 : progressOverride;
          const local = (progress * (buildDuration + .8) - fraction * buildDuration) / .8;
          amount = clamp(local);
        } else if (t < reverseStart) {
          const startsAt = buildStart + fraction * (buildDuration - .8);
          const local = (t - startsAt) / .8;
          amount = clamp(local);
        } else {
          // Top courses leave first and become the bottom of each persistent heap.
          const startsAt = reverseStart + (1 - fraction) * (reverseDuration - 1.1);
          const local = (t - startsAt) / 1.1;
          amount = 1 - clamp(local);
        }
        // Incoming bricks bring the next facade's colours; settled outgoing bricks
        // retain theirs until they rise into the following build.
        // A recolouring wave climbs the tower: each brick lifts slightly and comes back in its new colour.
        const colourProgress = waving ? climb(flow.wave, part) : reducedStatic || progressOverride !== null || t >= reverseStart ? 1 : smooth(amount / .72);
        for (const colours of part.palette || []) {
          colours.material.color.lerpColors(colours[previousVariant], colours[targetVariant], colourProgress);
        }
        place(part, amount, progressOverride === null && !reducedStatic && t >= reverseStart);
        if (waving && amount > .999) part.object.position.y += Math.sin(colourProgress * Math.PI) * lift;
        if (amount > .999) assembled++;
      }
      stage.dataset.assembly = assembled === parts.length ? 'complete' : 'building';
      stage.dataset.looseBricks = String(parts.length - assembled);
      stage.dataset.assemblyProgress = String(Math.round(assembled / Math.max(parts.length, 1) * 100));
    }

    function resize() {
      const { width, height: stageHeight } = stage.getBoundingClientRect();
      if (!width || !stageHeight) return;
      renderer.setSize(width, stageHeight, false);
      const aspect = width / stageHeight;
      // Leave room for both persistent heaps and the airborne pieces on every screen.
      const halfHeight = Math.max(3.25, 3.6 / aspect);
      camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect;
      camera.top = halfHeight; camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
    }

    function render(time = lastTime, x = 0, y = 0) {
      if (!valid) return;
      lastTime = Number.isFinite(time) ? time : lastTime;
      if (replayPending) { origin = lastTime; replayPending = false; }
      const localTime = lastTime - origin;
      const still = reduced.matches && !document.body.classList.contains('motion-opt-in');
      if (!still && progressOverride === null) {
        const dt = Math.max(0, Math.min(.1, localTime - lastLocal));
        if (rebuilding) {
          // Come back to the front before the heaps form, so they stay in frame.
          const home = Math.round(spinFrom / (Math.PI * 2)) * Math.PI * 2;
          spin = spinFrom + (home - spinFrom) * smooth((localTime - rebuilding.start) / 2.5);
        } else if (localTime > settledAt) {
          spin += dt * Math.PI * 2 / turnSeconds * clamp((localTime - settledAt) / 6);
        }
      }
      lastLocal = localTime;
      turntable.rotation.y = still ? 0 : spin + x * .15;
      camera.position.y = 6.4 + (still ? 0 : y * .35);
      camera.lookAt(lookAt);
      assemblyAt(localTime);
      renderer.render(scene, camera);
    }

    function replay() { progressOverride = null; replayPending = true; }
    function setProgress(value) { progressOverride = clamp(Number(value) || 0); render(); }
    function clearProgress() { progressOverride = null; render(); }
    function seek(seconds) { origin = lastTime - Math.max(0, Number(seconds) || 0); progressOverride = null; replayPending = false; render(); }

    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault(); valid = false; stage.dataset.engine = 'fallback';
    });
    canvas.addEventListener('webglcontextrestored', () => {
      valid = true; stage.dataset.engine = 'webgl'; resize(); render();
    });
    window.forrtCastle = { hold, setSpin(value) { spin = value; render(); }, resize, render, replay, setProgress, clearProgress, seek, setVariant,
      info: { cycleLength, buildStart, buildDuration, reverseStart, reverseDuration, movingBricks: parts.length, height, variants, startingStyle: variants[startingVariant] } };
    resize(); render(); stage.dataset.engine = 'webgl';
  } catch (error) {
    stage.dataset.engine = 'fallback';
    console.warn('Castle using static fallback:', error.message);
  }
}
