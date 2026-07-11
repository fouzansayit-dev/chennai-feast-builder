import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChefHat,
  Star,
  ChevronRight,
  Plus,
  Trash,
  Phone,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useCart, ALL_DISHES } from "@/hooks/useCart";
import { toast } from "sonner";

import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import gulabJamun from "@/assets/IMG-20260327-WA0010.jpg.jpeg";
import bananaLeafFeastBlended from "@/assets/banana-leaf-feast-blended.png";
import bananaLeafReal from "@/assets/banana-leaf-real.jpg";
import weddingHall from "@/assets/IMG_4558.webp";
import realFeastMeal from "@/assets/2_20260624_020643_0001.png";
import buffetCounter from "@/assets/images-32.jpeg";
import corporateCatering from "@/assets/corporate-catering.jpg";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner 2.jpg";
import banner3 from "@/assets/banner 3.jpg";
import engagementCatering from "@/assets/engagement-catering.jpg";
import aiWeddingFeast from "@/assets/ai-wedding-feast.png";
import aiTiffinFeast from "@/assets/ai-tiffin-feast.png";
import aiSweetsFeast from "@/assets/ai-sweets-feast.png";
import BookingForm from "./BookingForm";
import HowItWorksSection from "./HowItWorksSection";
import { useMediaImages } from "@/hooks/useMediaImages";

// HERO_CAROUSEL_SLIDES and STORIES are declared dynamically inside MobileAppHome using useMediaImages()

const PACKAGES = [
  {
    id: "pkg1",
    title: "Royal Banana Leaf Feast",
    desc: "Grand feast served course-by-course on fresh banana leaves.",
    img: realFeastMeal,
    rating: "4.9",
    reviews: "1,240+",
    itemsCount: 24,
    badge: "Premium",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    highlights: ["Sarkkarai Pongal", "Authentic Sambar", "Elaneer Payasam", "Live Appam"],
    packageKey: "moderate" as const
  },
  {
    id: "pkg2",
    title: "Engagement Feast",
    desc: "Elegant sit-down engagement meal with floral décor & warm hospitality.",
    img: engagementCatering,
    rating: "4.9",
    reviews: "560+",
    itemsCount: 20,
    badge: "Special",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    highlights: ["Bridal Table Setup", "Traditional Saapadu", "Ghee Sweets", "Tender Coconut"],
    packageKey: "executive" as const
  },
  {
    id: "pkg3",
    title: "Elite Corporate Buffet",
    desc: "Professional buffet spreads with live counters for corporate events & conferences.",
    img: corporateCatering,
    rating: "4.8",
    reviews: "820+",
    itemsCount: 30,
    badge: "Corporate",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    highlights: ["Live Chat Station", "Veg Biryani", "Tandoori Platters", "Filter Coffee"],
    packageKey: "tiffin" as const
  },
];

const TASTING_ITEMS = [
  { id: "l1", name: "Elaneer Payasam", category: "Desserts", img: gulabJamun },
  { id: "l2", name: "Ghee Mysore Pak", category: "Sweets", img: aiSweetsFeast },
  { id: "b5", name: "Mini Podi Idli", category: "Starters", img: aiTiffinFeast },
  { id: "s1", name: "Chettinad Onion Pakoda", category: "Snacks", img: brassLamps },
  { id: "l11", name: "Thala Vazhai Ela", category: "Feast", img: realFeastMeal },
];



export default function MobileAppHome() {
  const { getImg } = useMediaImages();

  const HERO_CAROUSEL_SLIDES = [
    {
      eyebrow: "Premium Catering",
      title: "Authentic Flavours",
      sub: "Expert catering for weddings, corporate events & all celebrations.",
      img: getImg("mobile_hero_1", banner2),
      cta: "Get Free Quote",
      link: "#book",
      accent: "from-amber-900/70 via-black/40 to-transparent",
    },
    {
      eyebrow: "Engagement Catering",
      title: "Engagement\nCatering",
      sub: "Elegant sit-down feasts on banana leaves with floral décor & warm hospitality.",
      img: getImg("mobile_hero_2", engagementCatering),
      cta: "Book Your Engagement",
      link: "/engagement-catering-services-in-chennai",
      accent: "from-orange-900/60 via-black/40 to-transparent",
    },
    {
      eyebrow: "Wedding Specialists",
      title: "Wedding\nCelebrations",
      sub: "Customised menus crafted with tradition, taste, and care.",
      img: getImg("hero_slide_2", banner3),
      cta: "Explore Services",
      link: "/services",
      accent: "from-purple-900/60 via-black/40 to-transparent",
    },
    {
      eyebrow: "20+ Years Legacy",
      title: "Trusted\nSince 2004",
      sub: "Over two decades of delivering quality food & professional hospitality.",
      img: getImg("mobile_hero_3", banner1),
      cta: "Book Your Event",
      link: "#book",
      accent: "from-red-900/60 via-black/40 to-transparent",
    },
    {
      eyebrow: "Traditional Feasts",
      title: "Traditional\nFeasts",
      sub: "Pure ghee, fresh ingredients, 24+ items — served with love.",
      img: getImg("portrait_2", bananaLeafReal),
      cta: "View Menus",
      link: "/menu",
      accent: "from-green-900/60 via-black/40 to-transparent",
    },
  ];

  const STORIES = [
    {
      label: "Weddings",
      img: getImg("home_services_wedding", weddingHall),
      to: "/wedding-catering-services-in-chennai",
      emoji: "💒",
    },
    {
      label: "Engagements",
      img: getImg("mobile_hero_2", engagementCatering),
      to: "/engagement-catering-services-in-chennai",
      emoji: "💍",
    },
    {
      label: "Corporate",
      img: getImg("home_services_corporate", corporateCatering),
      to: "/corporate-catering-services-in-chennai",
      emoji: "🏢",
    },
    {
      label: "Feast Menus",
      img: getImg("portrait_4", realFeastMeal),
      to: "/menu",
      emoji: "🍃",
    },
    {
      label: "Gallery",
      img: getImg("gallery_1", weddingHall),
      to: "/gallery",
      emoji: "📸",
    },
  ];

  const { addToCart, removeFromCart, cartItems, totalCount, guestCount } = useCart();
  const [tastingTray, setTastingTray] = useState<typeof TASTING_ITEMS>([]);
  const [activePkg, setActivePkg] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const pkgScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (pkgScrollRef.current) {
      const cards = pkgScrollRef.current.children;
      if (cards[activePkg]) {
        (cards[activePkg] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activePkg]);

  const toggleTastingItem = (item: typeof TASTING_ITEMS[number]) => {
    const isAlreadyInTray = tastingTray.some((t) => t.id === item.id);
    if (isAlreadyInTray) {
      setTastingTray(tastingTray.filter((t) => t.id !== item.id));
      removeFromCart(item.id);
      toast.success(`Removed ${item.name} from Cart`);
    } else {
      if (tastingTray.length >= 4) {
        toast.error("You can select up to 4 items for the Tasting Tray!");
        return;
      }
      setTastingTray([...tastingTray, item]);
      addToCart(item.id, 1);
      toast.success(`Added ${item.name} to Cart`);
    }
  };

  const addPackageToCart = (packageKey: "tiffin" | "moderate" | "executive", title: string) => {
    const dishes = ALL_DISHES.filter((d) => {
      if (packageKey === "tiffin") return d.slot === "breakfast";
      if (packageKey === "moderate") return d.slot === "lunch";
      return d.slot === "dinner" || d.slot === "lunch";
    });
    
    dishes.forEach((d) => addToCart(d.id, 1));
    toast.success(`Added ${dishes.length} items from ${title} package to Cart!`);
  };

  const slide = HERO_CAROUSEL_SLIDES[currentHeroSlide];

  return (
    <div className="bg-[#FAF7F3] min-h-screen pb-24 text-[#1A1208]">

      {/* ── HERO CAROUSEL ───────────────────────────────────────────────── */}
      <div className="relative h-[70vh] w-full overflow-hidden select-none bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${slide.accent} to-40%`} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-8 z-10 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Eyebrow label */}
              <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-amber-300 mb-3">
                <span className="w-4 h-px bg-amber-400 inline-block" />
                {slide.eyebrow}
                <span className="w-4 h-px bg-amber-400 inline-block" />
              </span>

              {/* Title — Great Vibes script font */}
              <h2 className="font-script text-[3rem] sm:text-[3.5rem] font-normal text-white leading-tight whitespace-pre-line drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] tracking-wide">
                {slide.title}
              </h2>

              {/* Gold divider */}
              <div className="w-16 h-px bg-amber-400/60 my-3" />

              {/* Subtitle */}
              <p className="text-white/80 text-[11px] leading-relaxed max-w-[270px] uppercase tracking-wider">
                {slide.sub}
              </p>

              {/* CTAs */}
              <div className="mt-5 flex items-center gap-3">
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8922A] hover:bg-[#b07d22] active:scale-95 text-white font-bold text-[10px] uppercase tracking-wider rounded-full transition-all shadow-lg duration-200"
                >
                  {slide.cta}
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <a
                  href="tel:+919940396005"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold text-[10px] uppercase tracking-wider rounded-full transition-all active:scale-95"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {HERO_CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroSlide(idx)}
              className={`h-1 rounded-full transition-all duration-400 ${
                idx === currentHeroSlide
                  ? "bg-amber-400 w-5"
                  : "bg-white/40 w-1.5"
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 z-20 bg-black/30 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-full">
          <span className="text-[9px] font-bold text-white/80 tabular-nums">
            {currentHeroSlide + 1} / {HERO_CAROUSEL_SLIDES.length}
          </span>
        </div>
      </div>

      {/* ── QUICK NAV STORIES ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-100 shadow-sm">
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-4 py-3">
          {STORIES.map((story) => (
            <Link
              key={story.label}
              to={story.to}
              className="flex flex-col items-center gap-1.5 shrink-0 group"
            >
              <div className="w-[58px] h-[58px] rounded-2xl overflow-hidden border-2 border-amber-200 group-active:scale-95 transition-transform shadow-sm relative">
                <img
                  src={story.img}
                  alt={story.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Emoji badge */}
                <div className="absolute bottom-0.5 right-0.5 text-[10px] leading-none bg-white rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {story.emoji}
                </div>
              </div>
              <span className="text-[9px] font-bold text-[#4A3000]/80 tracking-wide uppercase text-center leading-tight">
                {story.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── ENGAGEMENT FEATURE BANNER ────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-2">
        <Link to="/engagement-catering-services-in-chennai">
          <div className="relative rounded-2xl overflow-hidden h-36 shadow-md border border-amber-200/50 group active:scale-[0.98] transition-transform">
            <img
              src={engagementCatering}
              alt="Engagement Catering in Chennai"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-5">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-amber-300 mb-1">
                ✦ New Service
              </span>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                Engagement Catering
                <br />
                <span className="text-amber-200">in Chennai</span>
              </h3>
              <p className="text-white/70 text-[9px] mt-1">
                Elegant banana leaf feasts with floral décor
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1 text-amber-300 text-[9px] font-extrabold uppercase tracking-wider">
                Book Now <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* ── SAAPADU CUSTOMIZER CTA ────────────────────────────────────────────── */}
      <div className="px-4 py-3">
        <div className="bg-[#1E1108] text-[#FAF7F3] rounded-2xl p-5 border border-amber-900/30 shadow-xl relative overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-amber-500/8 blur-xl" />
          <div className="absolute -right-4 -bottom-4 opacity-[0.07]">
            <ChefHat className="w-24 h-24 text-amber-400" />
          </div>

          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1 pr-4">
              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider border border-amber-500/20 mb-2">
                <Sparkles className="w-2.5 h-2.5" /> Core Feature
              </span>
              <h2 className="font-serif text-[1.1rem] font-bold text-amber-100 leading-snug">
                Customize Your Own<br />Saapadu Menu
              </h2>
              <p className="text-[10px] text-[#FAF7F3]/60 mt-1.5 leading-relaxed">
                Pick items, calculate plate costs & get an instant custom quote.
              </p>
            </div>
            <Link
              to="/customize"
              className="shrink-0 w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md active:scale-90 transition-transform mt-1"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
          </div>

          <Link
            to="/customize"
            className="mt-4 flex items-center justify-between w-full bg-amber-500/10 hover:bg-amber-500/15 text-amber-300 px-4 py-2.5 rounded-xl border border-amber-500/20 text-[10px] font-extrabold uppercase tracking-widest active:scale-95 transition-transform relative z-10"
          >
            <span>Launch Saapadu Customizer</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── POPULAR PACKAGES ─────────────────────────────────────────────── */}
      <div className="pt-5 pb-2">
        {/* Header */}
        <div className="px-4 flex items-end justify-between mb-3">
          <div>
            <span className="text-[8.5px] font-extrabold text-amber-700 uppercase tracking-[0.2em] block mb-0.5">
              Signature Spreads
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1A1208]">Popular Packages</h3>
          </div>
          <Link
            to="/menu"
            className="text-[9px] text-amber-700 font-bold uppercase tracking-wider flex items-center gap-0.5"
          >
            All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Cards */}
        <div
          ref={pkgScrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2"
        >
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePkg(idx)}
              className={`bg-white rounded-2xl border shadow-sm p-3.5 w-64 shrink-0 flex flex-col cursor-pointer transition-all duration-300 ${
                activePkg === idx
                  ? "border-amber-400 shadow-amber-100 shadow-md"
                  : "border-neutral-100 hover:border-amber-200"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative h-32 rounded-xl overflow-hidden">
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 right-2 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${pkg.badgeColor}`}>
                  {pkg.badge}
                </span>
              </div>

              {/* Info */}
              <div className="mt-2.5 flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[8.5px] font-bold text-neutral-500">
                    {pkg.rating} ({pkg.reviews})
                  </span>
                </div>
                <h4 className="font-serif text-[13px] font-bold text-[#1A1208] leading-snug">
                  {pkg.title}
                </h4>
                <p className="text-[9.5px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  {pkg.desc}
                </p>

                {/* Highlights */}
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {pkg.highlights.map((hl) => (
                    <span
                      key={hl}
                      className="bg-amber-50 text-amber-800 text-[8px] font-bold px-1.5 py-0.5 rounded-md border border-amber-200 whitespace-nowrap"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5">
                <span className="text-[9px] text-neutral-400 font-semibold">
                  {pkg.itemsCount} items
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addPackageToCart(pkg.packageKey, pkg.title);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-white p-1.5 rounded-full active:scale-90 transition-all flex items-center justify-center shrink-0"
                    title="Add package to Cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    to="/customize"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#1E1108] text-amber-300 px-3 py-1.5 rounded-full text-[8.5px] font-extrabold uppercase tracking-wide active:scale-90 transition-all border border-amber-900/20"
                  >
                    Customize
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-1.5 mt-3">
          {PACKAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActivePkg(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                activePkg === idx ? "w-4 bg-amber-500" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── TASTING TRAY BUILDER ─────────────────────────────────────────── */}
      <div className="px-4 py-4">
        <div className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div>
              <span className="text-[8.5px] font-extrabold text-amber-700 uppercase tracking-[0.2em] block mb-0.5">
                Interactive
              </span>
              <h3 className="font-serif text-base font-bold text-[#1A1208]">Taste Tray Customizer</h3>
            </div>
            <div className="bg-[#1E1108] text-amber-300 text-[9px] font-extrabold px-2.5 py-1 rounded-full border border-amber-900/20">
              🍽 {tastingTray.length}/4
            </div>
          </div>
          <p className="text-[9.5px] text-neutral-500 leading-normal mb-3">
            Pick up to 4 favourites to build a sample tasting tray.
          </p>

          {/* Tray Preview */}
          <div className="h-14 bg-amber-50 rounded-xl border border-dashed border-amber-300/60 flex items-center gap-2 px-3 overflow-hidden mb-3">
            {tastingTray.length === 0 ? (
              <span className="text-[9.5px] text-neutral-400 italic w-full text-center">
                Tap items below to add to tray
              </span>
            ) : (
              <AnimatePresence>
                {tastingTray.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-1 bg-white border border-amber-200 px-2 py-1 rounded-full shadow-sm shrink-0"
                  >
                    <span className="text-[9px] font-bold text-[#1A1208] whitespace-nowrap">{item.name}</span>
                    <button
                      onClick={() => toggleTastingItem(item)}
                      className="text-red-400 hover:text-red-600 ml-0.5 shrink-0 active:scale-90 transition-transform"
                    >
                      <Trash className="w-2.5 h-2.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Item Grid */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {TASTING_ITEMS.map((item) => {
              const isSelected = tastingTray.some((t) => t.id === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleTastingItem(item)}
                  className={`flex flex-col items-center p-2 rounded-xl border transition-all shrink-0 w-[68px] active:scale-93 ${
                    isSelected
                      ? "bg-amber-50 border-amber-400 shadow-sm"
                      : "bg-neutral-50 border-neutral-100 hover:border-amber-200"
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-amber-50 border border-amber-100">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[8px] font-bold text-[#1A1208] mt-1 line-clamp-1 w-full text-center">
                    {item.name}
                  </span>
                  <span className="text-[7px] text-neutral-400 font-semibold mt-0.5">
                    {item.category}
                  </span>
                  <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? "bg-amber-500 border-amber-500"
                      : "bg-white border-neutral-200"
                  }`}>
                    {isSelected ? (
                      <span className="text-white text-[8px] font-bold">✓</span>
                    ) : (
                      <Plus className="w-2.5 h-2.5 text-neutral-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {totalCount > 0 && (
            <Link
              to="/customize"
              className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-[9.5px] font-extrabold uppercase tracking-wider active:scale-95 transition-all shadow-lg"
            >
              View Cart & Customize ({totalCount} Items)
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <HowItWorksSection />

      {/* ── WHY MCC ──────────────────────────────────────────────────────── */}
      <div className="px-4 py-4">
        {/* Section header */}
        <div className="mb-4">
          <span className="text-[8.5px] font-extrabold text-amber-700 uppercase tracking-[0.2em] block mb-0.5">
            Our Promise
          </span>
          <h3 className="font-serif text-lg font-bold text-[#1A1208]">Why Choose MCC?</h3>
        </div>

        <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-normal bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm">
          Choosing the right caterer is essential to the success of any event, and at My Chennai Catering, we are committed to delivering an experience that goes beyond great food. We prepare every dish using fresh, high-quality ingredients while preserving the authentic flavours of South Indian cuisine. Our experienced chefs and professional service team work closely with you to create customized menus that suit your event, traditions, and budget. From planning and preparation to timely service and flawless execution, we handle every detail with care and precision. Our dedication to quality, hygiene, affordability, and customer satisfaction has made us one of the most trusted catering service providers in Chennai.
        </p>
      </div>

      {/* ── BOOKING FORM ─────────────────────────────────────────────────── */}
      <div className="px-4 py-4">
        <div className="bg-[#1E1108] text-[#FAF7F3] rounded-2xl p-5 border border-amber-900/20 shadow-xl" id="book">
          <span className="text-[8.5px] font-extrabold text-amber-400 uppercase tracking-[0.22em] block text-center mb-1">
            Inquire Instantly
          </span>
          <h3 className="font-serif text-xl font-bold text-center text-amber-100 leading-snug">
            Get a Custom Proposal
          </h3>
          <p className="text-[9.5px] text-center text-[#FAF7F3]/50 mt-1.5 max-w-[260px] mx-auto leading-relaxed">
            Share your event details — we'll send a personalised menu proposal within 1 hour.
          </p>
          <div className="mt-5 text-[#1A1208]">
            <BookingForm />
          </div>
        </div>
      </div>

    </div>
  );
}
