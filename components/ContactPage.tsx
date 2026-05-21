
import React from 'react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const contactInfo = [
    { 
      icon: 'chat', 
      label: 'WhatsApp Booking', 
      value: '+91 9739887770', 
      href: 'https://wa.me/9739887770?text=Hi! I want to book a grooming session.',
      color: 'bg-green-50 text-[#14d220]'
    },
    { 
      icon: 'mail', 
      label: 'Email Support', 
      value: 'Snip&style857@gmail.com', 
      href: 'mailto:Snip&style857@gmail.com',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      icon: 'location_on', 
      label: 'Studio Location', 
      value: 'Site no 61, Kanakapura Main Road, Bengaluru 560082', 
      href: 'https://share.google/RaJSL1HJJaTvSBVef',
      color: 'bg-orange-50 text-[#FF8200]'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 md:py-24 px-4 md:px-6 bg-[#FFF9F2] min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-8xl font-black tracking-tighter mb-4 md:mb-8 leading-[0.9]"
          >
            Visit the <span className="text-[#FF8200]">Studio.</span>
          </motion.h1>
          <p className="text-base md:text-xl text-[#111811]/50 font-bold max-w-2xl mx-auto px-4">
            Experience premium grooming at our specialized boutique. Instant response via WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-stretch">
          <div className="space-y-4 md:space-y-6">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,1)' }}
                className="flex items-center md:items-start gap-4 md:gap-8 p-5 md:p-10 bg-white/50 backdrop-blur rounded-[2rem] md:rounded-[3rem] border border-white shadow-xl group transition-all"
              >
                <div className={`size-12 md:size-20 rounded-[1.2rem] md:rounded-[2rem] ${info.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-6 transition-transform`}>
                  <span className="material-symbols-outlined text-2xl md:text-4xl">{info.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111811]/30 mb-0.5 md:mb-1">{info.label}</p>
                  <p className="text-sm md:text-2xl font-black text-[#111811] leading-tight break-words">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="relative bg-[#111811] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8200]/20 to-transparent" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-6xl md:text-[100px] text-[#FF8200] mb-6 md:mb-8">explore</span>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6">Need Directions?</h3>
              <p className="text-white/40 mb-8 md:mb-12 max-w-sm mx-auto font-medium text-xs md:text-base">
                We are located on Kanakapura Main Road, right beside the Shani Mahatma Temple.
              </p>
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="https://share.google/RaJSL1HJJaTvSBVef" 
                target="_blank"
                className="inline-flex items-center gap-2.5 bg-white text-[#111811] px-6 py-3 md:px-9 md:py-3.5 rounded-full font-black text-xs md:text-base hover:bg-[#FF8200] hover:text-white transition-all shadow-2xl"
              >
                <span className="material-symbols-outlined text-sm md:text-lg">directions</span>
                Get Directions
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
