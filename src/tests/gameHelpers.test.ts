import { describe, it, expect } from 'vitest';
import { labelFor, titleLabelFor, shuffleArray, selectBalancedQuizQuestions } from '../utils/gameHelpers';
import { LetterKey, QuizItem } from '../types/game';

describe('gameHelpers', () => {
  describe('labelFor and titleLabelFor', () => {
    it('returns singular letter label for single characters', () => {
      expect(labelFor('I')).toBe('a letra I');
      expect(labelFor('A')).toBe('a letra A');
      expect(titleLabelFor('I')).toBe('da Letra I');
    });

    it('returns combination label for multi-character letters', () => {
      expect(labelFor('UI')).toBe('a combinação UI');
      expect(labelFor('IU')).toBe('a combinação IU');
      expect(titleLabelFor('UI')).toBe('da Combinação UI');
    });
  });

  describe('shuffleArray', () => {
    it('returns an array of the same length with identical items', () => {
      const original = [1, 2, 3, 4, 5, 6, 7];
      const shuffled = shuffleArray(original);
      expect(shuffled).toHaveLength(original.length);
      expect(shuffled.sort()).toEqual(original.sort());
    });

    it('does not mutate the source array', () => {
      const original = ['A', 'B', 'C'];
      const copy = [...original];
      shuffleArray(original);
      expect(original).toEqual(copy);
    });
  });

  describe('selectBalancedQuizQuestions', () => {
    const mockQuizItems: QuizItem[] = [
      { word: 'Ilha', emoji: '🏝️', letter: 'I', prompt: 'I prompt' },
      { word: 'Íman', emoji: '🧲', letter: 'I', prompt: 'I prompt 2' },
      { word: 'Urso', emoji: '🐻', letter: 'U', prompt: 'U prompt' },
      { word: 'Uvas', emoji: '🍇', letter: 'U', prompt: 'U prompt 2' },
      { word: 'Ui!', emoji: '😱', letter: 'UI', prompt: 'UI prompt' },
      { word: 'Uivo', emoji: '🐺', letter: 'UI', prompt: 'UI prompt 2' },
      { word: 'Viu', emoji: '👀', letter: 'IU', prompt: 'IU prompt' },
      { word: 'Riu', emoji: '😄', letter: 'IU', prompt: 'IU prompt 2' },
      { word: 'Árvore', emoji: '🌳', letter: 'A', prompt: 'A prompt' },
      { word: 'Água', emoji: '💧', letter: 'A', prompt: 'A prompt 2' },
      { word: 'Égua', emoji: '🐴', letter: 'E', prompt: 'E prompt' },
      { word: 'Estrela', emoji: '⭐', letter: 'E', prompt: 'E prompt 2' }
    ];

    it('selects exactly 7 questions by default', () => {
      const selected = selectBalancedQuizQuestions(mockQuizItems);
      expect(selected).toHaveLength(7);
    });

    it('contains at least one question for each target letter/combination', () => {
      const selected = selectBalancedQuizQuestions(mockQuizItems);
      const letters = new Set(selected.map(q => q.letter));
      const required: LetterKey[] = ['I', 'U', 'UI', 'IU', 'A', 'E'];
      for (const req of required) {
        expect(letters.has(req)).toBe(true);
      }
    });
  });
});
