
import React from 'react';
import { Page } from '../App';

interface FooterProps {
  setActivePage: (page: Page) => void;
}

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
  </svg>
);

const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-white px-6 py-12 md:py-16 border-t border-[#111811]/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 md:flex-row md:justify-between">
        <div 
          className="flex flex-col items-center md:items-start gap-3 cursor-pointer group"
          onClick={() => setActivePage('home')}
        >
          <div className="flex items-center gap-3">
            <div className="size-10 md:size-12 flex items-center justify-center transition-transform group-hover:rotate-12">
              <img 
                src="https://i.ibb.co/GvvVrcgH/logo-removebg-preview-1.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-black tracking-tighter">Snip & Style</span>
              <span className="text-[10px] font-black text-[#FF8200] uppercase tracking-widest">Pet Grooming Studio</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#111811]/40">
          <button onClick={() => setActivePage('services')} className="hover:text-[#FF8200] transition-colors">Services</button>
          <button onClick={() => setActivePage('boarding')} className="hover:text-[#FF8200] transition-colors">Boarding</button>
          <button onClick={() => setActivePage('saver')} className="hover:text-[#FF8200] transition-colors">Super Savers</button>
          <button onClick={() => setActivePage('about')} className="hover:text-[#FF8200] transition-colors">About Us</button>
          <button onClick={() => setActivePage('gallery')} className="hover:text-[#FF8200] transition-colors">Gallery</button>
          <button onClick={() => setActivePage('reviews')} className="hover:text-[#FF8200] transition-colors">Reviews</button>
          <button onClick={() => setActivePage('contact')} className="hover:text-[#FF8200] transition-colors">Contact Us</button>
        </div>

        <div className="flex items-center gap-5">
          <a 
            href="https://www.facebook.com/p/Snipandstylegrooming-61580236613895/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="size-10 bg-[#111811]/5 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
          >
             <FacebookIcon />
          </a>
          <a 
            href="https://www.instagram.com/snipandstyle_grooming" 
            target="_blank" 
            rel="noopener noreferrer"
            className="size-10 bg-[#111811]/5 rounded-full flex items-center justify-center hover:bg-[#FF8200]/10 hover:text-[#FF8200] cursor-pointer transition-colors"
          >
             <InstagramIcon />
          </a>
          <a 
            href="https://wa.me/9739887770"
            className="size-10 bg-[#111811]/5 rounded-full flex items-center justify-center hover:bg-[#14d220]/10 hover:text-[#14d220] cursor-pointer transition-colors"
          >
             <span className="material-symbols-outlined text-xl">chat</span>
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#111811]/5 text-center text-[9px] font-black text-[#111811]/20 uppercase tracking-[0.4em]">
        Precision in every clip.
      </div>
    </footer>
  );
};

export default Footer;
