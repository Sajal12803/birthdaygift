import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface GlassFrameProps {
  children: ReactNode;
  className?: string;
}

const GlassFrame = ({ children, className = '' }: GlassFrameProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* Glow effect behind the frame */}
      <div 
        className="absolute inset-0 rounded-2xl blur-xl opacity-50"
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(232,180,216,0.3) 50%, rgba(184,169,201,0.3) 100%)',
          transform: 'translateZ(-20px)',
        }}
      />
      
      {/* Glass frame */}
      <div 
        className="glass-card rounded-2xl p-2 overflow-hidden"
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        {/* Inner gold border */}
        <div className="relative rounded-xl overflow-hidden border-2 border-primary/30">
          {children}
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-primary/50 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-primary/50 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg" />
        </div>
      </div>
      
      {/* Floating sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
            transform: 'translateZ(40px)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  );
};

export default GlassFrame;
