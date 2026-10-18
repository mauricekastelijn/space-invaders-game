# Space Invaders · Neon Arcade

A complete mobile-first Space Invaders recreation using **Three.js 0.186.1**, with original procedural voxel sprites. No original game artwork or audio is included.

## Play

Open the hosted game: https://maurice-space-invaders.arcanepeony36.chatgpt.site (owner sign-in required).

- **Phone:** hold ◀ / ▶, or drag anywhere on the playfield to steer. Autofire starts enabled; toggle it to fire manually with FIRE.
- **Desktop:** ← / → or A / D to steer, Space to shoot, P / Escape to pause.
- Tap SOUND OFF to enable synthesized arcade sound.
- Three lives, destructible shields, bonus UFOs, accelerating formations, endless waves and a local best score.
- Switching tabs or apps pauses the game automatically. Both portrait and landscape layouts are supported.

## Run locally

```sh
python3 -m http.server 8080 --directory dist
```

Visit http://localhost:8080. Use a web server rather than opening index.html directly because the game uses ES modules. No build, API keys or package installation is required; Three.js is vendored with its MIT license.

## Verify

With Node.js 20 or later:

```sh
npm test
npm run check
```

The game engine is independent of rendering and has deterministic tests covering movement, pause, collisions, shields, lives, UFOs, wave advancement and extended simulation.

## Deploy on GitHub Pages

In repository **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/docs`, then save. The `docs/` folder contains the same standalone release as `dist/`. Alternatively serve `dist/` on any static HTTPS host. The included `.openai/hosting.json` applies only to the hosted ChatGPT Site.

## Files

- `dist/` — standalone playable release
- `docs/` — GitHub Pages release
- `dist/engine.js` — simulation and collision logic
- `dist/game.js` — Three.js rendering, input and synthesized sound
- `tests/` — Node.js engine tests

Best scores stay in browser local storage. Sound is off until enabled. Touch input uses Pointer Events and the renderer caps device pixel ratio at 2 to limit GPU load. A WebGL-capable modern browser is required.
