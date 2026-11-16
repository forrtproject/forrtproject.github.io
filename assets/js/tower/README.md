# The tower game

A free-building Lego game that opens in a dialog from "Build it yourself" on the home page. `../doors/castle.js` loads it when a visitor presses that button.

The site serves two prebuilt files from `static/js/tower/`, which have to stay in the same folder:

| File | Size gzipped | Fetched when |
|---|---|---|
| `game.bundle.js` | 166 KB, with its own copy of Three.js | The visitor presses the button |
| `physics.bundle.js` | 25 KB | The first wobble warning |

The sources are here, and Hugo does not read them. Rebuilding is the one step that needs Node, and only on the machine doing it. From the repository's root:

```sh
npm install --prefix /tmp/tower-build --no-audit --no-fund three@0.186.0 cannon-es@0.20.0 esbuild@0.28.2
NODE_PATH=/tmp/tower-build/node_modules /tmp/tower-build/node_modules/.bin/esbuild assets/js/tower/game.js --bundle --minify --format=iife --outfile=static/js/tower/game.bundle.js --legal-comments=eof --define:__DEBUG__=false
NODE_PATH=/tmp/tower-build/node_modules /tmp/tower-build/node_modules/.bin/esbuild assets/js/tower/physics-entry.js --bundle --minify --format=iife --global-name=CANNON --outfile=static/js/tower/physics.bundle.js --legal-comments=eof
```

The game calls `window.forrtHeroSuspend(true)` as it opens and `(false)` as it closes, so the castle stops drawing behind it. It adds its own styles and `<dialog>`, and uses the page's fonts.
