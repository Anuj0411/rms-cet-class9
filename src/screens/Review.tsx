import { findQuestion, SUBJECT_LABEL, topicById } from "../catalog.ts";
import { SyncLine } from "../SyncLine.tsx";
import { useAttempts } from "../storage.ts";
import { langOf } from "../ui/lang.ts";

export function Review({ attemptId }: { attemptId: string }) {
  const { attempts, sync, error } = useAttempts();
  const attempt = attempts.find((item) => item.id === attemptId);
  if (!attempt) {
    return (
      <section className="card">
        <h1>{sync === "loading" ? "Loading this result" : "That result is not in the score list"}</h1>
        <p>
          {sync === "loading"
            ? "Fetching the saved paper."
            : "Submitted papers are kept in the shared score list, not on this phone. If it was just submitted, wait a moment and open the parent page."}
        </p>
        <SyncLine sync={sync} error={error} />
        <a className="button block" href="#/">Home</a>
      </section>
    );
  }
  const percent = attempt.total ? Math.round((attempt.score / attempt.total) * 100) : 0;
  const topic = topicById(attempt.testId);
  const missed = attempt.answers
    .map((answer, index) => ({ answer, index }))
    .filter(({ answer }) => !answer.correct);

  return (
    <div className="stack">
      <section className="card">
        <p className="eyebrow" lang={langOf(`${attempt.studentName} ${attempt.testTitle}`)}>
          {attempt.studentName} · {attempt.testTitle}
        </p>
        <h1 className="score">{attempt.score} / {attempt.total}</h1>
        <p>{percent}% · {Math.round(attempt.durationSec / 60)} min {attempt.durationSec % 60} sec</p>
        <div className="qualify-grid">
          {attempt.paper1Total ? <Qualify label="Paper 1" score={attempt.paper1Score ?? 0} total={attempt.paper1Total} /> : null}
          {attempt.paper2Total ? <Qualify label="Paper 2" score={attempt.paper2Score ?? 0} total={attempt.paper2Total} /> : null}
        </div>
        {topic && percent < 50 ? <p className="note">Under half. Reread {topic.ncert}, then redo this test tomorrow.</p> : null}
        {missed.length === 0 ? (
          <p>Every question was right.</p>
        ) : (
          <>
            <p className="eyebrow">{missed.length} missed</p>
            <div className="missed-jump" aria-label="Missed questions">
              {missed.map(({ index }) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    const item = document.getElementById(`q-${index}`);
                    if (item instanceof HTMLDetailsElement) item.open = true;
                    item?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
        <SyncLine sync={sync} error={error} />
        <a className="button ghost" href="#/parent">Open the parent report</a>
      </section>
      {attempt.answers.map((answer, index) => {
        const question = findQuestion(answer.questionId);
        if (!question) return null;
        return (
          <details className={answer.correct ? "fold hit" : "fold miss"} id={`q-${index}`} key={answer.questionId} open={!answer.correct}>
            <summary>
              {index + 1}. {answer.correct ? "Correct" : "Missed"} · {SUBJECT_LABEL[question.subject]}
            </summary>
            <h2 lang={langOf(question.stem)}>{question.stem}</h2>
            {answer.chosen === null ? <p><strong>Your answer:</strong> Not attempted</p> : null}
            <ol className="review-options">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.answer;
                const isChosen = answer.chosen === optionIndex;
                const state = isCorrect ? "right" : isChosen ? "wrong" : "";
                let tag = "";
                if (isCorrect && isChosen) tag = "Your answer · correct";
                else if (isCorrect) tag = "Correct answer";
                else if (isChosen) tag = "Your answer";
                return (
                  <li key={optionIndex} className={state ? `review-option ${state}` : "review-option"}>
                    <span className="letter">{String.fromCharCode(65 + optionIndex)}</span>
                    <p lang={langOf(option)}>
                      {option}
                      {tag ? <small>{tag}</small> : null}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="why" lang={langOf(question.explanation)}>
              <strong>Why</strong>
              {question.explanation}
            </p>
          </details>
        );
      })}
    </div>
  );
}

function Qualify({ label, score, total }: { label: string; score: number; total: number }) {
  const clear = score / total >= 0.5;
  return (
    <div className={clear ? "qualify-tile yes" : "qualify-tile no"}>
      <p className="tile-label">{label}</p>
      <strong>{score}/{total}</strong>
      <p className="tile-result">{clear ? "Clears 50%" : "Below 50%"}</p>
    </div>
  );
}
