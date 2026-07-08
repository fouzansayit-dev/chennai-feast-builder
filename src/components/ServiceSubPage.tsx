import React from "react";
import { Link } from "@tanstack/react-router";
import { 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  ShieldCheck, 
  Award, 
  Leaf, 
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  Calendar,
  Utensils
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";

export interface ServiceDetailFeature {
  title: string;
  description: string;
}

export interface ServiceSubPageProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  features: ServiceDetailFeature[];
  serviceType: string;
  canonicalUrl: string;
}

export default function ServiceSubPage({
  badge,
  title,
  subtitle,
  description,
  heroImage,
  heroImageAlt,
  features,
  serviceType,
}: ServiceSubPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-slate-800 font-sans">
      
      {/* 1. HERO BANNER */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-[#2A163F] via-[#3A1029] to-[#2B1028] text-white overflow-hidden border-b-2 border-amber-400/30">
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />
        
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.04] text-gold pointer-events-none">
          <CenterKolam size={360} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-amber-200/80 mb-6 font-medium">
            <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services" className="hover:text-amber-300 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{badge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {title} <br className="hidden sm:inline" />
                <span className="text-amber-300 italic font-normal">{subtitle}</span>
              </h1>

              <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {description}
              </p>

              {/* Trust Badges linking back to About Us for SEO */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-amber-100/90">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>20+ Years Legacy</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Custom Veg & Non-Veg Menus</span>
                </div>
                <Link 
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white underline underline-offset-4 transition-colors font-bold"
                  title="Learn about D. Venkat's 20+ years legacy"
                >
                  <span>Learn About D. Venkat's Leadership & Legacy →</span>
                </Link>
              </div>
            </div>

            {/* Hero Image with SEO Alt Text */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/40 group">
                <img 
                  src={heroImage} 
                  alt={heroImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-700/90 text-[11px] font-bold tracking-wider uppercase inline-flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-amber-300" /> My Chennai Catering Signature
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES & VALUE PROPOSITION */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
            Why Choose MCC Catering
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#3A1029] mt-2">
            Excellence in Every Meal & Seamless Hospitality
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Back by 20+ years of catering expertise under <Link to="/about" className="text-emerald-800 font-bold underline hover:text-emerald-950">D. Venkat's leadership</Link>, we deliver unparalleled taste and perfection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-4 border border-amber-300/60">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#3A1029]">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. INTERNAL LINKING & REINFORCING BRAND NARRATIVE */}
      <section className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 py-12 px-4 sm:px-8 border-y border-amber-900/10">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A1029]">
            Over Two Decades of Premium Culinary Legacy
          </h3>
          <p className="text-slate-700 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
            Founded and spearheaded by <strong>D. Venkat</strong>, My Chennai Catering Services brings over <strong>20+ years of authentic culinary experience</strong> across Chennai. From traditional banana-leaf Kalyana Virundhu feasts to grand corporate spreads, we uphold uncompromising standards of purity and taste.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3A1029] text-amber-300 hover:bg-[#2A163F] text-xs font-bold uppercase tracking-wider shadow-md transition-all"
            >
              <span>Read Our Full 20+ Year Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION & CONSULTATION FORM */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" /> Direct Assistance
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#3A1029]">
              Request a Free Consultation & Quote
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Planning your upcoming {serviceType.toLowerCase()}? Contact our dedicated event managers today to create a custom menu tailored to your preferences and guest count.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Call or WhatsApp D. Venkat & Team</div>
                  <a href="tel:+919940396005" className="font-bold text-slate-900 hover:text-emerald-700 text-sm sm:text-base">
                    +91 99403 96005
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Custom Menu Customizer</div>
                  <Link to="/builder" className="font-bold text-emerald-800 hover:underline text-sm">
                    Build Your Custom Menu Interactive Tool →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-[#3A1029] mb-4 text-center">
              Book {serviceType} Consultation
            </h3>
            <BookingForm />
          </div>
        </div>
      </section>

    </div>
  );
}
