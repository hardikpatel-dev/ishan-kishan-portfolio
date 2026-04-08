"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import type { MotionValue } from "framer-motion";
import { CricketerFigure } from "./CricketerFigure";
import { ParticleDust } from "./ParticleDust";

function ScrollCamera({ progress }: { progress: MotionValue<number> }) {
  const { camera } = useThree();
  const [latest, setLatest] = useState(0);

  useEffect(() => {
    return progress.on("change", (v) => setLatest(v));
  }, [progress]);

  useFrame(() => {
    // Orbit camera around the figure as user scrolls
    const angle = latest * Math.PI * 0.8;
    const radius = 6 - latest * 1.5;
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;
    const targetY = 2 - latest * 0.8;
    camera.position.x += (targetX - camera.position.x) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, 1.3, 0);
  });
  return null;
}

export function HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <>
      <ScrollCamera progress={scrollProgress} />

      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, 3, -2]} intensity={0.9} color="#5b8cff" />
      <directionalLight position={[3, 2, -4]} intensity={0.7} color="#ff9933" />
      <pointLight position={[0, 3, 3]} intensity={0.4} color="#ffffff" />

      {/* Ground shadow disc */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>

      {/* Particle dust */}
      <ParticleDust count={500} />

      {/* The batsman */}
      <CricketerFigure position={[0, 0, 0]} />
    </>
  );
}
