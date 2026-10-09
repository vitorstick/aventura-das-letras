import React, { useEffect } from 'react';
import { Trophy, Star, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEngine';
import { fireGrandCelebration } from '../utils/confetti';

interface CelebrationScreenProps {
  stars: number;
  maxStars?: number;
  onPlayAgain: () => void;
}

export default function CelebrationScreen({ stars, maxStars = 19, onPlayAgain }: CelebrationScreenProps): React.JSX.Element {
  useEffect(() => {
    sounds.playWinFanfare();
    fireGrandCelebration();
  }, []);

  const displayedStars = Math.min(stars, maxStars);

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-6 px-4 text-center">
      <div />

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-amber-100 border-4 border-amber-400 rounded-full flex items-center justify-center shadow-xl animate-bounce-soft mb-4">
          <Trophy className="w-14 h-14 text-amber-500" />
        </div>

        <div className="bg-white/95 border-4 border-amber-400 rounded-3xl p-5 shadow-lg w-full">
          <h2 className="text-2xl sm:text-3xl font-black text-amber-600 mb-2">
            És um Super Campeão!
          </h2>

          <div className="flex justify-center gap-1 my-3 flex-wrap">
            {Array.from({ length: displayedStars }).map((_, i) => (
              <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 fill-amber-400 animate-pulse-glow" />
            ))}
          </div>

          <p className="text-amber-800 font-black text-sm mb-2">
            {stars} / {maxStars} estrelas conquistadas! ⭐
          </p>

          <p className="text-gray-700 font-bold text-sm sm:text-base mt-2">
            Conheces as letras <strong className="text-sky-600 font-black">I</strong>, <strong className="text-rose-600 font-black">U</strong>, as combinações <strong className="text-teal-600 font-black">UI</strong> e <strong className="text-fuchsia-600 font-black">IU</strong>, e as letras <strong className="text-amber-600 font-black">A</strong> e <strong className="text-indigo-600 font-black">E</strong>!
          </p>
        </div>
      </div>

      <button
        onClick={onPlayAgain}
        className="kid-btn-shadow w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-black text-xl py-4 px-6 rounded-3xl flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-6 h-6" />
        Jogar Outra Vez!
      </button>
    </div>
  );
}
