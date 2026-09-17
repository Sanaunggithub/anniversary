export type CycleData = {
  lastPeriodStart: string;
  cycleLength: number;
  periodLength: number;
};

const STORAGE_KEY = "cycle-data";

export function getCycleData(): CycleData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw) as Partial<CycleData>;

    if (
      typeof data.lastPeriodStart !== "string" ||
      Number.isNaN(new Date(`${data.lastPeriodStart}T00:00:00`).getTime()) ||
      typeof data.cycleLength !== "number" ||
      !Number.isFinite(data.cycleLength) ||
      data.cycleLength <= 0 ||
      typeof data.periodLength !== "number" ||
      !Number.isFinite(data.periodLength) ||
      data.periodLength <= 0
    ) {
      return null;
    }

    return {
      lastPeriodStart: data.lastPeriodStart,
      cycleLength: data.cycleLength,
      periodLength: data.periodLength,
    };
  } catch {
    return null;
  }
}

export function saveCycleData(data: CycleData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearCycleData(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}