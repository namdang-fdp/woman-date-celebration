"use client";

import { useState, useEffect } from "react";

interface BookInterfaceProps {
  scrollProgress: number;
}

const wishes = [
  {
    title: "To My Dearest",
    content:
      "On this special day, I want to celebrate you and everything you bring into my life. Your strength, beauty, and kindness inspire me every single day.",
    emoji: "💝",
  },
  {
    title: "Your Strength",
    content:
      "You face every challenge with grace and determination. The way you handle difficulties with such poise and wisdom is truly remarkable. You are my inspiration.",
    emoji: "💪",
  },
  {
    title: "Your Beauty",
    content:
      "Your beauty goes far beyond what meets the eye. It's in your smile, your laughter, your compassion, and the way you make everyone around you feel special.",
    emoji: "✨",
  },
  {
    title: "Your Impact",
    content:
      "The positive impact you have on the world is immeasurable. You touch hearts, change lives, and make this world a better place just by being you.",
    emoji: "🌟",
  },
  {
    title: "My Promise",
    content:
      "I promise to always support you, celebrate your victories, and stand by you through every moment. You deserve all the happiness in the world.",
    emoji: "💕",
  },
  {
    title: "Forever Grateful",
    content:
      "Thank you for being the amazing woman you are. Thank you for your love, your trust, and for letting me be part of your journey. Happy Women's Day!",
    emoji: "🌹",
  },
];

export default function BookInterface({ scrollProgress }: BookInterfaceProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (scrollProgress < 0.2) {
      setCurrentPage(0);
    } else {
      const pageProgress = (scrollProgress - 0.2) / 0.8;
      const newPage = Math.floor(pageProgress * wishes.length);
      if (newPage !== currentPage && newPage < wishes.length) {
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage(newPage);
          setIsFlipping(false);
        }, 400);
      }
    }
  }, [scrollProgress, currentPage]);

  const zoomProgress = Math.min(scrollProgress / 0.2, 1);
  const scale = 1 - zoomProgress * 0.7;
  const opacity = 1 - zoomProgress * 0.3;

  const page = wishes[currentPage];
  const progress =
    scrollProgress < 0.2 ? 0 : ((scrollProgress - 0.2) / 0.8) * 100;

  return (
    <div className="relative w-full">
      {/* Sticky book container */}
      <div className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 w-full py-20">
        <div
          className="book-container w-full max-w-3xl"
          style={{ transform: `scale(${scale})`, opacity }}
        >
          <div className="relative w-full aspect-video rounded-2xl book-shadow overflow-hidden group">
            {/* Book spine effect */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary/10 to-primary/30 z-20" />

            <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent book-inner-shadow" />

            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

            {/* Main content area with page flip effect */}
            <div
              className="w-full h-full flex items-center justify-center p-12 transition-all duration-500 relative"
              style={{
                background: `linear-gradient(135deg, rgba(184, 134, 134, 0.08) 0%, rgba(117, 107, 177, 0.08) 50%, rgba(120, 81, 169, 0.08) 100%)`,
                transform: `perspective(1200px) rotateY(${isFlipping ? 90 : 0}deg)`,
                opacity: isFlipping ? 0 : 1,
              }}
            >
              <div className="text-center space-y-8 max-w-xl relative z-10">
                <div className="text-6xl animate-float">{page.emoji}</div>
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                  {page.title}
                </h2>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  {page.content}
                </p>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/60 group-hover:border-primary transition-colors" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/60 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/60 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/60 group-hover:border-primary transition-colors" />

            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 0 30px rgba(184, 134, 134, 0.2), 0 0 30px rgba(184, 134, 134, 0.1)",
              }}
            />
          </div>
        </div>

        {/* Page indicator - only show after zoom completes */}
        {scrollProgress >= 0.2 && (
          <div className="w-full max-w-3xl space-y-4 animate-fade-in-up">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/60">
                Reading Progress
              </span>
              <span className="text-sm font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex gap-3 justify-center pt-4">
              {wishes.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? "bg-gradient-to-r from-primary to-accent w-8"
                      : "bg-primary/30 w-2 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <p className="text-foreground/50 text-sm text-center mt-8">
              {currentPage === wishes.length - 1
                ? "You've reached the end. Thank you for reading! 💕"
                : "Scroll to turn the page"}
            </p>
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-0 pt-96">
        {wishes.map((wish, index) => (
          <div
            key={index}
            className="min-h-screen flex items-center justify-center px-4 md:px-8 relative"
            style={{
              opacity:
                scrollProgress > 0.2 + (index / wishes.length) * 0.8 ? 1 : 0,
              transition: "opacity 0.6s ease-out",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(${184 + index * 5}, ${134 - index * 3}, ${134 + index * 2}, 0.05) 0%, rgba(${120 - index * 3}, ${81 + index * 2}, ${169 - index * 1}, 0.05) 100%)`,
              }}
            />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/8 blur-3xl" />
              <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/8 blur-3xl" />
            </div>

            <div className="max-w-2xl text-center space-y-6 relative z-10">
              <div className="text-7xl animate-float">{wish.emoji}</div>
              <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                {wish.title}
              </h3>
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
                {wish.content}
              </p>
              <div className="pt-8 flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                <div className="w-2 h-2 rounded-full bg-accent/50" />
                <div className="w-2 h-2 rounded-full bg-secondary/50" />
              </div>
            </div>
          </div>
        ))}

        {/* Final message */}
        <div
          className="min-h-screen flex items-center justify-center px-4 md:px-8 relative"
          style={{
            opacity: scrollProgress > 0.95 ? 1 : 0,
            transition: "opacity 0.6s ease-out",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, rgba(184, 134, 134, 0.08) 0%, rgba(120, 81, 169, 0.08) 100%)`,
            }}
          />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-primary/10 blur-3xl animate-pulse" />
            <div
              className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="max-w-2xl text-center space-y-8 relative z-10">
            <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              Happy Women Day
            </h2>
            <p className="text-2xl text-foreground/80">
              You are extraordinary, and you deserve to be celebrated every
              single day.
            </p>
            <div className="text-5xl animate-float">💕</div>
          </div>
        </div>
      </div>
    </div>
  );
}
