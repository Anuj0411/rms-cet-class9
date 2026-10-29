import { useState } from "react";
import { allTopics, SUBJECT_LABEL } from "../catalog.ts";
import { formatDay, parseISO, PLAN, todayISO, type PlanEntry } from "../plan.ts";
import { isDone, istNow, studyLinks } from "../remind.ts";
import { SyncLine } from "../SyncLine.tsx";
import { getName, setName, useAttempts } from "../storage.ts";
import { timeLeft } from "../time.ts";
import type { Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { Reminders } from "../ui/Reminders.tsx";
import { YesterdayCard } from "../ui/Revision.tsx";
import { TimeLeft } from "../ui/TimeLeft.tsx";

const ORDER: Subject[] = ["maths", "science", "english", "hindi", "sst"];
const TINT = ["lilac", "mint", "sun", "peach", "lilac"] as const;
const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TINTS = ["lilac", "mint", "sun", "peach"] as const;

function TargetCard({ entry, done, tint }: { entry: PlanEntry; done: boolean; tint: (typeof TINTS)[number] }) {
  const { notes, test } = studyLinks(entry, done);
  return (
    <article className={`target-card ${tint}`}>
      <p className="learn-kicker">{entry.kind === "test" ? (done ? "Done" : "To do") : "Today"} · {entry.detail}</p>
      <p className="learn-title" lang={langOf(entry.title)}>{entry.title}</p>
      {notes || test ? (
        <div className="target-actions">
          {notes ? <a className="button ghost" href={notes.href}>{notes.label}</a> : null}
          {test ? <a className="button" href={test.href}>{test.label}</a> : null}
        </div>
      ) : null}
    </article>
  );
}

export function Home() {
  const [name, setLocalName] = useState(getName());
  const [naming, setNaming] = useState(() => getName().trim().length < 2);
  const [openSubject, setOpenSubject] = useState<Subject | null>(null);
  const today = istNow().day;
  const todayPlan = PLAN.filter((entry) => entry.date === today);
  const { attempts, sync, error } = useAttempts();
  const stamps = attempts.map((attempt) => ({ testId: attempt.testId, submittedAt: attempt.submittedAt }));
  const done = new Set(attempts.map((attempt) => attempt.testId));
  const topics = allTopics();
  const required = PLAN.filter((entry) => entry.required && entry.testId);
  const finished = required.filter((entry) => entry.testId && done.has(entry.testId)).length;
  const percent = required.length ? Math.round((finished / required.length) * 100) : 0;
  const left = timeLeft(new Date());
  const weekStart = parseISO(today);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const week = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + index);
    const iso = todayISO(day);
    return { iso, label: DAY[index], count: PLAN.filter((entry) => entry.date === iso).length, today: iso === today };
  });
  const peak = Math.max(1, ...week.map((day) => day.count));

  function keepName(value: string) {
    const trimmed = value.trim();
    setLocalName(trimmed);
    setName(trimmed);
    if (trimmed.length > 1) setNaming(false);
  }

  const nameField = (
    <label className="field">
      Your name
      <input
        value={name}
        autoFocus
        onChange={(event) => setLocalName(event.target.value)}
        onBlur={(event) => keepName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            keepName(name);
          }
        }}
        placeholder="Name used on the report"
        autoComplete="name"
      />
    </label>
  );

  return (
    <div className="stack">
      <header className="hello">
        <div>
          <p>{name.trim() ? `Hello, ${name.trim()}` : "Hello"}</p>
          <h1>Today</h1>
        </div>
      </header>
      <div className="progress-line-home">
        <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Plan finished">
          <i style={{ width: `${percent}%` }} />
        </div>
        <span>{percent}%</span>
      </div>

      {naming ? (
        <section className="card">
          <p className="lede">Add your name. It is the name on the score list.</p>
          {nameField}
        </section>
      ) : null}

      {sync === "loading" ? null : <YesterdayCard attempts={attempts} today={today} />}

      {todayPlan.length ? (
        <div className="stack">
          <p className="quiet">Today's target. Read the notes, then start the test.</p>
          {todayPlan.map((entry, index) => (
            <TargetCard
              key={`${entry.title}-${entry.testId ?? ""}`}
              entry={entry}
              done={isDone(entry, stamps, today)}
              tint={TINTS[index % TINTS.length]}
            />
          ))}
        </div>
      ) : (
        <a className="learn-card lilac" href="#/plan">
          <span className="learn-kicker">{formatDay(today)}</span>
          <span className="learn-title">Nothing is scheduled today</span>
          <span className="go" aria-hidden="true" />
        </a>
      )}

      <section className="stat-row" aria-label="Prep snapshot">
        <div className="stat">
          <strong>{finished}</strong>
          <span>Plan done</span>
        </div>
        <div className="stat">
          <strong>{left.over ? 0 : left.days}</strong>
          <span>Days left</span>
        </div>
        <div className="stat">
          <strong>{topics.filter((topic) => done.has(topic.id)).length}</strong>
          <span>Topics tried</span>
        </div>
      </section>

      <Reminders role="student" />

      <TimeLeft />

      <section className="card">
        <h2>This week</h2>
        <div className="week-bars" aria-label="Tasks on each day this week">
          {week.map((day) => (
            <div key={day.iso} className={day.today ? "is-today" : undefined}>
              <i style={{ height: `${Math.max(14, Math.round((day.count / peak) * 88))}px` }} />
              <span>{day.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stack">
        <h2>Subjects</h2>
        {ORDER.map((subject, index) => {
          const items = topics.filter((topic) => topic.subject === subject);
          const attempted = items.filter((topic) => done.has(topic.id)).length;
          const open = openSubject === subject;
          return (
            <div key={subject}>
              <button
                type="button"
                className={`learn-card ${TINT[index]}`}
                aria-expanded={open}
                onClick={() => setOpenSubject(open ? null : subject)}
                style={{ width: "100%", textAlign: "left", border: 0, cursor: "pointer" }}
              >
                <span className="learn-kicker">{attempted}/{items.length} tried</span>
                <span className="learn-title">{SUBJECT_LABEL[subject]}</span>
                <span className="go" aria-hidden="true" />
              </button>
              {open ? (
                <ul className="topic-grid">
                  {items.map((topic) => (
                    <li key={topic.id}>
                      <a className={done.has(topic.id) ? "topic-card done" : "topic-card"} href={`#/test/${topic.id}`}>
                        <span className="topic-copy">
                          <span className="topic-title" lang={langOf(topic.title)}>{topic.title}</span>
                          <span className="topic-meta">{done.has(topic.id) ? "Attempted" : `${topic.testSize} questions`}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </section>

      <section className="card">
        <p className="quiet">
          Two papers, 2 hours 30 minutes, no negative marking. You need 50% in each paper.
          <a href="#/notes"> Notes</a> come before a test. <a href="#/interview">Interview notes</a> are for later.
        </p>
        <SyncLine sync={sync} error={error} />
      </section>
    </div>
  );
}
