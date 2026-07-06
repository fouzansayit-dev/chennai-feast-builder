import { Link } from "@tanstack/react-router";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Facebook, 
  Instagram, 
  ShieldCheck,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";
import exactLeafPlatter from "@/assets/footer-exact-leaf-platter.png";
import lotusIcon from "@/assets/lotus icon.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full font-sans bg-white text-slate-800 relative z-10 overflow-hidden shadow-2xl">
      {/* ========================================================================= */}
      {/* 1. TOP PURPLE BANNER / CTA BAR                                            */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-r from-[#4d1234] via-[#5b163e] to-[#45102f] text-white py-7 px-4 sm:px-8 lg:px-12 overflow-hidden shadow-lg border-b border-amber-500/20">
        
        {/* Left Side Traditional Mandala / Kolam Watermark Motif */}
        <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-48 h-48 opacity-15 pointer-events-none text-amber-300">
          <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full animate-spin-slow">
            <path d="M100 0 C105 30 120 45 150 50 C120 55 105 70 100 100 C95 70 80 55 50 50 C80 45 95 30 100 0 Z" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Right Side Mandala Watermark Symmetry */}
        <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-56 h-56 opacity-10 pointer-events-none text-amber-300">
          <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
            <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M100 0 L120 80 L200 100 L120 120 L100 200 L80 120 L0 100 L80 80 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Left Text Block with Lotus Icon */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 border-2 border-amber-300/60 p-1 shrink-0 shadow-md hidden sm:flex items-center justify-center overflow-hidden">
              <img src={lotusIcon} alt="Auspicious Lotus Emblem" className="w-full h-full object-contain rounded-full filter drop-shadow-sm" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-sm flex items-center justify-center lg:justify-start gap-2.5">
                <span>Planning an Event?</span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse hidden sm:inline-block" />
              </h3>
              <p className="text-amber-100/90 text-xs sm:text-sm font-normal max-w-xl leading-relaxed">
                Let us make your special day unforgettable with our delicious food and exceptional service.
              </p>
            </div>
          </div>

          {/* Right Action Block (Phone, Mail, CTA Button) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 sm:gap-6">
            
            {/* Phone Quick Link */}
            <a 
              href="tel:+919940396005"
              className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-amber-50 hover:text-amber-300 transition-colors duration-300 group py-1.5 px-3 rounded-full hover:bg-white/10"
              title="Call Us Now"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-plum-dark transition-all duration-300">
                <Phone className="w-4 h-4 text-amber-300 group-hover:text-plum-dark" />
              </div>
              <span className="tracking-wide">+91 99403 96005</span>
            </a>

            {/* Email Quick Link */}
            <a 
              href="mailto:mychennaicateringservices@gmail.com"
              className="hidden md:flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-amber-50 hover:text-amber-300 transition-colors duration-300 group py-1.5 px-3 rounded-full hover:bg-white/10"
              title="Send Us An Email"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-plum-dark transition-all duration-300">
                <Mail className="w-4 h-4 text-amber-300 group-hover:text-plum-dark" />
              </div>
              <span className="tracking-wide">mychennaicateringservices@gmail.com</span>
            </a>

            {/* GET A FREE QUOTE Button */}
            <Link
              to="/menu"
              className="relative inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#3c0d27] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-400 rounded-full shadow-[0_4px_20px_rgba(230,161,13,0.4)] hover:shadow-[0_6px_25px_rgba(230,161,13,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group border border-amber-200/50 shrink-0"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. MAIN FOOTER BODY (100% Seamless Color Matching)                         */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF8F5] relative overflow-hidden min-h-[260px]">
        
        {/* RIGHT SIDE GRAPHIC / DISH SHOWCASE (PURE TRANSPARENT PNG - ZERO COLOR MISMATCH) */}
        <div className="hidden xl:flex absolute right-0 top-0 bottom-0 h-full w-[420px] 2xl:w-[480px] pointer-events-none select-none z-10 items-end justify-end overflow-hidden">
          <img 
            src={exactLeafPlatter} 
            alt="South Indian Feast Platter on Banana Leaf with Diyas" 
            className="w-full h-full object-contain object-right-bottom mix-blend-multiply filter drop-shadow-md scale-105 translate-x-2"
          />
        </div>

        <div className="max-w-7xl mx-auto py-12 lg:py-16 px-4 sm:px-8 lg:px-12 relative z-20">
          {/* 4 Text Columns evenly distributed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full xl:max-w-[calc(100%-340px)]">
            
            {/* COLUMN 1: BRAND LOGO & TAGLINE & SOCIALS */}
            <div className="space-y-5 text-center sm:text-left">
              
              {/* MCC Circular Badge Logo & Lotus Icon */}
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-md border-2 border-amber-400/80 flex items-center justify-center overflow-hidden shrink-0">
                    <img 
                      src={logoImg} 
                      alt="My Chennai Catering Logo" 
                      className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-md" title="100% Pure Veg & Satvik">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                {/* Lotus Emblem next to logo */}
                <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-300 p-1.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0 hover:scale-105 transition-transform">
                  <img src={lotusIcon} alt="Lotus Icon" className="w-full h-full object-contain rounded-full" />
                </div>
              </div>

              {/* Tagline text from image */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs font-normal">
                Providing authentic Chennai catering services with love, hygiene & tradition since years.
              </p>

              {/* Social Media Circular Buttons */}
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-300"
                >
                  <Facebook className="w-4.5 h-4.5 fill-current" />
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-300"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/919940396005" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-300"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.953-2.005-.001-3.973-.502-5.724-1.457L0 24zM6.647 19.154c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.555 1.875 14.09 .845 11.453.845 6.015.845 1.592 5.26 1.59 10.7c0 1.93.507 3.806 1.467 5.426L2.08 19.7l3.68-.964z" />
                  </svg>
                </a>
              </div>

            </div>


            {/* COLUMN 2: QUICK LINKS (With vertical divider) */}
            <div className="sm:border-r sm:border-slate-200/90 sm:pr-6">
              <h4 className="text-[#541539] font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 text-center sm:text-left border-b sm:border-b-0 border-amber-200/50 pb-2 sm:pb-0">
                QUICK LINKS
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Services", path: "/services" },
                  { label: "Menu", path: "/menu" },
                  { label: "Gallery", path: "/services" },
                  { label: "Contact Us", path: "/contact" },
                ].map((item) => (
                  <li key={item.label} className="text-center sm:text-left">
                    <Link
                      to={item.path}
                      className="inline-flex items-center gap-1.5 hover:text-[#541539] hover:font-semibold hover:translate-x-1 transition-all duration-200 text-slate-600"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-amber-500/70" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            {/* COLUMN 3: OUR SERVICES (With vertical divider) */}
            <div className="lg:border-r lg:border-slate-200/90 lg:pr-6">
              <h4 className="text-[#541539] font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 text-center sm:text-left border-b sm:border-b-0 border-amber-200/50 pb-2 sm:pb-0">
                OUR SERVICES
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
                {[
                  "Weddings",
                  "Engagements",
                  "Corporate Events",
                  "Private Parties",
                  "Birthdays",
                  "Seemantham",
                ].map((service) => (
                  <li key={service} className="text-center sm:text-left">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 hover:text-[#541539] hover:font-semibold hover:translate-x-1 transition-all duration-200 text-slate-600"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-amber-500/70" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            {/* COLUMN 4: CONTACT INFO */}
            <div className="space-y-4">
              <h4 className="text-[#541539] font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 text-center sm:text-left border-b sm:border-b-0 border-amber-200/50 pb-2 sm:pb-0">
                CONTACT INFO
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                
                {/* Location */}
                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <a 
                    href="https://maps.google.com/?q=No+49,+South+Bazar,+Pattabiram,+Chennai+600072" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-[#541539] transition-colors leading-relaxed text-center sm:text-left font-medium max-w-xs"
                  >
                    No 49, South Bazar, Pattabiram, Chennai - 600072
                  </a>
                </li>

                {/* Phone */}
                <li className="flex items-center gap-3 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-4 h-4 text-amber-600" />
                  </div>
                  <a 
                    href="tel:+919940396005"
                    className="hover:text-[#541539] font-bold text-slate-900 transition-colors"
                  >
                    +91 99403 96005
                  </a>
                </li>

                {/* Email */}
                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Mail className="w-4 h-4 text-amber-600" />
                  </div>
                  <a 
                    href="mailto:mychennaicateringservices@gmail.com"
                    className="hover:text-[#541539] font-medium transition-colors text-xs leading-relaxed max-w-[240px] break-all sm:break-normal"
                  >
                    mychennaicateringservices@gmail.com
                  </a>
                </li>

                {/* Working Hours */}
                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="leading-tight text-center sm:text-left">
                    <div className="font-bold text-slate-800">8:00 AM – 9:00 PM</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">(Monday to Sunday)</div>
                  </div>
                </li>

              </ul>
            </div>

          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* 3. SUB-FOOTER BOTTOM BAR                                                 */}
      {/* ========================================================================= */}
      <div className="bg-[#F3EFEA] border-t border-slate-200/80 py-4 px-4 sm:px-8 lg:px-12 text-xs text-slate-600 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-medium">
          
          {/* Copyright notice */}
          <div className="flex items-center gap-2">
            <img src={lotusIcon} alt="" className="w-4 h-4 object-contain" />
            <span>© {currentYear} <span className="font-semibold text-slate-800">My Chennai Catering Services</span>. All Rights Reserved.</span>
          </div>

          {/* Legal / Policy Links */}
          <div className="flex items-center gap-4 text-slate-500">
            <Link to="/about" className="hover:text-[#541539] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/about" className="hover:text-[#541539] transition-colors">
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}