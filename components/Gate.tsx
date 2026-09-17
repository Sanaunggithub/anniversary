"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type GateProps = {
    onEnter: () => void;
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay },
    }),
};

export default function Gate({ onEnter }: GateProps) {
    const [isExiting, setIsExiting] = useState(false);

    return (
        <motion.main
            className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6"
            initial={{ opacity: 1, scale: 1 }}
            animate={
                isExiting
                    ? { opacity: 0, scale: 0.97 }
                    : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
                if (isExiting) onEnter();
            }}
        >
            <div className="text-center">
                <motion.h1
                    className="font-serif-display text-6xl text-ink"
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    US <span className="text-accent">❤</span>
                </motion.h1>

                <motion.p
                    className="mt-3 font-sans-ui italic text-muted"
                    custom={0.15}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    A little place for us.
                </motion.p>

                <motion.button
                    type="button"
                    className="mt-8 rounded-full bg-accent px-6 py-3 font-sans-ui text-background transition-opacity hover:opacity-90"
                    custom={0.3}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => setIsExiting(true)}
                    disabled={isExiting}
                >
                    Enter our world →
                </motion.button>
            </div>
        </motion.main>
    );
}