# Prototype State Safety

## Goal

Keep DungeonDex3D test state small, inspectable, resettable, and safe while the project is still a prototype.

## First state model

The first state should only track what the prototype needs:

```js
{
  version: "0.0.1-alpha",
  playerPosition: null,
  targetTriggered: false,
  lastMessage: ""
}
```

This is not a final save schema. It is a testing aid.

## Save policy

Until the graybox slice is playable, prefer memory-only state.

Only add browser storage after:

- scene launches reliably
- movement works
- one interaction target works
- reset behavior is visible

## Reset policy

Reset should return the prototype to a clean test state:

- default player spawn
- untriggered target
- default message
- no stuck progression

## Repair/default policy

Any state loader should tolerate missing fields and replace them with defaults.

## Guardrails

- Do not persist complex inventory yet.
- Do not persist combat history yet.
- Do not persist talent/progression systems yet.
- Do not make state required before launch works.
