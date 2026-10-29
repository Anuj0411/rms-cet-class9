import type { Attempt, Question, Subject, TestView, Topic } from "./types.ts";
import { PLAN } from "./plan.ts";
import { mocks, sectionals, topics } from "./content/index.ts";

export const SUBJECT_LABEL: Record<Subject, string> = {
  maths: "Mathematics",
  science: "Science",
  english: "English",
  hindi: "Hindi",
  sst: "Social Science",
};

export function paperOf(subject: Subject) {
  return subject === "maths" || subject === "science" ? 2 : 1;
}

export function allTopics() {
  return topics;
}

export function topicById(id: string) {
  return topics.find((topic) => topic.id === id);
}

const questionIndex = new Map<string, Question>();
for (const topic of topics) {
  for (const question of topic.questions) questionIndex.set(question.id, question);
}
for (const paper of [...mocks, ...sectionals]) {
  for (const question of paper.questions) questionIndex.set(question.id, question);
}

export function findQuestion(id: string) {
  return questionIndex.get(id);
}

function view(
  id: string,
  title: string,
  kind: TestView["kind"],
  minutes: number,
  strict: boolean,
  concept: string,
  questions: Question[],
  ncert?: string,
  adaptive = false,
  ask?: number,
): TestView {
  return { id, title, kind, minutes, strict, concept, questions, ncert, adaptive, ask };
}

function halfPaper(id: string, title: string, start: string, end: string): TestView {
  const ids = [
    ...new Set(
      PLAN.filter(
        (entry) =>
          entry.date >= start &&
          entry.date <= end &&
          entry.kind === "test" &&
          entry.testId &&
          !entry.testId.startsWith("half"),
      ).map((entry) => entry.testId as string),
    ),
  ];
  const questions: Question[] = [];
  for (const topicId of ids) {
    const topic = topicById(topicId);
    if (!topic) continue;
    questions.push(...topic.questions.slice(0, 2));
  }
  return view(
    id,
    title,
    "half",
    40,
    true,
    "This is a mixed revision of the week. The clock is 40 minutes. There is no negative marking, so attempt every question. Explanations open after you submit.",
    questions.slice(0, 40),
  );
}

function missedQuestions(attempts: Attempt[]) {
  const seen = new Set<string>();
  const ordered: string[] = [];
  const recent = [...attempts].sort((a, b) => b.submittedAt - a.submittedAt);
  for (const attempt of recent) {
    for (const answer of attempt.answers) {
      if (answer.correct || seen.has(answer.questionId)) continue;
      seen.add(answer.questionId);
      ordered.push(answer.questionId);
    }
  }
  return ordered
    .map((id) => findQuestion(id))
    .filter((question): question is Question => Boolean(question));
}

export function resolveTest(id: string, attempts: Attempt[]): TestView | null {
  const topic = topicById(id);
  if (topic) {
    const ask = Math.min(topic.testSize, topic.questions.length);
    const adaptive = ask >= 3 && topic.questions.length >= 3;
    return view(
      topic.id,
      topic.title,
      "topic",
      topic.minutes,
      false,
      topic.concept,
      adaptive ? topic.questions : topic.questions.slice(0, ask),
      topic.ncert,
      adaptive,
      ask,
    );
  }
  const mock = mocks.find((paper) => paper.id === id);
  if (mock) return { ...mock, kind: "mock", strict: true };
  const sectional = sectionals.find((paper) => paper.id === id);
  if (sectional) return { ...sectional, kind: "sectional", strict: true };
  if (id === "half-1") return halfPaper(id, "Week 1 half paper", "2026-10-26", "2026-11-01");
  if (id === "half-2") return halfPaper(id, "Week 2 half paper", "2026-11-02", "2026-11-08");
  if (id === "half-3") return halfPaper(id, "Week 3 half paper", "2026-11-09", "2026-11-15");
  if (id === "half-4") return halfPaper(id, "Week 4 half paper", "2026-11-16", "2026-11-22");
  if (id === "warmup-20") {
    const questions: Question[] = [];
    for (const subject of ["maths", "science", "english", "hindi", "sst"] as Subject[]) {
      const pool = topics
        .filter((item) => item.subject === subject)
        .flatMap((item) => item.questions.slice(item.testSize, item.testSize + 1));
      questions.push(...pool.slice(0, 4));
    }
    return view(
      id,
      "Short mixed warm-up",
      "redo",
      20,
      false,
      "Twenty fresh questions, four from each subject. Stop when you finish. This is not a full paper.",
      questions.slice(0, 20),
    );
  }
  if (id === "redo-wrongs") {
    const questions = missedQuestions(attempts).slice(0, 20);
    return view(
      id,
      "Questions you missed",
      "redo",
      25,
      false,
      questions.length
        ? "These are questions you have already got wrong. Read the working after you submit, even if you get them right this time."
        : "You have no missed questions yet. Take today's topic test first.",
      questions,
    );
  }
  if (id === "weak-redo") {
    const stats = topicAccuracy(attempts).filter((row) => row.seen >= 4 && row.rate < 0.7);
    const questions: Question[] = [];
    for (const row of stats) {
      const topicQuestions = missedQuestions(attempts).filter((question) => question.topicId === row.topicId);
      questions.push(...topicQuestions.slice(0, 3));
    }
    return view(
      id,
      "Weak topics",
      "redo",
      20,
      false,
      questions.length
        ? "Only topics where you are still under 70%. A topic needs at least four answered questions before it counts."
        : "Nothing is under 70% yet, or you have not answered four questions in a topic. Finish a few topic tests, then come back.",
      questions.slice(0, 15),
    );
  }
  return null;
}

export function topicAccuracy(attempts: Attempt[]) {
  const rows = new Map<string, { seen: number; correct: number; seconds: number }>();
  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const row = rows.get(answer.topicId) ?? { seen: 0, correct: 0, seconds: 0 };
      if (answer.chosen !== null) row.seen += 1;
      if (answer.correct) row.correct += 1;
      row.seconds += answer.seconds;
      rows.set(answer.topicId, row);
    }
  }
  return [...rows.entries()].map(([topicId, row]) => ({
    topicId,
    title: topicById(topicId)?.title ?? topicId,
    subject: topicById(topicId)?.subject,
    seen: row.seen,
    correct: row.correct,
    seconds: row.seconds,
    rate: row.seen ? row.correct / row.seen : 0,
  }));
}

export function splitScore(questions: Question[], chosen: (number | null)[]) {
  let paper1Score = 0;
  let paper1Total = 0;
  let paper2Score = 0;
  let paper2Total = 0;
  let score = 0;
  questions.forEach((question, index) => {
    const right = chosen[index] === question.answer;
    if (right) score += 1;
    if (paperOf(question.subject) === 1) {
      paper1Total += 1;
      if (right) paper1Score += 1;
    } else {
      paper2Total += 1;
      if (right) paper2Score += 1;
    }
  });
  return { score, total: questions.length, paper1Score, paper1Total, paper2Score, paper2Total };
}

export type { Topic };
