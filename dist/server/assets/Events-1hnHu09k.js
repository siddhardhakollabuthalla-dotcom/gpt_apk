import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { X, Edit2, Trash2, AlertCircle, Phone, Mail, Plus } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { u as useAuth } from "./router-mcIGoU2Y.js";
import { e as eventsService } from "./eventService-CB4XJYTC.js";
import { e as events } from "./events-BBMWHT_A.js";
import "@tanstack/react-query";
import "firebase/firestore";
import "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const EventCard = ({ event, onDelete, onEdit }) => {
  const { isAuthenticated: isAdmin } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const handleDelete = async () => {
    if (!isAdmin) {
      setDeleteError("Only admins can delete events.");
      return;
    }
    if (!event.id) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      const success = await eventsService.deleteEvent(String(event.id));
      if (success) {
        onDelete?.(event.id);
        setShowDeleteConfirm(false);
      } else {
        setDeleteError("Failed to delete event");
      }
    } catch (error) {
      setDeleteError("Error deleting event");
    } finally {
      setIsDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      whileHover: {
        y: -10,
        scale: 1.02
      },
      transition: { duration: 0.3 },
      className: "bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl",
      children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: event.image,
            alt: event.title,
            className: "h-56 w-full object-cover hover:scale-110 transition duration-500"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600", children: event.category }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: event.date }),
              isAdmin && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => onEdit?.(event),
                    className: "p-1.5 hover:bg-blue-100 rounded-lg transition",
                    title: "Edit event",
                    children: /* @__PURE__ */ jsx(Edit2, { className: "h-4 w-4 text-blue-600" })
                  }
                ),
                /* @__PURE__ */ jsxs(Dialog, { open: showDeleteConfirm, onOpenChange: setShowDeleteConfirm, children: [
                  /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      className: "p-1.5 hover:bg-red-100 rounded-lg transition",
                      title: "Delete event",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-red-600" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxs(DialogContent, { children: [
                    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Delete Event" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                        /* @__PURE__ */ jsx(AlertCircle, { className: "h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" }),
                        /* @__PURE__ */ jsxs("p", { children: [
                          'Are you sure you want to delete "',
                          event.title,
                          '"? This cannot be undone.'
                        ] })
                      ] }),
                      deleteError && /* @__PURE__ */ jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded", children: deleteError }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-end", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => setShowDeleteConfirm(false),
                            className: "px-4 py-2 border rounded-lg hover:bg-gray-100",
                            disabled: isDeleting,
                            children: "Cancel"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: handleDelete,
                            disabled: isDeleting,
                            className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400",
                            children: isDeleting ? "Deleting..." : "Delete"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: event.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: event.venue }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mb-4", children: [
            "Organized by ",
            event.organizer
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 line-clamp-3", children: event.description }),
          /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { className: "mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition", children: "View Details" }) }),
            /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl rounded-3xl overflow-hidden", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: event.image,
                  alt: event.title,
                  className: "w-full h-80 object-cover rounded-2xl"
                }
              ),
              /* @__PURE__ */ jsx(DialogHeader, { className: "mt-5", children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-3xl font-bold", children: event.title }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Date" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: event.date })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Venue" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: event.venue })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Organizer" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: event.organizer })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "About Event" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-7", children: event.description })
                ] })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
};
const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Faculty", href: "#faculty" },
  { label: "Events", href: "/Events" },
  { label: "Login", href: "/Login" },
  { label: "Careers", href: "#careers" },
  { label: "Notices", href: "#notices" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];
const categories = ["All", "Technical", "Cultural", "Sports"];
const galleryImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1511578314322-379afb476865",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
  "https://images.unsplash.com/photo-1515169067868-5387ec356754",
  "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622"
];
function Events() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [eventsList, setEventsList] = useState(events);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadEvents();
  }, []);
  const loadEvents = async () => {
    setLoading(true);
    try {
      const firestoreEvents = await eventsService.getAllEvents();
      if (firestoreEvents.length > 0) {
        setEventsList(
          firestoreEvents.map((event) => ({
            ...event,
            id: event.id || Math.random()
          }))
        );
      }
    } catch (error) {
      console.error("Failed to load events:", error);
      setEventsList(events);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteEvent = (eventId) => {
    setEventsList(
      (prev) => prev.filter((event) => event.id !== eventId)
    );
  };
  const handleEditEvent = (event) => {
    navigate({
      to: "/EditEvent",
      search: { eventId: event.id }
    });
  };
  const handleAddEvent = () => {
    navigate({ to: "/AddEvent" });
  };
  const filteredEvents = eventsList.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-navy text-navy-foreground text-xs", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "opacity-90", children: "Government of Andhra Pradesh · State Board of Technical Education & Training" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 opacity-90", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3" }),
          " +91 90102 22173"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "hidden sm:inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3" }),
          " polytechnic.government173@gmail.com"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("a", { href: "#home", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-navy text-gold grid place-items-center font-display font-bold", children: "GP" }),
        /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display font-semibold text-foreground", children: "Government Polytechnic, Anakapalli" }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground", children: "Knowledge is Power · Estd. 2008" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-7 text-sm", children: nav.map((n, i) => /* @__PURE__ */ jsx(
        "a",
        {
          href: n.href,
          className: `relative text-foreground/80 hover:text-foreground transition-colors ${i === 0 ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-6 after:bg-gold" : ""}`,
          children: n.label
        },
        n.label
      )) }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#contact",
          className: "hidden sm:inline-flex items-center gap-2 rounded-lg bg-navy text-navy-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition",
          children: "Contact Us"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-black dark:to-zinc-900", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative h-[400px] flex items-center justify-center overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
            className: "absolute inset-0 w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60" }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            className: "relative z-10 text-center px-4",
            children: [
              /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-bold text-white", children: "College Events" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-200 mt-6 text-lg max-w-2xl mx-auto", children: "Explore workshops, fests, sports events and cultural celebrations." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("section", { className: "max-w-7xl mx-auto px-6 py-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-5 justify-between items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search events...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full md:w-[350px] px-5 py-3 rounded-2xl border outline-none dark:bg-zinc-900"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 flex-wrap items-center", children: [
          categories.map((category) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedCategory(category),
              className: `px-5 py-2 rounded-xl transition ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-white dark:bg-zinc-800"}`,
              children: category
            },
            category
          )),
          isAuthenticated && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleAddEvent,
              className: "ml-3 flex items-center gap-2 px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition font-medium",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
                "Add Event"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "max-w-7xl mx-auto px-6 pb-20", children: loading ? /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Loading events..." }) }) : /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 xl:grid-cols-3 gap-10", children: filteredEvents.length > 0 ? filteredEvents.map((event) => /* @__PURE__ */ jsx(
        EventCard,
        {
          event,
          onDelete: handleDeleteEvent,
          onEdit: handleEditEvent
        },
        event.id
      )) : /* @__PURE__ */ jsxs("div", { className: "col-span-full text-center py-20", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "No Events Found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-3", children: "Try another search or category." })
      ] }) }) }),
      /* @__PURE__ */ jsxs("section", { className: "max-w-7xl mx-auto px-6 pb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-10 flex-wrap gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold", children: "Event Gallery" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: "Memories from our college events and celebrations." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5", children: galleryImages.map((image, index) => /* @__PURE__ */ jsx(
          motion.div,
          {
            whileHover: {
              scale: 1.03
            },
            className: "overflow-hidden rounded-3xl shadow-xl",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: image,
                alt: `Gallery ${index}`,
                className: "w-full h-64 object-cover hover:scale-110 transition duration-500"
              }
            )
          },
          index
        )) })
      ] })
    ] })
  ] });
}
createFileRoute("/")({
  component: Events,
  head: () => ({
    meta: [
      { title: "Government Polytechnic, Anakapalli — SBTET Diploma in CME & ECE" },
      {
        name: "description",
        content: "Government Polytechnic, Anakapalli — SBTET-recognized diploma programs in Computer Engineering and Electronics & Communication on a 9.74-acre campus."
      }
    ]
  })
});
const SplitComponent = Events;
export {
  SplitComponent as component
};
