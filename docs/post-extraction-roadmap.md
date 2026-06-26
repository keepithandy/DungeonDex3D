# Post-Extraction Roadmap

This roadmap starts after the `dungeonDex-3D.tar.gz` archive has been extracted into normal source files.

## Step 1 — Make the app visible

- Extract the archive locally.
- Commit the real source tree.
- Remove generated/dependency folders that do not belong in Git.
- Add or update `.gitignore`.
- Keep the archive until source adoption is verified.

## Step 2 — Make the app runnable

- Confirm install command.
- Confirm dev command.
- Confirm build command.
- Update README with exact Windows PowerShell commands.
- Add a short smoke checklist.

## Step 3 — Identify the 3D foundation

- Identify the 3D library or renderer.
- Locate the first scene or render entry point.
- Locate camera code.
- Locate movement/input code.
- Locate UI overlay code.

## Step 4 — Rename and align identity

- Replace placeholder project titles with DungeonDex3D.
- Update visible browser title and metadata.
- Update favicon/opengraph assets only if needed.
- Make the README match what actually runs.

## Step 5 — First playable slice

- Confirm or add one simple 3D room.
- Confirm or add player movement.
- Confirm or add camera behavior.
- Add one interactable target.
- Add one tiny encounter or feedback loop.

## Step 6 — Stabilize

- Add reset behavior.
- Add state/smoke notes.
- Track known limitations.
- Split the next work into small issues.
