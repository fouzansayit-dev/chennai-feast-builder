import { createFileRoute } from "@tanstack/react-router";
import ServiceSubPage from "@/components/ServiceSubPage";
import weddingHall from "@/assets/IMG_4558.webp";

export const Route = createFileRoute("/wedding-catering-services-in-chennai")({
  head: () => ({
    meta: [
      { title: "Exquisite Wedding Catering Services in Chennai | My Chennai Catering" },
      { name: "description", content: "Specializing in traditional South Indian wedding catering & authentic Thala Vazhai Ilai Saapadu in Chennai. 20+ years legacy under D. Venkat's leadership." },
      { name: "keywords", content: "Wedding Catering Services in Chennai, Kalyana Saapadu, Banana Leaf Wedding Feast, South Indian Veg Catering, D Venkat Caterer" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
      { property: "og:title", content: "Exquisite Wedding Catering Services in Chennai" },
      { property: "og:description", content: "Traditional Thala Vazhai Ilai Saapadu & grand wedding buffets in Chennai by My Chennai Catering Services." },
      { property: "og:url", content: "https://mychennaicateringservices.com/wedding-catering-services-in-chennai/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/wedding-catering-services-in-chennai/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Wedding Catering Services",
          "name": "Exquisite Wedding Catering Services in Chennai",
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
          "description": "Traditional South Indian wedding catering offering authentic Thala Vazhai Ilai Saapadu (banana-leaf meals), pre-wedding & post-wedding receptions."
        })
      }
    ]
  }),
  component: WeddingCateringPage,
});

function WeddingCateringPage() {
  return (
    <ServiceSubPage
      badge="Weddings"
      title="Exquisite Wedding Catering Services"
      subtitle="in Chennai"
      description="Your wedding is a once-in-a-lifetime celebration, and we are here to make it truly unforgettable. We specialize in traditional South Indian wedding catering, offering authentic Thala Vazhai Ilai Saapadu (traditional banana-leaf meals) that your guests will cherish."
      heroImage={weddingHall}
      heroImageAlt="Traditional South Indian wedding buffet setup with banana leaf saapadu in Chennai"
      serviceType="Wedding Catering"
      canonicalUrl="https://mychennaicateringservices.com/wedding-catering-services-in-chennai/"
      features={[
        {
          title: "Customized Wedding Packages",
          description: "We offer tailored packages that cover pre-wedding rituals, the main wedding ceremony, and post-wedding receptions."
        },
        {
          title: "The MCC Signature Experience",
          description: "From the initial planning stages to the final serve, our team ensures every detail—from the richness of our Arachuvitta Sambar to the sweetness of our Elaneer Payasam—reflects the grandeur of your big day."
        },
        {
          title: "Logistics & Management",
          description: "We provide end-to-end event management, allowing you to enjoy your wedding rituals while we handle the seamless execution of the dining experience."
        },
        {
          title: "Quality Commitment",
          description: "We prioritize fresh, high-quality ingredients to ensure that every dish served meets the highest standards of taste and tradition."
        }
      ]}
    />
  );
}
