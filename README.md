# DungeonDex3D

DungeonDex3D is an experimental 3D dungeon RPG prototype inspired by the broader DungeonDex direction.

The goal is not to rebuild the entire DungeonDex system in 3D all at once. The goal is to prove a small, readable, playable 3D foundation first: movement, camera clarity, one dungeon space, one encounter loop, basic reward feedback, and a safe path toward bigger systems later.

## Current Status

Phase 0 source adoption is in progress on `agent/adopt-source-archive`.

The application has been adopted from the `dungeonDex-3D.tar.gz` source archive into normal repository paths. The discovered app root was `artifacts/3d-game`, and the source now lives at the repository root.

The adopted stack is:

- Vite
- React
- TypeScript
- React Three Fiber / Three.js
- Zustand
- pnpm

The app source is visible in `src/`, static assets are in `public/`, and the Vite entry point is `index.html`.

## Commands Discovered In The Adopted Source

The source archive identifies pnpm as its package manager and defines these scripts:

```powershell
pnpm install
$env:PORT = "24982"
$env:BASE_PATH = "/"
pnpm run dev
pnpm run build
pnpm run typecheck
```

`PORT` and `BASE_PATH` are required by `vite.config.ts`; they apply to both `dev` and `build`.

## Current Validation Status

The adopted `package.json` is an incomplete extract of a larger Replit/pnpm workspace. `pnpm install` currently stops with `ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC`, beginning with `@replit/vite-plugin-cartographer`, because the archive does not contain the workspace catalog.

The TypeScript configuration also refers to missing parent-workspace files:

- `../../tsconfig.base.json`
- `../../lib/api-client-react`

Because of those missing workspace pieces, the dev server, build, and typecheck are not green yet. The next patch should make the adopted app self-contained before any gameplay work starts.

## Project Goal

Build a lightweight 3D dungeon crawler foundation that can eventually support DungeonDex-style progression, loot, combat, talents, enemies, and readable RPG feedback.

The first successful milestone should feel like a tiny playable slice:

1. Start the app.
2. Load a simple 3D dungeon room or corridor.
3. Move the player around clearly.
4. Find or trigger one encounter.
5. Resolve a simple combat or interaction loop.
6. Show a reward or result.
7. Save or reset the test state.

That is the first mountain. Everything else comes after the mountain is real.

## Design Principles

- Playable first, impressive later.
- Camera clarity beats visual clutter.
- Small 3D spaces are better than giant empty maps.
- Systems should be readable before they are deep.
- DungeonDex ideas should be translated carefully, not dumped into 3D all at once.
- Combat, loot, progression, and save systems should be introduced in controlled slices.
- Engine-style code and content data should stay separated where possible.
- The project should remain friendly to solo development and easy review.

## What DungeonDex3D Should Prove First

### 1. A stable app foundation

The repo needs clear runtime commands and a project structure that works outside the original archive/workspace.

Important questions:

- What command installs dependencies?
- What command runs it locally?
- What command builds it?
- Where does source code live?
- Where do assets live?
- How are future scenes, encounters, and data organized?

### 2. A playable 3D graybox slice

The first playable slice should be ugly but understandable.

Minimum target:

- one room or short corridor
- a player marker or controller
- camera movement that does not fight the player
- collision or boundary behavior
- one interactable object or enemy
- one visible objective

### 3. A basic RPG interaction loop

DungeonDex3D needs a tiny loop before it needs a giant system.

Possible first loop:

- approach enemy
- trigger encounter
- choose a simple action
- resolve damage or outcome
- show win/loss feedback
- grant a small reward

### 4. A content model

The project should avoid hard-coding every enemy, room, item, and reward into one giant file.

Future content should be shaped around readable data:

- rooms
- encounters
- enemies
- rewards
- item definitions
- player stats
- save state

### 5. Stability and release guardrails

3D projects can get messy fast. DungeonDex3D should establish guardrails early:

- known run command
- basic smoke checklist
- performance sanity checks
- save/reset behavior
- readable issue roadmap
- clear MVP boundary

## Recommended Next Milestone: Standalone Build Restoration

A strong next milestone would be:

> Make the adopted Vite/React/TypeScript app self-contained from the repository root, then get `pnpm install` and `pnpm run build` green.

This milestone should avoid movement, combat, UI redesign, inventory, talents, progression, loot tables, procedural generation, or new gameplay.

## Suggested Roadmap

### Phase 0 — Archive Review And Source Adoption

- Unpack `dungeonDex-3D.tar.gz`.
- Review the extracted app structure.
- Pick or confirm the technical stack.
- Create the project structure from real source files.
- Add run instructions.
- Add a simple smoke checklist.
- Define the MVP boundary.

### Phase 0.1 — Standalone Build Restoration

- Replace missing pnpm catalog/workspace references.
- Resolve `tsconfig.base.json`.
- Resolve `lib/api-client-react` / `@workspace/api-client-react`.
- Confirm Vite aliases work from the repository root.
- Get `pnpm install` green.
- Get `pnpm run build` green.
- Update this README with verified standalone commands.

### Phase 1 — 3D Movement Slice

- Add or verify a simple scene.
- Add or verify player movement.
- Add or verify camera behavior.
- Add boundaries/collision.
- Add one interactable target.

### Phase 2 — Encounter Loop

- Add one enemy or encounter trigger.
- Add a simple action/outcome flow.
- Add win/loss feedback.
- Add reward feedback.
- Keep it readable and easy to test.

### Phase 3 — Content and Save Model

- Define player state.
- Define enemy/encounter data.
- Define item/reward data.
- Add save/reset behavior.
- Keep data separate from core runtime logic.

### Phase 4 — DungeonDex Identity Pass

- Decide which DungeonDex systems translate well into 3D.
- Bring over only the systems that strengthen the 3D experience.
- Avoid recreating every 2D system before the 3D loop is fun.

## Early Non-Goals

DungeonDex3D should not start with:

- a huge open world
- a full DungeonDex feature clone
- multiplayer
- live service systems
- procedural generation before hand-built rooms work
- advanced animation pipelines before movement is stable
- complex talent or inventory systems before the basic encounter loop exists

## Issue Roadmap

The first major issues should define the backbone of the project:

1. Archive extraction and source adoption.
2. Standalone build restoration.
3. First playable 3D graybox slice.
4. Core encounter and interaction loop.
5. DungeonDex-style content and progression model.
6. Stability, testing, performance, and release guardrails.

These are intentionally large. Smaller implementation issues can be split out from them once the direction is locked.
