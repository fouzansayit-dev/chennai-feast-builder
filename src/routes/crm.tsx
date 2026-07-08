import { createFileRoute } from "@tanstack/react-router";
import CateringCRM from "@/components/crm/CateringCRM";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "Catering CRM — My Chennai Catering" },
      { name: "description", content: "Catering Management & Invoicing System" },
    ],
  }),
  component: () => <CateringCRM />,
});
