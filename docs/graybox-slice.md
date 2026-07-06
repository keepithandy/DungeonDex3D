# First Playable Graybox Slice

## Goal

The first playable DungeonDex3D slice should prove movement, camera clarity, boundaries, one target, and feedback before visual polish.

## Minimum scene

- one room or short corridor
- one clear player start point
- one visible target or interactable marker
- simple boundaries
- one reset path if state exists

## Movement acceptance

- Input moves the player consistently.
- The camera does not fight the player.
- The player understands where they are.
- The player cannot immediately leave the test space by accident.

## Interaction acceptance

- A single target can be reached.
- The target can be triggered.
- Triggering it shows feedback such as text, color change, sound placeholder, or state update.

## Visual policy

Graybox means simple shapes are acceptable. Camera clarity beats graphics.

Do not add:

- large maps
- advanced animation pipelines
- procedural generation
- full combat
- inventory
- talent trees
- polished asset packs

## Done means

A future issue can build an encounter loop on top of the scene without first asking how movement, camera, boundaries, or basic interaction should work.
