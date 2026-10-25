# RMS CET Class 9 practice

Phone-friendly tests for the 13 December 2026 written paper. Questions and the daily plan are in the app. Each submitted test is saved in Firebase Firestore, so the parent page shows the same results on any phone.

## Use it

```bash
npm install
npm run dev
```

The site stays on a sign-in page until a code is entered. Student code `9109`. Parent code `1947`. The same phone stays signed in until Log out.

He enters his name and starts today's test. Explanations stay hidden until he submits. A countdown to 13 December, 9:00 sits on the home page, with a line that gets shorter and a sentence that asks for more focus as the days drop.

Parent page: `#/parent`, after the parent code. Open that same address on your phone.

The site is published from the personal GitHub account [Anuj0411](https://github.com/Anuj0411/rms-cet-class9).

## Firebase

Scores live in the Firebase project `rms-cet-class9`, collection `rmsAttempts`. The web config stays out of git: this computer keeps it in `public/firebase-config.json`, and GitHub Actions writes the same file from the `FIREBASE_WEB_CONFIG` secret before each build. To publish a rules change:

```bash
npx firebase-tools@13 deploy --only firestore:rules
```

The rules allow a new attempt to be created and let both phones read the list. Attempts cannot be edited or deleted. The web config is a public client key; the rules are what keep the rest of the project closed.

## Paper

- Paper 1: English 50, Hindi 20, Social Science 30. Need 50%.
- Paper 2: Mathematics 50, Science 50. Need 50%.
- 200 questions, 2 hours 30 minutes, no negative marking.
- Tie-break: Mathematics, Science, English, Social Science, Hindi.
