
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../App';

interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, onClose, onRemove }) => {
  const [step, setStep] = useState<'review' | 'details'>('review');
  const [details, setDetails] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    petName: '', 
    petBreed: '', 
    date: '', 
    time: '',
    address: ''
  });

  const isHomeService = cart.some(item => item.details?.toUpperCase().includes('HOME'));

  const totalAmount = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    return sum + price;
  }, 0);

  const checkoutToWhatsApp = () => {
    const cartText = cart.map(i => `- ${i.name} (${i.price})${i.details ? ` [${i.details}]` : ''}`).join('\n');
    const message = `*Booking Request from Snip & Style Website*\n\n` +
      `*Client Details:*\n` +
      `- Name: ${details.name}\n` +
      `- Phone: ${details.phone}\n` +
      `- Email: ${details.email}\n` +
      `${isHomeService ? `- Address: ${details.address}\n` : ''}\n` +
      `*Pet Details:*\n` +
      `- Name: ${details.petName}\n` +
      `- Breed: ${details.petBreed}\n\n` +
      `*Appointment:*\n` +
      `- Date: ${details.date}\n` +
      `- Time: ${details.time}\n\n` +
      `*Selected Services:*\n${cartText}\n\n` +
      `*Total Order Value: ₹${totalAmount.toLocaleString()}*\n\n` +
      `${isHomeService ? `*Note:* This is a Home Service request. Please confirm if address is within 12km range.\n\n` : ''}` +
      `Please confirm availability!`;
    
    window.open(`https://wa.me/9739887770?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl max-h-[95vh] bg-white shadow-2xl flex flex-col p-8 md:p-16 rounded-[3.5rem] md:rounded-[5rem] overflow-hidden"
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="size-16 rounded-[2rem] bg-[#FF8200] flex items-center justify-center text-white shadow-lg"><span className="material-symbols-outlined text-3xl">shopping_bag</span></motion.div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">Your Selection</h2>
          </div>
          <button onClick={onClose} className="size-16 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"><span className="material-symbols-outlined text-2xl">close</span></button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-10 pr-4 custom-scrollbar pb-10">
          <AnimatePresence mode="popLayout">
            {step === 'review' ? (
              cart.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cart.map((item, idx) => (
                      <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: idx * 0.05 }} className="p-5 bg-[#f8f8f8] rounded-3xl border border-black/5 group relative">
                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <h4 className="font-black text-lg text-[#111811] leading-tight mb-1">{item.name}</h4>
                            <p className="text-[10px] font-black uppercase text-[#FF8200] tracking-widest">{item.price}</p>
                            {item.details && <p className="text-[9px] text-[#111811]/40 font-bold mt-2 uppercase tracking-tighter italic">{item.details}</p>}
                          </div>
                          <button onClick={() => onRemove(item.id)} className="size-10 rounded-full bg-white text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm flex items-center justify-center"><span className="material-symbols-outlined text-xl">delete</span></button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 bg-[#111811] rounded-[2.5rem] text-white mt-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><span className="material-symbols-outlined text-6xl">payments</span></div>
                    <div className="relative z-10 flex justify-between items-center">
                      <div><span className="font-black uppercase text-[10px] tracking-[0.3em] text-white/40 block mb-1">Total Value</span><span className="text-4xl font-black">₹{totalAmount.toLocaleString()}</span></div>
                      <span className="text-xs font-black text-white/20 uppercase tracking-widest">Pricing in INR</span>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="size-32 bg-gray-50 rounded-full flex items-center justify-center mb-6"><span className="material-symbols-outlined text-6xl text-[#111811]/10">production_quantity_limits</span></div>
                  <p className="font-black text-[#111811]/20 uppercase tracking-[0.3em]">Your cart is currently empty</p>
                  <button onClick={onClose} className="mt-8 px-10 py-4 bg-[#FF8200] text-white rounded-full font-black text-sm uppercase tracking-widest">Browse Services</button>
                </motion.div>
              )
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-black uppercase text-xs tracking-[0.3em] text-[#FF8200] flex items-center gap-3"><span className="w-8 h-px bg-[#FF8200]/20" />User Details</h3>
                    <div><label className="text-[10px] font-black uppercase text-black/30 tracking-widest block mb-2">Full Name</label><input type="text" placeholder="Alex Walker" className="w-full bg-[#f8f8f8] p-5 rounded-2xl font-bold border-2 border-transparent focus:border-[#FF8200] outline-none" onChange={e => setDetails({...details, name: e.target.value})} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[10px] font-black uppercase text-black/30 tracking-widest block mb-2">Phone</label><input type="tel" placeholder="+91..." className="w-full bg-[#f8f8f8] p-5 rounded-2xl font-bold border-2 border-transparent focus:border-[#FF8200] outline-none" onChange={e => setDetails({...details, phone: e.target.value})} /></div>
                      <div><label className="text-[10px] font-black uppercase text-black/30 tracking-widest block mb-2">Email</label><input type="email" placeholder="alex@email.com" className="w-full bg-[#f8f8f8] p-5 rounded-2xl font-bold border-2 border-transparent focus:border-[#FF8200] outline-none" onChange={e => setDetails({...details, email: e.target.value})} /></div>
                    </div>
                    {isHomeService && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4">
                        <div className="bg-[#14d220]/5 p-8 rounded-[2.5rem] border-2 border-[#14d220]/20 space-y-4">
                          <div className="flex items-center gap-3 text-[#14d220]">
                            <span className="material-symbols-outlined">home_pin</span>
                            <label className="text-xs font-black uppercase tracking-widest">Home Service Address (Within 12km)</label>
                          </div>
                          <textarea 
                            placeholder="Please provide your full address with landmarks for our grooming team..." 
                            className="w-full bg-white p-6 rounded-2xl font-bold border-2 border-transparent focus:border-[#14d220] outline-none min-h-[120px] shadow-sm text-lg" 
                            onChange={e => setDetails({...details, address: e.target.value})}
                          />
                          <p className="text-[10px] font-black text-[#14d220]/60 uppercase tracking-widest">Note: Our team will confirm the distance before arrival.</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-black uppercase text-xs tracking-[0.3em] text-[#FF8200] flex items-center gap-3"><span className="w-8 h-px bg-[#FF8200]/20" />Pet Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[10px] font-black uppercase text-black/30 tracking-widest block mb-2">Pet Name</label><input type="text" placeholder="Coco" className="w-full bg-[#f8f8f8] p-5 rounded-2xl font-bold border-2 border-transparent focus:border-[#FF8200] outline-none" onChange={e => setDetails({...details, petName: e.target.value})} /></div>
                      <div><label className="text-[10px] font-black uppercase text-black/30 tracking-widest block mb-2">Breed</label><input type="text" placeholder="Beagle" className="w-full bg-[#f8f8f8] p-5 rounded-2xl font-bold border-2 border-transparent focus:border-[#FF8200] outline-none" onChange={e => setDetails({...details, petBreed: e.target.value})} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[10px] font-black uppercase text-black/30 tracking-widest block mb-2">Date</label><input type="date" className="w-full bg-[#f8f8f8] p-5 rounded-2xl font-bold border-2 border-transparent focus:border-[#FF8200] outline-none" onChange={e => setDetails({...details, date: e.target.value})} /></div>
                      <div><label className="text-[10px] font-black uppercase text-black/30 tracking-widest block mb-2">Time</label><input type="time" className="w-full bg-[#f8f8f8] p-5 rounded-2xl font-bold border-2 border-transparent focus:border-[#FF8200] outline-none" onChange={e => setDetails({...details, time: e.target.value})} /></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-[#14d220]/5 rounded-[2.5rem] border border-[#14d220]/10 flex justify-between items-center"><span className="text-xs font-black uppercase tracking-widest text-[#111811]/40">Confirmed Booking Total</span><span className="text-3xl font-black text-[#14d220] tracking-tighter">₹{totalAmount.toLocaleString()}</span></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row gap-4">
          {step === 'review' ? (
            <button disabled={cart.length === 0} onClick={() => setStep('details')} className="w-full py-4 md:py-6 bg-[#111811] text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-sm tracking-widest disabled:opacity-20 hover:bg-[#FF8200] transition-all shadow-2xl flex items-center justify-center gap-3">Continue to Booking<span className="material-symbols-outlined">arrow_forward</span></button>
          ) : (
            <div className="flex w-full gap-4">
              <button onClick={() => setStep('review')} className="size-14 md:size-20 bg-black/5 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center flex-shrink-0 hover:bg-black/10 transition-colors"><span className="material-symbols-outlined">arrow_back</span></button>
              <button onClick={checkoutToWhatsApp} className="flex-grow py-4 md:py-6 bg-[#14d220] text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-sm md:text-lg tracking-widest flex items-center justify-center gap-3 shadow-2xl transition-all"><span className="material-symbols-outlined text-2xl">chat</span>Book via WhatsApp</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CartModal;
