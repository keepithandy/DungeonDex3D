import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore, LootDrop } from "./store";
import { RARITY_COLORS } from "./lootSystem";

const PICKUP_RADIUS = 2.2;

function LootDropItem({ drop }: { drop: LootDrop }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const removeLoot = useGameStore((s) => s.removeLoot);
  const equipWeapon = useGameStore((s) => s.equipWeapon);
  const equipArmor = useGameStore((s) => s.equipArmor);
  const collected = useRef(false);

  const item = drop.loot.type === "weapon" ? drop.loot.item : drop.loot.item;
  const color = RARITY_COLORS[item.rarity];
  const isWeapon = drop.loot.type === "weapon";

  useFrame(({ clock }) => {
    if (!meshRef.current || collected.current) return;

    meshRef.current.position.y = drop.position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.15 + 0.3;
    meshRef.current.rotation.y += 0.025;

    const playerPos = useGameStore.getState().player.position;
    const dx = playerPos[0] - drop.position[0];
    const dz = playerPos[2] - drop.position[2];
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < PICKUP_RADIUS) {
      collected.current = true;
      if (drop.loot.type === "weapon") {
        const currentWeapon = useGameStore.getState().player.weapon;
        if (!currentWeapon || drop.loot.item.damage > currentWeapon.damage) {
          equipWeapon(drop.loot.item as any);
        }
      } else {
        const currentArmor = useGameStore.getState().player.armor;
        const newArmor = drop.loot.item as any;
        if (!currentArmor || newArmor.defense > currentArmor.defense) {
          equipArmor(newArmor);
        }
      }
      removeLoot(drop.id);
    }
  });

  return (
    <group position={drop.position}>
      <mesh ref={meshRef}>
        {isWeapon ? (
          <boxGeometry args={[0.45, 0.08, 0.85]} />
        ) : (
          <boxGeometry args={[0.55, 0.55, 0.14]} />
        )}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
      <pointLight color={color} intensity={1.8} distance={4.5} position={[0, 0.6, 0]} />
    </group>
  );
}

export function LootItems() {
  const loot = useGameStore((s) => s.loot);
  return (
    <group>
      {loot.map((drop) => (
        <LootDropItem key={drop.id} drop={drop} />
      ))}
    </group>
  );
}
