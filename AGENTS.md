# Project Instructions & Context Guide — Aventura das Letras 🦕

This file serves as the global context and persistent instruction set for AI agents. Its contents are loaded automatically into context on every prompt, eliminating the need to inspect workspace files on startup.

---

## 1. Project Overview
- **Name:** Aventura das Letras (The Dino Game)
- **Target Audience:** 6-year-old children entering the 1st cycle of basic education in Portugal (*1.º Ciclo do Ensino Básico*).
- **Strict In-Game Language:** European Portuguese (**pt-PT**). Phonetics, vocabulary, and European spelling are mandatory for all in-game content (e.g., *ananás*, *comboio*, *autocarro*, *ecrã*, *iogurte*, *ilha*, *urso*).
- **Positive Reinforcement Psychology:**
  - No "Game Over" screens, no lost lives, no negative scoring, no jarring error sounds.
  - On mistakes: gentle wiggle animation (`wiggle`), soft spring sound (*boing*), and encouraging Dino prompt (*"Quase lá! Essa é [X]! Procura [Y]!"*).
  - On success: stars, soft arpeggio chords, and confetti bursts.
- **Target Devices:** Mobile web and tablets (iOS Safari and Android Chrome), with large touch-friendly targets (minimum 48x48px) and fluid animations.

---

## 2. Tech Stack
- **Framework:** React 18 (`react`, `react-dom`) + TypeScript (`typescript`)
- **Bundler / Dev Server:** Vite 5 (`vite`)
- **Styling:** Tailwind CSS 3 (`tailwindcss`) with custom tactile utilities (`scale-102`, `border-3`, `wiggle`) and `prefers-reduced-motion` support
- **Icons:** Lucide React (`lucide-react`)
- **Visual Effects:** Canvas Confetti (`canvas-confetti`)
- **Audio Engine:** Procedural Web Audio API synthesizer + pre-rendered `edge-tts` MP3 voice tracks (`pt-PT-RaquelNeural`)
- **Testing:** Vitest (`vitest run`)

---

## 3. Common Commands
```bash
npm run dev        # Start Vite development server
npm test           # Run Vitest test suite
npm run build      # TypeScript type check (tsc) and production build
npm run preview    # Preview production build locally
python scripts/generate_audio.py # Generate missing pt-PT MP3s (requires pip install edge-tts)
```

---

## 4. Complete File Structure Map

```
jogo_letras/
├── public/
│   └── audio/                       # High-fidelity pt-PT-RaquelNeural MP3 voice recordings
├── scripts/
│   └── generate_audio.py            # edge-tts audio generator for game vocabulary
├── src/
│   ├── components/
│   │   ├── minigames/
│   │   │   ├── BubbleGame.tsx       # Minigame: pop 5 bubbles containing target letter/diphthong
│   │   │   ├── ExplorerGame.tsx     # Letter presentation, phonics, and interactive word cards
│   │   │   ├── QuizGame.tsx         # Step 22: Final image-to-letter association quiz
│   │   │   ├── TraceGame.tsx        # Tactile letter tracing minigame (lowercase & uppercase)
│   │   │   └── WordHuntGame.tsx     # Detective minigame: find letter/diphthong inside words
│   │   ├── AdventureMap.tsx         # Forest trail map showing 23 sequential steps and stars
│   │   ├── CelebrationScreen.tsx    # Step 23: Victory screen with golden trophy, fanfare, confetti
│   │   ├── Header.tsx               # Top navigation: sound toggle, parent gate modal, star count
│   │   ├── MascotDino.tsx           # Animated SVG baby dino mascot (idle, talk with lip-sync, cheer)
│   │   ├── ParentGateModal.tsx      # Math challenge modal protecting progress reset
│   │   └── WelcomeScreen.tsx        # Initial landing screen with "Começar Aventura!" button
│   ├── data/
│   │   └── gameData.ts              # Single source of truth: letters (I, U, UI, IU, A, E, O), steps, quiz
│   ├── hooks/
│   │   └── useProgress.ts           # Progress state hook backed by localStorage (dino_progress_v1)
│   ├── tests/
│   │   ├── dataValidator.test.ts    # Structural validation of GAME_DATA and audio keys
│   │   ├── gameHelpers.test.ts      # Shuffling logic and balanced quiz generation tests
│   │   ├── progress.test.ts         # Sanitization, migration, and step boundary tests
│   │   └── tokenizeWord.test.ts     # Word splitting and phoneme highlight tests
│   ├── types/
│   │   └── game.ts                  # Core TypeScript types: LetterKey, StepType, LetterData, GameStep
│   ├── utils/
│   │   ├── confetti.ts              # Confetti burst trigger with reduced-motion check
│   │   ├── gameHelpers.ts           # Fisher-Yates shuffle and phonological tokenization
│   │   └── soundEngine.ts           # Web Audio API synthesizer + MP3 player with onSpeakingChange
│   ├── App.tsx                      # Top-level application orchestrator and screen router
│   ├── index.css                    # Tailwind directives and custom animation keyframes
│   ├── main.tsx                     # React 18 DOM entry point
│   └── vite-env.d.ts                # Vite environment typings
├── instructions.md                  # Detailed pedagogical and architectural specification
├── PLANO_1_SEMESTRE.md              # 1st-semester curriculum roadmap for upcoming letters
├── index.html                       # Base HTML with mobile meta viewport and fonts
├── package.json                     # Project dependencies and npm scripts
├── tailwind.config.js               # Tailwind CSS theme extensions
├── tsconfig.json                    # TypeScript compiler configuration
└── vite.config.ts                   # Vite configuration (relative base for GitHub Pages)
```

---

## 5. Key Modules and Contracts

### `src/types/game.ts`
- `LetterKey`: `'I' | 'U' | 'UI' | 'IU' | 'A' | 'E' | 'O'` (extensible for new letters).
- `StepType`: `'explorer' | 'bubble' | 'wordHunt' | 'trace' | 'quiz' | 'celebration'`.
- `ScreenType`: `'welcome' | 'map' | StepType`.
- `DinoExpression`: `'idle' | 'cheer' | 'talk'`.
- `GameStep`: `{ id, type, title, subtitle, icon, letter, targetCount, dinoSpeech }`.
- `LetterData`: `{ char, soundText, spokenIntro, color, words, middleWords, tracing }`.

### `src/data/gameData.ts`
- Exports `GAME_DATA`:
  - `letters`: Dictionary mapping each letter to its vocabulary cards (`words`), detective words (`middleWords`), and tactile coordinates (`tracing`).
  - `steps`: 23 sequential stages (Cycles for I, U, UI, IU, A, E, O, Quiz, and Celebration).
  - `quizItems`: Association challenge items for Step 22.

### `src/hooks/useProgress.ts`
- LocalStorage Key: `dino_progress_v1`.
- State: `unlockedStep` (current unlocked step index), `completedSteps` (array of finished IDs), `soundEnabled` (boolean).
- `sanitizeProgress(raw, maxSteps)`: Validates against null, corrupted objects, or `NaN`.

### `src/utils/soundEngine.ts`
- `sounds.playBubblePop()`, `sounds.playStar()`, `sounds.playSuccess()`, `sounds.playSoftBoing()`, `sounds.playVictoryFanfare()`: Procedural SFX via Web Audio API.
- `sounds.playAudio(path)` & `sounds.speakLetter/speakWord`: Loads MP3s from `public/audio/` respecting `import.meta.env.BASE_URL`.
- Synchronization: Notifies `onSpeakingChange(isSpeaking)` to trigger the Dino mouth opening/closing in real time.

---

## 6. Development Rules & Guidelines

1. **Strict European Portuguese (pt-PT) for In-Game Content:**
   - Never use Brazilian Portuguese vocabulary (use *comboio* not *trem*; *ecrã* not *tela*; *fato de banho* not *maiô*; *autocarro* not *ônibus*; *ananás* not *abacaxi*).
   - Match official 1st-grade phonics curriculum in Portugal.
2. **Asset Paths with `BASE_URL`:**
   - Static audio and image URLs must prefix `import.meta.env.BASE_URL` or relative paths to preserve compatibility with GitHub Pages or subfolder deployments.
3. **Test Integrity:**
   - All code/data changes must pass `npm test` without failures.
   - Any added letter must include structural tests in `src/tests/dataValidator.test.ts`.
4. **Adding New Letters/Content (from PLANO_1_SEMESTRE.md):**
   - Step 1: Add new key to `LetterKey` in `src/types/game.ts`.
   - Step 2: Add letter vocabulary and steps to `GAME_DATA` in `src/data/gameData.ts`.
   - Step 3: Run `python scripts/generate_audio.py` to create missing MP3 audio files.
   - Step 4: Run `npm test` to verify data validity and regressions.
