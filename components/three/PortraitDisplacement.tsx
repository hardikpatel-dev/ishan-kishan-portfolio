"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uStrength;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    float depth = texture2D(uDepth, uv).r;
    vec3 pos = position;
    pos.z += (depth - 0.5) * uStrength;
    pos.x += uMouse.x * (depth - 0.5) * 0.3;
    pos.y += uMouse.y * (depth - 0.5) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uPhoto;
  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(uPhoto, vUv);
    gl_FragColor = color;
  }
`;

export function PortraitDisplacement({
  photo = "/hero/portrait.jpg",
  depth = "/hero/portrait-depth.jpg",
}: {
  photo?: string;
  depth?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const [photoTex, depthTex] = useTexture([photo, depth]);

  const uniforms = useMemo(
    () => ({
      uPhoto: { value: photoTex },
      uDepth: { value: depthTex },
      uStrength: { value: 0.6 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [photoTex, depthTex],
  );

  useFrame(({ pointer }, delta) => {
    mouse.current.lerp(pointer, Math.min(delta * 3, 1));
    uniforms.uMouse.value.copy(mouse.current);
    if (mesh.current) mesh.current.rotation.y = mouse.current.x * 0.1;
  });

  const aspect = 3 / 4;
  const width = 3;
  const height = width / aspect;

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[width, height, 128, 160]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function PortraitFallback() {
  return (
    <mesh>
      <planeGeometry args={[3, 4, 1, 1]} />
      <meshStandardMaterial color="#0f1a35" />
    </mesh>
  );
}
