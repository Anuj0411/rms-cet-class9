export type PlanKind = "test" | "review" | "formula" | "note";

export type PlanEntry = {
  date: string;
  title: string;
  detail: string;
  kind: PlanKind;
  testId?: string;
  required: boolean;
};

function row(
  date: string,
  title: string,
  detail: string,
  kind: PlanKind,
  testId: string | undefined,
  required: boolean,
): PlanEntry {
  return { date, title, detail, kind, testId, required };
}

const t = (
  date: string,
  title: string,
  testId: string,
  detail: string,
  required = false,
) => row(date, title, detail, "test", testId, required);

export const PLAN: PlanEntry[] = [
  t("2026-10-26", "Integers, fractions and decimals", "m-integers", "Maths · 20 min", true),
  t("2026-10-26", "Resources", "t-resources", "Social Science"),
  t("2026-10-26", "Land, soil and water", "t-land", "Social Science"),
  t("2026-10-27", "Rational numbers", "m-rational", "Maths · 20 min", true),
  t("2026-10-27", "Tenses and agreement", "e-tenses", "English"),
  t("2026-10-27", "From trade to territory", "t-trade", "Social Science"),
  t("2026-10-28", "Playing with numbers", "m-playing", "Maths · 20 min", true),
  t("2026-10-28", "संज्ञा, लिंग, वचन", "h-nouns", "Hindi"),
  t("2026-10-29", "Exponents and powers", "m-exponents", "Maths · 20 min", true),
  t("2026-10-29", "Cell structure", "s-cell", "Science"),
  t("2026-10-29", "Understanding secularism", "t-secularism", "Social Science"),
  t("2026-10-30", "Squares and square roots", "m-squares", "Maths · 20 min", true),
  t("2026-10-30", "Microorganisms", "s-micro", "Science"),
  t("2026-10-30", "Human resources", "t-population", "Social Science"),
  t("2026-10-31", "Cubes and cube roots", "m-cubes", "Maths · 20 min", true),
  t("2026-10-31", "Crop production", "s-crop", "Science"),
  t("2026-10-31", "Comprehension 1", "e-passage-1", "English"),
  t("2026-11-01", "The Indian Constitution", "t-constitution", "Social Science · then the half paper", true),
  t("2026-11-01", "Vocabulary", "e-vocab", "English"),
  t("2026-11-01", "Week 1 half paper", "half-1", "40 min · mixed revision", true),

  t("2026-11-02", "Algebraic expressions", "m-algebra", "Maths · 22 min", true),
  t("2026-11-02", "Active and passive voice", "e-voice", "English"),
  t("2026-11-02", "Class 6–7 fact drill", "t-facts", "Social Science"),
  t("2026-11-03", "Factorisation", "m-factorisation", "Maths · 20 min", true),
  t("2026-11-03", "Direct and indirect speech", "e-narration", "English"),
  t("2026-11-04", "Linear equations", "m-equations", "Maths · 20 min", true),
  t("2026-11-04", "क्रिया, काल, वाच्य", "h-verbs", "Hindi"),
  t("2026-11-04", "Modals", "e-modals", "English"),
  t("2026-11-05", "Force and pressure", "s-force", "Science · 20 min", true),
  t("2026-11-05", "The revolt of 1857", "t-1857", "Social Science"),
  t("2026-11-06", "Friction", "s-friction", "Science · 20 min", true),
  t("2026-11-06", "कारक और अव्यय", "h-case", "Hindi"),
  t("2026-11-06", "अलंकार और पद परिचय", "h-alankar", "Hindi"),
  t("2026-11-07", "Parliament and laws", "t-parliament", "Social Science", true),
  t("2026-11-07", "Comprehension 2", "e-passage-2", "English"),
  t("2026-11-08", "Week 2 half paper", "half-2", "40 min · algebra, force, voice, 1857", true),

  t("2026-11-09", "Mensuration and circles", "m-mensuration", "Maths · 22 min", true),
  t("2026-11-09", "Articles and determiners", "e-articles", "English"),
  t("2026-11-09", "Conservation and forests", "s-conservation", "Science"),
  t("2026-11-10", "Comparing quantities", "m-comparing", "Maths · 22 min", true),
  t("2026-11-10", "Prepositions and conjunctions", "e-prepositions", "English"),
  t("2026-11-11", "Metals and non-metals", "s-metals", "Science · 20 min", true),
  t("2026-11-11", "Error correction", "e-errors", "English"),
  t("2026-11-11", "Comprehension 3", "e-passage-3", "English"),
  t("2026-11-12", "Combustion and flame", "s-combustion", "Science · 20 min", true),
  t("2026-11-12", "मुहावरे और लोकोक्तियाँ", "h-idioms", "Hindi"),
  t("2026-11-13", "Coal and petroleum", "s-coal", "Science · 20 min", true),
  t("2026-11-13", "पर्याय और वर्तनी", "h-synonyms", "Hindi"),
  t("2026-11-13", "Comprehension 4", "e-passage-4", "English"),
  t("2026-11-14", "Synthetic fibres and plastics", "s-fibres", "Science", true),
  t("2026-11-14", "Acids, bases and salts", "s-acids", "Science"),
  t("2026-11-14", "Agriculture", "t-agriculture", "Social Science"),
  t("2026-11-15", "National movement", "t-national", "Social Science", true),
  t("2026-11-15", "Week 3 half paper", "half-3", "40 min · mensuration, metals, grammar", true),

  t("2026-11-16", "Triangles and congruence", "m-triangles", "Maths · 20 min", true),
  t("2026-11-16", "Jumbled words and clauses", "e-jumbled", "English"),
  t("2026-11-17", "Quadrilaterals and polygons", "m-quads", "Maths · 20 min", true),
  t("2026-11-17", "Question tags and conditionals", "e-tags", "English"),
  t("2026-11-18", "Data handling", "m-data", "Maths · 18 min", true),
  t("2026-11-18", "Sound", "s-sound", "Science"),
  t("2026-11-19", "Proportion, time and work", "m-proportion", "Maths · 20 min", true),
  t("2026-11-19", "Light", "s-light", "Science"),
  t("2026-11-20", "Graphs and symmetry", "m-graphs", "Maths · 18 min", true),
  t("2026-11-20", "Chemical effects of current", "s-current", "Science"),
  t("2026-11-21", "Reproduction", "s-reproduction", "Science", true),
  t("2026-11-21", "Adolescence", "s-adolescence", "Science"),
  t("2026-11-21", "Industries", "t-industries", "Social Science"),
  t("2026-11-22", "Judiciary", "t-judiciary", "Social Science", true),
  t("2026-11-22", "Marginalisation and public facilities", "t-marginalisation", "Social Science"),
  t("2026-11-22", "उपसर्ग, प्रत्यय, समास", "h-samas", "Hindi"),
  t("2026-11-22", "वाक्य शुद्धि", "h-correction", "Hindi"),

  t("2026-11-23", "Paper 1 sectional", "sectional-paper1", "English 50, Hindi 20, Social Science 30 · 75 min", true),
  t("2026-11-24", "Mathematics sectional", "sectional-maths", "50 questions · 40 min", true),
  t("2026-11-25", "Science sectional", "sectional-science", "50 questions · 40 min", true),
  t("2026-11-26", "Full mock 1", "mock-1", "200 questions · 2 hours 30 minutes. Last new-style papers start now.", true),
  row("2026-11-27", "Review mock 1", "Read every explanation you missed. Do not start a new paper.", "review", "mock-1", true),
  t("2026-11-28", "Wrong questions from mock 1", "redo-wrongs", "Repair the misses", true),
  row("2026-11-29", "City intimation slip", "Check the NTA site. Last week of November is when the city slip is expected. No new paper today.", "note", undefined, true),
  t("2026-11-30", "Full mock 2", "mock-2", "200 questions · 2 hours 30 minutes", true),
  row("2026-12-01", "Review mock 2", "Paper 1 and Paper 2 are marked separately. Both need 50%.", "review", "mock-2", true),
  t("2026-12-02", "Full mock 3", "mock-3", "Last full paper. After today, only revision.", true),

  row("2026-12-03", "Review mock 3", "Revision starts. Read every miss. No new paper.", "review", "mock-3", true),
  t("2026-12-04", "Wrong questions", "redo-wrongs", "Only questions already missed", true),
  t("2026-12-05", "Weak topics", "weak-redo", "Only topics still under 70%", true),
  t("2026-12-06", "Short warm-up", "warmup-20", "20 questions, then stop", true),
  t("2026-12-07", "Wrong questions", "redo-wrongs", "A short repair sitting", true),
  row("2026-12-08", "Admit card", "The admit card is expected about today. Download it and check the centre. No test.", "note", undefined, true),
  t("2026-12-09", "Wrong questions", "redo-wrongs", "Last question practice", true),
  row("2026-12-10", "Formula sheet", "Read the sheet. No timed paper.", "formula", undefined, true),
  row("2026-12-11", "Light recall only", "Look over the formula sheet and the topics still under 70%. Do not start a test.", "review", undefined, true),
  row("2026-12-12", "Rest", "Pack the pencil box. Sleep. No test.", "note", undefined, true),
];

export const EXAM_DATE = "2026-12-13";

export function todayISO(date = new Date()) {
  const z = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${z(date.getMonth() + 1)}-${z(date.getDate())}`;
}

export function parseISO(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDay(iso: string) {
  return parseISO(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export const WEEKS: { title: string; start: string; end: string }[] = [
  { title: "Week 1 · Number system and life science", start: "2026-10-26", end: "2026-11-01" },
  { title: "Week 2 · Algebra, force, and 1857", start: "2026-11-02", end: "2026-11-08" },
  { title: "Week 3 · Mensuration, materials, and the national movement", start: "2026-11-09", end: "2026-11-15" },
  { title: "Week 4 · Geometry, light, sound, and civics", start: "2026-11-16", end: "2026-11-22" },
  { title: "Week 5 · Sectionals and mock 1", start: "2026-11-23", end: "2026-11-29" },
  { title: "Week 6 · Last two full papers", start: "2026-11-30", end: "2026-12-02" },
  { title: "10 days of revision", start: "2026-12-03", end: "2026-12-12" },
];
