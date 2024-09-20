import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "meetup-77a0f.firebaseapp.com",
  projectId: "meetup-77a0f",
  databaseURL: "https://meetup-77a0f-default-rtdb.firebaseio.com",
  storageBucket: "meetup-77a0f.appspot.com",
  messagingSenderId: "561398727455",
  appId: "1:561398727455:web:f42225102948e2a7cd262a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);
