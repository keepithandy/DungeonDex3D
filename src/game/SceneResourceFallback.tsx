export function SceneResourceFallback() {
  return (
    <group>
      <mesh position={[0, 1, -3]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#553366" wireframe />
      </mesh>
    </group>
  );
}
