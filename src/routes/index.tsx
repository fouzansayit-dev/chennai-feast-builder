import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Award, Leaf, Sparkles, Star, Users } from "lucide-react";
import heroFeast from "@/assets/hero-feast.jpg";
import weddingHall from "@/assets/wedding-hall.jpg";
import spices from "@/assets/spices.jpg";
import liveCounter from "@/assets/live-counter.jpg";
import MenuBuilder from "@/components/MenuBuilder";
import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, leafDraw, staggerContainer } from "@/lib/animations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Catering Services in Chennai — MCC Wedding & Event Caterers" },
      { name: "description", content: "Authentic South Indian vegetarian wedding catering in Chennai. Pure Sattvik feasts, banana-leaf saapadu, live counters and luxury reception buffets — 20+ years legacy." },
      { property: "og:title", content: "MCC Catering — Best Wedding Caterers in Chennai" },
      { property: "og:description", content: "Pure Brahmin vegetarian wedding catering by D. Venkat. 2000+ events delivered across Pattabiram, Avadi, Ambattur and all Chennai." },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={ref} className="relative -mt-20 h-[100svh] min-h-[640px] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src={heroFeast}
            alt="Traditional South Indian banana leaf feast"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-plum-dark/85 via-plum-dark/55 to-plum-dark/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.18),transparent_55%)]" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-gold border border-gold/40 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
          >
            ★ Chennai's Brahmin Catering Legacy · Est. 2003
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-cream max-w-5xl leading-[1.05]"
          >
            Authentic <span className="text-gold-gradient italic">Sattvik</span> Cuisines
            <br className="hidden sm:block" /> for Sacred Celebrations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-7 text-cream/75 max-w-xl text-base sm:text-lg font-light"
          >
            Vedic slow-cooked, hand-pounded South Indian feasts served on banana leaf — by D. Venkat
            and the My Chennai Catering Services family.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-gold hover:bg-gold-light text-plum-dark text-sm font-semibold uppercase tracking-[0.2em] rounded-full shadow-glow-gold inline-flex items-center gap-2 group"
            >
              Book a Tasting
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#builder"
              className="px-8 py-4 border border-gold/50 text-cream text-sm font-medium uppercase tracking-[0.2em] rounded-full hover:bg-gold/10"
            >
              Build Your Menu
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 grid grid-cols-3 gap-6 sm:gap-14 px-6 py-5 bg-plum-dark/60 backdrop-blur-xl border border-gold/25 rounded-2xl"
        >
          {[
            { v: "20+", l: "Years Legacy" },
            { v: "2000+", l: "Events Delivered" },
            { v: "100%", l: "Pure Vegetarian" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-2xl sm:text-3xl text-gold-gradient">{s.v}</div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-cream/65 mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative py-28 bg-plum-dark text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_30%,rgba(212,175,55,0.25),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold/30">
              <img src={spices} alt="Hand-pounded fresh South Indian spices" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">D. Venkat's Philosophy</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.1]">
                The <span className="text-gold-gradient italic">Vedic</span> art of slow cooking.
              </h2>
            </Reveal>

            {/* Banana leaf draw SVG */}
            <motion.svg
              viewBox="0 0 240 80"
              className="w-44 my-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.path
                d="M10 40 Q60 5 120 40 T230 40"
                stroke="var(--gold)"
                strokeWidth="1.5"
                fill="none"
                variants={leafDraw}
              />
              <motion.path
                d="M120 40 L100 25 M120 40 L100 55 M120 40 L140 25 M120 40 L140 55"
                stroke="var(--gold)"
                strokeWidth="1"
                fill="none"
                variants={leafDraw}
              />
            </motion.svg>

            <Reveal delay={0.1}>
              <p className="text-cream/75 leading-relaxed text-lg">
                Every dish from MCC's kitchen begins before sunrise — fresh spices hand-pounded on
                stone, lentils tempered in cold-pressed sesame oil, vegetables sourced from local
                organic farms. Slow-cooked over open flame, the way our grandmothers cooked, the way
                the Vedas instructed.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  { i: Leaf, t: "100% Sattvik" },
                  { i: Award, t: "20+ Years" },
                  { i: Users, t: "Family-led" },
                ].map(({ i: Icon, t }) => (
                  <div key={t} className="text-center p-4 rounded-2xl border border-gold/20 bg-plum/30">
                    <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                    <div className="text-xs uppercase tracking-widest text-cream/80">{t}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MenuBuilder />

      {/* SERVICES */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold">What we cater</span>
              <h2 className="font-serif text-4xl md:text-5xl text-plum mt-3">Crafted for every celebration</h2>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { t: "Weddings", d: "Grand traditional banana-leaf feasts.", img: weddingHall },
              { t: "Reception Buffets", d: "Modern luxury vegetarian spreads.", img: liveCounter },
              { t: "Seemantham & Pooja", d: "Sattvik ceremonial menus.", img: heroFeast },
              { t: "Corporate Events", d: "Refined tiffins & buffet stations.", img: spices },
            ].map((s) => (
              <motion.div
                key={s.t}
                variants={fadeInUp}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-plum/10 hover:border-gold transition-all"
              >
                <img src={s.img} alt={s.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum-dark via-plum-dark/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <h3 className="font-serif text-xl text-gold mb-1">{s.t}</h3>
                  <p className="text-xs text-cream/75">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-plum text-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold">Voices from our table</span>
              <h2 className="font-serif text-4xl md:text-5xl mt-3">Loved across Chennai</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "Lakshmi · Avadi", q: "Every dish tasted like my paati's kitchen. Our wedding guests are still talking about the Arachuvitta Sambar." },
              { n: "Ravi & Priya · Poonamallee", q: "From the silk-saree hosts to the rose-petal newlywed table, MCC made our reception feel royal." },
              { n: "Mr. Subramanian · Ambattur", q: "Punctual, pure, and absolutely delicious. We have booked them for three family functions already." },
            ].map((t) => (
              <Reveal key={t.n}>
                <div className="bg-plum-dark/60 backdrop-blur rounded-3xl p-7 border border-gold/20 h-full">
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                    ))}
                  </div>
                  <p className="text-cream/85 leading-relaxed italic font-serif text-lg">"{t.q}"</p>
                  <div className="mt-5 pt-5 border-t border-gold/15 text-xs uppercase tracking-[0.2em] text-gold">{t.n}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / BOOKING */}
      <section id="book" className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold">Begin Your Inquiry</span>
            <h2 className="font-serif text-4xl md:text-5xl text-plum mt-3 leading-tight">
              Let D. Venkat curate <em className="text-gold-gradient not-italic">your sacred feast.</em>
            </h2>
            <p className="mt-5 text-foreground/70 leading-relaxed">
              Share a few details and our team will respond with a tailored proposal — menu cards,
              decor mockups and an exact quote — within one business hour.
            </p>
            <div className="mt-8 flex flex-col gap-2 text-sm text-foreground/70">
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" /> Free consultation & sample tasting</div>
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" /> Custom menus across all budgets</div>
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" /> Decor, hosts & live counters included</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <BookingForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
