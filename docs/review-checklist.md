# Review Checklist

Use this before merging a DungeonDex3D change.

- Keep model inspection separate from combat and progression logic.
- Verify orbit/drag controls remain predictable with mouse and touch input.
- Confirm camera framing and object scale still work with more than one model.
- Keep loading failures visible instead of silently showing an empty viewport.
- Avoid adding heavyweight dependencies for presentation-only features.
- Check that asset paths work from a clean browser load.

A safe patch should improve 3D presentation without changing the underlying DungeonDex game rules.
