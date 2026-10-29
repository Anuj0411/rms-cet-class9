import type { LiveTest, Question, TestView } from "./types.ts";

export type Level = "easy" | "moderate" | "tough";

const LADDER: Level[] = ["easy", "moderate", "tough"];

export function askCount(test: Pick<TestView, "adaptive" | "ask" | "questions">) {
  if (!test.adaptive) return test.questions.length;
  return Math.max(1, Math.min(test.ask ?? test.questions.length, test.questions.length));
}

export function levelOf(index: number, total: number): Level {
  if (total <= 2) return "moderate";
  const easyEnd = Math.floor(total / 3);
  const moderateEnd = Math.floor((2 * total) / 3);
  if (index < easyEnd) return "easy";
  if (index < moderateEnd) return "moderate";
  return "tough";
}

export function bandFloor(subject: string | undefined): Level {
  return subject === "maths" ? "moderate" : "easy";
}

export function startLevel(subject: string | undefined): Level {
  return subject === "english" ? "easy" : "moderate";
}

export function climbAfter(subject: string | undefined) {
  return subject === "english" ? 2 : 1;
}

export function nextLevel(
  level: Level,
  correct: boolean | null,
  floor: Level = "easy",
  streakNeeded = 1,
  streak = 1,
): Level {
  const floorAt = LADDER.indexOf(floor);
  const at = Math.max(LADDER.indexOf(level), floorAt);
  if (correct === null) return LADDER[at];
  if (!correct) return LADDER[Math.max(floorAt, at - 1)];
  if (streak < streakNeeded || streak % streakNeeded !== 0) return LADDER[at];
  return LADDER[Math.min(LADDER.length - 1, at + 1)];
}

export function pickIndex(total: number, used: Set<number>, level: Level, floor: Level = "easy") {
  const floorAt = LADDER.indexOf(floor);
  const start = Math.max(LADDER.indexOf(level), floorAt);
  const search = [start];
  for (let step = 1; step < LADDER.length; step += 1) {
    if (start + step < LADDER.length) search.push(start + step);
    if (start - step >= floorAt) search.push(start - step);
  }
  for (const at of search) {
    const open: number[] = [];
    for (let index = 0; index < total; index += 1) {
      if (!used.has(index) && levelOf(index, total) === LADDER[at]) open.push(index);
    }
    if (open.length) return open[Math.floor(Math.random() * open.length)];
  }
  for (let index = 0; index < total; index += 1) {
    if (!used.has(index) && LADDER.indexOf(levelOf(index, total)) >= floorAt) return index;
  }
  for (let index = 0; index < total; index += 1) if (!used.has(index)) return index;
  return 0;
}

export function coachLine(question: { subject: string; stem: string; options: string[]; answer: number; explanation: string }) {
  if (question.subject !== "english") return "";
  const text = question.explanation.replace(/\s+/g, " ").trim();
  const at = text.toLowerCase().indexOf(" because ");
  if (at < 0) return "";
  let clause = text.slice(at + " because ".length);
  const stop = clause.search(/\.\s+["“]/);
  if (stop >= 0) clause = clause.slice(0, stop);
  else {
    const dot = clause.indexOf(".");
    if (dot >= 0) clause = clause.slice(0, dot);
  }
  const correct = question.options[question.answer] ?? "";
  if (correct.length >= 3 && clause.toLowerCase().includes(correct.toLowerCase())) return "";
  const asksMeaning = /what does|most nearly mean|idiom/i.test(question.stem);
  if (asksMeaning && /\bmeans\b/i.test(clause)) return "";
  const ranked = [...question.options].sort((left, right) => right.length - left.length);
  for (const option of ranked) {
    if (option && clause.includes(option)) clause = clause.split(option).join("the right form");
  }
  clause = clause.replace(/["“”]/g, "").replace(/\s+/g, " ").trim();
  if (clause.length < 24 || clause.length > 260) return "";
  const tidy = clause.charAt(0).toUpperCase() + clause.slice(1);
  return tidy.endsWith(".") ? tidy : `${tidy}.`;
}

export function levelForQuestion(questionId: string, questions: { id: string }[]) {
  const index = questions.findIndex((item) => item.id === questionId);
  if (index < 0) return null;
  return levelOf(index, questions.length);
}

export function sameLive(left: LiveTest | null, right: LiveTest) {
  if (!left) return false;
  return left.testId === right.testId
    && left.started === right.started
    && left.startedAt === right.startedAt
    && left.index === right.index
    && left.tickAt === right.tickAt
    && JSON.stringify(left.order ?? null) === JSON.stringify(right.order ?? null)
    && JSON.stringify(left.chosen) === JSON.stringify(right.chosen)
    && JSON.stringify(left.flags) === JSON.stringify(right.flags)
    && JSON.stringify(left.seconds) === JSON.stringify(right.seconds);
}

export function liveFits(saved: LiveTest, test: TestView) {
  const ask = askCount(test);
  if (test.adaptive) {
    if (!saved.order?.length || saved.order.length > ask) return false;
    if (saved.chosen.length !== saved.order.length) return false;
    if (saved.index < 0 || saved.index >= saved.order.length) return false;
    const seen = new Set<number>();
    return saved.order.every((index) => {
      if (index < 0 || index >= test.questions.length || seen.has(index)) return false;
      seen.add(index);
      return true;
    });
  }
  return !saved.order && saved.chosen.length === ask;
}

export function freshLive(test: TestView): LiveTest {
  if (test.adaptive) {
    const subject = test.questions[0]?.subject;
    const floor = bandFloor(subject);
    return {
      testId: test.id,
      started: false,
      startedAt: 0,
      index: 0,
      order: [pickIndex(test.questions.length, new Set(), startLevel(subject), floor)],
      chosen: [null],
      flags: [false],
      seconds: [0],
      tickAt: Date.now(),
    };
  }
  const count = test.questions.length;
  return {
    testId: test.id,
    started: false,
    startedAt: 0,
    index: 0,
    chosen: Array.from({ length: count }, () => null),
    flags: Array.from({ length: count }, () => false),
    seconds: Array.from({ length: count }, () => 0),
    tickAt: Date.now(),
  };
}

export function extendLive(current: LiveTest, pool: Question[], ask: number): LiveTest | null {
  if (!current.order || current.index !== current.order.length - 1 || current.order.length >= ask) return null;
  const at = current.order[current.index];
  const question = pool[at];
  const choice = current.chosen[current.index];
  const correct = choice === null || !question ? null : choice === question.answer;
  const subject = question?.subject;
  const floor = bandFloor(subject);
  let streak = 0;
  if (correct === true && current.order) {
    for (let index = current.index; index >= 0; index -= 1) {
      const earlier = pool[current.order[index]];
      if (!earlier || current.chosen[index] !== earlier.answer) break;
      streak += 1;
    }
  }
  const level = nextLevel(levelOf(at, pool.length), correct, floor, climbAfter(subject), streak);
  const next = pickIndex(pool.length, new Set(current.order), level, floor);
  return {
    ...current,
    index: current.index + 1,
    order: [...current.order, next],
    chosen: [...current.chosen, null],
    flags: [...current.flags, false],
    seconds: [...current.seconds, 0],
  };
}
