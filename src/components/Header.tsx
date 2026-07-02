import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X, MapPin, Clock } from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";

const NAV = [
  { to: "/", label: "Home", hash: undefined },
  { to: "/about", label: "About Us", hash: undefined },
  { to: "/services", label: "Services", hash: undefined },
  { to: "/menu", label: "Menu", hash: undefined },
  { to: "/", hash: "gallery", label: "Gallery" },
  { to: "/", hash: "testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact Us", hash: undefined },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leftLinks = NAV.slice(0, 4);
  const rightLinks = NAV.slice(4);

  const renderNavLink = (n: typeof NAV[number]) => {
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
                to="/services"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Weddings
              </Link>
              <Link
                to="/services"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Engagements
              </Link>
              <Link
                to="/services"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Corporate Events
              </Link>
              <a
                href="/#book"
                onClick={() => {
                  const el = document.getElementById("book");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Private Parties
              </a>
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
        className="text-[11px] uppercase tracking-[0.2em] font-bold text-plum-dark hover:text-white transition-colors relative py-1"
        activeProps={{ className: "text-white border-b-2 border-white" }}
        activeOptions={{ exact: true, includeHash: true }}
      >
        {n.label}
      </Link>
    );
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border border-zinc-200/50 border-t-0 shadow-sm rounded-b-[24px] md:rounded-b-[40px]"
    >
      {/* Top Row (Desktop Only) */}
      <div 
        className={`hidden lg:block border-b border-zinc-100/80 transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0 py-0" : "max-h-20 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-10 flex items-center justify-between">
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
          <div className="w-24 md:w-32" />

          {/* Right Side: Phone & Request a Quote */}
          <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-medium tracking-wide uppercase">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>Support: <a href="tel:+919940396005" className="hover:text-gold-dark font-bold text-zinc-700">+91 99403 96005</a></span>
            </div>
            <div className="w-px h-3 bg-zinc-200" />
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-white transition-all duration-300 text-[9px] font-bold tracking-widest uppercase shadow-sm"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Split Navbar (Desktop Only) */}
      <div className="hidden lg:block relative h-12 select-none">
        {/* Curved Peach Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-b-[24px] md:rounded-b-[40px]">
          {/* Left Solid Part */}
          <div className="absolute left-0 top-0 bottom-0 w-[calc(50%-100px)] bg-party-peach" />
          
          {/* Center Curved SVG Dip */}
          <svg 
            viewBox="0 0 200 48" 
            fill="none" 
            preserveAspectRatio="none" 
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[200px] h-full text-party-peach fill-current"
          >
            <path d="M0,0 C60,0 60,28 100,28 C140,28 140,0 200,0 L200,48 L0,48 Z" />
          </svg>
          
          {/* Right Solid Part */}
          <div className="absolute right-0 top-0 bottom-0 w-[calc(50%-100px)] bg-party-peach" />
        </div>

        {/* Content Row */}
        <div className="relative max-w-7xl mx-auto px-10 h-full flex items-center justify-between z-10">
          {/* Left Side Links */}
          <div className="flex items-center gap-8 w-[calc(50%-100px)] justify-end pr-6">
            {leftLinks.map(renderNavLink)}
          </div>

          {/* Center Spacer for the absolutely positioned logo */}
          <div className="w-[200px] shrink-0" />

          {/* Right Side Links */}
          <div className="flex items-center gap-8 w-[calc(50%-100px)] justify-start pl-6">
            {rightLinks.map(renderNavLink)}
          </div>
        </div>
      </div>

      {/* Mobile Navbar Row (Mobile Only) */}
      <div className="lg:hidden max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center group relative z-10">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-gold shadow-md overflow-hidden flex items-center justify-center">
            <img 
              src={logoImg} 
              alt="MCC Logo" 
              className="w-full h-full object-cover scale-[1.10] transition-transform duration-300 group-hover:scale-[1.17]" 
            />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="tel:+919940396005"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-plum/10 bg-plum text-white hover:bg-plum-dark transition-all"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold-dark bg-gold/5"
            aria-label="Menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Desktop Absolutely Positioned Logo Overlay */}
      <div 
        className={`hidden lg:block absolute left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? "top-[4px]" : "top-[16px] md:top-[20px]"
        }`}
      >
        <Link to="/" className="group block">
          <div 
            className={`rounded-full bg-white border-2 border-gold shadow-md overflow-hidden flex items-center justify-center transition-all duration-300 ${
              scrolled ? "w-12 h-12 md:w-14 h-14" : "w-20 h-20 md:w-24 md:h-24"
            }`}
          >
            <img 
              src={logoImg} 
              alt="MCC Logo" 
              className="w-full h-full object-cover scale-[1.10] transition-transform duration-300 group-hover:scale-[1.17]" 
            />
          </div>
        </Link>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-zinc-150 shadow-lg">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                hash={n.hash}
                onClick={() => setOpen(false)}
                className="text-zinc-800 text-sm uppercase tracking-[0.2em] py-2 border-b border-zinc-100 hover:text-gold-dark transition-colors"
                activeProps={{ className: "text-gold-dark font-semibold" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="tel:+919940396005"
              className="mt-2 text-center px-5 py-3 rounded-full bg-gold text-plum-dark text-xs font-bold uppercase tracking-[0.18em] shadow-md hover:bg-gold-dark transition-colors"
            >
              Call: +91 99403 96005
            </a>
          </div>
        </div>
      )}
    </header>
  );
}