import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { Event } from "@/types/event";
import { events as defaultEvents } from "@/data/events";

const EVENTS_COLLECTION = "events";
const getEventsCollection = () => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please configure Firebase API key in .env.");
  }
  return collection(db, EVENTS_COLLECTION);
};

export type EventInput = Omit<Event, "id" | "createdAt" | "updatedAt">;
export type EventUpdate = Partial<EventInput>;
export type LegacyEventInput = {
  title: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  organizer?: string;
  image: string;
};

export type EventListItem = Event & {
  venue: string;
  image: string;
  organizer: string;
};

const normalizeEvent = (event: Event): EventListItem => ({
  ...event,
  venue: event.location,
  image: event.coverImage,
  organizer: "College",
});

const toEventInput = (data: EventInput | LegacyEventInput): EventInput => {
  if ("coverImage" in data) {
    return data;
  }

  return {
    title: data.title,
    description: data.description,
    category: data.category,
    location: data.venue,
    date: data.date,
    coverImage: data.image,
    galleryImages: [],
  };
};

const toEventUpdate = (data: EventUpdate | Partial<LegacyEventInput>): EventUpdate => {
  if ("coverImage" in data || "location" in data || "galleryImages" in data) {
    return data as EventUpdate;
  }

  const legacyData = data as Partial<LegacyEventInput>;

  return {
    title: legacyData.title,
    description: legacyData.description,
    category: legacyData.category,
    location: legacyData.venue,
    date: legacyData.date,
    coverImage: legacyData.image,
  };
};

const LOCAL_STORAGE_KEY = "gp_local_events";

const getLocalEvents = (): EventListItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    const items = defaultEvents.map(event => ({
      id: String(event.id),
      title: event.title,
      description: event.description,
      category: event.category,
      location: event.venue,
      date: event.date,
      coverImage: event.image,
      galleryImages: [],
      venue: event.venue,
      image: event.image,
      organizer: event.organizer,
      createdAt: { toMillis: () => Date.now() } as any,
      updatedAt: { toMillis: () => Date.now() } as any,
    }));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    return items;
  }
  return JSON.parse(stored);
};

const saveLocalEvents = (events: EventListItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
};

export const createEvent = async (data: EventInput): Promise<string> => {
  const docRef = await addDoc(getEventsCollection(), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const getAllEvents = async (): Promise<EventListItem[]> => {
  const q = query(getEventsCollection(), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((snapshotDoc) =>
    normalizeEvent({
      id: snapshotDoc.id,
      ...snapshotDoc.data(),
    } as Event),
  );
};

export const getEventById = async (id: string): Promise<EventListItem | null> => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please configure Firebase API key in .env.");
  }
  const docRef = doc(db, EVENTS_COLLECTION, id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return null;

  return normalizeEvent({
    id: snap.id,
    ...snap.data(),
  } as Event);
};

export const updateEvent = async (id: string, data: EventUpdate): Promise<void> => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please configure Firebase API key in .env.");
  }
  const docRef = doc(db, EVENTS_COLLECTION, id);

  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteEvent = async (id: string): Promise<void> => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please configure Firebase API key in .env.");
  }
  const docRef = doc(db, EVENTS_COLLECTION, id);

  await deleteDoc(docRef);
};

export const eventsService = {
  async getAllEvents(): Promise<EventListItem[]> {
    if (!db) {
      console.warn("Using localStorage fallback for fetching events.");
      return getLocalEvents();
    }
    try {
      return await getAllEvents();
    } catch (error) {
      console.error("Error fetching events:", error);
      return getLocalEvents();
    }
  },

  async getEventById(eventId: string): Promise<EventListItem | null> {
    if (!db) {
      console.warn("Using localStorage fallback for fetching event by ID.");
      const list = getLocalEvents();
      return list.find(e => e.id === eventId) || null;
    }
    try {
      return await getEventById(eventId);
    } catch (error) {
      console.error("Error fetching event:", error);
      const list = getLocalEvents();
      return list.find(e => e.id === eventId) || null;
    }
  },

  async addEvent(event: EventInput | LegacyEventInput): Promise<string | null> {
    const input = toEventInput(event);
    if (!db) {
      console.warn("Using localStorage fallback for adding event.");
      const list = getLocalEvents();
      const newId = `local-${Date.now()}`;
      const newEvent: EventListItem = {
        id: newId,
        title: input.title,
        description: input.description,
        category: input.category,
        location: input.location,
        date: input.date,
        coverImage: input.coverImage,
        galleryImages: input.galleryImages || [],
        venue: input.location,
        image: input.coverImage,
        organizer: "College",
        createdAt: { toMillis: () => Date.now() } as any,
        updatedAt: { toMillis: () => Date.now() } as any,
      };
      list.unshift(newEvent);
      saveLocalEvents(list);
      return newId;
    }
    try {
      return await createEvent(input);
    } catch (error) {
      console.error("Error adding event:", error);
      return null;
    }
  },

  async updateEvent(
    eventId: string,
    updates: EventUpdate | Partial<LegacyEventInput>,
  ): Promise<boolean> {
    const updateInput = toEventUpdate(updates);
    if (!db) {
      console.warn("Using localStorage fallback for updating event.");
      const list = getLocalEvents();
      const idx = list.findIndex(e => e.id === eventId);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...updateInput,
          venue: updateInput.location !== undefined ? updateInput.location : list[idx].venue,
          image: updateInput.coverImage !== undefined ? updateInput.coverImage : list[idx].image,
          updatedAt: { toMillis: () => Date.now() } as any,
        };
        saveLocalEvents(list);
        return true;
      }
      return false;
    }
    try {
      await updateEvent(eventId, updateInput);
      return true;
    } catch (error) {
      console.error("Error updating event:", error);
      return false;
    }
  },

  async deleteEvent(eventId: string): Promise<boolean> {
    if (!db) {
      console.warn("Using localStorage fallback for deleting event.");
      const list = getLocalEvents();
      const filtered = list.filter(e => e.id !== eventId);
      saveLocalEvents(filtered);
      return true;
    }
    try {
      await deleteEvent(eventId);
      return true;
    } catch (error) {
      console.error("Error deleting event:", error);
      return false;
    }
  },
};
