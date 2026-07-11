import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, ChevronDown } from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";
import lotusIcon from "@/assets/lotus icon.png";

export default function MobileAppHeader() {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Promo Strip */}
      <div className="bg-[#1E1108] text-amber-300 text-[9px] py-1.5 px-4 text-center font-extrabold tracking-[0.18em] uppercase">
        ✦ Free Sample Tasting for Weddings &amp; Engagements ✦
      </div>

      {/* Main Header Row */}
      <div className="px-3 py-2 flex items-center justify-between gap-2 border-b border-neutral-100">

        {/* LEFT: Lotus Guru */}
        <Link to="/" className="shrink-0 active:scale-95 transition-transform">
          <img
            src={lotusIcon}
            alt="Guru Blessings — My Chennai Catering"
            className="w-[68px] h-[68px] object-contain drop-shadow-md"
          />
        </Link>

        {/* CENTER: MCC Logo + Location badge */}
        <Link to="/" className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform flex-1">
          <div className="w-[54px] h-[54px] rounded-full bg-white border-2 border-amber-300 shadow-md overflow-hidden flex items-center justify-center">
            <img
              src={logoImg}
              alt="MCC — My Chennai Catering"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Location badge centred below logo */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[7px] uppercase tracking-[0.18em] text-neutral-400 font-semibold leading-none">
              Service Location
            </span>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1">
              <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
              <span className="text-[10px] text-[#1A1208] font-extrabold uppercase tracking-wide whitespace-nowrap">
                Chennai &amp; Suburbs
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
            </div>
          </div>
        </Link>

        {/* RIGHT: Contacts */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-[7px] uppercase tracking-[0.18em] text-neutral-400 font-semibold leading-none mb-0.5">
            Call Us
          </span>
          <a
            href="tel:+919940396005"
            className="flex items-center gap-1 text-[10px] font-extrabold text-[#1E1108] hover:text-amber-700 transition-colors tracking-wide leading-none"
          >
            <Phone className="w-2.5 h-2.5 text-amber-600 shrink-0" />
            99403 96005
          </a>
        </div>
      </div>

      {/* Quick Action Row */}
      <div className="flex items-center justify-center gap-3 px-4 py-2 bg-amber-50/80 border-b border-amber-100">
        <a
          href="tel:+919940396005"
          className="flex items-center gap-1.5 bg-[#1E1108] text-amber-300 px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest active:scale-95 transition-transform"
        >
          <Phone className="w-3 h-3" /> Call Now
        </a>
        <a
          href="https://wa.me/919940396005"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3 h-3" /> WhatsApp
        </a>
        <Link
          to="/customize"
          className="flex items-center gap-1.5 bg-amber-500 text-white px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest active:scale-95 transition-transform"
        >
          Customize Menu
        </Link>
      </div>
    </header>
  );
}
