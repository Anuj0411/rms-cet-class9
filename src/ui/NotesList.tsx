import type { NoteBit } from "../notes/types.ts";
import { langOf } from "./lang.ts";

export function NotesList({ bits }: { bits: NoteBit[] }) {
  return (
    <ol className="note-list">
      {bits.map((bit, index) => (
        <li key={index}>
          <p lang={langOf(bit.idea)}>{bit.idea}</p>
          {bit.example ? (
            <p className="note-example" lang={langOf(bit.example)}>
              <span className="note-tag">Example</span>
              {bit.example}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
