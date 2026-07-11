import { createFileRoute } from "@tanstack/react-router";
import MenuCustomizer from "@/components/MenuCustomizer";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "Customize Your Own Menu — MCC Catering" },
      { name: "description", content: "Interactive Saapadu Customizer & Menu Customizer for My Chennai Catering. Select dishes across Breakfast, Lunch, Dinner, filter pure veg items, and request custom proposals." },
    ],
  }),
  component: () => <MenuCustomizer />,
});
