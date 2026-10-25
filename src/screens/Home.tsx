import { useState } from "react";
import { allTopics, SUBJECT_LABEL } from "../catalog.ts";
import { formatDay, PLAN, todayISO } from "../plan.ts";
import { SyncLine } from "../SyncLine.tsx";
import { getName, setName, useAttempts } from "../storage.ts";
import type { Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { TimeLeft } from "../ui/TimeLeft.tsx";

const ORDER: Subject[] = ["maths", "science", "english", "hindi", "sst"];

export function Home() {
  const [name, setLocalName] = useState(getName());
  const today = todayISO();
  const todayPlan = PLAN.filter((entry) => entry.date === today);
  const { attempts, sync, error } = useAttempts();
  const done = new Set(attempts.map((attempt) => attempt.testId));
  const topics = allTopics();
  const testTask =
    todayPlan.find((entry) => entry.kind === "test" && entry.testId && entry.required) ??
    todayPlan.find((entry) => entry.kind === "test" && entry.testId);
  const formulaTask = todayPlan.find((entry) => entry.kind === "formula");
  const reviewTask = todayPlan.find((entry) => entry.kind === "review");
  const noteTask = todayPlan.find((entry) => entry.kind === "note");
  const hero = testTask ?? formulaTask ?? reviewTask ?? noteTask ?? null;
  const also = todayPlan.filter((entry) => entry !== hero);

  const nameField = (
    <label className="field">
      Your name
      <input
        value={name}
        onChange={(event) => {
          setLocalName(event.target.value);
          setName(event.target.value);
        }}
        placeholder="Name used on the report"
        autoComplete="name"
      />
    </label>
  );

  return (
    <div className="stack">
      <TimeLeft />
      <section className="hero card">
        <p className="eyebrow">Today</p>
        <p className="dayline">{formatDay(today)}</p>
        {hero ? (
          <>
            <h1 lang={langOf(hero.title)}>{hero.title}</h1>
            <p className="lede" lang={langOf(hero.detail)}>{hero.detail}</p>
          </>
        ) : (
          <>
            <h1>Nothing is scheduled today</h1>
            <p className="lede">Open the plan, or start a topic below.</p>
          </>
        )}

        {!name.trim() ? (
          <>
            <p className="note">Add your name first. The parent report uses it.</p>
            {nameField}
          </>
        ) : null}

        {hero?.kind === "test" && hero.testId ? (
          <a className="button block" href={`#/test/${hero.testId}`}>
            {done.has(hero.testId) ? "Redo today's test" : "Start today's test"}
          </a>
        ) : null}
        {hero?.kind === "formula" ? (
          <a className="button block" href="#/formulas">Open the formula sheet</a>
        ) : null}
        {hero?.kind === "review" ? (
          <a className="button block" href="#/parent">Open the parent report</a>
        ) : null}
        {!hero || hero.kind === "note" ? (
          <a className="button block" href="#/plan">Open the plan</a>
        ) : null}

        {name.trim() ? (
          <details className="fold inner">
            <summary>Name · {name}</summary>
            {nameField}
          </details>
        ) : null}

        {also.length > 0 ? (
          <details className="fold inner">
            <summary>Also today · {also.length}</summary>
            <ul className="also">
              {also.map((entry) => (
                <li key={`${entry.kind}-${entry.title}-${entry.testId ?? ""}`}>
                  <div>
                    <strong lang={langOf(entry.title)}>{entry.title}</strong>
                    <span lang={langOf(entry.detail)}>{entry.detail}</span>
                  </div>
                  {entry.kind === "test" && entry.testId ? (
                    <a className="button ghost" href={`#/test/${entry.testId}`}>
                      {done.has(entry.testId) ? "Redo" : "Start"}
                    </a>
                  ) : null}
                  {entry.kind === "review" ? <a className="button ghost" href="#/parent">Open report</a> : null}
                  {entry.kind === "formula" ? <a className="button ghost" href="#/formulas">Formula sheet</a> : null}
                </li>
              ))}
            </ul>
          </details>
        ) : null}

        <details className="fold inner">
          <summary>About the paper</summary>
          <p className="quiet">
            Two papers, one sitting, 2 hours 30 minutes, no negative marking. You need 50% in Paper 1 and 50% in Paper 2.
            Mathematics breaks a tie first, then Science. Read the notes for a topic before its test.{" "}
            <a href="#/notes">Open the notes</a>. <a href="#/plan">See the full plan</a>.
          </p>
          <SyncLine sync={sync} error={error} />
        </details>
      </section>

      {ORDER.map((subject) => {
        const items = topics.filter((topic) => topic.subject === subject);
        const attempted = items.filter((topic) => done.has(topic.id)).length;
        return (
          <details className="fold subject" key={subject} name="subjects">
            <summary>
              <span>{SUBJECT_LABEL[subject]}</span>
              <small>{items.length === 0 ? "None yet" : `${attempted}/${items.length}`}</small>
            </summary>
            {items.length === 0 ? <p>Questions for this subject are not on the phone yet.</p> : null}
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
          </details>
        );
      })}
    </div>
  );
}
