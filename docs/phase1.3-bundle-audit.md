# Phase 1.3 Bundle Audit

## Scope

Baseline reviewed: `04fd3a7` (`docs: close completed prototype planning issues`).

This audit improves alpha presentation and loading behavior only. No gameplay,
combat math, movement, camera, enemy, loot, reward, progression, or state
behavior changed.

## Baseline production output

`pnpm run build` on the baseline generated:

| Asset | Raw size | Gzip size |
| --- | ---: | ---: |
| `index-THKeu3dC.js` | 1,113,469 B | 310.15 kB |
| `index-BED6EV2d.css` | 90,918 B | 14.87 kB |

Vite reported its chunk-size advisory for `index-THKeu3dC.js`.

## Investigation

The initial import path is `main.tsx` → `App.tsx` → the static `Game` import.
`Game` imports React Three Fiber and Drei, while the game modules import
Three.js. Those libraries and the 3D game modules were therefore part of the
initial JavaScript chunk.

The project includes archived UI components that reference Radix, Lucide, and
Recharts, but no import path from `main.tsx` or `App.tsx` reaches them. They are
not evidence that those libraries caused the production entry chunk.

## Change tested and retained

`Game` is now loaded with `React.lazy` only after `ENTER DUNGEON`. A small
`Suspense` fallback reads `Loading graybox…` while the existing 3D module is
retrieved. This preserves the current flow:

`menu → ENTER DUNGEON → loading fallback → existing 3D scene and HUD`

## Final production output

| Asset | Raw size | Gzip size |
| --- | ---: | ---: |
| `index-BZk0ws7D.js` | 204,242 B | 64.93 kB |
| `Game-CmniRWf9.js` | 907,246 B | 245.19 kB |
| `index-BED6EV2d.css` | 90,918 B | 14.87 kB |

The initial entry script is 909,227 B smaller (about 81.7% raw) than the
baseline entry script. Total JavaScript is materially unchanged by design; the
3D runtime is deferred rather than removed.

## Rejected approaches

- No dependency cleanup: package presence is not proof of inclusion, and this
  pass did not authorize package removal.
- No broad `manualChunks` policy: the lazy game boundary already creates a clear
  menu-versus-3D cache boundary without circular-chunk or duplicate-runtime
  warnings.
- No chunk-size warning-limit increase: the remaining warning is retained as a
  useful signal for the expected 3D game chunk.

## Result

Vite's advisory remains for `Game-CmniRWf9.js` because that chunk is still above
500 kB. This is acceptable for the current alpha: it is the intentionally
deferred Three.js/R3F/Drei game runtime, while the menu entry has a much smaller
initial payload. Any future reduction should be measured against gameplay and
runtime readability rather than achieved by suppressing the warning.
