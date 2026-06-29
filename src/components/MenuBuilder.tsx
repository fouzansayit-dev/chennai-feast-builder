import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Check, Sparkles, X } from "lucide-react";

type PackageKey = "tiffin" | "moderate" | "executive";

const MENU_DATA: Record<
  PackageKey,
  { title: string; tag: string; basePrice: number; items: Record<string, string[]> }
> = {
  tiffin: {
    title: "Tiffin Package",
    tag: "Morning · Snacks",
    basePrice: 250,
    items: {
      main: ["Idly", "Mini Idly", "Uthappam", "Rava Dosa", "Idiyappam", "Veg Stew"],
      chutneys: ["Coconut Chutney", "Kara Chutney", "Peanut Chutney", "Sambar"],
      drinks: ["Fresh Juice", "Filter Coffee", "Masala Tea"],
    },
  },
  moderate: {
    title: "Moderate Dinner",
    tag: "Most popular",
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
    title: "Executive Dinner",
    tag: "Wedding luxury",
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

export default function MenuBuilder() {
  const [pkg, setPkg] = useState<PackageKey>("moderate");
  const [guests, setGuests] = useState(150);
  const [custom, setCustom] = useState<string[]>([]);
  const [modal, setModal] = useState(false);

  const current = MENU_DATA[pkg];
  const total = useMemo(() => current.basePrice * guests, [current, guests]);

  const toggle = (item: string) =>
    setCustom((p) => (p.includes(item) ? p.filter((i) => i !== item) : [...p, item]));

  return (
    <section id="builder" className="relative py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
            Interactive Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-plum mb-4">
            Customize Your Royal Feast
          </h2>
          <p className="text-foreground/70">
            Select a base package, set your guest count, and tailor traditional South Indian
            dishes. Receive an instant estimate in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Builder */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gold/20 p-6 md:p-9 shadow-glow-plum">
            <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-plum/5 rounded-2xl">
              {(Object.keys(MENU_DATA) as PackageKey[]).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPkg(p);
                    setCustom([]);
                  }}
                  className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-medium transition-all ${
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
              <h3 className="font-serif text-xl">Featured items in {current.title}</h3>
            </div>

            <div className="space-y-7">
              {Object.entries(current.items).map(([cat, items]) => (
                <div key={cat}>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-gold-dark mb-3">
                    {cat}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {items.map((item) => {
                      const sel = custom.includes(item);
                      return (
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          key={item}
                          onClick={() => toggle(item)}
                          className={`flex items-center justify-between text-left px-3.5 py-3 rounded-xl border text-sm transition-all ${
                            sel
                              ? "border-leaf bg-leaf/5 text-leaf"
                              : "border-plum/10 bg-plum/[0.015] text-plum/80 hover:border-gold hover:bg-gold/5"
                          }`}
                        >
                          <span className="truncate">{item}</span>
                          {sel && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote panel */}
          <div className="bg-plum-dark text-cream rounded-3xl p-8 h-fit lg:sticky lg:top-28 border border-gold/30 shadow-glow-gold">
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
                <span className="text-cream/60">Rate / plate</span>
                <span>₹{current.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/60">Estimated count</span>
                <span>{guests} pax</span>
              </div>
              {custom.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-cream/60">Customizations</span>
                  <span>{custom.length} highlighted</span>
                </div>
              )}
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
              Request Menu Proposal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-cream/50 text-center mt-3">
              D. Venkat will call you within 1 business hour.
            </p>
          </div>
        </div>
      </div>

      {modal && <QuoteModal
        title={current.title}
        guests={guests}
        total={total}
        onClose={() => setModal(false)}
      />}
    </section>
  );
}

function QuoteModal({
  title,
  guests,
  total,
  onClose,
}: {
  title: string;
  guests: number;
  total: number;
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
        <h3 className="font-serif text-2xl text-plum mb-2">Request Menu Proposal</h3>
        <p className="text-sm text-foreground/70 mb-5">
          Quote for <strong>{title}</strong> · <strong>{guests} guests</strong> · est.{" "}
          <strong className="text-leaf">₹{total.toLocaleString("en-IN")}</strong>. Share your
          details and our team will respond shortly.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! D. Venkat's team will call you shortly.");
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
            placeholder="WhatsApp / Phone"
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
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}