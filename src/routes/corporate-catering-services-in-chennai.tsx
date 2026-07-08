import { createFileRoute } from "@tanstack/react-router";
import ServiceSubPage from "@/components/ServiceSubPage";
import spices from "@/assets/images-31.jpeg";

export const Route = createFileRoute("/corporate-catering-services-in-chennai")({
  head: () => ({
    meta: [
      { title: "Professional Corporate Catering Services in Chennai | My Chennai Catering" },
      { name: "description", content: "Elevate your business meetings, conferences, & office celebrations with premium corporate catering in Chennai. Punctual delivery, working lunches, & custom menus." },
      { name: "keywords", content: "Corporate Catering Services in Chennai, Office Event Catering, Corporate Lunch Buffet Chennai, Executive Breakfast Spread" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Professional Corporate Catering Services in Chennai" },
      { property: "og:description", content: "Reliable scheduling, tailored business menus, & stress-free corporate dining by My Chennai Catering." },
      { property: "og:url", content: "https://mychennaicateringservices.com/corporate-catering-services-in-chennai/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/corporate-catering-services-in-chennai/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Corporate Catering Services",
          "name": "Professional Corporate Catering Services in Chennai",
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
          "description": "Professional corporate catering services in Chennai offering reliable scheduling, tailored business menus, working lunches, and stress-free dining operations."
        })
      }
    ]
  }),
  component: CorporateCateringPage,
});

function CorporateCateringPage() {
  return (
    <ServiceSubPage
      badge="Corporate Events"
      title="Professional Corporate Catering Services"
      subtitle="in Chennai"
      description="Elevate your business meetings, conferences, and office celebrations with our premium corporate catering services. We recognize that professionalism, punctuality, and efficiency are key to successful business events."
      heroImage={spices}
      heroImageAlt="Professional corporate event catering in Chennai"
      serviceType="Corporate Catering"
      canonicalUrl="https://mychennaicateringservices.com/corporate-catering-services-in-chennai/"
      features={[
        {
          title: "Reliable Scheduling",
          description: "We guarantee timely food delivery and setup, ensuring that your corporate itinerary remains on track."
        },
        {
          title: "Tailored Business Menus",
          description: "We offer a variety of menu options ranging from light breakfast spreads and working lunches to formal corporate dinner setups."
        },
        {
          title: "Stress-Free Operations",
          description: "Our experienced team manages the entire dining setup, allowing you and your team to focus entirely on your business objectives while we handle the hospitality."
        }
      ]}
    />
  );
}
