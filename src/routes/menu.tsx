import { createFileRoute, Link } from "@tanstack/react-router";
import CateringMenusSection from "@/components/CateringMenusSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import { Reveal } from "@/components/Reveal";
import heroFeast from "@/assets/2_20260624_020643_0001.png";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Premium South Indian Catering Menu in Chennai | My Chennai" },
      { name: "description", content: "Explore our premium vegetarian catering in Chennai. From traditional banana leaf meals to lavish wedding buffets, we bring authentic flavors to your event." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Premium South Indian Catering Menu in Chennai | My Chennai" },
      { property: "og:description", content: "Explore our premium vegetarian catering in Chennai. From traditional banana leaf meals to lavish wedding buffets, we bring authentic flavors to your event." },
      { property: "og:url", content: "https://mychennaicateringservices.com/menu/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Premium South Indian Catering Menu in Chennai" },
      { name: "twitter:description", content: "Explore traditional banana leaf meals and lavish wedding buffets in Chennai." },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/menu/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          "name": "My Chennai Catering Vegetarian Menu",
          "url": "https://mychennaicateringservices.com/menu/",
          "mainEntity": {
            "@type": "CateringService",
            "name": "My Chennai Catering Services",
            "servesCuisine": "South Indian Pure Vegetarian"
          }
        })
      }
    ]
  }),
  component: MenuPage,
});

const SECTIONS = [
  {
    t: "Sweets & Payasam",
    items: ["Elaneer Payasam", "Rasamalai", "Gulab Jamun", "Rasagulla", "Ghevar", "Raj Bhog", "Malai Roll"],
  },
  {
    t: "Starters",
    items: ["Gobi 65", "Veg Cutlet", "Veg Spring Roll", "Onion Pakoda", "Paneer Tikka", "Veg Fish Fry"],
  },
  {
    t: "Rice & Biryani",
    items: ["Veg Biryani", "Mushroom Biryani", "Jackfruit Biryani", "Veg Pulav", "Onion Raitha", "Bisibelabath"],
  },
  {
    t: "Traditional Saapadu",
    items: ["White Rice", "Arachuvitta Sambar", "Rasam", "Vathakulambu", "Curd Rice", "Poriyal", "Kootu", "Appalam", "Pickle"],
  },
  {
    t: "Tiffin & Snacks",
    items: ["Idly", "Mini Idly", "Rava Dosa", "Uthappam", "Idiyappam", "Veg Stew", "Pongal"],
  },
  {
    t: "Breads & Curries",
    items: ["Chapathi", "Rumali Roti", "Butter Naan", "Paneer Butter Masala", "Mushroom Masala", "Channa Masala"],
  },
];

function MenuPage() {
  return (
    <>
      <section className="relative py-24 overflow-hidden">
        {/* Decorative marigold toran */}
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        {/* Traditional Kolam watermark */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none">
          <CenterKolam size={300} />
        </div>

        <div className="absolute inset-0">
          <img src={heroFeast} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-plum-dark/85" />
        </div>
        <Reveal>
          <div className="relative text-center max-w-3xl mx-auto px-6 text-cream z-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Feast & Menu</span>
            <h1 className="font-serif text-5xl md:text-6xl mt-4">
              Explore Our <span className="text-gold-gradient italic">Delicious Veg Catering Menu</span>
            </h1>
            <p className="mt-5 text-cream/80">
              Every dish on our menu is hand-pounded, slow-cooked and served fresh. Explore the
              traditional and contemporary offerings curated by MCC.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CATERING MENUS SECTION */}
      <CateringMenusSection />

      {/* WHY CHOOSE US SECTION */}
      <WhyChooseUsSection />

      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((s) => (
            <Reveal key={s.t}>
              <div className="p-7 rounded-3xl border border-plum/10 bg-white h-full hover:border-gold hover:shadow-glow-gold transition-all">
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold-dark mb-3">{s.t}</div>
                <ul className="space-y-2 text-foreground/80">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INTERACTIVE FEAST PLANNER CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-[#4d1234] via-[#541539] to-[#3f0e2b] text-white text-center relative overflow-hidden border-t border-amber-400/30">
        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-4">
          <span className="text-amber-300 text-xs uppercase tracking-[0.25em] font-bold inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Interactive Customizer
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Want to Build Your Own Custom Feast?
          </h2>
          <p className="text-amber-100/90 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Use our interactive plate calculator to select packages, toggle custom items, adjust guest counts, and calculate live quotes!
          </p>
          <div className="pt-2">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-plum-dark font-extrabold text-xs uppercase tracking-[0.2em] rounded-full shadow-xl transition-all duration-300 group"
            >
              <span>OPEN FEAST BUILDER</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}