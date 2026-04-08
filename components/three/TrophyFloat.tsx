"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TrophyFloat({ position = [0, 0, 0] as [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  const gold = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffb86b", metalness: 0.95, roughness: 0.25 }),
    [],
  );

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8) * 0.15;
      group.current.rotation.y += 0.004;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh material={gold} position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.6, 0.35, 0.8, 32]} />
      </mesh>
      <mesh material={gold} position={[0, 1.55, 0]}>
        <torusGeometry args={[0.55, 0.05, 16, 48]} />
      </mesh>
      <mesh material={gold} position={[-0.65, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.04, 12, 32, Math.PI]} />
      </mesh>
      <mesh material={gold} position={[0.65, 1.1, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.04, 12, 32, Math.PI]} />
      </mesh>
      <mesh material={gold} position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
      </mesh>
      <mesh material={gold} position={[0, 0.1, 0]}>
        <boxGeometry args={[0.9, 0.2, 0.9]} />
      </mesh>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 3]} intensity={1.5} />
      <directionalLight position={[-3, -2, -2]} intensity={0.7} color="#5b8cff" />
    </group>
  );
}
