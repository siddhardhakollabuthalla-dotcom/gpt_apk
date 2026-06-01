import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useSearch, Navigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { u as useAuth } from "./router-Bxzv1aIu.js";
import { a as eventsService } from "./eventService-DflSo1Ry.js";
import { a as uploadSingleImage, u as uploadMultipleImages } from "./imageKitService-BavDuXUS.js";
import { P as PublicHeader } from "./PublicHeader-BJH-8ORm.js";
import "@tanstack/react-query";
import "firebase/firestore";
import "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/storage";
import "imagekit-javascript";
import "./server-D65QmHBM.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const EditEvent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const search = useSearch({ from: "/EditEvent" });
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    coverImage: "",
    galleryImages: [],
    category: "Technical",
    description: ""
  });
  useEffect(() => {
    const loadEvent = async () => {
      if (!search.eventId) return;
      const event = await eventsService.getEventById(String(search.eventId));
      if (event) {
        setFormData({
          title: event.title,
          date: event.date,
          location: event.location,
          coverImage: event.coverImage,
          galleryImages: event.galleryImages ?? [],
          category: event.category,
          description: event.description
        });
      }
    };
    loadEvent();
  }, [search.eventId]);
  if (authLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100 text-gray-600", children: "Loading..." });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/Login", replace: true });
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
      if (!formData.title || !formData.date || !formData.location || !formData.coverImage && !coverImageFile || !formData.description) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      if (search.eventId) {
        const coverImage = coverImageFile ? await uploadSingleImage(coverImageFile, setUploadProgress) : formData.coverImage;
        const galleryImages = galleryFiles.length ? await uploadMultipleImages(galleryFiles, setUploadProgress) : formData.galleryImages;
        const success = await eventsService.updateEvent(String(search.eventId), {
          title: formData.title,
          date: formData.date,
          location: formData.location,
          coverImage,
          galleryImages,
          category: formData.category,
          description: formData.description
        });
        if (success) {
          navigate({ to: "/" });
        } else {
          setError("Failed to update event. Please try again.");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating event");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col", children: [
    /* @__PURE__ */ jsx(PublicHeader, { active: "Events" }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 py-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
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
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "Edit Event" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Update event information" })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6", children: error }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg shadow-lg p-8 space-y-6", children: [
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
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Location *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "location",
              value: formData.location,
              onChange: handleChange,
              placeholder: "e.g., Seminar Hall",
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
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Cover Image *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              onChange: (event) => setCoverImageFile(event.target.files?.[0] ?? null),
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          (coverImageFile || formData.coverImage) && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: coverImageFile ? URL.createObjectURL(coverImageFile) : formData.coverImage,
              alt: "Preview",
              className: "h-32 w-full object-cover rounded-lg"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Replace Gallery Images" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              multiple: true,
              onChange: (event) => setGalleryFiles(Array.from(event.target.files ?? [])),
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        loading && uploadProgress > 0 && /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
          "Uploading images: ",
          uploadProgress,
          "%"
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
              children: loading ? "Updating Event..." : "Update Event"
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
      ] })
    ] }) })
  ] });
};
const SplitComponent = EditEvent;
export {
  SplitComponent as component
};
