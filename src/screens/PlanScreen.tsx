import { useEffect, useState } from "react";
import { formatDay, parseISO, PLAN, todayISO, WEEKS } from "../plan.ts";
import { useAttempts } from "../storage.ts";
import { langOf } from "../ui/lang.ts";

export function PlanScreen() {
  const { attempts } = useAttempts();
  const done = new Set(attempts.map((attempt) => attempt.testId));
  const today = todayISO();
  const [picked, setPicked] = useState(today);
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
      <Month picked={picked} today={today} onPick={setPicked} />
      <DayList date={picked} done={done} />
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

const DOW = ["M", "T", "W", "T", "F", "S", "S"];

function Month({ picked, today, onPick }: { picked: string; today: string; onPick: (iso: string) => void }) {
  const [cursor, setCursor] = useState(() => parseISO(today));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: Array<string | null> = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from({ length: days }, (_, index) => {
      const day = String(index + 1).padStart(2, "0");
      const monthText = String(month + 1).padStart(2, "0");
      return `${year}-${monthText}-${day}`;
    }),
  ];
  const label = first.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  return (
    <section className="card">
      <div className="cal-head">
        <button type="button" aria-label="Previous month" onClick={() => setCursor(new Date(year, month - 1, 1))}>‹</button>
        <strong>{label}</strong>
        <button type="button" aria-label="Next month" onClick={() => setCursor(new Date(year, month + 1, 1))}>›</button>
      </div>
      <div className="calendar">
        {DOW.map((name, index) => <span className="dow" key={`${name}-${index}`}>{name}</span>)}
        {cells.map((iso, index) => iso ? (
          <button
            key={iso}
            type="button"
            className={[
              iso === picked ? "on" : "",
              iso === "2026-12-13" ? "exam" : "",
              PLAN.some((entry) => entry.date === iso) ? "has" : "",
            ].filter(Boolean).join(" ")}
            onClick={() => onPick(iso)}
          >
            {Number(iso.slice(-2))}
          </button>
        ) : <span key={`pad-${index}`} />)}
      </div>
    </section>
  );
}

function DayList({ date, done }: { date: string; done: Set<string> }) {
  const items = PLAN.filter((entry) => entry.date === date);
  return (
    <section className="card">
      <h2>{formatDay(date)}</h2>
      {items.length === 0 ? <p className="quiet">Nothing is scheduled this day.</p> : (
        <ul className="plan-list">
          {items.map((entry) => (
            <li key={`${entry.title}-${entry.testId ?? ""}`}>
              <div>
                <strong lang={langOf(entry.title)}>{entry.title}</strong>
                <span>{entry.detail}{entry.required ? " · required" : ""}</span>
              </div>
              {entry.kind === "test" && entry.testId ? (
                <a className="button" href={`#/test/${entry.testId}`}>{done.has(entry.testId) ? "Done" : "Open"}</a>
              ) : null}
              {entry.kind === "formula" ? <a className="button" href="#/formulas">Sheet</a> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
