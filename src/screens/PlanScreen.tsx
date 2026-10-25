import { useEffect } from "react";
import { formatDay, PLAN, todayISO, WEEKS } from "../plan.ts";
import { useAttempts } from "../storage.ts";
import { langOf } from "../ui/lang.ts";

export function PlanScreen() {
  const { attempts } = useAttempts();
  const done = new Set(attempts.map((attempt) => attempt.testId));
  const today = todayISO();
  useEffect(() => {
    const openAll = () => {
      document.querySelectorAll("details.fold").forEach((item) => item.setAttribute("open", ""));
    };
    window.addEventListener("beforeprint", openAll);
    return () => window.removeEventListener("beforeprint", openAll);
  }, []);
  return (
    <div className="stack">
      <section className="card">
        <p className="eyebrow">New topics finish 22 November</p>
        <h1>Daily plan</h1>
        <p>
          The first test of the day is the one that matters. The last full paper is 2 December.
          From 3 December to 12 December he only revises: missed questions, weak topics, and the formula sheet. The exam is 13 December.
        </p>
        {PLAN[0] && today < PLAN[0].date ? (
          <p className="note">The plan starts {formatDay(PLAN[0].date)}. Nothing is scheduled before that.</p>
        ) : null}
        <button type="button" className="button ghost" onClick={() => window.print()}>
          Print this plan
        </button>
      </section>
      {WEEKS.map((week) => (
        <details className="fold week" key={week.start} name="weeks" open={today >= week.start && today <= week.end}>
          <summary>{week.title}</summary>
          <ul className="plan-list">
            {PLAN.filter((entry) => entry.date >= week.start && entry.date <= week.end).map((entry) => (
              <li key={`${entry.date}-${entry.title}`} className={entry.date === today ? "is-today" : undefined}>
                <div>
                  <strong lang={langOf(`${formatDay(entry.date)} ${entry.title}`)}>
                    {formatDay(entry.date)} · {entry.title}
                  </strong>
                  <span>{entry.detail}{entry.required ? " · required" : ""}</span>
                </div>
                {entry.kind === "test" && entry.testId ? (
                  <a className="button" href={`#/test/${entry.testId}`}>
                    {done.has(entry.testId) ? "Done" : "Open"}
                  </a>
                ) : null}
                {entry.kind === "formula" ? <a className="button" href="#/formulas">Sheet</a> : null}
              </li>
            ))}
          </ul>
        </details>
      ))}
      <section className="card">
        <h2>13 December · written exam</h2>
        <p>Reach the centre early. No watch, no phone, no calculator. Attempt every bubble. Paper 1 and Paper 2 are both out of 100, and each needs 50.</p>
      </section>
    </div>
  );
}
