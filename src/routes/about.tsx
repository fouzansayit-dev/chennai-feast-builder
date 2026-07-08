import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImage from "@/assets/1.jpg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import { Reveal } from "@/components/Reveal";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import { 
  Award, 
  Leaf, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake, 
  Utensils, 
  MapPin, 
  Phone, 
  Calendar, 
  Building2, 
  Users, 
  ArrowRight 
} from "lucide-react";
import BookingForm from "@/components/BookingForm";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About My Chennai Catering | Authentic Taste, Traditional Excellence" },
      { name: "description", content: "Welcome to My Chennai Catering Services (MCC), your premier partner for vegetarian catering in Chennai. 20+ years of legacy under D. Venkat's leadership." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "About My Chennai Catering Services | Authentic Taste, Traditional Excellence" },
      { property: "og:description", content: "20+ years of expertise in pure vegetarian & Sattvik catering across Chennai. Founded & led by D. Venkat." },
      { property: "og:url", content: "https://mychennaicateringservices.com/about-my-chennai-catering/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/about-my-chennai-catering/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About My Chennai Catering Services",
          "url": "https://mychennaicateringservices.com/about-my-chennai-catering/",
          "mainEntity": {
            "@type": "CateringService",
            "name": "My Chennai Catering Services",
            "founder": "D. Venkat",
            "telephone": "+919940396005",
            "description": "Premier partner for high-quality vegetarian catering services in Chennai with 20+ years of experience."
          }
        })
      }
    ]
  }),
  component: About,
});

const WHY_CHOOSE_US = [
  {
    title: "Two Decades of Excellence",
    desc: "20+ years of expertise in delivering premium catering solutions.",
    icon: Award,
  },
  {
    title: "Pure Vegetarian & Sattvik Cuisine",
    desc: "We specialize in 100% pure vegetarian menus, including authentic Sattvik catering services for religious functions.",
    icon: Leaf,
  },
  {
    title: "Traditional & Modern Service",
    desc: "Whether you prefer a traditional banana leaf meal service or a modern buffet, we customize our approach to suit your event style.",
    icon: Utensils,
  },
  {
    title: "Hygienic Preparation",
    desc: "We maintain the highest standards of cleanliness and food safety in every meal we prepare.",
    icon: ShieldCheck,
  },
  {
    title: "Customized Menus",
    desc: "We work closely with you to curate a menu that delights your guests and fits your budget.",
    icon: Sparkles,
  },
  {
    title: "Professional Team",
    desc: "Our experienced chefs and service staff ensure timely delivery and seamless event management from start to finish.",
    icon: HeartHandshake,
  },
];

const EXPERTISE_AREAS = [
  {
    category: "Life Milestones",
    items: ["Weddings & Kalyana Saapadu", "Post-Wedding Receptions", "Engagements & Betrothals", "Seemantham (Baby Shower) Ceremonies"],
    icon: Calendar,
  },
  {
    category: "Family Functions",
    items: ["Griha Pravesham (Housewarming)", "Birthday & Anniversary Parties", "Religious & Temple Functions", "Intimate Home Gatherings"],
    icon: Users,
  },
  {
    category: "Corporate Events",
    items: ["Professional Executive Lunches", "Conferences & Seminars", "Office Celebrations & Festivals", "Custom Corporate Buffets"],
    icon: Building2,
  },
];

const SERVING_LOCATIONS = [
  "Pattabiram", "Avadi", "Ambattur", "Poonamallee", 
  "Thiruverkadu", "Mogappair", "Porur", "Anna Nagar"
];

const TIMELINE = [
  { y: "2003", t: "Humble Beginnings in Pattabiram", d: "Founded by D. Venkat to serve pure, traditional South Indian vegetarian recipes to local families." },
  { y: "2008", t: "Expansion Across West Chennai", d: "Became the most trusted catering partner for weddings, poojas & functions across Avadi, Ambattur, and Thiruverkadu." },
  { y: "2014", t: "Live Counters & Modern Buffets", d: "Introduced hot Dosa counters, Chaat stations, and grand sweet stalls for traditional saapadu experiences." },
  { y: "2019", t: "Grand Kalyana Virundhu", d: "Luxury mandapam dining arrangements, madisar-style servers, and high-capacity event setups." },
  { y: "Today", t: "Two Decades of Excellence", d: "2000+ memorable celebrations served across Chennai with 100% pure veg taste, hygiene, and perfection." },
];

export function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-slate-800 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-[#2A163F] via-[#3A1029] to-[#2B1028] text-white overflow-hidden border-b-2 border-amber-400/30">
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.18),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Authentic Taste, Traditional Excellence</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                About <span className="text-amber-300 italic font-normal">My Chennai Catering Services</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Welcome to <strong>My Chennai Catering Services (MCC)</strong>, your premier partner for high-quality vegetarian catering services in Chennai. With over 20 years of experience, we specialize in bringing the authentic flavors of South Indian cuisine to your most cherished occasions. Whether it is a grand wedding, an intimate family gathering, or a corporate function, we believe that great events are built on the foundation of exceptional food and impeccable hospitality.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/builder"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-[#3A1029] text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-105 transition-all flex items-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Build Your Custom Menu</span>
                </Link>

                <a
                  href="tel:+919940396005"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>Call: +91 99403 96005</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <Reveal delay={0.15}>
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border-4 border-amber-300/40 shadow-2xl group">
                <img 
                  src={aboutImage} 
                  alt="My Chennai Catering grand banquet events setup" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="font-serif text-xl font-bold text-amber-300">Grand Banquets</div>
                  <div className="text-xs text-amber-100/90 uppercase tracking-widest font-semibold mt-0.5">Delivering Happiness to Grand Events</div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 2. OUR STORY: A LEGACY OF FLAVOR */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                Our Journey & Roots
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1029]">
                Our Story: A Legacy of Flavor
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                From our humble beginnings in Pattabiram, we have grown into one of the most trusted wedding caterers in Chennai. Our journey has been defined by a deep commitment to traditional recipes, the use of fresh, locally sourced ingredients, and a passion for customer satisfaction.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-3">
                Under the leadership of <strong>D. Venkat</strong>, our team has served thousands of happy clients, earning a reputation for reliability, hygiene, and the true essence of South Indian culinary traditions.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="pt-2 grid sm:grid-cols-2 gap-4">
                <div className="bg-amber-100/60 p-4 rounded-2xl border border-amber-300/60">
                  <div className="font-serif text-2xl font-bold text-[#3A1029]">20+ Years</div>
                  <div className="text-xs text-slate-600 font-semibold mt-0.5">Culinary Heritage</div>
                </div>
                <div className="bg-emerald-100/60 p-4 rounded-2xl border border-emerald-300/60">
                  <div className="font-serif text-2xl font-bold text-emerald-900">2000+ Events</div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">Successful Functions</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-lg">
                <h3 className="font-serif text-2xl font-bold text-[#3A1029] mb-6 border-b border-slate-100 pb-3">
                  Milestones & Journey
                </h3>
                <div className="relative pl-6 border-l-2 border-amber-400/40 space-y-6">
                  {TIMELINE.map((item) => (
                    <div key={item.y} className="relative">
                      <div className="absolute -left-[1.85rem] top-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-xs" />
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{item.y}</span>
                      <h4 className="font-serif text-base font-bold text-[#3A1029]">{item.t}</h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE US? (EXACT LIST PRESERVED WITHOUT CHANGES) */}
      <section className="py-20 bg-white border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1029]">
              Why Choose Us?
            </h2>
            <p className="text-slate-600 text-sm">
              We bring authenticity, purity, and exceptional hospitality to every event we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 0.1}>
                  <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-amber-900/10 hover:border-amber-400/70 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-[#3A1029] flex items-center justify-center font-bold mb-4 border border-amber-300">
                        <Icon className="w-6 h-6 text-amber-800" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#3A1029]">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. OUR EXPERTISE */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
              Comprehensive Catering Solutions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1029]">
              Our Expertise
            </h2>
            <p className="text-slate-600 text-sm">
              Tailored catering for every milestone, family gathering, and business event.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {EXPERTISE_AREAS.map((area, idx) => {
            const Icon = area.icon;
            return (
              <Reveal key={area.category} delay={idx * 0.08}>
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-md flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-emerald-700" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#3A1029]">
                        {area.category}
                      </h3>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {area.items.map((subItem) => (
                        <li key={subItem} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 uppercase tracking-wider"
                    >
                      <span>View Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 5. PROUDLY SERVING CHENNAI */}
      <section className="bg-gradient-to-r from-[#2A163F] via-[#3A1029] to-[#2B1028] text-white py-16 px-6 lg:px-12 border-y-2 border-amber-400/30">
        <div className="max-w-7xl mx-auto space-y-8 text-center">
          <Reveal>
            <div className="space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
                Widespread Service Reach
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Proudly Serving Chennai
              </h2>
              <p className="text-amber-100/90 text-sm leading-relaxed">
                While we are based in <strong>Pattabiram</strong>, our reach extends across the city. We are proud to provide South Indian catering services in <strong>Avadi, Ambattur, Poonamallee, Thiruverkadu, Mogappair, Porur, Anna Nagar</strong>, and surrounding areas.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {SERVING_LOCATIONS.map((loc) => (
                <span 
                  key={loc}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cream text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{loc}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. CALL TO ACTION & CONSULTATION FORM */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                Get in Touch
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1029]">
                Ready to plan your next event?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Let us help you make it unforgettable. Contact My Chennai Catering Services today to experience the best catering services in Chennai.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pt-2 space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-slate-500 uppercase font-semibold">Call or WhatsApp Direct</div>
                    <a href="tel:+919940396005" className="font-bold text-slate-900 hover:text-emerald-700 text-base">
                      +91 99403 96005
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xl">
                <h3 className="font-serif text-xl font-bold text-[#3A1029] mb-4 text-center">
                  Request Your Event Quotation
                </h3>
                <BookingForm />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

    </div>
  );
}