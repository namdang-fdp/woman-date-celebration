"use client";

import Hero20Oct from "@/components/hero";
import GalaxyBackdrop from "@/components/galaxy-backdrop";
import BookInterface from "@/components/book-interface";
import EndOfJourneyDialog from "@/components/end-of-journey-dialog";
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <GalaxyBackdrop />

      <main className="relative z-10">
        <Hero20Oct />
        <BookInterface />
        <EndOfJourneyDialog threshold={220} />
      </main>
    </div>
  );
}
