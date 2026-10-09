import React, { useState } from 'react';
import Header from './components/Header';
import MascotDino from './components/MascotDino';
import WelcomeScreen from './components/WelcomeScreen';
import AdventureMap from './components/AdventureMap';
import CelebrationScreen from './components/CelebrationScreen';
import ExplorerGame from './components/minigames/ExplorerGame';
import BubbleGame from './components/minigames/BubbleGame';
import TraceGame from './components/minigames/TraceGame';
import WordHuntGame from './components/minigames/WordHuntGame';
import QuizGame from './components/minigames/QuizGame';

import { GAME_DATA } from './data/gameData';
import { sounds } from './utils/soundEngine';
import { fireConfetti } from './utils/confetti';
import { StepType, DinoExpression, LetterKey } from './types/game';

export default function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<StepType>('welcome');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [unlockedStep, setUnlockedStep] = useState<number>(() => {
    return parseInt(localStorage.getItem('dino_unlocked_step') || '0', 10);
  });
  const [stars, setStars] = useState<number>(() => {
    return parseInt(localStorage.getItem('dino_stars') || '0', 10);
  });
  const [dinoSpeech, setDinoSpeech] = useState<string>("Olá! Vamos aprender as letras? Carrega em Começar! 🦕");
  const [dinoExpression, setDinoExpression] = useState<DinoExpression>('idle');
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  // Desbloquear áudio no início
  const handleStart = () => {
    sounds.unlockAudio();
    sounds.playSuccess();
    fireConfetti();
    setCurrentScreen('map');
    setDinoSpeech("Segue as pegadas do Dino no mapa para começar! 🐾");
    sounds.speak("Segue as pegadas do Dino no mapa para começar a aventura!");
  };

  const handleSelectStep = (index: number) => {
    setActiveStepIndex(index);
    const step = GAME_DATA.steps[index];

    if (step.type === 'celebration') {
      setCurrentScreen('celebration');
    } else {
      setCurrentScreen(step.type);
    }
  };

  const handleStepComplete = () => {
    const newStars = stars + 1;
    setStars(newStars);
    localStorage.setItem('dino_stars', newStars.toString());

    if (activeStepIndex === unlockedStep) {
      const nextUnlocked = Math.min(activeStepIndex + 1, GAME_DATA.steps.length - 1);
      setUnlockedStep(nextUnlocked);
      localStorage.setItem('dino_unlocked_step', nextUnlocked.toString());
    }

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

  const handleResetProgress = () => {
    if (window.confirm("Queres recomeçar a aventura desde o início?")) {
      setUnlockedStep(0);
      setStars(0);
      localStorage.removeItem('dino_unlocked_step');
      localStorage.removeItem('dino_stars');
      sounds.playSuccess();
    }
  };

  const handleToggleSound = () => {
    const nextState = sounds.toggleSound();
    setIsSoundOn(nextState);
  };

  const currentStepData = GAME_DATA.steps[activeStepIndex];
  const currentLetter = (currentStepData?.letter && currentStepData.letter !== 'ALL')
    ? (currentStepData.letter as LetterKey)
    : 'I';

  return (
    <div className="w-full h-full h-[100dvh] max-w-lg mx-auto flex flex-col overflow-hidden relative">
      {/* Barra de Topo */}
      <Header
        currentScreen={currentScreen}
        stars={stars}
        onGoToMap={handleGoToMap}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
      />

      {/* Mascote Dino no Centro Superior */}
      {currentScreen !== 'welcome' && (
        <MascotDino
          compact={currentScreen === 'map'}
          expression={dinoExpression}
          speechText={dinoSpeech}
          onDinoTap={() => {
            setDinoSpeech("Estou muito contente por brincar contigo! 🦕✨");
            sounds.speak("Estou muito contente por brincar contigo!");
          }}
        />
      )}

      {/* Área Central dos Ecrãs */}
      <main className={`flex-1 min-h-0 w-full flex flex-col items-center overflow-hidden relative ${
        currentScreen === 'map' ? 'justify-start' : 'justify-center'
      }`}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen onStart={handleStart} />
        )}

        {currentScreen === 'map' && (
          <AdventureMap
            unlockedStep={unlockedStep}
            onSelectStep={handleSelectStep}
            onResetProgress={handleResetProgress}
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

        {currentScreen === 'trace' && currentStepData && (
          <TraceGame
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
            onPlayAgain={() => {
              setCurrentScreen('map');
            }}
          />
        )}
      </main>
    </div>
  );
}
