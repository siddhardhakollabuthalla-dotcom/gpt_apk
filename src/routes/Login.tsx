import { createFileRoute } from "@tanstack/react-router";
import Login from "@/pages/Login";

export const Route = createFileRoute("/Login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Admin Login — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Login to the admin portal for Government Polytechnic, Anakapalli.",
      },
    ],
  }),
});
