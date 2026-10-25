import { useEffect, useRef, useState } from "react";
import { resolveTest, splitScore, SUBJECT_LABEL, topicById } from "../catalog.ts";
import { PAPER_BRIEF, TOPIC_NOTES } from "../notes/index.ts";
import { getLive, getName, saveAttempt, setLive, useAttempts } from "../storage.ts";
import type { LiveTest, Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { NotesList } from "../ui/NotesList.tsx";

function blank(testId: string, count: number): LiveTest {
  return {
    testId,
    started: false,
    startedAt: 0,
    index: 0,
    chosen: Array.from({ length: count }, () => null),
    flags: Array.from({ length: count }, () => false),
    seconds: Array.from({ length: count }, () => 0),
    tickAt: Date.now(),
  };
}

function clock(seconds: number) {
  const safe = Math.max(seconds, 0);
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

export function TestScreen({ testId }: { testId: string }) {
  const { attempts } = useAttempts();
  const test = resolveTest(testId, attempts);
  const [live, setLocal] = useState<LiveTest | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const submitted = useRef(false);

  useEffect(() => {
    submitted.current = false;
    setReady(false);
  }, [testId]);

  useEffect(() => {
    const current = resolveTest(testId, attempts);
    if (!current) return;
    const saved = getLive();
    if (saved?.testId === testId && saved.started && saved.chosen.length === current.questions.length) {
      setLocal(saved);
      setLive(saved);
      return;
    }
    const next = saved && saved.testId === testId && saved.chosen.length === current.questions.length
      ? saved
      : blank(testId, current.questions.length);
    setLocal(next);
    setLive(next);
  }, [testId, attempts]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  function commit(next: LiveTest) {
    setLocal(next);
    setLive(next);
  }

  function flush(current: LiveTest) {
    const extra = Math.max(0, Math.round((Date.now() - current.tickAt) / 1000));
    const seconds = [...current.seconds];
    seconds[current.index] += extra;
    return { ...current, seconds, tickAt: Date.now() };
  }

  async function finish(current: LiveTest) {
    if (!test || submitted.current) return;
    submitted.current = true;
    setSaving(true);
    setSaveError("");
    const finalLive = flush(current);
    const chosen = finalLive.chosen;
    const scored = splitScore(test.questions, chosen);
    const submittedAt = Date.now();
    const startedAt = finalLive.startedAt || submittedAt;
    const attempt = {
      id: `${test.id}-${submittedAt}`,
      studentName: getName() || "Student",
      testId: test.id,
      testTitle: test.title,
      kind: test.kind,
      startedAt,
      submittedAt,
      durationSec: Math.max(1, Math.round((submittedAt - startedAt) / 1000)),
      ...scored,
      paper1Score: scored.paper1Total ? scored.paper1Score : null,
      paper1Total: scored.paper1Total || null,
      paper2Score: scored.paper2Total ? scored.paper2Score : null,
      paper2Total: scored.paper2Total || null,
      answers: test.questions.map((question, index) => ({
        questionId: question.id,
        topicId: question.topicId,
        subject: question.subject,
        chosen: chosen[index],
        correct: chosen[index] === question.answer,
        flagged: finalLive.flags[index],
        seconds: finalLive.seconds[index],
      })),
    };
    try {
      await saveAttempt(attempt);
      setLive(null);
      window.location.hash = `#/review/${attempt.id}`;
    } catch (err) {
      submitted.current = false;
      setSaveError(err instanceof Error ? err.message : "Could not save this result.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (!test || !live || !live.started || !test.strict) return;
    const elapsed = Math.floor((now - live.startedAt) / 1000);
    if (elapsed >= test.minutes * 60) void finish(live);
  }, [now, live, test]);

  if (!test) {
    return (
      <section className="card">
        <h1>That test is not on the plan</h1>
        <p>Go home and pick a topic from the list.</p>
        <a className="button block" href="#/">Back home</a>
      </section>
    );
  }

  if (!live) {
    return (
      <section className="card">
        <h1>Opening this test</h1>
        <p>The questions are loading on this phone.</p>
      </section>
    );
  }

  if (!getName()) {
    return (
      <section className="card">
        <h1>Add your name first</h1>
        <p>Go back home and type your name. Your uncle's report uses that name.</p>
        <a className="button block" href="#/">Go home</a>
      </section>
    );
  }

  if (!live.started) {
    const ownNotes = TOPIC_NOTES[test.id];
    const bySubject = new Map<Subject, { id: string; title: string }[]>();
    if (!ownNotes) {
      const seen = new Set<string>();
      for (const question of test.questions) {
        if (!TOPIC_NOTES[question.topicId] || seen.has(question.topicId)) continue;
        seen.add(question.topicId);
        const topic = topicById(question.topicId);
        const subject = topic?.subject ?? question.subject;
        const list = bySubject.get(subject) ?? [];
        list.push({ id: question.topicId, title: topic?.title ?? question.topicId });
        bySubject.set(subject, list);
      }
    }
    const subjectOrder: Subject[] = ["maths", "science", "english", "hindi", "sst"];
    return (
      <section className="card concept">
        <a className="back" href="#/">Back</a>
        <p className="eyebrow">{ownNotes ? "Read this, then start" : "Before you start"}</p>
        <h1 lang={langOf(test.title)}>{test.title}</h1>
        {ownNotes ? (
          <>
            <p className="lede">The bold line is the rule. Read the picture and the example under it, then tick the box.</p>
            <NotesList bits={ownNotes} topicId={test.id} />
          </>
        ) : (
          <>
            <NotesList bits={PAPER_BRIEF} />
            {subjectOrder.filter((subject) => bySubject.has(subject)).map((subject) => (
              <details key={subject} className="fold inner" name="paper-notes">
                <summary>
                  <span>{SUBJECT_LABEL[subject]}</span>
                  <small>{bySubject.get(subject)?.length}</small>
                </summary>
                {bySubject.get(subject)?.map((topic) => (
                  <details key={topic.id} className="fold inner">
                    <summary lang={langOf(topic.title)}>{topic.title}</summary>
                    <NotesList bits={TOPIC_NOTES[topic.id]} topicId={topic.id} />
                  </details>
                ))}
              </details>
            ))}
            <p className="quiet"><a href="#/notes">Open all subject notes</a></p>
          </>
        )}
        {test.ncert ? <p className="ncert">If you score under half, reread {test.ncert}.</p> : null}
        <p className="meta">
          {test.questions.length} questions · {test.minutes} min
          {test.strict ? " · the paper submits itself when time ends" : " · you can finish after the suggested time"}
        </p>
        {test.questions.length === 0 ? (
          <>
            <p>This set has no questions yet. Go home and pick another topic.</p>
            <a className="button block" href="#/">Back home</a>
          </>
        ) : (
          <>
            <label className="read-check">
              <input
                type="checkbox"
                checked={ready}
                onChange={(event) => setReady(event.target.checked)}
              />
              <span>I have read the notes</span>
            </label>
            <button
              className="button block"
              type="button"
              disabled={!ready}
              onClick={() => commit({ ...live, started: true, startedAt: Date.now(), tickAt: Date.now() })}
            >
              Start test
            </button>
          </>
        )}
      </section>
    );
  }

  const session = live;
  const question = test.questions[session.index];
  const elapsed = Math.floor((now - session.startedAt) / 1000);
  const limit = test.minutes * 60;
  const left = Math.min(limit, limit - elapsed);
  const answered = session.chosen.filter((choice) => choice !== null).length;
  const flagged = session.flags.filter(Boolean).length;

  function choose(option: number) {
    const chosen = [...session.chosen];
    chosen[session.index] = option;
    commit({ ...session, chosen });
  }

  function jump(index: number) {
    commit({ ...flush(session), index });
  }

  return (
    <section className="test">
      <header className="test-chrome">
        <div>
          <p className="eyebrow" lang={langOf(test.title)}>{test.title}</p>
          <p className="q-label">Question {session.index + 1} of {test.questions.length}</p>
          <p className="progress-line">
            {answered} answered · {test.questions.length - answered} blank
            {flagged ? ` · ${flagged} flagged` : ""}
          </p>
        </div>
        <div className="timer-wrap">
          <p className={left < 60 ? "timer warn" : "timer"}>
            {left >= 0 ? clock(left) : "Time is up"}
          </p>
          <p className="timer-kind">{test.strict ? "Submits at zero" : "Suggested time"}</p>
        </div>
      </header>
      {!test.strict && left < 0 ? (
        <p className="note">The suggested time is over. Finish the ones you skipped, then submit.</p>
      ) : null}
      <article className="card question">
        <p className="stem" lang={langOf(question.stem)}>{question.stem}</p>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={option}
              type="button"
              className={session.chosen[session.index] === index ? "option picked" : "option"}
              aria-pressed={session.chosen[session.index] === index}
              onClick={() => choose(index)}
            >
              <span className="letter">{String.fromCharCode(65 + index)}</span>
              <span lang={langOf(option)}>{option}</span>
            </button>
          ))}
        </div>
      </article>
      <details className="fold">
        <summary>Jump to a question · {answered}/{test.questions.length}</summary>
        <div className="omr" aria-label="Question palette">
          {test.questions.map((item, index) => {
            const state = index === session.index ? "now" : session.flags[index] ? "flag" : session.chosen[index] !== null ? "done" : "open";
            return (
              <button
                key={item.id}
                type="button"
                className={`bubble ${state}`}
                aria-current={index === session.index ? "true" : undefined}
                aria-label={`Question ${index + 1}${session.flags[index] ? ", flagged" : ""}${session.chosen[index] !== null ? ", answered" : ""}`}
                onClick={() => jump(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <p className="legend">
          <span><i className="swatch now" /> This one</span>
          <span><i className="swatch done" /> Answered</span>
          <span><i className="swatch flag" /> Flagged</span>
        </p>
      </details>
      <div className="dock">
        <button
          type="button"
          className={session.flags[session.index] ? "button ghost flagged" : "button ghost"}
          onClick={() => {
            const flags = [...session.flags];
            flags[session.index] = !flags[session.index];
            commit({ ...session, flags });
          }}
        >
          {session.flags[session.index] ? "Flagged" : "Flag"}
        </button>
        <button type="button" className="button ghost" disabled={session.index === 0} onClick={() => jump(session.index - 1)}>
          Previous
        </button>
        {session.index < test.questions.length - 1 ? (
          <button type="button" className="button grow" onClick={() => jump(session.index + 1)}>
            Next
          </button>
        ) : (
          <button type="button" className="button grow" onClick={() => setConfirm(true)}>
            Submit
          </button>
        )}
      </div>
      {confirm ? (
        <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="submit-title">
          <div className="card sheet-card">
            <h2 id="submit-title">Check the sheet</h2>
            <p>
              {answered} answered, {test.questions.length - answered} blank, {flagged} flagged.
            </p>
            <p>There is no negative marking. A blank scores zero, and a wrong answer scores zero too, so attempt every question.</p>
            {saveError ? <p className="note">{saveError}</p> : null}
            <div className="stack tight">
              <button type="button" className="button ghost block" onClick={() => setConfirm(false)}>
                Go back
              </button>
              <button type="button" className="button block" disabled={saving} onClick={() => void finish(session)}>
                {saving ? "Saving to Firebase…" : "Submit paper"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
