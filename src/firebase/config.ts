import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

const isFirebaseConfigured = !!firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== "";

let app: any = null;
let analytics: any = undefined;
let auth: any = null;
let db: any = null;
let storage: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    analytics = typeof window !== "undefined" ? getAnalytics(app) : undefined;
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase API key is missing. Firebase services will not be initialized.");
}

export { app, analytics, auth, db, storage };
export default app;

