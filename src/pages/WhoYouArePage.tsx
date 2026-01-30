import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import shreya02 from '@/assets/shreya02.jpg';
import { Star, Sparkles, MoveRight } from 'lucide-react';

const traits = [
  { id: 1, title: 'Content Creator', emoji: '🎬', secret: 'Storyteller', x: 20, y: 30 },
  { id: 2, title: 'Beautiful Soul', emoji: '💫', secret: 'Radiant', x: 80, y: 25 },
  { id: 3, title: 'Dream Chaser', emoji: '🌟', secret: 'Visionary', x: 15, y: 70 },
  { id: 4, title: 'Inspiration', emoji: '✨', secret: 'Muse', x: 85, y: 75 },
];

const WhoYouArePage = () => {
  const navigate = useNavigate();
  const [activeTrait, setActiveTrait] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Background stars generation
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950 overflow-hidden relative flex flex-col items-center justify-center py-12 px-4 selection:bg-gold/30">

      {/* 1. Animated Starry Background */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Nebulas */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Main Content Container relative for positioning */}
      <div className="relative w-full max-w-5xl aspect-square md:aspect-[16/9] flex items-center justify-center">

        {/* 2. Central Glowing Photo (The Sun/Star) */}
        <motion.div
          className="relative z-20 w-48 h-48 md:w-64 md:h-64 rounded-full p-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Rotating rings */}
          <motion.div
            className="absolute inset-0 border border-gold/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 border border-gold/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Image */}
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-gold/50 shadow-[0_0_50px_rgba(255,215,0,0.3)] relative z-10 bg-black">
            <img src={shreya02} alt="Shreya" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Central Glow */}
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl -z-10" />
        </motion.div>

        {/* 3. Orbiting Constellation Traits */}
        {traits.map((trait) => (
          <motion.div
            key={trait.id}
            className="absolute z-30 group cursor-pointer"
            style={{
              // Position logic based on percentage (responsive-ish)
              top: `${trait.y}%`,
              left: `${trait.x}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + trait.id * 0.2 }}
            onMouseEnter={() => setActiveTrait(trait.id)}
            onMouseLeave={() => setActiveTrait(null)}
          >
            {/* Connection Line (SVG) - Drawn dynamically to center (50% 50%) */}
            <svg className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none overflow-visible -z-10"
              style={{
                // Simple hack to position SVG to draw line to center
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%'
              }}
            >
              {/* This line is conceptual; real positioning needs precise calc or fixed aspect ratio. 
                     For simplicity in this 'vibe' request, I'll use a glowing connecting effect on the element itself 
                     and maybe a simple line if possible, but let's stick to simple "beam" effects first.
                 */}
            </svg>

            {/* Star Node */}
            <motion.div
              className="relative flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className={`p-4 rounded-full backdrop-blur-md border ${activeTrait === trait.id
                  ? 'bg-gold/20 border-gold shadow-[0_0_30px_rgba(255,215,0,0.5)]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                } transition-all duration-500`}>
                <span className="text-3xl filter drop-shadow-md">{trait.emoji}</span>
              </div>

              <h3 className={`mt-4 font-display text-lg tracking-wider transition-colors duration-300 ${activeTrait === trait.id ? 'text-gold' : 'text-white/60'
                }`}>
                {trait.title}
              </h3>
            </motion.div>
          </motion.div>
        ))}

        {/* SVG Connections Layer */}
        {/* We place this absolute to cover the area. Coordinates need to match logical % positions roughly. */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {traits.map((trait) => {
            const isHovered = activeTrait === trait.id;
            return (
              <line
                key={`line-${trait.id}`}
                x1={`${trait.x}%`}
                y1={`${trait.y}%`}
                x2="50%"
                y2="50%"
                stroke="url(#gradient-line)"
                strokeWidth={isHovered ? "2" : "0.5"}
                className={`transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-20'}`}
              />
            );
          })}
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#FFD700" /> {/* Gold */}
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

      </div>

      {/* Title / Instruction */}
      <motion.div
        className="absolute bottom-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-white/30 font-display tracking-[0.2em] text-sm uppercase mb-6">
          Explore the constellation
        </p>

        <motion.button
          onClick={() => navigate('/memories')}
          className="group relative inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-white/20 rounded-full overflow-hidden hover:border-gold/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 text-white/80 group-hover:text-gold font-display text-lg transition-colors">
            Continue Journey
          </span>
          <MoveRight className="w-4 h-4 text-white/50 group-hover:text-gold group-hover:translate-x-1 transition-all" />

          {/* Button hover glow */}
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </motion.div>

    </div>
  );
};

export default WhoYouArePage;
