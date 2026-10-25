export type Subject = "maths" | "science" | "english" | "hindi" | "sst";

export type Question = {
  id: string;
  topicId: string;
  subject: Subject;
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Topic = {
  id: string;
  subject: Subject;
  title: string;
  ncert: string;
  minutes: number;
  testSize: number;
  concept: string;
  questions: Question[];
};

export type TestKind = "topic" | "mock" | "sectional" | "half" | "redo";

export type TestView = {
  id: string;
  title: string;
  kind: TestKind;
  minutes: number;
  strict: boolean;
  concept: string;
  ncert?: string;
  questions: Question[];
};

export type AnswerRecord = {
  questionId: string;
  topicId: string;
  subject: Subject;
  chosen: number | null;
  correct: boolean;
  flagged: boolean;
  seconds: number;
};

export type Attempt = {
  id: string;
  studentName: string;
  testId: string;
  testTitle: string;
  kind: TestKind;
  startedAt: number;
  submittedAt: number;
  durationSec: number;
  score: number;
  total: number;
  paper1Score: number | null;
  paper1Total: number | null;
  paper2Score: number | null;
  paper2Total: number | null;
  answers: AnswerRecord[];
};

export type PaperReset = {
  id: string;
  kind: "attempt" | "live";
  testId: string;
  attemptId?: string;
  at: number;
};

export type OpenPaper = {
  id: "current";
  testId: string;
  title: string;
  startedAt: number;
  open: boolean;
};

export type LiveTest = {
  testId: string;
  started: boolean;
  startedAt: number;
  index: number;
  chosen: (number | null)[];
  flags: boolean[];
  seconds: number[];
  tickAt: number;
};
