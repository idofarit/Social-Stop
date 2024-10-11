import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "meetup-77a0f.firebaseapp.com",
  databaseURL: "https://meetup-77a0f-default-rtdb.firebaseio.com",
  projectId: "meetup-77a0f",
  storageBucket: "meetup-77a0f.appspot.com",
  messagingSenderId: "561398727455",
  appId: "1:561398727455:web:f42225102948e2a7cd262a",
};

if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Le3OV4qAAAAANs6CShbOXlyYdcYrU4DfQ4FPeIl"),
  isTokenAutoRefreshEnabled: true,
});
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);
