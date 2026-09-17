"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavCardProps {
    emoji: string;
    title: string;
    href: string;
}

export default function NavCard({ emoji, title, href }: NavCardProps) {
    return (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
                href={href}
                className="flex min-h-28 flex-col items-center justify-center rounded-2xl bg-background p-5 text-center shadow-sm transition-colors hover:bg-accent-soft"
            >
                <span className="text-3xl" aria-hidden="true">
                    {emoji}
                </span>
                <span className="mt-2 font-sans-ui text-sm font-medium text-ink">
                    {title}
                </span>
            </Link>
        </motion.div>
    );
}