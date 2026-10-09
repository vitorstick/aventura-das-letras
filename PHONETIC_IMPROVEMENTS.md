# Phonetic & Audio Improvements: Priority Roadmap

> Review date: 2026-10-09. Scope: `src/utils/soundEngine.ts`, `src/data/gameData.ts`, `scripts/generate_audio.py`, `src/components/minigames/*`
> Target: 6-year-old children, **European Portuguese (pt-PT)**, voice `pt-PT-RaquelNeural`

## Priority legend

| Priority | Meaning | When |
|---|---|---|
| 🔴 **P0** | Broken: audio is missing or wrong right now | Fix immediately |
| 🟠 **P1** | Wrong pronunciation or wrong teaching signal for the child | Next iteration |
| 🟡 **P2** | Consistency and robustness | Soon |
| 🔵 **P3** | New learning features / nice to have | Backlog |

---

## 🔴 P0: Critical bugs

### P0.1 MP3 URLs ignore the Vite `base`, so all 236 files return 404
- **Where:** [`soundEngine.ts:166`](src/utils/soundEngine.ts#L166)
- **Problem:** `/audio/${name}.mp3` is requested, but `vite.config.ts` sets `base: '/aventura-das-letras/'`.
  Tested on the dev server: `/audio/letter_sound_i.mp3` → **404**; `/aventura-das-letras/audio/letter_sound_i.mp3` → **200**.
- **Effect:** the Raquel Neural recordings are **never** played. Everything falls back to the device's speech synthesis, which varies by device and may even be pt-BR.
- **Fix:**
  ```ts
  const audioUrl = `${import.meta.env.BASE_URL}audio/${name}.mp3`;
  ```
- **Effort:** 1 line

### P0.2 Word Hunt word audio uses a doubled key and plays nothing
- **Where:** [`WordHuntGame.tsx:118`](src/components/minigames/WordHuntGame.tsx#L118), [`:199`](src/components/minigames/WordHuntGame.tsx#L199)
- **Problem:** `playWord("word_only_peixe")` strips the `_` characters and adds the prefix again, giving `word_only_wordonlypeixe.mp3`. No fallback text is passed, so there is **silence**.
- **Fix:** pass the plain word (`currentWordData.word`) and `display` as the fallback, or add `playByKey(key, fallback)` and use the `audioWordKey` fields directly.
- **Effort:** small

### P0.3 Cancelled speech still runs its "on end" callback
- **Where:** `speak()` and `playAudioFile()` in `soundEngine.ts`
- **Problem:** `speechSynthesis.cancel()` triggers `onerror` → `onEnd()`, so a chained sound still plays after the child has moved on. Example: tap the big letter, then a card; the letter sound plays over the word. Also, `onerror` and `play().catch` can **both** call `speak()`.
- **Fix:** keep a playback counter (`this.playId++`) and ignore callbacks from stale playbacks. Ignore `event.error === 'interrupted'`. Make sure the fallback runs only once.
- **Effort:** small

### P0.4 72 recorded files are never used
- **Where:** `WordHuntGame.tsx`, `BubbleGame.tsx`, `TraceGame.tsx`, `ExplorerGame.tsx`
- **Problem:** the script now generates `hunt_prompt_*` / `hunt_success_*` (48), `bubble_mission_*` / `bubble_complete_*` (12), `trace_hint_*` / `trace_success` (10) and `letter_card_*` (6). The components still call `sounds.speak(...)` with hard-coded text, so the child hears a robotic voice next to Raquel.
- **Fix:** add `playHuntPrompt/Success`, `playBubbleMission/Complete`, `playTraceHint` helpers, in the same style as the existing `playQuiz*`, and use them in the components.
- **Effort:** medium

---

## 🟠 P1: Pronunciation & teaching accuracy (pt-PT)

### P1.1 Single vowels are read as articles or conjunctions
In pt-PT TTS, a vowel on its own is read as a word, not as a letter name:

| Text | TTS reads it as | Should be |
|---|---|---|
| `"A"` | article *a* → [ɐ] | letter **[a]** → `"Á"` |
| `"E"` | conjunction *e* → [i] | letter **[ɛ]** → `"É"` |
| `"O"` | article *o* → [u] | letter **[ɔ]** → `"Ó"` |

- **Affected keys:** `spell_a`, `spell_e`, `spell_o`, `letter_sound_a`, and the ending of `letter_intro_a/e` and `letter_card_a/e` ("Faz o som: A!" / "E!").
- `letter_sound_e = "É"` is already correct. Apply the same idea to the rest.
- ⚠️ Delete those MP3s before running the script again (see P2.2).

### P1.2 The example words don't start with the sound being taught
Unstressed vowels are reduced in pt-PT, so the child hears the letter sound, then a different first sound:

| Letter | Word | Actual start | OK? |
|---|---|---|---|
| E | Elefante, Estrela, Escada, Espelho | [i]/[ɨ] | ❌ none start with [ɛ] |
| A | Abelha, Avião, Ananás | [ɐ] | ⚠️ |
| A | Árvore | [a] | ✅ |
| I | Iogurte | [j] glide | ❌ |
| I | Ilha, Igreja, Iguana | [i] | ✅ |
| U | Urso, Uvas, Unha, Unicórnio | [u] | ✅ |

**Suggested replacements** (stressed first vowel):
- **E:** Égua 🐴, Eco 📣
- **A:** Água 💧, Asa 🪽 (keep Árvore)
- **I:** Íman 🧲, Iglu 🛖 (replace Iogurte)

Alternative: keep the current words and **teach the different sounds on purpose**, e.g. "O E às vezes soa /i/". Add a `phoneme` field to each word.
The same words are also used in `quizItems` and the `quiz_*` audio, so update them together.

### P1.3 "UI" / "IU" in capitals may be read letter by letter
- **Affected:** `letter_intro_ui/iu`, `letter_card_ui/iu`, `word_phrase_uivo/cuidado/fui/viu/riu/subiu/fugiu`, `quiz_*_ui/uivo/viu/riu`, `hunt_*` for UI/IU, `bubble_*_ui/iu`
- **Fix:** use lower case in the **spoken** text (`"ui"`, `"iu"`) and keep capitals on screen. Listen to each file to check.
- `letter_name_ui = "Combinação U I"`: consider *"U mais I… ui!"* so the child hears both letter names and the blended sound.

### P1.4 The quiz shows the answer on screen
- **Where:** [`QuizGame.tsx`](src/components/minigames/QuizGame.tsx). The written word (e.g. "Uvas") is visible, so the child can answer by looking at the first letter.
- **Fix:** show only the emoji and play the word. This turns the quiz into a real **first-sound** listening task.
- Also, the prompts read the options out loud as `"A, E, I ou U?"`, which brings back the P1.1 problem. Use `"Á, É, I ou U?"`.

### P1.5 Spelling of Ç, Ô and accented letters
- `Ç` maps to `spell_c` ("Cê"). Add `spell_cedilla_c` = **"Cê cedilhado"**.
- `Ô` maps to `spell_acute_o` (open ó). Add `spell_circumflex_o` = **"Ô"**.
- `À`/`Â` map to plain `spell_a`. Acceptable, but `Â` is closed [ɐ].
- Accented letters on their own ("Ã", "Í") come out unpredictably. Consider *"A com til"*, *"I com acento"*, or spelling **ão** as one unit (see P3.2).

### P1.6 Mismatched text between the screen and the audio
`gameData.ts` `spokenIntro` says "Ouve como faz: **Iiiii!**" but the MP3 says "**I!**". The `audioText` and phrase files are in sync today, but nothing enforces it (see P2.1).

---

## 🟡 P2: Consistency & robustness

### P2.1 One source of truth for audio text
- The text is currently duplicated in `generate_audio.py` and `gameData.ts` (prompts, intros, hints).
- **Fix:** have `generate_audio.py` read a JSON export of `gameData.ts` (or write the generator as a `tsx` script) so every spoken line is defined once.

### P2.2 Edited text never gets re-recorded
- `generate_single()` skips any file that already exists, so **edited text keeps the old recording**.
- **Fix:** write `public/audio/manifest.json` with `{ key: sha1(text + voice + rate) }` and regenerate when the hash changes. Add a `--force` flag.

### P2.3 Spelling uses fixed 750 ms delays
- **Where:** [`ExplorerGame.tsx`](src/components/minigames/ExplorerGame.tsx) `handleAutoSpell`
- Long names ("Dáblio", "Cê cedilhado") or slow TTS get cut off, because each new letter calls `stopAudio()`.
- **Fix:** chain each letter with the `onEnd` callback (needs P0.3 first).

### P2.4 Feedback audio gets cut off by the next prompt
- In Word Hunt and Quiz, the success audio (feedback, then word) is interrupted by a `setTimeout(…, 1500)` that starts the next prompt.
- **Fix:** move to the next item in the last `onEnd`, with a timeout only as a safety net.

### P2.5 Preload audio for the current step
- Create the `Audio` objects (or `fetch` into the cache) when a minigame mounts, so the first tap has no delay on mobile Safari.

### P2.6 Warn when there is no pt-PT voice
- `hasPtPtVoice()` exists but is never called. If an MP3 fails and no pt-PT voice is available, the browser may use pt-BR. Show a discreet message to the parent, or skip the speech.

---

## 🔵 P3: New phonics features

### P3.1 Use the `syllables` field (defined but never read)
Syllable work is central to how the 1.º ciclo teaches reading in Portugal.
- **"Batimentos":** tap the Dino once per syllable, then hear *"A-be-lha"*.
- Add a **Sílabas** mode next to the Explorer's **Soletrar** button.
- **Build the word:** drag the syllable tiles into order.
- Generate `syl_*` audio, e.g. `syl_be`, `syl_lha`.

### P3.2 Show digraphs as one unit
`Ilha` is spelled `I · Éle · Agá · A`, but **LH** is a single sound /ʎ/. The same applies to **NH** (Unha, Rainha) and **ÃO** (Avião).
Add `graphemes: ['I','LH','A']` and colour-code the digraph tiles.

### P3.3 Listening-only activities
| Activity | Skill trained |
|---|---|
| **Ouve e escolhe:** hear a word, pick 1 of 3 emojis that starts with the sound | sound discrimination |
| **UI ou IU?:** hear *fui* / *viu*, pick the tile | order of the vowels in a ditongo (core of steps 7–12) |
| **Início, meio ou fim?:** where is /i/ in *Ilha* / *Livro* / *Rei*? | sound position |
| **Intruso:** *Urso, Uvas, Gato, Unha*, which one doesn't belong? | first-sound categorisation |

### P3.4 Adaptive replay
If the child answers wrong twice, play the target word slowly with the vowel stretched, e.g. *"Uuuu-vas"*. edge-tts supports per-file `rate`, e.g. `-30%`.

---

## Suggested order

| # | Item | Effort | Impact |
|---|---|---|---|
| 1 | P0.1 base URL | XS | ⭐⭐⭐⭐⭐ |
| 2 | P0.2 Word Hunt key | XS | ⭐⭐⭐ |
| 3 | P0.3 stale callbacks | S | ⭐⭐⭐ |
| 4 | P0.4 wire up the unused MP3s | M | ⭐⭐⭐⭐ |
| 5 | P1.1 + P1.3 text fixes, then regenerate | S | ⭐⭐⭐⭐ |
| 6 | P1.4 hide the word in the quiz | XS | ⭐⭐⭐⭐ |
| 7 | P1.2 revise the E / A / I word lists | M | ⭐⭐⭐⭐ |
| 8 | P2.1 + P2.2 audio pipeline (one source, hashes) | M | ⭐⭐⭐ |
| 9 | P1.5, P2.3–P2.6 | S–M | ⭐⭐ |
| 10 | P3.x new activities | L | ⭐⭐⭐⭐ (learning value) |
