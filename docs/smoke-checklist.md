# DungeonDex3D v0.0.1-alpha Validation Checklist

Use this checklist after runtime, movement, camera, scene, HUD, preference, or interaction changes. It validates the existing alpha slice; it does not authorize new gameplay systems.

## Automated prerequisites

From the repository root, run:

```powershell
pnpm install
pnpm run validate
pnpm run dev
```

`pnpm run validate` runs both smoke suites, TypeScript, and the production build. GitHub Actions runs the same checks on pull requests and pushes to `main`.

## Browser matrix

| Environment | Expected status | Required checks |
| --- | --- | --- |
| Current Chrome or Edge, top-level tab | Primary supported alpha path | Full checklist, pointer lock, reload, console |
| Current Firefox, top-level tab | Secondary check | Launch, movement, fallback messaging, console |
| Safari/macOS | Best-effort alpha check | Launch, scene, keyboard input, pointer-lock behavior note |
| Embedded preview/frame | Known-limited | Keyboard movement must continue; pointer lock may be blocked and must show a readable warning |
| Mobile portrait/landscape | HUD-fit check only | No overlap or horizontal clipping; no claim of touch gameplay support |

## Launch and resources

- The app loads without a blank screen or blocking console error.
- `ENTER DUNGEON` replaces the menu with the game view.
- The bounded arena, enemies, HUD, and current objective render.
- A delayed optional resource shows the wireframe scene fallback instead of a blank canvas.
- A fatal scene error shows `SCENE COULD NOT LOAD`, the error message, and a reload action.
- No current alpha path depends on remote models, textures, audio, APIs, credentials, or private assets.

## Movement and pointer lock

- Click the canvas in a top-level browser; the HUD changes from `CLICK GAME TO FOCUS` to `MOUSE LOOK ACTIVE`.
- Move with `WASD` or arrow keys; diagonal travel is not faster than cardinal travel.
- Walk toward all four walls; the player remains inside the documented arena bounds.
- The player starts at `[0, 1, 0]` in open space.
- Press `ESC`; pointer lock releases and the focus hint returns.
- If pointer lock is denied or unavailable, the HUD shows `MOUSE LOCK UNAVAILABLE`, keyboard movement continues, and no red console crash appears.

## Encounter and reset

- While enemies remain, the HUD states that the portal opens after the final enemy.
- Existing click, `F`, and `Space` attack inputs remain available.
- Clearing the room activates the exit objective and portal.
- Entering the portal clears enemies, loot, bullets, room kill count, exit state, and pending notifications.
- The next depth respawns the player at `[0, 1, 0]` with yaw and pitch reset.
- Existing equipment, player level, and total kills persist across the depth transition.
- Repeat the transition twice to detect stale encounter state.

## Notification queue

- The first message appears immediately.
- Rapid second and third messages retain order instead of overwriting one another.
- Mixed message durations advance correctly.
- Blank or whitespace messages are ignored.
- Starting a new game or entering a new depth clears stale queued messages.
- Leaving the game view clears the ticker interval without a console warning.

## HUD and preferences

- At 320×568, 390×844, 844×390, and a short desktop window, objective, health, equipment, notification, and controls do not overlap or force horizontal scrolling.
- Long objective and notification text wraps safely.
- Safe-area insets are respected where supported.
- Camera sensitivity is bounded to 0.5–2.0 with a default of 1.0.
- Malformed local preference data repairs to safe defaults.
- Reduced-motion preference disables or minimizes nonessential HUD/loot motion; it does not change gameplay timing.
- Only `dungeondex3d.preferences.v1` display/control preferences are stored locally.

## Release artifact and labels

- `package.json` version remains `0.0.1-alpha`.
- Menu, HUD, README, and release notes retain explicit alpha/prototype wording.
- `dist/` is produced by `pnpm run build` and contains the browser entry and bundled static assets.
- No source archives, local saves, environment files, credentials, or development-only logs are included in a release artifact.
- Record the final commit SHA, validation workflow result, browser/viewport, and any known limitations.

## Scope guardrails

- Do not add weapons, enemies, loot tables, progression, saves, procedural generation, content packs, or combat-balance changes during this validation pass.
- Failures become narrow follow-up issues only when they cannot be resolved inside the existing alpha-hardening scope.
