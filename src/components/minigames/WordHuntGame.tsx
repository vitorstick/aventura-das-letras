import React, { useState, useEffect } from 'react';
import { Volume2, Star, Check, ArrowRight } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';
import { sounds } from '../../utils/soundEngine';
import { fireStars, fireConfetti } from '../../utils/confetti';
import { LetterKey, MiddleWordItem } from '../../types/game';

interface WordHuntGameProps {
  letter: LetterKey;
  onComplete: () => void;
  onSetSpeech: (text: string) => void;
}

export default function WordHuntGame({
  letter,
  onComplete,
  onSetSpeech
}: WordHuntGameProps): React.JSX.Element {
  const letterData = GAME_DATA.letters[letter];
  const wordsList: MiddleWordItem[] = letterData?.middleWords || [];

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [foundIndices, setFoundIndices] = useState<Set<number>>(new Set());
  const [wigglingIndex, setWigglingIndex] = useState<number | null>(null);
  const [isWordCompleted, setIsWordCompleted] = useState<boolean>(false);
  const [isRoundCompleted, setIsRoundCompleted] = useState<boolean>(false);

  const currentWordData: MiddleWordItem = wordsList[currentWordIndex] || {
    word: letter,
    display: letter,
    emoji: '⭐',
    prompt: `Onde está a letra ${letter}?`
  };

  const wordLetters = currentWordData.word.split('');
  const targetIndices = wordLetters
    .map((char, idx) => (char.toUpperCase() === letter.toUpperCase() ? idx : null))
    .filter((idx): idx is number => idx !== null);

  const totalTargetsInWord = targetIndices.length;
  const remainingTargetsInWord = totalTargetsInWord - foundIndices.size;

  // Ao mudar de palavra ou de letra
  useEffect(() => {
    setFoundIndices(new Set());
    setIsWordCompleted(false);
    setWigglingIndex(null);

    if (currentWordData) {
      const introText = currentWordData.prompt;
      onSetSpeech(introText);
      sounds.speak(introText);
    }
  }, [currentWordIndex, letter, currentWordData.prompt, onSetSpeech]);

  const handleHearPrompt = () => {
    sounds.playPop();
    onSetSpeech(currentWordData.prompt);
    sounds.speak(currentWordData.prompt);
  };

  const handleTileClick = (char: string, index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (isWordCompleted || isRoundCompleted) return;

    // Se já foi encontrada nesta palavra, ignora
    if (foundIndices.has(index)) {
      sounds.playPop();
      return;
    }

    const isMatch = char.toUpperCase() === letter.toUpperCase();

    if (isMatch) {
      const nextFound = new Set(foundIndices);
      nextFound.add(index);
      setFoundIndices(nextFound);

      sounds.playStar();
      if (e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        fireStars(x, y);
      }

      const isAllFound = nextFound.size >= totalTargetsInWord;

      if (isAllFound) {
        setIsWordCompleted(true);
        sounds.playSuccess();

        const successSpeech = `Muito bem! Encontraste a letra ${letter} na palavra ${currentWordData.display}!`;
        onSetSpeech(successSpeech);
        sounds.speak(successSpeech);

        setTimeout(() => {
          if (currentWordIndex + 1 >= wordsList.length) {
            // Concluiu todas as palavras da letra
            setIsRoundCompleted(true);
            sounds.playWinFanfare();
            fireConfetti();
            const finishSpeech = `Fantástico, pequeno detetive! Encontraste todas as letras ${letter} no meio das palavras!`;
            onSetSpeech(finishSpeech);
            sounds.speak(finishSpeech);
          } else {
            setCurrentWordIndex((prev) => prev + 1);
          }
        }, 1500);
      } else {
        const remainingCount = totalTargetsInWord - nextFound.size;
        const partialSpeech = remainingCount === 1
          ? `Boa! Encontraste uma letra ${letter}! Falta mais uma!`
          : `Boa! Encontraste uma letra ${letter}! Faltam mais ${remainingCount}!`;
        onSetSpeech(partialSpeech);
        sounds.speak(partialSpeech);
      }
    } else {
      sounds.playTryAgain();
      setWigglingIndex(index);
      setTimeout(() => setWigglingIndex(null), 500);

      const errorSpeech = `Essa é a letra ${char}! Onde está a letra ${letter}?`;
      onSetSpeech(errorSpeech);
      sounds.speak(errorSpeech);
    }
  };

  const handleFinishGame = () => {
    sounds.playSuccess();
    fireConfetti();
    onComplete();
  };

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-2 px-3 h-full">
      {/* Barra de Progresso e Instrução */}
      <div className="w-full bg-white/95 border-3 border-amber-400 rounded-2xl px-3.5 py-2 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xl">🔍</span>
          <span className="font-bold text-amber-950 text-xs sm:text-sm">
            Detetive da Letra <strong className="text-xl font-black text-rose-500 ml-0.5">{letter}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1 bg-amber-100 px-2.5 py-1 rounded-full text-xs font-black text-amber-900">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>{currentWordIndex + 1} de {wordsList.length}</span>
        </div>
      </div>

      {/* Cartão Central da Palavra e Emoji */}
      <div className="w-full flex flex-col items-center justify-center my-auto py-2">
        <div
          className={`w-full bg-white border-4 rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center shadow-lg transition-all ${
            isWordCompleted
              ? 'border-emerald-400 bg-emerald-50/90 scale-102'
              : 'border-purple-200'
          }`}
        >
          {/* Emoji com destaque animado */}
          <div className="relative mb-2">
            <span className="text-6xl sm:text-7xl block select-none transform hover:scale-110 transition-transform">
              {currentWordData.emoji}
            </span>
            {isWordCompleted && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md animate-bounce">
                <Check className="w-5 h-5 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Nome da palavra com botão de áudio */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl sm:text-3xl font-black text-purple-950 tracking-wide">
              {currentWordData.display}
            </span>
            <button
              onClick={handleHearPrompt}
              className="p-2 bg-purple-100 hover:bg-purple-200 active:scale-90 text-purple-700 rounded-full transition-transform shadow-sm"
              title="Ouvir a pergunta"
              aria-label="Ouvir a pergunta"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Dica amigável de quantidade */}
          <div className="text-xs sm:text-sm font-bold text-gray-500 mb-3 text-center">
            {totalTargetsInWord > 1 ? (
              <span>
                Esta palavra tem <strong className="text-purple-700 font-black">{totalTargetsInWord}</strong> letras{' '}
                <strong className="text-rose-500 font-black">{letter}</strong>!{' '}
                {remainingTargetsInWord > 0 ? `(Faltam ${remainingTargetsInWord})` : '🎉 Concluído!'}
              </span>
            ) : (
              <span>
                Toca na letra <strong className="text-rose-500 font-black">{letter}</strong> no meio da palavra!
              </span>
            )}
          </div>

          {/* Letras Interativas (Blocos de Construção da Palavra) */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 max-w-full">
            {wordLetters.map((char, idx) => {
              const isFound = foundIndices.has(idx);
              const isWiggling = wigglingIndex === idx;

              let tileStyle = 'bg-white border-gray-300 text-gray-800 hover:border-amber-400 active:scale-95';

              if (isFound) {
                tileStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200 scale-105';
              } else if (isWiggling) {
                tileStyle = 'bg-rose-100 border-rose-400 text-rose-700 animate-wiggle';
              }

              return (
                <button
                  key={`${char}-${idx}`}
                  onClick={(e) => handleTileClick(char, idx, e)}
                  disabled={isFound || isWordCompleted}
                  className={`kid-btn-shadow relative w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-4 font-black text-2xl sm:text-3xl flex items-center justify-center transition-all select-none ${tileStyle}`}
                >
                  <span>{char}</span>
                  {isFound && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-white rounded-full p-0.5 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botão de Finalização quando completa a ronda */}
      <div className="w-full h-14 flex items-center justify-center shrink-0">
        {isRoundCompleted ? (
          <button
            onClick={handleFinishGame}
            className="kid-btn-shadow w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-lg py-3 px-6 rounded-2xl flex items-center justify-center gap-2 animate-bounce-soft"
          >
            <span>Muito Bem, Detetive! Próxima Etapa</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        ) : (
          <p className="text-emerald-800/80 font-bold text-xs text-center">
            💡 Toca nas letras com o teu dedinho para encontrar a letra certa!
          </p>
        )}
      </div>
    </div>
  );
}
