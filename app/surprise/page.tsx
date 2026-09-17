"use client";

import { useState } from "react";
import Surprise from "@/components/Surprise";
import BackLink from "@/components/BackLink";

export default function SurprisePage() {
  const [isFinal, setIsFinal] = useState(false);

  return (
    <main
      className={
        isFinal
          ? "min-h-screen bg-background"
          : "min-h-screen bg-background px-5 py-8 sm:px-8"
      }
    >
      {!isFinal && (
        <div className="mx-auto max-w-5xl">
          <BackLink />
          <Surprise onFinalChange={setIsFinal} />
        </div>
      )}

      {isFinal && <Surprise />}
    </main>
  );
}