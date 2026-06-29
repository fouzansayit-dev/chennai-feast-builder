import { createFileRoute } from "@tanstack/react-router";
import founder from "@/assets/founder.jpg";
import spices from "@/assets/spices.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Legacy — D. Venkat & 20 Years of Sattvik Catering | MCC" },
      { name: "description", content: "Two decades of Vedic slow-cooked Brahmin catering across Chennai, guided by the vision of D. Venkat. Discover the story of My Chennai Catering Services." },
      { property: "og:title", content: "The Legacy of MCC Catering — D. Venkat" },
      { property: "og:description", content: "From a small Pattabiram kitchen to thousands of sacred celebrations across Chennai." },
    ],
  }),
  component: About,
});

const TIMELINE = [
  { y: "2003", t: "Beginnings in Pattabiram", d: "Founded by D. Venkat to serve authentic, hand-pounded vegetarian meals to neighbouring families." },
  { y: "2008", t: "Western Chennai Expansion", d: "Trusted caterer across Avadi, Ambattur, Thiruverkadu and Poonamallee for weddings and pooja functions." },
  { y: "2014", t: "Live Counters Introduced", d: "Dosa, chaat and Rajasthani puppet-themed dessert counters bring theatre to traditional saapadu." },
  { y: "2019", t: "Luxury Reception Buffets", d: "Chandelier dining halls, silk-saree hosts and heart-shaped rose decors for modern couples." },
  { y: "Today", t: "A Chennai Institution", d: "2000+ events delivered, generations of families served — without ever compromising Sattvik standards." },
];

function About() {
  return (
    <>
      <section className="relative py-24 bg-plum-dark text-cream overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.18),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Our Legacy</span>
            <h1 className="font-serif text-5xl md:text-6xl mt-4 leading-[1.05]">
              A family of <span className="text-gold-gradient italic">flavour-keepers.</span>
            </h1>
            <p className="mt-6 text-cream/75 text-lg leading-relaxed">
              For more than two decades, D. Venkat and the My Chennai Catering Services family have
              kept the rhythm of Vedic slow-cooking alive — one banana leaf at a time.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-gold/30 shadow-glow-gold">
              <img src={founder} alt="D. Venkat — Founder of MCC Catering" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-plum text-center mb-16">Our Journey</h2>
          </Reveal>
          <div className="relative pl-8 border-l-2 border-gold/30">
            {TIMELINE.map((t) => (
              <Reveal key={t.y}>
                <div className="mb-12 relative">
                  <div className="absolute -left-[2.45rem] top-1.5 w-4 h-4 rounded-full bg-gold border-4 border-cream shadow-glow-gold" />
                  <div className="text-[11px] uppercase tracking-[0.3em] text-gold-dark mb-1">{t.y}</div>
                  <h3 className="font-serif text-2xl text-plum mb-2">{t.t}</h3>
                  <p className="text-foreground/70 leading-relaxed">{t.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-plum text-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-6">
          {[
            { t: "Our Mission", d: "To preserve and serve authentic, Sattvik South Indian cuisine — handed down through generations — for every Chennai family's most sacred moments." },
            { t: "Our Vision", d: "To remain the most trusted name in Brahmin-vegetarian catering, balancing tradition with modern luxury, without ever bending on purity." },
          ].map((c) => (
            <Reveal key={c.t}>
              <div className="p-9 rounded-3xl border border-gold/30 bg-plum-dark/50 backdrop-blur h-full">
                <h3 className="font-serif text-3xl text-gold mb-4">{c.t}</h3>
                <p className="text-cream/80 leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-28 bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={spices} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <Reveal>
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <p className="font-serif text-2xl md:text-4xl text-plum italic leading-relaxed">
              "Purity, punctuality, and exquisite taste — served on every banana leaf."
            </p>
            <div className="mt-6 text-[11px] uppercase tracking-[0.35em] text-gold-dark">— D. Venkat, Founder</div>
          </div>
        </Reveal>
      </section>
    </>
  );
}