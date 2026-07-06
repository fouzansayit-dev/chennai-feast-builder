import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import weddingHall from "@/assets/IMG_4558.webp";
import liveCounter from "@/assets/images-32.jpeg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import spices from "@/assets/images-31.jpeg";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Wedding Catering Services in Chennai | No.1 Traditional Veg" },
      { name: "description", content: "Premium wedding catering services in Chennai. 20+ Yrs legacy of authentic banana leaf kalyana saapadu, live counters & custom stalls. Call: 9940396005." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Wedding Catering Services in Chennai | No.1 Traditional Veg" },
      { property: "og:description", content: "Premium wedding catering services in Chennai. 20+ Yrs legacy of authentic banana leaf kalyana saapadu, live counters & custom stalls." },
      { property: "og:url", content: "https://mychennaicateringservices.com/wedding-catering-services-in-chennai/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Wedding Catering Services in Chennai" },
      { name: "twitter:description", content: "Premium wedding catering services in Chennai. 20+ Yrs legacy of authentic banana leaf saapadu." },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/wedding-catering-services-in-chennai/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Wedding Catering Services",
          "name": "Wedding Catering Services in Chennai",
          "provider": {
            "@type": "CateringService",
            "name": "My Chennai Catering Services",
            "telephone": "+919940396005"
          },
          "areaServed": "Chennai",
          "description": "Authentic banana leaf wedding feasts, reception buffets, live counters and traditional South Indian vegetarian catering."
        })
      }
    ]
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
    img: brassLamps,
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

export function ServicesPage() {
  return (
    <>
      <section className="relative py-24 bg-plum-dark text-cream overflow-hidden">
        {/* Hanging garlands across header */}
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        {/* Kolam backdrop */}
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none">
          <CenterKolam size={320} />
        </div>

        <Reveal>
          <div className="relative text-center max-w-3xl mx-auto px-6 z-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Our Services</span>
            <h1 className="font-serif text-5xl md:text-6xl mt-4">
              Premium Veg Catering Services in Chennai <span className="text-gold-gradient italic">for Every Occasion</span>
            </h1>
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