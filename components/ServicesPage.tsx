
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem, Page, PetType, SizeType, CoatType, AddToCartFn } from '../App';

type ServiceMode = 'walk-in' | 'home' | null;

interface ServicesPageProps {
  addToCart: AddToCartFn;
  setActivePage: (page: Page) => void;
  setSaverConfig: (config: {pet: PetType, size: SizeType, coat: CoatType} | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ 
  addToCart, 
  setActivePage, 
  setSaverConfig,
  searchQuery,
  setSearchQuery
}) => {
  const [step, setStep] = useState<number>(1);
  const [petType, setPetType] = useState<PetType>(null);
  const [size, setSize] = useState<SizeType>(null);
  const [coat, setCoat] = useState<CoatType>(null);
  const [serviceMode, setServiceMode] = useState<ServiceMode>(null);
  const [upsellItem, setUpsellItem] = useState<CartItem | null>(null);
  const [viewingService, setViewingService] = useState<CartItem | null>(null);
  const [showAddonsPage, setShowAddonsPage] = useState(false);
  const [showAreYouSure, setShowAreYouSure] = useState(false);

  const [selectedAddons, setSelectedAddons] = useState<CartItem[]>([]);

  const resetSelection = () => {
    setStep(1);
    setPetType(null);
    setSize(null);
    setCoat(null);
    setServiceMode(null);
    setUpsellItem(null);
    setViewingService(null);
    setShowAddonsPage(false);
    setSelectedAddons([]);
    setShowAreYouSure(false);
    setSearchQuery('');
  };

  const handlePetSelect = (type: PetType) => {
    setPetType(type);
    setStep(2);
  };

  const handleSizeSelect = (s: SizeType) => {
    setSize(s);
    setStep(3);
  };

  const handleCoatSelect = (c: CoatType) => {
    setCoat(c);
    setStep(4);
  };

  const handleServiceModeSelect = (mode: ServiceMode) => {
    setServiceMode(mode);
    setStep(5);
  };

  const calculateOriginalPrice = (currentPrice: string) => {
    const priceNum = parseInt(currentPrice.replace(/[^0-9]/g, '')) || 0;
    // Approximately 30% increase to match the 1799 -> 1399 ratio (1399 * 1.286 = 1799)
    const original = Math.round(priceNum * 1.3);
    return `₹${original.toLocaleString()}`;
  };

  const getFurryFreshPrice = () => {
    if (size === 'small') return '₹624';
    if (size === 'medium') return '₹749';
    if (size === 'large') return '₹874';
    return '₹499'; // Toy
  };

  const getSpecialPackagePrice = () => {
    if (size === 'small') return '₹749';
    if (size === 'medium') return '₹874';
    if (size === 'large') return '₹999';
    return '₹749';
  };

  const dogPackages = [
    { 
      id: 'dog-furry-fresh', 
      name: 'Furry Fresh', 
      price: getFurryFreshPrice(), 
      icon: 'soap', 
      desc: 'Essential hygiene care for a clean and happy pet.', 
      category: 'main',
      longDesc: "Our basic hygiene package designed for regular maintenance. Focuses on deep cleansing and essential hygiene without the full styling. Perfect for active pets who need a quick refresh.",
      benefits: ["Bath with Shampoo & Conditioner", "Professional Blow Dry", "Combing & Brushing", "Ear Cleaning", "Eye Cleaning"],
      exclusions: ["Sanitary Clipping", "Haircut", "Full Body Trimming"]
    },
    { 
      id: 'dog-special', 
      name: 'Special Package', 
      price: getSpecialPackagePrice(), 
      icon: 'star', 
      desc: 'Enhanced care with extra hygiene and dental focus.', 
      category: 'main',
      longDesc: "A step up from basic care, adding essential dental and paw hygiene. This package ensures your pet's breath is fresh and their paws are protected and trimmed.",
      benefits: ["Bath with Shampoo & Conditioner", "Professional Blow Dry", "Combing & Brushing", "Ear Cleaning", "Eye Cleaning", "Mouth Spray", "Teeth Brushing", "Paws Trimming"]
    },
    { 
      id: 'dog-style', 
      name: 'Style Your Pet', 
      price: '₹1,749', 
      icon: 'styler', 
      desc: 'Professional full body trimming and face styling.', 
      category: 'main',
      longDesc: "Our signature styling package. Includes a full body trim tailored to your breed's standard or your personal preference, plus meticulous face trimming for that perfect look.",
      benefits: ["Full Body Trimming", "Face Trimming", "Ear Cleaning (FREE)", "Eye Cleaning (FREE)", "Sanitary Clipping (FREE)", "Combing & Brushing (FREE)", "Mouth Spray (FREE)"]
    },
    { 
      id: 'dog-full-grooming', 
      name: 'Full Grooming', 
      price: '₹2,499', 
      icon: 'content_cut', 
      desc: 'The ultimate head-to-tail therapeutic experience.', 
      category: 'main',
      longDesc: "Our most comprehensive package merging premium care and full service. We've replaced standard massage with a therapeutic medicated bath to ensure skin health while providing every possible grooming luxury.",
      benefits: ["Bath with Shampoo & Conditioner", "Medicated Bath", "Hair Styling/Trimming", "Sanitary Trim", "Nail Clipping", "Ear Cleaning", "Eye Cleaning", "Combing & Brushing", "Deshedding Treatment"]
    },
  ];

  const dogAddons = [
    { id: 'addon-medicated', name: 'Medicated Bath', price: '₹249', icon: 'medical_services', desc: 'Therapeutic bath for skin irritations.', category: 'addon', benefits: ['Medicated Shampoo', 'Skin Soothing'] },
    { id: 'addon-massage', name: 'Body Massage', price: '₹499', icon: 'spa', desc: 'Relaxing full body massage.', category: 'addon', benefits: ['Full Body Massage', 'Muscle Relaxation'] },
    { id: 'addon-dry-bath', name: 'Waterless Bath', price: '₹374', icon: 'air', desc: 'Waterless refresh for quick cleaning.', category: 'addon', benefits: ['Waterless Bath', 'Coat Deodorizing'] },
    { id: 'addon-sanitary-maintenance', name: 'Sanitary & Maintenance', price: '₹499', icon: 'sanitizer', desc: 'Combined hygiene trim, nail clipping, and more.', category: 'addon', benefits: ['Hygiene Trim', 'Nail Clipping', 'Ear Cleaning', 'Paw Pad Trim'] },
    { id: 'addon-ear-eye', name: 'Ear & Eye Cleaning', price: '₹124', icon: 'visibility', desc: 'Gentle cleaning for sensitive areas.', category: 'addon', benefits: ['Ear Wax Removal', 'Eye Tear Stain Cleaning'] },
    { id: 'addon-deshedding', name: 'Deshedding', price: '₹624', icon: 'brush', desc: 'Reduces shedding significantly.', category: 'addon', benefits: ['Undercoat Removal', 'Special Deshedding Tool'] },
    { id: 'addon-dematting', name: 'Dematting', price: '₹499', icon: 'brush', desc: 'Pain-free removal of fur mats.', category: 'addon', benefits: ['Mat Removal', 'Coat Detangling'] },
    { id: 'addon-teeth', name: 'Teeth Brushing', price: '₹186', icon: 'dentistry', desc: 'Fresh breath and oral hygiene.', category: 'addon', benefits: ['Plaque Removal', 'Mouth Spray'] },
    { id: 'addon-paws-brush', name: 'Paw Relaxation', price: '₹124', icon: 'pets', desc: 'Deep cleaning for paws.', category: 'addon', benefits: ['Paw Cleaning', 'Paw Massage'] },
  ];

  const catPackages = [
    { 
      id: 'cat-furry-fresh', 
      name: 'Furry Fresh', 
      price: '₹749', 
      icon: 'soap', 
      desc: 'Essential hygiene care for a clean and happy pet.', 
      category: 'main',
      longDesc: "Our basic hygiene package designed for regular maintenance. Focuses on deep cleansing and essential hygiene without the full styling. Perfect for active pets who need a quick refresh.",
      benefits: ["Bath with Shampoo & Conditioner", "Professional Blow Dry", "Combing & Brushing", "Ear Cleaning", "Eye Cleaning"],
      exclusions: ["Sanitary Clipping", "Haircut", "Full Body Trimming"]
    },
    { 
      id: 'cat-special', 
      name: 'Special Package', 
      price: '₹874', 
      icon: 'star', 
      desc: 'Enhanced care with extra hygiene and dental focus.', 
      category: 'main',
      longDesc: "A step up from basic care, adding essential dental and paw hygiene. This package ensures your pet's breath is fresh and their paws are protected and trimmed.",
      benefits: ["Bath with Shampoo & Conditioner", "Professional Blow Dry", "Combing & Brushing", "Ear Cleaning", "Eye Cleaning", "Mouth Spray", "Teeth Brushing", "Paws Trimming"]
    },
    { 
      id: 'cat-style', 
      name: 'Style Your Pet', 
      price: '₹1,749', 
      icon: 'styler', 
      desc: 'Professional full body trimming and face styling.', 
      category: 'main',
      longDesc: "Our signature styling package. Includes a full body trim tailored to your breed's standard or your personal preference, plus meticulous face trimming for that perfect look.",
      benefits: ["Full Body Trimming", "Face Trimming", "Ear Cleaning (FREE)", "Eye Cleaning (FREE)", "Sanitary Clipping (FREE)", "Combing & Brushing (FREE)", "Mouth Spray (FREE)"]
    },
    { 
      id: 'cat-full', 
      name: 'Full Grooming', 
      price: '₹2,499',
      icon: 'content_cut', 
      desc: 'Full hygiene, deshedding and cleaning.', 
      category: 'main',
      longDesc: "Complete grooming for cats. This includes a lion cut or comb cut if requested/applicable, along with a full bath and hygiene care to keep your feline friend fresh and mat-free.",
      benefits: ["Haircut (Lion/Comb cut)", "Bath with Shampoo & Conditioner", "Nail Clipping", "Ear Cleaning", "Eye Cleaning", "Mat Removal", "Deshedding Treatment"]
    },
  ];

  const catAddons = [
    { id: 'cat-addon-medicated', name: 'Medicated Bath', price: '₹249', icon: 'medical_services', desc: 'Therapeutic bath for skin irritations.', category: 'addon', benefits: ['Medicated Shampoo', 'Skin Soothing'] },
    { id: 'cat-addon-massage', name: 'Body Massage', price: '₹499', icon: 'spa', desc: 'Relaxing full body massage.', category: 'addon', benefits: ['Full Body Massage', 'Muscle Relaxation'] },
    { id: 'cat-addon-dry-bath', name: 'Waterless Bath', price: '₹374', icon: 'air', desc: 'Waterless refresh for quick cleaning.', category: 'addon', benefits: ['Waterless Bath', 'Coat Deodorizing'] },
    { id: 'cat-addon-sanitary-maintenance', name: 'Sanitary & Maintenance', price: '₹499', icon: 'sanitizer', desc: 'Combined hygiene trim, nail clipping, and more.', category: 'addon', benefits: ['Hygiene Trim', 'Nail Clipping', 'Ear Cleaning', 'Paw Pad Trim'] },
    { id: 'cat-addon-ear-eye', name: 'Ear & Eye Cleaning', price: '₹124', icon: 'visibility', desc: 'Gentle cleaning for sensitive areas.', category: 'addon', benefits: ['Ear Wax Removal', 'Eye Tear Stain Cleaning'] },
    { id: 'cat-addon-deshedding', name: 'Deshedding', price: '₹624', icon: 'brush', desc: 'Reduces shedding significantly.', category: 'addon', benefits: ['Undercoat Removal', 'Special Deshedding Tool'] },
    { id: 'cat-addon-dematting', name: 'Dematting', price: '₹499', icon: 'brush', desc: 'Pain-free removal of fur mats.', category: 'addon', benefits: ['Mat Removal', 'Coat Detangling'] },
    { id: 'cat-addon-teeth', name: 'Teeth Brushing', price: '₹186', icon: 'dentistry', desc: 'Fresh breath and oral hygiene.', category: 'addon', benefits: ['Plaque Removal', 'Mouth Spray'] },
    { id: 'cat-addon-paws-brush', name: 'Paw Relaxation', price: '₹124', icon: 'pets', desc: 'Deep cleaning for paws.', category: 'addon', benefits: ['Paw Cleaning', 'Paw Massage'] },
  ];

  const quickServices = [
    {
      id: 'quick-sanitary-maintenance',
      name: 'Sanitary & Maintenance Care',
      price: '₹499',
      icon: 'sanitizer',
      desc: 'Combined hygiene trim, nail clipping, ear cleaning, and paw pad trim.',
      benefits: ['Hygiene Trim', 'Nail Clipping', 'Ear Cleaning', 'Paw Pad Trim']
    },
    {
      id: 'quick-face',
      name: 'Face Trim',
      price: serviceMode === 'walk-in' ? '₹499' : '₹625',
      icon: 'face_retouching_natural',
      desc: 'Neatens hair around eyes and mouth for a clean look.',
      benefits: ['Eye Area Trim', 'Mouth Area Trim', 'Beard Shaping']
    },
    {
      id: 'quick-dry',
      name: 'Waterless Bath',
      price: serviceMode === 'walk-in' ? '₹749' : '₹938',
      icon: 'air',
      desc: 'Waterless bath & brush-out to refresh the coat.',
      benefits: ['Waterless Bath', 'Deep Brushing', 'Deodorizing Spray']
    },
  ];

  const dogSizeBreeds = {
    small: "Shih Tzu, Pug, Maltese, Beagle, Frenchie",
    medium: "Labrador, Golden Retriever, Cocker Spaniel",
    large: "German Shepherd, Rottweiler, Husky",
  };

  const currentMain = (petType === 'dog' ? dogPackages : catPackages).filter(pkg => {
    if (serviceMode === 'walk-in' && pkg.id === 'dog-tick-combo') return false;
    if (searchQuery && !pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) && !pkg.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  const currentAddons = (petType === 'dog' ? dogAddons : catAddons).filter(a => {
    if (a.hide) return false;
    if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase()) && !a.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  const filteredQuickServices = quickServices.filter(svc => {
    if (searchQuery && !svc.name.toLowerCase().includes(searchQuery.toLowerCase()) && !svc.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleServiceSelection = (pkg: CartItem) => {
    setUpsellItem(pkg);
    setSelectedAddons([]);
    setViewingService(null); // Close detail modal if open
  };

  const toggleAddon = (addon: CartItem) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) return prev.filter(a => a.id !== addon.id);
      return [...prev, addon];
    });
  };

  const confirmMainAndAddons = (mainPkg: CartItem, addons: CartItem[], showCart: boolean = true) => {
    if (addons.length === 0 && !showAreYouSure) {
      setShowAreYouSure(true);
      return;
    }

    // Add main package
    addToCart({ 
      id: `${mainPkg.id}-${Math.random()}`, 
      name: mainPkg.name, 
      price: mainPkg.price,
      details: `${petType?.toUpperCase()} • ${size?.toUpperCase() || ''} • ${coat?.toUpperCase() || ''} • ${serviceMode?.toUpperCase()}`
    }, showCart);

    // Add addons
    addons.forEach(addon => {
      addToCart({
        id: `${addon.id}-${Math.random()}`,
        name: `${addon.name} (Add-on)`,
        price: addon.price,
        details: `Attached to ${mainPkg.name} • ${serviceMode?.toUpperCase()}`
      }, false); // Never show cart for each addon
    });

    setUpsellItem(null);
    setShowAreYouSure(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-12 md:pt-20 pb-32 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Step Indicators */}
        <div className="flex items-center gap-2 mb-16 text-[10px] font-black uppercase tracking-[0.2em] text-[#111811]/30 overflow-x-auto whitespace-nowrap pb-2">
          <button onClick={() => setStep(1)} className={`transition-colors ${step >= 1 ? 'text-[#FF8200]' : ''}`}>1. Species</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <button onClick={() => step > 2 && setStep(2)} className={`transition-colors ${step >= 2 ? 'text-[#FF8200]' : ''}`}>2. Breed Selection</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <button onClick={() => step > 4 && setStep(4)} className={`transition-colors ${step >= 4 ? 'text-[#FF8200]' : ''}`}>3. Service Mode</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className={step >= 5 ? 'text-[#FF8200]' : ''}>4. Menu</span>
        </div>

        <AnimatePresence mode="wait">
          {viewingService ? (
            <motion.div 
              key="full-service-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[3rem] shadow-2xl overflow-hidden min-h-[80vh] flex flex-col relative"
            >
              {/* Navigation Bar */}
              <div className="p-6 md:p-10 border-b border-black/5 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
                <button 
                  onClick={() => setViewingService(null)}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#111811]/40 hover:text-[#FF8200] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Back
                </button>
                <div className="flex items-center gap-6">
                   <div className="hidden md:flex flex-col items-end">
                      <span className="text-[10px] font-black text-[#FF8200] uppercase tracking-widest">Premium Care</span>
                      <span className="text-xl font-black tracking-tighter">{viewingService.name}</span>
                   </div>
                   <button 
                    onClick={() => setViewingService(null)}
                    className="size-12 bg-[#111811] text-white rounded-full flex items-center justify-center hover:bg-[#FF8200] transition-colors shadow-lg"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-grow p-6 md:p-16 space-y-16">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-10">
                    <div className="size-20 bg-[#FF8200]/10 rounded-3xl flex items-center justify-center text-[#FF8200]">
                      <span className="material-symbols-outlined text-5xl">{viewingService.icon}</span>
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8] mb-6">{viewingService.name}</h1>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl md:text-5xl font-black tracking-tighter text-[#FF8200]">{viewingService.price}</span>
                        <span className="text-sm md:text-lg font-black text-black/20 line-through">{calculateOriginalPrice(viewingService.price)}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-black/30 tracking-[0.2em]">About This Service</h4>
                      <p className="text-[#111811]/70 text-lg md:text-2xl leading-relaxed font-medium">{viewingService.longDesc}</p>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-black/30 tracking-[0.2em] mb-8">What's Included</h4>
                      <div className="grid gap-4">
                        {viewingService.benefits?.map((b: string, i: number) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-5 bg-[#f8f8f8] rounded-2xl border border-black/5 group hover:bg-white hover:shadow-xl transition-all"
                          >
                            <span className="material-symbols-outlined text-[#14d220] text-2xl group-hover:scale-110 transition-transform">check_circle</span>
                            <span className="text-base font-black text-[#111811]">{b}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {viewingService.exclusions && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-black/30 tracking-[0.2em] mb-8">Not Included</h4>
                        <div className="grid gap-4">
                          {viewingService.exclusions.map((e: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 p-5 bg-red-50/30 rounded-2xl border border-red-100/50">
                              <span className="material-symbols-outlined text-red-400 text-2xl">cancel</span>
                              <span className="text-base font-black text-red-900/30">{e}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add-ons Section at the bottom of Service Page */}
                <div className="pt-20 border-t border-black/5">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Add-ons</h3>
                      <p className="text-xs font-bold text-black/30 mt-2">Enhance your session with these signature treatments.</p>
                    </div>
                    <button 
                      onClick={() => setShowAddonsPage(true)}
                      className="px-5.5 py-3.5 bg-[#111811] text-white rounded-full font-black uppercase text-[8px] tracking-widest hover:bg-[#FF8200] transition-all shadow-lg"
                    >
                      View All Add-ons
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentAddons.slice(0, 3).map((addon, i) => (
                      <motion.div
                        key={addon.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#f8f8f8] p-6 rounded-[2.5rem] border border-black/5 hover:bg-white hover:shadow-2xl transition-all group"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="size-12 bg-white rounded-xl flex items-center justify-center text-[#FF8200] shadow-sm group-hover:bg-[#FF8200] group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">{addon.icon}</span>
                          </div>
                          <span className="text-xl font-black tracking-tighter">{addon.price}</span>
                        </div>
                        <h4 className="font-black text-lg mb-2">{addon.name}</h4>
                        <p className="text-[10px] font-bold text-black/40 mb-6">{addon.desc}</p>
                        <button 
                          onClick={() => toggleAddon(addon)}
                          className={`w-full py-2.5 rounded-xl font-black uppercase text-[8px] tracking-widest transition-all ${
                            selectedAddons.some(a => a.id === addon.id)
                              ? 'bg-[#14d220] text-white'
                              : 'bg-white text-[#111811] border border-black/5 hover:bg-[#111811] hover:text-white'
                          }`}
                        >
                          {selectedAddons.some(a => a.id === addon.id) ? 'Added' : 'Add'}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Footer Action */}
              <div className="p-6 md:p-10 border-t border-black/5 bg-white/80 backdrop-blur-md sticky bottom-0 z-20">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <span className="text-[10px] font-black text-black/30 uppercase tracking-widest block mb-1">Total Estimate</span>
                    <span className="text-3xl md:text-5xl font-black tracking-tighter">
                      ₹{(parseInt(viewingService.price.replace(/[^0-9]/g, '')) + selectedAddons.reduce((acc, curr) => acc + parseInt(curr.price.replace(/[^0-9]/g, '')), 0)).toLocaleString()}
                    </span>
                  </div>
                  <button 
                    onClick={() => confirmMainAndAddons(viewingService, selectedAddons)}
                    className="w-full md:w-auto px-10 py-4.5 bg-[#111811] text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#FF8200] transition-all shadow-2xl flex items-center justify-center gap-2"
                  >
                    Confirm Booking <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : showAddonsPage ? (
            <motion.div 
              key="addons-page"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[3rem] shadow-2xl overflow-hidden min-h-[80vh] flex flex-col"
            >
              <div className="p-6 md:p-10 border-b border-black/5 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
                <button 
                  onClick={() => setShowAddonsPage(false)}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#111811]/40 hover:text-[#FF8200] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Back to Service
                </button>
                <h2 className="text-2xl font-black tracking-tighter uppercase">Add-ons Menu</h2>
                <button 
                  onClick={() => setShowAddonsPage(false)}
                  className="size-12 bg-[#111811] text-white rounded-full flex items-center justify-center hover:bg-[#FF8200] transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 md:p-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentAddons.map((addon, i) => (
                  <motion.div
                    key={addon.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-8 rounded-[3rem] border-2 transition-all group ${
                      selectedAddons.some(a => a.id === addon.id)
                        ? 'bg-[#14d220]/5 border-[#14d220] shadow-xl'
                        : 'bg-[#f8f8f8] border-transparent hover:bg-white hover:shadow-2xl hover:border-[#FF8200]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className={`size-16 rounded-2xl flex items-center justify-center transition-colors ${
                        selectedAddons.some(a => a.id === addon.id)
                          ? 'bg-[#14d220] text-white'
                          : 'bg-white text-[#FF8200] shadow-sm group-hover:bg-[#FF8200] group-hover:text-white'
                      }`}>
                        <span className="material-symbols-outlined text-3xl">{addon.icon}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-black/20 line-through block">{calculateOriginalPrice(addon.price)}</span>
                        <span className="text-2xl font-black tracking-tighter">{addon.price}</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-black tracking-tighter mb-3">{addon.name}</h4>
                    <p className="text-xs font-bold text-black/40 mb-8 leading-relaxed">{addon.desc}</p>
                    <button 
                      onClick={() => toggleAddon(addon)}
                      className={`w-full py-3.5 rounded-xl font-black uppercase text-[8px] tracking-widest transition-all shadow-lg ${
                        selectedAddons.some(a => a.id === addon.id)
                          ? 'bg-[#14d220] text-white'
                          : 'bg-[#111811] text-white hover:bg-[#FF8200]'
                      }`}
                    >
                      {selectedAddons.some(a => a.id === addon.id) ? 'Selected' : 'Add to Session'}
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 border-t border-black/5 bg-[#f8f8f8] text-center">
                <button 
                  onClick={() => setShowAddonsPage(false)}
                  className="px-10 py-4.5 bg-[#111811] text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#FF8200] transition-all shadow-2xl"
                >
                  Done Selecting Add-ons
                </button>
              </div>
            </motion.div>
          ) : step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
              <h2 className="text-3xl md:text-6xl font-black mb-12 tracking-tighter">Choose your <span className="text-[#FF8200]">Bestie.</span></h2>
              <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handlePetSelect('dog')} className="bg-white p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] shadow-xl border-4 border-transparent hover:border-[#FF8200] flex flex-col items-center gap-4 group transition-all">
                  <span className="text-6xl md:text-9xl group-hover:rotate-12 transition-transform duration-500">🐶</span>
                  <span className="text-xs md:text-xl font-black uppercase tracking-widest text-[#111811]/40 group-hover:text-[#111811]">Dogs</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handlePetSelect('cat')} className="bg-white p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] shadow-xl border-4 border-transparent hover:border-[#14d220] flex flex-col items-center gap-4 group transition-all">
                  <span className="text-6xl md:text-9xl group-hover:-rotate-12 transition-transform duration-500">🐱</span>
                  <span className="text-xs md:text-xl font-black uppercase tracking-widest text-[#111811]/40 group-hover:text-[#111811]">Cats</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {petType === 'dog' ? (
                <div className="max-w-3xl mx-auto text-center">
                   <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">Which <span className="text-[#FF8200]">Breed</span> Size?</h2>
                   <p className="text-black/30 font-bold mb-12 text-sm">Selection adjusts pricing for efficiency and care.</p>
                   <div className="grid grid-cols-2 gap-4">
                     {(['small', 'medium', 'large'] as SizeType[]).map((s) => (
                       <button key={s} onClick={() => handleSizeSelect(s)} className="bg-white p-4 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-lg border-2 border-transparent hover:border-[#FF8200] transition-all text-left group">
                         <span className="text-lg md:text-2xl font-black uppercase text-[#FF8200] block mb-2">{s}</span>
                         <span className="text-[10px] font-bold text-black/40 leading-tight block h-8 overflow-hidden">{dogSizeBreeds[s as keyof typeof dogSizeBreeds]}</span>
                       </button>
                     ))}
                   </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">Choose the <span className="text-[#14d220]">Breed</span> Coat</h2>
                  <p className="text-black/30 font-bold mb-12 text-sm">Precision tools for different textures.</p>
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <motion.button whileHover={{ y: -5 }} onClick={() => handleCoatSelect('short')} className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl flex-1 border-4 border-transparent hover:border-[#14d220] text-center group">
                      <span className="text-xl md:text-2xl font-black block mb-2 group-hover:text-[#14d220]">Short Coat</span>
                      <span className="text-[10px] md:text-sm text-black/40 font-bold">e.g. <span className="text-black/80 underline decoration-[#14d220]/30">Indie Cats</span>, Siamese</span>
                    </motion.button>
                    <motion.button whileHover={{ y: -5 }} onClick={() => handleCoatSelect('long')} className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl flex-1 border-4 border-transparent hover:border-[#FF8200] text-center group">
                      <span className="text-xl md:text-2xl font-black block mb-2 group-hover:text-[#FF8200]">Long Coat</span>
                      <span className="text-[10px] md:text-sm text-black/40 font-bold">e.g. <span className="text-black/80 underline decoration-[#FF8200]/30">Persian Cats</span>, Ragdoll</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
               <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tighter">Texture <span className="text-[#FF8200]">Standard</span></h2>
               <div className="flex gap-6 justify-center">
                <button onClick={() => handleCoatSelect('short')} className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl flex-1 border-2 border-transparent hover:border-[#FF8200] font-black text-xl md:text-2xl uppercase hover:scale-105 transition-all">Short Coat</button>
                <button onClick={() => handleCoatSelect('long')} className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl flex-1 border-2 border-transparent hover:border-[#FF8200] font-black text-xl md:text-2xl uppercase hover:scale-105 transition-all">Long Coat</button>
               </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
              <h2 className="text-3xl md:text-6xl font-black mb-12 tracking-tighter">Choose <span className="text-[#FF8200]">Service Mode.</span></h2>
              <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => handleServiceModeSelect('walk-in')} 
                  className="bg-white p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] shadow-xl border-4 border-transparent hover:border-[#FF8200] flex flex-col items-center gap-4 group transition-all"
                >
                  <span className="material-symbols-outlined text-5xl md:text-8xl text-[#FF8200] group-hover:scale-110 transition-transform duration-500">store</span>
                  <span className="text-xs md:text-xl font-black uppercase tracking-widest text-[#111811]/40 group-hover:text-[#111811]">Walk-in</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => handleServiceModeSelect('home')} 
                  className="bg-white p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] shadow-xl border-4 border-transparent hover:border-[#14d220] flex flex-col items-center gap-4 group transition-all"
                >
                  <span className="material-symbols-outlined text-5xl md:text-8xl text-[#14d220] group-hover:scale-110 transition-transform duration-500">home</span>
                  <div className="text-center">
                    <span className="text-xs md:text-xl font-black uppercase tracking-widest text-[#111811]/40 group-hover:text-[#111811] block">Home Service</span>
                    <span className="text-[10px] font-black text-[#14d220] uppercase tracking-widest mt-1 block">Within 12km Only</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-black/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">The Menu</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mt-2">Tailored for your {petType} ({size || coat}) • {serviceMode}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <button onClick={resetSelection} className="text-xs font-black uppercase text-[#FF8200] border-b-2 border-[#FF8200] pb-1 whitespace-nowrap hover:text-[#111811] hover:border-[#111811] transition-colors">Reset All</button>
                  </div>
                </div>
              </div>

              {/* Super Saver Prompt */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FF8200] p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-xl"
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="size-10 md:size-14 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl md:text-3xl">savings</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-black tracking-tighter leading-none">Want even bigger savings?</h3>
                    <p className="text-[10px] md:text-sm font-bold opacity-80 mt-1">Check out our Super Saver Bundles for multiple sessions!</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSaverConfig({ pet: petType, size, coat });
                    setActivePage('saver');
                  }}
                  className="w-full md:w-auto bg-white text-[#FF8200] px-6 py-3 md:px-8 md:py-4 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest hover:scale-105 transition-all shadow-lg whitespace-nowrap"
                >
                  View Bundles
                </button>
              </motion.div>

              {/* Quick Services First */}
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-6 text-center text-[#111811]/60">Quick Services</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredQuickServices.map((svc, i) => (
                    <motion.div
                      key={svc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-[2.5rem] shadow-lg flex items-center justify-between border-2 border-transparent hover:border-[#14d220] transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="size-14 bg-[#14d220]/10 rounded-2xl flex items-center justify-center text-[#14d220] group-hover:bg-[#14d220] group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-3xl">{svc.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-black text-xl tracking-tighter">{svc.name}</h4>
                          <p className="text-xs font-bold text-black/40 mb-3">{svc.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {svc.benefits?.map((b, bi) => (
                              <div key={bi} className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-[#14d220]">
                                <span className="material-symbols-outlined text-[10px]">check_circle</span>
                                {b}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[10px] font-black text-black/20 line-through block">₹{Math.round(parseInt(svc.price.replace('₹', '')) * 1.25)}</span>
                          <span className="text-2xl font-black tracking-tighter">{svc.price}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleServiceSelection({
                            id: `${svc.id}-${Math.random()}`,
                            name: svc.name,
                            price: svc.price,
                            details: `Quick Service`,
                            icon: svc.icon,
                            benefits: svc.benefits
                          })}
                          className="size-10 md:size-12 bg-[#111811] text-white rounded-full flex items-center justify-center hover:bg-[#14d220] transition-colors shadow-md"
                        >
                          <span className="material-symbols-outlined text-lg md:text-xl">add</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main Packages */}
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-6 text-center text-[#111811]/60">Main Packages</h3>
                <div className="grid gap-6">
                  {currentMain.map((pkg, i) => (
                    <motion.div 
                      key={pkg.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (quickServices.length + i) * 0.1 }}
                      onClick={() => setViewingService(pkg)}
                      className="bg-white p-6 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between border-2 border-transparent hover:border-[#FF8200] transition-all gap-6 cursor-pointer group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="size-16 md:size-20 bg-[#FF8200]/10 rounded-[1.5rem] md:rounded-[1.8rem] flex items-center justify-center text-[#FF8200] group-hover:bg-[#FF8200] group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-3xl md:text-4xl">{pkg.icon}</span>
                        </div>
                        <div>
                          <h4 className={`font-black tracking-tighter ${pkg.name === 'Full Grooming' ? 'text-lg md:text-xl' : 'text-xl md:text-3xl'}`}>{pkg.name}</h4>
                          <p className="text-[11px] md:text-sm font-bold text-black/40 leading-relaxed max-w-xs">{pkg.desc}</p>
                          
                          {/* Show benefits in list view */}
                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                            {pkg.benefits.map((b, bi) => (
                              <div key={bi} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-black/30">
                                <span className="material-symbols-outlined text-[#14d220] text-xs">check_circle</span>
                                {b}
                              </div>
                            ))}
                          </div>

                          <span className="text-[9px] md:text-[10px] font-black text-[#FF8200] uppercase tracking-widest mt-4 block underline">View Details</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-black/5">
                        <div className="text-right">
                          <span className="text-[10px] font-black text-black/20 line-through block mb-1">{calculateOriginalPrice(pkg.price)}</span>
                          <span className="text-3xl font-black tracking-tighter">{pkg.price}</span>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceSelection(pkg);
                          }}
                          className="size-14 md:size-16 bg-[#111811] text-white rounded-full flex items-center justify-center hover:bg-[#FF8200] transition-colors shadow-xl"
                        >
                          <span className="material-symbols-outlined text-xl md:text-2xl">add_shopping_cart</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-6 text-center text-[#111811]/60">Signature Add-ons</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentAddons.map((addon, i) => (
                     <motion.div
                      key={addon.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (quickServices.length + currentMain.length + i) * 0.1 }}
                      className="bg-white/80 p-6 rounded-[2.5rem] shadow-lg flex items-center justify-between border-2 border-transparent hover:border-[#FF8200] transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="size-14 bg-[#FF8200]/10 rounded-2xl flex items-center justify-center text-[#FF8200] group-hover:bg-[#FF8200] group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-3xl">{addon.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-black text-xl tracking-tighter">{addon.name}</h4>
                          <p className="text-xs font-bold text-black/40 mb-3">{addon.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {addon.benefits?.map((b, bi) => (
                              <div key={bi} className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-[#FF8200]">
                                <span className="material-symbols-outlined text-[10px]">check_circle</span>
                                {b}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[9px] font-black text-black/20 line-through block mb-0.5">{calculateOriginalPrice(addon.price)}</span>
                          <span className="text-2xl font-black tracking-tighter">{addon.price}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleServiceSelection({
                            id: `${addon.id}-${Math.random()}`,
                            name: addon.name,
                            price: addon.price,
                            details: `Add-on Service`,
                            icon: addon.icon,
                            benefits: addon.benefits
                          })}
                          className="size-10 md:size-12 bg-[#111811] text-white rounded-full flex items-center justify-center hover:bg-[#FF8200] transition-colors shadow-md"
                        >
                          <span className="material-symbols-outlined text-lg md:text-xl">add</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* Interstitial Upsell Modal */}
      <AnimatePresence>
        {upsellItem && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => {
                setUpsellItem(null);
                setShowAreYouSure(false);
              }}
              className="absolute inset-0 bg-[#111811]/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-white rounded-[4rem] p-10 md:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8200]/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
              
              <AnimatePresence mode="wait">
                {!showAreYouSure ? (
                  <motion.div
                    key="upsell-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <div className="mb-10 text-center relative z-10 shrink-0">
                       <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 leading-none">Enhance the <span className="text-[#FF8200]">Glow?</span></h3>
                       <p className="text-sm text-black/40 font-bold">Complete your grooming session with our signature treats.</p>
                    </div>

                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar relative z-10 flex-grow">
                      {currentAddons.map((addon) => (
                        <UpsellCard 
                          key={addon.id} 
                          addon={addon} 
                          isSelected={selectedAddons.some(a => a.id === addon.id)}
                          onToggle={() => toggleAddon(addon)} 
                        />
                      ))}
                    </div>

                    <div className="mt-12 relative z-10 shrink-0 space-y-4">
                      <button 
                        onClick={() => confirmMainAndAddons(upsellItem, selectedAddons)}
                        className="w-full py-6 bg-[#111811] text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#FF8200] transition-all shadow-xl"
                      >
                        {selectedAddons.length > 0 ? `Add ${selectedAddons.length} Extras & Continue` : 'Continue with Main Service'}
                      </button>
                      <button 
                        onClick={() => setUpsellItem(null)}
                        className="w-full py-4 text-[#111811]/30 font-black uppercase text-[10px] tracking-widest hover:text-[#111811] transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="are-you-sure"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center py-10"
                  >
                    <div className="size-20 bg-[#FF8200]/10 rounded-full flex items-center justify-center text-[#FF8200] mx-auto mb-8">
                      <span className="material-symbols-outlined text-4xl">priority_high</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter mb-4 leading-none">Are you <span className="text-[#FF8200]">sure?</span></h3>
                    <p className="text-[#111811]/60 font-medium mb-12 max-w-xs mx-auto">
                      Skipping add-ons might leave your pet's grooming incomplete. Want to reconsider?
                    </p>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={() => setShowAreYouSure(false)}
                        className="w-full py-6 bg-[#FF8200] text-white rounded-full font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[#111811] transition-all"
                      >
                        Wait, let me see extras
                      </button>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => {
                            confirmMainAndAddons(upsellItem, [], true);
                          }}
                          className="py-5 bg-[#111811] text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#14d220] transition-all"
                        >
                          Continue to Booking
                        </button>
                        <button 
                          onClick={() => {
                            confirmMainAndAddons(upsellItem, [], false);
                          }}
                          className="py-5 bg-[#f8f8f8] text-[#111811]/40 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white border border-black/5 transition-all"
                        >
                          Continue to Browse
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface UpsellCardProps {
  addon: CartItem;
  isSelected: boolean;
  onToggle: () => void;
}

const UpsellCard: React.FC<UpsellCardProps> = ({ addon, isSelected, onToggle }) => {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      onClick={onToggle}
      className={`p-6 rounded-[2rem] flex items-center justify-between group border transition-all shadow-sm cursor-pointer ${
        isSelected ? 'bg-[#FF8200]/5 border-[#FF8200] shadow-lg' : 'bg-[#fcfcfc] border-black/5 hover:border-[#FF8200]/20'
      }`}
    >
      <div className="flex items-center gap-5">
        <div className={`size-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors duration-500 ${
          isSelected ? 'bg-[#FF8200] text-white' : 'bg-white text-[#FF8200] group-hover:bg-[#FF8200] group-hover:text-white'
        }`}>
          <span className="material-symbols-outlined text-2xl">{addon.icon}</span>
        </div>
        <div>
          <h5 className="font-black text-lg tracking-tight leading-none mb-1">{addon.name}</h5>
          <p className="text-[10px] font-bold text-black/30 uppercase tracking-tighter">{addon.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <span className="font-black text-xl tracking-tighter">{addon.price}</span>
        <div className={`size-12 rounded-full flex items-center justify-center transition-all ${
          isSelected ? 'bg-[#14d220] text-white rotate-0' : 'bg-[#111811] text-white rotate-0 group-hover:bg-[#FF8200]'
        }`}>
          <span className="material-symbols-outlined text-xl">{isSelected ? 'check' : 'add'}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default ServicesPage;
