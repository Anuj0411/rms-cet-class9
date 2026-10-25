/** Morning of the written paper. The exact hall time can differ; the days stay true until then. */
export const EXAM_AT = new Date(2026, 11, 13, 9, 0, 0);
const PREP_START = new Date(2026, 9, 26, 0, 0, 0);

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  over: boolean;
};

export function timeLeft(now = new Date()): TimeLeft {
  const ms = EXAM_AT.getTime() - now.getTime();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    over: false,
  };
}

/** Share of the plan still unused. 1 on the first morning, 0 when the paper starts. */
export function timeRemainingShare(now = new Date()) {
  const span = EXAM_AT.getTime() - PREP_START.getTime();
  const left = EXAM_AT.getTime() - now.getTime();
  if (left <= 0) return 0;
  if (now.getTime() <= PREP_START.getTime()) return 1;
  return Math.min(1, left / span);
}

export function focusLine(left: TimeLeft) {
  if (left.over) return "The written paper is over.";
  if (left.days > 40) {
    return "The days look plenty. They leave one by one. Finish today's page before you get up.";
  }
  if (left.days > 21) {
    return "A week has already gone. The paper is still the same Sunday. Stay with the topic in front of you.";
  }
  if (left.days > 14) {
    return "The spare days are thinner now. Finish what is still new. Do not park it for later.";
  }
  if (left.days > 7) {
    return "This is revision time. Open the topic you miss. A new chapter can wait.";
  }
  if (left.days > 1) {
    return "Little time is left. One careful hour beats a long tired night. Then sleep.";
  }
  if (left.days === 1) {
    return "Tomorrow is the paper. Look once at the weak page, then close the book and rest.";
  }
  return "The paper is today. Read the line twice. Attempt every question. Stay with the one on the screen.";
}
