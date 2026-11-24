/* Synthesized Web Audio sound effects for the tower game.
   Pure Web Audio API, zero external assets. AudioContext starts lazily on the first user gesture
   and silently no-ops if audio is muted or unavailable. */

export function createSoundEngine() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let ctx = null;
  let master = null;
  let noiseBuf = null;
  let enabled = true;
  let lastClatter = 0;
  let lastCreak = 0;

  function ensure() {
    if (!enabled || !AudioCtx) return null;
    try {
      if (!ctx) {
        ctx = new AudioCtx();
        master = ctx.createGain();
        master.gain.value = enabled ? 1 : 0;
        master.connect(ctx.destination);
        const len = Math.floor(ctx.sampleRate * 0.14);
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = noiseBuf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === 'suspended' || ctx.state === 'interrupted') ctx.resume().catch(() => {});
      return ctx.state === 'closed' ? null : ctx;
    } catch {
      return null;
    }
  }

  function tone(freq, freqEnd, dur, type, vol, delay = 0) {
    const c = ensure();
    if (!c || !master) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (freqEnd !== freq) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(master);
    osc.onended = () => { osc.disconnect(); gain.disconnect(); };
    osc.start(t0);
    osc.stop(t0 + dur + 0.01);
  }

  function noise(filterFreq, q, dur, vol, delay = 0, filterType = 'bandpass') {
    const c = ensure();
    if (!c || !master || !noiseBuf) return;
    const t0 = c.currentTime + delay;
    const src = c.createBufferSource();
    src.buffer = noiseBuf;
    const filter = c.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.setValueAtTime(filterFreq, t0);
    filter.Q.setValueAtTime(q, t0);
    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.onended = () => { src.disconnect(); filter.disconnect(); gain.disconnect(); };
    src.start(t0);
    src.stop(t0 + Math.min(dur + 0.01, noiseBuf.duration));
  }

  /* Pentatonic rise with tower height so stacking feels subtly musical. */
  const SCALE = [293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];

  return {
    get enabled() { return enabled; },
    set enabled(v) {
      enabled = Boolean(v);
      if (master && ctx && ctx.state !== 'closed') {
        master.gain.setValueAtTime(enabled ? 1 : 0, ctx.currentTime);
      }
    },
    unlock() { ensure(); },
    /* Crisp ABS plastic snap, pitched subtly by brick height and weight. */
    snap(level = 0, studs = 2) {
      const course = Math.min(SCALE.length - 1, Math.floor(Math.max(0, level) / 3));
      const pitch = SCALE[course] * (0.98 + Math.random() * 0.04);
      noise(2500 + course * 140, 2.2, 0.022, 0.14);
      tone(pitch * 1.15, pitch * 0.72, 0.048, 'triangle', 0.13);
      if (studs >= 4) tone(155, 95, 0.045, 'sine', 0.09);
    },
    pick() {
      tone(620, 480, 0.022, 'triangle', 0.055);
    },
    rotate() {
      tone(500, 620, 0.025, 'triangle', 0.065);
      tone(680, 740, 0.02, 'sine', 0.045, 0.022);
    },
    turn() {
      noise(900, 1.4, 0.085, 0.06, 0, 'bandpass');
    },
    undo() {
      tone(440, 320, 0.055, 'triangle', 0.08);
      tone(320, 240, 0.06, 'sine', 0.06, 0.045);
    },
    creak() {
      const now = performance.now();
      if (now - lastCreak < 260) return;
      lastCreak = now;
      tone(190, 132, 0.14, 'sawtooth', 0.045);
      noise(650, 3.0, 0.09, 0.05);
    },
    clatter(speed = 3) {
      const now = performance.now();
      if (now - lastClatter < 65) return;
      lastClatter = now;
      const strength = Math.min(1, Math.max(0.2, speed / 9));
      const base = 280 + Math.random() * 260;
      noise(1800 + Math.random() * 1400, 2.5, 0.032, 0.12 * strength);
      tone(base, base * 0.68, 0.04, 'triangle', 0.09 * strength);
    },
    milestone() {
      tone(523.25, 523.25, 0.14, 'triangle', 0.1);
      tone(783.99, 783.99, 0.22, 'triangle', 0.11, 0.09);
    },
    celebrate() {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, idx) => {
        tone(f, f, 0.28, 'triangle', 0.1, idx * 0.085);
        tone(f * 2, f * 2, 0.16, 'sine', 0.03, idx * 0.085);
      });
    },
    close() {
      if (ctx && ctx.state !== 'closed') {
        ctx.close().catch(() => {});
      }
      ctx = null;
      master = null;
      noiseBuf = null;
    }
  };
}
