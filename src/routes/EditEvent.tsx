import { createFileRoute } from "@tanstack/react-router";
import EditEvent from "@/pages/EditEvent";

export const Route = createFileRoute("/EditEvent")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      eventId: search.eventId as string | number | undefined,
    };
  },
  component: EditEvent,
  head: () => ({
    meta: [
      { title: "Edit Event — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Edit event announcement",
      },
    ],
  }),
});
