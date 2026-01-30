import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import shreya17 from '@/assets/shreya17.jpg';
import FloatingParticles from '@/components/FloatingParticles';
import GlassFrame from '@/components/GlassFrame';

const message = `Shreya, this isn't just a website.

It's a small piece of my heart telling you how special you are.

You've grown so much this past year. You've inspired, created, and touched so many hearts along the way.

Every piece of content you create, every smile you share, makes this world a little brighter.

I'm so proud of you.

Happy Birthday 🤗 💫`;

const FromMePage = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Floating hearts
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 5,
    size: 15 + Math.random() * 15,
  }));

  return (
    <div className="min-h-screen dreamy-bg overflow-hidden relative py-12 px-4">
      <FloatingParticles count={20} colors={['#E8B4D8', '#FFB6C1', '#FF69B4', '#FFC0CB']} />

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose pointer-events-none"
          style={{
            left: `${heart.x}%`,
            bottom: -50,
            fontSize: heart.size,
          }}
          animate={{
            y: -window.innerHeight - 100,
            x: [0, 30, -20, 10, 0],
            rotate: [0, 20, -20, 10, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Candle glow effect */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,200,100,0.2) 0%, transparent 70%)',
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
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,180,80,0.15) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-display gold-text">
            From Me to You 💌
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 flex-shrink-0"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl transform translate-x-4 translate-y-4" />
              <GlassFrame className="relative float border-2 border-white/50 shadow-2xl p-3">
                <div className="rounded-xl overflow-hidden shadow-inner">
                  <img
                    src={shreya17}
                    alt="Shreya"
                    className="w-full h-auto object-cover rounded-lg max-h-[70vh]"
                  />
                </div>
              </GlassFrame>
            </div>
          </motion.div>

          {/* Message with typewriter effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="glass-card p-8 rounded-2xl relative">
              {/* Decorative candle */}
              <div className="absolute -top-8 right-8">
                <div className="relative">
                  <div className="w-4 h-12 bg-gradient-to-b from-cream to-white rounded-sm" />
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 candle-flicker"
                    animate={{
                      scale: [1, 1.2, 0.9, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                    }}
                  >
                    <div className="w-3 h-6 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 blur-[1px]" />
                  </motion.div>
                </div>
              </div>

              <div className="font-body text-lg leading-relaxed whitespace-pre-line text-foreground">
                {displayedText}
                {!isTypingComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-primary"
                  >
                    |
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 30 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => navigate('/finale')}
            className="glow-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="glass-card px-10 py-5 rounded-full">
              <span className="text-xl font-display text-foreground">
                One Last Surprise 🎂
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FromMePage;
