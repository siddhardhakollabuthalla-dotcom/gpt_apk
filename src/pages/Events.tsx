import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import EventCard, { EventCardEvent } from "@/components/ui/events/EventCard";
import { events as defaultEvents } from "@/data/events";
import { useAuth } from "@/auth/AuthContext";
import { eventsService } from "@/services/eventService";
import PublicHeader from "@/components/ui/PublicHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { uploadMultipleImagesRobust } from "@/services/imageKitService";

const categories = ["All", "Technical", "Cultural", "Sports"];
const staticGalleryImages = [
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
  const [eventsList, setEventsList] = useState<EventCardEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [allGalleryImages, setAllGalleryImages] = useState<string[]>(staticGalleryImages);

  // Upload dialog states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  // Load events from Firestore on mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const firestoreEvents = await eventsService.getAllEvents();
      
      const mappedEvents: EventCardEvent[] = firestoreEvents.map((event) => ({
        id: event.id,
        title: event.title,
        date: event.date,
        venue: event.location || event.venue,
        organizer: event.organizer || "College",
        image: event.coverImage || event.image,
        category: event.category,
        description: event.description,
        galleryImages: event.galleryImages || [],
      }));

      const finalEvents = mappedEvents.length > 0 ? mappedEvents : defaultEvents.map(e => ({
        ...e,
        galleryImages: []
      }));
      
      setEventsList(finalEvents);

      // Collect gallery images
      const eventPhotos: string[] = [];
      firestoreEvents.forEach((ev) => {
        if (ev.galleryImages && Array.isArray(ev.galleryImages)) {
          eventPhotos.push(...ev.galleryImages);
        }
      });
      
      // Merge with static default images
      setAllGalleryImages([...eventPhotos, ...staticGalleryImages]);
    } catch (error) {
      console.error("Failed to load events:", error);
      setEventsList(defaultEvents.map(e => ({ ...e, galleryImages: [] })));
      setAllGalleryImages(staticGalleryImages);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string | number) => {
    setEventsList((prev) => prev.filter((event) => event.id !== eventId));
    await loadEvents();
  };

  const handleEditEvent = (event: EventCardEvent) => {
    navigate({
      to: "/EditEvent",
      search: { eventId: event.id },
    });
  };

  const handleAddEvent = () => {
    navigate({ to: "/AddEvent" });
  };

  const handleUploadGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) {
      setUploadError("Please select an event.");
      return;
    }
    if (uploadFiles.length === 0) {
      setUploadError("Please choose one or more files to upload.");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadProgress(10);

    try {
      const urls = await uploadMultipleImagesRobust(uploadFiles, (progress) => {
        setUploadProgress(progress);
      });

      const event = await eventsService.getEventById(selectedEventId);
      if (!event) {
        throw new Error("Selected event not found");
      }

      const existingGallery = event.galleryImages || [];
      const updatedGallery = [...existingGallery, ...urls];

      const success = await eventsService.updateEvent(selectedEventId, {
        galleryImages: updatedGallery,
      });

      if (success) {
        setIsUploadOpen(false);
        setSelectedEventId("");
        setUploadFiles([]);
        setUploadProgress(0);
        await loadEvents();
      } else {
        setUploadError("Failed to update event gallery.");
      }
    } catch (err) {
      console.error(err);
      setUploadError(err instanceof Error ? err.message : "Error uploading gallery photos");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredEvents = eventsList.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader active="Events" />

      <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-black dark:to-zinc-900">
        {/* HERO */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero background"
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
                  className="ml-3 flex items-center gap-2 px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition font-medium cursor-pointer"
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
            {isAuthenticated && (
              <button
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition font-medium shadow-md cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Event Photos
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {allGalleryImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.03,
                }}
                className="overflow-hidden rounded-3xl shadow-xl aspect-[4/3] cursor-pointer"
                onClick={() => window.open(image, "_blank")}
              >
                <img
                  src={image}
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Upload Gallery Images Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6 bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add Photos to Event</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUploadGallery} className="mt-4 space-y-4">
            {uploadError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2.5 rounded-xl text-sm">
                {uploadError}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Select Event *
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-foreground"
                required
              >
                <option value="">-- Choose an Event --</option>
                {eventsList
                  .filter((event) => event.id !== undefined)
                  .map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} ({event.date})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Choose Photos *
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setUploadFiles(Array.from(e.target.files || []))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-foreground"
                required
              />
            </div>

            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Uploading photos...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsUploadOpen(false);
                  setUploadFiles([]);
                  setUploadError("");
                }}
                disabled={isUploading}
                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-semibold transition"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Events;
