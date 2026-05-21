
import React from 'react';
import { motion } from 'framer-motion';

const ReviewsPage: React.FC = () => {
  const reviews = [
    { 
      name: "Narasimha murthy N MANJULA", 
      pet: "Tuffy (Dog)", 
      text: "They speak very well. Nice work, good pet shop — keep it up! Today I visited this pet shop for my dog Tuffy’s haircut, bathing, and nail care. Truly professional work.", 
      rating: 5 
    },
    { 
      name: "Gagan Raj", 
      pet: "Cat Parent", 
      text: "Really happy with the grooming service. The team was professional, calm, and handled my cat with great care. The environment was clean and reassuring. Will definitely recommend to other cat parents.", 
      rating: 5 
    },
    { 
      name: "Sky Mobile's", 
      pet: "Pet Parent", 
      text: "Thank you for grooming my pet! Now it looks so cute. Thank you so much mam for the wonderful care.", 
      rating: 5 
    },
    { 
      name: "Baby Ramakrishna", 
      pet: "Pet Parent", 
      text: "I love to have grooming sessions in Snip & Style because I got a great experience. Highly recommended for premium pet care.", 
      rating: 5 
    },
    { 
      name: "Lakshmi Lachii", 
      pet: "Budget Friendly", 
      text: "Experience was soooo Good and Budget Friendly. One of the best places in Bengaluru for pet grooming.", 
      rating: 5 
    },
    { 
      name: "Vinod Jackson", 
      pet: "Pet Parent", 
      text: "It's good grooming, I'm happy with the results. Professional and very friendly staff.", 
      rating: 5 
    },
    { 
      name: "Rashmi Gowda", 
      pet: "Pet Parent", 
      text: "Very friendly and co-operative place. They listen to all our requirements patiently.", 
      rating: 5 
    },
    { 
      name: "Manju", 
      pet: "Pet Parent", 
      text: "Experience was so good and good service. The team handles pets very gently.", 
      rating: 5 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-24 px-6 bg-[#FFF9F2] relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Our Happy <span className="text-[#14d220]">Tails.</span>
          </h1>
          <p className="text-xl text-[#111811]/50 font-bold max-w-2xl mx-auto">
            See what our pet parents have to say about their Snip & Style experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-black/5 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex text-yellow-400">
                  {[...Array(rev.rating)].map((_, j) => <span key={j} className="material-symbols-outlined text-sm fill-current">star</span>)}
                </div>
                <span className="material-symbols-outlined text-[#FF8200]/20 text-4xl">format_quote</span>
              </div>
              
              <p className="text-[#111811] text-lg font-bold italic mb-10 leading-relaxed">&quot;{rev.text}&quot;</p>
              
              <div className="mt-auto flex items-center gap-4">
                <div className="size-14 bg-[#FF8200]/10 rounded-2xl flex items-center justify-center text-[#FF8200] font-black text-xl">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-black">{rev.name}</h4>
                  <p className="text-xs font-black text-[#14d220] uppercase tracking-widest">{rev.pet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewsPage;
