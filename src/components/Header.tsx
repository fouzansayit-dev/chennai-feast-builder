import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X, MapPin, Clock, Sparkles } from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";
import lotusIcon from "@/assets/lotus icon.png";

const NAV = [
  { to: "/", label: "Home", hash: undefined },
  { to: "/about", label: "About Us", hash: undefined },
  { to: "/services", label: "Services", hash: undefined },
  { to: "/menu", label: "Menu", hash: undefined },
  { to: "/builder", label: "Customize your own menu ✦", hash: undefined },
  { to: "/gallery", label: "Gallery", hash: undefined },
  { to: "/", hash: "testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact Us", hash: undefined },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leftLinks = NAV.slice(0, 4);
  const rightLinks = NAV.slice(4);

  const renderNavLink = (n: typeof NAV[number]) => {
    if (n.label === "Customize your own menu ✦") {
      return (
        <Link
          key={n.label}
          to="/builder"
          className="px-3.5 py-1.5 rounded-full bg-[#3E2E23] hover:bg-[#2A1E16] text-[#FFD700] hover:text-white text-[10px] xl:text-[11px] uppercase tracking-[0.12em] font-extrabold transition-all duration-300 shadow-lg flex items-center gap-1.5 border-2 border-[#FFD700] active:scale-95 shrink-0"
        >
          <span>CUSTOMIZE YOUR OWN MENU</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-pulse shrink-0" />
        </Link>
      );
    }
    if (n.label === "Services") {
      return (
        <div key={n.label} className="relative group/menu py-1">
          <button className="text-[11px] uppercase tracking-[0.2em] font-bold text-plum-dark hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
            {n.label}
            <span className="text-[8px] transition-transform group-hover/menu:rotate-180">▼</span>
          </button>
          {/* Dropdown Menu */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-200 transform scale-95 origin-top group-hover/menu:scale-100 z-50">
            <div className="bg-white rounded-xl shadow-xl border border-zinc-100 py-2.5 overflow-hidden">
              <Link
                to="/wedding-catering-services-in-chennai"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Weddings
              </Link>
              <Link
                to="/engagement-catering-services-in-chennai"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Engagements
              </Link>
              <Link
                to="/corporate-catering-services-in-chennai"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Corporate Events
              </Link>
              <Link
                to="/services"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold border-t border-zinc-100"
              >
                All Services Showcase →
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Link
        key={n.label}
        to={n.to}
        hash={n.hash}
        className="text-[10px] xl:text-[11px] uppercase tracking-[0.12em] xl:tracking-[0.18em] font-bold text-plum-dark hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0"
        activeProps={{ className: "text-white border-b-2 border-white" }}
        activeOptions={{ exact: true, includeHash: true }}
      >
        {n.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md">
      {/* Top White Row (Desktop Only) - Collapses on scroll */}
      <div className={`hidden lg:block border-b border-zinc-100/80 transition-all duration-300 overflow-hidden ${
        scrolled ? "max-h-0 py-0 opacity-0 border-none pointer-events-none" : "max-h-24 py-2 opacity-100"
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          {/* Left Side: Address & Office Hours */}
          <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-medium tracking-wide uppercase">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>No 49, South Bazar, Pattabiram, Chennai</span>
            </div>
            <div className="w-px h-3 bg-zinc-200" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>Office Hours: 8:00 AM - 9:00 PM</span>
            </div>
          </div>

          {/* Center Spacer for absolutely positioned Logo */}
          <div className="w-28 md:w-36" />

          {/* Right Side: Phone, Quote & SINGLE PROMINENT LARGE LOTUS ICON */}
          <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-medium tracking-wide uppercase">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>
                Support:{" "}
                <a href="tel:+919940396005" className="hover:text-gold-dark font-bold text-zinc-700">
                  +91 99403 96005
                </a>{" "}
                /{" "}
                <a href="tel:+919940832988" className="hover:text-gold-dark font-bold text-zinc-700">
                  +91 99408 32988
                </a>
              </span>
            </div>
            <div className="w-px h-3 bg-zinc-200" />
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-white transition-all duration-300 text-[9px] font-bold tracking-widest uppercase shadow-sm"
            >
              Request a Quote
            </Link>

            {/* SINGLE LARGE LOTUS ICON PROPERLY CONTAINED IN CIRCLE */}
            <div className="relative group/lotus cursor-pointer pl-2 shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-50/80 border-2 border-amber-400/80 p-1 shadow-md hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden">
                <img
                  src={lotusIcon}
                  alt="Lotus Auspicious Symbol"
                  className="w-full h-full object-contain rounded-full filter drop-shadow-sm"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Desktop Split Peach Navbar (Desktop Only) */}
      <div className="hidden lg:block relative h-12 select-none">
        
        {/* ONE SINGLE CONTINUOUS SEAMLESS SVG BACKGROUND (Zero Seams, Zero Gaps, Zero White Lines) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-b-[24px] md:rounded-b-[40px]">
          <svg
            viewBox="0 0 1000 48"
            preserveAspectRatio="none"
            className="w-full h-full text-party-peach fill-current filter drop-shadow-sm"
          >
            <path d="M 0,0 L 410,0 C 455,0 455,28 500,28 C 545,28 545,0 590,0 L 1000,0 L 1000,48 L 0,48 Z" />
          </svg>
        </div>

        {/* Content Row */}
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-center justify-between z-10">
          {/* Left Side Links */}
          <div className="flex items-center gap-2.5 xl:gap-4 w-[calc(50%-90px)] justify-end pr-2">
            {leftLinks.map(renderNavLink)}
          </div>

          {/* Center Spacer for the absolutely positioned logo */}
          <div className="w-[180px] shrink-0" />

          {/* Right Side Links */}
          <div className="flex items-center gap-2.5 xl:gap-4 w-[calc(50%-90px)] justify-start pl-2">
            {rightLinks.map(renderNavLink)}
          </div>
        </div>
      </div>

      {/* Mobile Navbar Row (Mobile Only) */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link to="/" className="flex items-center group relative z-10">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-gold shadow-md overflow-hidden flex items-center justify-center p-0.5">
            <img
              src={logoImg}
              alt="MCC Logo"
              className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Lotus Badge on Mobile Navbar */}
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-300 p-1 shadow-xs shrink-0 overflow-hidden flex items-center justify-center">
            <img src={lotusIcon} alt="Lotus Icon" className="w-full h-full object-contain rounded-full" />
          </div>

          <Link
            to="/builder"
            className="px-2.5 py-1.5 rounded-full bg-[#3E2E23] text-[#FFD700] text-[8.5px] uppercase tracking-wider font-extrabold flex items-center gap-1 border border-[#FFD700] shadow-sm active:scale-95"
          >
            <span>Customize Menu</span>
            <Sparkles className="w-3 h-3 text-[#FFD700]" />
          </Link>

          <a
            href="tel:+919940396005"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-plum/10 bg-plum text-white hover:bg-plum-dark transition-all"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold-dark bg-gold/5"
            aria-label="Menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Desktop Absolutely Positioned Logo Overlay */}
      <div
        className={`hidden lg:block absolute left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? "top-0" : "top-[10px] md:top-[12px]"
        }`}
      >
        <Link to="/" className="group block">
          <div
            className={`rounded-full bg-white border-2 border-gold shadow-lg overflow-hidden flex items-center justify-center p-0.5 transition-all duration-300 ${
              scrolled ? "w-12 h-12 md:w-14 md:h-14" : "w-24 h-24 md:w-28 md:h-28"
            }`}
          >
            <img
              src={logoImg}
              alt="MCC Logo"
              className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-[64px] bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <div className="lg:hidden relative z-50 bg-white/98 backdrop-blur-xl border-t border-zinc-150 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-6 flex flex-col gap-3">
              {NAV.map((n) => {
                const isCustomizer = n.label === "Customize your own menu ✦";
                return (
                  <Link
                    key={n.label}
                    to={n.to}
                    hash={n.hash}
                    onClick={() => setOpen(false)}
                    className={
                      isCustomizer
                        ? "my-1 text-center px-4 py-3 rounded-xl bg-plum text-cream text-xs uppercase tracking-[0.2em] font-bold shadow-md flex items-center justify-center gap-2 border border-gold/40"
                        : "text-zinc-800 text-xs font-bold uppercase tracking-[0.2em] py-2.5 border-b border-zinc-100 hover:text-gold-dark transition-colors flex items-center justify-between"
                    }
                    activeProps={{ className: isCustomizer ? "" : "text-gold-dark font-bold border-gold" }}
                  >
                    <span>{n.label}</span>
                    {!isCustomizer && <span className="text-zinc-300 text-xs">→</span>}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 mt-3 w-full">
                <a
                  href="tel:+919940396005"
                  className="text-center px-5 py-3 rounded-full bg-gold text-plum-dark text-[10px] font-bold uppercase tracking-[0.18em] shadow-md hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 fill-current text-plum-dark" />
                  <span>Call: +91 99403 96005</span>
                </a>
                <a
                  href="tel:+919940832988"
                  className="text-center px-5 py-3 rounded-full bg-gold text-plum-dark text-[10px] font-bold uppercase tracking-[0.18em] shadow-md hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 fill-current text-plum-dark" />
                  <span>Call: +91 99408 32988</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}