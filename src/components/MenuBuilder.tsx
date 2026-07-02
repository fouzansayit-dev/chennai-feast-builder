import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calculator, Check, Sparkles, X, Leaf, GlassWater } from "lucide-react";

type PackageKey = "tiffin" | "moderate" | "executive";

const MENU_DATA: Record<
  PackageKey,
  { title: string; tag: string; basePrice: number; items: Record<string, string[]> }
> = {
  tiffin: {
    title: "Mangala Udhayam Tiffin",
    tag: "Morning · Auspicious Tiffin",
    basePrice: 250,
    items: {
      main: ["Idly", "Mini Idly", "Uthappam", "Rava Dosa", "Idiyappam", "Veg Stew"],
      chutneys: ["Coconut Chutney", "Kara Chutney", "Peanut Chutney", "Sambar"],
      drinks: ["Fresh Juice", "Filter Coffee", "Masala Tea"],
    },
  },
  moderate: {
    title: "Thala Vazhai Saapadu",
    tag: "Traditional Banana Leaf Feast",
    basePrice: 450,
    items: {
      sweets: ["Rasagulla", "Gulab Jamun"],
      starters: ["Gobi 65", "Onion Pakoda"],
      breads: ["Methi Chapathi", "Channa Masala"],
      rice: ["Veg Biryani", "Veg Pulav", "Onion Raitha"],
      "south indian": [
        "White Rice",
        "Arachuvitta Sambar",
        "Bisibelabath",
        "Rasam",
        "Vathakulambu",
        "Curd Rice",
        "Poriyal",
        "Urulai Pattani Masala",
        "Appalam",
        "Pickle",
      ],
      drinks: ["Fresh Juice", "Filter Coffee"],
    },
  },
  executive: {
    title: "Raja Bhojanam Feast",
    tag: "Royal Wedding Luxury Feast",
    basePrice: 650,
    items: {
      sweets: ["Rasamalai", "Malai Roll", "Ghevar", "Raj Bhog", "Elaneer Payasam"],
      starters: ["Veg Spring Roll", "Veg Cutlet", "Veg Fish Fry", "Paneer Tikka"],
      breads: ["Chapathi", "Rumali Roti", "Butter Naan"],
      curries: ["Paneer Butter Masala", "Mushroom Masala", "Kadai Veg"],
      rice: ["Mushroom Biryani", "Jackfruit Biryani", "Veg Biryani", "Veg Pulav"],
      drinks: ["Welcome Mocktail", "Fresh Juice", "Filter Coffee", "Masala Tea"],
    },
  },
};

// Traditional banana leaf placement layout mapper
function getItemPlacement(item: string): "top-left" | "top-right" | "bottom-left" | "bottom-right" | "drinks" {
  const lower = item.toLowerCase();
  if (
    lower.includes("pickle") ||
    lower.includes("chutney") ||
    lower.includes("pachadi") ||
    lower.includes("raitha") ||
    lower.includes("onion pakoda") ||
    lower.includes("gobi 65")
  ) {
    return "top-left";
  }
  if (
    lower.includes("masala") ||
    lower.includes("kootu") ||
    lower.includes("poriyal") ||
    lower.includes("avial") ||
    lower.includes("urulai") ||
    lower.includes("paneer") ||
    lower.includes("mushroom") ||
    lower.includes("veg stew") ||
    lower.includes("kadai") ||
    lower.includes("cutlet") ||
    lower.includes("fry") ||
    lower.includes("tikka")
  ) {
    return "top-right";
  }
  if (
    lower.includes("rasagulla") ||
    lower.includes("jamun") ||
    lower.includes("rasamalai") ||
    lower.includes("roll") ||
    lower.includes("ghevar") ||
    lower.includes("bhog") ||
    lower.includes("payasam") ||
    lower.includes("sweets") ||
    lower.includes("sweet") ||
    lower.includes("chapathi") ||
    lower.includes("roti") ||
    lower.includes("naan") ||
    lower.includes("appalam") ||
    lower.includes("idly") ||
    lower.includes("uthappam") ||
    lower.includes("rava") ||
    lower.includes("idiyappam")
  ) {
    return "bottom-left";
  }
  if (
    lower.includes("rice") ||
    lower.includes("biryani") ||
    lower.includes("pulav") ||
    lower.includes("bisibelabath") ||
    lower.includes("paruppu") ||
    lower.includes("sambar") ||
    lower.includes("rasam") ||
    lower.includes("curd")
  ) {
    return "bottom-right";
  }
  return "drinks";
}

export default function MenuBuilder() {
  const [pkg, setPkg] = useState<PackageKey>("moderate");
  const [guests, setGuests] = useState(150);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [modal, setModal] = useState(false);

  const current = MENU_DATA[pkg];
  
  const totalItemsCount = useMemo(() => {
    return Object.values(current.items).flat().length;
  }, [current]);

  const pricePerPlate = useMemo(() => {
    if (selectedItems.length === 0) return 0;
    // 60% base package service + 40% proportional to items selected
    const baseRatio = 0.6;
    const itemRatio = 0.4;
    const selectedRatio = selectedItems.length / totalItemsCount;
    return Math.round(current.basePrice * (baseRatio + itemRatio * selectedRatio));
  }, [current, selectedItems, totalItemsCount]);

  const total = useMemo(() => pricePerPlate * guests, [pricePerPlate, guests]);

  // Set all items of the selected package by default
  useEffect(() => {
    const allItems = Object.values(current.items).flat();
    setSelectedItems(allItems);
  }, [pkg]);

  const toggle = (item: string) =>
    setSelectedItems((p) => (p.includes(item) ? p.filter((i) => i !== item) : [...p, item]));

  return (
    <section id="builder" className="relative py-24 bg-cream border-t border-brand-gold/20 overflow-hidden">
      
      {/* Visual background accents */}
      <div className="absolute top-10 left-10 opacity-[0.03] text-plum pointer-events-none select-none">
        <Leaf size={300} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-[0.03] text-plum pointer-events-none select-none transform rotate-180">
        <Leaf size={300} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-gold mb-2 font-semibold">
            Interactive Feast Planner
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-plum mb-4">
            Build Your Traditional Feast
          </h2>
          <p className="text-foreground/70">
            Select a package, adjust your guest count, and toggle items. Watch them arrange dynamically on the banana leaf plate!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Item Customizer */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gold/15 p-6 md:p-9 shadow-glow-plum">
            <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-plum/5 rounded-2xl border border-plum/10">
              {(Object.keys(MENU_DATA) as PackageKey[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPkg(p)}
                  className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                    pkg === p
                      ? "bg-plum text-cream shadow-md"
                      : "text-plum/70 hover:text-plum hover:bg-plum/5"
                  }`}
                >
                  {MENU_DATA[p].title}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-plum mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-xl">Customize menu items ({selectedItems.length} selected)</h3>
            </div>

            <div className="space-y-7">
              {Object.entries(current.items).map(([cat, items]) => (
                <div key={cat} className="space-y-3">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-bold">
                    {cat}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {items.map((item) => {
                      const sel = selectedItems.includes(item);
                      return (
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          key={item}
                          onClick={() => toggle(item)}
                          className={`flex items-center justify-between text-left px-3.5 py-3 rounded-xl border text-xs font-medium transition-all ${
                            sel
                              ? "border-leaf bg-leaf/5 text-leaf font-bold shadow-sm"
                              : "border-plum/10 bg-plum/[0.015] text-plum/80 hover:border-gold hover:bg-gold/5"
                          }`}
                        >
                          <span className="truncate">{item}</span>
                          {sel ? (
                            <Check className="w-3.5 h-3.5 shrink-0 text-leaf" />
                          ) : (
                            <span className="text-[9px] text-plum/30 font-light">+ Add</span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Leaf Platter Preview & Quote */}
          <div className="space-y-6">
            
            {/* Visual Banana Leaf Platter */}
            <div className="bg-emerald-950/5 rounded-3xl p-6 border border-gold/15 backdrop-blur-sm flex flex-col items-center">
              <div className="text-xs uppercase tracking-wider text-leaf font-bold flex items-center gap-1.5 mb-4">
                <Leaf className="w-4 h-4 text-leaf fill-leaf/25" /> Banana Leaf Platter Preview
              </div>

              {/* The Leaf shape */}
              <div className="relative w-full max-w-[340px] aspect-[4/7] bg-gradient-to-b from-leaf-light to-leaf-dark rounded-t-[160px] rounded-b-[30px] border-2 border-emerald-500/30 shadow-2xl p-5 flex flex-col justify-between overflow-hidden">
                {/* Central leaf vein */}
                <div className="absolute inset-y-0 left-1/2 w-1 bg-yellow-300/30 -translate-x-1/2" />
                
                {/* Angled vein decorations */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
                  {[12, 24, 36, 48, 60, 72, 84].map((y) => (
                    <React.Fragment key={y}>
                      <div className="absolute w-[45%] h-[1px] bg-white" style={{ top: `${y}%`, left: '5%', transform: 'rotate(15deg)' }} />
                      <div className="absolute w-[45%] h-[1px] bg-white" style={{ top: `${y}%`, right: '5%', transform: 'rotate(-15deg)' }} />
                    </React.Fragment>
                  ))}
                </div>

                {/* Leaf Segment grid elements */}
                <div className="relative z-10 h-full flex flex-col justify-between text-cream/90 text-[9px] leading-tight select-none">
                  
                  {/* Top segment: Salt, Pickle, Poriyals */}
                  <div className="flex justify-between w-full min-h-[75px] border-b border-yellow-300/10 pb-2">
                    {/* Top Left: Salt, Pickles, Raitha */}
                    <div className="flex flex-col gap-1 w-[45%] items-start pl-1">
                      <span className="text-[7px] text-yellow-300/60 uppercase font-bold tracking-widest">Sides</span>
                      <div className="flex flex-wrap gap-0.5">
                        {selectedItems.filter(item => getItemPlacement(item) === 'top-left').slice(0, 4).map(item => (
                          <span key={item} className="bg-plum-dark/85 text-gold-light px-1 py-0.5 rounded-[3px] text-[7px] max-w-[65px] truncate">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Top Right: Curries, Poriyal */}
                    <div className="flex flex-col gap-1 w-[45%] items-end pr-1 text-right">
                      <span className="text-[7px] text-yellow-300/60 uppercase font-bold tracking-widest">Veggies</span>
                      <div className="flex flex-wrap gap-0.5 justify-end">
                        {selectedItems.filter(item => getItemPlacement(item) === 'top-right').slice(0, 4).map(item => (
                          <span key={item} className="bg-plum-dark/85 text-gold-light px-1 py-0.5 rounded-[3px] text-[7px] max-w-[65px] truncate">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle segment: Breads, Sweets, Rice courses */}
                  <div className="flex justify-between w-full flex-1 py-3 border-b border-yellow-300/10">
                    {/* Bottom Left: Sweets, Breads, Tiffin */}
                    <div className="flex flex-col gap-1 w-[45%] items-start pl-1 justify-center">
                      <span className="text-[7px] text-yellow-300/60 uppercase font-bold tracking-widest">Sweets & Breads</span>
                      <div className="flex flex-col gap-0.5 items-start">
                        {selectedItems.filter(item => getItemPlacement(item) === 'bottom-left').slice(0, 4).map(item => (
                          <span key={item} className="bg-yellow-400/20 text-yellow-100 font-semibold px-1.5 py-0.5 rounded-[3px] text-[8px] max-w-[75px] truncate">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Right: Main Rice courses & Sambar */}
                    <div className="flex flex-col gap-1.5 w-[45%] items-end pr-1 justify-center text-right">
                      <span className="text-[7px] text-yellow-300/60 uppercase font-bold tracking-widest">Mains (Rice)</span>
                      <div className="flex flex-col gap-0.5 items-end">
                        {selectedItems.filter(item => getItemPlacement(item) === 'bottom-right').slice(0, 4).map(item => (
                          <span key={item} className="bg-white/15 text-white font-bold px-1.5 py-0.5 rounded-[3px] text-[8px] max-w-[75px] truncate">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom edge: Appalam & Drinks outside leaf */}
                  <div className="flex justify-between items-center w-full min-h-[45px] pt-1">
                    <div>
                      {selectedItems.includes("Appalam") && (
                        <div className="w-8 h-8 rounded-full bg-amber-100/90 border border-amber-300/40 shadow-sm flex items-center justify-center text-[7px] text-amber-800 font-bold rotate-12">
                          Appalam
                        </div>
                      )}
                    </div>

                    {/* Drinks Tumbler */}
                    <div className="flex gap-1 items-end">
                      {selectedItems.filter(item => getItemPlacement(item) === 'drinks').slice(0, 2).map(item => (
                        <div
                          key={item}
                          title={item}
                          className="w-6 h-8 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 rounded-t-sm rounded-b-md border border-yellow-200 shadow-md flex flex-col items-center justify-center text-[5px] text-amber-950 font-bold leading-none"
                        >
                          <GlassWater className="w-2.5 h-2.5 text-amber-950/60 mb-0.5" />
                          <span className="truncate max-w-[20px] text-[5px]">{item.split(" ")[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Quote Panel */}
            <div className="bg-plum-dark text-cream rounded-3xl p-8 border border-gold/30 shadow-glow-gold">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-xl text-gold">Live Quote Calculator</h3>
              </div>

              <div className="mb-8">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-cream/70">Number of Guests</span>
                  <span className="font-semibold text-gold">{guests}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={2000}
                  step={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-1.5 bg-cream/15 rounded-full appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-[10px] text-cream/45 mt-2 tracking-widest uppercase">
                  <span>50</span>
                  <span>2000+</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream/60">Base rate / plate</span>
                  <span>₹{current.basePrice}</span>
                </div>
                {pricePerPlate !== current.basePrice && (
                  <div className="flex justify-between text-gold font-semibold">
                    <span className="text-cream/65">Adjusted rate / plate</span>
                    <span>₹{pricePerPlate}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-cream/60">Estimated count</span>
                  <span>{guests} pax</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Custom Items Selected</span>
                  <span className="text-gold">{selectedItems.length} / {totalItemsCount} items</span>
                </div>
                <div className="border-t border-gold/20 pt-4 flex justify-between items-end">
                  <span className="text-cream/70 text-xs uppercase tracking-widest">Total est.</span>
                  <span className="font-serif text-3xl text-gold-gradient">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setModal(true)}
                className="w-full py-4 bg-gold hover:bg-gold-light text-plum-dark font-semibold rounded-xl flex items-center justify-center gap-2 transition-all group text-sm"
              >
                Request Custom Feast Proposal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-cream/50 text-center mt-3">
                MCC will contact you with a detailed menu pdf within 1 hour.
              </p>
            </div>

          </div>

        </div>
      </div>

      {modal && (
        <QuoteModal
          title={current.title}
          guests={guests}
          total={total}
          itemsCount={selectedItems.length}
          onClose={() => setModal(false)}
        />
      )}
    </section>
  );
}

function QuoteModal({
  title,
  guests,
  total,
  itemsCount,
  onClose,
}: {
  title: string;
  guests: number;
  total: number;
  itemsCount: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-plum-dark/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-3xl max-w-md w-full p-7 border border-gold/30 relative"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-plum/50 hover:text-plum">
          <X className="w-4 h-4" />
        </button>
        <h3 className="font-serif text-2xl text-plum mb-2">Request Custom Proposal</h3>
        <p className="text-sm text-foreground/70 mb-5">
          You have customized the **{title}** with **{itemsCount} items** for **{guests} guests** at an estimated total of{" "}
          <strong className="text-leaf">₹{total.toLocaleString("en-IN")}</strong>. Share your contact info, and the MCC team will schedule a tasting menu call.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! The MCC team will call you shortly.");
            onClose();
          }}
          className="space-y-3"
        >
          <input
            required
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-xl bg-white border border-plum/15 focus:border-gold focus:outline-none text-sm"
          />
          <input
            required
            type="tel"
            placeholder="WhatsApp / Phone number"
            className="w-full px-4 py-3 rounded-xl bg-white border border-plum/15 focus:border-gold focus:outline-none text-sm"
          />
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-plum/20 text-plum text-sm font-medium hover:bg-plum/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-plum text-cream text-sm font-semibold hover:bg-plum-dark"
            >
              Request Call
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}