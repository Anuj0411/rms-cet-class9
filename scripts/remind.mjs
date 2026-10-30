import { readFile } from "node:fs/promises";
import webpush from "web-push";
import { istNow, missedNotice, reminderNotice } from "../src/remind.ts";

async function documents(config, collection) {
  const out = [];
  let pageToken = "";
  do {
    const url = new URL(`https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/${collection}`);
    url.searchParams.set("pageSize", "200");
    url.searchParams.set("key", config.apiKey);
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Could not read ${collection} (${response.status}). No notification was sent.`);
    const body = await response.json();
    out.push(...(body.documents ?? []));
    pageToken = body.nextPageToken ?? "";
  } while (pageToken);
  return out;
}

function value(field) {
  return field?.stringValue ?? field?.integerValue ?? field?.doubleValue ?? "";
}

function voidedAttemptIds(docs) {
  const ids = new Set();
  for (const document of docs) {
    const fields = document.fields ?? {};
    if (value(fields.accountId) === "demo") continue;
    if (value(fields.kind) !== "attempt") continue;
    const attemptId = value(fields.attemptId);
    if (attemptId) ids.add(attemptId);
  }
  return ids;
}

function attempts(docs, voided) {
  return docs.flatMap((document) => {
    const fields = document.fields ?? {};
    if (value(fields.accountId) === "demo") return [];
    const id = value(fields.id);
    if (id && voided.has(id)) return [];
    const testId = value(fields.testId);
    const submitted = value(fields.submittedAt);
    return testId && submitted ? [{ testId, submittedAt: Number(submitted) }] : [];
  });
}

function phones(docs) {
  return docs.flatMap((document) => {
    const fields = document.fields ?? {};
    if (value(fields.accountId) === "demo") return [];
    const endpoint = value(fields.endpoint);
    const p256dh = value(fields.p256dh);
    const auth = value(fields.auth);
    const role = value(fields.role);
    if (!endpoint || !p256dh || !auth) return [];
    return [{ role, subscription: { endpoint, keys: { p256dh, auth } } }];
  });
}

const config = JSON.parse(await readFile(new URL("../public/firebase-config.json", import.meta.url), "utf8"));
if (!config.apiKey || !config.projectId) {
  console.log("Firebase config is missing. No notification was sent.");
  process.exit(0);
}

const { day, hour } = istNow();
const missed = hour >= 20;
let voided = new Set();
try {
  voided = voidedAttemptIds(await documents(config, "rmsResets"));
} catch {
  console.log("Reset list was not read. Submitted papers are still counted.");
}
const saved = attempts(await documents(config, "rmsAttempts"), voided);
const notice = missed ? missedNotice(day, saved) : reminderNotice(day, saved);
if (!notice) {
  console.log(missed ? "Nothing was missed today." : "Today's tests are done, or nothing is scheduled.");
  process.exit(0);
}

const targets = phones(await documents(config, "rmsPush")).filter((phone) => missed || phone.role === "student");
if (process.env.DRY_RUN === "1") {
  console.log(JSON.stringify({ notice, phones: targets.length }));
  process.exit(0);
}

const publicKey = process.env.VAPID_PUBLIC_KEY ?? "";
const privateKey = process.env.VAPID_PRIVATE_KEY ?? "";
if (!publicKey || !privateKey) {
  console.log("Notification keys are not connected yet. No notification was sent.");
  process.exit(0);
}
if (!targets.length) {
  console.log("No phone has turned reminders on.");
  process.exit(0);
}

webpush.setVapidDetails("mailto:29908574+Anuj0411@users.noreply.github.com", publicKey, privateKey);
let sent = 0;
for (const target of targets) {
  try {
    await webpush.sendNotification(target.subscription, JSON.stringify(notice));
    sent += 1;
  } catch (error) {
    const status = error?.statusCode;
    if (status === 404 || status === 410) console.log("A phone is no longer subscribed.");
    else console.log(`A notification failed (${status ?? "unknown"}).`);
  }
}
console.log(`Sent ${sent} notification${sent === 1 ? "" : "s"}.`);
