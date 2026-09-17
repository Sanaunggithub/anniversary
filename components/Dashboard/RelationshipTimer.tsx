"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/config";

const DAY_MS = 24 * 60 * 60 * 1000;

function daysInMonth(year: number, month: number) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

function addMonths(date: Date, months: number) {
    const monthIndex = date.getUTCMonth() + months;
    const year = date.getUTCFullYear() + Math.floor(monthIndex / 12);
    const month = ((monthIndex % 12) + 12) % 12;
    const day = Math.min(date.getUTCDate(), daysInMonth(year, month));

    return new Date(Date.UTC(year, month, day));
}

function calculateElapsed(start: Date, now: Date) {
    if (now < start) {
        return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let years = now.getUTCFullYear() - start.getUTCFullYear();
    let cursor = addMonths(start, years * 12);

    if (cursor > now) {
        years -= 1;
        cursor = addMonths(start, years * 12);
    }

    let months =
        (now.getUTCFullYear() - cursor.getUTCFullYear()) * 12 +
        now.getUTCMonth() -
        cursor.getUTCMonth();

    let monthCursor = addMonths(cursor, months);

    if (monthCursor > now) {
        months -= 1;
        monthCursor = addMonths(cursor, months);
    }

    const days = Math.floor((now.getTime() - monthCursor.getTime()) / DAY_MS);
    const dayCursor = new Date(monthCursor.getTime() + days * DAY_MS);
    const remainingSeconds = Math.floor((now.getTime() - dayCursor.getTime()) / 1000);

    return {
        years,
        months,
        days,
        hours: Math.floor(remainingSeconds / 3600),
        minutes: Math.floor((remainingSeconds % 3600) / 60),
        seconds: remainingSeconds % 60,
    };
}

function pad(value: number) {
    return value.toString().padStart(2, "0");
}

export default function RelationshipTimer() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());

        const interval = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => window.clearInterval(interval);
    }, []);

    const elapsed = now
        ? calculateElapsed(new Date(`${siteConfig.relationshipStartDate}T00:00:00Z`), now)
        : { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    const units = [
        ["years", elapsed.years],
        ["months", elapsed.months],
        ["days", elapsed.days],
    ] as const;

    return (
        <section className="text-center" aria-label="Relationship duration">
            <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
                {units.map(([label, value]) => (
                    <div key={label}>
                        <div className="font-serif-display text-4xl text-ink sm:text-5xl">
                            {value}
                        </div>
                        <div className="font-sans-ui text-sm capitalize text-muted">
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-4 font-sans-ui text-sm tabular-nums text-muted">
                {pad(elapsed.hours)}:{pad(elapsed.minutes)}:{pad(elapsed.seconds)} together
            </p>
        </section>
    );
}