"use client";

import { useState } from "react";
import FinalReveal from "./FinalReveal";
import Step1Question from "./Step1Question";
import Step2FindMemory from "./Step2FindMemory";
import Step3Interaction from "./Step3Interaction";
import StepWrapper from "./StepWrapper";

interface SurpriseProps {
  onFinalChange?: (isFinal: boolean) => void;
}

export default function Surprise({ onFinalChange }: SurpriseProps) {
  const [step, setStep] = useState<1 | 2 | 3 | "final">(1);

  function completeStep() {
    setStep((current) => {
      const next = current === 1 ? 2 : current === 2 ? 3 : "final";
      onFinalChange?.(next === "final");
      return next;
    });
  }

  if (step === "final") {
    return <FinalReveal />;
  }

  return (
    <section>
      <h1 className="mb-8 text-center font-serif-display text-4xl text-ink sm:text-5xl">
        Anniversary Surprise 🔐
      </h1>

      <StepWrapper step={step}>
        {step === 1 && <Step1Question onComplete={completeStep} />}
        {step === 2 && <Step2FindMemory onComplete={completeStep} />}
        {step === 3 && (
          <Step3Interaction onComplete={completeStep} />
        )}
      </StepWrapper>
    </section>
  );
}