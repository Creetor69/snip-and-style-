import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BoardingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSeeNow: () => void;
}

const BoardingPopup: React.FC<BoardingPopupProps> = ({ isOpen, onClose, onSeeNow }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#111811]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="bg-[#FFFDF9] rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 max-w-md w-full relative z-10 flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 size-10 rounded-full bg-white/80 hover:bg-white text-[#111811] flex items-center justify-center shadow-lg transition-colors z-20"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Banner/Image */}
            <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#8B6B4A] to-[#C97B63]">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop" 
                alt="Happy puppies" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-40 hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent" />
              
              {/* Badge */}
              <div className="absolute bottom-4 left-6 bg-[#FF8200] text-white px-3.5 py-1 rounded-full font-black text-[9px] tracking-widest uppercase shadow-lg">
                🎉 EXCLUSIVE LAUNCH
              </div>
            </div>

            {/* Content info */}
            <div className="p-8 space-y-4 text-center">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-serif text-[#111811] tracking-tight">
                  Luxury Pet Boarding is Now Open! 🐾
                </h3>
                <p className="text-xs text-[#111811]/60 font-semibold leading-relaxed">
                  Treat your beloved cat or dog to a ultimate 5-star resort experience! Complete with temperature-controlled suites, specialized care, premium activities, and daily photo/video updates.
                </p>
              </div>

              {/* Action button */}
              <div className="pt-2 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSeeNow}
                  className="w-full py-4 bg-[#FF8200] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#FF8200]/20 flex items-center justify-center gap-2 hover:bg-[#FF8200]/95 transition-colors"
                >
                  <span>See Details & Book Now</span>
                  <span className="material-symbols-outlined text-base">hotel</span>
                </motion.button>
                <button 
                  onClick={onClose}
                  className="w-full py-2.5 text-[10px] uppercase font-black tracking-widest text-[#111811]/45 hover:text-[#111811] transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BoardingPopup;
