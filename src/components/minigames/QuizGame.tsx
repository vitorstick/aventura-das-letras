import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Volume2 } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';
import { sounds } from '../../utils/soundEngine';
import { fireStars, fireConfetti } from '../../utils/confetti';
import { LetterKey, QuizItem } from '../../types/game';
import { labelFor, shuffleArray, selectBalancedQuizQuestions } from '../../utils/gameHelpers';

interface ButtonConfigItem {
  bg: string;
  label: LetterKey;
}

const BUTTON_CONFIG: Record<LetterKey, ButtonConfigItem> = {
  I: { bg: 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700', label: 'I' },
  U: { bg: 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700', label: 'U' },
  UI: { bg: 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700', label: 'UI' },
  IU: { bg: 'bg-fuchsia-500 hover:bg-fuchsia-600 active:bg-fuchsia-700', label: 'IU' },
  A: { bg: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700', label: 'A' },
  E: { bg: 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700', label: 'E' },
};

interface QuizGameProps {
  onComplete: () => void;
  onSetSpeech: (text: string) => void;
}

export default function QuizGame({ onComplete, onSetSpeech }: QuizGameProps): React.JSX.Element | null {
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [canAnswer, setCanAnswer] = useState<boolean>(true);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [wrongWiggle, setWrongWiggle] = useState<LetterKey | null>(null);

  const timersRef = useRef<number[]>([]);
  const addTimer = (id: number) => {
    timersRef.current.push(id);
    return id;
  };

  // Limpeza de temporizadores e áudio ao desmontar
  useEffect(() => {
    return () => {
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
      sounds.stopAudio();
    };
  }, []);

  useEffect(() => {
    // Selecionar perguntas com representação equilibrada de todas as letras/combos
    const selected = selectBalancedQuizQuestions(GAME_DATA.quizItems);
    setQuestions(selected);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const q = questions[currentIndex];
      const itemDesc = labelFor(q.letter);
      onSetSpeech(`${q.word}... Qual é ${itemDesc}?`);
      sounds.playQuizPrompt(q.word, q.prompt);
    }
  }, [currentIndex, questions, onSetSpeech]);

  const currentQ = questions[currentIndex];

  // Baralha as opções de cada pergunta para que a resposta certa não fique sempre no topo esquerdo
  const shuffledOptions = useMemo<LetterKey[]>(() => {
    if (!currentQ) return [];
    const baseOptions = currentQ.options || (['UI', 'IU'].includes(currentQ.letter) ? ['UI', 'IU', 'U', 'I'] : ['A', 'E', 'I', 'U']);
    return shuffleArray(baseOptions);
  }, [currentIndex, currentQ]);

  if (!currentQ || questions.length === 0) return null;

  const handleChoice = (choice: LetterKey, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canAnswer) return;

    if (choice === currentQ.letter) {
      setCanAnswer(false);
      setIsAnswered(true);
      sounds.playSuccess();
      sounds.playStar();

      const rect = e.currentTarget.getBoundingClientRect();
      fireStars(rect.left / window.innerWidth, rect.top / window.innerHeight);

      onSetSpeech(`Muito bem! ${currentQ.letter} em ${currentQ.word}!`);

      let hasAdvanced = false;
      const advance = () => {
        if (hasAdvanced) return;
        hasAdvanced = true;
        if (currentIndex + 1 >= questions.length) {
          sounds.playWinFanfare();
          fireConfetti();
          onComplete();
        } else {
          setCurrentIndex(prev => prev + 1);
          setIsAnswered(false);
          setCanAnswer(true);
        }
      };

      sounds.playQuizSuccess(currentQ.word, `Certo! ${currentQ.word}!`, () => {
        addTimer(window.setTimeout(advance, 350));
      });

      // Temporizador de segurança
      addTimer(window.setTimeout(advance, 3500));
    } else {
      sounds.playTryAgain();
      setWrongWiggle(choice);
      addTimer(window.setTimeout(() => setWrongWiggle(null), 500));

      const itemDesc = labelFor(currentQ.letter);
      onSetSpeech(`Ouve bem! Tem ${itemDesc}!`);
      sounds.playQuizTryAgain(currentQ.word, `Quase! ${currentQ.word} tem ${itemDesc}!`);
    }
  };

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-2 px-2">
      {/* Progresso do Desafio */}
      <div className="text-purple-800 font-bold text-xs sm:text-sm">
        Desafio {currentIndex + 1} de {questions.length}
      </div>

      {/* Cartão Central do Objeto */}
      <button
        type="button"
        onClick={() => sounds.playQuizPrompt(currentQ.word, currentQ.prompt)}
        aria-label={`Ouvir pergunta sobre ${currentQ.word}`}
        className="kid-btn-shadow bg-white border-4 border-purple-300 rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center my-2 w-full max-w-[260px] animate-bounce-soft cursor-pointer active:scale-95 transition-transform"
      >
        <span className="text-5xl sm:text-6xl mb-1">{currentQ.emoji}</span>
        {isAnswered ? (
          <span className="text-2xl sm:text-3xl font-black text-purple-900 tracking-wide animate-pop-in">
            <span className="text-rose-500 underline">{currentQ.letter}</span>
            {currentQ.word.slice(currentQ.letter.length)}
          </span>
        ) : (
          <span className="text-xs sm:text-sm font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full mt-1 flex items-center gap-1.5 shadow-sm">
            <Volume2 className="w-4 h-4 text-purple-600 animate-pulse" />
            <span>Ouve o som!</span>
          </span>
        )}
      </button>

      {/* Grelha 2x2 com os Botões de Opções */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
        {shuffledOptions.map((letra) => {
          const config = BUTTON_CONFIG[letra];
          const isWiggling = wrongWiggle === letra;

          return (
            <button
              key={letra}
              type="button"
              aria-label={`Opção ${letra}`}
              onClick={(e) => handleChoice(letra, e)}
              className={`kid-btn-shadow h-20 sm:h-22 rounded-2xl ${config.bg} text-white font-black text-3xl sm:text-4xl flex items-center justify-center active:scale-95 transition-transform ${
                isWiggling ? 'animate-wiggle' : ''
              }`}
            >
              {letra}
            </button>
          );
        })}
      </div>
    </div>
  );
}

