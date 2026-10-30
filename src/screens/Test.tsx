import { useEffect, useRef, useState, type FormEvent } from "react";
import { afterChoice, askCount, bankTime, coachLine, extendLive, freshLive, isScreenshotKey, liveFits, markHidden, markShown, markTry, sameLive } from "../adapt.ts";
import { resolveTest, splitScore, SUBJECT_LABEL, topicById } from "../catalog.ts";
import { PAPER_BRIEF, TOPIC_NOTES } from "../notes/index.ts";
import { getLive, getName, saveAttempt, saveOpenPaper, setLive, setName, useAttempts, usePaperResets } from "../storage.ts";
import type { LiveTest, Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { NotesList } from "../ui/NotesList.tsx";

function clock(seconds: number) {
  const safe = Math.max(seconds, 0);
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function sittingNote(subject: string | undefined) {
  if (subject === "maths") {
    return "Easy sums are left out. These are the kind of questions the entrance paper asks. A right answer is followed by a tougher one. A wrong answer stays with another solid one. Nothing is marked until you submit.";
  }
  if (subject === "english") {
    return "A short rule sits above each question. Use it, then choose. Two right answers in a row bring a harder question. One wrong answer brings an easier one. Nothing is marked until you submit.";
  }
  return "Each answer is checked inside the paper. A right answer is followed by a tougher question. A wrong answer is followed by an easier one. Nothing is marked until you submit.";
}

export function TestScreen({ testId }: { testId: string }) {
  const { attempts } = useAttempts();
  const { resets, ready: resetsReady } = usePaperResets();
  const test = resolveTest(testId, attempts);
  const [live, setLocal] = useState<LiveTest | null>(null);
  const [resetNote, setResetNote] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [studentName, setStudentName] = useState(() => {
    const saved = getName().trim();
    return saved.length > 1 ? saved : "";
  });
  const [draftName, setDraftName] = useState(() => {
    const saved = getName().trim();
    return saved.length > 1 ? "" : saved;
  });
  const submitted = useRef(false);
  const attemptsRef = useRef(attempts);
  attemptsRef.current = attempts;
  const attemptKey = attempts.map((item) => item.id).join("|");
  const liveRef = useRef(live);
  liveRef.current = live;

  useEffect(() => {
    submitted.current = false;
    setReady(false);
    setResetNote(false);
  }, [testId]);

  useEffect(() => {
    const current = resolveTest(testId, attemptsRef.current);
    if (!current) return;
    const saved = getLive();
    const blocked = resetsReady && !!saved?.started && resets.some((item) => item.kind === "live" && item.testId === testId && item.at > saved.startedAt);
    if (blocked && saved) {
      setLive(null);
      setLocal(null);
      setResetNote(true);
      void saveOpenPaper({
        testId,
        title: current.title,
        startedAt: saved.startedAt,
        open: false,
      }).catch(() => {});
      return;
    }
    if (!resetsReady) return;
    const now = liveRef.current;
    if (saved?.testId === testId && liveFits(saved, current)) {
      const settled = saved.hiddenAt && !document.hidden ? markShown(saved) : saved;
      if (!sameLive(now, settled)) setLocal(settled);
      if (settled !== saved) setLive(settled);
      return;
    }
    if (now?.testId === testId && liveFits(now, current)) return;
    const next = freshLive(current);
    setLocal(next);
    setLive(next);
  }, [testId, attemptKey, resets, resetsReady]);

  useEffect(() => {
    if (!resetsReady || !test || !live?.started) return;
    const blocked = resets.some((item) => item.kind === "live" && item.testId === test.id && item.at > live.startedAt);
    if (blocked) return;
    void saveOpenPaper({
      testId: test.id,
      title: test.title,
      startedAt: live.startedAt,
      open: true,
    }).catch(() => {});
  }, [resetsReady, test?.id, test?.title, live?.started, live?.startedAt, resets]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!live?.started) return;
    const persist = (next: LiveTest) => {
      liveRef.current = next;
      setLocal(next);
      setLive(next);
    };
    const hide = () => {
      const current = liveRef.current;
      if (!current?.started || submitted.current) return;
      const next = markHidden(current);
      if (next !== current) persist(next);
    };
    const show = () => {
      const current = liveRef.current;
      if (!current?.started || submitted.current) return;
      const next = markShown(current);
      if (next !== current) persist(next);
    };
    const onVisibility = () => {
      if (document.hidden) hide();
      else show();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", hide);
    let lastShot = 0;
    const noteTry = (kind: "selects" | "shots") => {
      const current = liveRef.current;
      if (!current?.started || submitted.current) return;
      const next = markTry(current, kind);
      if (next !== current) persist(next);
    };
    const onSelect = (event: Event) => {
      const root = document.querySelector("article.question");
      if (!(event.target instanceof Node) || !root?.contains(event.target)) return;
      noteTry("selects");
    };
    const onShot = (event: KeyboardEvent) => {
      if (!isScreenshotKey(event)) return;
      const at = Date.now();
      if (at - lastShot < 800) return;
      lastShot = at;
      noteTry("shots");
    };
    const onPrint = () => {
      const at = Date.now();
      if (at - lastShot < 800) return;
      lastShot = at;
      noteTry("shots");
    };
    document.addEventListener("selectstart", onSelect);
    window.addEventListener("keydown", onShot);
    window.addEventListener("keyup", onShot);
    window.addEventListener("beforeprint", onPrint);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", hide);
      document.removeEventListener("selectstart", onSelect);
      window.removeEventListener("keydown", onShot);
      window.removeEventListener("keyup", onShot);
      window.removeEventListener("beforeprint", onPrint);
    };
  }, [live?.started]);

  function commit(next: LiveTest) {
    setLocal(next);
    setLive(next);
  }

  function flush(current: LiveTest) {
    return bankTime(current);
  }

  async function finish(current: LiveTest) {
    if (!test || submitted.current) return;
    submitted.current = true;
    setSaving(true);
    setSaveError("");
    const finalLive = flush(markShown(current));
    const asked = finalLive.order ? finalLive.order.map((index) => test.questions[index]) : test.questions;
    const chosen = finalLive.chosen;
    const scored = splitScore(asked, chosen);
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
      answers: asked.map((question, index) => ({
        questionId: question.id,
        topicId: question.topicId,
        subject: question.subject,
        chosen: chosen[index],
        correct: chosen[index] === question.answer,
        flagged: finalLive.flags[index],
        seconds: finalLive.seconds[index],
        leaves: finalLive.leaves?.[index] ?? 0,
        awaySec: finalLive.away?.[index] ?? 0,
        selects: finalLive.selects?.[index] ?? 0,
        shots: finalLive.shots?.[index] ?? 0,
      })),
    };
    try {
      await saveAttempt(attempt);
      setLive(null);
      await saveOpenPaper({ testId: test.id, title: test.title, startedAt, open: false }).catch(() => {});
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

  if (resetNote && test) {
    return (
      <section className="card">
        <h1>This paper was reset</h1>
        <p>The answers from this sitting are cleared. You can read the notes and start {test.title} again.</p>
        <button
          className="button block"
          type="button"
          onClick={() => {
            const next = freshLive(test);
            setLocal(next);
            setLive(next);
            setResetNote(false);
          }}
        >
          Start again
        </button>
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
          {askCount(test)} questions · {test.minutes} min
          {test.strict ? " · the paper submits itself when time ends" : " · you can finish after the suggested time"}
        </p>
        {test.adaptive ? (
          <p className="quiet">{sittingNote(test.questions[0]?.subject)}</p>
        ) : null}
        {test.questions.length === 0 ? (
          <>
            <p>This set has no questions yet. Go home and pick another topic.</p>
            <a className="button block" href="#/">Back home</a>
          </>
        ) : (
          <>
            <form
              onSubmit={(event: FormEvent) => {
                event.preventDefault();
                const trimmed = (studentName || draftName).trim();
                if (!trimmed || !ready) return;
                setName(trimmed);
                setStudentName(trimmed);
                commit({ ...live, started: true, startedAt: Date.now(), tickAt: Date.now() });
              }}
            >
              {studentName ? null : (
                <label className="field">
                  Your name
                  <input
                    value={draftName}
                    onChange={(event) => setDraftName(event.target.value)}
                    placeholder="Name used on the report"
                    autoComplete="name"
                    autoFocus
                  />
                </label>
              )}
              <label className="read-check">
                <input
                  type="checkbox"
                  checked={ready}
                  onChange={(event) => setReady(event.target.checked)}
                />
                <span>I have read the notes</span>
              </label>
              <button className="button block" type="submit" disabled={!ready || !(studentName || draftName).trim()}>
                Start test
              </button>
            </form>
          </>
        )}
      </section>
    );
  }

  const session = live;
  const total = askCount(test);
  const poolIndex = session.order ? session.order[session.index] : session.index;
  const question = test.questions[poolIndex];
  const elapsed = Math.floor((now - session.startedAt) / 1000);
  const limit = test.minutes * 60;
  const left = Math.min(limit, limit - elapsed);
  const answered = session.chosen.filter((choice) => choice !== null).length;
  const flagged = session.flags.filter(Boolean).length;
  const ahead = test.adaptive ? total - (session.order?.length ?? 0) : total - answered;
  const atEnd = test.adaptive ? (session.order?.length ?? 0) >= total && session.index >= total - 1 : session.index >= total - 1;
  const slots = session.order ?? test.questions.map((_, index) => index);

  function choose(option: number) {
    if (!test) return;
    commit(afterChoice(session, option, test.questions, total, Boolean(test.adaptive)));
  }

  function jump(index: number) {
    commit({ ...flush(session), index });
  }

  function forward() {
    if (!test) return;
    const current = flush(session);
    if (test.adaptive && current.order && current.index === current.order.length - 1) {
      const grown = extendLive(current, test.questions, total);
      if (grown) {
        commit(grown);
        return;
      }
    }
    commit({ ...current, index: current.index + 1 });
  }

  if (!question) {
    return (
      <section className="card">
        <h1>This question is missing</h1>
        <p>Go home and start the topic again.</p>
        <a className="button block" href="#/">Back home</a>
      </section>
    );
  }

  const coach = coachLine(question);

  return (
    <section className="test">
      <header className="test-chrome">
        <div>
          <p className="eyebrow" lang={langOf(test.title)}>{test.title}</p>
          <p className="q-label">Question {session.index + 1} of {total}</p>
          <p className="progress-line">
            {answered} answered · {test.adaptive ? `${ahead} still ahead` : `${ahead} blank`}
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
        {coach ? (
          <p className="coach"><strong>Use this rule</strong>{coach}</p>
        ) : null}
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
        <summary>{test.adaptive ? "Questions so far" : "Jump to a question"} · {answered}/{test.adaptive ? session.order?.length ?? 0 : total}</summary>
        <div className="omr" aria-label="Question palette">
          {slots.map((itemIndex, index) => {
            const item = test.questions[itemIndex];
            const state = index === session.index ? "now" : session.flags[index] ? "flag" : session.chosen[index] !== null ? "done" : "open";
            return (
              <button
                key={item?.id ?? index}
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
        {atEnd ? (
          <button type="button" className="button grow" onClick={() => setConfirm(true)}>
            Submit
          </button>
        ) : (
          <button type="button" className="button grow" onClick={forward}>
            Next
          </button>
        )}
      </div>
      {confirm ? (
        <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="submit-title">
          <div className="card sheet-card">
            <h2 id="submit-title">Check the sheet</h2>
            <p>
              {answered} answered, {test.adaptive ? `${ahead} still ahead` : `${total - answered} blank`}, {flagged} flagged.
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
