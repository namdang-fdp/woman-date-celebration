"use client";

export default function DecorativeElements() {
  return (
    <div className="w-full h-full relative">
      {/* Top left corner decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl animate-pulse" />

      {/* Top right corner decoration */}
      <div
        className="absolute top-40 right-20 w-40 h-40 rounded-full bg-gradient-to-bl from-secondary/10 to-primary/5 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Middle left decoration */}
      <div
        className="absolute top-1/3 left-5 w-24 h-24 rounded-full bg-gradient-to-tr from-accent/15 to-primary/10 blur-2xl animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Middle right decoration */}
      <div
        className="absolute top-1/2 right-10 w-36 h-36 rounded-full bg-gradient-to-tl from-primary/10 to-secondary/5 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Bottom left decoration */}
      <div
        className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-gradient-to-tr from-secondary/10 to-accent/5 blur-3xl animate-pulse"
        style={{ animationDelay: "0.8s" }}
      />

      {/* Bottom right decoration */}
      <div
        className="absolute bottom-40 right-5 w-40 h-40 rounded-full bg-gradient-to-bl from-accent/10 to-primary/5 blur-3xl animate-pulse"
        style={{ animationDelay: "1.2s" }}
      />

      {/* Scattered small dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
