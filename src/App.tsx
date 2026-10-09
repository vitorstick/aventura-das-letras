import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MascotDino from './components/MascotDino';
import WelcomeScreen from './components/WelcomeScreen';
import AdventureMap from './components/AdventureMap';
import CelebrationScreen from './components/CelebrationScreen';
import ExplorerGame from './components/minigames/ExplorerGame';
import BubbleGame from './components/minigames/BubbleGame';
import WordHuntGame from './components/minigames/WordHuntGame';
import QuizGame from './components/minigames/QuizGame';

import { GAME_DATA } from './data/gameData';
import { sounds } from './utils/soundEngine';
import { fireConfetti } from './utils/confetti';
import { ScreenType, DinoExpression, LetterKey } from './types/game';
import { useProgress } from './hooks/useProgress';

export default function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [dinoSpeech, setDinoSpeech] = useState<string>("Olá! Vamos aprender as letras? Carrega em Começar! 🦕");
  const [dinoExpression, setDinoExpression] = useState<DinoExpression>('idle');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const {
    unlockedStep,
    completedSteps,
    stars,
    isSoundOn,
    completeStep,
    toggleSound,
    resetProgress
  } = useProgress(GAME_DATA.steps.length);

  // Sincroniza a expressão da boca do Dino quando o áudio/fala estiver a tocar
  useEffect(() => {
    return sounds.onSpeakingChange((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  const activeDinoExpression: DinoExpression = dinoExpression === 'cheer'
    ? 'cheer'
    : (isSpeaking ? 'talk' : 'idle');

  // Desbloquear áudio no início
  const handleStart = () => {
    sounds.unlockAudio();
    sounds.playSuccess();
    fireConfetti();
    setCurrentScreen('map');
    const startSpeech = "Segue as pegadas do Dino no mapa para começar a aventura! 🐾";
    setDinoSpeech(startSpeech);
    sounds.speak(startSpeech);
  };

  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index);
    const step = GAME_DATA.steps[index];
    if (!step) return;

    if (step.dinoSpeech) {
      setDinoSpeech(step.dinoSpeech);
      sounds.speak(step.dinoSpeech);
    }

    if (step.type === 'celebration') {
      setCurrentScreen('celebration');
    } else {
      setCurrentScreen(step.type);
    }
  };

  const handleDirectSelectStep = (index: number) => {
    sounds.unlockAudio();
    sounds.playPop();
    handleSelectStep(index);
  };

  const handleStepComplete = () => {
    completeStep(activeStepIndex);

    setDinoExpression('cheer');
    setTimeout(() => {
      setDinoExpression('idle');
      const isLastStep = activeStepIndex >= GAME_DATA.steps.length - 2;
      if (isLastStep) {
        // Se concluiu o Quiz final, avança para a celebração
        setCurrentScreen('celebration');
      } else {
        setCurrentScreen('map');
      }
    }, 1500);
  };

  const handleGoToMap = () => {
    sounds.playPop();
    setCurrentScreen('map');
    const step = GAME_DATA.steps[unlockedStep];
    if (step) {
      setDinoSpeech(`Etapa: ${step.title}! ${step.subtitle}`);
    }
  };

  const handleGoToWelcome = () => {
    sounds.playPop();
    setCurrentScreen('welcome');
    const welcomeSpeech = "Olá! Vamos aprender as letras? Carrega em Começar ou escolhe uma letra! 🦕";
    setDinoSpeech(welcomeSpeech);
    sounds.speak(welcomeSpeech);
  };

  const currentStepData = GAME_DATA.steps[activeStepIndex];
  const currentLetter = (currentStepData?.letter && currentStepData.letter !== 'ALL')
    ? (currentStepData.letter as LetterKey)
    : 'I';

  const totalPlayableSteps = GAME_DATA.steps.filter(s => s.type !== 'celebration').length;

  return (
    <div className="w-full h-full h-[100dvh] max-w-lg mx-auto flex flex-col overflow-hidden relative">
      {/* Barra de Topo */}
      <Header
        currentScreen={currentScreen}
        stars={stars}
        onGoToMap={handleGoToMap}
        onGoToWelcome={handleGoToWelcome}
        isSoundOn={isSoundOn}
        onToggleSound={toggleSound}
      />

      {/* Mascote Dino no Centro Superior */}
      {currentScreen !== 'welcome' && (
        <MascotDino
          compact={currentScreen === 'map' || currentScreen === 'wordHunt'}
          expression={activeDinoExpression}
          speechText={dinoSpeech}
          onDinoTap={() => {
            const tapSpeech = "Estou muito contente por brincar contigo! 🦕✨";
            setDinoSpeech(tapSpeech);
            sounds.speak("Estou muito contente por brincar contigo!");
          }}
        />
      )}

      {/* Área Central dos Ecrãs */}
      <main className={`flex-1 min-h-0 w-full flex flex-col items-center overflow-hidden relative ${
        currentScreen === 'map' ? 'justify-start' : 'justify-center'
      }`}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStart={handleStart}
            onSelectStep={handleDirectSelectStep}
            completedSteps={completedSteps}
          />
        )}

        {currentScreen === 'map' && (
          <AdventureMap
            unlockedStep={unlockedStep}
            completedSteps={completedSteps}
            onSelectStep={handleSelectStep}
            onResetProgress={resetProgress}
            onSetSpeech={setDinoSpeech}
            onGoToWelcome={handleGoToWelcome}
          />
        )}

        {currentScreen === 'explorer' && currentStepData && (
          <ExplorerGame
            letter={currentLetter}
            onComplete={handleStepComplete}
            onSetSpeech={setDinoSpeech}
          />
        )}

        {currentScreen === 'bubble' && currentStepData && (
          <BubbleGame
            letter={currentLetter}
            targetCount={currentStepData.targetCount || 5}
            onComplete={handleStepComplete}
            onSetSpeech={setDinoSpeech}
          />
        )}

        {currentScreen === 'wordHunt' && currentStepData && (
          <WordHuntGame
            letter={currentLetter}
            onComplete={handleStepComplete}
            onSetSpeech={setDinoSpeech}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizGame
            onComplete={handleStepComplete}
            onSetSpeech={setDinoSpeech}
          />
        )}

        {currentScreen === 'celebration' && (
          <CelebrationScreen
            stars={stars}
            maxStars={totalPlayableSteps}
            onPlayAgain={() => {
              setCurrentScreen('map');
            }}
          />
        )}
      </main>
    </div>
  );
}

