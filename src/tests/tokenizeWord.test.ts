import { describe, it, expect } from 'vitest';
import { tokenizeWord } from '../components/minigames/WordHuntGame';

describe('tokenizeWord', () => {
  it('splits word character by character for single letters', () => {
    expect(tokenizeWord('PEIXE', 'I')).toEqual(['P', 'E', 'I', 'X', 'E']);
    expect(tokenizeWord('LUA', 'U')).toEqual(['L', 'U', 'A']);
  });

  it('preserves multi-character targets as single tokens', () => {
    expect(tokenizeWord('CUIDADO', 'UI')).toEqual(['C', 'UI', 'D', 'A', 'D', 'O']);
    expect(tokenizeWord('PARTIU', 'IU')).toEqual(['P', 'A', 'R', 'T', 'IU']);
  });

  it('handles lowercase and mixed-case targets and words', () => {
    expect(tokenizeWord('cuidado', 'UI')).toEqual(['c', 'ui', 'd', 'a', 'd', 'o']);
    expect(tokenizeWord('Cuidado', 'ui')).toEqual(['C', 'ui', 'd', 'a', 'd', 'o']);
  });
});
