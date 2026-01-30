import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from '@/components/FloatingParticles';
import { useConfetti } from '@/hooks/useConfetti';
import BirthdayCake from '@/components/BirthdayCake';
import GiftBox from '@/components/GiftBox';

// Define flow states
type FinaleState = 'wishing' | 'gift' | 'reveal';

const FinalePage = () => {
  const [stage, setStage] = useState<FinaleState>('wishing');
  const { fireFireworks, fireConfetti } = useConfetti();

  const handleCandlesBlown = () => {
    // Wait a moment after blowing candles, then show gift
    setTimeout(() => {
      setStage('gift');
      fireConfetti();
    }, 1500);
  };

  const handleOpenGift = () => {
    setStage('reveal');
    fireFireworks();
    // Re-fire confetti for extra celebration
    setTimeout(() => fireConfetti(), 500);
  };

  return (
    <div className="min-h-screen overflow-hidden relative py-12 px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#1a1c2e] to-black">
      <FloatingParticles count={40} colors={['#FFD700', '#FF69B4', '#87CEEB', '#ffffff']} />

      {/* Screen glow effect - darker for night mode */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,215,0,0.05) 0%, transparent 70%)',
        }}
        animate={{
          opacity: stage === 'reveal' ? [0.2, 0.4, 0.2] : 0.1,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display gold-text mb-4 drop-shadow-lg">
            {stage === 'wishing' && "Make a Wish & Blow the Candles 🎂"}
            {stage === 'gift' && "A Surprise for You! 🎁"}
            {stage === 'reveal' && "Happy Birthday Shreya! 🎉"}
          </h1>
          {stage === 'wishing' && (
            <p className="text-blue-200/60 mt-4 animate-pulse">
              Click on each candle flame to blow it out...
            </p>
          )}
        </motion.div>

        {/* Dynamic Content Area */}
        <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* Stage 1: Birthday Cake */}
            {stage === 'wishing' && (
              <motion.div
                key="cake"
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.8 }}
              >
                <BirthdayCake onAllCandlesBlown={handleCandlesBlown} />
              </motion.div>
            )}

            {/* Stage 2: Gift Box */}
            {stage === 'gift' && (
              <motion.div
                key="gift"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                transition={{ type: "spring", duration: 1 }}
              >
                <GiftBox onClick={handleOpenGift} />
              </motion.div>
            )}

            {/* Stage 3: Final Message */}
            {stage === 'reveal' && (
              <motion.div
                key="message"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.8,
                      delayChildren: 0.5
                    }
                  }
                }}
                className="relative w-full max-w-4xl text-center z-20"
              >
                {/* Ambient Glow behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
                  }}
                  className="mb-12 relative"
                >
                  <motion.h2
                    className="text-4xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(253,224,71,0.3)",
                        "0 0 40px rgba(253,224,71,0.5)",
                        "0 0 20px rgba(253,224,71,0.3)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    "Your journey has just begun,<br />Superstar ✨"
                  </motion.h2>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 1.5 } }
                  }}
                  className="space-y-12 relative"
                >
                  <motion.p
                    className="text-2xl md:text-3xl text-blue-100 font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    May your 25th year be filled with as much magic,<br />love, and brilliance as you bring into the world.
                  </motion.p>

                  <motion.div
                    className="space-y-4"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <p className="text-xl md:text-2xl text-purple-200/90 font-serif italic tracking-wide">
                      "Here's to the dreams that keep you awake,<br /> and the beautiful reality that makes them worth chasing."
                    </p>
                  </motion.div>

                  <motion.div
                    className="space-y-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <p className="text-xl md:text-2xl text-pink-200/90 font-serif italic tracking-wide">
                      You are a universe of potential, waiting to unfold.<br /> Shine brighter, laugh louder, and love deeper.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 4, type: "spring", stiffness: 200 }}
                    className="pt-8"
                  >
                    <span className="text-6xl filter drop-shadow-[0_0_20px_rgba(255,105,180,0.6)]">💖</span>
                  </motion.div>
                </motion.div>

                {/* Floating Elements around message - Enhanced */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-3xl opacity-60"
                    style={{
                      top: `${Math.random() * 120 - 10}%`,
                      left: `${Math.random() * 120 - 10}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1.2, 0.5],
                      rotate: [0, 45, -45, 0]
                    }}
                    transition={{
                      duration: 5 + Math.random() * 5,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {['✨', '🎈', '🦋', '🌟', '💫', '🎵'][i % 6]}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 w-full text-center pointer-events-none"
        >
          <p className="text-sm text-blue-200/30 font-body tracking-widest uppercase">
            Designed for Shreya's 25th
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalePage;
