
import React from 'react';
import { motion } from 'framer-motion';

interface CTASectionProps {
  onViewServices: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onViewServices }) => {
  return (
    <section className="px-6 py-24 bg-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF8200]/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#14d220]/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-none"
          >
            Ready for a <span className="text-[#FF8200]">Glow Up?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#111811]/50 font-bold max-w-2xl mx-auto"
          >
            Your pet deserves the best. Book a session today and see the difference a professional touch makes.
          </motion.p>
        </div>

        <div className="flex justify-center">
          {/* View Services CTA */}
          <motion.button
            onClick={onViewServices}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-[#FF8200] p-8 md:p-11 rounded-[2.5rem] text-white shadow-2xl shadow-[#FF8200]/20 flex flex-col items-center gap-4 group max-w-xl w-full"
          >
            <div className="size-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">content_cut</span>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black mb-1">View Menu</h3>
              <p className="text-white/70 font-bold text-sm">Explore our full range of premium services.</p>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
