"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { surpriseConfig } from "@/data/surprise";

interface Step3InteractionProps {
  onComplete: () => void;
}

export default function Step3Interaction({
  onComplete,
}: Step3InteractionProps) {
  const [count, setCount] = useState(0);

  function tapHeart() {
    if (count >= 3) return;

    const nextCount = count + 1;
    setCount(nextCount);

    if (nextCount === 3) {
      window.setTimeout(onComplete, 650);
    }
  }

  const progress = `${(count / 3) * 100}%`;

  return (
    <div className="text-center">
      <p className="mb-10 font-serif-display text-2xl text-ink">
        {surpriseConfig.step3Prompt}
      </p>

      <div
        className="mx-auto flex h-40 w-40 items-center justify-center rounded-full p-2"
        style={{
          background: `conic-gradient(var(--color-accent) ${progress}, color-mix(in srgb, var(--color-accent) 15%, transparent) 0)`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
          <motion.button
            type="button"
            onClick={tapHeart}
            whileTap={{ scale: 1.2 }}
            animate={{ scale: 1 + count * 0.06 }}
            className="text-6xl"
            aria-label={`Tap heart, ${count} of 3 taps`}
          >
            ❤️
          </motion.button>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">{count} / 3</p>
    </div>
  );
}