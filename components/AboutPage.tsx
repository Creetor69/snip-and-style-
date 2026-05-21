
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: 'brush',
      title: 'Artistic Precision',
      text: 'We don\'t just cut fur; we style based on breed standards and your pet\'s unique personality. Every snip is a stroke of love.',
      color: 'bg-[#FF8200]/10 text-[#FF8200]'
    },
    {
      icon: 'psychology',
      title: 'Pet Psychology',
      text: 'Our team is trained to understand pet behavior, ensuring a calm, stress-free experience for even the most nervous tails.',
      color: 'bg-[#14d220]/10 text-[#14d220]'
    },
    {
      icon: 'favorite',
      title: 'Family First',
      text: 'When your pet walks through our doors, they become part of our family. Their comfort is our non-negotiable priority.',
      color: 'bg-blue-50 text-blue-500'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="py-16 md:py-24 px-6 bg-[#FFF9F2] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            Heart of the <span className="text-[#FF8200]">Studio.</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#111811]/50 font-bold max-w-2xl mx-auto"
          >
            We started with a simple belief: every pet deserves to feel like a masterpiece. 
            Snip & Style is more than a salon—it&apos;s a sanctuary for your best friends.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-32">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px] border-[8px] md:border-[12px] border-white relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=800" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          <div className="space-y-8 md:space-y-12">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 md:gap-8 group"
              >
                <div className={`size-14 md:size-20 rounded-[1.5rem] md:rounded-3xl ${v.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="material-symbols-outlined text-2xl md:text-4xl">{v.icon}</span>
                </div>
                <div>
                  <h4 className="text-xl md:text-3xl font-black mb-2 group-hover:text-[#FF8200] transition-colors">{v.title}</h4>
                  <p className="text-sm md:text-lg text-[#111811]/50 leading-relaxed font-bold">{v.text}</p>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-black/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[#FF8200]" />
              <p className="text-lg md:text-2xl font-bold italic mb-6 leading-snug">&quot;Our mission is to redefine pet grooming as a luxury wellness experience that feeds the soul as much as it cleans the coat.&quot;</p>
              <div className="flex items-center gap-4">
                 <div className="size-12 rounded-full bg-gray-100 overflow-hidden">
                    <img src="https://i.ibb.co/GvvVrcgH/logo-removebg-preview-1.png" className="w-full h-full object-contain" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FF8200]">Founders</p>
                    <p className="text-sm font-black text-[#111811]">The Snip & Style Family</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
