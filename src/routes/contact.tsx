import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Best Catering Services in Chennai | My Chennai Catering" },
      { name: "description", content: "Need reliable catering in Chennai for your next event? Contact My Chennai Catering today for bookings, custom menus, and inquiries. Let’s make your event memorable!" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Contact Best Catering Services in Chennai | My Chennai Catering" },
      { property: "og:description", content: "Need reliable catering in Chennai for your next event? Contact My Chennai Catering today for bookings, custom menus, and inquiries." },
      { property: "og:url", content: "https://mychennaicateringservices.com/contact/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact My Chennai Catering Services" },
      { name: "twitter:description", content: "Contact My Chennai Catering today for bookings, custom menus, and inquiries." },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/contact/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact My Chennai Catering",
          "url": "https://mychennaicateringservices.com/contact/",
          "mainEntity": {
            "@type": "CateringService",
            "name": "My Chennai Catering Services",
            "telephone": "+919940396005",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pattabiram",
              "addressRegion": "Chennai, Tamil Nadu",
              "postalCode": "600072",
              "addressCountry": "IN"
            }
          }
        })
      }
    ]
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Get in touch</span>
          <h1 className="font-serif text-5xl md:text-6xl text-plum mt-4 leading-[1.05]">
            Contact <em className="text-gold-gradient not-italic">My Chennai Catering</em>
          </h1>
          <p className="mt-5 text-foreground/70 max-w-md">
            Speak directly with D. Venkat or his team — we typically respond within an hour during
            working hours.
          </p>

          <div className="mt-10 space-y-4">
            <ContactCard
              icon={Phone}
              label="Call us"
              value="+91 99403 96005"
              href="tel:+919940396005"
            />
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value="Quick chat with our team"
              href="https://wa.me/919940396005"
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value="mychennaicateringservices@gmail.com"
              href="mailto:mychennaicateringservices@gmail.com"
            />
            <ContactCard
              icon={MapPin}
              label="Visit our office"
              value="No 49, South Bazar, Thandurai, Pattabiram, Chennai 600072"
            />
          </div>

          <div className="mt-8 rounded-3xl overflow-hidden border border-plum/10 aspect-[16/9]">
            <iframe
              title="MCC Catering — Pattabiram"
              src="https://www.google.com/maps?q=Pattabiram,+Chennai&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const Tag: React.ElementType = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-plum/10 hover:border-gold transition-all group"
    >
      <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-plum-dark transition-all shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-plum/60">{label}</div>
        <div className="text-plum font-medium mt-1">{value}</div>
      </div>
    </Tag>
  );
}