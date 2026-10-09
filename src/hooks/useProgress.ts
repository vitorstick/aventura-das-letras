import { useState, useEffect, useCallback, useMemo } from 'react';
import { sounds } from '../utils/soundEngine';

export interface GameProgress {
  version: 1;
  unlockedStep: number;
  completedSteps: number[];
  soundEnabled: boolean;
}

const STORAGE_KEY = 'dino_progress_v1';
const LEGACY_UNLOCKED_KEY = 'dino_unlocked_step';
const LEGACY_STARS_KEY = 'dino_stars';

/**
 * Valida e converte com segurança dados brutos numa estrutura válida de progresso.
 */
export function sanitizeProgress(raw: unknown, maxSteps: number): GameProgress {
  const defaultProgress: GameProgress = {
    version: 1,
    unlockedStep: 0,
    completedSteps: [],
    soundEnabled: true
  };

  if (!raw || typeof raw !== 'object') {
    return defaultProgress;
  }

  const data = raw as Partial<GameProgress>;

  // Validar unlockedStep
  let unlocked = typeof data.unlockedStep === 'number' && Number.isFinite(data.unlockedStep)
    ? Math.floor(data.unlockedStep)
    : 0;
  if (unlocked < 0) unlocked = 0;
  if (unlocked >= maxSteps) unlocked = maxSteps - 1;

  // Validar completedSteps
  let completed: number[] = [];
  if (Array.isArray(data.completedSteps)) {
    const validIndices = data.completedSteps
      .filter((n): n is number => typeof n === 'number' && Number.isFinite(n) && n >= 0 && n < maxSteps)
      .map(n => Math.floor(n));
    completed = Array.from(new Set(validIndices)).sort((a, b) => a - b);
  }

  // Validar soundEnabled
  const soundEnabled = typeof data.soundEnabled === 'boolean' ? data.soundEnabled : true;

  return {
    version: 1,
    unlockedStep: unlocked,
    completedSteps: completed,
    soundEnabled
  };
}

/**
 * Lê do localStorage com suporte a migração de chaves antigas.
 */
function loadInitialProgress(maxSteps: number): GameProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return sanitizeProgress(parsed, maxSteps);
    }

    // Migração de chaves legadas (se existirem)
    const legacyUnlocked = parseInt(localStorage.getItem(LEGACY_UNLOCKED_KEY) || '', 10);
    const legacyStars = parseInt(localStorage.getItem(LEGACY_STARS_KEY) || '', 10);

    if (Number.isFinite(legacyUnlocked) || Number.isFinite(legacyStars)) {
      const unlocked = Number.isFinite(legacyUnlocked)
        ? Math.min(Math.max(0, legacyUnlocked), maxSteps - 1)
        : 0;

      const starsCount = Number.isFinite(legacyStars)
        ? Math.min(Math.max(0, legacyStars), maxSteps)
        : 0;

      const completed = Array.from({ length: Math.min(starsCount, unlocked) }, (_, i) => i);

      const migrated: GameProgress = {
        version: 1,
        unlockedStep: unlocked,
        completedSteps: completed,
        soundEnabled: true
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      } catch (e) {
        // ignore
      }

      return migrated;
    }
  } catch (err) {
    console.warn('[useProgress] Erro ao carregar progresso, a usar valores padrão:', err);
  }

  return {
    version: 1,
    unlockedStep: 0,
    completedSteps: [],
    soundEnabled: true
  };
}

export function useProgress(maxSteps: number) {
  const [progress, setProgress] = useState<GameProgress>(() => loadInitialProgress(maxSteps));

  // Sincronizar o soundEngine com o estado guardado no início
  useEffect(() => {
    sounds.soundEnabled = progress.soundEnabled;
    sounds.speechEnabled = progress.soundEnabled;
  }, [progress.soundEnabled]);

  // Persistir sempre que o progresso mudar
  const persistProgress = useCallback((newProgress: GameProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.warn('[useProgress] Falha ao guardar progresso no localStorage:', e);
    }
  }, []);

  const completeStep = useCallback((stepIndex: number) => {
    setProgress(prev => {
      const nextCompletedSet = new Set(prev.completedSteps);
      nextCompletedSet.add(stepIndex);
      const nextCompleted = Array.from(nextCompletedSet).sort((a, b) => a - b);

      let nextUnlocked = prev.unlockedStep;
      if (stepIndex === prev.unlockedStep) {
        nextUnlocked = Math.min(stepIndex + 1, maxSteps - 1);
      }

      const updated: GameProgress = {
        ...prev,
        unlockedStep: nextUnlocked,
        completedSteps: nextCompleted
      };

      persistProgress(updated);
      return updated;
    });
  }, [maxSteps, persistProgress]);

  const toggleSound = useCallback(() => {
    const nextState = sounds.toggleSound();
    setProgress(prev => {
      const updated: GameProgress = {
        ...prev,
        soundEnabled: nextState
      };
      persistProgress(updated);
      return updated;
    });
    return nextState;
  }, [persistProgress]);

  const resetProgress = useCallback(() => {
    const resetData: GameProgress = {
      version: 1,
      unlockedStep: 0,
      completedSteps: [],
      soundEnabled: progress.soundEnabled
    };
    setProgress(resetData);
    persistProgress(resetData);

    try {
      localStorage.removeItem(LEGACY_UNLOCKED_KEY);
      localStorage.removeItem(LEGACY_STARS_KEY);
    } catch (e) {
      // ignore
    }

    sounds.playSuccess();
  }, [progress.soundEnabled, persistProgress]);

  const stars = useMemo(() => progress.completedSteps.length, [progress.completedSteps]);

  return {
    unlockedStep: progress.unlockedStep,
    completedSteps: progress.completedSteps,
    stars,
    isSoundOn: progress.soundEnabled,
    completeStep,
    toggleSound,
    resetProgress
  };
}
