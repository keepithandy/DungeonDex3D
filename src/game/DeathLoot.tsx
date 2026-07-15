import { useEffect, useRef } from "react";
import { useGameStore } from "./store";
import { generateLootDrop } from "./lootSystem";

const LOOT_DROP_CHANCE = 0.6;

export function DeathLootSpawner() {
  const enemies = useGameStore((s) => s.enemies);
  const depth = useGameStore((s) => s.depth);
  const setLoot = useGameStore((s) => s.setLoot);
  const prevEnemies = useRef<typeof enemies>([]);

  useEffect(() => {
    const prev = prevEnemies.current;
    const current = enemies;

    const newlyDead = current.filter(
      (e) => e.dead && !prev.find((p) => p.id === e.id && p.dead)
    );

    if (newlyDead.length > 0) {
      const store = useGameStore.getState();
      const newLoot = [...store.loot];

      for (const enemy of newlyDead) {
        if (Math.random() < LOOT_DROP_CHANCE) {
          newLoot.push({
            id: `loot-${enemy.id}-${Date.now()}`,
            position: [
              enemy.position[0] + (Math.random() - 0.5) * 1.5,
              0.5,
              enemy.position[2] + (Math.random() - 0.5) * 1.5,
            ],
            loot: generateLootDrop(enemy.position, depth),
          });
        }
      }

      setLoot(newLoot);
    }

    prevEnemies.current = current;
  }, [enemies]);

  return null;
}
