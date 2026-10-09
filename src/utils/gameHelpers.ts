import { LetterKey } from '../types/game';

/**
 * Retorna o rótulo descritivo gramaticalmente correto em português (pt-PT).
 * Exemplo: 'I' -> 'a letra I', 'UI' -> 'a combinação UI'
 */
export function labelFor(letter: string): string {
  return letter.length > 1 ? `a combinação ${letter}` : `a letra ${letter}`;
}

/**
 * Retorna o título descritivo para cabeçalhos.
 * Exemplo: 'I' -> 'da Letra I', 'UI' -> 'da Combinação UI'
 */
export function titleLabelFor(letter: string): string {
  return letter.length > 1 ? `da Combinação ${letter}` : `da Letra ${letter}`;
}

/**
 * Embaralha uma lista usando o algoritmo imparcial Fisher-Yates (Knuth).
 */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Seleciona perguntas para o quiz garantindo representatividade equilibrada
 * de todas as opções chave ('I', 'U', 'UI', 'IU', 'A', 'E', 'O') + 1 pergunta aleatória adicional.
 */
export function selectBalancedQuizQuestions<T extends { letter: LetterKey }>(
  allItems: readonly T[],
  targetKeys: readonly LetterKey[] = ['I', 'U', 'UI', 'IU', 'A', 'E', 'O'] as const,
  totalCount = 8
): T[] {
  const selected: T[] = [];
  const remainingPool = [...allItems];

  // 1. Garantir pelo menos 1 pergunta para cada chave ensinada
  for (const key of targetKeys) {
    const matching = remainingPool.filter(q => q.letter === key);
    if (matching.length > 0) {
      const chosen = matching[Math.floor(Math.random() * matching.length)];
      selected.push(chosen);
      const chosenIdx = remainingPool.indexOf(chosen);
      if (chosenIdx !== -1) {
        remainingPool.splice(chosenIdx, 1);
      }
    }
  }

  // 2. Preencher até o total desejado com o restante do conjunto baralhado
  const shuffledRemaining = shuffleArray(remainingPool);
  while (selected.length < totalCount && shuffledRemaining.length > 0) {
    selected.push(shuffledRemaining.pop()!);
  }

  // 3. Baralhar a ordem final das perguntas apresentadas à criança
  return shuffleArray(selected);
}
