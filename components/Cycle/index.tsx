"use client";

import { useEffect, useState } from "react";
import CycleDashboard from "./CycleDashboard";
import CycleSetupForm from "./CycleSetupForm";
import { getCycleData, type CycleData } from "@/lib/cycleStorage";

export default function Cycle() {
  const [data, setData] = useState<CycleData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(getCycleData());
    setIsLoading(false);
  }, []);

  return (
    <section>
      <div className="mb-10 text-center">
        <h1 className="font-serif-display text-4xl text-ink sm:text-5xl">
          Cycle
        </h1>
        <p className="mt-3 text-muted">
          Just for you — stored only on this device.
        </p>
      </div>

      {isLoading ? (
        <div className="mx-auto h-64 max-w-md animate-pulse rounded-2xl bg-accent-soft" />
      ) : !data || isEditing ? (
        <CycleSetupForm
          onSaved={(savedData) => {
            setData(savedData);
            setIsEditing(false);
          }}
        />
      ) : (
        <CycleDashboard data={data} onEdit={() => setIsEditing(true)} />
      )}
    </section>
  );
}