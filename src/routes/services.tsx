import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles, ShieldCheck, Award, Leaf, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import weddingHall from "@/assets/IMG_4558.webp";
import liveCounter from "@/assets/images-32.jpeg";
import spices from "@/assets/images-31.jpeg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import BookingForm from "@/components/BookingForm";

// High-quality images
import buffetSetup from "@/assets/1.jpg";
import liveStall from "@/assets/F.jpg";
import bananaLeafFeast from "@/assets/images-23.jpeg";
import dessertStation from "@/assets/images-69.jpg";
import { useMediaImages } from "@/hooks/useMediaImages";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Veg Catering Services in Chennai | Weddings, Engagements & Corporate Events" },
      { name: "description", content: "Expanded veg catering services in Chennai for Weddings, Engagements & Corporate Events by My Chennai Catering. 20+ years of legacy under D. Venkat." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Catering Services in Chennai | Weddings, Engagements & Corporate" },
      { property: "og:description", content: "Exquisite wedding catering, bespoke engagement spreads, and professional corporate event dining in Chennai." },
      { property: "og:url", content: "https://mychennaicateringservices.com/services/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/services/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Catering Services",
          "name": "My Chennai Catering Services",
          "provider": {
            "@type": "CateringService",
            "name": "My Chennai Catering Services",
            "telephone": "+919940396005",
            "founder": "D. Venkat",
            "url": "https://mychennaicateringservices.com"
          },
          "areaServed": "Chennai",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Catering Offerings",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Exquisite Wedding Catering Services in Chennai",
                  "url": "https://mychennaicateringservices.com/wedding-catering-services-in-chennai/"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bespoke Engagement Catering in Chennai",
                  "url": "https://mychennaicateringservices.com/engagement-catering-services-in-chennai/"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Professional Corporate Catering Services in Chennai",
                  "url": "https://mychennaicateringservices.com/corporate-catering-services-in-chennai/"
                }
              }
            ]
          }
        })
      }
    ]
  }),
  component: ServicesPage,
});

// EXPANDED_SERVICES data is built dynamically inside ServicesPage() using useMediaImages()

export function ServicesPage() {
  const { getImg } = useMediaImages();

  const EXPANDED_SERVICES = [
    {
      id: "weddings",   num: "01", badge: "Weddings",
      title: "Exquisite Wedding Catering Services in Chennai",
      route: "/wedding-catering-services-in-chennai",
      img: getImg("service_wedding", bananaLeafFeast),
      imgAlt: "Traditional South Indian wedding banquet featuring authentic banana leaf saapadu",
      summary: "Your wedding is a once-in-a-lifetime celebration, and we are here to make it truly unforgettable. We specialize in traditional South Indian wedding catering, offering authentic Thala Vazhai Ilai Saapadu that your guests will cherish.",
      highlights: [
        { t: "Customized Wedding Packages", d: "Tailored packages covering pre-wedding rituals, main ceremony, and post-wedding receptions." },
        { t: "The MCC Signature Experience", d: "From initial planning to final serve—rich Arachuvitta Sambar to sweet Elaneer Payasam." },
        { t: "Logistics & Management", d: "End-to-end event management ensuring seamless execution of the dining experience." },
        { t: "Quality Commitment", d: "Fresh, high-quality ingredients meeting the highest standards of taste and tradition." },
      ],
    },
    {
      id: "engagements", num: "02", badge: "Engagements",
      title: "Bespoke Engagement Catering in Chennai",
      route: "/engagement-catering-services-in-chennai",
      img: getImg("service_engagement", liveStall),
      imgAlt: "Bespoke engagement catering event setup in Chennai with live counter and fresh marigolds",
      summary: "Celebrate your commitment with our personalized engagement catering services. We understand that an engagement function requires a perfect balance of style, comfort, and authentic flavor.",
      highlights: [
        { t: "Curated Menu Design", d: "Working closely with you to match the unique vibe of your celebration." },
        { t: "Scalable Solutions", d: "Dedicated service for intimate family gatherings to large-scale engagement celebrations." },
        { t: "Professional Presentation", d: "Elegant, visually stunning presentation and gracious hospitality." },
      ],
    },
    {
      id: "corporate",  num: "03", badge: "Corporate Events",
      title: "Professional Corporate Catering Services in Chennai",
      route: "/corporate-catering-services-in-chennai",
      img: getImg("service_corporate", buffetSetup),
      imgAlt: "Professional corporate event catering buffet setup in Chennai",
      summary: "Elevate your business meetings, conferences, and office celebrations with our premium corporate catering services. We recognize that professionalism, punctuality, and efficiency are key to successful business events.",
      highlights: [
        { t: "Reliable Scheduling", d: "Guaranteed timely food delivery and setup keeping your corporate itinerary on track." },
        { t: "Tailored Business Menus", d: "Light breakfast spreads, working lunches, and formal corporate dinner setups." },
        { t: "Stress-Free Operations", d: "Experienced management handling entire dining setups while you focus on business." },
      ],
    },
  ];

  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative py-24 bg-plum-dark text-cream overflow-hidden">
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none">
          <CenterKolam size={320} />
        </div>

        <Reveal>
          <div className="relative text-center max-w-4xl mx-auto px-6 z-10 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Expanded Services Showcase</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
              Exquisite Catering Services in Chennai <span className="text-gold-gradient italic">for Every Occasion</span>
            </h1>
            <p className="mt-4 text-cream/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Back by <strong>20+ years of legacy</strong> under <Link to="/about" className="text-gold underline hover:text-white font-semibold">D. Venkat's leadership</Link>, we deliver perfection across Weddings, Engagements, and Corporate Events.
            </p>
          </div>
        </Reveal>
      </section>

      {/* EXPANDED SERVICES SHOWCASE SECTIONS */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
          {EXPANDED_SERVICES.map((s, idx) => (
            <Reveal key={s.id} delay={idx * 0.1}>
              <div 
                id={s.id} 
                className="bg-white rounded-3xl border border-amber-900/10 shadow-lg overflow-hidden p-6 sm:p-10 lg:p-12 transition-all duration-300 hover:border-amber-400/60"
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Image with Descriptive Alt Text */}
                  <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group border-2 border-amber-300/40">
                      <img 
                        src={s.img} 
                        alt={s.imgAlt} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy" 
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#3A1029]/90 text-amber-300 text-xs font-bold uppercase tracking-wider">
                        {s.badge}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Copy & Features */}
                  <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-2">
                      <span className="text-amber-800 font-serif text-lg font-bold">Service {s.num}</span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A1029]">
                        {s.title}
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed pt-1">
                        {s.summary}
                      </p>
                    </div>

                    {/* Feature Highlights Grid */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      {s.highlights.map((h) => (
                        <div key={h.t} className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/50">
                          <div className="flex items-center gap-2 font-bold text-[#3A1029] text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span>{h.t}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] sm:text-xs mt-1 leading-relaxed">
                            {h.d}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Sub-Page Direct Link & CTA */}
                    <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-100">
                      <Link
                        to={s.route}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3A1029] text-amber-300 hover:bg-[#2A163F] text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                      >
                        <span>View Dedicated {s.badge} Page</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to="/about"
                        className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline underline-offset-4"
                        title="Discover D. Venkat's 20+ years catering experience"
                      >
                        About D. Venkat's 20+ Yrs Experience →
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY / VISUAL SHOWCASE */}
      <section className="py-20 bg-white border-t border-plum/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Catering Gallery</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#3A1029] font-bold">
                Our Services in Action
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A glimpse of our real catering setups, live food stalls, authentic traditional feasts, and premium dessert displays across events in Chennai.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Traditional Banana Leaf Feast",
                desc: "Authentic South Indian feast with freshly prepared curries, payasam, vada, and rice.",
                img: bananaLeafFeast,
              },
              {
                title: "Live Food Counter",
                desc: "Beautifully decorated live counters serving hot specialties managed by our chefs.",
                img: liveStall,
              },
              {
                title: "Premium Buffet Service",
                desc: "Elegant buffet arrangement with polished chafing dishes and warm lighting.",
                img: buffetSetup,
              },
              {
                title: "Traditional Sweet Station",
                desc: "Artfully arranged Indian desserts including fresh milk peda and sweet gulab jamuns.",
                img: dessertStation,
              },
            ].map((item, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-amber-900/10 hover:border-amber-400/50 transition-all duration-300 bg-white">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-[#3A1029] font-bold text-base group-hover:text-gold transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION / FREE CONSULTATION FORM */}
      <section className="py-16 bg-cream border-t border-plum/10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Get a Free Consultation</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-plum font-bold">
            Plan Your Upcoming Event Dining with MCC
          </h2>
          <p className="text-foreground/75 text-sm max-w-2xl mx-auto">
            Contact D. Venkat and our senior culinary managers to request a customized proposal for your Wedding, Engagement, or Corporate event.
          </p>
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-plum/10 shadow-xl text-left">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}