import { describe, it, expect } from 'vitest';
import { sanitizeProgress } from '../hooks/useProgress';

describe('sanitizeProgress', () => {
  const MAX_STEPS = 20;

  it('handles null, undefined, and non-object inputs safely', () => {
    expect(sanitizeProgress(null, MAX_STEPS)).toEqual({
      version: 1,
      unlockedStep: 0,
      completedSteps: [],
      soundEnabled: true
    });

    expect(sanitizeProgress(undefined, MAX_STEPS)).toEqual({
      version: 1,
      unlockedStep: 0,
      completedSteps: [],
      soundEnabled: true
    });

    expect(sanitizeProgress("corrupted string", MAX_STEPS)).toEqual({
      version: 1,
      unlockedStep: 0,
      completedSteps: [],
      soundEnabled: true
    });
  });

  it('clamps unlockedStep to valid range [0, maxSteps - 1]', () => {
    expect(sanitizeProgress({ unlockedStep: -5 }, MAX_STEPS).unlockedStep).toBe(0);
    expect(sanitizeProgress({ unlockedStep: 999 }, MAX_STEPS).unlockedStep).toBe(MAX_STEPS - 1);
    expect(sanitizeProgress({ unlockedStep: NaN }, MAX_STEPS).unlockedStep).toBe(0);
  });

  it('filters and deduplicates completedSteps', () => {
    const input = {
      unlockedStep: 5,
      completedSteps: [0, 1, 1, 2, 999, -1, NaN, 3]
    };
    const sanitized = sanitizeProgress(input, MAX_STEPS);
    expect(sanitized.completedSteps).toEqual([0, 1, 2, 3]);
  });

  it('preserves soundEnabled boolean', () => {
    expect(sanitizeProgress({ soundEnabled: false }, MAX_STEPS).soundEnabled).toBe(false);
    expect(sanitizeProgress({ soundEnabled: true }, MAX_STEPS).soundEnabled).toBe(true);
  });
});
