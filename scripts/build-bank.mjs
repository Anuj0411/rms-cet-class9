import { writeFileSync } from "node:fs";
import { topics as maths } from "./data/maths.mjs";
import { topics as scienceA } from "./data/science-a.mjs";
import { topics as scienceB } from "./data/science-b.mjs";
import { topics as english } from "./data/english.mjs";

const preview = process.env.PREVIEW === "1";
let hindi = [];
let sst = [];
try {
  hindi = (await import("./data/hindi.mjs")).topics;
} catch (error) {
  if (!preview) throw error;
  console.warn(error instanceof Error ? error.message : error);
}
try {
  sst = (await import("./data/sst.mjs")).topics;
} catch (error) {
  if (!preview) throw error;
  console.warn("Social Science bank is not in yet.");
}

const topics = [...maths, ...scienceA, ...scienceB, ...english, ...hindi, ...sst].map(normalize);
const expected = { maths: 240, science: 240, english: 140, hindi: 96, sst: 168 };
for (const [subject, size] of Object.entries(expected)) {
  const got = topics.filter((topic) => topic.subject === subject).reduce((sum, topic) => sum + topic.testSize, 0);
  if (!preview && got !== size) throw new Error(`${subject} test size is ${got}, expected ${size}`);
}

const ids = new Set();
for (const topic of topics) {
  if (topic.questions.length < topic.testSize) {
    throw new Error(`${topic.id} has ${topic.questions.length} questions, needs ${topic.testSize}`);
  }
  for (const question of topic.questions) {
    if (ids.has(question.id)) throw new Error(`Duplicate id ${question.id}`);
    ids.add(question.id);
    if (question.options.length !== 4 || new Set(question.options).size !== 4) {
      throw new Error(`Bad options on ${question.id}`);
    }
    if (question.answer < 0 || question.answer > 3) throw new Error(`Bad answer on ${question.id}`);
    if (!question.explanation || question.explanation.length < 80) {
      throw new Error(`Short explanation on ${question.id}`);
    }
  }
}

function pool(subject) {
  return topics
    .filter((topic) => topic.subject === subject)
    .flatMap((topic) => topic.questions.slice(topic.testSize));
}

function take(items, start, count, label) {
  const slice = items.slice(start, start + count);
  if (slice.length < count) {
    throw new Error(`${label} needs ${count} from ${start}, pool has ${items.length}`);
  }
  return slice;
}

const mathsPool = pool("maths");
const sciencePool = pool("science");
const englishPool = pool("english");
const hindiPool = pool("hindi");
const sstPool = pool("sst");

let sectionals = [];
let mocks = [];
try {
  sectionals = [
    paper("sectional-maths", "Mathematics sectional", 40, "sectional", take(mathsPool, 0, 50, "maths sectional"), "50 unseen mathematics questions. 40 minutes. The paper submits when time ends."),
    paper("sectional-science", "Science sectional", 40, "sectional", take(sciencePool, 0, 50, "science sectional"), "50 unseen science questions. 40 minutes. The paper submits when time ends."),
    paper(
      "sectional-paper1",
      "Paper 1 sectional",
      75,
      "sectional",
      [
        ...take(englishPool, 0, 50, "paper1 english"),
        ...take(hindiPool, 0, 20, "paper1 hindi"),
        ...take(sstPool, 0, 30, "paper1 sst"),
      ],
      "English 50, Hindi 20, Social Science 30. 75 minutes. You need 50% on this paper by itself.",
    ),
  ];
  mocks = [0, 1, 2].map((index) =>
    paper(
      `mock-${index + 1}`,
      `Full mock ${index + 1}`,
      150,
      "mock",
      [
        ...take(englishPool, 50 + index * 50, 50, `mock ${index + 1} english`),
        ...take(hindiPool, 20 + index * 20, 20, `mock ${index + 1} hindi`),
        ...take(sstPool, 30 + index * 30, 30, `mock ${index + 1} sst`),
        ...take(mathsPool, 50 + index * 50, 50, `mock ${index + 1} maths`),
        ...take(sciencePool, 50 + index * 50, 50, `mock ${index + 1} science`),
      ],
      "Full RMS CET Class 9 paper. 200 questions, 2 hours 30 minutes, no negative marking. English 50, Hindi 20, Social Science 30, Mathematics 50, Science 50. Paper 1 and Paper 2 are marked separately. Each needs 50%.",
    ),
  );
} catch (error) {
  if (!preview) throw error;
  console.warn(error instanceof Error ? error.message : error);
  sectionals = [];
  mocks = [];
}

writeFileSync(
  new URL("../src/content/topics.ts", import.meta.url),
  `import type { Topic } from "../types.ts";\n\nexport const topics = ${JSON.stringify(topics)} as Topic[];\n`,
);
writeFileSync(
  new URL("../src/content/papers.ts", import.meta.url),
  `import type { TestView } from "../types.ts";\n\nexport const sectionals = ${JSON.stringify(sectionals)} as TestView[];\nexport const mocks = ${JSON.stringify(mocks)} as TestView[];\n`,
);

console.log(
  `Bank ready: ${topics.length} topics, ${topics.reduce((sum, topic) => sum + topic.questions.length, 0)} questions, ${mocks.length} mocks.`,
);

function normalize(topic) {
  return {
    id: topic.id,
    subject: topic.subject,
    title: topic.title,
    ncert: topic.ncert,
    minutes: topic.minutes,
    testSize: topic.testSize,
    concept: topic.concept,
    questions: topic.questions.map((question, index) => ({
      id: question.id && String(question.id).startsWith(`${topic.id}-`)
        ? question.id
        : `${topic.id}-${String(question.id ?? index + 1).padStart(2, "0")}`,
      topicId: topic.id,
      subject: topic.subject,
      stem: question.stem,
      options: question.options,
      answer: question.answer,
      explanation: question.explanation,
    })),
  };
}

function paper(id, title, minutes, kind, questions, concept) {
  if (id.startsWith("mock") && questions.length !== 200) {
    throw new Error(`${id} has ${questions.length} questions`);
  }
  return { id, title, kind, minutes, strict: true, concept, ncert: undefined, questions };
}
