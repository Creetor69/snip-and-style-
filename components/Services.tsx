
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Page } from '../App';

interface ServiceData {
  title: string;
  description: string;
  longDescription: string;
  price: string;
  originalPrice?: string;
  icon: string;
  image: string;
  benefits: string[];
  exclusions?: string[];
  isBundle?: boolean;
}

const ServiceCard: React.FC<{ 
  service: ServiceData;
  index: number;
  onClick: () => void;
}> = ({ service, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group bg-white rounded-[2rem] p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5 flex flex-col h-full cursor-pointer min-w-[240px] md:min-w-[280px] max-w-[320px] min-h-[400px]"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex items-center justify-between">
          <div className="size-10 bg-[#FF8200]/10 rounded-xl flex items-center justify-center text-[#FF8200] group-hover:bg-[#FF8200] group-hover:text-white transition-colors duration-500">
            <span className="material-symbols-outlined text-xl">{service.icon}</span>
          </div>
          <div className="flex flex-col items-end">
            {service.originalPrice && (
              <span className="text-[10px] font-black text-black/20 line-through leading-none mb-1">{service.originalPrice}</span>
            )}
            <div className="bg-[#f8f8f8] px-2 py-1 rounded-lg border border-black/5">
              <span className="text-[10px] font-black text-[#FF8200]">{service.price}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-lg font-black tracking-tighter leading-tight">{service.title}</h3>
          <p className="text-[10px] text-[#111811]/50 leading-relaxed font-medium line-clamp-2">{service.description}</p>
        </div>

        <div className="pt-4 border-t border-black/5 flex flex-col gap-2">
          {service.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-2 text-[8px] font-black uppercase tracking-widest text-[#111811]/40">
              <span className="material-symbols-outlined text-[#14d220] text-[12px] shrink-0">check_circle</span>
              <span className="leading-tight">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-[8px] font-black text-[#111811]/20 uppercase tracking-widest">Quick Care</span>
        <span className="text-[#FF8200] font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
          Details
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </span>
      </div>
    </motion.div>
  );
};

interface ServicesProps {
  onDetailClick: () => void;
  setActivePage?: (page: Page) => void;
}

const Services: React.FC<ServicesProps> = ({ onDetailClick, setActivePage }) => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const services: ServiceData[] = [
    {
      title: "Sanitary Clipping & Waterless Bath",
      description: "Combined hygiene trim, nail clipping, and waterless bath.",
      longDescription: "Our most popular quick care package. Combines essential sanitary clipping and hygiene trimming with nail clipping, ear cleaning, paw pad maintenance, and a refreshing waterless bath.",
      price: "₹499",
      originalPrice: "₹624",
      icon: "sanitizer",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
      benefits: ["Sanitary Clipping", "Waterless Bath", "Nail Clipping", "Ear Cleaning", "Paw Pad Trim"]
    },
    {
      title: "Furry Fresh",
      description: "Essential hygiene care for a clean and happy pet.",
      longDescription: "Our basic hygiene package designed for regular maintenance. Focuses on deep cleansing and essential hygiene without the full styling. Perfect for active pets who need a quick refresh.",
      price: "₹624",
      originalPrice: "₹812",
      icon: "soap",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
      benefits: ["Bath with Shampoo & Conditioner", "Professional Blow Dry", "Combing & Brushing", "Ear Cleaning", "Eye Cleaning"],
      exclusions: ["Sanitary Clipping", "Haircut", "Full Body Trimming"]
    },
    {
      title: "Special Package",
      description: "Enhanced care with extra hygiene and dental focus.",
      longDescription: "A step up from basic care, adding essential dental and paw hygiene. This package ensures your pet's breath is fresh and their paws are protected and trimmed.",
      price: "₹874",
      originalPrice: "₹1124",
      icon: "star",
      image: "https://images.unsplash.com/photo-1585846416120-3a7354ed7d65?q=80&w=800&auto=format&fit=crop",
      benefits: ["Bath with Shampoo & Conditioner", "Professional Blow Dry", "Combing & Brushing", "Ear Cleaning", "Eye Cleaning", "Mouth Spray", "Teeth Brushing", "Paws Trimming"]
    },
    {
      title: "Style Your Pet",
      description: "Professional full body trimming and face styling.",
      longDescription: "Our signature styling package. Includes a full body trim tailored to your breed's standard or your personal preference, plus meticulous face trimming for that perfect look.",
      price: "₹1749",
      originalPrice: "₹2249",
      icon: "styler",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
      benefits: ["Full Body Trimming", "Face Trimming", "Ear Cleaning (FREE)", "Eye Cleaning (FREE)", "Sanitary Clipping (FREE)", "Combing & Brushing (FREE)", "Mouth Spray (FREE)"]
    },
    {
      title: "Full Grooming",
      description: "The ultimate head-to-tail therapeutic experience.",
      longDescription: "Our most comprehensive package merging premium care and full service. We've replaced standard massage with a therapeutic medicated bath to ensure skin health while providing every possible grooming luxury.",
      price: "₹2499",
      originalPrice: "₹3249",
      icon: "content_cut",
      image: "https://images.unsplash.com/photo-1596272875729-ed2c21d50c46?q=80&w=800&auto=format&fit=crop",
      benefits: ["Bath with Shampoo & Conditioner", "Medicated Bath", "Hair Styling/Trimming", "Sanitary Trim", "Nail Clipping", "Ear Cleaning", "Eye Cleaning", "Paws Massage", "Combing & Brushing", "Deshedding Treatment"]
    },
    {
      title: "Paw Relaxation",
      description: "Deep cleaning and relaxing massage for paws.",
      longDescription: "Give your pet's paws the attention they deserve. Includes deep cleaning, gentle trimming of paw pad hair, and a soothing massage with pet-safe balm.",
      price: "₹124",
      originalPrice: "₹186",
      icon: "pets",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
      benefits: ["Deep Paw Cleaning", "Paw Pad Trimming", "Soothing Massage", "Moisturizing Balm"]
    },
    {
      title: "Super Saver Bundles",
      description: "Massive savings on multiple sessions. Best value for regular grooming.",
      longDescription: "Our Super Saver Bundles are designed for pet parents who want the best for their furry friends while saving big. Choose from 3, 6, or 12 session packages and enjoy priority scheduling, deep conditioning, and significant discounts compared to individual bookings.",
      price: "Save up to 15%",
      icon: "savings",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop",
      benefits: ["Priority Scheduling", "Massive Discounts", "Transferable Sessions", "Validity up to 16 Months", "Premium Care Always"],
      isBundle: true
    }
  ];

  // Auto-sliding logic - Smoother continuous scroll
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const speed = 0.5; // pixels per frame

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      lastTime = time;

      if (!isPaused && !selectedService && containerRef.current) {
        containerRef.current.scrollLeft += speed;
        
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        if (containerRef.current.scrollLeft >= maxScroll - 1) {
          containerRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, selectedService]);

  return (
    <section className="py-24 bg-[#f0f9f0]/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-[#FF8200] font-bold uppercase tracking-widest text-sm">Quick Services</h2>
            <h3 className="text-4xl md:text-5xl font-black max-w-xl tracking-tighter">
              Essential care <span className="text-[#14d220]">on the go.</span>
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onDetailClick}
              className="hidden md:flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#FF8200] hover:translate-x-1 transition-transform"
            >
              Full Styling Menu
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 2000);
          }}
          className="flex gap-6 overflow-x-auto pb-12 no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {/* Duplicate services for infinite loop effect */}
          {[...services, ...services].map((service, idx) => (
            <div key={idx} className="shrink-0">
              <ServiceCard 
                service={service} 
                index={idx} 
                onClick={() => setSelectedService(service)} 
              />
            </div>
          ))}
        </div>

        {/* Super Saver Prompt */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#111811] rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8200]/10 blur-[100px] -mr-32 -mt-32 group-hover:bg-[#FF8200]/20 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="size-20 md:size-24 bg-[#FF8200] rounded-[2rem] flex items-center justify-center shadow-xl rotate-3 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-4xl md:text-5xl">savings</span>
            </div>
            <div>
              <h4 className="text-2xl md:text-4xl font-black tracking-tighter mb-2 uppercase">Unlock Massive Savings</h4>
              <p className="text-[#f8f8f8]/60 font-bold max-w-md">Get up to 15% off with our Super Saver Bundles. Perfect for regular grooming and priority care.</p>
            </div>
          </div>
          <button 
            onClick={() => setActivePage?.('saver')}
            className="relative z-10 bg-[#FF8200] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl whitespace-nowrap"
          >
            Explore Bundles
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Minimal Header */}
              <div className="relative h-32 md:h-40 w-full shrink-0">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 size-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
                <div className="absolute bottom-4 left-6 md:bottom-5 md:left-6 text-white">
                  <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">{selectedService.title}</h2>
                </div>
              </div>

              {/* Minimal Content */}
              <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <p className="text-xl md:text-2xl font-black text-[#FF8200]">{selectedService.price}</p>
                  <div className="flex items-center gap-2 text-[#14d220] font-black text-[8px] uppercase tracking-widest bg-[#14d220]/5 px-3 py-1.5 rounded-full w-fit">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    Professional Care
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <p className="text-[#111811]/70 text-xs md:text-sm leading-relaxed font-medium">
                    {selectedService.longDescription}
                  </p>

                  <div>
                    <h4 className="text-[10px] font-black uppercase text-black/30 tracking-widest mb-3">What's Included</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedService.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-[#f8f8f8] rounded-xl border border-black/5">
                           <span className="material-symbols-outlined text-[#14d220] text-sm">check_circle</span>
                           <span className="text-[10px] font-bold text-[#111811]">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedService.exclusions && (
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-black/30 tracking-widest mb-3">Not Included</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedService.exclusions.map((exclusion, i) => (
                          <div key={i} className="flex items-center gap-2 p-3 bg-red-50/50 rounded-xl border border-red-100">
                             <span className="material-symbols-outlined text-red-400 text-sm">cancel</span>
                             <span className="text-[10px] font-bold text-red-900/40">{exclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Minimal Footer */}
              <div className="p-4 md:p-6 border-t border-black/5 bg-white shrink-0">
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    if (selectedService.isBundle && setActivePage) {
                      setActivePage('saver');
                    } else {
                      onDetailClick();
                    }
                  }}
                  className="w-full py-3 md:py-4 bg-[#111811] text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#FF8200] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {selectedService.isBundle ? 'View Bundles' : 'Book Now'}
                  <span className="material-symbols-outlined text-base md:text-lg">arrow_forward</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
