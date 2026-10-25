import { useEffect, useState } from "react";
import { allTopics, SUBJECT_LABEL, topicById } from "../catalog.ts";
import { TOPIC_NOTES } from "../notes/index.ts";
import type { Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { NotesList } from "../ui/NotesList.tsx";

const ORDER: Subject[] = ["maths", "science", "english", "hindi", "sst"];

export function Notes({ topicId }: { topicId?: string }) {
  if (topicId) return <Lesson topicId={topicId} />;
  return <NoteIndex />;
}

function NoteIndex() {
  const [subject, setSubject] = useState<Subject | "all">("all");
  const topics = allTopics().filter((topic) => TOPIC_NOTES[topic.id] && (subject === "all" || topic.subject === subject));
  return (
    <div className="stack">
      <section className="card">
        <p className="eyebrow">Read before the test</p>
        <h1>Subject notes</h1>
        <p className="lede">Open one topic. The bold line is the rule. A picture is there when it makes the rule easier to see. The green box is a worked example.</p>
      </section>
      <div className="chips" role="group" aria-label="Subjects">
        <button type="button" className={subject === "all" ? "chip on" : "chip"} aria-pressed={subject === "all"} onClick={() => setSubject("all")}>
          All
        </button>
        {ORDER.map((item) => (
          <button key={item} type="button" className={subject === item ? "chip on" : "chip"} aria-pressed={subject === item} onClick={() => setSubject(item)}>
            {SUBJECT_LABEL[item]}
          </button>
        ))}
      </div>
      <ul className="topic-grid">
        {topics.map((topic) => (
          <li key={topic.id}>
            <a className="topic-card" href={`#/notes/${topic.id}`}>
              <span className="topic-copy">
                <span className="topic-title" lang={langOf(topic.title)}>{topic.title}</span>
                <span className="topic-meta">{SUBJECT_LABEL[topic.subject]} · {TOPIC_NOTES[topic.id].length} points</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Lesson({ topicId }: { topicId: string }) {
  const topic = topicById(topicId);
  const bits = TOPIC_NOTES[topicId];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);
  if (!topic || !bits) {
    return (
      <section className="card">
        <a className="back" href="#/notes">All notes</a>
        <h1>That topic has no notes</h1>
        <p>Go back and pick a topic from the list.</p>
      </section>
    );
  }
  return (
    <article className="stack">
      <section className="card lesson-head">
        <a className="back" href="#/notes">All notes</a>
        <p className="eyebrow">{SUBJECT_LABEL[topic.subject]}</p>
        <h1 lang={langOf(topic.title)}>{topic.title}</h1>
        <p className="quiet">{topic.ncert}</p>
        <p className="lede">Read the bold line first. Use the picture if there is one. Then check the example.</p>
      </section>
      <NotesList bits={bits} topicId={topic.id} />
      <a className="button block" href={`#/test/${topic.id}`}>Start this test</a>
    </article>
  );
}
