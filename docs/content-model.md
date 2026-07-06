# DungeonDex3D Prototype Content Model

## Goal

DungeonDex3D should separate content data from scene/runtime code as early as possible, but only at the scale the prototype actually needs.

## First content records

Start with tiny plain data records:

```js
export const playerDefaults = {
  hp: 10,
  attack: 1,
  defense: 0
};

export const targets = [
  {
    id: "training-dummy",
    name: "Training Dummy",
    interactionText: "You strike the dummy.",
    resolved: false
  }
];
```

## Future content buckets

Only add these when needed:

- rooms
- encounters
- enemies
- rewards
- items
- player stats
- save state

## Translation policy from DungeonDex

Bring over ideas, not whole systems.

Good early candidates:

- readable encounter text
- simple player stats
- clear feedback after interaction
- small reward messages

Bad early candidates:

- full Talent tree
- full loot economy
- deep debt systems
- large dungeon generation
- many enemy families

## Guardrails

The first content model should make the prototype easier to inspect. If a data abstraction makes the first room harder to build, delay it.
