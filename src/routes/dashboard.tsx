import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Dashboard } from "@/auth/Dashboard";
import { useAuth } from "@/auth/AuthContext";

function DashboardRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return <Dashboard />;
}

export const Route = createFileRoute("/dashboard")({
  component: DashboardRoute,
  head: () => ({
    meta: [
      { title: "Auth Dashboard - Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Persistent session dashboard for Government Polytechnic, Anakapalli admins.",
      },
    ],
  }),
});
