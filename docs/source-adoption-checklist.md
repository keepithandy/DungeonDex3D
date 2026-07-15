<<<<<<< HEAD
# Source adoption checklist

## Result

- [x] Located the source archive at `C:\Users\quali\Desktop\GITHUB\dungeonDex-3D.tar.gz` and extracted it locally.
- [x] Inspected the archive before moving files.
- [x] Identified `artifacts/3d-game` as the sole application root (`package.json`, `index.html`, `src/`, and `public/`).
- [x] Chose the repository root for the app because the Git repository had no existing application or workspace structure.
- [x] Moved the application files to normal repository paths: `src/`, `public/`, `package.json`, `index.html`, `tsconfig.json`, `vite.config.ts`, `components.json`, and `.replit-artifact/`.
- [x] Added ignore rules for dependencies, build output, TypeScript build info, package-manager caches, environment files, and the temporary extraction directory.
- [x] Kept the source archive in its original local location; it was not added to Git.

## Runtime stack and commands

- Stack: Vite + React + TypeScript + React Three Fiber/Three.js + Zustand.
- Package manager: pnpm, inferred from `.replit-artifact/artifact.toml` and its `pnpm` commands.
- Install: `pnpm install`.
- Run: set `PORT=24982` and `BASE_PATH=/`, then run `pnpm run dev`.
- Build: set `PORT=24982` and `BASE_PATH=/`, then run `pnpm run build`.
- Type check: `pnpm run typecheck` (after a successful install).

## Validation

`node --version`, `npm --version`, and `pnpm --version` completed successfully (Node 24.16.0, npm 11.13.0, pnpm 11.8.0). `pnpm install` was attempted from the extracted app root, and `pnpm run build` was attempted from the adopted repository root with `PORT=24982` and `BASE_PATH=/`. Both were blocked by:

```text
ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC
No catalog entry '@replit/vite-plugin-cartographer' was found for catalog 'default'.
```

As a result, the dev server, build, and typecheck could not be run. The source also expects missing parent-workspace files: `../../tsconfig.base.json` and `../../lib/api-client-react`.

## Intentionally not committed

- `extracted-archive/` (temporary extraction directory)
- `node_modules/`, package-manager caches, and build output (none were present after the attempted install)
- `dungeonDex-3D.tar.gz` (retained outside the repository)

## Next issue

Recover the original Replit/pnpm workspace catalog and referenced workspace packages, or explicitly convert the archived app into a standalone package. That decision is outside this Phase 0 source-adoption commit.
=======
# Source Adoption Checklist

Use this checklist after `dungeonDex-3D.tar.gz` is extracted locally.

## Archive identity

- [ ] Confirm the extracted root folder name.
- [ ] Confirm whether the archive contains one app or multiple nested folders.
- [ ] Confirm whether the archive contains generated files that should not be committed.
- [ ] Confirm whether old placeholder names need to be renamed to DungeonDex3D.

## Runtime

- [ ] Find `package.json` or the equivalent project config.
- [ ] Identify the package manager: npm, pnpm, yarn, or none.
- [ ] Identify the app framework: Vite, React, vanilla JS, engine export, or other.
- [ ] Identify the 3D library: Three.js, React Three Fiber, Babylon, PlayCanvas, WebGL, or other.
- [ ] Confirm the local dev command.
- [ ] Confirm the production build command.

## Repo layout

- [ ] Decide whether the app belongs at repo root or in `app/`.
- [ ] Move source files into normal Git-tracked paths.
- [ ] Keep `src/`, `public/`, and config files visible.
- [ ] Avoid committing dependency folders such as `node_modules/`.
- [ ] Add or update `.gitignore` before committing extracted source.

## Smoke check

- [ ] Install dependencies successfully.
- [ ] Start the dev server.
- [ ] Open the app in a browser.
- [ ] Confirm the first screen loads.
- [ ] Confirm any 3D scene renders.
- [ ] Confirm the browser console has no major startup errors.
- [ ] Run the build command successfully.

## Cleanup

- [ ] Update `README.md` with real commands.
- [ ] Update project status based on what the app actually contains.
- [ ] Create follow-up issues for movement, camera, encounter loop, and branding cleanup.
- [ ] Delete `dungeonDex-3D.tar.gz` only after extracted source is safely committed.
>>>>>>> origin/main
