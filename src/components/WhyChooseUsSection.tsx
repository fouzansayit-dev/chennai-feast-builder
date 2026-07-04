import React from "react";
import { motion } from "framer-motion";

export default function WhyChooseUsSection() {
  const FEATURES = [
    {
      title: "SEASONAL MENUS",
      svg: (
        <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-[#DCA46A]">
          {/* Takeout box outline */}
          <path d="M16 28 L48 28 L44 52 L20 52 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 28 L24 16 L40 16 L52 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 36 H36 M30 42 H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M32 16 C32 10 38 8 38 8 C38 8 38 14 32 16 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        </svg>
      ),
    },
    {
      title: "HIGH QUALITY SERVICES",
      svg: (
        <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-[#DCA46A]">
          {/* Award badge outline */}
          <circle cx="32" cy="26" r="14" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="26" r="10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M32 21 L34 24.5 L38 25 L35 28 L36 32 L32 30 L28 32 L29 28 L26 25 L30 24.5 Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M24 38 L20 54 L32 48 L44 54 L40 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "DELICIOUS FOOD",
      svg: (
        <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-[#DCA46A]">
          {/* Cloche with heart icon */}
          <path d="M12 40 C12 24 20 18 32 18 C44 18 52 24 52 40 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M8 44 H56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M32 26 C30 24 27 24 26 26 C25 28 27 31 32 34 C37 31 39 28 38 26 C37 24 34 24 32 26 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      title: "BEST CHEF COOK",
      svg: (
        <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-[#DCA46A]">
          {/* Chef Hat outline */}
          <path d="M20 36 C14 36 12 28 18 24 C16 16 26 12 32 16 C38 12 48 16 46 24 C52 28 50 36 44 36 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 36 V48 H44 V36" stroke="currentColor" strokeWidth="2" />
          <path d="M20 42 H44" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </svg>
      ),
    },
    {
      title: "LOCAL SOURCED INGREDIENTS",
      svg: (
        <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-[#DCA46A]">
          {/* Fruit/Veg basket outline with sparkles */}
          <path d="M16 32 H48 V48 C48 50 46 52 44 52 H20 C18 52 16 50 16 48 V32 Z" stroke="currentColor" strokeWidth="2" />
          <circle cx="26" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="38" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M32 28 C32 20 36 18 36 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 16 L25 18 M40 16 L39 18 M32 12 V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "CUSTOMER CENTRIC",
      svg: (
        <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-[#DCA46A]">
          {/* Hand holding serving cloche */}
          <path d="M16 30 C16 20 23 16 32 16 C41 16 48 20 48 30 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M12 33 H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 44 C24 40 40 40 48 44 C42 52 26 52 16 44 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-white text-[#3E3127] relative overflow-hidden">
      
      {/* Top Left Leaf Sprig Accent matching Image 2 */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 pointer-events-none select-none z-0">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="text-emerald-700/80">
          {/* Branch */}
          <path d="M10 90 Q40 50 85 15" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" />
          {/* Leaf 1 */}
          <path d="M30 65 Q15 50 32 42 Q45 50 30 65 Z" fill="#5B8C67" stroke="#3A6346" strokeWidth="1" />
          {/* Leaf 2 */}
          <path d="M45 48 Q35 25 55 28 Q62 40 45 48 Z" fill="#6B9E77" stroke="#3A6346" strokeWidth="1" />
          {/* Leaf 3 */}
          <path d="M65 30 Q58 10 75 15 Q80 28 65 30 Z" fill="#4A7C59" stroke="#3A6346" strokeWidth="1" />
          {/* Red pepper berry accents matching Image 2 */}
          <circle cx="28" cy="72" r="3" fill="#D9534F" />
          <circle cx="48" cy="55" r="2.5" fill="#333333" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Header matching Image 2 theme */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block relative mb-3">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#7A6A5C] font-semibold block">
              WHY CHOOSE US
            </span>
            <div className="w-12 h-[1.5px] bg-[#DCA46A] mx-auto mt-1" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#3E2E23] tracking-wide font-normal mt-2">
            REASON YOU'LL LOVE US
          </h2>

          <p className="text-sm md:text-base text-[#6B5C50] mt-5 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            Catering delicious, pure Sattvik delicacies with warm traditional South Indian hospitality makes your special occasions truly unforgettable.
          </p>
        </div>

        {/* 6 Feature Grid (3 Columns x 2 Rows) matching Image 2 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-8">
          {FEATURES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Gold line-art icon */}
              <div className="mb-5 transition-transform duration-300 group-hover:scale-110">
                {item.svg}
              </div>

              {/* Title matching uppercase style in Image 2 */}
              <h3 className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#3E2E23] uppercase group-hover:text-[#B88E56] transition-colors">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
