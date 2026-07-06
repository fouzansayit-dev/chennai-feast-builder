import React from "react";
import { Leaf, Award, Utensils, ShieldCheck, Clock } from "lucide-react";

export default function WhyChooseUsSection() {
  const FEATURES = [
    {
      title: "100% Pure Vegetarian",
      desc: "Pure & sattvik vegetarian food",
      icon: Leaf,
    },
    {
      title: "Quality Ingredients",
      desc: "Locally sourced & fresh ingredients",
      icon: Award,
    },
    {
      title: "Expert Chefs",
      desc: "Experienced & professional chefs",
      icon: Utensils,
    },
    {
      title: "Hygienic Preparation",
      desc: "Maintaining highest hygiene standards",
      icon: ShieldCheck,
    },
    {
      title: "On-time Service",
      desc: "Punctual & reliable service",
      icon: Clock,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] text-slate-800 relative overflow-hidden border-y border-amber-900/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT SIDE TEXT BLOCK */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
              WHY CHOOSE US
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A1029] font-bold leading-tight">
              The My Chennai Catering Difference
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
              We combine authentic taste, quality ingredients, and professional service to make your event truly unforgettable.
            </p>
          </div>

          {/* RIGHT SIDE FEATURE LIST */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            {FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-4 group">
                  {/* Purple Circular Icon Badge */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#541539] text-amber-300 flex items-center justify-center shrink-0 shadow-sm border border-amber-400/30 group-hover:scale-110 group-hover:bg-[#420f2d] transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Text Details */}
                  <div className="text-left">
                    <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#541539] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
