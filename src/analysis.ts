import { levelForQuestion } from "./adapt.ts";
import { findQuestion, topicById } from "./catalog.ts";
import { TOPIC_NOTES } from "./notes/index.ts";
import type { NoteBit } from "./notes/types.ts";
import { istDay } from "./remind.ts";
import type { AnswerRecord, Attempt, Question, Subject } from "./types.ts";

const ORDER: Subject[] = ["maths", "science", "english", "hindi", "sst"];

const STOP = new Set([
  "the", "and", "for", "with", "that", "this", "from", "are", "was", "were", "not", "but", "its", "his", "her",
  "you", "your", "when", "what", "which", "into", "over", "than", "then", "also", "because", "correct", "choice",
  "wrong", "means", "such", "other", "only", "have", "has", "had", "been", "being", "will", "would",
]);

export type RevisionCard = {
  questionId: string;
  topicId: string;
  topicTitle: string;
  subject: Subject;
  index: number;
  stem: string;
  chosenLabel: string;
  correctLabel: string;
  seconds: number;
  sameValue: boolean;
  repaired: boolean;
  rule: string;
  example: string;
};

export type TopicSlice = {
  topicId: string;
  title: string;
  subject: Subject;
  correct: number;
  total: number;
};

export type AttemptReport = {
  id: string;
  testId: string;
  title: string;
  studentName: string;
  submittedAt: number;
  durationSec: number;
  score: number;
  total: number;
  percent: number;
  blanks: number;
  wrong: number;
  hitSeconds: number;
  hitCount: number;
  topics: TopicSlice[];
  misses: RevisionCard[];
  levelNote: string;
};

export type DayRevision = {
  day: string;
  papers: AttemptReport[];
  notes: RevisionCard[];
};

export function previousDay(day: string) {
  const [year, month, date] = day.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, date));
  utc.setUTCDate(utc.getUTCDate() - 1);
  const z = (n: number) => String(n).padStart(2, "0");
  return `${utc.getUTCFullYear()}-${z(utc.getUTCMonth() + 1)}-${z(utc.getUTCDate())}`;
}

export function reportAttempt(attempt: Attempt): AttemptReport {
  const topics = new Map<string, TopicSlice>();
  const misses: RevisionCard[] = [];
  let blanks = 0;
  let wrong = 0;
  let hitSeconds = 0;
  let hitCount = 0;

  attempt.answers.forEach((answer, index) => {
    const topic = topicById(answer.topicId);
    const slice = topics.get(answer.topicId) ?? {
      topicId: answer.topicId,
      title: topic?.title ?? answer.topicId,
      subject: answer.subject,
      correct: 0,
      total: 0,
    };
    slice.total += 1;
    if (answer.correct) {
      slice.correct += 1;
      hitSeconds += answer.seconds;
      hitCount += 1;
    }
    topics.set(answer.topicId, slice);
    if (answer.correct) return;
    if (answer.chosen === null) blanks += 1;
    else wrong += 1;
    misses.push(cardFor(answer, index, findQuestion(answer.questionId), slice.title));
  });

  const percent = attempt.total ? Math.round((attempt.score / attempt.total) * 100) : 0;
  return {
    id: attempt.id,
    testId: attempt.testId,
    title: attempt.testTitle,
    studentName: attempt.studentName,
    submittedAt: attempt.submittedAt,
    durationSec: attempt.durationSec,
    score: attempt.score,
    total: attempt.total,
    percent,
    blanks,
    wrong,
    hitSeconds,
    hitCount,
    topics: [...topics.values()].sort(bySubject),
    misses,
    levelNote: movementNote(attempt),
  };
}

export function dayRevision(attempts: Attempt[], day: string): DayRevision {
  const papers = attempts
    .filter((attempt) => istDay(attempt.submittedAt) === day)
    .sort((a, b) => a.submittedAt - b.submittedAt)
    .map(reportAttempt);
  const firstMiss = new Map<string, number>();
  for (const paper of papers) {
    for (const miss of paper.misses) {
      if (!firstMiss.has(miss.questionId)) firstMiss.set(miss.questionId, paper.submittedAt);
    }
  }
  const repaired = new Set<string>();
  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const missedAt = firstMiss.get(answer.questionId);
      if (missedAt !== undefined && answer.correct && attempt.submittedAt > missedAt) repaired.add(answer.questionId);
    }
  }
  const notes: RevisionCard[] = [];
  const seen = new Set<string>();
  for (const paper of papers) {
    for (const miss of paper.misses) {
      if (seen.has(miss.questionId)) continue;
      seen.add(miss.questionId);
      notes.push({ ...miss, repaired: repaired.has(miss.questionId) });
    }
  }
  notes.sort((a, b) => ORDER.indexOf(a.subject) - ORDER.indexOf(b.subject) || a.index - b.index);
  return { day, papers, notes };
}

export function summaryLines(report: AttemptReport) {
  const lines = [
    `About ${report.total ? Math.max(1, Math.round(report.durationSec / report.total)) : 0} seconds a question. The exam line is 50% on each paper. This sitting is at ${report.percent}%.`,
  ];
  if (report.blanks) {
    lines.push(
      `${report.blanks} ${report.blanks === 1 ? "question was" : "questions were"} left blank. A blank scores nothing, and there is no negative marking.`,
    );
  }
  const concepts = report.misses.filter((miss) => !miss.sameValue);
  const same = report.misses.length - concepts.length;
  if (report.misses.length === 0) lines.push("Every question was right. This paper has no revision notes.");
  else if (concepts.length) {
    lines.push(`${concepts.length} ${concepts.length === 1 ? "question needs" : "questions need"} a revision note below.`);
  }
  if (same) {
    lines.push(
      `${same} ${same === 1 ? "answer is" : "answers are"} the same value as the key, written differently.`,
    );
  }
  if (concepts.length && report.hitCount) {
    const missAvg = concepts.reduce((sum, miss) => sum + miss.seconds, 0) / concepts.length;
    const hitAvg = report.hitSeconds / report.hitCount;
    if (missAvg > hitAvg + 15) lines.push("The missed questions took longer than the correct ones.");
  }
  if (report.levelNote) lines.push(report.levelNote);
  return lines;
}

const RETAKE_WINDOW_MS = 20 * 60 * 1000;

export type QuestionLine = {
  key: string;
  index: number;
  subject: Subject;
  stem: string;
  chosenLabel: string;
  correctLabel: string;
  correct: boolean;
  blank: boolean;
  sameValue: boolean;
  seconds: number;
  leaves: number;
  awaySec: number;
  selects: number;
  shots: number;
  watched: boolean;
  rule: string;
};

export type TestBrief = {
  id: string;
  title: string;
  submittedAt: number;
  score: number;
  total: number;
  percent: number;
  durationSec: number;
  wrong: number;
  blanks: number;
  retake: boolean;
  earlier: string;
  startedAt: number;
  watched: boolean;
  line: string;
  subjects: { subject: Subject; correct: number; total: number }[];
  questions: QuestionLine[];
};

export type SubjectTally = {
  subject: Subject;
  correct: number;
  total: number;
  percent: number;
};

export type FullReport = {
  studentName: string;
  papers: number;
  questions: number;
  correct: number;
  percent: number;
  subjects: SubjectTally[];
  paper1: SubjectTally;
  paper2: SubjectTally;
  repeats: { questionId: string; stem: string; topicTitle: string; times: number }[];
  repaired: number;
  retakes: number;
  lines: string[];
};

export function retakeOf(attempts: Attempt[]) {
  const sorted = [...attempts].sort((left, right) => left.submittedAt - right.submittedAt);
  const earlier = new Map<string, Attempt>();
  for (const attempt of sorted) {
    for (let index = sorted.length - 1; index >= 0; index -= 1) {
      const previous = sorted[index];
      if (previous.submittedAt >= attempt.submittedAt) continue;
      if (previous.testId !== attempt.testId) continue;
      if (attempt.submittedAt - previous.submittedAt <= RETAKE_WINDOW_MS) earlier.set(attempt.id, previous);
      break;
    }
  }
  return earlier;
}

export function testBrief(attempt: Attempt, earlier: Attempt | null): TestBrief {
  const report = reportAttempt(attempt);
  const subjects = new Map<Subject, { correct: number; total: number }>();
  const questions = attempt.answers.map((answer, index) => {
    const tally = subjects.get(answer.subject) ?? { correct: 0, total: 0 };
    tally.total += 1;
    if (answer.correct) tally.correct += 1;
    subjects.set(answer.subject, tally);
    const card = cardFor(answer, index, findQuestion(answer.questionId), topicById(answer.topicId)?.title ?? answer.topicId);
    const line: QuestionLine = {
      key: `${attempt.id}-${index}-${answer.questionId}`,
      index,
      subject: answer.subject,
      stem: card.stem,
      chosenLabel: card.chosenLabel,
      correctLabel: card.correctLabel,
      correct: answer.correct,
      blank: answer.chosen === null,
      sameValue: card.sameValue,
      seconds: answer.seconds,
      leaves: answer.leaves ?? 0,
      awaySec: answer.awaySec ?? 0,
      selects: answer.selects ?? 0,
      shots: answer.shots ?? 0,
      watched: answer.selects !== undefined,
      rule: answer.correct && !card.sameValue ? "" : card.rule,
    };
    return line;
  });
  const missTopics = [...new Set(report.misses.filter((miss) => !miss.sameValue).map((miss) => miss.topicTitle))];
  let line = report.misses.length === 0
    ? "Every question was right."
    : missTopics.length
      ? `The misses are in ${missTopics.join(", ")}.`
      : "The misses are the same value written another way.";
  if (earlier) line = `This is a redo of the ${earlier.score}/${earlier.total} sitting a few minutes earlier. ${line}`;
  return {
    id: attempt.id,
    title: attempt.testTitle,
    submittedAt: attempt.submittedAt,
    score: attempt.score,
    total: attempt.total,
    percent: report.percent,
    durationSec: attempt.durationSec,
    wrong: report.wrong,
    blanks: report.blanks,
    retake: Boolean(earlier),
    earlier: earlier ? `${earlier.score}/${earlier.total}` : "",
    startedAt: attempt.startedAt,
    watched: questions.some((question) => question.watched),
    line,
    subjects: [...subjects.entries()].map(([subject, tally]) => ({ subject, ...tally })),
    questions,
  };
}

export function sittingChecks(rows: { leaves: number; selects: number; shots: number }[]) {
  return {
    leaves: rows.reduce((sum, row) => sum + row.leaves, 0),
    selects: rows.reduce((sum, row) => sum + row.selects, 0),
    shots: rows.reduce((sum, row) => sum + row.shots, 0),
  };
}

const QUICK_SECONDS = 5;

export function patternLines(questions: QuestionLine[], watched: boolean) {
  const lines: string[] = [];
  const quick = questions.filter((question) => question.correct && question.seconds < QUICK_SECONDS).length;
  if (quick) lines.push(`${quick} correct ${quick === 1 ? "answer was" : "answers were"} under 5 seconds`);
  if (!watched) return lines;
  const checks = sittingChecks(questions);
  if (checks.leaves) lines.push(`Left the screen ${countTimes(checks.leaves)}`);
  if (checks.selects) lines.push(`Selected the question text ${countTimes(checks.selects)}`);
  if (checks.shots) lines.push(`Screenshot shortcut ${countTimes(checks.shots)}`);
  return lines;
}

function countTimes(count: number) {
  return `${count} ${count === 1 ? "time" : "times"}`;
}

export function fullReport(attempts: Attempt[]): FullReport {
  const earlier = retakeOf(attempts);
  const real = attempts.filter((attempt) => !earlier.has(attempt.id));
  const name = real.find((attempt) => attempt.studentName)?.studentName
    || attempts.find((attempt) => attempt.studentName)?.studentName
    || "He";
  const subjectRows = new Map<Subject, { correct: number; total: number }>();
  let questions = 0;
  let correct = 0;
  for (const attempt of real) {
    for (const answer of attempt.answers) {
      questions += 1;
      if (answer.correct) correct += 1;
      const row = subjectRows.get(answer.subject) ?? { correct: 0, total: 0 };
      row.total += 1;
      if (answer.correct) row.correct += 1;
      subjectRows.set(answer.subject, row);
    }
  }
  const subjects = ORDER
    .filter((subject) => subjectRows.has(subject))
    .map((subject) => tally(subject, subjectRows.get(subject)!));
  const paper1 = combine(subjects.filter((row) => row.subject === "english" || row.subject === "hindi" || row.subject === "sst"), "english");
  const paper2 = combine(subjects.filter((row) => row.subject === "maths" || row.subject === "science"), "maths");
  const misses = new Map<string, { stem: string; topicTitle: string; times: number }>();
  const firstMiss = new Map<string, number>();
  for (const attempt of [...real].sort((left, right) => left.submittedAt - right.submittedAt)) {
    for (const answer of attempt.answers) {
      if (answer.correct) continue;
      const question = findQuestion(answer.questionId);
      const row = misses.get(answer.questionId) ?? {
        stem: question?.stem ?? "This question is no longer in the bank.",
        topicTitle: topicById(answer.topicId)?.title ?? answer.topicId,
        times: 0,
      };
      row.times += 1;
      misses.set(answer.questionId, row);
      if (!firstMiss.has(answer.questionId)) firstMiss.set(answer.questionId, attempt.submittedAt);
    }
  }
  const repairedIds = new Set<string>();
  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const missedAt = firstMiss.get(answer.questionId);
      if (missedAt !== undefined && answer.correct && attempt.submittedAt > missedAt) repairedIds.add(answer.questionId);
    }
  }
  const repeats = [...misses.entries()]
    .filter(([, row]) => row.times > 1)
    .map(([questionId, row]) => ({ questionId, ...row }))
    .sort((left, right) => right.times - left.times);
  const percent = questions ? Math.round((correct / questions) * 100) : 0;
  const ranked = subjects.filter((row) => row.total >= 4).sort((left, right) => left.percent - right.percent);
  const lines = reportLines({
    name,
    papers: real.length,
    questions,
    correct,
    percent,
    subjects,
    paper1,
    paper2,
    ranked,
    repeats,
    repaired: repairedIds.size,
    retakes: earlier.size,
  });
  return {
    studentName: name,
    papers: real.length,
    questions,
    correct,
    percent,
    subjects,
    paper1,
    paper2,
    repeats,
    repaired: repairedIds.size,
    retakes: earlier.size,
    lines,
  };
}

function tally(subject: Subject, row: { correct: number; total: number }): SubjectTally {
  return {
    subject,
    correct: row.correct,
    total: row.total,
    percent: row.total ? Math.round((row.correct / row.total) * 100) : 0,
  };
}

function combine(rows: SubjectTally[], subject: Subject): SubjectTally {
  const correct = rows.reduce((sum, row) => sum + row.correct, 0);
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  return tally(subject, { correct, total });
}

function reportLines(input: {
  name: string;
  papers: number;
  questions: number;
  correct: number;
  percent: number;
  subjects: SubjectTally[];
  paper1: SubjectTally;
  paper2: SubjectTally;
  ranked: SubjectTally[];
  repeats: { times: number }[];
  repaired: number;
  retakes: number;
}) {
  if (!input.papers) return ["No paper has been submitted yet. The report fills in after he submits a test."];
  const lines = [
    `${input.name} has ${input.papers} ${input.papers === 1 ? "paper" : "papers"} in this report, ${input.correct} right out of ${input.questions} (${input.percent}%). An immediate redo is left out of this total, so a second sitting a few minutes later does not hide the first score.`,
  ];
  if (input.paper1.total) {
    lines.push(`Paper 1 is English, Hindi and Social Science. Across these tests that is ${input.paper1.correct}/${input.paper1.total} (${input.paper1.percent}%). The exam needs 50% on Paper 1 by itself.`);
  }
  if (input.paper2.total) {
    lines.push(`Paper 2 is Mathematics and Science. Across these tests that is ${input.paper2.correct}/${input.paper2.total} (${input.paper2.percent}%). The exam needs 50% on Paper 2 by itself.`);
  }
  if (input.ranked.length) {
    const low = input.ranked[0];
    const high = input.ranked[input.ranked.length - 1];
    lines.push(`${labelOf(low.subject)} is the weakest of the subjects with at least four questions, at ${low.percent}%. ${labelOf(high.subject)} is the strongest, at ${high.percent}%.`);
  }
  if (input.retakes) {
    lines.push(`${input.retakes} ${input.retakes === 1 ? "paper was" : "papers were"} redone within 20 minutes. Those redos are listed with the tests. They are not added into the full total.`);
  }
  if (input.repaired) {
    lines.push(`${input.repaired} ${input.repaired === 1 ? "miss was" : "misses were"} answered correctly on a later paper.`);
  }
  if (input.repeats.length) {
    lines.push(`${input.repeats.length} ${input.repeats.length === 1 ? "question was" : "questions were"} missed more than once. Those are the ones to revise before the next test.`);
  }
  return lines;
}

function labelOf(subject: Subject) {
  if (subject === "maths") return "Mathematics";
  if (subject === "science") return "Science";
  if (subject === "english") return "English";
  if (subject === "hindi") return "Hindi";
  return "Social Science";
}

function movementNote(attempt: Attempt) {
  const topic = topicById(attempt.testId);
  if (!topic) return "";
  const shifted = attempt.answers.some((answer, index) => topic.questions[index]?.id !== answer.questionId);
  if (!shifted) return "";
  const counts = { easy: 0, moderate: 0, tough: 0 };
  for (const answer of attempt.answers) {
    const level = levelForQuestion(answer.questionId, topic.questions);
    if (!level) return "";
    counts[level] += 1;
  }
  return `Each answer was checked before the next question. This sitting had ${counts.easy} easy, ${counts.moderate} moderate and ${counts.tough} tough.`;
}

function cardFor(answer: AnswerRecord, index: number, question: Question | undefined, topicTitle: string): RevisionCard {
  const chosenLabel = answer.chosen === null ? "Not attempted" : question?.options[answer.chosen] ?? "Unlisted option";
  const correctLabel = question?.options[question.answer] ?? "See the paper";
  const sameValue = answer.chosen !== null && sameNumber(chosenLabel, correctLabel);
  const explanation = question?.explanation ?? "";
  const stem = question?.stem ?? "This question is no longer in the bank.";
  const focus = `${stem} ${correctLabel} ${chosenLabel}`;
  const picked = ruleFor(answer.topicId, focus, explanation, sameValue);
  return {
    questionId: answer.questionId,
    topicId: answer.topicId,
    topicTitle,
    subject: answer.subject,
    index,
    stem,
    chosenLabel,
    correctLabel,
    seconds: answer.seconds,
    sameValue,
    repaired: false,
    rule: picked.rule,
    example: picked.example,
  };
}

function ruleFor(topicId: string, focus: string, explanation: string, sameValue: boolean) {
  if (sameValue) {
    return {
      rule: "These two answers are the same value, written in different ways.",
      example: "",
    };
  }
  const remembered = rememberLine(explanation);
  if (remembered) return { rule: remembered, example: "" };
  const note = bestNote(topicId, focus, explanation);
  if (note) return { rule: note.idea, example: fittingExample(note.example ?? "", focus) };
  const extracted = becauseLine(explanation) || firstSentence(explanation);
  return {
    rule: extracted || "Read the worked answer on this question, then try the topic again.",
    example: "",
  };
}

function bestNote(topicId: string, focus: string, explanation: string): NoteBit | null {
  const bits = TOPIC_NOTES[topicId] ?? [];
  if (!bits.length) return null;
  const counts = new Map<string, number>();
  const tokenSets = bits.map((bit) => {
    const words = [...new Set(tokens(`${bit.idea} ${bit.example ?? ""}`))];
    for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
    return words;
  });
  const focusBag = new Set(tokens(focus));
  const fullBag = new Set(tokens(`${focus} ${explanation}`));
  let bestIndex = -1;
  let bestScore = 0;
  tokenSets.forEach((words, index) => {
    const score = distinctive(words, focusBag, counts) * 5 + distinctive(words, fullBag, counts);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });
  return bestScore >= 1 ? bits[bestIndex] : null;
}

function distinctive(words: string[], bag: Set<string>, counts: Map<string, number>) {
  return words.filter((word) => bag.has(word) && counts.get(word) === 1).length;
}

function fittingExample(example: string, focus: string) {
  if (!example) return "";
  const bag = new Set(looseTokens(focus));
  const shared = looseTokens(example).some((word) => bag.has(word));
  return shared ? example : "";
}

function looseTokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function rememberLine(explanation: string) {
  const part = explanation.split("याद रखो:")[1];
  if (!part) return "";
  return tidy(part.split("गलत")[0] ?? "");
}

function becauseLine(explanation: string) {
  const match = explanation.match(/because\s+([\s\S]+)/i);
  if (!match) return "";
  let clause = match[1];
  const wrongAt = clause.search(/\s+\S.{0,40}? is wrong because/i);
  if (wrongAt >= 0) clause = clause.slice(0, wrongAt);
  const stop = clause.search(/[.।]/);
  if (stop >= 0) clause = clause.slice(0, stop);
  return tidy(clause);
}

function firstSentence(explanation: string) {
  const stop = explanation.search(/[.।]/);
  return tidy(stop >= 0 ? explanation.slice(0, stop) : explanation);
}

function tidy(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const cased = clean.charAt(0).toUpperCase() + clean.slice(1);
  return /[.।!]$/.test(cased) ? cased : `${cased}.`;
}

function tokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP.has(word));
}

function sameNumber(left: string, right: string) {
  const a = left.trim();
  const b = right.trim();
  if (a === b) return false;
  if (!/^-?\d+(\.\d+)?$/.test(a) || !/^-?\d+(\.\d+)?$/.test(b)) return false;
  return Number(a) === Number(b);
}

function bySubject(a: TopicSlice, b: TopicSlice) {
  return ORDER.indexOf(a.subject) - ORDER.indexOf(b.subject);
}
