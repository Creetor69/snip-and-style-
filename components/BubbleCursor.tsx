
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BubbleCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <>
      <motion.div
        className="bubble-cursor w-8 h-8 rounded-full border-2 border-[#FF8200]/40 bg-[#FF8200]/5 backdrop-blur-[1px] hidden lg:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="bubble-cursor w-12 h-12 rounded-full border border-[#14d220]/20 hidden lg:block"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 150, mass: 0.8 }}
      />
    </>
  );
};

export default BubbleCursor;
