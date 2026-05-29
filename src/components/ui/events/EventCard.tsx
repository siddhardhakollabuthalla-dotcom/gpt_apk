import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EventCardProps {
  event: {
    title: string;
    date: string;
    venue: string;
    organizer: string;
    image: string;
    category: string;
    description: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
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

          <span className="text-sm text-gray-500">
            {event.date}
          </span>

        </div>

        <h2 className="text-2xl font-bold">
          {event.title}
        </h2>

        <p className="text-gray-500 mt-2">
          {event.venue}
        </p>

        <p className="text-gray-500 mb-4">
          Organized by {event.organizer}
        </p>

        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {event.description}
        </p>

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

              <DialogTitle className="text-3xl font-bold">
                {event.title}
              </DialogTitle>

            </DialogHeader>

            <div className="space-y-4">

              <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">
                  <h3 className="font-semibold">
                    Date
                  </h3>

                  <p className="text-gray-500">
                    {event.date}
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">
                  <h3 className="font-semibold">
                    Venue
                  </h3>

                  <p className="text-gray-500">
                    {event.venue}
                  </p>
                </div>

              </div>

              <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">

                <h3 className="font-semibold mb-2">
                  Organizer
                </h3>

                <p className="text-gray-500">
                  {event.organizer}
                </p>

              </div>

              <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-2xl">

                <h3 className="font-semibold mb-2">
                  About Event
                </h3>

                <p className="text-gray-500 leading-7">
                  {event.description}
                </p>

              </div>

            </div>

          </DialogContent>

        </Dialog>

      </div>
    </motion.div>
  );
};

export default EventCard;