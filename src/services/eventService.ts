import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { EventType } from "@/data/events";

const EVENTS_COLLECTION = "events";

export const eventsService = {
  // Get all events from Firestore
  async getAllEvents(): Promise<(EventType & { id: string })[]> {
    try {
      const q = query(collection(db, EVENTS_COLLECTION), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as EventType & { id: string },
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  },

  // Add new event
  async addEvent(event: Omit<EventType, "id">): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
        ...event,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding event:", error);
      return null;
    }
  },

  // Update event
  async updateEvent(eventId: string, updates: Partial<EventType>): Promise<boolean> {
    try {
      const eventRef = doc(db, EVENTS_COLLECTION, eventId);
      await updateDoc(eventRef, {
        ...updates,
        updatedAt: new Date(),
      });
      return true;
    } catch (error) {
      console.error("Error updating event:", error);
      return false;
    }
  },

  // Delete event
  async deleteEvent(eventId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, EVENTS_COLLECTION, eventId));
      return true;
    } catch (error) {
      console.error("Error deleting event:", error);
      return false;
    }
  },
};
