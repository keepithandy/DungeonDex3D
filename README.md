# DungeonDex3D

DungeonDex3D is an experimental 3D dungeon RPG prototype inspired by the broader DungeonDex direction.

The goal is not to rebuild the entire DungeonDex system in 3D all at once. The goal is to prove a small, readable, playable 3D foundation first: movement, camera clarity, one dungeon space, one encounter loop, basic reward feedback, and a safe path toward bigger systems later.

## Current Status

DungeonDex3D is currently a `v0.0.1-alpha` playable graybox prototype. The current alpha-hardening baseline includes:

- deterministic movement normalization and arena-boundary contracts;
- readable pointer-lock success, release, unsupported, and failure states;
- a responsive HUD that wraps safely on narrow and short viewports;
- ordered notification delivery with reset-safe queue behavior;
- bounded local camera-sensitivity and reduced-motion preferences;
- scene loading and fatal-error fallbacks instead of blank-screen failure;
- automated smoke, TypeScript, build, and GitHub Actions validation;
- an explicit browser, viewport, artifact, and release checklist.

The application was adopted from the `dungeonDex-3D.tar.gz` source archive into normal repository paths. The discovered app root was `artifacts/3d-game`, and the source now lives at the repository root.

The adopted stack is:

- Vite
- React
- TypeScript
- React Three Fiber / Three.js
- Zustand
- pnpm

The app source is visible in `src/`, static assets are in `public/`, and the Vite entry point is `index.html`.

## Standalone Commands

Run these repository-root commands:

```powershell
pnpm install
pnpm run validate
pnpm run dev
```

`pnpm run validate` runs:

```text
smoke:encounter-clarity
smoke:alpha
typecheck
build
```

Individual commands remain available:

```powershell
pnpm run smoke:encounter-clarity
pnpm run smoke:alpha
pnpm run typecheck
pnpm run build
pnpm run dev
```

GitHub Actions runs the same smoke, typecheck, and build gates on pull requests and pushes to `main`.

`pnpm-workspace.yaml` explicitly allows the checked-in `esbuild` package build required by Vite. This keeps the standalone install command valid with pnpm 11+, which uses `allowBuilds` instead of the retired `onlyBuiltDependencies` setting.

Optional environment overrides are still supported:

```powershell
$env:PORT = "24982"
$env:BASE_PATH = "/"
```

If those values are omitted, `vite.config.ts` defaults to port `24982` and base path `/`.

## Alpha Controls

- Select `ENTER DUNGEON` to start the current graybox.
- Click inside the game area to focus the canvas and lock the mouse.
- Use `WASD` or the arrow keys to move and the mouse to look.
- Press `ESC` to release pointer lock.
- Use click, `F`, or `Space` for the existing attack input.
- If pointer lock is unavailable, the HUD reports it without stopping keyboard movement.

Run camera, movement, and boundary checks in a top-level browser such as Chrome or Edge. Embedded browser frames may block pointer lock even when the standalone app is working normally.

## Local Preferences

The alpha stores only non-sensitive control/display preferences under `dungeondex3d.preferences.v1`:

- camera sensitivity, bounded from `0.5` to `2.0`;
- reduced-motion preference.

Malformed values repair to safe defaults. No account, save, credential, wallet, analytics, or remote-service data is stored.

## Validation Checklist

Follow [`docs/smoke-checklist.md`](docs/smoke-checklist.md) for:

- top-level and embedded-browser expectations;
- all four movement boundaries and diagonal normalization;
- pointer-lock success, release, and failure paths;
- encounter reset and notification ordering;
- narrow/short viewport HUD checks;
- scene resource and fatal-error fallback behavior;
- alpha artifact contents and version-label checks.

This validation path does not authorize new gameplay, progression, save, content, enemy, weapon, or balance systems.

## Project Goal

Build a lightweight 3D dungeon crawler foundation that can eventually support carefully selected DungeonDex-style ideas after the current alpha is stable and deliberately playtested.

The first successful milestone is intentionally small:

1. Start the app.
2. Load a simple 3D dungeon room.
3. Move and look around clearly.
4. Resolve the existing encounter.
5. Receive readable reward and objective feedback.
6. Enter the exit portal without stale encounter state.
7. Repeat reliably.

## Design Principles

- Playable first, impressive later.
- Camera clarity beats visual clutter.
- Small 3D spaces are better than giant empty maps.
- Systems should be readable before they are deep.
- DungeonDex ideas should be translated carefully, not dumped into 3D all at once.
- Combat, loot, progression, and save systems should be introduced only through controlled future milestones.
- Engine-style code and content data should stay separated where possible.
- The project should remain friendly to solo development and easy review.

## Current Alpha Boundary

The current alpha proves:

- a standalone Vite/React/TypeScript build;
- one bounded first-person arena;
- keyboard movement and mouse-look feedback;
- one existing enemy/encounter loop;
- current loot, equipment, level, and exit feedback;
- deterministic smokeable movement, notification, preference, and reset contracts;
- CI and release-hygiene foundations.

It does **not** claim:

- production readiness;
- mobile touch gameplay support;
- multiplayer;
- procedural generation;
- a complete save system;
- a full DungeonDex feature translation;
- advanced asset or animation pipelines.

## Early Non-Goals

DungeonDex3D should not currently expand into:

- a huge open world;
- a full DungeonDex feature clone;
- multiplayer or live services;
- procedural generation before hand-built rooms are proven;
- advanced animation pipelines before movement is stable;
- complex talents, inventory, economy, or progression before the existing encounter loop is playtested.

## Next Decision Gate

With the alpha-hardening backlog complete, the next step is manual playtesting against the documented browser and viewport matrix. Any new milestone should be selected from observed player friction rather than by automatically adding more systems.
