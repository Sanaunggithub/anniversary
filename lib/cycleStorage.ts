export type CycleData = {
  lastPeriodStart: string;
  cycleLength: number;
};

const STORAGE_KEY = "cycle-data";

export function getCycleData(): CycleData | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as CycleData;

    if (
      typeof parsed.lastPeriodStart !== "string" ||
      !parsed.lastPeriodStart ||
      typeof parsed.cycleLength !== "number" ||
      !Number.isFinite(parsed.cycleLength) ||
      parsed.cycleLength <= 0
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveCycleData(data: CycleData): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function clearCycleData(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}