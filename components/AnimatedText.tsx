import React from 'react';
import { motion, Variants } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<Props> = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  // Explicitly type variants to avoid inference issues with transition types
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    }),
  };

  // Explicitly type variants to ensure 'spring' is correctly recognized as an AnimationGeneratorType
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedText;