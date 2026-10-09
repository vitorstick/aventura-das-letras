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
  const [wrongWiggle, setWrongWiggle] = useState<LetterKey | null>(null);

  useEffect(() => {
    // Baralhar perguntas garantindo diversidade
    const shuffled = [...GAME_DATA.quizItems].sort(() => Math.random() - 0.5).slice(0, 7);
    setQuestions(shuffled);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const q = questions[currentIndex];
      const isCombo = q.letter.length > 1;
      onSetSpeech(`${q.word}... Qual é a ${isCombo ? 'combinação' : 'letra'}?`);
      sounds.speak(q.prompt);
    }
  }, [currentIndex, questions, onSetSpeech]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const options = currentQ.options || (['UI', 'IU'].includes(currentQ.letter) ? ['UI', 'IU', 'U', 'I'] : ['A', 'E', 'I', 'U']);

  const handleChoice = (choice: LetterKey, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canAnswer) return;

    if (choice === currentQ.letter) {
      setCanAnswer(false);
      sounds.playSuccess();
      sounds.playStar();

      const rect = e.currentTarget.getBoundingClientRect();
      fireStars(rect.left / window.innerWidth, rect.top / window.innerHeight);

      const isCombo = currentQ.letter.length > 1;
      const itemDesc = isCombo ? `A combinação ${currentQ.letter}` : `A letra ${currentQ.letter}`;
      onSetSpeech(`Muito bem! ${currentQ.letter} em ${currentQ.word}!`);
      sounds.speak(`Certo! ${itemDesc} em ${currentQ.word}!`);

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

      const isCombo = currentQ.letter.length > 1;
      const itemDesc = isCombo ? `a combinação ${currentQ.letter}` : `a letra ${currentQ.letter}`;
      onSetSpeech(`Ouve bem: ${currentQ.word}! Tem ${itemDesc}!`);
      sounds.speak(`Quase! ${currentQ.word} tem ${itemDesc}!`);
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

      {/* Grelha 2x2 com os Botões de Opções */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
        {options.map((letra) => {
          const config = BUTTON_CONFIG[letra];
          const isWiggling = wrongWiggle === letra;

          return (
            <button
              key={letra}
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
