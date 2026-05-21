import React from 'react';
import { motion } from 'framer-motion';

const TreatsToysCTA: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-[#FAF7F2] border-t border-[#8B6B4A]/10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#8B6B4A] to-[#C97B63] p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group"
        >
          {/* Subtle floating decorative elements */}
          <span className="material-symbols-outlined absolute top-4 left-4 opacity-5 text-7xl select-none pointer-events-none">pets</span>
          <span className="material-symbols-outlined absolute bottom-4 right-20 opacity-5 text-7xl select-none pointer-events-none">sports_tennis</span>
          
          <div className="text-left max-w-xl relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/15">
              <span className="material-symbols-outlined text-[10px] text-[#E8DCCB]">redeem</span>
              <span className="text-[8px] font-black tracking-widest uppercase text-[#E8DCCB]">Exclusive Treats & Toys</span>
            </div>
            <h3 className="text-2xl md:text-3.5xl font-serif leading-tight">
              Make Their Stay Even Happier
            </h3>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-semibold">
              Explore our premium organic dental chew bones, high-stamina interactive balls, plush companions, and luxury accessories curated for ultimate comfort.
            </p>
          </div>

          {/* Luxury Arrow Button */}
          <motion.a 
            href="https://wa.me/9739887770?text=Hi!%20I%20would%20like%20to%20inquire%20about%20your%20premium%20pet%20treats%20and%20toys%20collection."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-white text-[#2B2B2B] pl-5 pr-3 py-3 rounded-full font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-[#FAF7F2] transition-colors shrink-0 group/btn relative z-10 self-start md:self-auto"
          >
            <span>Shop Treats & Toys</span>
            <div className="size-8 rounded-full bg-[#8B6B4A] text-white flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TreatsToysCTA;
