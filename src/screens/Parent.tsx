import { allTopics, SUBJECT_LABEL, topicAccuracy } from "../catalog.ts";
import { formatDay, PLAN } from "../plan.ts";
import { isDone, istNow, planWatch, type AttemptStamp } from "../remind.ts";
import { SyncLine } from "../SyncLine.tsx";
import { useState } from "react";
import { resetAttempt, resetOpenPaper, useAttempts, useOpenPaper } from "../storage.ts";
import type { Attempt, OpenPaper, Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { timeLeft } from "../time.ts";
import { Reminders } from "../ui/Reminders.tsx";
import { YesterdayCard } from "../ui/Revision.tsx";

const ORDER: Subject[] = ["maths", "science", "english", "hindi", "sst"];

export function Parent() {
  const { attempts, sync, error } = useAttempts();
  const { paper: openPaper, ready: openReady } = useOpenPaper();
  const [pending, setPending] = useState<
    | { kind: "attempt"; attempt: Attempt }
    | { kind: "live"; paper: OpenPaper }
    | null
  >(null);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState("");
  const today = istNow().day;
  const stamps: AttemptStamp[] = attempts.map((attempt) => ({ testId: attempt.testId, submittedAt: attempt.submittedAt }));
  const required = PLAN.filter((entry) => entry.required && entry.kind === "test" && entry.testId);
  const planDone = required.filter((entry) => isDone(entry, stamps, entry.date)).length;
  const planPercent = required.length ? Math.round((planDone / required.length) * 100) : 0;
  const left = timeLeft(new Date());
  const stats = topicAccuracy(attempts);
  const started = new Set(stats.map((row) => row.topicId));
  const topics = allTopics();
  const weak = stats.filter((row) => row.seen >= 4 && row.rate < 0.7).sort((a, b) => a.rate - b.rate);
  const missed = PLAN.filter((entry) => entry.required && entry.kind === "test" && entry.date < today && entry.testId && !isDone(entry, stamps, entry.date));
  const watch = planWatch(stamps, today);
  const ahead = PLAN.filter((entry) => entry.date >= today).slice(0, 5);
  const mocks = attempts.filter((attempt) => attempt.testId.startsWith("mock-")).sort((a, b) => b.submittedAt - a.submittedAt);
  const recent = [...attempts].sort((a, b) => b.submittedAt - a.submittedAt).slice(0, 8);
  const name = attempts[0]?.studentName;
  const open = openPaper?.open ? openPaper : null;

  async function confirmReset() {
    if (!pending) return;
    setResetting(true);
    setResetError("");
    try {
      if (pending.kind === "attempt") await resetAttempt(pending.attempt);
      else await resetOpenPaper(pending.paper);
      setPending(null);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : "Could not reset that paper.");
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="stack">
      <header className="hello">
        <div>
          <p>Parent report</p>
          <h1>{name ? `${name}'s progress` : "Progress"}</h1>
        </div>
      </header>

      <Reminders role="parent" />

      <section className="stat-row" aria-label="Progress">
        <div className="stat">
          <strong>{planPercent}%</strong>
          <span>Plan done</span>
        </div>
        <div className="stat">
          <strong>{left.over ? 0 : left.days}</strong>
          <span>Days left</span>
        </div>
        <div className="stat">
          <strong>{started.size}/{topics.length}</strong>
          <span>Topics tried</span>
        </div>
      </section>

      <section className="card">
        <h2>Detailed report</h2>
        <p>Every question, then each test, then the full picture across Paper 1 and Paper 2.</p>
        <a className="button block" href="#/report">Open the report</a>
      </section>

      {sync === "loading" ? null : <YesterdayCard attempts={attempts} today={today} />}

      <section className="card">
        <p className="eyebrow">{planDone} of {required.length} required tests</p>
        <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={planPercent} aria-label="Required plan finished">
          <i style={{ width: `${planPercent}%` }} />
        </div>
        {sync === "loading" ? null : (
          <>
            <p>{watch.remaining.length} required {watch.remaining.length === 1 ? "test is" : "tests are"} still left.</p>
            {watch.missingDays.length === 0 ? (
              <p>Every plan day so far has at least one submitted paper.</p>
            ) : (
              <p>{watch.missingDays.map((day) => formatDay(day)).join(", ")} — no paper was submitted.</p>
            )}
          </>
        )}
        <p className="quiet">A result he submits on his phone appears here, with the finish time and the seconds on each question.</p>
        <SyncLine sync={sync} error={error} audience="parent" />
      </section>

      <section className="card">
        <h2>Weak topics</h2>
        {weak.length === 0 ? (
          <p>None yet. A topic shows here after at least four answers, if he is under 70%.</p>
        ) : (
          <ul className="weak-list">
            {weak.map((row) => (
              <li key={row.topicId}>
                <div className="weak-row">
                  <span className="weak-rate">{Math.round(row.rate * 100)}%</span>
                  <span className="weak-copy">
                    <strong lang={langOf(row.title)}>{row.title}</strong>
                    <small>
                      {row.subject ? SUBJECT_LABEL[row.subject] : ""} · {row.correct}/{row.seen} right
                    </small>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Still to start</h2>
        <ul className="remain-list">
          {ORDER.map((subject) => {
            const items = topics.filter((topic) => topic.subject === subject);
            const leftCount = items.filter((topic) => !started.has(topic.id)).length;
            return (
              <li key={subject}>
                <span>{SUBJECT_LABEL[subject]}</span>
                <strong>{leftCount} left</strong>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="card">
        <h2>Missed</h2>
        {missed.length === 0 ? <p>No required test from a past day is missing.</p> : (
          <ul className="remain-list">
            {missed.map((entry) => (
              <li key={`${entry.date}-${entry.testId}`}>
                <span lang={langOf(entry.title)}>{entry.title}</span>
                <strong>{formatDay(entry.date)}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Coming up</h2>
        {ahead.length === 0 ? <p>The written plan is finished.</p> : (
          <ul className="remain-list">
            {ahead.map((entry) => (
              <li key={`${entry.date}-${entry.title}`}>
                <span lang={langOf(entry.title)}>{entry.title}</span>
                <strong>{formatDay(entry.date)}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Open paper</h2>
        {!openReady ? <p className="quiet">Checking his phone.</p> : open ? (
          <>
            <p lang={langOf(open.title)}>{open.title} is open on his phone.</p>
            <p className="quiet">Started {new Date(open.startedAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}.</p>
            <button
              className="button ghost block"
              type="button"
              onClick={() => {
                setResetError("");
                setPending({ kind: "live", paper: open });
              }}
            >
              Reset this open paper
            </button>
          </>
        ) : (
          <p>No paper is open on his phone. A paper he starts shows here, so you can clear it if it was opened by mistake.</p>
        )}
      </section>

      <section className="card">
        <h2>Mock papers</h2>
        {mocks.length === 0 ? <p>No full mock yet. Paper 1 and Paper 2 each need 50%.</p> : mocks.map((attempt) => (
          <div key={attempt.id} className="mock-row">
            <strong>{attempt.testTitle}</strong>
            <span>{new Date(attempt.submittedAt).toLocaleString("en-IN")}</span>
            <div className="qualify-grid">
              <Qualify label="Paper 1" score={attempt.paper1Score} total={attempt.paper1Total} />
              <Qualify label="Paper 2" score={attempt.paper2Score} total={attempt.paper2Total} />
            </div>
            <div className="row-actions">
              <a className="button ghost" href={`#/review/${attempt.id}`}>Analysis</a>
              <button className="text-reset" type="button" onClick={() => { setResetError(""); setPending({ kind: "attempt", attempt }); }}>
                Reset
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="card">
        <h2>Recent tests</h2>
        <AttemptList
          attempts={recent}
          onReset={(attempt) => {
            setResetError("");
            setPending({ kind: "attempt", attempt });
          }}
        />
      </section>
      {pending ? (
        <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="reset-title">
          <div className="card sheet-card">
            <h2 id="reset-title">{pending.kind === "live" ? "Reset the open paper?" : "Reset this paper?"}</h2>
            <p>
              {pending.kind === "live"
                ? `${pending.paper.title} is open on his phone. Resetting it clears that sitting. He can start it again. Submitted scores stay.`
                : `${pending.attempt.testTitle} comes off the score list. He can take it again. His other papers stay.`}
            </p>
            {resetError ? <p className="note">{resetError}</p> : null}
            <div className="stack tight">
              <button type="button" className="button ghost block" onClick={() => setPending(null)} disabled={resetting}>
                Keep it
              </button>
              <button type="button" className="button block" onClick={() => void confirmReset()} disabled={resetting}>
                {resetting ? "Resetting" : "Reset paper"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
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

function AttemptList({ attempts, onReset }: { attempts: Attempt[]; onReset: (attempt: Attempt) => void }) {
  if (attempts.length === 0) return <p>No test has been submitted yet.</p>;
  return (
    <ul className="remain-list">
      {attempts.map((attempt) => (
        <li key={attempt.id}>
          <span lang={langOf(attempt.testTitle)}>
            {attempt.testTitle}
            <small>
              Finished {new Date(attempt.submittedAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
              })}
              {" · "}
              {attempt.score}/{attempt.total}
              {attempt.total ? ` · ${Math.round((attempt.score / attempt.total) * 100)}%` : ""}
            </small>
          </span>
          <span className="row-actions">
            <a href={`#/review/${attempt.id}`}>Analysis</a>
            <button className="text-reset" type="button" onClick={() => onReset(attempt)}>Reset</button>
          </span>
        </li>
      ))}
    </ul>
  );
}
