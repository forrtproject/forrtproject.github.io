# Three.js, vendored for the home-page castle

These are unmodified files from the npm package `three@0.186.0` (MIT, see `LICENSE`), so Hugo's `js.Build` can bundle the castle without Node.

| Here | In the package |
|---|---|
| `index.js` | `build/three.module.js` |
| `three.core.js` | `build/three.core.js` |
| `addons/geometries/RoundedBoxGeometry.js` | `examples/jsm/geometries/RoundedBoxGeometry.js` |
| `addons/utils/BufferGeometryUtils.js` | `examples/jsm/utils/BufferGeometryUtils.js` |

To update, replace these four files from the new release, change the version here and in `assets/js/castle/README.md`, and look at the castle on the home page. This folder is excluded from spell checking.
