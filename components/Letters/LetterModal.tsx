"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { Letter } from "@/data/letters";

interface LetterModalProps {
  letter: Letter | null;
  onClose: () => void;
}

function LetterContent({ letter }: { letter: Letter }) {
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLetter(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!showLetter ? (
        <motion.div
          key="envelope"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-sm"
          style={{ perspective: 900 }}
        >
          <div className="relative aspect-[1.45] overflow-hidden rounded-xl bg-accent-soft shadow-2xl">
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -170 }}
              transition={{ delay: 0.15, duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 z-20 h-1/2 origin-top border-b border-accent/20 bg-accent-soft"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              {letter.emoji}
            </div>
            <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-accent/10 [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
            <div className="absolute bottom-0 right-0 h-1/2 w-1/2 bg-accent/10 [clip-path:polygon(0_0,100%_100%,0_100%)]" />
          </div>
        </motion.div>
      ) : (
        <motion.article
          key="letter"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl sm:p-10"
        >
          <h2 className="mb-6 font-serif-display text-3xl text-ink">
            {letter.title}
          </h2>
          <div className="space-y-4 font-sans-ui leading-7 text-ink/80">
            {letter.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {letter.photo && (
            <Image
              src={letter.photo}
              alt=""
              width={1200}
              height={800}
              className="mt-6 w-full rounded-xl object-cover"
            />
          )}
        </motion.article>
      )}
    </AnimatePresence>
  );
}

export default function LetterModal({ letter, onClose }: LetterModalProps) {
  return (
    <AnimatePresence>
      {letter && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-2xl text-ink shadow-md transition hover:bg-background"
            aria-label="Close letter"
          >
            ×
          </button>

          <div className="relative flex max-h-[90vh] w-full max-w-lg items-center justify-center">
            <LetterContent key={letter.id} letter={letter} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}