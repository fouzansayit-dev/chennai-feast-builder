import React from "react";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function MobileFloatingBar() {
  return (
    <div className="lg:hidden fixed bottom-3 left-4 right-4 z-40 bg-plum-dark/95 backdrop-blur-md border border-gold/30 rounded-full p-2 shadow-2xl flex items-center justify-between text-cream">
      {/* Call Direct */}
      <a
        href="tel:+919940396005"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-gold/15 hover:bg-gold/25 border border-gold/30 text-gold-light text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 text-center"
      >
        <Phone className="w-3.5 h-3.5 fill-current text-gold shrink-0" />
        <span>Call Now</span>
      </a>

      {/* Customizer Link */}
      <Link
        to="/"
        hash="builder"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-plum hover:bg-plum-dark border border-gold/20 text-cream text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 text-center mx-1.5"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
        <span>Customize Menu</span>
      </Link>

      {/* WhatsApp Quote */}
      <a
        href="https://wa.me/919940396005?text=Hi%20MCC%20Catering,%20I%20would%20like%20to%20inquire%20about%20catering%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-emerald-700/80 hover:bg-emerald-700 border border-emerald-500/40 text-white text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 text-center"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
