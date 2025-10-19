"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ParticleBackground() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    // Galaxy params
    const branches = 5;
    const radius = 8;
    const spin = 1.2;
    const randomness = 0.6;

    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      // chút nhiễu để tự nhiên hơn
      const rand = () =>
        Math.random() ** 2 * randomness * (Math.random() < 0.5 ? 1 : -1);

      pos[i * 3 + 0] = Math.cos(branchAngle + spinAngle) * r + rand();
      pos[i * 3 + 1] = rand() * 0.2; // mỏng theo trục Y
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + rand();
    }
    return pos;
  }, []);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.05; // quay rất nhẹ
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          depthWrite={false}
          size={0.03}
          sizeAttenuation
          color="#c86496"
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
