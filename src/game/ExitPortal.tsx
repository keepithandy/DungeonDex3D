import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "./store";
import { generateLootDrop } from "./lootSystem";
import { spawnEnemiesForDepth } from "./monsterSystem";

const PORTAL_POSITION: [number, number, number] = [0, 1.5, -17];
const PORTAL_RADIUS = 2.5;

export function ExitPortal() {
  const exitActive = useGameStore((s) => s.exitActive);
  const depth = useGameStore((s) => s.depth);
  const goDeeper = useGameStore((s) => s.goDeeper);
  const setEnemies = useGameStore((s) => s.setEnemies);
  const setLoot = useGameStore((s) => s.setLoot);
  const ringRef = useRef<THREE.Mesh>(null);
  const triggered = useRef(false);

  useFrame(({ clock }, delta) => {
    if (!exitActive) return;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.5;
      ringRef.current.rotation.y += delta * 0.8;
    }

    if (triggered.current) return;
    const playerPos = useGameStore.getState().player.position;
    const dx = playerPos[0] - PORTAL_POSITION[0];
    const dz = playerPos[2] - PORTAL_POSITION[2];
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < PORTAL_RADIUS) {
      triggered.current = true;
      const newDepth = depth + 1;
      goDeeper();

      setTimeout(() => {
        const enemies = spawnEnemiesForDepth(newDepth);
        setEnemies(enemies);

        const lootDrops = enemies.slice(0, 2).map((e, i) => ({
          id: `loot-initial-${i}-${Date.now()}`,
          position: [
            e.position[0] + (Math.random() - 0.5) * 4,
            0.5,
            e.position[2] + (Math.random() - 0.5) * 4,
          ] as [number, number, number],
          loot: generateLootDrop(e.position, newDepth),
        }));
        setLoot(lootDrops);
        triggered.current = false;
      }, 100);
    }
  });

  if (!exitActive) return null;

  return (
    <group position={PORTAL_POSITION}>
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.3, 16, 40]} />
        <meshStandardMaterial
          color="#8800ff"
          emissive="#6600cc"
          emissiveIntensity={2}
          metalness={0.9}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.9, 32]} />
        <meshStandardMaterial
          color="#4400aa"
          emissive="#5500cc"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight color="#9933ff" intensity={6} distance={15} />
    </group>
  );
}
