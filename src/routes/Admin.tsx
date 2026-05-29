import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/pages/AdminDashboard";

export const Route = createFileRoute("/Admin")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Admin dashboard for managing Government Polytechnic, Anakapalli events and data.",
      },
    ],
  }),
});
