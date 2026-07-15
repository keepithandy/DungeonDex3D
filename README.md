# DungeonDex3D

DungeonDex3D is a Vite, React, TypeScript, and React Three Fiber application adopted from the `dungeonDex-3D.tar.gz` source archive.

## Project layout

The application lives at the repository root. Its main source is in `src/`, static assets are in `public/`, and the Vite entry point is `index.html`.

## Commands discovered in the adopted source

The source archive identifies pnpm as its package manager and defines these scripts:

```powershell
pnpm install
$env:PORT = "24982"
$env:BASE_PATH = "/"
pnpm run dev
pnpm run build
pnpm run typecheck
```

`PORT` and `BASE_PATH` are required by `vite.config.ts`; they apply to both `dev` and `build`.

## Current validation status

The adopted `package.json` is an incomplete extract of a larger Replit/pnpm workspace. `pnpm install` currently stops with `ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC`, beginning with `@replit/vite-plugin-cartographer`, because the archive does not contain the workspace catalog. The TypeScript configuration also refers to the absent `../../tsconfig.base.json` and `../../lib/api-client-react` workspace package.

The commands above are therefore the source-defined commands, but they cannot be completed from this repository alone yet. See [the source-adoption checklist](docs/source-adoption-checklist.md) for the recorded result and next issue.
