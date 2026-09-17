"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { memories } from "@/data/memories";
import { surpriseConfig } from "@/data/surprise";
import Image from "next/image";

interface Step2FindMemoryProps {
  onComplete: () => void;
}

export default function Step2FindMemory({
  onComplete,
}: Step2FindMemoryProps) {
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [correctId, setCorrectId] = useState<string | null>(null);

  const choices = useMemo(() => {
    const correct = memories.find(
      (memory) => memory.id === surpriseConfig.step2CorrectMemoryId,
    );

    const others = memories
      .filter((memory) => memory.id !== surpriseConfig.step2CorrectMemoryId)
      .slice(0, 5);

    return correct ? [correct, ...others] : others;
  }, []);

  function choose(id: string) {
    if (correctId) return;

    if (id === surpriseConfig.step2CorrectMemoryId) {
      setCorrectId(id);
      window.setTimeout(onComplete, 800);
    } else {
      setWrongId(id);
      window.setTimeout(() => setWrongId(null), 450);
    }
  }

  return (
    <div>
      <p className="mb-8 text-center font-serif-display text-2xl text-ink">
        {surpriseConfig.step2Prompt}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {choices.map((memory) => (
          <motion.button
            key={memory.id}
            type="button"
            onClick={() => choose(memory.id)}
            animate={
              wrongId === memory.id
                ? { x: [0, -5, 5, -3, 3, 0] }
                : { x: 0 }
            }
            className={`overflow-hidden rounded-xl border text-left ${
              correctId === memory.id
                ? "border-green-400 bg-green-50"
                : "border-ink/10"
            }`}
          >
            <Image
              src={memory.photo}
              alt={memory.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
            <span className="block p-2 text-sm text-ink">
              {correctId === memory.id && "✓ "}
              {memory.title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}