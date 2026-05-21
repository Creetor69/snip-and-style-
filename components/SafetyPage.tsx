
import React from 'react';
import { motion } from 'framer-motion';

const SafetyPage: React.FC = () => {
  const protocols = [
    { title: "UV Sterilization", desc: "All our grooming tools are UV-sterilized after every session to prevent cross-contamination.", icon: "sanitizer" },
    { title: "Organic Care", desc: "We exclusively use pH-balanced, chemical-free organic shampoos that are safe for all skin types.", icon: "eco" },
    { title: "Deep Clean", desc: "Our grooming stations are deep-cleaned twice a day to maintain a sterile, fresh environment.", icon: "mop" },
    { title: "Calm Handling", desc: "Our staff is trained in low-stress handling techniques to ensure your pet stays relaxed.", icon: "favorite" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20 items-center mb-32">
          <div className="flex-1">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">Safety & <span className="text-[#14d220]">Hygiene.</span></h1>
            <p className="text-xl text-[#111811]/60 leading-relaxed font-medium">
              Your pet&apos;s health is our number one priority. We follow hospital-grade sanitization protocols to ensure a safe, clean, and happy grooming day.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="h-64 rounded-[3rem] bg-orange-100 overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=600" className="w-full h-full object-cover" />
            </div>
            <div className="h-64 mt-12 rounded-[3rem] bg-green-100 overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {protocols.map((p, i) => (
            <div key={i} className="p-10 bg-[#FFF9F2] rounded-[3rem] border border-black/5">
              <span className="material-symbols-outlined text-5xl text-[#FF8200] mb-6">{p.icon}</span>
              <h3 className="text-2xl font-black mb-4">{p.title}</h3>
              <p className="text-[#111811]/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SafetyPage;
