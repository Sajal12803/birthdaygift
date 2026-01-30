import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import shreya16 from '@/assets/shreya16.jpg';
import FloatingParticles from '@/components/FloatingParticles';
import GlassFrame from '@/components/GlassFrame';
import { useConfetti } from '@/hooks/useConfetti';

const wishes = [
  "May all your dreams come true ✨",
  "Endless love and happiness 💕",
  "Success in everything you do 🌟",
  "Adventures that take your breath away 🌍",
  "Friends who cherish you always 👯‍♀️",
  "Laughter that never ends 😄",
  "Peace in your heart and mind 🕊️",
  "Creativity that knows no bounds 🎨",
  "Health and wellness always 💪",
  "Love that grows stronger each day ❤️",
  "Moments that become treasured memories 📸",
  "Courage to chase your wildest dreams 🦁",
  "Kindness returned tenfold 🤗",
  "Magic in ordinary moments ✨",
  "Wisdom to guide your path 🦉",
  "Joy in the little things 🌸",
  "Opportunities that exceed expectations 🚀",
  "Confidence that lights up rooms 💫",
  "Balance in all aspects of life ⚖️",
  "Inspiration that flows freely 💡",
  "Connections that last a lifetime 🤝",
  "Growth that amazes even you 🌱",
  "Beauty inside and out 🌺",
  "A heart full of gratitude 🙏",
  "The best year of your life yet! 🎂",
];

const balloonColors = [
  '#E8B4D8', '#B8A9C9', '#FFDAB9', '#D4AF37', '#FFD700',
  '#F5E6D3', '#FFB6C1', '#98D8C8', '#DDA0DD', '#87CEEB'
];

const WishesPage = () => {
  const navigate = useNavigate();
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [activeWish, setActiveWish] = useState<string | null>(null);
  const { fireSparkles } = useConfetti();

  const handleBalloonClick = (index: number) => {
    if (poppedBalloons.includes(index)) return;

    fireSparkles();
    setPoppedBalloons([...poppedBalloons, index]);
    setActiveWish(wishes[index]);

    setTimeout(() => setActiveWish(null), 3000);
  };

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;

  // Create balloon positions in a grid-like pattern
  const getBalloonPosition = (index: number) => {
    // Responsive grid configuration
    const cols = isMobile ? 3 : isTablet ? 4 : 5;
    const rows = Math.ceil(25 / cols);

    // Dynamic spacing to fit within 100% height without overflow
    // Mobile needs much tighter vertical spacing or taller container
    // Centering Logic (Mobile): xBase ≈ (100 - Offset - TotalWidth) / 2

    const xStep = isMobile ? 25 : 18;
    const xOffsetValue = isMobile ? 12.5 : 10;

    const xBase = isMobile ? 19 : 10;

    // Adjust vertical spacing based on row count to strictly fit in view
    const yAvailable = 85;
    const yBase = isMobile ? 5 : 10;
    const yStep = isMobile ? (yAvailable / rows) : 16;

    // Calculate row/col
    const row = Math.floor(index / cols);
    const col = index % cols;

    // Stagger every other row
    const xOffset = row % 2 === 0 ? 0 : xOffsetValue;

    return {
      x: xBase + col * xStep + xOffset + (Math.random() * 3 - 1.5),
      y: yBase + row * yStep + (Math.random() * 3 - 1.5),
    };
  };

  return (
    <div className="min-h-screen dreamy-bg request-scroll py-8 px-4">
      <FloatingParticles count={25} />

      {/* Sparkle trails */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -50],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl md:text-6xl font-display gold-text mb-2">
            25 Wishes For You 🎈
          </h1>
          <p className="text-lg text-muted-foreground font-body">
            Pop each balloon to reveal a special wish!
          </p>
          <p className="text-sm text-primary mt-2">
            {25 - poppedBalloons.length} wishes remaining
          </p>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/3 flex-shrink-0"
          >
            <div className="relative mx-auto max-w-sm transform hover:rotate-2 transition-transform duration-500">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl blur-lg opacity-70" />
              <GlassFrame className="relative backdrop-blur-xl border border-white/60 shadow-2xl">
                <img
                  src={shreya16}
                  alt="Shreya"
                  className="w-full h-auto object-cover rounded-xl shadow-inner max-h-[60vh]"
                />
              </GlassFrame>
            </div>
          </motion.div>

          {/* Balloons grid */}
          <div className={`lg:w-2/3 relative w-full ${isMobile ? 'h-[70vh] min-h-[550px]' : 'h-[50vh] min-h-[400px]'}`}>
            {wishes.map((_, index) => {
              const pos = getBalloonPosition(index);
              const isPopped = poppedBalloons.includes(index);
              const color = balloonColors[index % balloonColors.length];

              return (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isPopped ? 0 : 1,
                    opacity: isPopped ? 0 : 1,
                    y: isPopped ? -100 : [0, -10, 0],
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    y: { duration: 2 + Math.random(), repeat: Infinity },
                    delay: index * 0.05,
                  }}
                  onClick={() => handleBalloonClick(index)}
                  whileHover={{ scale: 1.15 }}
                >
                  {/* Balloon */}
                  <div
                    className="relative"
                    style={{
                      width: 45,
                      height: 55,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${color} 0%, ${color}90 100%)`,
                        boxShadow: `inset -3px -3px 10px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.15)`,
                      }}
                    >
                      {/* Highlight */}
                      <div
                        className="absolute w-1/4 h-1/4 rounded-full bg-white/50"
                        style={{ top: '15%', left: '15%' }}
                      />
                    </div>
                    {/* Knot */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-2 h-2"
                      style={{
                        bottom: -4,
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderTop: `6px solid ${color}`,
                      }}
                    />
                    {/* String */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-px bg-gray-400"
                      style={{ top: '100%', height: 20 }}
                    />
                    {/* Number */}
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Active wish display */}
        <AnimatePresence>
          {activeWish && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="glass-card px-8 py-6 rounded-2xl text-center max-w-md">
                <p className="text-xl font-display text-foreground">
                  {activeWish}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <motion.button
            onClick={() => navigate('/from-me')}
            className="glow-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="glass-card px-10 py-5 rounded-full">
              <span className="text-xl font-display text-foreground">
                A Message From Me 💌
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default WishesPage;
