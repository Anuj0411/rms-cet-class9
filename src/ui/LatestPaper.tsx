import { patternLines, retakeOf, testBrief } from "../analysis.ts";
import type { Attempt } from "../types.ts";
import { langOf } from "./lang.ts";

function when(at: number) {
  return new Date(at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function LatestPaper({ attempts, sync }: { attempts: Attempt[]; sync: string }) {
  const latest = [...attempts].sort((left, right) => right.submittedAt - left.submittedAt)[0];
  const earlier = latest ? retakeOf(attempts).get(latest.id) ?? null : null;
  const test = latest ? testBrief(latest, earlier) : null;
  const patterns = test ? patternLines(test.questions, test.watched) : [];

  return (
    <section className="card" id="latest-paper">
      <p className="eyebrow">Last test</p>
      {sync === "loading" && !test ? <p>Checking the saved papers.</p> : null}
      {!test && sync !== "loading" ? <p>No paper has been submitted yet.</p> : null}
      {test ? (
        <>
          <h2 lang={langOf(test.title)}>{test.title}</h2>
          <p>Finished {when(test.submittedAt)}</p>
          <p className="latest-score">{test.score}/{test.total} · {test.percent}%</p>
          {test.retake ? <p className="quiet">This is a redo of the {test.earlier} sitting a few minutes earlier.</p> : null}
          <p className="eyebrow">Patterns</p>
          {patterns.length ? (
            <ul className="pattern-list">
              {patterns.map((line) => <li key={line}>{line}</li>)}
            </ul>
          ) : (
            <p>Nothing to flag on this paper.</p>
          )}
          {test.watched ? null : <p className="quiet">Leaving the screen, selecting the question, and screenshots were not recorded on this paper.</p>}
        </>
      ) : null}
    </section>
  );
}
