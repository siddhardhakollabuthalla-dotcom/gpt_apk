import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { EventType } from "@/data/events";
import { eventsService } from "@/services/eventService";

export default function AdminDashboard() {
  const [events, setEvents] = useState<(EventType & { id: string })[]>([]);

  const loadEvents = useCallback(async () => {
    const data = await eventsService.getAllEvents();
    setEvents(data);
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this event?")) {
      await eventsService.deleteEvent(id);
      loadEvents();
    }
  };

  return (
    // ... rest of your JSX
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <Link to="/Admin">Dashboard</Link>
          <br />
          <Link to="/AddEvent">Add Event</Link>
          <br />
          <Link to="/Events">View Events</Link>
          <br />
          <Link to="/dashboard">Session Dashboard</Link>
          <br />
          <Link to="/Login">Login</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3>Total Events</h3>
            <p className="text-4xl font-bold">{events.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3>Upcoming</h3>
            <p className="text-4xl font-bold">{events.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3>Gallery Images</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Events</h2>

            <Link to="/AddEvent" className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Event
            </Link>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="p-3">{event.title}</td>

                  <td className="p-3">{event.date}</td>

                  <td className="p-3">
                    <Link
                      to="/EditEvent"
                      search={{ eventId: event.id }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
