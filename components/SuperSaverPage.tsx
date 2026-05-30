
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem, PetType, SizeType, CoatType } from '../App';

interface SuperSaverPageProps {
  addToCart: (item: CartItem) => void;
  initialConfig?: { pet: PetType, size: SizeType, coat: CoatType } | null;
}

type Step = 1 | 2 | 3;
type Species = 'dog' | 'cat' | null;
type Size = 'small' | 'medium' | 'large' | null;
type Coat = 'short' | 'long' | null;

const SuperSaverPage: React.FC<SuperSaverPageProps> = ({ addToCart, initialConfig }) => {
  const [step, setStep] = useState<Step>(initialConfig ? 3 : 1);
  const [species, setSpecies] = useState<Species>(initialConfig?.pet || null);
  const [size, setSize] = useState<Size>(initialConfig?.size || null);
  const [coat, setCoat] = useState<Coat>(initialConfig?.coat || null);

  const reset = () => {
    setStep(1);
    setSpecies(null);
    setSize(null);
    setCoat(null);
  };

  const handleSpeciesSelect = (s: Species) => {
    setSpecies(s);
    setStep(2);
  };

  const handleConfigSelect = (s: Size | null, c: Coat) => {
    if (species === 'dog') setSize(s);
    setCoat(c);
    setStep(3);
  };

  // Full Dog matrix based on provided pricing
  const dogSaverPackages = {
    short: {
      small: [
        { name: 'Full Grooming', sessions: 3, price: '₹4,874', savings: '5.5% Off', color: 'border-orange-200 text-orange-600', validity: '6 months' },
        { name: 'Full Grooming', sessions: 6, price: '₹8,999', savings: '5.9% Off', color: 'border-orange-400 text-orange-700', validity: '12 months' },
        { name: 'Full Grooming', sessions: 12, price: '₹13,999', savings: 'Best Value', color: 'border-[#FF8200] text-[#FF8200]', details: 'Our most comprehensive package. Includes a therapeutic bath with specialized shampoos (anti-tick/flea, anti-rashes, or sensitive skin), deep conditioning, a professional blow-dry, and hair setting. We finish with complete hygiene care for eyes, ears, teeth, and nails.', validity: '16 months' },
        { name: 'Tick & Flea Combo', sessions: 3, price: '₹6,874', savings: 'Combo Saver', color: 'border-red-200 text-red-600', validity: '6 months' },
        { name: 'Medicated Combo', sessions: 3, price: '₹7,499', savings: 'Skin Care Saver', color: 'border-blue-200 text-blue-600', validity: '6 months' },
      ],
      medium: [
        { name: 'Full Grooming', sessions: 3, price: '₹6,374', savings: '5.5% Off', color: 'border-orange-200 text-orange-600', validity: '6 months' },
        { name: 'Full Grooming', sessions: 6, price: '₹11,999', savings: '5.9% Off', color: 'border-orange-400 text-orange-700', validity: '12 months' },
        { name: 'Full Grooming', sessions: 12, price: '₹18,749', savings: 'Best Value', color: 'border-[#FF8200] text-[#FF8200]', details: 'Our most comprehensive package. Includes a therapeutic bath with specialized shampoos (anti-tick/flea, anti-rashes, or sensitive skin), deep conditioning, a professional blow-dry, and hair setting. We finish with complete hygiene care for eyes, ears, teeth, and nails.', validity: '16 months' },
        { name: 'Tick & Flea Combo', sessions: 3, price: '₹9,124', savings: 'Combo Saver', color: 'border-red-200 text-red-600', validity: '6 months' },
        { name: 'Medicated Combo', sessions: 3, price: '₹9,874', savings: 'Skin Care Saver', color: 'border-blue-200 text-blue-600', validity: '6 months' },
      ],
      large: [
        { name: 'Full Grooming', sessions: 3, price: '₹7,999', savings: '5.5% Off', color: 'border-orange-200 text-orange-600', validity: '6 months' },
        { name: 'Full Grooming', sessions: 6, price: '₹14,999', savings: '5.9% Off', color: 'border-orange-400 text-orange-700', validity: '12 months' },
        { name: 'Full Grooming', sessions: 12, price: '₹23,374', savings: 'Best Value', color: 'border-[#FF8200] text-[#FF8200]', details: 'Our most comprehensive package. Includes a therapeutic bath with specialized shampoos (anti-tick/flea, anti-rashes, or sensitive skin), deep conditioning, a professional blow-dry, and hair setting. We finish with complete hygiene care for eyes, ears, teeth, and nails.', validity: '16 months' },
        { name: 'Tick & Flea Combo', sessions: 3, price: '₹11,249', savings: 'Combo Saver', color: 'border-red-200 text-red-600', validity: '6 months' },
        { name: 'Medicated Combo', sessions: 3, price: '₹12,124', savings: 'Skin Care Saver', color: 'border-blue-200 text-blue-600', validity: '6 months' },
      ],
    },
    long: {
      small: [
        { name: 'Full Grooming', sessions: 3, price: '₹6,374', savings: '5.5% Off', color: 'border-green-200 text-green-600', validity: '6 months' },
        { name: 'Full Grooming', sessions: 6, price: '₹11,999', savings: '5.9% Off', color: 'border-green-400 text-green-700', validity: '12 months' },
        { name: 'Full Grooming', sessions: 12, price: '₹18,749', savings: 'Best Value', color: 'border-[#14d220] text-[#14d220]', details: 'Our most comprehensive package. Includes a therapeutic bath with specialized shampoos (anti-tick/flea, anti-rashes, or sensitive skin), deep conditioning, a professional blow-dry, and hair setting. We finish with complete hygiene care for eyes, ears, teeth, and nails.', validity: '16 months' },
        { name: 'Tick & Flea Combo', sessions: 3, price: '₹9,124', savings: 'Combo Saver', color: 'border-red-200 text-red-600', validity: '6 months' },
        { name: 'Medicated Combo', sessions: 3, price: '₹9,874', savings: 'Skin Care Saver', color: 'border-blue-200 text-blue-600', validity: '6 months' },
      ],
      medium: [
        { name: 'Full Grooming', sessions: 3, price: '₹7,999', savings: '5.5% Off', color: 'border-green-200 text-green-600', validity: '6 months' },
        { name: 'Full Grooming', sessions: 6, price: '₹14,999', savings: '5.9% Off', color: 'border-green-400 text-green-700', validity: '12 months' },
        { name: 'Full Grooming', sessions: 12, price: '₹23,374', savings: 'Best Value', color: 'border-[#14d220] text-[#14d220]', details: 'Our most comprehensive package. Includes a therapeutic bath with specialized shampoos (anti-tick/flea, anti-rashes, or sensitive skin), deep conditioning, a professional blow-dry, and hair setting. We finish with complete hygiene care for eyes, ears, teeth, and nails.', validity: '16 months' },
        { name: 'Tick & Flea Combo', sessions: 3, price: '₹11,249', savings: 'Combo Saver', color: 'border-red-200 text-red-600', validity: '6 months' },
        { name: 'Medicated Combo', sessions: 3, price: '₹12,124', savings: 'Skin Care Saver', color: 'border-blue-200 text-blue-600', validity: '6 months' },
      ],
      large: [
        { name: 'Full Grooming', sessions: 3, price: '₹8,749', savings: '5.5% Off', color: 'border-green-200 text-green-600', validity: '6 months' },
        { name: 'Full Grooming', sessions: 6, price: '₹16,499', savings: '5.9% Off', color: 'border-green-400 text-green-700', validity: '12 months' },
        { name: 'Full Grooming', sessions: 12, price: '₹25,749', savings: 'Best Value', color: 'border-[#14d220] text-[#14d220]', details: 'Our most comprehensive package. Includes a therapeutic bath with specialized shampoos (anti-tick/flea, anti-rashes, or sensitive skin), deep conditioning, a professional blow-dry, and hair setting. We finish with complete hygiene care for eyes, ears, teeth, and nails.', validity: '16 months' },
        { name: 'Tick & Flea Combo', sessions: 3, price: '₹12,499', savings: 'Combo Saver', color: 'border-red-200 text-red-600', validity: '6 months' },
        { name: 'Medicated Combo', sessions: 3, price: '₹13,499', savings: 'Skin Care Saver', color: 'border-blue-200 text-blue-600', validity: '6 months' },
      ],
    }
  };

  const catSaverPackages = {
    short: [
      { sessions: 3, price: '₹4874', savings: 'Basic Saver', color: 'border-orange-200 text-orange-600', validity: '6 months' },
      { sessions: 6, price: '₹8999', savings: 'Value Bundle', color: 'border-orange-400 text-orange-700', validity: '12 months' },
      { sessions: 12, price: '₹13999', savings: 'Premium Saver', color: 'border-[#FF8200] text-[#FF8200]', validity: '16 months' },
      { name: 'Tick & Flea Combo', sessions: 3, price: '₹6,874', savings: 'Combo Saver', color: 'border-red-200 text-red-600', validity: '6 months' },
    ],
    long: [
      { sessions: 3, price: '₹6374', savings: 'Basic Saver', color: 'border-green-200 text-green-600', validity: '6 months' },
      { sessions: 6, price: '₹11999', savings: 'Value Bundle', color: 'border-green-400 text-green-700', validity: '12 months' },
      { sessions: 12, price: '₹20999', savings: 'Premium Saver', color: 'border-[#14d220] text-[#14d220]', validity: '16 months' },
      { name: 'Tick & Flea Combo', sessions: 3, price: '₹9,124', savings: 'Combo Saver', color: 'border-red-200 text-red-600', validity: '6 months' },
    ]
  };

  // Safe access to data
  const currentDeals = species === 'cat' 
    ? (coat ? catSaverPackages[coat] : [])
    : (species === 'dog' && coat && size ? dogSaverPackages[coat][size] : []);

  const dogSizeBreeds = {
    small: "Shih Tzu, Pug, Maltese, Beagle",
    medium: "Labrador, Golden Retriever, Cocker",
    large: "German Shepherd, Rottweiler, Husky",

  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-8 md:pt-12 pb-24 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Step Indicators */}
        <div className="flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-[#111811]/30 overflow-x-auto whitespace-nowrap pb-2">
          <button onClick={() => setStep(1)} className={`transition-colors ${step >= 1 ? 'text-[#FF8200]' : ''}`}>1. Species</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <button onClick={() => step > 2 && setStep(2)} className={`transition-colors ${step >= 2 ? 'text-[#FF8200]' : ''}`}>2. Plan Config</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className={step >= 3 ? 'text-[#FF8200]' : ''}>3. Bundles</span>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: SPECIES SELECTION */}
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12 }}
                className="inline-block p-5 bg-[#FF8200] text-white rounded-[2rem] mb-8 shadow-2xl"
              >
                <span className="material-symbols-outlined text-4xl md:text-5xl">savings</span>
              </motion.div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-12">Select <span className="text-[#FF8200]">Category.</span></h1>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => handleSpeciesSelect('dog')} 
                  className="bg-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border-4 border-transparent hover:border-[#FF8200] flex flex-col items-center gap-4 group transition-all"
                >
                  <span className="text-6xl md:text-8xl group-hover:rotate-12 transition-transform duration-500">🐶</span>
                  <span className="text-sm md:text-xl font-black uppercase tracking-widest text-[#111811]/40 group-hover:text-[#111811]">Dog Bundles</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => handleSpeciesSelect('cat')} 
                  className="bg-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border-4 border-transparent hover:border-[#14d220] flex flex-col items-center gap-4 group transition-all"
                >
                  <span className="text-6xl md:text-8xl group-hover:-rotate-12 transition-transform duration-500">🐱</span>
                  <span className="text-sm md:text-xl font-black uppercase tracking-widest text-[#111811]/40 group-hover:text-[#111811]">Cat Bundles</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CONFIGURATION */}
          {step === 2 && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
            >
              {species === 'dog' ? (
                <div className="max-w-4xl mx-auto">
                   <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter text-center">Customize <span className="text-[#FF8200]">Dog Plan</span></h2>
                   <p className="text-center text-black/30 font-bold mb-12">Select the exact size and coat type to reveal your savings.</p>
                   
                   <div className="grid md:grid-cols-2 gap-12">
                     <div className="bg-white p-8 rounded-[3rem] shadow-lg">
                        <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-[#FF8200]">1. Select Size</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {['small', 'medium', 'large'].map((s) => (
                             <button 
                                key={s} 
                                onClick={() => setSize(s as Size)} 
                                className={`p-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-left ${size === s ? 'bg-[#FF8200] text-white shadow-lg' : 'bg-[#f8f8f8] text-black/40 hover:bg-[#FF8200]/10'}`}
                             >
                               <div className="mb-1">{s}</div>
                               <div className="text-[8px] font-normal opacity-70 leading-tight">{dogSizeBreeds[s as keyof typeof dogSizeBreeds]}</div>
                             </button>
                          ))}
                        </div>
                     </div>

                     <div className="bg-white p-8 rounded-[3rem] shadow-lg flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-[#14d220]">2. Select Coat</h3>
                          <div className="space-y-3">
                            <button 
                              onClick={() => setCoat('short')} 
                              className={`w-full p-6 rounded-2xl font-black text-lg uppercase tracking-widest transition-all flex justify-between items-center ${coat === 'short' ? 'bg-[#14d220] text-white shadow-lg' : 'bg-[#f8f8f8] text-black/40 hover:bg-[#14d220]/10'}`}
                            >
                              Short Coat
                              {coat === 'short' && <span className="material-symbols-outlined">check_circle</span>}
                            </button>
                            <button 
                              onClick={() => setCoat('long')} 
                              className={`w-full p-6 rounded-2xl font-black text-lg uppercase tracking-widest transition-all flex justify-between items-center ${coat === 'long' ? 'bg-[#14d220] text-white shadow-lg' : 'bg-[#f8f8f8] text-black/40 hover:bg-[#14d220]/10'}`}
                            >
                              Long Coat
                              {coat === 'long' && <span className="material-symbols-outlined">check_circle</span>}
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          disabled={!size || !coat}
                          onClick={() => handleConfigSelect(size, coat)}
                          className="w-full mt-6 py-3 bg-[#111811] text-white rounded-xl font-black uppercase text-xs tracking-widest disabled:opacity-20 hover:scale-105 transition-all"
                        >
                          View Savings
                        </button>
                     </div>
                   </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">Customize <span className="text-[#14d220]">Cat Plan</span></h2>
                  <p className="text-center text-black/30 font-bold mb-12">Which coat type is your feline friend?</p>
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <motion.button whileHover={{ y: -5 }} onClick={() => handleConfigSelect(null, 'short')} className="bg-white p-12 rounded-[3.5rem] shadow-xl flex-1 border-4 border-transparent hover:border-[#14d220] text-center group">
                      <span className="text-2xl font-black block mb-2 group-hover:text-[#14d220]">Short Coat</span>
                      <span className="text-sm text-black/40 font-bold">e.g. Indie, Siamese</span>
                    </motion.button>
                    <motion.button whileHover={{ y: -5 }} onClick={() => handleConfigSelect(null, 'long')} className="bg-white p-12 rounded-[3.5rem] shadow-xl flex-1 border-4 border-transparent hover:border-[#FF8200] text-center group">
                      <span className="text-2xl font-black block mb-2 group-hover:text-[#FF8200]">Long Coat</span>
                      <span className="text-sm text-black/40 font-bold">e.g. Persian, Ragdoll</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: BUNDLES (MENU) */}
          {step === 3 && (
            <motion.div 
              key="step3" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-12"
            >
              <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#FF8200]">Bundles</h2>
                    <p className="text-sm font-black uppercase tracking-widest text-black/40 mt-2">
                      {species} • {size ? `${size} •` : ''} {coat} coat
                    </p>
                </div>
                <button onClick={reset} className="text-xs font-black uppercase text-[#111811] border-b-2 border-[#111811] pb-1 hover:text-[#FF8200] hover:border-[#FF8200] transition-colors">Start Over</button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {currentDeals.map((deal, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -10 }}
                    className={`bg-white p-8 md:p-10 rounded-[3rem] border-4 ${deal.color.split(' ')[0]} shadow-2xl flex flex-col h-full relative group`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-white shadow-sm border border-black/5 ${deal.color.split(' ')[1]}`}>
                        {deal.savings}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <div className={`text-5xl font-black tracking-tighter leading-none ${deal.color.split(' ')[1]}`}>
                        {deal.sessions}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-black/30 mt-1">Sessions</div>
                    </div>

                    <h3 className="text-xl font-black mb-2 leading-none tracking-tighter">{deal.name || 'Full Grooming'}</h3>
                    <p className="text-[10px] font-black uppercase text-[#111811]/30 tracking-widest mb-6">{deal.details || 'Professional Care'}</p>
                    
                    <div className="text-4xl font-black mb-8 text-[#111811]">{deal.price}</div>
                    
                    <div className="space-y-4 mb-10 flex-grow">
                      <div className="flex items-center gap-3 text-xs font-bold text-[#111811]/60">
                        <span className="material-symbols-outlined text-[#14d220] text-xl">check_circle</span>
                        Priority Scheduling
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-[#111811]/60">
                         <span className="material-symbols-outlined text-[#14d220] text-xl">check_circle</span>
                         Deep Conditioning
                       </div>
                    </div>

                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart({
                        id: `${species}-saver-${deal.name}-${deal.sessions || 'combo'}-${size || ''}-${coat}`,
                        name: `${species === 'dog' ? 'Dog' : 'Cat'} Saver: ${deal.name}`,
                        price: deal.price,
                        details: `${deal.sessions ? `${deal.sessions} Sessions` : 'Special Combo'} | ${size ? `${size.toUpperCase()} | ` : ''}${coat?.toUpperCase()} COAT`
                      })}
                      className="w-full py-2.5 md:py-3.5 bg-[#111811] text-white rounded-lg md:rounded-2xl font-black text-[8px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#FF8200] transition-colors shadow-xl"
                    >
                      <span className="material-symbols-outlined text-sm md:text-lg">add_shopping_cart</span>
                      Add Bundle
                    </motion.button>
                  </motion.div>
                ))}
              </div>


            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SuperSaverPage;
