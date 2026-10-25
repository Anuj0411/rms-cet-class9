import type { SyncState } from "./storage.ts";

export function SyncLine({ sync, error, audience = "student" }: { sync: SyncState; error: string; audience?: "student" | "parent" }) {
  if (sync === "loading") return <p className="note">Checking Firebase…</p>;
  if (sync === "live" && audience === "parent") return <p className="note">Scores come from his phone. This list updates on its own.</p>;
  if (sync === "live") return <p className="note">Scores are saved off this phone. The parent page shows the same list.</p>;
  if (sync === "error") return <p className="note">Firebase refused the result list. {error}</p>;
  return (
    <p className="note">
      Firebase is not connected yet. Add the web app config to <code>public/firebase-config.json</code>, then open this site on both phones.
    </p>
  );
}
