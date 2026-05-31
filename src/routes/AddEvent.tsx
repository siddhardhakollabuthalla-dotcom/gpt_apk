import { createFileRoute } from "@tanstack/react-router";
import AddEvent from "@/pages/AddEvent";

export const Route = createFileRoute("/AddEvent")({
  component: AddEvent,
  head: () => ({
    meta: [
      { title: "Add Event — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Create a new event announcement",
      },
    ],
  }),
});
