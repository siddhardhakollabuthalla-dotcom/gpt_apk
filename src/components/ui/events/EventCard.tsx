import { motion } from "framer-motion";
import { Edit2, Trash2, AlertCircle } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/auth/AuthContext";
import { eventsService } from "@/services/eventService";

export interface EventCardEvent {
  id?: string | number;
  title: string;
  date: string;
  venue: string;
  organizer: string;
  image: string;
  category: string;
  description: string;
  galleryImages?: string[];
}

interface EventCardProps {
  event: EventCardEvent;
  onDelete?: (id: string | number) => void;
  onEdit?: (event: EventCardEvent) => void;
}

const EventCard = ({ event, onDelete, onEdit }: EventCardProps) => {
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
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl"
    >
      <div className="overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-56 w-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600">
            {event.category}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{event.date}</span>

            {isAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit?.(event)}
                  className="p-1.5 hover:bg-blue-100 rounded-lg transition"
                  title="Edit event"
                >
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </button>

                <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                  <DialogTrigger asChild>
                    <button
                      className="p-1.5 hover:bg-red-100 rounded-lg transition"
                      title="Delete event"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Event</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p>
                          Are you sure you want to delete "{event.title}"? This cannot be undone.
                        </p>
                      </div>

                      {deleteError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                          {deleteError}
                        </div>
                      )}

                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                          disabled={isDeleting}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold">{event.title}</h2>

        <p className="text-gray-500 mt-2">{event.venue}</p>

        <p className="text-gray-500 mb-4">Organized by {event.organizer}</p>

        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{event.description}</p>

        <Dialog>
          <DialogTrigger asChild>
            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition">
              View Details
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-3xl rounded-3xl overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-80 object-cover rounded-2xl"
            />

            <DialogHeader className="mt-5">
              <DialogTitle className="text-3xl font-bold">{event.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">
                  <h3 className="font-semibold">Date</h3>

                  <p className="text-gray-500">{event.date}</p>
                </div>

                <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">
                  <h3 className="font-semibold">Venue</h3>

                  <p className="text-gray-500">{event.venue}</p>
                </div>
              </div>

              <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">
                <h3 className="font-semibold mb-2">Organizer</h3>

                <p className="text-gray-500">{event.organizer}</p>
              </div>

              <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">
                <h3 className="font-semibold mb-2">About Event</h3>

                <p className="text-gray-500 leading-7">{event.description}</p>
              </div>

              {event.galleryImages && event.galleryImages.length > 0 && (
                <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">
                  <h3 className="font-semibold mb-3">Event Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {event.galleryImages.map((img, i) => (
                      <div key={i} className="overflow-hidden rounded-xl aspect-[4/3] shadow-md border dark:border-zinc-700">
                        <img 
                          src={img} 
                          alt={`Gallery ${i}`} 
                          className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer" 
                          onClick={() => window.open(img, "_blank")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default EventCard;
