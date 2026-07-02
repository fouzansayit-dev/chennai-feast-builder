import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Award,
  Leaf,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
  Heart,
  Baby,
  Cake,
  Briefcase,
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import gulabJamun from "@/assets/IMG-20260327-WA0010.jpg.jpeg";
import bananaLeafFeastBlended from "@/assets/banana-leaf-feast-blended.png";
import bananaLeafBg from "@/assets/banana-leaf-bg.png";
import liveCounter from "@/assets/images-31.jpeg";
import weddingHall from "@/assets/IMG_4558.webp";
import realFeastMeal from "@/assets/2_20260624_020643_0001.png";
import buffetCounter from "@/assets/images-32.jpeg";
import partyBg from "@/assets/party-bg.png";
import partyLogo from "@/assets/party-logo.png";
import MenuBuilder from "@/components/MenuBuilder";
import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, leafDraw, staggerContainer } from "@/lib/animations";
import { CenterKolam } from "@/components/Kolam";
import MarigoldGarland from "@/components/MarigoldGarland";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Catering Services in Chennai — MCC Wedding & Event Caterers" },
      { name: "description", content: "Authentic South Indian vegetarian wedding catering in Chennai. Pure Sattvik feasts, banana-leaf saapadu, live counters and luxury reception buffets — 20+ years legacy." },
      { property: "og:title", content: "MCC Catering — Best Wedding Caterers in Chennai" },
      { property: "og:description", content: "Pure Brahmin vegetarian wedding catering by D. Venkat. 2000+ events delivered across Pattabiram, Avadi, Ambattur and all Chennai." },
    ],
  }),
  component: Index,
});

const SERVICE_CARDS = [
  {
    t: "Weddings",
    d: "Traditional course-by-course Thala Vazhai Ilai Saapadu with grand mandapam dining setup.",
    i: UtensilsCrossed,
    link: "/services",
    hash: undefined,
  },
  {
    t: "Engagements",
    d: "Exquisite buffets and premium plated dinners to mark the auspicious beginning of family unions.",
    i: Heart,
    link: "/services",
    hash: undefined,
  },
  {
    t: "Seemantham",
    d: "Strictly Sattvik traditional baby shower menus crafted with sacred ingredients and holy naivedyam.",
    i: Baby,
    link: "/services",
    hash: undefined,
  },
  {
    t: "Birthdays",
    d: "Delightful live counters, contemporary chaat stations, and children-friendly dessert displays.",
    i: Cake,
    link: "/",
    hash: "book",
  },
  {
    t: "Corporate Events",
    d: "Punctual, high-quality catering, packaged lunch boxes, and elegant conference buffet stations.",
    i: Briefcase,
    link: "/services",
    hash: undefined,
  },
  {
    t: "Private Parties",
    d: "Intimate family gatherings, Griha Pravesham (housewarming) poojas, and small festive feasts.",
    i: Sparkles,
    link: "/",
    hash: "book",
  },
];

interface HeroSlide {
  t: string;
  bg: string;
  title: string;
  sub: string;
  d: string;
  cta: string;
  link: string;
  logo?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    t: "Weddings",
    bg: realFeastMeal,
    title: "Traditional Taste. Chennai's Pride.",
    sub: "Traditional course-by-course feast served on banana leaf",
    d: "Experience the authentic flavor of Chennai with our hygienic, delicious and memorable catering services.",
    cta: "Our Services",
    link: "/services",
  },
  {
    t: "Engagements",
    bg: weddingHall,
    title: "Exquisite Buffets & Plated Dinners",
    sub: "Creating beautiful memories for your auspicious beginnings",
    d: "Modern reception spreads, premium buffet counters, and traditional sit-down services styled to perfection.",
    cta: "Explore Services",
    link: "/services",
  },
  {
    t: "Pooja & Seemantham",
    bg: brassLamps,
    title: "Strictly Sattvik Ceremonial Catering",
    sub: "Sacred recipes cooked under Vedic slow-cooking principles",
    d: "Naivedyam-grade purity and hand-pounded spices prepared by experienced traditional chefs.",
    cta: "Explore Menu",
    link: "/menu",
  },
  {
    t: "Sweets & Payasam",
    bg: gulabJamun,
    title: "Traditional Sweets & Desserts",
    sub: "Delightful range of traditional payasams and premium sweets",
    d: "Stone-ground ingredients and pure ghee preparations cooked to round off your auspicious feast perfectly.",
    cta: "View Menu",
    link: "/menu",
  },
  {
    t: "Grand Buffets",
    bg: buffetCounter,
    title: "Premium Multi-Cuisine Buffets",
    sub: "Sophisticated dining setup with professional hospitality",
    d: "Elegant presentation, premium tableware, and custom catering menus tailored for high-profile gatherings.",
    cta: "Get Quote",
    link: "#book",
  },
  {
    t: "Corporate Events",
    bg: liveCounter,
    title: "Premium Conference & Packed Meals",
    sub: "Punctual, professional hospitality tailored for corporate events",
    d: "Hygienic corporate lunch packs, buffet stations, and tea-break catering for offices.",
    cta: "Book Event",
    link: "#book",
  },
];

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto play slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <>
      {/* HERO SECTION - CAROUSEL */}
      <section
        ref={ref}
        className="relative -mt-[60px] lg:-mt-[132px] min-h-screen text-cream flex items-center justify-center pt-24 lg:pt-[180px] pb-24 overflow-hidden bg-black select-none"
      >
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img
                src={HERO_SLIDES[currentSlide].bg}
                alt=""
                className="w-full h-full object-cover brightness-[0.35] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Marigold Garland draped at the absolute top of the page */}
        <MarigoldGarland count={12} className="absolute top-0 left-0 right-0 z-20 h-5" />

        {/* Slide Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center justify-center relative z-10 w-full text-center mt-8 min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              className="flex flex-col items-center max-w-3xl"
            >
              {/* Calligraphy script title */}
              <div className="h-[140px] md:h-[180px] flex items-center justify-center mb-4">
                {HERO_SLIDES[currentSlide].logo ? (
                  <img
                    src={HERO_SLIDES[currentSlide].logo}
                    alt={HERO_SLIDES[currentSlide].t}
                    className="h-28 md:h-36 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <span className="font-script text-white text-8xl sm:text-9xl md:text-[7rem] lg:text-[8rem] xl:text-[9rem] tracking-wide select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                    {HERO_SLIDES[currentSlide].t}
                  </span>
                )}
              </div>

              {/* Subheading/Details */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e0bb9b] leading-tight tracking-wide font-medium mt-2 max-w-4xl">
                {HERO_SLIDES[currentSlide].title}
              </h2>

              {/* Gold Ornament Divider */}
              <div className="w-24 h-[2px] bg-[#e0bb9b] my-6 opacity-75" />

              {/* Description */}
              <p className="text-cream/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-normal tracking-widest uppercase mb-8">
                {HERO_SLIDES[currentSlide].sub}
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                {HERO_SLIDES[currentSlide].link.startsWith("#") ? (
                  <button
                    onClick={() => {
                      const el = document.getElementById(HERO_SLIDES[currentSlide].link.substring(1));
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-10 py-3.5 bg-party-peach hover:bg-[#d6af8c] active:scale-95 text-white font-bold text-xs uppercase tracking-[0.22em] rounded-full transition-all shadow-[0_4px_15px_rgba(224,187,155,0.3)] duration-300"
                  >
                    {HERO_SLIDES[currentSlide].cta}
                  </button>
                ) : (
                  <Link
                    to={HERO_SLIDES[currentSlide].link}
                    className="px-10 py-3.5 bg-party-peach hover:bg-[#d6af8c] active:scale-95 text-white font-bold text-xs uppercase tracking-[0.22em] rounded-full transition-all shadow-[0_4px_15px_rgba(224,187,155,0.3)] duration-300"
                  >
                    {HERO_SLIDES[currentSlide].cta}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-6 md:left-10 z-20 w-12 h-12 border border-white/20 hover:border-white/50 flex items-center justify-center text-white bg-black/10 hover:bg-black/30 transition-all rounded-sm group active:scale-90"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-6 md:right-10 z-20 w-12 h-12 border border-white/20 hover:border-white/50 flex items-center justify-center text-white bg-black/10 hover:bg-black/30 transition-all rounded-sm group active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-12 z-20 flex gap-2.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === i ? "bg-party-peach scale-110 w-6" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Curved Wave Divider at Bottom (concave upward / dips in middle) */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-20 w-full pointer-events-none overflow-hidden z-20">
          <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-full text-[#FAF6F0] fill-current">
            <path d="M0,40 C360,95 1080,95 1440,40 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="relative py-28 bg-plum-dark text-cream overflow-hidden">
        {/* Hanging marigold toran at the top of the section */}
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        {/* Traditional Kolam background watermark */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none z-0">
          <CenterKolam size={350} />
        </div>

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_30%,rgba(212,175,55,0.25),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center z-10">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold/30">
              <img src={brassLamps} alt="Traditional South Indian brass lamps decorated with flowers" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">MCC's Philosophy</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.1]">
                The <span className="text-gold-gradient italic">Vedic</span> art of slow cooking.
              </h2>
            </Reveal>

            {/* Banana leaf draw SVG */}
            <motion.svg
              viewBox="0 0 240 80"
              className="w-44 my-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.path
                d="M10 40 Q60 5 120 40 T230 40"
                stroke="var(--gold)"
                strokeWidth="1.5"
                fill="none"
                variants={leafDraw}
              />
              <motion.path
                d="M120 40 L100 25 M120 40 L100 55 M120 40 L140 25 M120 40 L140 55"
                stroke="var(--gold)"
                strokeWidth="1"
                fill="none"
                variants={leafDraw}
              />
            </motion.svg>

            <Reveal delay={0.1}>
              <p className="text-cream/75 leading-relaxed text-lg">
                Every dish from MCC's kitchen begins before sunrise — fresh spices hand-pounded on
                stone, lentils tempered in cold-pressed sesame oil, vegetables sourced from local
                organic farms. Slow-cooked over open flame, the way our grandmothers cooked, the way
                the Vedas instructed.
              </p>
            </Reveal>

            {/* Traditional Auspicious Brass Urli with Floating Flowers */}
            <Reveal delay={0.15}>
              <div className="flex items-center gap-4 my-6 py-2 border-y border-gold/15">
                <svg width="80" height="30" viewBox="0 0 120 40" fill="none" className="text-gold shrink-0">
                  <path d="M10,25 C10,38 110,38 110,25 C104,22 16,22 10,25 Z" fill="currentColor" opacity="0.6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M45,35 Q60,39 75,35 L68,39 L52,39 Z" fill="currentColor" opacity="0.9" />
                  <circle cx="6" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="114" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="45" cy="25" r="4" fill="#FF9F1C" />
                  <circle cx="60" cy="25" r="5" fill="#FFBF00" />
                  <circle cx="75" cy="25" r="4" fill="#FF9F1C" />
                  <circle cx="35" cy="25" r="3" fill="#FFBF00" />
                  <circle cx="85" cy="25" r="3" fill="#FF9F1C" />
                  <path d="M60,18 C58,22 62,22 60,18 Z" fill="#E76F51" />
                </svg>
                <span className="text-xs text-gold/80 italic font-serif">
                  A symbol of traditional South Indian hospitality & purity.
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { i: Leaf, t: "100% Sattvik" },
                  { i: Award, t: "20+ Years" },
                  { i: Users, t: "Family-led" },
                ].map(({ i: Icon, t }) => (
                  <div key={t} className="text-center p-4 rounded-2xl border border-gold/20 bg-plum/30">
                    <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                    <div className="text-xs uppercase tracking-widest text-cream/80">{t}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MenuBuilder />

      {/* CATERING SERVICES SECTION */}
      <section className="py-24 bg-cream relative overflow-hidden">
        {/* Background Traditional Kolam watermark */}
        <div className="absolute left-[-50px] bottom-10 opacity-[0.02] text-plum pointer-events-none">
          <CenterKolam size={260} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-bold">
                SERVING HAPPINESS SINCE YEARS
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-plum-dark mt-3 leading-tight">
                Our Catering Services
              </h2>
              {/* Gold Ornament Divider */}
              <div className="flex items-center justify-center gap-4 mt-4 select-none pointer-events-none">
                <div className="w-12 h-[1px] bg-gold/50" />
                <span className="text-gold text-sm">✦</span>
                <div className="w-12 h-[1px] bg-gold/50" />
              </div>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SERVICE_CARDS.map((s) => {
              const Icon = s.i;
              return (
                <Link to={s.link} hash={s.hash} key={s.t} className="block">
                  <motion.div
                    variants={fadeInUp}
                    className="bg-white p-10 rounded-3xl border border-gold/15 hover:border-gold/30 hover:shadow-[0_15px_30px_rgba(13,46,20,0.06)] transition-all duration-500 group flex flex-col items-center text-center relative overflow-hidden min-h-[220px] justify-center cursor-pointer"
                  >
                    {/* Leaf-shaped Badge for icon */}
                    <div className="relative w-14 h-14 bg-plum rounded-tl-[24px] rounded-br-[24px] rounded-tr-[5px] rounded-bl-[5px] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-500 mb-5">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-serif text-[15px] font-bold uppercase text-plum-dark tracking-widest mt-1">
                      {s.t}
                    </h3>

                    {/* Gold separator ornament under card header */}
                    <div className="flex items-center justify-center gap-1.5 mt-2.5">
                      <div className="w-4 h-[1px] bg-gold/40" />
                      <span className="text-[8px] text-gold">✦</span>
                      <div className="w-4 h-[1px] bg-gold/40" />
                    </div>

                    {/* Elegant hover disclosure for description (keeps card extremely clean initially) */}
                    <p className="text-xs text-foreground/75 leading-relaxed mt-4 max-w-[240px] opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                      {s.d}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>

          <div className="text-center mt-14">
            <Reveal>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-plum hover:bg-plum-dark text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all group"
              >
                View All Services
                <Leaf className="w-3.5 h-3.5 fill-current text-white/90 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-plum text-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold">Voices from our table</span>
              <h2 className="font-serif text-4xl md:text-5xl mt-3">Loved across Chennai</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "Lakshmi · Avadi", q: "Every dish tasted like my paati's kitchen. Our wedding guests are still talking about the Arachuvitta Sambar." },
              { n: "Ravi & Priya · Poonamallee", q: "From the silk-saree hosts to the rose-petal newlywed table, MCC made our reception feel royal." },
              { n: "Mr. Subramanian · Ambattur", q: "Punctual, pure, and absolutely delicious. We have booked them for three family functions already." },
            ].map((t) => (
              <Reveal key={t.n}>
                <div className="bg-plum-dark/60 backdrop-blur rounded-3xl p-7 border border-gold/20 h-full">
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                    ))}
                  </div>
                  <p className="text-cream/85 leading-relaxed italic font-serif text-lg">"{t.q}"</p>
                  <div className="mt-5 pt-5 border-t border-gold/15 text-xs uppercase tracking-[0.2em] text-gold">{t.n}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-cream relative overflow-hidden">
        {/* Background Traditional Kolam watermark */}
        <div className="absolute right-[-40px] top-10 opacity-[0.02] text-plum pointer-events-none">
          <CenterKolam size={200} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-bold">
                CAPTURED MOMENTS
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-plum-dark mt-3 leading-tight">
                Our Feast Gallery
              </h2>
              {/* Gold Ornament Divider */}
              <div className="flex items-center justify-center gap-4 mt-4 select-none pointer-events-none">
                <div className="w-12 h-[1px] bg-gold/50" />
                <span className="text-gold text-sm">✦</span>
                <div className="w-12 h-[1px] bg-gold/50" />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: realFeastMeal, title: "Traditional Virundhu Saapadu" },
              { img: liveCounter, title: "Live Chaat & Counter Stations" },
              { img: weddingHall, title: "Grand Mandapam Setup" },
              { img: gulabJamun, title: "Traditional Sweet Payasam" },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-gold/15 transition-all duration-500 hover:shadow-xl hover:border-gold/30">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A163F]/90 via-[#2A163F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-left">
                      <span className="text-gold text-[9px] uppercase tracking-widest font-bold">MCC Premium</span>
                      <h4 className="font-serif text-white text-base mt-1">{item.title}</h4>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / BOOKING & BOTTOM QUALITY BANNER */}
      <section id="book" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold">Begin Your Inquiry</span>
            <h2 className="font-serif text-4xl md:text-5xl text-plum mt-3 leading-tight">
              Let MCC curate <em className="text-gold-gradient not-italic">your sacred feast.</em>
            </h2>
            <p className="mt-5 text-foreground/70 leading-relaxed">
              Share a few details and our team will respond with a tailored proposal — menu cards,
              decor mockups and an exact quote — within one business hour.
            </p>
            <div className="mt-8 flex flex-col gap-2 text-sm text-foreground/70">
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" /> Free consultation & sample tasting</div>
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" /> Custom menus across all budgets</div>
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" /> Decor, hosts & live counters included</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <BookingForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
