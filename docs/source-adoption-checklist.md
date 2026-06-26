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
