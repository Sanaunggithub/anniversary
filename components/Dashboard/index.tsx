"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { rotatingMessages, siteConfig } from "@/data/config";
import RelationshipTimer from "./RelationshipTimer";
import NavCard from "./NavCard";

const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

const navVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export default function Dashboard() {
    const [message, setMessage] = useState(rotatingMessages[0]);

    useEffect(() => {
        if (rotatingMessages.length < 2) return;

        const alternatives = rotatingMessages.filter((item) => item !== rotatingMessages[0]);
        setMessage(alternatives[Math.floor(Math.random() * alternatives.length)]);
    }, []);

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.16 }}
            className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-5 py-8 sm:px-8 sm:py-12"
        >
            <motion.section variants={sectionVariants} className="text-center">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-3xl">
                    <Image
                        src={siteConfig.heroPhoto}
                        alt={siteConfig.partnerName}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                    />
                </div>

                <h1 className="mt-6 font-serif-display text-4xl text-ink sm:text-6xl">
                    {siteConfig.partnerName}
                </h1>

                <p className="mx-auto mt-3 max-w-2xl font-sans-ui text-base text-muted sm:text-lg">
                    {siteConfig.heroMessage}
                </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
                <RelationshipTimer />
            </motion.section>

            <motion.section variants={sectionVariants} className="text-center">
                <p className="font-serif-display text-xl text-accent sm:text-2xl">
                    {message}
                </p>
            </motion.section>

            <motion.section variants={navVariants}>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <NavCard emoji="📸" title="Memories" href="/memories" />
                    <NavCard emoji="📖" title="Our Story" href="/story" />
                    <NavCard emoji="💌" title="Open When..." href="/letters" />
                    <NavCard emoji="🍜" title="Our List" href="/list" />
                    <NavCard emoji="🔐" title="Anniversary Surprise" href="/surprise" />
                </div>
            </motion.section>
        </motion.main>
    );
}