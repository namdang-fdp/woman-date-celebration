"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

/* ---------- TRÁI TIM 3D ---------- */
function Heart() {
  const shape = React.useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.5);
    s.bezierCurveTo(0, 0.8, -0.25, 0.95, -0.6, 0.95);
    s.bezierCurveTo(-1.25, 0.95, -1.25, 0.2, -1.25, 0.2);
    s.bezierCurveTo(-1.25, -0.35, -0.7, -0.75, 0, -1.15);
    s.bezierCurveTo(0.7, -0.75, 1.25, -0.35, 1.25, 0.2);
    s.bezierCurveTo(1.25, 0.2, 1.25, 0.95, 0.6, 0.95);
    s.bezierCurveTo(0.25, 0.95, 0, 0.8, 0, 0.5);
    return s;
  }, []);

  const geo = React.useMemo(
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
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1}>
      <mesh geometry={geo} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial
          color="#ff6b8b"
          emissive="#ff6b8b"
          emissiveIntensity={1.0}
          metalness={0.1}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

/* ---------- BORDER TRÁI TIM (viền hạt) ---------- */
function HeartBorder() {
  const ref = React.useRef<THREE.Points>(null);
  const count = 2000;

  const positions = React.useMemo(() => {
    const pts: number[] = [];
    const scale = 1.05;
    const thickness = 0.08;

    // hạt nằm trên đường biên của hình trái tim (parametric curve)
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const x = (16 * Math.sin(t) ** 3) / 17;
      const y =
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)) /
        17;
      pts.push(
        x * scale + (Math.random() - 0.5) * 0.02,
        y * scale + (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * thickness,
      );
    }
    return new Float32Array(pts);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.8) * 0.015;
    if (ref.current) ref.current.scale.set(s, s, s);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        depthWrite={false}
        size={0.045}
        sizeAttenuation
        color="#ff8ab3"
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ---------- HẠT BAY XUNG QUANH ---------- */
function SurroundingAsteroids() {
  const ref = React.useRef<THREE.Points>(null);
  const count = 2000;

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(4, 12);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.z += delta * 0.008;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        depthWrite={false}
        size={0.025}
        sizeAttenuation
        color="#ffd1ff"
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* ---------- HERO (tổng hợp) ---------- */
export default function Hero20Oct() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-[#0a0a0b]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 7], fov: 60 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#0a0a0b"]} />
          <ambientLight intensity={0.25} />
          <directionalLight intensity={0.8} position={[2, 2, 2]} />

          <SurroundingAsteroids />
          <HeartBorder />

          <EffectComposer>
            <Bloom mipmapBlur intensity={1} luminanceThreshold={0.2} />
          </EffectComposer>
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        {/* đưa dòng chúc mừng lên cao hơn */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: -80 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
        >
          <motion.span
            initial={{ backgroundPositionX: "0%" }}
            animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#f472b6,#fb7185,#a78bfa,#f472b6)] bg-[length:200%_100%]"
          >
            Chúc mừng ngày phụ nữ Việt Nam 20/10
          </motion.span>
        </motion.h1>

        {/* Trái tim 3D */}
        <div className="mx-auto mt-16 h-[240px] w-full">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.6} />
            <directionalLight intensity={1.2} position={[2, 2, 2]} />
            <Heart />
            <EffectComposer>
              <Bloom mipmapBlur intensity={1.3} luminanceThreshold={0.25} />
            </EffectComposer>
            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Dòng chữ lãng mạn hơn */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-8 text-lg md:text-xl font-light tracking-wide text-transparent bg-clip-text bg-[linear-gradient(90deg,#fbcfe8,#f9a8d4,#d8b4fe)] bg-[length:200%_100%] animate-[shine_6s_linear_infinite]"
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Một hành trình nhỏ dành riêng cho em ✨
        </motion.p>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-0 right-0 z-10 mx-auto w-max text-white/60 text-sm"
      >
        Scroll to begin the journey ↓
      </motion.div>
    </section>
  );
}
