# Project Review: Aventura das Letras (everything except phonetics)

> Review date: 2026-10-09. Companion to [PHONETIC_IMPROVEMENTS.md](PHONETIC_IMPROVEMENTS.md), which covers audio and pronunciation.
> Scope: `App.tsx`, screens, minigames (game logic), types, styling, build/CI, PWA, accessibility, docs.
> `tsc --noEmit` passes with no errors (TypeScript 7.0.2).

## Priority legend
| Priority | Meaning |
|---|---|
| 🔴 **P0** | Bug that breaks gameplay, progress or the learning signal |
| 🟠 **P1** | Noticeable UX, teaching or robustness problem |
| 🟡 **P2** | Code quality, maintainability, accessibility |
| 🔵 **P3** | Features / polish |

---

## 🔴 P0: Critical

### P0.1 The quiz answer is always the top-left button
- **Where:** `gameData.ts` → `quizItems[].options`, rendered as-is in [`QuizGame.tsx:51`](src/components/minigames/QuizGame.tsx#L51)
- **Problem:** in **all 14** quiz items the correct option is listed first (`options: ['UI', …]`, `['A', …]`, `['E', …]` …). A child quickly learns "tap the top-left one".
- **Fix:** shuffle the options for each question when it is shown (Fisher–Yates) and stop relying on their order in the data.

### P0.2 The Bubble game keeps scoring after it is finished (extra stars, repeated `onComplete`)
- **Where:** [`BubbleGame.tsx:92-102`](src/components/minigames/BubbleGame.tsx#L92-L102)
- **Problem:** once `score >= targetCount`, bubbles keep spawning and remain tappable. Each extra target tap passes `newScore >= targetCount` again, so another `setTimeout(onComplete, 1500)` is scheduled. The child gets +1 star per extra tap and `handleStepComplete` runs several times.
- **Fix:** add an `isDone` flag (ref/state). Stop the spawn interval and ignore taps once it is set. Use `setScore(s => s + 1)`.

### P0.3 Timers keep running after leaving a minigame
- **Where:** `QuizGame`, `WordHuntGame`, `BubbleGame` (the `setTimeout`s after a correct answer); `App.handleStepComplete`
- **Problem:** if the child taps 🗺️ during the 1.5 s success delay, the timer still fires:
  - Quiz/Bubble → `onComplete()`: a star is awarded and the step is unlocked **without finishing it**. Quiz can even open the Celebration screen.
  - WordHunt → `setState` on an unmounted component.
- **Fix:** keep the timer ids in a ref and clear them in the `useEffect` cleanup. Also call `sounds.stopAudio()` on unmount (the voice currently keeps talking on the map).

### P0.4 Bubble distractors include the target letter
- **Where:** [`BubbleGame.tsx:44-47`](src/components/minigames/BubbleGame.tsx#L44-L47)
- **Problem:** in step 2 ("rebenta bolhas com a **letra I**"), the bubbles **UI** and **IU** appear as *wrong* answers, yet both contain an I. The child is told "Essa é a combinação UI!", which is confusing and pedagogically wrong. The distractors also include letters and combinations **not taught yet** (A, E, UI, IU in step 2).
- **Fix:**
  - Single-letter steps: distractors are single letters only.
  - Combination steps: use the reversed combination plus single letters.
  - Optionally only use letters already learned (from `unlockedStep`).

### P0.5 Tailwind classes that don't exist (silently ignored)
Tailwind v3 has no `border-3`, `w-26`/`h-26`, `h-22` or `scale-102` (confirmed absent from `dist/assets/*.css`):

| Class | Files | Effect |
|---|---|---|
| `border-3` | Bubble ×2, Explorer ×2, WordHunt, MascotDino | **No border at all.** Cards and speech bubble lose their outline |
| `sm:w-26 sm:h-26` | Explorer | big letter tile doesn't grow |
| `sm:h-22` | Quiz | option buttons don't grow |
| `scale-102` | WordHunt | no "completed" scale effect |

- **Fix:** add `borderWidth: { 3: '3px' }`, `spacing: { 22: '5.5rem', 26: '6.5rem' }` and `scale: { 102: '1.02' }` to `tailwind.config.js`, or use arbitrary values (`border-[3px]`).

---

## 🟠 P1: UX, teaching, robustness

### P1.1 The star count doesn't mean anything
- `handleStepComplete` adds **+1 star every time a step is completed, including replays**, so stars grow without limit. `CelebrationScreen` caps the display at `Math.min(stars, 14)`, a leftover from the old 14-step version (there are now 20).
- **Fix:** store `completedSteps: number[]` (or up to 3 stars per step, based on mistakes). Derive the total from that, and show `stars / maxStars`.

### P1.2 TraceGame is dead code
- No step has `type: 'trace'` any more (drawing was removed), but `App.tsx` still imports and renders `TraceGame`, and `gameData.ts` keeps about 120 lines of `tracing` data plus 10 `trace_*` MP3s.
- **Pick one:** delete it (component, types, data, audio), **or** keep it behind a flag such as `ENABLE_TRACING` with a `// TODO`.

### P1.3 Quiz question selection is unbalanced
- `.sort(() => Math.random() - 0.5).slice(0, 7)` is a biased shuffle, and it can pick **no** UI/IU questions or only A/E ones.
- **Fix:** Fisher–Yates, and pick at least one question per `LetterKey` (6 letters plus 1 random = 7).

### P1.4 The child can't tell why a step is locked
- Tapping a locked step only plays `playTryAgain()` with no words. Add a Dino line such as *"Primeiro acaba a etapa X!"*, and scroll to the current step.

### P1.5 Text on screen is outdated
- `WelcomeScreen` says "Aprende as letras I, U, A e E" and leaves out **UI / IU**.
- Bubble completion fallback: `"…bolhas da letra ${letter}"` is wrong for combinations. Use `itemLabel`.
- `step.dinoSpeech` is defined for all 20 steps but **never used**. Show it when the step opens (with an MP3).

### P1.6 Reset progress is too easy for a child
- `window.confirm()` is one tap away on the map. A 6-year-old can wipe their progress, and the native dialog breaks the game's look.
- **Fix:** add a simple parent check, e.g. long-press 3 s or "Quanto é 7 + 5?", inside a custom modal.

### P1.7 Sound on/off is not remembered
- `isSoundOn` resets to `true` on every load. Save it in `localStorage` alongside the progress.

### P1.8 Saved values from `localStorage` are not checked
- `parseInt('abc')` gives `NaN`, and `Math.max(0, NaN)` is also `NaN`, so a corrupted value breaks the map. Use `Number.isFinite(x) ? x : 0`, and store everything as one versioned JSON key (`dino_progress_v1`). That will make future migrations (new letters, new steps) much easier.

### P1.9 `talk` expression is never used
- `MascotDino` supports `expression="talk"` (animated mouth), but nothing sets it. Add an "is speaking" callback to `soundEngine` (e.g. `onSpeakingChange`) so the Dino talks while audio plays.

---

## 🟡 P2: Code quality, accessibility, platform

### P2.1 Accessibility
- **Tappable `<div>`s:** map steps, Dino, the Explorer letter tile and the word cards are `<div onClick>`. Use `<button>` so they work with keyboard, switch access and screen readers.
- **Icon-only buttons** (map, sound, hear prompt) have `title` but some lack `aria-label`.
- **Zoom is blocked:** `index.html` sets `user-scalable=no, maximum-scale=1.0`, which hurts low-vision users. `touch-action: manipulation` already prevents double-tap zoom, so the zoom block can go.
- **Motion:** many infinite animations run at once (`animate-bounce-soft` on the speech bubble, `pulse-glow` on the header star, the current step, the Start button, and celebration stars). Respect `prefers-reduced-motion`, and keep it to one constantly animated element per screen; continuous motion distracts young learners.
- The global `* { user-select: none }` is fine for the game area. Keep it off any future parent/settings text.

### P2.2 State & architecture
- `App.tsx` handles screen routing, progress, persistence and Dino state with 7 `useState`s. Extract:
  - a `useProgress()` hook (load, save, complete, reset, validate)
  - a `useDino()` hook or context (speech, expression, talk)
- Every minigame repeats `isCombo ? 'a combinação' : 'a letra'`. Move it to a `labelFor(letter)` helper in `utils/`.
- `currentLetter` silently defaults to `'I'` when the step has no letter. Make that explicit, or add a type that rules it out.
- The `StepType` union mixes **screens** (`welcome`, `map`) with **step types**. Split it into `Screen` and `StepType`.

### P2.3 Data model
- `id` is optional in `WordItem`, and code falls back with `item.id || item.word`. Make `id` required, and generate the audio keys from it (see the phonetics doc).
- The `*AudioKey` fields are defined but unused. Either use them or remove them.
- Add a **dev-time validator** (a small script or a test) that checks every step's `letter` exists, every `middleWord` actually contains the target, every audio key has an MP3, and the options include the answer.

### P2.4 Tooling
- There is **no linter or formatter**. Add ESLint (`typescript-eslint`, `react-hooks`, `jsx-a11y`) and Prettier. `react-hooks/exhaustive-deps` and `jsx-a11y` would have caught P0.3 and P2.1.
- There are **no tests**. Start with Vitest for the pure logic (`tokenizeWord`, quiz selection and shuffling, progress reducer, data validator).
- **CI:** `deploy.yml` only builds. Add a `lint` and `test` step before the build, and run CI on pull requests too.
- `package.json` has `typescript: ^7.0.2` (native compiler). Fine, but pin an exact version so local and CI behave the same.

### P2.5 PWA / offline (important for tablets in a classroom)
- The README advertises PWA install, but there is **no `manifest.webmanifest`, no icons and no service worker**.
- Add `vite-plugin-pwa`: a manifest (name, icons, `display: standalone`, landscape/portrait lock) and Workbox to **precache all 236 MP3s**. The game would then work offline, and audio would start instantly.
- Add a favicon / apple-touch-icon (there is none yet).

### P2.6 Privacy & performance
- **Google Fonts** is loaded from `fonts.googleapis.com`. That sends child IP addresses to Google (a GDPR concern for an EU kids' app) and fails offline. Self-host it with `@fontsource/fredoka` (only weights 600/700/900 are used).
- Add a `<meta name="description">` and Open Graph tags (the title is already good).
- `lucide-react` imports are tree-shaken, OK. `canvas-confetti` is fine.

### P2.7 iOS audio reliability
- Autoplayed `new Audio()` elements started inside `useEffect` (intros, prompts) are **not** inside a tap handler. iOS Safari often blocks them even after the first unlock, so the game falls back to the device voice.
- **Fix:** decode the MP3s into `AudioBuffer`s with the `AudioContext` that `unlockAudio()` already unlocks, and play them through Web Audio. That is reliable once unlocked, has lower latency, and lets you mix sound effects with the voice.

---

## 🔵 P3: Features & polish

| Idea | Why |
|---|---|
| **Parent area** (behind the parent check): progress per letter, mistakes per letter, reset, sound settings | Gives parents and teachers visibility |
| **Adaptive difficulty:** fewer distractors / slower bubbles after repeated mistakes | Keeps a struggling child engaged |
| **Several children** on one tablet (simple avatar pick) | Common in classrooms and with siblings |
| **Replay review:** the map shows which steps had mistakes | Targeted practice |
| **More letters (O, consonants)**: generalise `LetterKey` into data-driven units instead of a hard-coded union | The current types and `BUTTON_CONFIG` need code changes for every new letter |
| **Landscape tablet layout:** use the width (`max-w-lg` is narrow on iPad) | Better use of tablet screens |
| **Haptics:** `navigator.vibrate(30)` on a correct answer (Android) | Extra positive feedback |

---

## 📄 Documentation
- **`instructions.md` is corrupted** (mojibake: `InstruA\u0015A�es`, `dY�\u0007`). It was saved with the wrong encoding at some point. Re-save it as UTF-8 and update it.
- **README and instructions.md are outdated:** they describe 14 or 18 steps with "Desenhar" (tracing) steps, `.js` files, and "sem downloads pesados de áudio". The game now has 20 steps, UI/IU, TypeScript, 236 MP3s and no tracing.
- Document the audio pipeline (`pip install edge-tts`, `python scripts/generate_audio.py`, and that existing files are skipped).

---

## Suggested order

| # | Item | Effort |
|---|---|---|
| 1 | P0.1 shuffle quiz options | XS |
| 2 | P0.2 Bubble `isDone` | XS |
| 3 | P0.3 timer cleanup + `stopAudio` on unmount | S |
| 4 | P0.5 Tailwind config (borders) | XS |
| 5 | P0.4 Bubble distractors | S |
| 6 | Phonetics P0.1–P0.4 (see other doc) | S–M |
| 7 | P1.1 stars model + P1.8 progress hook / validation | M |
| 8 | P1.2 delete or flag TraceGame | XS |
| 9 | P2.4 ESLint + Vitest + CI checks | M |
| 10 | P2.5 PWA/offline + P2.6 self-hosted font | M |
| 11 | P2.1 accessibility pass | M |
| 12 | Docs refresh | S |
| 13 | P3 features | L |
