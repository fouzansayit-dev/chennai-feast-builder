import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-plum-dark text-cream/85 mt-24">
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="font-serif text-2xl text-gold-gradient mb-3">
            MCC Catering
          </div>
          <p className="text-sm leading-relaxed text-cream/70">
            Two decades of authentic Sattvik feasts, guided by D. Venkat. Serving Chennai's most sacred celebrations with purity, punctuality and exquisite taste.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-plum-dark transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-[0.22em] text-xs mb-5">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-gold">Our Legacy</Link></li>
            <li><Link to="/menu" className="hover:text-gold">Menu & Quote</Link></li>
            <li><Link to="/services" className="hover:text-gold">Catering Services</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Book an Event</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-[0.22em] text-xs mb-5">Reach Us</h4>
          <ul className="space-y-3 text-sm text-cream/75">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>No 49, South Bazar, Thandurai,<br />Pattabiram, Chennai 600072</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <a href="tel:+919940396005" className="hover:text-gold">+91 99403 96005</a>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <a href="mailto:mychennaicateringservices@gmail.com" className="hover:text-gold break-all">mychennaicateringservices@gmail.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-[0.22em] text-xs mb-5">Service Corridors</h4>
          <p className="text-sm text-cream/70 leading-relaxed">
            Pattabiram · Avadi · Ambattur · Thiruverkadu · Poonamallee · Mogappair · Anna Nagar · Porur · & across Chennai.
          </p>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/55">
          <span>© {new Date().getFullYear()} My Chennai Catering Services. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">Crafted with reverence · Pattabiram</span>
        </div>
      </div>
    </footer>
  );
}