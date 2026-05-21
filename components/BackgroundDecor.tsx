
import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxItemProps {
  progress: MotionValue<number>;
  speed: number;
  initialX: string;
  initialTop: string;
  children: React.ReactNode;
}

const ParallaxItem: React.FC<ParallaxItemProps> = ({ progress, speed, initialX, initialTop, children }) => {
  // Move elements vertically at different speeds relative to scroll
  const y = useTransform(progress, [0, 1], [0, speed * 1200]);
  const rotate = useTransform(progress, [0, 1], [0, speed * 360]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: initialX,
        top: initialTop,
        y,
        rotate,
      }}
    >
      {children}
    </motion.div>
  );
};

const BackgroundDecor: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Memoize random values to avoid re-renders changing positions
  const bubbles = useMemo(() => [...Array(20)].map((_, i) => ({
    id: i,
    speed: (Math.random() - 0.5) * 1.2,
    size: Math.random() * 60 + 20,
    x: `${Math.random() * 100}%`,
    top: `${Math.random() * 120 - 10}%`,
    blur: Math.random() * 3,
    opacity: Math.random() * 0.08 + 0.03
  })), []);

  const paws = useMemo(() => [...Array(10)].map((_, i) => ({
    id: i,
    speed: (Math.random() - 0.5) * 0.8,
    x: `${Math.random() * 100}%`,
    top: `${Math.random() * 120 - 10}%`,
    opacity: Math.random() * 0.06 + 0.02,
    rotation: Math.random() * 360
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#FFF9F2]/50">
      {/* Light Orange Bubbles */}
      {bubbles.map((b) => (
        <ParallaxItem 
          key={`bubble-${b.id}`} 
          progress={scrollYProgress} 
          speed={b.speed} 
          initialX={b.x} 
          initialTop={b.top}
        >
          <motion.div
            className="rounded-full bg-[#FF8200]/10 border border-[#FF8200]/20"
            style={{
              width: b.size,
              height: b.size,
              filter: `blur(${b.blur}px)`,
              opacity: b.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </ParallaxItem>
      ))}

      {/* Green Paws */}
      {paws.map((p) => (
        <ParallaxItem 
          key={`paw-${p.id}`} 
          progress={scrollYProgress} 
          speed={p.speed} 
          initialX={p.x} 
          initialTop={p.top}
        >
          <motion.span
            className="material-symbols-outlined text-[#14d220] select-none"
            style={{
              fontSize: '3.5rem',
              opacity: p.opacity,
              display: 'block',
              rotate: p.rotation
            }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity]
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            pets
          </motion.span>
        </ParallaxItem>
      ))}
    </div>
  );
};

export default BackgroundDecor;
