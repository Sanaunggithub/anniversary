"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { CycleData } from "@/lib/cycleStorage";
import {
  getCurrentCycleDay,
  getDaysUntilNextPeriod,
  getNextPeriodDate,
} from "@/lib/cycleCalculations";
import CycleSetupForm from "./CycleSetupForm";

type Props = {
  data: CycleData;
  onSaved: (data: CycleData) => void;
};

export default function CycleDashboard({ data, onSaved }: Props) {
  const [editing, setEditing] = useState(false);
  const currentDay = getCurrentCycleDay(data);
  const daysUntil = getDaysUntilNextPeriod(data);
  const nextPeriod = getNextPeriodDate(data);
  const progress = Math.min(100, (currentDay / data.cycleLength) * 100);

  if (editing) {
    return (
      <CycleSetupForm
        initialData={data}
        onSaved={(savedData) => {
          setEditing(false);
          onSaved(savedData);
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-8 text-center">
      <div>
        <p className="font-serif-display text-4xl text-ink">
          Day {currentDay} of your cycle
        </p>

        <p className="mt-6 font-sans-ui text-sm text-muted">
          Your next period is predicted for
        </p>
        <p className="mt-1 font-serif-display text-2xl text-accent">
          {nextPeriod.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="mt-1 font-sans-ui text-sm text-muted">
          in {daysUntil} {daysUntil === 1 ? "day" : "days"}
        </p>
      </div>

      <div className="space-y-2 text-left">
        <div className="h-3 overflow-hidden rounded-full bg-accent-soft">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-accent"
          />
        </div>
        <p className="font-sans-ui text-xs text-muted">
          Day {currentDay} of {data.cycleLength}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setEditing(true)}
        className="font-sans-ui text-sm text-accent underline underline-offset-4"
      >
        Edit my info
      </button>
    </div>
  );
}