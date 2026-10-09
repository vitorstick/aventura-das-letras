import React, { useState, useMemo } from 'react';
import { ShieldAlert, X, RotateCcw } from 'lucide-react';

interface ParentGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export default function ParentGateModal({
  isOpen,
  onClose,
  onConfirmReset
}: ParentGateModalProps): React.JSX.Element | null {
  // Gera um desafio simples para adultos/pais (ex: 7 + 6 = 13)
  const challenge = useMemo(() => {
    const a = Math.floor(Math.random() * 6) + 6; // 6 a 11
    const b = Math.floor(Math.random() * 5) + 4; // 4 a 8
    return { a, b, answer: a + b };
  }, [isOpen]);

  const [inputVal, setInputVal] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const parsed = parseInt(inputVal.trim(), 10);
    if (parsed === challenge.answer) {
      setError(false);
      setInputVal('');
      onConfirmReset();
    } else {
      setError(true);
      setInputVal('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-amber-400 p-6 max-w-sm w-full shadow-2xl relative text-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar janela dos pais"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-1">
          Área dos Pais 🔒
        </h3>
        <p className="text-xs text-gray-600 font-medium mb-4">
          Para proteger o progresso da criança, responde ao desafio:
        </p>

        <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 mb-4">
          <span className="font-black text-lg text-amber-950">
            Quanto é {challenge.a} + {challenge.b}?
          </span>
          <div className="mt-3 flex justify-center">
            <input
              type="number"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConfirm();
              }}
              placeholder="Resposta"
              autoFocus
              className="w-28 text-center text-xl font-black p-2 border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:outline-none"
            />
          </div>
          {error && (
            <p className="text-rose-500 text-xs font-bold mt-2">
              Resposta incorreta. Tenta novamente!
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500 font-semibold mb-5">
          ⚠️ Isto apagará todas as estrelas e voltará à Etapa 1.
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 font-black text-white text-sm shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            Recomeçar
          </button>
        </div>
      </div>
    </div>
  );
}
