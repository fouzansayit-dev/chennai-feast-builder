import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Leaf,
  Clock,
  Send,
  X,
  Phone,
  Calendar,
  Users,
  Utensils,
  ChevronRight,
  Sparkles,
  ArrowRight,
  FileText,
  Share2,
  CheckCircle2,
  Lock
} from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";
import bananaLeafBg from "@/assets/banana-leaf-feast-blended.png";

// DISH ITEM INTERFACE
export interface DishItem {
  id: string;
  name: string;
  category: string;
  slot: "breakfast" | "brunch" | "lunch" | "snacks" | "dinner";
  isVeg: boolean;
  price: string;
  desc?: string;
  tag?: string;
}

// SEED MENU DISHES CATALOG
const ALL_DISHES: DishItem[] = [
  // MORNING BREAKFAST
  { id: "b1", name: "Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Soft & fluffy steamed rice cakes" },
  { id: "b2", name: "Chilli Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Tossed in spicy Capsicum masala" },
  { id: "b3", name: "Garlic Podi Idly Fry", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Crispy fried with Poondu Podi & Ghee" },
  { id: "b4", name: "Kancheepuram Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Tempered with pepper, cumin & cashews" },
  { id: "b5", name: "Mini Ghee Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Served floating in hot Sambar with Pure Ghee", tag: "Bestseller" },
  { id: "b6", name: "Kushboo Idly", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Ultra soft hotel-style idlies" },
  { id: "b7", name: "Medu Vada", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Crispy lentil donut with ginger & pepper" },
  { id: "b8", name: "Ven Pongal", category: "Tiffin (Main)", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Pure Ghee pepper cashew rice pongal", tag: "Must Have" },
  { id: "b9", name: "Ghee Roast Dosa", category: "Dosa Varieties", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Golden thin crispy roast in pure cow ghee" },
  { id: "b10", name: "Poori Masala", category: "Poori & Tiffin", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Puffy fried poori with yellow potato masala" },
  { id: "b11", name: "Hotel Sambar", category: "Sides & Chutneys", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Aromatic shallot & drumstick sambar" },
  { id: "b12", name: "Coconut Chutney", category: "Sides & Chutneys", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Fresh coconut chutney with mustard tempering" },
  { id: "b13", name: "Kara Chutney", category: "Sides & Chutneys", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Spicy onion tomato red chutney" },
  { id: "b14", name: "Degree Filter Coffee", category: "Hot Drinks", slot: "breakfast", isVeg: true, price: "Price on Request", desc: "Traditional Kumbakonam Filter Coffee in brass dabba", tag: "Signature" },

  // BRUNCH
  { id: "br1", name: "Lemon Rice", category: "Varieties Rice", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Tangy tempered lemon rice with peanuts" },
  { id: "br2", name: "Curd Rice with Fruits", category: "Varieties Rice", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Creamy curd rice garnished with pomegranate & grapes" },
  { id: "br3", name: "Bisibelabath", category: "Varieties Rice", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Hot lentil rice with ghee, cashews & veggies" },
  { id: "br4", name: "Coconut Rice", category: "Varieties Rice", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Tempered fresh coconut rice with cashews" },
  { id: "br5", name: "Potato Kara Curry", category: "Add-ons", slot: "brunch", isVeg: true, price: "Price on Request", desc: "Spicy roasted potato fry" },

  // LUNCH (FULL VIRUNDHU FEAST)
  { id: "l1", name: "Elaneer Payasam", category: "Payasam & Sweets", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Tender coconut flesh with condensed milk & cardamom", tag: "MCC Special" },
  { id: "l2", name: "Traditional Mysurpa", category: "Payasam & Sweets", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Melt-in-mouth pure ghee Mysurpa" },
  { id: "l3", name: "Arachu Vitta Sambar", category: "Main Gravies", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Freshly roasted spice blend Sambar" },
  { id: "l4", name: "Kalyana Vathakulambu", category: "Main Gravies", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Tangy Sundakkai & Manathakkali vathakulambu" },
  { id: "l5", name: "Poondu Rasam", category: "Rasam", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Aromatic garlic pepper rasam" },
  { id: "l6", name: "Urulai Podi Roast", category: "Poriyal & Kootu", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Baby potatoes roasted in Chettinad podi" },
  { id: "l7", name: "Special Vegetable Avial", category: "Poriyal & Kootu", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Traditional Kerala style coconut veggie avial" },
  { id: "l8", name: "Vazhaipoo Poriyal", category: "Poriyal & Kootu", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Healthy banana flower coconut fry" },
  { id: "l9", name: "Seeraga Samba Veg Biryani", category: "Biryani & Rice", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Fragrant Seeraga Samba rice dum biryani" },
  { id: "l10", name: "Curd Rice with Mango Pickle", category: "Rice & Extras", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Thick curd rice with homemade vadu mangai" },
  { id: "l11", name: "Thala Vazhai Ela & Appalam", category: "Leaf Extras", slot: "lunch", isVeg: true, price: "Price on Request", desc: "Fresh tender Tanjore banana leaf & crunchy appalam" },

  // EVENING SNACKS
  { id: "s1", name: "Chettinad Onion Pakoda", category: "Snacks", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Crispy fried sliced onion fritters" },
  { id: "s2", name: "Mysore Bonda", category: "Snacks", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Crispy soft maida bonda with coconut chutney" },
  { id: "s3", name: "Mini Vegetable Cutlet", category: "Starters", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Golden breaded spiced potato beetroot cutlet" },
  { id: "s4", name: "Paneer 65", category: "Starters", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Crispy spiced cottage cheese cubes" },
  { id: "s5", name: "Sukku Malli Tea", category: "Hot Drinks", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Healthy ginger coriander herbal tea" },
  { id: "s6", name: "Fresh Watermelon Juice", category: "Cold Beverages", slot: "snacks", isVeg: true, price: "Price on Request", desc: "Chilled natural fruit juice" },

  // DINNER
  { id: "d1", name: "Soft Idiyappam", category: "Dinner Mains", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Steamed string hoppers with sweetened Coconut Milk" },
  { id: "d2", name: "Ceylon Veg Coin Parotta", category: "Dinner Mains", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Flaky mini parottas served with Veg Salna" },
  { id: "d3", name: "Paneer Butter Masala", category: "Gravies", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Rich creamy tomato gravy with paneer" },
  { id: "d4", name: "Ghee Rice", category: "Biryani & Rice", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Cashew raisin golden ghee rice" },
  { id: "d5", name: "Rasamalai", category: "Desserts", slot: "dinner", isVeg: true, price: "Price on Request", desc: "Soft cottage cheese discs in saffron milk" },
];

const TIME_SLOTS = [
  { key: "breakfast", label: "🌅 Morning Breakfast", time: "6 AM – 10 AM", desc: "Light, traditional, easy to digest" },
  { key: "brunch", label: "🍳 Brunch", time: "10 AM – 12 PM", desc: "Slightly heavier than breakfast" },
  { key: "lunch", label: "🍛 Lunch", time: "12 PM – 3 PM", desc: "Full meals — main event virundhu" },
  { key: "snacks", label: "☕ Evening Snacks", time: "3 PM – 6 PM", desc: "Tea-time items — fast moving" },
  { key: "dinner", label: "🌙 Dinner", time: "6 PM – 11 PM", desc: "Mix of heavy tiffin & delights" },
] as const;

export default function MenuCustomizer({ onSwitchToCRM }: { onSwitchToCRM?: () => void }) {
  const [activeSlot, setActiveSlot] = useState<DishItem["slot"]>("breakfast");
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);

  // PROPOSAL REQUEST FORM STATE
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(250);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // FILTER DISHES FOR CURRENT SLOT & SEARCH
  const currentDishes = useMemo(() => {
    return ALL_DISHES.filter((d) => {
      const matchSlot = d.slot === activeSlot;
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
      const matchVeg = vegOnly ? d.isVeg : true;
      return matchSlot && matchSearch && matchVeg;
    });
  }, [activeSlot, search, vegOnly]);

  // GROUP DISHES BY CATEGORY
  const categoriesMap = useMemo(() => {
    const map: Record<string, DishItem[]> = {};
    currentDishes.forEach((d) => {
      if (!map[d.category]) map[d.category] = [];
      map[d.category].push(d);
    });
    return map;
  }, [currentDishes]);

  // CART CALCULATIONS
  const totalCount = useMemo(() => {
    return Object.values(selectedItems).reduce((sum, q) => sum + q, 0);
  }, [selectedItems]);

  const selectedDishList = useMemo(() => {
    return ALL_DISHES.filter((d) => selectedItems[d.id] && selectedItems[d.id] > 0).map((d) => ({
      ...d,
      qty: selectedItems[d.id],
    }));
  }, [selectedItems]);

  const toggleQuantity = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const dishNames = selectedDishList.map((d) => `${d.name} (${d.qty}x)`).join(", ");
    const text = `Hello MCC Catering! I selected dishes on your Menu Customizer:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Event Date:* ${eventDate}\n*Estimated Guests:* ${guests} pax\n\n*Selected Menu Dishes (${selectedDishList.length} items):*\n${dishNames}\n\n*Notes:* ${notes || "None"}\n\nPlease share a formal price quotation PDF for this menu!`;
    window.open(`https://wa.me/919940396005?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-800 font-sans pb-28">
      
      {/* UNIFIED CUSTOMIZER HEADER & MEAL TIMING NAVBAR (ZERO MARGIN/GAP) */}
      <div className="bg-gradient-to-b from-[#2A163F] via-[#3A1029] to-[#2B1028] text-white pt-5 pb-4 sm:pt-6 sm:pb-5 px-4 sm:px-8 lg:px-12 border-b-2 border-amber-400/30 shadow-lg">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Top Row: Title & View Selected Menu Button */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-400/20 border border-amber-300 p-1 flex items-center justify-center shrink-0 shadow-md">
                <img src={logoImg} alt="MCC Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                    Our Full Menu <span className="text-amber-300 italic font-normal">Customizer</span>
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Interactive
                  </span>
                </div>
                <p className="text-amber-100/80 text-xs mt-0.5">
                  Browse dishes by meal timing, build your custom menu, and request an instant proposal
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCart(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-plum-dark text-xs font-bold uppercase tracking-wider hover:brightness-105 shadow-lg transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>View Selected Menu ({totalCount})</span>
            </button>
          </div>

          {/* MEAL TIME NAVIGATION SLOTS (INTEGRATED DIRECTLY WITH ZERO GAP) */}
          <div className="pt-3 border-t border-amber-400/20 overflow-x-auto flex items-center gap-2 scrollbar-none">
            {TIME_SLOTS.map((slot) => {
              const active = activeSlot === slot.key;
              return (
                <button
                  key={slot.key}
                  onClick={() => setActiveSlot(slot.key as DishItem["slot"])}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0 ${
                    active
                      ? "bg-amber-400 text-[#3A1029] shadow-md font-extrabold"
                      : "bg-white/10 text-cream/80 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{slot.label}</span>
                  <span className={`text-[10px] ${active ? "text-[#3A1029]/70" : "text-amber-300/70"}`}>
                    ({slot.time})
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* SEARCH & VEG FILTER BAR */}
      <div className="bg-white border-b border-amber-900/10 shadow-xs py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any dish (e.g. Idly, Payasam, Biryani)..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
              vegOnly
                ? "bg-emerald-600 text-white border-emerald-700 shadow-md"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
            <span>Pure Veg Only</span>
          </button>

        </div>
      </div>

      {/* DISHES LIST GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* CURRENT SLOT HEADER */}
        <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#3A1029]">
              {TIME_SLOTS.find((s) => s.key === activeSlot)?.label}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {TIME_SLOTS.find((s) => s.key === activeSlot)?.desc}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            {currentDishes.length} Available Dishes
          </span>
        </div>

        {/* CATEGORY SECTIONS */}
        {Object.keys(categoriesMap).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-amber-900/10 p-8 space-y-3">
            <Utensils className="w-10 h-10 text-amber-500 mx-auto opacity-50" />
            <h3 className="font-serif text-lg font-bold text-slate-800">No dishes found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search or clearing the pure veg filter.</p>
          </div>
        ) : (
          Object.entries(categoriesMap).map(([categoryName, dishes]) => (
            <div key={categoryName} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-amber-500 rounded-full" />
                <h3 className="font-serif text-lg font-bold text-[#3A1029]">{categoryName}</h3>
                <span className="text-xs font-bold text-slate-400">({dishes.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {dishes.map((dish) => {
                  const qty = selectedItems[dish.id] || 0;
                  return (
                    <div
                      key={dish.id}
                      className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all flex items-center justify-between gap-4 ${
                        qty > 0 ? "border-amber-400 bg-amber-50/30 shadow-md" : "border-slate-200/80 hover:border-amber-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-sm border border-emerald-600 p-0.5 flex items-center justify-center shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          </span>
                          <span className="font-bold text-slate-900 text-sm sm:text-base">{dish.name}</span>
                          {dish.tag && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-plum-dark text-[9px] font-extrabold uppercase">
                              {dish.tag}
                            </span>
                          )}
                        </div>

                        {dish.desc && <p className="text-xs text-slate-500 leading-relaxed">{dish.desc}</p>}
                        <div className="text-xs font-semibold text-amber-700">{dish.price}</div>
                      </div>

                      {/* ADD / QUANTITY COUNTER BUTTON */}
                      <div>
                        {qty === 0 ? (
                          <button
                            onClick={() => toggleQuantity(dish.id, 1)}
                            className="px-4 py-2 rounded-xl bg-[#3A1029] hover:bg-[#2A0B1E] text-amber-300 font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="flex items-center bg-amber-400 text-plum-dark rounded-xl p-1 shadow-md font-bold text-xs shrink-0">
                            <button
                              onClick={() => toggleQuantity(dish.id, -1)}
                              className="w-7 h-7 rounded-lg bg-white/30 hover:bg-white/50 flex items-center justify-center text-plum-dark"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-extrabold">{qty}</span>
                            <button
                              onClick={() => toggleQuantity(dish.id, 1)}
                              className="w-7 h-7 rounded-lg bg-white/30 hover:bg-white/50 flex items-center justify-center text-plum-dark"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

      </div>

      {/* FLOATING BOTTOM CART BAR */}
      {totalCount > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-40"
        >
          <div className="bg-[#3A1029] text-white p-4 rounded-2xl border-2 border-amber-400 shadow-2xl flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-400 text-plum-dark flex items-center justify-center font-extrabold text-xs">
                  {totalCount}
                </span>
                <span className="font-serif font-bold text-base text-amber-300">Items Selected</span>
              </div>
              <p className="text-[11px] text-amber-100/80 mt-0.5">Click to customize guest count & send request</p>
            </div>

            <button
              onClick={() => setShowCart(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-plum-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-105 shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>Review & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* CART DRAWER / PROPOSAL MODAL */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border-2 border-amber-400 shadow-2xl relative my-8"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400 p-1 flex items-center justify-center shrink-0">
                    <img src={logoImg} alt="MCC Logo" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#3A1029]">Your Custom Feast Menu</h3>
                    <p className="text-xs text-slate-500">Selected {selectedDishList.length} unique dish items</p>
                  </div>
                </div>

                <button onClick={() => setShowCart(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#3A1029]">Proposal Request Sent!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you! Our MCC Catering Manager will review your selected dishes and send a formal PDF quotation to your WhatsApp within 1 hour.
                  </p>
                  <button
                    onClick={() => { setShowCart(false); setSubmitted(false); }}
                    className="px-6 py-3 rounded-xl bg-[#3A1029] text-amber-300 font-bold text-xs uppercase tracking-wider"
                  >
                    Close Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* SELECTED DISHES SUMMARY PILLS */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-900/10 space-y-3 max-h-48 overflow-y-auto">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">Selected Items ({selectedDishList.length}):</span>
                    {selectedDishList.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No dishes selected yet. Browse and click "+ Add" on dishes!</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedDishList.map((item) => (
                          <span key={item.id} className="px-3 py-1 rounded-full bg-white border border-amber-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                            <span>{item.name}</span>
                            <span className="text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-full text-[10px]">{item.qty}x</span>
                            <button onClick={() => toggleQuantity(item.id, -item.qty)} className="text-slate-400 hover:text-red-600 ml-1">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* PROPOSAL REQUEST FORM */}
                  <form onSubmit={handleSendWhatsApp} className="space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="S. Sundararajan"
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Phone / WhatsApp</label>
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 99403 96005"
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Function Date</label>
                        <input
                          required
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Estimated Guests ({guests} pax)</label>
                        <input
                          type="range"
                          min={50}
                          max={2000}
                          step={10}
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600 mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Special Instructions / Venue</label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Wedding Virundhu at Mayor Ramanathan Hall, Chetpet"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={selectedDishList.length === 0}
                      className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-400/40 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Custom Menu Request via WhatsApp</span>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
