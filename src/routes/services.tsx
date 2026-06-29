import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import weddingHall from "@/assets/wedding-hall.jpg";
import liveCounter from "@/assets/live-counter.jpg";
import heroFeast from "@/assets/hero-feast.jpg";
import spices from "@/assets/spices.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Catering Services — Weddings, Receptions, Pooja & Corporate | MCC Chennai" },
      { name: "description", content: "End-to-end South Indian vegetarian catering — wedding feasts, reception buffets, seemantham, griha pravesham, corporate tiffins, live counters and decor." },
      { property: "og:title", content: "MCC Catering Services in Chennai" },
      { property: "og:description", content: "Wedding & event catering with traditional decor, silk-saree hosts and Sattvik menus." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    t: "Grand Weddings",
    img: weddingHall,
    d: "Course-by-course Thala Vazhai Ilai Saapadu with full mandapam decor.",
    bullets: ["Banana-leaf course menu", "Silk-saree hosts & servers", "Heart-shaped rose petal newlywed table", "Chandelier dining hall styling"],
  },
  {
    t: "Reception Buffets",
    img: liveCounter,
    d: "Modern luxury vegetarian buffets with live counters and chef stations.",
    bullets: ["Live dosa & chaat counters", "Rajasthani puppet-themed dessert stall", "Premium china & gold-trim buffet setup", "Welcome mocktails"],
  },
  {
    t: "Seemantham & Pooja",
    img: heroFeast,
    d: "Strictly Sattvik ceremonial menus for traditional South Indian functions.",
    bullets: ["Madisar-style serving", "Authentic curry-leaf temperings", "Naivedyam-grade purity", "Brass-vessel presentation"],
  },
  {
    t: "Corporate & Small Events",
    img: spices,
    d: "Office tiffins, conference lunches and intimate gatherings.",
    bullets: ["50 – 500 guest capacity", "Punctual delivery & setup", "Themed buffet stations", "Custom corporate menus"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="py-24 bg-plum-dark text-cream">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto px-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Our Services</span>
            <h1 className="font-serif text-5xl md:text-6xl mt-4">Every occasion, perfectly served.</h1>
            <p className="mt-5 text-cream/75">
              From an intimate Seemantham at home to a 2000-guest grand wedding, MCC handles food,
              decor and hospitality with the same reverence.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 space-y-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t}>
              <ServiceAccordion {...s} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function ServiceAccordion({
  t,
  img,
  d,
  bullets,
  defaultOpen,
}: {
  t: string;
  img: string;
  d: string;
  bullets: string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="bg-white border border-plum/10 rounded-3xl overflow-hidden hover:border-gold transition-all">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full grid md:grid-cols-[200px_1fr_auto] gap-5 items-center p-5 text-left"
      >
        <div className="h-32 md:h-24 rounded-2xl overflow-hidden">
          <img src={img} alt={t} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div>
          <h3 className="font-serif text-2xl text-plum">{t}</h3>
          <p className="text-foreground/65 text-sm mt-1">{d}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="text-gold justify-self-end">
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 grid sm:grid-cols-2 gap-2">
              {bullets.map((b) => (
                <div key={b} className="flex items-start gap-2 text-sm text-foreground/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}