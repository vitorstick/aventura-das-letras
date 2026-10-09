import React from 'react';
import { Sparkles, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps): React.JSX.Element {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between py-6 px-4 text-center">
      <div />

      <div className="flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl font-black text-emerald-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] tracking-wide mb-2">
          Aventura das Letras
        </h1>

        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-5 py-2 rounded-full border-2 border-emerald-400 shadow-sm mt-1">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
          <p className="text-emerald-900 font-bold text-xs sm:text-sm">
            Aprende as letras <strong className="text-sky-600 font-black">I</strong>, <strong className="text-rose-600 font-black">U</strong>, as combinações <strong className="text-teal-600 font-black">UI</strong> e <strong className="text-fuchsia-600 font-black">IU</strong>, e as letras <strong className="text-amber-600 font-black">A</strong>, <strong className="text-indigo-600 font-black">E</strong> e <strong className="text-emerald-600 font-black">O</strong> com o Dino!
          </p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="kid-btn-shadow w-full max-w-xs bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-xl sm:text-2xl py-4 sm:py-5 px-8 rounded-3xl flex items-center justify-center gap-3 animate-pulse-glow"
      >
        <Play className="w-7 h-7 fill-white" />
        Começar a Brincar!
      </button>
    </div>
  );
}
