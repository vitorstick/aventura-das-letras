import { describe, it, expect } from 'vitest';
import { GAME_DATA } from '../data/gameData';
import { LetterKey } from '../types/game';

describe('Step and Letter Navigation', () => {
  const taughtLetters: LetterKey[] = ['I', 'U', 'UI', 'IU', 'A', 'E', 'O'];

  it('provides a valid first step (explorer) for each taught letter', () => {
    taughtLetters.forEach(letter => {
      const firstStepIndex = GAME_DATA.steps.findIndex(s => s.letter === letter);
      expect(firstStepIndex).toBeGreaterThanOrEqual(0);

      const step = GAME_DATA.steps[firstStepIndex];
      expect(step.letter).toBe(letter);
      expect(step.type).toBe('explorer');
      expect(step.title).toBeTruthy();
      expect(step.icon).toBeTruthy();
    });
  });

  it('guarantees 3 sequential minigames (explorer, bubble, wordHunt) for each letter', () => {
    taughtLetters.forEach(letter => {
      const stepsForLetter = GAME_DATA.steps
        .map((step, idx) => ({ step, idx }))
        .filter(item => item.step.letter === letter);

      expect(stepsForLetter).toHaveLength(3);
      expect(stepsForLetter[0].step.type).toBe('explorer');
      expect(stepsForLetter[1].step.type).toBe('bubble');
      expect(stepsForLetter[2].step.type).toBe('wordHunt');

      // As 3 etapas devem ser consecutivas
      expect(stepsForLetter[1].idx).toBe(stepsForLetter[0].idx + 1);
      expect(stepsForLetter[2].idx).toBe(stepsForLetter[1].idx + 1);
    });
  });

  it('contains the final quiz and celebration steps', () => {
    const quizIndex = GAME_DATA.steps.findIndex(s => s.type === 'quiz');
    const celebrationIndex = GAME_DATA.steps.findIndex(s => s.type === 'celebration');

    expect(quizIndex).toBe(21); // Etapa 22
    expect(celebrationIndex).toBe(22); // Etapa 23
  });

  it('maps letter shortcuts to the expected target starting indices', () => {
    const expectedFirstIndices: Record<LetterKey, number> = {
      I: 0,
      U: 3,
      UI: 6,
      IU: 9,
      A: 12,
      E: 15,
      O: 18
    };

    taughtLetters.forEach(letter => {
      const actualIndex = GAME_DATA.steps.findIndex(s => s.letter === letter);
      expect(actualIndex).toBe(expectedFirstIndices[letter]);
    });
  });
});
