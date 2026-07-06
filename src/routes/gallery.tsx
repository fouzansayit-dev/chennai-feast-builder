import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import weddingHall from "@/assets/IMG_4558.webp";
import realFeastMeal from "@/assets/2_20260624_020643_0001.png";
import bananaLeafFeastBlended from "@/assets/banana-leaf-feast-blended.png";
import liveCounter from "@/assets/images-31.jpeg";
import buffetCounter from "@/assets/images-32.jpeg";
import gulabJamun from "@/assets/IMG-20260327-WA0010.jpg.jpeg";
import founder from "@/assets/IMG-20260331-WA0002.jpg.jpeg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Wedding Catering & South Indian Food Setup in Chennai" },
      { name: "description", content: "VIP Wedding Couple Catering Setup. Explore photo gallery of wedding catering setups, traditional banana leaf feasts, live food counters, and event decor by My Chennai Catering Services." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Gallery | Wedding Catering & South Indian Food Setup in Chennai" },
      { property: "og:description", content: "VIP Wedding Couple Catering Setup. View catering setups, banana leaf feasts, and live counters." },
      { property: "og:url", content: "https://mychennaicateringservices.com/gallery/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gallery | My Chennai Catering Services" },
      { name: "twitter:description", content: "VIP Wedding Couple Catering Setup in Chennai." },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/gallery/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "My Chennai Catering Event Gallery",
          "url": "https://mychennaicateringservices.com/gallery/",
          "description": "Photo gallery showcasing VIP wedding catering setups, traditional South Indian banana leaf feasts, live counters, and dessert stalls in Chennai."
        })
      }
    ]
  }),
  component: GalleryPage,
});

const GALLERY_ITEMS = [
  {
    title: "VIP Wedding Couple Catering Setup",
    category: "Wedding Dinners",
    img: weddingHall,
    desc: "Luxury flower & silk curtain dining table arrangement for newlyweds."
  },
  {
    title: "Authentic Thala Vazhai Saapadu",
    category: "Traditional Feasts",
    img: realFeastMeal,
    desc: "Traditional course-by-course South Indian banana leaf wedding meal."
  },
  {
    title: "Grand Wedding Banquet Feast",
    category: "Traditional Feasts",
    img: bananaLeafFeastBlended,
    desc: "20+ item Sattvik Brahmin feast served with pure ghee."
  },
  {
    title: "Live Dosa & Chaat Counter",
    category: "Live Counters",
    img: liveCounter,
    desc: "Hot chef stations with piping hot mini dosas and tiffins."
  },
  {
    title: "Chandelier Buffet Setup",
    category: "Reception Buffets",
    img: buffetCounter,
    desc: "Modern luxury buffet line with gold-chafing dishes and floral decor."
  },
  {
    title: "Pure Ghee Traditional Sweets",
    category: "Desserts & Sweets",
    img: gulabJamun,
    desc: "Stone-ground Gulab Jamun, Elaneer Payasam & traditional sweets."
  },
  {
    title: "Founder D. Venkat & Team",
    category: "Our Legacy",
    img: founder,
    desc: "Master caterer D. Venkat supervising pure Sattvik cooking."
  },
  {
    title: "Traditional Brass Lamps & Decor",
    category: "Event Styling",
    img: brassLamps,
    desc: "Sacred brass lamps, marigold garlands and traditional mandapam styling."
  }
];

function GalleryPage() {
  return (
    <>
      <section className="relative py-24 bg-plum-dark text-cream overflow-hidden">
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none">
          <CenterKolam size={320} />
        </div>

        <Reveal>
          <div className="relative text-center max-w-3xl mx-auto px-6 z-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Visual Showcase</span>
            <h1 className="font-serif text-5xl md:text-6xl mt-4">
              Catering & Event Setup <span className="text-gold-gradient italic">Gallery</span>
            </h1>
            <p className="mt-5 text-cream/75 text-lg">
              Explore our VIP wedding couple dining setups, traditional banana leaf saapadu, live food stalls, and event decor in Chennai.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_ITEMS.map((item, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-gold/20 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-plum/90 text-gold text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-plum font-semibold group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
