
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import AnimatedText from './AnimatedText';

interface HeroProps {
  onServiceClick: () => void;
  onBoardingClick: () => void;
}

const InteractivePet: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotation and translation values for 3D effect
  const rotateY = useTransform(smoothX, [-300, 300], [-25, 25]);
  const rotateX = useTransform(smoothY, [-300, 300], [25, -25]);
  
  // Independent translations for different layers (The Parallax Secret)
  const petTranslateX = useTransform(smoothX, [-300, 300], [-10, 10]);
  const petTranslateY = useTransform(smoothY, [-300, 300], [-10, 10]);
  
  const uiTranslateX = useTransform(smoothX, [-300, 300], [-40, 40]);
  const uiTranslateY = useTransform(smoothY, [-300, 300], [-40, 40]);

  useEffect(() => {
    if (isInteracting) return;
    const controlsX = animate(mouseX, [0, 30, -30, 0], { duration: 8, repeat: Infinity, ease: "easeInOut" });
    const controlsY = animate(mouseY, [0, -20, 20, 0], { duration: 10, repeat: Infinity, ease: "easeInOut" });
    return () => { controlsX.stop(); controlsY.stop(); };
  }, [isInteracting, mouseX, mouseY]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsInteracting(true);
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <motion.div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { setIsInteracting(false); mouseX.set(0); mouseY.set(0); }}
      whileHover={{ scale: 1.05, filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.15))" }}
      className="relative w-full max-w-lg aspect-square perspective-[1500px] touch-none select-none cursor-grab active:cursor-grabbing transition-all duration-500"
    >
      {/* Background Shadow / Glow */}
      <motion.div 
        style={{ x: petTranslateX, y: petTranslateY }}
        className="absolute inset-10 bg-[#FF8200]/20 blur-[80px] rounded-full"
      />

      <motion.div
        style={{ 
          rotateY, 
          rotateX, 
          transformStyle: "preserve-3d" 
        }}
        className="w-full h-full relative"
      >
        {/* Layer 1: Main Architectural Frame */}
        <motion.div 
          className="absolute inset-0 bg-white rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white overflow-hidden"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Subtle texture inside frame */}
          <div className="absolute inset-0 bg-[#f8f8f8] opacity-50" />
        </motion.div>

        {/* Layer 2: The Pet Image (Tilted deeper for pop effect) */}
        <motion.div 
          style={{ 
            x: petTranslateX, 
            y: petTranslateY,
            transform: "translateZ(50px)" 
          }}
          className="absolute inset-4 rounded-[4rem] overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1200&auto=format&fit=crop" 
            alt="Immersive Pet" 
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Layer 3: High-Intensity Floating UI */}
        <motion.div 
          style={{ 
            x: uiTranslateX, 
            y: uiTranslateY,
            transform: "translateZ(120px)" 
          }}
          className="absolute -top-12 -right-12 bg-[#111811] text-white px-8 py-6 rounded-[2.5rem] shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-1">
             <span className="material-symbols-outlined text-[#FF8200] text-sm">verified</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Premium Care</span>
          </div>
          <span className="text-2xl font-black block leading-none">Elite Studio.</span>
        </motion.div>

        <motion.div 
          style={{ 
            x: useTransform(smoothX, [-300, 300], [-60, 60]), 
            y: useTransform(smoothY, [-300, 300], [-60, 60]),
            transform: "translateZ(150px)" 
          }}
          className="absolute -bottom-10 -left-12 bg-white px-8 py-6 rounded-[2.5rem] shadow-2xl border border-black/5"
        >
          <div className="flex items-center gap-3 mb-1">
             <span className="material-symbols-outlined text-[#14d220] text-sm">content_cut</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-[#111811]/30">Wellness</span>
          </div>
          <span className="text-2xl font-black block leading-none text-[#111811]">Style Mode.</span>
        </motion.div>

        {/* Decorative Floating Bubbles */}
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                // Merged style attributes to fix JSX duplicate attribute error
                style={{ 
                    x: useTransform(smoothX, [-300, 300], [(-60 - (i*20)), (60 + (i*20))]),
                    y: useTransform(smoothY, [-300, 300], [(-60 - (i*20)), (60 + (i*20))]),
                    transform: `translateZ(${180 + (i * 30)}px)`,
                    top: `${20 + i * 25}%`,
                    left: `${i % 2 === 0 ? -20 : 90}%`
                }}
                className={`absolute size-${12 + i * 4} rounded-full bg-white/20 backdrop-blur-md border border-white/50 hidden lg:block shadow-xl`}
            />
        ))}
      </motion.div>

      {/* Dynamic Floor Reflection / Shadow */}
      <motion.div 
        animate={{ 
            scale: isInteracting ? 1.2 : [1, 1.1, 1], 
            opacity: isInteracting ? 0.3 : [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black blur-[40px] rounded-full"
      />
    </motion.div>
  );
});

const Hero: React.FC<HeroProps> = ({ onServiceClick, onBoardingClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const bgX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative px-6 py-16 lg:py-24 overflow-hidden"
    >
      {/* Interactive Background Glows */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      >
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#FF8200]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[#14d220]/5 blur-[150px] rounded-full" />
      </motion.div>

      {/* Floating Interactive Icons */}
      {[
        { icon: 'content_cut', top: '15%', left: '10%', delay: 0 },
        { icon: 'pets', top: '25%', right: '15%', delay: 0.5 },
        { icon: 'spa', bottom: '20%', left: '20%', delay: 1 },
        { icon: 'soap', bottom: '15%', right: '10%', delay: 1.5 },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1], 
            scale: [1, 1.1, 1],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "easeInOut"
          }}
          style={{ 
            position: 'absolute', 
            top: item.top, 
            left: item.left, 
            right: item.right,
            zIndex: 1
          }}
          className="hidden lg:flex size-16 bg-white/50 backdrop-blur-sm rounded-2xl items-center justify-center text-[#111811]/20 border border-white/50 shadow-xl"
        >
          <span className="material-symbols-outlined text-3xl">{item.icon}</span>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="flex flex-col gap-10 z-10 text-center lg:text-left">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-xl w-fit mx-auto lg:mx-0 border border-[#111811]/5"
            >
              <div className="size-2 bg-[#FF8200] rounded-full animate-ping" />
              <span className="text-[#111811] text-[10px] font-black uppercase tracking-[0.2em]">The Ultimate Pet Styling Destination</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={onBoardingClick}
              className="group cursor-pointer bg-gradient-to-r from-[#8B6B4A]/10 to-[#C97B63]/10 hover:from-[#8B6B4A]/15 hover:to-[#C97B63]/15 border border-[#8B6B4A]/15 p-4 rounded-2xl flex items-center justify-between gap-4 max-w-lg mx-auto lg:mx-0 transition-all shadow-md active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#8B6B4A] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#8B6B4A]/20">
                  <span className="material-symbols-outlined text-lg animate-bounce">hotel</span>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white bg-[#8B6B4A] px-1.5 py-0.5 rounded leading-none">NEW OPENING</span>
                    <span className="size-1.5 bg-[#14d220] rounded-full animate-pulse" />
                  </div>
                  <h4 className="text-[11px] font-black tracking-tight text-[#111811] mt-1">Comfortable Pet Boarding is now open! Check it out 🐾</h4>
                  <p className="text-[9px] text-[#111811]/60 font-semibold leading-none mt-0.5">Explore cozy suite spaces and reserve your pet's stay</p>
                </div>
              </div>
              <div className="size-7 rounded-full bg-white text-[#111811] flex items-center justify-center shrink-0 border border-black/5 shadow group-hover:bg-[#FF8200] group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </div>
            </motion.div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#14d220]/10 text-[#14d220] px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-[#14d220]/20"
              >
                <span className="material-symbols-outlined text-sm">home</span>
                Home Service (Within 12km)
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#FF8200]/10 text-[#FF8200] px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-[#FF8200]/20"
              >
                <span className="material-symbols-outlined text-sm">verified</span>
                Certified Stylists
              </motion.div>
            </div>
            <div className="space-y-4">
               <AnimatedText text="Pet Styling Studio." className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-[#FF8200]" />
               <AnimatedText text="Every Inch Styled To Perfection." className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]" delay={0.2} />
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1 }} 
            className="text-xl text-[#111811]/50 font-bold max-w-lg mx-auto lg:mx-0"
          >
            Experience the future of pet boutique services. We blend artistic precision with deep pet psychology to ensure every tail leaves happy.
          </motion.p>
          
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mx-auto lg:mx-0">
              <div className="flex flex-col gap-3.5 sm:gap-4 w-full sm:w-fit">
                <motion.button 
                    onClick={onServiceClick} 
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(255, 130, 0, 0.4)" }} 
                    whileTap={{ scale: 0.95 }} 
                    className="bg-[#FF8200] text-white px-5 py-3.5 sm:px-10 sm:py-5.5 rounded-xl sm:rounded-[2rem] font-black text-sm sm:text-xl shadow-2xl w-full"
                >
                    View our Services
                </motion.button>
                
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <motion.a
                    href="https://wa.me/9739887770"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-[#14d220] text-white px-3.5 py-2 sm:px-6 sm:py-3.5 rounded-md sm:rounded-xl font-black text-[8px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-sm sm:text-base">chat</span>
                    WhatsApp
                  </motion.a>
                  <motion.a
                    href="tel:+919739887770"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-[#111811] text-white px-3.5 py-2 sm:px-6 sm:py-3.5 rounded-md sm:rounded-xl font-black text-[8px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-sm sm:text-base">call</span>
                    Call Now
                  </motion.a>
                </div>
              </div>

              <div className="flex -space-x-4">
                  {[
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&h=100&fit=crop"
                  ].map((url, i) => (
                      <div key={i} className="size-14 rounded-full border-4 border-white bg-[#FFF9F2] overflow-hidden shadow-lg">
                          <img src={url} className="w-full h-full object-cover" />
                      </div>
                  ))}
                  <div className="size-14 rounded-full border-4 border-white bg-[#111811] flex items-center justify-center text-white text-[10px] font-black">
                      +4K
                  </div>
              </div>
            </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="flex justify-center items-center py-10"
        >
          <InteractivePet />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
