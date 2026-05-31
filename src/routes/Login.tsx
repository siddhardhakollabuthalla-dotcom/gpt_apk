import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/auth/LoginPage";

export const Route = createFileRoute("/Login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login - Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Login to the admin portal for Government Polytechnic, Anakapalli.",
      },
    ],
  }),
});
