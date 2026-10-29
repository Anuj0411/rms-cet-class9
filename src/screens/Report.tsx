import { getRole } from "../auth.ts";
import { fullReport, retakeOf, testBrief } from "../analysis.ts";
import { SUBJECT_LABEL } from "../catalog.ts";
import { SyncLine } from "../SyncLine.tsx";
import { useAttempts } from "../storage.ts";
import { langOf } from "../ui/lang.ts";

function when(at: number) {
  return new Date(at).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function statusOf(correct: boolean, blank: boolean, sameValue: boolean) {
  if (correct) return "Correct";
  if (sameValue) return "Same value";
  if (blank) return "Blank";
  return "Missed";
}

export function Report() {
  const { attempts, sync, error } = useAttempts();
  const earlier = retakeOf(attempts);
  const tests = [...attempts]
    .sort((left, right) => right.submittedAt - left.submittedAt)
    .map((attempt) => testBrief(attempt, earlier.get(attempt.id) ?? null));
  const report = fullReport(attempts);

  return (
    <div className="stack">
      <header className="hello">
        <div>
          <p>Parent report</p>
          <h1>{report.studentName === "He" ? "Full report" : `${report.studentName}'s report`}</h1>
        </div>
      </header>
      <div className="report-jump">
        <button type="button" className="button ghost" onClick={() => jump("report-questions")}>Questions</button>
        <button type="button" className="button ghost" onClick={() => jump("report-tests")}>Tests</button>
        <button type="button" className="button ghost" onClick={() => jump("report-full")}>Full report</button>
      </div>

      <section className="card" id="report-questions">
        <h2>Question by question</h2>
        <p className="quiet">Every saved answer. A miss is open. A correct answer stays closed until you tap it.</p>
        {sync === "loading" && tests.length === 0 ? <p>Loading the saved papers.</p> : null}
        {tests.length === 0 && sync !== "loading" ? <p>No paper has been submitted yet.</p> : null}
        {tests.map((test) => (
          <details key={test.id} id={`paper-${test.id}`} className="fold" open={test.wrong + test.blanks > 0}>
            <summary>
              <span lang={langOf(test.title)}>{test.title}</span>
              <small>{test.score}/{test.total}</small>
            </summary>
            <p className="quiet">{when(test.submittedAt)}{test.retake ? " · immediate redo" : ""}</p>
            {test.questions.map((question) => (
              <details
                key={question.key}
                className={question.correct ? "fold hit inner" : "fold miss inner"}
                open={!question.correct}
              >
                <summary>
                  <span>{question.index + 1}. {statusOf(question.correct, question.blank, question.sameValue)}</span>
                  <small>{SUBJECT_LABEL[question.subject]}</small>
                </summary>
                <p className="stem" lang={langOf(question.stem)}>{question.stem}</p>
                <p className="mark-line" lang={langOf(`${question.chosenLabel} ${question.correctLabel}`)}>
                  <b>Marked</b> {question.chosenLabel}
                  {question.correct ? null : (
                    <>
                      <br />
                      <b>Answer</b> {question.correctLabel}
                    </>
                  )}
                </p>
                {question.rule ? <p className="why" lang={langOf(question.rule)}><strong>Why</strong>{question.rule}</p> : null}
                <p className="quiet">{question.seconds} sec on this question</p>
              </details>
            ))}
          </details>
        ))}
      </section>

      <section className="card" id="report-tests">
        <h2>Test by test</h2>
        {tests.length === 0 ? <p>No paper has been submitted yet.</p> : (
          <ul className="note-list">
            {tests.map((test) => (
              <li className="note-card" key={test.id}>
                <p className="note-rule" lang={langOf(test.title)}>
                  <span className="note-num">{test.score}/{test.total}</span>
                  {test.title}
                </p>
                <p className="quiet">
                  {when(test.submittedAt)} · {test.percent}% · {Math.round(test.durationSec / 60)} min {test.durationSec % 60} sec
                  {test.retake ? ` · redo of ${test.earlier}` : ""}
                </p>
                <p>{test.line}</p>
                <p className="quiet">
                  {test.wrong} wrong · {test.blanks} blank
                  {test.subjects.map((row) => ` · ${SUBJECT_LABEL[row.subject]} ${row.correct}/${row.total}`).join("")}
                </p>
                <button type="button" className="button ghost" onClick={() => jump(`paper-${test.id}`)}>
                  See these questions
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card" id="report-full">
        <h2>Full report</h2>
        {report.lines.map((line) => <p key={line}>{line}</p>)}
        {report.subjects.length ? (
          <div className="topic-meters">
            {report.subjects.map((row) => (
              <Meter key={row.subject} label={SUBJECT_LABEL[row.subject]} correct={row.correct} total={row.total} percent={row.percent} />
            ))}
            {report.paper1.total ? <Meter label="Paper 1" correct={report.paper1.correct} total={report.paper1.total} percent={report.paper1.percent} /> : null}
            {report.paper2.total ? <Meter label="Paper 2" correct={report.paper2.correct} total={report.paper2.total} percent={report.paper2.percent} /> : null}
          </div>
        ) : null}
        {report.repeats.length ? (
          <>
            <h2>Missed more than once</h2>
            <ul className="remain-list">
              {report.repeats.map((row) => (
                <li key={row.questionId}>
                  <span lang={langOf(row.stem)}>{row.stem}<small>{row.topicTitle}</small></span>
                  <strong>{row.times} times</strong>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        <p className="quiet">An immediate redo is a second sitting of the same test within 20 minutes. The first score stays in the full total.</p>
        <SyncLine sync={sync} error={error} audience={getRole() === "parent" ? "parent" : "student"} />
        <a className="button ghost block" href="#/">Back to progress</a>
      </section>
    </div>
  );
}

function Meter({ label, correct, total, percent }: { label: string; correct: number; total: number; percent: number }) {
  return (
    <div className="topic-meter">
      <p>
        <span>{label}</span>
        <strong>{correct}/{total}</strong>
      </p>
      <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label={label}>
        <i style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
