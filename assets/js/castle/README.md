# The home-page castle

The animated brick tower in the home page's arched door. Hugo bundles it with `js.Build` from `layouts/partials/doors/home/scripts.html`, using Three.js 0.186.0 from `assets/three/`. No Node is needed to build the site.

| File | Role |
|---|---|
| `castle-scene.js` | Scene, lights, timeline. Exposes `window.forrtCastle` |
| `castle-geometry.js` | The bricks |
| `castle-piles.js` | Baked resting poses of the two heaps. Generated, see below |
| `bake-castle-piles.js` | Offline physics bake for those poses. Never part of the site's bundle |
| `illustrations-render.js` | Offline renderer for the four area illustrations. Never part of the site's bundle |
| `../doors/castle.js` | Loads the bundle after paint and owns playback: pause, hover, tap, off-screen suspension. Also opens the tower game, see `../tower/README.md` |
| `../doors/motion.js` | The pause state the castle shares with the home page's quotes, remembered between visits |

**Behaviour.** The still image paints first. The bundle loads after that, and not at all under reduced motion, Save-Data or no WebGL, so the home page works if the castle does not. The tower builds once, turns every 120 seconds and takes a colour wave after each change. Hovering dismantles it. The pause button and "Build it yourself" appear on hover, on keyboard focus and after a tap.

**To measure it on a device**, add `?fps` to the home page's address, which shows the frame rate, or `?fps=20`, which also caps drawing at that rate.

**To turn it off**, set `doors.castle = false` in `config/_default/params.toml`. Visitors then see only the still.

**After changing the geometry or the scene**, regenerate the still, so it still lines up when the bundle takes over. Its renderer, `render_castle_still.py`, left the repository at launch with the other Doors preview tools; recover it from `scripts/rebrand/` in the history of the `rebrand-doors` branch.

**After changing which bricks move**, re-bake the heaps. This is the one step that needs Node, and only on the machine doing it:

```sh
npm install --prefix /tmp/castle-bake --no-audit --no-fund three@0.186.0 cannon-es@0.20.0 esbuild@0.28.2
NODE_PATH=/tmp/castle-bake/node_modules /tmp/castle-bake/node_modules/.bin/esbuild assets/js/castle/bake-castle-piles.js --bundle --platform=node --format=cjs --outfile=/tmp/castle-bake/bake.cjs
node /tmp/castle-bake/bake.cjs assets/js/castle/castle-piles.js
```

`setVariant("stone" | "pride" | "brick")`, `seek(seconds)` and `setProgress(0..1)` pin a pose for screenshots.
