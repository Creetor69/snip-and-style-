
import React from 'react';
import { motion } from 'framer-motion';

const TrustStrip: React.FC = () => {
  const trustItems = [
    { icon: 'sanitizer', label: 'Hygienic Tools', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: 'verified_user', label: 'Certified Staff', color: 'text-[#14d220]', bg: 'bg-green-50' },
    { icon: 'eco', label: 'Organic Care', color: 'text-[#FF8200]', bg: 'bg-orange-50' },
    { icon: 'mood', label: 'Happy Tails', color: 'text-[#14d220]', bg: 'bg-green-50' },
  ];

  return (
    <div className="bg-white py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {trustItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                damping: 15, 
                stiffness: 100,
                delay: idx * 0.1 
              }}
              className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 group"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                className={`size-14 sm:size-20 rounded-2xl sm:rounded-[2rem] ${item.bg} flex items-center justify-center ${item.color} shadow-lg shadow-black/5 group-hover:shadow-2xl transition-all duration-500`}
              >
                <span className="material-symbols-outlined text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{item.icon}</span>
              </motion.div>
              <div className="text-center lg:text-left">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="text-[8px] sm:text-xs font-black text-[#111811]/20 uppercase tracking-[0.3em] mb-1"
                >
                  Quality Shield
                </motion.p>
                <h4 className="text-lg sm:text-2xl font-black text-[#111811] leading-tight">{item.label}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
