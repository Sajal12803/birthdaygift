import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <>
      {/* Main glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-64 h-64 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(255,215,0,0.2) 30%, transparent 70%)',
          }}
        />
      </motion.div>
      
      {/* Inner glow */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-8 h-8 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(212,175,55,0.4) 50%, transparent 100%)',
          }}
        />
      </motion.div>
    </>
  );
};

export default MouseGlow;
