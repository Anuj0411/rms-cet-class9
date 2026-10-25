import { allTopics, SUBJECT_LABEL } from "../catalog.ts";
import { TOPIC_NOTES } from "../notes/index.ts";
import type { Subject } from "../types.ts";
import { langOf } from "../ui/lang.ts";
import { NotesList } from "../ui/NotesList.tsx";

const ORDER: Subject[] = ["maths", "science", "english", "hindi", "sst"];

export function Notes() {
  const topics = allTopics();
  return (
    <div className="stack">
      <section className="card">
        <p className="eyebrow">Read before the test</p>
        <h1>Subject notes</h1>
        <p className="lede">
          These are the points the paper can ask. Read a topic before you start its test.
          The same notes open again on the test page. The words are kept simple, and an example is added where a method or a fact is easy to mix up.
        </p>
      </section>
      {ORDER.map((subject) => {
        const items = topics.filter((topic) => topic.subject === subject && TOPIC_NOTES[topic.id]);
        return (
          <details key={subject} className="fold" name="note-subjects">
            <summary>
              <span>{SUBJECT_LABEL[subject]}</span>
              <small>{items.length} topics</small>
            </summary>
            {items.map((topic) => (
              <details key={topic.id} className="fold inner">
                <summary lang={langOf(topic.title)}>{topic.title}</summary>
                <NotesList bits={TOPIC_NOTES[topic.id]} />
                <p className="quiet">{topic.ncert}</p>
              </details>
            ))}
          </details>
        );
      })}
    </div>
  );
}
