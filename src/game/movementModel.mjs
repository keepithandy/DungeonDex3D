export function normalizeMovementInput(forward, back, left, right) {
  const x = (right ? 1 : 0) - (left ? 1 : 0);
  const z = (back ? 1 : 0) - (forward ? 1 : 0);
  const length = Math.hypot(x, z);
  if (length === 0) return { x: 0, z: 0 };
  return { x: x / length, z: z / length };
}

export function clampArenaPosition(position, arenaBounds, playerHeight = 1.6) {
  const [x, , z] = position;
  return [
    Math.max(-arenaBounds, Math.min(arenaBounds, x)),
    playerHeight,
    Math.max(-arenaBounds, Math.min(arenaBounds, z)),
  ];
}

export function isSpawnInsideArena(position, arenaBounds) {
  return Number.isFinite(position?.[0]) &&
    Number.isFinite(position?.[1]) &&
    Number.isFinite(position?.[2]) &&
    Math.abs(position[0]) <= arenaBounds &&
    Math.abs(position[2]) <= arenaBounds;
}
