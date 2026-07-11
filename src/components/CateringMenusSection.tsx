import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowRight, Check, Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import realFeastMeal from "@/assets/2_20260624_020643_0001.png";
import liveCounter from "@/assets/images-31.jpeg";
import weddingHall from "@/assets/IMG_4558.webp";
import gulabJamun from "@/assets/IMG-20260327-WA0010.jpg.jpeg";
import buffetCounter from "@/assets/images-32.jpeg";
import corporateCatering from "@/assets/corporate-catering.jpg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";

export interface CateringMenuOption {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  description: string;
  packageKey?: "tiffin" | "moderate" | "executive";
  courses: {
    category: string;
    items: string[];
  }[];
}

const MENU_OPTIONS: CateringMenuOption[] = [
  {
    id: "delivery-menu",
    title: "EXECUTIVE PACKED MEALS",
    subtitle: "Hygienic Packed Tiffin & Meal Boxes",
    img: realFeastMeal,
    packageKey: "tiffin",
    description:
      "Freshly prepared, eco-friendly packed meals & breakfast boxes delivered directly to your venue with pristine warmth & hygiene.",
    courses: [
      { category: "Breakfast Tiffin", items: ["Soft Ghee Mini Idlies", "Rava Dosa", "Filter Coffee", "Kara Chutney"] },
      { category: "Executive Lunch Box", items: ["Veg Biryani", "Raita", "Curd Rice", "Sweet Gulab Jamun", "Appalam"] },
    ],
  },
  {
    id: "heritage-menu",
    title: "HERITAGE MENU",
    subtitle: "Authentic South Indian Banana Leaf Virundhu",
    img: brassLamps,
    packageKey: "moderate",
    description:
      "Traditional course-by-course Brahmin Virundhu Saapadu served on fresh banana leaf with hand-pounded spices slow-cooked over flame.",
    courses: [
      { category: "Welcome Drinks & Sweets", items: ["Elaneer Payasam", "Hot Gulab Jamun", "Fresh Fruit Juice"] },
      { category: "Traditional Saapadu", items: ["White Rice", "Arachuvitta Sambar", "Pepper Rasam", "Vathakulambu", "Urulai Pattani Poriyal", "Appalam"] },
    ],
  },
  {
    id: "classic-wedding",
    title: "CLASSIC WEDDING",
    subtitle: "Grand Mandapam Marriage Banquet",
    img: weddingHall,
    packageKey: "executive",
    description:
      "Royal multi-course wedding dining spread with grand mandapam presentation, silk-uniformed servers, and elaborate dessert counters.",
    courses: [
      { category: "Royal Starters", items: ["Paneer Tikka", "Gobi 65", "Veg Spring Roll"] },
      { category: "Breads & Main Course", items: ["Butter Naan", "Paneer Butter Masala", "Mushroom Biryani", "Bisibelabath"] },
      { category: "Grand Sweets", items: ["Rasamalai", "Malai Roll", "Ghevar", "Traditional Payasam"] },
    ],
  },
  {
    id: "social-events",
    title: "SOCIAL EVENTS",
    subtitle: "Engagements, Seemantham & Birthday Parties",
    img: gulabJamun,
    packageKey: "moderate",
    description:
      "Curated ceremonial feasts crafted for sacred milestone events like Griha Pravesham, Seemantham, and elegant family gatherings.",
    courses: [
      { category: "Ceremonial Delicacies", items: ["Special Paruppu Payasam", "Medu Vada", "Veg Pulav"] },
      { category: "South Special", items: ["Arachuvitta Sambar", "Mor Kulambu", "Beans Paruppu Usili", "Curd Rice"] },
    ],
  },
  {
    id: "modern-dinner",
    title: "MODERN DINNER",
    subtitle: "Live Counters, Chaat & Fusion Spreads",
    img: liveCounter,
    packageKey: "executive",
    description:
      "Interactive live dining experience featuring contemporary chaat counters, hot Dosa stations, mocktails, and gourmet appetizers.",
    courses: [
      { category: "Live Counter Specialties", items: ["Pani Puri Station", "Pav Bhaji Counter", "Hot Spot Dosa & Uttapam Bar"] },
      { category: "Desserts & Drinks", items: ["Elaneer Payasam Shot Glass", "Ice Cream Sundae Bar", "Fresh Watermelon Mocktail"] },
    ],
  },
  {
    id: "corporate-menu",
    title: "CORPORATE MENU",
    subtitle: "Punctual Executive Buffets & Conferences",
    img: corporateCatering,
    packageKey: "tiffin",
    description:
      "Seamless corporate hospitality with professional buffet setups, high-tea arrangements, and packaged conference meal boxes.",
    courses: [
      { category: "Executive Spread", items: ["Assorted Sandwich Platter", "Veg Cutlets", "Filter Coffee & Tea"] },
      { category: "Conference Buffet", items: ["Veg Biryani", "Paneer Gravy", "Roti", "Salad", "Sweet Dish"] },
    ],
  },
];

export default function CateringMenusSection() {
  const [menuOptions, setMenuOptions] = useState<CateringMenuOption[]>(MENU_OPTIONS);
  const [selectedMenu, setSelectedMenu] = useState<CateringMenuOption | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${base}/menu-packages`);
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          const dbPkgs = result.data;
          
          const updatedOptions = MENU_OPTIONS.map(opt => {
            const match = dbPkgs.find((p: any) => p.name.toLowerCase() === opt.title.toLowerCase());
            if (match) {
              return {
                ...opt,
                description: match.description || opt.description,
                subtitle: match.price ? `₹${match.price} per plate` : opt.subtitle
              };
            }
            return opt;
          });

          dbPkgs.forEach((p: any) => {
            const exists = MENU_OPTIONS.some(opt => opt.title.toLowerCase() === p.name.toLowerCase());
            if (!exists) {
              updatedOptions.push({
                id: `db-pkg-${p.id}`,
                title: p.name,
                subtitle: p.price ? `₹${p.price} per plate` : "Custom Premium Package",
                img: realFeastMeal,
                description: p.description || "Premium catering services customized to your event requirements.",
                courses: [
                  { category: "Menu Details", items: [p.description || "Customized catering menu options"] }
                ]
              });
            }
          });

          setMenuOptions(updatedOptions);
        }
      } catch (err) {
        console.warn("Failed to fetch menu packages from database, using static options:", err);
      }
    };
    fetchPackages();
  }, []);

  const handleCustomizeClick = (menu: CateringMenuOption) => {
    setSelectedMenu(null);
    navigate({ to: "/customize" });
  };

  const handleRequestQuote = () => {
    setSelectedMenu(null);
    const bookEl = document.getElementById("book");
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate({ to: "/contact" });
    }
  };

  return (
    <section id="menus" className="py-24 bg-[#FAF7F2] text-[#3E3127] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#B88E56] font-bold block mb-2">
            EXPLORE MENU OPTIONS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#3E2E23] tracking-wide font-normal">
            CATERING MENUS
          </h2>
          <div className="w-16 h-[2px] bg-[#DCA46A]/60 mx-auto mt-4" />
        </div>

        {/* 6 Menu Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuOptions.map((menu) => (
            <motion.div
              key={menu.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedMenu(menu)}
              className="bg-[#F2ECE1] rounded-2xl p-6 flex flex-col justify-between cursor-pointer border border-[#E4DACB] hover:border-[#DCA46A] hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Top Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif text-lg md:text-xl tracking-wider text-[#3A2E26] font-medium group-hover:text-[#B88E56] transition-colors">
                    {menu.title}
                  </h3>
                  <p className="text-[11px] text-[#7A6A5C] tracking-wide mt-1 line-clamp-1 font-sans">
                    {menu.subtitle}
                  </p>
                </div>
                {/* Plus Icon Badge */}
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-[#E2D6C5] group-hover:bg-[#DCA46A] group-hover:text-white group-hover:border-[#DCA46A] transition-all">
                  <Plus className="w-4 h-4 text-[#7A6A5C] group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Card Food Image Bottom */}
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-inner bg-[#E6DCCF]">
                <img
                  src={menu.img}
                  alt={menu.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call & Quote Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <p className="text-sm md:text-base text-[#5C4D40] font-medium font-sans">
            Call us now{" "}
            <a href="tel:+919940396005" className="text-[#C68D49] font-bold hover:underline">
              +91 99403 96005
            </a>{" "}
            or request a quote without obligation.
          </p>
          <button
            onClick={handleRequestQuote}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#DCA46A] hover:bg-[#C69258] active:scale-95 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-md duration-300"
          >
            REQUEST A QUOTE
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Menu Detail Modal on "+" Click */}
      <AnimatePresence>
        {selectedMenu && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#FAF7F2] text-[#3E3127] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 border border-[#E4DACB] shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMenu(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#EFE8DC] hover:bg-[#DCA46A] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88E56] font-bold block mb-1">
                MENU DETAILS
              </span>
              <h3 className="font-serif text-3xl text-[#3E2E23] mb-2">{selectedMenu.title}</h3>
              <p className="text-xs text-[#7A6A5C] mb-6">{selectedMenu.description}</p>

              {/* Course items */}
              <div className="space-y-6 mb-8">
                {selectedMenu.courses.map((course) => (
                  <div key={course.category} className="bg-white/80 p-5 rounded-2xl border border-[#E5DACB]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#B88E56] mb-3">
                      {course.category}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {course.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-[#4A3D33]">
                          <Check className="w-3.5 h-3.5 text-[#DCA46A]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleCustomizeClick(selectedMenu)}
                  className="w-full sm:flex-1 py-3.5 bg-[#3E2E23] hover:bg-[#2A1D15] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#DCA46A]" />
                  CUSTOMIZE IN SAAPADU PLANNER
                </button>
                <button
                  onClick={handleRequestQuote}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#DCA46A] hover:bg-[#C69258] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all cursor-pointer shadow-md active:scale-95"
                >
                  GET DIRECT QUOTE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
