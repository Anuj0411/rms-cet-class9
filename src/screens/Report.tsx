import { getRole } from "../auth.ts";
import { fullReport, retakeOf, sittingChecks, testBrief, type QuestionLine } from "../analysis.ts";
import { SUBJECT_LABEL } from "../catalog.ts";
import { formatDay, type PlanEntry } from "../plan.ts";
import { istNow, planWatch } from "../remind.ts";
import { SyncLine } from "../SyncLine.tsx";
import { useAttempts } from "../storage.ts";
import { langOf } from "../ui/lang.ts";
import { LatestPaper } from "../ui/LatestPaper.tsx";

const QUICK_SECONDS = 5;

function when(at: number) {
  return new Date(at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function veryQuick(question: QuestionLine) {
  return question.correct && question.seconds < QUICK_SECONDS;
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
  const today = istNow().day;
  const watch = planWatch(
    attempts.map((attempt) => ({ testId: attempt.testId, submittedAt: attempt.submittedAt })),
    today,
  );

  return (
    <div className="stack">
      <header className="hello">
        <div>
          <p>Parent report</p>
          <h1>{report.studentName === "He" ? "Full report" : `${report.studentName}'s report`}</h1>
        </div>
      </header>
      <LatestPaper attempts={attempts} sync={sync} />
      <div className="report-jump">
        <button type="button" className="button ghost" onClick={() => jump("report-checks")}>Each test</button>
        <button type="button" className="button ghost" onClick={() => jump("report-questions")}>Questions</button>
        <button type="button" className="button ghost" onClick={() => jump("report-tests")}>Tests</button>
        <button type="button" className="button ghost" onClick={() => jump("report-full")}>Full report</button>
      </div>

      <section className="card" id="report-checks">
        <h2>Each test</h2>
        <p className="quiet">Left the screen, selected the question text, and a screenshot shortcut or print. The screenshot buttons on the phone itself are not visible here.</p>
        {sync === "loading" && tests.length === 0 ? <p>Checking the saved papers.</p> : null}
        {tests.length === 0 && sync !== "loading" ? <p>No paper has been submitted yet.</p> : null}
        {tests.length ? (
          <ul className="remain-list">
            {tests.map((test) => {
              const checks = sittingChecks(test.questions);
              const hot = test.watched && (checks.leaves > 0 || checks.selects > 0 || checks.shots > 0);
              return (
                <li key={test.id}>
                  <span lang={langOf(test.title)}>
                    {test.title}
                    <small>Finished {when(test.submittedAt)}</small>
                    <small>{checkLine(test.questions, test.watched)}</small>
                  </span>
                  <strong className={hot ? "too-fast" : undefined}>{hot ? "Look" : test.watched ? "None" : "Not recorded"}</strong>
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>

      <section className="card" id="report-attendance">
        <h2>Finished, left, and missed days</h2>
        {sync === "loading" ? <p>Checking the saved papers.</p> : (
          <>
            <p>
              {watch.remaining.length === 0
                ? "No required test is left on the plan."
                : `${watch.remaining.length} required ${watch.remaining.length === 1 ? "test is" : "tests are"} still left. ${watch.late.length} ${watch.late.length === 1 ? "is" : "are"} already late.`}
            </p>
            {watch.missingDays.length === 0 ? (
              <p>Every plan day so far has at least one submitted paper.</p>
            ) : (
              <>
                <p>These days have no submitted paper. A test done on another day does not fill the gap.</p>
                <ul className="remain-list">
                  {watch.missingDays.map((day) => (
                    <li key={day}>
                      <span>{formatDay(day)}</span>
                      <strong>No paper</strong>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {watch.late.length ? (
              <ul className="remain-list">
                {watch.late.map((entry) => (
                  <LateRow key={`${entry.date}-${entry.testId}`} entry={entry} />
                ))}
              </ul>
            ) : null}
          </>
        )}
      </section>

      <section className="card" id="report-questions">
        <h2>Question by question</h2>
        <p className="quiet">The time is how long that question stayed on this phone. Switching apps, going home, or closing the tab is marked as leaving. A correct answer under {QUICK_SECONDS} seconds is marked very quick. Another phone is not visible here.</p>
        {sync === "loading" && tests.length === 0 ? <p>Loading the saved papers.</p> : null}
        {tests.length === 0 && sync !== "loading" ? <p>No paper has been submitted yet.</p> : null}
        {tests.map((test) => (
          <details key={test.id} id={`paper-${test.id}`} className="fold" open={test.wrong + test.blanks > 0}>
            <summary>
              <span lang={langOf(test.title)}>{test.title}</span>
              <small>{test.score}/{test.total}</small>
            </summary>
            <p>Finished {when(test.submittedAt)}{test.retake ? " · immediate redo" : ""}</p>
            <p className="quiet">
              Started {when(test.startedAt)} · {Math.round(test.durationSec / 60)} min {test.durationSec % 60} sec
              {quickCount(test.questions) ? ` · ${quickCount(test.questions)} correct under ${QUICK_SECONDS} sec` : ""}
              {leftCount(test.questions) ? ` · left the screen on ${leftCount(test.questions)}` : ""}
            </p>
            {test.questions.map((question) => (
              <details
                key={question.key}
                className={question.correct ? "fold hit inner" : "fold miss inner"}
                open={!question.correct}
              >
                <summary>
                  <span className={veryQuick(question) || question.leaves > 0 || question.selects > 0 || question.shots > 0 ? "too-fast" : undefined}>
                    {question.index + 1}. {statusOf(question.correct, question.blank, question.sameValue)} · {question.seconds}s
                    {veryQuick(question) ? " · very quick" : ""}
                    {awayLine(question)}
                    {tryLine(question)}
                  </span>
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
                <p className={veryQuick(question) || question.leaves > 0 || question.selects > 0 || question.shots > 0 ? "too-fast" : "quiet"}>
                  {question.seconds} sec on this question
                  {veryQuick(question) ? " · very quick for a correct answer" : ""}
                  {awayLine(question)}
                  {tryLine(question)}
                </p>
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
                  Finished {when(test.submittedAt)} · {test.percent}% · {Math.round(test.durationSec / 60)} min {test.durationSec % 60} sec
                  {test.retake ? ` · redo of ${test.earlier}` : ""}
                  {quickCount(test.questions) ? ` · ${quickCount(test.questions)} very quick` : ""}
                  {leftCount(test.questions) ? ` · left the screen on ${leftCount(test.questions)}` : ""}
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

function quickCount(questions: QuestionLine[]) {
  return questions.filter(veryQuick).length;
}

function leftCount(questions: QuestionLine[]) {
  return questions.filter((question) => question.leaves > 0).length;
}

function awayLine(question: QuestionLine) {
  if (!question.leaves) return "";
  const times = question.leaves === 1 ? "once" : `${question.leaves} times`;
  return ` · left the screen ${times}, ${question.awaySec} sec away`;
}

function tryLine(question: QuestionLine) {
  const parts = [];
  if (question.selects) parts.push(question.selects === 1 ? "selected the question once" : `selected the question ${question.selects} times`);
  if (question.shots) parts.push(question.shots === 1 ? "screenshot once" : `screenshot ${question.shots} times`);
  return parts.length ? ` · ${parts.join(" · ")}` : "";
}

function checkLine(questions: QuestionLine[], watched: boolean) {
  if (!watched) return "These checks were not on this paper.";
  const checks = sittingChecks(questions);
  return `Left the screen ${countTimes(checks.leaves)} · Selected the question ${countTimes(checks.selects)} · Screenshot ${countTimes(checks.shots)}`;
}

function countTimes(count: number) {
  return `${count} ${count === 1 ? "time" : "times"}`;
}

function LateRow({ entry }: { entry: PlanEntry }) {
  return (
    <li>
      <span lang={langOf(entry.title)}>{entry.title}<small>{formatDay(entry.date)}</small></span>
      <strong>Late</strong>
    </li>
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
