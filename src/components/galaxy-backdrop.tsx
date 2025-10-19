"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Starfield({ count = 5000 }) {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(6, 22);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.01;
      ref.current.rotation.z += d * 0.004;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        depthWrite={false}
        size={0.02}
        sizeAttenuation
        color="#ffd1ff"
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function GalaxyBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#0a0a0b"]} />
        <ambientLight intensity={0.2} />
        <directionalLight intensity={0.6} position={[2, 2, 2]} />
        <Starfield />

        <EffectComposer>
          <Bloom mipmapBlur intensity={0.7} luminanceThreshold={0.18} />
        </EffectComposer>
        <Environment preset="night" />
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,160,200,0.06)_0%,rgba(0,0,0,0.0)_50%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
