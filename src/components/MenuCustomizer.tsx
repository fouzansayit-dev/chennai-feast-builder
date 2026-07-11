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
  Trash2,
  AlertCircle
} from "lucide-react";
import { useCart, DishItem } from "@/hooks/useCart";
import logoImg from "@/assets/mcc-logo.png";
import bananaLeafBg from "@/assets/banana-leaf-feast-blended.png";

const TIME_SLOTS = [
  { key: "breakfast", label: "🌅 Morning Breakfast", time: "6 AM – 10 AM", desc: "Light, traditional, easy to digest" },
  { key: "brunch", label: "🍳 Brunch", time: "10 AM – 12 PM", desc: "Slightly heavier than breakfast" },
  { key: "lunch", label: "🍛 Lunch", time: "12 PM – 3 PM", desc: "Full meals — main event virundhu" },
  { key: "snacks", label: "☕ Evening Snacks", time: "3 PM – 6 PM", desc: "Tea-time items — fast moving" },
  { key: "dinner", label: "🌙 Dinner", time: "6 PM – 11 PM", desc: "Mix of heavy tiffin & delights" },
] as const;

export default function MenuCustomizer() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    cartItemsList,
    guestCount,
    setGuestCount,
    eventDate,
    setEventDate,
    eventType,
    setEventType,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    notes,
    setNotes,
    estimatedPricePerPlate,
    estimatedTotalCost,
    allDishes
  } = useCart();

  const [activeSlot, setActiveSlot] = useState<DishItem["slot"]>("breakfast");
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FILTER DISHES FOR CURRENT SLOT & SEARCH
  const currentDishes = useMemo(() => {
    return allDishes.filter((d) => {
      const matchSlot = d.slot === activeSlot;
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.category.toLowerCase().includes(search.toLowerCase());
      const matchVeg = vegOnly ? d.isVeg : true;
      return matchSlot && matchSearch && matchVeg;
    });
  }, [activeSlot, search, vegOnly, allDishes]);

  // GROUP DISHES BY CATEGORY
  const categoriesMap = useMemo(() => {
    const map: Record<string, DishItem[]> = {};
    currentDishes.forEach((d) => {
      if (!map[d.category]) map[d.category] = [];
      map[d.category].push(d);
    });
    return map;
  }, [currentDishes]);

  // Pricing breakdown calculations
  const standardItemsCount = useMemo(() => {
    return cartItemsList.filter(item => !(item.tag || item.category.includes("Sweets") || item.category.includes("Payasam") || item.category.includes("Dessert") || item.category.includes("Starters"))).reduce((sum, item) => sum + item.qty, 0);
  }, [cartItemsList]);

  const premiumItemsCount = useMemo(() => {
    return cartItemsList.filter(item => (item.tag || item.category.includes("Sweets") || item.category.includes("Payasam") || item.category.includes("Dessert") || item.category.includes("Starters"))).reduce((sum, item) => sum + item.qty, 0);
  }, [cartItemsList]);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const dishNames = cartItemsList.map((d) => `${d.name} (${d.qty}x)`).join(", ");
    const text = `Hello MCC Catering! I compiled an e-commerce cart menu quotation:\n\n*Name:* ${customerName}\n*Phone:* ${customerPhone}\n*Event Date:* ${eventDate}\n*Event Type:* ${eventType}\n*Estimated Guests:* ${guestCount} pax\n\n*Selected Items (${cartItemsList.length} unique dishes, Total Qty: ${totalCount}):*\n${dishNames}\n\n*Estimated Rate:* ₹${estimatedPricePerPlate}/plate\n*Estimated Total Budget:* ₹${estimatedTotalCost.toLocaleString("en-IN")}\n\n*Notes:* ${notes || "None"}\n\nPlease share a formal price quotation PDF for this menu!`;
    window.open(`https://wa.me/919940396005?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 font-sans pb-28">
      {/* UNIFIED CUSTOMIZER HEADER & MEAL TIMING NAVBAR */}
      <div className="bg-gradient-to-b from-[#2A163F] via-[#3A1029] to-[#2B1028] text-white pt-5 pb-4 px-4 sm:px-8 lg:px-12 border-b-2 border-amber-400/30 shadow-lg">
        <div className="max-w-7xl mx-auto space-y-4">
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
                    <Sparkles className="w-3 h-3" /> E-Commerce Cart
                  </span>
                </div>
                <p className="text-amber-100/80 text-xs mt-0.5">
                  Select dishes, calculate live plate cost estimators & checkout directly
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCart(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-plum-dark text-xs font-bold uppercase tracking-wider hover:brightness-105 shadow-lg transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Review Cart ({totalCount})</span>
            </button>
          </div>

          {/* MEAL TIME NAVIGATION SLOTS */}
          <div className="pt-3 border-t border-amber-400/20 overflow-x-auto flex items-center gap-2 scrollbar-none">
            {TIME_SLOTS.map((slot) => {
              const active = activeSlot === slot.key;
              return (
                <button
                  key={slot.key}
                  onClick={() => setActiveSlot(slot.key)}
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

      {/* TWO COLUMN GRID: CATALOG + STICKY SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: DISHES (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dishes.map((dish) => {
                    const qty = cartItems[dish.id] || 0;
                    const isPremium = dish.tag ||
                      dish.category.includes("Sweets") ||
                      dish.category.includes("Payasam") ||
                      dish.category.includes("Dessert") ||
                      dish.category.includes("Starters");
                    return (
                      <div
                        key={dish.id}
                        className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all flex items-center justify-between gap-4 ${
                          qty > 0 ? "border-amber-400 bg-amber-50/20 shadow-md" : "border-slate-200/80 hover:border-amber-300 hover:shadow-xs"
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

                          {dish.desc && <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{dish.desc}</p>}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold text-amber-700">{dish.price}</span>
                            <span className="text-neutral-300">|</span>
                            <span className="text-slate-400 font-medium">{isPremium ? "Premium (+₹45/p)" : "Standard (+₹25/p)"}</span>
                          </div>
                        </div>

                        {/* ADD / QUANTITY COUNTER BUTTON */}
                        <div>
                          {qty === 0 ? (
                            <button
                              onClick={() => addToCart(dish.id, 1)}
                              className="px-4 py-2 rounded-xl bg-[#3A1029] hover:bg-[#2A0B1E] text-amber-300 font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center gap-1.5 shrink-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          ) : (
                            <div className="flex items-center bg-amber-400 text-plum-dark rounded-xl p-1 shadow-md font-bold text-xs shrink-0">
                              <button
                                onClick={() => updateQuantity(dish.id, qty - 1)}
                                className="w-7 h-7 rounded-lg bg-white/30 hover:bg-white/50 flex items-center justify-center text-plum-dark"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-sm font-extrabold">{qty}</span>
                              <button
                                onClick={() => addToCart(dish.id, 1)}
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

        {/* RIGHT COLUMN: STICKY CART SIDEBAR (4 cols) - HIDDEN ON MOBILE SCREEN */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-[140px] bg-white rounded-3xl border border-slate-200/80 p-5 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#3A1029]" />
                <h3 className="font-serif text-lg font-bold text-[#3A1029]">Catering Cart</h3>
              </div>
              <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded-full">
                {totalCount} items
              </span>
            </div>

            {cartItemsList.length === 0 ? (
              <div className="text-center py-10 space-y-2.5">
                <Utensils className="w-8 h-8 text-neutral-300 mx-auto" />
                <p className="text-xs text-slate-400">Your cart is empty. Pick delicious items from the left menu to customize your Virundhu!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Scrollable Cart Items */}
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1 select-none">
                  {cartItemsList.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2 bg-[#FAF8F6] p-2 rounded-xl border border-slate-100">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{item.name}</h4>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide block">{item.category}</span>
                      </div>
                      <div className="flex items-center bg-slate-200 text-slate-800 rounded-lg p-0.5 text-[10px] font-bold">
                        <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="w-5 h-5 rounded-md hover:bg-slate-300 flex items-center justify-center">-</button>
                        <span className="w-6 text-center">{item.qty}</span>
                        <button onClick={() => addToCart(item.id, 1)} className="w-5 h-5 rounded-md hover:bg-slate-300 flex items-center justify-center">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Dynamic Budget Estimator */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-900/10 space-y-3">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Live Budget Estimator
                  </span>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Base Setup Charge (p/p):</span>
                      <span>₹150</span>
                    </div>
                    {standardItemsCount > 0 && (
                      <div className="flex justify-between">
                        <span>Standard Items Additions:</span>
                        <span>{standardItemsCount} × ₹25 = +₹{standardItemsCount * 25}</span>
                      </div>
                    )}
                    {premiumItemsCount > 0 && (
                      <div className="flex justify-between">
                        <span>Premium Items Additions:</span>
                        <span>{premiumItemsCount} × ₹45 = +₹{premiumItemsCount * 45}</span>
                      </div>
                    )}
                    <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                      <span>Price Per Plate:</span>
                      <span className="text-amber-800">₹{estimatedPricePerPlate} / plate</span>
                    </div>
                  </div>

                  {/* Guest count slider */}
                  <div className="pt-2 border-t border-slate-200/60">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Guest Count:</span>
                      <span className="text-plum">{guestCount} Guests</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={2000}
                      step={10}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>

                  {/* Estimated Subtotal */}
                  <div className="bg-[#3A1029] text-amber-300 p-3 rounded-xl text-center space-y-0.5">
                    <span className="text-[9px] uppercase tracking-widest text-amber-100/60 block leading-none">Estimated Subtotal</span>
                    <span className="text-lg font-extrabold">₹{estimatedTotalCost.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => setShowCart(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-105 text-[#3A1029] font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Quotation Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FLOATING BOTTOM CART BAR (MOBILE ONLY) */}
      {totalCount > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:hidden fixed bottom-18 left-4 right-4 max-w-xl mx-auto z-40"
        >
          <div className="bg-[#3A1029] text-white p-3.5 rounded-2xl border-2 border-amber-400 shadow-2xl flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-plum-dark flex items-center justify-center font-extrabold text-xs">
                  {totalCount}
                </span>
                <span className="font-serif font-bold text-sm text-amber-300">Rate: ₹{estimatedPricePerPlate}/p</span>
              </div>
              <p className="text-[10px] text-amber-100/70">Estimated Total: ₹{estimatedTotalCost.toLocaleString("en-IN")}</p>
            </div>

            <button
              onClick={() => setShowCart(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-plum-dark font-extrabold text-[10px] uppercase tracking-wider hover:brightness-105 shadow-md flex items-center gap-1 transition-all"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* CART DRAWER / PROPOSAL MODAL */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
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
                    <h3 className="font-serif text-xl font-bold text-[#3A1029]">Your Custom Saapadu Menu</h3>
                    <p className="text-xs text-slate-500">Selected {cartItemsList.length} unique dish items</p>
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
                  <h4 className="font-serif text-2xl font-bold text-[#3A1029]">Proposal Checkout Successful!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you! Our MCC Catering Manager will review your custom selected items and send a formal PDF quotation to your WhatsApp within 1 hour.
                  </p>
                  <button
                    onClick={() => { setShowCart(false); setSubmitted(false); }}
                    className="px-6 py-3 rounded-xl bg-[#3A1029] text-amber-300 font-bold text-xs uppercase tracking-wider"
                  >
                    Close Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Selected Items summary */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-amber-900/10 space-y-3 max-h-48 overflow-y-auto">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">Selected Items ({cartItemsList.length}):</span>
                    {cartItemsList.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No dishes selected yet. Browse and click "+ Add" on dishes!</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {cartItemsList.map((item) => (
                          <span key={item.id} className="px-3 py-1 rounded-full bg-white border border-amber-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                            <span>{item.name}</span>
                            <span className="text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-full text-[10px]">{item.qty}x</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-600 ml-1">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown Estimator */}
                  {cartItemsList.length > 0 && (
                    <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-800 font-extrabold uppercase tracking-wide">
                        <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Estimated Catering Bill Summary
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1.5 text-center">
                        <div className="bg-white p-2.5 rounded-xl border border-amber-100">
                          <span className="text-[9px] text-slate-400 block">Base Price</span>
                          <span className="text-sm font-bold text-slate-800">₹150 / guest</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-amber-100">
                          <span className="text-[9px] text-slate-400 block">Item Add-ons</span>
                          <span className="text-sm font-bold text-slate-800">+₹{estimatedPricePerPlate - 150} / guest</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-amber-100">
                          <span className="text-[9px] text-slate-400 block">Rate Per Plate</span>
                          <span className="text-sm font-bold text-amber-800">₹{estimatedPricePerPlate} / p</span>
                        </div>
                        <div className="bg-[#3A1029] p-2.5 rounded-xl border border-[#3A1029] text-white">
                          <span className="text-[9px] text-amber-200 block">Estimated Total</span>
                          <span className="text-sm font-extrabold text-amber-300">₹{estimatedTotalCost.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROPOSAL REQUEST FORM */}
                  <form onSubmit={handleSendWhatsApp} className="space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                        <input
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400 focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Phone / WhatsApp</label>
                        <input
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="e.g. +91 99403 96005"
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Function Date</label>
                        <input
                          required
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400 focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Event Type</label>
                        <select
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400 focus:bg-white transition-colors"
                        >
                          <option value="Wedding">Wedding</option>
                          <option value="Engagement">Engagement</option>
                          <option value="Birthday Party">Birthday Party</option>
                          <option value="Corporate Buffet">Corporate Buffet</option>
                          <option value="Housewarming">Housewarming</option>
                          <option value="Seemantham">Seemantham</option>
                        </select>
                      </div>
                      <div>
                        <div className="flex justify-between font-bold text-slate-700 mb-1">
                          <span>Guests ({guestCount} pax)</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={2000}
                          step={10}
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600 mt-3"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Special Instructions / Venue</label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Wedding banquet at Mayor Ramanathan Hall, Chetpet. Need live counter setups."
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium outline-none focus:border-amber-400 focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => { clearCart(); setShowCart(false); }}
                        className="px-4 py-3.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border border-red-200"
                      >
                        <Trash2 className="w-4 h-4" /> Clear
                      </button>
                      <button
                        type="submit"
                        disabled={cartItemsList.length === 0}
                        className="flex-1 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-400/40 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Cart Proposal via WhatsApp</span>
                      </button>
                    </div>
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
