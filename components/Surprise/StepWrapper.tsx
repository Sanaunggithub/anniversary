"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface StepWrapperProps {
  step: number;
  children: ReactNode;
}

export default function StepWrapper({ step, children }: StepWrapperProps) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-6 flex justify-center gap-2" aria-label={`Step ${step} of 3`}>
        {[1, 2, 3].map((item) => (
          <span
            key={item}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              item <= step ? "bg-accent" : "bg-accent/20"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl bg-background p-6 shadow-sm sm:p-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}