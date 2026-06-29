import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Legacy" },
  { to: "/menu", label: "Menu" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-plum-dark/85 border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center bg-plum-dark/40">
            <span className="font-serif text-gold text-lg leading-none">M</span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-base sm:text-lg text-gold tracking-wide">
              MCC Catering
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-cream/70">
              Event Contractors
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm uppercase tracking-[0.18em] text-cream/85 hover:text-gold transition-colors relative group"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+919940396005"
            className="hidden md:inline-flex items-center gap-2 text-xs text-cream/80 hover:text-gold"
          >
            <Phone className="w-3.5 h-3.5" />
            +91 99403 96005
          </a>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-gold text-plum-dark text-xs font-semibold uppercase tracking-[0.18em] hover:bg-gold-light transition-all shadow-glow-gold"
          >
            Book Tasting
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-plum-dark/95 backdrop-blur-xl border-t border-gold/20">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-cream/90 text-sm uppercase tracking-[0.2em] py-2 border-b border-gold/10"
                activeProps={{ className: "text-gold" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="https://wa.me/919940396005"
              className="mt-2 text-center px-5 py-3 rounded-full bg-gold text-plum-dark text-xs font-semibold uppercase tracking-[0.18em]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}