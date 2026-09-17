"use client";

import { useEffect, useState } from "react";
import type { CycleData } from "@/lib/cycleStorage";
import { getCycleData } from "@/lib/cycleStorage";
import CycleDashboard from "./CycleDashboard";
import CycleSetupForm from "./CycleSetupForm";

export default function Cycle() {
  const [data, setData] = useState<CycleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(getCycleData());
    setLoading(false);
  }, []);

  return (
    <section className="space-y-10">
      <header className="text-center">
        <h1 className="font-serif-display text-5xl text-ink">Cycle</h1>
        <p className="mt-2 font-sans-ui text-sm text-muted">
          Just for you — stored only on this device.
        </p>
      </header>

      {!loading &&
        (data ? (
          <CycleDashboard data={data} onSaved={setData} />
        ) : (
          <CycleSetupForm onSaved={setData} />
        ))}
    </section>
  );
}