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
  ArrowUpRight,
  Leaf
} from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";
import exactLeafPlatter from "@/assets/footer-exact-leaf-platter.png";
import lotusIcon from "@/assets/lotus icon.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full font-sans bg-white text-slate-800 relative z-10 overflow-hidden shadow-2xl overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. LEAVES OF LIFE BANNER & MANGO TORAN DECORATIVE TOP BAR                 */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-r from-[#2A163F] via-[#3D1A53] to-[#251238] text-white py-8 px-4 sm:px-8 lg:px-12 overflow-hidden border-b-2 border-amber-400/40 shadow-xl">
        
        {/* Decorative Leaf & Garland Top Border SVG */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-repeat-x opacity-80 pointer-events-none z-20">
          <svg className="w-full h-3 text-amber-400 fill-current" viewBox="0 0 1200 12" preserveAspectRatio="none">
            <path d="M0,0 C15,12 35,12 50,0 C65,12 85,12 100,0 C115,12 135,12 150,0 C165,12 185,12 200,0 C215,12 235,12 250,0 C265,12 285,12 300,0 C315,12 335,12 350,0 C365,12 385,12 400,0 C415,12 435,12 450,0 C465,12 485,12 500,0 C515,12 535,12 550,0 C565,12 585,12 600,0 C615,12 635,12 650,0 C665,12 685,12 700,0 C715,12 735,12 750,0 C765,12 785,12 800,0 C815,12 835,12 850,0 C865,12 885,12 900,0 C915,12 935,12 950,0 C965,12 985,12 1000,0 C1015,12 1035,12 1050,0 C1065,12 1085,12 1100,0 C1115,12 1135,12 1150,0 C1165,12 1185,12 1200,0 L1200,0 L0,0 Z"></path>
          </svg>
        </div>

        {/* Ambient Leaves of Life Background Patterns */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-64 h-64 opacity-15 pointer-events-none text-emerald-400 animate-leaf-sway">
          <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full filter drop-shadow">
            <path d="M100 10 C140 40 180 80 180 130 C180 170 145 190 100 190 C55 190 20 170 20 130 C20 80 60 40 100 10 Z" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M100 10 L100 190 M100 60 L140 90 M100 100 L150 130 M100 140 L135 165 M100 60 L60 90 M100 100 L50 130 M100 140 L65 165" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute right-4 -bottom-10 w-56 h-56 opacity-10 pointer-events-none text-amber-300 animate-leaf-sway-reverse">
          <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
            <path d="M100 20 C130 50 160 80 160 120 C160 150 130 180 100 180 C70 180 40 150 40 120 C40 80 70 50 100 20 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Headline & Leaves Branding */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border-2 border-emerald-400/70 p-2 shrink-0 shadow-lg flex items-center justify-center overflow-hidden animate-leaf-float">
              <Leaf className="w-7 h-7 text-emerald-400" />
            </div>
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Leaves of Life Tradition
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-sm flex items-center justify-center lg:justify-start gap-2.5">
                <span>Planning a Royal Grand Virundhu?</span>
              </h3>
              <p className="text-amber-100/90 text-xs sm:text-sm font-normal max-w-xl leading-relaxed">
                Experience authentic grand Saapadu served with love on fresh banana leaves.
              </p>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 sm:gap-6">
            
            <a 
              href="tel:+919940396005"
              className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors duration-300 group py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-amber-300/30"
              title="Call Us Now"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300">
                <Phone className="w-4 h-4 text-amber-300 group-hover:text-emerald-950" />
              </div>
              <span className="tracking-wide font-medium">+91 99403 96005</span>
            </a>

            <Link
              to="/menu"
              className="relative inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-emerald-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 hover:from-amber-200 hover:to-amber-300 rounded-full shadow-[0_4px_25px_rgba(245,158,11,0.5)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.7)] transform hover:-translate-y-0.5 transition-all duration-300 border border-amber-200 shrink-0"
            >
              <Leaf className="w-4 h-4 mr-2 text-emerald-900" />
              <span>EXPLORE SAAPADU MENUS</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. MAIN FOOTER BODY WITH LEAVES OF LIFE WATERMARKS & PLATTER SHOWCASE     */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF7F0] relative overflow-hidden min-h-[280px]">
        
        {/* Subtle Banana Leaf Vein Pattern Background Layer */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* RIGHT SIDE GRAPHIC / DISH SHOWCASE WITH ENHANCED CONNECTION */}
        <div className="hidden xl:flex absolute right-0 top-0 bottom-0 h-full w-[360px] 2xl:w-[420px] pointer-events-none select-none z-10 items-end justify-end overflow-hidden">
          <div className="relative w-full h-full flex items-end justify-end">
            {/* Enhanced Soft Green Leaf Backdrop Glow with Pulse Effect */}
            <div className="absolute bottom-6 right-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse-slow"></div>

            {/* Enhanced Platter with Multiple Effects */}
            <div className="relative w-full h-full flex items-end justify-end">
              <img
                src={exactLeafPlatter}
                alt="South Indian Feast Platter on Banana Leaf with Diyas"
                className="w-full h-full object-contain object-right-bottom mix-blend-multiply filter drop-shadow-xl scale-105 translate-x-2 animate-leaf-sway hover:scale-110 hover:drop-shadow-2xl transition-transform duration-500"
              />
              {/* Subtle Sparkle Effect */}
              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-amber-300/20 rounded-full animate-sparkle-pulse pointer-events-none"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 lg:py-16 px-4 sm:px-8 lg:px-12 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full xl:max-w-[calc(100%-380px)] 2xl:max-w-[calc(100%-440px)] overflow-x-hidden">
            
            {/* COLUMN 1: MCC LOGO & LEAF LIFE VISION */}
            <div className="space-y-5 text-center sm:text-left">
              
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-lg border-2 border-amber-400 flex items-center justify-center overflow-hidden shrink-0">
                    <img 
                      src={logoImg} 
                      alt="My Chennai Catering Logo" 
                      className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-700 text-white p-1 rounded-full shadow-md" title="Premium & Eco-Friendly">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                  </div>
                </div>

                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-300 p-1.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0 hover:scale-105 transition-transform">
                  <img src={lotusIcon} alt="Lotus Emblem" className="w-full h-full object-contain rounded-full" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Crafting royal South Indian banana-leaf Saapadu with authentic flavors & traditional hospitality.
              </p>

              {/* Eco-Friendly Sattvik Leaf Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-semibold">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Authentic Banana Leaf Service</span>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-[0_0_0px_rgba(24,119,242,0)] transition-all duration-500 hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] hover:scale-105"
                >
                  <Facebook className="w-4.5 h-4.5 fill-current transition-transform duration-500 hover:-rotate-12" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-[0_0_0px_rgba(240,148,51,0)] transition-all duration-500 hover:shadow-[0_0_15px_rgba(240,148,51,0.5)] hover:scale-105"
                >
                  <Instagram className="w-4.5 h-4.5 transition-transform duration-500 hover:rotate-6" />
                </a>

                <a
                  href="https://wa.me/919940396005"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_0px_rgba(37,211,102,0)] transition-all duration-500 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:scale-105"
                >
                  <svg className="w-4.5 h-4.5 fill-current transition-transform duration-500 hover:scale-110 hover:rotate-3" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.953-2.005-.001-3.973-.502-5.724-1.457L0 24zM6.647 19.154c1.6.95 3.188 1.449 4.825 1.449 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.555 1.875 14.09 .845 11.453.845 6.015.845 1.592 5.26 1.59 10.7c0 1.93.507 3.806 1.467 5.426L2.08 19.7l3.68-.964z" />
                  </svg>
                </a>
              </div>

            </div>


            {/* COLUMN 2: QUICK NAVIGATION */}
            <div className="sm:border-r sm:border-emerald-900/10 sm:pr-6">
              <h4 className="text-[#3D1A53] font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5 border-b sm:border-b-0 border-amber-300/40 pb-2 sm:pb-0">
                <Leaf className="w-4 h-4 text-emerald-600 inline sm:hidden" />
                QUICK LINKS
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Catering Services", path: "/services" },
                  { label: "Saapadu Menus", path: "/menu" },
                  { label: "Event Gallery", path: "/gallery" },
                  { label: "Contact Us", path: "/contact" },
                  { label: "Catering CRM Portal", path: "/crm" },
                ].map((item) => (
                  <li key={item.label} className="text-center sm:text-left">
                    <Link
                      to={item.path}
                      className="inline-flex items-center gap-1.5 hover:text-emerald-800 hover:font-semibold hover:translate-x-1 transition-all duration-200 text-slate-700"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            {/* COLUMN 3: CATERING SPECIALTIES */}
            <div className="lg:border-r lg:border-emerald-900/10 lg:pr-6">
              <h4 className="text-[#3D1A53] font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5 border-b sm:border-b-0 border-amber-300/40 pb-2 sm:pb-0">
                OUR SPECIALTIES
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
                {[
                  "Wedding Virundhu Saapadu",
                  "Premium Veg & Non-Veg Catering",
                  "Engagement & Reception Buffets",
                  "Live Tiffin & Sweet Counters",
                  "Seemantham & Traditional Functions",
                  "Corporate Deluxe Lunches",
                ].map((service) => (
                  <li key={service} className="text-center sm:text-left">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 hover:text-emerald-800 hover:font-semibold hover:translate-x-1 transition-all duration-200 text-slate-700"
                    >
                      <Leaf className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            {/* COLUMN 4: CONTACT & LOCATION */}
            <div className="space-y-4">
              <h4 className="text-[#3D1A53] font-bold text-xs sm:text-sm uppercase tracking-widest mb-4 text-center sm:text-left border-b sm:border-b-0 border-amber-300/40 pb-2 sm:pb-0">
                GET IN TOUCH
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                
                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-emerald-300/60">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                  </div>
                  <a 
                    href="https://maps.google.com/?q=No+49,+South+Bazar,+Pattabiram,+Chennai+600072" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-emerald-800 transition-colors leading-relaxed text-center sm:text-left font-medium max-w-xs"
                  >
                    No 49, South Bazar, Pattabiram, Chennai - 600072
                  </a>
                </li>

                <li className="flex items-center gap-3 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs border border-emerald-300/60">
                    <Phone className="w-4 h-4 text-emerald-700" />
                  </div>
                  <a 
                    href="tel:+919940396005"
                    className="hover:text-emerald-800 font-bold text-slate-900 transition-colors"
                  >
                    +91 99403 96005
                  </a>
                </li>

                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-emerald-300/60">
                    <Mail className="w-4 h-4 text-emerald-700" />
                  </div>
                  <a 
                    href="mailto:mychennaicateringservices@gmail.com"
                    className="hover:text-emerald-800 font-medium transition-colors text-xs leading-relaxed break-all"
                  >
                    mychennaicateringservices@gmail.com
                  </a>
                </li>

                <li className="flex items-start gap-3 justify-center sm:justify-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-emerald-300/60">
                    <Clock className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="leading-tight text-center sm:text-left">
                    <div className="font-bold text-slate-900">8:00 AM – 9:00 PM</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">(Open All 7 Days)</div>
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
      <div className="bg-[#EFEDE6] border-t border-emerald-900/10 py-4 px-4 sm:px-8 lg:px-12 text-xs text-slate-600 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-medium">
          
          <div className="flex items-center gap-2">
            <img src={lotusIcon} alt="" className="w-4 h-4 object-contain" />
            <span>© {currentYear} <span className="font-semibold text-slate-900">My Chennai Catering Services</span>. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <Link to="/about" className="hover:text-emerald-800 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-400">|</span>
            <Link to="/about" className="hover:text-emerald-800 transition-colors">
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}