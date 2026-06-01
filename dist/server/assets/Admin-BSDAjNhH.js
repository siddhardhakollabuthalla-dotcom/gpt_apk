import { jsxs, jsx } from "react/jsx-runtime";
import { Link, Navigate } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { a as eventsService } from "./eventService-DflSo1Ry.js";
import { P as PublicHeader } from "./PublicHeader-BJH-8ORm.js";
import { u as useAuth } from "./router-Bxzv1aIu.js";
import "firebase/firestore";
import "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/storage";
import "lucide-react";
import "@tanstack/react-query";
function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const loadEvents = useCallback(async () => {
    const data = await eventsService.getAllEvents();
    setEvents(data);
  }, []);
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);
  const handleDelete = async (id) => {
    if (window.confirm("Delete this event?")) {
      await eventsService.deleteEvent(id);
      loadEvents();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 flex flex-col", children: [
    /* @__PURE__ */ jsx(PublicHeader, { active: "" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1", children: [
      /* @__PURE__ */ jsxs("aside", { className: "w-64 bg-slate-900 text-white p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-8", children: "Admin Panel" }),
        /* @__PURE__ */ jsxs("nav", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(Link, { to: "/Admin", children: "Dashboard" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(Link, { to: "/AddEvent", children: "Add Event" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(Link, { to: "/Events", children: "View Events" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "Session Dashboard" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(Link, { to: "/Login", children: "Login" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 p-8 bg-gray-100", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-8", children: "Dashboard" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-5 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow", children: [
            /* @__PURE__ */ jsx("h3", { children: "Total Events" }),
            /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold", children: events.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow", children: [
            /* @__PURE__ */ jsx("h3", { children: "Upcoming" }),
            /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold", children: events.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow", children: [
            /* @__PURE__ */ jsx("h3", { children: "Gallery Images" }),
            /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold", children: "0" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Events" }),
            /* @__PURE__ */ jsx(Link, { to: "/AddEvent", className: "bg-blue-600 text-white px-4 py-2 rounded", children: "Add Event" })
          ] }),
          /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b", children: [
              /* @__PURE__ */ jsx("th", { className: "text-left p-3", children: "Title" }),
              /* @__PURE__ */ jsx("th", { className: "text-left p-3", children: "Date" }),
              /* @__PURE__ */ jsx("th", { className: "text-left p-3", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: events.map((event) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: event.title }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: event.date }),
              /* @__PURE__ */ jsxs("td", { className: "p-3", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/EditEvent",
                    search: { eventId: event.id },
                    className: "bg-yellow-500 text-white px-3 py-1 rounded mr-2",
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(event.id),
                    className: "bg-red-500 text-white px-3 py-1 rounded",
                    children: "Delete"
                  }
                )
              ] })
            ] }, event.id)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function AdminRoute() {
  const {
    isAuthenticated,
    loading
  } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100 text-gray-600", children: "Loading..." });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/Login", replace: true });
  }
  return /* @__PURE__ */ jsx(AdminDashboard, {});
}
export {
  AdminRoute as component
};
