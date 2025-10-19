"use client";

import { useEffect, useRef } from "react";

export default function FloatingFlowers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flowers: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    // Create flowers
    for (let i = 0; i < 15; i++) {
      flowers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const drawFlower = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
    ) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Draw petals
      const petals = 5;
      for (let i = 0; i < petals; i++) {
        ctx.fillStyle = `hsla(${15 + i * 10}, 80%, 60%, 0.6)`;
        ctx.beginPath();
        ctx.ellipse(0, -size / 2, size / 3, size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.rotate((Math.PI * 2) / petals);
      }

      // Draw center
      ctx.fillStyle = "hsla(45, 100%, 70%, 0.8)";
      ctx.beginPath();
      ctx.arc(0, 0, size / 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flowers.forEach((flower) => {
        flower.x += flower.vx;
        flower.y += flower.vy;
        flower.rotation += flower.rotationSpeed;

        // Wrap around screen
        if (flower.x < -50) flower.x = canvas.width + 50;
        if (flower.x > canvas.width + 50) flower.x = -50;
        if (flower.y < -50) flower.y = canvas.height + 50;
        if (flower.y > canvas.height + 50) flower.y = -50;

        drawFlower(
          flower.x,
          flower.y,
          flower.size,
          flower.rotation,
          flower.opacity,
        );
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
