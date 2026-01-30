import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, X, Music } from 'lucide-react';

// Images
import shreya03 from '@/assets/shreya03.jpg';
import shreya04 from '@/assets/shreya04.jpg';
import shreya05 from '@/assets/shreya05.jpg';
import shreya07 from '@/assets/shreya07.jpg';
import shreya11 from '@/assets/shreya11.jpg';
import shreya12 from '@/assets/shreya12.jpg';
// shreya13 removed
import shreya14 from '@/assets/shreya14.jpg';
import shreya15 from '@/assets/shreya15.jpg';
import shreya02 from '@/assets/shreya02.jpg';
import shreya08 from '@/assets/shreya08.jpg';

// Audio
import song0 from '@/assets/Hosanna-Hindi-Song-1.mp3';
import song1 from '@/assets/falak_tak_chal.mp3';
import song2 from '@/assets/Khudaya Khair-(SambalpuriStar.In).mp3';
import song3 from '@/assets/Tumko-Paya-Hai-Mai-Agar-Kahoon-Om-Shanti-Om-Hindi-1.mp3';
import song4 from '@/assets/Main Tenu Samjhawan Ki.mp3';
import song5 from '@/assets/Sadiyan-Downringtone.com.mp3';
import song6 from '@/assets/Voh Dekhnay Mein - Lyrical Song  Ali Zafar, Aditi Rao Hydari  Evergreen Romantic Song.mp3';
import song7 from '@/assets/O Bekhabar [Full Song] Action Replayy.mp3';
import song8 from '@/assets/Bol Na Halke Halke(KoshalWorld.Com).mp3';
import song9 from '@/assets/ARSHI.Lata_Mangeshkar.315_seriya_-_Aaja_Piya_Tohe_Pyar_Doon_142_(mp3.pm).mp3';

import FloatingParticles from '@/components/FloatingParticles';

const messages = [
  "You make ordinary days beautiful.",
  "Your smile is someone's favorite place.",
  "Never forget how special you are.",
  "Every moment with you is magical.",
  "You light up every room you enter.",
];

// Re-distributed flowers for better desktop layout (10 flowers now)
// Uniform size 58 as requested
const flowers = [
  { x: 15, y: 20, color: '#E8B4D8', size: 58, image: 0 },
  { x: 35, y: 15, color: '#FFDAB9', size: 58, image: 1 },
  { x: 65, y: 25, color: '#E0FFFF', size: 58, image: 2 },
  { x: 85, y: 20, color: '#FFB6C1', size: 58, image: 3 },

  { x: 25, y: 50, color: '#F5E6D3', size: 58, image: 4 },
  { x: 75, y: 55, color: '#FFD700', size: 58, image: 5 },

  { x: 15, y: 80, color: '#E6E6FA', size: 58, image: 6 },
  { x: 45, y: 85, color: '#98FB98', size: 58, image: 7 },
  { x: 65, y: 75, color: '#FFE4E1', size: 58, image: 8 },
  { x: 85, y: 85, color: '#FFC0CB', size: 58, image: 9 },
];

const MemoryGardenPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeFlower, setActiveFlower] = useState<number | null>(null);
  const [activeLeaf, setActiveLeaf] = useState<number | null>(null);

  // Music Player State
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const images = [shreya03, shreya04, shreya05, shreya07, shreya11, shreya12, shreya14, shreya15, shreya02, shreya08];
  const songs = [song0, song1, song2, song3, song4, song5, song6, song7, song8, song9];

  // Handle Audio
  useEffect(() => {
    if (selectedMemory !== null && audioRef.current) {
      audioRef.current.src = songs[selectedMemory];
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Autoplay blocked", e));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedMemory]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const rewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Butterflies
  const butterflies = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    startX: Math.random() * 80 + 10,
    startY: Math.random() * 60 + 20,
  }));

  // Leaves with messages
  const leaves = messages.map((msg, i) => ({
    id: i,
    x: 10 + (i * 20),
    y: 85 + (i % 2) * 5,
    message: msg,
  }));

  // Update flowers with mobile coordinates - spread evenly
  const responsiveFlowers = flowers.map((flower, i) => ({
    ...flower,
    size: isMobile ? flower.size * 0.75 : flower.size,
    mobileX: (i % 2 === 0) ? 25 : 65,
    mobileY: 5 + (i * (90 / flowers.length))
  }));

  // Update leaves with mobile coordinates - intersperse with flowers
  const responsiveLeaves = leaves.map((leaf, i) => ({
    ...leaf,
    mobileX: 50 + (i % 2 === 0 ? -20 : 15),
    mobileY: 12 + (i * (85 / leaves.length))
  }));

  return (
    <div className="min-h-screen dreamy-bg overflow-hidden relative py-12 px-4">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />

      {/* Petal rain */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="w-4 h-6 rounded-full opacity-60"
            style={{
              background: ['#E8B4D8', '#FFDAB9', '#FFB6C1', '#FFC0CB'][Math.floor(Math.random() * 4)],
              transform: 'rotate(45deg)',
            }}
          />
        </motion.div>
      ))}

      {/* Butterflies */}
      {butterflies.map((butterfly) => (
        <motion.div
          key={butterfly.id}
          className="absolute text-3xl butterfly-fly pointer-events-none z-20"
          style={{
            left: `${butterfly.startX}%`,
            top: `${butterfly.startY}%`,
          }}
          animate={{
            x: [0, 100, 50, 150, 0],
            y: [0, -50, 20, -30, 0],
          }}
          transition={{
            duration: 20,
            delay: butterfly.id * 2,
            repeat: Infinity,
          }}
        >
          🦋
        </motion.div>
      ))}

      <FloatingParticles
        count={20}
        colors={['#90EE90', '#98FB98', '#8FBC8F', '#FFDAB9', '#E8B4D8']}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-display gold-text mb-4">
            Magical Garden 🌸
          </h1>
          <p className="text-xl text-muted-foreground font-body">
            Hover over the flowers and click the leaves
          </p>
        </motion.div>

        {/* Garden scene */}
        <div className={`relative ${isMobile ? 'h-[170vh]' : 'h-[120vh]'} min-h-[600px]`}>
          {/* Fireflies */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`firefly-${i}`}
              className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full blur-[1px] z-20 pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: "0 0 10px 2px rgba(255, 215, 0, 0.4)"
              }}
              animate={{
                x: [0, Math.random() * 60 - 30, 0],
                y: [0, Math.random() * 60 - 30, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}

          {/* Flowers with photos */}
          {responsiveFlowers.map((flower, index) => (
            <motion.div
              key={index}
              className="absolute cursor-pointer"
              style={{
                left: `${isMobile ? flower.mobileX : flower.x}%`,
                top: `${isMobile ? flower.mobileY : flower.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: activeFlower === index ? 50 : 30
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -8, 0]
              }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                y: {
                  duration: 3 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }
              }}
              onMouseEnter={() => setActiveFlower(index)}
              onMouseLeave={() => setActiveFlower(null)}
              onClick={() => setActiveFlower(activeFlower === index ? null : index)}
            >
              {/* Invisible bridge to connect flower to popup (prevents closing when moving mouse) */}
              {activeFlower === index && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 w-32 h-20 bg-transparent z-40"
                  style={{ bottom: '50%' }}
                />
              )}

              {/* Flower SVG */}
              <motion.div
                className="relative drop-shadow-md"
                animate={{ rotate: activeFlower === index ? 360 : 0 }}
                transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
              >
                {index % 4 === 0 && (
                  <svg width={flower.size * 2} height={flower.size * 2} viewBox="0 0 100 100" className="overflow-visible">
                    <defs>
                      <radialGradient id={`sun-center-${index}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#5D4037" />
                        <stop offset="100%" stopColor="#271c19" />
                      </radialGradient>
                      <linearGradient id={`sun-petal-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#FF8F00" />
                      </linearGradient>
                    </defs>
                    {[...Array(12)].map((_, i) => (
                      <ellipse key={i} cx="50" cy="50" rx="6" ry="30" fill={`url(#sun-petal-${index})`} transform={`rotate(${i * 30} 50 50)`} />
                    ))}
                    <circle cx="50" cy="50" r="14" fill={`url(#sun-center-${index})`} stroke="#271c19" strokeWidth="1" />
                    <g className="opacity-40">{[...Array(20)].map((_, i) => {
                      const angle = i * 137.5;
                      const r = 2 + Math.sqrt(i) * 2;
                      const x = 50 + r * Math.cos(angle * Math.PI / 180);
                      const y = 50 + r * Math.sin(angle * Math.PI / 180);
                      return <circle key={i} cx={x} cy={y} r="0.8" fill="#1a1200" />;
                    })}</g>
                  </svg>
                )}

                {index % 4 === 1 && (
                  <svg width={flower.size * 1.8} height={flower.size * 1.8} viewBox="0 0 100 100" className="overflow-visible">
                    <defs>
                      <radialGradient id={`rose-grad-${index}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FF69B4" />
                        <stop offset="100%" stopColor="#C71585" />
                      </radialGradient>
                    </defs>
                    {[...Array(5)].map((_, i) => (
                      <path key={`outer-${i}`} d="M50 50 Q70 20 90 50 Q70 80 50 50" fill="#FFC0CB" transform={`rotate(${i * 72} 50 50) translate(0 -5)`} />
                    ))}
                    {[...Array(5)].map((_, i) => (
                      <path key={`inner-${i}`} d="M50 50 Q65 30 80 50 Q65 70 50 50" fill={`url(#rose-grad-${index})`} transform={`rotate(${i * 72 + 36} 50 50)`} />
                    ))}
                    <circle cx="50" cy="50" r="15" fill="#8B008B" opacity="0.8">
                      <animate attributeName="r" values="15;16;15" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <path d="M50 50 m-5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                  </svg>
                )}

                {index % 4 === 2 && (
                  <svg width={flower.size * 1.6} height={flower.size * 1.6} viewBox="0 0 100 100" className="overflow-visible">
                    {[...Array(12)].map((_, i) => (
                      <ellipse key={i} cx="50" cy="50" rx="8" ry="25" fill="#fff" stroke="#f0f0f0" strokeWidth="1" transform={`rotate(${i * 30} 50 50)`} />
                    ))}
                    <circle cx="50" cy="50" r="12" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
                    <circle cx="53" cy="47" r="2" fill="#fff" opacity="0.5" />
                  </svg>
                )}

                {index % 4 === 3 && (
                  <svg width={flower.size * 2} height={flower.size * 2} viewBox="0 0 100 100" className="overflow-visible">
                    <defs>
                      <linearGradient id={`lily-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#BA55D3" />
                        <stop offset="100%" stopColor="#9370DB" />
                      </linearGradient>
                    </defs>
                    {[...Array(6)].map((_, i) => (
                      <path key={i} d="M50 50 Q75 10 50 0 Q25 10 50 50" fill={`url(#lily-grad-${index})`} transform={`rotate(${i * 60} 50 50)`} />
                    ))}
                    {[...Array(3)].map((_, i) => (
                      <line key={`line-${i}`} x1="50" y1="50" x2="50" y2="20" stroke="#FFD700" strokeWidth="2" transform={`rotate(${i * 120} 50 50)`} />
                    ))}
                    {[...Array(3)].map((_, i) => (
                      <circle key={`tip-${i}`} cx="50" cy="20" r="3" fill="#8B4513" transform={`rotate(${i * 120} 50 50)`} />
                    ))}
                  </svg>
                )}
              </motion.div>

              {/* Photo popup on hover - POLAROID STYLE */}
              <AnimatePresence>
                {activeFlower === index && selectedMemory === null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }}
                    exit={{ opacity: 0, scale: 0, rotate: 10 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className="absolute z-50 bg-white p-3 pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    style={{
                      bottom: '130%',
                      width: isMobile ? 140 : 180,
                      ...(isMobile ? (
                        index % 2 === 0
                          ? { left: '0', transformOrigin: 'bottom left' }
                          : { right: '0', transformOrigin: 'bottom right' }
                      ) : (
                        flower.x > 80 ? { right: '0', transformOrigin: 'bottom right' } :
                          flower.x < 20 ? { left: '0', transformOrigin: 'bottom left' } :
                            { left: '50%', x: '-50%', transformOrigin: 'bottom center' }
                      ))
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="overflow-hidden bg-gray-100 aspect-[4/5] relative">
                      <img
                        src={images[flower.image]}
                        alt="Memory"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 ring-1 ring-black/5"></div>
                    </div>

                    {/* Butterfly Button for Expansion */}
                    <motion.button
                      className="absolute -bottom-4 -right-4 z-50 drop-shadow-lg filter"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMemory(index);
                      }}
                    >
                      <span className="text-4xl filter drop-shadow-md">🦋</span>
                    </motion.button>

                    {/* Helper Text */}
                    <motion.div
                      className="absolute -bottom-8 right-6 bg-white/90 px-2 py-1 rounded-md shadow-sm pointer-events-none z-40"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-[10px] font-bold text-pink-500 whitespace-nowrap">Click Butterfly 🎵</p>
                    </motion.div>

                    {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/80 shadow-sm rotate-3 opacity-80" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Clickable leaves */}
          {responsiveLeaves.map((leaf) => (
            <motion.div
              key={leaf.id}
              className="absolute cursor-pointer"
              style={{
                left: `${isMobile ? leaf.mobileX : leaf.x}%`,
                top: `${isMobile ? leaf.mobileY : leaf.y}%`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + leaf.id * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              onClick={() => setActiveLeaf(activeLeaf === leaf.id ? null : leaf.id)}
            >
              <span className="text-4xl">🍃</span>

              {/* Message popup */}
              <AnimatePresence>
                {activeLeaf === leaf.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 glass-card px-4 py-3 rounded-xl whitespace-nowrap z-40"
                    style={{
                      maxWidth: isMobile ? '80vw' : 'auto',
                      whiteSpace: isMobile ? 'normal' : 'nowrap',
                      textAlign: 'center'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-sm font-body text-foreground">
                      {leaf.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Music Player Modal */}
        <AnimatePresence>
          {selectedMemory !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                className="bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-2xl max-w-lg w-[90vw] md:w-full shadow-2xl relative border border-white/50"
                style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white text-gray-500 hover:text-red-500 hover:rotate-90 transition-all duration-300 rounded-full p-2 shadow-lg z-10"
                >
                  <X size={20} />
                </button>

                {/* Large Photo Container - Responsive */}
                <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-white bg-gray-100 flex-shrink-1" style={{ minHeight: '200px' }}>
                  <img
                    src={images[flowers[selectedMemory].image]}
                    alt="Memory"
                    className="w-full h-full object-contain max-h-[50vh] md:max-h-[60vh] bg-black/5"
                  />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50 pointer-events-none" />
                </div>

                {/* Player Controls */}
                <div className="bg-white/50 rounded-xl p-4 flex flex-col gap-3 mt-4 flex-shrink-0 border border-white/40">
                  <div className="flex items-center justify-between text-sm text-foreground font-display tracking-wide">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Now Playing
                    </span>
                    <Music size={14} className="text-gold" />
                  </div>

                  {/* Progress Bar - Interactive */}
                  <div
                    className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden cursor-pointer relative group"
                    onClick={(e) => {
                      if (audioRef.current) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        if (Number.isFinite(percent) && Number.isFinite(audioRef.current.duration)) {
                          audioRef.current.currentTime = percent * audioRef.current.duration;
                          setProgress(percent * 100);
                        }
                      }
                    }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold to-yellow-400 group-hover:from-yellow-400 group-hover:to-yellow-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-6 md:gap-10 pt-2">
                    <button
                      onClick={rewind}
                      className="text-gray-400 hover:text-gold transition-colors hover:scale-110 transform"
                    >
                      <RotateCcw size={22} />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-gold/30 hover:scale-105 hover:shadow-xl transition-all"
                    >
                      {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>

                    {/* Visual balance */}
                    <div className="w-6" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <motion.button
            onClick={() => navigate('/wishes')}
            className="glow-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="glass-card px-10 py-5 rounded-full">
              <span className="text-xl font-display text-foreground">
                See Your Birthday Wishes 🎈
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MemoryGardenPage;
