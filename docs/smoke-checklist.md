# DungeonDex3D Smoke Checklist

Use this checklist after any source-adoption, movement, camera, interaction, or state change.

## Launch

- App starts without a blank screen.
- Console has no blocking runtime errors.
- The README run command still matches the actual project.

## Scene

- A simple room, corridor, or test area appears.
- The player can identify the playable space.
- Boundaries are visible or understandable.

## Movement and Camera

- Player movement responds to input.
- Camera remains readable.
- Player cannot immediately fall out of the test space.
- Movement does not trap the player on spawn.

## Interaction

- One target, enemy, chest, switch, shrine, or marker is visible.
- The player can reach or trigger it.
- Triggering it produces clear feedback.

## State and Reset

- Prototype state starts from a known default.
- Reset returns the scene to a clean test state.
- Any saved state is small and documented.

## Performance Sanity

- The first scene remains lightweight.
- No unnecessary large assets are added before the graybox slice works.
- Frame pacing feels acceptable for a tiny prototype.

## Release Habit

Before considering a DungeonDex3D patch stable, record:

- what changed
- what was tested
- what intentionally did not change
- what still blocks the next issue
