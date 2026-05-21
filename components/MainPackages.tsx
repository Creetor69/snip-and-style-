
import React from 'react';
import { motion } from 'framer-motion';

interface Package {
  title: string;
  price: string;
  description: string;
  icon: string;
  color: string;
}

const packages: Package[] = [
  {
    title: "Full Grooming",
    price: "From ₹599",
    description: "The complete head-to-tail experience with premium styling.",
    icon: "soap",
    color: "bg-orange-50 text-[#FF8200]"
  },
  {
    title: "Bath & Blow Dry",
    price: "From ₹499",
    description: "Deep cleansing bath with professional high-velocity dry.",
    icon: "bathtub",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Tick & Flea Combo",
    price: "From ₹999",
    description: "Medicated treatment to eliminate and prevent pests.",
    icon: "bug_report",
    color: "bg-red-50 text-red-600"
  },
  {
    title: "Medicated Bath",
    price: "From ₹1099",
    description: "Therapeutic care for skin infections and irritations.",
    icon: "medication",
    color: "bg-green-50 text-[#14d220]"
  }
];

const MainPackages: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#FF8200] font-black uppercase tracking-[0.2em] text-xs mb-4">Core Packages</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter">Professional <span className="text-[#111811]/20">Styling.</span></h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] border border-black/5 hover:shadow-2xl transition-all group cursor-pointer"
              onClick={onExplore}
            >
              <div className={`size-14 ${pkg.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{pkg.icon}</span>
              </div>
              <h4 className="text-2xl font-black tracking-tighter mb-2">{pkg.title}</h4>
              <p className="text-sm font-bold text-[#111811]/40 mb-6 leading-relaxed">{pkg.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-[#FF8200]">{pkg.price}</span>
                <span className="material-symbols-outlined text-[#111811]/20 group-hover:text-[#FF8200] transition-colors">arrow_forward</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
           <button 
            onClick={onExplore}
            className="group flex flex-col items-center gap-4"
           >
             <div className="px-8 py-4 bg-[#111811] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#FF8200] transition-all shadow-xl">
               Explore Full Menu
             </div>
             <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] font-black uppercase tracking-widest">Next: Meet the Pack</span>
               <span className="material-symbols-outlined animate-bounce">expand_more</span>
             </div>
           </button>
        </div>
      </div>
    </section>
  );
};

export default MainPackages;
