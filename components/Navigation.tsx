
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../App';

interface NavigationProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activePage, 
  setActivePage, 
  cartCount, 
  onCartClick,
  searchQuery,
  setSearchQuery
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuItems: { label: string; id: Page; icon: string; isNew?: boolean }[] = [
    { label: 'Home', id: 'home', icon: 'home' },
    { label: 'Boarding', id: 'boarding', icon: 'hotel', isNew: true },
    { label: 'Services', id: 'services', icon: 'content_cut' },
    { label: 'Super Savers', id: 'saver', icon: 'savings' },
    { label: 'The Pack', id: 'pack', icon: 'groups' },
    { label: 'About Us', id: 'about', icon: 'info' },
    { label: 'Safety', id: 'safety', icon: 'verified_user' },
    { label: 'Gallery', id: 'gallery', icon: 'photo_library' },
    { label: 'Reviews', id: 'reviews', icon: 'star' },
    { label: 'Contact', id: 'contact', icon: 'chat_bubble' },
  ];

  const handleNav = (id: Page) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-[100] px-4 md:px-6 py-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-2xl px-4 md:px-8 py-2 rounded-full border border-white/50 shadow-2xl shadow-black/5"
      >
        <motion.div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer group"
          onClick={() => handleNav('home')}
          whileHover={{ x: 5 }}
        >
          <div className="size-9 md:size-12 flex items-center justify-center">
            <img 
              src="https://i.ibb.co/GvvVrcgH/logo-removebg-preview-1.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm md:text-lg font-black tracking-tighter">Snip & Style</span>
            <span className="text-[8px] md:text-[10px] font-black text-[#14d220] uppercase tracking-widest">Pet Grooming</span>
          </div>
        </motion.div>
        
        <div className="hidden xl:flex items-center gap-6">
          {menuItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNav(item.id)}
              className={`text-[10px] font-black transition-all relative py-1 uppercase tracking-widest ${
                activePage === item.id ? 'text-[#FF8200]' : 'text-[#111811]/40 hover:text-[#111811]'
              }`}
            >
              <span className="relative">
                {item.label}
                {item.isNew && (
                  <span className="absolute -top-[11px] -right-[23px] bg-[#C97B63] text-white text-[6px] px-1 py-0.5 rounded-md font-black tracking-widest leading-none shrink-0 scale-90">
                    NEW
                  </span>
                )}
              </span>
              {activePage === item.id && (
                <motion.div 
                  layoutId="nav-line"
                  className="absolute -bottom-1 inset-x-0 h-0.5 bg-[#FF8200] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Expandable Search */}
          <div className="flex items-center">
            <AnimatePresence>
              {isSearchExpanded && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden mr-2"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activePage !== 'services') setActivePage('services');
                    }}
                    onBlur={() => {
                      if (!searchQuery) setIsSearchExpanded(false);
                    }}
                    className="w-32 md:w-48 pl-4 pr-4 py-2 bg-[#f8f8f8] rounded-full border-2 border-[#FF8200]/20 focus:border-[#FF8200] outline-none font-bold text-xs transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsSearchExpanded(!isSearchExpanded);
                if (!isSearchExpanded) {
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }
              }}
              className={`size-10 md:size-12 rounded-full flex items-center justify-center transition-colors ${
                isSearchExpanded ? 'bg-[#FF8200] text-white' : 'bg-[#111811]/5 text-[#111811] hover:text-[#FF8200]'
              }`}
            >
              <span className="material-symbols-outlined text-xl md:text-2xl">
                {isSearchExpanded ? 'close' : 'search'}
              </span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCartClick}
            className="relative size-10 md:size-12 bg-[#111811]/5 rounded-full flex items-center justify-center text-[#111811] hover:text-[#FF8200] transition-colors"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl">shopping_bag</span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 size-5 bg-[#FF8200] text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNav('services')}
            className="bg-[#FF8200] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full font-black text-[9px] md:text-xs shadow-xl shadow-[#FF8200]/20 hidden sm:block transition-all"
          >
            Book Now
          </motion.button>

          <button 
            onClick={() => setIsOpen(true)}
            className="xl:hidden size-10 flex flex-col items-center justify-center gap-1.5 hover:bg-black/5 rounded-full transition-colors"
            aria-label="Open menu"
          >
            <span className="w-5 h-0.5 bg-[#111811] rounded-full block" />
            <span className="w-5 h-0.5 bg-[#111811] rounded-full block" />
            <span className="w-5 h-0.5 bg-[#111811] rounded-full block" />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[105] xl:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[70%] max-w-xs bg-white/95 backdrop-blur-3xl z-[110] xl:hidden flex flex-col p-4 shadow-[-10px_0_40px_rgba(0,0,0,0.1)] rounded-l-[2rem]"
            >
              <div className="flex justify-between items-center mb-6 mt-2 px-1">
                <div className="flex items-center gap-2">
                  <img src="https://i.ibb.co/GvvVrcgH/logo-removebg-preview-1.png" alt="Logo" className="size-7" />
                  <span className="text-md font-black tracking-tighter">Menu</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="size-8 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto px-1 pb-6 custom-scrollbar">
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-xs font-black transition-all ${
                      activePage === item.id 
                        ? 'bg-[#FF8200] text-white shadow-xl shadow-[#FF8200]/20' 
                        : 'bg-white/50 text-[#111811]/60 border border-black/5 hover:bg-white hover:text-[#111811]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                      <span className="relative">
                        {item.label}
                        {item.isNew && (
                          <span className="ml-1.5 bg-[#C97B63] text-white text-[7px] px-1.5 py-0.5 rounded-md font-black tracking-wider inline-block align-middle scale-90">
                            NEW
                          </span>
                        )}
                      </span>
                    </div>
                    {activePage === item.id && <span className="material-symbols-outlined text-xs">check_circle</span>}
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto p-1">
                 <button 
                    onClick={() => handleNav('services')}
                    className="w-full py-3.5 bg-[#111811] text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-xl"
                  >
                    Book Appointment
                  </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
