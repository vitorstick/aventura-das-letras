import React, { useState, useEffect } from 'react';
import { GAME_DATA } from '../../data/gameData';
import { sounds } from '../../utils/soundEngine';
import { fireStars, fireConfetti } from '../../utils/confetti';
import { LetterKey, QuizItem } from '../../types/game';

interface ButtonConfigItem {
  bg: string;
  label: LetterKey;
}

const BUTTON_CONFIG: Record<LetterKey, ButtonConfigItem> = {
  A: { bg: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700', label: 'A' },
  E: { bg: 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700', label: 'E' },
  I: { bg: 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700', label: 'I' },
  U: { bg: 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700', label: 'U' },
};

const QUIZ_OPTIONS: LetterKey[] = ['A', 'E', 'I', 'U'];

interface QuizGameProps {
  onComplete: () => void;
  onSetSpeech: (text: string) => void;
}

export default function QuizGame({ onComplete, onSetSpeech }: QuizGameProps): React.JSX.Element | null {
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [canAnswer, setCanAnswer] = useState<boolean>(true);
  const [wrongWiggle, setWrongWiggle] = useState<LetterKey | null>(null);

  useEffect(() => {
    // Baralhar perguntas
    const shuffled = [...GAME_DATA.quizItems].sort(() => Math.random() - 0.5).slice(0, 6);
    setQuestions(shuffled);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const q = questions[currentIndex];
      onSetSpeech(`${q.word}... Começa com que letra?`);
      sounds.speak(q.prompt);
    }
  }, [currentIndex, questions, onSetSpeech]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleChoice = (choice: LetterKey, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canAnswer) return;

    if (choice === currentQ.letter) {
      setCanAnswer(false);
      sounds.playSuccess();
      sounds.playStar();

      const rect = e.currentTarget.getBoundingClientRect();
      fireStars(rect.left / window.innerWidth, rect.top / window.innerHeight);

      onSetSpeech(`Muito bem! ${currentQ.letter} de ${currentQ.word}!`);
      sounds.speak(`Certo! ${currentQ.letter} de ${currentQ.word}!`);

      setTimeout(() => {
        if (currentIndex + 1 >= questions.length) {
          sounds.playWinFanfare();
          fireConfetti();
          onComplete();
        } else {
          setCurrentIndex(prev => prev + 1);
          setCanAnswer(true);
        }
      }, 1500);
    } else {
      sounds.playTryAgain();
      setWrongWiggle(choice);
      setTimeout(() => setWrongWiggle(null), 500);

      onSetSpeech(`Ouve bem: ${currentQ.word}! Começa por ${currentQ.letter}!`);
      sounds.speak(`Quase! ${currentQ.word} começa com a letra ${currentQ.letter}!`);
    }
  };

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-2 px-2">
      {/* Progresso do Desafio */}
      <div className="text-purple-800 font-bold text-xs sm:text-sm">
        Desafio {currentIndex + 1} de {questions.length}
      </div>

      {/* Cartão Central do Objeto */}
      <div className="kid-btn-shadow bg-white border-4 border-purple-300 rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center my-2 w-full max-w-[260px] animate-bounce-soft">
        <span className="text-5xl sm:text-6xl mb-1">{currentQ.emoji}</span>
        <span className="text-2xl sm:text-3xl font-black text-purple-900 tracking-wide">
          {currentQ.word}
        </span>
      </div>

      {/* Grelha 2x2 com os Botões das Letras (A, E, I, U) */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
        {QUIZ_OPTIONS.map((letra) => {
          const config = BUTTON_CONFIG[letra];
          const isWiggling = wrongWiggle === letra;

          return (
            <button
              key={letra}
              onClick={(e) => handleChoice(letra, e)}
              className={`kid-btn-shadow h-20 sm:h-22 rounded-2xl ${config.bg} text-white font-black text-4xl flex items-center justify-center active:scale-95 transition-transform ${
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
