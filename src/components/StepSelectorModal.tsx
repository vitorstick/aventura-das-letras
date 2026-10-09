import React, { useState, useEffect } from 'react';
import { X, Play, Star, Sparkles, Award } from 'lucide-react';
import { LetterKey } from '../types/game';
import { GAME_DATA } from '../data/gameData';
import { sounds } from '../utils/soundEngine';

export type SelectorTab = LetterKey | 'QUIZ' | 'ALL';

interface StepSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStep: (stepIndex: number) => void;
  initialLetter?: SelectorTab;
  completedSteps?: number[];
}

interface LetterMeta {
  key: LetterKey;
  label: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
}

const LETTERS_META: LetterMeta[] = [
  {
    key: 'I',
    label: 'Letra I',
    icon: '🏝️',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-700',
    badgeBorder: 'border-sky-300',
    description: 'Ilha, Igreja, Íman, Iguana'
  },
  {
    key: 'U',
    label: 'Letra U',
    icon: '🐻',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-300',
    description: 'Urso, Uvas, Unha, Unicórnio'
  },
  {
    key: 'UI',
    label: 'Combinação UI',
    icon: '😱',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    badgeBorder: 'border-teal-300',
    description: 'Uivar, Ruído, Cuidado, Fui'
  },
  {
    key: 'IU',
    label: 'Combinação IU',
    icon: '👀',
    badgeBg: 'bg-fuchsia-50',
    badgeText: 'text-fuchsia-700',
    badgeBorder: 'border-fuchsia-300',
    description: 'Viu, Chiu, Saiu, Partiu'
  },
  {
    key: 'A',
    label: 'Letra A',
    icon: '✈️',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-300',
    description: 'Avião, Abelha, Ananás, Anel'
  },
  {
    key: 'E',
    label: 'Letra E',
    icon: '🐘',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    badgeBorder: 'border-indigo-300',
    description: 'Elefante, Estrela, Escova, Espelho'
  },
  {
    key: 'O',
    label: 'Letra O',
    icon: '👁️',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-300',
    description: 'Olhos, Ovelha, Ovo, Orelha'
  }
];

export default function StepSelectorModal({
  isOpen,
  onClose,
  onSelectStep,
  initialLetter = 'I',
  completedSteps = []
}: StepSelectorModalProps): React.JSX.Element | null {
  const [activeTab, setActiveTab] = useState<SelectorTab>(initialLetter);

  // Sincronizar o separador quando abre com uma letra específica
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialLetter);
    }
  }, [isOpen, initialLetter]);

  // Fechar com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTabChange = (tab: SelectorTab) => {
    sounds.playPop();
    setActiveTab(tab);
  };

  const handleStepClick = (index: number) => {
    sounds.playPop();
    onSelectStep(index);
    onClose();
  };

  // Obter as etapas correspondentes à letra atual
  const activeLetterMeta = LETTERS_META.find(l => l.key === activeTab);
  const letterSteps = activeLetterMeta
    ? GAME_DATA.steps
        .map((step, idx) => ({ step, idx }))
        .filter(item => item.step.letter === activeLetterMeta.key)
    : [];

  const quizSteps = GAME_DATA.steps
    .map((step, idx) => ({ step, idx }))
    .filter(item => item.step.type === 'quiz' || item.step.type === 'celebration');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Escolher Letra ou Etapa"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white rounded-3xl border-4 border-emerald-400 p-4 sm:p-5 max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl relative">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-emerald-800 leading-tight">
                Escolhe uma Letra ou Etapa
              </h2>
              <p className="text-xs text-gray-500 font-semibold">
                Salta diretamente para onde quiseres brincar!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-600 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Separadores de Letras / Navegação Rápida */}
        <div className="py-2.5 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 map-scroll scrollbar-none">
            {LETTERS_META.map(meta => {
              const isSelected = activeTab === meta.key;
              return (
                <button
                  key={meta.key}
                  type="button"
                  onClick={() => handleTabChange(meta.key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black shrink-0 transition-all border-2 ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-105'
                      : `${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText} hover:bg-gray-100`
                  }`}
                >
                  <span>{meta.icon}</span>
                  <span>{meta.key}</span>
                </button>
              );
            })}

            {/* Separador Quiz / Desafio */}
            <button
              type="button"
              onClick={() => handleTabChange('QUIZ')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black shrink-0 transition-all border-2 ${
                activeTab === 'QUIZ'
                  ? 'bg-purple-600 border-purple-700 text-white shadow-md scale-105'
                  : 'bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100'
              }`}
            >
              <span>🎯</span>
              <span>Quiz</span>
            </button>

            {/* Separador Todas as Etapas */}
            <button
              type="button"
              onClick={() => handleTabChange('ALL')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black shrink-0 transition-all border-2 ${
                activeTab === 'ALL'
                  ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-105'
                  : 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
              }`}
            >
              <span>📋</span>
              <span>Todas</span>
            </button>
          </div>
        </div>

        {/* Conteúdo Dinâmico com Scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 map-scroll flex flex-col gap-3 py-1">
          {/* VISTA POR LETRA ESPECÍFICA */}
          {activeLetterMeta && (
            <div className="flex flex-col gap-3">
              {/* Cartão de Destaque da Letra */}
              <div className={`p-3.5 rounded-2xl border-2 ${activeLetterMeta.badgeBorder} ${activeLetterMeta.badgeBg} flex flex-col gap-2.5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl font-black text-gray-800 border border-gray-100">
                      {activeLetterMeta.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900 leading-tight">
                        {activeLetterMeta.label}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">
                        {activeLetterMeta.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botão de Início Direto da Letra */}
                {letterSteps.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleStepClick(letterSteps[0].idx)}
                    className="kid-btn-shadow w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Jogar {activeLetterMeta.label} (do início)
                  </button>
                )}
              </div>

              {/* Lista dos 3 Minijogos da Letra */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                  Ou escolhe a atividade:
                </span>

                {letterSteps.map(({ step, idx }) => {
                  const isCompleted = completedSteps.includes(idx);
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleStepClick(idx)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl border-2 border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left active:scale-98 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0 border border-gray-200">
                          {step.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              Etapa {idx + 1}
                            </span>
                            <h4 className="font-black text-sm text-gray-900">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1 pl-2">
                        {isCompleted ? (
                          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                        ) : (
                          <Play className="w-4 h-4 text-emerald-600 fill-emerald-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* VISTA QUIZ & CELEBRAÇÃO */}
          {activeTab === 'QUIZ' && (
            <div className="flex flex-col gap-2">
              <div className="p-3.5 rounded-2xl border-2 border-purple-200 bg-purple-50 mb-1">
                <h3 className="text-base font-black text-purple-900 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  O Grande Desafio Final
                </h3>
                <p className="text-xs text-purple-700 font-medium">
                  Testa tudo o que aprendeste com as letras e combinações!
                </p>
              </div>

              {quizSteps.map(({ step, idx }) => {
                const isCompleted = completedSteps.includes(idx);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl border-2 border-purple-200 bg-white hover:border-purple-500 hover:bg-purple-50/60 transition-all text-left active:scale-98 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-2xl shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                            Etapa {idx + 1}
                          </span>
                          <h4 className="font-black text-sm text-gray-900">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 pl-2">
                      {isCompleted ? (
                        <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                      ) : (
                        <Play className="w-4 h-4 text-purple-600 fill-purple-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* VISTA DE TODAS AS ETAPAS (1 a 23) */}
          {activeTab === 'ALL' && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                Todas as 23 Etapas Disponíveis:
              </span>

              {GAME_DATA.steps.map((step, idx) => {
                const isCompleted = completedSteps.includes(idx);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border-2 border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left active:scale-98 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-lg shrink-0 border border-gray-200">
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-gray-100 text-gray-700">
                            #{idx + 1}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 pl-2">
                      {isCompleted ? (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span className="font-semibold flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            {completedSteps.length} de {GAME_DATA.steps.length} concluídas
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-emerald-700 hover:text-emerald-800 font-bold px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
