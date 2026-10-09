import React, { useState } from 'react';
import { Sparkles, Play, Compass, ChevronRight } from 'lucide-react';
import { LetterKey } from '../types/game';
import { sounds } from '../utils/soundEngine';
import StepSelectorModal, { SelectorTab } from './StepSelectorModal';

interface WelcomeScreenProps {
  onStart: () => void;
  onSelectStep: (stepIndex: number) => void;
  completedSteps?: number[];
}

interface QuickLetterButton {
  key: LetterKey;
  label: string;
  icon: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

const QUICK_LETTERS: QuickLetterButton[] = [
  { key: 'I', label: 'I', icon: '🏝️', bgClass: 'bg-sky-50 hover:bg-sky-100', borderClass: 'border-sky-300', textClass: 'text-sky-700' },
  { key: 'U', label: 'U', icon: '🐻', bgClass: 'bg-rose-50 hover:bg-rose-100', borderClass: 'border-rose-300', textClass: 'text-rose-700' },
  { key: 'UI', label: 'UI', icon: '😱', bgClass: 'bg-teal-50 hover:bg-teal-100', borderClass: 'border-teal-300', textClass: 'text-teal-700' },
  { key: 'IU', label: 'IU', icon: '👀', bgClass: 'bg-fuchsia-50 hover:bg-fuchsia-100', borderClass: 'border-fuchsia-300', textClass: 'text-fuchsia-700' },
  { key: 'A', label: 'A', icon: '✈️', bgClass: 'bg-amber-50 hover:bg-amber-100', borderClass: 'border-amber-300', textClass: 'text-amber-700' },
  { key: 'E', label: 'E', icon: '🐘', bgClass: 'bg-indigo-50 hover:bg-indigo-100', borderClass: 'border-indigo-300', textClass: 'text-indigo-700' },
  { key: 'O', label: 'O', icon: '👁️', bgClass: 'bg-emerald-50 hover:bg-emerald-100', borderClass: 'border-emerald-300', textClass: 'text-emerald-700' }
];

export default function WelcomeScreen({
  onStart,
  onSelectStep,
  completedSteps = []
}: WelcomeScreenProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initialModalTab, setInitialModalTab] = useState<SelectorTab>('I');

  const handleOpenLetter = (letter: SelectorTab) => {
    sounds.unlockAudio();
    sounds.playPop();
    setInitialModalTab(letter);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between py-4 px-4 text-center overflow-y-auto map-scroll">
      {/* Título e Apresentação */}
      <div className="flex flex-col items-center w-full max-w-md pt-2">
        <h1 className="text-3xl sm:text-5xl font-black text-emerald-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] tracking-wide mb-1.5">
          Aventura das Letras
        </h1>

        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full border-2 border-emerald-400 shadow-sm mt-1">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin shrink-0" style={{ animationDuration: '4s' }} />
          <p className="text-emerald-900 font-bold text-xs sm:text-sm">
            Aprende as letras <strong className="text-sky-600 font-black">I</strong>, <strong className="text-rose-600 font-black">U</strong>, as combinações <strong className="text-teal-600 font-black">UI</strong> e <strong className="text-fuchsia-600 font-black">IU</strong>, e as letras <strong className="text-amber-600 font-black">A</strong>, <strong className="text-indigo-600 font-black">E</strong> e <strong className="text-emerald-600 font-black">O</strong> com o Dino!
          </p>
        </div>
      </div>

      {/* Secção de Acesso Rápido a Letras ou Etapas */}
      <div className="w-full max-w-md my-4 bg-white/80 backdrop-blur-sm p-4 rounded-3xl border-2 border-emerald-200 shadow-sm flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5 text-emerald-900 font-black text-xs sm:text-sm">
          <span>🚀</span>
          <span>Salta diretamente para uma letra:</span>
        </div>

        {/* Grelha / Lista de Botões de Letras */}
        <div className="w-full grid grid-cols-4 gap-2">
          {QUICK_LETTERS.map(item => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleOpenLetter(item.key)}
              aria-label={`Saltar para a letra ${item.label}`}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 ${item.borderClass} ${item.bgClass} shadow-sm transition-all active:scale-90 hover:shadow-md cursor-pointer`}
            >
              <span className="text-xl sm:text-2xl mb-0.5">{item.icon}</span>
              <span className={`font-black text-sm sm:text-base ${item.textClass}`}>
                {item.label}
              </span>
            </button>
          ))}

          {/* Botão de Atalho para o Quiz */}
          <button
            type="button"
            onClick={() => handleOpenLetter('QUIZ')}
            aria-label="Saltar para o Desafio Quiz"
            className="flex flex-col items-center justify-center p-2 rounded-2xl border-2 border-purple-300 bg-purple-50 hover:bg-purple-100 shadow-sm transition-all active:scale-90 hover:shadow-md cursor-pointer"
          >
            <span className="text-xl sm:text-2xl mb-0.5">🎯</span>
            <span className="font-black text-xs sm:text-sm text-purple-700">
              Quiz
            </span>
          </button>
        </div>

        {/* Botão para Ver Todas as Etapas */}
        <button
          type="button"
          onClick={() => handleOpenLetter('ALL')}
          className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ver todas as 23 etapas disponíveis</span>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
        </button>
      </div>

      {/* Botão Principal de Início da Aventura */}
      <div className="w-full max-w-xs flex flex-col items-center gap-2 pb-2">
        <button
          type="button"
          onClick={onStart}
          className="kid-btn-shadow w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-xl sm:text-2xl py-3.5 sm:py-4 px-6 rounded-3xl flex items-center justify-center gap-3 animate-pulse-glow"
        >
          <Play className="w-6 h-6 fill-white" />
          Começar a Brincar!
        </button>
        <span className="text-[11px] text-emerald-800/70 font-semibold">
          Segue o caminho no mapa passo a passo 🐾
        </span>
      </div>

      {/* Modal de Seleção de Etapa/Letra */}
      <StepSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectStep={onSelectStep}
        initialLetter={initialModalTab}
        completedSteps={completedSteps}
      />
    </div>
  );
}
