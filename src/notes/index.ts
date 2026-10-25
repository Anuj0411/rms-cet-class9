import { englishNotes } from "./english.ts";
import { hindiNotes } from "./hindi.ts";
import { mathsNotes } from "./maths.ts";
import { scienceNotes } from "./science.ts";
import { sstNotes } from "./sst.ts";
import type { NoteBit } from "./types.ts";

export type { NoteBit };

export const TOPIC_NOTES: Record<string, NoteBit[]> = {
  ...mathsNotes,
  ...scienceNotes,
  ...englishNotes,
  ...hindiNotes,
  ...sstNotes,
};

export const PAPER_BRIEF: NoteBit[] = [
  {
    idea: "There is no negative marking. Answer every question. Leaving one blank cannot help, and a careful guess cannot lower the score.",
  },
  {
    idea: "You need half the marks in Paper 1 and half the marks in Paper 2. A big total does not save a paper that is under half.",
  },
  {
    idea: "Paper 1 is English, Hindi and Social Science. Paper 2 is Mathematics and Science. If time is short, do not leave a whole subject blank.",
  },
  {
    idea: "Open any topic below that you might forget. Read that topic’s points, then come back and start.",
  },
];
