"use client";

import { useState } from "react";
import { memories, type Memory } from "@/data/memories";
import MemoryCard from "./MemoryCard";
import MemoryModal from "./MemoryModal";

export default function Memories() {
    const [openMemory, setOpenMemory] = useState<Memory | null>(null);

    const openRandomMemory = () => {
        const memory = memories[Math.floor(Math.random() * memories.length)];
        setOpenMemory(memory);
    };

    return (
        <main className="mx-auto w-full max-w-6xl">
            <header className="text-center">
                <h1 className="font-serif-display text-5xl text-ink sm:text-6xl">
                    Memories
                </h1>
                <p className="mt-3 font-sans-ui text-muted">
                    Little moments, kept safe
                </p>

                <button
                    type="button"
                    onClick={openRandomMemory}
                    className="mt-6 rounded-full bg-accent px-5 py-3 font-sans-ui text-sm text-white transition-transform hover:scale-105 active:scale-95"
                >
                    🎲 Random Memory
                </button>
            </header>

            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {memories.map((memory) => (
                    <MemoryCard
                        key={memory.id}
                        memory={memory}
                        onOpen={setOpenMemory}
                    />
                ))}
            </div>

            <MemoryModal
                memory={openMemory}
                onClose={() => setOpenMemory(null)}
            />
        </main>
    );
}