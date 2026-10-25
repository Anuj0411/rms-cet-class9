import { useState } from "react";
import { login, type Role } from "../auth.ts";
import { TimeLeft } from "../ui/TimeLeft.tsx";

export function Login({ onSuccess }: { onSuccess: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("student");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="stack">
      <TimeLeft />
      <section className="card">
        <p className="eyebrow">Closed</p>
        <h1>Sign in</h1>
        <p className="lede">This page is only for the student and the parent. Pick who you are, then enter the code.</p>
        <div className="who" role="group" aria-label="Who is signing in">
          <button type="button" aria-pressed={role === "student"} onClick={() => setRole("student")}>
            Student
          </button>
          <button type="button" aria-pressed={role === "parent"} onClick={() => setRole("parent")}>
            Parent
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (login(role, code)) onSuccess(role);
            else setError("That code is not right.");
          }}
        >
          <label className="field">
            Code
            <input
              className="pin-input"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setError("");
              }}
              inputMode="numeric"
              autoComplete="off"
              autoFocus
            />
          </label>
          {error ? <p className="note">{error}</p> : null}
          <button className="button block" type="submit">Sign in</button>
        </form>
      </section>
    </div>
  );
}
