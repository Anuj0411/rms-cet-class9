import type { NoteBit } from "../notes/types.ts";
import { Figure, figureFor } from "./figures.tsx";
import { langOf } from "./lang.ts";

function parts(idea: string) {
  const cut = idea.search(/[.।](\s|$)/);
  if (cut < 0 || cut > 140) return { rule: idea, rest: "" };
  return { rule: idea.slice(0, cut + 1), rest: idea.slice(cut + 1).trim() };
}

export function NotesList({ bits, topicId }: { bits: NoteBit[]; topicId?: string }) {
  return (
    <ol className="note-list">
      {bits.map((bit, index) => {
        const { rule, rest } = parts(bit.idea);
        const figure = figureFor(topicId, index);
        return (
          <li className="note-card" key={index}>
            <p className="note-rule" lang={langOf(rule)}>
              <span className="note-num">{index + 1}</span>
              {rule}
            </p>
            {rest ? <p className="note-rest" lang={langOf(rest)}>{rest}</p> : null}
            {figure ? <Figure name={figure} /> : null}
            {bit.example ? (
              <p className="note-example" lang={langOf(bit.example)}>
                <span className="note-tag">Example</span>
                {bit.example}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
