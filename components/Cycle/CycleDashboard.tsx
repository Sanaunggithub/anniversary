"use client";

import { motion } from "framer-motion";
import {
  getCurrentCycleDay,
  getCurrentPhase,
  getDaysUntilNextPeriod,
  getFertileWindow,
} from "@/lib/cycleCalculations";
import type { CycleData } from "@/lib/cycleStorage";

interface CycleDashboardProps {
  data: CycleData;
  onEdit: () => void;
}

const phaseLabels = {
  period: "Period",
  follicular: "Follicular phase",
  fertile: "Fertile window",
  luteal: "Luteal phase",
};

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function CycleDashboard({
  data,
  onEdit,
}: CycleDashboardProps) {
  const cycleDay = getCurrentCycleDay(data);
  const phase = getCurrentPhase(data);
  const fertileWindow = getFertileWindow(data);
  const daysUntilPeriod = getDaysUntilNextPeriod(data);
  const progress = Math.min(100, (cycleDay / data.cycleLength) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="rounded-2xl bg-background p-6 text-center shadow-sm sm:p-8">
        <p className="font-serif-display text-3xl text-ink">
          Day {cycleDay} of your cycle
        </p>

        <span className="mt-4 inline-flex rounded-full bg-accent-soft px-4 py-2 text-sm text-ink">
          {phaseLabels[phase]}
        </span>

        <div className="mt-8 h-3 overflow-hidden rounded-full bg-accent/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-accent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-accent-soft p-5">
          <p className="text-sm text-muted">Next period</p>
          <p className="mt-2 font-serif-display text-2xl text-ink">
            {daysUntilPeriod === 0
              ? "Expected today"
              : `${daysUntilPeriod} days`}
          </p>
        </div>

        <div className="rounded-2xl bg-accent-soft p-5">
          <p className="text-sm text-muted">Fertile window</p>
          <p className="mt-2 font-serif-display text-2xl text-ink">
            {formatDate(fertileWindow.start)}–{formatDate(fertileWindow.end)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="mx-auto block text-sm text-muted underline underline-offset-4 transition hover:text-ink"
      >
        Edit my info
      </button>
    </div>
  );
}