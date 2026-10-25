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
  ["/", "Home"],
  ["/plan", "Plan"],
  ["/notes", "Notes"],
  ["/formulas", "Sheet"],
  ["/parent", "Scores"],
] as const;

function current(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

function TabIcon({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true };
  if (name === "Home") {
    return <svg {...common}><path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" /></svg>;
  }
  if (name === "Plan") {
    return <svg {...common}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /></svg>;
  }
  if (name === "Notes") {
    return <svg {...common}><path d="M7 4h8l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><path d="M15 4v4h4M8 13h8M8 17h5" /></svg>;
  }
  if (name === "Scores") {
    return <svg {...common}><path d="M5 19V9M12 19V5M19 19v-7" /></svg>;
  }
  return <svg {...common}><path d="M6 4h12v16H6z" /><path d="M9 8h6M9 12h6" /></svg>;
}

export default function App() {
  const path = usePath();
  const [role, setRole] = useState<Role | null>(() => getRole());
  const test = path.match(/^\/test\/([^/]+)$/);
  const review = path.match(/^\/review\/([^/]+)$/);
  const note = path.match(/^\/notes\/([^/]+)$/);

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
  else if (note) screen = <Notes topicId={decodeURIComponent(note[1])} />;
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
      </header>
      <main className={test ? "during-test" : undefined}>{screen}</main>
      <nav className="tabbar" aria-label="Pages">
        {links.map(([href, label]) => (
          <a key={href} href={`#${href}`} aria-current={current(path, href) ? "page" : undefined}>
            <TabIcon name={label} />
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
