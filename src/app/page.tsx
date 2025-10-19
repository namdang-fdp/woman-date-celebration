"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import BookInterface from "@/components/book-interface";
import ParticleBackground from "@/components/particle-background";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-b from-background via-background to-background overflow-x-hidden dark"
    >
      {/* Hero Section with 3D Background */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ParticleBackground />
            <Environment preset="night" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 md:px-8 w-full">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-6">
              Happy Women's Day
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              A special journey celebrating you
            </p>
          </div>

          {/* Floating 3D Elements */}
          <div className="mt-16 h-64 w-full">
            <Canvas camera={{ position: [0, 0, 3] }}>
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh>
                  <icosahedronGeometry args={[1, 4]} />
                  <meshStandardMaterial
                    color="#b88686"
                    emissive="#b88686"
                    emissiveIntensity={0.3}
                    wireframe={false}
                  />
                </mesh>
              </Float>
              <Environment preset="night" />
            </Canvas>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="text-center">
            <p className="text-sm text-foreground/60 mb-2">
              Scroll to begin the journey
            </p>
            <svg
              className="w-6 h-6 mx-auto text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Book Journey Section */}
      <section className="relative w-full min-h-[500vh] py-20 px-4 md:px-8">
        <BookInterface scrollProgress={scrollProgress} />
      </section>

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}
