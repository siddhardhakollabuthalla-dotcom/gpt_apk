import { createFileRoute } from "@tanstack/react-router";
import Events from "@/pages/Events";

export const Route = createFileRoute("/Events")({
  component: Events,
  head: () => ({
    meta: [
      { title: "Events — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content:
          "Browse upcoming college events, workshops, celebrations, and notices for Government Polytechnic, Anakapalli.",
      },
    ],
  }),
});
