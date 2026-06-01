import { getFirestore, doc, deleteDoc, updateDoc, serverTimestamp, addDoc, getDoc, query, orderBy, getDocs, collection } from "firebase/firestore";
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDE3hXvIEiI5DKv3kLGyy9p8AswdzgyyWM",
  authDomain: "gpt-akp.firebaseapp.com",
  projectId: "gpt-akp",
  storageBucket: "gpt-akp.firebasestorage.app",
  messagingSenderId: "168701365746",
  appId: "1:168701365746:web:67f76312b99dfe09992f6b"
};
const isFirebaseConfigured = !!firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== "";
let app = null;
let analytics = void 0;
let auth = null;
let db = null;
let storage = null;
if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    analytics = typeof window !== "undefined" ? getAnalytics(app) : void 0;
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase API key is missing. Firebase services will not be initialized.");
}
const events = [
  {
    id: 1,
    title: "Tech Fest 2026",
    date: "20 May 2026",
    venue: "Seminar Hall",
    organizer: "CSE Department",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    category: "Technical",
    description: "Annual technical festival featuring coding competitions, robotics, and innovation showcases."
  },
  {
    id: 2,
    title: "Cultural Day",
    date: "12 April 2026",
    venue: "College Auditorium",
    organizer: "Student Council",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    category: "Cultural",
    description: "Music, dance, drama, and celebration of college cultural activities."
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "5 March 2026",
    venue: "College Ground",
    organizer: "Sports Committee",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    category: "Sports",
    description: "Inter-department sports competitions including cricket, volleyball, and athletics."
  },
  {
    id: 4,
    title: "Sports Meet",
    date: "5 March 2026",
    venue: "College Ground",
    organizer: "Sports Committee",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    category: "Sports",
    description: "Inter-department sports competitions including cricket, volleyball, and athletics."
  },
  {
    id: 5,
    title: "Sports Meet",
    date: "5 March 2026",
    venue: "College Ground",
    organizer: "Sports Committee",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    category: "Sports",
    description: "Inter-department sports competitions including cricket, volleyball, and athletics."
  }
];
const EVENTS_COLLECTION = "events";
const getEventsCollection = () => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please configure Firebase API key in .env.");
  }
  return collection(db, EVENTS_COLLECTION);
};
const normalizeEvent = (event) => ({
  ...event,
  venue: event.location,
  image: event.coverImage,
  organizer: "College"
});
const toEventInput = (data) => {
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
    galleryImages: []
  };
};
const toEventUpdate = (data) => {
  if ("coverImage" in data || "location" in data || "galleryImages" in data) {
    return data;
  }
  const legacyData = data;
  return {
    title: legacyData.title,
    description: legacyData.description,
    category: legacyData.category,
    location: legacyData.venue,
    date: legacyData.date,
    coverImage: legacyData.image
  };
};
const LOCAL_STORAGE_KEY = "gp_local_events";
const getLocalEvents = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    const items = events.map((event) => ({
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
      createdAt: { toMillis: () => Date.now() },
      updatedAt: { toMillis: () => Date.now() }
    }));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    return items;
  }
  return JSON.parse(stored);
};
const saveLocalEvents = (events2) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events2));
};
const createEvent = async (data) => {
  const docRef = await addDoc(getEventsCollection(), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};
const getAllEvents = async () => {
  const q = query(getEventsCollection(), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (snapshotDoc) => normalizeEvent({
      id: snapshotDoc.id,
      ...snapshotDoc.data()
    })
  );
};
const getEventById = async (id) => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please configure Firebase API key in .env.");
  }
  const docRef = doc(db, EVENTS_COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return normalizeEvent({
    id: snap.id,
    ...snap.data()
  });
};
const updateEvent = async (id, data) => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please configure Firebase API key in .env.");
  }
  const docRef = doc(db, EVENTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};
const deleteEvent = async (id) => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please configure Firebase API key in .env.");
  }
  const docRef = doc(db, EVENTS_COLLECTION, id);
  await deleteDoc(docRef);
};
const eventsService = {
  async getAllEvents() {
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
  async getEventById(eventId) {
    if (!db) {
      console.warn("Using localStorage fallback for fetching event by ID.");
      const list = getLocalEvents();
      return list.find((e) => e.id === eventId) || null;
    }
    try {
      return await getEventById(eventId);
    } catch (error) {
      console.error("Error fetching event:", error);
      const list = getLocalEvents();
      return list.find((e) => e.id === eventId) || null;
    }
  },
  async addEvent(event) {
    const input = toEventInput(event);
    if (!db) {
      console.warn("Using localStorage fallback for adding event.");
      const list = getLocalEvents();
      const newId = `local-${Date.now()}`;
      const newEvent = {
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
        createdAt: { toMillis: () => Date.now() },
        updatedAt: { toMillis: () => Date.now() }
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
  async updateEvent(eventId, updates) {
    const updateInput = toEventUpdate(updates);
    if (!db) {
      console.warn("Using localStorage fallback for updating event.");
      const list = getLocalEvents();
      const idx = list.findIndex((e) => e.id === eventId);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...updateInput,
          venue: updateInput.location !== void 0 ? updateInput.location : list[idx].venue,
          image: updateInput.coverImage !== void 0 ? updateInput.coverImage : list[idx].image,
          updatedAt: { toMillis: () => Date.now() }
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
  async deleteEvent(eventId) {
    if (!db) {
      console.warn("Using localStorage fallback for deleting event.");
      const list = getLocalEvents();
      const filtered = list.filter((e) => e.id !== eventId);
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
  }
};
export {
  eventsService as a,
  events as e
};
