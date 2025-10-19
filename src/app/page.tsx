"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import BookInterface from "@/components/book-interface";
import ParticleBackground from "@/components/particle-background";
import Hero20Oct from "@/components/hero";

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
      <Hero20Oct />
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
