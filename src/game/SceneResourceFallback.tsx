import type { ReactNode } from "react";

export function SceneResourceFallback({ children }: { children?: ReactNode }) {
  return (
    <group>
      <mesh position={[0, 1, -3]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#553366" wireframe />
      </mesh>
      {children}
    </group>
  );
}
