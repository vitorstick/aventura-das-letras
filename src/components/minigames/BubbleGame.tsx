import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { sounds } from '../../utils/soundEngine';
import { fireStars, fireConfetti } from '../../utils/confetti';
import { LetterKey } from '../../types/game';

interface BubbleItem {
  id: number;
  char: string;
  isTarget: boolean;
  leftPercent: number;
  duration: number;
  popped: boolean;
}

interface BubbleGameProps {
  letter: LetterKey;
  targetCount?: number;
  onComplete: () => void;
  onSetSpeech: (text: string) => void;
}

export default function BubbleGame({
  letter,
  targetCount = 5,
  onComplete,
  onSetSpeech
}: BubbleGameProps): React.JSX.Element {
  const [score, setScore] = useState<number>(0);
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const nextId = useRef<number>(1);

  useEffect(() => {
    onSetSpeech(`Rebenta ${targetCount} bolhas com a letra ${letter}!`);
    sounds.speak(`Rebenta todas as bolhas que tenham a letra ${letter}!`);
  }, [letter, targetCount, onSetSpeech]);

  // Intervalo de geração de bolhas
  useEffect(() => {
    const spawnBubble = () => {
      const distractors = (['A', 'E', 'I', 'U', 'O'] as const).filter(l => l !== letter);
      const isTarget = Math.random() < 0.65;
      const char = isTarget ? letter : distractors[Math.floor(Math.random() * distractors.length)];
      const id = nextId.current++;
      const leftPercent = Math.random() * 65 + 10; // entre 10% e 75% da largura
      const duration = Math.random() * 1.5 + 4.5; // 4.5s a 6s para subir

      setBubbles(prev => [...prev, { id, char, isTarget, leftPercent, duration, popped: false }]);
    };

    // Gera 2 bolhas iniciais com pequeno desfasamento
    spawnBubble();
    const timeout = setTimeout(spawnBubble, 600);

    // E continua a gerar regularmente
    const interval = setInterval(spawnBubble, 1200);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [letter]);

  const removeBubble = (id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  const handleBubbleHit = (b: BubbleItem, e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (b.popped) return;

    if (b.isTarget) {
      sounds.playPop();
      sounds.playStar();

      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      fireStars(x, y);

      // Marca como rebentada para efeito visual antes de remover
      setBubbles(prev =>
        prev.map(item => item.id === b.id ? { ...item, popped: true } : item)
      );
      setTimeout(() => removeBubble(b.id), 200);

      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= targetCount) {
        sounds.playSuccess();
        fireConfetti();
        onSetSpeech(`Conseguiste rebentar todas as bolhas do ${letter}! 🎉`);
        sounds.speak(`Muito bem! Apanhaste todas as bolhas da letra ${letter}!`);
        setTimeout(() => {
          onComplete();
        }, 1500);
      } else if (newScore === Math.ceil(targetCount / 2)) {
        onSetSpeech("Estás quase lá! Continua!");
      }
    } else {
      sounds.playTryAgain();
      onSetSpeech(`Essa é a letra ${b.char}! Procura a letra ${letter}!`);
      sounds.speak(`Essa é a letra ${b.char}! Toca na letra ${letter}!`);
    }
  };

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-2 px-2 h-full">
      {/* Cabeçalho do Desafio */}
      <div className="w-full bg-white/95 border-3 border-sky-400 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-md shrink-0">
        <span className="font-bold text-sky-900 text-sm sm:text-base">
          Procura a letra: <strong className="text-2xl text-rose-500 font-black ml-1">{letter}</strong>
        </span>
        <div className="flex items-center gap-1.5 bg-sky-100 px-3 py-1 rounded-full font-black text-sky-800 text-sm sm:text-base">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span>{score} / {targetCount}</span>
        </div>
      </div>

      {/* Arena de Bolhas Flutuantes */}
      <div className="w-full flex-1 min-h-[340px] relative overflow-hidden rounded-3xl bg-white/50 border-3 border-dashed border-sky-300 my-2 shadow-inner">
        {bubbles.map(b => (
          <div
            key={b.id}
            onPointerDown={(e) => handleBubbleHit(b, e)}
            onAnimationEnd={() => removeBubble(b.id)}
            style={{
              left: `${b.leftPercent}%`,
              ['--float-duration' as string]: `${b.duration}s`
            }}
            className={`animate-bubble-rise absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer select-none touch-manipulation transition-transform ${
              b.popped ? 'scale-150 opacity-0 duration-200' : 'active:scale-110'
            }`}
          >
            {/* Brilho da Bolha de Sabão */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/95 via-sky-200/75 to-sky-400/85 border-2 border-white/80 shadow-[0_6px_16px_rgba(3,169,244,0.35)]">
              {/* Reflexo de luz no topo */}
              <div className="absolute top-2 left-3 w-5 h-3 bg-white/90 rounded-full -rotate-45" />
            </div>

            {/* Letra no Interior */}
            <span className="relative z-10 font-black text-3xl sm:text-4xl text-sky-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              {b.char}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
