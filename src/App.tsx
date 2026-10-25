import { useEffect, useState } from "react";
import { getRole, logout, type Role } from "./auth.ts";
import { Home } from "./screens/Home.tsx";
import { Formulas, Interview } from "./screens/Info.tsx";
import { Login } from "./screens/Login.tsx";
import { Notes } from "./screens/Notes.tsx";
import { Parent } from "./screens/Parent.tsx";
import { PlanScreen } from "./screens/PlanScreen.tsx";
import { Review } from "./screens/Review.tsx";
import { TestScreen } from "./screens/Test.tsx";

function usePath() {
  const [path, setPath] = useState(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const onChange = () => setPath(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}

const NAV = [
  ["/plan", "Plan"],
  ["/notes", "Notes"],
  ["/formulas", "Formulas"],
  ["/interview", "Interview"],
  ["/parent", "Parent"],
] as const;

export default function App() {
  const path = usePath();
  const [role, setRole] = useState<Role | null>(() => getRole());
  const test = path.match(/^\/test\/([^/]+)$/);
  const review = path.match(/^\/review\/([^/]+)$/);

  if (!role) {
    return (
      <div className="app">
        <header className="top">
          <span className="brand">RMS CET Class 9</span>
        </header>
        <main>
          <Login onSuccess={setRole} />
        </main>
      </div>
    );
  }

  let screen = <Home />;
  if (test) screen = <TestScreen testId={decodeURIComponent(test[1])} />;
  else if (review) screen = <Review attemptId={decodeURIComponent(review[1])} />;
  else if (path === "/plan") screen = <PlanScreen />;
  else if (path === "/notes") screen = <Notes />;
  else if (path === "/parent") {
    screen = role === "parent" ? <Parent /> : (
      <section className="card">
        <h1>Parent page</h1>
        <p>The scores are for your uncle. He signs in with his own code.</p>
        <a className="button block" href="#/">Back home</a>
      </section>
    );
  } else if (path === "/formulas") screen = <Formulas />;
  else if (path === "/interview") screen = <Interview />;

  const links = NAV.filter(([href]) => href !== "/parent" || role === "parent");

  return (
    <div className={test ? "app testing" : "app"}>
      <header className="top">
        <div className="top-row">
          <a className="brand" href="#/" aria-current={path === "/" ? "page" : undefined}>
            RMS CET Class 9
          </a>
          <button
            className="logout"
            type="button"
            onClick={() => {
              logout();
              setRole(null);
            }}
          >
            Log out
          </button>
        </div>
        <nav aria-label="Pages">
          {links.map(([href, label]) => (
            <a key={href} href={`#${href}`} aria-current={path === href ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main className={test ? "during-test" : undefined}>{screen}</main>
    </div>
  );
}
