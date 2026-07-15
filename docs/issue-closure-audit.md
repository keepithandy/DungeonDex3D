# v0.0.1-alpha Issue Closure Audit

Audit date: 2026-07-15  
Baseline reviewed: `main` at `0a22a2c` (`Phase 1.1 camera and movement usability lock`)

This is an issue-hygiene record for the playable prototype baseline. It does not
authorize new gameplay systems or claim that deferred DungeonDex systems are
implemented.

## #1 — Foundation, tech stack, and project structure decision

- **Acceptance evidence:** `README.md` documents the browser-first Vite, React,
  TypeScript, React Three Fiber/Three.js, Zustand, and pnpm stack, source and
  asset locations, and PowerShell-friendly install/run/build/typecheck commands.
  `docs/tech-foundation.md` documents the initial boundaries.
- **Satisfying commits:** `8d08184`, `5f39935`.
- **Decision:** Close as completed.
- **Closure comment:** Completed by the adopted browser-first
  Vite/React/TypeScript/React Three Fiber/Zustand/pnpm baseline, documented
  repo structure, and standalone run commands. Closing as completed for
  v0.0.1-alpha.

## #2 — First playable 3D graybox dungeon slice

- **Acceptance evidence:** the menu launches `Game`; `Game`, `Player`, and
  `Arena` provide the 3D scene, first-person movement, mouse look, and bounded
  room; `HUD` gives an objective and control status; enemy placeholders and an
  exit portal are visible in the active path. Reload returns to the memory-only
  prototype baseline.
- **Satisfying commits:** `5f39935`, `75bba6a`, `0a22a2c`.
- **Decision:** Close as completed.
- **Closure comment:** Completed for v0.0.1-alpha by the playable graybox:
  menu launch, ENTER DUNGEON, 3D scene and HUD, movement/camera usability,
  arena bounds, and objective/target state. Future polish belongs in narrow
  Phase 1.x issues.

## #3 — Core encounter and interaction loop

- **Acceptance evidence:** the existing scene spawns enemies, accepts the
  existing attack inputs, updates enemy and player state, shows HUD/notification
  feedback, activates an exit after a room clear, and advances the current room
  state through the portal. This is a small prototype loop, not a request to
  expand combat or rewards.
- **Satisfying commits:** `8d08184` (adopted loop), `5f39935`, `75bba6a`.
- **Decision:** Close as completed for the prototype baseline.
- **Closure comment:** Completed for the prototype baseline. The current alpha
  has a tiny encounter/objective path with state and visible feedback; deeper
  encounter design should use narrower follow-up issues rather than this broad
  epic.

## #4 — DungeonDex-style content, progression, and data model

- **Acceptance evidence:** `docs/content-model.md` defines the prototype
  boundary, while `src/game/store.ts`, `monsterSystem.ts`, and `lootSystem.ts`
  keep player, enemy, and item shapes outside the scene component. The docs
  explicitly defer progression, talents, rewards, and broader content work.
- **Satisfying commits:** `424cd60`, `8d08184`.
- **Decision:** Close as completed for the documented v0.0.1-alpha boundary.
- **Closure comment:** Completed for v0.0.1-alpha: the content/state direction
  is documented and the current prototype has minimal separated shapes. Deeper
  DungeonDex progression, loot, talents, rewards, and saves remain intentionally
  deferred to narrower issues.

## #5 — Save, reset, and prototype state safety

- **Acceptance evidence:** `docs/state-safety.md` records that the current
  prototype is memory-only and that reload/reset starts a clean baseline.
  `startGame` resets active run state without introducing persistence or a save
  schema.
- **Satisfying commits:** `4c92d99`, `8d08184`.
- **Decision:** Close as completed for the memory-only prototype scope.
- **Closure comment:** Completed for the prototype baseline. Current state
  safety is documented, active state resets in memory, and persistent saves are
  intentionally deferred. Future persistence should be a narrower save-specific
  issue.

## #6 — Stability, performance, testing, and release guardrails

- **Acceptance evidence:** `docs/smoke-checklist.md` covers launch, scene,
  movement, camera, bounds, pointer-lock failure, objective path, and console
  checks. `README.md` lists validation commands and the Chrome smoke path.
  `pnpm install`, `pnpm run build`, and `pnpm run typecheck` pass on the audited
  baseline; the Vite chunk-size advisory remains a tracked follow-up risk.
- **Satisfying commits:** `0420fc4`, `75bba6a`, `0a22a2c`.
- **Decision:** Close as completed.
- **Closure comment:** Completed by documented build/typecheck validation, the
  graybox and Chrome smoke path, pointer-lock guardrails, and current
  v0.0.1-alpha status documentation. The existing chunk-size advisory remains
  a narrow future readability/bundle-sanity concern.

## #7 — Unpack and adopt the DungeonDex3D source archive

- **Acceptance evidence:** source is now visible in normal tracked root paths
  (`src`, `public`, configs, and docs); `dungeonDex-3D.tar.gz` is retained
  intentionally as the source archive; archive adoption is documented.
- **Satisfying commits:** `8d08184`, `f79d866`.
- **Decision:** Close as completed.
- **Closure comment:** Completed by source archive adoption into normal
  Git-tracked project files, with the original archive retained intentionally.

## #9 — Phase 0: Extract source archive and establish real run commands

- **Acceptance evidence:** the source is extracted into the repository root;
  README documents `pnpm install`, `pnpm run dev`, `pnpm run build`, and
  `pnpm run typecheck`; standalone Vite and TypeScript configuration build from
  the repo root.
- **Satisfying commits:** `8d08184`, `5f39935`.
- **Decision:** Close as completed.
- **Closure comment:** Completed by Phase 0 source extraction/adoption and
  standalone pnpm install/build/typecheck/dev restoration.

## #10 — Phase 1: Playable graybox movement slice with one interactable target

- **Acceptance evidence:** the `v0.0.1-alpha` slice provides menu entry,
  room bounds, keyboard movement, mouse look, HUD guidance, enemy targets, and
  visible exit/objective feedback. Phase 1.1 adds pointer-lock status and a
  safe failure message without changing systems.
- **Satisfying commits:** `0420fc4`, `75bba6a`, `0a22a2c`.
- **Decision:** Close as completed.
- **Closure comment:** Completed for v0.0.1-alpha by the playable graybox
  movement/camera/HUD prototype and the Phase 1.1 usability lock. Further
  movement or camera polish should be tracked in narrower follow-up issues.

## Deferred follow-up candidates

- **Phase 1.2 Minimal encounter clarity pass:** make the existing
  objective/enemy/interactable feedback easier to understand without adding
  systems.
- **Phase 1.3 Alpha readability and bundle sanity pass:** improve alpha
  readability and investigate the existing build chunk-size advisory without
  changing gameplay.
