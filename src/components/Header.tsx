import React from 'react';
import { Volume2, VolumeX, Map, Star, Home } from 'lucide-react';
import { ScreenType } from '../types/game';

interface HeaderProps {
  currentScreen: ScreenType;
  stars: number;
  onGoToMap: () => void;
  onGoToWelcome?: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
}

export default function Header({
  currentScreen,
  stars,
  onGoToMap,
  onGoToWelcome,
  isSoundOn,
  onToggleSound
}: HeaderProps): React.JSX.Element {
  const showMapButton = currentScreen !== 'welcome' && currentScreen !== 'map';
  const showHomeButton = currentScreen === 'map' && Boolean(onGoToWelcome);

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 z-30 shrink-0">
      {/* Botão de Voltar ao Mapa ou ao Início */}
      <div className="w-12 h-12 flex items-center justify-center">
        {showMapButton && (
          <button
            type="button"
            onClick={onGoToMap}
            className="w-11 h-11 bg-white rounded-full border-2 border-emerald-300 shadow-md flex items-center justify-center text-emerald-700 active:scale-90 transition-transform"
            aria-label="Voltar ao Mapa da Floresta"
            title="Voltar ao Mapa da Floresta"
          >
            <Map className="w-6 h-6" />
          </button>
        )}
        {showHomeButton && onGoToWelcome && (
          <button
            type="button"
            onClick={onGoToWelcome}
            className="w-11 h-11 bg-white rounded-full border-2 border-emerald-300 shadow-md flex items-center justify-center text-emerald-700 active:scale-90 transition-transform"
            aria-label="Voltar ao Ecrã Inicial"
            title="Voltar ao Ecrã Inicial"
          >
            <Home className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Contador de Estrelas */}
      <div className="flex items-center gap-1.5 bg-white border-2 border-amber-300 px-4 py-1.5 rounded-full shadow-md" aria-label={`${stars} estrelas conquistadas`}>
        <Star className="w-6 h-6 text-amber-500 fill-amber-400 animate-pulse-glow" />
        <span className="font-black text-amber-600 text-lg sm:text-xl">
          {stars}
        </span>
      </div>

      {/* Botão de Som / Voz */}
      <div className="w-12 h-12 flex items-center justify-center">
        <button
          type="button"
          onClick={onToggleSound}
          className="w-11 h-11 bg-white rounded-full border-2 border-sky-300 shadow-md flex items-center justify-center text-sky-700 active:scale-90 transition-transform"
          aria-label={isSoundOn ? "Desligar som" : "Ligar som"}
          title={isSoundOn ? "Desligar som" : "Ligar som"}
        >
          {isSoundOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
        </button>
      </div>
    </header>
  );
}
