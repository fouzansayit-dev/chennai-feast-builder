import { createFileRoute } from "@tanstack/react-router";
import CateringCRM from "@/components/crm/CateringCRM";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — My Chennai Catering" },
      { name: "description", content: "Admin Operations Portal for My Chennai Catering" },
    ],
  }),
  component: () => <CateringCRM />,
});
