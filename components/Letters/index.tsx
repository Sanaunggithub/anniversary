"use client";

import { useState } from "react";
import { letters, type Letter } from "@/data/letters";
import LetterCard from "./LetterCard";
import LetterModal from "./LetterModal";

export default function Letters() {
  const [openLetter, setOpenLetter] = useState<Letter | null>(null);

  return (
    <>
      <section>
        <div className="mb-10 text-center">
          <h1 className="font-serif-display text-4xl text-ink sm:text-5xl">
            Open When...
          </h1>
          <p className="mt-3 font-sans-ui text-muted">
            For the moments in between
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {letters.map((letter) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              onOpen={setOpenLetter}
            />
          ))}
        </div>
      </section>

      <LetterModal
        letter={openLetter}
        onClose={() => setOpenLetter(null)}
      />
    </>
  );
}