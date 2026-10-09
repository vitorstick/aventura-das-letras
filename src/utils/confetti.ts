import confetti from 'canvas-confetti';

export function fireConfetti(): void {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#FF70A6', '#4CAF50']
  });
}

export function fireStars(x: number = 0.5, y: number = 0.5): void {
  confetti({
    particleCount: 25,
    spread: 60,
    origin: { x, y },
    shapes: ['star'],
    colors: ['#FFE082', '#FFD54F', '#FFCA28', '#FFC107']
  });
}

export function fireGrandCelebration(): void {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults: confetti.Options = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}
