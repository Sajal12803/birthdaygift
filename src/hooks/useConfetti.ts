import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#D4AF37', '#FFD700', '#F5E6D3'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#E8B4D8', '#B8A9C9', '#FFDAB9'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#D4AF37', '#E8B4D8', '#B8A9C9'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#FFD700', '#FFDAB9', '#F5E6D3'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#D4AF37', '#E8B4D8', '#FFD700'],
    });
  };

  const fireBalloons = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#D4AF37', '#E8B4D8', '#B8A9C9', '#FFDAB9', '#FFD700', '#F5E6D3'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 60,
        origin: { x: Math.random(), y: 1 },
        colors: colors,
        shapes: ['circle'],
        gravity: -0.5,
        drift: (Math.random() - 0.5) * 2,
        scalar: 2,
        ticks: 300,
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const fireFireworks = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const colors = ['#D4AF37', '#FFD700', '#E8B4D8', '#B8A9C9', '#FFDAB9'];

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors,
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors,
      });
    }, 250);
  };

  const fireSparkles = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFD700', '#FFFFFF'],
      shapes: ['star'],
      scalar: 1.2,
      zIndex: 9999,
    });
  };

  return { fireConfetti, fireBalloons, fireFireworks, fireSparkles };
};
