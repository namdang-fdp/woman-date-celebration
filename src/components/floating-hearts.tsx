"use client";

import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 16 + Math.random() * 24,
      }));
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up opacity-60 hover:opacity-100 transition-opacity"
          style={{
            left: `${heart.left}%`,
            top: "-50px",
            animation: `float-up ${heart.duration}s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
}
