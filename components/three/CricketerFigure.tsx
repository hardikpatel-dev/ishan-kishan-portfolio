"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CricketerFigure({ position = [0, 0, 0] as [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  // Materials
  const skin = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#2a3452", metalness: 0.2, roughness: 0.6 }),
    [],
  );
  const jersey = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0a1226", metalness: 0.1, roughness: 0.8 }),
    [],
  );
  const pads = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#eaf0ff", metalness: 0.0, roughness: 0.9 }),
    [],
  );
  const bat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c6925a", metalness: 0.15, roughness: 0.5 }),
    [],
  );
  const handle = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ff9933", metalness: 0.1, roughness: 0.6 }),
    [],
  );

  // Subtle idle animation
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 0.7) * 0.05;
    group.current.rotation.y = Math.sin(t * 0.3) * 0.04;
  });

  return (
    <group ref={group} position={position}>
      {/* Head */}
      <mesh material={skin} position={[0, 2.55, 0]}>
        <sphereGeometry args={[0.28, 24, 24]} />
      </mesh>
      {/* Helmet top */}
      <mesh material={jersey} position={[0, 2.7, -0.02]}>
        <sphereGeometry args={[0.32, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {/* Neck */}
      <mesh material={skin} position={[0, 2.25, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.14, 12]} />
      </mesh>

      {/* Torso (jersey), leaning slightly forward */}
      <group position={[0, 1.55, 0]} rotation={[0.12, 0, 0]}>
        <mesh material={jersey}>
          <cylinderGeometry args={[0.34, 0.42, 1.1, 16]} />
        </mesh>
        {/* Jersey number patch */}
        <mesh position={[0.0, 0.0, 0.36]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshStandardMaterial color="#ff9933" emissive="#ff9933" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Hips */}
      <mesh material={jersey} position={[0, 0.95, 0.05]}>
        <sphereGeometry args={[0.4, 16, 16]} />
      </mesh>

      {/* Front leg (left, forward) */}
      <group position={[0.18, 0.7, 0.25]} rotation={[0.15, 0, 0]}>
        <mesh material={pads} position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.13, 0.14, 0.7, 12]} />
        </mesh>
        <mesh material={pads} position={[0, -0.9, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.35]} />
        </mesh>
      </group>

      {/* Back leg (right, planted) */}
      <group position={[-0.22, 0.7, -0.1]} rotation={[-0.1, 0, 0.05]}>
        <mesh material={pads} position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.13, 0.14, 0.7, 12]} />
        </mesh>
        <mesh material={pads} position={[0, -0.9, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.35]} />
        </mesh>
      </group>

      {/* Top hand + arm (guide hand, near top of handle) */}
      <group position={[-0.32, 1.85, 0.15]} rotation={[0.4, -0.2, -0.3]}>
        <mesh material={jersey} position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.6, 12]} />
        </mesh>
        <mesh material={skin} position={[0, -0.65, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
      </group>

      {/* Bottom hand + arm */}
      <group position={[-0.18, 1.5, 0.25]} rotation={[0.6, -0.15, -0.2]}>
        <mesh material={jersey} position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.55, 12]} />
        </mesh>
        <mesh material={skin} position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
      </group>

      {/* Bat — held at ~45° behind the shoulder, ready */}
      <group position={[-0.22, 1.4, 0.3]} rotation={[-0.3, -0.2, 0.6]}>
        {/* handle */}
        <mesh material={handle} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
        </mesh>
        {/* shoulder of bat */}
        <mesh material={bat} position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.2, 12]} />
        </mesh>
        {/* blade */}
        <mesh material={bat} position={[0, -0.35, 0.02]}>
          <boxGeometry args={[0.22, 0.85, 0.07]} />
        </mesh>
      </group>
    </group>
  );
}
