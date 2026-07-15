# DungeonDex3D

<<<<<<< HEAD
DungeonDex3D is a Vite, React, TypeScript, and React Three Fiber application adopted from the `dungeonDex-3D.tar.gz` source archive.

## Project layout

The application lives at the repository root. Its main source is in `src/`, static assets are in `public/`, and the Vite entry point is `index.html`.

## Commands discovered in the adopted source

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

## Current validation status

The adopted `package.json` is an incomplete extract of a larger Replit/pnpm workspace. `pnpm install` currently stops with `ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC`, beginning with `@replit/vite-plugin-cartographer`, because the archive does not contain the workspace catalog. The TypeScript configuration also refers to the absent `../../tsconfig.base.json` and `../../lib/api-client-react` workspace package.

The commands above are therefore the source-defined commands, but they cannot be completed from this repository alone yet. See [the source-adoption checklist](docs/source-adoption-checklist.md) for the recorded result and next issue.
=======
DungeonDex3D is an experimental 3D dungeon RPG prototype inspired by the broader DungeonDex direction.

The goal is not to rebuild the entire DungeonDex system in 3D all at once. The goal is to prove a small, readable, playable 3D foundation first: movement, camera clarity, one dungeon space, one encounter loop, basic reward feedback, and a safe path toward bigger systems later.

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

## Current Status

This repo is currently an early project shell with a compressed source archive checked in as `dungeonDex-3D.tar.gz`.

The next step is to unpack and review that archive into normal source-controlled files, then choose whether the included scaffold becomes the official DungeonDex3D foundation.

Until that archive is unpacked, the project should treat the README and issues as direction-setting docs rather than proof that the app can already run from the repo root.

## Archive Adoption Plan

The checked-in archive should not stay as the long-term development shape.

Compressed archives are useful for transfer, but they are poor source control targets because GitHub cannot easily diff the app, review changes, search files, or track small fixes inside the bundle.

Recommended next pass:

1. Extract `dungeonDex-3D.tar.gz` locally.
2. Inspect the extracted folder structure.
3. Identify the runtime stack and package manager.
4. Move the actual app source into the repo root or a clearly named app folder.
5. Verify the app can install, run, and build.
6. Update this README with real commands.
7. Delete the archive only after the extracted source is committed and verified.

Do not delete the archive before the extracted source is safely present in the repo.

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

The repo needs a clear runtime decision and project structure. Before building big features, the project should define whether it is using a browser-first stack, a game engine, or another setup.

Important questions:

- Is this a browser project, a desktop project, or an engine project?
- What command runs it locally?
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

## Recommended First Milestone: Archive Extraction And Playable Graybox Slice

A strong first milestone would be:

> Extract the checked-in source archive, make the project run from normal repo files, then move through one simple dungeon space, trigger one encounter, resolve it, receive feedback, and reset or save the state.

This milestone should avoid advanced graphics, large maps, complex classes, talent trees, procedural generation, networking, or heavy UI polish.

The point is to prove the spine before decorating the skeleton. Weirdly motivational, but true.

## Suggested Roadmap

### Phase 0 — Archive Review And Foundation

- Unpack `dungeonDex-3D.tar.gz`.
- Review the extracted app structure.
- Pick or confirm the technical stack.
- Create the project structure from real source files.
- Add run instructions.
- Add a simple smoke checklist.
- Define the MVP boundary.

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

## Development Notes

Run instructions are not defined yet because the real source is currently inside `dungeonDex-3D.tar.gz`.

Once the archive is extracted and the technical foundation is confirmed, this README should be updated with:

```bash
# install command, if needed

# run command

# build command, if needed
```

If the project stays browser-first, keep setup friendly for Windows PowerShell and avoid unnecessary tooling until the prototype needs it.

## Issue Roadmap

The first major issues should define the backbone of the project:

1. Archive extraction and source adoption.
2. Foundation and technical stack decision.
3. First playable 3D graybox slice.
4. Core encounter and interaction loop.
5. DungeonDex-style content and progression model.
6. Stability, testing, performance, and release guardrails.

These are intentionally large. Smaller implementation issues can be split out from them once the direction is locked.
>>>>>>> origin/main
