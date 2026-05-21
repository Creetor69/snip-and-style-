
import React from 'react';
import { motion } from 'framer-motion';

const MeetThePackPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-16 md:py-32 px-6 bg-[#FFF9F2] min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-24 rounded-[3.5rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden"
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none">
             <span className="material-symbols-outlined text-[150px] md:text-[300px]">verified_user</span>
          </div>
          <div className="absolute bottom-0 left-0 p-10 opacity-[0.03] select-none pointer-events-none -rotate-45">
             <span className="material-symbols-outlined text-[150px] md:text-[300px]">pets</span>
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 rounded-full bg-[#FF8200]/10 text-[#FF8200] text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-12"
            >
              The Heart of our Studio
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
            >
              Expert <span className="text-[#14d220]">Trained</span> Hands.
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-xl text-[#111811]/50 font-bold mb-10 md:mb-16 max-w-2xl mx-auto leading-relaxed"
            >
              Our team consists of internationally trained grooming artists who don&apos;t just see a pet—they see a personality. 
              We blend precision technique with a gentle touch that only comes from true animal lovers.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center">
              <motion.a 
                href="https://share.google/RaJSL1HJJaTvSBVef"
                target="_blank"
                whileHover={{ scale: 1.05, backgroundColor: "#14d220" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#111811] text-white px-6 py-3.5 md:px-7 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-xl"
              >
                <span className="material-symbols-outlined text-sm md:text-base">location_on</span>
                Visit Our Center
              </motion.a>
              <motion.a 
                href="https://wa.me/9739887770"
                whileHover={{ scale: 1.05, backgroundColor: "#111811" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF8200] text-white px-6 py-3.5 md:px-7 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-xl"
              >
                <span className="material-symbols-outlined text-sm md:text-base">chat</span>
                Book a Chat
              </motion.a>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 0.8 }}
              className="mt-12 md:mt-16 text-[8px] md:text-[10px] font-black uppercase text-[#111811] tracking-[0.5em]"
            >
              Precision, Patience & Pure Love
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MeetThePackPage;
