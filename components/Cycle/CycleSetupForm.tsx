"use client";

import { FormEvent, useState } from "react";
import { saveCycleData, type CycleData } from "@/lib/cycleStorage";

interface CycleSetupFormProps {
  onSaved: (data: CycleData) => void;
}

export default function CycleSetupForm({ onSaved }: CycleSetupFormProps) {
  const [lastPeriodStart, setLastPeriodStart] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data: CycleData = {
      lastPeriodStart,
      cycleLength: Number(cycleLength),
      periodLength: Number(periodLength),
    };

    saveCycleData(data);
    onSaved(data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-5 rounded-2xl bg-background p-6 shadow-sm sm:p-8"
    >
      <div>
        <label className="font-sans-ui text-sm text-ink">
          First day of your last period
          <input
            required
            type="date"
            value={lastPeriodStart}
            onChange={(event) => setLastPeriodStart(event.target.value)}
            className="mt-2 w-full rounded-xl border border-ink/10 bg-background px-4 py-3 text-ink outline-none focus:border-accent"
          />
        </label>
      </div>

      <div>
        <label className="font-sans-ui text-sm text-ink">
          Average cycle length (days)
          <input
            required
            min="1"
            type="number"
            value={cycleLength}
            onChange={(event) => setCycleLength(event.target.value)}
            className="mt-2 w-full rounded-xl border border-ink/10 bg-background px-4 py-3 text-ink outline-none focus:border-accent"
          />
        </label>
      </div>

      <div>
        <label className="font-sans-ui text-sm text-ink">
          Average period length (days)
          <input
            required
            min="1"
            type="number"
            value={periodLength}
            onChange={(event) => setPeriodLength(event.target.value)}
            className="mt-2 w-full rounded-xl border border-ink/10 bg-background px-4 py-3 text-ink outline-none focus:border-accent"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-accent px-5 py-3 font-sans-ui font-medium text-white transition hover:bg-accent/90"
      >
        Save my cycle
      </button>

      <p className="text-center text-xs leading-5 text-muted">
        This is a personal estimate, not medical advice — every body is
        different.
      </p>
    </form>
  );
}