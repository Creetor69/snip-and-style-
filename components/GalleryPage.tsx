
import React from 'react';
import { motion } from 'framer-motion';

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const GalleryPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-24 px-6 bg-white overflow-hidden min-h-[80vh] flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-8 bg-[#FFF9F2] rounded-[4rem] shadow-2xl mb-12 border border-[#FF8200]/10"
        >
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="size-32 bg-gradient-to-tr from-[#FF8200] to-[#14d220] rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl"
          >
            <InstagramIcon />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Our Portfolio Lives on <span className="text-[#FF8200]">Instagram.</span>
          </h1>
          <p className="text-xl text-[#111811]/50 font-bold max-w-2xl mx-auto leading-relaxed">
            We update our feed daily with the freshest cuts, happiest paws, and behind-the-scenes magic.
          </p>
        </motion.div>

        <motion.a 
          whileHover={{ scale: 1.05, backgroundColor: "#111811" }}
          whileTap={{ scale: 0.95 }}
          href="https://www.instagram.com/snipandstyle_grooming"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#FF8200] text-white px-8 py-4 rounded-full font-black text-base shadow-2xl transition-all"
        >
          <InstagramIcon />
          Visit @snipandstyle_grooming
        </motion.a>

        <div className="mt-20 flex flex-wrap justify-center gap-4 opacity-20 grayscale">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="size-20 rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryPage;
