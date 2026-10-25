import { useEffect, useState } from "react";
import { getApps, initializeApp } from "firebase/app";
import { collection, doc, getFirestore, onSnapshot, setDoc, type Firestore } from "firebase/firestore";
import type { Attempt, LiveTest, OpenPaper, PaperReset } from "./types.ts";

const NAME = "rms-student-name";
const LIVE = "rms-live-v1";
const PIN_OK = "rms-parent-ok";
const ATTEMPTS = "rmsAttempts";
const RESETS = "rmsResets";
const OPEN_PAPER = "rmsLive";

export const PARENT_PIN = "1947";

export type SyncState = "loading" | "live" | "missing" | "error";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const remembered = new Map<string, Attempt>();
let database: Promise<Firestore | null> | null = null;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function envConfig(): FirebaseConfig | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const appId = import.meta.env.VITE_FIREBASE_APP_ID;
  if (!apiKey || !projectId || !appId) return null;
  return {
    apiKey,
    projectId,
    appId,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "0",
  };
}

function filled(config: Partial<FirebaseConfig> | null): FirebaseConfig | null {
  if (!config?.apiKey || !config.projectId || !config.appId) return null;
  return {
    apiKey: config.apiKey,
    projectId: config.projectId,
    appId: config.appId,
    authDomain: config.authDomain || `${config.projectId}.firebaseapp.com`,
    storageBucket: config.storageBucket || `${config.projectId}.appspot.com`,
    messagingSenderId: config.messagingSenderId || "0",
  };
}

async function connect(): Promise<Firestore | null> {
  const fromEnv = envConfig();
  let config = fromEnv;
  if (!config) {
    const response = await fetch(`${import.meta.env.BASE_URL}firebase-config.json`, { cache: "no-store" });
    if (!response.ok) return null;
    config = filled((await response.json()) as Partial<FirebaseConfig>);
  }
  if (!config) return null;
  const app = getApps()[0] ?? initializeApp(config);
  return getFirestore(app);
}

function firebaseDb() {
  database ??= connect().catch(() => null);
  return database;
}

export function getName() {
  return localStorage.getItem(NAME) ?? "";
}

export function setName(name: string) {
  localStorage.setItem(NAME, name.trim());
}

export async function savePushSubscription(role: "student" | "parent", subscription: PushSubscription) {
  const json = subscription.toJSON();
  const endpoint = json.endpoint;
  const p256dh = json.keys?.p256dh;
  const auth = json.keys?.auth;
  if (!endpoint || !p256dh || !auth) throw new Error("This browser did not return a reminder subscription.");
  const db = await firebaseDb();
  if (!db) throw new Error("Reminders are not connected yet.");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(endpoint));
  const id = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 40);
  await setDoc(doc(db, "rmsPush", id), { id, role, endpoint, p256dh, auth });
}

export async function saveOpenPaper(paper: Omit<OpenPaper, "id">) {
  const db = await firebaseDb();
  if (!db) return;
  await setDoc(doc(db, OPEN_PAPER, "current"), { ...paper, id: "current" });
}

export async function resetAttempt(attempt: Attempt) {
  const db = await firebaseDb();
  if (!db) throw new Error("The score list is not connected, so this paper was not reset.");
  const at = Date.now();
  await setDoc(doc(db, RESETS, attempt.id), {
    id: attempt.id,
    kind: "attempt",
    testId: attempt.testId,
    attemptId: attempt.id,
    at,
  });
}

export async function resetOpenPaper(paper: OpenPaper) {
  const db = await firebaseDb();
  if (!db) throw new Error("The score list is not connected, so this paper was not reset.");
  const at = Date.now();
  const id = `live-${paper.testId}-${at}`;
  await setDoc(doc(db, RESETS, id), {
    id,
    kind: "live",
    testId: paper.testId,
    at,
  });
  await saveOpenPaper({ testId: paper.testId, title: paper.title, startedAt: paper.startedAt, open: false });
}

export async function saveAttempt(attempt: Attempt) {
  const db = await firebaseDb();
  if (!db) {
    throw new Error("This result was not saved. The score list is not connected, so nothing was kept on this phone.");
  }
  await setDoc(doc(db, ATTEMPTS, attempt.id), attempt);
  remembered.set(attempt.id, attempt);
}

export function getLive(): LiveTest | null {
  return read<LiveTest | null>(LIVE, null);
}

export function setLive(live: LiveTest | null) {
  if (!live) localStorage.removeItem(LIVE);
  else localStorage.setItem(LIVE, JSON.stringify(live));
}

export function parentUnlocked() {
  return sessionStorage.getItem(PIN_OK) === "yes";
}

export function unlockParent(pin: string) {
  if (pin.trim() !== PARENT_PIN) return false;
  sessionStorage.setItem(PIN_OK, "yes");
  return true;
}

function merge(rows: Attempt[]) {
  const byId = new Map(rows.map((item) => [item.id, item]));
  for (const attempt of remembered.values()) {
    if (!byId.has(attempt.id)) byId.set(attempt.id, attempt);
  }
  return [...byId.values()].sort((a, b) => b.submittedAt - a.submittedAt);
}

function hiddenAttemptIds(resets: PaperReset[]) {
  return new Set(
    resets.flatMap((item) => (item.kind === "attempt" && item.attemptId ? [item.attemptId] : [])),
  );
}

export function useAttempts() {
  const [rows, setRows] = useState<Attempt[]>(() => merge([]));
  const [resets, setResets] = useState<PaperReset[]>([]);
  const [sync, setSync] = useState<SyncState>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let stopAttempts = () => {};
    let stopResets = () => {};
    let cancelled = false;
    void firebaseDb().then((db) => {
      if (cancelled) return;
      if (!db) {
        setSync("missing");
        setRows(merge([]));
        return;
      }
      stopAttempts = onSnapshot(
        collection(db, ATTEMPTS),
        (snap) => {
          setRows(merge(snap.docs.map((item) => item.data() as Attempt)));
          setSync("live");
          setError("");
        },
        (err) => {
          setSync("error");
          setError(err.message);
          setRows(merge([]));
        },
      );
      stopResets = onSnapshot(collection(db, RESETS), (snap) => {
        setResets(snap.docs.map((item) => item.data() as PaperReset));
      });
    });
    return () => {
      cancelled = true;
      stopAttempts();
      stopResets();
    };
  }, []);

  const hidden = hiddenAttemptIds(resets);
  const attempts = rows.filter((attempt) => !hidden.has(attempt.id));
  return { attempts, sync, error };
}

export function usePaperResets() {
  const [resets, setResets] = useState<PaperReset[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stop = () => {};
    let cancelled = false;
    void firebaseDb().then((db) => {
      if (cancelled) return;
      if (!db) {
        setReady(true);
        return;
      }
      stop = onSnapshot(collection(db, RESETS), (snap) => {
        setResets(snap.docs.map((item) => item.data() as PaperReset));
        setReady(true);
      });
    });
    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  return { resets, ready };
}

export function useOpenPaper() {
  const [paper, setPaper] = useState<OpenPaper | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stop = () => {};
    let cancelled = false;
    void firebaseDb().then((db) => {
      if (cancelled) return;
      if (!db) {
        setReady(true);
        return;
      }
      stop = onSnapshot(doc(db, OPEN_PAPER, "current"), (snap) => {
        setPaper(snap.exists() ? (snap.data() as OpenPaper) : null);
        setReady(true);
      });
    });
    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  return { paper, ready };
}
