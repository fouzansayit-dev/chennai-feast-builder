import { createFileRoute } from "@tanstack/react-router";
import ServiceSubPage from "@/components/ServiceSubPage";
import liveCounter from "@/assets/images-32.jpeg";

export const Route = createFileRoute("/engagement-catering-services-in-chennai")({
  head: () => ({
    meta: [
      { title: "Bespoke Engagement Catering Services in Chennai | My Chennai Catering" },
      { name: "description", content: "Personalized engagement catering services in Chennai. Curated menus, scalable solutions from intimate gatherings to grand celebrations, & elegant presentation." },
      { name: "keywords", content: "Engagement Catering in Chennai, Engagement Function Food, Betrothal Catering Chennai, Veg Engagement Feast" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Bespoke Engagement Catering Services in Chennai" },
      { property: "og:description", content: "Curated engagement menu design, scalable solutions, & professional presentation by My Chennai Catering." },
      { property: "og:url", content: "https://mychennaicateringservices.com/engagement-catering-services-in-chennai/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/engagement-catering-services-in-chennai/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Engagement Catering Services",
          "name": "Bespoke Engagement Catering Services in Chennai",
          "provider": {
            "@type": "CateringService",
            "name": "My Chennai Catering Services",
            "telephone": "+919940396005",
            "founder": "D. Venkat",
            "url": "https://mychennaicateringservices.com"
          },
          "areaServed": {
            "@type": "City",
            "name": "Chennai"
          },
          "description": "Personalized engagement catering in Chennai offering curated menus, scalable gathering solutions, and professional presentation."
        })
      }
    ]
  }),
  component: EngagementCateringPage,
});

function EngagementCateringPage() {
  return (
    <ServiceSubPage
      badge="Engagements"
      title="Bespoke Engagement Catering"
      subtitle="in Chennai"
      description="Celebrate your commitment with our personalized engagement catering services. We understand that an engagement function requires a perfect balance of style, comfort, and authentic flavor."
      heroImage={liveCounter}
      heroImageAlt="Bespoke engagement catering event setup in Chennai"
      serviceType="Engagement Catering"
      canonicalUrl="https://mychennaicateringservices.com/engagement-catering-services-in-chennai/"
      features={[
        {
          title: "Curated Menu Design",
          description: "We work closely with you to curate a menu that matches the unique vibe of your celebration, ensuring that every dish is as memorable as the occasion itself."
        },
        {
          title: "Scalable Solutions",
          description: "Whether you are planning an intimate gathering for close family or a large-scale engagement celebration, we provide dedicated, high-quality service for all event sizes."
        },
        {
          title: "Professional Presentation",
          description: "Our service team emphasizes an elegant presentation, ensuring that your engagement function is not only delicious but visually stunning."
        }
      ]}
    />
  );
}
