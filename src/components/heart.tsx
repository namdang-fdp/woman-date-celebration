"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { Float } from "@react-three/drei";

export function Heart() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // Path trái tim (tỉ lệ đẹp cho landing)
    s.moveTo(0, 0.5);
    s.bezierCurveTo(0, 0.8, -0.25, 0.95, -0.6, 0.95);
    s.bezierCurveTo(-1.25, 0.95, -1.25, 0.2, -1.25, 0.2);
    s.bezierCurveTo(-1.25, -0.35, -0.7, -0.75, 0, -1.15);
    s.bezierCurveTo(0.7, -0.75, 1.25, -0.35, 1.25, 0.2);
    s.bezierCurveTo(1.25, 0.2, 1.25, 0.95, 0.6, 0.95);
    s.bezierCurveTo(0.25, 0.95, 0, 0.8, 0, 0.5);
    return s;
  }, []);

  const geo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.35,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 6,
      }),
    [shape],
  );

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh geometry={geo} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial
          color="#ff6b8b"
          emissive="#ff6b8b"
          emissiveIntensity={0.4}
          metalness={0.12}
          roughness={0.35}
        />
      </mesh>
    </Float>
  );
}
