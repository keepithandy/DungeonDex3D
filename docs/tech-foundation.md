# DungeonDex3D Technical Foundation

## Current decision

DungeonDex3D should stay browser-first until the first playable slice proves otherwise.

The starting target is:

- normal source-controlled files
- clear run instructions
- one small 3D test space
- one movement/camera path
- one interaction target
- minimal prototype state

## Why browser-first

A browser-first prototype fits the larger DungeonDex portfolio because it is easy to review, easy to share, and friendly to small solo-development slices. The project should not jump to a heavier engine before the first playable room exists.

## Source-control rule

The checked-in archive is not a healthy long-term development shape. The next source pass should unpack the archive locally and move real source files into normal repo paths.

## Proposed structure

```text
src/
  main.*
  scene.*
  player.*
  interaction.*
  state.*
assets/
  README.md
docs/
  tech-foundation.md
  graybox-slice.md
  encounter-loop.md
  state-safety.md
  smoke-checklist.md
```

Exact extensions should follow the extracted stack once the archive is adopted.

## First run-command target

The README should eventually document one of these shapes:

```bash
npm install
npm run dev
npm run build
```

or, if the project has no build step:

```text
Open index.html directly in a browser.
```

## Non-goals

- no multiplayer
- no giant open world
- no full DungeonDex feature clone
- no procedural generation before hand-built rooms work
- no complex talent/inventory systems before interaction is proven
