import type { CycleData } from "./cycleStorage";

function parseLocalDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfToday(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function getNextPeriodDate(data: CycleData): Date {
  const today = startOfToday();
  let nextDate = addDays(parseLocalDate(data.lastPeriodStart), data.cycleLength);

  while (nextDate < today) {
    nextDate = addDays(nextDate, data.cycleLength);
  }

  return nextDate;
}

export function getDaysUntilNextPeriod(data: CycleData): number {
  return Math.max(0, daysBetween(startOfToday(), getNextPeriodDate(data)));
}

export function getCurrentCycleDay(data: CycleData): number {
  const elapsedDays = daysBetween(parseLocalDate(data.lastPeriodStart), startOfToday());
  return ((elapsedDays % data.cycleLength) + data.cycleLength) % data.cycleLength + 1;
}