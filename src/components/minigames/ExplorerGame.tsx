import React, { useState, useEffect } from 'react';
import { ArrowRight, Volume2 } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';
import { sounds } from '../../utils/soundEngine';
import { fireStars, fireConfetti } from '../../utils/confetti';
import { LetterKey, WordItem } from '../../types/game';

interface ExplorerGameProps {
  letter: LetterKey;
  onComplete: () => void;
  onSetSpeech: (text: string) => void;
}

export default function ExplorerGame({
  letter,
  onComplete,
  onSetSpeech
}: ExplorerGameProps): React.JSX.Element {
  const letterData = GAME_DATA.letters[letter];
  const [explored, setExplored] = useState<Set<number>>(new Set());

  useEffect(() => {
    onSetSpeech(`Esta é a letra ${letter}! Toca nos cartões para ouvir!`);
    sounds.speak(letterData.spokenIntro);
  }, [letter, letterData.spokenIntro, onSetSpeech]);

  const handleLetterTap = () => {
    sounds.playStar();
    fireStars(0.5, 0.35);
    onSetSpeech(`Letra ${letter}! Faz o som: ${letterData.soundText}!`);
    sounds.speak(`Letra ${letter}! Ouve como faz: ${letterData.soundText}!`);
  };

  const handleCardTap = (index: number, item: WordItem) => {
    sounds.playStar();
    fireStars(0.5, 0.55);

    const nextExplored = new Set(explored);
    nextExplored.add(index);
    setExplored(nextExplored);

    onSetSpeech(`${item.word}!`);
    sounds.speak(item.audioText);
  };

  const handleFinish = () => {
    sounds.playSuccess();
    fireConfetti();
    onComplete();
  };

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-2 px-2">
      {/* Letra Gigante Central */}
      <div
        onClick={handleLetterTap}
        className="kid-btn-shadow w-28 h-28 bg-white border-4 border-emerald-400 rounded-3xl flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
        title="Toca na letra!"
      >
        <span className="text-5xl font-black" style={{ color: letterData.color }}>
          {letterData.char}
        </span>
        <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
          <Volume2 className="w-3 h-3" /> Toca!
        </span>
      </div>

      {/* Grelha de Palavras */}
      <div className="grid grid-cols-2 gap-3 w-full my-3">
        {letterData.words.map((item, idx) => {
          const isTapped = explored.has(idx);
          const firstLetter = item.word.charAt(0);
          const rest = item.word.slice(1);

          return (
            <div
              key={item.word}
              onClick={() => handleCardTap(idx, item)}
              className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 shadow-md ${
                isTapped
                  ? 'bg-emerald-50 border-emerald-400 scale-[1.02]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <span className="text-4xl mb-1">{item.emoji}</span>
              <span className="text-lg font-black text-gray-800">
                <span className="text-rose-500 underline text-xl">{firstLetter}</span>
                {rest}
              </span>
            </div>
          );
        })}
      </div>

      {/* Botão de Conclusão */}
      <div className="w-full flex justify-center h-14">
        {explored.size >= 2 && (
          <button
            onClick={handleFinish}
            className="kid-btn-shadow w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-lg py-3 px-6 rounded-2xl flex items-center justify-center gap-2 animate-bounce-soft"
          >
            <span>Muito Bem! Próxima Etapa</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
