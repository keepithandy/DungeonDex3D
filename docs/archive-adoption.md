# Archive Adoption Checklist

## Goal

Move DungeonDex3D from a compressed archive into normal source-controlled files.

## Current blocker

The repo still contains `dungeonDex-3D.tar.gz`. The archive should be unpacked locally before source-level implementation continues.

## Local PowerShell flow

From the repo root:

```powershell
tar -xzf .\dungeonDex-3D.tar.gz -C .\extracted-review
Get-ChildItem .\extracted-review
```

Then inspect:

- Does it contain `package.json`?
- Does it contain `index.html`?
- Does it contain `src/`?
- Does it use Vite, Three.js, vanilla JS, or another stack?
- What command starts it?
- What command builds it, if any?

## Adoption steps

1. Extract the archive locally.
2. Identify the actual app root.
3. Move source files into repo root or a clear app folder.
4. Do not commit dependency folders such as `node_modules/`.
5. Confirm launch command.
6. Confirm build command or document that there is no build.
7. Add a smoke checklist result to the README.
8. Keep the archive until the extracted source is safely committed and verified.
9. Delete the archive only in a separate intentional cleanup issue.

## Done means

GitHub can browse, diff, and search the real source files. Future issues should then target real paths instead of a compressed blob.
