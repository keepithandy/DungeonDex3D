# Source Adoption Checklist

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
- Type check: `pnpm run typecheck` after a successful install.

## Validation

`node --version`, `npm --version`, and `pnpm --version` completed successfully locally during source adoption. The recorded versions were Node 24.16.0, npm 11.13.0, and pnpm 11.8.0.

`pnpm install` was attempted from the extracted app root, and `pnpm run build` was attempted from the adopted repository root with `PORT=24982` and `BASE_PATH=/`.

Both were blocked by:

```text
ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC
No catalog entry '@replit/vite-plugin-cartographer' was found for catalog 'default'.
```

As a result, the dev server, build, and typecheck could not be run from this repository alone yet.

## Current blockers

The adopted source expects missing workspace infrastructure from the original Replit/pnpm workspace:

- pnpm catalog entries for `catalog:` dependency versions
- `../../tsconfig.base.json`
- `../../lib/api-client-react`
- `@workspace/api-client-react` via `workspace:*`

## Intentionally not committed

- `extracted-archive/` temporary extraction directory
- `node_modules/`
- package-manager caches
- build output
- `dungeonDex-3D.tar.gz`, retained outside the repository

## Next issue

Make the adopted app self-contained before any gameplay work starts.

The next patch should:

1. Replace missing pnpm catalog/workspace references with standalone dependency versions or local source.
2. Resolve `tsconfig.base.json` inheritance.
3. Resolve `lib/api-client-react` / `@workspace/api-client-react` references.
4. Confirm Vite aliases from the repository root.
5. Get `pnpm install` green.
6. Get `pnpm run build` green.
7. Update `README.md` with verified standalone commands.

No movement, combat, encounter, loot, inventory, talent, progression, or UI-redesign work should begin until this build-restoration patch is complete.
