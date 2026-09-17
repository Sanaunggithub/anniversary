"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Memory } from "@/data/memories";

interface MemoryCardProps {
    memory: Memory;
    onOpen: (memory: Memory) => void;
}

export default function MemoryCard({ memory, onOpen }: MemoryCardProps) {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpen(memory)}
            className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-accent-soft text-left shadow-sm"
        >
            {!imageFailed ? (
                <Image
                    src={memory.photo}
                    alt={memory.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => setImageFailed(true)}
                />
            ) : (
                <div className="absolute inset-0 bg-accent-soft" aria-hidden="true" />
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                <span className="font-serif-display text-lg text-white">
                    {memory.title}
                </span>
            </div>
        </motion.button>
    );
}