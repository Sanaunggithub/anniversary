"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { surpriseConfig } from "@/data/surprise";

interface Step1QuestionProps {
  onComplete: () => void;
}

export default function Step1Question({ onComplete }: Step1QuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const timer = window.setTimeout(onComplete, 800);
    return () => window.clearTimeout(timer);
  }, [selectedIndex, onComplete]);

  function choose(index: number) {
    if (selectedIndex !== null) return;

    if (index === surpriseConfig.step1CorrectIndex) {
      setSelectedIndex(index);
    } else {
      setWrongIndex(index);
      window.setTimeout(() => setWrongIndex(null), 450);
    }
  }

  return (
    <div className="text-center">
      <p className="mb-8 font-serif-display text-2xl text-ink">
        {surpriseConfig.step1Question}
      </p>

      <div className="space-y-3">
        {surpriseConfig.step1Options.map((option, index) => (
          <motion.button
            key={option}
            type="button"
            onClick={() => choose(index)}
            animate={
              wrongIndex === index
                ? { x: [0, -6, 6, -4, 4, 0] }
                : { x: 0 }
            }
            className={`w-full rounded-xl border p-4 text-left transition ${
              selectedIndex === index
                ? "border-green-400 bg-green-50 text-green-800"
                : "border-ink/10 hover:border-accent/40 hover:bg-accent-soft"
            }`}
          >
            {selectedIndex === index ? "✓ " : ""}
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}