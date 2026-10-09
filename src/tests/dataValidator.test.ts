import { describe, it, expect } from 'vitest';
import { GAME_DATA } from '../data/gameData';
import { LetterKey } from '../types/game';

describe('GAME_DATA integrity validator', () => {
  it('has valid step sequence from 1 to 20', () => {
    expect(GAME_DATA.steps).toHaveLength(20);
    GAME_DATA.steps.forEach((step, idx) => {
      expect(step.id).toBe(idx + 1);
      expect(step.title).toBeTruthy();
      expect(step.subtitle).toBeTruthy();
      expect(step.icon).toBeTruthy();
    });
  });

  it('checks that all steps referencing a letter point to valid letter data', () => {
    const validLetters: (LetterKey | 'ALL')[] = ['I', 'U', 'UI', 'IU', 'A', 'E', 'ALL'];
    for (const step of GAME_DATA.steps) {
      if (step.letter) {
        expect(validLetters).toContain(step.letter);
        if (step.letter !== 'ALL') {
          expect(GAME_DATA.letters[step.letter as LetterKey]).toBeDefined();
        }
      }
    }
  });

  it('checks that all middleWords contain their target letter/combination', () => {
    for (const [letterKey, data] of Object.entries(GAME_DATA.letters)) {
      for (const middleWord of data.middleWords) {
        const wordUpper = middleWord.word.toUpperCase();
        const targetUpper = letterKey.toUpperCase();
        expect(
          wordUpper.includes(targetUpper),
          `Word "${middleWord.word}" for letter "${letterKey}" must contain "${letterKey}"`
        ).toBe(true);
      }
    }
  });

  it('checks that all quizItems contain their correct letter in options', () => {
    for (const item of GAME_DATA.quizItems) {
      expect(item.word).toBeTruthy();
      expect(item.letter).toBeTruthy();
      if (item.options) {
        expect(item.options).toContain(item.letter);
      }
    }
  });

  it('checks that all letter words have spelling arrays matching word characters', () => {
    for (const [, data] of Object.entries(GAME_DATA.letters)) {
      for (const wordItem of data.words) {
        expect(wordItem.word).toBeTruthy();
        expect(wordItem.emoji).toBeTruthy();
        if (wordItem.spelling) {
          expect(wordItem.spelling.length).toBeGreaterThan(0);
        }
      }
    }
  });
});
