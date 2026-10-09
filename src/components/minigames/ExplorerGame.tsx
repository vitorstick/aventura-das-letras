import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, Sparkles } from 'lucide-react';
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
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);
  const [activeCharIndex, setActiveCharIndex] = useState<number | null>(null);
  const [isSpelling, setIsSpelling] = useState<boolean>(false);
  const spellingTimeouts = useRef<number[]>([]);

  const isCombo = letter.length > 1;
  const labelType = isCombo ? 'a combinação' : 'a letra';

  useEffect(() => {
    onSetSpeech(`Esta é ${labelType} ${letter}! Toca nos cartões para ouvir!`);
    sounds.playLetterIntro(letter, letterData.spokenIntro);

    return () => {
      spellingTimeouts.current.forEach(t => clearTimeout(t));
    };
  }, [letter, letterData.spokenIntro, onSetSpeech, labelType]);

  const handleLetterTap = () => {
    sounds.playStar();
    fireStars(0.5, 0.35);
    const textLabel = isCombo ? `Combinação ${letter}` : `Letra ${letter}`;
    onSetSpeech(`${textLabel}! Faz o som: ${letterData.soundText}!`);
    sounds.playLetterCard(letter);
  };

  const handleCardTap = (index: number, item: WordItem) => {
    sounds.playStar();
    fireStars(0.5, 0.45);

    const nextExplored = new Set(explored);
    nextExplored.add(index);
    setExplored(nextExplored);

    setSelectedWord(item);
    setActiveCharIndex(null);
    setIsSpelling(false);
    spellingTimeouts.current.forEach(t => clearTimeout(t));
    spellingTimeouts.current = [];

    onSetSpeech(`${item.word}!`);
    sounds.playWordPhrase(item.id || item.word, item.audioText);
  };

  const handlePlayWordOnly = (item: WordItem) => {
    sounds.playWord(item.id || item.word, item.word);
    onSetSpeech(`${item.word}!`);
  };

  const handleCharTap = (char: string, idx: number) => {
    if (isSpelling) return;
    setActiveCharIndex(idx);
    sounds.playSpellingLetter(char);
    onSetSpeech(`Letra ${char}!`);

    const t = window.setTimeout(() => {
      setActiveCharIndex(null);
    }, 700);
    spellingTimeouts.current.push(t);
  };

  const handleAutoSpell = (item: WordItem) => {
    if (isSpelling) return;
    setIsSpelling(true);
    spellingTimeouts.current.forEach(t => clearTimeout(t));
    spellingTimeouts.current = [];

    const letters = item.spelling || item.word.split('').map(c => c.toUpperCase());
    onSetSpeech(`A soletrar: ${item.word}!`);

    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= letters.length) {
        // Conclusão da soletração: diz a palavra inteira e solta estrelas
        setActiveCharIndex(null);
        setIsSpelling(false);
        sounds.playSuccess();
        sounds.playWord(item.id || item.word, item.word);
        fireStars(0.5, 0.6);
        onSetSpeech(`${item.word}! Muito bem!`);
        return;
      }

      const idx = currentIndex;
      const char = letters[idx];
      setActiveCharIndex(idx);
      currentIndex++;

      sounds.playSpellingLetter(char, () => {
        // Pequena pausa natural de 150ms entre letras
        const t = window.setTimeout(playNext, 150);
        spellingTimeouts.current.push(t);
      });
    };

    playNext();
  };

  const handleFinish = () => {
    sounds.playSuccess();
    fireConfetti();
    onComplete();
  };

  const renderWord = (word: string) => {
    const upperWord = word.toUpperCase();
    const upperTarget = letter.toUpperCase();
    const matchIdx = upperWord.indexOf(upperTarget);

    if (matchIdx === -1) {
      return <span>{word}</span>;
    }

    const before = word.slice(0, matchIdx);
    const match = word.slice(matchIdx, matchIdx + letter.length);
    const after = word.slice(matchIdx + letter.length);

    return (
      <span>
        {before}
        <span className="text-rose-500 underline text-xl">{match}</span>
        {after}
      </span>
    );
  };

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-1.5 px-2">
      {/* Letra ou Combinação Gigante Central */}
      <div
        onClick={handleLetterTap}
        className="kid-btn-shadow w-24 h-24 sm:w-26 sm:h-26 bg-white border-4 border-emerald-400 rounded-3xl flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform shrink-0"
        title="Toca para ouvir a letra!"
      >
        <span className="text-4xl sm:text-5xl font-black" style={{ color: letterData.color }}>
          {letterData.char}
        </span>
        <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
          <Volume2 className="w-3 h-3" /> Toca!
        </span>
      </div>

      {/* Grelha de Palavras */}
      <div className="grid grid-cols-2 gap-2.5 w-full my-2">
        {letterData.words.map((item, idx) => {
          const isTapped = explored.has(idx);
          const isSelected = selectedWord?.word === item.word;

          return (
            <div
              key={item.word}
              onClick={() => handleCardTap(idx, item)}
              className={`p-2.5 rounded-2xl border-3 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 shadow-md ${
                isSelected
                  ? 'bg-amber-50 border-amber-400 scale-[1.03] ring-2 ring-amber-300'
                  : isTapped
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-white border-gray-200'
              }`}
            >
              <span className="text-3xl sm:text-4xl mb-0.5">{item.emoji}</span>
              <span className="text-base sm:text-lg font-black text-gray-800">
                {renderWord(item.word)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Barra Interativa de Soletração Fonológica */}
      {selectedWord && (
        <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300 rounded-2xl p-2.5 shadow-md flex flex-col items-center my-1 animate-pop-in shrink-0">
          <div className="flex items-center justify-between w-full px-1 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl">{selectedWord.emoji}</span>
              <span className="text-lg font-black text-amber-950">{selectedWord.word}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePlayWordOnly(selectedWord)}
                className="p-1.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white rounded-xl shadow-sm active:scale-95 transition-all"
                title="Ouvir a palavra completa"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAutoSpell(selectedWord)}
                disabled={isSpelling}
                className="px-2.5 py-1 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-black text-xs rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-1"
                title="Soletrar letra a letra"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Soletrar</span>
              </button>
            </div>
          </div>

          {/* Fichas de Letras Clicáveis */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full py-1">
            {(selectedWord.spelling || selectedWord.word.split('').map(c => c.toUpperCase())).map((char, cIdx) => {
              const isHighlight = activeCharIndex === cIdx;
              return (
                <button
                  key={cIdx}
                  onClick={() => handleCharTap(char, cIdx)}
                  disabled={isSpelling}
                  className={`w-9 h-10 sm:w-10 sm:h-11 rounded-xl font-black text-lg flex items-center justify-center transition-all transform active:scale-90 ${
                    isHighlight
                      ? 'bg-amber-400 text-amber-950 scale-110 shadow-md ring-4 ring-amber-300'
                      : 'bg-white text-gray-800 border-2 border-amber-200 shadow-sm hover:border-amber-400'
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-amber-900/80 mt-1">
            Toca nas letras para ouvir os sons! 👆
          </span>
        </div>
      )}

      {/* Botão de Conclusão */}
      <div className="w-full flex justify-center h-12 sm:h-14 mt-1">
        {explored.size >= 2 && (
          <button
            onClick={handleFinish}
            className="kid-btn-shadow w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-base sm:text-lg py-2.5 sm:py-3 px-6 rounded-2xl flex items-center justify-center gap-2 animate-bounce-soft"
          >
            <span>Muito Bem! Próxima Etapa</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
