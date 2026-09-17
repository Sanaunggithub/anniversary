"use client";

import { FormEvent, useState } from "react";
import type { CycleData } from "@/lib/cycleStorage";
import { saveCycleData } from "@/lib/cycleStorage";

type Props = {
  initialData?: CycleData | null;
  onSaved: (data: CycleData) => void;
};

export default function CycleSetupForm({ initialData, onSaved }: Props) {
  const [lastPeriodStart, setLastPeriodStart] = useState(
    initialData?.lastPeriodStart ?? "",
  );
  const [cycleLength, setCycleLength] = useState(
    initialData?.cycleLength ?? 28,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      lastPeriodStart,
      cycleLength: Math.max(1, cycleLength),
    };

    saveCycleData(data);
    onSaved(data);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5">
      <label className="block space-y-2 font-sans-ui text-sm text-ink">
        <span>First day of your last period</span>
        <input
          required
          type="date"
          value={lastPeriodStart}
          onChange={(event) => setLastPeriodStart(event.target.value)}
          className="w-full rounded-xl border border-muted/30 bg-background px-4 py-3"
        />
      </label>

      <label className="block space-y-2 font-sans-ui text-sm text-ink">
        <span>Average cycle length (days)</span>
        <input
          required
          min={1}
          max={100}
          type="number"
          value={cycleLength}
          onChange={(event) => setCycleLength(Number(event.target.value))}
          className="w-full rounded-xl border border-muted/30 bg-background px-4 py-3"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-full bg-accent px-5 py-3 font-sans-ui text-sm text-white transition hover:opacity-90"
      >
        Save my cycle
      </button>

      <p className="text-center font-sans-ui text-xs text-muted">
        This is a personal estimate, not medical advice — cycles can vary.
      </p>
    </form>
  );
}