import { useState } from "react";
import { getRole } from "../auth.ts";
import { allTopics, SUBJECT_LABEL, topicAccuracy } from "../catalog.ts";
import { formatDay, PLAN, todayISO } from "../plan.ts";
import { SyncLine } from "../SyncLine.tsx";
import { parentUnlocked, unlockParent, useAttempts } from "../storage.ts";
import type { Attempt, Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { TimeLeft } from "../ui/TimeLeft.tsx";

export function Parent() {
  const [open, setOpen] = useState(() => getRole() === "parent" || parentUnlocked());
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { attempts, sync, error: syncError } = useAttempts();

  if (!open) {
    return (
      <section className="card">
        <p className="eyebrow">For a parent</p>
        <h1>Parent report</h1>
        <p>This page is for you, not for the test. Enter the family PIN.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (unlockParent(pin)) setOpen(true);
            else setError("That PIN is not right.");
          }}
        >
          <label className="field">
            Family PIN
            <input
              className="pin-input"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              inputMode="numeric"
              autoComplete="off"
            />
          </label>
          {error ? <p className="note">{error}</p> : null}
          <button className="button block" type="submit">Open the report</button>
        </form>
      </section>
    );
  }

  if (sync === "loading" && attempts.length === 0) {
    return (
      <div className="stack">
        <TimeLeft />
        <section className="card">
          <h1>Parent report</h1>
          <p>Loading scores from Firebase.</p>
          <SyncLine sync={sync} error={syncError} />
        </section>
      </div>
    );
  }

  const stats = topicAccuracy(attempts);
  const weak = stats.filter((row) => row.seen >= 4 && row.rate < 0.7);
  const started = new Set(stats.map((row) => row.topicId));
  const missing = allTopics().filter((topic) => !started.has(topic.id));
  const today = todayISO();
  const missed = PLAN.filter((entry) => entry.required && entry.kind === "test" && entry.date < today && entry.testId && !attempts.some((attempt) => attempt.testId === entry.testId));
  const mocks = attempts.filter((attempt) => attempt.testId.startsWith("mock-"));
  const latestName = attempts[0]?.studentName;

  return (
    <div className="stack">
      <TimeLeft />
      <section className="card">
        <p className="eyebrow">Same list on every phone</p>
        <h1>{latestName ? `${latestName}'s scores` : "Scores"}</h1>
        <p>
          {attempts.length} test{attempts.length === 1 ? "" : "s"} saved.
          Open this page on your phone. A result he submits on his phone appears here.
        </p>
        {attempts[0] ? (
          <p className="latest-score">
            <strong>
              {attempts[0].score}/{attempts[0].total}
              {attempts[0].total ? ` · ${Math.round((attempts[0].score / attempts[0].total) * 100)}%` : ""}
            </strong>
            <span lang={langOf(attempts[0].testTitle)}>{attempts[0].testTitle}</span>
          </p>
        ) : null}
        <SyncLine sync={sync} error={syncError} />
      </section>

      <section className="card">
        <p className="eyebrow">50% to qualify</p>
        <h2>Mock papers</h2>
        {mocks.length === 0 ? <p>No full mock yet. The 50% line appears after mock 1, 2, or 3.</p> : null}
        {mocks
          .slice()
          .sort((a, b) => b.submittedAt - a.submittedAt)
          .map((attempt, index) => (
            <div key={attempt.id} className={index === 0 ? "mock-row latest" : "mock-row"}>
              <strong>{attempt.testTitle}</strong>
              <span>{attempt.studentName} · {new Date(attempt.submittedAt).toLocaleString("en-IN")}</span>
              <div className="qualify-grid">
                <Qualify label="Paper 1" score={attempt.paper1Score} total={attempt.paper1Total} />
                <Qualify label="Paper 2" score={attempt.paper2Score} total={attempt.paper2Total} />
              </div>
              <a className="button ghost" href={`#/review/${attempt.id}`}>Review</a>
            </div>
          ))}
      </section>

      <details className="fold">
        <summary>Below 70% · {weak.length}</summary>
        {weak.length === 0 ? <p>No topic with at least four answers is under 70%.</p> : null}
        <ul className="weak-list">
          {weak
            .sort((a, b) => a.rate - b.rate)
            .map((row) => (
              <li key={row.topicId}>
                <a className="weak-row" href={`#/test/${row.topicId}`}>
                  <span className="weak-rate">{Math.round(row.rate * 100)}%</span>
                  <span className="weak-copy">
                    <strong lang={langOf(row.title)}>{row.title}</strong>
                    <small>
                      {row.subject ? SUBJECT_LABEL[row.subject as Subject] : ""} · {row.seen} answered · {Math.round(row.seconds / Math.max(row.seen, 1))}s each
                    </small>
                  </span>
                </a>
              </li>
            ))}
        </ul>
      </details>

      <details className="fold">
        <summary>Every attempt · {attempts.length}</summary>
        <AttemptTable attempts={[...attempts].sort((a, b) => b.submittedAt - a.submittedAt)} />
      </details>

      <details className="fold" open={missed.length > 0}>
        <summary>Missed required tests · {missed.length}</summary>
        {missed.length === 0 ? <p>Every required test on a past day has an attempt.</p> : null}
        <ul className="plan-list">
          {missed.map((entry) => (
            <li key={`${entry.date}-${entry.testId}`}>
              <div>
                <strong lang={langOf(entry.title)}>{formatDay(entry.date)} · {entry.title}</strong>
                <span>{entry.detail}</span>
              </div>
              <a className="button" href={`#/test/${entry.testId}`}>Open</a>
            </li>
          ))}
        </ul>
      </details>

      <details className="fold">
        <summary>Not started · {missing.length}</summary>
        {missing.length === 0 ? <p>Every topic has at least one answer.</p> : null}
        <ul className="topic-grid">
          {missing.map((topic) => (
            <li key={topic.id}>
              <a className="topic-card" href={`#/test/${topic.id}`}>
                <span className="topic-copy">
                  <span className="topic-title" lang={langOf(topic.title)}>{topic.title}</span>
                  <span className="topic-meta">{SUBJECT_LABEL[topic.subject]}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function Qualify({ label, score, total }: { label: string; score: number | null; total: number | null }) {
  if (!total) return null;
  const value = score ?? 0;
  const clear = value / total >= 0.5;
  return (
    <div className={clear ? "qualify-tile yes" : "qualify-tile no"}>
      <p className="tile-label">{label}</p>
      <strong>{value}/{total}</strong>
      <p className="tile-result">{clear ? "Clears 50%" : "Below 50%"}</p>
    </div>
  );
}

function AttemptTable({ attempts }: { attempts: Attempt[] }) {
  if (attempts.length === 0) return <p>No attempts in Firebase yet.</p>;
  return (
    <ul className="plan-list">
      {attempts.map((attempt) => (
        <li key={attempt.id}>
          <div>
            <strong lang={langOf(attempt.testTitle)}>{attempt.testTitle}</strong>
            <span className="attempt-score">
              {attempt.score}/{attempt.total}
              {attempt.total ? ` · ${Math.round((attempt.score / attempt.total) * 100)}%` : ""}
            </span>
            <span>
              {attempt.studentName} · {Math.round(attempt.durationSec / 60)} min · {new Date(attempt.submittedAt).toLocaleString("en-IN")}
            </span>
          </div>
          <a className="button ghost" href={`#/review/${attempt.id}`}>Review</a>
        </li>
      ))}
    </ul>
  );
}
