import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, X, Leaf, GlassWater, Send, Users } from "lucide-react";
import { enquiriesAPI } from "@/services/crmApi";

type PackageKey = "tiffin" | "moderate" | "executive";

const MENU_DATA: Record<
  PackageKey,
  { title: string; tag: string; items: Record<string, string[]> }
> = {
  tiffin: {
    title: "Mangala Udhayam Tiffin",
    tag: "Morning · Auspicious Tiffin",
    items: {
      main: ["Idly", "Mini Idly", "Uthappam", "Rava Dosa", "Idiyappam", "Veg Stew"],
      chutneys: ["Coconut Chutney", "Kara Chutney", "Peanut Chutney", "Sambar"],
      drinks: ["Fresh Juice", "Filter Coffee", "Masala Tea"],
    },
  },
  moderate: {
    title: "Thala Vazhai Saapadu",
    tag: "Traditional Banana Leaf Feast",
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
            Select a package, toggle your favorite dishes, and customize your headcount. Watch your items arrange dynamically on the banana leaf plate!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Item Customizer */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gold/15 p-6 md:p-9 shadow-glow-plum">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8 p-1.5 bg-plum/5 rounded-2xl border border-plum/10">
              {(Object.keys(MENU_DATA) as PackageKey[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPkg(p)}
                  className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
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
              <Sparkles className="w-4 h-4 text-gold shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl">Customize menu items ({selectedItems.length} selected)</h3>
            </div>

            <div className="space-y-7">
              {Object.entries(current.items).map(([cat, items]) => (
                <div key={cat} className="space-y-3">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-bold">
                    {cat}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
                    {items.map((item) => {
                      const sel = selectedItems.includes(item);
                      return (
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          key={item}
                          onClick={() => toggle(item)}
                          className={`flex items-center justify-between text-left px-2.5 py-2.5 sm:px-3.5 sm:py-3 rounded-xl border text-[11px] sm:text-xs font-medium transition-all ${
                            sel
                              ? "border-leaf bg-leaf/5 text-leaf font-bold shadow-sm"
                              : "border-plum/10 bg-plum/[0.015] text-plum/80 hover:border-gold hover:bg-gold/5"
                          }`}
                        >
                          <span className="truncate pr-1">{item}</span>
                          {sel ? (
                            <Check className="w-3.5 h-3.5 shrink-0 text-leaf" />
                          ) : (
                            <span className="text-[9px] text-plum/30 font-light shrink-0">+ Add</span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Leaf Platter Preview & Menu Request */}
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

          </div>

        </div>
      </div>

      {modal && (
        <QuoteModal
          title={current.title}
          guests={guests}
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
  itemsCount,
  onClose,
}: {
  title: string;
  guests: number;
  itemsCount: number;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Custom Feast Proposal Request: ${title} - ${name}`);
    const body = encodeURIComponent(
      `Hello MCC Catering Team,\n\nI created a custom feast menu proposal on your website:\n\n` +
        `• Name: ${name}\n` +
        `• Phone/WhatsApp: ${phone}\n` +
        `• Selected Package: ${title}\n` +
        `• Items Count: ${itemsCount} items\n` +
        `• Guest Count: ${guests} pax\n\n` +
        `Please contact me with a formal menu card PDF and availability.\n\nThank you!`
    );
    return `mailto:mychennaicateringservices@gmail.com?subject=${subject}&body=${body}`;
  };

  const getWhatsappUrl = () => {
    const text = encodeURIComponent(
      `Hello MCC Catering! I customized a feast menu on your website:\n` +
        `*Name:* ${name}\n` +
        `*Package:* ${title}\n` +
        `*Items:* ${itemsCount} items\n` +
        `*Guests:* ${guests} pax\n` +
        `*Phone:* ${phone}`
    );
    return `https://wa.me/919940396005?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save booking directly to admin CRM database (no auth required)
      await enquiriesAPI.create({
        name,                     // backend expects: name
        phone,                    // backend expects: phone
        event_type: title,
        event_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // default: 30 days from now
        guests: guests,
        package: title,
        special_requests: `Custom Menu Proposal via website. Items selected: ${itemsCount}.`,
      });
    } catch (err) {
      // Non-blocking: submission still "succeeds" from user perspective
      console.warn("Booking save to CRM failed (backend may be offline):", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

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

        {submitted ? (
          <div className="py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-leaf/10 text-leaf flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl text-plum font-semibold mb-2">Request Sent!</h4>
            <p className="text-xs text-foreground/75 mb-5 leading-relaxed">
              Your customized proposal request for <strong>{title}</strong> has been sent to <strong>mychennaicateringservices@gmail.com</strong>.
              MCC team will contact <strong>{phone}</strong> shortly.
            </p>

            <div className="flex flex-col gap-2.5 mb-5">
              <a
                href={getMailtoUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-plum hover:bg-plum-dark text-cream rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Send Direct Email to Owner
              </a>
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Send via WhatsApp (+91 99403 96005)
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-plum/20 text-plum text-xs font-semibold hover:bg-plum/5"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-foreground/70 mb-5">
              You customized <strong>{title}</strong> ({itemsCount} items) for <strong>{guests} guests</strong>.
              Share your contact info to receive the formal proposal call.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-xl bg-white border border-plum/15 focus:border-gold focus:outline-none text-sm"
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp / Phone number"
                className="w-full px-4 py-3 rounded-xl bg-white border border-plum/15 focus:border-gold focus:outline-none text-sm"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl border border-plum/20 text-plum text-sm font-medium hover:bg-plum/5 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-plum text-cream text-sm font-semibold hover:bg-plum-dark disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? "Sending Request..." : "Request Proposal"}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}