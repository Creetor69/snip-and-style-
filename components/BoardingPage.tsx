import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../App';

interface BoardingPageProps {
  addToCart: (item: CartItem) => void;
  setActivePage?: (page: string) => void;
}

const BoardingPage: React.FC<BoardingPageProps> = ({ addToCart }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Booking details
  const [petType, setPetType] = useState<'dog' | 'cat' | null>(null);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large' | null>(null);
  
  // Custom Date Picker State
  const today = new Date();
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [daysCount, setDaysCount] = useState<number>(0);
  
  // Gallery Lightbox
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Treat additions
  const [selectedToys, setSelectedToys] = useState<boolean>(false);

  // Simulated Loader for immersive experience
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 4;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Recalculate days count when check-in or check-out changes
  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const timeDiff = outDate.getTime() - inDate.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysCount(diffDays > 0 ? diffDays : 0);
    } else {
      setDaysCount(0);
    }
  }, [checkIn, checkOut]);

  // Set default dates to today and tomorrow
  useEffect(() => {
    const todayStr = today.toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    setCheckIn(todayStr);
    setCheckOut(tomorrowStr);
  }, []);

  const getPricePerDay = () => {
    if (petType === 'cat') return 899;
    if (selectedSize === 'small') return 799;
    if (selectedSize === 'medium') return 1199;
    if (selectedSize === 'large') return 1499;
    return 0;
  };

  const getSubtotal = () => {
    const rate = getPricePerDay();
    let sub = rate * daysCount;
    if (selectedToys) sub += 299;
    return sub;
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.18);
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleBookingConfirm = () => {
    if (!petType || (petType === 'dog' && !selectedSize)) return;
    if (daysCount <= 0) return;

    const detailsStr = `${petType === 'dog' ? `Dog (${selectedSize})` : 'Cat'} Stay • ${daysCount} Days (${checkIn} to ${checkOut})${selectedToys ? ' + Toy bundle' : ''}`;

    const boardingItem: CartItem = {
      id: `boarding-${Date.now()}`,
      name: `Luxury Boarding Suite`,
      price: `₹${getTotal().toLocaleString()}`,
      details: detailsStr,
      icon: 'hotel',
    };

    addToCart(boardingItem, true);
  };

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1541599540903-216a46ca1fc0?auto=format&fit=crop&q=80&w=800', title: 'Luxury Sleeper Room' },
    { src: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800', title: 'Open Sky Lawn Play' },
    { src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800', title: 'Daily Care Checkups' },
    { src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800', title: 'Cozy Cat Haven' },
    { src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800', title: 'Interactive Bath & Pamper' },
    { src: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800', title: 'Lounge Seating with Caretaker' }
  ];

  const experienceCards = [
    { title: '24/7 Supervision', desc: 'Continuous monitored care by trained wellness professionals.', icon: 'visibility' },
    { title: 'Daily Play & Exercise', desc: 'Indoors/outdoors playtime matching your dog\'s stamina.', icon: 'sports_tennis' },
    { title: 'Ultra-Soft Bedding', desc: 'Orthopedic memory foam mattresses with custom temperature controls.', icon: 'hotel' },
    { title: 'Hygienic Environment', desc: 'Medical-grade zero-dust air purification filtration.', icon: 'sanitizer' }
  ];

  const faqs = [
    { q: 'What vaccines are required for boarding?', a: 'Your pet must be up-to-date with DHPP/FVRCP, Rabies, and Bordetella vaccines at least 7 days prior to their arrival. This keeps all guests extremely safe.' },
    { q: 'Can I bring my pet\'s own food and toys?', a: 'Absolutely. We highly recommend bringing your pet\'s regular kibble to prevent digestive changes. Favorite safe chew toys and blankets are welcomed!' },
    { q: 'How often do caretakers send updates?', a: 'Daily! Every morning and evening, you will receive high-resolution photos and behavior report cards directly via WhatsApp or your inbox.' },
    { q: 'Is there a veterinarian on call 24/7?', a: 'Yes, Snip & Style is partnered with the city\'s top veterinary hospital located just 3 minutes away for absolute security.' }
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#FAF7F2] overflow-hidden">
        {/* Background Image with soft warm gradient blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-md transition-opacity duration-1000"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-[#FAF7F2]/50" />

        <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
          {/* Animated simple logo reveal */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="w-20 h-20 mb-6 bg-[#E8DCCB] rounded-full flex items-center justify-center shadow-lg border border-[#8B6B4A]/10 text-[#8B6B4A]"
          >
            <span className="material-symbols-outlined text-4xl">hotel</span>
          </motion.div>

          <h2 className="text-xl font-serif text-[#2B2B2B] uppercase tracking-wider mb-2">Preparing Your Pet’s Stay…</h2>
          <p className="text-xs text-[#666666] tracking-widest uppercase mb-6 font-semibold">Snip & Style Luxury Resort</p>

          <div className="w-64 h-1.5 bg-[#E8DCCB]/30 rounded-full overflow-hidden relative shadow-inner mb-4">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-[#8B6B4A] rounded-full shadow-[0_0_10px_rgba(139,107,74,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex gap-1 justify-center mt-2 opacity-40">
            <span className="material-symbols-outlined text-xs animate-bounce" style={{ animationDelay: '0ms' }}>pets</span>
            <span className="material-symbols-outlined text-xs animate-bounce" style={{ animationDelay: '200ms' }}>pets</span>
            <span className="material-symbols-outlined text-xs animate-bounce" style={{ animationDelay: '400ms' }}>pets</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#FAF7F2] text-[#2B2B2B] font-sans antialiased selection:bg-[#E8DCCB]"
    >
      {/* Dynamic Hero Section with Luxury Overlay */}
      <section className="relative min-h-[90vh] flex items-center px-6 py-12 md:py-24 overflow-hidden bg-[#FAF7F2]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1600" 
            alt="Luxury Pet Kennel resort interior" 
            className="w-full h-full object-cover opacity-15 filter sepia-[0.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="md:col-span-7 flex flex-col text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8DCCB]/50 border border-[#8B6B4A]/20 rounded-full w-fit">
              <span className="material-symbols-outlined text-xs text-[#8B6B4A]">verified</span>
              <span className="text-[9px] font-black tracking-widest uppercase text-[#8B6B4A]">High-End Pet Lodging</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2B2B2B] leading-[1.05] tracking-tight">
              Luxury Boarding <br />
              <span className="font-sans font-black italic text-[#C97B63] block mt-1">For Pets Who Deserve Comfort</span>
            </h1>

            <p className="text-sm md:text-base text-[#666666] leading-relaxed max-w-xl font-medium">
              Safe, clean, stress-free boarding with personalized care, 24/7 monitored stays, and temperature-controlled sleeping quarters for your beloved best friends.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <button 
                onClick={() => {
                  const element = document.getElementById('booking-experience');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#8B6B4A] hover:bg-[#2B2B2B] text-white hover:shadow-[0_4px_15px_rgba(43,43,43,0.15)] hover:-translate-y-0.5 transition-all font-black uppercase text-[10px] tracking-widest rounded-full"
              >
                Book Your Stay
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('included-overview');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 border border-[#8B6B4A]/30 bg-white/40 hover:bg-[#E8DCCB]/25 hover:border-[#8B6B4A] transition-all font-black uppercase text-[10px] tracking-widest rounded-full text-[#8B6B4A]"
              >
                Explore Amenities
              </button>
            </div>

            {/* Micro Elements */}
            <div className="flex gap-8 pt-6 border-t border-[#8B6B4A]/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-[#C97B63]">star</span>
                <div>
                  <p className="text-xs font-black leading-none">4.9★ Stars</p>
                  <p className="text-[9px] text-[#666666] uppercase tracking-wider mt-0.5">300+ Trusted Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-[#8B6B4A]">photo_camera</span>
                <div>
                  <p className="text-xs font-black leading-none">Daily Reports</p>
                  <p className="text-[9px] text-[#666666] uppercase tracking-wider mt-0.5">Dual Care Photo Updates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Images - Layered floating images */}
          <div className="md:col-span-5 relative hidden md:block h-[450px]">
            {/* Decorative warm circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#E8DCCB]/20 blur-3xl z-0" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-12 left-6 w-[240px] h-[300px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600" 
                alt="Golden retriever happy" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 0.5, ease: "easeInOut" }}
              className="absolute bottom-6 right-6 w-[200px] h-[240px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600" 
                alt="Fluffy luxury Persian cat" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Tiny Floating Badges */}
            <div className="absolute top-8 right-12 bg-white/90 backdrop-blur-md rounded-2xl py-2.5 px-4 shadow-xl border border-[#E8DCCB] z-30 animate-pulse text-left">
              <span className="text-[8px] font-black uppercase text-[#8B6B4A] tracking-wider block">Real-time update</span>
              <span className="text-xs font-black block">🐾 WhatsApp Snaps</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXPERIENCE STRIP */}
      <section className="py-12 bg-[#E8DCCB]/30 border-y border-[#8B6B4A]/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {experienceCards.map((card, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF7F2]/90 backdrop-blur-md p-6 rounded-[2rem] border border-[#E8DCCB] hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center select-none text-center"
              >
                <div className="size-11 bg-[#E8DCCB] group-hover:bg-[#8B6B4A] group-hover:text-white rounded-2xl flex items-center justify-center text-[#8B6B4A] transition-colors shadow-inner mb-4">
                  <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                </div>
                <h4 className="text-xs font-black tracking-wider uppercase mb-1">{card.title}</h4>
                <p className="text-[10px] text-[#666666] leading-relaxed font-semibold">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE BOOKING EXPERIENCE */}
      <section id="booking-experience" className="py-20 px-6 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1600")' }}>
        <div className="absolute inset-0 bg-[#FAF7F2]/95 backdrop-blur-sm z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C97B63]">Stay Reservation</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2B2B2B] leading-none mt-2">Build Your Resort Package</h2>
            <p className="text-xs font-bold text-[#666666] max-w-md mx-auto mt-3">Configure stays, dates, and extra comfort options seamlessly inside simple steps.</p>
          </div>

          {/* Core Interactive Card */}
          <div className="bg-[#FAF7F2] border border-[#E8DCCB] rounded-[3rem] p-6 md:p-12 shadow-2xl max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Booking Flow (Left 7 Cols) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Step 1: Choose Pet */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="size-6 rounded-full bg-[#E8DCCB] flex items-center justify-center text-[10px] font-black">1</span>
                  <h3 className="text-xs font-black tracking-widest uppercase font-sans">Choose Groom Guest</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* DOG CARD */}
                  <div 
                    onClick={() => {
                      setPetType('dog');
                      setSelectedSize('medium'); // default
                    }}
                    className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all group relative h-40 ${petType === 'dog' ? 'border-[#8B6B4A] shadow-[0_0_15px_rgba(139,107,74,0.3)]' : 'border-[#E8DCCB]/60 hover:border-[#8B6B4A]/50'}`}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400" 
                      alt="Dog stay" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white text-left">
                      <span className="text-[10px] font-sans font-black uppercase tracking-widest text-[#E8DCCB]">Stay Space</span>
                      <h4 className="text-lg font-black tracking-tighter uppercase leading-none">Dog Lodging</h4>
                    </div>
                  </div>

                  {/* CAT CARD */}
                  <div 
                    onClick={() => {
                      setPetType('cat');
                      setSelectedSize(null);
                    }}
                    className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all group relative h-40 ${petType === 'cat' ? 'border-[#C97B63] shadow-[0_0_15px_rgba(201,123,99,0.3)]' : 'border-[#E8DCCB]/60 hover:border-[#C97B63]/50'}`}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" 
                      alt="Cat stay" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white text-left">
                      <span className="text-[10px] font-sans font-black uppercase tracking-widest text-[#E8DCCB]">Stay Space</span>
                      <h4 className="text-lg font-black tracking-tighter uppercase leading-none">Cat Haven</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Select Size (If dog) */}
              {petType === 'dog' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="size-6 rounded-full bg-[#E8DCCB] flex items-center justify-center text-[10px] font-black">2</span>
                    <h3 className="text-xs font-black tracking-widest uppercase font-sans">Select Dog Size</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {(['small', 'medium', 'large'] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`p-4 rounded-xl border-2 transition-all text-left group flex flex-col ${selectedSize === sz ? 'bg-[#8B6B4A]/5 border-[#8B6B4A]' : 'border-[#E8DCCB]/40 hover:border-[#8B6B4A]/30 bg-white'}`}
                      >
                        <span className="material-symbols-outlined text-xl text-[#8B6B4A] mb-2">pets</span>
                        <span className="text-[10px] font-black uppercase tracking-wider block leading-none">{sz}</span>
                        <span className="text-[8px] text-[#666666] leading-relaxed mt-1 block">
                          {sz === 'small' ? '< 10kg Spaniels' : sz === 'medium' ? '10-25kg Labs' : '> 25kg Shepherds'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Dates */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="size-6 rounded-full bg-[#E8DCCB] flex items-center justify-center text-[10px] font-black">
                    {petType === 'dog' ? '3' : '2'}
                  </span>
                  <h3 className="text-xs font-black tracking-widest uppercase font-sans">Check-in / Check-out Duration</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 bg-white/70 p-6 border border-[#E8DCCB]/40 rounded-2xl">
                  {/* Checkin */}
                  <div className="flex flex-col text-left space-y-2">
                    <label className="text-[10px] font-black tracking-wider uppercase text-[#666666]">Arrival Date</label>
                    <input 
                      type="date" 
                      min={today.toISOString().split('T')[0]}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="p-3 bg-[#FAF7F2] border border-[#E8DCCB] rounded-xl outline-none text-xs font-bold w-full"
                    />
                  </div>

                  {/* Checkout */}
                  <div className="flex flex-col text-left space-y-2">
                    <label className="text-[10px] font-black tracking-wider uppercase text-[#666666]">Departure Date</label>
                    <input 
                      type="date"
                      min={checkIn || today.toISOString().split('T')[0]}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="p-3 bg-[#FAF7F2] border border-[#E8DCCB] rounded-xl outline-none text-xs font-bold w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Treats / Accessories Additions */}
              <div className="space-y-4 pt-1 border-t border-[#8B6B4A]/10">
                <h4 className="text-[10px] font-black tracking-widest uppercase text-[#8B6B4A]">Resort Extra Comfort Additions</h4>
                
                <div className="max-w-md">
                  {/* Toy Pack */}
                  <div 
                    onClick={() => setSelectedToys(!selectedToys)}
                    className={`p-4 border-2 rounded-2xl cursor-pointer flex gap-4 items-center group transition-all text-left ${selectedToys ? 'bg-[#8B6B4A]/5 border-[#8B6B4A]' : 'border-[#E8DCCB]/30 bg-white hover:border-[#8B6B4A]/30'}`}
                  >
                    <div className="size-10 bg-[#E8DCCB] rounded-xl flex items-center justify-center text-[#8B6B4A]">
                      <span className="material-symbols-outlined text-xl">sports_tennis</span>
                    </div>
                    <div>
                      <h5 className="text-[11px] font-black uppercase tracking-tight">Active Toy Bundle</h5>
                      <p className="text-[9px] text-[#666666] leading-tight">Chews, plushies & interactive toys (+₹299)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Estimator (Right 4 Cols) */}
            <div className="lg:col-span-4 sticky top-28 bg-[#FAF7F2] border border-[#E8DCCB] p-6 rounded-[2rem] shadow-xl text-left space-y-6">
              <div>
                <span className="text-[9px] font-black tracking-widest text-[#8B6B4A] uppercase block">Selected Suite Cabin</span>
                <h4 className="text-xl font-serif text-[#2B2B2B]">Stay Pricing breakdown</h4>
              </div>

              {/* Items in breakdown */}
              <div className="space-y-3.5 text-xs pb-4 border-b border-[#8B6B4A]/15 font-semibold text-[#2B2B2B]/75">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666]">Pet Type Suite:</span>
                  <span className="font-extrabold text-[#2B2B2B] capitalize">{petType || 'Not Selected'}</span>
                </div>
                {petType === 'dog' && selectedSize && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#666666]">Groom Size:</span>
                    <span className="font-extrabold text-[#2B2B2B] capitalize">{selectedSize}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-[#666666]">Resort Rate per Day:</span>
                  <span className="font-extrabold text-[#2B2B2B]">₹{getPricePerDay().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#666666]">Total Reserved Days:</span>
                  <span className="font-extrabold text-[#2B2B2B]">{daysCount} day(s)</span>
                </div>
                
                {/* Dynamically shown Extras */}
                {selectedToys && (
                  <div className="flex justify-between items-center font-bold text-[#8B6B4A]">
                    <span>🐾 Activ-Toy Bundle:</span>
                    <span>₹299</span>
                  </div>
                )}
              </div>

              {/* Subtotal, Tax, Final */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#666666]">
                  <span>Subtotal Stay:</span>
                  <span>₹{getSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>CGST + SGST (18%):</span>
                  <span>₹{getTax().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-end pt-3 border-t border-[#8B6B4A]/10 font-sans">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#666666] mb-1">Stay Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#2B2B2B] tracking-tighter">
                      ₹{getTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Premium Shimmer Button */}
              <button
                disabled={!petType || (petType === 'dog' && !selectedSize) || daysCount <= 0}
                onClick={handleBookingConfirm}
                className="w-full relative shadow-lg hover:shadow-xl hover:-translate-y-0.5 overflow-hidden active:translate-y-0 transition-all font-black uppercase text-[10px] tracking-widest bg-[#8B6B4A] hover:bg-[#2B2B2B] text-white py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 disabled:opacity-35 disabled:pointer-events-none group"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:animate-shimmer" style={{ animationDuration: '1.2s' }} />
                <span className="material-symbols-outlined text-base">hotel_class</span>
                Confirm & Add Stay to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ROOM GALLERY (Masonry Gallery) */}
      <section className="py-20 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8B6B4A]">Luxury Showcase</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2B2B2B] leading-none mt-2">Boarding Suite Gallery</h2>
            <p className="text-xs font-bold text-[#666666] max-w-sm mx-auto mt-3">Take a virtual visual walk through our top-rated cabins, lawns, and checkup facilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxImage(img.src)}
                className="group relative cursor-pointer overflow-hidden rounded-[2rem] shadow-xl border-4 border-white h-80 transition-all hover:shadow-2xl"
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 justify-between">
                  <div>
                    <span className="text-[9px] font-black text-[#E8DCCB] uppercase tracking-widest block mb-1">Cabin Room</span>
                    <h4 className="text-white text-md font-serif font-bold italic leading-none">{img.title}</h4>
                  </div>
                  <span className="material-symbols-outlined text-white text-lg bg-white/20 size-8 rounded-full flex items-center justify-center backdrop-blur-md">fullscreen</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT’S INCLUDED (Alternating Layouts) */}
      <section id="included-overview" className="py-20 px-6 border-t border-[#8B6B4A]/10 bg-[#E8DCCB]/15">
        <div className="max-w-5xl mx-auto space-y-24">
          
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8B6B4A]">Resort Amenities</span>
            <h3 className="text-3xl md:text-4xl font-serif mt-1">What\'s Always Included</h3>
          </div>

          {/* Amenities 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full h-72 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1541599540903-216a46ca1fc0?auto=format&fit=crop&q=80&w=600" 
                alt="Cozy dog sleep space" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left space-y-4">
              <span className="text-[10px] font-bold text-[#C97B63] tracking-widest uppercase">Space Cabin</span>
              <h4 className="text-2xl font-serif leading-none text-[#2B2B2B]">Quiet Private Quarters</h4>
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed font-semibold">
                Each dog or cat receives their own quiet, private luxury cabin. Quarters feature premium moisture-proof, zero-dust bedding, memory mattresses, and individual climate control adjusters to maintain temperature comfort through day and night.
              </p>
            </div>
          </div>

          {/* Amenities 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-4 md:order-1 order-2">
              <span className="text-[10px] font-bold text-[#8B6B4A] tracking-widest uppercase">Pet Feeding Care</span>
              <h4 className="text-2xl font-serif leading-none text-[#2B2B2B]">Customized Diet & Feeding Schedules</h4>
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed font-semibold">
                Our care specialists maintain strict feeding guidelines, feeding exactly on your regular home schedule. We provide filtered alkaline drinking water, sanitize bowls after every feed, and monitor behavior indices carefully during stays.
              </p>
            </div>
            <div className="w-full h-72 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white md:order-2 order-1">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600" 
                alt="Healthy pet meal prepare" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Amenities 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full h-72 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600" 
                alt="Pets running lawn outdoors" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left space-y-4">
              <span className="text-[10px] font-bold text-[#8B6B4A] tracking-widest uppercase">Pet Social Playtime</span>
              <h4 className="text-2xl font-serif leading-none text-[#2B2B2B]">Daily Play & Socialization Lawns</h4>
              <p className="text-xs md:text-sm text-[#666666] leading-relaxed font-semibold">
                Our boarding space features fully fenced open lawn sectors where guest pets run, fetch, and exercise. Play sessions are highly supervised, and social pets are only paired after careful temperament checks to ensure dynamic bonding.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: TRUST SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#FAF7F2] to-[#E8DCCB]/25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C97B63]">Parent Trust</span>
            <h2 className="text-3xl md:text-5xl font-serif mt-2 max-w-xl mx-auto">“Your Pet Should Feel Safe Even When You’re Away.”</h2>
            <p className="text-xs text-[#666666] font-bold max-w-sm mx-auto mt-4">Verified stays report cards given by hundreds of pet parents who travel with stress-free delight.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "I was extremely nervous leaving Bruno for my week-long corporate trip. Snip & Style sent video snippets twice a day of him rolling on the lawn. He came back super happy and smelling amazing!",
                parent: "Radhika K.",
                pet: "Golden Retriever Parent",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
              },
              {
                text: "The Persain cat cabin setup is very cozy! Cleo is a grumpy cat, but the caretakers here are so patient. They even brushed his coat and kept his feeding timing perfectly accurate.",
                parent: "Suresh M.",
                pet: "Persian Cat Parent",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
              },
              {
                text: "I board my beagle Cooper here whenever I head out of the city. He loves the caretakers more than me now, which is slightly concerning but shows how well they pamper their play guests!",
                parent: "Priya S.",
                pet: "Beagle Parent",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
              }
            ].map((test, i) => (
              <div 
                key={i}
                className="bg-white border border-[#E8DCCB] rounded-[2.5rem] p-8 shadow-xl text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-[#C97B63] mb-4 gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} className="material-symbols-outlined text-sm">star</span>
                    ))}
                  </div>
                  <p className="text-[11px] md:text-xs text-[#2B2B2B] leading-relaxed italic font-medium mb-6">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <div className="size-10 rounded-full overflow-hidden border border-[#8B6B4A]/20">
                    <img src={test.img} alt={test.parent} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-tight">{test.parent}</h5>
                    <p className="text-[9px] text-[#8B6B4A] uppercase tracking-wider">{test.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TREATS & TOYS CTA */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-[#8B6B4A] relative py-12 px-8 text-center text-white shadow-2xl">
          {/* Subtle floating background decorations */}
          <span className="material-symbols-outlined absolute top-6 left-6 opacity-10 text-6xl select-none animate-pulse">pets</span>
          <span className="material-symbols-outlined absolute bottom-6 right-6 opacity-10 text-6xl select-none animate-pulse">sports_tennis</span>

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#E8DCCB]">Resort Extras Selection</span>
            <h3 className="text-2xl md:text-3xl font-serif">Make Their Stay Even Happier</h3>
            <p className="text-xs text-white/80 leading-relaxed font-semibold">
              From organic dental chew ropes to cozy custom blanket bundles and active puzzle treat balls. Give them premium extras.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => {
                  const element = document.getElementById('booking-experience');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white text-[#8B6B4A] hover:bg-[#FAF7F2] transition-colors font-black uppercase text-[10px] tracking-widest rounded-full shadow-lg"
              >
                Customize Comfort Stays
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="py-20 px-6 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8B6B4A]">Boarding Knowledge</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2">Stays General FAQs</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E8DCCB] rounded-2xl overflow-hidden transition-all duration-350 shadow-sm hover:shadow-md"
              >
                <div 
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="flex items-center justify-between p-5 cursor-pointer text-left select-none gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xs text-[#8B6B4A]">help</span>
                    <h5 className="text-[11px] md:text-xs font-black uppercase tracking-tight text-[#2B2B2B]">{faq.q}</h5>
                  </div>
                  <span className="material-symbols-outlined text-lg text-[#8B6B4A] transition-transform duration-300" style={{ transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    keyboard_arrow_down
                  </span>
                </div>

                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-[#8B6B4A]/10 bg-[#FAF7F2]/50 text-left"
                    >
                      <p className="p-5 text-[11px] md:text-xs text-[#666666] leading-relaxed font-bold">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION (Bannered section) */}
      <section className="relative h-[400px] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1200" 
            alt="Happy pup look out window" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1px] z-10" />
        </div>

        <div className="relative z-20 max-w-xl text-white space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif leading-none tracking-tight">Ready To Reserve Your Pet’s Stay?</h2>
          <p className="text-xs text-white/80 max-w-sm mx-auto font-medium leading-relaxed">
            Stays are highly limited during holiday dates. Secure your suite, cabin, check-in schedules, and custom treats today.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => {
                const element = document.getElementById('booking-experience');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#E8DCCB] text-[#2B2B2B] hover:bg-white transition-colors font-black uppercase text-[10px] tracking-widest rounded-full shadow-xl"
            >
              Book Stay Now
            </button>
            <a 
              href="https://wa.me/919999999999" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-black uppercase text-[10px] tracking-widest rounded-full transition-colors backdrop-blur-md border border-white/25 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Custom Lightbox for Gallery Room */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 size-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/15"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl max-h-[85vh] overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightboxImage} alt="Room Showcase Lightbox" className="max-w-full max-h-[85vh] object-contain rounded-[2rem]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default BoardingPage;
