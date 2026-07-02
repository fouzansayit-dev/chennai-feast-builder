import { createFileRoute } from "@tanstack/react-router";
import MenuBuilder from "@/components/MenuBuilder";
import { Reveal } from "@/components/Reveal";
import heroFeast from "@/assets/2_20260624_020643_0001.png";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu & Quote Builder — Traditional South Indian Catering | MCC" },
      { name: "description", content: "Explore MCC's tiffin, moderate and executive vegetarian catering menus. Build a custom quote in seconds with our interactive plate calculator." },
      { property: "og:title", content: "MCC Catering Menu — Build Your Quote" },
      { property: "og:description", content: "Authentic Brahmin vegetarian menus for weddings, receptions, and traditional functions across Chennai." },
    ],
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
              The <span className="text-gold-gradient italic">Saapadu</span> Catalogue
            </h1>
            <p className="mt-5 text-cream/80">
              Every dish on our menu is hand-pounded, slow-cooked and served fresh. Explore the
              traditional and contemporary offerings curated by MCC.
            </p>
          </div>
        </Reveal>
      </section>

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

      <MenuBuilder />
    </>
  );
}