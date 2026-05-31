import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, Phone, Mail } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import EventCard, { EventCardEvent } from "@/components/ui/events/EventCard";
import { events as defaultEvents } from "@/data/events";
import { useAuth } from "@/auth/AuthContext";
import { eventsService } from "@/services/eventService";

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
  { label: "Contact", href: "#contact" },
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
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
];

function Events() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [eventsList, setEventsList] = useState(defaultEvents);
  const [loading, setLoading] = useState(false);

  // Load events from Firestore on mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const firestoreEvents = await eventsService.getAllEvents();
      if (firestoreEvents.length > 0) {
        // Map Firestore events to include id as a property
        setEventsList(
          firestoreEvents.map((event) => ({
            ...event,
            id: event.id || Math.random(),
          })),
        );
      }
    } catch (error) {
      console.error("Failed to load events:", error);
      // Fall back to default events
      setEventsList(defaultEvents);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = (eventId: string | number) => {
    setEventsList((prev) => prev.filter((event) => event.id !== eventId));
  };

  const handleEditEvent = (event: EventCardEvent) => {
    // Pass event to edit page or modal
    navigate({
      to: "/EditEvent",
      search: { eventId: event.id },
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

  return (
    <div className="min-h-screen bg-background">
      {/* Top strip */}
      <div className="bg-navy text-navy-foreground text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <span className="opacity-90">
            Government of Andhra Pradesh · State Board of Technical Education &amp; Training
          </span>
          <div className="flex items-center gap-5 opacity-90">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> +91 90102 22173
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> polytechnic.government173@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-navy text-gold grid place-items-center font-display font-bold">
              GP
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-foreground">
                Government Polytechnic, Anakapalli
              </div>
              <div className="text-[11px] text-muted-foreground">
                Knowledge is Power · Estd. 2008
              </div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {nav.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                className={`relative text-foreground/80 hover:text-foreground transition-colors ${
                  i === 0
                    ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-6 after:bg-gold"
                    : ""
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-navy text-navy-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
          >
            Contact Us
          </a>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-black dark:to-zinc-900">
        {/* HERO */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white">College Events</h1>

            <p className="text-gray-200 mt-6 text-lg max-w-2xl mx-auto">
              Explore workshops, fests, sports events and cultural celebrations.
            </p>
          </motion.div>
        </section>

        {/* FILTERS & ADD BUTTON */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-[350px] px-5 py-3 rounded-2xl border outline-none dark:bg-zinc-900"
            />

            <div className="flex gap-3 flex-wrap items-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-xl transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-zinc-800"
                  }`}
                >
                  {category}
                </button>
              ))}

              {isAuthenticated && (
                <button
                  onClick={handleAddEvent}
                  className="ml-3 flex items-center gap-2 px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Add Event
                </button>
              )}
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Loading events...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onDelete={handleDeleteEvent}
                    onEdit={handleEditEvent}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <h2 className="text-3xl font-bold">No Events Found</h2>
                  <p className="text-gray-500 mt-3">Try another search or category.</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* EVENT GALLERY */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-bold">Event Gallery</h2>
              <p className="text-gray-500 mt-2">
                Memories from our college events and celebrations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.03,
                }}
                className="overflow-hidden rounded-3xl shadow-xl"
              >
                <img
                  src={image}
                  alt={`Gallery ${index}`}
                  className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Events,
  head: () => ({
    meta: [
      { title: "Government Polytechnic, Anakapalli — SBTET Diploma in CME & ECE" },
      {
        name: "description",
        content:
          "Government Polytechnic, Anakapalli — SBTET-recognized diploma programs in Computer Engineering and Electronics & Communication on a 9.74-acre campus.",
      },
    ],
  }),
});

export default Events;
