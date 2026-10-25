import { allTopics, SUBJECT_LABEL, topicAccuracy } from "../catalog.ts";
import { formatDay, PLAN } from "../plan.ts";
import { isDone, istNow, type AttemptStamp } from "../remind.ts";
import { SyncLine } from "../SyncLine.tsx";
import { useAttempts } from "../storage.ts";
import type { Attempt, Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { timeLeft } from "../time.ts";
import { Reminders } from "../ui/Reminders.tsx";

const ORDER: Subject[] = ["maths", "science", "english", "hindi", "sst"];

export function Parent() {
  const { attempts, sync, error } = useAttempts();
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
  const ahead = PLAN.filter((entry) => entry.date >= today).slice(0, 5);
  const mocks = attempts.filter((attempt) => attempt.testId.startsWith("mock-")).sort((a, b) => b.submittedAt - a.submittedAt);
  const recent = [...attempts].sort((a, b) => b.submittedAt - a.submittedAt).slice(0, 8);
  const name = attempts[0]?.studentName;

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
        <p className="eyebrow">{planDone} of {required.length} required tests</p>
        <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={planPercent} aria-label="Required plan finished">
          <i style={{ width: `${planPercent}%` }} />
        </div>
        <p className="quiet">A result he submits on his phone appears here.</p>
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
        <h2>Mock papers</h2>
        {mocks.length === 0 ? <p>No full mock yet. Paper 1 and Paper 2 each need 50%.</p> : mocks.map((attempt) => (
          <div key={attempt.id} className="mock-row">
            <strong>{attempt.testTitle}</strong>
            <span>{new Date(attempt.submittedAt).toLocaleString("en-IN")}</span>
            <div className="qualify-grid">
              <Qualify label="Paper 1" score={attempt.paper1Score} total={attempt.paper1Total} />
              <Qualify label="Paper 2" score={attempt.paper2Score} total={attempt.paper2Total} />
            </div>
            <a className="button ghost" href={`#/review/${attempt.id}`}>See the answers</a>
          </div>
        ))}
      </section>

      <section className="card">
        <h2>Recent tests</h2>
        <AttemptList attempts={recent} />
      </section>
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

function AttemptList({ attempts }: { attempts: Attempt[] }) {
  if (attempts.length === 0) return <p>No test has been submitted yet.</p>;
  return (
    <ul className="remain-list">
      {attempts.map((attempt) => (
        <li key={attempt.id}>
          <span lang={langOf(attempt.testTitle)}>
            {attempt.testTitle}
            <small>
              {attempt.score}/{attempt.total}
              {attempt.total ? ` · ${Math.round((attempt.score / attempt.total) * 100)}%` : ""}
            </small>
          </span>
          <a href={`#/review/${attempt.id}`}>Answers</a>
        </li>
      ))}
    </ul>
  );
}
