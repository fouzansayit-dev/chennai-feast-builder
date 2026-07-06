import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
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
  ChevronLeft,
  ChevronRight,
  Target,
  Crown,
  ChefHat,
  Coffee,
  Utensils,
  Wine,
  IceCream,
  Soup,
} from "lucide-react";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import gulabJamun from "@/assets/IMG-20260327-WA0010.jpg.jpeg";
import bananaLeafFeastBlended from "@/assets/banana-leaf-feast-blended.png";
import liveCounter from "@/assets/images-31.jpeg";
import weddingHall from "@/assets/IMG_4558.webp";
import realFeastMeal from "@/assets/2_20260624_020643_0001.png";
import buffetCounter from "@/assets/images-32.jpeg";
import aiWeddingFeast from "@/assets/ai-wedding-feast.png";
import aiTiffinFeast from "@/assets/ai-tiffin-feast.png";
import aiSweetsFeast from "@/assets/ai-sweets-feast.png";
import lotusIcon from "@/assets/lotus icon.png";
import CateringMenusSection from "@/components/CateringMenusSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { leafDraw } from "@/lib/animations";
import { CenterKolam } from "@/components/Kolam";
import MarigoldGarland from "@/components/MarigoldGarland";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Catering Services in Chennai | Wedding | Event Catering" },
      { name: "description", content: "Best catering services in Chennai for weddings and events. Trusted caters in Chennai with quality food and service. Learn more" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Best Catering Services in Chennai | Wedding | Event Catering" },
      { property: "og:description", content: "Best catering services in Chennai for weddings and events. Trusted caters in Chennai with quality food and service. Learn more" },
      { property: "og:url", content: "https://mychennaicateringservices.com/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Best Catering Services in Chennai | Wedding | Event Catering" },
      { name: "twitter:description", content: "Best catering services in Chennai for weddings and events. Trusted caters in Chennai with quality food and service." },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CateringService",
          "name": "My Chennai Catering Services",
          "alternateName": "MCC Catering",
          "image": "https://mychennaicateringservices.com/logo.png",
          "@id": "https://mychennaicateringservices.com/#cateringservice",
          "url": "https://mychennaicateringservices.com/",
          "telephone": "+919940396005",
          "priceRange": "₹₹",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Pattabiram",
            "addressRegion": "Chennai, Tamil Nadu",
            "postalCode": "600072",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "13.1256",
            "longitude": "80.0607"
          },
          "areaServed": [
            "Chennai",
            "Pattabiram",
            "Avadi",
            "Ambattur",
            "Thiruverkadu",
            "Poonamallee"
          ],
          "servesCuisine": "South Indian Pure Vegetarian",
          "founder": {
            "@type": "Person",
            "name": "D. Venkat"
          }
        })
      }
    ]
  }),
  component: Index,
});

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

const PORTRAIT_SLIDES = [
  {
    img: aiWeddingFeast,
    title: "Royal Banana Leaf Virundhu",
    desc: "Grand South Indian wedding feast with 20+ Sattvik delicacies on fresh banana leaf.",
  },
  {
    img: bananaLeafFeastBlended,
    title: "Thala Vazhai Saapadu",
    desc: "Authentic course-by-course feast served with pure ghee and hand-pounded spices.",
  },
  {
    img: aiTiffinFeast,
    title: "Mangala Udhayam Tiffin",
    desc: "Piping hot Idlis, ghee Dosa, Medu Vada, chutneys and authentic Filter Coffee.",
  },
  {
    img: realFeastMeal,
    title: "Traditional Brahmin Feast",
    desc: "Sacred recipes slow-cooked over traditional open flames under Vedic principles.",
  },
  {
    img: aiSweetsFeast,
    title: "Elaneer Payasam & Sweets",
    desc: "Creamy tender coconut payasam and traditional pure ghee South Indian sweets.",
  },
  {
    img: gulabJamun,
    title: "Traditional Desserts",
    desc: "Stone-ground ingredients and rich desserts cooked to round off your feast.",
  },
];

// TAMIL WELCOME / PHILOSOPHY TIMED CAROUSEL STATEMENTS
const TAMIL_MESSAGES = [
  {
    heading: "My Chennai Catering Services-க்கு வரவேற்கிறோம்",
    body: "எங்கள் பாரம்பரிய உணவுகள் உங்கள் வீட்டில் நடைபெறும் புனித நிகழ்வுகளை மேலும் சிறப்படையச் செய்கின்றன.",
    badge: "வரவேற்புச் செய்தி",
  },
  {
    heading: "அனைத்து சிறப்பு நிகழ்வுகளுக்கும்",
    body: "திருமணம், நிச்சயதார்த்தம், பிறந்தநாள் விழா, நிறுவன நிகழ்ச்சிகள், வீட்டுவிழாக்கள் என அனைத்து சிறப்பு நிகழ்வுகளுக்கும் தரமான சைவ கேட்டரிங் சேவையை வழங்கி வருகிறோம்.",
    badge: "எங்கள் சேவைகள்",
  },
  {
    heading: "எங்கள் அடையாளம்",
    body: "பாரம்பரிய சுவை, தரமான பொருட்கள், சுத்தமான சமையல் மற்றும் அன்பான பரிமாறுதல் ஆகியவை எங்கள் அடையாளம். ஒவ்வொரு விருந்தினரும் திருப்தியுடன் உணவருந்த வேண்டும் என்பதே எங்கள் நோக்கம்.",
    badge: "எங்கள் நோக்கம்",
  },
  {
    heading: "மறக்க முடியாத அனுபவம்",
    body: "உங்கள் நிகழ்வை சுவையான உணவுகளாலும் சிறந்த சேவையாலும் மறக்க முடியாத அனுபவமாக மாற்றுவதே எங்கள் உறுதி.",
    badge: "எங்கள் உறுதி",
  },
];

// SERVICES WE OFFER DATA
const SERVICES_OFFERED = [
  {
    title: "WEDDINGS",
    desc: "Complete wedding catering with traditional taste",
    img: weddingHall,
    icon: UtensilsCrossed,
  },
  {
    title: "ENGAGEMENTS",
    desc: "Make your engagement memorable",
    img: aiWeddingFeast,
    icon: Heart,
  },
  {
    title: "BIRTHDAYS",
    desc: "Delicious menus for birthday celebrations",
    img: gulabJamun,
    icon: Cake,
  },
  {
    title: "CORPORATE EVENTS",
    desc: "Professional catering for corporate events",
    img: buffetCounter,
    icon: Briefcase,
  },
  {
    title: "PRIVATE PARTIES",
    desc: "Custom menus for your special gatherings",
    img: liveCounter,
    icon: Sparkles,
  },
  {
    title: "SEEMANTHAM",
    desc: "Traditional & hygienic seemantham services",
    img: brassLamps,
    icon: Baby,
  },
];

// EXPLORE OUR MENUS DATA
const MENU_CATEGORIES = [
  {
    title: "SOUTH INDIAN MENU",
    img: realFeastMeal,
    icon: Utensils,
  },
  {
    title: "NORTH INDIAN MENU",
    img: buffetCounter,
    icon: ChefHat,
  },
  {
    title: "CHINESE MENU",
    img: liveCounter,
    icon: Soup,
  },
  {
    title: "FRUITS & BEVERAGES",
    img: aiSweetsFeast,
    icon: Wine,
  },
  {
    title: "SWEETS & DESSERTS",
    img: gulabJamun,
    icon: IceCream,
  },
  {
    title: "SNACKS & STARTERS",
    img: aiTiffinFeast,
    icon: Coffee,
  },
];

function Index() {
  const ref = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [portraitSlide, setPortraitSlide] = useState(0);
  const [tamilSlide, setTamilSlide] = useState(0);

  // Auto play hero landscape slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Auto play portrait slides
  useEffect(() => {
    const timer = setInterval(() => {
      setPortraitSlide((prev) => (prev + 1) % PORTRAIT_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Auto play Tamil timed messages carousel (4.5 seconds interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setTamilSlide((prev) => (prev + 1) % TAMIL_MESSAGES.length);
    }, 4500);
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
      {/* ========================================================================= */}
      {/* 1. HERO CAROUSEL SECTION                                                 */}
      {/* ========================================================================= */}
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

        {/* Marigold Garland draped at top */}
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
              <div className="h-[90px] sm:h-[140px] md:h-[180px] flex items-center justify-center mb-2 sm:mb-4">
                {HERO_SLIDES[currentSlide].logo ? (
                  <img
                    src={HERO_SLIDES[currentSlide].logo}
                    alt={HERO_SLIDES[currentSlide].t}
                    className="h-20 sm:h-28 md:h-36 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <span className="font-script text-white text-5xl sm:text-7xl md:text-[7rem] lg:text-[8rem] xl:text-[9rem] tracking-wide select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                    {HERO_SLIDES[currentSlide].t}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e0bb9b] leading-tight tracking-wide font-medium mt-2 max-w-4xl">
                {HERO_SLIDES[currentSlide].title}
              </h1>

              <div className="w-24 h-[2px] bg-[#e0bb9b] my-6 opacity-75" />

              <p className="text-cream/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-normal tracking-widest uppercase mb-8">
                {HERO_SLIDES[currentSlide].sub}
              </p>

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

        {/* Curved Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-20 w-full pointer-events-none overflow-hidden z-20">
          <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-full text-[#FAF6F0] fill-current">
            <path d="M0,40 C360,95 1080,95 1440,40 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS PILL BANNER                                                     */}
      {/* ========================================================================= */}
      <section className="bg-[#FAF6F0] pt-6 pb-12 px-4 sm:px-8 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#4d1234] via-[#541539] to-[#3f0e2b] rounded-2xl md:rounded-3xl shadow-xl text-white py-6 px-6 sm:px-10 border border-amber-400/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-amber-400/20 text-center">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center py-2 md:py-0 md:px-4">
                <Target className="w-5 h-5 text-amber-300 mb-1.5 opacity-90" />
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  15+
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-amber-200/90 uppercase mt-1">
                  YEARS<br />OF EXPERIENCE
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center py-2 md:py-0 md:px-4">
                <Crown className="w-5 h-5 text-amber-300 mb-1.5 opacity-90" />
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  3000+
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-amber-200/90 uppercase mt-1">
                  HAPPY<br />CLIENTS
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center py-2 md:py-0 md:px-4">
                <UtensilsCrossed className="w-5 h-5 text-amber-300 mb-1.5 opacity-90" />
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  4500+
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-amber-200/90 uppercase mt-1">
                  EVENTS<br />CATERED
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center py-2 md:py-0 md:px-4">
                <Sparkles className="w-5 h-5 text-amber-300 mb-1.5 opacity-90" />
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  120+
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-amber-200/90 uppercase mt-1">
                  VARIETIES<br />IN MENUS
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SERVICES WE OFFER SECTION                                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
              SERVICES WE OFFER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A1029] font-bold mt-2">
              Catering for Every Occasion
            </h2>
            
            <div className="flex items-center justify-center gap-2 mt-3 text-amber-500/80">
              <div className="w-6 h-px bg-amber-400/40" />
              <span className="text-xs">❖</span>
              <div className="w-6 h-px bg-amber-400/40" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {SERVICES_OFFERED.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  to="/services"
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-amber-900/10 hover:border-amber-400/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Icon className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase font-sans">
                      {service.title}
                    </span>
                  </div>

                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-slate-100">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug font-normal mt-auto">
                    {service.desc}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#541539] hover:bg-[#3f0e2b] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <span>VIEW ALL SERVICES</span>
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Leaf className="w-3 h-3 text-emerald-400 fill-current" />
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EXPLORE OUR MENUS SECTION                                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-amber-900/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
              EXPLORE OUR MENUS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A1029] font-bold mt-2">
              A Taste for Every Palate
            </h2>
            
            <div className="flex items-center justify-center gap-2 mt-3 text-amber-500/80">
              <div className="w-6 h-px bg-amber-400/40" />
              <span className="text-xs">❖</span>
              <div className="w-6 h-px bg-amber-400/40" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {MENU_CATEGORIES.map((menu, index) => (
              <Link
                key={index}
                to="/menu"
                className="bg-white rounded-2xl p-3.5 sm:p-4 border border-amber-900/10 hover:border-amber-400/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-slate-100">
                  <img
                    src={menu.img}
                    alt={menu.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase font-sans mt-auto">
                  {menu.title}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#541539] hover:bg-[#3f0e2b] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <span>VIEW ALL MENUS</span>
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Leaf className="w-3 h-3 text-emerald-400 fill-current" />
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHY CHOOSE US SECTION                                                 */}
      {/* ========================================================================= */}
      <WhyChooseUsSection />

      {/* ========================================================================= */}
      {/* 6. PHILOSOPHY SECTION WITH TIMED TAMIL TEXT CAROUSEL                      */}
      {/* ========================================================================= */}
      <section className="relative py-24 sm:py-28 bg-plum-dark text-cream overflow-hidden">
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none z-0">
          <CenterKolam size={350} />
        </div>

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_30%,rgba(212,175,55,0.25),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center z-10">
          
          {/* PORTRAIT CAROUSEL WITH ENHANCED BACKGROUND */}
          <Reveal>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold/30 via-plum/60 to-gold/20 rounded-[40px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-black/40 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={portraitSlide}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={PORTRAIT_SLIDES[portraitSlide].img}
                      alt={PORTRAIT_SLIDES[portraitSlide].title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-gold text-[10px] uppercase font-bold tracking-widest mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{PORTRAIT_SLIDES[portraitSlide].title}</span>
                  </div>
                  <p className="text-cream/90 text-xs font-serif italic">
                    {PORTRAIT_SLIDES[portraitSlide].desc}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setPortraitSlide((prev) => (prev - 1 + PORTRAIT_SLIDES.length) % PORTRAIT_SLIDES.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-90"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setPortraitSlide((prev) => (prev + 1) % PORTRAIT_SLIDES.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-90"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute top-4 right-4 z-30 flex gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  {PORTRAIT_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPortraitSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        portraitSlide === i ? "w-5 bg-gold" : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT SIDE: PHILOSOPHY TEXT WITH TIMED TAMIL CAROUSEL */}
          <div className="space-y-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-300/40 p-0.5 shrink-0">
                  <img src={lotusIcon} alt="Lotus" className="w-full h-full object-contain" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
                  MCC's PHILOSOPHY
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-2 leading-[1.15]">
                The <span className="text-gold-gradient italic">Vedic</span> art of slow cooking.
              </h2>
            </Reveal>

            {/* Gold ornament stroke */}
            <div className="w-32 h-[1.5px] bg-gradient-to-r from-gold via-gold/60 to-transparent my-4" />

            {/* TIMED TAMIL TEXT CAROUSEL CONTAINER */}
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-gold/25 relative min-h-[160px] flex flex-col justify-between overflow-hidden shadow-lg">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={tamilSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-3"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-[10px] uppercase font-bold tracking-widest">
                    <span>{TAMIL_MESSAGES[tamilSlide].badge}</span>
                  </div>

                  {/* Heading */}
                  <h3 className="font-serif text-xl sm:text-2xl text-amber-200 font-bold leading-tight">
                    {TAMIL_MESSAGES[tamilSlide].heading}
                  </h3>

                  {/* Tamil Paragraph */}
                  <p className="text-cream/90 text-sm sm:text-base leading-relaxed font-sans">
                    {TAMIL_MESSAGES[tamilSlide].body}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Timed Dots Indicator */}
              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-gold/15">
                {TAMIL_MESSAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTamilSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      tamilSlide === idx ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Tamil slide ${idx + 1}`}
                  />
                ))}
                <span className="text-[10px] text-cream/50 ml-auto font-mono">
                  {tamilSlide + 1} / {TAMIL_MESSAGES.length}
                </span>
              </div>

            </div>

            <Reveal delay={0.15}>
              <div className="flex items-center gap-4 py-2 border-y border-gold/15">
                <svg width="80" height="30" viewBox="0 0 120 40" fill="none" className="text-gold shrink-0">
                  <path d="M10,25 C10,38 110,38 110,25 C104,22 16,22 10,25 Z" fill="currentColor" opacity="0.6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M45,35 Q60,39 75,35 L68,39 L52,39 Z" fill="currentColor" opacity="0.9" />
                  <circle cx="6" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="114" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="text-xs text-gold/80 italic font-serif">
                  A symbol of traditional South Indian hospitality & purity.
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
                {[
                  { i: Leaf, t: "100% Sattvik" },
                  { i: Award, t: "20+ Years" },
                  { i: Users, t: "Family-led" },
                ].map(({ i: Icon, t }) => (
                  <div key={t} className="text-center p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-gold/20 bg-plum/30">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold mx-auto mb-1.5 sm:mb-2" />
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-cream/80">{t}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* CATERING MENUS SECTION */}
      <CateringMenusSection />

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
