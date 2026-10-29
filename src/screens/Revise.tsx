import { dayRevision, previousDay } from "../analysis.ts";
import { formatDay } from "../plan.ts";
import { istNow } from "../remind.ts";
import { SyncLine } from "../SyncLine.tsx";
import { useAttempts } from "../storage.ts";
import { langOf } from "../ui/lang.ts";
import { RevisionNotes } from "../ui/Revision.tsx";

export function Revise() {
  const { attempts, sync, error } = useAttempts();
  const today = istNow().day;
  const revision = dayRevision(attempts, previousDay(today));
  const study = revision.notes.filter((note) => !note.sameValue);
  const same = revision.notes.filter((note) => note.sameValue);

  return (
    <div className="stack">
      <section className="card">
        <a className="back" href="#/">Back</a>
        <p className="eyebrow">{formatDay(revision.day)}</p>
        <h1>Revision from yesterday</h1>
        <p className="lede">Built from the papers submitted that day. It changes on its own after the next paper.</p>
        <SyncLine sync={sync} error={error} />
      </section>
      {sync === "loading" ? null : revision.papers.length === 0 ? (
        <section className="card">
          <p>No paper was submitted yesterday.</p>
        </section>
      ) : (
        <>
          <section className="card">
            <h2>Papers</h2>
            <ul className="remain-list">
              {revision.papers.map((paper) => (
                <li key={paper.id}>
                  <span lang={langOf(paper.title)}>
                    {paper.title}
                    <small>{paper.score}/{paper.total} · {paper.percent}%</small>
                  </span>
                  <a href={`#/review/${paper.id}`}>Analysis</a>
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <h2>Notes</h2>
            <RevisionNotes notes={study} empty="Every question was right." />
          </section>
          {same.length ? (
            <section className="card">
              <h2>Same value</h2>
              <p className="quiet">The marked option and the answer are the same number, written differently.</p>
              <RevisionNotes notes={same} />
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
