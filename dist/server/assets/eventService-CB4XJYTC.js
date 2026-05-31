import { getFirestore, deleteDoc, doc, updateDoc, addDoc, collection, query, orderBy, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDE3hXvIEiI5DKv3kLGyy9p8AswdzgyyWM",
  authDomain: "gpt-akp.firebaseapp.com",
  databaseURL: "https://gpt-akp-default-rtdb.firebaseio.com",
  projectId: "gpt-akp",
  storageBucket: "gpt-akp.firebasestorage.app",
  messagingSenderId: "168701365746",
  appId: "1:168701365746:web:67f76312b99dfe09992f6b",
  measurementId: "G-HXDT4NQ325"
};
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  getAnalytics(app);
}
getAuth(app);
const db = getFirestore(app);
getStorage(app);
const EVENTS_COLLECTION = "events";
const eventsService = {
  // Get all events from Firestore
  async getAllEvents() {
    try {
      const q = query(collection(db, EVENTS_COLLECTION), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        (doc2) => ({
          id: doc2.id,
          ...doc2.data()
        })
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  },
  // Add new event
  async addEvent(event) {
    try {
      const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
        ...event,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding event:", error);
      return null;
    }
  },
  // Update event
  async updateEvent(eventId, updates) {
    try {
      const eventRef = doc(db, EVENTS_COLLECTION, eventId);
      await updateDoc(eventRef, {
        ...updates,
        updatedAt: /* @__PURE__ */ new Date()
      });
      return true;
    } catch (error) {
      console.error("Error updating event:", error);
      return false;
    }
  },
  // Delete event
  async deleteEvent(eventId) {
    try {
      await deleteDoc(doc(db, EVENTS_COLLECTION, eventId));
      return true;
    } catch (error) {
      console.error("Error deleting event:", error);
      return false;
    }
  }
};
export {
  eventsService as e
};
