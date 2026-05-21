
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Services from './components/Services';
import CTASection from './components/CTASection';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import GalleryPage from './components/GalleryPage';
import ReviewsPage from './components/ReviewsPage';
import ContactPage from './components/ContactPage';
import SafetyPage from './components/SafetyPage';
import MeetThePackPage from './components/MeetThePackPage';
import SuperSaverPage from './components/SuperSaverPage';
import BoardingPage from './components/BoardingPage';
import CartModal from './components/CartModal';
import Footer from './components/Footer';
import TreatsToysCTA from './components/TreatsToysCTA';
import BubbleCursor from './components/BubbleCursor';
import BackgroundDecor from './components/BackgroundDecor';

export type Page = 'home' | 'services' | 'about' | 'gallery' | 'reviews' | 'contact' | 'safety' | 'pack' | 'saver' | 'boarding';
export type PetType = 'dog' | 'cat' | null;
export type SizeType = 'small' | 'medium' | 'large' | null;
export type CoatType = 'short' | 'long' | null;

export interface CartItem {
  id: string;
  name: string;
  price: string;
  details?: string;
  icon?: string;
  benefits?: string[];
  longDesc?: string;
  exclusions?: string[];
}

export type AddToCartFn = (item: CartItem, showCart?: boolean) => void;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [saverConfig, setSaverConfig] = useState<{pet: PetType, size: SizeType, coat: CoatType} | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('snip_style_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('snip_style_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const addToCart = (item: CartItem, showCart: boolean = true) => {
    setCart(prev => [...prev, item]);
    if (showCart) setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  if (loading) {
    return <Preloader />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onServiceClick={() => setActivePage('services')} />
            <TrustStrip />
            <Services onDetailClick={() => setActivePage('services')} setActivePage={setActivePage} />
            
            {/* Sequential Nav to About */}
            <div className="py-12 bg-white flex justify-center">
               <motion.button 
                whileHover={{ y: -4 }}
                onClick={() => setActivePage('about')}
                className="flex flex-col items-center gap-3 group"
               >
                 <div className="px-7 py-3.5 bg-[#111811] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#FF8200] transition-all shadow-xl">
                   Learn Our Story
                 </div>
                 <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                   <span className="text-[9px] font-black uppercase tracking-widest block">Next: About Us</span>
                   <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </div>
               </motion.button>
            </div>

            {/* Sequential Nav to Gallery */}
            <div className="py-12 bg-[#f8f8f8] flex justify-center">
               <motion.button 
                whileHover={{ y: -4 }}
                onClick={() => setActivePage('gallery')}
                className="flex flex-col items-center gap-3 group"
               >
                 <div className="px-7 py-3.5 bg-[#111811] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#FF8200] transition-all shadow-xl">
                   View Our Gallery
                 </div>
                 <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                   <span className="text-[9px] font-black uppercase tracking-widest block">Next: Pet Gallery</span>
                   <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </div>
               </motion.button>
            </div>

            {/* Sequential Nav to Pack */}
            <div className="py-12 bg-white flex justify-center">
               <motion.button 
                whileHover={{ y: -4 }}
                onClick={() => setActivePage('pack')}
                className="flex flex-col items-center gap-3 group"
               >
                 <div className="px-7 py-3.5 bg-[#111811] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#FF8200] transition-all shadow-xl">
                   Meet the Pack
                 </div>
                 <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                   <span className="text-[9px] font-black uppercase tracking-widest block">Next: Our Team</span>
                   <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </div>
               </motion.button>
            </div>

            <CTASection onViewServices={() => setActivePage('services')} />
          </motion.div>
        );
      case 'services': return null; // Handled above for direct search access
      case 'about': return <AboutPage key="about" />;
      case 'gallery': return <GalleryPage key="gallery" />;
      case 'reviews': return <ReviewsPage key="reviews" />;
      case 'contact': return <ContactPage key="contact" />;
      case 'safety': return <SafetyPage key="safety" />;
      case 'pack': return <MeetThePackPage key="pack" />;
      case 'saver': return <SuperSaverPage key="saver" addToCart={addToCart} initialConfig={saverConfig} />;
      case 'boarding': return <BoardingPage key="boarding" addToCart={addToCart} setActivePage={setActivePage} />;
      default: return <Hero onServiceClick={() => setActivePage('services')} />;
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[#FF8200]/30 flex flex-col overflow-x-hidden">
      <BackgroundDecor />
      <BubbleCursor />
      <Navigation 
        activePage={activePage} 
        setActivePage={setActivePage} 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activePage === 'services' ? (
            <ServicesPage 
              key="services" 
              addToCart={addToCart} 
              setActivePage={setActivePage} 
              setSaverConfig={setSaverConfig}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          ) : renderPage()}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <CartModal 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart} 
          />
        )}
      </AnimatePresence>

      <TreatsToysCTA />

      <Footer setActivePage={setActivePage} />
      
      {/* Floating Cart Button for Mobile - Z-index increased to 200 to sit above most layers */}
      {cart.length > 0 && !isCartOpen && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-[200] size-16 bg-[#14d220] text-white rounded-full shadow-[0_10px_40px_-10px_rgba(20,210,32,0.5)] flex items-center justify-center lg:hidden border-4 border-white"
        >
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
          <span className="absolute -top-1 -right-1 size-6 bg-[#FF8200] rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">
            {cart.length}
          </span>
        </motion.button>
      )}
    </div>
  );
};

export default App;
