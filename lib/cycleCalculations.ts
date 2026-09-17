import type { CycleData } from "./cycleStorage";

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysBetween(start: Date, end: Date): number {
  return Math.floor(
    (startOfDay(end).getTime() - startOfDay(start).getTime()) / DAY_MS,
  );
}

export function getNextPeriodDate(data: CycleData): Date {
  const originalStart = parseDate(data.lastPeriodStart);
  const today = startOfDay(new Date());

  let nextPeriod = addDays(originalStart, data.cycleLength);

  while (nextPeriod < today) {
    nextPeriod = addDays(nextPeriod, data.cycleLength);
  }

  return nextPeriod;
}

export function getDaysUntilNextPeriod(data: CycleData): number {
  return Math.max(0, daysBetween(new Date(), getNextPeriodDate(data)));
}

export function getCurrentCycleDay(data: CycleData): number {
  const nextPeriod = getNextPeriodDate(data);
  const currentCycleStart = addDays(nextPeriod, -data.cycleLength);
  return Math.min(
    data.cycleLength,
    Math.max(1, daysBetween(currentCycleStart, new Date()) + 1),
  );
}

export function getFertileWindow(data: CycleData): {
  start: Date;
  end: Date;
} {
  const nextPeriod = getNextPeriodDate(data);
  const ovulation = addDays(nextPeriod, -14);

  return {
    start: addDays(ovulation, -5),
    end: addDays(ovulation, 1),
  };
}

export function getCurrentPhase(
  data: CycleData,
): "period" | "follicular" | "fertile" | "luteal" {
  const today = startOfDay(new Date());
  const cycleDay = getCurrentCycleDay(data);
  const fertileWindow = getFertileWindow(data);

  if (cycleDay <= data.periodLength) return "period";
  if (today >= fertileWindow.start && today <= fertileWindow.end) {
    return "fertile";
  }

  const currentCycleStart = addDays(
    getNextPeriodDate(data),
    -data.cycleLength,
  );

  return today < fertileWindow.start
    ? "follicular"
    : today >= currentCycleStart
      ? "luteal"
      : "follicular";
}