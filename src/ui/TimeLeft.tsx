import { useEffect, useState } from "react";
import { focusLine, timeLeft, timeRemainingShare } from "../time.ts";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function TimeLeft() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const left = timeLeft(now);
  const share = timeRemainingShare(now);
  const units = left.over
    ? [
        ["0", "days"],
        ["00", "hours"],
        ["00", "min"],
        ["00", "sec"],
      ]
    : [
        [String(left.days), "days"],
        [pad(left.hours), "hours"],
        [pad(left.minutes), "min"],
        [pad(left.seconds), "sec"],
      ];

  return (
    <section className="card time-card" aria-label="Time left before the paper">
      <p className="eyebrow">Time left · 13 December, 9:00</p>
      <div className="time-grid">
        {units.map(([value, label]) => (
          <div className="time-unit" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div
        className="time-track"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(share * 100)}
        aria-label="Share of the plan still left"
      >
        <span style={{ width: `${share * 100}%` }} />
      </div>
      <p className="quiet time-left-note">
        {left.over ? "The morning of the paper has passed." : "The bar is the time still left. It only gets shorter."}
      </p>
      <blockquote className="time-quote">{focusLine(left)}</blockquote>
    </section>
  );
}
