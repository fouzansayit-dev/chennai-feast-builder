import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube, Leaf, Sparkles, UtensilsCrossed, CheckCircle2, ChevronRight } from "lucide-react";
import { CenterKolam } from "./Kolam";
import logoImg from "@/assets/mcc-logo.png";

export default function Footer() {
  return (
    <footer className="relative bg-plum-dark text-cream/85 mt-24 overflow-hidden">
      {/* Background traditional Kolam watermark */}
      <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.04] text-gold pointer-events-none">
        <CenterKolam size={220} />
      </div>

      {/* TOP QUALITY SIGNATURE & WHATSAPP QUICK CTA BAR */}
      <div className="border-t border-gold/15 bg-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Quality Seals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full lg:w-auto flex-1">
            {[
              { v: "100% Veg Pure & Satvic", d: "Strictly Vegetarian", icon: Leaf },
              { v: "Quality Ingredients", d: "Hand-pounded Spices", icon: Sparkles },
              { v: "Expert Chefs Great Taste", d: "Traditional Recipes", icon: UtensilsCrossed },
              { v: "On-Time Service Every Time", d: "Punctual Delivery", icon: CheckCircle2 },
            ].map((q, idx) => {
              const Icon = q.icon;
              return (
                <div key={idx} className="flex gap-3 items-start text-left">
                  <Icon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                      {q.v}
                    </div>
                    <div className="text-[9px] text-cream/60 mt-1 leading-normal">
                      {q.d}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-cream pl-5 pr-8 py-3.5 rounded-tl-[35px] rounded-br-[35px] rounded-tr-[5px] rounded-bl-[5px] border-r-2 border-b-2 border-gold/40 shadow-lg flex items-center gap-4 text-plum-dark max-w-sm shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm shrink-0 hover:bg-[#20ba5a] transition-all">
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path fill="white" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24z" />
                <path fill="#25D366" d="M16.924 13.917c-.297-.15-1.755-.867-2.027-.966-.273-.1-.472-.15-.672.15-.2.3-.775.966-.95 1.165-.175.2-.35.225-.647.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.299-.018-.46.13-.61.135-.134.298-.348.446-.52.149-.174.198-.298.298-.497.1-.2.05-.373-.025-.52-.075-.15-.672-1.62-.92-2.215-.24-.58-.487-.5-.672-.51-.174-.01-.373-.01-.572-.01-.2 0-.523.075-.797.373-.273.3-1.045 1.02-1.045 2.487 0 1.468 1.07 2.885 1.22 3.085.15.2 2.106 3.216 5.1 4.506.713.308 1.27.492 1.703.63.717.228 1.368.196 1.883.12.574-.085 1.755-.717 2.003-1.41.248-.693.248-1.288.173-1.41-.074-.12-.272-.22-.57-.37z" />
              </svg>
            </div>
            <div className="leading-none text-left">
              <div className="text-[9px] text-plum-dark/60 uppercase tracking-widest font-semibold">Have an Event?</div>
              <div className="text-[13px] font-serif text-plum-dark font-bold mt-0.5">Let's Make It Special!</div>
            </div>
            <a
              href="https://wa.me/919940396005"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-plum hover:bg-plum-dark text-white font-bold text-[9px] uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 ml-auto"
            >
              Get A Quote
            </a>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 border-t border-gold/10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-cream border border-gold/25 overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src={logoImg} 
                alt="MCC Logo" 
                className="w-full h-full object-cover scale-[1.43]" 
              />
            </div>
            <div className="font-serif text-2xl text-gold-gradient">
              MCC
            </div>
          </div>
          <p className="text-sm leading-relaxed text-cream/70 text-left">
            Two decades of authentic Sattvik feasts, guided by MCC. Serving Chennai's most sacred celebrations with purity, punctuality and exquisite taste.
          </p>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-[0.22em] text-xs mb-5 text-left font-bold">Explore</h4>
          <ul className="space-y-3.5 text-sm text-left">
            {[
              { name: "Home", path: "/" },
              { name: "Our Legacy", path: "/about" },
              { name: "Catering Services", path: "/services" },
              { name: "Menu & Quote", path: "/menu" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="group flex items-center gap-2 text-cream/75 hover:text-gold transition-all duration-300 transform hover:translate-x-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gold/40 group-hover:text-gold transition-colors duration-300" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-[0.22em] text-xs mb-5 text-left font-bold">Reach Us</h4>
          <ul className="space-y-4 text-sm text-left">
            <li className="flex gap-3.5 items-start group">
              <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/20 group-hover:border-gold/30 transition-all duration-300 shadow-sm">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <span className="text-cream/75 leading-relaxed pt-0.5">
                No 49, South Bazar, Thandurai,<br />Pattabiram, Chennai 600072
              </span>
            </li>
            <li className="flex gap-3.5 items-center group">
              <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/20 group-hover:border-gold/30 transition-all duration-300 shadow-sm">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <a
                href="tel:+919940396005"
                className="text-cream/75 hover:text-gold transition-all duration-300 transform group-hover:translate-x-1 inline-block"
              >
                +91 99403 96005
              </a>
            </li>
            <li className="flex gap-3.5 items-center group">
              <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/20 group-hover:border-gold/30 transition-all duration-300 shadow-sm">
                <Mail className="w-4 h-4 text-gold" />
              </div>
              <a
                href="mailto:mychennaicateringservices@gmail.com"
                className="text-cream/75 hover:text-gold transition-all duration-300 break-all transform group-hover:translate-x-1 inline-block"
              >
                mychennaicateringservices@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase tracking-[0.22em] text-xs mb-5 text-left font-bold">Service Corridors</h4>
          <p className="text-sm text-cream/70 leading-relaxed text-left">
            Pattabiram · Avadi · Ambattur · Thiruverkadu · Poonamallee · Mogappair · Anna Nagar · Porur · & across Chennai.
          </p>
        </div>
      </div>

      {/* COPYRIGHT & SOCIAL MEDIA BAR */}
      <div className="border-t border-gold/15 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <a 
            href="https://mychennaicateringservices.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-gold hover:text-gold-light tracking-widest font-semibold uppercase transition-colors duration-300"
          >
            mychennaicateringservices.com
          </a>
          
          <div className="hidden md:flex items-center gap-3 text-gold/30">
            <span>✦</span>
            <div className="w-16 h-px bg-gold/15" />
            <span>✦</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-cream/55 uppercase tracking-widest text-[10px]">Follow Us:</span>
            <div className="flex items-center gap-4">
              {[
                { i: Facebook, u: "https://facebook.com", c: "text-gold border-gold/30 hover:bg-gold hover:text-plum-dark hover:border-gold hover:shadow-[0_4px_12px_rgba(212,175,55,0.3)]" },
                { i: Instagram, u: "https://instagram.com", c: "text-gold border-gold/30 hover:bg-gold hover:text-plum-dark hover:border-gold hover:shadow-[0_4px_12px_rgba(212,175,55,0.3)]" },
                { 
                  i: (props: any) => (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" {...props}>
                      <path 
                        className="fill-transparent group-hover:fill-white transition-colors duration-300"
                        d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24z" 
                      />
                      <path 
                        className="fill-[#25D366]"
                        d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.555 1.875 14.09 .845 11.453.845 6.015.845 1.592 5.26 1.59 10.7.59 12.63 1.097 14.506 2.057 16.126L1.085 19.7l3.68-.964z" 
                      />
                      <path 
                        className="fill-[#25D366]"
                        d="M16.924 13.917c-.297-.15-1.755-.867-2.027-.966-.273-.1-.472-.15-.672.15-.2.3-.775.966-.95 1.165-.175.2-.35.225-.647.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.299-.018-.46.13-.61.135-.134.298-.348.446-.52.149-.174.198-.298.298-.497.1-.2.05-.373-.025-.52-.075-.15-.672-1.62-.92-2.215-.24-.58-.487-.5-.672-.51-.174-.01-.373-.01-.572-.01-.2 0-.523.075-.797.373-.273.3-1.045 1.02-1.045 2.487 0 1.468 1.07 2.885 1.22 3.085.15.2 2.106 3.216 5.1 4.506.713.308 1.27.492 1.703.63.717.228 1.368.196 1.883.12.574-.085 1.755-.717 2.003-1.41.248-.693.248-1.288.173-1.41-.074-.12-.272-.22-.57-.37z" 
                      />
                    </svg>
                  ), 
                  u: "https://wa.me/919940396005",
                  c: "text-[#25D366] border-[#25D366]/40 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_4px_12px_rgba(37,211,102,0.3)]"
                }
              ].map((soc, idx) => {
                const Icon = soc.i;
                return (
                  <a
                    key={idx}
                    href={soc.u}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-10 h-10 rounded-full border flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)] ${soc.c}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}