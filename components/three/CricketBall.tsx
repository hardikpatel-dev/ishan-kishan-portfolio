"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CricketBall({ position = [0, 0, 0] as [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
      group.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#8c1a1a" roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.001, 0.012, 16, 128]} />
        <meshStandardMaterial color="#f2f2f2" roughness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0.05]}>
        <torusGeometry args={[1.002, 0.008, 16, 128]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.9} />
      </mesh>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#5b8cff" />
    </group>
  );
}
