import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';
import { sounds } from '../../utils/soundEngine';
import { fireStars, fireConfetti } from '../../utils/confetti';
import { LetterKey } from '../../types/game';

interface RuntimePoint {
  x: number;
  y: number;
  reached: boolean;
}

interface Point2D {
  x: number;
  y: number;
}

interface TraceGameProps {
  letter: LetterKey;
  onComplete: () => void;
  onSetSpeech: (text: string) => void;
}

export default function TraceGame({
  letter,
  onComplete,
  onSetSpeech
}: TraceGameProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const letterData = GAME_DATA.letters[letter];
  const [cursiveType, setCursiveType] = useState<'lowercase' | 'uppercase'>('lowercase');
  const [progress, setProgress] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [needsDot, setNeedsDot] = useState<boolean>(false); // Para o pingo no i
  const [dotCompleted, setDotCompleted] = useState<boolean>(false);

  const pointsRef = useRef<RuntimePoint[]>([]);
  const currentCheckIdx = useRef<number>(0);
  const isDrawing = useRef<boolean>(false);
  const drawnPath = useRef<Point2D[]>([]);

  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 340;

  const currentCursiveData = letterData.tracing?.[cursiveType];

  // Linhas de Pauta de Caligrafia Escolar
  const drawSchoolNotebookRuling = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.save();
    // Fundo bege suave de papel de caderno
    ctx.fillStyle = '#FCFDF7';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Linha de margem esquerda vertical (vermelha suave)
    ctx.strokeStyle = 'rgba(239, 83, 80, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(35, 0);
    ctx.lineTo(35, CANVAS_HEIGHT);
    ctx.stroke();

    // Linhas horizontais de caligrafia (linhas azuis suaves)
    const rulingLines = [
      { y: 80, style: 'dashed', color: 'rgba(3, 169, 244, 0.25)', width: 1.5 }, // Linha superior (teto)
      { y: 135, style: 'dashed', color: 'rgba(3, 169, 244, 0.45)', width: 2 }, // Linha média (altura das minúsculas)
      { y: 240, style: 'solid', color: 'rgba(3, 169, 244, 0.75)', width: 2.5 }  // Linha de base (chão da letra)
    ];

    rulingLines.forEach(line => {
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      if (line.style === 'dashed') {
        ctx.setLineDash([8, 6]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.moveTo(0, line.y);
      ctx.lineTo(CANVAS_WIDTH, line.y);
      ctx.stroke();
    });

    ctx.restore();
  }, []);

  // Traço Cursivo Suave com Curvas
  const drawCursiveGuide = useCallback((ctx: CanvasRenderingContext2D) => {
    const pts = pointsRef.current;
    if (pts.length < 2) return;

    ctx.save();
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(176, 190, 197, 0.4)';
    ctx.setLineDash([10, 10]);

    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);

    for (let i = 1; i < pts.length; i++) {
      const xc = (pts[i - 1].x + pts[i].x) / 2;
      const yc = (pts[i - 1].y + pts[i].y) / 2;
      ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, xc, yc);
    }
    const last = pts[pts.length - 1];
    ctx.lineTo(last.x, last.y);
    ctx.stroke();
    ctx.restore();
  }, []);

  // Pingo no i
  const drawDotGuide = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!currentCursiveData?.dot) return;

    const dotPos = {
      x: currentCursiveData.dot.x * CANVAS_WIDTH,
      y: currentCursiveData.dot.y * CANVAS_HEIGHT
    };

    ctx.save();
    ctx.beginPath();
    ctx.arc(dotPos.x, dotPos.y, 10, 0, Math.PI * 2);

    if (dotCompleted) {
      ctx.fillStyle = '#4CAF50';
      ctx.fill();
    } else if (needsDot) {
      // Pingo a pulsar para a criança carregar
      ctx.fillStyle = '#FF9800';
      ctx.shadowColor = '#FF9800';
      ctx.shadowBlur = 12;
      ctx.fill();

      // Desenhar estrelinha sobre o pingo
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⭐', dotPos.x, dotPos.y);
    } else {
      ctx.strokeStyle = 'rgba(176, 190, 197, 0.6)';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
    }
    ctx.restore();
  }, [currentCursiveData?.dot, dotCompleted, needsDot]);

  // Checkpoints visuais
  const drawCheckpoints = useCallback((ctx: CanvasRenderingContext2D) => {
    pointsRef.current.forEach((pt, i) => {
      const isCurrent = i === currentCheckIdx.current && !needsDot;
      const isReached = pt.reached;

      ctx.save();
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, isCurrent ? 16 : 10, 0, Math.PI * 2);

      if (isReached) {
        ctx.fillStyle = '#4CAF50';
      } else if (isCurrent) {
        ctx.fillStyle = '#FF9800';
        ctx.shadowColor = '#FF9800';
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = 'rgba(207, 216, 220, 0.8)';
      }
      ctx.fill();

      // Indicador no ponto inicial 1
      if (i === 0 && !isReached) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 13px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('1', pt.x, pt.y);
      }
      ctx.restore();
    });
  }, [needsDot]);

  // Traço desenhado pela criança
  const drawUserStroke = useCallback((ctx: CanvasRenderingContext2D) => {
    if (drawnPath.current.length > 1) {
      ctx.save();
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Gradiente dourado brilhante
      const grad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      grad.addColorStop(0, '#FFD54F');
      grad.addColorStop(0.5, '#4CAF50');
      grad.addColorStop(1, '#00BCD4');

      ctx.strokeStyle = grad;
      ctx.shadowColor = 'rgba(255, 193, 7, 0.6)';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.moveTo(drawnPath.current[0].x, drawnPath.current[0].y);

      for (let i = 1; i < drawnPath.current.length; i++) {
        const xc = (drawnPath.current[i - 1].x + drawnPath.current[i].x) / 2;
        const yc = (drawnPath.current[i - 1].y + drawnPath.current[i].y) / 2;
        ctx.quadraticCurveTo(drawnPath.current[i - 1].x, drawnPath.current[i - 1].y, xc, yc);
      }
      const last = drawnPath.current[drawnPath.current.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
      ctx.restore();
    }
  }, []);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 1. Desenhar Pauta de Caderno Escolar Português
    drawSchoolNotebookRuling(ctx);

    // 2. Desenhar a Letra Cursiva Guia (traço suave pontilhado)
    drawCursiveGuide(ctx);

    // 3. Desenhar o Pingo no i se aplicável
    if (cursiveType === 'lowercase' && currentCursiveData?.dot) {
      drawDotGuide(ctx);
    }

    // 4. Desenhar os Pontos de Orientação / Checkpoints
    drawCheckpoints(ctx);

    // 5. Desenhar o Traço Feito pela Criança com Efeito Dourado
    drawUserStroke(ctx);
  }, [
    drawSchoolNotebookRuling,
    drawCursiveGuide,
    cursiveType,
    currentCursiveData?.dot,
    drawDotGuide,
    drawCheckpoints,
    drawUserStroke
  ]);

  const isCombo = letter.length > 1;
  const itemLabel = isCombo ? 'a combinação' : 'a letra';

  const resetLevel = useCallback(() => {
    if (!letterData.tracing) return;
    const data = letterData.tracing[cursiveType];
    onSetSpeech(`Vamos treinar ${itemLabel} ${data.char} cursiva!`);
    sounds.speak(data.hint);

    // Mapear pontos para o tamanho real do canvas
    pointsRef.current = data.points.map(pt => ({
      x: pt.x * CANVAS_WIDTH,
      y: pt.y * CANVAS_HEIGHT,
      reached: false
    }));

    currentCheckIdx.current = 0;
    drawnPath.current = [];
    setProgress(0);
    setIsCompleted(false);
    setNeedsDot(false);
    setDotCompleted(false);

    drawCanvas();
  }, [letterData.tracing, cursiveType, onSetSpeech, drawCanvas, itemLabel]);

  useEffect(() => {
    resetLevel();
  }, [resetLevel]);

  const finishTracing = useCallback(() => {
    setIsCompleted(true);
    sounds.playSuccess();
    fireConfetti();
    const charName = currentCursiveData?.char || letter;
    onSetSpeech(`Fantástico! Escreveste ${itemLabel} ${charName} cursiva! 🎉`);
    sounds.speak(`Parabéns! Traçaste com caligrafia cursiva perfeitamente!`);
    setTimeout(() => {
      onComplete();
    }, 1600);
  }, [currentCursiveData?.char, letter, onComplete, onSetSpeech, itemLabel]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>): Point2D => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const checkCollision = (pos: Point2D) => {
    // Se está na fase do pingo no i
    if (needsDot && !dotCompleted && currentCursiveData?.dot) {
      const dotPos = {
        x: currentCursiveData.dot.x * CANVAS_WIDTH,
        y: currentCursiveData.dot.y * CANVAS_HEIGHT
      };
      const dist = Math.hypot(pos.x - dotPos.x, pos.y - dotPos.y);
      if (dist < 40) {
        setDotCompleted(true);
        sounds.playStar();
        fireStars(pos.x / CANVAS_WIDTH, pos.y / CANVAS_HEIGHT);
        finishTracing();
      }
      return;
    }

    if (currentCheckIdx.current >= pointsRef.current.length) return;

    const target = pointsRef.current[currentCheckIdx.current];
    const dist = Math.hypot(pos.x - target.x, pos.y - target.y);

    // Tolerância confortável para 6 anos (45px)
    if (dist < 45) {
      target.reached = true;
      currentCheckIdx.current++;
      sounds.playStar();

      const pct = Math.round((currentCheckIdx.current / pointsRef.current.length) * 100);
      setProgress(pct);

      if (currentCheckIdx.current >= pointsRef.current.length) {
        if (cursiveType === 'lowercase' && currentCursiveData?.dot) {
          // Ativa o pingo no i
          setNeedsDot(true);
          onSetSpeech("Boa! Agora põe o pingo no i! ✨");
          sounds.speak("Muito bem! Agora toca no ponto para pôr o pingo no i!");
        } else {
          finishTracing();
        }
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isCompleted) return;
    isDrawing.current = true;
    const pos = getPos(e);
    drawnPath.current.push(pos);
    checkCollision(pos);
    drawCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || isCompleted) return;
    const pos = getPos(e);
    drawnPath.current.push(pos);

    if (drawnPath.current.length % 5 === 0) {
      sounds.playStar();
    }

    checkCollision(pos);
    drawCanvas();
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-between py-1 px-2">
      {/* Seletor de Tipo de Letra Cursiva: Minúscula vs Maiúscula */}
      <div className="flex items-center gap-2 mb-2 bg-white/80 p-1.5 rounded-2xl border-2 border-amber-300 shadow-sm shrink-0">
        <button
          onClick={() => setCursiveType('lowercase')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 ${
            cursiveType === 'lowercase'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-amber-900 hover:bg-amber-100'
          }`}
        >
          ✍️ Minúscula ({letter.toLowerCase()})
        </button>

        <button
          onClick={() => setCursiveType('uppercase')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 ${
            cursiveType === 'uppercase'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-amber-900 hover:bg-amber-100'
          }`}
        >
          🏛️ Maiúscula ({letter})
        </button>
      </div>

      {/* Caderno Escolar com o Canvas */}
      <div className="relative bg-white rounded-3xl border-4 border-amber-400 shadow-xl overflow-hidden touch-none w-[300px] h-[340px]">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full block touch-none cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />

        {/* Botão de Limpar e Tentar Outra Vez */}
        <button
          onClick={resetLevel}
          className="absolute top-2 right-2 w-9 h-9 bg-white/90 rounded-full shadow border border-gray-200 flex items-center justify-center text-gray-600 active:scale-90"
          title="Tentar outra vez"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Barra de Progresso e Instrução */}
      <div className="w-full max-w-[280px] mt-2">
        <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-center text-xs sm:text-sm font-black text-emerald-800 mt-1.5">
          {isCompleted
            ? "Perfeito! ⭐"
            : needsDot
            ? "Toca no ponto para pôr o pingo no i! ✨"
            : "Segue as curvas no caderno de caligrafia! ✍️"}
        </p>
      </div>
    </div>
  );
}
