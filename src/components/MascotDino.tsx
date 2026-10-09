import React from 'react';
import { sounds } from '../utils/soundEngine';
import { DinoExpression } from '../types/game';

interface MascotDinoProps {
  expression?: DinoExpression;
  speechText?: string;
  onDinoTap?: () => void;
  compact?: boolean;
}

export default function MascotDino({
  expression = 'idle',
  speechText,
  onDinoTap,
  compact = false
}: MascotDinoProps): React.JSX.Element {
  const isCheering = expression === 'cheer';
  const isTalking = expression === 'talk';

  const handleTap = () => {
    sounds.playDinoHappy();
    if (onDinoTap) {
      onDinoTap();
    }
  };

  return (
    <div className={`flex flex-col items-center z-20 shrink-0 ${compact ? 'my-0.5' : 'my-1'}`}>
      {/* Balão de Fala do Dino */}
      {speechText && (
        <div className={`relative bg-white border-3 sm:border-4 border-dino-light rounded-2xl max-w-[320px] text-center shadow-md animate-bounce-soft ${
          compact ? 'px-3 py-1 mb-1.5' : 'px-4 py-2 mb-2'
        }`}>
          <p className={`text-dino-dark font-bold leading-snug ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>
            {speechText}
          </p>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-dino-light" />
        </div>
      )}

      {/* SVG Interativo do Dino */}
      <button
        type="button"
        onClick={handleTap}
        aria-label="Tocar no Dino"
        className={`cursor-pointer drop-shadow-lg transition-transform active:scale-95 bg-transparent border-0 p-0 focus:outline-none ${
          compact ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-24 h-24 sm:w-28 sm:h-28'
        } ${isCheering ? 'animate-bounce' : ''}`}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <radialGradient id="dinoBodyGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#81C784" />
              <stop offset="85%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#388E3C" />
            </radialGradient>
            <linearGradient id="bellyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF9C4" />
              <stop offset="100%" stopColor="#FFF176" />
            </linearGradient>
          </defs>

          {/* Cauda com movimento feliz */}
          <path d="M 85 82 Q 106 88 112 75 Q 108 96 82 94 Z" fill="#4CAF50" />

          {/* Cristas laranjas nas costas */}
          <polygon points="40,24 46,14 52,24" fill="#FF9800" />
          <polygon points="56,24 62,14 68,24" fill="#FF9800" />
          <polygon points="72,26 78,16 84,28" fill="#FF9800" />

          {/* Patinhas traseiras */}
          <ellipse cx="42" cy="100" rx="9" ry="6" fill="#388E3C" />
          <ellipse cx="74" cy="100" rx="9" ry="6" fill="#388E3C" />

          {/* Corpo redondo */}
          <ellipse cx="58" cy="74" rx="34" ry="28" fill="url(#dinoBodyGrad)" />

          {/* Barriga fofa */}
          <ellipse cx="58" cy="77" rx="20" ry="19" fill="url(#bellyGrad)" />

          {/* Cabeça */}
          <circle cx="58" cy="50" r="26" fill="url(#dinoBodyGrad)" />

          {/* Bochechas rosadas */}
          <ellipse cx="38" cy="57" rx="5" ry="3" fill="#FF8A80" opacity="0.65" />
          <ellipse cx="78" cy="57" rx="5" ry="3" fill="#FF8A80" opacity="0.65" />

          {/* Braços */}
          {isCheering ? (
            <>
              <path d="M 30 68 Q 20 54 24 48" stroke="#43A047" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M 86 68 Q 96 54 92 48" stroke="#43A047" strokeWidth="7" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <path d="M 32 68 Q 24 72 28 80" stroke="#43A047" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 84 68 Q 92 72 88 80" stroke="#43A047" strokeWidth="6" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Olhos */}
          {isCheering ? (
            <>
              <path d="M 38 48 Q 45 40 52 48" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 64 48 Q 71 40 78 48" stroke="#1B5E20" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="45" cy="48" r="8" fill="#1B5E20" />
              <circle cx="43" cy="46" r="3" fill="#FFFFFF" />
              <circle cx="47" cy="49" r="1.5" fill="#FFFFFF" />
              <circle cx="71" cy="48" r="8" fill="#1B5E20" />
              <circle cx="69" cy="46" r="3" fill="#FFFFFF" />
              <circle cx="73" cy="49" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Boca */}
          {isTalking ? (
            <>
              <ellipse cx="58" cy="62" rx="7" ry="6" fill="#C2185B" />
              <path d="M 53 60 Q 58 64 63 60" stroke="#880E4F" strokeWidth="2" fill="none" />
            </>
          ) : isCheering ? (
            <path d="M 48 59 Q 58 72 68 59" stroke="#1B5E20" strokeWidth="3.5" fill="#FF80AB" strokeLinecap="round" />
          ) : (
            <path d="M 50 60 Q 58 68 66 60" stroke="#1B5E20" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
        </svg>
      </button>
    </div>
  );
}
