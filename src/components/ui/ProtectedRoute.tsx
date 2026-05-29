import type { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const isLoggedIn =
    localStorage.getItem("isPrincipalLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/Login" />;
}