export type LetterKey = 'I' | 'U' | 'A' | 'E';

export type StepType =
  | 'welcome'
  | 'map'
  | 'explorer'
  | 'bubble'
  | 'wordHunt'
  | 'trace'
  | 'quiz'
  | 'celebration';

export type DinoExpression = 'idle' | 'cheer' | 'talk';

export interface TracingPoint {
  x: number;
  y: number;
}

export interface TracingPathData {
  char: string;
  label: string;
  hint: string;
  points: TracingPoint[];
  dot?: TracingPoint;
}

export interface TracingVariants {
  lowercase: TracingPathData;
  uppercase: TracingPathData;
}

export interface WordItem {
  word: string;
  emoji: string;
  audioText: string;
}

export interface MiddleWordItem {
  word: string;
  display: string;
  emoji: string;
  prompt: string;
}

export interface LetterData {
  char: LetterKey;
  soundText: string;
  spokenIntro: string;
  color: string;
  words: WordItem[];
  middleWords: MiddleWordItem[];
  tracing: TracingVariants;
}

export interface QuizItem {
  word: string;
  emoji: string;
  letter: LetterKey;
  prompt: string;
}

export interface GameStep {
  id: number;
  type: StepType;
  title: string;
  subtitle: string;
  icon: string;
  letter?: LetterKey | 'ALL';
  targetCount?: number;
  dinoSpeech?: string;
}

export interface GameDataSet {
  letters: Record<LetterKey, LetterData>;
  quizItems: QuizItem[];
  steps: GameStep[];
}
