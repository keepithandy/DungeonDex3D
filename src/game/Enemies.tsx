import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore, Enemy } from "./store";
import { getEnemyColor, getEnemySize } from "./monsterSystem";

const ATTACK_RANGE = 2.0;
const ATTACK_COOLDOWN = 1.2;

function EnemyMesh({ enemy }: { enemy: Enemy }) {
  const groupRef = useRef<THREE.Group>(null);
  const updateEnemy = useGameStore((s) => s.updateEnemy);
  const damagePlayer = useGameStore((s) => s.damagePlayer);
  const posRef = useRef<[number, number, number]>([...enemy.position]);

  const color = getEnemyColor(enemy.kind);
  const size = getEnemySize(enemy.kind);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const store = useGameStore.getState();
    const currentEnemy = store.enemies.find((e) => e.id === enemy.id);
    if (!currentEnemy || currentEnemy.dead) return;

    const playerPos = store.player.position;
    const [ex, ey, ez] = posRef.current;

    const dx = playerPos[0] - ex;
    const dz = playerPos[2] - ez;
    const dist = Math.sqrt(dx * dx + dz * dz);

    const now = performance.now() / 1000;

    if (dist < ATTACK_RANGE) {
      if (now - currentEnemy.lastAttack > ATTACK_COOLDOWN) {
        damagePlayer(currentEnemy.damage);
        updateEnemy(enemy.id, { lastAttack: now });
      }
    } else if (dist > 0.05) {
      const speed = currentEnemy.speed;
      const nx = (dx / dist) * speed * delta;
      const nz = (dz / dist) * speed * delta;
      posRef.current = [ex + nx, ey, ez + nz];
      updateEnemy(enemy.id, { position: posRef.current });
    }

    groupRef.current.position.set(posRef.current[0], posRef.current[1], posRef.current[2]);
    groupRef.current.lookAt(playerPos[0], posRef.current[1], playerPos[2]);
  });

  if (enemy.dead) return null;

  const hpFrac = Math.max(0, enemy.hp / enemy.maxHp);
  const hpColor = hpFrac > 0.6 ? "#00ff44" : hpFrac > 0.3 ? "#ffaa00" : "#ff2200";

  return (
    <group ref={groupRef} position={enemy.position}>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[size, size * 1.6, size]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Eyes glow */}
      <mesh position={[size * 0.22, size * 0.35, -(size * 0.52)]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} />
      </mesh>
      <mesh position={[-(size * 0.22), size * 0.35, -(size * 0.52)]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} />
      </mesh>

      {/* Boss crown */}
      {enemy.kind === "boss" && (
        <>
          <mesh position={[0, size * 0.9, 0]}>
            <cylinderGeometry args={[size * 0.3, size * 0.5, size * 0.3, 6]} />
            <meshStandardMaterial color="#cc8800" emissive="#ff8800" emissiveIntensity={1.2} />
          </mesh>
          <pointLight color="#ff8800" intensity={2} distance={8} position={[0, size, 0]} />
        </>
      )}

      {/* HP Bar background */}
      <mesh position={[0, size * 1.15, 0]}>
        <boxGeometry args={[1.2, 0.12, 0.05]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* HP Bar fill */}
      <mesh position={[(hpFrac - 1) * 0.6, size * 1.15, 0.03]}>
        <boxGeometry args={[Math.max(0.01, 1.2 * hpFrac), 0.1, 0.05]} />
        <meshStandardMaterial color={hpColor} emissive={hpColor} emissiveIntensity={0.6} />
      </mesh>

      <pointLight color={color} intensity={0.4} distance={3.5} />
    </group>
  );
}

export function Enemies() {
  const enemies = useGameStore((s) => s.enemies);

  return (
    <group>
      {enemies.map((enemy) =>
        enemy.dead ? null : <EnemyMesh key={enemy.id} enemy={enemy} />
      )}
    </group>
  );
}
