import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingParticles from '@/components/FloatingParticles';
import InteractiveCard from '@/components/InteractiveCard';
import { useConfetti } from '@/hooks/useConfetti';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { fireConfetti } = useConfetti();

  const handleButtonClick = () => {
    fireConfetti();
    setTimeout(() => navigate('/memories'), 1000);
  };

  return (
    <div className="min-h-screen dreamy-bg overflow-hidden relative flex items-center justify-center py-12 px-4">
      <FloatingParticles count={40} />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blush/30 to-transparent"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-lavender/30 to-transparent"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        {/* Interactive 3D Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <InteractiveCard onOpen={fireConfetti} />
        </motion.div>

        {/* Title removed as per user request */}

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground font-body mb-10"
        >
          A little world made just for you.
        </motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onClick={handleButtonClick}
          className="glow-button relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative glass-card px-10 py-5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10 text-xl md:text-2xl font-display text-foreground">
              Enter Your Surprise 🎁
            </span>
          </div>
        </motion.button>

        {/* Floating sparkle elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
