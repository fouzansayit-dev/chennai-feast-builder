import { createFileRoute } from "@tanstack/react-router";
import MenuBuilder from "@/components/MenuBuilder";
import { Reveal } from "@/components/Reveal";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import heroFeast from "@/assets/2_20260624_020643_0001.png";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Custom Feast Builder & Quote Calculator — MCC Catering" },
      { name: "description", content: "Customize your own traditional South Indian banana leaf feast menu. Toggle items, select guest count, and get live instant quote proposals." },
      { property: "og:title", content: "Customize Your Own Feast — MCC Catering" },
    ],
  }),
  component: BuilderPage,
});

function BuilderPage() {
  return (
    <>
      {/* Page Hero Banner */}
      <section className="relative py-20 md:py-24 bg-plum-dark text-cream overflow-hidden">
        {/* Top Marigold Garland */}
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        {/* Traditional Kolam watermark */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none">
          <CenterKolam size={300} />
        </div>

        <div className="absolute inset-0">
          <img src={heroFeast} alt="Feast Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-plum-dark/90 via-plum-dark/80 to-plum-dark" />
        </div>

        <div className="relative text-center max-w-3xl mx-auto px-6 z-10 pt-4">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
              Interactive Customizer
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mt-3 text-white">
              Customize Your Own <span className="text-gold-gradient italic">Feast</span>
            </h1>
            <p className="mt-4 text-cream/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Select your favorite dishes, customize portion packages, and calculate live quotes for your event.
            </p>
          </Reveal>
        </div>
      </section>

      {/* DEDICATED FEAST BUILDER CUSTOMIZER COMPONENT */}
      <MenuBuilder />
    </>
  );
}
