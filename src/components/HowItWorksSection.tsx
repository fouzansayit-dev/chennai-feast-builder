import React from "react";
import { Utensils, ClipboardList, CalendarCheck, Sparkles, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

export default function HowItWorksSection() {
  const STEPS = [
    {
      num: "01",
      title: "The Ability to Choose the Best",
      desc: "The best food, service, and attention to detail, as well as any additional arrangements you've requested for your special occasion.",
      icon: ClipboardList,
    },
    {
      num: "02",
      title: "Craft Your Custom Menu",
      desc: "Select your favorite traditional dishes, live counters, and sweets using our interactive menu customizer to perfectly match your guests.",
      icon: Utensils,
    },
    {
      num: "03",
      title: "Refine & Secure Booking",
      desc: "Consult with our catering experts to taste dishes, adjust item combinations, finalize guest counts, and secure your event date.",
      icon: CalendarCheck,
    },
    {
      num: "04",
      title: "Relish the Grand Feast",
      desc: "Our master chefs cook fresh at your venue and our professional hospitality team delivers a flawless, traditional banana leaf dining experience.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#FAF7F2] relative overflow-hidden border-t border-amber-900/5">
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.4),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_80%_80%,rgba(84,21,57,0.4),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <Reveal>
            <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block mb-2">
              OUR PROCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A1029] font-medium leading-tight">
              How It Works
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4 text-amber-500/80">
              <div className="w-6 h-px bg-amber-400/40" />
              <span className="text-xs">❖</span>
              <div className="w-6 h-px bg-amber-400/40" />
            </div>
            <p className="text-slate-600 text-sm sm:text-base mt-4 max-w-lg mx-auto font-normal leading-relaxed">
              We make planning and executing your event catering simple, transparent, and completely stress-free.
            </p>
          </Reveal>
        </div>

        {/* Steps Grid - Mobile Swipe / Desktop Grid */}
        <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-x-visible no-scrollbar snap-x snap-mandatory pb-6 px-4 -mx-6 lg:px-0 lg:mx-0 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === STEPS.length - 1;
            return (
              <React.Fragment key={idx}>
                <Reveal delay={idx * 0.1} className="snap-center shrink-0 w-[85%] sm:w-[55%] lg:w-auto h-auto">
                  <div className="bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-amber-400/30 transition-all duration-300 flex flex-col items-center text-center h-full group relative">
                    
                    {/* Circle Icon Container with Overlapping Gold Step Badge */}
                    <div className="relative w-28 h-28 rounded-full bg-white shadow-[0_8px_25px_rgba(0,0,0,0.07)] flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-105">
                      {/* Gold Step Badge */}
                      <div className="absolute -top-1 -left-1 w-9 h-9 rounded-full bg-[#D4AF37] border-2 border-white flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                        {step.num}
                      </div>

                      {/* Icon */}
                      <Icon className="w-8 h-8 text-[#3A1029]" />
                    </div>

                    {/* Step Content */}
                    <h3 className="font-sans font-bold text-[#1A1208] text-base sm:text-lg mt-6 mb-3 leading-snug tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>

                {/* Desktop Connector Arrow */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 text-amber-400/40 pointer-events-none"
                    style={{ left: `calc(${(idx + 1) * 25}% - 16px)` }}
                  >
                    <ChevronRight className="w-8 h-8 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
