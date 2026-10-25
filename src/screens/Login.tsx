import { useState } from "react";
import { login, type Role } from "../auth.ts";

export function Login({ onSuccess }: { onSuccess: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("student");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="stack">
      <div className="welcome-art" aria-hidden="true">
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
          <rect x="46" y="78" width="128" height="28" rx="6" fill="#6d4db5" />
          <rect x="58" y="52" width="104" height="26" rx="6" fill="#c4b3ef" />
          <rect x="70" y="28" width="80" height="24" rx="6" fill="#ffe08a" />
          <rect x="148" y="36" width="14" height="78" rx="4" transform="rotate(18 148 36)" fill="#f0a35a" />
          <path d="M28 124h164" stroke="#1c1c1e" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <section className="card">
        <h1>Start today</h1>
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
