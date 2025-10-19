"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

export default function ParticleBackground() {
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    geometry.attributes.position.needsUpdate = true;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0001;
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={new Float32Array(500 * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#c86496"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}
