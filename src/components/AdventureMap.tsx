import React, { useEffect, useRef, useState } from 'react';
import { Star, Lock, Play, RotateCcw, ChevronDown } from 'lucide-react';
import { GAME_DATA } from '../data/gameData';
import { sounds } from '../utils/soundEngine';
import ParentGateModal from './ParentGateModal';

interface AdventureMapProps {
  unlockedStep: number;
  onSelectStep: (index: number) => void;
  onResetProgress: () => void;
  onSetSpeech?: (text: string) => void;
}

export default function AdventureMap({
  unlockedStep,
  onSelectStep,
  onResetProgress,
  onSetSpeech
}: AdventureMapProps): React.JSX.Element {
  const currentStepRef = useRef<HTMLButtonElement | null>(null);
  const [isParentGateOpen, setIsParentGateOpen] = useState<boolean>(false);

  useEffect(() => {
    // Rola suavemente até à etapa atual se estiver mais abaixo
    if (currentStepRef.current) {
      const timer = window.setTimeout(() => {
        currentStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [unlockedStep]);

  return (
    <div className="map-scroll flex-1 min-h-0 h-full w-full max-w-md flex flex-col items-center px-4 py-2 pb-32">
      <div className="text-center mb-3 shrink-0">
        <h2 className="text-2xl font-black text-emerald-800">Caminho da Floresta 🐾</h2>
        <p className="text-emerald-950 font-semibold text-xs sm:text-sm">
          Segue as pegadas do Dino para aprender!
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-3 shrink-0">
        {GAME_DATA.steps.map((step, idx) => {
          const isCompleted = idx < unlockedStep;
          const isCurrent = idx === unlockedStep;
          const isLocked = idx > unlockedStep;

          let cardStyle = "bg-white/70 border-gray-300 opacity-60";
          if (isCompleted) {
            cardStyle = "bg-emerald-50/95 border-emerald-500 shadow-md";
          } else if (isCurrent) {
            cardStyle = "bg-amber-50 border-amber-400 shadow-lg scale-105 animate-pulse-glow";
          }

          const handleStepClick = () => {
            if (isLocked) {
              sounds.playTryAgain();
              const currentStepData = GAME_DATA.steps[unlockedStep];
              const lockSpeech = currentStepData
                ? `Primeiro acaba a Etapa ${unlockedStep + 1} (${currentStepData.title})!`
                : `Primeiro acaba a etapa anterior!`;
              if (onSetSpeech) {
                onSetSpeech(lockSpeech);
              }
              sounds.speak(lockSpeech);
              currentStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              sounds.playPop();
              onSelectStep(idx);
            }
          };

          const statusDesc = isCompleted ? 'Concluída' : isCurrent ? 'Etapa Atual' : 'Bloqueada';

          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                ref={isCurrent ? currentStepRef : null}
                onClick={handleStepClick}
                aria-label={`Etapa ${idx + 1}: ${step.title}. ${statusDesc}. ${step.subtitle}`}
                className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-4 transition-all cursor-pointer text-left ${cardStyle} active:scale-95`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-inner flex items-center justify-center text-2xl border border-gray-100 shrink-0">
                    {step.icon}
                  </div>
                  <div className="text-left">
                    <h3 className={`font-black text-base sm:text-lg ${isCurrent ? 'text-amber-700' : 'text-emerald-900'}`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-medium text-xs">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  {isCompleted && <Star className="w-6 h-6 text-amber-500 fill-amber-400" />}
                  {isCurrent && <Play className="w-6 h-6 text-amber-600 fill-amber-500 animate-bounce" />}
                  {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {idx < GAME_DATA.steps.length - 1 && (
                <div className="flex gap-2 text-emerald-600/70 text-sm font-black rotate-90 my-0.5">
                  🐾 🐾
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Indicador de continuação do percurso */}
      <div className="mt-4 flex items-center gap-1.5 text-emerald-800/80 font-bold text-xs bg-white/70 px-4 py-1.5 rounded-full border border-emerald-300">
        <ChevronDown className="w-4 h-4 animate-bounce" />
        <span>Todas as {GAME_DATA.steps.length} etapas estão aqui! Desliza para explorar</span>
      </div>

      <button
        type="button"
        onClick={() => setIsParentGateOpen(true)}
        className="mt-6 flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-xs font-bold underline pb-4"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Recomeçar Aventura do Início
      </button>

      {/* Janela de proteção parental para reiniciar */}
      <ParentGateModal
        isOpen={isParentGateOpen}
        onClose={() => setIsParentGateOpen(false)}
        onConfirmReset={() => {
          setIsParentGateOpen(false);
          onResetProgress();
        }}
      />
    </div>
  );
}

