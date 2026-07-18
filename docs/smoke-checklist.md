# DungeonDex3D Phase 1 Graybox Smoke Checklist

Use this manual checklist after a runtime, movement, camera, scene, or interaction change. It records the current 3D slice; it is not a roadmap for new gameplay systems.

## Prerequisites

From the repository root, run:

```powershell
pnpm install
pnpm run smoke:encounter-clarity
pnpm run build
pnpm run typecheck
pnpm run dev
```

Open the local URL printed by Vite. Keep the browser console visible during the check.

## Launch and Menu

- The app loads without a blank screen or blocking console error.
- The `DUNGEON CRAWLER` menu and `ENTER DUNGEON` button render.
- Selecting `ENTER DUNGEON` replaces the menu with the game view.

## Scene Readability

- A bounded square room renders with a floor, walls, ceiling, pillars, and torch lights.
- The HUD shows the current depth, remaining-enemy status, health, and control hint.
- At least one visible enemy placeholder appears in the room after the scene starts.

## Movement and Camera

- In top-level Chrome, click the canvas once and confirm the HUD changes from `CLICK GAME TO FOCUS` to `MOUSE LOOK ACTIVE`.
- Move the mouse and confirm the camera turns without rolling or flipping.
- Use `WASD` or arrow keys to move; diagonal movement remains controlled.
- Walk toward each wall and confirm the player stays inside the room rather than leaving the scene.
- The player starts in open space and can navigate around the room without getting stuck on spawn.
- Press `ESC`; confirm mouse look releases, the HUD returns to `CLICK GAME TO FOCUS`, and keyboard movement remains available.
- If the browser rejects pointer lock, confirm the HUD shows `MOUSE LOCK UNAVAILABLE` and the app continues without a red console crash.

## Current Objective and Feedback

- While enemies are active, the HUD explicitly states that the exit portal opens after the final enemy.
- Existing attack input (`click`, `F`, or `Space`) remains usable after mouse lock; this check does not assess combat balance.
- After the current enemies are cleared, the HUD directs the player to the exit portal and a portal is visible at the far wall.
- Reaching the active portal advances the existing room state without a blank screen or runtime error.

## Phase 1.2 Notification Queue

The focused command `pnpm run smoke:encounter-clarity` verifies the deterministic queue transitions. In the running app, also confirm:

- the first notification appears when no message is visible;
- a second notification waits instead of replacing the current message;
- the queued message appears after the current duration expires;
- the notification clears when the queue is empty;
- rapid loot/equipment feedback does not create overlapping visible messages;
- leaving the game view clears the single ticker interval without a console warning.

## Report

Record:

- browser and viewport used
- whether the menu, scene, movement, camera, enemy marker, objective, and portal passed
- whether notification order and clearing passed
- any console error, visual obstruction, control issue, or performance concern
- the exact command that failed, if prerequisites did not pass

## Phase 1.1 Camera and Movement Lock

The `v0.0.1-alpha` top-level Chrome smoke should record explicit pass/fail results for:

- menu and `ENTER DUNGEON`
- visible 3D scene and readable HUD
- canvas focus and pointer lock
- mouse look and `ESC` release
- `WASD` movement and diagonal normalization
- all four arena boundaries
- pointer-lock failure messaging, when the browser can reproduce that path
- absence of red browser-console crashes

## Scope Guardrails

- Do not use this smoke pass to add weapons, enemies, loot tables, progression, saves, procedural generation, UI redesign, or combat-balance changes.
- Keep failures as narrow follow-up issues: launch/build, scene readability, movement/camera, notification lifecycle, or one existing objective path.
