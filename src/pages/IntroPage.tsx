import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useConfetti } from '@/hooks/useConfetti';

const IntroPage = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const navigate = useNavigate();
  const { fireBalloons, fireConfetti, fireSparkles } = useConfetti();

  const handleClick = () => {
    setIsExploding(true);

    // Fire multiple confetti effects
    fireBalloons();
    setTimeout(() => fireConfetti(), 500);
    setTimeout(() => fireSparkles(), 1000);
    setTimeout(() => fireConfetti(), 1500);

    // Navigate after animation
    setTimeout(() => {
      setShowContent(false);
      setTimeout(() => navigate('/welcome'), 500);
    }, 2500);
  };

  // Floating balloons in background
  const balloons = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
    size: 30 + Math.random() * 40,
    color: ['#E8B4D8', '#B8A9C9', '#FFDAB9', '#D4AF37', '#FFD700', '#F5E6D3'][Math.floor(Math.random() * 6)],
  }));

  return (
    <div className="min-h-[100dvh] intro-bg overflow-hidden relative flex items-center justify-center p-4">
      {/* Floating ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Background balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute"
          style={{
            left: `${balloon.x}%`,
            bottom: -100,
          }}
          animate={isExploding ? {
            y: [0, -window.innerHeight * 1.5],
            scale: [1, 0.5, 0],
            opacity: [1, 1, 0],
          } : {
            y: [0, -window.innerHeight - 200],
          }}
          transition={isExploding ? {
            duration: 1.5,
            ease: "easeOut",
          } : {
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Balloon */}
          <div
            className="rounded-full relative"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
              background: `radial-gradient(circle at 30% 30%, ${balloon.color} 0%, ${balloon.color}90 100%)`,
              boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.2)`,
            }}
          >
            {/* Highlight */}
            <div
              className="absolute w-1/4 h-1/4 rounded-full bg-white/40"
              style={{ top: '20%', left: '20%' }}
            />
            {/* String */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
              style={{ top: '100%', height: 30 }}
            />
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center w-full max-w-lg mx-auto"
          >
            {/* Magical glow behind button */}
            <motion.div
              className="absolute inset-0 -m-8 md:-m-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            {/* Title */}
            <motion.h1
              className="text-2xl md:text-4xl font-display text-white/80 mb-6 md:mb-8 bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Something special awaits...
            </motion.h1>

            {/* Main button */}
            <motion.button
              onClick={handleClick}
              disabled={isExploding}
              className="relative group w-full md:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {/* Button glow */}
              <motion.div
                className="absolute inset-0 -m-2 md:-m-4 rounded-full blur-xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(40 80% 55%) 0%, hsl(340 60% 85%) 50%, hsl(270 50% 85%) 100%)',
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Button content */}
              <div className="relative glass-card px-8 py-4 md:px-12 md:py-6 rounded-full border-2 border-primary/50 overflow-hidden">
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                  animate={{
                    translateX: ['100%', '-100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />

                <span className="relative z-10 text-xl md:text-3xl font-display gold-text whitespace-nowrap">
                  CLICK HERE 🎈
                </span>
              </div>
            </motion.button>

            {/* Subtitle */}
            <motion.p
              className="mt-6 md:mt-8 text-white/50 text-base md:text-lg font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Your magical journey begins here
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stars in background */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-primary/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: 8 + Math.random() * 8,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

export default IntroPage;
