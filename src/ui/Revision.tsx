import { dayRevision, previousDay, summaryLines, type AttemptReport, type RevisionCard } from "../analysis.ts";
import { SUBJECT_LABEL } from "../catalog.ts";
import { formatDay } from "../plan.ts";
import type { Attempt } from "../types.ts";
import { langOf } from "./lang.ts";

function splitRule(idea: string) {
  const cut = idea.search(/[.।](\s|$)/);
  if (cut < 0 || cut > 180) return { rule: idea, rest: "" };
  return { rule: idea.slice(0, cut + 1), rest: idea.slice(cut + 1).trim() };
}

export function RevisionNotes({ notes, empty }: { notes: RevisionCard[]; empty?: string }) {
  if (notes.length === 0) return <p>{empty ?? "Every question was right. There is nothing to revise from this paper."}</p>;
  return (
    <ol className="note-list">
      {notes.map((note, index) => {
        const { rule, rest } = splitRule(note.rule);
        return (
          <li className="note-card" key={note.questionId}>
            <p className="note-rule" lang={langOf(rule)}>
              <span className="note-num">{index + 1}</span>
              {rule}
            </p>
            {rest ? <p className="note-rest" lang={langOf(rest)}>{rest}</p> : null}
            {note.example ? (
              <p className="note-example" lang={langOf(note.example)}>
                <span className="note-tag">Example</span>
                {note.example}
              </p>
            ) : null}
            <p className="note-rest" lang={langOf(note.stem)}>{note.stem}</p>
            <p className="mark-line" lang={langOf(`${note.chosenLabel} ${note.correctLabel}`)}>
              <b>Marked</b> {note.chosenLabel}
              <br />
              <b>Answer</b> {note.correctLabel}
            </p>
            <p className="quiet">
              {SUBJECT_LABEL[note.subject]} · question {note.index + 1}
              {note.sameValue ? " · same value" : ""}
              {note.repaired ? " · right on a later paper" : ""}
              {" · "}
              <a href={`#/notes/${note.topicId}`} lang={langOf(note.topicTitle)}>{note.topicTitle}</a>
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export function AttemptAnalysis({ report }: { report: AttemptReport }) {
  const lines = summaryLines(report);
  const notes = report.misses.filter((miss) => !miss.sameValue);
  const same = report.misses.filter((miss) => miss.sameValue);
  return (
    <>
      <section className="card">
        <h2>How this paper went</h2>
        {lines.map((line) => <p key={line}>{line}</p>)}
        <div className="topic-meters">
          {report.topics.map((topic) => {
            const rate = topic.total ? Math.round((topic.correct / topic.total) * 100) : 0;
            return (
              <div className="topic-meter" key={topic.topicId}>
                <p>
                  <span lang={langOf(topic.title)}>{topic.title}</span>
                  <strong>{topic.correct}/{topic.total}</strong>
                </p>
                <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={rate} aria-label={topic.title}>
                  <i style={{ width: `${rate}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="card">
        <h2>Revision notes</h2>
        <p className="quiet">Taken from this paper's misses and the topic notes. A new paper builds a new set.</p>
        <RevisionNotes notes={notes} />
        {same.length ? (
          <>
            <h2>Same value</h2>
            <RevisionNotes notes={same} />
          </>
        ) : null}
      </section>
    </>
  );
}

export function YesterdayCard({ attempts, today }: { attempts: Attempt[]; today: string }) {
  const revision = dayRevision(attempts, previousDay(today));
  const study = revision.notes.filter((note) => !note.sameValue);
  const title = formatDay(revision.day);
  return (
    <section className="card">
      <p className="eyebrow">{title}</p>
      <h2>Revision from yesterday</h2>
      {revision.papers.length === 0 ? (
        <p>No paper was submitted yesterday. The notes appear here after a paper is submitted.</p>
      ) : (
        <>
          <p>
            {study.length
              ? `${revision.papers.length} ${revision.papers.length === 1 ? "paper" : "papers"}, ${study.length} ${study.length === 1 ? "note" : "notes"} from the misses.`
              : `${revision.papers.length} ${revision.papers.length === 1 ? "paper" : "papers"}. Every question was right.`}
          </p>
          <a className="button block" href="#/revise">Open yesterday's notes</a>
        </>
      )}
    </section>
  );
}
