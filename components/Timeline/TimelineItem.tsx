"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { TimelineEvent } from "@/data/timeline";

interface TimelineItemProps {
    event: TimelineEvent;
    align: "left" | "right";
}

export default function TimelineItem({ event, align }: TimelineItemProps) {
    const [imageFailed, setImageFailed] = useState(false);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${event.date}T00:00:00Z`));

    return (
        <motion.article
            initial={{ opacity: 0, x: align === "left" ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={[
                "relative pl-8 md:pl-0",
                align === "left"
                    ? "md:col-start-1 md:pr-12"
                    : "md:col-start-2 md:pl-12",
            ].join(" ")}
        >
            <span className="absolute left-0 top-8 z-10 h-3 w-3 rounded-full bg-accent ring-4 ring-background md:left-1/2 md:-translate-x-1/2" />

            <div className="rounded-2xl bg-background p-4 shadow-sm sm:p-5">
                <time
                    dateTime={event.date}
                    className="font-sans-ui text-sm text-muted"
                >
                    {formattedDate}
                </time>

                <h2 className="mt-1 font-serif-display text-2xl text-ink">
                    {event.title}
                </h2>

                {event.photo && (
                    <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl bg-accent-soft">
                        {!imageFailed ? (
                            <Image
                                src={event.photo}
                                alt={event.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                onError={() => setImageFailed(true)}
                            />
                        ) : (
                            <div
                                className="h-full w-full bg-accent-soft"
                                aria-label="Image unavailable"
                            />
                        )}
                    </div>
                )}

                <p className="mt-4 font-sans-ui leading-7 text-ink">
                    {event.description}
                </p>

                {(event.location || event.song) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {event.location && (
                            <span className="rounded-full bg-accent-soft px-3 py-1 font-sans-ui text-xs text-muted">
                                📍 {event.location}
                            </span>
                        )}
                        {event.song && (
                            <span className="rounded-full bg-accent-soft px-3 py-1 font-sans-ui text-xs text-muted">
                                🎵 {event.song}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.article>
    );
}