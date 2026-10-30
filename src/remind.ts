import { formatDay, PLAN, type PlanEntry } from "./plan.ts";

export const ORIGIN = "https://anuj0411.github.io/rms-cet-class9/";

const SAME_DAY = new Set(["redo-wrongs", "weak-redo", "warmup-20"]);

export type AttemptStamp = { testId: string; submittedAt: number };

export function istDay(ms: number) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(ms);
}

export function istNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  return { day: istDay(date.getTime()), hour };
}

export function hasTopicNotes(testId: string | undefined) {
  return !!testId && /^(m|s|e|h|t)-/.test(testId);
}

export function planWatch(attempts: AttemptStamp[], today: string) {
  const required = PLAN.filter((entry) => entry.required && entry.kind === "test" && entry.testId);
  const remaining = required.filter((entry) => !isDone(entry, attempts, today));
  const dates = [...new Set(
    PLAN.filter((entry) => entry.kind === "test" && entry.date < today).map((entry) => entry.date),
  )];
  const sat = new Set(attempts.map((attempt) => istDay(attempt.submittedAt)));
  return {
    remaining,
    late: remaining.filter((entry) => entry.date < today),
    missingDays: dates.filter((day) => !sat.has(day)).sort(),
  };
}

export function isDone(entry: PlanEntry, attempts: AttemptStamp[], day: string) {
  if (entry.kind !== "test" || !entry.testId) return false;
  const hits = attempts.filter((attempt) => attempt.testId === entry.testId);
  if (SAME_DAY.has(entry.testId)) return hits.some((attempt) => istDay(attempt.submittedAt) === day);
  return hits.length > 0;
}

export function studyLinks(entry: PlanEntry, done: boolean) {
  const notes = hasTopicNotes(entry.testId)
    ? { href: `#/notes/${entry.testId}`, label: "Notes" }
    : entry.kind === "formula"
      ? { href: "#/formulas", label: "Sheet" }
      : entry.kind === "note"
        ? undefined
        : { href: "#/notes", label: "Notes" };
  const test = entry.kind === "test" && entry.testId
    ? { href: `#/test/${entry.testId}`, label: done ? "Redo" : "Start test" }
    : undefined;
  return { notes, test };
}

export function dayItems(day: string) {
  return PLAN.filter((entry) => entry.date === day);
}

export type Notice = { title: string; body: string; url: string };

function openTests(day: string, attempts: AttemptStamp[]) {
  return dayItems(day).filter((entry) => entry.kind === "test" && !isDone(entry, attempts, day));
}

function titles(entries: PlanEntry[]) {
  const shown = entries.slice(0, 3).map((entry) => entry.title).join(", ");
  return entries.length > 3 ? `${shown}, and ${entries.length - 3} more` : shown;
}

export function reminderNotice(day: string, attempts: AttemptStamp[]): Notice | null {
  const open = openTests(day, attempts);
  if (!open.length) return null;
  return {
    title: `Today's target, ${formatDay(day)}`,
    body: `${titles(open)}. Read the notes, then start the test.`,
    url: `${ORIGIN}#/`,
  };
}

export function missedNotice(day: string, attempts: AttemptStamp[]): Notice | null {
  const open = openTests(day, attempts);
  if (!open.length) return null;
  return {
    title: `Missed tests, ${formatDay(day)}`,
    body: `${titles(open)}. Open the report to see what is left.`,
    url: `${ORIGIN}#/`,
  };
}
