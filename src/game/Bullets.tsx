import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore, Bullet } from "./store";
import { ARENA_BOUNDS } from "./Arena";

const BULLET_HIT_RADIUS = 1.3;

export function Bullets() {
  useFrame((_, delta) => {
    const store = useGameStore.getState();
    const currentBullets = store.bullets;
    if (currentBullets.length === 0) return;

    const currentEnemies = store.enemies;
    const range = store.player.weapon.range || 20;

    const toRemove = new Set<string>();
    const updated: Bullet[] = [];

    for (const bullet of currentBullets) {
      const newPos: [number, number, number] = [
        bullet.position[0] + bullet.direction[0] * bullet.speed * delta,
        bullet.position[1] + bullet.direction[1] * bullet.speed * delta,
        bullet.position[2] + bullet.direction[2] * bullet.speed * delta,
      ];
      const newDist = bullet.distanceTraveled + bullet.speed * delta;

      if (
        Math.abs(newPos[0]) > ARENA_BOUNDS + 1 ||
        Math.abs(newPos[2]) > ARENA_BOUNDS + 1 ||
        newDist > range
      ) {
        toRemove.add(bullet.id);
        continue;
      }

      let hit = false;
      for (const enemy of currentEnemies) {
        if (enemy.dead) continue;
        const dx = enemy.position[0] - newPos[0];
        const dz = enemy.position[2] - newPos[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < BULLET_HIT_RADIUS) {
          store.damageEnemy(enemy.id, bullet.damage);
          toRemove.add(bullet.id);
          hit = true;
          break;
        }
      }

      if (!hit) {
        updated.push({ ...bullet, position: newPos, distanceTraveled: newDist });
      }
    }

    if (toRemove.size > 0 || updated.length !== currentBullets.length) {
      store.updateBullets(updated);
    }
  });

  const bullets = useGameStore((s) => s.bullets);

  return (
    <group>
      {bullets.map((bullet) => (
        <mesh key={bullet.id} position={bullet.position}>
          <sphereGeometry args={[0.12, 6, 6]} />
          <meshStandardMaterial
            color="#ffee00"
            emissive="#ff8800"
            emissiveIntensity={4}
          />
        </mesh>
      ))}
    </group>
  );
}
