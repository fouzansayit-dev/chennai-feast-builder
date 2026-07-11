import React, { useRef } from "react";
import { Leaf, Utensils, ShieldCheck, ChefHat } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import buffetCounterImage from "@/assets/banner 3.jpg";
import { useMediaImages } from "@/hooks/useMediaImages";

export default function WhyChooseUsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { getImg } = useMediaImages();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translations and rotations for the leaf and seeds
  const leafY = useTransform(scrollYProgress, [0, 1], [-80, 100]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [-25, 45]);

  const seed1Y = useTransform(scrollYProgress, [0, 1], [-120, 160]);
  const seed1X = useTransform(scrollYProgress, [0, 1], [-30, 40]);
  const seed1Rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const seed2Y = useTransform(scrollYProgress, [0, 1], [-160, 80]);
  const seed2X = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const seed2Rotate = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const seed3Y = useTransform(scrollYProgress, [0, 1], [-60, 220]);
  const seed3X = useTransform(scrollYProgress, [0, 1], [-15, 20]);

  const FEATURES = [
    {
      title: "CUSTOM MENUS",
      desc: "Authentic vegetarian and non-vegetarian selections",
      icon: ChefHat,
    },

    {
      title: "EXPERT CHEFS",
      desc: "Decades of culinary mastery under D. Venkat",
      icon: Utensils,
    },
    {
      title: "HYGIENIC KITCHENS",
      desc: "Pristine, sanitised food prep environments",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 bg-[#FAF7F2] text-slate-800 relative overflow-hidden border-y border-amber-900/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT SIDE TEXT BLOCK */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div>
              <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block mb-2">
                WHY CHOOSE US
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A1029] font-medium leading-tight">
                The Trusted Choice for Premium Catering Services in Chennai
              </h2>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Choosing the right caterer is essential to the success of any event, and at My Chennai Catering, we are committed to delivering an experience that goes beyond great food. We prepare every dish using fresh, high-quality ingredients while preserving the authentic flavours of South Indian cuisine. Our experienced chefs and professional service team work closely with you to create customized menus that suit your event, traditions, and budget. From planning and preparation to timely service and flawless execution, we handle every detail with care and precision.
            </p>

            {/* HORIZONTAL FEATURES GRID */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-900/10">
              {FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 group">
                    <div className="w-10 h-10 rounded-full bg-[#541539]/5 text-[#541539] flex items-center justify-center border border-[#541539]/10 group-hover:scale-105 group-hover:bg-[#541539] group-hover:text-white transition-all duration-300">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-[10px] sm:text-xs mt-1 leading-normal font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE WITH PREMIUM ROUNDED MASK */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <div className="w-full max-w-md aspect-square rounded-l-[16rem] rounded-r-[4rem] overflow-hidden border-4 border-white shadow-2xl relative group">
              <img
                src={getImg("why_choose_us", buffetCounterImage)}
                alt="Premium Catering Event Buffet Setup"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#3A1029]/5 group-hover:bg-transparent transition-all duration-500" />
            </div>
          </div>

        </div>
      </div>

      {/* FLOATING LEAF & SPICE SEEDS OVERLAPPING MIDDLE OF THE GRID */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">

        {/* Leaf Branch */}
        <motion.div
          style={{ y: leafY, rotate: leafRotate }}
          className="absolute left-[45%] lg:left-[48%] top-[35%] w-28 sm:w-36 md:w-44 h-auto filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
        >
          <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Stem */}
            <path d="M60,180 Q55,100 65,10" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
            {/* Leaf 1 (Top Left) */}
            <path d="M62,60 C40,40 20,50 30,80 C38,100 55,90 62,75 Z" fill="url(#leafGrad1)" />
            <path d="M62,75 Q50,75 30,80" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            {/* Leaf 2 (Top Right) */}
            <path d="M63,40 C85,20 105,30 95,60 C87,80 70,70 63,55 Z" fill="url(#leafGrad2)" />
            <path d="M63,55 Q75,55 95,60" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            {/* Leaf 3 (Bottom Left) */}
            <path d="M60,110 C35,90 15,100 25,130 C33,150 50,140 60,125 Z" fill="url(#leafGrad1)" />
            <path d="M60,125 Q48,125 25,130" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            {/* Leaf 4 (Bottom Right) */}
            <path d="M61,90 C83,70 103,80 93,110 C85,130 68,120 61,105 Z" fill="url(#leafGrad2)" />
            <path d="M61,105 Q73,105 93,110" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

            <defs>
              <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
              <linearGradient id="leafGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Spice Seed 1 (Crimson Peppercorn) */}
        <motion.div
          style={{ y: seed1Y, x: seed1X, rotate: seed1Rotate }}
          className="absolute left-[42%] lg:left-[45%] top-[40%] w-3 sm:w-4 h-3 sm:h-4 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="10" cy="10" r="8" fill="url(#seedGrad1)" />
            <defs>
              <radialGradient id="seedGrad1" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="70%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#450a0a" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Spice Seed 2 (Gold Pepper Seed) */}
        <motion.div
          style={{ y: seed2Y, x: seed2X, rotate: seed2Rotate }}
          className="absolute left-[54%] lg:left-[56%] top-[30%] w-2 sm:w-3 h-2 sm:h-3 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="10" cy="10" r="8" fill="url(#seedGrad2)" />
            <defs>
              <radialGradient id="seedGrad2" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Spice Seed 3 (Small Crimson Peppercorn) */}
        <motion.div
          style={{ y: seed3Y, x: seed3X }}
          className="absolute left-[48%] lg:left-[51%] top-[50%] w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="10" cy="10" r="8" fill="url(#seedGrad1)" />
          </svg>
        </motion.div>

      </div>
    </section>
  );
}
