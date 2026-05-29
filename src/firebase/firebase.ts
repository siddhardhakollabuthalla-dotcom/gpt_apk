// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);