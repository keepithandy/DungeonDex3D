import { Enemy } from "./store";

type EnemyKind = Enemy["kind"];

const KIND_COLORS: Record<EnemyKind, string> = {
  skeleton: "#e0d8c0",
  zombie: "#6aad6a",
  demon: "#c44",
  boss: "#8b008b",
};

const KIND_BASE: Record<
  EnemyKind,
  { hp: number; damage: number; speed: number; xp: number; size: number }
> = {
  skeleton: { hp: 30, damage: 8, speed: 2.5, xp: 20, size: 0.8 },
  zombie: { hp: 60, damage: 12, speed: 1.6, xp: 35, size: 1.0 },
  demon: { hp: 90, damage: 18, speed: 3.5, xp: 60, size: 0.9 },
  boss: { hp: 350, damage: 30, speed: 2.0, xp: 200, size: 1.5 },
};

export function getEnemyColor(kind: EnemyKind): string {
  return KIND_COLORS[kind];
}

export function getEnemySize(kind: EnemyKind): number {
  return KIND_BASE[kind].size;
}

function pickKind(depth: number): EnemyKind {
  const weights: Partial<Record<EnemyKind, number>> = {
    skeleton: Math.max(50 - depth * 3, 15),
    zombie: Math.min(30 + depth * 2, 45),
    demon: Math.min(depth * 4, 35),
  };
  const total = Object.values(weights).reduce((a, b) => a! + b!, 0)!;
  let rand = Math.random() * total;
  for (const [kind, weight] of Object.entries(weights)) {
    rand -= weight!;
    if (rand <= 0) return kind as EnemyKind;
  }
  return "skeleton";
}

export function spawnEnemiesForDepth(depth: number): Enemy[] {
  const arenaRadius = 18;
  const count = 3 + depth * 2;
  const scaleMult = 1 + depth * 0.22;
  const enemies: Enemy[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const radius = arenaRadius * (0.5 + Math.random() * 0.45);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const kind = pickKind(depth);
    const base = KIND_BASE[kind];

    enemies.push({
      id: `enemy-${i}-${Date.now()}`,
      position: [x, base.size, z],
      hp: Math.round(base.hp * scaleMult),
      maxHp: Math.round(base.hp * scaleMult),
      damage: Math.round(base.damage * scaleMult),
      speed: base.speed * (1 + depth * 0.04),
      xpReward: Math.round(base.xp * scaleMult),
      kind,
      dead: false,
      lastAttack: 0,
    });
  }

  if (depth % 5 === 0) {
    const base = KIND_BASE.boss;
    enemies.push({
      id: `boss-${Date.now()}`,
      position: [0, base.size * 1.5, -14],
      hp: Math.round(base.hp * scaleMult),
      maxHp: Math.round(base.hp * scaleMult),
      damage: Math.round(base.damage * scaleMult),
      speed: base.speed * (1 + depth * 0.02),
      xpReward: Math.round(base.xp * scaleMult),
      kind: "boss",
      dead: false,
      lastAttack: 0,
    });
  }

  return enemies;
}

export { KIND_COLORS };
