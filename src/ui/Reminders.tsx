import { useEffect, useState } from "react";
import { VAPID_PUBLIC_KEY } from "../vapidPublic.ts";
import { savePushSubscription } from "../storage.ts";

type Phase = "checking" | "unsupported" | "denied" | "off" | "on" | "saving" | "failed";

function keyBytes(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}

export function Reminders({ role }: { role: "student" | "parent" }) {
  const [phase, setPhase] = useState<Phase>("checking");
  const [problem, setProblem] = useState("");

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
      setPhase("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setPhase("denied");
      return;
    }
    void navigator.serviceWorker.getRegistration().then(async (registration) => {
      const existing = await registration?.pushManager.getSubscription();
      setPhase(existing ? "on" : "off");
    }).catch(() => setPhase("off"));
  }, []);

  async function turnOn() {
    setPhase("saving");
    setProblem("");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setPhase(permission === "denied" ? "denied" : "off");
        return;
      }
      const registration = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
      await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: keyBytes(VAPID_PUBLIC_KEY),
      });
      await savePushSubscription(role, subscription);
      setPhase("on");
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Reminders could not be turned on.");
      setPhase("failed");
    }
  }

  const student = role === "student";
  return (
    <section className="card">
      <h2>Reminders</h2>
      <p>
        {student
          ? "From 8:00 to 6:00, a notification every 2 hours if today's tests are still open. At 8:00 in the evening, one more if a test was missed. Tap it to open today's notes and tests."
          : "At 8:00 in the evening, this phone is notified if a required test was missed."}
      </p>
      {phase === "checking" ? <p className="quiet">Checking this phone.</p> : null}
      {phase === "unsupported" ? <p>This browser cannot show notifications. Use Chrome on the phone.</p> : null}
      {phase === "denied" ? <p>Notifications are blocked. Allow them for this site in the phone settings, then come back.</p> : null}
      {phase === "on" ? <p>Reminders are on for this phone.</p> : null}
      {phase === "failed" ? <p>{problem}</p> : null}
      {phase === "off" || phase === "failed" || phase === "saving" ? (
        <button className="button block" type="button" onClick={() => void turnOn()} disabled={phase === "saving"}>
          {phase === "saving" ? "Turning on" : "Turn on reminders"}
        </button>
      ) : null}
    </section>
  );
}
