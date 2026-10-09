import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Star, Check, ArrowRight } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';
import { sounds } from '../../utils/soundEngine';
import { fireStars, fireConfetti } from '../../utils/confetti';
import { LetterKey, MiddleWordItem } from '../../types/game';
import { labelFor, titleLabelFor } from '../../utils/gameHelpers';

interface WordHuntGameProps {
  letter: LetterKey;
  onComplete: () => void;
  onSetSpeech: (text: string) => void;
}

export function tokenizeWord(word: string, target: string): string[] {
  if (target.length <= 1) {
    return word.split('');
  }
  const tokens: string[] = [];
  const upperWord = word.toUpperCase();
  const upperTarget = target.toUpperCase();
  let i = 0;
  while (i < word.length) {
    if (upperWord.startsWith(upperTarget, i)) {
      tokens.push(word.slice(i, i + target.length));
      i += target.length;
    } else {
      tokens.push(word[i]);
      i++;
    }
  }
  return tokens;
}

export default function WordHuntGame({
  letter,
  onComplete,
  onSetSpeech
}: WordHuntGameProps): React.JSX.Element {
  const letterData = GAME_DATA.letters[letter];
  const wordsList: MiddleWordItem[] = letterData?.middleWords || [];

  const targetType = labelFor(letter);

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [foundIndices, setFoundIndices] = useState<Set<number>>(new Set());
  const [wigglingIndex, setWigglingIndex] = useState<number | null>(null);
  const [isWordCompleted, setIsWordCompleted] = useState<boolean>(false);
  const [isRoundCompleted, setIsRoundCompleted] = useState<boolean>(false);

  const timersRef = useRef<number[]>([]);
  const isMountedRef = useRef<boolean>(true);

  const addTimer = (id: number) => {
    timersRef.current.push(id);
    return id;
  };

  // Limpeza de temporizadores e áudio ao desmontar
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      timersRef.current.forEach(id => clearTimeout(id));
      timersRef.current = [];
      sounds.stopAudio();
    };
  }, []);

  const currentWordData: MiddleWordItem = wordsList[currentWordIndex] || {
    word: letter,
    display: letter,
    emoji: '⭐',
    prompt: `Onde está ${targetType}?`
  };

  const wordTokens = tokenizeWord(currentWordData.word, letter);
  const targetIndices = wordTokens
    .map((token, idx) => (token.toUpperCase() === letter.toUpperCase() ? idx : null))
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
      sounds.playHuntPrompt(currentWordData.audioWordKey || currentWordData.word, introText);
    }
  }, [currentWordIndex, letter, currentWordData.prompt, onSetSpeech]);

  const handleHearPrompt = () => {
    sounds.playPop();
    onSetSpeech(currentWordData.prompt);
    sounds.playHuntPrompt(currentWordData.audioWordKey || currentWordData.word, currentWordData.prompt);
  };

  const handleTileClick = (token: string, index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (isWordCompleted || isRoundCompleted) return;

    // Se já foi encontrada nesta palavra, ignora
    if (foundIndices.has(index)) {
      sounds.playPop();
      return;
    }

    const isMatch = token.toUpperCase() === letter.toUpperCase();

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

        const successSpeech = `Muito bem! Encontraste ${targetType} na palavra ${currentWordData.display}!`;
        onSetSpeech(successSpeech);

        let advanced = false;
        const advance = () => {
          if (advanced || !isMountedRef.current) return;
          advanced = true;
          if (currentWordIndex + 1 >= wordsList.length) {
            // Concluiu todas as palavras
            setIsRoundCompleted(true);
            sounds.playWinFanfare();
            fireConfetti();
            const finishSpeech = `Fantástico, pequeno detetive! Encontraste ${targetType} nas palavras!`;
            onSetSpeech(finishSpeech);
            sounds.speak(finishSpeech);
          } else {
            setCurrentWordIndex((prev) => prev + 1);
          }
        };

        // Avança após a frase inteira de sucesso terminar de tocar
        sounds.playHuntSuccess(currentWordData.audioWordKey || currentWordData.word, successSpeech, () => {
          addTimer(window.setTimeout(advance, 500));
        });

        // Safety fallback para caso o áudio falhe silenciosamente
        addTimer(window.setTimeout(advance, 4500));
      } else {
        const remainingCount = totalTargetsInWord - nextFound.size;
        const partialSpeech = remainingCount === 1
          ? `Boa! Encontraste uma! Falta mais uma!`
          : `Boa! Encontraste uma! Faltam mais ${remainingCount}!`;
        onSetSpeech(partialSpeech);
        sounds.speak(partialSpeech);
      }
    } else {
      sounds.playTryAgain();
      setWigglingIndex(index);
      addTimer(window.setTimeout(() => setWigglingIndex(null), 500));

      const wrongLabel = labelFor(token);
      const errorSpeech = `Essa é ${wrongLabel}! Onde está ${targetType}?`;
      onSetSpeech(errorSpeech);
      sounds.speak(errorSpeech);
    }
  };

  const handleFinishGame = () => {
    sounds.playSuccess();
    fireConfetti();
    onComplete();
  };

  const isLongWord = wordTokens.length >= 8;
  const isMediumWord = wordTokens.length >= 6;

  let tileDimensions = 'w-12 sm:w-14 h-13 sm:h-15 text-2xl sm:text-3xl rounded-2xl border-4';
  let tokenGap = 'gap-2 sm:gap-2.5';
  let comboWidth = 'w-16 sm:w-20 px-1';

  if (isLongWord) {
    // Para palavras longas com 8 ou 9 letras (ex: TARTARUGA, BISCOITO)
    tileDimensions = 'w-8 sm:w-9 h-10 sm:h-11 text-base sm:text-lg rounded-xl border-2 sm:border-3';
    tokenGap = 'gap-1 sm:gap-1.5';
    comboWidth = 'w-12 sm:w-14 px-0.5';
  } else if (isMediumWord) {
    // Para palavras médias com 6 ou 7 letras (ex: CORUJA, COELHO, ESTRELA)
    tileDimensions = 'w-10 sm:w-11 h-12 sm:h-13 text-xl sm:text-2xl rounded-xl sm:rounded-2xl border-3';
    tokenGap = 'gap-1.5 sm:gap-2';
    comboWidth = 'w-14 sm:w-16 px-1';
  }

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-1 sm:py-2 px-2.5 sm:px-3 h-full min-h-0 overflow-y-auto">
      {/* Barra de Progresso e Instrução */}
      <div className="w-full bg-white/95 border-3 border-amber-400 rounded-2xl px-3 py-1.5 sm:py-2 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-lg sm:text-xl">🔍</span>
          <span className="font-bold text-amber-950 text-xs sm:text-sm">
            Detetive {titleLabelFor(letter)} <strong className="text-lg sm:text-xl font-black text-rose-500 ml-0.5">{letter}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1 bg-amber-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-black text-amber-900">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>{currentWordIndex + 1} de {wordsList.length}</span>
        </div>
      </div>

      {/* Cartão Central da Palavra e Emoji */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto py-1 sm:py-2 min-h-0">
        <div
          className={`w-full bg-white border-4 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg transition-all ${
            isWordCompleted
              ? 'border-emerald-400 bg-emerald-50/90 scale-102'
              : 'border-purple-200'
          }`}
        >
          {/* Emoji com destaque animado */}
          <div className="relative mb-1">
            <span className={`block select-none transform hover:scale-110 transition-transform ${
              isLongWord ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-6xl'
            }`}>
              {currentWordData.emoji}
            </span>
            {isWordCompleted && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-1 shadow-md animate-bounce">
                <Check className="w-4 h-4 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Nome da palavra com botão de áudio */}
          <div
            onClick={() => sounds.playWord(currentWordData.audioWordKey || currentWordData.word)}
            className="flex items-center gap-2 mb-2 sm:mb-2.5 cursor-pointer active:scale-95 transition-transform"
            title="Toca para ouvir a palavra!"
          >
            <span className={`font-black text-purple-950 tracking-wide ${
              isLongWord ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
            }`}>
              {currentWordData.display}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleHearPrompt();
              }}
              className="p-1.5 bg-purple-100 hover:bg-purple-200 active:scale-90 text-purple-700 rounded-full transition-transform shadow-sm"
              title="Ouvir a pergunta"
              aria-label="Ouvir a pergunta"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Dica amigável de quantidade */}
          <div className="text-[11px] sm:text-xs font-bold text-gray-500 mb-2 sm:mb-2.5 text-center">
            {totalTargetsInWord > 1 ? (
              <span>
                Esta palavra tem <strong className="text-purple-700 font-black">{totalTargetsInWord}</strong> vezes{' '}
                <strong className="text-rose-500 font-black">{letter}</strong>!{' '}
                {remainingTargetsInWord > 0 ? `(Faltam ${remainingTargetsInWord})` : '🎉 Concluído!'}
              </span>
            ) : (
              <span>
                Toca n{targetType} <strong className="text-rose-500 font-black">{letter}</strong> no meio da palavra!
              </span>
            )}
          </div>

          {/* Letras / Combinações Interativas (Blocos de Construção da Palavra) */}
          <div className={`flex flex-wrap justify-center items-center ${tokenGap} max-w-full`}>
            {wordTokens.map((token, idx) => {
              const isFound = foundIndices.has(idx);
              const isWiggling = wigglingIndex === idx;

              let tileStyle = 'bg-white border-gray-300 text-gray-800 hover:border-amber-400 active:scale-95';

              if (isFound) {
                tileStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200 scale-105';
              } else if (isWiggling) {
                tileStyle = 'bg-rose-100 border-rose-400 text-rose-700 animate-wiggle';
              }

              const sizeClass = token.length > 1
                ? `${comboWidth} h-11 sm:h-13 text-lg sm:text-xl rounded-xl border-3`
                : tileDimensions;

              return (
                <button
                  type="button"
                  key={`${token}-${idx}`}
                  onClick={(e) => handleTileClick(token, idx, e)}
                  disabled={isFound || isWordCompleted}
                  aria-label={`Letra ${token}`}
                  className={`kid-btn-shadow relative font-black flex items-center justify-center transition-all select-none ${sizeClass} ${tileStyle}`}
                >
                  <span>{token}</span>
                  {isFound && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-white rounded-full p-0.5 shadow-sm">
                      <Star className="w-3 h-3 fill-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botão de Finalização quando completa a ronda */}
      <div className="w-full min-h-[48px] sm:h-14 flex items-center justify-center shrink-0 my-1">
        {isRoundCompleted ? (
          <button
            type="button"
            onClick={handleFinishGame}
            className="kid-btn-shadow w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-base sm:text-lg py-2.5 sm:py-3 px-4 sm:px-6 rounded-2xl flex items-center justify-center gap-2 animate-bounce-soft"
          >
            <span>Muito Bem, Detetive! Próxima Etapa</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        ) : (
          <p className="text-emerald-800/80 font-bold text-[11px] sm:text-xs text-center">
            💡 Toca nos blocos com o teu dedinho para encontrar a resposta!
          </p>
        )}
      </div>
    </div>
  );
}
