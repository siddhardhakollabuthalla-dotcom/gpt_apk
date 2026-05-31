import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { u as useAuth } from "./router-mcIGoU2Y.js";
import { e as eventsService } from "./eventService-CB4XJYTC.js";
import "@tanstack/react-query";
import "firebase/firestore";
import "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";
const AddEvent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    organizer: "",
    image: "",
    category: "Technical",
    description: ""
  });
  if (authLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100 text-gray-600", children: "Loading..." });
  }
  if (!isAuthenticated) {
    navigate({ to: "/Login" });
    return null;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!formData.title || !formData.date || !formData.venue || !formData.organizer || !formData.image || !formData.description) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      const eventData = {
        title: formData.title,
        date: formData.date,
        venue: formData.venue,
        organizer: formData.organizer,
        image: formData.image,
        category: formData.category,
        description: formData.description
      };
      const eventId = await eventsService.addEvent(eventData);
      if (eventId) {
        navigate({ to: "/" });
      } else {
        setError("Failed to create event. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Error creating event");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 py-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigate({ to: "/" }),
          className: "flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Events"
          ]
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "Add New Event" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Create a new college event announcement" })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6", children: error }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-white rounded-lg shadow-lg p-8 space-y-6",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Event Title *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "title",
                value: formData.title,
                onChange: handleChange,
                placeholder: "e.g., Tech Fest 2026",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Event Date *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "date",
                value: formData.date,
                onChange: handleChange,
                placeholder: "e.g., 20 May 2026",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Venue *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "venue",
                value: formData.venue,
                onChange: handleChange,
                placeholder: "e.g., Seminar Hall",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Organizer *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "organizer",
                value: formData.organizer,
                onChange: handleChange,
                placeholder: "e.g., CSE Department",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Category *" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                name: "category",
                value: formData.category,
                onChange: handleChange,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Technical", children: "Technical" }),
                  /* @__PURE__ */ jsx("option", { value: "Cultural", children: "Cultural" }),
                  /* @__PURE__ */ jsx("option", { value: "Sports", children: "Sports" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Image URL *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                name: "image",
                value: formData.image,
                onChange: handleChange,
                placeholder: "https://images.unsplash.com/...",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            ),
            formData.image && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: formData.image,
                alt: "Preview",
                className: "h-32 w-full object-cover rounded-lg",
                onError: () => setError("Failed to load image. Please check the URL.")
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Description *" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                name: "description",
                value: formData.description,
                onChange: handleChange,
                placeholder: "Describe the event in detail...",
                rows: 5,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: loading,
                className: "flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold transition",
                children: loading ? "Creating Event..." : "Create Event"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/" }),
                className: "flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-semibold transition",
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    )
  ] }) });
};
createFileRoute("/AddEvent")({
  component: AddEvent,
  head: () => ({
    meta: [
      { title: "Add Event — Government Polytechnic, Anakapalli" },
      {
        name: "description",
        content: "Add a new college event announcement"
      }
    ]
  })
});
const SplitComponent = AddEvent;
export {
  SplitComponent as component
};
