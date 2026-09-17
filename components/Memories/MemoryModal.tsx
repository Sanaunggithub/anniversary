"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Memory } from "@/data/memories";

interface MemoryModalProps {
    memory: Memory | null;
    onClose: () => void;
}

export default function MemoryModal({ memory, onClose }: MemoryModalProps) {
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        setImageFailed(false);
    }, [memory]);

    useEffect(() => {
        if (!memory) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [memory, onClose]);

    const formattedDate = memory
        ? new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
          }).format(new Date(`${memory.date}T00:00:00Z`))
        : "";

    return (
        <AnimatePresence>
            {memory && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={memory.title}
                >
                    <motion.div
                        className="relative my-8 w-full max-w-2xl overflow-hidden rounded-3xl bg-background shadow-xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close memory"
                            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl text-white"
                        >
                            ×
                        </button>

                        <div className="relative aspect-[4/3] w-full bg-accent-soft">
                            {!imageFailed ? (
                                <Image
                                    src={memory.photo}
                                    alt={memory.title}
                                    fill
                                    sizes="(max-width: 672px) 100vw, 672px"
                                    className="object-cover"
                                    onError={() => setImageFailed(true)}
                                />
                            ) : (
                                <div
                                    className="absolute inset-0 bg-accent-soft"
                                    aria-label="Image unavailable"
                                />
                            )}
                        </div>

                        <div className="p-6 sm:p-8">
                            <time
                                dateTime={memory.date}
                                className="font-sans-ui text-sm text-muted"
                            >
                                {formattedDate}
                            </time>
                            <h2 className="mt-2 font-serif-display text-3xl text-ink">
                                {memory.title}
                            </h2>
                            <p className="mt-4 font-sans-ui leading-7 text-ink">
                                {memory.description}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}