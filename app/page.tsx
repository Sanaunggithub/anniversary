"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Gate from "@/components/Gate";

export default function Home() {
    const [entered, setEntered] = useState(false);

    return (
        <AnimatePresence mode="wait">
            {!entered ? (
                <Gate key="gate" onEnter={() => setEntered(true)} />
            ) : (
                <div key="dashboard">Dashboard goes here</div>
            )}
        </AnimatePresence>
    );
}