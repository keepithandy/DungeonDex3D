import * as THREE from "three";
import { useGameStore } from "./store";
import { useMemo } from "react";

const WALL_HEIGHT = 6;
const ARENA_SIZE = 40;
const WALL_THICKNESS = 1;

export function Arena() {
  const depth = useGameStore((s) => s.depth);

  const floorColor = useMemo(() => {
    const hue = (depth * 37) % 360;
    return `hsl(${hue}, 20%, 18%)`;
  }, [depth]);

  const wallColor = "#2a2a3a";
  const ceilingColor = "#111118";
  const torchPositions: [number, number, number][] = [
    [ARENA_SIZE / 2 - 2, 3, 0],
    [-ARENA_SIZE / 2 + 2, 3, 0],
    [0, 3, ARENA_SIZE / 2 - 2],
    [0, 3, -ARENA_SIZE / 2 + 2],
    [ARENA_SIZE / 2 - 2, 3, ARENA_SIZE / 2 - 2],
    [-ARENA_SIZE / 2 + 2, 3, ARENA_SIZE / 2 - 2],
    [ARENA_SIZE / 2 - 2, 3, -ARENA_SIZE / 2 + 2],
    [-ARENA_SIZE / 2 + 2, 3, -ARENA_SIZE / 2 + 2],
  ];

  const pillarPositions: [number, number][] = [
    [10, 10],
    [-10, 10],
    [10, -10],
    [-10, -10],
  ];

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ARENA_SIZE, ARENA_SIZE]} />
        <meshStandardMaterial color={floorColor} roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, WALL_HEIGHT, 0]}>
        <planeGeometry args={[ARENA_SIZE, ARENA_SIZE]} />
        <meshStandardMaterial color={ceilingColor} roughness={1} />
      </mesh>

      {/* North Wall */}
      <mesh position={[0, WALL_HEIGHT / 2, -ARENA_SIZE / 2]} receiveShadow castShadow>
        <boxGeometry args={[ARENA_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* South Wall */}
      <mesh position={[0, WALL_HEIGHT / 2, ARENA_SIZE / 2]} receiveShadow castShadow>
        <boxGeometry args={[ARENA_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* East Wall */}
      <mesh position={[ARENA_SIZE / 2, WALL_HEIGHT / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ARENA_SIZE]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* West Wall */}
      <mesh position={[-ARENA_SIZE / 2, WALL_HEIGHT / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ARENA_SIZE]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* Pillars */}
      {pillarPositions.map(([px, pz], i) => (
        <mesh key={i} position={[px, WALL_HEIGHT / 2, pz]} castShadow receiveShadow>
          <boxGeometry args={[1.2, WALL_HEIGHT, 1.2]} />
          <meshStandardMaterial color="#333344" roughness={0.9} />
        </mesh>
      ))}

      {/* Torches */}
      {torchPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <boxGeometry args={[0.15, 0.6, 0.15]} />
            <meshStandardMaterial color="#5a3a1a" />
          </mesh>
          <pointLight
            position={[0, 0.5, 0]}
            color="#ff8833"
            intensity={2.5}
            distance={12}
            decay={2}
          />
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={2} />
          </mesh>
        </group>
      ))}

      {/* Depth indicator on floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial
          color={`hsl(${(depth * 60) % 360}, 80%, 30%)`}
          emissive={`hsl(${(depth * 60) % 360}, 80%, 20%)`}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

export const ARENA_BOUNDS = ARENA_SIZE / 2 - 1;
