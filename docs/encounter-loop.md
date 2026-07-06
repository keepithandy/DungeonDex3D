# First Encounter Loop

## Goal

DungeonDex3D needs one tiny RPG interaction loop before deeper DungeonDex systems are moved into 3D.

## Minimum loop

1. Player approaches one target.
2. Player triggers the target.
3. The prototype resolves one simple outcome.
4. Feedback appears immediately.
5. The interaction can be reset or repeated.

## First target options

Use only one:

- enemy placeholder
- chest
- shrine
- switch
- training dummy

## Suggested first outcome

A non-combat training dummy is the safest first target:

- Trigger: player reaches or clicks it.
- Result: message says the dummy was struck.
- Reward: none, or a temporary test counter only.
- Reset: reset button or reload returns the target to default.

## RPG expansion path

After this works, later issues can add:

- one enemy
- one action button
- simple win/loss feedback
- tiny reward text
- prototype state flag

## Guardrails

- Do not add a full combat engine yet.
- Do not add loot tables yet.
- Do not add DungeonDex talents yet.
- Do not add multiple targets before one target works clearly.
