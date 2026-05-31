import { createFileRoute } from "@tanstack/react-router";
import EditEvent from "@/pages/EditEvent";

export const Route = createFileRoute("/EditEvent")({
  component: EditEvent,
  validateSearch: (search: Record<string, unknown>) => ({
    eventId: search.eventId,
  }),
  head: () => ({
    meta: [
      { title: "Edit Event — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Edit college event announcement",
      },
    ],
  }),
});
