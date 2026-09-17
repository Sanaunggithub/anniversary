"use client";

import { motion } from "framer-motion";
import { surpriseConfig } from "@/data/surprise";
import Image from "next/image";

const particles = ["✦", "♡", "·", "✧", "♥", "·", "✦", "♡"];

export default function FinalReveal() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0">
        {particles.map((particle, index) => (
          <motion.span
            key={`${particle}-${index}`}
            initial={{
              opacity: 0,
              y: 80,
              x: `${(index / particles.length) * 100}%`,
            }}
            animate={{ opacity: [0, 0.7, 0], y: -180 }}
            transition={{
              duration: 3,
              delay: index * 0.12,
              ease: "easeOut",
            }}
            className="absolute bottom-0 text-2xl text-accent"
          >
            {particle}
          </motion.span>
        ))}
      </div>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <h1 className="font-serif-display text-5xl text-ink sm:text-6xl">
          ❤️ You made it.
        </h1>

        <div className="mt-8 space-y-4 text-left font-sans-ui leading-7 text-ink/80">
          {surpriseConfig.finalMessage
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        <Image
          src={surpriseConfig.finalPhoto}
          alt=""
          width={1200}
          height={800}
          className="mx-auto mt-10 max-h-[50vh] w-full rounded-2xl object-cover shadow-lg"
        />
      </motion.article>
    </main>
  );
}