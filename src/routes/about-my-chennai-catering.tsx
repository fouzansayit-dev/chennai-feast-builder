import { createFileRoute } from "@tanstack/react-router";
import { About } from "./about";

export const Route = createFileRoute("/about-my-chennai-catering")({
  head: () => ({
    meta: [
      { title: "About My Chennai Catering | Wedding & Veg Catering Services in Chennai" },
      { name: "description", content: "My Chennai Catering is Chennai’s trusted South Indian catering service with 20+ years of experience in wedding catering, veg catering, receptions, corporate events, birthday parties, seemantham & traditional Tamil functions. We provide authentic taste, hygienic cooking, customized menus & premium catering services across Chennai." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
    ],
    links: [
      { rel: "canonical", href: "https://mychennaicateringservices.com/about-my-chennai-catering/" },
    ],
  }),
  component: About,
});
