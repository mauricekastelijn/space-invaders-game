# Space Invaders · Neon Arcade

[![Build and deploy game](https://github.com/mauricekastelijn/space-invaders-game/actions/workflows/deploy.yml/badge.svg)](https://github.com/mauricekastelijn/space-invaders-game/actions/workflows/deploy.yml)

**[Play Space Invaders in your browser](https://mauricekastelijn.github.io/space-invaders-game/)**

A mobile-first Space Invaders recreation built with **Three.js 0.186.1**. Play directly on your phone or desktop; no installation is needed. The play link opens the game automatically.

## How to play

Defend Earth by clearing each alien wave. Shoot the bonus UFO for 150 points. Your shields absorb both your shots and enemy fire, and wear down as they are hit. You have three lives; the mission ends when you lose them or the aliens reach your ship. Each wave gets faster. Your best score is saved on your device.

1. Tap **START MISSION**.
2. On a **phone**, hold **◀ / ▶** to move, or drag across the playfield to steer.
3. **AUTO FIRE** is on by default. Turn it off if you prefer to hold **FIRE** yourself.
4. Tap **SOUND OFF** to enable arcade sound, and **Ⅱ** to pause.
5. After game over, tap **PLAY AGAIN** for a fresh run.

| Desktop key | Action |
| --- | --- |
| Left / Right arrows or A / D | Move |
| Space | Fire (hold for repeated shots) |
| P or Escape | Pause / resume |

The game supports portrait and landscape layouts. Switching tabs or apps automatically pauses the mission; tap **RESUME MISSION** when you return. Use a modern browser with WebGL enabled.

## Automatic builds and deployment

[GitHub Actions](https://github.com/mauricekastelijn/space-invaders-game/actions/workflows/deploy.yml) runs the following on every push to `main`:

1. Check JavaScript syntax.
2. Run the gameplay tests.
3. Build the standalone release into `_site/`.
4. Upload the release and deploy it to **GitHub Pages**.

Pull requests run the same checks and build without publishing. You can also launch a deployment from **Actions → Build and deploy game → Run workflow**. Deployment runs only after all checks pass. No personal access token, third-party hosting service, or npm dependency installation is required.

### One-time Pages setup

In [repository Settings → Pages](https://github.com/mauricekastelijn/space-invaders-game/settings/pages), set **Build and deployment → Source → GitHub Actions**. Then run the workflow, or push a commit to `main`. Once its deployment succeeds, the play link above is live and later pushes update it automatically.

## Run locally

With Python 3:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. Serve the files over HTTP rather than opening `index.html` directly because the game uses JavaScript modules.

## Test and build locally

With Node.js 22:

```sh
npm run check
npm test
npm run build
python3 -m http.server 8080 --directory _site
```

The build copies the validated game into `_site/dist/`, adds a root `index.html` that opens the game, and adds `.nojekyll`. The repository root has the same launcher, so branch-based Pages publishing also opens the game rather than rendering this README. All URLs are relative, so the game works under the repository's `/space-invaders-game/` path. Three.js is included locally with its MIT license.

## Project layout

- `index.html` — root launcher that opens the game in `dist/`.
- `dist/` — game source and standalone playable assets; edit these files.
- `dist/engine.js` — simulation and collision logic, independent of rendering.
- `dist/game.js` — Three.js rendering, touch/keyboard controls, synthesized sound.
- `scripts/build.mjs` — dependency-free release build.
- `tests/` — deterministic gameplay tests.
- `.github/workflows/deploy.yml` — automatic checks, build and Pages deployment.
- `docs/` — original release snapshot; the Actions workflow publishes `_site/`, not this folder.
- `.openai/hosting.json` — configuration for the separate ChatGPT-hosted copy.

Original procedural sprites and synthesized sounds are used; original Space Invaders artwork and audio are not included. Best scores remain in your browser's local storage.
