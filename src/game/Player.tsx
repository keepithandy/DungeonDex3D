import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "./store";
import { ARENA_BOUNDS } from "./Arena";
import { clampArenaPosition, normalizeMovementInput } from "./movementModel.mjs";

const MOVE_SPEED = 7;
const MOUSE_SENSITIVITY = 0.002;
const PLAYER_HEIGHT = 1.6;

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
}

export type PointerLockStatus = "unlocked" | "locked" | "error";

interface PlayerProps {
  onPointerLockStatusChange: (status: PointerLockStatus) => void;
}

export function Player({ onPointerLockStatusChange }: PlayerProps) {
  const { camera, gl } = useThree();
  const [, getKeys] = useKeyboardControls<Controls>();
  const updatePlayer = useGameStore((s) => s.updatePlayer);
  const addBullet = useGameStore((s) => s.addBullet);
  const phase = useGameStore((s) => s.phase);

  const yaw = useRef(0);
  const pitch = useRef(0);
  const pos = useRef(new THREE.Vector3(0, PLAYER_HEIGHT, 0));
  const lastShot = useRef(0);
  const isPointerLocked = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;

    const reportPointerLockError = () => {
      isPointerLocked.current = false;
      onPointerLockStatusChange("error");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isPointerLocked.current) return;
      yaw.current -= e.movementX * MOUSE_SENSITIVITY;
      pitch.current -= e.movementY * MOUSE_SENSITIVITY;
      pitch.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitch.current));
    };

    const onClick = () => {
      if (!isPointerLocked.current) {
        if (typeof canvas.requestPointerLock !== "function") {
          reportPointerLockError();
          return;
        }

        try {
          const lockRequest = canvas.requestPointerLock();
          lockRequest?.catch(reportPointerLockError);
        } catch {
          reportPointerLockError();
        }
        return;
      }
      tryShoot();
    };

    const onPointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvas;
      isPointerLocked.current = isLocked;
      onPointerLockStatusChange(isLocked ? "locked" : "unlocked");
    };

    document.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);
    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.addEventListener("pointerlockerror", reportPointerLockError);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("pointerlockerror", reportPointerLockError);
    };
  }, [gl, onPointerLockStatusChange]);

  const tryShoot = () => {
    const store = useGameStore.getState();
    if (store.phase !== "playing") return;
    const now = performance.now() / 1000;
    const { weapon } = store.player;
    if (now - lastShot.current < 1 / weapon.fireRate) return;
    lastShot.current = now;

    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    dir.normalize();

    addBullet({
      id: `bullet-${Date.now()}-${Math.random()}`,
      position: [pos.current.x, pos.current.y, pos.current.z],
      direction: [dir.x, dir.y, dir.z],
      damage: weapon.damage,
      speed: 25,
      distanceTraveled: 0,
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "KeyF") {
        tryShoot();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useFrame((_, delta) => {
    if (phase !== "playing") return;

    const keys = getKeys();
    const forward = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current));
    const right = new THREE.Vector3(Math.cos(yaw.current), 0, -Math.sin(yaw.current));
    const input = normalizeMovementInput(keys.forward, keys.back, keys.left, keys.right);
    const move = forward.multiplyScalar(-input.z).add(right.multiplyScalar(input.x));

    if (move.lengthSq() > 0) {
      move.multiplyScalar(MOVE_SPEED * delta);
      pos.current.add(move);
    }

    const [x, y, z] = clampArenaPosition(
      [pos.current.x, pos.current.y, pos.current.z],
      ARENA_BOUNDS,
      PLAYER_HEIGHT,
    );
    pos.current.set(x, y, z);

    camera.position.copy(pos.current);
    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");

    updatePlayer({
      position: [pos.current.x, pos.current.y, pos.current.z],
      yaw: yaw.current,
      pitch: pitch.current,
    });
  });

  return null;
}

export { Controls };
