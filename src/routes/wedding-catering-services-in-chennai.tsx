import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "./services";

export const Route = createFileRoute("/wedding-catering-services-in-chennai")({
  head: () => ({
    meta: [
      { title: "Wedding Catering Services in Chennai | No.1 Traditional Veg" },
      { name: "description", content: "Premium wedding catering services in Chennai. 20+ Yrs legacy of authentic banana leaf kalyana saapadu, live counters & custom stalls. Call: 9940396005." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/wedding-catering-services-in-chennai/" },
    ],
  }),
  component: ServicesPage,
});
