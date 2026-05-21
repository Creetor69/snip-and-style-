
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const pawPrints = [
    { x: '15%', y: '70%', rotate: 15, delay: 0.2 },
    { x: '30%', y: '60%', rotate: -10, delay: 0.5 },
    { x: '45%', y: '65%', rotate: 20, delay: 0.8 },
    { x: '60%', y: '55%', rotate: -15, delay: 1.1 },
    { x: '75%', y: '60%', rotate: 10, delay: 1.4 },
    { x: '90%', y: '50%', rotate: -5, delay: 1.7 },
  ];

  const [progress, setProgress] = React.useState(0);
  const loadingTexts = [
    "Waking up the stylists...",
    "Sharpening the scissors...",
    "Warming up the water...",
    "Preparing the treats...",
    "Setting the mood...",
    "Snip & Style is ready!"
  ];
  const [textIndex, setTextIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFF9F2] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Walking Paw Prints */}
      {pawPrints.map((paw, i) => (
        <motion.div
          key={i}
          className="absolute text-[#FF8200]/10"
          initial={{ opacity: 0, scale: 0.5, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: paw.delay, duration: 0.4 }}
          style={{ left: paw.x, top: paw.y, transform: `rotate(${paw.rotate}deg)` }}
        >
          <span className="material-symbols-outlined text-5xl">pets</span>
        </motion.div>
      ))}

      {/* Floating Elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-20px] w-4 h-4 rounded-full bg-[#14d220]/10 blur-[1px]"
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -1000,
            opacity: [0, 0.5, 0],
            x: Math.sin(i) * 30
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{ left: `${Math.random() * 100}%` }}
        />
      ))}

      {/* Logo Area */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.div 
          className="size-48"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <img 
            src="https://i.ibb.co/GvvVrcgH/logo-removebg-preview-1.png" 
            alt="Snip & Style Logo" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
        
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tighter text-[#111811]">
            Snip <span className="text-[#FF8200]">&</span> Style
          </h1>
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-64 h-1.5 bg-black/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#FF8200]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.p 
                key={textIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[#14d220] font-black text-[10px] tracking-[0.3em] uppercase h-4"
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
