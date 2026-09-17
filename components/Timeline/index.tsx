"use client";

import { timelineEvents } from "@/data/timeline";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
    return (
        <main className="mx-auto w-full max-w-5xl">
            <header className="mb-12 text-center">
                <h1 className="font-serif-display text-5xl text-ink sm:text-6xl">
                    Our Story
                </h1>
                <p className="mt-3 font-sans-ui text-muted">
                    Every moment that brought us here
                </p>
            </header>

            <div className="relative">
                <div className="absolute bottom-0 left-[5px] top-0 w-px bg-accent md:left-1/2 md:-translate-x-1/2" />

                <div className="grid gap-8 md:grid-cols-2 md:gap-y-12">
                    {timelineEvents.map((event, index) => (
                        <TimelineItem
                            key={event.id}
                            event={event}
                            align={index % 2 === 0 ? "left" : "right"}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}