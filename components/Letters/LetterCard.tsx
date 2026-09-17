"use client";

import { motion } from "framer-motion";
import type { Letter } from "@/data/letters";

interface LetterCardProps {
  letter: Letter;
  onOpen: (letter: Letter) => void;
}

export default function LetterCard({ letter, onOpen }: LetterCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(letter)}
      whileHover={{ y: -4, rotate: -0.5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group relative flex min-h-48 flex-col items-center justify-center overflow-hidden rounded-2xl bg-accent-soft p-6 text-center shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={letter.title}
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-accent/20" />

      <span
        className="mb-4 text-5xl transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        {letter.emoji}
      </span>

      <span className="font-serif-display text-xl text-ink">
        {letter.title}
      </span>
    </motion.button>
  );
}