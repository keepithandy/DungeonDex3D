import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useGameStore } from "./store";
import { Arena } from "./Arena";
import { Player, Controls, type PointerLockStatus } from "./Player";
import { Enemies } from "./Enemies";
import { Bullets } from "./Bullets";
import { LootItems } from "./LootItems";
import { ExitPortal } from "./ExitPortal";
import { DeathLootSpawner } from "./DeathLoot";
import { HUD } from "./HUD";
import { spawnEnemiesForDepth } from "./monsterSystem";

const KEY_MAP = [
  { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
  { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
  { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
  { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
];

const NOTIFICATION_TICK_MS = 100;
const MAX_NOTIFICATION_TICK_SECONDS = 0.25;

function NotificationTicker() {
  const tickNotification = useGameStore((s) => s.tickNotification);

  useEffect(() => {
    let previousTime = performance.now();
    const intervalId = window.setInterval(() => {
      const currentTime = performance.now();
      const elapsedSeconds = Math.min(
        (currentTime - previousTime) / 1000,
        MAX_NOTIFICATION_TICK_SECONDS,
      );
      previousTime = currentTime;
      tickNotification(elapsedSeconds);
    }, NOTIFICATION_TICK_MS);

    return () => window.clearInterval(intervalId);
  }, [tickNotification]);

  return null;
}

interface GameSceneProps {
  onPointerLockStatusChange: (status: PointerLockStatus) => void;
}

function GameScene({ onPointerLockStatusChange }: GameSceneProps) {
  const depth = useGameStore((s) => s.depth);
  const setEnemies = useGameStore((s) => s.setEnemies);
  const setLoot = useGameStore((s) => s.setLoot);

  useEffect(() => {
    const enemies = spawnEnemiesForDepth(depth);
    setEnemies(enemies);
    setLoot([]);
  }, [depth]);

  return (
    <>
      <ambientLight intensity={0.25} color="#334" />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#aabbff" castShadow />
      <Arena />
      <Player onPointerLockStatusChange={onPointerLockStatusChange} />
      <Enemies />
      <Bullets />
      <LootItems />
      <ExitPortal />
    </>
  );
}

export function Game() {
  const phase = useGameStore((s) => s.phase);
  const [pointerLockStatus, setPointerLockStatus] = useState<PointerLockStatus>("unlocked");

  if (phase !== "playing") return null;

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", position: "fixed", inset: 0 }}>
      <NotificationTicker />
      <KeyboardControls map={KEY_MAP}>
        <Canvas
          shadows
          camera={{ fov: 75, near: 0.05, far: 200, position: [0, 1.6, 0] }}
          gl={{ antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <GameScene onPointerLockStatusChange={setPointerLockStatus} />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <DeathLootSpawner />
      <HUD pointerLockStatus={pointerLockStatus} />
    </div>
  );
}
