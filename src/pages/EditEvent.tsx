import { useState, useEffect } from "react";
import { useNavigate, useSearch, Navigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "@/auth/AuthContext";
import { eventsService } from "@/services/eventService";
import { uploadMultipleImagesRobust, uploadSingleImageRobust } from "@/services/imageKitService";
import PublicHeader from "@/components/ui/PublicHeader";

const EditEvent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const search = useSearch({ from: "/EditEvent" }) as { eventId?: string | number };

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    coverImage: "",
    galleryImages: [] as string[],
    category: "Technical",
    description: "",
  });

  // Load event data on mount
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
          description: event.description,
        });
      }
    };

    loadEvent();
  }, [search.eventId]);

  // Redirect if not logged in
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.date ||
        !formData.location ||
        (!formData.coverImage && !coverImageFile) ||
        !formData.description
      ) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (search.eventId) {
        const coverImage = coverImageFile
          ? await uploadSingleImageRobust(coverImageFile, setUploadProgress)
          : formData.coverImage;
        const galleryImages = galleryFiles.length
          ? await uploadMultipleImagesRobust(galleryFiles, setUploadProgress)
          : formData.galleryImages;

        const success = await eventsService.updateEvent(String(search.eventId), {
          title: formData.title,
          date: formData.date,
          location: formData.location,
          coverImage,
          galleryImages,
          category: formData.category,
          description: formData.description,
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader active="Events" />
      <div className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </button>
          <h1 className="text-4xl font-bold">Edit Event</h1>
          <p className="text-gray-600 mt-2">Update event information</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Tech Fest 2026"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date *</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g., 20 May 2026"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Seminar Hall"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setCoverImageFile(event.target.files?.[0] ?? null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {(coverImageFile || formData.coverImage) && (
              <div className="mt-2">
                <img
                  src={coverImageFile ? URL.createObjectURL(coverImageFile) : formData.coverImage}
                  alt="Preview"
                  className="h-32 w-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Replace Gallery Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => setGalleryFiles(Array.from(event.target.files ?? []))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading && uploadProgress > 0 && (
            <div className="text-sm text-gray-600">Uploading images: {uploadProgress}%</div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event in detail..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold transition"
            >
              {loading ? "Updating Event..." : "Update Event"}
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
     </div>
    </div>
  );
};

export default EditEvent;
