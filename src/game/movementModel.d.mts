export interface MovementInput {
  x: number;
  z: number;
}

export function normalizeMovementInput(
  forward: boolean,
  back: boolean,
  left: boolean,
  right: boolean,
): MovementInput;

export function clampArenaPosition(
  position: [number, number, number],
  arenaBounds: number,
  playerHeight?: number,
): [number, number, number];

export function isSpawnInsideArena(
  position: [number, number, number] | null | undefined,
  arenaBounds: number,
): boolean;
